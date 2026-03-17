"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);

  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = () => {
    if (!localStorage.getItem("theme")) {
      callback();
    }
  };
  darkQuery.addEventListener("change", handleChange);

  return () => {
    listeners.delete(callback);
    darkQuery.removeEventListener("change", handleChange);
  };
}

function getSnapshot(): boolean {
  const stored = localStorage.getItem("theme");
  if (stored) return stored === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useTheme() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    const newIsDark = !getSnapshot();
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    emitChange();
  }, []);

  return { isDark, toggleTheme };
}
