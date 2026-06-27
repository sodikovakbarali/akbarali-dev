import type { Metadata } from "next";
import { ProjectDetailCard } from "@/components/ProjectDetailCard";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionHeader } from "@/components/ui-primitives";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: `Projects — ${profile.pageTitle}`,
  description:
    "Detailed breakdown of IELTS Acer, SAT Acer, and upcoming exam-tech products by Akbarali Sodikov.",
};

export default function ProjectsPage() {
  return (
    <SiteLayout>
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Projects"
            title="Product portfolio"
            description="Deep dives into exam-tech platforms — features, stack, proof, and mock UI previews."
          />
          <div className="space-y-10">
            {projects.map((project, index) => (
              <ProjectDetailCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
