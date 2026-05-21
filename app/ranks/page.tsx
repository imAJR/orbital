"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { Trophy, ShieldCheck, Zap, Star } from "lucide-react";

export default function RanksPage() {
  const { t } = useTranslation();

  const xp = 1850;
  const nextRankXp = 3000;
  const progress = (xp / nextRankXp) * 100;

  return (
    <div className="flex flex-col bg-background-dark min-h-screen">
      <Navbar />

      <div className="flex flex-1 justify-center w-full max-w-7xl mx-auto px-4 md:px-6 gap-6">
        <Sidebar />

        <main className="flex-1 p-6 min-w-0">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* ── HEADER ── */}
          <div className="text-center mb-10">
            <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground-dark mb-2">
              {t.nav.ranks}
            </h1>
            <p className="text-muted-dark">
              ارتقِ في مدارك واكتشف مستويات جديدة
            </p>
          </div>

          {/* ── CURRENT RANK CARD ── */}
          <div className="p-8 md:p-10 rounded-3xl bg-background-hover/30 border border-border-dark shadow-lg relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-orbital-blue/20 blur-[100px] rounded-full"></div>

            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <p className="text-sm font-semibold text-muted-dark uppercase tracking-widest mb-2">
                  المستوى الحالي
                </p>
                <div className="flex items-center gap-3 text-3xl md:text-4xl font-black text-orbital-blue">
                  مهندس الأنظمة{" "}
                  <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />
                </div>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-background-dark flex items-center justify-center border border-border-dark shadow-inner">
                <Trophy className="w-8 h-8 text-orbital-gold" />
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-muted-dark">التقدم للمستوى التالي</span>
                <span className="text-orbital-blue">
                  {xp} / {nextRankXp} XP
                </span>
              </div>

              {/* PROGRESS BAR */}
              <div className="h-4 w-full bg-background-dark rounded-full overflow-hidden border border-border-dark">
                <div
                  className="h-full bg-gradient-to-r from-orbital-blue to-orbital-teal rounded-full transition-all duration-1000 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 relative z-10">
              <div className="p-4 rounded-2xl bg-background-dark border border-border-dark flex items-center gap-4">
                <div className="p-3 rounded-xl bg-orbital-gold/10 text-orbital-gold">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-dark uppercase mb-1">
                    إجمالي التفاعل
                  </p>
                  <p className="text-xl font-bold text-foreground-dark">{xp}</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-background-dark border border-border-dark flex items-center gap-4">
                <div className="p-3 rounded-xl bg-orbital-violet/10 text-orbital-violet">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-dark uppercase mb-1">
                    المشاريع
                  </p>
                  <p className="text-xl font-bold text-foreground-dark">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  );
}
