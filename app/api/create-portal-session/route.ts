import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe';
import { getStripeCustomerId } from '@/lib/supabase-helpers';

export async function POST() {
    try {
        // Get the current user from Clerk
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'You must be logged in' },
                { status: 401 }
            );
        }

        // Get the user's Stripe customer ID from Supabase
        const stripeCustomerId = await getStripeCustomerId(userId);

        if (!stripeCustomerId) {
            return NextResponse.json(
                { error: 'No subscription found. Please subscribe first.' },
                { status: 400 }
            );
        }

        // Create a Stripe billing portal session
        const session = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/account`,
        });

        return NextResponse.json({
            url: session.url,
        });

    } catch (error) {
        console.error('Error creating portal session:', error);

        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create billing portal session' },
            { status: 500 }
        );
    }
}
