import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#0a0a0a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
            }}
        >
            <SignIn
                appearance={{
                    elements: {
                        rootBox: {
                            boxShadow: "0 0 40px rgba(139, 92, 246, 0.2)",
                        },
                        card: {
                            background: "#18181b",
                            border: "1px solid rgba(139, 92, 246, 0.3)",
                        },
                    },
                }}
            />
        </div>
    );
}
