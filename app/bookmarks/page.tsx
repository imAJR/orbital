"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { PostCard } from "@/components/PostCard";
import { useAppStore } from "@/lib/store/useAppStore";
import {
  Bookmark,
  Search,
  Filter,
  Trash2,
  Share2,
  Download,
  Clock,
  TrendingUp,
  List,
  Grid3x3,
  FolderPlus,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";

interface BookmarkCollection {
  id: string;
  name: string;
  description: string;
  postCount: number;
  createdAt: Date;
  isPublic: boolean;
  color: string;
}

interface BookmarkedPost {
  postId: string;
  collectionId: string;
  savedAt: Date;
}

// خريطة الألوان الثابتة لضمان قيام Tailwind بترجمتها وبنائها بشكل سليم
const colorMap: Record<string, string> = {
  "orbital-blue": "bg-orbital-blue",
  "orbital-pink": "bg-orbital-pink",
  "orbital-violet": "bg-orbital-violet",
  "orbital-gold": "bg-orbital-gold",
};

export default function BookmarksPage() {
  const { t } = useTranslation();
  const { posts } = useAppStore();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null,
  );
  const [sortBy, setSortBy] = useState("recent");
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  const collections: BookmarkCollection[] = [
    {
      id: "col-1",
      name: "منشورات مهمة",
      description: "أهم المنشورات التي أريد الرجوع إليها",
      postCount: 24,
      createdAt: new Date("2026-04-21T19:11:06Z"),
      isPublic: false,
      color: "orbital-blue",
    },
    {
      id: "col-2",
      name: "أفكار تصميم",
      description: "تصاميم وأفكار ملهمة",
      postCount: 18,
      createdAt: new Date("2026-05-01T19:11:06Z"),
      isPublic: true,
      color: "orbital-pink",
    },
    {
      id: "col-3",
      name: "موارد برمجة",
      description: "موارد وأدوات برمجية مفيدة",
      postCount: 32,
      createdAt: new Date("2026-05-06T19:11:06Z"),
      isPublic: false,
      color: "orbital-violet",
    },
    {
      id: "col-4",
      name: "إلهام يومي",
      description: "منشورات ملهمة وتحفيزية",
      postCount: 15,
      createdAt: new Date("2026-05-11T19:11:06Z"),
      isPublic: true,
      color: "orbital-gold",
    },
  ];

  const bookmarkedPosts: BookmarkedPost[] = [
    {
      postId: posts[0]?.id || "post-1",
      collectionId: "col-1",
      savedAt: new Date("2026-05-16T19:11:06Z"),
    },
    {
      postId: posts[1]?.id || "post-2",
      collectionId: "col-2",
      savedAt: new Date("2026-05-18T19:11:06Z"),
    },
    {
      postId: posts[2]?.id || "post-3",
      collectionId: "col-1",
      savedAt: new Date("2026-05-19T19:11:06Z"),
    },
  ];

  const filteredCollections = collections.filter((col) =>
    col.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const bookmarksToDisplay = selectedCollection
    ? bookmarkedPosts.filter((b) => b.collectionId === selectedCollection)
    : bookmarkedPosts;

  const filteredBookmarks = bookmarksToDisplay.sort((a, b) => {
    if (sortBy === "recent") return b.savedAt.getTime() - a.savedAt.getTime();
    if (sortBy === "oldest") return a.savedAt.getTime() - b.savedAt.getTime();
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
        <main className="flex-1 flex h-[calc(100vh-64px)] w-full min-w-0">
        {/* ── COLLECTIONS SIDEBAR ── */}
        <div className="w-full lg:w-72 border-e border-border-dark flex flex-col bg-background-dark">
          {/* ── HEADER ── */}
          <div className="p-4 border-b border-border-dark space-y-4">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-orbital-gold" />
              <h2 className="font-display font-bold text-lg">
                {t.nav.bookmarks}
              </h2>
            </div>

            {/* ── CREATE COLLECTION ── */}
            <button
              onClick={() => setShowCreateCollection(!showCreateCollection)}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-orbital-gold text-background-dark font-semibold hover:shadow-lg hover:shadow-gold-500/50 transition-all"
            >
              <FolderPlus className="w-4 h-4" />
              مجموعة جديدة
            </button>

            {/* ── CREATE FORM ── */}
            {showCreateCollection && (
              <div className="p-4 bg-background-hover rounded-lg space-y-3 border border-border-dark">
                <input
                  type="text"
                  placeholder="اسم المجموعة"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-background-dark text-foreground-dark placeholder-muted-dark focus:outline-none focus:ring-2 focus:ring-orbital-gold text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowCreateCollection(false);
                      setNewCollectionName("");
                    }}
                    className="flex-1 px-3 py-2 rounded-lg bg-background-dark text-foreground-dark hover:bg-background-hover transition-colors text-sm"
                  >
                    إلغاء
                  </button>
                  <button
                    className="flex-1 px-3 py-2 rounded-lg bg-orbital-gold text-background-dark font-semibold hover:shadow-lg transition-all text-sm disabled:opacity-50"
                    disabled={!newCollectionName.trim()}
                  >
                    إنشاء
                  </button>
                </div>
              </div>
            )}

            {/* ── SEARCH ── */}
            <div className="relative">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-dark" />
              <input
                type="text"
                placeholder={t.placeholder.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background-hover rounded-full text-sm text-foreground-dark placeholder-muted-dark focus:outline-none focus:ring-2 focus:ring-orbital-gold"
              />
            </div>
          </div>

          {/* ── COLLECTIONS LIST ── */}
          <div className="flex-1 overflow-y-auto divide-y divide-border-dark">
            {/* ── ALL BOOKMARKS ── */}
            <button
              onClick={() => setSelectedCollection(null)}
              className={`w-full text-start p-4 hover:bg-background-hover transition-colors border-s-2 ${
                selectedCollection === null
                  ? "border-orbital-gold bg-background-hover"
                  : "border-transparent"
              }`}
            >
              <div className="space-y-1">
                <p className="font-semibold text-foreground-dark">
                  كل المحفوظات
                </p>
                <p className="text-xs text-muted-dark">
                  {bookmarkedPosts.length} منشور
                </p>
              </div>
            </button>

            {/* ── COLLECTIONS ── */}
            {filteredCollections.map((col) => (
              <button
                key={col.id}
                onClick={() => setSelectedCollection(col.id)}
                className={`w-full text-start p-4 hover:bg-background-hover transition-colors border-s-2 group ${
                  selectedCollection === col.id
                    ? "border-orbital-gold bg-background-hover"
                    : "border-transparent"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* تم إصلاح بناء كلاس اللون الديناميكي هنا ليصبح معتمداً على الخريطة الثابتة */}
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${colorMap[col.color] || "bg-gray-500"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground-dark truncate">
                      {col.name}
                    </p>
                    <p className="text-xs text-muted-dark line-clamp-1">
                      {col.description}
                    </p>
                    <p className="text-xs text-muted-dark mt-1">
                      {col.postCount} منشور
                    </p>
                  </div>
                  <button className="p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background-dark">
                    <MoreHorizontal className="w-4 h-4 text-muted-dark" />
                  </button>
                </div>
              </button>
            ))}
          </div>

          {/* ── FOOTER ── */}
          <div className="p-4 border-t border-border-dark text-xs text-muted-dark">
            <p>
              {collections.length} مجموعة · {bookmarkedPosts.length} منشور
            </p>
          </div>
        </div>

        {/* ── BOOKMARKS CONTENT ── */}
        <div className="hidden lg:flex flex-1 flex-col">
          {/* ── HEADER ── */}
          <div className="p-6 border-b border-border-dark space-y-4 bg-background-hover/30">
            <div>
              <h1 className="font-display font-bold text-2xl">
                {selectedCollection
                  ? collections.find((c) => c.id === selectedCollection)?.name
                  : "كل المحفوظات"}
              </h1>
              {selectedCollection && (
                <p className="text-muted-dark mt-1">
                  {
                    collections.find((c) => c.id === selectedCollection)
                      ?.description
                  }
                </p>
              )}
            </div>

            {/* ── CONTROLS ── */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {["recent", "oldest"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSortBy(opt)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                      sortBy === opt
                        ? "bg-orbital-gold text-background-dark"
                        : "bg-background-dark text-muted-dark hover:text-foreground-dark"
                    }`}
                  >
                    {opt === "recent" ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <TrendingUp className="w-4 h-4" />
                    )}
                    {opt === "recent" ? "الأحدث" : "الأقدم"}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-orbital-gold text-background-dark"
                      : "bg-background-dark text-muted-dark hover:text-foreground-dark"
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-orbital-gold text-background-dark"
                      : "bg-background-dark text-muted-dark hover:text-foreground-dark"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* ── BOOKMARKS DISPLAY ── */}
          {filteredBookmarks.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center space-y-3">
              <Bookmark className="w-12 h-12 text-muted-dark mx-auto opacity-50" />
              <p className="text-muted-dark">
                {selectedCollection
                  ? "لا توجد منشورات محفوظة في هذه المجموعة"
                  : "لم تحفظ أي منشورات بعد"}
              </p>
            </div>
          ) : viewMode === "list" ? (
            <div className="flex-1 overflow-y-auto divide-y divide-border-dark">
              {filteredBookmarks.map((bookmark) => {
                const post = posts.find((p) => p.id === bookmark.postId);
                return post ? (
                  <div
                    key={bookmark.postId}
                    className="p-4 hover:bg-background-hover transition-colors"
                  >
                    <div className="flex gap-4">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-foreground-dark">
                            {post.author.name}
                          </p>
                          <p className="text-xs text-muted-dark whitespace-nowrap">
                            {bookmark.savedAt.toLocaleDateString("ar-SA")}
                          </p>
                        </div>
                        <p className="text-sm text-foreground-dark mt-1 line-clamp-2">
                          {post.content}
                        </p>
                        <div className="flex gap-4 text-xs text-muted-dark mt-2">
                          <span>{post.likes} إعجاب</span>
                          <span>{post.comments} تعليق</span>
                        </div>
                      </div>
                      <button className="p-2 rounded-lg hover:bg-background-dark text-muted-dark hover:text-orbital-pink transition-colors flex-shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-4">
                {filteredBookmarks.map((bookmark) => {
                  const post = posts.find((p) => p.id === bookmark.postId);
                  return post ? (
                    <div
                      key={bookmark.postId}
                      className="rounded-lg border border-border-dark overflow-hidden hover:border-orbital-gold transition-colors group"
                    >
                      {post.image && (
                        <div className="relative h-40 bg-background-hover overflow-hidden">
                          <img
                            src={post.image}
                            alt="post"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      )}
                      <div className="p-4 space-y-3">
                        <p className="text-sm text-foreground-dark line-clamp-2">
                          {post.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-dark">
                            {bookmark.savedAt.toLocaleDateString("ar-SA")}
                          </p>
                          <button className="p-1 rounded-lg hover:bg-background-hover text-muted-dark hover:text-orbital-pink transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  </div>
  );
}
