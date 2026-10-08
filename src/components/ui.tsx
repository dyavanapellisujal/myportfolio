import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-5xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  action,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-t border-line py-14 sm:py-16 ${className}`}>
      <Container>
        {(eyebrow || title) && (
          <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
              {title && <h2 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">{title}</h2>}
              {intro && <div className="mt-3 text-[0.95rem] leading-relaxed text-muted">{intro}</div>}
            </div>
            {action}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <Container className="pt-14 pb-10 sm:pt-20">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{title}</h1>
      {children && <div className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{children}</div>}
    </Container>
  );
}

export function Tag({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" | "caution" }) {
  const tones = {
    default: "border-line text-muted",
    accent: "border-accent/30 text-accent",
    caution: "border-caution/40 text-caution",
  } as const;
  return (
    <span className={`inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[0.7rem] leading-tight ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function TagList({ items, label }: { items: readonly string[]; label?: string }) {
  if (!items.length) return null;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={label}>
      {items.map((t) => (
        <li key={t}>
          <Tag>{t}</Tag>
        </li>
      ))}
    </ul>
  );
}

/** External link that opens in a new tab and never leaks the referrer/opener. */
export function ExternalLink({
  href,
  children,
  className = "link",
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      {arrow && (
        <span aria-hidden className="ml-0.5 text-faint">
          ↗
        </span>
      )}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "secondary",
  external = false,
  download,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  download?: string | boolean;
}) {
  const cls =
    variant === "primary"
      ? "inline-flex items-center gap-1.5 rounded-md bg-fg px-3.5 py-2 text-sm font-medium text-bg transition-colors hover:bg-accent-strong"
      : "inline-flex items-center gap-1.5 rounded-md border border-line-strong px-3.5 py-2 text-sm font-medium text-fg transition-colors hover:border-accent/60";
  if (external || download) {
    return (
      <a
        href={href}
        className={cls}
        {...(download ? { download: download === true ? "" : download } : { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-mono text-xs text-muted transition-colors hover:text-accent">
      {children} →
    </Link>
  );
}

export const formatMonth = (iso: string) =>
  new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
