"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
        if (!formData.message.trim()) newErrors.message = "Message is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

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
                        <Link href="/about" style={{ fontSize: "14px", color: "#a1a1aa", textDecoration: "none" }}>About</Link>
                        <Link href="/contact" style={{ fontSize: "14px", color: "#a78bfa", textDecoration: "none" }}>Contact</Link>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main style={{ paddingTop: "140px", paddingBottom: "80px", maxWidth: "600px", margin: "0 auto", padding: "140px 24px 80px" }}>
                <h1
                    style={{
                        fontSize: "48px",
                        fontWeight: 700,
                        marginBottom: "16px",
                        background: "linear-gradient(180deg, #a78bfa 0%, #8b5cf6 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Contact Us
                </h1>
                <p style={{ color: "#71717a", marginBottom: "48px" }}>
                    Have a question or feedback? We'd love to hear from you.
                </p>

                {isSubmitted ? (
                    <div
                        style={{
                            background: "rgba(34, 197, 94, 0.1)",
                            border: "1px solid rgba(34, 197, 94, 0.3)",
                            borderRadius: "16px",
                            padding: "48px",
                            textAlign: "center",
                        }}
                    >
                        <CheckCircle style={{ width: "48px", height: "48px", color: "#22c55e", marginBottom: "16px" }} />
                        <h2 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>Message Sent!</h2>
                        <p style={{ color: "#71717a" }}>We'll get back to you as soon as possible.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: "24px" }}>
                            <label style={{ display: "block", fontSize: "14px", fontWeight: 500, marginBottom: "8px", color: "#d4d4d8" }}>
                                Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{
                                    width: "100%",
                                    height: "48px",
                                    padding: "0 16px",
                                    borderRadius: "12px",
                                    background: "rgba(0,0,0,0.5)",
                                    border: errors.name ? "1px solid #ef4444" : "1px solid rgba(255,255,255,0.1)",
                                    color: "white",
                                    fontSize: "16px",
                                    outline: "none",
                                }}
                                placeholder="Your name"
                            />
                            {errors.name && <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.name}</p>}
                        </div>

                        <div style={{ marginBottom: "24px" }}>
                            <label style={{ display: "block", fontSize: "14px", fontWeight: 500, marginBottom: "8px", color: "#d4d4d8" }}>
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={{
                                    width: "100%",
                                    height: "48px",
                                    padding: "0 16px",
                                    borderRadius: "12px",
                                    background: "rgba(0,0,0,0.5)",
                                    border: errors.email ? "1px solid #ef4444" : "1px solid rgba(255,255,255,0.1)",
                                    color: "white",
                                    fontSize: "16px",
                                    outline: "none",
                                }}
                                placeholder="you@example.com"
                            />
                            {errors.email && <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.email}</p>}
                        </div>

                        <div style={{ marginBottom: "32px" }}>
                            <label style={{ display: "block", fontSize: "14px", fontWeight: 500, marginBottom: "8px", color: "#d4d4d8" }}>
                                Message
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                style={{
                                    width: "100%",
                                    height: "150px",
                                    padding: "16px",
                                    borderRadius: "12px",
                                    background: "rgba(0,0,0,0.5)",
                                    border: errors.message ? "1px solid #ef4444" : "1px solid rgba(255,255,255,0.1)",
                                    color: "white",
                                    fontSize: "16px",
                                    outline: "none",
                                    resize: "none",
                                }}
                                placeholder="Tell us what's on your mind..."
                            />
                            {errors.message && <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                width: "100%",
                                height: "52px",
                                borderRadius: "12px",
                                background: "#8b5cf6",
                                color: "white",
                                fontSize: "16px",
                                fontWeight: 600,
                                border: "none",
                                cursor: isSubmitting ? "not-allowed" : "pointer",
                                opacity: isSubmitting ? 0.7 : 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                boxShadow: "0 0 24px rgba(139, 92, 246, 0.4)",
                            }}
                        >
                            {isSubmitting ? (
                                "Sending..."
                            ) : (
                                <>
                                    <Send style={{ width: "18px", height: "18px" }} />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                )}
            </main>
        </div>
    );
}
