import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import BackToTop from "@/components/BackToTop";
import { Outfit, Space_Grotesk, Syne, JetBrains_Mono } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://its-rawhit.vercel.app"),
  title: {
    default: "Rohit Verma — Full Stack Developer & Systems Engineer",
    template: "%s | Rohit Verma",
  },
  description:
    "Full Stack Developer based in Ghaziabad, Uttar Pradesh, India. Specializing in high-performance web applications with React, Next.js, Node.js, and motion architecture.",
  keywords: [
    "Rohit Verma",
    "Full Stack Developer",
    "Systems Engineer",
    "Next.js App Router",
    "React",
    "Node.js",
    "TypeScript",
    "FastAPI",
    "YOLOv8",
    "Ghaziabad",
    "India",
  ],
  authors: [{ name: "Rohit Verma", url: "https://its-rawhit.vercel.app" }],
  creator: "Rohit Verma",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://its-rawhit.vercel.app",
    siteName: "Rohit Verma Portfolio",
    title: "Rohit Verma — Full Stack Developer & Systems Engineer",
    description:
      "Crafting high-end digital experiences with React, Next.js, Node.js, and editorial motion design.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Rohit Verma — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Verma — Full Stack Developer",
    description:
      "Full Stack Developer crafting high-performance digital products and systems architecture.",
    images: ["/api/og"],
    creator: "@RohitV33",
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
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rohit Verma",
  url: "https://its-rawhit.vercel.app",
  jobTitle: "Full Stack Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ghaziabad",
    addressRegion: "Uttar Pradesh",
    addressCountry: "India",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "KIET Group of Institutions, Ghaziabad",
  },
  sameAs: [
    "https://github.com/RohitV33",
    "https://www.linkedin.com/in/rawhit01",
    "https://leetcode.com/u/rohit6142/",
  ],
  knowsAbout: [
    "Full Stack Development",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "FastAPI",
    "YOLOv8",
    "Socket.IO",
    "Web Security",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/akira_expanded/Akira Expanded Demo.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className={`${outfit.variable} ${spaceGrotesk.variable} ${syne.variable} ${jetbrainsMono.variable}`}>
        {/* Skip to Content for Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-amber focus:text-charcoal focus:font-mono focus:text-xs focus:font-bold focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-charcoal"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <ScrollIndicator />
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <BackToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
