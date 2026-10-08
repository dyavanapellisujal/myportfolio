import type { Flow } from "@/lib/types";

/**
 * Architecture diagram as semantic HTML: an ordered list of stages, each a box
 * of components, joined by arrows. Readable by screen readers, zero JS, and
 * it reflows to a vertical pipeline on narrow screens.
 */
export function FlowDiagram({ flow }: { flow: Flow }) {
  return (
    <figure className="card overflow-hidden">
      <ol className="flex flex-col items-stretch gap-0 p-4 md:flex-row md:p-5">
        {flow.stages.map((stage, i) => (
          <li key={stage.title} className="flex flex-col items-stretch md:flex-1 md:flex-row">
            <div className="flex-1 rounded-md border border-line-strong bg-raised p-3">
              <p className="mb-2 font-mono text-xs font-medium text-accent">{stage.title}</p>
              <ul className="space-y-1 text-[0.8rem] leading-snug text-muted">
                {stage.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            {i < flow.stages.length - 1 && (
              <span aria-hidden className="flex items-center justify-center py-1.5 font-mono text-faint md:px-2 md:py-0">
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>
      {flow.caption && (
        <figcaption className="border-t border-line px-5 py-2.5 font-mono text-xs text-faint">{flow.caption}</figcaption>
      )}
    </figure>
  );
}
