"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useTranslation } from "@/lib/hooks/useTranslation";
import {
  Radio,
  Search,
  Plus,
  Users,
  MessageCircle,
  Settings,
  Bell,
  Lock,
  Zap,
  Hash,
} from "lucide-react";
import { useState } from "react";

export default function StationsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col bg-background-dark min-h-screen">
      <Navbar />

      <div className="flex flex-1 justify-center w-full max-w-7xl mx-auto px-4 md:px-6 gap-6">
        <Sidebar />

        <main className="flex-1 flex h-[calc(100vh-64px)] w-full min-w-0">
        <div className="w-full lg:w-96 border-e border-border-dark flex flex-col bg-background-dark">
          <div className="p-4 border-b border-border-dark space-y-4">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-orbital-blue" />
              <h2 className="font-display font-bold text-lg">
                {t.nav.stations}
              </h2>
            </div>
            <div className="relative">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-dark" />
              <input
                type="text"
                placeholder={t.placeholder.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full ps-10 pe-4 py-2 bg-background-hover rounded-full text-sm text-foreground-dark placeholder-muted-dark focus:outline-none focus:ring-2 focus:ring-orbital-blue"
              />
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-orbital-blue text-white font-semibold hover:bg-orbital-violet transition-colors">
              <Plus className="w-4 h-4" /> محطة جديدة
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 text-center text-muted-dark">
            <p>{t.feed.noContent}</p>
          </div>
        </div>

        <div className="hidden lg:flex flex-1 flex-col">
          <div className="flex-1 flex items-center justify-center text-muted-dark">
            <p>اختر محطة للبدء</p>
          </div>
        </div>
      </main>
    </div>
  </div>
  );
}
