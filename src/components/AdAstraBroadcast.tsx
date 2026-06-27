import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const featuredProducts = projects.filter(
  (p) => p.status === "live" || p.status === "development"
);

export function AdAstraBroadcast() {
  const { promotions } = profile;

  return (
    <section className="border-2 border-foreground bg-paper">
      <div className="grid lg:grid-cols-[1fr_1.1fr]">
        <div className="border-b-2 border-foreground p-6 md:p-10 lg:border-b-0 lg:border-r-2">
          <div className="mb-6 inline-block border-2 border-stamp px-3 py-1">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-stamp">
              Broadcast
            </span>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {promotions.brand}
          </p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">
            {promotions.tagline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {promotions.description}
          </p>

          <ul className="mt-6 space-y-2">
            {promotions.highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 font-mono text-xs uppercase tracking-wide text-foreground"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-stamp" />
                {item}
              </li>
            ))}
          </ul>

          <Link
            href={profile.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 border-2 border-foreground bg-foreground px-5 py-3 font-mono text-xs uppercase tracking-widest text-paper transition-opacity hover:opacity-90"
          >
            <span className="text-base leading-none">◉</span>
            Follow {promotions.handle}
          </Link>
        </div>

        <div className="bg-background p-6 md:p-8">
          <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Latest captures from the feed
            </p>
            <Link
              href={profile.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-widest text-stamp underline underline-offset-2"
            >
              View all →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featuredProducts.map((project) =>
              project.heroImage ? (
                <Link
                  key={project.id}
                  href={profile.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border-2 border-foreground bg-paper transition-colors hover:bg-background"
                >
                  <div className="flex items-center justify-between border-b border-border px-3 py-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest">
                      {project.name}
                    </span>
                    <span className="font-mono text-[10px] text-stamp">Reel</span>
                  </div>
                  <div className="relative aspect-[9/16] overflow-hidden">
                    <Image
                      src={project.heroImage}
                      alt={`${project.name} product capture`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, 240px"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-paper">
                        Watch promos on Instagram →
                      </span>
                    </div>
                  </div>
                </Link>
              ) : null
            )}
          </div>

          <p className="mt-4 font-mono text-[10px] leading-relaxed text-muted-foreground">
            Product walkthroughs and center promotions are published on{" "}
            <Link
              href={profile.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stamp underline underline-offset-2"
            >
              {promotions.handle}
            </Link>
            . Follow for new demos as features ship.
          </p>
        </div>
      </div>
    </section>
  );
}
