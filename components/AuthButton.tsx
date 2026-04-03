"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name?: string;
}

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in by checking for token in localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      // Optionally verify the token with backend
      const userEmail = localStorage.getItem("userEmail");
      const userName = localStorage.getItem("userName");
      if (userEmail) {
        setUser({
          id: token,
          email: userEmail,
          name: userName || undefined,
        });
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setUser(null);
    setIsOpen(false);
    // Optional: redirect to home
    window.location.href = "/";
  };

  const handleGoogleSignIn = () => {
    // Redirect to NextAuth Google sign in
    window.location.href = "/api/auth/signin";
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="relative">
      {user ? (
        // User is logged in
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-main-foreground">
            {user.name || user.email}
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-blue-500 text-white border-2 border-black px-4 py-2 font-bold text-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
          >
            Menu
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-48 w-48 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50">
              <Link
                href="/admin"
                className="block px-4 py-2 text-sm font-bold hover:bg-blue-100 border-b border-black"
              >
                Admin Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm font-bold hover:bg-red-100 text-red-600"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        // User is not logged in
        <div className="flex gap-2">
          <Link
            href="/auth/signin"
            className="bg-white text-black border-2 border-black px-4 py-2 font-bold text-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="bg-blue-500 text-white border-2 border-black px-4 py-2 font-bold text-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}
