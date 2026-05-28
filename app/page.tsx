export default function Home() {
  const sampleRequests = [
    {
      name: "Sarah Johnson",
      service: "Plumbing Repair",
      status: "New",
      date: "2026-05-28",
    },
    {
      name: "Michael Chen",
      service: "HVAC Installation",
      status: "Contacted",
      date: "2026-05-27",
    },
    {
      name: "Emily Rodriguez",
      service: "Electrical Work",
      status: "Completed",
      date: "2026-05-26",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <span className="text-lg font-bold">B</span>
            </div>
            <span className="text-lg font-semibold">BookFlow</span>
          </a>

          <a
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Admin Login
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 pb-16 pt-20 text-center">
        <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight text-gray-950">
          Simple booking management for small businesses
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          Enable your customers to submit service requests online. Manage,
          track, and respond to bookings from a simple admin dashboard. No
          complex setup required.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/booking"
            className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
          >
            Book a Service
          </a>

          <a
            href="/login"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
          >
            Admin Login
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold text-gray-950">
            Recent Service Requests
          </h2>

          <div className="space-y-4">
            {sampleRequests.map((request) => (
              <div
                key={request.name}
                className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
                    {request.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-950">
                      {request.name}
                    </p>
                    <p className="text-sm text-gray-600">{request.service}</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <span className="hidden text-sm text-gray-500 sm:block">
                    {request.date}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      request.status === "New"
                        ? "bg-blue-100 text-blue-700"
                        : request.status === "Contacted"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white py-6">
        <p className="text-center text-sm text-gray-500">
          © 2026 BookFlow. Built for small business service management.
        </p>
      </footer>
    </main>
  );
}