import { createClient } from '@supabase/supabase-js';

// Supabase URL and keys from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

// Client-side Supabase client (uses anon key, respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (uses service key, bypasses RLS)
// Only use this on the server (API routes, webhooks)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});

// Type definitions for the users table
export interface User {
    id: string;
    clerk_user_id: string;
    email: string;
    subscription_tier: 'free' | 'basic' | 'pro' | 'max';
    subscription_status: 'active' | 'inactive' | 'cancelled' | 'past_due';
    stripe_customer_id: string | null;
    stripe_subscription_id: string | null;
    thumbnail_count: number;
    created_at: string;
    updated_at: string;
}
