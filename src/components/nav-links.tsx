"use client";

// The only client component on the site: it marks the current page with
// aria-current. Everything else is server-rendered to static HTML.

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { readonly href: string; readonly label: string };

export function NavLinks({
  items,
  className,
  itemClassName = "",
}: {
  items: readonly Item[];
  className?: string;
  itemClassName?: string;
}) {
  const pathname = usePathname() ?? "/";
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, "")));

  return (
    <ul className={className}>
      {items.map((item) => {
        const active = isActive(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              // Client-side navigation keeps the header mounted, so close the mobile <details> menu.
              onClick={(e) => e.currentTarget.closest("details")?.removeAttribute("open")}
              className={`${itemClassName} transition-colors ${active ? "text-fg" : "text-muted hover:text-fg"}`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
