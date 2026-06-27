"use client";

import Link from "next/link";
import { Code2, Link2, Mail, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { FadeIn, GlassCard } from "@/components/ui-primitives";

export function ContactCTA({ showAvailability = true }: { showAvailability?: boolean }) {
  return (
    <FadeIn>
      <GlassCard className="relative overflow-hidden p-6 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-violet-500/10" />
        <div className="relative">
          <h2 className="text-2xl font-semibold md:text-3xl">Get in touch</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">{profile.contact.intro}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-xl">
              <Link href={profile.links.telegram} target="_blank" rel="noopener noreferrer">
                <Send className="mr-2 h-4 w-4" />
                Telegram
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl border-white/10 bg-white/5">
              <Link href={profile.links.github} target="_blank" rel="noopener noreferrer">
                <Code2 className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl border-white/10 bg-white/5">
              <Link href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                <Link2 className="mr-2 h-4 w-4" />
                LinkedIn
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl border-white/10 bg-white/5">
              <Link href={profile.links.email}>
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Link>
            </Button>
          </div>

          {showAvailability && (
            <div className="mt-8">
              <p className="text-sm font-medium text-foreground">Available for:</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {profile.contact.availability.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </GlassCard>
    </FadeIn>
  );
}
