"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Crown, Zap, CheckCircle, XCircle, Clock, AlertTriangle, Loader2 } from "lucide-react";

interface SubscriptionData {
    isLoggedIn: boolean;
    isSubscribed: boolean;
    tier: "free" | "basic" | "pro" | "max";
    status: "active" | "inactive" | "cancelled" | "past_due";
    thumbnailCount: number;
    canGenerate: boolean;
    remainingFree: number;
    email?: string;
    stripeCustomerId?: string;
}

const TIER_INFO = {
    free: { name: "Free", color: "#71717a", icon: Zap },
    basic: { name: "Basic", color: "#60a5fa", icon: Zap },
    pro: { name: "Pro", color: "#a78bfa", icon: Crown },
    max: { name: "Max", color: "#fbbf24", icon: Crown },
};

const STATUS_INFO = {
    active: { name: "Active", color: "#22c55e", icon: CheckCircle },
    inactive: { name: "Inactive", color: "#71717a", icon: XCircle },
    cancelled: { name: "Cancelled", color: "#ef4444", icon: XCircle },
    past_due: { name: "Past Due", color: "#f59e0b", icon: AlertTriangle },
};

export default function AccountPage() {
    const { isSignedIn, user, isLoaded } = useUser();
    const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [portalLoading, setPortalLoading] = useState(false);

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            fetchSubscriptionStatus();
        } else if (isLoaded) {
            setLoading(false);
        }
    }, [isLoaded, isSignedIn]);

    const fetchSubscriptionStatus = async () => {
        try {
            const response = await fetch("/api/subscription-status");
            const data = await response.json();
            setSubscriptionData(data);
        } catch (error) {
            console.error("Error fetching subscription status:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleManageSubscription = async () => {
        setPortalLoading(true);
        try {
            const response = await fetch("/api/create-portal-session", {
                method: "POST",
            });
            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(data.error || "Failed to open billing portal");
            }
        } catch (error) {
            console.error("Error opening billing portal:", error);
            alert("Failed to open billing portal");
        } finally {
            setPortalLoading(false);
        }
    };

    if (!isLoaded || loading) {
        return (
            <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Loader2 className="animate-spin" style={{ width: "48px", height: "48px", color: "#8b5cf6" }} />
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
                <div style={{ maxWidth: "600px", margin: "0 auto", padding: "120px 24px", textAlign: "center" }}>
                    <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px" }}>Account</h1>
                    <p style={{ color: "#71717a", marginBottom: "32px" }}>
                        Please sign in to view your account details.
                    </p>
                    <SignInButton mode="modal">
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
                                boxShadow: "0 0 24px rgba(139, 92, 246, 0.4)",
                            }}
                        >
                            Sign In
                        </button>
                    </SignInButton>
                </div>
            </div>
        );
    }

    const tierInfo = TIER_INFO[subscriptionData?.tier || "free"];
    const statusInfo = STATUS_INFO[subscriptionData?.status || "inactive"];
    const TierIcon = tierInfo.icon;
    const StatusIcon = statusInfo.icon;

    return (
        <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
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
                    <h1 style={{ fontSize: "18px", fontWeight: 600 }}>My Account</h1>
                    <div style={{ width: "100px" }} />
                </div>
            </header>

            {/* Main Content */}
            <main style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 24px" }}>
                {/* Profile Section */}
                <div
                    style={{
                        background: "rgba(24, 24, 27, 0.8)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "16px",
                        padding: "32px",
                        marginBottom: "24px",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                        {user?.imageUrl && (
                            <img
                                src={user.imageUrl}
                                alt="Profile"
                                style={{ width: "64px", height: "64px", borderRadius: "50%" }}
                            />
                        )}
                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: 600 }}>
                                {user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0]}
                            </h2>
                            <p style={{ color: "#71717a" }}>
                                {user?.emailAddresses?.[0]?.emailAddress}
                            </p>
                        </div>
                    </div>

                    {/* Subscription Info */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                        {/* Tier */}
                        <div
                            style={{
                                background: "rgba(0,0,0,0.3)",
                                border: `1px solid ${tierInfo.color}33`,
                                borderRadius: "12px",
                                padding: "20px",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                                <TierIcon style={{ width: "20px", height: "20px", color: tierInfo.color }} />
                                <span style={{ fontSize: "12px", color: "#71717a", textTransform: "uppercase" }}>Plan</span>
                            </div>
                            <div style={{ fontSize: "24px", fontWeight: 700, color: tierInfo.color }}>
                                {tierInfo.name}
                            </div>
                        </div>

                        {/* Status */}
                        <div
                            style={{
                                background: "rgba(0,0,0,0.3)",
                                border: `1px solid ${statusInfo.color}33`,
                                borderRadius: "12px",
                                padding: "20px",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                                <StatusIcon style={{ width: "20px", height: "20px", color: statusInfo.color }} />
                                <span style={{ fontSize: "12px", color: "#71717a", textTransform: "uppercase" }}>Status</span>
                            </div>
                            <div style={{ fontSize: "24px", fontWeight: 700, color: statusInfo.color }}>
                                {statusInfo.name}
                            </div>
                        </div>

                        {/* Thumbnails Generated */}
                        <div
                            style={{
                                background: "rgba(0,0,0,0.3)",
                                border: "1px solid rgba(139, 92, 246, 0.2)",
                                borderRadius: "12px",
                                padding: "20px",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                                <Zap style={{ width: "20px", height: "20px", color: "#a78bfa" }} />
                                <span style={{ fontSize: "12px", color: "#71717a", textTransform: "uppercase" }}>Generated</span>
                            </div>
                            <div style={{ fontSize: "24px", fontWeight: 700, color: "#a78bfa" }}>
                                {subscriptionData?.thumbnailCount || 0}
                                {subscriptionData?.tier === "free" && (
                                    <span style={{ fontSize: "14px", color: "#71717a", fontWeight: 400 }}> / 3</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div
                    style={{
                        background: "rgba(24, 24, 27, 0.8)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "16px",
                        padding: "32px",
                    }}
                >
                    {subscriptionData?.isSubscribed ? (
                        <>
                            <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>Manage Subscription</h3>
                            <p style={{ color: "#71717a", marginBottom: "24px" }}>
                                Update your payment method, view invoices, or cancel your subscription.
                            </p>
                            <button
                                onClick={handleManageSubscription}
                                disabled={portalLoading}
                                style={{
                                    height: "48px",
                                    padding: "0 32px",
                                    borderRadius: "9999px",
                                    background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                                    color: "white",
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    border: "none",
                                    cursor: portalLoading ? "wait" : "pointer",
                                    opacity: portalLoading ? 0.7 : 1,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                }}
                            >
                                {portalLoading && <Loader2 className="animate-spin" style={{ width: "18px", height: "18px" }} />}
                                Manage Subscription
                            </button>
                        </>
                    ) : (
                        <>
                            <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>Upgrade Your Plan</h3>
                            <p style={{ color: "#71717a", marginBottom: "24px" }}>
                                {subscriptionData?.tier === "free"
                                    ? `You've used ${subscriptionData?.thumbnailCount || 0} of 3 free generations. Upgrade for unlimited thumbnails!`
                                    : "Get unlimited thumbnail generations with a paid plan."}
                            </p>
                            <Link href="/pricing" style={{ textDecoration: "none" }}>
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
                                        boxShadow: "0 0 24px rgba(139, 92, 246, 0.4)",
                                    }}
                                >
                                    View Plans
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
