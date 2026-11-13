import Image from "next/image";
import { Check, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CtaBanner } from "@/components/sections";
import { Button, PageHero, Tag } from "@/components/ui";
import { getProducts } from "@/lib/api";
import { pageMeta } from "@/lib/site";
import type { Product } from "@/lib/types";

export const metadata = pageMeta({
  title: "Products",
  description: "SaaS products designed, built and operated by rnrm Technology — software for workflows, billing and everyday business operations.",
  path: "/products",
});

const statusLabel: Record<Product["status"], string> = { live: "Available now", beta: "In beta", coming_soon: "Coming soon" };

/** Stand-in artwork until real product screenshots are uploaded in the admin. */
function ProductMock({ name }: { name: string }) {
  return (
    <div aria-hidden className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink">
      <span className="absolute -right-24 -top-24 size-80 rounded-full bg-brand" />
      <span className="absolute -right-10 -top-10 size-80 rounded-full border border-white/15" />
      <div className="absolute inset-x-[8%] bottom-0 top-[16%] rounded-t-2xl bg-white p-5 shadow-lift">
        <div className="flex items-center justify-between">
          <span className="font-display text-sm text-ink">{name}</span>
          <span className="flex gap-1.5">
            <span className="h-2 w-8 rounded-full bg-ink/10" />
            <span className="h-2 w-8 rounded-full bg-brand" />
          </span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`rounded-xl p-3 ${i === 0 ? "bg-brand text-white" : "bg-mist"}`}>
              <span className={`block h-1.5 w-10 rounded-full ${i === 0 ? "bg-white/50" : "bg-ink/15"}`} />
              <span className={`mt-3 block h-4 w-14 rounded-full ${i === 0 ? "bg-white" : "bg-ink/70"}`} />
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-line p-3">
              <span className={`size-5 rounded-full ${i % 2 ? "bg-brand-tint" : "bg-brand"}`} />
              <span className="h-2 flex-1 rounded-full bg-ink/10" />
              <span className="h-2 w-12 rounded-full bg-ink/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <PageHero
        eyebrow="Our products"
        title="Software we build, run and stand behind ourselves."
        text="Alongside client work, rnrm Technology develops its own SaaS products — shaped by the problems we see businesses face every day."
      />

      {products.length === 0 && (
        <section className="py-20">
          <p className="container-page text-lg text-body">Our first products are in development. Contact us to hear about early access.</p>
        </section>
      )}

      {products.map((product, i) => (
        <section key={product.slug} id={product.slug} className={`scroll-mt-24 py-20 sm:py-28 ${i % 2 === 1 ? "bg-mist" : "bg-white"}`}>
          <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
              {product.cover ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-mist">
                  <Image src={product.cover} alt={`${product.name} screenshot`} fill unoptimized sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </div>
              ) : (
                <ProductMock name={product.name} />
              )}
              {product.screenshots.length > 0 && (
                <ul className="mt-4 grid grid-cols-3 gap-4">
                  {product.screenshots.slice(0, 3).map((shot) => (
                    <li key={shot.image} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-mist">
                      <Image src={shot.image} alt={shot.caption || `${product.name} screenshot`} fill unoptimized sizes="20vw" className="object-cover" />
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>

            <Reveal delay={0.1}>
              <Tag tone="brand">{statusLabel[product.status]}</Tag>
              <h2 className="mt-5 text-4xl leading-[1.05] sm:text-5xl">{product.name}</h2>
              <p className="mt-3 font-display text-xl font-medium text-ink">{product.tagline}</p>
              <p className="mt-5 text-lg leading-relaxed text-body">{product.description}</p>

              <ul className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li key={feature.title} className="flex gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-xl bg-brand text-white">
                      <Check aria-hidden className="size-3.5" strokeWidth={3} />
                    </span>
                    <span>
                      <span className="block">{feature.title}</span>
                      <span className="mt-1 block text-[0.95rem] leading-relaxed text-body">{feature.text}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Pricing</p>
                  <p className="mt-1 font-display text-lg">{product.pricing || "Contact us for pricing"}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.website_url && (
                    <Button href={product.website_url} external variant="outline">
                      Visit website
                      <ExternalLink aria-hidden className="size-4" />
                    </Button>
                  )}
                  <Button href={`/contact?service=${encodeURIComponent(product.name)}`} arrow>
                    {product.status === "live" ? "Enquire now" : "Request early access"}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <CtaBanner title="Need a product like this, built for you?" text="The same team that builds our products can design and build yours — from MVP to a platform your customers pay for." />
    </>
  );
}
