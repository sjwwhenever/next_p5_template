import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "next p5 template",
  description: "Interactive p5.js sketch template with Next.js",
  authors: [
    {
      name: "sjwwhenever (不可兼容)",
      url: "https://github.com/sjwwhenever",
    },
  ],
  creator: "sjwwhenever (不可兼容)",
  icons: {
    icon: "/logo.JPG",
    apple: "/logo.JPG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
