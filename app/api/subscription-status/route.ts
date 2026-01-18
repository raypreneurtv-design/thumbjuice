import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getUserSubscriptionStatus, getUserByClerkId } from '@/lib/supabase-helpers';

export async function GET() {
    try {
        // Get the current user from Clerk
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({
                isLoggedIn: false,
                isSubscribed: false,
                tier: 'free',
                status: 'inactive',
                thumbnailCount: 0,
                canGenerate: true,
                remainingFree: 3,
            });
        }

        // Get user data from Supabase
        const user = await getUserByClerkId(userId);

        if (!user) {
            // User exists in Clerk but not Supabase yet
            return NextResponse.json({
                isLoggedIn: true,
                isSubscribed: false,
                tier: 'free',
                status: 'inactive',
                thumbnailCount: 0,
                canGenerate: true,
                remainingFree: 3,
            });
        }

        const status = await getUserSubscriptionStatus(userId);

        return NextResponse.json({
            isLoggedIn: true,
            isSubscribed: status.isSubscribed,
            tier: status.tier,
            status: status.status,
            thumbnailCount: status.thumbnailCount,
            canGenerate: status.canGenerate,
            remainingFree: Math.max(0, 3 - status.thumbnailCount),
            email: user.email,
            stripeCustomerId: user.stripe_customer_id,
        });

    } catch (error) {
        console.error('Error fetching subscription status:', error);

        return NextResponse.json(
            { error: 'Failed to fetch subscription status' },
            { status: 500 }
        );
    }
}
