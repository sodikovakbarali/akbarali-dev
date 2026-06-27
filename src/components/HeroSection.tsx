import Link from "next/link";
import { profile } from "@/data/profile";

export function HeroSection() {
  return (
    <section className="border-b-2 border-foreground bg-paper">
      <div className="mx-auto max-w-5xl px-4 py-14 md:px-8 md:py-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl flex-1">
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <span className="dossier-stamp">Proof of work</span>
              <span className="font-mono text-xs text-muted-foreground">
                {profile.location}
              </span>
            </div>

            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {profile.name}
            </p>
            <h1 className="mt-3 text-[2rem] font-bold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]">
              {profile.headline}
            </h1>

            <div className="rule-heavy my-8 w-16" />

            <p className="text-base leading-relaxed text-foreground md:text-lg">
              {profile.subheadline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {profile.heroCopy}
            </p>

            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {profile.title}
            </p>
          </div>

          <aside className="w-full shrink-0 border-2 border-foreground bg-background p-6 lg:w-72">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              File index
            </p>
            <ul className="mt-4 space-y-3 font-mono text-sm">
              <li className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">01</span>
                <Link href="#projects" className="hover:text-stamp hover:underline">
                  Products
                </Link>
              </li>
              <li className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">02</span>
                <Link href="#broadcast" className="hover:text-stamp hover:underline">
                  Broadcast
                </Link>
              </li>
              <li className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">03</span>
                <Link href="#record" className="hover:text-stamp hover:underline">
                  Record
                </Link>
              </li>
              <li className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">04</span>
                <Link href="#stack" className="hover:text-stamp hover:underline">
                  Stack
                </Link>
              </li>
              <li className="flex justify-between pb-1">
                <span className="text-muted-foreground">05</span>
                <Link href="/contact" className="hover:text-stamp hover:underline">
                  Contact
                </Link>
              </li>
            </ul>

            <div className="mt-8 space-y-2 border-t-2 border-foreground pt-6">
              <Link
                href="/projects"
                className="block border-2 border-foreground bg-stamp px-4 py-2.5 text-center font-mono text-xs uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
              >
                View projects
              </Link>
              <Link
                href="/contact"
                className="block border-2 border-foreground px-4 py-2.5 text-center font-mono text-xs uppercase tracking-widest transition-colors hover:bg-foreground hover:text-paper"
              >
                Contact
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
