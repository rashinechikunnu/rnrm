import type { Metadata } from "next";

export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.NODE_ENV === "production" ? "/rnrm" : "")).replace(/\/$/, "");

export const siteOrigin = (process.env.NEXT_PUBLIC_SITE_ORIGIN ?? (process.env.NODE_ENV === "production" ? "https://rashinechikunnu.github.io" : "http://localhost:3000")).replace(/\/$/, "");

export function assetPath(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (basePath && clean.startsWith(`${basePath}/`)) return clean;
  return `${basePath}${clean}`;
}

export const site = {
  name: "rnrm Technology",
  shortName: "rnrm",
  origin: siteOrigin,
  url: `${siteOrigin}${basePath}`,
  description:
    "rnrm Technology is a software development company in India building custom software, web applications, SaaS products, mobile apps and business automation for clients worldwide.",
  tagline: "Building Technology That Moves Businesses Forward.",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
];

/** Per-page metadata with canonical URL and Open Graph filled in consistently. */
export function pageMeta(opts: { title: string; description: string; path: string; type?: "website" | "article" }): Metadata {
  const fullPath = `${basePath}${opts.path === "/" ? "/" : opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: fullPath },
    openGraph: {
      title: `${opts.title} | ${site.name}`,
      description: opts.description,
      url: fullPath,
      siteName: site.name,
      type: opts.type ?? "website",
    },
    twitter: { card: "summary_large_image", title: `${opts.title} | ${site.name}`, description: opts.description },
  };
}

export function whatsappLink(number: string, message = "Hello rnrm Technology, I would like to discuss a project.") {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" }).format(new Date(iso));
}
