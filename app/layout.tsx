import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JAMRO TOOLS",
  description:
    "Explore free calculators, converters, generators, and utilities from JAMRO TOOLS.",
  icons: {
    icon: "/jamro_tools_favicon.png",
  },
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
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        {/* 👇 Add this */}
        <Script
          src="https://pulse-steel-two.vercel.app/tracker.js"
          data-api-key="pk_03163e73-628f-4d55-8e24-2a21bc6b8c5d"
          data-endpoint="https://pulse-m7ns.onrender.com/i"
          strategy="afterInteractive"
        />
      </head>
      <GoogleAnalytics gaId="G-G787P55JXR" />
      <body className="bg-background text-body-md text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed min-h-full">{children}</body>
    </html>
  );
}
