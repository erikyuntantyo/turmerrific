"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/shared/ui/button";

export const PAGE_SIZE_OPTIONS = [10, 25, 100];

// Shared theme-aware <select> styling (height applied per-usage).
export const selectClassName =
  "border-input bg-card text-foreground focus-visible:border-ring focus-visible:ring-ring/50 rounded-md border px-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]";

// Windowed page list: first, last, current ±2, "ellipsis" for gaps.
export function pageItems(current: number, total: number): (number | "ellipsis")[] {
  const delta = 2;
  const pages: number[] = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      pages.push(i);
    }
  }
  const out: (number | "ellipsis")[] = [];
  let prev = 0;
  for (const p of pages) {
    if (prev && p - prev > 1) out.push(p - prev === 2 ? prev + 1 : "ellipsis");
    out.push(p);
    prev = p;
  }
  return out;
}

export type Pagination = ReturnType<typeof usePagination>;

export function usePagination(total: number) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, pageCount); // clamp when the set shrinks (filter/removal)
  const start = (currentPage - 1) * pageSize;

  function changePageSize(size: number) {
    setPageSize(size);
    setPage(1);
  }

  // Call when filters/search change so the user lands on a populated page.
  function resetPage() {
    setPage(1);
  }

  return { setPage, pageSize, changePageSize, resetPage, pageCount, currentPage, start };
}

// Filter bar panel — bordered card, stacks on mobile, row on desktop.
export function FilterPanel({ children }: { children: ReactNode }) {
  return (
    <div className="bg-card flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center">
      {children}
    </div>
  );
}

// Table block with optional attached toolbar (search/filters) + pagination.
// Pass `toolbar` to render a FilterPanel above the table; pass `pagination` + `total`
// to render the bottom pager. Omit either to leave it off.
export function DataTable({
  toolbar,
  pagination,
  total,
  children,
}: {
  toolbar?: ReactNode;
  pagination?: Pagination;
  total?: number;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3">
      {toolbar && <FilterPanel>{toolbar}</FilterPanel>}
      <div className="overflow-x-auto rounded-lg border">{children}</div>
      {pagination && total !== undefined && (
        <TablePagination pagination={pagination} total={total} />
      )}
    </div>
  );
}

// Bottom bar — "Showing [page-size] of total" + windowed page buttons.
export function TablePagination({ pagination, total }: { pagination: Pagination; total: number }) {
  const { pageSize, changePageSize, pageCount, currentPage, setPage } = pagination;

  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <span>Showing</span>
        <select
          aria-label="Rows per page"
          value={pageSize}
          onChange={(e) => changePageSize(Number(e.target.value))}
          className={`${selectClassName} h-8`}
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size} className="bg-card text-foreground">
              {size}
            </option>
          ))}
        </select>
        <span>of {total}</span>
      </div>
      <div className="flex items-center gap-1">
        {pageItems(currentPage, pageCount).map((item, i) =>
          item === "ellipsis" ? (
            <span key={`ellipsis-${i}`} className="text-muted-foreground px-2 text-sm">
              …
            </span>
          ) : (
            <Button
              key={item}
              variant={item === currentPage ? "default" : "outline"}
              size="sm"
              className="no-hover-glow min-w-9"
              onClick={() => setPage(item)}
            >
              {item}
            </Button>
          ),
        )}
      </div>
    </div>
  );
}
