"use client";

import type { TimelineItem } from "@/data/timeline";
import { FadeIn, GlassCard } from "@/components/ui-primitives";

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/50 via-white/10 to-transparent md:left-1/2 md:-translate-x-px" />
      <div className="space-y-6">
        {items.map((item, index) => (
          <FadeIn key={`${item.year}-${item.title}`} delay={index * 0.08}>
            <div
              className={`relative flex flex-col gap-4 md:flex-row md:items-start ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="hidden md:block md:w-1/2" />
              <div className="absolute left-0 top-3 z-10 h-3.5 w-3.5 rounded-full border-2 border-emerald-400 bg-background md:left-1/2 md:-translate-x-1/2" />
              <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                <GlassCard className="p-5 transition-colors hover:border-white/20 md:p-6">
                  <p className="font-mono text-xs font-medium text-emerald-400">{item.year}</p>
                  <h3 className="mt-1 text-base font-semibold text-foreground md:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </GlassCard>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
