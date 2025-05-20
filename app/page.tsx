// app/page.tsx
"use client";
 
import { useRouter } from "next/navigation";
 
export default function Home() {
  const router = useRouter();
 
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-xl text-center">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">Welcome to TaskMaster</h1>
        <p className="text-gray-600 text-lg mb-6">
          Simplify your workflow and boost your productivity. Organize your tasks, track your progress, and stay focused.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
        >
          Get Started
        </button>
      </div>
    </main>
  );
}
