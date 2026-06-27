import type { Metadata } from "next";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionHeader, GlassCard, FadeIn } from "@/components/ui-primitives";
import { Badge } from "@/components/Badge";
import { profile } from "@/data/profile";
import { buildLogEntries } from "@/data/build-log";

export const metadata: Metadata = {
  title: `Build Log — ${profile.pageTitle}`,
  description:
    "Changelog and build updates from Akbarali Sodikov's exam-tech product development.",
};

export default function BuildLogPage() {
  return (
    <SiteLayout>
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            eyebrow="Build Log"
            title="Shipping in public"
            description="Placeholder build log entries documenting product development milestones."
          />
          <div className="space-y-4">
            {buildLogEntries.map((entry, index) => (
              <FadeIn key={entry.date + entry.title} delay={index * 0.06}>
                <GlassCard className="p-5 transition-colors hover:border-white/20 md:p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <time
                      dateTime={entry.date}
                      className="font-mono text-xs text-emerald-400"
                    >
                      {entry.date}
                    </time>
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <Badge key={tag} variant="muted">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-foreground">
                    {entry.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {entry.description}
                  </p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
