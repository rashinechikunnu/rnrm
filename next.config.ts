import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
// Set by the deploy workflow from the GitHub Pages config:
// "/rnrm" on rashinechikunnu.github.io/rnrm, "" on a custom domain.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/rnrm" : "")).replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
