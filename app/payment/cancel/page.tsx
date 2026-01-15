import Link from 'next/link';
import { Metadata } from 'next';
import { XCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Payment Cancelled | ThumbJuice',
    description: 'Your payment was cancelled. You can try again anytime.',
};

export default function PaymentCancelPage() {
    return (
        <div
            style={{
                background: '#0a0a0a',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Inter, system-ui, sans-serif',
                padding: '24px',
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    maxWidth: '480px',
                }}
            >
                {/* Cancel Icon */}
                <div
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'rgba(113, 113, 122, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        border: '1px solid rgba(113, 113, 122, 0.3)',
                    }}
                >
                    <XCircle size={40} style={{ color: '#71717a' }} />
                </div>

                {/* Title */}
                <h1
                    style={{
                        fontSize: '32px',
                        fontWeight: 700,
                        color: 'white',
                        marginBottom: '12px',
                    }}
                >
                    Payment Cancelled
                </h1>

                {/* Description */}
                <p
                    style={{
                        fontSize: '18px',
                        color: '#a1a1aa',
                        marginBottom: '32px',
                        lineHeight: 1.6,
                    }}
                >
                    No worries! You can try again anytime.
                    <br />
                    Your free thumbnails are still available.
                </p>

                {/* CTA Button */}
                <Link
                    href="/pricing"
                    style={{
                        display: 'inline-block',
                        padding: '16px 32px',
                        borderRadius: '9999px',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: 600,
                        textDecoration: 'none',
                        boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)',
                        transition: 'all 0.2s ease',
                    }}
                >
                    View Plans
                </Link>

                {/* Secondary Link */}
                <p style={{ marginTop: '24px' }}>
                    <Link
                        href="/"
                        style={{
                            color: '#71717a',
                            fontSize: '14px',
                            textDecoration: 'none',
                        }}
                    >
                        ← Back to Home
                    </Link>
                </p>
            </div>
        </div>
    );
}
