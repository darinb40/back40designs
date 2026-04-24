import Link from "next/link";

export default function LotStretcherPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.45em] text-white/35 mb-5">
          Back Lot Utility Dept.
        </p>

        <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
          Seriously?.
        </h1>

        <p className="text-lg text-white/60 leading-8 mb-8">
          If you have to ask what a lot stretcher is…
          <br />
          you’re not ready for the Back Lot.
        </p>

        <p className="text-sm text-white/35 mb-10">
          Go get an up and come back after your first real Saturday.
        </p>

        <Link
          href="/dealership-series/backlot"
          className="text-sm text-white/50 hover:text-white transition"
        >
          ← Back to the Back Lot
        </Link>
      </div>
    </main>
  );
}
