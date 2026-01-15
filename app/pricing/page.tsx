"use client";

import Link from "next/link";
import { CheckCircle, Sparkles, Palette } from "lucide-react";

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
                        <Link href="/" style={{ fontSize: "14px", color: "#888", textDecoration: "none", transition: "color 0.2s ease" }}>Home</Link>
                        <Link href="/#generate" style={{ fontSize: "14px", color: "#888", textDecoration: "none", transition: "color 0.2s ease" }}>Generate</Link>
                        <Link href="/pricing" style={{ fontSize: "14px", color: "#a855f7", textDecoration: "none", transition: "color 0.2s ease" }}>Pricing</Link>
                        <Link href="#custom-services" style={{ fontSize: "14px", color: "#888", textDecoration: "none", transition: "color 0.2s ease" }}>Services</Link>
                        <Link href="/about" style={{ fontSize: "14px", color: "#888", textDecoration: "none", transition: "color 0.2s ease" }}>About</Link>
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
                            {["Unlimited thumbnails", "FLUX Schnell (fast)", "1280x720 resolution", "PNG/JPG downloads", "7-day history", "📧 Email support"].map((feature) => (
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
                                "🎨 Priority custom gig requests",
                                "💬 Priority support",
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
                            position: "relative",
                            background: "#1a1a2e",
                            borderRadius: "16px",
                            padding: "40px",
                            border: "1px solid rgba(255,255,255,0.15)",
                            boxShadow: "0 0 30px rgba(255,255,255,0.05)",
                            transition: "transform 0.3s ease",
                        }}
                    >
                        {/* Best Value Badge */}
                        <div
                            style={{
                                position: "absolute",
                                top: "-12px",
                                right: "24px",
                                background: "linear-gradient(135deg, #ffd700, #f59e0b)",
                                padding: "6px 16px",
                                borderRadius: "9999px",
                                fontSize: "11px",
                                fontWeight: 700,
                                color: "#0a0a0a",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                                boxShadow: "0 4px 12px rgba(255, 215, 0, 0.4)",
                            }}
                        >
                            Best Value
                        </div>

                        <h3 style={{ fontSize: "20px", fontWeight: 600, color: "white", marginBottom: "4px" }}>Max</h3>
                        <p style={{ fontSize: "14px", color: "#888", marginBottom: "24px" }}>For enterprises & agencies</p>

                        <div style={{ marginBottom: "32px" }}>
                            <span style={{ fontSize: "48px", fontWeight: 700, color: "#ffd700" }}>$39</span>
                            <span style={{ fontSize: "18px", color: "#666", marginLeft: "4px" }}>/Month</span>
                        </div>

                        <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: "32px" }}>
                            {[
                                "Everything in Pro, plus:",
                                "🎨 1 custom thumbnail/week by our design team",
                                "📞 Monthly 1-on-1 design review",
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
            <section style={{ paddingBottom: "40px", textAlign: "center" }}>
                <p style={{ color: "#666", fontSize: "14px" }}>
                    Cancel anytime. No questions asked. 14-day money-back guarantee.
                </p>
            </section>

            {/* Custom Services Section */}
            <section id="custom-services" style={{ padding: "80px 0", background: "linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, transparent 100%)" }}>
                <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
                    {/* Section Header */}
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "white", marginBottom: "16px" }}>
                            Need Something <span style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Custom</span>?
                        </h2>
                        <p style={{ color: "#888", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
                            Our design team can take your thumbnails to the next level with professional refinement and custom designs.
                        </p>
                    </div>

                    {/* Service Cards Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
                        {/* AI Refinement Card */}
                        <div
                            style={{
                                background: "#1a1a2e",
                                borderRadius: "16px",
                                padding: "40px",
                                border: "1px solid rgba(139, 92, 246, 0.2)",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                                <div style={{ padding: "10px", borderRadius: "12px", background: "rgba(139, 92, 246, 0.15)" }}>
                                    <Sparkles size={24} style={{ color: "#a78bfa" }} />
                                </div>
                                <h3 style={{ fontSize: "24px", fontWeight: 600, color: "white" }}>AI Refinement</h3>
                            </div>

                            <div style={{ marginBottom: "20px" }}>
                                <span style={{ fontSize: "40px", fontWeight: 700, color: "#a78bfa" }}>$25</span>
                            </div>

                            <p style={{ color: "#a1a1aa", fontSize: "15px", marginBottom: "24px", lineHeight: 1.6 }}>
                                We'll take your AI-generated thumbnail and perfect it in Photoshop
                            </p>

                            <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: "32px" }}>
                                {[
                                    "Minor text adjustments",
                                    "Color correction",
                                    "Polish & finishing touches",
                                    "24-hour turnaround",
                                ].map((feature) => (
                                    <li key={feature} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", fontSize: "14px", color: "#ccc" }}>
                                        <CheckCircle size={16} style={{ color: "#a78bfa" }} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="mailto:thumbnails@thumbjuice.com?subject=ThumbJuice - AI Refinement Request"
                                style={{
                                    display: "block",
                                    width: "100%",
                                    padding: "14px",
                                    borderRadius: "8px",
                                    background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                                    border: "none",
                                    color: "white",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    textAlign: "center",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    boxShadow: "0 4px 20px rgba(139, 92, 246, 0.3)",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                Request Refinement
                            </a>
                        </div>

                        {/* Full Custom Design Card */}
                        <div
                            style={{
                                background: "#1a1a2e",
                                borderRadius: "16px",
                                padding: "40px",
                                border: "1px solid rgba(236, 72, 153, 0.2)",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                                <div style={{ padding: "10px", borderRadius: "12px", background: "rgba(236, 72, 153, 0.15)" }}>
                                    <Palette size={24} style={{ color: "#ec4899" }} />
                                </div>
                                <h3 style={{ fontSize: "24px", fontWeight: 600, color: "white" }}>Full Custom Design</h3>
                            </div>

                            <div style={{ marginBottom: "20px" }}>
                                <span style={{ fontSize: "40px", fontWeight: 700, color: "#ec4899" }}>$50-75</span>
                            </div>

                            <p style={{ color: "#a1a1aa", fontSize: "15px", marginBottom: "24px", lineHeight: 1.6 }}>
                                Professional thumbnail designed from scratch by our team
                            </p>

                            <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: "32px" }}>
                                {[
                                    "Custom design based on your concept",
                                    "Unlimited revisions (within reason)",
                                    "Brand-consistent styling",
                                    "48-hour turnaround",
                                ].map((feature) => (
                                    <li key={feature} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", fontSize: "14px", color: "#ccc" }}>
                                        <CheckCircle size={16} style={{ color: "#ec4899" }} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="mailto:thumbnails@thumbjuice.com?subject=ThumbJuice - Custom Design Request"
                                style={{
                                    display: "block",
                                    width: "100%",
                                    padding: "14px",
                                    borderRadius: "8px",
                                    background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
                                    border: "none",
                                    color: "white",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    textAlign: "center",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    boxShadow: "0 4px 20px rgba(236, 72, 153, 0.3)",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                Request Custom Design
                            </a>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div style={{ textAlign: "center", marginTop: "48px" }}>
                        <p style={{ color: "#888", fontSize: "16px" }}>
                            Have questions? Email us at{" "}
                            <a
                                href="mailto:thumbnails@thumbjuice.com"
                                style={{ color: "#a78bfa", textDecoration: "none", fontWeight: 500 }}
                            >
                                thumbnails@thumbjuice.com
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            {/* Responsive Styles */}
            <style jsx>{`
                @media (max-width: 768px) {
                    section > div[style*="grid-template-columns: repeat(3"] {
                        grid-template-columns: 1fr !important;
                    }
                    section > div[style*="grid-template-columns: repeat(2"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}
