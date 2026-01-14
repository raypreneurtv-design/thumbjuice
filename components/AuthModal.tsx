"use client";

import { useState } from "react";
import { X, Mail, Lock, Github, Chrome } from "lucide-react";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: "login" | "signup";
    isLimitReached?: boolean;
}

export function AuthModal({ isOpen, onClose, initialTab = "signup", isLimitReached = false }: AuthModalProps) {
    const [activeTab, setActiveTab] = useState<"login" | "signup">(initialTab);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        if (activeTab === "signup" && password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        setIsLoading(true);
        // TODO: Implement actual auth
        await new Promise((r) => setTimeout(r, 1000));
        setIsLoading(false);
        alert(`${activeTab === "signup" ? "Sign up" : "Login"} functionality coming soon!`);
    };

    const handleSocialLogin = (provider: string) => {
        alert(`${provider} login coming soon!`);
    };

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

                {/* Limit Reached Header */}
                {isLimitReached ? (
                    <div style={{ textAlign: "center", marginBottom: "24px" }}>
                        <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔥</div>
                        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "white", marginBottom: "8px" }}>
                            You're hooked!
                        </h2>
                        <p style={{ color: "#71717a", fontSize: "14px" }}>
                            You've used your 3 free thumbnails. Create an account to keep creating!
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Tabs */}
                        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
                            <button
                                onClick={() => setActiveTab("signup")}
                                style={{
                                    flex: 1,
                                    padding: "12px",
                                    borderRadius: "8px",
                                    background: activeTab === "signup" ? "rgba(139, 92, 246, 0.2)" : "transparent",
                                    border: activeTab === "signup" ? "1px solid #8b5cf6" : "1px solid transparent",
                                    color: activeTab === "signup" ? "#a78bfa" : "#71717a",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                }}
                            >
                                Sign Up
                            </button>
                            <button
                                onClick={() => setActiveTab("login")}
                                style={{
                                    flex: 1,
                                    padding: "12px",
                                    borderRadius: "8px",
                                    background: activeTab === "login" ? "rgba(139, 92, 246, 0.2)" : "transparent",
                                    border: activeTab === "login" ? "1px solid #8b5cf6" : "1px solid transparent",
                                    color: activeTab === "login" ? "#a78bfa" : "#71717a",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                }}
                            >
                                Log In
                            </button>
                        </div>
                    </>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#d4d4d8", marginBottom: "8px" }}>
                            Email
                        </label>
                        <div style={{ position: "relative" }}>
                            <Mail size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#52525b" }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                style={{
                                    width: "100%",
                                    height: "48px",
                                    paddingLeft: "40px",
                                    paddingRight: "16px",
                                    borderRadius: "8px",
                                    background: "rgba(0,0,0,0.5)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "white",
                                    fontSize: "14px",
                                    outline: "none",
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                            <label style={{ fontSize: "14px", fontWeight: 500, color: "#d4d4d8" }}>Password</label>
                            {activeTab === "login" && (
                                <a href="#" style={{ fontSize: "12px", color: "#8b5cf6", textDecoration: "none" }}>
                                    Forgot Password?
                                </a>
                            )}
                        </div>
                        <div style={{ position: "relative" }}>
                            <Lock size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#52525b" }} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={activeTab === "signup" ? "Min 8 characters" : "Enter password"}
                                style={{
                                    width: "100%",
                                    height: "48px",
                                    paddingLeft: "40px",
                                    paddingRight: "16px",
                                    borderRadius: "8px",
                                    background: "rgba(0,0,0,0.5)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "white",
                                    fontSize: "14px",
                                    outline: "none",
                                }}
                            />
                        </div>
                    </div>

                    {error && (
                        <p style={{ color: "#ef4444", fontSize: "14px", marginBottom: "16px" }}>{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: "100%",
                            height: "48px",
                            borderRadius: "8px",
                            background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: 600,
                            border: "none",
                            cursor: isLoading ? "not-allowed" : "pointer",
                            opacity: isLoading ? 0.7 : 1,
                            boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
                        }}
                    >
                        {isLoading ? "Loading..." : isLimitReached ? "Create Free Account" : activeTab === "signup" ? "Create Account" : "Log In"}
                    </button>
                </form>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
                    <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
                    <span style={{ color: "#52525b", fontSize: "12px" }}>or continue with</span>
                    <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
                </div>

                {/* Social Buttons */}
                <div style={{ display: "flex", gap: "12px" }}>
                    <button
                        onClick={() => handleSocialLogin("Google")}
                        style={{
                            flex: 1,
                            height: "48px",
                            borderRadius: "8px",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "white",
                            fontSize: "14px",
                            fontWeight: 500,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                        }}
                    >
                        <Chrome size={18} />
                        Google
                    </button>
                    <button
                        onClick={() => handleSocialLogin("GitHub")}
                        style={{
                            flex: 1,
                            height: "48px",
                            borderRadius: "8px",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "white",
                            fontSize: "14px",
                            fontWeight: 500,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                        }}
                    >
                        <Github size={18} />
                        GitHub
                    </button>
                </div>

                {/* View Pricing (only for limit reached) */}
                {isLimitReached && (
                    <div style={{ marginTop: "24px", textAlign: "center" }}>
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
                                marginBottom: "12px",
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
                                marginTop: "8px",
                            }}
                        >
                            Maybe later
                        </button>
                    </div>
                )}

                {/* Switch Tab Link */}
                {!isLimitReached && (
                    <p style={{ textAlign: "center", marginTop: "20px", color: "#71717a", fontSize: "14px" }}>
                        {activeTab === "signup" ? "Already have an account? " : "Don't have an account? "}
                        <button
                            onClick={() => setActiveTab(activeTab === "signup" ? "login" : "signup")}
                            style={{ background: "transparent", border: "none", color: "#8b5cf6", cursor: "pointer", fontWeight: 500 }}
                        >
                            {activeTab === "signup" ? "Log in" : "Sign up"}
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
}
