import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics } from "@next/third-parties/google";

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
  metadataBase: new URL("https://shahzaibalijamro.vercel.app"),
  title: "JAMRO TOOLS",
  description:
    "Explore free calculators, converters, generators, and utilities from JAMRO TOOLS.",
  icons: {
    icon: "/favicon.png",
  },
  verification: {
    google: "Uz-tsuTDMUc4nsDWS0fkaCOLA54as0IUgIQiQ5YwU3o",
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
      </head>
      <body className="bg-background text-body-md text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed min-h-full">
        {children}
        <Analytics />
        <GoogleAnalytics gaId="G-QD50R2JB1W" />
      </body>
    </html>
  );
}
