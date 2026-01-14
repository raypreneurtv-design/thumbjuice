import { Hero } from "@/components/home/hero";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ThumbJuice | AI Thumbnail Generator for Viral Videos',
  description: 'Generate high-CTR AI thumbnails for YouTube, gaming, commentary, and finance. Pro-grade mockups mixed in Photoshop.',
  alternates: {
    canonical: 'https://thumbjuice.com',
  },
};

export default function Home() {
  return <Hero />;
}
