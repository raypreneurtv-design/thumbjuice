"use client";

import { X } from "lucide-react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: "login" | "signup";
    isLimitReached?: boolean;
}

export function AuthModal({ isOpen, onClose, initialTab = "signup", isLimitReached = false }: AuthModalProps) {
    if (!isOpen) return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.8)",
                backdropFilter: "blur(8px)",
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: "#18181b",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "16px",
                    padding: "32px",
                    width: "100%",
                    maxWidth: "420px",
                    position: "relative",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        background: "transparent",
                        border: "none",
                        color: "#71717a",
                        cursor: "pointer",
                        padding: "4px",
                    }}
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                    <div style={{ fontSize: "40px", marginBottom: "12px" }}>
                        {isLimitReached ? "🔥" : "✨"}
                    </div>
                    <h2 style={{ fontSize: "24px", fontWeight: 700, color: "white", marginBottom: "8px" }}>
                        {isLimitReached ? "You're hooked!" : "Create Your Account"}
                    </h2>
                    <p style={{ color: "#71717a", fontSize: "14px" }}>
                        {isLimitReached
                            ? "You've used your 3 free thumbnails. Sign in to keep creating!"
                            : "Sign in to save your work and unlock more features."}
                    </p>
                </div>

                {/* Auth Buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <SignInButton mode="redirect">
                        <button
                            style={{
                                width: "100%",
                                height: "48px",
                                borderRadius: "8px",
                                background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                                color: "white",
                                fontSize: "16px",
                                fontWeight: 600,
                                border: "none",
                                cursor: "pointer",
                                boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
                            }}
                        >
                            Sign In
                        </button>
                    </SignInButton>

                    <SignUpButton mode="redirect">
                        <button
                            style={{
                                width: "100%",
                                height: "48px",
                                borderRadius: "8px",
                                background: "transparent",
                                color: "white",
                                fontSize: "16px",
                                fontWeight: 500,
                                border: "1px solid rgba(139, 92, 246, 0.4)",
                                cursor: "pointer",
                            }}
                        >
                            Create Account
                        </button>
                    </SignUpButton>
                </div>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
                    <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
                    <span style={{ color: "#52525b", fontSize: "12px" }}>Includes Google OAuth</span>
                    <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
                </div>

                {/* View Pricing */}
                <div style={{ textAlign: "center" }}>
                    <a
                        href="/pricing"
                        style={{
                            display: "inline-block",
                            padding: "12px 24px",
                            borderRadius: "8px",
                            background: "transparent",
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "white",
                            fontSize: "14px",
                            fontWeight: 500,
                            textDecoration: "none",
                        }}
                    >
                        View Pricing →
                    </a>
                    <br />
                    <button
                        onClick={onClose}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "#52525b",
                            fontSize: "12px",
                            cursor: "pointer",
                            marginTop: "12px",
                        }}
                    >
                        Maybe later
                    </button>
                </div>
            </div>
        </div>
    );
}

