import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enterprise Stock Prediction",
  description: "Real-time market analysis and AI-driven forecasts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Sidebar />
        <Header />
        <main className="pl-0 md:pl-64 pt-16 min-h-screen transition-all duration-300">
          {children}
        </main>
      </body>
    </html>
  );
}
