"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useTranslation } from "@/lib/hooks/useTranslation";
import {
  Image,
  Search,
  Filter,
  Heart,
  MessageCircle,
  Share2,
  Download,
  X,
  Grid3x3,
  List,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  artist: {
    name: string;
    avatar: string;
    username: string;
  };
  likes: number;
  comments: number;
  isLiked: boolean;
  uploadedAt: string;
  category: string;
  tags: string[];
}

export default function GalleryPage() {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories = [
    { id: "all", label: "الكل" },
    { id: "photography", label: "التصوير" },
    { id: "digital", label: "الفن الرقمي" },
    { id: "graphic", label: "الجرافيك" },
    { id: "illustration", label: "الرسومات" },
    { id: "design", label: "التصميم" },
    { id: "animation", label: "الأنيميشن" },
  ];

  const sortOptions = [
    { id: "recent", label: "الأحدث", icon: <Clock className="w-4 h-4" /> },
    {
      id: "trending",
      label: "الترندات",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      id: "popular",
      label: "الأكثر شهرة",
      icon: <Heart className="w-4 h-4" />,
    },
  ];

  const images: GalleryImage[] = [
    {
      id: "img-1",
      src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop",
      title: "مشهد طبيعي ساحر",
      artist: {
        name: "فاطمة المصورة",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
        username: "fatima_photo",
      },
      likes: 2345,
      comments: 234,
      isLiked: false,
      uploadedAt: "منذ يومين",
      category: "photography",
      tags: ["طبيعة", "ساحر", "منظر"],
    },
    {
      id: "img-2",
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
      title: "تصميم جرافيك عصري",
      artist: {
        name: "علي ديزاين",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
        username: "ali_design",
      },
      likes: 3456,
      comments: 456,
      isLiked: true,
      uploadedAt: "منذ أسبوع",
      category: "graphic",
      tags: ["تصميم", "عصري", "ألوان"],
    },
    {
      id: "img-3",
      src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&h=500&fit=crop",
      title: "فن رقمي مجرد",
      artist: {
        name: "سارة فنانة",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
        username: "sarah_artist",
      },
      likes: 4567,
      comments: 567,
      isLiked: false,
      uploadedAt: "منذ 3 أيام",
      category: "digital",
      tags: ["فن رقمي", "مجرد", "إبداعي"],
    },
    {
      id: "img-4",
      src: "https://images.unsplash.com/photo-1578308269635-0afeaf00fa18?w=500&h=500&fit=crop",
      title: "رسومات توضيحية دقيقة",
      artist: {
        name: "محمد رسام",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
        username: "mohammad_artist",
      },
      likes: 1234,
      comments: 123,
      isLiked: false,
      uploadedAt: "منذ 5 أيام",
      category: "illustration",
      tags: ["رسومات", "توضيحية", "دقيق"],
    },
    {
      id: "img-5",
      src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop",
      title: "تصوير فوتوغرافي احترافي",
      artist: {
        name: "أحمد مصور",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
        username: "ahmad_photo",
      },
      likes: 5678,
      comments: 678,
      isLiked: true,
      uploadedAt: "منذ يوم",
      category: "photography",
      tags: ["تصوير", "احترافي", "جودة"],
    },
    {
      id: "img-6",
      src: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=500&h=500&fit=crop",
      title: "أنيميشن ديناميكي",
      artist: {
        name: "نور محرك",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
        username: "noor_animator",
      },
      likes: 3421,
      comments: 342,
      isLiked: false,
      uploadedAt: "منذ 4 أيام",
      category: "animation",
      tags: ["أنيميشن", "ديناميكي", "حركة"],
    },
    {
      id: "img-7",
      src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop",
      title: "تصميم ويب عبقري",
      artist: {
        name: "لينا ديزاين",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
        username: "lina_design",
      },
      likes: 6789,
      comments: 789,
      isLiked: true,
      uploadedAt: "منذ ساعة",
      category: "design",
      tags: ["ويب", "تصميم", "عبقري"],
    },
    {
      id: "img-8",
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
      title: "فن جداري عصري",
      artist: {
        name: "خالد فنان",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
        username: "khaled_artist",
      },
      likes: 2109,
      comments: 210,
      isLiked: false,
      uploadedAt: "منذ أسبوعين",
      category: "graphic",
      tags: ["جداري", "عصري", "شارع"],
    },
  ];

  const filteredImages = images
    .filter(
      (img) =>
        (selectedCategory === "all" || img.category === selectedCategory) &&
        (img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          img.artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          img.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          )),
    )
    .sort((a, b) => {
      if (sortBy === "trending") return b.likes - a.likes;
      if (sortBy === "popular") return b.comments - a.comments;
      return 0;
    });

  return (
    <div className="flex flex-col bg-background-dark min-h-screen">
      {/* ── NAVBAR ── */}
      <Navbar />

      <div className="flex flex-1 justify-center w-full max-w-7xl mx-auto px-4 md:px-6 gap-6">
        {/* ── SIDEBAR ── */}
        <Sidebar />

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 max-w-7xl w-full min-w-0">
        {/* ── PAGE HEADER ── */}
        <div className="sticky top-0 md:top-16 z-40 bg-background-dark/80 backdrop-blur-md border-b border-border-dark p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Image className="w-6 h-6 text-orbital-gold" />
            <h1 className="font-display font-bold text-2xl">{t.nav.gallery}</h1>
          </div>

          {/* ── SEARCH BAR ── */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-dark" />
            <input
              type="text"
              placeholder={t.placeholder.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background-hover rounded-full text-foreground-dark placeholder-muted-dark focus:outline-none focus:ring-2 focus:ring-orbital-gold"
            />
          </div>
        </div>

        {/* ── FILTERS & CONTROLS ── */}
        <div className="border-b border-border-dark px-6 py-4 space-y-4">
          {/* ── CATEGORIES ── */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-orbital-gold flex-shrink-0 mt-1" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-orbital-gold text-background-dark font-semibold"
                    : "bg-background-hover text-foreground-dark hover:bg-background-hover/70"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* ── SORT & VIEW ── */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {sortOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSortBy(opt.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                    sortBy === opt.id
                      ? "bg-orbital-gold text-background-dark"
                      : "bg-background-hover text-foreground-dark hover:bg-background-hover/70"
                  }`}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-orbital-gold text-background-dark"
                    : "bg-background-hover text-muted-dark hover:text-foreground-dark"
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-orbital-gold text-background-dark"
                    : "bg-background-hover text-muted-dark hover:text-foreground-dark"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── GALLERY GRID ── */}
        {viewMode === "grid" ? (
          <div className="p-6">
            {filteredImages.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <Image className="w-12 h-12 text-muted-dark mx-auto opacity-50" />
                <p className="text-muted-dark">{t.feed.noContent}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredImages.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => setSelectedImage(img)}
                    className="group cursor-pointer rounded-lg overflow-hidden border border-border-dark hover:border-orbital-gold transition-all"
                  >
                    {/* ── IMAGE ── */}
                    <div className="relative overflow-hidden bg-background-hover aspect-square">
                      <img
                        src={img.src}
                        alt={img.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />

                      {/* ── OVERLAY ── */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                        <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors">
                          <Heart className="w-5 h-5 text-white" />
                        </button>
                        <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors">
                          <MessageCircle className="w-5 h-5 text-white" />
                        </button>
                        <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors">
                          <Download className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>

                    {/* ── INFO ── */}
                    <div className="p-3 space-y-2">
                      <p className="font-semibold text-sm text-foreground-dark line-clamp-1">
                        {img.title}
                      </p>

                      <div className="flex items-center gap-2">
                        <img
                          src={img.artist.avatar}
                          alt={img.artist.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <p className="text-xs text-muted-dark">
                          {img.artist.name}
                        </p>
                      </div>

                      <div className="flex gap-3 text-xs text-muted-dark pt-2 border-t border-border-dark">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {img.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {img.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ── LIST VIEW ── */
          <div className="divide-y divide-border-dark">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className="p-4 hover:bg-background-hover transition-colors cursor-pointer group"
              >
                <div className="flex gap-4">
                  {/* ── THUMBNAIL ── */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-background-hover">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* ── INFO ── */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <h3 className="font-semibold text-foreground-dark group-hover:text-orbital-gold transition-colors">
                      {img.title}
                    </h3>

                    <div className="flex items-center gap-2">
                      <img
                        src={img.artist.avatar}
                        alt={img.artist.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <p className="text-sm text-muted-dark">
                        {img.artist.name}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {img.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-background-hover text-muted-dark"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ── STATS ── */}
                  <div className="text-right space-y-2 flex-shrink-0">
                    <div className="flex gap-4 text-sm text-muted-dark">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {img.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {img.comments}
                      </span>
                    </div>
                    <p className="text-xs text-muted-dark">{img.uploadedAt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── IMAGE MODAL ── */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full max-h-screen overflow-y-auto">
              {/* ── CLOSE BUTTON ── */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-background-dark hover:bg-background-hover z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="bg-background-dark rounded-xl overflow-hidden">
                {/* ── IMAGE ── */}
                <div className="bg-background-hover flex items-center justify-center max-h-96">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* ── INFO ── */}
                <div className="p-6 space-y-4">
                  <h2 className="font-display font-bold text-2xl">
                    {selectedImage.title}
                  </h2>

                  {/* ── ARTIST ── */}
                  <div className="flex items-center justify-between p-4 bg-background-hover rounded-lg">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedImage.artist.avatar}
                        alt={selectedImage.artist.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-foreground-dark">
                          {selectedImage.artist.name}
                        </p>
                        <p className="text-sm text-muted-dark">
                          @{selectedImage.artist.username}
                        </p>
                      </div>
                    </div>
                    <button className="px-6 py-2 rounded-full bg-orbital-gold text-background-dark font-semibold hover:shadow-lg transition-all">
                      {t.actions.follow}
                    </button>
                  </div>

                  {/* ── TAGS ── */}
                  <div className="flex flex-wrap gap-2">
                    {selectedImage.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-background-hover text-muted-dark text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* ── ACTIONS ── */}
                  <div className="flex gap-4 pt-4 border-t border-border-dark">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-orbital-gold/10 text-orbital-gold hover:bg-orbital-gold/20 transition-colors font-semibold">
                      <Heart className="w-5 h-5" />
                      {selectedImage.likes}
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-background-hover hover:bg-background-hover/70 transition-colors font-semibold">
                      <MessageCircle className="w-5 h-5" />
                      {selectedImage.comments}
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-background-hover hover:bg-background-hover/70 transition-colors font-semibold">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-background-hover hover:bg-background-hover/70 transition-colors font-semibold">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
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
