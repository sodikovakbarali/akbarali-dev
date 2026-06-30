import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export function AdminShell({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-2 border-foreground bg-paper">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Analytics portal
            </p>
            <h1 className="mt-1 text-xl font-bold tracking-tight md:text-2xl">{title}</h1>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-stamp"
            >
              ← Site
            </Link>
            {hasClerk ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <span className="font-mono text-xs text-muted-foreground">Clerk not configured</span>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">{children}</main>
    </div>
  );
}
