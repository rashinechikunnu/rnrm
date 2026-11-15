import { PostCard } from "@/components/cards";
import { Reveal } from "@/components/Reveal";
import { CtaBanner } from "@/components/sections";
import { PageHero } from "@/components/ui";
import { getPosts } from "@/lib/api";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Blog",
  description: "Practical writing on software development, SaaS, product strategy and delivery from the rnrm Technology team.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHero eyebrow="Blog" title="Insights on building software that works." text="Practical notes on planning, engineering and running digital products — written for the people who commission and build them." />
      <section className="py-20 sm:py-28">
        <div className="container-page">
          {posts.length === 0 ? (
            <p className="text-lg text-body">Our first articles are being written. Check back soon.</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
