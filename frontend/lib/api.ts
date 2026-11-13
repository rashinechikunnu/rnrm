/**
 * Data access for the website.
 *
 * The site runs without a backend: all content lives in content/seed.json and
 * is bundled at build time. Edit that file to change services, projects,
 * products, blog posts or contact details.
 *
 * Pages only ever call the functions below, so when a backend is added later,
 * swapping these bodies for API calls is the only change needed.
 */
import { cacheLife } from "next/cache";
import seed from "@/content/seed.json";
import type { Post, Product, Project, Service, SiteContent, Testimonial } from "./types";

const content: SiteContent = Object.fromEntries(Object.entries(seed.content).map(([key, item]) => [key, item.value]));

export async function getContent(): Promise<SiteContent> {
  return content;
}

export async function getServices(): Promise<Service[]> {
  return seed.services;
}

export async function getProjects(): Promise<Project[]> {
  return seed.projects as Project[];
}

export async function getProject(slug: string): Promise<Project | null> {
  return (await getProjects()).find((p) => p.slug === slug) ?? null;
}

export async function getProducts(): Promise<Product[]> {
  return seed.products as Product[];
}

export async function getPosts(): Promise<Post[]> {
  return seed.posts as Post[];
}

export async function getPost(slug: string): Promise<Post | null> {
  return (await getPosts()).find((p) => p.slug === slug) ?? null;
}

/** Add testimonials to content/seed.json under "testimonials" and the home-page section appears. */
export async function getTestimonials(): Promise<Testimonial[]> {
  return (seed as { testimonials?: Testimonial[] }).testimonials ?? [];
}

export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
