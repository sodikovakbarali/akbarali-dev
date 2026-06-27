"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/Badge";
import { FadeIn, GlassCard } from "@/components/ui-primitives";
import { ScreenshotMockup } from "@/components/ScreenshotMockup";
import { cn } from "@/lib/utils";

function statusVariant(status: Project["status"]) {
  if (status === "live") return "live";
  if (status === "development") return "development";
  return "muted";
}

export function ProjectDetailCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  if (project.status === "coming-soon") {
    return (
      <FadeIn delay={index * 0.1}>
        <GlassCard className="p-6 md:p-10">
          <Badge variant="muted">{project.statusLabel}</Badge>
          <h2 className="mt-4 text-2xl font-semibold md:text-3xl">{project.name}</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">{project.description}</p>
          {project.upcoming && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.upcoming.map((item) => (
                <Badge key={item} variant="muted">
                  {item}
                </Badge>
              ))}
            </div>
          )}
        </GlassCard>
      </FadeIn>
    );
  }

  return (
    <FadeIn delay={index * 0.1}>
      <article id={project.id} className="scroll-mt-24">
        <GlassCard className="overflow-hidden">
          <div
            className={cn(
              "border-b border-white/5 bg-gradient-to-br p-6 md:p-10",
              project.accent
            )}
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={statusVariant(project.status)}>
                {project.statusLabel}
              </Badge>
              {project.badges.map((badge) => (
                <Badge key={badge} variant="muted">
                  {badge}
                </Badge>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold md:text-4xl">{project.name}</h2>
                <p className="mt-3 max-w-3xl text-base text-muted-foreground md:text-lg">
                  {project.tagline}
                </p>
              </div>
              {project.url && (
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:border-white/20 hover:bg-white/10"
                >
                  Visit site
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          <div className="space-y-10 p-6 md:p-10">
            <div>
              <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Overview
              </h3>
              <p className="mt-3 max-w-3xl leading-relaxed text-foreground/90">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Features
              </h3>
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground/90">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  Tech Stack
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="muted">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  Role & Proof
                </h3>
                <p className="mt-4 text-sm text-foreground/90">
                  <span className="font-medium text-foreground">Role:</span> {project.role}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{project.proof}</p>
              </div>
            </div>

            {project.screenshots.length > 0 && (
              <div>
                <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  Product Previews
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Mock UI previews only — no real student or credential data.
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {project.screenshots.map((screenshot) => (
                    <ScreenshotMockup key={screenshot.title} screenshot={screenshot} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </article>
    </FadeIn>
  );
}
