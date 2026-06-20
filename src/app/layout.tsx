import type { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: {
    default: "GameVerse — Play 1000+ Free Browser Games Online",
    template: "%s | GameVerse",
  },
  description:
    "Play 1000+ free browser games instantly on GameVerse. No downloads, no sign-ups. Racing, Action, Puzzle, Sports, Arcade & more — updated daily.",
  keywords: [
    "free games", "browser games", "online games", "HTML5 games",
    "play games", "gameverse", "no download games", "instant play",
  ],
  authors: [{ name: "GameVerse" }],
  creator: "GameVerse",
  publisher: "GameVerse",
  metadataBase: new URL("https://gameverse.vercel.app"),
  openGraph: {
    type: "website",
    siteName: "GameVerse",
    title: "GameVerse — Play 1000+ Free Browser Games Online",
    description:
      "Play 1000+ free browser games instantly. No downloads, no sign-ups. Racing, Action, Puzzle, Sports, Arcade & more.",
    url: "https://gameverse.vercel.app",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GameVerse — Free Browser Games",
    description:
      "Play 1000+ free browser games instantly. No downloads, no sign-ups.",
    images: ["/og-image.png"],
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
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml" },
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://gameverse.vercel.app",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0f172a" />
        <meta name="google-adsense-account" content="ca-pub-xxxxxxxxxxxxxx" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GameVerse",
              url: "https://gameverse.vercel.app",
              description:
                "Play 1000+ free browser games instantly. No downloads, no sign-ups.",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://gameverse.vercel.app/games?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased bg-dark-900 text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
