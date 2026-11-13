import { Button } from "@/components/ui";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="stage relative overflow-hidden pb-28 pt-44 text-white">
      <div className="container-page relative">
        <p className="font-display text-8xl font-medium tracking-tight text-brand sm:text-9xl">404</p>
        <h1 className="mt-6 text-4xl sm:text-5xl">We could not find that page.</h1>
        <p className="mt-4 max-w-md text-lg text-white/70">The link may be out of date, or the page may have moved.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" arrow>
            Back to home
          </Button>
          <Button href="/contact" variant="ghost-white">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
