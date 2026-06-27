"use client";

import { FadeIn, GlassCard } from "@/components/ui-primitives";

type StatCardProps = {
  value: string;
  label: string;
  description: string;
  index?: number;
};

export function StatCard({ value, label, description, index = 0 }: StatCardProps) {
  return (
    <FadeIn delay={index * 0.05}>
      <GlassCard className="group p-5 transition-colors hover:border-white/20 hover:bg-white/[0.05] md:p-6">
        <p className="font-mono text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {value}
        </p>
        <p className="mt-1 text-sm font-medium text-foreground">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </GlassCard>
    </FadeIn>
  );
}

export function StatsSection({
  stats,
}: {
  stats: readonly { value: string; label: string; description: string }[];
}) {
  return (
    <section className="px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
