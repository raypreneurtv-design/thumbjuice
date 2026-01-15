import Link from 'next/link';
import { Metadata } from 'next';
import { CheckCircle, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Payment Successful | ThumbJuice',
    description: 'Your subscription to ThumbJuice has been activated.',
};

export default function PaymentSuccessPage() {
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
                {/* Success Icon */}
                <div
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)',
                    }}
                >
                    <CheckCircle size={40} style={{ color: 'white' }} />
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
                    Payment Successful! ✅
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
                    You now have <span style={{ color: '#a78bfa', fontWeight: 600 }}>unlimited access</span> to ThumbJuice.
                    Start creating stunning thumbnails today!
                </p>

                {/* CTA Button */}
                <Link
                    href="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
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
                    <Sparkles size={20} />
                    Start Creating
                </Link>

                {/* Secondary Link */}
                <p style={{ marginTop: '24px' }}>
                    <Link
                        href="/pricing"
                        style={{
                            color: '#71717a',
                            fontSize: '14px',
                            textDecoration: 'none',
                        }}
                    >
                        View your subscription →
                    </Link>
                </p>
            </div>
        </div>
    );
}
