import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/Badge";
import { DossierPanel } from "@/components/ui-primitives";
import { ProductScreenshot } from "@/components/ProductScreenshot";
import { LogoMark } from "@/components/LogoMark";

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
    <DossierPanel stripe={projectStripe(project.status)} className="overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_auto]">
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {project.logo && (
                <LogoMark src={project.logo} alt={`${project.name} logo`} size="sm" />
              )}
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

          {!compact && project.screenshots.length > 0 && !project.heroImage && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {project.screenshots.slice(0, 2).map((screenshot, i) => (
                <ProductScreenshot
                  key={screenshot.title}
                  screenshot={screenshot}
                  exhibit={`${String.fromCharCode(65 + i)}`}
                />
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {project.url && (
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-foreground bg-foreground px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper transition-opacity hover:opacity-90"
              >
                Visit {project.name}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}
            <Link
              href="/projects"
              className="font-mono text-xs uppercase tracking-widest text-stamp underline decoration-2 underline-offset-4 hover:text-foreground"
            >
              Full dossier →
            </Link>
          </div>
        </div>

        {project.heroImage && (
          <div className="border-t-2 border-foreground bg-background p-4 lg:w-56 lg:border-l-2 lg:border-t-0 xl:w-64">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Live product
            </p>
            <div className="relative mx-auto aspect-[9/19] max-w-[200px] overflow-hidden border-2 border-foreground">
              <Image
                src={project.heroImage}
                alt={`${project.name} mobile landing`}
                fill
                className="object-cover object-top"
                sizes="200px"
                priority={index === 0}
              />
            </div>
          </div>
        )}
      </div>
    </DossierPanel>
  );
}
