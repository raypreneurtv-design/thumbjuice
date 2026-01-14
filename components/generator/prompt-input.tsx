// This component is deprecated. Generator functionality is now integrated into hero.tsx.
// Keeping file for potential future reuse.

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AspectRatio = "16:9" | "1:1" | "9:16";

interface PromptInputProps {
    prompt: string;
    setPrompt: (value: string) => void;
    aspectRatio: AspectRatio;
    setAspectRatio: (value: AspectRatio) => void;
    onGenerate: () => void;
    isGenerating: boolean;
}

export function PromptInput({
    prompt,
    setPrompt,
    aspectRatio,
    setAspectRatio,
    onGenerate,
    isGenerating,
}: PromptInputProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-white/80">2. Describe your Video</h3>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Minecraft survival gameplay, epic castle build, night time, shaders..."
                    className="w-full h-32 rounded-xl border border-white/10 bg-black/50 p-4 text-white placeholder:text-zinc-600 focus:border-brand-pink focus:ring-1 focus:ring-brand-pink focus:outline-none resize-none transition-all"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end">
                <div className="space-y-3 w-full md:w-auto">
                    <label className="text-sm font-medium text-white/80">Aspect Ratio</label>
                    <div className="flex gap-2 p-1 bg-black/40 rounded-lg border border-white/10 w-fit">
                        {(["16:9", "1:1", "9:16"] as AspectRatio[]).map((ratio) => (
                            <button
                                key={ratio}
                                onClick={() => setAspectRatio(ratio)}
                                className={cn(
                                    "px-4 py-2 rounded-md text-sm font-medium transition-all",
                                    aspectRatio === ratio
                                        ? "bg-brand-pink text-white shadow-sm"
                                        : "text-zinc-500 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {ratio}
                            </button>
                        ))}
                    </div>
                </div>

                <Button
                    onClick={onGenerate}
                    disabled={!prompt || isGenerating}
                    size="lg"
                    className="w-full md:w-auto min-w-[200px] h-14 text-lg"
                >
                    {isGenerating ? (
                        <span className="flex items-center gap-2">
                            <span className="animate-spin">✨</span> Generating...
                        </span>
                    ) : (
                        "Generate Thumbnail"
                    )}
                </Button>
            </div>
        </div>
    );
}
