import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
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

export function ProjectDetailCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  if (project.status === "coming-soon") {
    return (
      <DossierPanel stripe="neutral" className="p-6 md:p-10">
        <Badge variant="muted">{project.statusLabel}</Badge>
        <h2 className="mt-4 text-2xl font-bold md:text-3xl">{project.name}</h2>
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
      </DossierPanel>
    );
  }

  return (
    <article id={project.id} className="scroll-mt-24">
      <DossierPanel stripe={projectStripe(project.status)}>
        <div className="border-b-2 border-foreground p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm text-muted-foreground">
              Case {String(index + 1).padStart(2, "0")}
            </span>
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
              <h2 className="text-2xl font-bold md:text-4xl">{project.name}</h2>
              <p className="mt-3 max-w-3xl text-base text-muted-foreground md:text-lg">
                {project.tagline}
              </p>
            </div>
            {project.url && (
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 border-2 border-foreground px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-foreground hover:text-paper"
              >
                Visit
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>

        <div className="space-y-10 p-6 md:p-10">
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Overview
            </h3>
            <p className="mt-4 max-w-3xl leading-relaxed">{project.description}</p>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Capabilities
            </h3>
            <ul className="mt-4 grid gap-2 md:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-stamp" strokeWidth={3} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-8 border-t border-border pt-8 md:grid-cols-2">
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Stack
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
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Role & traction
              </h3>
              <p className="mt-4 text-sm">
                <span className="font-mono text-[10px] uppercase tracking-widest text-stamp">
                  Role
                </span>
                <br />
                {project.role}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">{project.proof}</p>
            </div>
          </div>

          {project.screenshots.length > 0 && (
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Exhibits
              </h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Mock UI only — no real student or credential data.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.screenshots.map((screenshot, i) => (
                  <ScreenshotMockup
                    key={screenshot.title}
                    screenshot={screenshot}
                    exhibit={String.fromCharCode(65 + i)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </DossierPanel>
    </article>
  );
}
