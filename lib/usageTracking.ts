// Usage Tracking System for ThumbJuice Freemium
// Tracks anonymous users via localStorage (3 free uses)

const STORAGE_KEY = "thumbnail_uses";
const MAX_FREE_USES = 3;

/**
 * Get the current usage count from localStorage
 */
export function getUsageCount(): number {
    if (typeof window === "undefined") return 0;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 0;
}

/**
 * Get remaining free uses (max 3)
 */
export function getRemainingUses(): number {
    const used = getUsageCount();
    return Math.max(0, MAX_FREE_USES - used);
}

/**
 * Check if user has free uses remaining
 */
export function hasUsesRemaining(): boolean {
    return getRemainingUses() > 0;
}

/**
 * Increment usage count by 1
 */
export function incrementUses(): void {
    if (typeof window === "undefined") return;
    const current = getUsageCount();
    localStorage.setItem(STORAGE_KEY, String(current + 1));
}

/**
 * Reset usage count (for testing)
 */
export function resetUses(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
}

/**
 * Check if this is the last free use
 */
export function isLastFreeUse(): boolean {
    return getRemainingUses() === 1;
}
