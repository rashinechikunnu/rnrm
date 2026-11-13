/**
 * Data access for the website.
 *
 * Every read goes to the Django REST API and is cached for a few minutes, so
 * edits made in the admin dashboard appear on the site shortly after saving.
 * If the API is unreachable the site falls back to content/seed.json, so pages
 * always render (and the project builds without a running backend).
 */
import { cacheLife } from "next/cache";
import seed from "@/content/seed.json";
import type { Post, Product, Project, Service, SiteContent, Testimonial } from "./types";

const API_URL = (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api").replace(/\/$/, "");

async function read<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(`${res.status}`);
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

const seedContent: SiteContent = Object.fromEntries(
  Object.entries(seed.content).map(([key, item]) => [key, item.value]),
);

export async function getContent(): Promise<SiteContent> {
  "use cache";
  cacheLife("minutes");
  // Seed values act as defaults for any key not yet created in the admin.
  return { ...seedContent, ...(await read<SiteContent>("/content/", {})) };
}

export async function getServices(): Promise<Service[]> {
  "use cache";
  cacheLife("minutes");
  return read<Service[]>("/services/", seed.services);
}

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("minutes");
  return read<Project[]>("/projects/", seed.projects as Project[]);
}

export async function getProject(slug: string): Promise<Project | null> {
  return (await getProjects()).find((p) => p.slug === slug) ?? null;
}

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");
  return read<Product[]>("/products/", seed.products as Product[]);
}

export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("minutes");
  return read<Post[]>("/posts/", seed.posts as Post[]);
}

export async function getPost(slug: string): Promise<Post | null> {
  return (await getPosts()).find((p) => p.slug === slug) ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheLife("minutes");
  return read<Testimonial[]>("/testimonials/", []);
}

export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
