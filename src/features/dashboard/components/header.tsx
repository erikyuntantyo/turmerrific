"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { ThemeToggle } from "@/shared/ui/theme-toggle";

const sectionLabels: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/users": "Users",
  "/dashboard/forms": "Forms",
  "/dashboard/settings": "Settings",
};

export function DashboardHeader() {
  const pathname = usePathname();
  const sectionLabel = sectionLabels[pathname] ?? "Dashboard";

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
      <div className="flex h-12 items-center justify-between px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <FontAwesomeIcon icon={faHouse} className="h-3.5 w-3.5" />
          </Link>
          <FontAwesomeIcon icon={faChevronRight} className="text-muted-foreground/50 h-2.5 w-2.5" />
          <Link
            href="/dashboard"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          {pathname !== "/dashboard" && (
            <>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-muted-foreground/50 h-2.5 w-2.5"
              />
              <span className="text-foreground truncate">{sectionLabel}</span>
            </>
          )}
        </nav>

        {/* Actions */}
        <div className="hidden items-center md:flex">
          <ThemeToggle variant="icon" />
        </div>
      </div>
    </header>
  );
}
