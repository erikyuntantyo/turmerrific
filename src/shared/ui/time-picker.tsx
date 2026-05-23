"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/shared/utils/utils";

export type TimeValue = { h: number; m: number };

function formatTime(h: number, m: number): string {
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export type TimePickerProps = {
  value: TimeValue | null;
  onChange: (v: TimeValue | null) => void;
  placeholder?: string;
  minuteStep?: 1 | 5 | 10 | 15 | 30;
  disabled?: boolean;
  className?: string;
};

export function TimePicker({
  value,
  onChange,
  placeholder = "Pick a time",
  minuteStep = 15,
  disabled,
  className,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep);

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="border-border bg-card hover:bg-muted inline-flex w-[160px] items-center justify-between gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value ? formatTime(value.h, value.m) : placeholder}
        </span>
        <FontAwesomeIcon icon={faClock} className="text-muted-foreground h-3.5 w-3.5" />
      </button>
      {open && (
        <div className="bg-card absolute left-0 z-10 mt-2 flex w-[160px] rounded-md border shadow-lg">
          <div className="max-h-[200px] flex-1 overflow-y-auto border-r">
            {hours.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => onChange({ h, m: value?.m ?? 0 })}
                className={cn(
                  "block w-full px-3 py-1.5 text-left text-xs transition-colors",
                  value?.h === h
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted",
                )}
              >
                {String(h).padStart(2, "0")}
              </button>
            ))}
          </div>
          <div className="max-h-[200px] flex-1 overflow-y-auto">
            {minutes.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => onChange({ h: value?.h ?? 0, m })}
                className={cn(
                  "block w-full px-3 py-1.5 text-left text-xs transition-colors",
                  value?.m === m
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted",
                )}
              >
                {String(m).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
