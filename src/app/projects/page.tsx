import { ProjectDetailCard } from "@/components/ProjectDetailCard";
import { SiteLayout } from "@/components/SiteLayout";
import { PageShell, SectionHeader } from "@/components/ui-primitives";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Projects — ${profile.pageTitle}`,
  description:
    "Detailed breakdown of IELTS Acer, SAT Acer, and upcoming exam-tech products by Akbarali Sodikov.",
};

export default function ProjectsPage() {
  return (
    <SiteLayout>
      <PageShell>
        <SectionHeader
          number="—"
          eyebrow="Dossier"
          title="Product portfolio"
          description="Case files for exam-tech platforms — capabilities, stack, traction, and mock exhibits."
        />
        <div className="space-y-10">
          {projects.map((project, index) => (
            <ProjectDetailCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </PageShell>
    </SiteLayout>
  );
}
