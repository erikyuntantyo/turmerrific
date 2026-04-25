"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { Button } from "@/shared/ui/button";
import { useTheme } from "@/shared/hooks/use-theme";

type ThemeToggleProps = {
  variant?: "button" | "icon";
  className?: string;
};

export function ThemeToggle({ variant = "button", className }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  if (variant === "icon") {
    return (
      <button
        onClick={toggleTheme}
        className={
          className ||
          "text-muted-foreground hover:text-foreground cursor-pointer rounded-full px-2 py-1.5 transition-colors"
        }
      >
        <FontAwesomeIcon icon={isDark ? faSun : faMoon} className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`cursor-pointer ${className ?? ""}`.trim()}
    >
      <FontAwesomeIcon icon={isDark ? faSun : faMoon} className="h-5 w-5" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
