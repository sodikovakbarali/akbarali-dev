"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/ui/button";
import { FadeIn, GlassCard } from "@/components/ui-primitives";
import { ScreenshotMockup } from "@/components/ScreenshotMockup";
import { cn } from "@/lib/utils";

function statusVariant(status: Project["status"]) {
  if (status === "live") return "live";
  if (status === "development") return "development";
  return "muted";
}

export function ProjectCard({
  project,
  index = 0,
  compact = false,
}: {
  project: Project;
  index?: number;
  compact?: boolean;
}) {
  if (project.status === "coming-soon") {
    return (
      <FadeIn delay={index * 0.1}>
        <GlassCard className="relative overflow-hidden p-6 md:p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/5 to-transparent" />
          <div className="relative">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-muted-foreground" />
              <Badge variant="muted">{project.statusLabel}</Badge>
            </div>
            <h3 className="text-xl font-semibold text-foreground md:text-2xl">
              {project.name}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              {project.tagline}
            </p>
            {project.upcoming && (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.upcoming.map((item) => (
                  <Badge key={item} variant="muted">
                    {item}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </GlassCard>
      </FadeIn>
    );
  }

  return (
    <FadeIn delay={index * 0.1}>
      <GlassCard
        className={cn(
          "group relative overflow-hidden transition-all hover:border-white/20",
          compact ? "p-5 md:p-6" : "p-6 md:p-8"
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60",
            project.accent
          )}
        />
        <div className="relative">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge variant={statusVariant(project.status)}>
              {project.statusLabel}
            </Badge>
            {project.badges.slice(0, compact ? 2 : 3).map((badge) => (
              <Badge key={badge} variant="muted">
                {badge}
              </Badge>
            ))}
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-foreground md:text-2xl">
                {project.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                {project.tagline}
              </p>
            </div>
            {project.url && (
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-lg border border-white/10 p-2 text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          {!compact && project.screenshots.length > 0 && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {project.screenshots.slice(0, 2).map((screenshot) => (
                <ScreenshotMockup key={screenshot.title} screenshot={screenshot} />
              ))}
            </div>
          )}

          <div className="mt-6">
            <Button asChild variant="outline" size="sm" className="rounded-lg border-white/10 bg-white/5">
              <Link href="/projects">View details</Link>
            </Button>
          </div>
        </div>
      </GlassCard>
    </FadeIn>
  );
}
