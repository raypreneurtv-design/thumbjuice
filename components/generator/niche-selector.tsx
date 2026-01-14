// This component is deprecated. Generator functionality is now integrated into hero.tsx.
// Keeping file for potential future reuse.

import { Gamepad2, MessageSquare, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Niche = "gaming" | "commentary" | "finance";

interface NicheSelectorProps {
    selected: Niche | null;
    onSelect: (niche: Niche) => void;
}

export function NicheSelector({ selected, onSelect }: NicheSelectorProps) {
    const niches = [
        {
            id: "gaming" as Niche,
            label: "Gaming",
            icon: Gamepad2,
            description: "Vibrant, high-contrast, action-packed.",
        },
        {
            id: "commentary" as Niche,
            label: "Commentary",
            icon: MessageSquare,
            description: "Big text, expressive faces, dramatic.",
        },
        {
            id: "finance" as Niche,
            label: "Finance",
            icon: TrendingUp,
            description: "Clean, professional, trust-focused.",
        },
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-white/80">1. Select your Niche</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {niches.map((niche) => (
                    <button
                        key={niche.id}
                        onClick={() => onSelect(niche.id)}
                        className={cn(
                            "p-5 rounded-xl border text-left transition-all duration-200",
                            selected === niche.id
                                ? "border-brand-pink bg-brand-pink/10"
                                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                        )}
                    >
                        <niche.icon
                            className={cn(
                                "w-6 h-6 mb-3",
                                selected === niche.id ? "text-brand-pink" : "text-zinc-400"
                            )}
                        />
                        <div className="font-medium text-white">{niche.label}</div>
                        <div className="text-xs text-zinc-500 mt-1">{niche.description}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}
