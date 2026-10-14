import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Wallpaper from "@/components/Wallpaper";
import { themeBootScript } from "@/components/themeScript";
import { profile } from "@/content/site";
import "./globals.css";

// Fonts are downloaded at build time and served with the site: no requests to Google at runtime.
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter", axes: ["opsz"] });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jetbrains", weight: ["400", "500"] });

const title = `${profile.name} — Software Engineer, CRM Integrations & Data Systems`;
// Full public URL (including any sub-path), e.g. https://example.github.io/CV — enables canonical and absolute URLs.
const siteUrl = process.env.SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  title: { default: title, template: `%s · ${profile.name}` },
  description: profile.description,
  authors: [{ name: profile.name }],
  openGraph: { title, description: profile.description, type: "website", locale: "en_GB", siteName: profile.name },
  twitter: { card: "summary", title, description: profile.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef0f5" },
    { media: "(prefers-color-scheme: dark)", color: "#161617" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body id="top">
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Wallpaper />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
