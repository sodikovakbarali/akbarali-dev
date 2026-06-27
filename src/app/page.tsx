import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { ProjectCard } from "@/components/ProjectCard";
import { StatsSection } from "@/components/StatCard";
import { Timeline } from "@/components/Timeline";
import { TechStackGrid } from "@/components/TechStackGrid";
import { CurrentlyBuilding } from "@/components/CurrentlyBuilding";
import { ContactCTA } from "@/components/ContactCTA";
import { SectionHeader } from "@/components/ui-primitives";
import { SiteLayout } from "@/components/SiteLayout";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { timeline } from "@/data/timeline";
import { stackGroups } from "@/data/stack";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <SiteLayout>
      <HeroSection />

      <StatsSection stats={profile.stats} />

      <section id="projects" className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Products"
            title="Exam-tech products that ship"
            description="Real education technology platforms built for students, teachers, and learning centers."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="rounded-xl border-white/10 bg-white/5">
              <Link href="/projects">View all project details</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Proof of Work"
            title="Timeline"
            description="From scholarship to CS degree to building exam-tech products in Uzbekistan."
          />
          <Timeline items={timeline} />
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Stack"
            title="Tech stack"
            description="Tools and systems used across frontend, backend, desktop, AI, and infrastructure."
          />
          <TechStackGrid groups={stackGroups} />
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Now"
            title="Currently building"
            description="Active focus areas across IELTS Acer, SAT Acer, and upcoming experiments."
          />
          <CurrentlyBuilding />
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <ContactCTA />
        </div>
      </section>
    </SiteLayout>
  );
}
