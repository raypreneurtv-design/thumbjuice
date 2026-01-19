"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    X,
    Download,
    RefreshCw,
    Sparkles,
    Trophy,
    Heart,
    Zap,
    MessageSquare,
    Users,
    TrendingUp,
    Loader2,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { getRemainingUses, hasUsesRemaining, incrementUses } from "@/lib/usageTracking";

// Template category type
type Category = "all" | "milestones" | "support" | "symbols" | "custom";

// Template input field types
interface InputField {
    name: string;
    label: string;
    type: "text" | "number" | "select" | "color";
    placeholder?: string;
    defaultValue: string | number;
    options?: { value: string; label: string }[];
}

// Template definition
interface Template {
    id: string;
    name: string;
    description: string;
    category: Category;
    icon: React.ReactNode;
    inputs: InputField[];
    buildPrompt: (values: Record<string, string | number>) => string;
    previewGradient: string;
}

// X Templates Data
const templates: Template[] = [
    {
        id: "follower-milestone",
        name: "Follower Milestone",
        description: "Celebrate hitting follower goals",
        category: "milestones",
        icon: <Trophy style={{ width: 20, height: 20 }} />,
        inputs: [
            {
                name: "number",
                label: "Follower Count",
                type: "number",
                placeholder: "500",
                defaultValue: 500,
            },
        ],
        buildPrompt: (values) =>
            `X/Twitter verified badge design, large white number '${values.number}' and text 'followers' on solid black background, centered composition, bold sans-serif typography, clean and minimal, professional social media graphic, high contrast`,
        previewGradient: "linear-gradient(135deg, #1a1a1a 0%, #000 100%)",
    },
    {
        id: "stats-showcase",
        name: "Stats Showcase",
        description: "Show off your X stats",
        category: "milestones",
        icon: <TrendingUp style={{ width: 20, height: 20 }} />,
        inputs: [
            {
                name: "number",
                label: "Number",
                type: "text",
                placeholder: "10K",
                defaultValue: "10K",
            },
            {
                name: "metric",
                label: "Metric Type",
                type: "select",
                defaultValue: "Impressions",
                options: [
                    { value: "Impressions", label: "Impressions" },
                    { value: "Followers", label: "Followers" },
                    { value: "Engagement", label: "Engagement" },
                    { value: "Views", label: "Views" },
                ],
            },
        ],
        buildPrompt: (values) =>
            `Bold white text 'X ${values.number} ${values.metric}' on solid black background, X logo watermark, modern sans-serif font, centered, clean and professional, high contrast, social media achievement graphic, minimalist design`,
        previewGradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
    },
    {
        id: "community-support",
        name: "Community Support",
        description: "Wholesome follow-for-follow energy",
        category: "support",
        icon: <Users style={{ width: 20, height: 20 }} />,
        inputs: [
            {
                name: "colorScheme",
                label: "Color Scheme",
                type: "select",
                defaultValue: "blue-yellow",
                options: [
                    { value: "blue-yellow", label: "Blue & Yellow" },
                    { value: "purple-green", label: "Purple & Green" },
                    { value: "red-orange", label: "Red & Orange" },
                    { value: "pink-cyan", label: "Pink & Cyan" },
                ],
            },
        ],
        buildPrompt: (values) => {
            const colors: Record<string, [string, string]> = {
                "blue-yellow": ["blue", "yellow"],
                "purple-green": ["purple", "green"],
                "red-orange": ["red", "orange"],
                "pink-cyan": ["pink", "cyan"],
            };
            const [c1, c2] = colors[values.colorScheme as string] || ["blue", "yellow"];
            return `3D rendered characters, ${c1} character helping ${c2} character climb up rocky mountain cliff, wholesome and supportive scene, bright blue sky with fluffy white clouds background, Pixar style, cinematic lighting, vibrant colors, wide angle, heartwarming`;
        },
        previewGradient: "linear-gradient(135deg, #3b82f6 0%, #fbbf24 100%)",
    },
    {
        id: "neon-symbol",
        name: "Neon Handshake",
        description: "Partnership and collaboration",
        category: "symbols",
        icon: <Zap style={{ width: 20, height: 20 }} />,
        inputs: [
            {
                name: "symbol",
                label: "Symbol Type",
                type: "select",
                defaultValue: "handshake",
                options: [
                    { value: "handshake", label: "Handshake" },
                    { value: "heart", label: "Heart" },
                    { value: "arrows pointing up", label: "Arrows" },
                    { value: "lightning bolt", label: "Lightning" },
                    { value: "infinity symbol", label: "Infinity" },
                ],
            },
            {
                name: "color",
                label: "Neon Color",
                type: "select",
                defaultValue: "cyan",
                options: [
                    { value: "cyan", label: "Cyan" },
                    { value: "pink", label: "Pink" },
                    { value: "purple", label: "Purple" },
                    { value: "green", label: "Green" },
                    { value: "gold", label: "Gold" },
                ],
            },
        ],
        buildPrompt: (values) =>
            `Glowing neon ${values.symbol} icon in bright ${values.color} light, dark teal gradient background, modern minimalist design, clean lines, professional symbol, centered composition, subtle glow effect, cyberpunk aesthetic`,
        previewGradient: "linear-gradient(135deg, #0d9488 0%, #06b6d4 100%)",
    },
    {
        id: "custom-message",
        name: "Custom Message Sign",
        description: "Character holding your message",
        category: "custom",
        icon: <MessageSquare style={{ width: 20, height: 20 }} />,
        inputs: [
            {
                name: "text",
                label: "Your Message",
                type: "text",
                placeholder: "Follow for more!",
                defaultValue: "Follow for more!",
            },
            {
                name: "style",
                label: "Character Style",
                type: "select",
                defaultValue: "cartoon",
                options: [
                    { value: "anime", label: "Anime" },
                    { value: "cartoon", label: "Cartoon" },
                    { value: "3D render", label: "3D Render" },
                    { value: "minimalist vector", label: "Minimalist" },
                ],
            },
        ],
        buildPrompt: (values) =>
            `${values.style} illustration of friendly person holding white sign that says '${values.text}', determined expression, simple gradient background, clean art style, digital illustration, social media graphic`,
        previewGradient: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
    },
];

// Category tabs
const categories: { id: Category; label: string; icon: React.ReactNode }[] = [
    { id: "all", label: "All", icon: <Sparkles style={{ width: 16, height: 16 }} /> },
    { id: "milestones", label: "Milestones", icon: <Trophy style={{ width: 16, height: 16 }} /> },
    { id: "support", label: "Support", icon: <Heart style={{ width: 16, height: 16 }} /> },
    { id: "symbols", label: "Symbols", icon: <Zap style={{ width: 16, height: 16 }} /> },
    { id: "custom", label: "Custom", icon: <MessageSquare style={{ width: 16, height: 16 }} /> },
];

export default function XTemplatesPage() {
    const { isSignedIn } = useUser();
    const [activeCategory, setActiveCategory] = useState<Category>("all");
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [inputValues, setInputValues] = useState<Record<string, string | number>>({});
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [remainingUses, setRemainingUses] = useState(3);

    // Load remaining uses on mount
    useEffect(() => {
        setRemainingUses(getRemainingUses());
    }, []);

    // Filter templates by category
    const filteredTemplates =
        activeCategory === "all"
            ? templates
            : templates.filter((t) => t.category === activeCategory);

    // Open template customization
    const openTemplate = (template: Template) => {
        setSelectedTemplate(template);
        setGeneratedImage(null);
        setError(null);
        // Set default values
        const defaults: Record<string, string | number> = {};
        template.inputs.forEach((input) => {
            defaults[input.name] = input.defaultValue;
        });
        setInputValues(defaults);
    };

    // Close modal
    const closeModal = () => {
        setSelectedTemplate(null);
        setGeneratedImage(null);
        setError(null);
        setInputValues({});
    };

    // Handle input change
    const handleInputChange = (name: string, value: string | number) => {
        setInputValues((prev) => ({ ...prev, [name]: value }));
    };

    // Generate graphic
    const handleGenerate = async () => {
        if (!selectedTemplate) return;

        // Check usage limits for non-signed-in users
        if (!isSignedIn && !hasUsesRemaining()) {
            setError("You've used all 3 free generations. Sign in for more!");
            return;
        }

        setIsGenerating(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const prompt = selectedTemplate.buildPrompt(inputValues);
            console.log("[X Templates] Generating with prompt:", prompt);

            const response = await fetch("/api/generate-thumbnail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    niche: "x-template",
                    description: prompt,
                    aspectRatio: "16:9",
                }),
            });

            const data = await response.json();

            if (data.success && data.imageUrl) {
                setGeneratedImage(data.imageUrl);
                // Increment usage for non-signed-in users
                if (!isSignedIn) {
                    incrementUses();
                    setRemainingUses(getRemainingUses());
                }
            } else {
                setError(data.error || "Failed to generate graphic");
            }
        } catch (err: any) {
            setError(err.message || "Network error");
        } finally {
            setIsGenerating(false);
        }
    };

    // Download image
    const handleDownload = () => {
        if (generatedImage) {
            const timestamp = Date.now();
            const filename = `thumbjuice-x-${selectedTemplate?.id || "graphic"}-${timestamp}.png`;
            const link = document.createElement("a");
            link.href = generatedImage;
            link.download = filename;
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
            {/* Background Glow */}
            <div
                style={{
                    position: "fixed",
                    top: "-200px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "900px",
                    height: "500px",
                    background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.05), transparent 70%)",
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

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
                        }}
                    >
                        <ArrowLeft style={{ width: "16px", height: "16px" }} />
                        Back to Home
                    </Link>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <span style={{ fontWeight: 700, fontSize: "18px" }}>Templates</span>
                    </div>

                    <div style={{ width: "100px" }} />
                </div>
            </header>

            {/* Main Content */}
            <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px", position: "relative", zIndex: 1 }}>
                {/* Hero Section */}
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
                            X / Twitter Graphics
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
                        Graphics That Make X Creators Go Viral
                    </h1>
                    <p style={{ color: "#a1a1aa", fontSize: "18px", marginBottom: "8px" }}>
                        From 100 followers to 10K. One graphic at a time.
                    </p>
                    <p style={{ color: "#71717a", fontSize: "14px", maxWidth: "500px", margin: "0 auto" }}>
                        Clean, impactful visuals designed for the X feed. No design skills needed.
                    </p>

                    {/* Free uses badge */}
                    {!isSignedIn && (
                        <div
                            style={{
                                marginTop: "24px",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                background: remainingUses > 0 ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
                                border: `1px solid ${remainingUses > 0 ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                            }}
                        >
                            <Sparkles style={{ width: 14, height: 14, color: remainingUses > 0 ? "#22c55e" : "#ef4444" }} />
                            <span style={{ fontSize: "13px", color: remainingUses > 0 ? "#22c55e" : "#ef4444" }}>
                                {remainingUses} free generation{remainingUses !== 1 ? "s" : ""} remaining
                            </span>
                        </div>
                    )}
                </div>

                {/* Category Tabs */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "8px",
                        marginBottom: "40px",
                        flexWrap: "wrap",
                    }}
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "10px 20px",
                                borderRadius: "9999px",
                                background: activeCategory === cat.id ? "white" : "rgba(255,255,255,0.05)",
                                border: activeCategory === cat.id ? "none" : "1px solid rgba(255,255,255,0.1)",
                                color: activeCategory === cat.id ? "#0a0a0a" : "#a1a1aa",
                                fontSize: "14px",
                                fontWeight: 500,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                        >
                            {cat.icon}
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Templates Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "24px",
                    }}
                >
                    {filteredTemplates.map((template) => (
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
                            onClick={() => openTemplate(template)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            {/* Template Preview */}
                            <div
                                style={{
                                    aspectRatio: "16/9",
                                    background: template.previewGradient,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                                    position: "relative",
                                }}
                            >
                                <div
                                    style={{
                                        padding: "16px 24px",
                                        background: "rgba(0,0,0,0.4)",
                                        borderRadius: "12px",
                                        backdropFilter: "blur(8px)",
                                    }}
                                >
                                    {template.icon}
                                </div>

                                {/* Category Badge */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "12px",
                                        right: "12px",
                                        background: "rgba(0,0,0,0.7)",
                                        padding: "4px 10px",
                                        borderRadius: "6px",
                                        fontSize: "11px",
                                        color: "#a1a1aa",
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {template.category}
                                </div>
                            </div>

                            {/* Template Info */}
                            <div style={{ padding: "20px" }}>
                                <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px", color: "white" }}>
                                    {template.name}
                                </h3>
                                <p style={{ fontSize: "14px", color: "#71717a", marginBottom: "16px" }}>
                                    {template.description}
                                </p>

                                <button
                                    style={{
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

                {/* Coming Soon */}
                <div
                    style={{
                        marginTop: "64px",
                        textAlign: "center",
                        padding: "32px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        borderRadius: "16px",
                    }}
                >
                    <p style={{ color: "#a1a1aa", fontSize: "14px" }}>
                        🚀 More templates added weekly based on what's trending on X
                    </p>
                </div>
            </main>

            {/* ===== CUSTOMIZATION MODAL ===== */}
            {selectedTemplate && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.8)",
                        backdropFilter: "blur(8px)",
                        zIndex: 100,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "24px",
                    }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeModal();
                    }}
                >
                    <div
                        style={{
                            background: "#18181b",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "20px",
                            width: "100%",
                            maxWidth: "600px",
                            maxHeight: "90vh",
                            overflow: "auto",
                        }}
                    >
                        {/* Modal Header */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "20px 24px",
                                borderBottom: "1px solid rgba(255,255,255,0.05)",
                            }}
                        >
                            <div>
                                <h2 style={{ fontSize: "18px", fontWeight: 600, color: "white", marginBottom: "4px" }}>
                                    {selectedTemplate.name}
                                </h2>
                                <p style={{ fontSize: "13px", color: "#71717a" }}>{selectedTemplate.description}</p>
                            </div>
                            <button
                                onClick={closeModal}
                                style={{
                                    background: "rgba(255,255,255,0.05)",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "8px",
                                    cursor: "pointer",
                                    color: "#a1a1aa",
                                }}
                            >
                                <X style={{ width: 20, height: 20 }} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div style={{ padding: "24px" }}>
                            {/* Input Fields */}
                            <div style={{ marginBottom: "24px" }}>
                                <h3
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: 600,
                                        color: "#71717a",
                                        textTransform: "uppercase",
                                        letterSpacing: "1px",
                                        marginBottom: "16px",
                                    }}
                                >
                                    Customize
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                    {selectedTemplate.inputs.map((input) => (
                                        <div key={input.name}>
                                            <label
                                                style={{
                                                    display: "block",
                                                    fontSize: "13px",
                                                    fontWeight: 500,
                                                    color: "#a1a1aa",
                                                    marginBottom: "8px",
                                                }}
                                            >
                                                {input.label}
                                            </label>
                                            {input.type === "select" ? (
                                                <select
                                                    value={inputValues[input.name] as string}
                                                    onChange={(e) => handleInputChange(input.name, e.target.value)}
                                                    style={{
                                                        width: "100%",
                                                        height: "44px",
                                                        padding: "0 16px",
                                                        borderRadius: "10px",
                                                        background: "rgba(0,0,0,0.5)",
                                                        border: "1px solid rgba(255,255,255,0.1)",
                                                        color: "white",
                                                        fontSize: "14px",
                                                        outline: "none",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    {input.options?.map((opt) => (
                                                        <option key={opt.value} value={opt.value} style={{ background: "#18181b" }}>
                                                            {opt.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={input.type}
                                                    value={inputValues[input.name]}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            input.name,
                                                            input.type === "number" ? Number(e.target.value) : e.target.value
                                                        )
                                                    }
                                                    placeholder={input.placeholder}
                                                    style={{
                                                        width: "100%",
                                                        height: "44px",
                                                        padding: "0 16px",
                                                        borderRadius: "10px",
                                                        background: "rgba(0,0,0,0.5)",
                                                        border: "1px solid rgba(255,255,255,0.1)",
                                                        color: "white",
                                                        fontSize: "14px",
                                                        outline: "none",
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Preview / Result Area */}
                            <div
                                style={{
                                    aspectRatio: "16/9",
                                    background: generatedImage
                                        ? `url(${generatedImage}) center/cover no-repeat`
                                        : selectedTemplate.previewGradient,
                                    borderRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "24px",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                {isGenerating && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background: "rgba(0,0,0,0.7)",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "12px",
                                        }}
                                    >
                                        <Loader2
                                            style={{
                                                width: 32,
                                                height: 32,
                                                color: "#a78bfa",
                                                animation: "spin 1s linear infinite",
                                            }}
                                        />
                                        <span style={{ fontSize: "14px", color: "#a1a1aa" }}>Generating your graphic...</span>
                                    </div>
                                )}
                                {!generatedImage && !isGenerating && (
                                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>
                                        Preview will appear here
                                    </span>
                                )}
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div
                                    style={{
                                        padding: "12px 16px",
                                        background: "rgba(239, 68, 68, 0.1)",
                                        border: "1px solid rgba(239, 68, 68, 0.3)",
                                        borderRadius: "10px",
                                        marginBottom: "16px",
                                    }}
                                >
                                    <p style={{ fontSize: "14px", color: "#ef4444" }}>{error}</p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div style={{ display: "flex", gap: "12px" }}>
                                {generatedImage ? (
                                    <>
                                        <button
                                            onClick={handleDownload}
                                            style={{
                                                flex: 1,
                                                height: "48px",
                                                borderRadius: "10px",
                                                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                                border: "none",
                                                color: "white",
                                                fontSize: "15px",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "8px",
                                            }}
                                        >
                                            <Download style={{ width: 18, height: 18 }} />
                                            Download
                                        </button>
                                        <button
                                            onClick={() => {
                                                setGeneratedImage(null);
                                                handleGenerate();
                                            }}
                                            style={{
                                                height: "48px",
                                                padding: "0 20px",
                                                borderRadius: "10px",
                                                background: "rgba(255,255,255,0.05)",
                                                border: "1px solid rgba(255,255,255,0.1)",
                                                color: "white",
                                                fontSize: "15px",
                                                fontWeight: 500,
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "8px",
                                            }}
                                        >
                                            <RefreshCw style={{ width: 16, height: 16 }} />
                                            Regenerate
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleGenerate}
                                        disabled={isGenerating}
                                        style={{
                                            flex: 1,
                                            height: "48px",
                                            borderRadius: "10px",
                                            background: isGenerating
                                                ? "rgba(139, 92, 246, 0.3)"
                                                : "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                                            border: "none",
                                            color: "white",
                                            fontSize: "15px",
                                            fontWeight: 600,
                                            cursor: isGenerating ? "not-allowed" : "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "8px",
                                            boxShadow: isGenerating ? "none" : "0 0 24px rgba(139, 92, 246, 0.4)",
                                        }}
                                    >
                                        <Sparkles style={{ width: 18, height: 18 }} />
                                        {isGenerating ? "Generating..." : "Generate Graphic"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* CSS for spinner animation */}
            <style jsx global>{`
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
}
