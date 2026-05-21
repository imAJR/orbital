"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { PostCard } from "@/components/PostCard";
import { useAppStore } from "@/lib/store/useAppStore";
import {
  Search,
  TrendingUp,
  Users,
  Flame,
  Star,
  Zap,
  Filter,
} from "lucide-react";
import { useState } from "react";

interface ExploreTab {
  id: string;
  label: string;
  icon: React.ReactNode;
}
interface TrendingTopic {
  id: string;
  tag: string;
  posts: number;
  trend: number;
  category: string;
}
interface UserSuggestion {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  isFollowing: boolean;
}

export default function ExplorePage() {
  const { t } = useTranslation();
  const { posts } = useAppStore();
  const [activeTab, setActiveTab] = useState("discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const tabs: ExploreTab[] = [
    { id: "discover", label: "استكشف", icon: <Zap className="w-5 h-5" /> },
    {
      id: "trending",
      label: "الترندات",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    { id: "people", label: "الأشخاص", icon: <Users className="w-5 h-5" /> },
  ];

  const categories = [
    { id: "all", label: "الكل", icon: <Flame className="w-4 h-4" /> },
    { id: "design", label: "التصميم", icon: <Star className="w-4 h-4" /> },
    { id: "tech", label: "التكنولوجيا", icon: <Zap className="w-4 h-4" /> },
  ];

  const trendingTopics: TrendingTopic[] = [
    { id: "1", tag: "#OrbitalApp", posts: 45230, trend: 23, category: "tech" },
    { id: "2", tag: "#WebDesign", posts: 98450, trend: 45, category: "design" },
  ];

  const userSuggestions: UserSuggestion[] = [
    {
      id: "user-1",
      name: "فاطمة ديزاين",
      username: "fatima_design",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      followers: 5420,
      isFollowing: false,
    },
    {
      id: "user-2",
      name: "محمد المطور",
      username: "dev_master",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      followers: 8900,
      isFollowing: false,
    },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      post.content.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col bg-background-dark min-h-screen">
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-[256px_1fr] xl:grid-cols-[256px_1fr_320px] gap-6 w-full max-w-7xl mx-auto px-4 md:px-6">
        <Sidebar />

        <main className="min-w-0 w-full max-w-2xl mx-auto">
        <div className="sticky top-0 md:top-16 z-40 bg-background-dark/80 backdrop-blur-md border-b border-border-dark p-6 space-y-4">
          <h1 className="font-display font-bold text-2xl">{t.nav.explore}</h1>
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-dark" />
            <input
              type="text"
              placeholder={t.placeholder.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-10 pe-4 py-3 bg-background-hover rounded-full text-foreground-dark placeholder-muted-dark focus:outline-none focus:ring-2 focus:ring-orbital-blue"
            />
          </div>
        </div>

        <div className="border-b border-border-dark px-6 py-4 flex gap-8 overflow-x-auto sticky top-0 md:top-[88px] z-30 bg-background-dark/50 backdrop-blur-sm">
          {tabs.map((tabItem) => (
            <button
              key={tabItem.id}
              onClick={() => setActiveTab(tabItem.id)}
              className={`flex items-center gap-2 pb-4 font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${activeTab === tabItem.id ? "border-orbital-blue text-orbital-blue" : "border-transparent text-muted-dark hover:text-foreground-dark"}`}
            >
              {tabItem.icon} {tabItem.label}
            </button>
          ))}
        </div>

        {activeTab === "discover" && (
          <div className="space-y-6">
            <div className="px-6 py-4 border-b border-border-dark space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-orbital-blue" />
                <p className="text-sm font-semibold text-muted-dark">الفئات</p>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${selectedCategory === cat.id ? "bg-orbital-blue text-white" : "bg-background-hover text-foreground-dark hover:bg-background-hover/70"}`}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              {filteredPosts.length === 0 ? (
                <div className="p-12 text-center space-y-3">
                  <Zap className="w-12 h-12 text-muted-dark mx-auto opacity-50" />
                  <p className="text-muted-dark">{t.feed.noContent}</p>
                </div>
              ) : (
                filteredPosts
                  .slice(0, 5)
                  .map((post) => <PostCard key={post.id} postId={post.id} />)
              )}
            </div>
          </div>
        )}

        {activeTab === "trending" && (
          <div className="divide-y divide-border-dark">
            {trendingTopics.map((topic) => (
              <button
                key={topic.id}
                className="w-full p-4 hover:bg-background-hover transition-colors text-start"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground-dark hover:underline">
                      {topic.tag}
                    </p>
                    <p className="text-xs text-muted-dark mt-1">
                      الفئة:{" "}
                      {categories.find((c) => c.id === topic.category)?.label}
                    </p>
                    <p className="text-sm text-muted-dark">
                      {topic.posts.toLocaleString()} منشور
                    </p>
                  </div>
                  <div className="text-end flex-shrink-0">
                    <p className="text-sm font-semibold text-success">
                      ↑ {topic.trend}%
                    </p>
                    <TrendingUp className="w-4 h-4 text-success mt-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === "people" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            {userSuggestions.map((user) => (
              <div
                key={user.id}
                className="p-4 border border-border-dark rounded-lg hover:bg-background-hover transition-colors space-y-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground-dark truncate">
                      {user.name}
                    </p>
                    <p className="text-sm text-muted-dark">@{user.username}</p>
                    <p className="text-xs text-muted-dark mt-1">
                      {user.followers.toLocaleString()} متابع
                    </p>
                  </div>
                  <button className="px-4 py-1 rounded-full bg-orbital-blue text-white text-xs font-semibold hover:bg-orbital-violet transition-colors flex-shrink-0">
                    {t.actions.follow}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* تم تغيير الفرع لـ xl ليتسع Layout الفيد ولا يعطل الاتجاهات */}
      <aside className="hidden xl:flex w-80 flex-shrink-0 bg-background-dark border-s border-border-dark flex-col sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
        <div className="p-4 border-b border-border-dark space-y-4">
          <h3 className="font-display font-bold text-lg">أفضل الترندات</h3>
          <div className="space-y-2">
            {trendingTopics.slice(0, 5).map((topic) => (
              <button
                key={topic.id}
                className="w-full p-3 rounded-lg hover:bg-background-hover transition-colors text-start"
              >
                <p className="font-semibold text-foreground-dark">
                  {topic.tag}
                </p>
                <p className="text-xs text-muted-dark">
                  {topic.posts.toLocaleString()} منشور · ↑ {topic.trend}%
                </p>
              </button>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-border-dark space-y-4 flex-1">
          <h3 className="font-display font-bold text-lg">اتبع الأشخاص</h3>
          <div className="space-y-3">
            {userSuggestions.slice(0, 3).map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-background-hover transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground-dark truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-dark">@{user.username}</p>
                </div>
                <button className="px-3 py-1 rounded-full bg-orbital-blue text-white text-xs font-semibold hover:bg-orbital-violet transition-colors flex-shrink-0">
                  متابعة
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  </div>
  );
}
