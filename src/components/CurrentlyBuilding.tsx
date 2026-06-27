import { profile } from "@/data/profile";

export function CurrentlyBuilding() {
  return (
    <div className="divide-y-2 divide-foreground border-2 border-foreground bg-paper">
      {profile.currentlyBuilding.map((item) => (
        <div key={item.name} className="grid gap-2 p-6 md:grid-cols-[8rem_1fr] md:gap-8 md:p-8">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-stamp">
            {item.name}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
