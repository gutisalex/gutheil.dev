import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Alexander Gutheil - Senior Frontend Developer",
    template: "%s | Alexander Gutheil",
  },
  description:
    "Senior Frontend Developer with 10+ years of experience building high-performance web and mobile applications. Expert in Vue.js, Nuxt.js, React, and Next.js.",
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
    url: "https://guddis.dev",
    title: "Alexander Gutheil - Senior Frontend Developer",
    description:
      "Senior Frontend Developer with 10+ years of experience building high-performance web and mobile applications.",
    siteName: "Alexander Gutheil",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexander Gutheil - Senior Frontend Developer",
    description:
      "Senior Frontend Developer with 10+ years of experience building high-performance web and mobile applications.",
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
