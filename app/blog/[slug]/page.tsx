import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { CtaBanner } from "@/components/sections";
import { Tag } from "@/components/ui";
import { getPost, getPosts } from "@/lib/api";
import { formatDate, pageMeta, site } from "@/lib/site";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found" };
  return pageMeta({ title: post.seo_title || post.title, description: post.seo_description || post.excerpt, path: `/blog/${post.slug}`, type: "article" });
}

/** Renders the simple post format editors use in the admin: "## heading", "- bullet", blank line = paragraph. */
function renderBody(body: string): ReactNode[] {
  return body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="mt-12 text-2xl sm:text-3xl">
            {block.slice(3)}
          </h2>
        );
      }
      const lines = block.split("\n");
      if (lines.every((line) => line.startsWith("- "))) {
        return (
          <ul key={i} className="mt-6 space-y-3">
            {lines.map((line) => (
              <li key={line} className="flex gap-3 text-lg leading-relaxed text-body">
                <span aria-hidden className="mt-[0.7rem] size-2 shrink-0 rounded-full bg-brand" />
                {line.slice(2)}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={i} className="mt-6 text-lg leading-[1.8] text-body">
          {block}
        </p>
      );
    });
}

export default function PostPage(props: PageProps<"/blog/[slug]">) {
  return (
    <>
      <Suspense fallback={<div className="stage min-h-[70vh] pt-44 text-white/60"><p className="container-page">Loading article…</p></div>}>
        <Article params={props.params} />
      </Suspense>
      <CtaBanner />
    </>
  );
}

async function Article({ params }: Pick<PageProps<"/blog/[slug]">, "params">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    author: { "@type": "Organization", name: post.author_name },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/brand/rnrm-disc.png` } },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <article className="pb-20 sm:pb-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="stage pb-14 pt-36 text-white sm:pb-20 sm:pt-44">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-white/65 transition-colors hover:text-white">
            <ArrowLeft aria-hidden className="size-4" />
            All articles
          </Link>
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Tag key={tag} tone="dark">
                {tag}
              </Tag>
            ))}
          </div>
          <h1 className="mt-5 text-4xl leading-[1.05] sm:text-6xl">{post.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-white/80">{post.excerpt}</p>
          <p className="mt-6 text-sm text-white/55">
            <time dateTime={post.published_at}>{formatDate(post.published_at)}</time> · {post.author_name}
          </p>
          </div>
        </div>
      </header>
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          {post.cover && (
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-mist">
              <Image src={post.cover} alt="" fill unoptimized priority sizes="(min-width: 768px) 48rem, 100vw" className="object-cover" />
            </div>
          )}
          <div className="mt-4">{renderBody(post.body)}</div>
        </div>
      </div>
    </article>
  );
}
