import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CursorGlow } from "@/components/CursorGlow";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gutheil.dev"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Alexander Gutheil - Senior Frontend Developer",
    template: "%s | Alexander Gutheil",
  },
  description:
    "Senior Frontend Developer with 7+ years of focused experience building high-performance web and mobile applications. Expert in Vue.js, Nuxt.js, React, and Next.js.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "Vue.js",
    "Nuxt.js",
    "TypeScript",
    "Web Development",
    "Software Engineer",
  ],
  authors: [{ name: "Alexander Gutheil" }],
  creator: "Alexander Gutheil",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gutheil.dev",
    title: "Alexander Gutheil - Senior Frontend Developer",
    description:
      "Senior Frontend Developer with 7+ years of focused experience building high-performance web and mobile applications.",
    siteName: "Alexander Gutheil",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexander Gutheil - Senior Frontend Developer",
    description:
      "Senior Frontend Developer with 7+ years of focused experience building high-performance web and mobile applications.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-none focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <CursorGlow />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
