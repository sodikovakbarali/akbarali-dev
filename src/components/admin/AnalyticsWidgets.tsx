import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string | number;
  hint?: string;
  accent?: "stamp" | "navy" | "teal";
}) {
  const stripe = {
    stamp: "border-l-stamp",
    navy: "border-l-navy",
    teal: "border-l-[#0D7377]",
  }[accent ?? "stamp"];

  return (
    <div
      className={cn(
        "border-2 border-foreground bg-paper p-5",
        "border-l-4",
        stripe
      )}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold tabular-nums">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function RankList({
  title,
  items,
  valueKey = "count",
  labelKey = "label",
}: {
  title: string;
  items: Record<string, string | number>[];
  valueKey?: string;
  labelKey?: string;
}) {
  const max = Math.max(...items.map((i) => Number(i[valueKey]) || 0), 1);

  return (
    <div className="border-2 border-foreground bg-paper p-5">
      <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.length === 0 && (
          <li className="text-sm text-muted-foreground">No data yet</li>
        )}
        {items.map((item, i) => {
          const label = String(item[labelKey]);
          const count = Number(item[valueKey]);
          const pct = Math.round((count / max) * 100);
          return (
            <li key={`${label}-${i}`}>
              <div className="mb-1 flex justify-between gap-2 text-sm">
                <span className="truncate font-medium" title={label}>
                  {label}
                </span>
                <span className="shrink-0 font-mono tabular-nums text-muted-foreground">
                  {count}
                </span>
              </div>
              <div className="h-1.5 bg-secondary">
                <div
                  className="h-full bg-stamp transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function DailyChart({
  data,
}: {
  data: { date: string; count: number }[];
}) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const recent = data.slice(-14);

  return (
    <div className="border-2 border-foreground bg-paper p-5">
      <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Page views over time
      </h3>
      {recent.length === 0 ? (
        <p className="text-sm text-muted-foreground">No data yet</p>
      ) : (
        <div className="flex h-40 items-end gap-1">
          {recent.map((d) => (
            <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full bg-navy transition-all"
                style={{ height: `${Math.max((d.count / max) * 100, 4)}%` }}
                title={`${d.date}: ${d.count}`}
              />
              <span className="font-mono text-[9px] text-muted-foreground">
                {d.date.slice(5)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
