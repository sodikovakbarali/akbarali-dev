import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/Badge";
import { DossierPanel } from "@/components/ui-primitives";
import { ScreenshotMockup } from "@/components/ScreenshotMockup";

function statusVariant(status: Project["status"]) {
  if (status === "live") return "live";
  if (status === "development") return "development";
  return "muted";
}

function projectStripe(status: Project["status"]): "teal" | "navy" | "neutral" {
  if (status === "live") return "teal";
  if (status === "development") return "navy";
  return "neutral";
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
      <DossierPanel stripe="neutral" className="p-6 md:p-8">
        <span className="font-mono text-xs text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Badge variant="muted" className="ml-3">
          {project.statusLabel}
        </Badge>
        <h3 className="mt-4 text-xl font-bold md:text-2xl">{project.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
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
      </DossierPanel>
    );
  }

  return (
    <DossierPanel stripe={projectStripe(project.status)} className="p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Badge variant={statusVariant(project.status)}>
              {project.statusLabel}
            </Badge>
          </div>
          <h3 className="mt-4 text-xl font-bold md:text-2xl">{project.name}</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {project.tagline}
          </p>
        </div>
        {project.url && (
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 border-2 border-foreground p-2 transition-colors hover:bg-foreground hover:text-paper"
            aria-label={`Visit ${project.name}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      {!compact && project.screenshots.length > 0 && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {project.screenshots.slice(0, 2).map((screenshot, i) => (
            <ScreenshotMockup
              key={screenshot.title}
              screenshot={screenshot}
              exhibit={`${String.fromCharCode(65 + i)}`}
            />
          ))}
        </div>
      )}

      <Link
        href="/projects"
        className="mt-6 inline-block font-mono text-xs uppercase tracking-widest text-stamp underline decoration-2 underline-offset-4 hover:text-foreground"
      >
        Full dossier →
      </Link>
    </DossierPanel>
  );
}
