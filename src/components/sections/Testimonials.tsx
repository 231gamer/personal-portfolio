import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import { testimonials } from "@/lib/testimonials";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section id="testimonials">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-10">
          <FadeIn>
            <SectionHeading
              eyebrow="Testimonials"
              title="Trusted for outcomes and an easy process."
              description="These are the two things clients usually worry about: results and reliability. This is what they say after launch."
            />
          </FadeIn>

          <Stagger className="grid gap-4 md:grid-cols-2">
            {testimonials.map((t) => (
              <StaggerItem
                key={t.name}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold tracking-tight">{t.name}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {t.role} • {t.org}
                    </p>
                  </div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border)] bg-black/20">
                    <Quote size={18} />
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--muted-strong)]">
                  “{t.quote}”
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

