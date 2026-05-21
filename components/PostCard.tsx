"use client";

import { useTranslation } from "@/lib/hooks/useTranslation";
import { useAppStore } from "@/lib/store/useAppStore";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
  Bookmark,
  Flag,
} from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ar, enUS } from "date-fns/locale";

interface PostCardProps {
  postId: string;
}

export function PostCard({ postId }: PostCardProps) {
  const { t, language } = useTranslation();
  const { posts, updatePost } = useAppStore();
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return null;
  }

  const handleLike = () => {
    updatePost(postId, {
      isLiked: !post.isLiked,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1,
    });
  };

  const handleRepost = () => {
    updatePost(postId, {
      reposts: post.reposts + 1,
    });
  };

  const handleShare = () => {
    updatePost(postId, {
      shares: post.shares + 1,
    });
  };

  const handleComment = () => {
    if (commentText.trim()) {
      updatePost(postId, {
        comments: post.comments + 1,
      });
      setCommentText("");
    }
  };

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: language === "ar" ? ar : enUS,
  });

  return (
    <div className="border border-border-dark bg-background-dark rounded-xl p-6 hover:border-orbital-blue/50 transition-colors cursor-pointer mb-4">
      {/* ── HEADER ── */}
      <div className="flex gap-4 mb-4">
        {/* ── AVATAR ── */}
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />

        {/* ── AUTHOR INFO ── */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <p className="font-semibold text-foreground-dark hover:underline truncate">
                {post.author.name}
              </p>
              {post.author.verified && (
                <span className="text-orbital-blue text-sm">✓</span>
              )}
              <p className="text-muted-dark text-sm">@{post.author.username}</p>
              <span className="text-muted-dark text-sm">·</span>
              <p className="text-muted-dark text-sm whitespace-nowrap">
                {timeAgo}
              </p>
            </div>

            {/* ── MORE MENU ── */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-full hover:bg-orbital-blue/10 text-orbital-blue opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {showMenu && (
                <div className="absolute end-0 top-full mt-2 w-48 bg-background-dark border border-border-dark rounded-xl shadow-lg z-50">
                  <button className="w-full flex items-center gap-2 px-4 py-3 hover:bg-background-hover text-sm text-foreground-dark border-b border-border-dark">
                    <Bookmark className="w-4 h-4" />
                    {t.nav.bookmarks}
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-3 hover:bg-background-hover text-sm text-orbital-pink">
                    <Flag className="w-4 h-4" />
                    {t.actions.report}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="mb-4 space-y-3">
        {/* ── TEXT ── */}
        <p className="text-foreground-dark leading-normal break-words">
          {post.content}
        </p>

        {/* ── IMAGE ── */}
        {post.image && (
          <div className="rounded-xl overflow-hidden border border-border-dark max-h-80 bg-background-hover">
            <img
              src={post.image}
              alt="post"
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
          </div>
        )}

        {/* ── VIDEO ── */}
        {post.video && (
          <div className="rounded-xl overflow-hidden border border-border-dark max-h-80 bg-background-hover relative group/video">
            <video src={post.video} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/video:opacity-100 transition-opacity flex items-center justify-center">
              <button className="w-16 h-16 rounded-full bg-orbital-blue/80 flex items-center justify-center hover:bg-orbital-blue">
                <svg
                  className="w-6 h-6 text-white fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── STATS ── */}
      <div className="flex gap-6 text-sm text-muted-dark mb-4 pb-4 border-b border-border-dark">
        {post.comments > 0 && (
          <button className="hover:text-orbital-blue transition-colors">
            <span className="font-semibold text-foreground-dark">
              {post.comments}
            </span>{" "}
            {t.feed.comments}
          </button>
        )}
        {post.reposts > 0 && (
          <button className="hover:text-orbital-violet transition-colors">
            <span className="font-semibold text-foreground-dark">
              {post.reposts}
            </span>{" "}
            {t.feed.shares}
          </button>
        )}
        {post.likes > 0 && (
          <button className="hover:text-orbital-pink transition-colors">
            <span className="font-semibold text-foreground-dark">
              {post.likes}
            </span>{" "}
            {t.feed.likes}
          </button>
        )}
        {post.shares > 0 && (
          <button className="hover:text-orbital-teal transition-colors">
            <span className="font-semibold text-foreground-dark">
              {post.shares}
            </span>{" "}
            {t.feed.views}
          </button>
        )}
      </div>

      {/* ── ACTIONS ── */}
      <div className="flex justify-between text-muted-dark -mx-4 px-4">
        {/* ── COMMENT ── */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 p-2 rounded-full hover:bg-orbital-blue/10 hover:text-orbital-blue transition-all group/btn"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs opacity-0 group-hover/btn:opacity-100 transition-opacity">
            {t.actions.comment}
          </span>
        </button>

        {/* ── REPOST ── */}
        <button
          onClick={handleRepost}
          className="flex items-center gap-2 p-2 rounded-full hover:bg-orbital-violet/10 hover:text-orbital-violet transition-all group/btn"
        >
          <Repeat2 className="w-5 h-5" />
          <span className="text-xs opacity-0 group-hover/btn:opacity-100 transition-opacity">
            {t.actions.repost}
          </span>
        </button>

        {/* ── LIKE ── */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 p-2 rounded-full transition-all group/btn ${
            post.isLiked
              ? "text-orbital-pink"
              : "hover:bg-orbital-pink/10 hover:text-orbital-pink"
          }`}
        >
          <Heart
            className="w-5 h-5"
            fill={post.isLiked ? "currentColor" : "none"}
          />
          <span className="text-xs opacity-0 group-hover/btn:opacity-100 transition-opacity">
            {t.actions.like}
          </span>
        </button>

        {/* ── SHARE ── */}
        <button
          onClick={handleShare}
          className="flex items-center gap-2 p-2 rounded-full hover:bg-orbital-teal/10 hover:text-orbital-teal transition-all group/btn"
        >
          <Share className="w-5 h-5" />
          <span className="text-xs opacity-0 group-hover/btn:opacity-100 transition-opacity">
            {t.actions.share}
          </span>
        </button>
      </div>

      {/* ── COMMENTS SECTION ── */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-border-dark space-y-4">
          {/* ── COMMENT INPUT ── */}
          <div className="flex gap-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={t.placeholder.writeComment}
              className="flex-1 bg-background-hover rounded-full px-4 py-2 text-sm text-foreground-dark placeholder-muted-dark focus:outline-none focus:ring-2 focus:ring-orbital-blue"
            />
            <button
              onClick={handleComment}
              disabled={!commentText.trim()}
              className="px-4 py-2 rounded-full bg-orbital-blue text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orbital-violet transition-colors"
            >
              {t.actions.reply}
            </button>
          </div>

          {/* ── COMMENT PLACEHOLDER ── */}
          <div className="text-center text-muted-dark text-sm py-4">
            {t.feed.noContent}
          </div>
        </div>
      )}
    </div>
  );
}
