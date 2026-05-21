"use client";

import { useTranslation } from "@/lib/hooks/useTranslation";
import { useAppStore } from "@/lib/store/useAppStore";
import {
  Home,
  Compass,
  Heart,
  Mail,
  Bookmark,
  User,
  Settings,
  MoreHorizontal,
  Play,
  Image,
  Zap,
  Ghost,
  Radio,
  Crown,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
  color?: string;
}

// خريطة الألوان الثابتة للشارات لضمان قيام Tailwind ببنائها
const badgeColors: Record<string, string> = {
  "orbital-pink": "bg-orbital-pink",
  "orbital-gold": "bg-orbital-gold",
  "orbital-blue": "bg-orbital-blue",
  "orbital-violet": "bg-orbital-violet",
  "orbital-teal": "bg-orbital-teal",
};

export function Sidebar() {
  const { t } = useTranslation();
  const { currentUser } = useAppStore();
  const pathname = usePathname();

  const mainNav: NavItem[] = [
    {
      label: t.nav.home,
      icon: <Home className="w-5 h-5" />,
      href: "/",
    },
    {
      label: t.nav.explore,
      icon: <Compass className="w-5 h-5" />,
      href: "/explore",
    },
    {
      label: t.nav.notifications,
      icon: <Heart className="w-5 h-5" />,
      href: "/notifications",
      badge: 5,
      color: "orbital-pink",
    },
    {
      label: t.nav.messages,
      icon: <Mail className="w-5 h-5" />,
      href: "/messages",
      badge: 3,
      color: "orbital-gold",
    },
    {
      label: t.nav.bookmarks,
      icon: <Bookmark className="w-5 h-5" />,
      href: "/bookmarks",
    },
  ];

  const contentNav: NavItem[] = [
    {
      label: t.nav.channels,
      icon: <Play className="w-5 h-5" />,
      href: "/channels",
      color: "orbital-pink",
    },
    {
      label: t.nav.gallery,
      icon: <Image className="w-5 h-5" />,
      href: "/gallery",
      color: "orbital-gold",
    },
    {
      label: t.nav.sparks,
      icon: <Zap className="w-5 h-5" />,
      href: "/sparks",
      color: "orbital-violet",
    },
    {
      label: t.nav.flickers,
      icon: <Ghost className="w-5 h-5" />,
      href: "/flickers",
      color: "orbital-teal",
    },
    {
      label: t.nav.stations,
      icon: <Radio className="w-5 h-5" />,
      href: "/stations",
      color: "orbital-blue",
    },
  ];

  const otherNav: NavItem[] = [
    {
      label: t.nav.ranks,
      icon: <Crown className="w-5 h-5" />,
      href: "/ranks",
      color: "orbital-gold",
    },
    {
      label: t.nav.store,
      icon: <ShoppingBag className="w-5 h-5" />,
      href: "/store",
    },
    {
      label: t.nav.settings,
      icon: <Settings className="w-5 h-5" />,
      href: "/settings",
    },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden md:flex sticky top-16 h-[calc(100vh-64px)] w-64 flex-shrink-0 flex-col bg-background-dark border-e border-border-dark overflow-y-auto">
        {/* ── MAIN NAVIGATION ── */}
        <div className="p-4 space-y-2">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                isActive(item.href)
                  ? "bg-background-hover text-orbital-blue"
                  : "text-muted-dark hover:bg-background-hover hover:text-foreground-dark"
              }`}
            >
              <div
                className={`transition-colors ${
                  isActive(item.href) ? "text-orbital-blue" : ""
                }`}
              >
                {item.icon}
              </div>
              <span className="text-sm font-medium flex-1">{item.label}</span>
              {item.badge && (
                <span
                  className={`text-xs ${badgeColors[item.color || ""] || "bg-gray-500"} text-white px-2 py-1 rounded-full font-semibold`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* ── DIVIDER ── */}
        <div className="h-px bg-border-dark mx-4" />

        {/* ── CONTENT NAVIGATION ── */}
        <div className="p-4 space-y-2">
          <p className="text-xs font-semibold text-muted-dark uppercase px-4 py-2">
            {t.nav.channels}
          </p>
          {contentNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                isActive(item.href)
                  ? "bg-background-hover text-orbital-blue"
                  : "text-muted-dark hover:bg-background-hover hover:text-foreground-dark"
              }`}
            >
              <div
                className={`transition-colors ${
                  isActive(item.href) ? `text-${item.color}` : ""
                }`}
              >
                {item.icon}
              </div>
              <span className="text-sm font-medium flex-1">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* ── DIVIDER ── */}
        <div className="h-px bg-border-dark mx-4" />

        {/* ── OTHER NAVIGATION ── */}
        <div className="p-4 space-y-2">
          {otherNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                isActive(item.href)
                  ? "bg-background-hover text-orbital-blue"
                  : "text-muted-dark hover:bg-background-hover hover:text-foreground-dark"
              }`}
            >
              <div
                className={`transition-colors ${
                  isActive(item.href) ? "text-orbital-blue" : ""
                }`}
              >
                {item.icon}
              </div>
              <span className="text-sm font-medium flex-1">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* ── SPACER ── */}
        <div className="flex-1" />

        {/* ── USER PROFILE SECTION ── */}
        {currentUser ? (
          <div className="p-4 border-t border-border-dark space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background-hover hover:bg-border-dark transition-colors cursor-pointer">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">
                  {currentUser.name}
                </p>
                <p className="text-xs text-muted-dark truncate">
                  @{currentUser.username}
                </p>
              </div>
              <button className="p-1 hover:bg-background-hover rounded-lg transition-colors">
                <MoreHorizontal className="w-4 h-4 text-muted-dark" />
              </button>
            </div>

            <Link
              href="/profile"
              className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orbital-blue to-orbital-violet text-white font-semibold hover:shadow-lg transition-all"
            >
              <User className="w-4 h-4" />
              <span className="text-sm">{t.nav.profile}</span>
            </Link>

            <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-orbital-pink hover:bg-background-hover transition-all text-sm font-semibold">
              <LogOut className="w-4 h-4" />
              {t.settings.logout}
            </button>
          </div>
        ) : (
          <div className="p-4 border-t border-border-dark">
            <Link
              href="/login"
              className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-orbital-blue to-orbital-violet text-white font-semibold hover:shadow-lg transition-all"
            >
              {t.actions.post}
            </Link>
          </div>
        )}
      </aside>

      {/* ── MOBILE BOTTOM NAVIGATION ── */}
      <nav className="fixed md:hidden bottom-0 inset-x-0 h-16 bg-background-dark/90 backdrop-blur-md border-t border-border-dark z-40">
        <div className="flex h-full items-center justify-around">
          {mainNav.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 h-16 gap-1 transition-colors relative ${
                isActive(item.href)
                  ? "text-orbital-blue"
                  : "text-muted-dark hover:text-foreground-dark"
              }`}
            >
              {item.icon}
              {item.badge && (
                <span className="absolute top-2 end-2 w-2 h-2 bg-orbital-pink rounded-full animate-pulse" />
              )}
            </Link>
          ))}

          {/* ── MORE MENU ── */}
          <Link
            href="/explore"
            className={`flex flex-col items-center justify-center w-16 h-16 gap-1 transition-colors ${
              isActive("/explore")
                ? "text-orbital-blue"
                : "text-muted-dark hover:text-foreground-dark"
            }`}
          >
            <MoreHorizontal className="w-5 h-5" />
          </Link>
        </div>
      </nav>

      {/* ── MOBILE BOTTOM PADDING ── */}
      <div className="h-16 md:hidden" />
    </>
  );
}
