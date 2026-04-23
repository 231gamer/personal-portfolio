import { Container } from "@/components/ui/Container";
import { navItems, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <Container className="py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              <span className="font-semibold tracking-tight">{siteConfig.name}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Fast, mobile-first websites that turn visitors into inquiries, bookings,
              and sign-ups.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--muted)]">
                Navigate
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--muted)]">
                Contact
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                <li>
                  <a
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition"
                    href={`mailto:${siteConfig.email}`}
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition"
                    href="#contact"
                  >
                    Get a quote
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--muted)]">
                Promise
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Clear deliverables, fast communication, and a website built to convert.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[var(--border)] pt-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Built with Next.js • Performance-first • Mobile-first</p>
        </div>
      </Container>
    </footer>
  );
}

