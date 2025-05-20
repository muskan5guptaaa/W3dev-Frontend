"use client";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loginError, setLoginError] = useState(false);

  const login = async () => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      document.cookie = `firebaseUser=${cred.user.uid}; path=/`;
      router.push("/dashboard");
    } catch (err) {
      setLoginError(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Sparkle Background */}
      <div className="absolute inset-0 z-0">
        <SparklesCore background="transparent" minSize={0.4} maxSize={1.2} particleDensity={80} className="w-full h-full" particleColor="#FFFFFF" />
      </div>
      {/* Card */}
      <div className="z-10 w-full max-w-md p-8 bg-white/90 rounded-2xl shadow-2xl backdrop-blur-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back 👋</h2>

        <div className="space-y-4">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <Button onClick={login} className="w-full mt-2">Login</Button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      {/* Login Failure Modal */}
      <Dialog open={loginError} onOpenChange={setLoginError}>
        <DialogContent className="sm:max-w-md bg-white border">
          <DialogHeader>
            <DialogTitle className="text-red-600">Login Failed</DialogTitle>
            <DialogDescription className="text-gray-700">
              The email or password is incorrect. Please try again.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

