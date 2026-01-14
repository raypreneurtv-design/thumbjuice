// This component is deprecated. Generator functionality is now integrated into hero.tsx.
// Keeping file for potential future reuse.

import { Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThumbnailPreviewProps {
    imageUrl: string | null;
    isLoading: boolean;
    onRegenerate: () => void;
    aspectRatio: "16:9" | "1:1" | "9:16";
}

export function ThumbnailPreview({
    imageUrl,
    isLoading,
    onRegenerate,
    aspectRatio,
}: ThumbnailPreviewProps) {
    const handleDownload = () => {
        if (imageUrl) {
            const link = document.createElement("a");
            link.href = imageUrl;
            link.download = "thumblify-thumbnail.png";
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    if (!imageUrl && !isLoading) return null;

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-medium text-white/80">3. Result</h3>

            <div
                className={cn(
                    "overflow-hidden border border-white/10 bg-black/80 relative group rounded-xl",
                    aspectRatio === "16:9"
                        ? "aspect-video"
                        : aspectRatio === "1:1"
                            ? "aspect-square"
                            : "aspect-[9/16]"
                )}
            >
                <div className="relative w-full h-full flex items-center justify-center bg-zinc-900">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="w-12 h-12 border-4 border-brand-pink border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-brand-pink animate-pulse">
                                Designing pixel perfect thumbnail...
                            </p>
                        </div>
                    ) : (
                        imageUrl && (
                            <>
                                <img
                                    src={imageUrl}
                                    alt="Generated Thumbnail"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <Button onClick={onRegenerate} variant="outline" className="gap-2">
                                        <RefreshCw className="w-4 h-4" /> Variations
                                    </Button>
                                    <Button
                                        onClick={handleDownload}
                                        className="gap-2 bg-green-500 hover:bg-green-600"
                                    >
                                        <Download className="w-4 h-4" /> Download PNG
                                    </Button>
                                </div>
                            </>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
