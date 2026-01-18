import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createUser, updateUserEmail, getUserByClerkId } from '@/lib/supabase-helpers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    // Get the webhook secret from environment variable
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        console.error('[Clerk Webhook] Missing CLERK_WEBHOOK_SECRET');
        return NextResponse.json(
            { error: 'Webhook secret not configured' },
            { status: 500 }
        );
    }

    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        console.error('[Clerk Webhook] Missing svix headers');
        return NextResponse.json(
            { error: 'Missing svix headers' },
            { status: 400 }
        );
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the webhook
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('[Clerk Webhook] Verification failed:', err);
        return NextResponse.json(
            { error: 'Webhook verification failed' },
            { status: 400 }
        );
    }

    // Handle the webhook event
    const eventType = evt.type;
    console.log(`[Clerk Webhook] Received event: ${eventType}`);

    try {
        if (eventType === 'user.created') {
            const { id, email_addresses, primary_email_address_id } = evt.data;

            // Get the primary email
            const primaryEmail = email_addresses.find(
                (email) => email.id === primary_email_address_id
            );
            const email = primaryEmail?.email_address || email_addresses[0]?.email_address || '';

            console.log(`[Clerk Webhook] Creating user: ${id}, email: ${email}`);

            // Check if user already exists (in case of duplicate webhook)
            const existingUser = await getUserByClerkId(id);
            if (!existingUser) {
                await createUser(id, email);
                console.log(`[Clerk Webhook] User created successfully: ${id}`);
            } else {
                console.log(`[Clerk Webhook] User already exists: ${id}`);
            }
        }

        if (eventType === 'user.updated') {
            const { id, email_addresses, primary_email_address_id } = evt.data;

            // Get the primary email
            const primaryEmail = email_addresses.find(
                (email) => email.id === primary_email_address_id
            );
            const email = primaryEmail?.email_address || email_addresses[0]?.email_address || '';

            console.log(`[Clerk Webhook] Updating user: ${id}, email: ${email}`);

            // Check if user exists
            const existingUser = await getUserByClerkId(id);
            if (existingUser) {
                await updateUserEmail(id, email);
                console.log(`[Clerk Webhook] User updated successfully: ${id}`);
            } else {
                // User doesn't exist in Supabase yet, create them
                await createUser(id, email);
                console.log(`[Clerk Webhook] Created missing user: ${id}`);
            }
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('[Clerk Webhook] Error processing event:', error);
        return NextResponse.json(
            { error: 'Error processing webhook' },
            { status: 500 }
        );
    }
}
