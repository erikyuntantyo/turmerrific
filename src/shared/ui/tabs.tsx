"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cn } from "@/shared/utils/utils";

export type Tab = {
  id: string;
  label: string;
  icon?: IconDefinition;
  badge?: string;
  content: React.ReactNode;
};

export type TabsVariant = "underline" | "pill" | "bordered";

export type TabsProps = {
  tabs: Tab[];
  variant?: TabsVariant;
  defaultId?: string;
  value?: string;
  onChange?: (id: string) => void;
  className?: string;
};

export function Tabs({
  tabs,
  variant = "underline",
  defaultId,
  value,
  onChange,
  className,
}: TabsProps) {
  const [internal, setInternal] = useState(defaultId ?? tabs[0]?.id);
  const activeId = value ?? internal;
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  function setActive(id: string) {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  }

  function onKey(e: React.KeyboardEvent, index: number) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive(tabs[(index + 1) % tabs.length].id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive(tabs[(index - 1 + tabs.length) % tabs.length].id);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(tabs[0].id);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(tabs[tabs.length - 1].id);
    }
  }

  if (variant === "pill") {
    return (
      <div className={className}>
        <div role="tablist" className="bg-muted/40 inline-flex gap-1 rounded-lg p-1">
          {tabs.map((tab, i) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onKeyDown={(e) => onKey(e, i)}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.icon && <FontAwesomeIcon icon={tab.icon} className="h-3.5 w-3.5" />}
                {tab.label}
                {tab.badge && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 text-[10px] font-bold",
                      isActive ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                    )}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          className="mt-4 rounded-lg border p-5"
        >
          {active.content}
        </div>
      </div>
    );
  }

  if (variant === "bordered") {
    return (
      <div className={className}>
        <div role="tablist" className="-mb-px flex flex-wrap gap-0">
          {tabs.map((tab, i) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onKeyDown={(e) => onKey(e, i)}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-t-md border border-b-0 px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-card text-foreground border-border"
                    : "text-muted-foreground hover:text-foreground border-transparent",
                )}
              >
                {tab.icon && <FontAwesomeIcon icon={tab.icon} className="h-3.5 w-3.5" />}
                {tab.label}
              </button>
            );
          })}
        </div>
        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          className="bg-card border-border rounded-tr-lg rounded-b-lg border p-5"
        >
          {active.content}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div role="tablist" className="border-border flex gap-1 border-b">
        {tabs.map((tab, i) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onKeyDown={(e) => onKey(e, i)}
              onClick={() => setActive(tab.id)}
              className={cn(
                "-mb-px inline-flex items-center gap-2 border-b-2 px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground border-transparent",
              )}
            >
              {tab.icon && <FontAwesomeIcon icon={tab.icon} className="h-3.5 w-3.5" />}
              {tab.label}
              {tab.badge && (
                <span className="bg-primary/15 text-primary rounded-full px-1.5 text-[10px] font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        className="mt-4"
      >
        {active.content}
      </div>
    </div>
  );
}
