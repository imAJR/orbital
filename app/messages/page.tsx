"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useAppStore } from "@/lib/store/useAppStore";
import {
  Search,
  Send,
  MoreHorizontal,
  Phone,
  Video,
  Info,
  X,
  Mail,
} from "lucide-react";
import { useState } from "react";

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  online: boolean;
  messages: Array<{
    id: string;
    senderId: string;
    content: string;
    timestamp: Date;
    type: "text" | "image";
  }>;
}

export default function MessagesPage() {
  const { t } = useTranslation();
  const { activeConversation, setActiveConversation, currentUser } =
    useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const conversations: Conversation[] = [
    {
      id: "conv-1",
      name: "فاطمة ديزاين",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      lastMessage: "شكراً على التصميم! رائع جداً 🎨",
      timestamp: new Date("2026-05-21T19:00:00Z"),
      unread: 2,
      online: true,
      messages: [],
    },
  ];

  const activeConv = conversations.find((c) => c.id === activeConversation);
  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSendMessage = () => {
    if (messageInput.trim() && activeConversation) setMessageInput("");
  };

  return (
    <div className="flex flex-col bg-background-dark min-h-screen">
      <Navbar />

      <div className="flex flex-1 justify-center w-full max-w-7xl mx-auto px-4 md:px-6 gap-6">
        <Sidebar />

        <main className="flex-1 flex h-[calc(100vh-64px)] w-full min-w-0">
        <div className="w-full md:w-80 border-e border-border-dark flex flex-col bg-background-dark">
          <div className="p-4 border-b border-border-dark space-y-4">
            <h2 className="font-display font-bold text-xl">
              {t.messages.conversations}
            </h2>
            <div className="relative">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-dark" />
              <input
                type="text"
                placeholder={t.placeholder.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full ps-10 pe-4 py-2 bg-background-hover rounded-full text-sm text-foreground-dark placeholder-muted-dark focus:outline-none focus:ring-2 focus:ring-orbital-blue"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-border-dark">
            {filteredConversations.length === 0 ? (
              <div className="p-6 text-center text-muted-dark">
                <p>{t.messages.noMessages}</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setActiveConversation(conv.id)}
                  className={`w-full p-4 text-start hover:bg-background-hover transition-colors border-b border-border-dark ${activeConversation === conv.id ? "bg-background-hover" : ""}`}
                >
                  <div className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={conv.avatar}
                        alt={conv.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {conv.online && (
                        <div className="absolute bottom-0 end-0 w-3 h-3 bg-success rounded-full border-2 border-background-dark" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-foreground-dark truncate">
                          {conv.name}
                        </p>
                        <p className="text-xs text-muted-dark flex-shrink-0 ms-2">
                          {conv.timestamp.toLocaleTimeString("ar-SA", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-dark truncate">
                          {conv.lastMessage}
                        </p>
                        {conv.unread > 0 && (
                          <span className="bg-orbital-blue text-white text-xs rounded-full px-2 py-1 flex-shrink-0 ms-2 font-semibold">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {activeConv ? (
          <div className="hidden md:flex flex-1 flex-col">
            <div className="p-4 border-b border-border-dark flex items-center justify-between bg-background-dark/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={activeConv.avatar}
                    alt={activeConv.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {activeConv.online && (
                    <div className="absolute bottom-0 end-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-background-dark" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-foreground-dark">
                    {activeConv.name}
                  </p>
                  <p className="text-xs text-muted-dark">
                    {activeConv.online ? t.messages.online : t.messages.offline}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-background-hover text-muted-dark hover:text-orbital-blue transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-background-hover text-muted-dark hover:text-orbital-violet transition-colors">
                  <Video className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-2 rounded-full hover:bg-background-hover text-muted-dark hover:text-orbital-teal transition-colors"
                >
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeConv.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === currentUser?.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${msg.senderId === currentUser?.id ? "bg-orbital-blue text-white rounded-br-none" : "bg-background-hover text-foreground-dark rounded-bl-none"}`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString("ar-SA", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border-dark bg-background-dark">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                  placeholder={t.placeholder.writeMessage}
                  className="flex-1 px-4 py-2 rounded-full bg-background-hover text-foreground-dark placeholder-muted-dark focus:outline-none focus:ring-2 focus:ring-orbital-blue text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="p-2 rounded-full bg-orbital-blue text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orbital-violet transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-background-dark/50">
            <div className="text-center space-y-2">
              <Mail className="w-12 h-12 text-muted-dark mx-auto opacity-50" />
              <p className="text-muted-dark">{t.messages.startConversation}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  </div>
  );
}
