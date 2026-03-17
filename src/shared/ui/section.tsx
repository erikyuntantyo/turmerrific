import * as React from "react";
import { cn } from "@/shared/utils/utils";

type SectionProps = React.ComponentProps<"section"> & {
  border?: boolean;
};

export function Section({ border, className, ...props }: SectionProps) {
  return <section className={cn("py-6 md:py-16", border && "border-t", className)} {...props} />;
}

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("container mx-auto px-4", className)} {...props} />;
}
