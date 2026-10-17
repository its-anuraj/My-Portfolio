import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/ui/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anuraj Singh — Mobile App Developer",
  description:
    "Portfolio of Anuraj Singh — 4th Year B.Tech CSE Student, Mobile App Developer, Google Ambassador alum, and HackIndia participant. Building premium mobile experiences with React Native and TypeScript.",
  keywords: [
    "Anuraj Singh",
    "Mobile App Developer",
    "React Native",
    "TypeScript",
    "Portfolio",
    "KCC Institute",
    "Google Ambassador",
  ],
  authors: [{ name: "Anuraj Singh", url: "https://github.com/its-anuraj" }],
  openGraph: {
    title: "Anuraj Singh — Mobile App Developer",
    description:
      "Premium developer portfolio — React Native, TypeScript, and full-stack development.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuraj Singh — Mobile App Developer",
    description:
      "Premium developer portfolio — React Native, TypeScript, and full-stack development.",
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
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
