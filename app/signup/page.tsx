"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SparklesCore } from "@/components/ui/sparkles";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [signupError, setSignupError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      router.push("/dashboard");
    } catch (err: any) {
      setErrorMessage(err.message);
      setSignupError(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Sparkles background */}
      <div className="absolute inset-0 z-0">
        <SparklesCore background="transparent" minSize={0.4} maxSize={1.2} particleDensity={80} className="w-full h-full" particleColor="#FFFFFF" />
      </div>
      {/* Signup Card */}
      <div className="z-10 w-full max-w-md p-8 bg-white/90 rounded-2xl shadow-2xl backdrop-blur-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create an Account ✨</h2>

        <div className="space-y-4">
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <Button onClick={handleSignup} className="w-full mt-2">Sign Up</Button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>

      {/* Signup Error Modal */}
      <Dialog open={signupError} onOpenChange={setSignupError}>
        <DialogContent className="sm:max-w-md bg-white border">
          <DialogHeader>
            <DialogTitle className="text-red-600">Signup Failed</DialogTitle>
            <DialogDescription className="text-gray-700">
              {errorMessage || "Unable to create account. Please try again."}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

