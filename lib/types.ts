export type Step = { title: string; text: string };
export type Media = { image: string; caption: string };

export type Service = {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  description: string;
  benefits: string[];
  technologies: string[];
  process: Step[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  client: string;
  summary: string;
  description: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
  technologies: string[];
  cover: string | null;
  screenshots: Media[];
  live_url: string;
  is_featured: boolean;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: Step[];
  status: "live" | "beta" | "coming_soon";
  pricing: string;
  website_url: string;
  cover: string | null;
  screenshots: Media[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover: string | null;
  tags: string[];
  author_name: string;
  published_at: string;
  seo_title: string;
  seo_description: string;
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  photo: string | null;
};

export type SiteContent = Record<string, string>;
