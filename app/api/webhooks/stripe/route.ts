import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { updateUserSubscription, updateSubscriptionByStripeCustomerId } from '@/lib/supabase-helpers';
import { PRICE_IDS } from '@/lib/stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-12-15.clover',
});

// Map Stripe price IDs to subscription tiers
const PRICE_TO_TIER: Record<string, 'basic' | 'pro' | 'max'> = {
    [PRICE_IDS.basic]: 'basic',
    [PRICE_IDS.pro]: 'pro',
    [PRICE_IDS.max]: 'max',
};

export async function POST(req: Request) {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature');

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.error('[Stripe Webhook] Missing STRIPE_WEBHOOK_SECRET');
        return NextResponse.json(
            { error: 'Webhook secret not configured' },
            { status: 500 }
        );
    }

    if (!sig) {
        console.error('[Stripe Webhook] Missing stripe-signature header');
        return NextResponse.json(
            { error: 'Missing signature' },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
        console.error('[Stripe Webhook] Verification failed:', err.message);
        return NextResponse.json(
            { error: `Webhook Error: ${err.message}` },
            { status: 400 }
        );
    }

    console.log(`[Stripe Webhook] Received event: ${event.type}`);

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;

                // Get clerk_user_id from metadata
                const clerkUserId = session.metadata?.clerk_user_id;
                if (!clerkUserId) {
                    console.error('[Stripe Webhook] Missing clerk_user_id in session metadata');
                    return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
                }

                // Get subscription and determine tier
                const subscriptionId = session.subscription as string;
                const subscription = await stripe.subscriptions.retrieve(subscriptionId);
                const priceId = subscription.items.data[0]?.price.id;

                const tier = PRICE_TO_TIER[priceId] || 'basic';

                console.log(`[Stripe Webhook] Checkout completed for user: ${clerkUserId}, tier: ${tier}`);

                await updateUserSubscription(clerkUserId, {
                    subscription_tier: tier,
                    subscription_status: 'active',
                    stripe_customer_id: session.customer as string,
                    stripe_subscription_id: subscriptionId,
                });

                console.log(`[Stripe Webhook] Subscription activated for user: ${clerkUserId}`);
                break;
            }

            case 'customer.subscription.created':
            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;

                const priceId = subscription.items.data[0]?.price.id;
                const tier = PRICE_TO_TIER[priceId] || 'basic';

                // Map Stripe status to our status
                let status: 'active' | 'inactive' | 'cancelled' | 'past_due' = 'inactive';
                if (subscription.status === 'active' || subscription.status === 'trialing') {
                    status = 'active';
                } else if (subscription.status === 'past_due') {
                    status = 'past_due';
                } else if (subscription.status === 'canceled') {
                    status = 'cancelled';
                }

                console.log(`[Stripe Webhook] Subscription ${event.type}: customer ${customerId}, status: ${status}, tier: ${tier}`);

                // Update user by their Stripe customer ID
                await updateSubscriptionByStripeCustomerId(customerId, {
                    subscription_tier: tier,
                    subscription_status: status,
                });
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;

                console.log(`[Stripe Webhook] Subscription cancelled for customer: ${customerId}`);

                // Mark subscription as cancelled
                await updateSubscriptionByStripeCustomerId(customerId, {
                    subscription_tier: 'free',
                    subscription_status: 'cancelled',
                });
                break;
            }

            default:
                console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error) {
        console.error('[Stripe Webhook] Error processing event:', error);
        return NextResponse.json(
            { error: 'Error processing webhook' },
            { status: 500 }
        );
    }
}
