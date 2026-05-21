"use client";

import { useTranslation } from "@/lib/hooks/useTranslation";
import { useAppStore } from "@/lib/store/useAppStore";
import { useTheme } from "@/lib/hooks/useTheme";
import { Bell, Mail, Search, Moon, Sun, Menu, X, Globe } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const { t, language } = useTranslation();
  const { setLanguage, setMobileMenuOpen, mobileMenuOpen } = useAppStore();
  const { theme, toggleTheme, isDark } = useTheme();
  const [searchActive, setSearchActive] = useState(false);

  return (
    <>
      {/* ── DESKTOP NAVBAR ── */}
      <nav className="sticky top-0 z-50 hidden md:flex h-16 bg-background-dark/80 backdrop-blur-md border-b border-border-dark items-center justify-between px-6 gap-4">
        {/* ── LOGO ── */}
        <Link href="/" className="flex items-center gap-2 group">
          <svg
            width="32"
            height="32"
            viewBox="0 0 160 160"
            fill="none"
            className="transition-transform group-hover:scale-105"
          >
            <ellipse
              cx="80"
              cy="80"
              rx="58"
              ry="22"
              stroke="#4a6cf7"
              strokeWidth="2.5"
              strokeOpacity="0.8"
              fill="none"
              transform="rotate(50 80 80)"
            />
            <ellipse
              cx="80"
              cy="80"
              rx="44"
              ry="16"
              stroke="#9b5cf6"
              strokeWidth="3"
              strokeOpacity="0.9"
              fill="none"
              transform="rotate(15 80 80)"
            />
            <circle cx="80" cy="80" r="10" fill="#a78bfa" opacity="0.5" />
            <circle cx="80" cy="80" r="5" fill="white" opacity="0.9" />
          </svg>
          <span className="font-display font-bold text-xl text-foreground hidden sm:block group-hover:text-orbital-blue transition-colors">
            {t.common.orbital}
          </span>
        </Link>

        {/* ── SEARCH BAR ── */}
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-dark" />
            <input
              type="text"
              placeholder={t.placeholder.search}
              className="w-full ps-10 pe-4 py-2 bg-background-hover rounded-full text-sm text-foreground-dark placeholder-muted-dark border border-border-dark focus:border-orbital-blue focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* ── RIGHT ACTIONS ── */}
        <div className="flex items-center gap-4">
          {/* ── NOTIFICATIONS ── */}
          <button className="relative p-2 rounded-lg hover:bg-background-hover transition-colors group">
            <Bell className="w-5 h-5 text-muted-dark group-hover:text-orbital-blue" />
            <span className="absolute top-1 end-1 w-2 h-2 bg-orbital-pink rounded-full animate-pulse" />
          </button>

          {/* ── MESSAGES ── */}
          <button className="relative p-2 rounded-lg hover:bg-background-hover transition-colors group">
            <Mail className="w-5 h-5 text-muted-dark group-hover:text-orbital-violet" />
            <span className="absolute top-1 end-1 w-2 h-2 bg-orbital-gold rounded-full" />
          </button>

          {/* ── DIVIDER ── */}
          <div className="w-px h-6 bg-border-dark" />

          {/* ── THEME TOGGLE ── */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-background-hover transition-colors group"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-muted-dark group-hover:text-orbital-gold" />
            ) : (
              <Moon className="w-5 h-5 text-muted-dark group-hover:text-orbital-blue" />
            )}
          </button>

          {/* ── LANGUAGE TOGGLE ── */}
          <div className="flex items-center gap-1 p-1 bg-background-hover rounded-lg border border-border-dark">
            <button
              onClick={() => setLanguage("ar")}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                language === "ar"
                  ? "bg-orbital-blue text-white"
                  : "text-muted-dark hover:text-foreground-dark"
              }`}
            >
              ع
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                language === "en"
                  ? "bg-orbital-violet text-white"
                  : "text-muted-dark hover:text-foreground-dark"
              }`}
            >
              En
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE NAVBAR ── */}
      <nav className="fixed md:hidden top-0 inset-x-0 z-50 h-14 bg-background-dark/90 backdrop-blur-md border-b border-border-dark flex items-center justify-between px-4">
        {/* ── LOGO ── */}
        <Link href="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 160 160" fill="none">
            <ellipse
              cx="80"
              cy="80"
              rx="58"
              ry="22"
              stroke="#4a6cf7"
              strokeWidth="2"
              strokeOpacity="0.8"
              fill="none"
              transform="rotate(50 80 80)"
            />
            <ellipse
              cx="80"
              cy="80"
              rx="44"
              ry="16"
              stroke="#9b5cf6"
              strokeWidth="2.5"
              strokeOpacity="0.9"
              fill="none"
              transform="rotate(15 80 80)"
            />
            <circle cx="80" cy="80" r="10" fill="#a78bfa" opacity="0.5" />
            <circle cx="80" cy="80" r="5" fill="white" opacity="0.9" />
          </svg>
        </Link>

        {/* ── CENTER SEARCH ── */}
        <button
          onClick={() => setSearchActive(!searchActive)}
          className="p-2 rounded-lg hover:bg-background-hover"
        >
          <Search className="w-4 h-4 text-muted-dark" />
        </button>

        {/* ── RIGHT ACTIONS ── */}
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-background-hover relative">
            <Bell className="w-4 h-4 text-muted-dark" />
            <span className="absolute top-1 end-1 w-1.5 h-1.5 bg-orbital-pink rounded-full animate-pulse" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-background-hover"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      {mobileMenuOpen && (
        <div className="fixed md:hidden top-14 inset-x-0 bottom-0 z-40 bg-background-dark/95 backdrop-blur-sm animate-in">
          <div className="p-4 space-y-4">
            {/* ── THEME & LANGUAGE ── */}
            <div className="space-y-3">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-background-hover transition-colors"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-orbital-gold" />
                ) : (
                  <Moon className="w-5 h-5 text-orbital-blue" />
                )}
                <span className="text-sm">
                  {isDark ? t.settings.lightMode : t.settings.darkMode}
                </span>
              </button>

              <div className="flex gap-2 p-2 bg-background-hover rounded-lg">
                <button
                  onClick={() => setLanguage("ar")}
                  className={`flex-1 py-2 rounded text-xs font-semibold transition-all ${
                    language === "ar"
                      ? "bg-orbital-blue text-white"
                      : "text-muted-dark"
                  }`}
                >
                  العربية
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`flex-1 py-2 rounded text-xs font-semibold transition-all ${
                    language === "en"
                      ? "bg-orbital-violet text-white"
                      : "text-muted-dark"
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE TOP PADDING ── */}
      <div className="h-14 md:hidden" />
    </>
  );
}
