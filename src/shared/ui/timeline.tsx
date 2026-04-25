export type TimelineItemType = "feat" | "improve" | "fix";

export type TimelineItem = {
  component: string;
  type: TimelineItemType;
  text: string;
};

export type TimelineRelease = {
  version: string;
  date: string;
  label: string;
  status: "latest" | "stable";
  items: TimelineItem[];
};

const typeStyles: Record<TimelineItemType, string> = {
  feat: "bg-green-500/10 text-green-600 dark:text-green-400",
  improve: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  fix: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

const typeLabels: Record<TimelineItemType, string> = {
  feat: "new",
  improve: "improved",
  fix: "fix",
};

export function Timeline({ releases }: { releases: TimelineRelease[] }) {
  return (
    <div className="py-6">
      <div className="relative">
        <div className="bg-border absolute top-0 bottom-0 left-3.75 w-px" />

        <div className="space-y-0">
          {releases.map((release, ri) => (
            <div key={release.version} className="relative">
              <div className="relative mb-4 flex items-center gap-3">
                <div
                  className={`relative z-10 flex h-7.75 w-7.75 shrink-0 items-center justify-center rounded-full ${
                    release.status === "latest"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted border-border border-2"
                  }`}
                >
                  <span className="text-[10px] font-bold">{release.version.replace("v", "")}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold">{release.label}</span>
                  <span className="text-muted-foreground text-xs">{release.date}</span>
                  {release.status === "latest" && (
                    <span className="bg-primary/10 text-primary rounded px-1.5 py-0.5 text-[10px] font-medium">
                      latest
                    </span>
                  )}
                </div>
              </div>

              <div
                className={`ml-3.75 space-y-2 border-l border-transparent pl-6 ${ri < releases.length - 1 ? "pb-8" : "pb-2"}`}
              >
                {release.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span
                      className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${typeStyles[item.type]}`}
                    >
                      {typeLabels[item.type]}
                    </span>
                    <span className="shrink-0 font-medium">{item.component}</span>
                    <span className="text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
