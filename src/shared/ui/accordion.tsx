"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/shared/utils/utils";

export type AccordionItem = {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
};

export type AccordionProps = {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultOpen?: string | string[];
  className?: string;
};

export function Accordion({ items, type = "single", defaultOpen, className }: AccordionProps) {
  const initialOpen = (() => {
    if (defaultOpen === undefined) return new Set<string>();
    if (Array.isArray(defaultOpen)) return new Set(defaultOpen);
    return new Set([defaultOpen]);
  })();
  const [openIds, setOpenIds] = useState<Set<string>>(initialOpen);

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (type === "single") next.clear();
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div
      className={cn("divide-border bg-card divide-y overflow-hidden rounded-lg border", className)}
    >
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id}>
            <button
              type="button"
              className="hover:bg-muted/40 flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left transition-colors"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              id={`accordion-trigger-${item.id}`}
            >
              <span className="text-foreground text-sm font-medium">{item.title}</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={cn(
                  "text-muted-foreground h-3 w-3 shrink-0 transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              className={cn(
                "grid transition-all duration-200 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="text-muted-foreground px-4 pb-4 text-sm leading-relaxed">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
