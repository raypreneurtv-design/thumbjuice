import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing | ThumbJuice - AI Thumbnail Generator",
    description: "Choose the perfect plan for your YouTube thumbnail needs. Start for free, upgrade anytime.",
};

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
