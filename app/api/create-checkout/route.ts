import { NextRequest, NextResponse } from 'next/server';
import { stripe, PRICE_IDS, PriceTier } from '@/lib/stripe';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { priceId, tier } = body as { priceId?: string; tier?: PriceTier };

        // Use either the provided priceId or look up from tier
        const finalPriceId = priceId || (tier ? PRICE_IDS[tier] : null);

        if (!finalPriceId) {
            return NextResponse.json(
                { error: 'Price ID or tier is required' },
                { status: 400 }
            );
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: finalPriceId,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/cancel`,
            // Allow promotion codes for discounts
            allow_promotion_codes: true,
        });

        return NextResponse.json({
            url: session.url,
            sessionId: session.id
        });

    } catch (error) {
        console.error('Error creating checkout session:', error);

        // Handle Stripe-specific errors
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
