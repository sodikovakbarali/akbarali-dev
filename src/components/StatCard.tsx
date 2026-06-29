export function StatCard({
  value,
  label,
  description,
  isLast = false,
}: {
  value: string;
  label: string;
  description: string;
  isLast?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-center px-4 py-5 md:px-6 md:py-6 ${
        !isLast ? "border-b border-border md:border-b-0 md:border-r md:border-border" : ""
      }`}
    >
      <p className="font-mono text-2xl font-bold tabular-nums text-foreground md:text-3xl">
        {value}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-stamp">
        {label}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

export function StatsSection({
  stats,
  note,
}: {
  stats: readonly { value: string; label: string; description: string }[];
  note?: string;
}) {
  return (
    <section className="border-b-2 border-foreground bg-background">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="grid grid-cols-2 border-x-2 border-t-2 border-foreground md:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} isLast={i === stats.length - 1} />
          ))}
        </div>
        {note && (
          <p className="border-x-2 border-b-2 border-foreground px-4 py-3 text-center text-xs text-muted-foreground md:px-6">
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
