import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProjectScreenshot } from "@/data/projects";

export function ProductScreenshot({
  screenshot,
  exhibit = "A",
  className,
  priority = false,
}: {
  screenshot: ProjectScreenshot;
  exhibit?: string;
  className?: string;
  priority?: boolean;
}) {
  const isReal = Boolean(screenshot.src);

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
        <span className="font-mono text-[10px] text-muted-foreground">
          {isReal ? "capture" : "mock"}
        </span>
      </figcaption>

      {isReal && screenshot.src ? (
        <div className="relative aspect-[9/19] w-full max-w-xs mx-auto bg-paper p-3">
          <div className="relative h-full overflow-hidden border-2 border-foreground">
            <Image
              src={screenshot.src}
              alt={screenshot.title}
              fill
              priority={priority}
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="space-y-2 border border-border bg-paper p-3">
            <div className="h-2 w-4/5 bg-border" />
            <div className="h-2 w-3/5 bg-border" />
            <div className="mt-3 grid grid-cols-4 gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square border border-border bg-background" />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-border p-4">
        <p className="font-mono text-xs font-bold uppercase tracking-wide">
          {screenshot.title}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {screenshot.description}
        </p>
      </div>
    </figure>
  );
}
