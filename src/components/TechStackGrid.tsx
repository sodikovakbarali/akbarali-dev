"use client";

import type { StackGroup } from "@/data/stack";
import { Badge } from "@/components/Badge";
import { FadeIn, GlassCard } from "@/components/ui-primitives";

export function TechStackGrid({ groups }: { groups: StackGroup[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((group, index) => (
        <FadeIn key={group.category} delay={index * 0.06}>
          <GlassCard className="h-full p-5 transition-colors hover:border-white/20 md:p-6">
            <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {group.category}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item} variant="muted">
                  {item}
                </Badge>
              ))}
            </div>
          </GlassCard>
        </FadeIn>
      ))}
    </div>
  );
}
