import { cn } from "@/lib/utils";
import { Badge as ShadcnBadge } from "@/components/ui/badge";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "live" | "development" | "muted";
  className?: string;
};

const variantStyles = {
  default: "",
  live: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  development: "border-violet-500/30 bg-violet-500/10 text-violet-300",
  muted: "border-white/10 bg-white/5 text-muted-foreground",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <ShadcnBadge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </ShadcnBadge>
  );
}
