import { cn } from "@/shared/utils/utils";

const colorVariants = [
  "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200",
  "bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200",
  "bg-lime-100 dark:bg-lime-900/40 text-lime-800 dark:text-lime-200",
  "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-200",
  "bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200",
  "bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200",
] as const;

type TagProps = {
  text: string;
  variant?: "muted" | "primary" | "color";
  colorIndex?: number;
  className?: string;
};

export function Tag({ text, variant = "muted", colorIndex = 0, className }: TagProps) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-xs font-medium",
        variant === "muted" && "border-border bg-muted text-foreground border",
        variant === "primary" && "border-primary/30 bg-primary/5 text-muted-foreground border",
        variant === "color" && colorVariants[colorIndex % colorVariants.length],
        className,
      )}
    >
      {text}
    </span>
  );
}
