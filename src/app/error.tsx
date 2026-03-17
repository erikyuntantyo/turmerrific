"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-destructive mb-4 text-7xl font-bold">500</p>
        <h1 className="mb-2 text-2xl font-bold">Something Went Wrong</h1>
        <p className="text-muted-foreground mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="border-border hover:bg-accent inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
