import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import { CheckCircle2, MessageSquare, PencilRuler, Rocket, Shield } from "lucide-react";

const steps = [
  {
    title: "1) Discovery + goals",
    icon: MessageSquare,
    text: "We clarify your audience, primary action (calls/bookings/donations), and what’s currently blocking conversions.",
  },
  {
    title: "2) Structure + copy guidance",
    icon: PencilRuler,
    text: "I map the page flow and help you shape messaging so visitors understand value fast and know what to do next.",
  },
  {
    title: "3) Design + build",
    icon: Rocket,
    text: "Mobile-first UI, performance-first build, and clean components that scale as your business grows.",
  },
  {
    title: "4) QA + launch",
    icon: Shield,
    text: "Accessibility checks, responsive QA, and a launch checklist so the site is stable, trackable, and ready to convert.",
  },
] as const;

export function About() {
  return (
    <section id="about" className="border-y border-[var(--border)]">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeIn>
            <SectionHeading
              eyebrow="About"
              title="You’re not hiring “a developer.” You’re hiring a reliable partner."
              description="I work best with teams and owners who want clarity, speed, and measurable outcomes—not vague deliverables."
            />

            <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-sm font-semibold tracking-tight">
                How I keep projects low-stress
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                {[
                  "Clear scope + deliverables (no surprises)",
                  "Fast communication and short feedback loops",
                  "Performance and accessibility baked in from day one",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5">
                      <CheckCircle2 size={16} className="text-[var(--accent)]" />
                    </span>
                    <span className="leading-7">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <Stagger className="grid gap-4">
            {steps.map((s) => (
              <StaggerItem
                key={s.title}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-black/20">
                    <s.icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-tight">{s.title}</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                      {s.text}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

