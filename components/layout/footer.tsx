import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-[#0a0a0a] py-16">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="p-1.5 rounded-lg bg-pink-500/20">
                                <Sparkles className="w-4 h-4 text-pink-500" />
                            </div>
                            <span className="font-semibold text-lg text-white">Thumblify</span>
                        </Link>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            Generate high-CTR thumbnails for YouTube, X, and Instagram in seconds.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-medium text-white mb-4">Product</h4>
                        <ul className="space-y-3 text-sm text-zinc-500">
                            <li>
                                <a href="#" className="hover:text-pink-500 transition-colors">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-pink-500 transition-colors">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-pink-500 transition-colors">
                                    Showcase
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-medium text-white mb-4">Resources</h4>
                        <ul className="space-y-3 text-sm text-zinc-500">
                            <li>
                                <a href="#" className="hover:text-pink-500 transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-pink-500 transition-colors">
                                    Community
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-pink-500 transition-colors">
                                    Help Center
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-medium text-white mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm text-zinc-500">
                            <li>
                                <a href="#" className="hover:text-pink-500 transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-pink-500 transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-12 pt-8 text-center text-sm text-zinc-600">
                    © {new Date().getFullYear()} Thumblify. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
