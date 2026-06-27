import Link from "next/link";
import { Code2, Link2, Mail, Send } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="text-sm font-semibold text-foreground">{profile.siteName}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile.name} · {profile.location}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Code2 className="h-4 w-4" />
            GitHub
          </Link>
          <Link
            href={profile.links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Send className="h-4 w-4" />
            Telegram
          </Link>
          <Link
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Link2 className="h-4 w-4" />
            LinkedIn
          </Link>
          <Link
            href={profile.links.email}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
            Email
          </Link>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js.
      </div>
    </footer>
  );
}
