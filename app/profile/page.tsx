"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useAppStore } from "@/lib/store/useAppStore";
import { PostCard } from "@/components/PostCard";
import {
  ArrowLeft,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Share,
  MoreHorizontal,
  Image,
  Heart,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const { t } = useTranslation();
  const { currentUser, posts } = useAppStore();
  const [tab, setTab] = useState<"posts" | "media" | "likes">("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  if (!currentUser) return null;

  return (
    <div className="flex flex-col bg-background-dark min-h-screen">
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-[256px_1fr] gap-6 w-full max-w-7xl mx-auto px-4 md:px-6">
        <Sidebar />

        <main className="min-w-0 w-full max-w-2xl mx-auto">
        <div className="sticky top-0 md:top-16 z-40 bg-background-dark/80 backdrop-blur-md border-b border-border-dark px-6 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 rounded-full hover:bg-background-hover">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="font-display font-bold text-lg">
              {currentUser.name}
            </h2>
            <p className="text-xs text-muted-dark">
              {posts.length} {t.profile.posts}
            </p>
          </div>
        </div>

        <div className="relative h-48 md:h-56 bg-gradient-to-br from-orbital-blue to-orbital-violet group">
          {currentUser.cover && (
            <img
              src={currentUser.cover}
              alt="cover"
              className="w-full h-full object-cover"
            />
          )}
          <button className="absolute top-4 end-4 p-2 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70">
            <Image className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="px-6 pb-6 border-b border-border-dark space-y-4">
          <div className="flex items-start justify-between -mt-16 relative z-10">
            <div className="relative group">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-background-dark"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-background-hover text-muted-dark hover:text-orbital-blue transition-colors">
                <Share className="w-5 h-5" />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 rounded-full hover:bg-background-hover text-muted-dark hover:text-orbital-blue transition-colors"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
                {showMenu && (
                  <div className="absolute end-0 top-full mt-2 w-48 bg-background-dark border border-border-dark rounded-xl shadow-lg z-50">
                    <button className="w-full text-start px-4 py-3 hover:bg-background-hover text-sm text-foreground-dark border-b border-border-dark">
                      {t.actions.block}
                    </button>
                    <button className="w-full text-start px-4 py-3 hover:bg-background-hover text-sm text-orbital-pink">
                      {t.actions.report}
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${isFollowing ? "bg-background-hover text-foreground-dark hover:bg-background-hover/70" : "bg-orbital-blue text-white hover:bg-orbital-violet"}`}
              >
                {isFollowing ? t.actions.unfollow : t.actions.follow}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground-dark">
                {currentUser.name}
              </h1>
              <p className="text-muted-dark">@{currentUser.username}</p>
            </div>
            <p className="text-foreground-dark text-sm leading-normal">
              {currentUser.bio}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-dark">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>السعودية</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>انضم في يناير 2024</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  );
}
