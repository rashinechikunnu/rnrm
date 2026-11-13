# rnrm Technology — Company Website

Corporate website for rnrm Technology with a content-managed back end.

| Part | Stack | Folder |
| --- | --- | --- |
| Website | Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion, Lucide | `frontend/` |
| API + admin dashboard | Python, Django, Django REST Framework, PostgreSQL | `backend/` |

## Run locally

Open two terminals.

**1. Back end** (http://127.0.0.1:8000)

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed           # roles + starter content
python manage.py createsuperuser
python manage.py runserver
```

**2. Front end** (http://localhost:3000)

```bash
cd frontend
npm install
npm run dev
```

The website reads its content from the API. If the API is not running it falls back to
`frontend/content/seed.json`, so pages always render.

## Admin dashboard

Sign in at http://127.0.0.1:8000/admin/ to manage:

- Projects (with screenshots, case-study text, live link, featured flag)
- Services
- SaaS products (features, pricing, screenshots, website link)
- Blog posts (draft / published, SEO fields)
- Contact enquiries (status + internal notes; submitted details are read-only)
- Testimonials (the home-page section appears once the first one is published)
- Website content (hero text, contact email, WhatsApp number, social links)

Changes appear on the website within about a minute.

### Roles

`python manage.py seed` creates three groups. Create a user under **Users**, tick **Staff status**, and add them to a group:

| Group | Can do |
| --- | --- |
| Administrator | Everything in the website dashboard |
| Content Editor | Manage projects, services, products, blog, testimonials, website content |
| Sales | View and update contact enquiries; view projects, products, services |

Only superusers can manage users and groups.

## Configuration

Copy the example files and fill them in:

- `backend/.env.example` → `backend/.env`
- `frontend/.env.example` → `frontend/.env.local`

Things to set before going live:

- **Contact details** — in the admin under *Website content*: `contact_email`, `whatsapp_number`
  (digits with country code, e.g. `919876543210`), and the social links.
- **PostgreSQL** — set `DATABASE_URL=postgres://user:password@host:5432/dbname` in `backend/.env`.
  Without it, Django uses a local SQLite file (development only).
- **Production security** — `DJANGO_DEBUG=false`, a real `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`,
  and `CORS_ALLOWED_ORIGINS` set to the website's address. HTTPS redirect, HSTS and secure cookies
  switch on automatically when debug is off.
- **Site address** — `NEXT_PUBLIC_SITE_URL` (used for canonical URLs, sitemap and Open Graph).
- **Google Analytics** — set `NEXT_PUBLIC_GA_ID` to enable GA4; nothing loads when it is empty.
- **Enquiry emails** — set the `EMAIL_*` values and `ENQUIRY_NOTIFY_EMAILS` to be notified of new enquiries.

## Project structure

```
backend/
  config/            settings, URL routing
  core/              models, REST API, admin, seed command
frontend/
  app/               pages: /, /about, /services, /projects, /products, /blog, /contact, /privacy, /terms
                     + sitemap.xml, robots.txt, Open Graph image, icons
  components/        reusable UI (Navbar, Footer, cards, hero visual, contact form…)
  lib/               API client, types, site config
  content/seed.json  starter content (also the offline fallback)
  public/brand/      official rnrm logos
```

## API

| Endpoint | Purpose |
| --- | --- |
| `GET /api/services/` | Services |
| `GET /api/projects/` · `/api/projects/<slug>/` | Projects (`?featured=1`) |
| `GET /api/products/` | SaaS products |
| `GET /api/posts/` · `/api/posts/<slug>/` | Published blog posts |
| `GET /api/testimonials/` | Testimonials |
| `GET /api/content/` | Website content key/values |
| `POST /api/enquiries/` | Contact form (validated, rate-limited, honeypot-protected) |
