"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-tight transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-0 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--brand)] text-white hover:brightness-110 shadow-[0_18px_50px_rgba(79,124,255,0.25)]",
  secondary:
    "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-strong)]",
  ghost:
    "text-[var(--foreground)] hover:bg-[var(--surface)] border border-transparent",
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

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a className={cls} href={href} target={target} rel={rel}>
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

  return (
    <button className={cls} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
}

