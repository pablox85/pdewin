"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

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

function subscribeToClientStatus() {
  return () => {};
}

// Toggle accesible de modo dia/noche con persistencia local.
export function ThemeToggle() {
  const isClient = useSyncExternalStore(subscribeToClientStatus, () => true, () => false);
  const [theme, setTheme] = useState<ThemeMode | null>(null);
  const effectiveTheme = theme ?? (isClient ? getPreferredTheme() : "light");

  useEffect(() => {
    if (!isClient) {
      return;
    }

    applyTheme(effectiveTheme);
  }, [effectiveTheme, isClient]);

  const handleToggle = () => {
    const nextTheme: ThemeMode = effectiveTheme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  };

  if (!isClient) {
    return (
      <button
        type="button"
        className="inline-flex h-8 w-14 items-center rounded-full border border-slate-400/50 bg-slate-200 px-1 dark:border-slate-500/70 dark:bg-slate-700"
        aria-label="Cambiar tema"
        role="switch"
        aria-checked={false}
      >
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-slate-900 shadow-sm dark:bg-slate-100 dark:text-slate-900">
          {"\u2600"}
        </span>
      </button>
    );
  }

  const isDark = effectiveTheme === "dark";

  return (
    <button
      type="button"
      onClick={handleToggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Activar modo dia" : "Activar modo noche"}
      className={`relative inline-flex h-8 w-14 items-center rounded-full border px-1 outline-none ring-offset-2 transition-colors focus-visible:ring-2 focus-visible:ring-brand-700 dark:focus-visible:ring-brand-100 ${
        isDark
          ? "border-blue-300/80 bg-blue-500"
          : "border-slate-400/50 bg-slate-200 dark:border-slate-500/70 dark:bg-slate-700"
      }`}
    >
      <span
        aria-hidden="true"
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-slate-900 shadow-sm transition-transform ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isDark ? "\u263E" : "\u2600"}
      </span>
      <span className="sr-only">{isDark ? "Modo noche activo" : "Modo dia activo"}</span>
    </button>
  );
}
