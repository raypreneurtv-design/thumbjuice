"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Sparkles, Palette, Loader2 } from "lucide-react";

// Real Stripe Price IDs for subscription tiers
const PRICE_IDS = {
    basic: "price_1SpyE7KcA8gbK5THC4tU78pj",
    pro: "price_1SpyTSKcA8gbK5THW6zEogPI",
    max: "price_1SpyU1KcA8gbK5THtOnMDJcc",
};

type Tier = keyof typeof PRICE_IDS;

export default function PricingPage() {
    const [loadingTier, setLoadingTier] = useState<Tier | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubscribe = async (tier: Tier) => {
        setLoadingTier(tier);
        setError(null);

        try {
            const response = await fetch("/api/create-checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ priceId: PRICE_IDS[tier] }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create checkout session");
            }

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (err) {
            console.error("Checkout error:", err);
            setError(err instanceof Error ? err.message : "Something went wrong");
            setLoadingTier(null);
        }
    };

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
                        marginBottom: "24px",
                    }}
                >
                    Choose the right plan for you
                </h1>

                {/* Error Message */}
                {error && (
                    <div
                        style={{
                            maxWidth: "500px",
                            margin: "0 auto 24px",
                            padding: "12px 16px",
                            borderRadius: "8px",
                            background: "rgba(239, 68, 68, 0.15)",
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            color: "#fca5a5",
                            fontSize: "14px",
                        }}
                    >
                        {error}
                    </div>
                )}
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
                            onClick={() => handleSubscribe("basic")}
                            disabled={loadingTier !== null}
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                background: "transparent",
                                border: "1px solid rgba(255,255,255,0.3)",
                                color: "white",
                                fontSize: "14px",
                                fontWeight: 500,
                                cursor: loadingTier !== null ? "not-allowed" : "pointer",
                                transition: "background 0.2s ease",
                                opacity: loadingTier !== null && loadingTier !== "basic" ? 0.5 : 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                            }}
                        >
                            {loadingTier === "basic" ? (
                                <>
                                    <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                                    Processing...
                                </>
                            ) : (
                                "Subscribe"
                            )}
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
                            onClick={() => handleSubscribe("pro")}
                            disabled={loadingTier !== null}
                            style={{
                                width: "100%",
                                padding: "14px",
                                borderRadius: "8px",
                                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                                border: "none",
                                color: "white",
                                fontSize: "14px",
                                fontWeight: 600,
                                cursor: loadingTier !== null ? "not-allowed" : "pointer",
                                boxShadow: "0 4px 20px rgba(168, 85, 247, 0.4)",
                                transition: "filter 0.2s ease",
                                opacity: loadingTier !== null && loadingTier !== "pro" ? 0.5 : 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                            }}
                        >
                            {loadingTier === "pro" ? (
                                <>
                                    <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                                    Processing...
                                </>
                            ) : (
                                "Subscribe"
                            )}
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
                            onClick={() => handleSubscribe("max")}
                            disabled={loadingTier !== null}
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                background: "white",
                                border: "none",
                                color: "#0a0a0a",
                                fontSize: "14px",
                                fontWeight: 600,
                                cursor: loadingTier !== null ? "not-allowed" : "pointer",
                                transition: "background 0.2s ease",
                                opacity: loadingTier !== null && loadingTier !== "max" ? 0.5 : 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                            }}
                        >
                            {loadingTier === "max" ? (
                                <>
                                    <Loader2 size={16} style={{ animation: "spin 1s linear infinite", color: "#0a0a0a" }} />
                                    Processing...
                                </>
                            ) : (
                                "Subscribe"
                            )}
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer Text */}
            <section style={{ paddingBottom: "40px", textAlign: "center" }}>
                <p style={{ color: "#666", fontSize: "14px" }}>
                    All plans include a 7-day money-back guarantee. Cancel anytime.
                </p>
            </section>

            {/* Custom Services Section */}
            <section id="custom-services" style={{ padding: "80px 0", background: "linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, transparent 100%)" }}>
                <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
                    {/* Section Header */}
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "9999px", background: "rgba(139, 92, 246, 0.15)", marginBottom: "16px" }}>
                            <Sparkles size={16} style={{ color: "#a78bfa" }} />
                            <span style={{ fontSize: "12px", fontWeight: 600, color: "#a78bfa", textTransform: "uppercase", letterSpacing: "1px" }}>Hybrid Model</span>
                        </div>
                        <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: "white", marginBottom: "12px" }}>
                            Need Something <span style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Custom</span>?
                        </h2>
                        <p style={{ fontSize: "16px", color: "#888", maxWidth: "600px", margin: "0 auto" }}>
                            Our design team can refine AI outputs or create fully custom thumbnails for your brand.
                        </p>
                    </div>

                    {/* Service Cards */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px", maxWidth: "800px", margin: "0 auto" }}>
                        {/* AI Refinement */}
                        <div
                            style={{
                                background: "#1a1a2e",
                                borderRadius: "16px",
                                padding: "32px",
                                border: "1px solid rgba(139, 92, 246, 0.2)",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(139, 92, 246, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                                <Sparkles size={24} style={{ color: "#a78bfa" }} />
                            </div>
                            <h3 style={{ fontSize: "20px", fontWeight: 600, color: "white", marginBottom: "8px" }}>AI Refinement</h3>
                            <p style={{ fontSize: "28px", fontWeight: 700, color: "#a78bfa", marginBottom: "16px" }}>$25<span style={{ fontSize: "14px", fontWeight: 400, color: "#666" }}>/thumbnail</span></p>
                            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0" }}>
                                {["Take any AI-generated thumbnail", "Professional touch-ups", "Color correction & enhancement", "Text refinement", "24-hour turnaround"].map((item) => (
                                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", fontSize: "14px", color: "#a1a1aa" }}>
                                        <CheckCircle size={16} style={{ color: "#a78bfa" }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="mailto:services@thumbjuice.com?subject=ThumbJuice%20-%20AI%20Refinement%20Request"
                                style={{
                                    display: "block",
                                    width: "100%",
                                    padding: "12px",
                                    borderRadius: "8px",
                                    background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)",
                                    border: "1px solid rgba(139, 92, 246, 0.3)",
                                    color: "#a78bfa",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    textAlign: "center",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                Request Refinement
                            </a>
                        </div>

                        {/* Full Custom Design */}
                        <div
                            style={{
                                background: "#1a1a2e",
                                borderRadius: "16px",
                                padding: "32px",
                                border: "1px solid rgba(236, 72, 153, 0.2)",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(236, 72, 153, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                                <Palette size={24} style={{ color: "#f472b6" }} />
                            </div>
                            <h3 style={{ fontSize: "20px", fontWeight: 600, color: "white", marginBottom: "8px" }}>Full Custom Design</h3>
                            <p style={{ fontSize: "28px", fontWeight: 700, color: "#f472b6", marginBottom: "16px" }}>$50-75<span style={{ fontSize: "14px", fontWeight: 400, color: "#666" }}>/thumbnail</span></p>
                            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0" }}>
                                {["100% custom design from scratch", "Unlimited revisions", "Multiple concept options", "Source files included", "48-hour turnaround"].map((item) => (
                                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", fontSize: "14px", color: "#a1a1aa" }}>
                                        <CheckCircle size={16} style={{ color: "#f472b6" }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="mailto:services@thumbjuice.com?subject=ThumbJuice%20-%20Custom%20Design%20Request"
                                style={{
                                    display: "block",
                                    width: "100%",
                                    padding: "12px",
                                    borderRadius: "8px",
                                    background: "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)",
                                    border: "1px solid rgba(236, 72, 153, 0.3)",
                                    color: "#f472b6",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    textAlign: "center",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                Request Custom Design
                            </a>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div style={{ textAlign: "center", marginTop: "48px" }}>
                        <p style={{ fontSize: "14px", color: "#666" }}>
                            Questions? Email us at{" "}
                            <a href="mailto:services@thumbjuice.com" style={{ color: "#a78bfa", textDecoration: "none" }}>
                                services@thumbjuice.com
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            {/* Responsive Styles */}
            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
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
