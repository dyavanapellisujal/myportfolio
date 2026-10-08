import Link from "next/link";
import { nav, site } from "@/content/site";
import { NavLinks } from "@/components/nav-links";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/75">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-fg focus:px-3 focus:py-1.5 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex items-baseline gap-2 whitespace-nowrap">
          <span className="text-sm font-semibold tracking-tight text-fg">{site.name}</span>
          <span className="hidden font-mono text-xs text-faint sm:inline">platform · devops</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <NavLinks items={nav} className="flex items-center gap-5 text-[0.85rem]" />
        </nav>

        {/* No-JS mobile menu */}
        <details className="group relative lg:hidden">
          <summary
            className="cursor-pointer rounded border border-line px-2.5 py-1 font-mono text-xs text-muted hover:text-fg"
            aria-label="Open navigation menu"
          >
            <span className="group-open:hidden">menu</span>
            <span className="hidden group-open:inline">close</span>
          </summary>
          <nav
            aria-label="Primary"
            className="absolute right-0 top-10 w-52 rounded-md border border-line bg-surface p-2 shadow-2xl shadow-black/50"
          >
            <NavLinks items={nav} className="flex flex-col text-sm" itemClassName="block rounded px-3 py-2 hover:bg-raised" />
          </nav>
        </details>
      </div>
    </header>
  );
}
