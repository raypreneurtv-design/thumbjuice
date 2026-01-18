"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Placeholder template data for YouTube
const youtubeTemplates = [
    {
        id: 1,
        name: "Mr. Beast Style",
        description: "Huge text, shocked faces, arrows",
        preview: "/templates/yt-template-1.png",
    },
    {
        id: 2,
        name: "Tutorial Clean",
        description: "Professional how-to thumbnails",
        preview: "/templates/yt-template-2.png",
    },
    {
        id: 3,
        name: "Gaming Hype",
        description: "Explosive colors, action shots",
        preview: "/templates/yt-template-3.png",
    },
    {
        id: 4,
        name: "Before/After",
        description: "Transformation content gold",
        preview: "/templates/yt-template-4.png",
    },
    {
        id: 5,
        name: "Reaction Face",
        description: "😱 faces that get clicks",
        preview: "/templates/yt-template-5.png",
    },
    {
        id: 6,
        name: "List Video",
        description: "Top 10, ranked content",
        preview: "/templates/yt-template-6.png",
    },
    {
        id: 7,
        name: "Commentary Drama",
        description: "Tea spilling aesthetics",
        preview: "/templates/yt-template-7.png",
    },
    {
        id: 8,
        name: "Vlog Style",
        description: "Personal, authentic vibes",
        preview: "/templates/yt-template-8.png",
    },
    {
        id: 9,
        name: "Challenge Video",
        description: "$X if you can do Y",
        preview: "/templates/yt-template-9.png",
    },
    {
        id: 10,
        name: "Storytime",
        description: "Intrigue and curiosity",
        preview: "/templates/yt-template-10.png",
    },
    {
        id: 11,
        name: "Exposed/Callout",
        description: "Drama sells, controversy pays",
        preview: "/templates/yt-template-11.png",
    },
    {
        id: 12,
        name: "Shorts Vertical",
        description: "9:16 for YouTube Shorts",
        preview: "/templates/yt-template-12.png",
    },
];

export default function YouTubeTemplatesPage() {
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
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="#FF0000">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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
                            background: "rgba(255, 0, 0, 0.1)",
                            border: "1px solid rgba(255, 0, 0, 0.2)",
                            marginBottom: "24px",
                        }}
                    >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="#FF0000">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        <span style={{ fontSize: "12px", color: "#ff6b6b", textTransform: "uppercase", letterSpacing: "1px" }}>
                            YouTube
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
                        YouTube Templates
                    </h1>
                    <p style={{ color: "#71717a", fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
                        High-CTR thumbnail templates used by creators with millions of views. Pick your style and dominate the algorithm.
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
                    {youtubeTemplates.map((template) => (
                        <div
                            key={template.id}
                            style={{
                                background: "rgba(24, 24, 27, 0.8)",
                                border: "1px solid rgba(255, 0, 0, 0.1)",
                                borderRadius: "16px",
                                overflow: "hidden",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "rgba(255, 0, 0, 0.3)";
                                e.currentTarget.style.transform = "translateY(-4px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "rgba(255, 0, 0, 0.1)";
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
                                    borderBottom: "1px solid rgba(255, 0, 0, 0.05)",
                                    position: "relative",
                                }}
                            >
                                {/* Placeholder for template preview */}
                                <div
                                    style={{
                                        width: "80%",
                                        height: "80%",
                                        background: "linear-gradient(135deg, rgba(255, 0, 0, 0.03) 0%, rgba(255, 0, 0, 0.01) 100%)",
                                        border: "2px dashed rgba(255, 0, 0, 0.15)",
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
                                        background: "rgba(255, 0, 0, 0.8)",
                                        padding: "4px 10px",
                                        borderRadius: "6px",
                                        fontSize: "12px",
                                        color: "white",
                                        fontWeight: 600,
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
                                        background: "rgba(255, 0, 0, 0.1)",
                                        border: "1px solid rgba(255, 0, 0, 0.2)",
                                        color: "white",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(255, 0, 0, 0.2)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "rgba(255, 0, 0, 0.1)";
                                    }}
                                >
                                    Use Template
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pro Tip Section */}
                <div
                    style={{
                        marginTop: "64px",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "24px",
                    }}
                >
                    <div
                        style={{
                            padding: "24px",
                            background: "rgba(255, 0, 0, 0.05)",
                            border: "1px solid rgba(255, 0, 0, 0.15)",
                            borderRadius: "16px",
                        }}
                    >
                        <h3 style={{ color: "#ff6b6b", fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>
                            🎯 Pro Tip: CTR Matters
                        </h3>
                        <p style={{ color: "#71717a", fontSize: "14px", lineHeight: "1.6" }}>
                            A 2% CTR increase can double your impressions over time. These templates are designed for maximum click-through.
                        </p>
                    </div>
                    <div
                        style={{
                            padding: "24px",
                            background: "rgba(139, 92, 246, 0.05)",
                            border: "1px solid rgba(139, 92, 246, 0.15)",
                            borderRadius: "16px",
                        }}
                    >
                        <h3 style={{ color: "#a78bfa", fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>
                            🚀 More templates coming soon!
                        </h3>
                        <p style={{ color: "#71717a", fontSize: "14px", lineHeight: "1.6" }}>
                            We analyze top-performing videos daily. New templates are added weekly based on what's actually working.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
