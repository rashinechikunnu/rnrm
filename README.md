# rnrm Technology — Company Website

Corporate website for rnrm Technology. It is a front-end-only site: no server or
database is needed to run or host it.

**Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion, Lucide — in `frontend/`.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

All content lives in one file: `frontend/content/seed.json`.

| Section in the file | What it controls |
| --- | --- |
| `content` | Contact email, WhatsApp number, location, hero headline and text, social links |
| `services` | The six services: summary, description, benefits, technologies, process |
| `projects` | Projects and case studies. `cover` is an image path under `frontend/public/` |
| `products` | SaaS products |
| `posts` | Blog articles |
| `testimonials` (optional) | Add this list and the testimonials section appears on the home page |

Home-page-only text (FAQ, process steps, technology groups) is in `frontend/app/page.tsx`.

Things to set before going live:

- **Contact details** — `contact_email` and `whatsapp_number` (digits with country code, e.g. `919876543210`).
- **Social links** — `linkedin_url`, `github_url`, `instagram_url`, `x_url`. Empty ones are not shown.
- **Site address** — copy `frontend/.env.example` to `frontend/.env.local` and set `NEXT_PUBLIC_SITE_URL`.
- **Google Analytics** — set `NEXT_PUBLIC_GA_ID` to enable GA4; nothing loads when it is empty.

## Contact form

The form has no server behind it. It checks the fields, then opens the visitor's
WhatsApp or email app with the enquiry already written and addressed to you. The
visitor presses send there. Nothing is stored on the website.

## Deploying

```bash
cd frontend
npm run build
npm run start
```

Any host that runs Next.js works (Vercel, Netlify, or your own Node server).

## Project structure

```
frontend/
  app/               pages: /, /about, /services, /projects, /products, /blog, /contact, /privacy, /terms
                     + sitemap.xml, robots.txt, Open Graph image, icons
  components/        reusable UI (Navbar, Footer, cards, hero panels, contact form…)
  lib/api.ts         data access module (loads from seed.json)
  content/seed.json  all site content
  public/brand/      official rnrm logos
  public/work/       project screenshots
```
