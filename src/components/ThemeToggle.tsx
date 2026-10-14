"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "./Icons";
import { THEME_STORAGE_KEY } from "./themeScript";

type Theme = "light" | "dark";

function currentTheme(): Theme {
  const chosen = document.documentElement.getAttribute("data-theme");
  if (chosen === "light" || chosen === "dark") return chosen;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// The visible icon is switched by CSS (works before hydration); this component only flips the theme.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(currentTheme());
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const follow = () => setTheme(currentTheme());
    media.addEventListener("change", follow);
    return () => media.removeEventListener("change", follow);
  }, []);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    // keep the browser toolbar colour in step with a manual choice
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", next === "dark" ? "#161617" : "#eef0f5"));
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the choice then lasts for this page view.
    }
    setTheme(next);
  }

  const label = theme === "dark" ? "Switch to light theme" : theme === "light" ? "Switch to dark theme" : "Switch colour theme";

  return (
    <button type="button" className="btn-icon" onClick={toggle} aria-label={label} title={label}>
      <Moon className="ic ico-moon" />
      <Sun className="ic ico-sun" />
    </button>
  );
}
