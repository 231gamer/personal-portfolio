"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/Motion";
import { siteConfig } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";
import { useMemo, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  const wa = useMemo(
    () => whatsappLink(siteConfig.whatsapp.phoneE164, siteConfig.whatsapp.prefill),
    [],
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error ?? "Something went wrong.");
      }

      setStatus("success");
      (e.currentTarget as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="border-y border-[var(--border)]">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeIn>
            <SectionHeading
              eyebrow="Contact"
              title="Get a quote in 24 hours (or less)."
              description="Tell me what you’re trying to achieve. I’ll reply with the best path, timeline, and next steps—no fluff."
            />

            <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-sm font-semibold tracking-tight">What happens next</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                {[
                  "I review your goal and current site (if you have one).",
                  "You get a clear recommendation + timeline and estimate range.",
                  "If it’s a fit, we schedule a quick call and start.",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5">
                      <CheckCircle2 size={16} className="text-[var(--accent)]" />
                    </span>
                    <span className="leading-7">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href={wa} target="_blank" rel="noreferrer" variant="secondary">
                  WhatsApp me <MessageCircle size={16} />
                </Button>
                <Button href={`mailto:${siteConfig.email}`} variant="ghost">
                  Email: {siteConfig.email}
                </Button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]">
              <p className="text-sm font-semibold tracking-tight">Project details</p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                The more context you share, the faster I can recommend the right path.
              </p>

              <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                {/* Honeypot */}
                <input
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" placeholder="Your name" required />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                  />
                </div>

                <Field
                  label="Website (optional)"
                  name="website"
                  placeholder="https://"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Select
                    label="Project type"
                    name="projectType"
                    options={[
                      "Conversion-focused website",
                      "Landing page + funnel",
                      "Redesign (accessibility + performance)",
                      "Not sure yet",
                    ]}
                    required
                  />
                  <Field
                    label="Industry"
                    name="industry"
                    placeholder="Clinic, salon, SaaS, NGO..."
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Select
                    label="Primary goal"
                    name="primaryGoal"
                    options={[
                      "More leads / inquiries",
                      "More bookings / calls",
                      "More sign-ups / demos",
                      "More donations / volunteers",
                      "Other",
                    ]}
                    required
                  />
                  <Select
                    label="Timeline"
                    name="timeline"
                    options={[
                      "ASAP (1–2 weeks)",
                      "Soon (2–4 weeks)",
                      "This quarter",
                      "Exploring options",
                    ]}
                    required
                  />
                </div>

                <Select
                  label="Budget range (optional)"
                  name="budget"
                  options={[
                    "Under $1,500",
                    "$1,500–$3,000",
                    "$3,000–$6,000",
                    "$6,000+",
                    "Not sure",
                  ]}
                />

                <Textarea
                  label="Message"
                  name="message"
                  placeholder="What’s not working today? What would success look like?"
                  required
                />

                {status === "error" ? (
                  <p className="text-sm text-red-200">{error}</p>
                ) : null}
                {status === "success" ? (
                  <p className="text-sm text-[var(--muted-strong)]">
                    Thanks—message received. I’ll reply soon.
                  </p>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <>
                        Sending <Loader2 className="animate-spin" size={16} />
                      </>
                    ) : (
                      <>
                        Send request <Send size={16} />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-[var(--muted)]">
                    Prefer WhatsApp? Use the button on the left.
                  </p>
                </div>
              </form>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--muted)]">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-11 rounded-2xl border border-[var(--border)] bg-black/20 px-4 text-sm text-[var(--foreground)] placeholder:text-[rgba(234,240,255,0.45)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--muted)]">
        {label}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="h-11 rounded-2xl border border-[var(--border)] bg-black/20 px-4 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0b1220]">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Textarea({
  label,
  name,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--muted)]">
        {label}
      </span>
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        rows={5}
        className="rounded-2xl border border-[var(--border)] bg-black/20 px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[rgba(234,240,255,0.45)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
      />
    </label>
  );
}

