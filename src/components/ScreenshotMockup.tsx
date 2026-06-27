import { cn } from "@/lib/utils";
import type { ScreenshotMock } from "@/data/projects";

export function ScreenshotMockup({
  screenshot,
  exhibit = "A",
  className,
}: {
  screenshot: ScreenshotMock;
  exhibit?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "border-2 border-foreground bg-background transition-colors hover:bg-paper",
        className
      )}
    >
      <figcaption className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-stamp">
          Exhibit {exhibit}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">mock</span>
      </figcaption>
      <div className="p-4">
        <p className="font-mono text-xs font-bold uppercase tracking-wide">
          {screenshot.title}
        </p>
        <div className="mt-3 space-y-2 border border-border bg-paper p-3">
          <div className="h-2 w-4/5 bg-border" />
          <div className="h-2 w-3/5 bg-border" />
          <div className="mt-3 grid grid-cols-4 gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square border border-border bg-background" />
            ))}
          </div>
          <div className="mt-2 h-12 border border-dashed border-border" />
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          {screenshot.description}
        </p>
      </div>
    </figure>
  );
}
