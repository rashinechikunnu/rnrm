import type { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/api";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);

  const pages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/projects`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/products`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  return [
    ...pages,
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.published_at, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
