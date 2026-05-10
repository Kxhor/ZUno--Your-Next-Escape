import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ZUno — Your Next Escape",
    template: "%s | ZUno",
  },
  description:
    "Plan your dream trips with AI-powered itineraries, budget tracking, and collaborative travel planning.",
  keywords: ["travel", "itinerary", "trip planning", "AI travel", "vacation"],
  openGraph: {
    title: "ZUno — Your Next Escape",
    description: "AI-powered collaborative travel planning platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
