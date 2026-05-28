"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookingPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSuccess("");
    setErrorMessage("");

    const { error } = await supabase.from("booking_requests").insert([
      {
        full_name: fullName,
        email: email,
        phone: phone,
        service_type: serviceType,
        message: message,
        status: "New",
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      setErrorMessage(error.message);
      return;
    }

    setSuccess("Your request was submitted successfully.");
    setFullName("");
    setEmail("");
    setPhone("");
    setServiceType("");
    setMessage("");
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

      <section className="mx-auto flex max-w-[1180px] justify-center px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[520px] rounded-2xl border border-[#e5e7eb] bg-white p-8 shadow-sm"
        >
          <h1 className="text-[32px] font-bold tracking-[-0.02em] text-[#111827]">
            Book a Service
          </h1>

          <p className="mt-3 text-[16px] leading-6 text-[#4b5563]">
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-[15px] font-semibold text-[#111827]">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Smith"
                className="h-12 w-full rounded-lg border border-[#d1d5db] bg-white px-4 text-[15px] text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#1f9d62] focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-[15px] font-semibold text-[#111827]">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="h-12 w-full rounded-lg border border-[#d1d5db] bg-white px-4 text-[15px] text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#1f9d62] focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-[15px] font-semibold text-[#111827]">
                Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
                className="h-12 w-full rounded-lg border border-[#d1d5db] bg-white px-4 text-[15px] text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#1f9d62] focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-[15px] font-semibold text-[#111827]">
                Service Type
              </label>
              <select
                required
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="h-12 w-full rounded-lg border border-[#d1d5db] bg-white px-4 text-[15px] text-[#111827] outline-none focus:border-[#1f9d62] focus:ring-2 focus:ring-emerald-100"
              >
                <option value="">Select a service</option>
                <option>Website Design</option>
                <option>Website Maintenance</option>
                <option>SEO Help</option>
                <option>General Inquiry</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-[15px] font-semibold text-[#111827]">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe the service you need..."
                className="h-[116px] w-full resize-none rounded-lg border border-[#d1d5db] bg-white px-4 py-3 text-[15px] text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#1f9d62] focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {success && (
            <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {success}
            </div>
          )}

          {errorMessage && (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="mt-7 h-12 w-full rounded-lg bg-[#1f9d62] text-[15px] font-semibold text-white transition hover:bg-[#188653]"
          >
            Submit Request
          </button>
        </form>
      </section>
    </main>
  );
}