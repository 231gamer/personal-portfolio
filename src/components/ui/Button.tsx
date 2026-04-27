"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-tight transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:opacity-60 disabled:pointer-events-none";

/* ----------------------------------
   VARIANTS (ALIGNED TO DESIGN SYSTEM)
---------------------------------- */
const variants: Record<ButtonVariant, string> = {
  /* PRIMARY — MAIN CTA */
  primary:
    "bg-[#2EC4B6] text-[#1A1A2E] shadow-[0_12px_30px_rgba(46,196,182,0.35)] " +
    "hover:brightness-110 hover:shadow-[0_16px_40px_rgba(46,196,182,0.45)]",

  /* SECONDARY — GLASS BUTTON */
  secondary:
    "border border-[rgba(46,196,182,0.2)] bg-white/5 text-white backdrop-blur-md " +
    "hover:bg-[#2EC4B6]/10 hover:border-[#2EC4B6]/40",

  /* GHOST — MINIMAL */
  ghost:
    "text-white/70 border border-transparent " +
    "hover:text-white hover:bg-[#2EC4B6]/10",
};

export function Button({
  href,
  onClick,
  variant = "primary",
  className,
  children,
  target,
  rel,
  type = "button",
  disabled,
}: {
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const cls = cn(base, variants[variant], className);

  /* ----------------------------------
     LINK HANDLING
  ---------------------------------- */
  if (href) {
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return (
        <a
          className={cls}
          href={href}
          target={target}
          rel={rel || "noopener noreferrer"}
        >
          {children}
        </a>
      );
    }

    return (
      <Link className={cls} href={href}>
        {children}
      </Link>
    );
  }

  /* ----------------------------------
     BUTTON
  ---------------------------------- */
  return (
    <button
      className={cls}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}