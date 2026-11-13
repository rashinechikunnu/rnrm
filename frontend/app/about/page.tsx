import { Eye, Handshake, Lightbulb, ShieldCheck, Sparkles, Target, Users } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { CtaBanner } from "@/components/sections";
import { Button, PageHero, SectionHeading } from "@/components/ui";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "About Us",
  description: "rnrm Technology is an emerging software development company from India with a long-term vision: to be a trusted technology partner for businesses worldwide.",
  path: "/about",
});

const values = [
  { icon: ShieldCheck, title: "Integrity", text: "Honest estimates, honest advice and honest progress reports — including when the news is not what anyone hoped for." },
  { icon: Sparkles, title: "Craft", text: "We care how software is made, not only whether it works today. Quality is what keeps it working tomorrow." },
  { icon: Users, title: "Partnership", text: "Your goals set our priorities. We measure our work by what it changes for your business." },
  { icon: Lightbulb, title: "Curiosity", text: "Technology moves quickly. We keep learning so our clients benefit from what is proven, not just what is new." },
  { icon: Handshake, title: "Ownership", text: "We take responsibility from the first workshop to long after launch, and we finish what we start." },
];

const journey = [
  { stage: "Foundation", title: "Starting with a clear focus", text: "rnrm Technology was founded in India to build dependable software for businesses — with a commitment to careful engineering and choosing the right tool for each job." },
  { stage: "Today", title: "Building products and partnerships", text: "We deliver custom software, web applications and automation for clients while developing our own SaaS products alongside them." },
  { stage: "Next", title: "Serving clients across borders", text: "We are structuring our process, communication and delivery to work seamlessly with companies in other countries and time zones." },
  { stage: "Vision", title: "A recognised international technology company", text: "Our long-term goal is a company known globally for reliable engineering, with a portfolio of products used by businesses around the world." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A young company with a long-term view of technology."
        text="rnrm Technology is a software development company based in India. We build software that businesses can depend on — and relationships that last longer than any single project."
      />

      {/* Introduction */}
      <section className="py-20 sm:py-28">
        <div className="container-page grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <div className="relative mx-auto grid aspect-square max-w-md place-items-center rounded-2xl bg-mist">
              <span aria-hidden className="absolute inset-8 rounded-full border border-dashed border-brand/30" />
              <Logo variant="disc" size={260} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Our company" title="Technology should move a business forward, not hold it back." />
            <p className="mt-6 text-lg leading-relaxed text-body">
              Too many businesses run on tools that almost fit: spreadsheets stretched past their limits, systems that do not talk to each other, and software chosen years ago for a company that has since changed.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-body">
              We started rnrm Technology to change that. We combine product thinking with disciplined engineering to deliver custom software, web and mobile applications, SaaS products and automation — built on a modern stack and shaped around how each client actually works.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-page grid gap-5 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-2xl bg-ink p-9 text-white sm:p-12">
              <span className="grid size-12 place-items-center rounded-full bg-brand">
                <Eye aria-hidden className="size-5" />
              </span>
              <h2 className="mt-8 text-3xl">Our vision</h2>
              <p className="mt-4 text-lg leading-relaxed text-white/75">
                To become a globally trusted technology company from India — known for software that is reliable, thoughtfully designed and genuinely useful to the businesses that run on it.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="h-full rounded-2xl border border-line bg-white p-9 sm:p-12">
              <span className="grid size-12 place-items-center rounded-xl bg-brand text-white">
                <Target aria-hidden className="size-5" />
              </span>
              <h2 className="mt-8 text-3xl">Our mission</h2>
              <p className="mt-4 text-lg leading-relaxed text-body">
                To help businesses grow through well-engineered software: understanding their goals deeply, delivering transparently, and supporting what we build for the long term.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="Our values" title="The principles behind every decision we make." />
          </Reveal>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={(i % 3) * 0.08}>
                <li className="h-full list-none rounded-2xl border border-line p-8 transition-[border-color,box-shadow] duration-300 hover:border-brand/40 hover:shadow-card">
                  <value.icon aria-hidden className="size-7 text-brand" strokeWidth={1.75} />
                  <h3 className="mt-6 text-xl">{value.title}</h3>
                  <p className="mt-3 leading-relaxed text-body">{value.text}</p>
                </li>
              </Reveal>
            ))}
            <Reveal delay={0.16}>
              <li className="flex h-full list-none flex-col justify-between rounded-2xl bg-brand p-8 text-white">
                <p className="font-display text-2xl leading-snug">Want to work with a team that holds itself to these?</p>
                <div className="mt-8">
                  <Button href="/contact" variant="white" arrow>
                    Talk to us
                  </Button>
                </div>
              </li>
            </Reveal>
          </ul>
        </div>
      </section>

      {/* Journey */}
      <section className="bg-ink py-20 text-white sm:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="Our journey"
              title="From India, with international ambition."
              text="We are at the beginning of a long road and clear about where it leads: sustainable growth, deeper expertise and clients on every continent."
            />
          </Reveal>
          <ol className="relative border-l border-white/15 pl-8">
            {journey.map((step, i) => (
              <Reveal key={step.stage} delay={i * 0.08}>
                <li className="relative pb-12 last:pb-0">
                  <span aria-hidden className={`absolute -left-[2.45rem] top-1 size-3.5 rounded-full border-2 border-brand ${i === 1 ? "bg-brand" : "bg-ink"}`} />
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">{step.stage}</p>
                  <h3 className="mt-2 text-2xl">{step.title}</h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-white/65">{step.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBanner title="Let’s start a long-term partnership." text="Whether you have a detailed brief or only the outline of an idea, we would like to hear about it." />
    </>
  );
}
