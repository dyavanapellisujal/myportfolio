import Link from "next/link";
import type { Article, Project, Role } from "@/lib/types";
import { getProject } from "@/lib/projects";
import { ExternalLink, Tag, TagList, formatMonth } from "@/components/ui";

/** Featured project: problem → approach → stack, with a link to its case study. */
export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <article id={project.slug} className="card flex flex-col p-5 transition-colors hover:border-line-strong">
      <h3 className="text-base font-semibold tracking-tight text-fg">
        <Link href={`/projects/${project.slug}/`} className="hover:text-accent">
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.problem}</p>
      <p className="mt-3 text-sm leading-relaxed text-fg/90">{project.approach}</p>
      <div className="mt-4">
        <TagList items={project.tech.slice(0, 7)} label="Technologies" />
      </div>
      <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-5 font-mono text-xs">
        <Link href={`/projects/${project.slug}/`} className="text-accent hover:text-accent-strong">
          case study →
        </Link>
        <ExternalLink href={project.repoUrl} className="text-muted hover:text-fg">
          source
        </ExternalLink>
      </div>
    </article>
  );
}

/** Compact entry for non-featured projects. */
export function ProjectRow({ project }: { project: Project }) {
  return (
    <li id={project.slug} className="grid gap-2 border-t border-line py-5 first:border-t-0 sm:grid-cols-[1fr_auto] sm:gap-6">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[0.95rem] font-medium text-fg">{project.title}</h3>
          {project.fork && <Tag tone="caution">fork{project.parent ? ` of ${project.parent}` : ""}</Tag>}
          {project.uncurated && <Tag>from GitHub</Tag>}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {project.problem} {project.approach}
        </p>
        {project.contribution && (
          <p className="mt-1.5 text-sm leading-relaxed text-fg/90">
            <span className="font-mono text-xs text-faint">my part: </span>
            {project.contribution}
          </p>
        )}
        <div className="mt-2.5">
          <TagList items={project.tech} label="Technologies" />
        </div>
      </div>
      <div className="flex gap-4 font-mono text-xs sm:flex-col sm:items-end sm:gap-1.5 sm:pt-0.5">
        <ExternalLink href={project.repoUrl} className="text-muted hover:text-fg">
          repo
        </ExternalLink>
        {project.related?.map((l) => (
          <ExternalLink key={l.href} href={l.href} className="text-muted hover:text-fg">
            {l.label.toLowerCase()}
          </ExternalLink>
        ))}
      </div>
    </li>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="card flex flex-col overflow-hidden transition-colors hover:border-line-strong">
      {article.cover ? (
        // Static export: plain <img> with intrinsic aspect ratio and lazy loading.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.cover}
          alt=""
          loading="lazy"
          decoding="async"
          width={960}
          height={500}
          className="aspect-[96/50] w-full border-b border-line object-cover object-top opacity-90"
        />
      ) : (
        <div aria-hidden className="flex aspect-[96/50] items-end border-b border-line bg-raised p-4">
          <span className="font-mono text-xs text-faint">{article.category.toLowerCase()}</span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <p className="eyebrow">
          {formatMonth(article.date)} · {article.source === "github" ? "GitHub write-up" : "Medium"}
        </p>
        <h3 className="mt-1.5 text-[0.95rem] font-medium leading-snug text-fg">
          <ExternalLink href={article.url} className="hover:text-accent" arrow={false}>
            {article.title}
          </ExternalLink>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{article.summary}</p>
      </div>
    </article>
  );
}

export function ArticleRow({ article }: { article: Article }) {
  return (
    <li className="grid gap-1 border-t border-line py-4 first:border-t-0 sm:grid-cols-[6.5rem_1fr] sm:gap-6">
      <p className="font-mono text-xs text-faint sm:pt-1">
        <time dateTime={article.date}>{formatMonth(article.date)}</time>
      </p>
      <div>
        <h3 className="text-[0.95rem] font-medium leading-snug text-fg">
          <ExternalLink href={article.url} className="hover:text-accent">
            {article.title}
          </ExternalLink>
          {article.source === "github" && (
            <span className="ml-2 align-middle">
              <Tag>GitHub write-up</Tag>
            </span>
          )}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{article.summary}</p>
        {article.related && getProject(article.related) && (
          <p className="mt-1.5 font-mono text-xs">
            <Link href={`/projects/${article.related}/`} className="text-faint hover:text-accent">
              related project →
            </Link>
          </p>
        )}
      </div>
    </li>
  );
}

export function RoleEntry({ role, compact = false }: { role: Role; compact?: boolean }) {
  const shown = role.highlights.filter((h) => !h.resumeOnly);
  const highlights = compact ? shown.slice(0, 2) : shown;
  return (
    <article className="grid gap-3 border-t border-line py-7 first:border-t-0 md:grid-cols-[11rem_1fr] md:gap-8">
      <div>
        <p className="font-mono text-xs text-faint">
          {role.start} – {role.end}
        </p>
        <p className="mt-1 text-xs text-faint">{role.location}</p>
      </div>
      <div>
        <h3 className="text-base font-semibold text-fg">
          {role.role} <span className="font-normal text-muted">· {role.company}</span>
        </h3>
        <ul className="prose-list mt-3 space-y-2.5 text-sm leading-relaxed text-muted">
          {highlights.map((h) => (
            <li key={h.text}>
              {h.metric && (
                <span className="mr-2 rounded bg-accent/10 px-1.5 py-0.5 font-mono text-xs font-semibold text-accent">
                  {h.metric}
                </span>
              )}
              {h.text}
            </li>
          ))}
        </ul>
        {!compact && (
          <div className="mt-4">
            <TagList items={role.tech} label="Technologies" />
          </div>
        )}
      </div>
    </article>
  );
}
