import Stripe from 'stripe';

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-12-15.clover',
    typescript: true,
});

// Real Stripe Price IDs for subscription tiers
export const PRICE_IDS = {
    basic: 'price_1SpyE7KcA8gbK5THC4tU78pj',
    pro: 'price_1SpyTSKcA8gbK5THW6zEogPI',
    max: 'price_1SpyU1KcA8gbK5THtOnMDJcc',
} as const;

export type PriceTier = keyof typeof PRICE_IDS;
