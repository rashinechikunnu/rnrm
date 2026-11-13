import { Suspense } from "react";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/ui";
import { getContent, getServices } from "@/lib/api";
import { pageMeta, whatsappLink } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact",
  description: "Start a project with rnrm Technology. Tell us about your idea by form, email or WhatsApp and we will reply within one business day.",
  path: "/contact",
});

/** Reads ?service=… at request time so links from service and product pages preselect the dropdown. */
type FormDetails = { services: string[]; whatsappNumber: string; email: string };

async function PrefilledForm({ searchParams, ...details }: FormDetails & { searchParams: PageProps<"/contact">["searchParams"] }) {
  const { service } = await searchParams;
  return <ContactForm {...details} initialService={typeof service === "string" ? service : ""} />;
}

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const [content, services] = await Promise.all([getContent(), getServices()]);

  const details: FormDetails = { services: services.map((s) => s.title), whatsappNumber: content.whatsapp_number, email: content.contact_email };

  const channels = [
    { icon: MessageCircle, title: "WhatsApp", value: "Chat with us directly", href: whatsappLink(content.whatsapp_number), external: true },
    { icon: Mail, title: "Email", value: content.contact_email, href: `mailto:${content.contact_email}`, external: false },
  ];

  return (
    <>
      <PageHero eyebrow="Contact" title="Tell us what you want to build." text="Share a few details about your project and send them to us on WhatsApp or by email. We usually reply within one business day." />

      <section className="bg-mist py-16 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
          <Suspense fallback={<ContactForm {...details} />}>
            <PrefilledForm searchParams={searchParams} {...details} />
          </Suspense>

          <aside className="space-y-4">
            {channels.map((channel) => (
              <a
                key={channel.title}
                href={channel.href}
                {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-brand/40 hover:shadow-card"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand text-white">
                  <channel.icon aria-hidden className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted">{channel.title}</span>
                  <span className="mt-1 block break-words font-semibold text-ink group-hover:text-brand">{channel.value}</span>
                </span>
              </a>
            ))}

            <div className="rounded-2xl bg-ink p-7 text-white">
              <ul className="space-y-5 text-[0.95rem]">
                <li className="flex gap-3">
                  <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
                  <span>
                    <span className="block font-semibold">Location</span>
                    <span className="text-white/65">{content.location}</span>
                  </span>
                </li>
                <li className="flex gap-3">
                  <Clock aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
                  <span>
                    <span className="block font-semibold">Response time</span>
                    <span className="text-white/65">Within one business day</span>
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
