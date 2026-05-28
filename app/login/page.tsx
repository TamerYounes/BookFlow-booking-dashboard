"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error);
      setErrorMessage("Invalid email or password.");
      return;
    }

    router.push("/admin");
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#111827]">
      <header className="border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1f9d62] text-white">
              <span className="text-lg font-bold">B</span>
            </div>
            <span className="text-[17px] font-semibold text-[#111827]">
              BookFlow
            </span>
          </a>

          <a
            href="/"
            className="text-[15px] font-medium text-[#374151] hover:text-[#111827]"
          >
            ← Back to Home
          </a>
        </div>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-72px)] max-w-[1180px] items-center justify-center px-6 py-12">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-[460px] rounded-2xl border border-[#e5e7eb] bg-white p-8 shadow-sm"
        >
          <h1 className="text-[32px] font-bold tracking-[-0.02em] text-[#111827]">
            Admin Login
          </h1>

          <p className="mt-3 text-[16px] leading-6 text-[#4b5563]">
            Sign in to access your booking management dashboard.
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-[15px] font-semibold text-[#111827]">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bookflow.com"
                className="h-12 w-full rounded-lg border border-[#d1d5db] bg-white px-4 text-[15px] text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#1f9d62] focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-[15px] font-semibold text-[#111827]">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 w-full rounded-lg border border-[#d1d5db] bg-white px-4 text-[15px] text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#1f9d62] focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="mt-7 h-12 w-full rounded-lg bg-[#1f9d62] text-[15px] font-semibold text-white transition hover:bg-[#188653]"
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}