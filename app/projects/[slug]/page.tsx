import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ProjectCover } from "@/components/cards";
import { CtaBanner } from "@/components/sections";
import { Button, Tag } from "@/components/ui";
import { getProject, getProjects } from "@/lib/api";
import { pageMeta } from "@/lib/site";

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };
  return pageMeta({ title: `${project.title} — Case Study`, description: project.summary, path: `/projects/${project.slug}`, type: "article" });
}

export default function ProjectPage(props: PageProps<"/projects/[slug]">) {
  return (
    <>
      <Suspense fallback={<div className="stage min-h-[70vh] pt-44 text-white/60"><p className="container-page">Loading case study…</p></div>}>
        <CaseStudy params={props.params} />
      </Suspense>
      <CtaBanner title="Facing A Similar Challenge?" />
    </>
  );
}

async function CaseStudy({ params }: Pick<PageProps<"/projects/[slug]">, "params">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <article>
      <header className="stage pb-16 pt-36 text-white sm:pb-20 sm:pt-44">
        <div className="container-page">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-white/65 transition-colors hover:text-white">
            <ArrowLeft aria-hidden className="size-4" />
            All projects
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Tag tone="dark">{project.category}</Tag>
            {project.client && <span className="text-sm text-white/60">{project.client}</span>}
          </div>
          <h1 className="mt-5 max-w-4xl text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.25rem]">{project.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">{project.summary}</p>
          {project.live_url && (
            <div className="mt-8">
              <Button href={project.live_url} external variant="white">
                Visit live project
                <ExternalLink aria-hidden className="size-4" />
              </Button>
            </div>
          )}
        </div>
      </header>

      <div className="container-page py-14 sm:py-20">
        <div className="group">
          <ProjectCover project={project} priority className="aspect-[16/10] lg:aspect-[21/9]" />
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl sm:text-3xl">Overview</h2>
              {project.description.split(/\n{2,}/).map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="mt-5 text-lg leading-relaxed text-body">
                  {paragraph}
                </p>
              ))}
            </section>
            {project.challenge && (
              <section>
                <h2 className="text-2xl sm:text-3xl">The challenge</h2>
                <p className="mt-5 text-lg leading-relaxed text-body">{project.challenge}</p>
              </section>
            )}
            {project.solution && (
              <section>
                <h2 className="text-2xl sm:text-3xl">Our solution</h2>
                <p className="mt-5 text-lg leading-relaxed text-body">{project.solution}</p>
              </section>
            )}
            {project.results.length > 0 && (
              <section>
                <h2 className="text-2xl sm:text-3xl">Results</h2>
                <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                  {project.results.map((result) => (
                    <div key={result.label} className="rounded-2xl border border-line p-6">
                      <dt className="order-2 mt-2 text-sm leading-relaxed text-body">{result.label}</dt>
                      <dd className="font-display text-4xl text-brand">{result.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>

          <aside className="h-fit rounded-2xl bg-mist p-8 lg:sticky lg:top-28">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Project details</h2>
            <dl className="mt-6 space-y-5 text-[0.95rem]">
              <div>
                <dt className="text-muted">Category</dt>
                <dd className="mt-1">{project.category}</dd>
              </div>
              {project.client && (
                <div>
                  <dt className="text-muted">Client</dt>
                  <dd className="mt-1">{project.client}</dd>
                </div>
              )}
              <div>
                <dt className="text-muted">Technologies</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        {project.screenshots.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl sm:text-3xl">Screens</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {project.screenshots.map((shot) => (
                <figure key={shot.image}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-mist">
                    <Image src={shot.image} alt={shot.caption || `${project.title} screenshot`} fill unoptimized sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                  </div>
                  {shot.caption && <figcaption className="mt-3 text-sm text-muted">{shot.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
