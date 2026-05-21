"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useTranslation } from "@/lib/hooks/useTranslation";
import {
  Play,
  Search,
  Filter,
  Plus,
  Users,
  Eye,
  ThumbsUp,
  Share2,
  MoreHorizontal,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

interface Channel {
  id: string;
  name: string;
  avatar: string;
  cover: string;
  description: string;
  subscribers: number;
  videos: number;
  isSubscribed: boolean;
  isVerified: boolean;
  category: string;
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channel: { name: string; avatar: string };
  views: number;
  likes: number;
  duration: string;
  uploadedAt: string;
}

export default function ChannelsPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"browse" | "subscribed">("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "الكل" },
    { id: "tech", label: "التكنولوجيا" },
    { id: "design", label: "التصميم" },
    { id: "education", label: "التعليم" },
    { id: "entertainment", label: "الترفيه" },
    { id: "music", label: "الموسيقى" },
  ];

  const channels: Channel[] = [
    {
      id: "ch-1",
      name: "قناة التصميم الاحترافي",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      cover:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=300&fit=crop",
      description: "تعلم التصميم الاحترافي من الصفر إلى الاحتراف 🎨",
      subscribers: 54200,
      videos: 234,
      isSubscribed: false,
      isVerified: true,
      category: "design",
    },
    {
      id: "ch-2",
      name: "مختبر البرمجة",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      cover:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=300&fit=crop",
      description: "دروس برمجة عملية مع مشاريع حقيقية 💻",
      subscribers: 89300,
      videos: 456,
      isSubscribed: true,
      isVerified: true,
      category: "tech",
    },
  ];

  const videos: Video[] = [
    {
      id: "vid-1",
      title: "بدء رحلتك في التصميم - الدرس الأول",
      thumbnail:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
      channel: {
        name: "قناة التصميم الاحترافي",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
      },
      views: 12500,
      likes: 890,
      duration: "45:32",
      uploadedAt: "منذ أسبوع",
    },
    {
      id: "vid-2",
      title: "React Hooks Deep Dive - Advanced Patterns",
      thumbnail:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop",
      channel: {
        name: "مختبر البرمجة",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      },
      views: 34200,
      likes: 2340,
      duration: "58:15",
      uploadedAt: "منذ 3 أيام",
    },
  ];

  const filteredChannels = channels.filter(
    (ch) =>
      (selectedCategory === "all" || ch.category === selectedCategory) &&
      (ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.description.toLowerCase().includes(searchQuery.toLowerCase())),
  );
  const displayChannels =
    activeTab === "subscribed"
      ? filteredChannels.filter((ch) => ch.isSubscribed)
      : filteredChannels;

  return (
    <div className="flex flex-col bg-background-dark min-h-screen">
      <Navbar />

      <div className="flex flex-1 justify-center w-full max-w-7xl mx-auto px-4 md:px-6 gap-6">
        <Sidebar />

        <main className="flex-1 max-w-6xl w-full min-w-0">
        <div className="sticky top-0 md:top-16 z-40 bg-background-dark/80 backdrop-blur-md border-b border-border-dark p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Play className="w-6 h-6 text-orbital-pink" />
            <h1 className="font-display font-bold text-2xl">
              {t.nav.channels}
            </h1>
          </div>

          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-dark" />
            <input
              type="text"
              placeholder={t.placeholder.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-10 pe-4 py-3 bg-background-hover rounded-full text-foreground-dark placeholder-muted-dark focus:outline-none focus:ring-2 focus:ring-orbital-pink"
            />
          </div>
        </div>

        <div className="border-b border-border-dark px-6 py-4 flex gap-8 sticky top-0 md:top-[140px] z-30 bg-background-dark/50 backdrop-blur-sm">
          {[
            { id: "browse" as const, label: "استكشف القنوات" },
            { id: "subscribed" as const, label: "قنواتي المتابعة" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 font-semibold text-sm transition-all border-b-2 ${activeTab === tab.id ? "border-orbital-pink text-orbital-pink" : "border-transparent text-muted-dark hover:text-foreground-dark"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="px-6 py-4 border-b border-border-dark flex gap-2 overflow-x-auto">
          <Filter className="w-4 h-4 text-orbital-pink flex-shrink-0 mt-1" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${selectedCategory === cat.id ? "bg-orbital-pink text-white" : "bg-background-hover text-foreground-dark hover:bg-background-hover/70"}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-6">
          {displayChannels.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Play className="w-12 h-12 text-muted-dark mx-auto opacity-50" />
              <p className="text-muted-dark">{t.feed.noContent}</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <h2 className="font-display font-bold text-lg">القنوات</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayChannels.map((channel) => (
                    <div
                      key={channel.id}
                      className="border border-border-dark rounded-xl overflow-hidden hover:border-orbital-pink transition-colors group cursor-pointer"
                    >
                      <div className="relative h-32 bg-gradient-to-br from-orbital-pink/20 to-orbital-violet/20 overflow-hidden">
                        <img
                          src={channel.cover}
                          alt={channel.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between -mt-8 relative z-10">
                          <img
                            src={channel.avatar}
                            alt={channel.name}
                            className="w-16 h-16 rounded-full object-cover border-4 border-background-dark"
                          />
                          <button className="p-2 rounded-full hover:bg-background-hover text-muted-dark hover:text-orbital-pink transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground-dark group-hover:text-orbital-pink transition-colors">
                              {channel.name}
                            </h3>
                            {channel.isVerified && (
                              <CheckCircle className="w-4 h-4 text-orbital-blue" />
                            )}
                          </div>
                          <p className="text-xs text-muted-dark">
                            {channel.subscribers.toLocaleString()} متابع ·{" "}
                            {channel.videos} فيديو
                          </p>
                        </div>
                        <p className="text-sm text-muted-dark line-clamp-2">
                          {channel.description}
                        </p>
                        <button
                          className={`w-full py-2 rounded-lg font-semibold text-sm transition-all ${channel.isSubscribed ? "bg-background-hover text-foreground-dark hover:bg-background-hover/70" : "bg-gradient-to-r from-orbital-pink to-orbital-violet text-white hover:shadow-lg hover:shadow-pink-500/50"}`}
                        >
                          {channel.isSubscribed
                            ? t.actions.unfollow
                            : t.actions.follow}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="font-display font-bold text-lg">
                  الفيديوهات الأخيرة
                </h2>
                <div className="space-y-3">
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      className="flex gap-4 p-3 rounded-lg hover:bg-background-hover transition-colors group cursor-pointer"
                    >
                      <div className="relative w-40 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-background-hover">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <span className="absolute bottom-1 end-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <h3 className="font-semibold text-foreground-dark group-hover:text-orbital-pink transition-colors line-clamp-2">
                          {video.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <img
                            src={video.channel.avatar}
                            alt={video.channel.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <p className="text-sm text-muted-dark">
                            {video.channel.name}
                          </p>
                        </div>
                        <div className="flex gap-4 text-xs text-muted-dark">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {video.views.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {video.likes.toLocaleString()}
                          </span>
                          <span>{video.uploadedAt}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  </div>
  );
}
