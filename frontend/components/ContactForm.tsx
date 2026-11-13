"use client";

import { useState, type FormEvent } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api").replace(/\/$/, "");

type Fields = { name: string; email: string; company: string; service: string; message: string; website: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", email: "", company: "", service: "", message: "", website: "" };

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (!values.service) errors.service = "Please choose the service you are interested in.";
  if (values.message.trim().length < 20) errors.message = "Please describe your project in at least 20 characters.";
  return errors;
}

export function ContactForm({ services, initialService = "" }: { services: string[]; initialService?: string }) {
  // A service (or product) name can arrive from a "Discuss this service" link.
  const preset = initialService.trim().slice(0, 120);
  const options = preset && !services.includes(preset) ? [...services, preset] : services;
  const [values, setValues] = useState<Fields>({ ...empty, service: preset });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const set = (field: keyof Fields) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`cf-${firstInvalid}`)?.focus();
      return;
    }
    setState("sending");
    try {
      const res = await fetch(`${API_URL}/enquiries/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (res.status === 400) {
        // Server-side validation is the source of truth; show its messages on the fields.
        const data: Record<string, string[]> = await res.json();
        setErrors(Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v[0]])));
        setState("idle");
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      setValues(empty);
      setState("sent");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="flex flex-col items-start rounded-2xl border border-line bg-white p-8 sm:p-10">
        <span className="grid size-14 place-items-center rounded-xl bg-brand text-white">
          <CircleCheck aria-hidden className="size-7" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold">Thank you — your enquiry is with us.</h2>
        <p className="mt-3 max-w-md leading-relaxed text-body">We read every message and will reply to the email address you provided, usually within one business day.</p>
        <button type="button" onClick={() => setState("idle")} className="mt-6 text-sm font-semibold text-brand underline-offset-4 hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  const inputClass = (field: keyof Fields) =>
    `mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 ${
      errors[field] ? "border-brand" : "border-line hover:border-ink/30"
    }`;

  const fieldProps = (field: keyof Fields) => ({
    id: `cf-${field}`,
    name: field,
    value: values[field],
    onChange: set(field),
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `cf-${field}-error` : undefined,
    className: inputClass(field),
  });

  const error = (field: keyof Fields) =>
    errors[field] && (
      <p id={`cf-${field}-error`} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-brand-dark">
        <CircleAlert aria-hidden className="size-4 shrink-0" />
        {errors[field]}
      </p>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="text-sm font-semibold">
            Name <span className="text-brand">*</span>
          </label>
          <input type="text" autoComplete="name" required maxLength={120} placeholder="Your full name" {...fieldProps("name")} />
          {error("name")}
        </div>
        <div>
          <label htmlFor="cf-email" className="text-sm font-semibold">
            Email <span className="text-brand">*</span>
          </label>
          <input type="email" autoComplete="email" required placeholder="you@company.com" {...fieldProps("email")} />
          {error("email")}
        </div>
        <div>
          <label htmlFor="cf-company" className="text-sm font-semibold">
            Company
          </label>
          <input type="text" autoComplete="organization" maxLength={160} placeholder="Company name (optional)" {...fieldProps("company")} />
        </div>
        <div>
          <label htmlFor="cf-service" className="text-sm font-semibold">
            Service interested in <span className="text-brand">*</span>
          </label>
          <select required {...fieldProps("service")}>
            <option value="">Select a service</option>
            {options.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
            <option value="Other / not sure yet">Other / not sure yet</option>
          </select>
          {error("service")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="text-sm font-semibold">
            Project description <span className="text-brand">*</span>
          </label>
          <textarea rows={6} required maxLength={5000} placeholder="What are you looking to build, and what should it achieve?" {...fieldProps("message")} />
          {error("message")}
        </div>
      </div>

      {/* Honeypot — hidden from people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
      </div>

      {state === "failed" && (
        <p role="alert" className="mt-6 flex items-start gap-2 rounded-xl bg-brand-tint p-4 text-sm font-medium text-brand-dark">
          <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
          We could not send your message just now. Your details are still in the form — please try again, or reach us by email or WhatsApp.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">We only use these details to reply to your enquiry.</p>
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-7 font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-progress disabled:opacity-70"
        >
          {state === "sending" ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : <Send aria-hidden className="size-4" />}
          {state === "sending" ? "Sending…" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
