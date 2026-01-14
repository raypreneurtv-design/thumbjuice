import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

// Niche-specific prompt templates
const PROMPT_TEMPLATES: Record<string, (description: string) => string> = {
    gaming: (description: string) =>
        `Epic YouTube gaming thumbnail: ${description}, vibrant action-packed scene, dramatic lighting, high contrast, bold composition, professional gaming aesthetic`,
    commentary: (description: string) =>
        `YouTube commentary thumbnail: ${description}, expressive reaction face, bold emotional expression, studio lighting, high contrast, eye-catching colors, professional aesthetic`,
    finance: (description: string) =>
        `Professional YouTube finance thumbnail: ${description}, clean design, trustworthy aesthetic, charts or graphs if relevant, sophisticated color palette, credible business look`,
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { niche, description, aspectRatio } = body;

        // Validate inputs
        if (!niche || !description) {
            return NextResponse.json(
                { success: false, error: "Missing required fields: niche and description" },
                { status: 400 }
            );
        }

        // Check for API token
        const apiToken = process.env.REPLICATE_API_TOKEN;
        if (!apiToken) {
            return NextResponse.json(
                { success: false, error: "Replicate API token not configured" },
                { status: 500 }
            );
        }

        // Initialize Replicate client
        const replicate = new Replicate({
            auth: apiToken,
        });

        // Build the prompt using niche template
        const promptTemplate = PROMPT_TEMPLATES[niche] || PROMPT_TEMPLATES.gaming;
        const prompt = promptTemplate(description);

        console.log("[ThumbJuice] Generating thumbnail with prompt:", prompt);
        console.log("[ThumbJuice] Aspect ratio:", aspectRatio);

        // Call Replicate FLUX Schnell model
        const output = await replicate.run("black-forest-labs/flux-schnell", {
            input: {
                prompt: prompt,
                aspect_ratio: aspectRatio || "16:9",
                num_outputs: 1,
                output_format: "webp",
                output_quality: 90,
            },
        });

        console.log("[ThumbJuice] Raw output type:", typeof output);
        console.log("[ThumbJuice] Raw output:", output);

        // Handle different output formats from Replicate
        let imageUrl: string | null = null;

        if (Array.isArray(output) && output.length > 0) {
            const firstOutput = output[0];

            // Check if it's a ReadableStream (newer Replicate SDK)
            if (firstOutput instanceof ReadableStream) {
                // Read the stream and convert to base64 data URL
                const reader = firstOutput.getReader();
                const chunks: Uint8Array[] = [];

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    chunks.push(value);
                }

                // Combine chunks into single Uint8Array
                const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
                const combined = new Uint8Array(totalLength);
                let offset = 0;
                for (const chunk of chunks) {
                    combined.set(chunk, offset);
                    offset += chunk.length;
                }

                // Convert to base64 data URL
                const base64 = Buffer.from(combined).toString("base64");
                imageUrl = `data:image/webp;base64,${base64}`;
                console.log("[ThumbJuice] Converted stream to base64 data URL");
            } else if (typeof firstOutput === "string") {
                // Direct URL string
                imageUrl = firstOutput;
            } else if (firstOutput && typeof firstOutput === "object" && "url" in firstOutput) {
                // Object with url property
                imageUrl = (firstOutput as { url: string }).url;
            }
        } else if (typeof output === "string") {
            imageUrl = output;
        }

        if (!imageUrl) {
            console.error("[ThumbJuice] Could not extract image URL from output:", output);
            return NextResponse.json(
                { success: false, error: "No image generated - unexpected output format" },
                { status: 500 }
            );
        }

        console.log("[ThumbJuice] Final image URL type:", imageUrl.substring(0, 50) + "...");

        return NextResponse.json({
            success: true,
            imageUrl: imageUrl,
        });
    } catch (error: any) {
        console.error("[ThumbJuice] Generation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Failed to generate thumbnail",
            },
            { status: 500 }
        );
    }
}