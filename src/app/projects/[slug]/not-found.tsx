import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex-1">
      <Container className="py-16 sm:py-20">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Project not found
          </h1>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            This case study doesn’t exist. Head back to the projects section.
          </p>
          <div className="mt-6">
            <Button href="/#projects" variant="secondary">
              Back to projects
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}

