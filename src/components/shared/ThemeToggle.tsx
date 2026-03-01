"use client";

import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

const STORAGE_KEY = "pde-theme";

function getPreferredTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.classList.toggle("dark", theme === "dark");
}

// Toggle accesible de modo dia/noche con persistencia local.
export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const preferredTheme = getPreferredTheme();
    setTheme(preferredTheme);
    applyTheme(preferredTheme);
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const nextTheme: ThemeMode = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex min-h-[38px] items-center rounded-lg border border-slate-400/40 bg-white px-3 text-sm font-semibold text-slate-900 dark:border-slate-500/60 dark:bg-slate-900 dark:text-slate-100"
        aria-label="Cambiar tema"
      >
        Tema
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex min-h-[38px] items-center gap-2 rounded-lg border border-slate-400/40 bg-white px-3 text-sm font-semibold text-slate-900 outline-none ring-offset-2 transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-brand-700 dark:border-slate-500/60 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus-visible:ring-brand-100"
      aria-label={isDark ? "Activar modo dia" : "Activar modo noche"}
      aria-pressed={isDark}
    >
      <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-full bg-current" />
      <span>{isDark ? "Dia" : "Noche"}</span>
    </button>
  );
}
