import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
    "/",
    "/pricing(.*)",
    "/about(.*)",
    "/contact(.*)",
    "/templates(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/generate-thumbnail(.*)",
    "/api/create-checkout(.*)",
    "/api/subscription-status(.*)",
    "/api/webhooks(.*)", // Clerk and Stripe webhooks
]);

export default clerkMiddleware(async (auth, request) => {
    // For non-public routes, require authentication
    if (!isPublicRoute(request)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
