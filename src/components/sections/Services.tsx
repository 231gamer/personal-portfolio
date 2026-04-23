import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Gauge, LayoutTemplate, ShieldCheck } from "lucide-react";

const services = [
  {
    title: "Conversion-focused website",
    bestFor: "Local businesses that need more calls and bookings.",
    icon: LayoutTemplate,
    outcomes: [
      "Clear messaging + structure that guides action",
      "Mobile-first layout with fast load times",
      "Local SEO essentials (service pages + location signals)",
    ],
    includes: [
      "Homepage + 4–6 core pages",
      "Copy guidance + content checklist",
      "Launch-ready analytics + basic event tracking",
    ],
  },
  {
    title: "Landing page + funnel optimization",
    bestFor: "Startups running campaigns or validating a new offer.",
    icon: Gauge,
    outcomes: [
      "Positioning that explains value in 10 seconds",
      "Objection handling (FAQ, proof, comparisons)",
      "Modular sections ready for iteration and testing",
    ],
    includes: [
      "Landing + pricing narrative (if needed)",
      "Lead capture form + event tracking",
      "Fast iterations for 1–2 rounds",
    ],
  },
  {
    title: "Accessibility + performance redesign",
    bestFor: "NGOs and institutions that need trust and inclusivity.",
    icon: ShieldCheck,
    outcomes: [
      "WCAG-aware components (contrast, focus, keyboard)",
      "Cleaner donation / sign-up flows",
      "Performance improvements that help users and SEO",
    ],
    includes: [
      "UX audit + prioritized fixes",
      "Redesigned key pages and components",
      "QA checklist + handoff notes",
    ],
  },
] as const;

export function Services() {
  return (
    <section id="services" className="border-y border-[var(--border)]">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-10">
          <FadeIn>
            <SectionHeading
              eyebrow="Services"
              title="Simple offers, built for results."
              description="Pick what matches your goal. Each package is designed to reduce risk, move fast, and produce measurable outcomes."
            />
          </FadeIn>

          <Stagger className="grid gap-4 lg:grid-cols-3">
            {services.map((s) => (
              <StaggerItem
                key={s.title}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-black/20">
                    <s.icon size={18} />
                  </div>
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  <span className="font-semibold text-[var(--muted-strong)]">
                    Best for:
                  </span>{" "}
                  {s.bestFor}
                </p>

                <div className="mt-5">
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--muted)]">
                    Outcomes
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--muted-strong)]">
                    {s.outcomes.map((o) => (
                      <li key={o} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                        <span className="leading-6">{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 rounded-2xl border border-[var(--border)] bg-black/20 p-4">
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--muted)]">
                    Includes
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                    {s.includes.map((i) => (
                      <li key={i} className="leading-6">
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn>
            <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-semibold tracking-tight">
                  Not sure which offer fits?
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Tell me your goal and I’ll recommend the simplest path.
                </p>
              </div>
              <Button href="#contact" variant="secondary">
                Get a quick recommendation <ArrowRight size={16} />
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

