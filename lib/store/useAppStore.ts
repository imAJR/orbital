import { create } from "zustand";

export type Language = "ar" | "en";
export type Theme = "dark" | "light" | "auto";

interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  cover?: string;
  bio?: string;
  followers: number;
  following: number;
  verified: boolean;
  isPrivate: boolean;
}

interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  video?: string;
  likes: number;
  comments: number;
  reposts: number;
  shares: number;
  createdAt: Date;
  isLiked: boolean;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
  type: "text" | "image" | "video";
}

interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention" | "message";
  actor: User;
  targetId?: string;
  createdAt: Date;
  isRead: boolean;
}

interface AppState {
  // ── LANGUAGE & THEME ──
  language: Language;
  theme: Theme;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;

  // ── USER STATE ──
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;

  // ── FEED STATE ──
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (postId: string, updates: Partial<Post>) => void;
  removePost: (postId: string) => void;

  // ── MESSAGES STATE ──
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  activeConversation: string | null;
  setActiveConversation: (id: string | null) => void;

  // ── NOTIFICATIONS STATE ──
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;

  // ── UI STATE ──
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isMobile: boolean;
  setIsMobile: (mobile: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // ── LANGUAGE & THEME ──
  language: "ar",
  theme: "dark",
  setLanguage: (lang) => set({ language: lang }),
  setTheme: (theme) => set({ theme }),

  // ── USER STATE ──
  currentUser: {
    id: "user-1",
    username: "ali_aljabarti",
    name: "علي الجبرتي",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "Developer | Designer | Creative",
    followers: 1250,
    following: 450,
    verified: true,
    isPrivate: false,
  },
  setCurrentUser: (user) => set({ currentUser: user }),
  isLoggedIn: true,
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),

  // ── FEED STATE ──
  posts: [
    {
      id: "post-1",
      author: {
        id: "user-2",
        username: "fatima_design",
        name: "فاطمة ديزاين",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        followers: 5420,
        following: 234,
        verified: true,
        isPrivate: false,
      },
      content:
        "✨ Just launched my new design portfolio! Check it out and let me know what you think. Would love your feedback! 🎨",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
      likes: 234,
      comments: 45,
      reposts: 89,
      shares: 23,
      createdAt: new Date("2026-05-20T10:00:00Z"),
      isLiked: false,
    },
    {
      id: "post-2",
      author: {
        id: "user-3",
        username: "dev_master",
        name: "محمد المطور",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        followers: 8900,
        following: 567,
        verified: true,
        isPrivate: false,
      },
      content:
        "🚀 Finally launched my new Next.js project! Built with TypeScript, Tailwind CSS, and Zustand. The performance is insane! Check it out on GitHub.",
      video: "https://media.w3.org/2016/12/sample_video.mp4",
      likes: 567,
      comments: 123,
      reposts: 234,
      shares: 89,
      createdAt: new Date("2026-05-18T10:00:00Z"),
      isLiked: false,
    },
  ],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  updatePost: (postId, updates) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, ...updates } : p,
      ),
    })),
  removePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== postId),
    })),

  // ── MESSAGES STATE ──
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  activeConversation: null,
  setActiveConversation: (id) => set({ activeConversation: id }),

  // ── NOTIFICATIONS STATE ──
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n,
      ),
    })),

  // ── UI STATE ──
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  isMobile: false,
  setIsMobile: (mobile) => set({ isMobile: mobile }),
}));
