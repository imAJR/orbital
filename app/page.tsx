"use client";

import { Navbar }     from "@/components/Navbar";
import { Sidebar }    from "@/components/Sidebar";
import { CreatePost } from "@/components/CreatePost";
import { PostCard }   from "@/components/PostCard";
import { useAppStore }      from "@/lib/store/useAppStore";
import { useTranslation }   from "@/lib/hooks/useTranslation";
import { Sparkles, TrendingUp } from "lucide-react";

interface TrendingItem {
  id: string;
  tag: string;
  posts: number;
  trend: number;
}

export default function Home() {
  const { t }     = useTranslation();
  const { posts } = useAppStore();

  const trendingTopics: TrendingItem[] = [
    { id: "1", tag: "#OrbitalApp",    posts: 45230, trend: 23 },
    { id: "2", tag: "#WebDesign",     posts: 98450, trend: 45 },
    { id: "3", tag: "#NextJS",        posts: 67890, trend: 32 },
    { id: "4", tag: "#DesignTrends",  posts: 54320, trend: 18 },
    { id: "5", tag: "#CreativeTech",  posts: 32450, trend: 15 },
  ];

  return (
    <div className="flex flex-col bg-void min-h-screen">

      {/* ── NAVBAR ── */}
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-[256px_1fr] xl:grid-cols-[256px_1fr_320px] gap-6 w-full max-w-7xl mx-auto px-4 md:px-6">

        {/* ── SIDEBAR ── */}
        <Sidebar />

        {/* ── MAIN FEED ── */}
        <main className="min-w-0 w-full max-w-2xl mx-auto">

          {/* Feed header */}
          <div className="sticky top-0 md:top-16 z-40 bg-void/80 backdrop-blur-nav border-b border-rim px-6 py-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orbit-blue" />
              <h2 className="font-display font-bold text-lg text-text">
                {t.feed.following}
              </h2>
            </div>
          </div>

          {/* Create post */}
          <CreatePost />

          {/* Posts */}
          <div>
            {posts.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <p className="text-text-dim">{t.feed.noContent}</p>
                <p className="text-sm text-text-dim">{t.common.description}</p>
              </div>
            ) : (
              posts.map((post) => <PostCard key={post.id} postId={post.id} />)
            )}
          </div>

          {/* Load more */}
          {posts.length > 0 && (
            <div className="border-b border-rim p-6 text-center">
              <button className="px-8 py-2 rounded-pill border border-rim text-orbit-blue font-semibold hover:bg-hover transition-colors">
                {t.feed.loadMore}
              </button>
            </div>
          )}
        </main>

        {/* ── RIGHT SIDEBAR — TRENDING ── */}
        <aside className="hidden xl:flex w-80 flex-shrink-0 bg-void border-s border-rim flex-col sticky top-16 h-[calc(100vh-64px)]">

          {/* Search */}
          <div className="p-4 border-b border-rim">
            <input
              type="text"
              placeholder={t.placeholder.search}
              className="w-full px-4 py-2 rounded-pill bg-hover text-text placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-orbit-blue text-sm"
            />
          </div>

          {/* Trending */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-1">

              <div className="flex items-center gap-2 px-4 py-2 mb-3">
                <TrendingUp className="w-5 h-5 text-orbit-blue" />
                <h3 className="font-display font-bold text-lg text-text">
                  {t.feed.trending}
                </h3>
              </div>

              {trendingTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="px-4 py-3 hover:bg-hover rounded-lg transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-text group-hover:text-orbit-blue transition-colors">
                        {topic.tag}
                      </p>
                      <p className="text-xs text-text-dim">
                        {topic.posts.toLocaleString()} {t.feed.posts}
                      </p>
                    </div>
                    <div className="text-end">
                      <p className="text-xs text-orbit-teal font-semibold">
                        ↑ {topic.trend}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-rim text-xs text-text-dim space-y-1">
            <p>© 2026 {t.common.orbital}</p>
            <p>{t.common.tagline}</p>
          </div>
        </aside>

      </div>
    </div>
  );
}