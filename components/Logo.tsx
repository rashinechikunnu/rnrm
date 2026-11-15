import Image from "next/image";

/**
 * The official rnrm marks, used untouched.
 *  - "red":  red ring + red wordmark — for white / light backgrounds
 *  - "disc": solid red disc + white wordmark — for red / dark backgrounds
 */
export function Logo({ variant = "red", size = 44, priority = false }: { variant?: "red" | "disc"; size?: number; priority?: boolean }) {
  return (
    <Image
      src={variant === "red" ? "/brand/rnrm-ring.png" : "/brand/rnrm-disc.png"}
      alt="rnrm Technology logo"
      width={size}
      height={size}
      priority={priority}
      className="shrink-0 select-none"
    />
  );
}

export function LogoLockup({ variant = "red", size = 44, priority = false }: { variant?: "red" | "disc"; size?: number; priority?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <Logo variant={variant} size={size} priority={priority} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.1rem] font-semibold tracking-tight ${variant === "red" ? "text-ink" : "text-white"}`}>rnrm</span>
        <span className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] ${variant === "red" ? "text-muted" : "text-white/60"}`}>Technology</span>
      </span>
    </span>
  );
}
