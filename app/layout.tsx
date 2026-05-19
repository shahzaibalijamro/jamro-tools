import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JAMRO TOOLS",
  description:
    "Explore free calculators, converters, generators, and utilities from JAMRO TOOLS.",
  verification: {
    google: "IAiGibFhHc1E4PgoezOdgQVxtCxI06idO6FMJR3BNm4",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <GoogleAnalytics gaId="G-G787P55JXR" />
      <body className="min-h-full">{children}</body>
    </html>
  );
}
