"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to sign in");
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      
      // Store auth token and user info
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userEmail", email);
      
      // Redirect to home
      router.push("/");
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = "/api/auth/signin?callbackUrl=/";
  };

  return (
    <main className="min-h-screen bg-amber-400 p-2 md:p-2 font-mono selection:bg-blue-500 selection:text-white">
      <div className="max-w-8xl mx-auto">
        <section className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12">
          <h1 className="text-5xl md:text-5xl font-black mb-4 uppercase tracking-tighter font-mono">
            Sign In
          </h1>
          <div className="border-t-4 border-black pt-4">
            <p className="text-xl md:text-2xl font-bold">
              Tristan Hawkins | Junior Software Developer | Raleigh, North Carolina
            </p>
          </div>
        </section>

        <section className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-lg font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-4 border-black font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-4 border-black font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-200 border-4 border-red-600 p-4">
                <p className="text-red-800 font-bold text-lg">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="border-t-4 border-black my-6"></div>

          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-white text-black border-4 border-black px-6 py-3 font-bold text-xl hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
            >
              Sign In with Google
            </button>

            <p className="text-center text-lg font-bold">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-blue-500 underline">
                Sign Up
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
