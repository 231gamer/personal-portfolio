import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex-1">
      <Container className="py-16 sm:py-20">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            This page doesn’t exist. Head back to the homepage.
          </p>
          <div className="mt-6">
            <Button href="/" variant="secondary">
              Back home
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}

