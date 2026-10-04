import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";
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
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "LLM security",
    "AI security",
    "prompt injection",
    "red teaming",
    "LLM Top 10",
  ],
  authors: [{ name: site.author, url: site.authorUrl }],
  creator: site.author,
  metadataBase: new URL(site.url),
  alternates: {
    types: { "application/atom+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
};

// Structured data: the site and its single author, linked to the brand site.
const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      author: { "@id": `${site.url}/#author` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#author`,
      name: site.author,
      url: site.authorUrl,
      sameAs: [site.authorUrl, site.repo],
    },
  ],
});

// Runs before paint to set the theme (localStorage → system → dark) with no flash.
const THEME_INIT = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}var d=document.documentElement;d.classList.toggle('dark',t==='dark');d.style.colorScheme=t;}catch(e){var d=document.documentElement;d.classList.add('dark');d.style.colorScheme='dark';}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON_LD }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <TooltipProvider>
          <div className="flex min-h-screen flex-col">
            <NavBar />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
