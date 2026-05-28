"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type BookingRequest = {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  service_type: string;
  message: string | null;
  status: string;
  created_at: string;
};

export default function AdminPage() {
  const router = useRouter();

  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserAndLoadRequests();
  }, []);

  async function checkUserAndLoadRequests() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    getRequests();
  }

  async function getRequests() {
    const { data, error } = await supabase
      .from("booking_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch requests error:", error);
    } else {
      setRequests(data || []);
    }

    setLoading(false);
  }

  async function updateStatus(id: number, newStatus: string) {
    const { error } = await supabase
      .from("booking_requests")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error("Update status error:", error);
      return;
    }

    getRequests();
  }

  async function deleteRequest(id: number) {
    const confirmDelete = confirm("Delete this booking request?");

    if (!confirmDelete) {
      return;
    }

    const { error } = await supabase
      .from("booking_requests")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete request error:", error);
      return;
    }

    getRequests();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  function formatDate(dateString: string) {
    return dateString.replace("T", " ").slice(0, 10);
  }

  function getInitial(name: string) {
    return name ? name.charAt(0).toUpperCase() : "?";
  }

  function getStatusClass(status: string) {
    if (status === "New") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "Contacted") {
      return "bg-amber-100 text-amber-700";
    }

    return "bg-green-100 text-green-700";
  }

  const newCount = requests.filter((request) => request.status === "New").length;
  const contactedCount = requests.filter(
    (request) => request.status === "Contacted"
  ).length;
  const completedCount = requests.filter(
    (request) => request.status === "Completed"
  ).length;

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#111827]">
      <header className="border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1f9d62] text-white">
                <span className="text-lg font-bold">B</span>
              </div>
              <span className="text-[17px] font-semibold text-[#111827]">
                BookFlow
              </span>
            </a>

            <div className="h-5 w-px bg-[#d1d5db]" />

            <h1 className="text-[22px] font-bold text-[#111827]">
              Admin Dashboard
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="text-[15px] font-semibold text-[#374151] hover:text-[#111827]"
          >
            Log Out
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-[1180px] px-8 py-8">
        <a
          href="/"
          className="mb-6 inline-block text-[15px] font-semibold text-[#374151] hover:text-[#111827]"
        >
          ← Back to Home
        </a>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <p className="text-[30px] font-bold text-[#111827]">{newCount}</p>
            <p className="mt-2 text-[15px] text-[#4b5563]">New Requests</p>
          </div>

          <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <p className="text-[30px] font-bold text-[#111827]">
              {contactedCount}
            </p>
            <p className="mt-2 text-[15px] text-[#4b5563]">In Progress</p>
          </div>

          <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <p className="text-[30px] font-bold text-[#111827]">
              {completedCount}
            </p>
            <p className="mt-2 text-[15px] text-[#4b5563]">Completed</p>
          </div>
        </div>

        <div className="mt-7 space-y-5">
          {loading && (
            <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <p className="text-[#4b5563]">Loading requests...</p>
            </div>
          )}

          {!loading && requests.length === 0 && (
            <div className="rounded-xl border border-[#e5e7eb] bg-white p-8 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-[#111827]">
                No booking requests yet
              </h2>
              <p className="mt-2 text-[#4b5563]">
                New customer requests will appear here.
              </p>
            </div>
          )}

          {requests.map((request) => (
            <div
              key={request.id}
              className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-5 md:flex-row">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[18px] font-semibold text-emerald-700">
                    {getInitial(request.full_name)}
                  </div>

                  <div>
                    <h2 className="text-[18px] font-bold text-[#111827]">
                      {request.full_name}
                    </h2>

                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[14px] text-[#4b5563]">
                      <p>{request.email}</p>
                      <p>{request.phone || "No phone provided"}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <p className="text-[14px] text-[#6b7280]">
                    {formatDate(request.created_at)}
                  </p>

                  <span
                    className={`rounded-full px-3 py-1 text-[14px] font-medium ${getStatusClass(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-[15px] font-bold text-[#111827]">
                    Service Type
                  </p>
                  <p className="mt-1 text-[15px] text-[#374151]">
                    {request.service_type}
                  </p>
                </div>

                <div>
                  <p className="text-[15px] font-bold text-[#111827]">
                    Message
                  </p>
                  <p className="mt-1 text-[15px] leading-6 text-[#374151]">
                    {request.message || "No message provided."}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateStatus(request.id, "New")}
                    className={`rounded-lg px-4 py-2 text-[14px] font-semibold ${
                      request.status === "New"
                        ? "bg-blue-600 text-white"
                        : "bg-[#f3f4f6] text-[#374151] hover:bg-[#e5e7eb]"
                    }`}
                  >
                    New
                  </button>

                  <button
                    onClick={() => updateStatus(request.id, "Contacted")}
                    className={`rounded-lg px-4 py-2 text-[14px] font-semibold ${
                      request.status === "Contacted"
                        ? "bg-amber-600 text-white"
                        : "bg-[#f3f4f6] text-[#374151] hover:bg-[#e5e7eb]"
                    }`}
                  >
                    Contacted
                  </button>

                  <button
                    onClick={() => updateStatus(request.id, "Completed")}
                    className={`rounded-lg px-4 py-2 text-[14px] font-semibold ${
                      request.status === "Completed"
                        ? "bg-green-600 text-white"
                        : "bg-[#f3f4f6] text-[#374151] hover:bg-[#e5e7eb]"
                    }`}
                  >
                    Completed
                  </button>
                </div>

                <button
                  onClick={() => deleteRequest(request.id)}
                  className="rounded-lg bg-[#f3f4f6] px-4 py-2 text-[14px] font-semibold text-[#374151] hover:bg-red-600 hover:text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}