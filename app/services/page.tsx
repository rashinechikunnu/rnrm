import { Check } from "lucide-react";
import { ServiceIcon } from "@/components/cards";
import { Reveal } from "@/components/Reveal";
import { CtaBanner } from "@/components/sections";
import { Button, PageHero, Tag } from "@/components/ui";
import { getServices } from "@/lib/api";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Services",
  description: "Custom software, web applications, SaaS products, mobile apps, API integration and business automation — software development services from rnrm Technology.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything you need to take software from idea to impact."
        text="Six connected services, delivered by one team. Engage us for a single project or as a long-term technology partner."
      >
        <Button href="/contact" arrow>
          Start a Project
        </Button>
      </PageHero>

      {/* In-page index */}
      <nav aria-label="Services" className="z-30 border-b lg:sticky lg:top-[4.75rem] border-line bg-white/90 backdrop-blur-md">
        <ul className="container-page flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {services.map((service) => (
            <li key={service.slug} className="shrink-0">
              <a href={`#${service.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm font-medium text-body transition-colors hover:border-brand hover:text-brand">
                {service.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {services.map((service, i) => (
        <section key={service.slug} id={service.slug} className={`scroll-mt-36 py-20 sm:py-24 ${i % 2 === 1 ? "bg-mist" : "bg-white"}`}>
          <div className="container-page">
            <Reveal className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
              <div>
                <div className="flex items-center gap-4">
                  <span className="grid size-14 place-items-center rounded-xl bg-brand text-white">
                    <ServiceIcon name={service.icon} className="size-6" />
                  </span>
                  <span className="font-mono text-sm text-muted">
                    {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="mt-7 text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem]">{service.title}</h2>
                <p className="mt-4 text-xl leading-relaxed text-ink">{service.summary}</p>
                <p className="mt-5 text-lg leading-relaxed text-body">{service.description}</p>

                <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.16em] text-muted">Technologies</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <li key={tech}>
                      <Tag>{tech}</Tag>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`rounded-2xl border border-line p-8 sm:p-10 ${i % 2 === 1 ? "bg-white" : "bg-mist"}`}>
                <h3 className="text-xl font-semibold">What you gain</h3>
                <ul className="mt-6 space-y-4">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3 leading-relaxed text-body">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-xl bg-brand text-white">
                        <Check aria-hidden className="size-3.5" strokeWidth={3} />
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-14">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Development process</h3>
              <ol className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {service.process.map((step, n) => (
                  <li key={step.title} className="bg-white p-7">
                    <span className="grid size-9 place-items-center rounded-full border-2 border-brand font-display text-sm text-brand">{n + 1}</span>
                    <h4 className="mt-5 text-lg">{step.title}</h4>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-body">{step.text}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.15} className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl bg-ink p-8 text-white sm:flex-row sm:items-center sm:p-10">
              <p className="max-w-xl font-display text-xl leading-snug sm:text-2xl">Planning a project like this? Let’s talk it through.</p>
              <Button href={`/contact?service=${encodeURIComponent(service.title)}`} arrow className="shrink-0">
                Discuss this service
              </Button>
            </Reveal>
          </div>
        </section>
      ))}

      <CtaBanner title="Not sure which service fits?" text="Describe the problem and we will recommend the simplest approach that solves it — even if that means building less." />
    </>
  );
}
