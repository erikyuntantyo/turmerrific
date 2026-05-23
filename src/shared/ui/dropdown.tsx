"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cn } from "@/shared/utils/utils";

export type DropdownMenuItem =
  | {
      type: "item";
      label: string;
      icon?: IconDefinition;
      danger?: boolean;
      shortcut?: string;
      onSelect?: () => void;
      disabled?: boolean;
    }
  | { type: "divider" };

export type DropdownProps = {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  align?: "left" | "right";
  className?: string;
  menuClassName?: string;
};

export function Dropdown({
  trigger,
  items,
  align = "left",
  className,
  menuClassName,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  const itemIndices = items
    .map((item, i) => (item.type === "item" && !item.disabled ? i : -1))
    .filter((i) => i >= 0);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setFocusedIndex(-1);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setFocusedIndex(-1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const pos = itemIndices.indexOf(prev);
          return itemIndices[(pos + 1) % itemIndices.length];
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const pos = itemIndices.indexOf(prev);
          return itemIndices[pos <= 0 ? itemIndices.length - 1 : pos - 1];
        });
      } else if (e.key === "Enter" && focusedIndex >= 0) {
        const item = items[focusedIndex];
        if (item.type === "item" && !item.disabled) {
          item.onSelect?.();
          setOpen(false);
          setFocusedIndex(-1);
        }
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, itemIndices, focusedIndex, items]);

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="border-border bg-card hover:bg-muted inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors"
      >
        {trigger}
        <FontAwesomeIcon
          icon={faChevronDown}
          className={cn("h-3 w-3 transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {open && (
        <div
          role="menu"
          className={cn(
            "bg-card absolute z-10 mt-2 min-w-[200px] overflow-hidden rounded-md border shadow-lg",
            align === "right" ? "right-0" : "left-0",
            menuClassName,
          )}
        >
          {items.map((item, i) => {
            if (item.type === "divider") {
              return <div key={`d-${i}`} className="bg-border my-1 h-px" />;
            }
            const focused = focusedIndex === i;
            return (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onMouseEnter={() => setFocusedIndex(i)}
                onClick={() => {
                  item.onSelect?.();
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                  focused && "bg-muted",
                  item.danger
                    ? "text-destructive hover:bg-destructive/10"
                    : "text-foreground hover:bg-muted",
                )}
              >
                <span className="flex items-center gap-2.5">
                  {item.icon && (
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={cn(
                        "h-3.5 w-3.5",
                        item.danger ? "text-destructive" : "text-muted-foreground",
                      )}
                    />
                  )}
                  {item.label}
                </span>
                {item.shortcut && (
                  <kbd className="text-muted-foreground text-[10px] tracking-wider">
                    {item.shortcut}
                  </kbd>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
