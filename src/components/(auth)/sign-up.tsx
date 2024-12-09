import { SignUp } from "@clerk/clerk-react";

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <SignUp path="/auth/sign-up"/>
        </div>
    );
}