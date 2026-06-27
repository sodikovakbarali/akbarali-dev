import type { TimelineItem } from "@/data/timeline";

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="border-2 border-foreground bg-paper">
      {items.map((item, index) => (
        <div
          key={`${item.year}-${item.title}`}
          className={`grid grid-cols-[4.5rem_1fr] gap-4 px-4 py-5 md:grid-cols-[6rem_1fr] md:gap-8 md:px-8 md:py-6 ${
            index !== items.length - 1 ? "border-b border-border" : ""
          }`}
        >
          <time
            dateTime={item.year}
            className="font-mono text-sm font-bold tabular-nums text-stamp md:text-base"
          >
            {item.year}
          </time>
          <div>
            <h3 className="text-base font-bold md:text-lg">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
