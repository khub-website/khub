"use client";

import { useEffect } from "react";

export default function ThemeHandler() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "theme-1");
    window.localStorage.removeItem("khub-theme-index");
  }, []);

  return null;
}
