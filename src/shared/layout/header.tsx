"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { siteConfig } from "@/shared/config/site.config";
import { ThemeToggle } from "@/shared/ui/theme-toggle";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
];

function getBreadcrumb(pathname: string): { label: string; href?: string }[] {
  if (pathname === "/") return [];
  const segments = pathname.split("/").filter(Boolean);
  return segments.map((seg, i) => ({
    label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
    href: i < segments.length - 1 ? "/" + segments.slice(0, i + 1).join("/") : undefined,
  }));
}

export function Header() {
  const pathname = usePathname();
  const breadcrumb = getBreadcrumb(pathname);

  return (
    <>
      {/* Desktop Header */}
      <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 hidden w-full shadow-[0_1px_3px_rgb(0_0_0/0.05)] backdrop-blur md:block">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link
            href="/"
            className="hidden items-center gap-2 text-xl font-bold tracking-tight md:flex"
          >
            <FontAwesomeIcon icon={faCode} className="text-primary" />
            <span>{siteConfig.name}</span>
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === item.href ? "text-primary" : "hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Breadcrumb */}
      <div className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-40 border-b backdrop-blur md:hidden">
        <nav aria-label="Breadcrumb" className="flex h-12 items-center gap-1 px-4 text-sm">
          {breadcrumb.length === 0 ? (
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <FontAwesomeIcon icon={faCode} className="text-primary" />
              <span>{siteConfig.name}</span>
            </Link>
          ) : (
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground flex items-center transition-colors"
            >
              <FontAwesomeIcon icon={faHouse} className="h-3.5 w-3.5" />
            </Link>
          )}
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-muted-foreground/50 h-2.5 w-2.5"
              />
              <span
                className={
                  i === breadcrumb.length - 1 ? "text-foreground" : "text-muted-foreground"
                }
              >
                {crumb.label}
              </span>
            </span>
          ))}
        </nav>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 md:hidden">
        <div className="flex items-center gap-1 rounded-full border bg-black/10 px-3 py-2 shadow-lg backdrop-blur-md dark:bg-white/10">
          {[{ href: "/", label: "Home" }, ...navItems].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.href === "/" ? (
                  <FontAwesomeIcon icon={faHouse} className="h-3.5 w-3.5" />
                ) : (
                  item.label
                )}
              </Link>
            );
          })}
          <ThemeToggle variant="icon" />
        </div>
      </nav>
    </>
  );
}
