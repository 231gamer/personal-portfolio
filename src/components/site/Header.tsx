"use client";

import Link from "next/link";
import { navItems } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

/* ----------------------------------
   NAV CONTAINER
---------------------------------- */
function NavContainer({ children }: { children: React.ReactNode }) {
  return <nav className="hidden flex-1 justify-center md:flex">{children}</nav>;
}

/* ----------------------------------
   NAV ITEM
---------------------------------- */
function NavItem({
  label,
  href,
  active,
  onClick,
}: {
  label: string;
  href: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
        active
          ? "bg-[#2EC4B6]/20 text-white shadow-[0_0_20px_rgba(46,196,182,0.25)]"
          : "text-white/60 hover:text-white hover:bg-[#2EC4B6]/10"
      )}
    >
      {label}
    </Link>
  );
}

/* ----------------------------------
   AVATAR
---------------------------------- */
function AvatarIcon() {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#2EC4B6]/40 to-[#1A1A2E]/40 text-sm font-bold text-white shadow-[0_12px_30px_rgba(46,196,182,0.25)] ring-1 ring-[#2EC4B6]/20">
      AG
    </span>
  );
}

/* ----------------------------------
   STATUS BADGE
---------------------------------- */
function StatusBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-sm ring-1 ring-white/10">
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.15)]" />
      Available
    </span>
  );
}

/* ----------------------------------
   HEADER
---------------------------------- */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("#top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const updateHash = () => setActiveHash(window.location.hash || "#top");

    onScroll();
    updateHash();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <Container className="py-4">
        {/* MAIN NAV */}
        <div
          className={cn(
            "flex items-center justify-between gap-6 rounded-2xl border px-6 py-3 backdrop-blur-xl transition-all duration-300",
            "border-[rgba(46,196,182,0.15)] bg-[rgba(20,24,45,0.6)]",
            "shadow-[0_20px_60px_rgba(0,0,0,0.25)]",
            scrolled && "shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
          )}
        >
          {/* LOGO */}
          <Link
            href="#top"
            className="inline-flex items-center gap-3 rounded-xl border border-[rgba(46,196,182,0.2)] bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:border-[#2EC4B6]/40 hover:bg-[#2EC4B6]/10"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2EC4B6]/20 text-white">
              AG
            </span>
            <span className="hidden sm:inline">AG Web Studio</span>
          </Link>

          {/* NAV LINKS */}
          <NavContainer>
            <div className="flex items-center gap-4">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={
                    activeHash === item.href ||
                    (item.href === "#top" && activeHash === "#top")
                  }
                  onClick={() => setOpen(false)}
                />
              ))}
            </div>
          </NavContainer>

          {/* RIGHT SECTION */}
          <div className="hidden items-center gap-3 md:flex">
            <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(46,196,182,0.2)] bg-white/5 px-4 py-2 backdrop-blur-md">
              <AvatarIcon />
              <StatusBadge />
            </div>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(46,196,182,0.2)] bg-white/5 text-white transition hover:bg-[#2EC4B6]/10"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="mt-4 rounded-2xl border border-[rgba(46,196,182,0.15)] bg-[rgba(20,24,45,0.85)] p-4 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-white/70 transition hover:bg-[#2EC4B6]/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-2">
                <div className="flex items-center justify-between rounded-xl border border-[rgba(46,196,182,0.2)] bg-white/5 p-3">
                  <AvatarIcon />
                  <StatusBadge />
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}