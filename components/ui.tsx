import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Sparkle } from "lucide-react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "white" | "ghost-white" | "dark";
  /** Shows the square arrow chip at the end of the button. */
  arrow?: boolean;
  external?: boolean;
  className?: string;
};

const buttonStyles: Record<NonNullable<ButtonProps["variant"]>, { base: string; chip: string }> = {
  primary: { base: "bg-brand text-white hover:bg-brand-dark", chip: "bg-white text-brand" },
  dark: { base: "bg-ink text-white hover:bg-brand", chip: "bg-white text-ink" },
  outline: { base: "border border-line bg-white text-ink hover:border-ink/40", chip: "bg-panel text-ink group-hover:bg-brand group-hover:text-white" },
  white: { base: "bg-white text-ink hover:bg-ink hover:text-white", chip: "bg-brand text-white" },
  "ghost-white": { base: "glass text-white hover:bg-white/15", chip: "bg-white text-ink" },
};

export function Button({ href, children, variant = "primary", arrow = false, external = false, className = "" }: ButtonProps) {
  const style = buttonStyles[variant];
  const classes = `group inline-flex h-12 items-center justify-center gap-3 rounded-xl text-[0.9rem] font-semibold transition-colors duration-200 ${arrow ? "pl-5 pr-1.5" : "px-5"} ${style.base} ${className}`;
  const content = (
    <>
      <span className="inline-flex items-center gap-2">{children}</span>
      {arrow && (
        <span className={`grid size-9 shrink-0 place-items-center rounded-lg transition-colors duration-200 ${style.chip}`}>
          <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:rotate-45" />
        </span>
      )}
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

/** Two-part label that introduces a section: a dark badge plus a short note. */
export function Pill({ label, note, tone = "light" }: { label: string; note?: string; tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full p-1 text-xs ${note ? "pr-4" : ""} ${
        tone === "dark" ? "glass text-white/75" : "border border-line bg-white text-body shadow-card"
      }`}
    >
      <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 font-semibold ${tone === "dark" ? "bg-white text-ink" : "bg-ink text-white"}`}>
        <Sparkle aria-hidden className="size-3 fill-brand text-brand" />
        {label}
      </span>
      {note}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  note,
  title,
  text,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  note?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Pill label={eyebrow} note={note} tone={tone} />}
      <h2 className={`mt-6 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem] ${tone === "dark" ? "text-white" : "text-ink"}`}>{title}</h2>
      {text && <p className={`mt-5 text-lg leading-relaxed ${align === "center" ? "mx-auto max-w-xl" : "max-w-xl"} ${tone === "dark" ? "text-white/70" : "text-body"}`}>{text}</p>}
    </div>
  );
}

/** Inner-page header on the dark stage. */
export function PageHero({ eyebrow, note, title, text, children }: { eyebrow: string; note?: string; title: string; text: string; children?: ReactNode }) {
  return (
    <section className="stage relative overflow-hidden pb-16 pt-36 text-white sm:pb-24 sm:pt-44">
      <div className="container-page relative grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
        <div>
          <Pill label={eyebrow} note={note} tone="dark" />
          <h1 className="mt-6 max-w-3xl text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.25rem]">{title}</h1>
        </div>
        <div>
          <p className="max-w-md text-lg leading-relaxed text-white/75">{text}</p>
          {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function Tag({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" | "brand" }) {
  const tones = {
    light: "border-line bg-white text-body",
    dark: "border-white/15 bg-white/10 text-white/85",
    brand: "border-transparent bg-brand-tint text-brand-dark",
  };
  return <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}
