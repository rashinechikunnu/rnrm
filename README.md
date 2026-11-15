# rnrm Technology — Official Website

Corporate website for **rnrm Technology**, built with Next.js (App Router), React, TypeScript, and Tailwind CSS, statically exported and hosted on **GitHub Pages**.

- **Live Website:** [https://rashinechikunnu.github.io/rnrm/](https://rashinechikunnu.github.io/rnrm/)
- **Repository:** [rashinechikunnu/rnrm](https://github.com/rashinechikunnu/rnrm)

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (Static HTML Export `output: 'export'`)
- **UI & Components:** React 19, TypeScript, Lucide Icons, Framer Motion
- **Styling:** Tailwind CSS
- **Deployment:** GitHub Pages via GitHub Actions

---

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build & Static Export

To build the static website locally:

```bash
npm run build
```

This compiles all routes into static HTML, CSS, JavaScript, and asset bundles inside the `./out` directory with the `/rnrm` base path.

---

## Automated GitHub Pages Deployment

The website deploys automatically on every push to the `main` branch using the GitHub Actions workflow in `.github/workflows/deploy.yml`.

### One-Time Setup in GitHub Repository:
1. Navigate to your repository on GitHub: `https://github.com/rashinechikunnu/rnrm`
2. Go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
4. Push your changes to `main` — GitHub Actions will automatically build and deploy the website.
