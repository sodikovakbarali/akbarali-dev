import { cn } from "@/lib/utils";
import { Badge as ShadcnBadge } from "@/components/ui/badge";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "live" | "development" | "muted";
  className?: string;
};

const variantStyles = {
  default: "border-foreground bg-foreground text-paper",
  live: "border-stamp bg-stamp/10 text-stamp",
  development: "border-navy bg-navy/10 text-navy",
  muted: "border-border bg-background text-muted-foreground",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <ShadcnBadge
      variant="outline"
      className={cn(
        "rounded-none px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </ShadcnBadge>
  );
}
