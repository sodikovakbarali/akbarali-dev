"use client";

import { profile } from "@/data/profile";
import { FadeIn, GlassCard } from "@/components/ui-primitives";

export function CurrentlyBuilding() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {profile.currentlyBuilding.map((item, index) => (
        <FadeIn key={item.name} delay={index * 0.08}>
          <GlassCard className="h-full p-5 transition-colors hover:border-white/20 md:p-6">
            <p className="font-mono text-xs text-emerald-400">{item.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </GlassCard>
        </FadeIn>
      ))}
    </div>
  );
}
