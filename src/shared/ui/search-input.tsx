"use client";

import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/shared/utils/utils";

export type SearchInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  containerClassName?: string;
};

export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = "Search…",
  containerClassName,
  className,
  ...rest
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function clear() {
    onChange("");
    onClear?.();
    inputRef.current?.focus();
  }

  return (
    <div className={cn("relative", containerClassName)}>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2"
      />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "border-input bg-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border pr-9 pl-9 text-sm transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
          className,
        )}
        {...rest}
      />
      {value && (
        <button
          type="button"
          onClick={clear}
          aria-label="Clear search"
          className="hover:bg-muted text-muted-foreground hover:text-foreground absolute top-1/2 right-2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-md transition-colors"
        >
          <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

export function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-primary/20 text-foreground rounded px-0.5">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}
