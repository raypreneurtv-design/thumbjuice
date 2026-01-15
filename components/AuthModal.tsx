"use client";

import { useState } from "react";
import { X, Mail, Lock, Github } from "lucide-react";

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
                            background: "#ffffff",
                            border: "1px solid #dadce0",
                            color: "#3c4043",
                            fontSize: "14px",
                            fontWeight: 500,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                            fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                            transition: "background 0.2s ease, box-shadow 0.2s ease",
                        }}
                    >
                        {/* Google "G" Logo SVG */}
                        <svg width="18" height="18" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        </svg>
                        Sign in with Google
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
