import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { projects } from "@/lib/projects";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="flex-1">
      <Container className="py-10 sm:py-14">
        <div className="flex items-center justify-between gap-4">
          <Button href="/#projects" variant="ghost">
            <ArrowLeft size={16} /> Back to work
          </Button>
          <Button href="/#contact" variant="secondary">
            Work with me <ArrowRight size={16} />
          </Button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--muted)]">
              {project.type}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
              {project.summary}
            </p>

            <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-sm font-semibold tracking-tight">The problem</p>
              <p className="mt-2 text-sm leading-7 text-[var(--muted-strong)]">
                {project.problem}
              </p>
            </div>

            <div className="mt-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-sm font-semibold tracking-tight">Approach</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                {project.approach.map((a) => (
                  <li key={a} className="flex gap-2">
                    <span className="mt-1.5">
                      <CheckCircle2 size={16} className="text-[var(--accent)]" />
                    </span>
                    <span className="leading-7">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--muted)]">
                Industry
              </p>
              <p className="mt-2 text-sm font-semibold">{project.industry}</p>

              <div className="mt-6">
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--muted)]">
                  Features
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                  {project.features.map((f) => (
                    <li key={f} className="leading-6">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4">
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--muted)]">
                  Results (examples)
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[var(--muted-strong)]">
                  {project.results.map((r) => (
                    <li key={r} className="leading-6">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Button href="/#contact">Get a quote</Button>
                <Button href="/#services" variant="secondary">
                  See services
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}

