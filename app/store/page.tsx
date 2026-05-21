"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { ShoppingBag, Zap } from "lucide-react";

const items = [
  {
    id: 1,
    name: "ثيم النجم",
    price: 1000,
    desc: "توهج ذهبي للملف الشخصي",
    color: "from-orbital-gold to-orange-500",
  },
  {
    id: 2,
    name: "شارة خبير",
    price: 500,
    desc: "شارة توثيق بجانب اسمك",
    color: "from-orbital-blue to-orbital-teal",
  },
  {
    id: 3,
    name: "الخلفية المتحركة",
    price: 2500,
    desc: "فضاء متحرك لصفحتك",
    color: "from-orbital-violet to-orbital-pink",
  },
];

export default function StorePage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col bg-background-dark min-h-screen">
      <Navbar />

      <div className="flex flex-1 justify-center w-full max-w-7xl mx-auto px-4 md:px-6 gap-6">
        <Sidebar />

        <main className="flex-1 p-6 min-w-0">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* ── HEADER ── */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="font-display font-bold text-3xl text-foreground-dark">
                {t.nav.store}
              </h1>
              <p className="text-muted-dark mt-2">استبدل نقاطك بمميزات حصرية</p>
            </div>
            <div className="bg-orbital-gold/10 border border-orbital-gold/20 px-6 py-3 rounded-2xl flex items-center gap-3">
              <Zap className="text-orbital-gold w-5 h-5" />
              <span className="text-2xl font-bold text-orbital-gold">
                1850 XP
              </span>
            </div>
          </div>

          {/* ── ITEMS GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-background-hover/30 border border-border-dark rounded-3xl p-8 hover:-translate-y-1 transition-transform duration-300 flex flex-col"
              >
                <div
                  className={`w-full h-2 mb-6 bg-gradient-to-r ${item.color} rounded-full`}
                ></div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground-dark mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-dark mb-8">{item.desc}</p>
                </div>
                <button className="w-full py-4 rounded-xl bg-background-dark border border-border-dark text-foreground-dark font-semibold hover:bg-orbital-blue hover:border-orbital-blue hover:text-white transition-colors flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  شراء بـ {item.price} XP
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  </div>
  );
}
