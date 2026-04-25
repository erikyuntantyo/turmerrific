"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faClockRotateLeft,
  faCode,
  faGauge,
  faUsers,
  faGear,
  faRectangleList,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { siteConfig } from "@/shared/config/site.config";
import { cn } from "@/shared/utils/utils";

type NavItem = {
  label: string;
  icon: IconDefinition;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Overview", icon: faGauge, href: "/dashboard" },
  { label: "Users", icon: faUsers, href: "/dashboard/users" },
  { label: "Forms", icon: faRectangleList, href: "/dashboard/forms" },
  { label: "Change Log", icon: faClockRotateLeft, href: "/dashboard/changelog" },
  { label: "Settings", icon: faGear, href: "/dashboard/settings" },
];

type SidebarProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onClose: () => void;
};

function SidebarNav({
  collapsed,
  onToggleCollapse,
  onClose,
  hideHeader,
}: {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onClose: () => void;
  hideHeader?: boolean;
}) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  return (
    <div className="flex h-full flex-col">
      {/* Title bar */}
      {!hideHeader && (
        <div className="bg-panel-header border-sidebar-border flex shrink-0 items-center border-b shadow-sm">
          {collapsed ? (
            <div className="flex h-12 w-full items-center justify-center">
              <button
                onClick={onToggleCollapse}
                className="text-sidebar-foreground/70 hover:text-sidebar-foreground cursor-pointer transition-colors"
                aria-label="Expand sidebar"
              >
                <FontAwesomeIcon icon={faAnglesRight} className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <div className="flex h-12 w-full items-center justify-between px-4">
              <Link
                href="/"
                className="text-sidebar-foreground flex items-center gap-2 text-xl font-bold tracking-tight"
              >
                <FontAwesomeIcon icon={faCode} className="text-primary" />
                <span>{siteConfig.name}</span>
              </Link>
              <button
                onClick={onToggleCollapse}
                className="text-sidebar-foreground/70 hover:text-sidebar-foreground hidden cursor-pointer transition-colors md:block"
                aria-label="Collapse sidebar"
              >
                <FontAwesomeIcon icon={faAnglesLeft} className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {navItems.map((item) => {
          const active = isActive(item.href);

          if (collapsed) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex w-full items-center justify-center rounded-lg p-2 transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
                title={item.label}
              >
                <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
              </Link>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <FontAwesomeIcon icon={item.icon} className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "bg-sidebar border-sidebar-border hidden shrink-0 border-r transition-[width] duration-200 md:block",
          collapsed ? "w-12" : "w-64",
        )}
      >
        <SidebarNav collapsed={collapsed} onToggleCollapse={onToggleCollapse} onClose={onClose} />
      </aside>

      {/* Mobile sidebar — fullscreen */}
      {mobileOpen && (
        <aside className="bg-sidebar fixed inset-0 z-[60] flex flex-col md:hidden">
          <div className="bg-panel-header border-sidebar-border flex h-12 shrink-0 items-center justify-between border-b px-4 shadow-sm">
            <Link
              href="/"
              className="text-sidebar-foreground flex items-center gap-2 text-xl font-bold tracking-tight"
            >
              <FontAwesomeIcon icon={faCode} className="text-primary" />
              <span>{siteConfig.name}</span>
            </Link>
            <button
              onClick={onClose}
              className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <SidebarNav
              collapsed={false}
              onToggleCollapse={onToggleCollapse}
              onClose={onClose}
              hideHeader
            />
          </div>
        </aside>
      )}
    </>
  );
}
