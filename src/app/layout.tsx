import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EquiBrains",
  description: "AI-powered stock intelligence with portfolio clarity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${fraunces.variable} antialiased text-gray-900`}
      >
        <Navbar />
        {children}
        <footer className="border-t border-ink-200 py-10 text-center text-xs text-ink-500">
          EquiBrains provides AI-based market insights for educational purposes
          only. Not SEBI-registered investment advice.
        </footer>
      </body>
    </html>
  );
}
