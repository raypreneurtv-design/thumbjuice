import { supabaseAdmin, User } from './supabase';

/**
 * Get a user from the database by their Clerk user ID
 */
export async function getUserByClerkId(clerkUserId: string): Promise<User | null> {
    const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('clerk_user_id', clerkUserId)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            // No rows returned - user doesn't exist
            return null;
        }
        console.error('[Supabase] Error fetching user:', error);
        throw error;
    }

    return data as User;
}

/**
 * Create a new user in the database
 */
export async function createUser(clerkUserId: string, email: string): Promise<User> {
    const { data, error } = await supabaseAdmin
        .from('users')
        .insert({
            clerk_user_id: clerkUserId,
            email: email,
            subscription_tier: 'free',
            subscription_status: 'inactive',
            thumbnail_count: 0,
        })
        .select()
        .single();

    if (error) {
        console.error('[Supabase] Error creating user:', error);
        throw error;
    }

    console.log('[Supabase] Created new user:', data.clerk_user_id);
    return data as User;
}

/**
 * Update a user's email (for Clerk user.updated events)
 */
export async function updateUserEmail(clerkUserId: string, email: string): Promise<void> {
    const { error } = await supabaseAdmin
        .from('users')
        .update({
            email: email,
            updated_at: new Date().toISOString(),
        })
        .eq('clerk_user_id', clerkUserId);

    if (error) {
        console.error('[Supabase] Error updating user email:', error);
        throw error;
    }

    console.log('[Supabase] Updated email for user:', clerkUserId);
}

/**
 * Update a user's subscription information
 */
export async function updateUserSubscription(
    clerkUserId: string,
    subscriptionData: {
        subscription_tier?: 'free' | 'basic' | 'pro' | 'max';
        subscription_status?: 'active' | 'inactive' | 'cancelled' | 'past_due';
        stripe_customer_id?: string;
        stripe_subscription_id?: string;
    }
): Promise<void> {
    const { error } = await supabaseAdmin
        .from('users')
        .update({
            ...subscriptionData,
            updated_at: new Date().toISOString(),
        })
        .eq('clerk_user_id', clerkUserId);

    if (error) {
        console.error('[Supabase] Error updating subscription:', error);
        throw error;
    }

    console.log('[Supabase] Updated subscription for user:', clerkUserId, subscriptionData);
}

/**
 * Increment the user's thumbnail generation count
 */
export async function incrementThumbnailCount(clerkUserId: string): Promise<number> {
    // First get the current count
    const user = await getUserByClerkId(clerkUserId);
    if (!user) {
        throw new Error('User not found');
    }

    const newCount = user.thumbnail_count + 1;

    const { error } = await supabaseAdmin
        .from('users')
        .update({
            thumbnail_count: newCount,
            updated_at: new Date().toISOString(),
        })
        .eq('clerk_user_id', clerkUserId);

    if (error) {
        console.error('[Supabase] Error incrementing thumbnail count:', error);
        throw error;
    }

    console.log('[Supabase] Incremented thumbnail count for user:', clerkUserId, '→', newCount);
    return newCount;
}

/**
 * Check if user has an active paid subscription
 */
export async function getUserSubscriptionStatus(clerkUserId: string): Promise<{
    isSubscribed: boolean;
    tier: 'free' | 'basic' | 'pro' | 'max';
    status: 'active' | 'inactive' | 'cancelled' | 'past_due';
    thumbnailCount: number;
    canGenerate: boolean;
}> {
    const user = await getUserByClerkId(clerkUserId);

    if (!user) {
        return {
            isSubscribed: false,
            tier: 'free',
            status: 'inactive',
            thumbnailCount: 0,
            canGenerate: true, // New users can generate
        };
    }

    const isSubscribed =
        user.subscription_status === 'active' &&
        ['basic', 'pro', 'max'].includes(user.subscription_tier);

    // Free users are limited to 3 thumbnails
    const canGenerate = isSubscribed || user.thumbnail_count < 3;

    return {
        isSubscribed,
        tier: user.subscription_tier,
        status: user.subscription_status,
        thumbnailCount: user.thumbnail_count,
        canGenerate,
    };
}

/**
 * Get Stripe customer ID for a user
 */
export async function getStripeCustomerId(clerkUserId: string): Promise<string | null> {
    const user = await getUserByClerkId(clerkUserId);
    return user?.stripe_customer_id || null;
}

/**
 * Update user subscription by their Stripe customer ID
 * Used by webhooks when we don't have the Clerk user ID
 */
export async function updateSubscriptionByStripeCustomerId(
    stripeCustomerId: string,
    subscriptionData: {
        subscription_tier?: 'free' | 'basic' | 'pro' | 'max';
        subscription_status?: 'active' | 'inactive' | 'cancelled' | 'past_due';
    }
): Promise<void> {
    const { error } = await supabaseAdmin
        .from('users')
        .update({
            ...subscriptionData,
            updated_at: new Date().toISOString(),
        })
        .eq('stripe_customer_id', stripeCustomerId);

    if (error) {
        console.error('[Supabase] Error updating subscription by Stripe ID:', error);
        throw error;
    }

    console.log('[Supabase] Updated subscription by Stripe ID:', stripeCustomerId, subscriptionData);
}
