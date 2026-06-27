import { cn } from "@/lib/utils";

export function SectionHeader({
  number,
  eyebrow,
  title,
  description,
  className,
}: {
  number?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={cn("mb-10 border-b-2 border-foreground pb-6 md:mb-14", className)}>
      <div className="mb-4 flex items-baseline gap-4">
        {number && (
          <span className="font-mono text-4xl font-bold leading-none text-stamp md:text-5xl">
            {number}
          </span>
        )}
        {eyebrow && (
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {eyebrow}
          </span>
        )}
      </div>
      <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}

export function DossierPanel({
  children,
  className,
  stripe,
}: {
  children: React.ReactNode;
  className?: string;
  stripe?: "teal" | "navy" | "neutral";
}) {
  const stripeColor = {
    teal: "bg-[#0D7377]",
    navy: "bg-navy",
    neutral: "bg-muted-foreground",
  }[stripe ?? "neutral"];

  return (
    <div
      className={cn(
        "relative border-2 border-foreground bg-paper",
        className
      )}
    >
      <div className={cn("absolute bottom-0 left-0 top-0 w-1", stripeColor)} />
      <div className="pl-5">{children}</div>
    </div>
  );
}

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-20", className)}>
      {children}
    </div>
  );
}
