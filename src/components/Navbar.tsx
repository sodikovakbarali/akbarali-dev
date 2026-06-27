"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/build-log", label: "Build Log" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b-2 border-foreground bg-paper">
      <div className="mx-auto max-w-5xl px-4 py-5 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Link href="/" className="group">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Public record
            </p>
            <p className="mt-1 text-lg font-bold tracking-tight text-foreground group-hover:text-stamp md:text-xl">
              {profile.siteName}
            </p>
          </Link>
          <nav>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "font-mono text-xs uppercase tracking-widest transition-colors",
                        active
                          ? "text-stamp underline decoration-2 underline-offset-4"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
