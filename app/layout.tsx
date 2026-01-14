import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Thumbnail Generator – Create High-CTR Thumbnails Fast",
  description:
    "Generate high-CTR AI thumbnails for YouTube, gaming, commentary, and finance. Fast, glowing, and optimized for clicks.",
  metadataBase: new URL("https://thumbnail-ai.com"), // Placeholder URL, update if real one exists
  openGraph: {
    title: "AI Thumbnail Generator",
    description: "Create viral thumbnails in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
