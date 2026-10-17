import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/ui/Footer";
import StructuredData from "@/components/seo/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F6" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0F11" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://anuraj-singh.vercel.app"),
  title: {
    default: "Anuraj Singh — Mobile App Developer | React Native & Expo",
    template: "%s | Anuraj Singh",
  },
  description:
    "Portfolio of Anuraj Singh — Mobile App Developer specializing in React Native, Expo, TypeScript, JavaScript, and high-performance mobile applications. Explore Keepr, SERS, and TeamForge.ai.",
  keywords: [
    "Anuraj Singh",
    "Anuraj Singh Portfolio",
    "Anuraj Singh Mobile App Developer",
    "Anuraj Singh React Native Developer",
    "Anuraj Singh React Native Projects",
    "Mobile App Developer",
    "React Native Developer",
    "Expo Developer",
    "TypeScript Mobile Developer",
    "KCC Institute of Technology & Management",
    "Mobile App Developer Greater Noida",
    "Mobile App Developer India",
    "Keepr",
    "SERS Emergency Response",
    "TeamForge AI",
    "its-anuraj",
  ],
  authors: [{ name: "Anuraj Singh", url: "https://github.com/its-anuraj" }],
  creator: "Anuraj Singh",
  publisher: "Anuraj Singh",
  applicationName: "Anuraj Singh Portfolio",
  alternates: {
    canonical: "https://anuraj-singh.vercel.app",
  },
  openGraph: {
    title: "Anuraj Singh — Mobile App Developer | React Native & Expo",
    description:
      "Mobile App Developer specializing in React Native, Expo, TypeScript, and mobile application engineering. Explore featured projects: Keepr, SERS, and TeamForge.ai.",
    url: "https://anuraj-singh.vercel.app",
    siteName: "Anuraj Singh Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/anuraj.png",
        width: 800,
        height: 800,
        alt: "Anuraj Singh — Mobile App Developer | React Native & Expo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuraj Singh — Mobile App Developer | React Native & Expo",
    description:
      "Mobile App Developer specializing in React Native, Expo, and TypeScript. Discover projects, technical skills, and experience.",
    images: ["/anuraj.png"],
    creator: "@its-anuraj",
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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/anuraj.png",
  },
  verification: {
    google: "V9prS3rk2FNEoRYhuvOOejIeNdFmnnLdmLosLNExQb8",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <Navbar />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
