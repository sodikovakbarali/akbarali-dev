import Link from "next/link";
import { profile } from "@/data/profile";

export function ContactCTA({ showAvailability = true }: { showAvailability?: boolean }) {
  const links = [
    { label: "Telegram", href: profile.links.telegram },
    { label: "GitHub", href: profile.links.github },
    { label: "LinkedIn", href: profile.links.linkedin },
    { label: "Email", href: profile.links.email },
  ];

  return (
    <div className="border-2 border-foreground bg-paper">
      <div className="border-b-2 border-foreground p-6 md:p-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Inquiry
        </p>
        <h2 className="mt-3 text-2xl font-bold md:text-3xl">Get in touch</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">{profile.contact.intro}</p>
      </div>

      <div className="grid sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            className="border-b border-r border-border px-6 py-5 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-foreground hover:text-paper sm:[&:nth-child(2)]:border-r-0 sm:[&:nth-child(3)]:border-b-0"
          >
            {link.label} →
          </Link>
        ))}
      </div>

      {showAvailability && (
        <div className="border-t-2 border-foreground p-6 md:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Available for
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {profile.contact.availability.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-2 h-1 w-4 shrink-0 bg-stamp" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
