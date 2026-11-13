import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Inter_Tight } from "next/font/google";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { MotionProvider } from "@/components/Reveal";
import { Analytics, OrganizationJsonLd, WhatsAppButton } from "@/components/sections";
import { getContent } from "@/lib/api";
import { site, whatsappLink } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const display = Inter_Tight({ variable: "--font-display-face", subsets: ["latin"], display: "swap", weight: ["500", "600"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Custom Software, Web & SaaS Development`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "software development company India",
    "custom software development",
    "web application development",
    "SaaS product development",
    "mobile app development",
    "API integration",
    "business automation",
    "rnrm Technology",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: "/",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.tagline}`, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#E60019", width: "device-width", initialScale: 1 };

/** Supplies the navbar's contact menu with the details managed in the admin. */
async function SiteNavbar() {
  const content = await getContent();
  return <Navbar email={content.contact_email} whatsappHref={whatsappLink(content.whatsapp_number)} />;
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <MotionProvider>
          <Suspense>
            <SiteNavbar />
          </Suspense>
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </MotionProvider>
        <OrganizationJsonLd />
        <Analytics />
      </body>
    </html>
  );
}
