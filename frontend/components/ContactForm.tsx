"use client";

import { useState } from "react";
import { CircleAlert, CircleCheck, Mail, MessageCircle } from "lucide-react";

type Fields = { name: string; email: string; company: string; service: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Channel = "whatsapp" | "email";

const empty: Fields = { name: "", email: "", company: "", service: "", message: "" };

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (!values.service) errors.service = "Please choose the service you are interested in.";
  if (values.message.trim().length < 20) errors.message = "Please describe your project in at least 20 characters.";
  return errors;
}

/** The enquiry as plain text, ready to drop into a WhatsApp chat or an email. */
function compose(values: Fields) {
  return [
    "New project enquiry",
    "",
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    ...(values.company.trim() ? [`Company: ${values.company.trim()}`] : []),
    `Service: ${values.service}`,
    "",
    values.message.trim(),
  ].join("\n");
}

/**
 * There is no server behind this form. On submit it validates the fields, then
 * opens the visitor's WhatsApp or email app with the enquiry already written,
 * addressed to rnrm Technology. The visitor presses send there.
 */
export function ContactForm({ services, initialService = "", whatsappNumber, email }: { services: string[]; initialService?: string; whatsappNumber: string; email: string }) {
  // A service (or product) name can arrive from a "Discuss this service" link.
  const preset = initialService.trim().slice(0, 120);
  const options = preset && !services.includes(preset) ? [...services, preset] : services;
  const [values, setValues] = useState<Fields>({ ...empty, service: preset });
  const [errors, setErrors] = useState<Errors>({});
  const [openedIn, setOpenedIn] = useState<Channel | null>(null);

  const set = (field: keyof Fields) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  function send(channel: Channel) {
    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`cf-${firstInvalid}`)?.focus();
      return;
    }
    const text = compose(values);
    const url =
      channel === "whatsapp"
        ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`
        : `mailto:${email}?subject=${encodeURIComponent(`Project enquiry — ${values.service}`)}&body=${encodeURIComponent(text)}`;
    if (channel === "whatsapp") window.open(url, "_blank", "noopener,noreferrer");
    else window.location.href = url;
    setOpenedIn(channel);
  }

  if (openedIn) {
    return (
      <div role="status" className="flex flex-col items-start rounded-2xl border border-line bg-white p-8 sm:p-10">
        <span className="grid size-14 place-items-center rounded-xl bg-brand text-white">
          <CircleCheck aria-hidden className="size-7" />
        </span>
        <h2 className="mt-6 text-2xl">Almost done — press send in {openedIn === "whatsapp" ? "WhatsApp" : "your email app"}.</h2>
        <p className="mt-3 max-w-md leading-relaxed text-body">
          Your enquiry is written out and addressed to us. It reaches us once you send it from {openedIn === "whatsapp" ? "WhatsApp" : "your email app"}.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-brand">
          <button type="button" onClick={() => send(openedIn)} className="underline-offset-4 hover:underline">
            It didn’t open — try again
          </button>
          <button type="button" onClick={() => setOpenedIn(null)} className="underline-offset-4 hover:underline">
            Back to the form
          </button>
        </div>
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        send("whatsapp");
      }}
      noValidate
      className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-10"
    >
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
          <textarea rows={6} required maxLength={1500} placeholder="What are you looking to build, and what should it achieve?" {...fieldProps("message")} />
          {error("message")}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-5 border-t border-line pt-7 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-xs text-sm text-muted">Your message opens in WhatsApp or your email app, ready to send. Nothing is stored on this website.</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 font-semibold text-white transition-colors hover:bg-brand-dark">
            <MessageCircle aria-hidden className="size-4" />
            Send via WhatsApp
          </button>
          <button
            type="button"
            onClick={() => send("email")}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line bg-white px-6 font-semibold text-ink transition-colors hover:border-ink/40"
          >
            <Mail aria-hidden className="size-4" />
            Send by Email
          </button>
        </div>
      </div>
    </form>
  );
}
