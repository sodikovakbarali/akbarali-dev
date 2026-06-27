import { cn } from "@/lib/utils";
import type { ScreenshotMock } from "@/data/projects";
import {
  Bot,
  ClipboardCheck,
  LayoutDashboard,
  LayoutTemplate,
  Monitor,
  Sparkles,
} from "lucide-react";

const variantConfig: Record<
  ScreenshotMock["variant"],
  { icon: React.ElementType; gradient: string; accent: string }
> = {
  landing: {
    icon: LayoutTemplate,
    gradient: "from-blue-500/20 to-cyan-500/10",
    accent: "text-blue-400",
  },
  dashboard: {
    icon: LayoutDashboard,
    gradient: "from-emerald-500/20 to-teal-500/10",
    accent: "text-emerald-400",
  },
  exam: {
    icon: Monitor,
    gradient: "from-violet-500/20 to-purple-500/10",
    accent: "text-violet-400",
  },
  grading: {
    icon: ClipboardCheck,
    gradient: "from-amber-500/20 to-orange-500/10",
    accent: "text-amber-400",
  },
  score: {
    icon: Sparkles,
    gradient: "from-pink-500/20 to-rose-500/10",
    accent: "text-pink-400",
  },
  proctor: {
    icon: Monitor,
    gradient: "from-red-500/20 to-orange-500/10",
    accent: "text-red-400",
  },
  ai: {
    icon: Bot,
    gradient: "from-indigo-500/20 to-violet-500/10",
    accent: "text-indigo-400",
  },
  upcoming: {
    icon: Sparkles,
    gradient: "from-zinc-500/10 to-zinc-600/5",
    accent: "text-zinc-400",
  },
};

export function ScreenshotMockup({
  screenshot,
  className,
}: {
  screenshot: ScreenshotMock;
  className?: string;
}) {
  const config = variantConfig[screenshot.variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br",
        config.gradient,
        "transition-all hover:border-white/20 hover:shadow-lg hover:shadow-black/20",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,transparent_50%)]" />
      <div className="relative p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500/60" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
            <span className="h-2 w-2 rounded-full bg-green-500/60" />
          </div>
          <span className="ml-auto font-mono text-[10px] text-muted-foreground">
            mock preview
          </span>
        </div>
        <div className="rounded-lg border border-white/5 bg-black/30 p-4 backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-2">
            <Icon className={cn("h-4 w-4", config.accent)} />
            <span className="text-xs font-medium text-foreground">
              {screenshot.title}
            </span>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-3/4 rounded bg-white/10" />
            <div className="h-2 w-1/2 rounded bg-white/10" />
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="h-8 rounded bg-white/5" />
              <div className="h-8 rounded bg-white/5" />
              <div className="h-8 rounded bg-white/5" />
            </div>
            <div className="mt-2 h-16 rounded bg-white/5" />
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {screenshot.description}
        </p>
      </div>
    </div>
  );
}
