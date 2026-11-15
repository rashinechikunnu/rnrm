import Link from "next/link";
import { ArrowRight, ArrowUp, Mail, MapPin, MessageCircle } from "lucide-react";
import { getContent, getCurrentYear, getServices } from "@/lib/api";
import { navLinks, whatsappLink } from "@/lib/site";
import { LogoLockup } from "./Logo";
import { Button } from "./ui";

const socialLabels: Record<string, string> = { linkedin_url: "LinkedIn", github_url: "GitHub", instagram_url: "Instagram", x_url: "X (Twitter)" };

const card = "rounded-2xl border border-line bg-panel p-6 sm:p-7";
const linkClass = "text-[0.95rem] text-ink/80 transition-colors hover:text-brand";

export async function Footer() {
  const [content, services, year] = await Promise.all([getContent(), getServices(), getCurrentYear()]);
  const socials = Object.entries(socialLabels).filter(([key]) => content[key]);

  const channels = [
    ...socials.map(([key, label]) => ({ label, href: content[key], external: true })),
    { label: "WhatsApp", href: whatsappLink(content.whatsapp_number), external: true },
    { label: "Email", href: `mailto:${content.contact_email}`, external: false },
  ];

  return (
    <footer className="bg-mist pb-6 pt-20">
      <div className="container-page">
        <Link href="/" aria-label="rnrm Technology — home" className="mx-auto flex w-fit rounded-full">
          <LogoLockup size={64} />
        </Link>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.25fr_1fr_0.85fr]">
          {/* Navigation */}
          <div className={`${card} grid gap-8 sm:grid-cols-[0.7fr_1.3fr]`}>
            <nav aria-label="Quick links">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Quick links</h2>
              <ul className="mt-4 space-y-2.5">
                {[...navLinks, { href: "/contact", label: "Contact" }].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Services" className="sm:border-l sm:border-line sm:pl-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Services</h2>
              <ul className="mt-4 space-y-2.5">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services#${service.slug}`} className={linkClass}>
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Pitch */}
          <div className={`${card} flex flex-col`}>
            <h2 className="text-2xl">Build Something That Lasts</h2>
            <p className="mt-3 leading-relaxed text-body">Tell us what you want to achieve and we will reply with a clear plan and an honest estimate — usually within one business day.</p>
            <div className="mt-auto pt-8">
              <Button href="/contact" arrow>
                Start a Project
              </Button>
            </div>
          </div>

          {/* Channels */}
          <ul className={`${card} flex flex-col divide-y divide-line !py-2`}>
            {channels.map((channel) => (
              <li key={channel.label} className="flex-1">
                <a
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full min-h-14 items-center justify-between gap-4 text-[0.95rem] text-ink/80 transition-colors hover:text-brand"
                >
                  {channel.label}
                  <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_1.85fr]">
          <div className={`${card} grid gap-6 sm:grid-cols-[auto_1fr]`}>
            <ul className="space-y-3 text-[0.95rem] text-ink/80">
              <li className="flex items-start gap-2.5">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
                {content.location}
              </li>
              <li>
                <a href={`mailto:${content.contact_email}`} className="flex items-start gap-2.5 transition-colors hover:text-brand">
                  <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span className="break-all sm:whitespace-nowrap">{content.contact_email}</span>
                </a>
              </li>
              <li>
                <a href={whatsappLink(content.whatsapp_number)} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 transition-colors hover:text-brand">
                  <MessageCircle aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
            <p className="text-[0.95rem] leading-relaxed text-body sm:border-l sm:border-line sm:pl-6">
              A software development company from India, building custom software, web applications and SaaS products for businesses worldwide.
            </p>
          </div>

          <div className={`${card} flex flex-col justify-between gap-6 sm:flex-row sm:items-center`}>
            <div className="text-sm text-body">
              <p>© {year} rnrm Technology. All rights reserved.</p>
              <ul className="mt-2 flex gap-5">
                <li>
                  <Link href="/privacy" className="underline-offset-4 hover:text-brand hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="underline-offset-4 hover:text-brand hover:underline">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <a
              href="#main"
              aria-label="Back to top"
              className="grid h-14 w-full sm:mr-16 place-items-center rounded-xl border border-line bg-white text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white sm:w-40"
            >
              <ArrowUp aria-hidden className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
