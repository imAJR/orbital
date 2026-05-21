"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useTranslation } from "@/lib/hooks/useTranslation";
import {
  Ghost,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Clock,
  Flame,
  X,
  Download,
} from "lucide-react";
import { useState } from "react";

interface Flicker {
  id: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
    username: string;
    isVerified: boolean;
  };
  image: string;
  caption: string;
  expiresIn: string;
  views: number;
  likes: number;
  comments: number;
  isLiked: boolean;
  uploadedAt: string;
  isViewed: boolean;
  category: string;
}

interface StoryRing {
  userId: string;
  name: string;
  avatar: string;
  hasUnviewed: boolean;
  isVerified: boolean;
}

export default function FlickersPage() {
  const { t } = useTranslation();
  const [selectedFlicker, setSelectedFlicker] = useState<Flicker | null>(null);
  const [viewedFlickers, setViewedFlickers] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = [
    { id: "all", label: "الكل" },
    { id: "daily", label: "يومي" },
    { id: "lifestyle", label: "نمط حياة" },
  ];

  const storyRings: StoryRing[] = [
    {
      userId: "user-1",
      name: "فاطمة",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      hasUnviewed: true,
      isVerified: true,
    },
    {
      userId: "user-2",
      name: "محمد",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      hasUnviewed: true,
      isVerified: false,
    },
  ];

  const flickers: Flicker[] = [
    {
      id: "flicker-1",
      creator: {
        id: "user-1",
        name: "فاطمة",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        username: "fatima_daily",
        isVerified: true,
      },
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=600&fit=crop",
      caption: "يوم جميل مع أصدقائي 😊",
      expiresIn: "متبقي 4 ساعات",
      views: 234,
      likes: 89,
      comments: 23,
      isLiked: false,
      uploadedAt: "منذ 2 ساعة",
      isViewed: false,
      category: "daily",
    },
    {
      id: "flicker-2",
      creator: {
        id: "user-2",
        name: "محمد",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        username: "mohammad_travel",
        isVerified: false,
      },
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=600&fit=crop",
      caption: "في الجبال الرائعة 🏔️",
      expiresIn: "متبقي 8 ساعات",
      views: 567,
      likes: 234,
      comments: 67,
      isLiked: true,
      uploadedAt: "منذ 8 ساعات",
      isViewed: true,
      category: "travel",
    },
  ];

  const filteredFlickers = flickers.filter(
    (flicker) =>
      filterCategory === "all" || flicker.category === filterCategory,
  );

  const handleFlickerClick = (flicker: Flicker) => {
    setSelectedFlicker(flicker);
    if (!viewedFlickers.includes(flicker.id))
      setViewedFlickers([...viewedFlickers, flicker.id]);
  };

  return (
    <div className="flex flex-col bg-background-dark min-h-screen">
      <Navbar />

      <div className="flex flex-1 justify-center w-full max-w-7xl mx-auto px-4 md:px-6 gap-6">
        <Sidebar />

        <main className="flex-1 w-full min-w-0">
        <div className="sticky top-0 md:top-16 z-40 bg-background-dark/80 backdrop-blur-md border-b border-border-dark px-6 py-4 flex items-center gap-2">
          <Ghost className="w-6 h-6 text-orbital-pink" />
          <h1 className="font-display font-bold text-xl">{t.nav.flickers}</h1>
        </div>

        <div className="max-w-7xl mx-auto space-y-8 p-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-dark uppercase">
              الومضات من أصدقائك
            </p>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {storyRings.map((ring) => (
                <button
                  key={ring.userId}
                  className="flex-shrink-0 group text-center space-y-2"
                >
                  <div
                    className={`relative w-20 h-20 rounded-full p-1 transition-all ${ring.hasUnviewed ? "bg-gradient-to-br from-orbital-pink to-orbital-violet" : "bg-gradient-to-br from-orbital-teal to-orbital-blue opacity-50"}`}
                  >
                    <img
                      src={ring.avatar}
                      alt={ring.name}
                      className="w-full h-full rounded-full object-cover border-4 border-background-dark"
                    />
                    {ring.hasUnviewed && (
                      <div className="absolute bottom-0 end-0 w-5 h-5 bg-orbital-pink rounded-full border-2 border-background-dark flex items-center justify-center">
                        <span className="text-white text-xs font-bold">!</span>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-foreground-dark line-clamp-1">
                      {ring.name}
                    </p>
                    {ring.isVerified && (
                      <span className="text-orbital-blue text-xs">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm ${filterCategory === cat.id ? "bg-orbital-pink text-white" : "bg-background-hover text-foreground-dark hover:bg-background-hover/70"}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {filteredFlickers.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Ghost className="w-12 h-12 text-muted-dark mx-auto opacity-50" />
              <p className="text-muted-dark">{t.feed.noContent}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredFlickers.map((flicker) => (
                <button
                  key={flicker.id}
                  onClick={() => handleFlickerClick(flicker)}
                  className="relative group aspect-[9/16] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer"
                  style={{
                    borderColor: viewedFlickers.includes(flicker.id)
                      ? "rgba(148, 163, 184, 0.5)"
                      : "rgba(74, 108, 247, 0.5)",
                  }}
                >
                  <img
                    src={flicker.image}
                    alt={flicker.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute top-3 start-3 end-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <img
                      src={flicker.creator.avatar}
                      alt={flicker.creator.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-semibold text-white truncate">
                          {flicker.creator.name}
                        </p>
                        {flicker.creator.isVerified && (
                          <span className="text-orbital-blue text-xs flex-shrink-0">
                            ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-3 end-3 px-2 py-1 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs text-white flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {flicker.expiresIn}
                    </p>
                  </div>

                  <div className="absolute bottom-0 start-0 end-0 p-3 text-white space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm font-semibold line-clamp-2">
                      {flicker.caption}
                    </p>
                    <div className="flex gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {flicker.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {flicker.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {flicker.comments}
                      </span>
                    </div>
                  </div>
                  {viewedFlickers.includes(flicker.id) && (
                    <div className="absolute top-2 end-2 w-3 h-3 rounded-full bg-success opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedFlicker && (
          <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4 md:p-0">
            <div className="relative w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden bg-background-dark">
              <img
                src={selectedFlicker.image}
                alt={selectedFlicker.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
              <button
                onClick={() => setSelectedFlicker(null)}
                className="absolute top-4 end-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="absolute top-6 start-6 flex items-center gap-3">
                <img
                  src={selectedFlicker.creator.avatar}
                  alt={selectedFlicker.creator.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-white text-sm">
                      {selectedFlicker.creator.name}
                    </p>
                    {selectedFlicker.creator.isVerified && (
                      <span className="text-orbital-blue">✓</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-300">
                    @{selectedFlicker.creator.username}
                  </p>
                </div>
              </div>
              <div className="absolute top-6 end-6 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                <p className="text-xs text-white flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedFlicker.expiresIn}
                </p>
              </div>

              <div className="absolute bottom-0 start-0 end-0 p-6 space-y-4">
                <p className="text-lg font-semibold text-white">
                  {selectedFlicker.caption}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      icon: <Eye className="w-5 h-5" />,
                      value: selectedFlicker.views,
                      label: t.feed.views,
                    },
                    {
                      icon: <Heart className="w-5 h-5" />,
                      value: selectedFlicker.likes,
                      label: t.feed.likes,
                    },
                    {
                      icon: <MessageCircle className="w-5 h-5" />,
                      value: selectedFlicker.comments,
                      label: t.feed.comments,
                    },
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="flex justify-center mb-2 text-orbital-pink">
                        {stat.icon}
                      </div>
                      <p className="font-semibold text-white text-sm">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-300">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-orbital-pink/20 text-orbital-pink hover:bg-orbital-pink/30 font-semibold transition-colors">
                    <Heart
                      className="w-5 h-5"
                      fill={selectedFlicker.isLiked ? "currentColor" : "none"}
                    />
                    {t.actions.like}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 font-semibold transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    {t.actions.comment}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 font-semibold transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  </div>
  );
}
