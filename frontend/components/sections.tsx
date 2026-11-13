import Script from "next/script";
import { MessageCircle, Plus } from "lucide-react";
import { getContent } from "@/lib/api";
import { site, whatsappLink } from "@/lib/site";
import { Reveal } from "./Reveal";
import { Button, Pill } from "./ui";

/** Red call-to-action panel that closes most pages. */
export function CtaBanner({
  title = "Have A Project In Mind? Let’s Build It Properly.",
  text = "Tell us what you want to achieve. We will come back with a clear plan, an honest estimate and the team to deliver it.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-mist py-6">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand px-6 py-16 text-white sm:px-14 sm:py-24">
            <div aria-hidden className="pointer-events-none absolute -right-28 -top-28 size-[26rem] rounded-full border-[2.5rem] border-white/[0.08]" />
            <div aria-hidden className="pointer-events-none absolute -bottom-48 -left-24 size-[28rem] rounded-full bg-brand-dark" />
            <div className="relative grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
              <div>
                <Pill label="Get Started" note="Tell us about your idea" tone="dark" />
                <h2 className="mt-6 max-w-2xl text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h2>
              </div>
              <div>
                <p className="text-lg leading-relaxed text-white/85">{text}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="/contact" variant="white" arrow>
                    Start a Project
                  </Button>
                  <Button href="/services" variant="ghost-white" arrow>
                    Explore Our Services
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Questions and answers, built on native <details> so it works without JavaScript. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.q} className="group rounded-2xl border border-line bg-white open:shadow-card">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6 font-display text-xl font-medium tracking-tight [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-panel text-ink transition-colors group-open:bg-brand group-open:text-white">
              <Plus aria-hidden className="size-4 transition-transform duration-200 group-open:rotate-45" />
            </span>
          </summary>
          <p className="max-w-2xl px-6 pb-6 leading-relaxed text-body">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Floating WhatsApp shortcut, shown on every page. */
export async function WhatsAppButton() {
  const content = await getContent();
  if (!content.whatsapp_number) return null;
  return (
    <a
      href={whatsappLink(content.whatsapp_number)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with rnrm Technology on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-2xl bg-ink text-white shadow-lift transition-colors hover:bg-brand"
    >
      <MessageCircle aria-hidden className="size-6" />
    </a>
  );
}

/** Google Analytics 4 — loads only when NEXT_PUBLIC_GA_ID is set. */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}

/** Organization structured data for search engines. */
export async function OrganizationJsonLd() {
  const content = await getContent();
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/rnrm-disc.png`,
    description: site.description,
    email: content.contact_email,
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    sameAs: ["linkedin_url", "github_url", "instagram_url", "x_url"].map((k) => content[k]).filter(Boolean),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
