import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { ProjectCard } from "@/components/ProjectCard";
import { StatsSection } from "@/components/StatCard";
import { Timeline } from "@/components/Timeline";
import { TechStackGrid } from "@/components/TechStackGrid";
import { CurrentlyBuilding } from "@/components/CurrentlyBuilding";
import { ContactCTA } from "@/components/ContactCTA";
import { PageShell, SectionHeader } from "@/components/ui-primitives";
import { SiteLayout } from "@/components/SiteLayout";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { timeline } from "@/data/timeline";
import { stackGroups } from "@/data/stack";

export default function HomePage() {
  return (
    <SiteLayout>
      <HeroSection />
      <StatsSection stats={profile.stats} />

      <PageShell>
        <section id="projects">
          <SectionHeader
            number="01"
            eyebrow="Products"
            title="Exam-tech products that ship"
            description="Real education technology platforms built for students, teachers, and learning centers."
          />
          <div className="space-y-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          <Link
            href="/projects"
            className="mt-8 inline-block font-mono text-xs uppercase tracking-widest text-stamp underline decoration-2 underline-offset-4"
          >
            Open full project dossier →
          </Link>
        </section>
      </PageShell>

      <PageShell className="border-t-2 border-foreground pt-0 md:pt-0">
        <section id="record">
          <SectionHeader
            number="02"
            eyebrow="Record"
            title="Proof of work timeline"
            description="From scholarship to CS degree to building exam-tech products in Uzbekistan."
          />
          <Timeline items={timeline} />
        </section>
      </PageShell>

      <PageShell className="border-t-2 border-foreground pt-0 md:pt-0">
        <section id="stack">
          <SectionHeader
            number="03"
            eyebrow="Stack"
            title="Systems & tools"
            description="Frontend, backend, desktop, AI, infrastructure, and product capabilities."
          />
          <TechStackGrid groups={stackGroups} />
        </section>
      </PageShell>

      <PageShell className="border-t-2 border-foreground pt-0 md:pt-0">
        <section>
          <SectionHeader
            number="04"
            eyebrow="Active"
            title="Currently building"
            description="Focus areas across IELTS Acer, SAT Acer, and upcoming experiments."
          />
          <CurrentlyBuilding />
        </section>
      </PageShell>

      <PageShell className="border-t-2 border-foreground pt-0 md:pt-0">
        <ContactCTA />
      </PageShell>
    </SiteLayout>
  );
}
