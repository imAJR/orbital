"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { CreatePost } from "@/components/CreatePost";
import { PostCard } from "@/components/PostCard";
import { useAppStore } from "@/lib/store/useAppStore";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { Sparkles, TrendingUp } from "lucide-react";

interface TrendingItem {
  id: string;
  tag: string;
  posts: number;
  trend: number;
}

export default function Home() {
  const { t } = useTranslation();
  const { posts } = useAppStore();

  const trendingTopics: TrendingItem[] = [
    { id: "1", tag: "#OrbitalApp", posts: 45230, trend: 23 },
    { id: "2", tag: "#WebDesign", posts: 98450, trend: 45 },
    { id: "3", tag: "#NextJS", posts: 67890, trend: 32 },
    { id: "4", tag: "#DesignTrends", posts: 54320, trend: 18 },
    { id: "5", tag: "#CreativeTech", posts: 32450, trend: 15 },
  ];

  return (
    <div className="flex flex-col bg-background-dark min-h-screen">
      {/* ── NAVBAR ── */}
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-[256px_1fr] xl:grid-cols-[256px_1fr_320px] gap-6 w-full max-w-7xl mx-auto px-4 md:px-6">
        {/* ── SIDEBAR ── */}
        <Sidebar />

        {/* ── MAIN CONTENT ── */}
        <main className="min-w-0 w-full max-w-2xl mx-auto">
        {/* ── FEED HEADER ── */}
        <div className="sticky top-0 md:top-16 z-40 bg-background-dark/80 backdrop-blur-md border-b border-border-dark px-6 py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orbital-blue" />
            <h2 className="font-display font-bold text-lg text-foreground-dark">
              {t.feed.following}
            </h2>
          </div>
        </div>

        {/* ── CREATE POST ── */}
        <CreatePost />

        {/* ── POSTS FEED ── */}
        <div>
          {posts.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <p className="text-muted-dark">{t.feed.noContent}</p>
              <p className="text-sm text-muted-dark">{t.common.description}</p>
            </div>
          ) : (
            posts.map((post) => <PostCard key={post.id} postId={post.id} />)
          )}
        </div>

        {/* ── LOAD MORE ── */}
        {posts.length > 0 && (
          <div className="border-b border-border-dark p-6 text-center">
            <button className="px-8 py-2 rounded-full border border-border-dark text-orbital-blue font-semibold hover:bg-background-hover transition-colors">
              {t.feed.loadMore}
            </button>
          </div>
        )}
      </main>

      {/* ── RIGHT SIDEBAR (TRENDING) ── */}
      {/* تم تغيير border-l إلى border-s ليتوافق مع الاتجاهين والـ xl ليتسع Layout */}
      <aside className="hidden xl:flex w-80 flex-shrink-0 bg-background-dark border-s border-border-dark flex-col sticky top-16 h-[calc(100vh-64px)]">
        {/* ── SEARCH ── */}
        <div className="p-4 border-b border-border-dark">
          <input
            type="text"
            placeholder={t.placeholder.search}
            className="w-full px-4 py-2 rounded-full bg-background-hover text-foreground-dark placeholder-muted-dark focus:outline-none focus:ring-2 focus:ring-orbital-blue text-sm"
          />
        </div>

        {/* ── TRENDING SECTION ── */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-1">
            <div className="flex items-center gap-2 px-4 py-2 mb-3">
              <TrendingUp className="w-5 h-5 text-orbital-blue" />
              <h3 className="font-display font-bold text-lg">
                {t.feed.trending}
              </h3>
            </div>

            {trendingTopics.map((topic) => (
              <div
                key={topic.id}
                className="px-4 py-3 hover:bg-background-hover rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-foreground-dark group-hover:text-orbital-blue transition-colors">
                      {topic.tag}
                    </p>
                    <p className="text-xs text-muted-dark">
                      {topic.posts.toLocaleString()} {t.feed.posts}
                    </p>
                  </div>
                  <div className="text-end">
                    <p className="text-xs text-success font-semibold">
                      ↑ {topic.trend}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="p-4 border-t border-border-dark text-xs text-muted-dark space-y-2">
          <p>© 2026 {t.common.orbital}</p>
          <p>{t.common.tagline}</p>
        </div>
      </aside>
    </div>
  </div>
  );
}
