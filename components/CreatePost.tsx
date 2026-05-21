"use client";

import { useTranslation } from "@/lib/hooks/useTranslation";
import { useAppStore } from "@/lib/store/useAppStore";
import { Image, Video, Smile, MapPin, Clock, X } from "lucide-react";
import { useState } from "react";

export function CreatePost() {
  const { t } = useTranslation();
  const { currentUser, addPost } = useAppStore();
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async () => {
    if (!content.trim() && !image) return;

    setIsPosting(true);

    // Simulate API call
    setTimeout(() => {
      if (currentUser) {
        addPost({
          id: Math.random().toString(),
          author: currentUser,
          content,
          image: image || undefined,
          likes: 0,
          comments: 0,
          reposts: 0,
          shares: 0,
          createdAt: new Date(),
          isLiked: false,
        });

        setContent("");
        setImage(null);
      }
      setIsPosting(false);
    }, 500);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="border-b border-border-dark p-6 space-y-4">
      {/* ── HEADER ── */}
      <div className="flex gap-4">
        {/* ── AVATAR ── */}
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />

        {/* ── CONTENT AREA ── */}
        <div className="flex-1 space-y-4">
          {/* ── TEXT INPUT ── */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t.placeholder.whatNew}
            className="w-full bg-transparent text-xl text-foreground-dark placeholder-muted-dark resize-none outline-none max-h-64"
            rows={3}
          />

          {/* ── IMAGE PREVIEW ── */}
          {image && (
            <div className="relative rounded-xl overflow-hidden border border-border-dark group">
              <img
                src={image}
                alt="preview"
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setImage(null)}
                className="absolute top-2 end-2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          )}

          {/* ── ACTIONS BAR ── */}
          <div className="flex items-center justify-between pt-4 border-t border-border-dark">
            {/* ── ICONS ── */}
            <div className="flex items-center gap-2">
              {/* ── IMAGE ── */}
              <button
                onClick={() => {
                  setImage(
                    "https://images.unsplash.com/photo-1611339555312-e607c06352e7?w=400&h=400&fit=crop",
                  );
                }}
                className="p-2 rounded-full hover:bg-background-hover text-orbital-blue transition-colors group"
              >
                <Image className="w-5 h-5" />
              </button>

              {/* ── VIDEO ── */}
              <button className="p-2 rounded-full hover:bg-background-hover text-orbital-violet transition-colors group">
                <Video className="w-5 h-5" />
              </button>

              {/* ── EMOJI ── */}
              <button className="p-2 rounded-full hover:bg-background-hover text-orbital-gold transition-colors group">
                <Smile className="w-5 h-5" />
              </button>

              {/* ── LOCATION ── */}
              <button className="p-2 rounded-full hover:bg-background-hover text-orbital-teal transition-colors group">
                <MapPin className="w-5 h-5" />
              </button>

              {/* ── SCHEDULE ── */}
              <button className="p-2 rounded-full hover:bg-background-hover text-orbital-pink transition-colors group">
                <Clock className="w-5 h-5" />
              </button>
            </div>

            {/* ── POST BUTTON ── */}
            <button
              onClick={handlePost}
              disabled={(!content.trim() && !image) || isPosting}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-orbital-blue to-orbital-violet text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105"
            >
              {isPosting ? t.actions.loading : t.actions.post}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
