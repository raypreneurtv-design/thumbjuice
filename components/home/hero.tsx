"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Check,
    Play,
    ArrowRight,
    Gamepad2,
    MessageSquare,
    TrendingUp,
    Download,
    RefreshCw,
    AlertCircle,
    Sparkles,
    CheckCircle,
} from "lucide-react";
import { getRemainingUses, hasUsesRemaining, incrementUses, isLastFreeUse } from "@/lib/usageTracking";
import { AuthModal } from "@/components/AuthModal";

type Niche = "gaming" | "commentary" | "finance";
type AspectRatio = "16:9" | "1:1" | "9:16";

export function Hero() {
    const [niche, setNiche] = useState<Niche | null>(null);
    const [prompt, setPrompt] = useState("");
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Usage tracking state
    const [remainingUses, setRemainingUses] = useState(3);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isLimitReached, setIsLimitReached] = useState(false);
    const [showLastUseWarning, setShowLastUseWarning] = useState(false);

    // Tab state for Generate/Pricing
    const [activeTab, setActiveTab] = useState<"generate" | "pricing">("generate");

    // Load remaining uses on mount
    useEffect(() => {
        setRemainingUses(getRemainingUses());
    }, []);

    const niches = [
        { id: "gaming" as Niche, label: "Gaming", icon: Gamepad2, description: "Vibrant, action-packed thumbnails" },
        { id: "commentary" as Niche, label: "Commentary", icon: MessageSquare, description: "Bold text, expressive faces" },
        { id: "finance" as Niche, label: "Finance", icon: TrendingUp, description: "Clean, professional, trust-focused" },
    ];

    const handleGenerate = async () => {
        if (!niche || !prompt) return;

        // Check if user has free uses remaining
        if (!hasUsesRemaining()) {
            setIsLimitReached(true);
            setShowAuthModal(true);
            return;
        }

        // Show last use warning
        if (isLastFreeUse()) {
            setShowLastUseWarning(true);
        }

        setIsGenerating(true);
        setGeneratedImage(null);
        setProgress(0);
        setError(null);

        console.log("[ThumbJuice] Starting generation:", { niche, prompt, aspectRatio });

        // Animate progress (juice filling)
        const progressInterval = setInterval(() => {
            setProgress((prev) => Math.min(prev + Math.random() * 8, 85));
        }, 400);

        try {
            // Call the API endpoint
            const response = await fetch("/api/generate-thumbnail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    niche,
                    description: prompt,
                    aspectRatio,
                }),
            });

            const data = await response.json();

            clearInterval(progressInterval);

            if (data.success && data.imageUrl) {
                setProgress(100);
                setGeneratedImage(data.imageUrl);
                // Increment usage count and update remaining
                incrementUses();
                setRemainingUses(getRemainingUses());
                setShowLastUseWarning(false);
            } else {
                setError(data.error || "Failed to generate thumbnail");
                setProgress(0);
            }
        } catch (err: any) {
            clearInterval(progressInterval);
            setError(err.message || "Network error");
            setProgress(0);
        }

        setTimeout(() => {
            setIsGenerating(false);
        }, 500);
    };

    const handleDownload = () => {
        if (generatedImage) {
            const link = document.createElement("a");
            link.href = generatedImage;
            link.download = "thumbjuice-thumbnail.png";
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // Get preview canvas dimensions based on aspect ratio
    const getPreviewDimensions = () => {
        const maxWidth = 300;
        switch (aspectRatio) {
            case "16:9": return { width: maxWidth, height: maxWidth * (9 / 16) };
            case "1:1": return { width: maxWidth * 0.6, height: maxWidth * 0.6 };
            case "9:16": return { width: maxWidth * 0.4, height: maxWidth * 0.4 * (16 / 9) };
        }
    };

    return (
        <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
            {/* Background Glow - Purple */}
            <div
                style={{
                    position: "absolute",
                    top: "-200px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "900px",
                    height: "500px",
                    background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15), transparent 70%)",
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

            {/* ===== NAVBAR ===== */}
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
                    {/* Logo */}
                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                        <img src="/logo.png" alt="ThumbJuice" style={{ width: "36px", height: "36px" }} />
                        <span style={{ fontWeight: 700, fontSize: "20px", color: "white" }}>
                            Thumb<span style={{ color: "#a78bfa" }}>Juice</span>
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                        {[
                            { label: "Home", href: "/" },
                            { label: "Generate", href: "#generate" },
                            { label: "About", href: "/about" },
                            { label: "Contact", href: "/contact" },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                style={{ fontSize: "14px", color: "#a1a1aa", textDecoration: "none" }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <button
                        style={{
                            height: "36px",
                            padding: "0 20px",
                            borderRadius: "9999px",
                            background: "#8b5cf6",
                            color: "white",
                            fontSize: "14px",
                            fontWeight: 500,
                            border: "none",
                            cursor: "pointer",
                            boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
                        }}
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* ===== HERO SECTION ===== */}
            <section style={{ position: "relative", paddingTop: "140px", paddingBottom: "80px" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
                    {/* NEW Banner */}
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
                        <Link
                            href="#generate"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "10px 20px",
                                borderRadius: "9999px",
                                background: "rgba(139, 92, 246, 0.1)",
                                border: "1px solid rgba(139, 92, 246, 0.3)",
                                textDecoration: "none",
                            }}
                        >
                            <span
                                style={{
                                    padding: "2px 10px",
                                    borderRadius: "9999px",
                                    background: "#8b5cf6",
                                    color: "white",
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                }}
                            >
                                NEW
                            </span>
                            <span style={{ fontSize: "14px", color: "#c4b5fd" }}>
                                Get your first thumbnail free
                            </span>
                            <span style={{ color: "#8b5cf6" }}>→</span>
                        </Link>
                    </div>

                    {/* Headline */}
                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                        <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, lineHeight: 1.1, marginBottom: "24px" }}>
                            <span style={{ background: "linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                AI Thumbnail Generator
                            </span>
                            <br />
                            <span style={{ background: "linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                for your{" "}
                            </span>
                            <span
                                style={{
                                    display: "inline-block",
                                    padding: "4px 16px",
                                    borderRadius: "8px",
                                    background: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
                                    color: "white",
                                    transform: "rotate(-1deg)",
                                    WebkitTextFillColor: "white",
                                }}
                            >
                                Videos.
                            </span>
                        </h1>
                        <p style={{ fontSize: "18px", color: "#71717a", maxWidth: "600px", margin: "0 auto" }}>
                            Stop wasting hours on design. Get high-converting thumbnails in seconds with our advanced AI.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", marginBottom: "48px" }}>
                        <Link href="#generate" style={{ textDecoration: "none" }}>
                            <button
                                style={{
                                    height: "48px",
                                    padding: "0 32px",
                                    borderRadius: "9999px",
                                    background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                                    color: "white",
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    border: "none",
                                    cursor: "pointer",
                                    boxShadow: "0 0 24px rgba(139, 92, 246, 0.5)",
                                }}
                            >
                                Generate now
                            </button>
                        </Link>
                        <button
                            style={{
                                height: "48px",
                                padding: "0 32px",
                                borderRadius: "9999px",
                                background: "transparent",
                                color: "white",
                                fontSize: "16px",
                                fontWeight: 500,
                                border: "1px solid #3f3f46",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <Play style={{ width: "16px", height: "16px" }} />
                            See how it works
                        </button>
                    </div>

                    {/* Feature Checkmarks */}
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "32px", fontSize: "14px", color: "#71717a" }}>
                        {["No design skills needed", "Fast generation", "High CTR templates"].map((f) => (
                            <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <Check style={{ width: "16px", height: "16px", color: "#8b5cf6" }} />
                                <span>{f}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== GENERATOR/PRICING SECTION ===== */}
            <section id="generate" style={{ padding: "80px 0", position: "relative" }}>
                <div style={{ maxWidth: activeTab === "pricing" ? "1100px" : "900px", margin: "0 auto", padding: "0 24px", transition: "max-width 0.3s ease" }}>

                    {/* Tab Navigation */}
                    <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "48px" }}>
                        <button
                            onClick={() => setActiveTab("generate")}
                            style={{
                                padding: "12px 32px",
                                borderRadius: "9999px",
                                background: activeTab === "generate" ? "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)" : "rgba(255,255,255,0.05)",
                                border: activeTab === "generate" ? "none" : "1px solid rgba(255,255,255,0.1)",
                                color: "white",
                                fontSize: "14px",
                                fontWeight: 500,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                        >
                            ✨ Generate
                        </button>
                        <button
                            onClick={() => setActiveTab("pricing")}
                            style={{
                                padding: "12px 32px",
                                borderRadius: "9999px",
                                background: activeTab === "pricing" ? "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)" : "rgba(255,255,255,0.05)",
                                border: activeTab === "pricing" ? "none" : "1px solid rgba(255,255,255,0.1)",
                                color: "white",
                                fontSize: "14px",
                                fontWeight: 500,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                        >
                            💎 Pricing
                        </button>
                    </div>

                    {/* === GENERATE TAB === */}
                    {activeTab === "generate" && (
                        <>
                            <div style={{ textAlign: "center", marginBottom: "48px" }}>
                                <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, marginBottom: "16px" }}>
                                    Create Your <span style={{ color: "#a78bfa" }}>Thumbnail</span>
                                </h2>
                                <p style={{ color: "#71717a" }}>Select your niche, describe your video, and let AI do the magic.</p>
                            </div>

                            {/* Generator Card */}
                            <div
                                style={{
                                    background: "rgba(24, 24, 27, 0.8)",
                                    border: "1px solid rgba(139, 92, 246, 0.2)",
                                    borderRadius: "16px",
                                    padding: "40px",
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                {/* Step 1 */}
                                <div style={{ marginBottom: "40px" }}>
                                    <h3 style={{ fontSize: "11px", fontWeight: 600, color: "#a78bfa", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>
                                        Step 1 — Select Niche
                                    </h3>
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                                        {niches.map((n) => (
                                            <div
                                                key={n.id}
                                                onClick={() => setNiche(n.id)}
                                                style={{
                                                    padding: "20px",
                                                    borderRadius: "12px",
                                                    background: niche === n.id ? "rgba(139, 92, 246, 0.15)" : "rgba(255,255,255,0.03)",
                                                    border: niche === n.id ? "1px solid #8b5cf6" : "1px solid rgba(255,255,255,0.1)",
                                                    cursor: "pointer",
                                                    transition: "all 0.2s ease",
                                                }}
                                            >
                                                <n.icon style={{ width: "24px", height: "24px", marginBottom: "12px", color: niche === n.id ? "#a78bfa" : "#71717a" }} />
                                                <div style={{ fontWeight: 500, color: "white" }}>{n.label}</div>
                                                <div style={{ fontSize: "12px", color: "#52525b", marginTop: "4px" }}>{n.description}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div style={{ marginBottom: "40px", opacity: niche ? 1 : 0.4, pointerEvents: niche ? "auto" : "none", transition: "opacity 0.3s ease" }}>
                                    <h3 style={{ fontSize: "11px", fontWeight: 600, color: "#a78bfa", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>
                                        Step 2 — Describe Your Video
                                    </h3>
                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="e.g., Minecraft survival gameplay, epic castle build, night time, shaders..."
                                        style={{
                                            width: "100%",
                                            height: "100px",
                                            padding: "16px",
                                            borderRadius: "12px",
                                            background: "rgba(0,0,0,0.5)",
                                            border: "1px solid rgba(139, 92, 246, 0.2)",
                                            color: "white",
                                            fontSize: "14px",
                                            resize: "none",
                                            outline: "none",
                                        }}
                                    />

                                    {/* Aspect Ratio with Preview Canvas */}
                                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", marginTop: "24px", gap: "24px" }}>
                                        <div>
                                            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#71717a", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
                                                Aspect Ratio
                                            </label>
                                            <div style={{ display: "flex", gap: "4px", padding: "4px", background: "rgba(0,0,0,0.4)", borderRadius: "8px", border: "1px solid rgba(139, 92, 246, 0.2)" }}>
                                                {(["16:9", "1:1", "9:16"] as AspectRatio[]).map((ratio) => (
                                                    <button
                                                        key={ratio}
                                                        onClick={() => setAspectRatio(ratio)}
                                                        style={{
                                                            padding: "8px 16px",
                                                            borderRadius: "6px",
                                                            fontSize: "14px",
                                                            fontWeight: 500,
                                                            background: aspectRatio === ratio ? "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)" : "transparent",
                                                            color: aspectRatio === ratio ? "white" : "#71717a",
                                                            border: "none",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        {ratio}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Preview Canvas */}
                                            <div style={{ marginTop: "16px" }}>
                                                <div
                                                    style={{
                                                        width: getPreviewDimensions().width,
                                                        height: getPreviewDimensions().height,
                                                        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
                                                        border: "2px dashed rgba(139, 92, 246, 0.4)",
                                                        borderRadius: "8px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        transition: "all 0.3s ease",
                                                    }}
                                                >
                                                    <span style={{ fontSize: "12px", color: "#8b5cf6" }}>{aspectRatio} Preview</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Generate Button */}
                                        <button
                                            onClick={handleGenerate}
                                            disabled={!prompt || isGenerating}
                                            style={{
                                                height: "48px",
                                                padding: "0 32px",
                                                borderRadius: "9999px",
                                                background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                                                color: "white",
                                                fontSize: "16px",
                                                fontWeight: 500,
                                                border: "none",
                                                cursor: prompt && !isGenerating ? "pointer" : "not-allowed",
                                                opacity: prompt && !isGenerating ? 1 : 0.5,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                                boxShadow: "0 0 24px rgba(139, 92, 246, 0.4)",
                                                alignSelf: "flex-end",
                                            }}
                                        >
                                            Generate Thumbnail <ArrowRight style={{ width: "16px", height: "16px" }} />
                                        </button>
                                    </div>
                                </div>

                                {/* Step 3: Preview with Juice Progress */}
                                {(isGenerating || generatedImage || error) && (
                                    <div>
                                        <h3 style={{ fontSize: "11px", fontWeight: 600, color: "#a78bfa", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>
                                            Step 3 — Your Thumbnail
                                        </h3>

                                        {isGenerating ? (
                                            <div
                                                style={{
                                                    padding: "48px",
                                                    borderRadius: "12px",
                                                    background: "rgba(139, 92, 246, 0.05)",
                                                    border: "1px solid rgba(139, 92, 246, 0.2)",
                                                    textAlign: "center",
                                                }}
                                            >
                                                {/* Juice Glass Progress */}
                                                <div
                                                    style={{
                                                        width: "80px",
                                                        height: "120px",
                                                        margin: "0 auto 24px",
                                                        background: "rgba(139, 92, 246, 0.1)",
                                                        borderRadius: "8px 8px 16px 16px",
                                                        border: "3px solid #8b5cf6",
                                                        position: "relative",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    {/* Juice fill */}
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            bottom: 0,
                                                            left: 0,
                                                            right: 0,
                                                            height: `${progress}%`,
                                                            background: "linear-gradient(180deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%)",
                                                            transition: "height 0.3s ease",
                                                            borderRadius: "0 0 12px 12px",
                                                        }}
                                                    >
                                                        {/* Wave effect */}
                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                top: "-8px",
                                                                left: "-10%",
                                                                width: "120%",
                                                                height: "16px",
                                                                background: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 10'%3E%3Cpath fill='%23c4b5fd' d='M0 5 Q25 0 50 5 T100 5 V10 H0 Z'/%3E%3C/svg%3E\")",
                                                                backgroundSize: "50px 16px",
                                                                animation: "wave 1s linear infinite",
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <p style={{ color: "#a78bfa", fontSize: "16px", fontWeight: 500, marginBottom: "8px" }}>
                                                    🧃 Mixing the Juice in Photoshop...
                                                </p>
                                                <p style={{ color: "#71717a", fontSize: "14px" }}>
                                                    {Math.round(progress)}% complete
                                                </p>
                                            </div>
                                        ) : error ? (
                                            <div
                                                style={{
                                                    padding: "32px",
                                                    borderRadius: "12px",
                                                    background: "rgba(239, 68, 68, 0.1)",
                                                    border: "1px solid rgba(239, 68, 68, 0.3)",
                                                    textAlign: "center",
                                                }}
                                            >
                                                <AlertCircle style={{ width: "40px", height: "40px", color: "#ef4444", marginBottom: "16px" }} />
                                                <p style={{ color: "#ef4444", fontSize: "16px", fontWeight: 500, marginBottom: "8px" }}>
                                                    Generation Failed
                                                </p>
                                                <p style={{ color: "#71717a", fontSize: "14px", marginBottom: "16px" }}>
                                                    {error}
                                                </p>
                                                <button
                                                    onClick={() => { setError(null); handleGenerate(); }}
                                                    style={{
                                                        height: "40px",
                                                        padding: "0 24px",
                                                        borderRadius: "9999px",
                                                        background: "#8b5cf6",
                                                        color: "white",
                                                        fontSize: "14px",
                                                        fontWeight: 500,
                                                        border: "none",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    Try Again
                                                </button>
                                            </div>
                                        ) : (
                                            generatedImage && (
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        width: "100%",
                                                        borderRadius: "12px",
                                                        overflow: "hidden",
                                                        border: "1px solid rgba(139, 92, 246, 0.3)",
                                                        background: "#18181b",
                                                        aspectRatio: aspectRatio === "16:9" ? "16/9" : aspectRatio === "1:1" ? "1/1" : "9/16",
                                                        maxWidth: aspectRatio === "9:16" ? "300px" : "100%",
                                                        margin: aspectRatio === "9:16" ? "0 auto" : undefined,
                                                    }}
                                                >
                                                    <img src={generatedImage} alt="Generated Thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            inset: 0,
                                                            background: "rgba(0,0,0,0.7)",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            gap: "16px",
                                                            opacity: 0,
                                                            transition: "opacity 0.2s ease",
                                                        }}
                                                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                                                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0"; }}
                                                    >
                                                        <button onClick={handleGenerate} style={{ height: "40px", padding: "0 20px", borderRadius: "9999px", background: "transparent", color: "white", fontSize: "14px", fontWeight: 500, border: "1px solid #52525b", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                                                            <RefreshCw style={{ width: "16px", height: "16px" }} /> Regenerate
                                                        </button>
                                                        <button onClick={handleDownload} style={{ height: "40px", padding: "0 20px", borderRadius: "9999px", background: "#22c55e", color: "white", fontSize: "14px", fontWeight: 500, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                                                            <Download style={{ width: "16px", height: "16px" }} /> Download
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* === PRICING TAB === */}
                    {activeTab === "pricing" && (
                        <>
                            <div style={{ textAlign: "center", marginBottom: "48px" }}>
                                <p style={{ color: "#888", fontSize: "14px", letterSpacing: "1px", marginBottom: "16px" }}>
                                    Unlock Your Creative Power
                                </p>
                                <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "white", letterSpacing: "-1px" }}>
                                    Choose the right plan for you
                                </h2>
                            </div>

                            {/* Pricing Cards */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", alignItems: "center" }}>

                                {/* BASIC CARD */}
                                <div style={{ background: "#1a1a2e", borderRadius: "16px", padding: "40px", border: "1px solid rgba(255,255,255,0.1)" }}>
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
                                    <button style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "white", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>
                                        Subscribe
                                    </button>
                                </div>

                                {/* PRO CARD */}
                                <div style={{ position: "relative", background: "#1a1a2e", borderRadius: "16px", padding: "48px 40px", border: "1px solid rgba(168, 85, 247, 0.3)", transform: "scale(1.05)", boxShadow: "0 0 60px rgba(168, 85, 247, 0.3), 0 0 100px rgba(236, 72, 153, 0.15)" }}>
                                    <div style={{ position: "absolute", top: "-12px", right: "24px", background: "linear-gradient(135deg, #a855f7, #ec4899)", padding: "6px 16px", borderRadius: "9999px", fontSize: "11px", fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.5px", boxShadow: "0 4px 12px rgba(168, 85, 247, 0.4)" }}>
                                        Best Offer
                                    </div>
                                    <h3 style={{ fontSize: "20px", fontWeight: 600, color: "white", marginBottom: "4px" }}>Pro</h3>
                                    <p style={{ fontSize: "14px", color: "#888", marginBottom: "24px" }}>For professionals & teams</p>
                                    <div style={{ marginBottom: "32px" }}>
                                        <span style={{ fontSize: "56px", fontWeight: 700, background: "linear-gradient(135deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>$19</span>
                                        <span style={{ fontSize: "18px", color: "#666", marginLeft: "4px" }}>/Month</span>
                                    </div>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: "32px" }}>
                                        {["Everything in Basic, plus:", "FLUX Pro (premium quality)", "Multiple aspect ratios", "Unlimited history", "Style customization", "Trend-based templates", "Batch generation (10x)", "Priority support"].map((feature, i) => (
                                            <li key={feature} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", fontSize: "14px", color: i === 0 ? "#a855f7" : "#ccc" }}>
                                                <CheckCircle size={18} style={{ color: "#a855f7" }} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button style={{ width: "100%", padding: "14px", borderRadius: "8px", background: "linear-gradient(135deg, #a855f7, #ec4899)", border: "none", color: "white", fontSize: "14px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 20px rgba(168, 85, 247, 0.4)" }}>
                                        Subscribe
                                    </button>
                                </div>

                                {/* MAX CARD */}
                                <div style={{ background: "#1a1a2e", borderRadius: "16px", padding: "40px", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 0 30px rgba(255,255,255,0.05)" }}>
                                    <h3 style={{ fontSize: "20px", fontWeight: 600, color: "white", marginBottom: "4px" }}>Max</h3>
                                    <p style={{ fontSize: "14px", color: "#888", marginBottom: "24px" }}>For enterprises & agencies</p>
                                    <div style={{ marginBottom: "32px" }}>
                                        <span style={{ fontSize: "48px", fontWeight: 700, color: "#ffd700" }}>$39</span>
                                        <span style={{ fontSize: "18px", color: "#666", marginLeft: "4px" }}>/Month</span>
                                    </div>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: "32px" }}>
                                        {["Everything in Pro, plus:", "Custom designs by real designers", "1 custom thumbnail/week", "Personal style training", "API access (500 req/mo)", "Bulk generation (50x)", "A/B testing & analytics", "White-label option", "24/7 priority support"].map((feature, i) => (
                                            <li key={feature} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", fontSize: "14px", color: i === 0 ? "#ffd700" : "#ccc" }}>
                                                <CheckCircle size={18} style={{ color: "#ffd700" }} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "white", border: "none", color: "#0a0a0a", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
                                        Subscribe
                                    </button>
                                </div>
                            </div>

                            {/* Footer Text */}
                            <p style={{ textAlign: "center", color: "#666", fontSize: "14px", marginTop: "48px" }}>
                                Cancel anytime. No questions asked. 14-day money-back guarantee.
                            </p>
                        </>
                    )}
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "#0a0a0a", padding: "64px 0" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px" }}>
                    <div>
                        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", textDecoration: "none" }}>
                            <img src="/logo.png" alt="ThumbJuice" style={{ width: "32px", height: "32px" }} />
                            <span style={{ fontWeight: 700, fontSize: "18px", color: "white" }}>Thumb<span style={{ color: "#a78bfa" }}>Juice</span></span>
                        </Link>
                        <p style={{ fontSize: "14px", color: "#52525b", lineHeight: 1.6 }}>Generate high-CTR thumbnails for YouTube, X, and Instagram in seconds.</p>
                    </div>
                    {[
                        { title: "Product", links: ["Features", "Pricing", "Showcase"] },
                        { title: "Resources", links: ["Blog", "Community", "Help Center"] },
                        { title: "Legal", links: ["Privacy Policy", "Terms of Service"] },
                    ].map((section) => (
                        <div key={section.title}>
                            <h4 style={{ fontWeight: 500, color: "white", marginBottom: "16px" }}>{section.title}</h4>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                {section.links.map((link) => (
                                    <li key={link} style={{ marginBottom: "12px" }}>
                                        <a href="#" style={{ fontSize: "14px", color: "#52525b", textDecoration: "none" }}>{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "48px", paddingTop: "32px", textAlign: "center", fontSize: "14px", color: "#3f3f46", maxWidth: "1200px", margin: "48px auto 0", padding: "32px 24px 0" }}>
                    © 2026 ThumbJuice. All rights reserved.
                </div>
            </footer>

            {/* Keyframes */}
            <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes wave { 0% { transform: translateX(0); } 100% { transform: translateX(-50px); } }
      `}</style>

            {/* Remaining Uses Badge */}
            <div
                style={{
                    position: "fixed",
                    top: "80px",
                    right: "24px",
                    padding: "8px 16px",
                    borderRadius: "9999px",
                    background: remainingUses > 0 ? "rgba(139, 92, 246, 0.2)" : "rgba(239, 68, 68, 0.2)",
                    border: remainingUses > 0 ? "1px solid rgba(139, 92, 246, 0.4)" : "1px solid rgba(239, 68, 68, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    zIndex: 40,
                }}
            >
                <Sparkles size={14} style={{ color: remainingUses > 0 ? "#a78bfa" : "#ef4444" }} />
                <span style={{ fontSize: "13px", fontWeight: 500, color: remainingUses > 0 ? "#c4b5fd" : "#fca5a5" }}>
                    {remainingUses > 0 ? `${remainingUses} free generation${remainingUses === 1 ? "" : "s"} left` : "Free tier exhausted"}
                </span>
            </div>

            {/* Last Use Warning */}
            {showLastUseWarning && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "24px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        padding: "12px 24px",
                        borderRadius: "12px",
                        background: "rgba(234, 179, 8, 0.15)",
                        border: "1px solid rgba(234, 179, 8, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        zIndex: 40,
                    }}
                >
                    <span style={{ fontSize: "14px", color: "#fcd34d" }}>
                        ⚡ Last free thumbnail! <button onClick={() => setShowAuthModal(true)} style={{ background: "transparent", border: "none", color: "#fcd34d", textDecoration: "underline", cursor: "pointer", fontWeight: 600 }}>Sign up for unlimited.</button>
                    </span>
                </div>
            )}

            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => { setShowAuthModal(false); setIsLimitReached(false); }}
                isLimitReached={isLimitReached}
            />
        </div>
    );
}
