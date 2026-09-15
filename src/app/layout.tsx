import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LazyMotion, domAnimation } from "framer-motion";
import Navbar from "@/components/ui/NavBar";
import Footer from "@/components/contact-us/Footer";
import BeamsBackground from "@/components/ui/BeamsBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IEEE EMBS - VIT",
  description: "IEEE Engineering in Medicine and Biology Society",
  icons: "/embs-logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LazyMotion features={domAnimation}>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full overflow-x-hidden overflow-y-auto flex flex-col relative bg-black text-white">
          {/* Persistent Background across all pages */}
          <div className="fixed inset-0 z-0">
            <BeamsBackground />
          </div>

          {/* Navigation Bar persistent on top */}
          

          {/* Page Content wrapped in a relative container with top padding for navbar spacing */}
          <main className="relative z-10 flex-grow pt-20">
            {children}
          </main>

          {/* Footer persistent at the bottom */}
          <div className="relative z-10">
            <Footer />
          </div>
        </body>
      </html>
    </LazyMotion>
  );
}