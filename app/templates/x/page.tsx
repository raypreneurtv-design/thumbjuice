"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Placeholder template data for X/Twitter
const xTemplates = [
    {
        id: 1,
        name: "Viral Thread Opener",
        description: "Hook them in the first frame",
        preview: "/templates/x-template-1.png",
    },
    {
        id: 2,
        name: "Hot Take Card",
        description: "Bold opinions, bigger engagement",
        preview: "/templates/x-template-2.png",
    },
    {
        id: 3,
        name: "Quote Tweet Bait",
        description: "Make them quote tweet you",
        preview: "/templates/x-template-3.png",
    },
    {
        id: 4,
        name: "Ratio Reversal",
        description: "Turn haters into followers",
        preview: "/templates/x-template-4.png",
    },
    {
        id: 5,
        name: "Thread Ender",
        description: "Perfect CTA for your threads",
        preview: "/templates/x-template-5.png",
    },
    {
        id: 6,
        name: "Meme Format",
        description: "Viral meme-style thumbnails",
        preview: "/templates/x-template-6.png",
    },
    {
        id: 7,
        name: "Breaking News",
        description: "Urgency that stops the scroll",
        preview: "/templates/x-template-7.png",
    },
    {
        id: 8,
        name: "Stats & Data",
        description: "Numbers that shock and engage",
        preview: "/templates/x-template-8.png",
    },
];

export default function XTemplatesPage() {
    return (
        <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
            {/* Header */}
            <header
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 50,
                    background: "rgba(0,0,0,0.85)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
            >
                <div
                    style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        padding: "0 24px",
                        height: "64px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Link
                        href="/"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#a1a1aa",
                            textDecoration: "none",
                            fontSize: "14px",
                            transition: "color 0.2s ease",
                        }}
                    >
                        <ArrowLeft style={{ width: "16px", height: "16px" }} />
                        Back to Generator
                    </Link>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <span style={{ fontWeight: 700, fontSize: "18px" }}>Templates</span>
                    </div>

                    <div style={{ width: "100px" }} /> {/* Spacer for centering */}
                </div>
            </header>

            {/* Page Content */}
            <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
                {/* Page Header */}
                <div style={{ textAlign: "center", marginBottom: "48px" }}>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px 16px",
                            borderRadius: "9999px",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            marginBottom: "24px",
                        }}
                    >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <span style={{ fontSize: "12px", color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "1px" }}>
                            X / Twitter
                        </span>
                    </div>

                    <h1
                        style={{
                            fontSize: "clamp(32px, 5vw, 48px)",
                            fontWeight: 700,
                            marginBottom: "16px",
                            background: "linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        X Templates
                    </h1>
                    <p style={{ color: "#71717a", fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
                        Thumbnails designed to stop the scroll. Pick a template, customize it, and watch your engagement explode.
                    </p>
                </div>

                {/* Templates Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "24px",
                    }}
                >
                    {xTemplates.map((template) => (
                        <div
                            key={template.id}
                            style={{
                                background: "rgba(24, 24, 27, 0.8)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "16px",
                                overflow: "hidden",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                                e.currentTarget.style.transform = "translateY(-4px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            {/* Template Preview */}
                            <div
                                style={{
                                    aspectRatio: "16/9",
                                    background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                                    position: "relative",
                                }}
                            >
                                {/* Placeholder for template preview */}
                                <div
                                    style={{
                                        width: "80%",
                                        height: "80%",
                                        background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                                        border: "2px dashed rgba(255,255,255,0.1)",
                                        borderRadius: "8px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <span style={{ color: "#3f3f46", fontSize: "14px" }}>Template Preview</span>
                                </div>

                                {/* Template Number Badge */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "12px",
                                        right: "12px",
                                        background: "rgba(0,0,0,0.7)",
                                        padding: "4px 10px",
                                        borderRadius: "6px",
                                        fontSize: "12px",
                                        color: "#a1a1aa",
                                    }}
                                >
                                    #{template.id}
                                </div>
                            </div>

                            {/* Template Info */}
                            <div style={{ padding: "20px" }}>
                                <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px", color: "white" }}>
                                    {template.name}
                                </h3>
                                <p style={{ fontSize: "14px", color: "#71717a" }}>{template.description}</p>

                                {/* Use Template Button */}
                                <button
                                    style={{
                                        marginTop: "16px",
                                        width: "100%",
                                        height: "40px",
                                        borderRadius: "8px",
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        color: "white",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                                    }}
                                >
                                    Use Template
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coming Soon Notice */}
                <div
                    style={{
                        marginTop: "64px",
                        textAlign: "center",
                        padding: "32px",
                        background: "rgba(139, 92, 246, 0.05)",
                        border: "1px solid rgba(139, 92, 246, 0.2)",
                        borderRadius: "16px",
                    }}
                >
                    <p style={{ color: "#a78bfa", fontSize: "16px", fontWeight: 500, marginBottom: "8px" }}>
                        🚀 More templates coming soon!
                    </p>
                    <p style={{ color: "#71717a", fontSize: "14px" }}>
                        We're constantly adding new viral templates. Check back regularly for updates.
                    </p>
                </div>
            </main>
        </div>
    );
}
