import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoMarkProps = {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: "h-10 w-10 p-1.5",
  md: "h-14 w-14 p-2",
  lg: "h-16 w-16 p-2.5",
};

export function LogoMark({ src, alt, size = "md", className }: LogoMarkProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center border-2 border-foreground bg-paper",
        sizeMap[size],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={64}
        height={64}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
