"use client";

import { Moon, Sun } from "@phosphor-icons/react/ssr";
import { useSyncExternalStore } from "react";
import { CHANGE_EVENT, PAPER, STORAGE_KEY, type Theme } from "@/lib/theme";

/** The theme logic and its constants are in src/lib/theme.ts. */

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function setTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.dataset.theme = "dark";
  else delete root.dataset.theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", PAPER[theme]);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage: the switch still works for this visit.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

/** Every toggle on the page shares one source of truth, so they never disagree. */
function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as Theme);
  return [theme, setTheme] as const;
}

/** Round icon button for headers: a moon in light mode, a sun in dark. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, set] = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      aria-label="Dark mode"
      aria-pressed={dark}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => set(dark ? "light" : "dark")}
      className={`grid size-11 place-items-center rounded-full border border-line-strong transition-[background-color,transform] hover:bg-card active:scale-[0.96] ${className}`}
    >
      {dark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}

/** A labelled on/off row for the phone menu. */
export function ThemeSwitchRow() {
  const [theme, set] = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      onClick={() => set(dark ? "light" : "dark")}
      className="flex w-full items-center justify-between rounded-part px-4 py-3 text-left text-lg hover:bg-card"
    >
      Dark mode
      <span aria-hidden="true" className={`flex h-7 w-12 items-center rounded-full p-0.5 transition-colors ${dark ? "bg-olive" : "bg-line-strong"}`}>
        <span className={`size-6 rounded-full bg-surface shadow-sm transition-transform ${dark ? "translate-x-5" : ""}`} />
      </span>
    </button>
  );
}

/** Two-option control for the footer. */
export function ThemeSegmented() {
  const [theme, set] = useTheme();
  return (
    <div role="group" aria-label="Theme" className="inline-flex rounded-full border border-line p-0.5">
      {(["light", "dark"] as const).map((t) => (
        <button
          key={t}
          type="button"
          aria-pressed={theme === t}
          onClick={() => set(t)}
          className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-[13px] transition-colors ${
            theme === t ? "bg-card text-ink" : "text-muted hover:text-ink"
          }`}
        >
          {t === "light" ? <Sun size={14} aria-hidden="true" /> : <Moon size={14} aria-hidden="true" />}
          {t === "light" ? "Light" : "Dark"}
        </button>
      ))}
    </div>
  );
}
