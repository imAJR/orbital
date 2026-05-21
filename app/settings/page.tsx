"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useAppStore } from "@/lib/store/useAppStore";
import { useTheme } from "@/lib/hooks/useTheme";
import {
  ArrowLeft,
  User,
  Lock,
  Bell,
  Palette,
  Globe,
  Shield,
  LogOut,
  Trash2,
  ChevronRight,
  Sun,
  Moon,
  Monitor,
  ToggleRight,
  ToggleLeft,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
  const { t, language } = useTranslation();
  const { setLanguage, theme, setTheme } = useAppStore();
  const { isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("account");

  const sections = [
    {
      id: "account",
      label: t.settings.account,
      icon: <User className="w-5 h-5" />,
      description: "إدارة بيانات الحساب",
    },
  ];

  return (
    <div className="flex flex-col bg-background-dark min-h-screen">
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-[256px_1fr] gap-6 w-full max-w-7xl mx-auto px-4 md:px-6">
        <Sidebar />

        <main className="min-w-0 w-full max-w-4xl mx-auto">
        <div className="sticky top-0 md:top-16 z-40 bg-background-dark/80 backdrop-blur-md border-b border-border-dark px-6 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 rounded-full hover:bg-background-hover">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-display font-bold text-lg">{t.nav.settings}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
          <div className="md:col-span-1 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-start ${activeSection === section.id ? "bg-background-hover text-orbital-blue border-s-2 border-orbital-blue" : "text-foreground-dark hover:bg-background-hover"}`}
              >
                <div
                  className={
                    activeSection === section.id
                      ? "text-orbital-blue"
                      : "text-muted-dark"
                  }
                >
                  {section.icon}
                </div>
                <div className="hidden md:flex flex-col">
                  <p className="font-semibold text-sm">{section.label}</p>
                  <p className="text-xs text-muted-dark">
                    {section.description}
                  </p>
                </div>
              </button>
            ))}

            <div className="pt-6 border-t border-border-dark mt-6">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-orbital-pink hover:bg-orbital-pink/10 transition-all text-start font-semibold">
                <LogOut className="w-5 h-5" />
                <span className="hidden md:block">{t.settings.logout}</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-error hover:bg-error/10 transition-all text-start font-semibold mt-2">
                <Trash2 className="w-5 h-5" />
                <span className="hidden md:block">
                  {t.settings.deleteAccount}
                </span>
              </button>
            </div>
          </div>

          <div className="md:col-span-3 bg-background-hover/30 border border-border-dark rounded-xl p-6">
            <h3 className="font-display font-bold text-lg mb-4">
              {t.settings.account}
            </h3>
            {/* Content Area */}
          </div>
        </div>
      </main>
    </div>
  </div>
  );
}
