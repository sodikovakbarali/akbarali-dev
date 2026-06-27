import { SiteLayout } from "@/components/SiteLayout";
import { PageShell, SectionHeader } from "@/components/ui-primitives";
import { Badge } from "@/components/Badge";
import { profile } from "@/data/profile";
import { buildLogEntries } from "@/data/build-log";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Build Log — ${profile.pageTitle}`,
  description:
    "Changelog and build updates from Akbarali Sodikov's exam-tech product development.",
};

export default function BuildLogPage() {
  return (
    <SiteLayout>
      <PageShell>
        <SectionHeader
          number="—"
          eyebrow="Log"
          title="Shipping in public"
          description="Development milestones across IELTS Acer, SAT Acer, and this site."
        />
        <div className="border-2 border-foreground bg-paper">
          {buildLogEntries.map((entry, index) => (
            <article
              key={entry.date + entry.title}
              className={`px-4 py-5 md:px-8 md:py-6 ${
                index !== buildLogEntries.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <time dateTime={entry.date} className="font-mono text-xs text-stamp">
                  {entry.date}
                </time>
                {entry.tags.map((tag) => (
                  <Badge key={tag} variant="muted">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h2 className="mt-3 text-lg font-bold">{entry.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {entry.description}
              </p>
            </article>
          ))}
        </div>
      </PageShell>
    </SiteLayout>
  );
}
