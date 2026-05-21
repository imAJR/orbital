import type { Metadata } from "next";
import { Syne, DM_Sans, Cairo } from "next/font/google";
import "./globals.css";
import { RootProvider } from "@/components/providers/RootProvider";
import { StarBackground } from "@/components/StarBackground";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Orbital - منصة التواصل الاجتماعي الحديثة",
  description:
    "كل ما تشاركه. مدار واحد. - منصة تواصل اجتماعي متكاملة تجمع بين YouTube و Instagram و TikTok و Snapchat و Discord",
  keywords: [
    "social media",
    "تواصل اجتماعي",
    "orbital",
    "networking",
    "community",
  ],
  authors: [{ name: "علي الجبرتي", url: "https://github.com/imAJR" }],
  creator: "Ali Aljabarti",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://orbital.app",
    title: "Orbital - منصة التواصل الاجتماعي الحديثة",
    description: "كل ما تشاركه. مدار واحد.",
    siteName: "Orbital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbital - Social Media Platform",
    description: "Everything you share. One orbit.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#050508" />
        <meta name="color-scheme" content="dark light" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Orbital" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${syne.variable} ${dmSans.variable} ${cairo.variable} bg-transparent transition-colors duration-300 font-sans min-h-screen relative`}
      >
        <StarBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <RootProvider>{children}</RootProvider>
        </div>
      </body>
    </html>
  );
}
