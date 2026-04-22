"use client";

import { useEffect } from "react";

const THEMES = Array.from({ length: 10 }, (_, index) => `theme-${index + 1}`);

/**
 * ThemeHandler component responsible for applying the saved theme from localStorage
 * on application load. This ensures the theme persists across different pages.
 */
export default function ThemeHandler() {
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("khub-theme-index") : null;
    
    // Default to theme-1 if nothing is saved
    let themeIndex = 0;

    if (saved !== null) {
      const parsed = Number(saved);
      if (Number.isInteger(parsed) && parsed >= 0 && parsed < THEMES.length) {
        themeIndex = parsed;
      }
    }

    const theme = THEMES[themeIndex];
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return null; // This component doesn't render anything
}
