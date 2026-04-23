import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <Container className="py-16 sm:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <FadeIn>
              <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold tracking-tight text-[var(--muted)]">
                <Sparkles size={14} />
                Websites built to convert (not just look nice)
              </p>
            </FadeIn>

            <FadeIn delay={0.06}>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
                Turn your website into a steady source of leads and bookings.
              </h1>
            </FadeIn>

            <FadeIn delay={0.12}>
              <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
                I design and build fast, mobile-first websites for small businesses,
                startups, and nonprofits—focused on clear messaging, great UX, and
                measurable conversion.
              </p>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="#contact">
                  Get a quote <ArrowRight size={16} />
                </Button>
                <Button href="#projects" variant="secondary">
                  View work
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.24}>
              <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <p className="text-sm font-semibold tracking-tight">
                    +Performance
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                    Faster load + better mobile UX.
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <p className="text-sm font-semibold tracking-tight">
                    +Clarity
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                    Messaging that drives action.
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <p className="text-sm font-semibold tracking-tight">+Trust</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                    Proof, process, and clean delivery.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:pt-6">
            <FadeIn>
              <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold tracking-tight">
                    Recent results (examples)
                  </p>
                  <p className="text-xs text-[var(--muted)]">Realistic targets</p>
                </div>

                <Stagger className="mt-6 grid gap-3">
                  <StaggerItem className="rounded-2xl border border-[var(--border)] bg-black/20 p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(79,124,255,0.18)] text-[var(--foreground)]">
                        <Zap size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold tracking-tight">
                          Faster mobile load
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                          Optimized images + layout for better UX and SEO basics.
                        </p>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem className="rounded-2xl border border-[var(--border)] bg-black/20 p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(30,227,207,0.16)] text-[var(--foreground)]">
                        <ShieldCheck size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold tracking-tight">
                          More trust at first glance
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                          Strong hero, proof strip, and clear next step.
                        </p>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem className="rounded-2xl border border-[var(--border)] bg-black/20 p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(255,255,255,0.08)] text-[var(--foreground)]">
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold tracking-tight">
                          Clear offers
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                          Productized services that make hiring simple.
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                </Stagger>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--muted)]">
                  Proof strip
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    "Local service sites",
                    "Startup landing pages",
                    "NGO donation flows",
                    "Accessibility-first UI",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-[var(--border)] bg-black/20 px-3 py-3 text-xs font-semibold text-[var(--muted-strong)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}

