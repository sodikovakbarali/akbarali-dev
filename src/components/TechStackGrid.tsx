import type { StackGroup } from "@/data/stack";
import { Badge } from "@/components/Badge";

export function TechStackGrid({ groups }: { groups: StackGroup[] }) {
  return (
    <div className="grid gap-0 border-2 border-foreground md:grid-cols-2">
      {groups.map((group, index) => (
        <div
          key={group.category}
          className={`bg-paper p-6 md:p-8 ${
            index % 2 === 0 ? "md:border-r md:border-border" : ""
          } ${index < groups.length - 2 ? "border-b border-border" : ""} ${
            index === groups.length - 2 && groups.length % 2 === 0
              ? "md:border-b md:border-border"
              : ""
          }`}
        >
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-stamp">
            {group.category}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <Badge key={item} variant="muted">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
