import { SignIn } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default function SignInPage() {
  if (!hasClerk) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md border-2 border-foreground bg-paper p-8 text-center">
          <p className="font-mono text-sm text-muted-foreground">
            Clerk is not configured. Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY to Vercel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md border-2 border-foreground bg-paper p-8">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Admin access
        </p>
        <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
      </div>
    </div>
  );
}
