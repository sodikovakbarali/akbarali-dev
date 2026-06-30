import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
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

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export const metadata: Metadata = {
  title: profile.pageTitle,
  description: profile.subheadline,
  metadataBase: new URL("https://akbaralidev.uz"),
  openGraph: {
    title: profile.pageTitle,
    description: profile.subheadline,
    siteName: profile.siteName,
    type: "website",
    locale: "en_US",
    url: "https://akbaralidev.uz",
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

function RootBody({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen antialiased">
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (publishableKey) {
    return (
      <ClerkProvider publishableKey={publishableKey}>
        <RootBody>{children}</RootBody>
      </ClerkProvider>
    );
  }

  return <RootBody>{children}</RootBody>;
}
