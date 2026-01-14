import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About ThumbJuice | Pro-Grade Thumbnail Generator",
    description:
        "Created by a designer with 7 years of experience. ThumbJuice uses pro-grade mockups and high-CTR logic.",
};

export default function AboutPage() {
    return (
        <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
            {/* Navbar */}
            <nav
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
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
                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
                        <img src="/logo.png" alt="ThumbJuice" style={{ width: "32px", height: "32px" }} />
                        <span style={{ fontWeight: 600, fontSize: "18px", color: "white" }}>ThumbJuice</span>
                    </Link>
                    <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                        <Link href="/" style={{ fontSize: "14px", color: "#a1a1aa", textDecoration: "none" }}>Home</Link>
                        <Link href="/#generate" style={{ fontSize: "14px", color: "#a1a1aa", textDecoration: "none" }}>Generate</Link>
                        <Link href="/about" style={{ fontSize: "14px", color: "#a78bfa", textDecoration: "none" }}>About</Link>
                        <Link href="/contact" style={{ fontSize: "14px", color: "#a1a1aa", textDecoration: "none" }}>Contact</Link>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main style={{ paddingTop: "140px", paddingBottom: "80px", maxWidth: "800px", margin: "0 auto", padding: "140px 24px 80px" }}>
                <h1
                    style={{
                        fontSize: "48px",
                        fontWeight: 700,
                        marginBottom: "32px",
                        background: "linear-gradient(180deg, #a78bfa 0%, #8b5cf6 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    About ThumbJuice
                </h1>

                <div
                    style={{
                        background: "rgba(139, 92, 246, 0.1)",
                        border: "1px solid rgba(139, 92, 246, 0.2)",
                        borderRadius: "16px",
                        padding: "32px",
                        marginBottom: "32px",
                    }}
                >
                    <p style={{ fontSize: "20px", lineHeight: 1.8, color: "#d4d4d8", margin: 0 }}>
                        Created by a designer with <strong style={{ color: "#a78bfa" }}>7 years of experience</strong>.
                        ThumbJuice uses pro-grade mockups and high-CTR logic to ensure every generation looks handcrafted.
                    </p>
                </div>

                <div style={{ display: "grid", gap: "24px" }}>
                    <div
                        style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                            padding: "24px",
                        }}
                    >
                        <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#a78bfa", marginBottom: "12px" }}>
                            🎨 Pro-Grade Mockups
                        </h3>
                        <p style={{ color: "#71717a", lineHeight: 1.6, margin: 0 }}>
                            Every thumbnail is generated using professional templates that have been tested for maximum click-through rates.
                        </p>
                    </div>

                    <div
                        style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                            padding: "24px",
                        }}
                    >
                        <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#a78bfa", marginBottom: "12px" }}>
                            🧠 High-CTR Logic
                        </h3>
                        <p style={{ color: "#71717a", lineHeight: 1.6, margin: 0 }}>
                            Our AI understands what makes viewers click. Bold text, strategic placement, and niche-specific visual rules.
                        </p>
                    </div>

                    <div
                        style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                            padding: "24px",
                        }}
                    >
                        <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#a78bfa", marginBottom: "12px" }}>
                            ⚡ Photoshop-Quality Output
                        </h3>
                        <p style={{ color: "#71717a", lineHeight: 1.6, margin: 0 }}>
                            The juice is mixed in Photoshop. Real templates, real quality, real results.
                        </p>
                    </div>
                </div>

                <div style={{ marginTop: "48px", textAlign: "center" }}>
                    <Link href="/#generate">
                        <button
                            style={{
                                height: "48px",
                                padding: "0 32px",
                                borderRadius: "9999px",
                                background: "#8b5cf6",
                                color: "white",
                                fontSize: "16px",
                                fontWeight: 500,
                                border: "none",
                                cursor: "pointer",
                                boxShadow: "0 0 24px rgba(139, 92, 246, 0.4)",
                            }}
                        >
                            Start Generating →
                        </button>
                    </Link>
                </div>
            </main>
        </div>
    );
}
