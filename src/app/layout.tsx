import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/StoreProvider";

import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyBlog",
  description: "Create your blog!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-lt-installed="true">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <StoreProvider>
          <div className="flex flex-col justify-between min-h-screen">
            <Header />
            <main>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {children}
              </div>
            </main>
            <footer className="border-t border-gray-700 text-center text-sm text-gray-400 py-4">
              <p>&copy; OleksiiShe 2025</p>
            </footer>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
