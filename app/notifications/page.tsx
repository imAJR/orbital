"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useAppStore } from "@/lib/store/useAppStore";
import {
  Heart,
  MessageCircle,
  UserPlus,
  Repeat2,
  AtSign,
  Trash2,
  Bell,
} from "lucide-react";
import { useState } from "react";

export default function NotificationsPage() {
  const { t } = useTranslation();
  const [filterType, setFilterType] = useState<string>("all");

  const notifications = [
    {
      id: "notif-1",
      type: "like",
      actor: {
        name: "فاطمة ديزاين",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      },
      timestamp: new Date("2026-05-21T19:05:00Z"),
      isRead: false,
    },
  ];

  return (
    <div className="flex flex-col bg-background-dark min-h-screen">
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-[256px_1fr] gap-6 w-full max-w-7xl mx-auto px-4 md:px-6">
        <Sidebar />

        <main className="min-w-0 w-full max-w-2xl mx-auto">
        <div className="sticky top-0 md:top-16 z-40 bg-background-dark/80 backdrop-blur-md border-b border-border-dark px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-orbital-blue" />
              <h2 className="font-display font-bold text-lg text-foreground-dark">
                {t.nav.notifications}
              </h2>
            </div>
            <button className="text-sm text-orbital-blue hover:underline font-semibold">
              {t.notifications.markAsRead}
            </button>
          </div>
        </div>

        <div className="border-b border-border-dark px-6 py-4 flex gap-4 overflow-x-auto">
          {[
            { value: "all", label: t.feed.recent },
            { value: "like", label: t.actions.like },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setFilterType(filter.value)}
              className={`whitespace-nowrap pb-4 font-semibold text-sm transition-all border-b-2 ${filterType === filter.value ? "border-orbital-blue text-orbital-blue" : "border-transparent text-muted-dark hover:text-foreground-dark"}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="divide-y divide-border-dark">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-6 hover:bg-background-hover transition-colors group ${!notif.isRead ? "bg-background-hover/50" : ""}`}
            >
              <div className="flex gap-4">
                <img
                  src={notif.actor.avatar}
                  alt={notif.actor.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-foreground-dark">
                      <span className="font-semibold hover:underline cursor-pointer">
                        {notif.actor.name}
                      </span>
                    </p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!notif.isRead && (
                        <div className="w-2 h-2 rounded-full bg-orbital-blue" />
                      )}
                      <p className="text-xs text-muted-dark whitespace-nowrap">
                        {notif.timestamp.toLocaleDateString("ar-SA")}
                      </p>
                    </div>
                  </div>
                </div>
                <button className="p-2 rounded-full hover:bg-orbital-pink/10 text-muted-dark hover:text-orbital-pink opacity-0 group-hover:opacity-100 transition-all flex-shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  </div>
  );
}
