"use client";

import Link from "next/link";
import { Sparkles, Menu } from "lucide-react";

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-1.5 rounded-lg bg-pink-500/20 group-hover:bg-pink-500/30 transition-colors">
                        <Sparkles className="w-4 h-4 text-pink-500" />
                    </div>
                    <span className="font-semibold text-lg text-white">
                        Thumblify
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
                        Home
                    </Link>
                    <Link href="#generate" className="text-sm text-zinc-400 hover:text-white transition-colors">
                        Generate
                    </Link>
                    <Link href="#about" className="text-sm text-zinc-400 hover:text-white transition-colors">
                        About
                    </Link>
                    <Link href="#contact" className="text-sm text-zinc-400 hover:text-white transition-colors">
                        Contact us
                    </Link>
                </div>

                {/* CTA Button */}
                <button className="hidden sm:flex items-center justify-center h-9 px-5 rounded-full bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 transition-colors btn-glow">
                    Get Started
                </button>

                {/* Mobile Menu */}
                <button className="md:hidden p-2 text-zinc-400 hover:text-white">
                    <Menu className="w-5 h-5" />
                </button>
            </div>
        </nav>
    );
}
