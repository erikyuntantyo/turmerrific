import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site.config";

export function generatePageMetadata({
  title,
  description,
}: {
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export { siteConfig };
