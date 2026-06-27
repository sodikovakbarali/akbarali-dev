import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: profile.pageTitle,
  description: profile.subheadline,
  metadataBase: new URL("https://akbarali.dev"),
  openGraph: {
    title: profile.pageTitle,
    description: profile.subheadline,
    siteName: profile.siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: profile.pageTitle,
    description: profile.subheadline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
