/*
 * Light is the default for everyone, whatever their device is set to. A
 * visitor who picks dark keeps it: the choice is saved in localStorage and
 * re-applied before first paint by THEME_SCRIPT (in the root layout), so a
 * returning visitor never sees a flash of light.
 *
 * The theme lives on <html data-theme="dark">; globals.css redefines the
 * colour tokens under that attribute. The toggles are in
 * src/components/theme-toggle.tsx.
 *
 * Kept out of the "use client" toggle file so the server-rendered layout can
 * read these values.
 */

export type Theme = "light" | "dark";

export const STORAGE_KEY = "kikai-theme";
export const CHANGE_EVENT = "kikai-theme-change";

/** The page background in each theme, also used for the browser's theme-color. */
export const PAPER = { light: "#fbfaf6", dark: "#12150d" } as const;

/** Runs in <head> before the page paints. Keep it tiny and dependency-free. */
export const THEME_SCRIPT = `try{if(localStorage.getItem("${STORAGE_KEY}")==="dark"){document.documentElement.dataset.theme="dark";var m=document.querySelector('meta[name="theme-color"]');if(m)m.content="${PAPER.dark}"}}catch(e){}`;
