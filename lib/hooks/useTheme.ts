"use client";

import { useAppStore } from "@/lib/store/useAppStore";
import { useEffect, useState } from "react";

export function useTheme() {
  const { theme, setTheme } = useAppStore();
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (theme === "auto") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setIsDark(prefersDark);
    } else {
      setIsDark(theme === "dark");
    }
  }, [theme]);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return {
    isDark,
    theme,
    setTheme,
    toggleTheme,
    mounted,
  };
}
