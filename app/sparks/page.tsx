"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useTranslation } from "@/lib/hooks/useTranslation";
import {
  Zap,
  Heart,
  MessageCircle,
  Share2,
  Play,
  Volume2,
  VolumeX,
  MoreHorizontal,
  Flame,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useState } from "react";

interface Spark {
  id: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
    username: string;
    isVerified: boolean;
  };
  videoUrl: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isLiked: boolean;
  uploadedAt: string;
  tags: string[];
  category: string;
}

export default function SparksPage() {
  const { t } = useTranslation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("trending");

  const categories = [
    { id: "all", label: "الكل" },
    { id: "funny", label: "مضحك" },
    { id: "dance", label: "رقص" },
    { id: "music", label: "موسيقى" },
    { id: "sports", label: "رياضة" },
    { id: "education", label: "تعليم" },
    { id: "trending", label: "ترندات" },
  ];

  const sparks: Spark[] = [
    {
      id: "spark-1",
      creator: {
        id: "user-1",
        name: "علي الكوميديا",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        username: "ali_comedy",
        isVerified: true,
      },
      videoUrl: "https://media.w3.org/2016/12/sample_video.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=600&fit=crop",
      title: "نكتة مجنونة 😂",
      description: "أعتقد أن هذا أضحك شيء شفته اليوم!",
      duration: "0:45",
      likes: 12450,
      comments: 2340,
      shares: 890,
      views: 234567,
      isLiked: false,
      uploadedAt: "منذ ساعة",
      tags: ["مضحك", "كوميديا", "نكتة"],
      category: "funny",
    },
    {
      id: "spark-2",
      creator: {
        id: "user-2",
        name: "فاطمة الراقصة",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        username: "fatima_dance",
        isVerified: true,
      },
      videoUrl: "https://media.w3.org/2016/12/sample_video.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=600&fit=crop",
      title: "حركة رقص جديدة 💃",
      description: "جربت هالحركة الجديدة واللي بتحبها تجربها معي!",
      duration: "1:02",
      likes: 34567,
      comments: 5670,
      shares: 2340,
      views: 567890,
      isLiked: true,
      uploadedAt: "منذ 2 ساعة",
      tags: ["رقص", "موسيقى", "حركة"],
      category: "dance",
    },
    {
      id: "spark-3",
      creator: {
        id: "user-3",
        name: "محمد الموسيقار",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        username: "mohammad_music",
        isVerified: false,
      },
      videoUrl: "https://media.w3.org/2016/12/sample_video.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=600&fit=crop",
      title: "موسيقى أصلية 🎵",
      description: "تركيبة موسيقية جديدة ابتكرتها بنفسي",
      duration: "0:58",
      likes: 23456,
      comments: 3456,
      shares: 1234,
      views: 345678,
      isLiked: false,
      uploadedAt: "منذ 4 ساعات",
      tags: ["موسيقى", "أصلي", "موهبة"],
      category: "music",
    },
    {
      id: "spark-4",
      creator: {
        id: "user-4",
        name: "سارة التعليم",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        username: "sarah_edu",
        isVerified: true,
      },
      videoUrl: "https://media.w3.org/2016/12/sample_video.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=600&fit=crop",
      title: "نصيحة تعليمية قيمة 📚",
      description: "تعلم هذه الحيلة البسيطة لتحسين تركيزك",
      duration: "1:15",
      likes: 45678,
      comments: 6789,
      shares: 3456,
      views: 789012,
      isLiked: true,
      uploadedAt: "منذ 6 ساعات",
      tags: ["تعليم", "نصيحة", "تطوير"],
      category: "education",
    },
    {
      id: "spark-5",
      creator: {
        id: "user-5",
        name: "أحمد الرياضة",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        username: "ahmad_sports",
        isVerified: false,
      },
      videoUrl: "https://media.w3.org/2016/12/sample_video.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=600&fit=crop",
      title: "حركة رياضية مذهلة 🏃",
      description: "أفضل لقطة رياضية شفتها هالأسبوع",
      duration: "0:52",
      likes: 56789,
      comments: 7890,
      shares: 4567,
      views: 901234,
      isLiked: false,
      uploadedAt: "منذ يوم",
      tags: ["رياضة", "مذهل", "أداء"],
      category: "sports",
    },
  ];

  const filteredSparks = sparks
    .filter(
      (spark) => filterCategory === "all" || spark.category === filterCategory,
    )
    .sort((a, b) => {
      if (sortBy === "trending") return b.likes - a.likes;
      if (sortBy === "popular") return b.views - a.views;
      return 0;
    });

  const currentSpark = filteredSparks[currentVideoIndex];

  const handleNext = () => {
    if (currentVideoIndex < filteredSparks.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  if (!currentSpark) {
    return (
      <div className="flex flex-col bg-background-dark min-h-screen">
        <Navbar />
        <div className="flex flex-1 justify-center w-full max-w-7xl mx-auto px-4 md:px-6 gap-6 font-sans">
          <Sidebar />
          <main className="flex-1 flex items-center justify-center min-w-0">
            <p className="text-muted-dark">{t.feed.noContent}</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-background-dark min-h-screen">
      {/* ── NAVBAR ── */}
      <Navbar />

      <div className="flex flex-1 justify-center w-full max-w-7xl mx-auto px-4 md:px-6 gap-6">
        {/* ── SIDEBAR ── */}
        <Sidebar />

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 min-w-0">
        {/* ── HEADER ── */}
        <div className="sticky top-0 md:top-16 z-40 bg-background-dark/80 backdrop-blur-md border-b border-border-dark px-6 py-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-orbital-violet" />
          <h1 className="font-display font-bold text-xl">{t.nav.sparks}</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto">
          {/* ── MAIN VIDEO AREA ── */}
          <div className="flex-1 space-y-4">
            {/* ── VIDEO PLAYER ── */}
            <div className="relative w-full aspect-video md:aspect-auto md:h-[600px] bg-background-hover rounded-xl overflow-hidden group">
              <video
                src={currentSpark.videoUrl}
                className="w-full h-full object-cover"
                muted={isMuted}
                autoPlay
                loop
              />

              {/* ── OVERLAY CONTROLS ── */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                {/* ── PLAY BUTTON ── */}
                <button className="p-3 rounded-full bg-white/30 hover:bg-white/40 backdrop-blur-sm transition-colors">
                  <Play className="w-6 h-6 text-white fill-white" />
                </button>

                {/* ── MUTE BUTTON ── */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-3 rounded-full bg-white/30 hover:bg-white/40 backdrop-blur-sm transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6 text-white" />
                  ) : (
                    <Volume2 className="w-6 h-6 text-white" />
                  )}
                </button>
              </div>

              {/* ── DURATION ── */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 text-white text-xs font-semibold">
                {currentSpark.duration}
              </div>
            </div>

            {/* ── VIDEO INFO ── */}
            <div className="space-y-4">
              {/* ── TITLE & DESCRIPTION ── */}
              <div className="space-y-2">
                <h2 className="font-display font-bold text-2xl">
                  {currentSpark.title}
                </h2>
                <p className="text-muted-dark">{currentSpark.description}</p>

                {/* ── TAGS ── */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {currentSpark.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-orbital-violet/20 text-orbital-violet"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── CREATOR INFO ── */}
              <div className="p-4 bg-background-hover rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={currentSpark.creator.avatar}
                    alt={currentSpark.creator.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="font-semibold text-foreground-dark">
                        {currentSpark.creator.name}
                      </p>
                      {currentSpark.creator.isVerified && (
                        <span className="text-orbital-blue">✓</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-dark">
                      @{currentSpark.creator.username}
                    </p>
                  </div>
                </div>
                <button className="px-6 py-2 rounded-full bg-orbital-violet text-white font-semibold hover:bg-orbital-blue transition-colors">
                  {t.actions.follow}
                </button>
              </div>

              {/* ── STATS ── */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  {
                    label: t.feed.views,
                    value: currentSpark.views,
                    color: "text-orbital-blue",
                  },
                  {
                    label: t.feed.likes,
                    value: currentSpark.likes,
                    color: "text-orbital-pink",
                  },
                  {
                    label: t.feed.comments,
                    value: currentSpark.comments,
                    color: "text-orbital-gold",
                  },
                  {
                    label: t.feed.shares,
                    value: currentSpark.shares,
                    color: "text-orbital-teal",
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="text-center p-3 bg-background-hover rounded-lg"
                  >
                    <p className={`font-semibold ${stat.color}`}>
                      {stat.value.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-dark mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* ── ACTION BUTTONS ── */}
              <div className="flex gap-3">
                <button
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${
                    currentSpark.isLiked
                      ? "bg-orbital-pink/20 text-orbital-pink"
                      : "bg-background-hover text-muted-dark hover:bg-background-hover/70"
                  }`}
                >
                  <Heart
                    className="w-5 h-5"
                    fill={currentSpark.isLiked ? "currentColor" : "none"}
                  />
                  {t.actions.like}
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-background-hover text-muted-dark hover:bg-background-hover/70 font-semibold transition-all">
                  <MessageCircle className="w-5 h-5" />
                  {t.actions.comment}
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-background-hover text-muted-dark hover:bg-background-hover/70 font-semibold transition-all">
                  <Share2 className="w-5 h-5" />
                  {t.actions.share}
                </button>
              </div>

              {/* ── NAVIGATION ── */}
              <div className="flex gap-3">
                <button
                  onClick={handlePrevious}
                  disabled={currentVideoIndex === 0}
                  className="flex-1 py-2 rounded-lg bg-background-hover text-muted-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background-hover/70 transition-colors font-semibold"
                >
                  ← السابق
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentVideoIndex === filteredSparks.length - 1}
                  className="flex-1 py-2 rounded-lg bg-orbital-violet text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orbital-blue transition-colors font-semibold"
                >
                  التالي →
                </button>
              </div>

              {/* ── PROGRESS ── */}
              <div className="text-center text-sm text-muted-dark">
                {currentVideoIndex + 1} / {filteredSparks.length}
              </div>
            </div>
          </div>

          {/* ── SIDEBAR (CATEGORIES & TRENDING) ── */}
          <aside className="w-full lg:w-64 space-y-6">
            {/* ── CATEGORIES ── */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-dark uppercase">
                الفئات
              </p>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setFilterCategory(cat.id);
                      setCurrentVideoIndex(0);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      filterCategory === cat.id
                        ? "bg-orbital-violet text-white"
                        : "bg-background-hover text-foreground-dark hover:bg-background-hover/70"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── SORT ── */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-dark uppercase">
                ترتيب حسب
              </p>
              <div className="space-y-2">
                {[
                  {
                    id: "trending",
                    label: "الترندات",
                    icon: <Flame className="w-4 h-4" />,
                  },
                  {
                    id: "popular",
                    label: "الأكثر شهرة",
                    icon: <TrendingUp className="w-4 h-4" />,
                  },
                  {
                    id: "recent",
                    label: "الأحدث",
                    icon: <Clock className="w-4 h-4" />,
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSortBy(opt.id)}
                    className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      sortBy === opt.id
                        ? "bg-orbital-violet text-white"
                        : "bg-background-hover text-foreground-dark hover:bg-background-hover/70"
                    }`}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── TRENDING SPARKS ── */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orbital-pink" />
                <p className="text-sm font-semibold">الشرارات الساخنة</p>
              </div>
              <div className="space-y-2">
                {filteredSparks.slice(0, 3).map((spark) => (
                  <button
                    key={spark.id}
                    onClick={() =>
                      setCurrentVideoIndex(filteredSparks.indexOf(spark))
                    }
                    className={`w-full text-left p-2 rounded-lg transition-all ${
                      currentSpark.id === spark.id
                        ? "bg-orbital-violet/20 border-l-2 border-orbital-violet"
                        : "hover:bg-background-hover"
                    }`}
                  >
                    <p className="text-sm font-semibold text-foreground-dark line-clamp-1">
                      {spark.title}
                    </p>
                    <p className="text-xs text-muted-dark">
                      {spark.likes.toLocaleString()} إعجاب
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  </div>
  );
}
