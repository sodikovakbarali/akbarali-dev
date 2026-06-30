import { SignUp } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default function SignUpPage() {
  if (!hasClerk) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md border-2 border-foreground bg-paper p-8 text-center">
          <p className="font-mono text-sm text-muted-foreground">
            Clerk is not configured. Add Clerk env vars in Vercel first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md border-2 border-foreground bg-paper p-8">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Create admin account
        </p>
        <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
      </div>
    </div>
  );
}
