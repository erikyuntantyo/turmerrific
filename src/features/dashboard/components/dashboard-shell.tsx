"use client";

import { useState, useSyncExternalStore, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { Sidebar } from "./sidebar";
import { DashboardHeader } from "./header";
import { ThemeToggle } from "@/shared/ui/theme-toggle";

const SIDEBAR_KEY = "dashboard-sidebar-collapsed";

function subscribeSidebarStorage(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

function getSidebarSnapshot() {
  return localStorage.getItem(SIDEBAR_KEY) === "true";
}

function getSidebarServerSnapshot() {
  return false;
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const sidebarCollapsed = useSyncExternalStore(
    subscribeSidebarStorage,
    getSidebarSnapshot,
    getSidebarServerSnapshot,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const navItems = [
    { href: "/about", label: "About" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  const toggleSidebarCollapsed = useCallback(() => {
    const next = !getSidebarSnapshot();
    localStorage.setItem(SIDEBAR_KEY, String(next));
    window.dispatchEvent(new StorageEvent("storage", { key: SIDEBAR_KEY }));
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapsed}
        mobileOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <DashboardHeader />
        <main className="min-w-0 flex-1 p-6 lg:p-8">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 md:hidden">
        <div className="flex items-center gap-1 rounded-full border bg-black/10 px-3 py-2 shadow-lg backdrop-blur-md dark:bg-white/10">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-muted-foreground hover:text-foreground rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors"
            aria-label="Toggle sidebar"
          >
            <FontAwesomeIcon icon={faBars} className="h-3.5 w-3.5" />
          </button>
          {[{ href: "/", label: "Home" }, ...navItems].map((item) => {
            const isActive =
              pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
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
    </div>
  );
}
