"use client";

import Link from "next/link";
import { ArrowDown, Code2, MapPin, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui-primitives";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 md:px-6 md:pb-28 md:pt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -right-32 top-32 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              {profile.title}
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-emerald-400/90">
            {profile.name}
          </p>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {profile.headline}
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {profile.subheadline}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground/80 md:text-base">
            {profile.heroCopy}
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-xl">
              <Link href="/projects">View Projects</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl border-white/10 bg-white/5">
              <Link href="/contact">Contact Me</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-xl">
              <Link href={profile.links.github} target="_blank" rel="noopener noreferrer">
                <Code2 className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-xl">
              <Link href={profile.links.telegram} target="_blank" rel="noopener noreferrer">
                <Send className="mr-2 h-4 w-4" />
                Telegram
              </Link>
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.5} className="mt-16 flex justify-center">
          <Link
            href="#projects"
            className="flex flex-col items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>Scroll to explore</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
