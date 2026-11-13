import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Cloud, Code, Globe, Plug, Smartphone, Workflow, type LucideIcon } from "lucide-react";
import type { Post, Project, Service } from "@/lib/types";
import { formatDate } from "@/lib/site";
import { Tag } from "./ui";

const serviceIcons: Record<string, LucideIcon> = { code: Code, globe: Globe, cloud: Cloud, smartphone: Smartphone, plug: Plug, workflow: Workflow };

export function ServiceIcon({ name, className = "size-6" }: { name: string; className?: string }) {
  const Icon = serviceIcons[name] ?? Code;
  return <Icon aria-hidden className={className} strokeWidth={1.5} />;
}

/** Square arrow chip used on cards; turns red when the parent `.group` is hovered. */
function ArrowChip({ className = "" }: { className?: string }) {
  return (
    <span className={`grid size-9 shrink-0 place-items-center rounded-lg bg-white text-ink transition-colors duration-200 group-hover:bg-brand group-hover:text-white ${className}`}>
      <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:rotate-45" />
    </span>
  );
}

/** Wide service row: line-art tile on the left, title, summary and "Read More" on the right. */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group grid gap-5 rounded-2xl border border-line bg-panel p-4 transition-[border-color,box-shadow] duration-300 hover:border-brand/40 hover:shadow-card sm:grid-cols-[13rem_1fr] sm:gap-7"
    >
      <span className="relative grid aspect-[16/10] place-items-center overflow-hidden rounded-xl bg-white sm:aspect-auto sm:min-h-40">
        <span aria-hidden className="absolute size-24 rounded-full border border-brand/20 transition-transform duration-500 group-hover:scale-150" />
        <span aria-hidden className="absolute size-40 rounded-full border border-brand/10 transition-transform duration-500 group-hover:scale-125" />
        <ServiceIcon name={service.icon} className="relative size-11 text-brand" />
        <span className="absolute left-3 top-3 font-mono text-[0.7rem] text-muted">{String(index + 1).padStart(2, "0")}</span>
      </span>
      <span className="flex flex-col justify-center py-1 pr-2">
        <span className="font-display text-2xl font-medium tracking-tight sm:text-[1.7rem]">{service.title}</span>
        <span className="mt-2 leading-relaxed text-body">{service.summary}</span>
        <span className="mt-5 inline-flex w-fit items-center gap-3 rounded-xl border border-line bg-white py-1 pl-4 pr-1 text-sm font-semibold">
          Read More
          <ArrowChip className="bg-panel" />
        </span>
      </span>
    </Link>
  );
}

/**
 * Project artwork. Shows the uploaded cover when one exists; otherwise draws a
 * product mock-up on the brand stage so placeholder projects still look finished.
 */
export function ProjectCover({
  project,
  priority = false,
  framed = false,
  className = "aspect-[16/10]",
}: {
  project: Pick<Project, "title" | "category" | "cover">;
  priority?: boolean;
  /** Show the screenshot inside a browser frame on the stage, leaving room for text laid over the card. */
  framed?: boolean;
  className?: string;
}) {
  if (project.cover && framed) {
    return (
      <div className={`stage relative overflow-hidden rounded-2xl ${className}`}>
        <div className="absolute bottom-[-10%] right-[5%] w-[66%] overflow-hidden rounded-xl bg-white shadow-lift transition-transform duration-500 group-hover:-translate-y-3">
          <div aria-hidden className="flex items-center gap-1.5 border-b border-line px-3 py-2.5">
            <span className="size-2 rounded-full bg-brand" />
            <span className="size-2 rounded-full bg-ink/15" />
            <span className="size-2 rounded-full bg-ink/15" />
            <span className="ml-3 h-2 w-28 rounded-full bg-ink/[0.07]" />
          </div>
          <div className="relative aspect-[16/10]">
            <Image src={project.cover} alt={`${project.title} website screenshot`} fill unoptimized priority={priority} sizes="(min-width: 768px) 35vw, 70vw" className="object-cover object-top" />
          </div>
        </div>
      </div>
    );
  }
  if (project.cover) {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-ink ${className}`}>
        <Image src={project.cover} alt={`${project.title} screenshot`} fill unoptimized priority={priority} sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
      </div>
    );
  }
  const mobile = /mobile/i.test(project.category);
  const flow = /automation|api/i.test(project.category);
  return (
    <div aria-hidden className={`stage relative overflow-hidden rounded-2xl ${className}`}>
      {mobile ? (
        <div className="absolute bottom-[-18%] right-[12%] h-[88%] w-[30%] min-w-36 rounded-[1.6rem] border-[5px] border-white/90 bg-white p-3 shadow-lift transition-transform duration-500 group-hover:-translate-y-3">
          <span className="mx-auto block h-1.5 w-10 rounded-full bg-ink/15" />
          <span className="mt-4 block h-3 w-2/3 rounded-full bg-ink/80" />
          <span className="mt-3 block h-14 rounded-xl bg-brand" />
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="mt-2 flex items-center gap-2 rounded-lg border border-line p-2">
              <span className="size-4 rounded-full bg-brand-tint" />
              <span className="h-1.5 flex-1 rounded-full bg-ink/10" />
            </span>
          ))}
        </div>
      ) : (
        <div className="absolute bottom-[-12%] right-[6%] h-[70%] w-[62%] overflow-hidden rounded-xl bg-white shadow-lift transition-transform duration-500 group-hover:-translate-y-3">
          <div className="flex items-center gap-1.5 border-b border-line px-3 py-2.5">
            <span className="size-2 rounded-full bg-brand" />
            <span className="size-2 rounded-full bg-ink/15" />
            <span className="size-2 rounded-full bg-ink/15" />
            <span className="ml-3 h-2 w-28 rounded-full bg-ink/[0.07]" />
          </div>
          {flow ? (
            <div className="flex items-center justify-center gap-3 px-6 py-10">
              {["bg-ink", "bg-brand", "bg-ink/15", "bg-brand"].map((c, i) => (
                <span key={i} className="flex items-center gap-3">
                  <span className={`block size-10 rounded-xl sm:size-12 ${c}`} />
                  {i < 3 && <span className="block h-0.5 w-4 bg-ink/20 sm:w-8" />}
                </span>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-[22%_1fr] gap-3 p-3">
              <div className="space-y-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className={`block h-2 rounded-full ${i === 1 ? "bg-brand" : "bg-ink/10"}`} />
                ))}
              </div>
              <div>
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className={`block h-10 rounded-lg ${i === 0 ? "bg-brand-tint" : "bg-mist"}`} />
                  ))}
                </div>
                <div className="mt-3 flex h-24 items-end gap-1.5 rounded-lg bg-mist p-2">
                  {[40, 62, 50, 78, 58, 90, 70, 96].map((h, i) => (
                    <span key={i} style={{ height: `${h}%` }} className={`flex-1 rounded-sm ${i % 3 === 2 ? "bg-brand" : "bg-ink/15"}`} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Large image-led project card with the title laid over the artwork. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative h-full">
      <ProjectCover project={project} framed className="aspect-[4/5] sm:aspect-[16/11]" />
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between rounded-2xl bg-gradient-to-b from-ink/75 via-transparent to-ink/45 p-6 text-white sm:p-8">
        <div>
          <p className="flex items-center gap-2 text-sm text-white/85">
            <span aria-hidden className="size-1.5 bg-brand" />
            {project.category}
            {project.client && <span className="text-white/50">· {project.client}</span>}
          </p>
          <h3 className="mt-3 max-w-md text-3xl leading-[1.05] sm:text-4xl">
            <Link href={`/projects/${project.slug}`} className="pointer-events-auto after:absolute after:inset-0 after:content-['']">
              {project.title}
            </Link>
          </h3>
          <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-white/75">{project.summary}</p>
        </div>
        <div className="flex items-end justify-between gap-4">
          <ul className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <li key={tech}>
                <Tag tone="dark">{tech}</Tag>
              </li>
            ))}
          </ul>
          <ArrowChip className="size-11" />
        </div>
      </div>
    </article>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-[border-color,box-shadow] duration-300 hover:border-brand/40 hover:shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map((tag) => (
            <Tag key={tag} tone="brand">
              {tag}
            </Tag>
          ))}
        </div>
        <ArrowChip className="bg-panel" />
      </div>
      <h3 className="mt-8 text-2xl leading-snug">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-body">{post.excerpt}</p>
      <p className="mt-7 border-t border-line pt-5 text-sm text-muted">
        <time dateTime={post.published_at}>{formatDate(post.published_at)}</time> · {post.author_name}
      </p>
    </article>
  );
}
