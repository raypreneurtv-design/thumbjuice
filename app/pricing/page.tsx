import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Pricing | ThumbJuice - AI Thumbnail Generator",
    description: "Choose the perfect plan for your YouTube thumbnail needs. Start for free, upgrade anytime.",
};

export default function PricingPage() {
    return (
        <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white", fontFamily: "Inter, system-ui, sans-serif" }}>
            {/* Navbar */}
            <nav
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    background: "rgba(0,0,0,0.9)",
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
                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                        <img src="/logo.png" alt="ThumbJuice" style={{ width: "36px", height: "36px" }} />
                        <span style={{ fontWeight: 700, fontSize: "20px", color: "white", letterSpacing: "-0.5px" }}>
                            Thumb<span style={{ color: "#a855f7" }}>Juice</span>
                        </span>
                    </Link>
                    <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                        <Link href="/" style={{ fontSize: "14px", color: "#888", textDecoration: "none" }}>Home</Link>
                        <Link href="/#generate" style={{ fontSize: "14px", color: "#888", textDecoration: "none" }}>Generate</Link>
                        <Link href="/about" style={{ fontSize: "14px", color: "#888", textDecoration: "none" }}>About</Link>
                        <Link href="/pricing" style={{ fontSize: "14px", color: "#a855f7", textDecoration: "none" }}>Pricing</Link>
                    </div>
                </div>
            </nav>

            {/* Header Section */}
            <section style={{ paddingTop: "140px", paddingBottom: "60px", textAlign: "center" }}>
                <p style={{ color: "#888", fontSize: "14px", letterSpacing: "1px", marginBottom: "16px" }}>
                    Unlock Your Creative Power
                </p>
                <h1
                    style={{
                        fontSize: "clamp(32px, 4vw, 48px)",
                        fontWeight: 700,
                        color: "white",
                        letterSpacing: "-1px",
                        marginBottom: "60px",
                    }}
                >
                    Choose the right plan for you
                </h1>
            </section>

            {/* Pricing Cards */}
            <section style={{ paddingBottom: "60px" }}>
                <div
                    style={{
                        maxWidth: "1100px",
                        margin: "0 auto",
                        padding: "0 24px",
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "24px",
                        alignItems: "center",
                    }}
                >
                    {/* BASIC CARD */}
                    <div
                        style={{
                            background: "#1a1a2e",
                            borderRadius: "16px",
                            padding: "40px",
                            border: "1px solid rgba(255,255,255,0.1)",
                            transition: "transform 0.3s ease",
                        }}
                    >
                        <h3 style={{ fontSize: "20px", fontWeight: 600, color: "white", marginBottom: "4px" }}>Basic</h3>
                        <p style={{ fontSize: "14px", color: "#888", marginBottom: "24px" }}>For casual creators</p>

                        <div style={{ marginBottom: "32px" }}>
                            <span style={{ fontSize: "48px", fontWeight: 700, color: "#06b6d4" }}>$9</span>
                            <span style={{ fontSize: "18px", color: "#666", marginLeft: "4px" }}>/Month</span>
                        </div>

                        <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: "32px" }}>
                            {["Unlimited thumbnails", "FLUX Schnell (fast)", "1280x720 resolution", "PNG/JPG downloads", "7-day history"].map((feature) => (
                                <li key={feature} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", fontSize: "14px", color: "#ccc" }}>
                                    <CheckCircle size={18} style={{ color: "#666" }} />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                background: "transparent",
                                border: "1px solid rgba(255,255,255,0.3)",
                                color: "white",
                                fontSize: "14px",
                                fontWeight: 500,
                                cursor: "pointer",
                                transition: "background 0.2s ease",
                            }}
                        >
                            Subscribe
                        </button>
                    </div>

                    {/* PRO CARD - BEST OFFER */}
                    <div
                        style={{
                            position: "relative",
                            background: "#1a1a2e",
                            borderRadius: "16px",
                            padding: "48px 40px",
                            border: "1px solid rgba(168, 85, 247, 0.3)",
                            transform: "scale(1.05)",
                            boxShadow: "0 0 60px rgba(168, 85, 247, 0.3), 0 0 100px rgba(236, 72, 153, 0.15)",
                            transition: "transform 0.3s ease",
                        }}
                    >
                        {/* Best Offer Badge */}
                        <div
                            style={{
                                position: "absolute",
                                top: "-12px",
                                right: "24px",
                                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                                padding: "6px 16px",
                                borderRadius: "9999px",
                                fontSize: "11px",
                                fontWeight: 700,
                                color: "white",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                                boxShadow: "0 4px 12px rgba(168, 85, 247, 0.4)",
                            }}
                        >
                            Best Offer
                        </div>

                        <h3 style={{ fontSize: "20px", fontWeight: 600, color: "white", marginBottom: "4px" }}>Pro</h3>
                        <p style={{ fontSize: "14px", color: "#888", marginBottom: "24px" }}>For professionals & teams</p>

                        <div style={{ marginBottom: "32px" }}>
                            <span
                                style={{
                                    fontSize: "56px",
                                    fontWeight: 700,
                                    background: "linear-gradient(135deg, #a855f7, #ec4899)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                $19
                            </span>
                            <span style={{ fontSize: "18px", color: "#666", marginLeft: "4px" }}>/Month</span>
                        </div>

                        <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: "32px" }}>
                            {[
                                "Everything in Basic, plus:",
                                "FLUX Pro (premium quality)",
                                "Multiple aspect ratios",
                                "Unlimited history",
                                "Style customization",
                                "Trend-based templates",
                                "Batch generation (10x)",
                                "Priority support",
                            ].map((feature, i) => (
                                <li key={feature} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", fontSize: "14px", color: i === 0 ? "#a855f7" : "#ccc" }}>
                                    <CheckCircle size={18} style={{ color: "#a855f7" }} />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            style={{
                                width: "100%",
                                padding: "14px",
                                borderRadius: "8px",
                                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                                border: "none",
                                color: "white",
                                fontSize: "14px",
                                fontWeight: 600,
                                cursor: "pointer",
                                boxShadow: "0 4px 20px rgba(168, 85, 247, 0.4)",
                                transition: "filter 0.2s ease",
                            }}
                        >
                            Subscribe
                        </button>
                    </div>

                    {/* MAX CARD */}
                    <div
                        style={{
                            background: "#1a1a2e",
                            borderRadius: "16px",
                            padding: "40px",
                            border: "1px solid rgba(255,255,255,0.15)",
                            boxShadow: "0 0 30px rgba(255,255,255,0.05)",
                            transition: "transform 0.3s ease",
                        }}
                    >
                        <h3 style={{ fontSize: "20px", fontWeight: 600, color: "white", marginBottom: "4px" }}>Max</h3>
                        <p style={{ fontSize: "14px", color: "#888", marginBottom: "24px" }}>For enterprises & agencies</p>

                        <div style={{ marginBottom: "32px" }}>
                            <span style={{ fontSize: "48px", fontWeight: 700, color: "#ffd700" }}>$39</span>
                            <span style={{ fontSize: "18px", color: "#666", marginLeft: "4px" }}>/Month</span>
                        </div>

                        <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: "32px" }}>
                            {[
                                "Everything in Pro, plus:",
                                "Custom designs by real designers",
                                "1 custom thumbnail/week",
                                "Personal style training",
                                "API access (500 req/mo)",
                                "Bulk generation (50x)",
                                "A/B testing & analytics",
                                "White-label option",
                                "24/7 priority support",
                            ].map((feature, i) => (
                                <li key={feature} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", fontSize: "14px", color: i === 0 ? "#ffd700" : "#ccc" }}>
                                    <CheckCircle size={18} style={{ color: "#ffd700" }} />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                background: "white",
                                border: "none",
                                color: "#0a0a0a",
                                fontSize: "14px",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "background 0.2s ease",
                            }}
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer Text */}
            <section style={{ paddingBottom: "80px", textAlign: "center" }}>
                <p style={{ color: "#666", fontSize: "14px" }}>
                    Cancel anytime. No questions asked. 14-day money-back guarantee.
                </p>
            </section>
        </div>
    );
}
