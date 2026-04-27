import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import { projects } from "@/lib/projects";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ExternalLink } from "lucide-react";

export function Projects() {
  return (
    <section id="projects">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-10">
          <FadeIn>
            <SectionHeading
              eyebrow="Projects"
              title="Proof that I can solve real business problems."
              description="Each case study shows the problem, constraints, and the decisions that improved clarity, trust, and conversion."
            />
          </FadeIn>

          <Stagger className="grid gap-4 lg:grid-cols-3">
            {projects.map((p) => (
              <StaggerItem
                key={p.slug}
                className="group rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]">
                    <p.icon size={18} />
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--muted)]">
                      {p.type}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted)]">{p.industry}</p>
                  </div>
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {p.summary}
                </p>

                <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4">
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--muted)]">
                    What I solved
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
                    {p.problem}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.features.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1 text-xs text-[var(--muted)]"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <Button href={`/projects/${p.slug}`} variant="secondary">
                    Read case study <ArrowRight size={16} />
                  </Button>
                  <span className="inline-flex items-center gap-1 text-xs text-[var(--muted)] opacity-70 group-hover:opacity-100 transition">
                    Preview <ExternalLink size={14} />
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn>
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold tracking-tight">
                    Want results like these on your site?
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Share your goal and I’ll map the simplest conversion path.
                  </p>
                </div>
                <Button href="#contact">
                  Start a project <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

