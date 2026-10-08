import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="eyebrow mb-3">404</p>
      <h1 className="text-2xl font-semibold text-fg">This page doesn&apos;t exist.</h1>
      <p className="mt-3 text-muted">
        Try the{" "}
        <Link href="/projects/" className="link">
          projects
        </Link>{" "}
        or go{" "}
        <Link href="/" className="link">
          home
        </Link>
        .
      </p>
    </Container>
  );
}
