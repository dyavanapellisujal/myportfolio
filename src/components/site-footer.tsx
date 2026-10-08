import { site } from "@/content/site";
import { Container, ExternalLink } from "@/components/ui";

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-10 text-sm text-faint">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.name} · {site.role}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li>
            <a href={`mailto:${site.email}`} className="hover:text-fg">Email</a>
          </li>
          <li>
            <ExternalLink href={site.links.github} className="hover:text-fg">GitHub</ExternalLink>
          </li>
          <li>
            <ExternalLink href={site.links.linkedin} className="hover:text-fg">LinkedIn</ExternalLink>
          </li>
          <li>
            <ExternalLink href={site.links.medium} className="hover:text-fg">Medium</ExternalLink>
          </li>
          <li>
            <a href={site.resumePdf} className="hover:text-fg">Resume (PDF)</a>
          </li>
        </ul>
      </Container>
      <Container className="mt-4">
        <p className="font-mono text-xs">Static site · Next.js export · no trackers, no cookies.</p>
      </Container>
    </footer>
  );
}
