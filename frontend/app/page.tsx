import { ArrowRight, Database, Layers, Unplug } from "lucide-react";
import { PostCard, ProjectCard, ServiceCard } from "@/components/cards";
import { HeroPanels } from "@/components/HeroVisual";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { CtaBanner, Faq } from "@/components/sections";
import { Button, Pill, SectionHeading, Tag } from "@/components/ui";
import { getContent, getPosts, getProjects, getServices, getTestimonials } from "@/lib/api";

const stackMarquee = ["Python", "JavaScript", "Java", "C#", "Go", "Dart", "React", "Next.js", "Bootstrap", "Django", "FastAPI", "Node.js", "Express", ".NET", "PostgreSQL", "MySQL", "MongoDB", "SQLite", "Flutter"];

const problems = [
  { icon: Unplug, title: "Disconnected Workflows", text: "Manual hand-offs between tools slow teams down and let details slip through." },
  { icon: Database, title: "Scattered Business Data", text: "When information lives in spreadsheets and chats, nobody trusts the numbers." },
  { icon: Layers, title: "Software That No Longer Fits", text: "Off-the-shelf tools stop scaling at the point your business becomes different." },
];

const processSteps = [
  { step: "01 — Discover & Plan", title: "Understand Your Business First", text: "We learn your goals, users and constraints, then agree what success looks like before any code is written." },
  { step: "02 — Design & Architect", title: "Make The Decisions That Matter Early", text: "Clickable prototypes and a clear technical plan, so you see the product and the trade-offs up front." },
  { step: "03 — Build & Review", title: "Working Software Every Iteration", text: "Short development cycles, each ending in a demo you can use — reviewed, tested and documented." },
  { step: "04 — Launch & Support", title: "Go Live, Then Keep Improving", text: "Deployment, monitoring and training, followed by long-term support as your business grows." },
];

const reasons = [
  "Partnership: one accountable team from first call to long-term support.",
  "Quality: clean architecture, code review and automated tests as standard.",
  "Clarity: plain-language updates and a working demo every iteration.",
  "Security: authentication, permissions and backups designed in from day one.",
];

const stack = [
  { group: "Languages", items: ["Python", "JavaScript", "TypeScript", "Java", "C#", "Go", "Dart"] },
  { group: "Frontend", items: ["React", "Next.js", "Bootstrap", "Tailwind CSS", "Framer Motion"] },
  { group: "Backend", items: ["Django", "Django REST Framework", "FastAPI", "Node.js", "Express", ".NET", "Go"] },
  { group: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Redis"] },
  { group: "Mobile", items: ["Flutter", "React Native", "Firebase", "App Store", "Play Store"] },
  { group: "Cloud & DevOps", items: ["Docker", "AWS", "CI/CD", "REST APIs", "Celery"] },
];

const faqs = [
  { q: "What kind of companies do you work with?", a: "Startups launching a first product and established businesses replacing manual processes or outgrown tools. We are based in India and work with clients in any time zone." },
  { q: "How does a project start?", a: "With a conversation about your goals. We follow up with a short discovery phase, then a written proposal covering scope, timeline and cost before any commitment." },
  { q: "Who owns the code?", a: "You do. On completion you own the source code and your data, with no licence lock-in." },
  { q: "Which technologies do you use?", a: "We choose the stack that fits the project. On the front end: React, Next.js, Bootstrap and Tailwind CSS. On the back end: Django, FastAPI, Node.js with Express, .NET and Go. For data: PostgreSQL, MySQL, MongoDB and SQLite. For mobile: Flutter and React Native. We work in Python, JavaScript, Java, C#, Go and Dart." },
  { q: "Do you support the product after launch?", a: "Yes. We offer ongoing maintenance, monitoring and feature development, and many engagements continue as long-term partnerships." },
];

export default async function HomePage() {
  const [content, services, projects, posts, testimonials] = await Promise.all([getContent(), getServices(), getProjects(), getPosts(), getTestimonials()]);
  // Featured projects first; always an even number so the two-column grid has no orphan.
  const ordered = [...projects.filter((p) => p.is_featured), ...projects.filter((p) => !p.is_featured)];
  const featured = ordered.slice(0, ordered.length >= 4 ? 4 : 2);

  return (
    <>
      {/* Hero */}
      <section className="stage relative overflow-hidden text-white">
        <div className="container-page grid gap-10 pb-16 pt-36 sm:pt-44 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:pb-24">
          <div>
            <Pill label="rnrm Technology" note="Software · Web · SaaS · Automation" tone="dark" />
            <h1 className="mt-7 max-w-3xl text-[2.9rem] leading-[1] sm:text-7xl lg:text-[5.25rem]">{content.hero_headline}</h1>
          </div>
          <div className="lg:pt-14">
            <p className="max-w-md text-lg leading-relaxed text-white/80">{content.hero_text}</p>
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/60">
              <span className="font-semibold text-white">Based in India</span>
              <span aria-hidden className="size-1 rounded-full bg-brand" />
              Building for clients worldwide
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/services" arrow>
                Explore Our Services
              </Button>
              <Button href="/contact" variant="ghost-white" arrow>
                Start a Project
              </Button>
            </div>
          </div>
        </div>
        <div className="pb-10">
          <HeroPanels />
        </div>
      </section>

      {/* Stack strip */}
      <section aria-label="Technologies we build with" className="border-b border-line py-10">
        <p className="text-center text-sm font-medium text-body">Built on a modern, proven technology stack</p>
        <div aria-hidden className="mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-12 pr-12">
            {[...stackMarquee, ...stackMarquee].map((name, i) => (
              <span key={i} className="flex items-center gap-3 font-display text-xl font-medium tracking-tight text-ink/45">
                <span className="size-2 rounded-full border-2 border-brand" />
                {name}
              </span>
            ))}
          </div>
        </div>
        <ul className="sr-only">
          {stackMarquee.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </section>

      {/* About */}
      <section className="py-24 sm:py-32">
        <div className="container-page">
          <Reveal>
            <SectionHeading align="center" eyebrow="About Us" note="Who we are" title="Built For Businesses, Powered By Careful Engineering" />
          </Reveal>
          <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <div className="relative flex h-full min-h-[26rem] flex-col justify-between overflow-hidden rounded-2xl bg-brand p-7 text-white">
                <span aria-hidden className="pointer-events-none absolute -bottom-32 -right-24 size-[24rem] rounded-full bg-brand-dark" />
                <span aria-hidden className="pointer-events-none absolute -bottom-16 -right-8 size-[24rem] rounded-full border border-white/20" />
                <div className="relative flex items-center justify-between">
                  <span className="rounded-full bg-ink px-4 py-2 text-xs font-semibold">PART 01</span>
                  <Logo variant="disc" size={64} />
                </div>
                <div className="relative">
                  <p className="font-display text-4xl font-medium uppercase leading-[1] tracking-tight sm:text-5xl">Smart Software, Real Results</p>
                  <div className="mt-8">
                    <Button href="/about" variant="white" arrow>
                      Our Story
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="flex flex-col">
              <ul className="divide-y divide-line border-b border-line">
                {problems.map((problem, i) => (
                  <Reveal key={problem.title} delay={i * 0.08}>
                    <li className="grid items-center gap-4 py-6 sm:grid-cols-[auto_1fr_1.1fr] sm:gap-6">
                      <span className="grid size-14 place-items-center rounded-xl border border-line bg-panel text-brand">
                        <problem.icon aria-hidden className="size-6" strokeWidth={1.5} />
                      </span>
                      <h3 className="text-xl">{problem.title}</h3>
                      <p className="text-[0.95rem] leading-relaxed text-body">{problem.text}</p>
                    </li>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={0.15} className="mt-auto grid gap-6 pt-10 sm:grid-cols-[1fr_auto] sm:items-end">
                <p className="max-w-sm border-l-2 border-brand pl-5 text-lg leading-relaxed text-body">
                  Good software starts with business goals, not technology alone. We are an emerging company from India that builds with that order in mind.
                </p>
                <div className="rounded-2xl bg-ink p-6 text-white sm:w-60">
                  <p className="font-display text-5xl font-medium tracking-tight">{services.length}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">Service lines delivered by one accountable team</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="pb-24 sm:pb-32">
        <div className="container-page">
          <Reveal>
            <SectionHeading align="center" eyebrow="Projects" note="Recent featured work" title="The Kind Of Products We Build" />
          </Reveal>
          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 2) * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 flex justify-center">
            <Button href="/projects" variant="outline" arrow>
              View All Projects
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="border-y border-line bg-white py-24 sm:py-32">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:h-fit">
            <SectionHeading eyebrow="Services" note="What we do" title="Where Software Starts Paying Off" text="Six connected disciplines under one roof, so strategy, design, engineering and support stay aligned." />
            <div className="mt-8">
              <Button href="/services" variant="dark" arrow>
                All Services
              </Button>
            </div>
          </Reveal>
          <div className="space-y-4">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={0.04}>
                <ServiceCard service={service} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 sm:py-32">
        <div className="container-page">
          <Reveal>
            <SectionHeading align="center" eyebrow="Process" note="How we work" title="A Proven Process Built Around Your Goals" />
          </Reveal>
          <ol className="mt-16 grid gap-4 md:grid-cols-2">
            {processSteps.map((item, i) => (
              <Reveal key={item.step} delay={(i % 2) * 0.08}>
                <li className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 sm:p-9">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-lg font-medium tracking-tight text-brand">{item.step}</p>
                    <span aria-hidden className="grid size-11 place-items-center rounded-xl bg-panel font-display text-lg font-medium">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-10 text-3xl leading-tight">{item.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-body">{item.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Why choose us */}
      <section className="stage text-white">
        <div className="container-page grid gap-12 py-24 sm:py-32 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Pill label="Why rnrm Technology" note="Our promise" tone="dark" />
            <h2 className="mt-6 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem]">Building Stronger Businesses Through Software</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">Technology decisions outlive the project that made them. We make them carefully, explain them clearly and stand behind them.</p>
            <ul className="mt-12 space-y-4 border-t border-white/15 pt-10">
              {reasons.map((reason) => (
                <li key={reason} className="flex gap-3 text-lg text-white/90">
                  <ArrowRight aria-hidden className="mt-1.5 size-4 shrink-0 text-brand" />
                  {reason}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass grid h-full gap-3 rounded-2xl p-3 sm:grid-cols-2">
              {stack.map((column) => (
                <div key={column.group} className="rounded-xl bg-white/[0.06] p-6">
                  <h3 className="flex items-center gap-2.5 text-lg">
                    <span aria-hidden className="size-2 bg-brand" />
                    {column.group}
                  </h3>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {column.items.map((item) => (
                      <li key={item}>
                        <Tag tone="dark">{item}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials — appears once testimonials are added in the admin */}
      {testimonials.length > 0 && (
        <section className="pt-24 sm:pt-32">
          <div className="container-page">
            <Reveal>
              <SectionHeading align="center" eyebrow="Testimonials" note="Client feedback" title="What Our Clients Say" />
            </Reveal>
            <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.slice(0, 3).map((t, i) => (
                <Reveal key={t.name + i} delay={i * 0.08}>
                  <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-8">
                    <blockquote className="flex-1 font-display text-xl leading-relaxed tracking-tight">“{t.quote}”</blockquote>
                    <figcaption className="mt-8 border-t border-line pt-5 text-sm">
                      <span className="font-semibold">{t.name}</span>
                      <span className="block text-muted">{[t.role, t.company].filter(Boolean).join(", ")}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-24 sm:py-32">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="FAQ" note="Good to know" title="Questions We Hear Often" text="Something else on your mind? Send us a message and we will answer directly." />
            <div className="mt-8">
              <Button href="/contact" variant="outline" arrow>
                Ask A Question
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Faq items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* Insights */}
      {posts.length > 0 && (
        <section className="border-t border-line bg-white py-24 sm:py-32">
          <div className="container-page">
            <Reveal>
              <SectionHeading align="center" eyebrow="Blog" note="Latest insights" title="Thinking On Software, Product And Delivery" />
            </Reveal>
            <div className="mt-16 grid gap-4 md:grid-cols-3">
              {posts.slice(0, 3).map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.08}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
