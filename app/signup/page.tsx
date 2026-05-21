"use client";

import { Navbar } from "@/components/Navbar";
import { Orbit, Mail, Lock, UserPlus } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/hooks/useTranslation";

export default function SignupPage() {
  const { dir } = useTranslation();

  return (
    <main className="min-h-screen bg-background-dark text-foreground-dark">
      <Navbar />

      <div className="flex items-center justify-center pt-32 pb-20 px-6">
        <div className="w-full max-w-md bg-background-hover/30 border border-border-dark p-10 rounded-3xl backdrop-blur-xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-orbital-blue/20 rounded-2xl flex items-center justify-center mb-4">
              <Orbit className="text-orbital-blue w-10 h-10 animate-pulse" />
            </div>
            <h2 className="font-display font-bold text-3xl">إنشاء حساب</h2>
            <p className="text-muted-dark text-sm mt-2 font-medium text-center">
              ابدأ رحلتك في المدار اليوم
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-muted-dark">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail
                  className={`absolute ${dir === "rtl" ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-muted-dark w-5 h-5`}
                />
                <input
                  type="email"
                  placeholder="ali@example.com"
                  className={`w-full bg-background-dark border border-border-dark rounded-xl py-3 ${dir === "rtl" ? "pr-12 pl-4" : "pl-12 pr-4"} focus:outline-none focus:border-orbital-blue focus:ring-1 focus:ring-orbital-blue transition-all`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-muted-dark">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock
                  className={`absolute ${dir === "rtl" ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-muted-dark w-5 h-5`}
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full bg-background-dark border border-border-dark rounded-xl py-3 ${dir === "rtl" ? "pr-12 pl-4" : "pl-12 pr-4"} focus:outline-none focus:border-orbital-blue focus:ring-1 focus:ring-orbital-blue transition-all`}
                />
              </div>
            </div>

            <Link
              href="/"
              className="w-full bg-orbital-blue text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
            >
              <UserPlus className="w-5 h-5" /> إنشاء الحساب
            </Link>
          </form>

          <p className="text-center mt-8 text-sm text-muted-dark">
            لديك حساب بالفعل؟{" "}
            <Link
              href="/login"
              className="text-orbital-blue hover:underline font-bold"
            >
              سجل دخولك
            </Link>
          </p>

          <div className="mt-8 pt-6 border-t border-border-dark text-center">
            <Link
              href="/"
              className="text-xs text-muted-dark hover:text-foreground-dark transition-colors"
            >
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
