import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t-2 border-foreground bg-paper">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            End of record
          </p>
          <p className="mt-2 text-sm font-bold">{profile.siteName}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile.name} · {profile.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest">
          <Link href={profile.links.telegram} className="hover:text-stamp hover:underline">
            Telegram
          </Link>
          <Link href={profile.links.github} className="hover:text-stamp hover:underline">
            GitHub
          </Link>
          <Link href={profile.links.linkedin} className="hover:text-stamp hover:underline">
            LinkedIn
          </Link>
          <Link href={profile.links.email} className="hover:text-stamp hover:underline">
            Email
          </Link>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}
      </div>
    </footer>
  );
}
