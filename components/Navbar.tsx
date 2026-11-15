"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Mail, Menu, MessageCircle, Send, X } from "lucide-react";
import { navLinks } from "@/lib/site";
import { LogoLockup } from "./Logo";
import { Button } from "./ui";

/**
 * Every page opens on the dark stage, so the bar starts transparent with white
 * text and the disc logo, then turns solid white (red logo) once you scroll.
 *
 * Below the `lg` breakpoint the page links sit in a second, always-visible row,
 * and the toggle opens a small "Let's Talk" menu with the contact options.
 */
export function Navbar({ email, whatsappHref }: { email: string; whatsappHref: string }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname; // navigating to another page closes the menu
  const solid = scrolled || open;
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    const onPointer = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpenOn(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const linkClass = (href: string) =>
    isActive(href) ? (solid ? "text-brand" : "text-white") : solid ? "text-ink/70 hover:text-ink" : "text-white/70 hover:text-white";

  const links = (size: "desktop" | "mobile") =>
    navLinks.map((link, i) => (
      <span key={link.href} className="flex shrink-0 items-center">
        {i > 0 && <span aria-hidden className={`h-3.5 w-px ${solid ? "bg-line" : "bg-white/20"}`} />}
        <Link
          href={link.href}
          aria-current={isActive(link.href) ? "page" : undefined}
          className={`whitespace-nowrap font-medium transition-colors ${size === "desktop" ? "px-4 py-2 text-sm" : "px-1.5 py-3 text-[0.8rem] sm:px-3.5 sm:text-sm"} ${linkClass(link.href)}`}
        >
          {link.label}
          {isActive(link.href) && <span aria-hidden className="ml-1.5 inline-block size-1.5 -translate-y-0.5 rounded-full bg-brand" />}
        </Link>
      </span>
    ));

  const contactOptions = [
    { href: "/contact", label: "Start a Project", note: "Send us your brief", icon: Send, external: false },
    { href: whatsappHref, label: "WhatsApp", note: "Chat with us directly", icon: MessageCircle, external: true },
    { href: `mailto:${email}`, label: "Email", note: email, icon: Mail, external: false },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
        solid ? "border-line bg-white/95 shadow-[0_8px_30px_-18px_rgb(17_17_17/0.3)] backdrop-blur-md" : "border-white/10 bg-transparent"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>

      {/* Row 1: logo, desktop links, contact */}
      <div className="container-page flex h-[4.25rem] items-center justify-between gap-6 lg:h-[4.75rem]">
        <Link href="/" aria-label="rnrm Technology — home" className="rounded-full">
          <LogoLockup variant={solid ? "red" : "disc"} size={46} priority />
        </Link>

        <nav aria-label="Main" className="hidden items-center lg:flex">
          {links("desktop")}
        </nav>

        <span className="hidden lg:block">
          <Button href="/contact" variant={solid ? "primary" : "ghost-white"} arrow className="h-11">
            Let’s Talk
          </Button>
        </span>

        {/* Mobile: the toggle opens the contact menu */}
        <div ref={menuRef} className="relative lg:hidden">
          <button
            type="button"
            onClick={() => setOpenOn(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="contact-menu"
            className={`flex h-11 items-center gap-2 rounded-xl pl-4 pr-3 text-sm font-semibold ${solid ? "bg-brand text-white" : "glass text-white"}`}
          >
            Let’s Talk
            {open ? <X aria-hidden className="size-4" /> : <Menu aria-hidden className="size-4" />}
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                id="contact-menu"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-[calc(100%+0.6rem)] w-[min(19rem,calc(100vw-2.5rem))] origin-top-right rounded-2xl border border-line bg-white p-2 shadow-lift"
              >
                <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Connect with us</p>
                <ul>
                  {contactOptions.map((option) => (
                    <li key={option.label}>
                      <a
                        href={option.href}
                        {...(option.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        onClick={() => setOpenOn(null)}
                        className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-panel"
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand text-white">
                          <option.icon aria-hidden className="size-[1.1rem]" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[0.95rem] font-semibold text-ink">{option.label}</span>
                          <span className="block truncate text-xs text-muted">{option.note}</span>
                        </span>
                        <ArrowUpRight aria-hidden className="size-4 shrink-0 text-muted transition-colors group-hover:text-brand" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Row 2 (mobile and tablet): page links, always visible, scrolls sideways if it runs out of room */}
      <nav aria-label="Pages" className={`border-t lg:hidden ${solid ? "border-line" : "border-white/10"}`}>
        <div className="container-page flex items-center justify-between overflow-x-auto !px-3.5 [scrollbar-width:none] sm:justify-start sm:!px-6 [&::-webkit-scrollbar]:hidden">{links("mobile")}</div>
      </nav>
    </header>
  );
}
