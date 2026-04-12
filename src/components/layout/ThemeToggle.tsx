"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = mounted ? theme : "dark";

  return (
    <div
      role="group"
      aria-label="Theme switcher"
      className={`inline-flex items-center rounded-full border border-border bg-surface/60 backdrop-blur-sm overflow-hidden text-xs font-semibold ${className}`}
    >
      <button
        type="button"
        aria-label="Dark mode"
        aria-pressed={current === "dark"}
        onClick={() => setTheme("dark")}
        className={`px-3 py-1.5 transition-colors duration-200 ${
          current === "dark"
            ? "bg-primary text-background"
            : "text-text-muted hover:text-text-primary"
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        aria-label="Light mode"
        aria-pressed={current === "light"}
        onClick={() => setTheme("light")}
        className={`px-3 py-1.5 transition-colors duration-200 ${
          current === "light"
            ? "bg-primary text-background"
            : "text-text-muted hover:text-text-primary"
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
