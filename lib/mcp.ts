// MCP (Model Context Protocol) Connection Interface
// This module provides the structure for future Photoshop/MCP integration

export interface GenerateRequest {
    // User inputs
    prompt: string;
    niche: "gaming" | "commentary" | "finance";
    aspectRatio: "16:9" | "1:1" | "9:16";

    // Hidden metadata for MCP
    metadata: {
        timestamp: string;
        sessionId: string;
        nichePreset: string;
        canvasWidth: number;
        canvasHeight: number;
    };
}

export interface GenerateResponse {
    success: boolean;
    imageUrl?: string;
    error?: string;
    processingTime?: number;
}

// MCP Connection Status
export type MCPStatus = "disconnected" | "connecting" | "connected" | "processing";

// Generate aspect ratio dimensions
export function getCanvasDimensions(aspectRatio: "16:9" | "1:1" | "9:16"): { width: number; height: number } {
    switch (aspectRatio) {
        case "16:9":
            return { width: 1920, height: 1080 };
        case "1:1":
            return { width: 1080, height: 1080 };
        case "9:16":
            return { width: 1080, height: 1920 };
        default:
            return { width: 1920, height: 1080 };
    }
}

// Build the generate request with metadata
export function buildGenerateRequest(
    prompt: string,
    niche: "gaming" | "commentary" | "finance",
    aspectRatio: "16:9" | "1:1" | "9:16"
): GenerateRequest {
    const dimensions = getCanvasDimensions(aspectRatio);

    return {
        prompt,
        niche,
        aspectRatio,
        metadata: {
            timestamp: new Date().toISOString(),
            sessionId: crypto.randomUUID(),
            nichePreset: `${niche}_preset_v1`,
            canvasWidth: dimensions.width,
            canvasHeight: dimensions.height,
        },
    };
}

// Placeholder for MCP connection - will be implemented when MCP is available
export async function sendToMCP(request: GenerateRequest): Promise<GenerateResponse> {
    // TODO: Replace with actual MCP connection
    console.log("[MCP] Request payload:", JSON.stringify(request, null, 2));

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Return mock response
    return {
        success: true,
        imageUrl: getMockImage(request.niche),
        processingTime: 3000,
    };
}

function getMockImage(niche: string): string {
    const mockImages: Record<string, string> = {
        gaming: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1920",
        commentary: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=1920",
        finance: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=1920",
    };
    return mockImages[niche] || mockImages.gaming;
}
