'use client';

import React from 'react';
import Link from 'next/link';

const CONTEST_FORMSPREE_ID = "xjgjqrly";
const SHEET_ID = "16Auns01US_MmsXtYNDmZu13YXyIXByYwYMsQWxHSHmQ";
const SHEET_NAME = "Form Responses 1";

const hats = [
  // FRONT LINE
  {
    title: "Sticker is Quicker",
    lane: "Front Line",
    image: "/images/sticker-is-quicker.jpg",
    subtitle: "How many hats would you buy if all your customers paid sticker?",
    patchType: "acrylic",
    hat: "Richardson 112",
    price: 40,
    bulkPrice: 35,
  },
  {
    title: "Board It! (Classic)",
    lane: "Front Line",
    image: "/images/board-it-car.png",
    subtitle: "The moment every salesperson lives for. When the deal sticks and the board gets another name on it.",
    patchType: "acrylic",
    hat: "Richardson 112",
    price: 40,
    bulkPrice: 35,
  },
  {
    title: "Board It! (Crown)",
    lane: "Front Line",
    image: "/images/board-it-crown.png",
    subtitle: "Same energy. Different look. For the closer who has been putting names on boards long enough to wear the crown.",
    patchType: "acrylic",
    hat: "Richardson 112",
    price: 40,
    bulkPrice: 35,
  },
  {
    title: "We Fina C",
    lane: "Front Line",
    image: "/images/we-finance.jpg",
    subtitle: "We finna see. Every F&I manager, desk guy, and closer knows exactly what this means.",
    patchType: "acrylic",
    hat: "Richardson 112",
    price: 40,
    bulkPrice: 35,
  },
  // BACK LOT
  {
    title: "Hold Gross",
    lane: "Back Lot",
    image: "/images/hold-gross.png",
    subtitle: "No discounts given.",
    patchType: "acrylic",
    hat: "Richardson 112",
    price: 40,
    bulkPrice: 35,
  },
  {
    title: "Let Me Guess / Just Looking / Not Buying Today",
    lane: "Back Lot",
    image: "/images/let-me-guess.png",
    subtitle: "The line every closer has heard.",
    patchType: "acrylic",
    hat: "Richardson 112",
    price: 40,
    bulkPrice: 35,
  },
  {
    title: "Switch and Get Rich (Classic)",
    lane: "Back Lot",
    image: "/images/switch.jpg",
    subtitle: "Different unit. Better gross.",
    patchType: "acrylic",
    hat: "Richardson 112",
    price: 40,
    bulkPrice: 35,
  },
  {
    title: "Switch and Get Rich (Skull)",
    lane: "Back Lot",
    image: "/images/switch-skull.jpg",
    subtitle: "Different unit. Same closer energy.",
    patchType: "acrylic",
    hat: "Richardson 112",
    price: 40,
    bulkPrice: 35,
  },
  {
    title: "Down the Road Motors",
    lane: "Back Lot",
    image: "/images/down-the-road.png",
    subtitle: '"They said they can do it for less."',
    patchType: "acrylic",
    hat: "Richardson 112",
    price: 40,
    bulkPrice: 35,
  },
  // SERVICE BAY
  {
    title: "I Don't Work For Free",
    lane: "Service Bay",
    image: "/images/free-work.png",
    subtitle: "Flat rate. Every flag hour counts.",
    patchType: "acrylic",
    hat: "Richardson 112 — Olive / Black",
    price: 40,
    bulkPrice: 35,
  },
  {
    title: "Who Traded For This Piece of $#!T?",
    lane: "Service Bay",
    image: "/images/pos.png",
    subtitle: "Someone upfront made a bad call.",
    patchType: "acrylic",
    hat: "Richardson 112 — Olive / Black",
    price: 40,
    bulkPrice: 35,
  },
  {
    title: "Cross Threaded Is Threaded",
    lane: "Service Bay",
    image: "/images/cross-thread.png",
    subtitle: "Shop floor logic.",
    patchType: "acrylic",
    hat: "Richardson 112 — Olive / Black",
    price: 40,
    bulkPrice: 35,
  },
];

const lanes = ["Front Line", "Back Lot", "Service Bay"];

const laneDescriptions = {
  "Front Line": "Customer-facing. Clean. For the ones who close.",
  "Back Lot": "Earned, not given.",
  "Service Bay": "Fixed ops. Built for the bay.",
};

function PreOrderForm() {
  const [status, setStatus] = React.useState("idle");
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    quantity: "",
    hat: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    
    try {
      const timestamp = new Date().toLocaleString();
      const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(SHEET_NAME)}!A:H:append?valueInputOption=USER_ENTERED&key=AIzaSyDummyKeyForNow`;
      const values = [[timestamp, form.name, form.email, form.phone, form.quantity, form.hat, "", form.notes]];

      const res = await fetch(appendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", quantity: "", hat: "", notes: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-stone-500 transition focus:border-white/30 focus:outline-none";
  const labelClass = "block text-xs font-semibold uppercase tracking-[0.2em] mb-2 text-stone-400";

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <p className="text-4xl mb-4">✓</p>
        <p className="text-xl font-semibold text-white mb-2">Order received.</p>
        <p className="text-sm text-stone-400 mb-1">
          Darin will follow up with a payment link within 24 hours.
        </p>
        <p className="text-sm text-stone-400 mb-3">
          Questions? Call or text{" "}
          <a href="tel:479-544-1366" className="underline text-stone-300">479-544-1366</a>
        </p>
        <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-1">Don't forget</p>
          <p className="text-sm text-stone-300">When your hat arrives, post it, tag @b40_designs and your dealership, then <a href="#contest" className="underline">submit your contest entry</a> to win 40 hats for your store.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Your Name *</label>
          <input type="text" name="name" required placeholder="First and last name" value={form.name} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input type="email" name="email" required placeholder="you@yourbusiness.com" value={form.email} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Phone / Text</label>
          <input type="tel" name="phone" placeholder="479-000-0000" value={form.phone} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Quantity *</label>
          <input type="number" name="quantity" required placeholder="How many hats?" min="1" value={form.quantity} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Hat Selection *</label>
        <select name="hat" required value={form.hat} onChange={handleChange} className={`${inputClass} bg-black`}>
          <option value="">Select a hat...</option>
          {lanes.map((lane) => (
            <optgroup key={lane} label={`── ${lane} ──`}>
              {hats.filter((h) => h.lane === lane).map((h) => (
                <option key={h.title} value={h.title}>{h.title}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Notes</label>
        <textarea name="notes" rows={3} placeholder="Color preference, business name, anything else..." value={form.notes} onChange={handleChange} className={`${inputClass} resize-none`} />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Text Darin at{" "}
          <a href="tel:479-544-1366" className="underline">479-544-1366</a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-stone-100 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Submit Pre-Order →"}
      </button>

      <p className="text-center text-xs text-stone-500">
        Payment link sent within 24 hours via Square.
        Questions? Text{" "}
        <a href="tel:479-544-1366" className="underline text-stone-400">479-544-1366</a>
      </p>
    </form>
  );
}

function ContestEntryForm() {
  const [status, setStatus] = React.useState("idle");
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    dealership: "",
    instagramHandle: "",
    postUrl: "",
    orderConfirmation: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${CONTEST_FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, source: "B40 Dealership Outfit Contest" }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", dealership: "", instagramHandle: "", postUrl: "", orderConfirmation: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-stone-500 transition focus:border-white/30 focus:outline-none";
  const labelClass = "block text-xs font-semibold uppercase tracking-[0.2em] mb-1.5 text-stone-400";

  if (status === "success") {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center">
        <p className="text-4xl mb-4">✓</p>
        <p className="text-xl font-semibold text-white mb-2">You're in.</p>
        <p className="text-sm text-stone-400">Entry received. Winner announced June 1st.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Your Name *</label>
          <input type="text" name="name" required placeholder="First and last name" value={form.name} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input type="email" name="email" required placeholder="you@yourbusiness.com" value={form.email} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Dealership Name *</label>
          <input type="text" name="dealership" required placeholder="Your dealership" value={form.dealership} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Instagram Handle *</label>
          <input type="text" name="instagramHandle" required placeholder="@yourhandle" value={form.instagramHandle} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Link to Your Post *</label>
        <input type="url" name="postUrl" required placeholder="https://instagram.com/p/..." value={form.postUrl} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Order Confirmation Info *</label>
        <input type="text" name="orderConfirmation" required placeholder="Name or email used on your pre-order" value={form.orderConfirmation} onChange={handleChange} className={inputClass} />
        <p className="mt-1 text-xs text-stone-600">Used to verify your purchase. Must have an active pre-order to enter.</p>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Text Darin at{" "}
          <a href="tel:479-544-1366" className="underline">479-544-1366</a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-2xl bg-white py-3.5 text-sm font-semibold text-stone-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-stone-100 disabled:opacity-60"
      >
        {status === "sending" ? "Submitting..." : "Submit My Entry →"}
      </button>
    </form>
  );
}

export default function PreOrderPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [lightbox, setLightbox] = React.useState(null);
  const formRef = React.useRef(null);

  const hatsWithImages = hats.filter((h) => h.image);

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden text-white">

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-[url('/images/pre-order-page.png')] bg-cover bg-center" />

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
          style={{ animation: "fadeIn 0.2s ease" }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-2xl w-full"
            style={{ animation: "scaleIn 0.25s ease" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={hatsWithImages[lightbox].image}
              alt={hatsWithImages[lightbox].title}
              className="w-full rounded-2xl border border-white/10 shadow-2xl"
            />
            <div className="mt-4 flex items-center justify-between px-1">
              <div>
                <p className="text-sm font-semibold text-white">{hatsWithImages[lightbox].title}</p>
                <p className="text-xs text-white/50">{hatsWithImages[lightbox].lane} · ${hatsWithImages[lightbox].price}</p>
              </div>
              <button onClick={() => setLightbox(null)} className="text-white/40 hover:text-white text-xs uppercase tracking-widest transition">
                Close ✕
              </button>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setLightbox(lightbox > 0 ? lightbox - 1 : hatsWithImages.length - 1)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs uppercase tracking-widest text-white/60 hover:text-white transition"
              >
                Prev
              </button>
              <button
                onClick={() => { setLightbox(null); formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                className="flex-1 rounded-xl bg-white py-2.5 text-xs uppercase tracking-widest text-black font-semibold hover:bg-stone-100 transition"
              >
                Pre-Order This Hat
              </button>
              <button
                onClick={() => setLightbox(lightbox < hatsWithImages.length - 1 ? lightbox + 1 : 0)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs uppercase tracking-widest text-white/60 hover:text-white transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-stone-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10 md:py-4">
          <Link href="/">
            <img src="/images/b402026.png" alt="Back 40 Designs" className="h-10 w-auto md:h-12" />
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
            <Link href="/dealership-series" className="text-white font-semibold">Dealership Series</Link>
            <Link href="/dealership-series/service-bay" className="transition hover:text-white">Service Bay</Link>
            <Link href="/dealership-series/front-line" className="transition hover:text-white">Front Line</Link>
            <Link href="/trail-series" className="transition hover:text-white">Trail Series</Link>
            <Link href="/#contact" className="transition hover:text-white">Contact</Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-stone-300 transition hover:bg-white/5 md:hidden"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-black/90 px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-4 text-sm text-stone-300">
              {[
                ["/dealership-series", "Dealership Series"],
                ["/dealership-series/service-bay", "Service Bay"],
                ["/dealership-series/front-line", "Front Line"],
                ["/trail-series", "Trail Series"],
                ["/#contact", "Contact"],
              ].map(([href, label]) => (
                <Link key={label} href={href} onClick={() => setMobileMenuOpen(false)} className="border-b border-white/5 pb-3 transition hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-20">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-red-400">
            B40 Dealership Series
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
            Pre-Order the Collection.
          </h1>
          <p className="mt-5 text-base leading-7 text-stone-300 sm:text-lg">
            First run. Limited units. We build when the orders are in.
          </p>

          <div className="mt-6 inline-flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-full border border-red-400/30 bg-red-400/10 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
              <p className="text-xs font-semibold uppercase tracking-widest text-red-400">
                Orders close May 31, 2026
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                Ships within 3 weeks of close
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-red-400/30 bg-red-400/10 backdrop-blur-sm p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-3">B40 Dealership Drop Giveaway</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
              One store gets outfitted.
              <br />
              <span className="text-red-400">Up to 40 hats. On us.</span>
            </h2>
            <p className="text-base sm:text-lg text-stone-300 mb-5">
              Buy a hat. Post it. Tag your store and <span className="text-white font-semibold">@b40_designs</span>. That's your entry.
              <br />
              Winner announced June 1st.
            </p>
            <a href="#contest" className="inline-flex items-center gap-2 rounded-2xl bg-red-500 px-6 py-3 text-sm font-semibold text-white hover:bg-red-400 transition hover:-translate-y-0.5">
              See how to enter →
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Acrylic Patch", "$40", "Tri-layer, full detail"],
              ["Leather Patch", "$30", "Clean, premium finish"],
              ["Bulk 12+", "$35 / $27", "Acrylic / Leather"],
            ].map(([label, price, sub]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-4">
                <p className="text-xs uppercase tracking-widest text-stone-500">{label}</p>
                <p className="mt-1 text-2xl font-semibold text-white">{price}</p>
                <p className="mt-0.5 text-xs text-stone-400">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HAT GRID BY LANE */}
      {lanes.map((lane) => (
        <section key={lane} className="mx-auto max-w-7xl px-5 pb-14 md:px-10 md:pb-20">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500">{laneDescriptions[lane]}</p>
              <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">{lane}</h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {hats.filter((h) => h.lane === lane).map((hat) => {
              const imgIndex = hatsWithImages.findIndex((h) => h.title === hat.title);
              return (
                <div key={hat.title} className="group rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm overflow-hidden transition hover:-translate-y-1">
                  <div
                    className={`relative overflow-hidden ${hat.image ? "cursor-zoom-in" : ""}`}
                    onClick={() => hat.image && setLightbox(imgIndex)}
                  >
                    {hat.image ? (
                      <>
                        <img
                          src={hat.image}
                          alt={hat.title}
                          className="w-full object-cover max-h-56 transition duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition duration-300">
                          <span className="opacity-0 group-hover:opacity-100 transition duration-300 text-xs uppercase tracking-widest text-white bg-black/50 px-3 py-1.5 rounded-full border border-white/20">
                            Tap to expand
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center bg-white/[0.03] border-b border-white/10">
                        <div className="text-center">
                          <p className="text-xs uppercase tracking-widest text-stone-600">Coming Soon</p>
                          <p className="mt-1 text-[10px] text-stone-700">Photo dropping before launch</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="rounded-full bg-red-400/20 border border-red-400/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-red-400">
                        Pre-Order
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-1">{hat.lane}</p>
                    <h3 className="text-base font-semibold text-white leading-snug">{hat.title}</h3>
                    <p className="mt-1 text-sm text-stone-400 italic">{hat.subtitle}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-lg font-semibold text-white">${hat.price}</p>
                      <p className="text-xs text-stone-500">${hat.bulkPrice} ea at 12+</p>
                    </div>
                    <button
                      onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                      className="mt-4 w-full rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-stone-100"
                    >
                      Pre-Order This Hat →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* PRE-ORDER FORM */}
      <section ref={formRef} className="mx-auto max-w-7xl px-5 pb-20 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">

          <div className="rounded-[2rem] border border-white/10 bg-black/30 backdrop-blur-sm p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-stone-500 mb-3">How it works</p>
            <h2 className="text-2xl font-semibold text-white mb-6">Reserve your hat.</h2>
            <div className="space-y-5">
              {[
                ["01", "Submit your order", "Fill out the form with your hat selection and quantity."],
                ["02", "Receive payment link", "Darin will send a Square payment link within 24 hours."],
                ["03", "We build it", "Orders close May 31. We build your run after cutoff."],
                ["04", "Ships mid-June", "Expect delivery within 3 weeks of the order close date."],
              ].map(([step, title, desc]) => (
                <div key={step} className="flex gap-4">
                  <p className="text-xs font-bold text-stone-600 mt-0.5 w-5 shrink-0">{step}</p>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-0.5 text-sm text-stone-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs uppercase tracking-widest text-stone-500 mb-3">Questions?</p>
              <a href="tel:479-544-1366" className="flex items-center gap-2 text-sm text-stone-300 hover:text-white transition">
                📞 479-544-1366
              </a>
              <a href="mailto:info@back40designco.com" className="flex items-center gap-2 text-sm text-stone-300 hover:text-white transition mt-2">
                ✉ info@back40designco.com
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-black/30 backdrop-blur-sm px-6 py-8 text-white md:px-8 md:py-10">
            <p className="text-xs uppercase tracking-[0.25em] text-stone-400 mb-2">Pre-Order Form</p>
            <h2 className="text-2xl font-semibold text-white mb-6">
              Reserve your hat
            </h2>
            <PreOrderForm />
          </div>

        </div>
      </section>

      {/* CONTEST SECTION */}
      <section id="contest" className="mx-auto max-w-7xl px-5 pb-20 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">

          <div className="rounded-[2rem] border border-red-400/20 bg-black/30 backdrop-blur-sm p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-red-400 mb-3">B40 Dealership Drop Giveaway</p>
            <h2 className="text-2xl font-semibold text-white mb-2">One store gets outfitted.</h2>
            <p className="text-sm text-stone-400 mb-6">Up to 40 hats. On us. Winner announced June 1st.</p>

            <div className="space-y-5">
              {[
                ["01", "Buy a hat", "Place a pre-order for any hat in the B40 Dealership Series."],
                ["02", "Post it", "When your hat arrives, post a photo on Instagram."],
                ["03", "Tag your store", "Tag @b40_designs and your dealership in the post."],
                ["04", "Submit your entry", "Fill out the form with your post link and order info."],
              ].map(([step, title, desc]) => (
                <div key={step} className="flex gap-4">
                  <p className="text-xs font-bold text-red-400/60 mt-0.5 w-5 shrink-0">{step}</p>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-0.5 text-sm text-stone-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
              <p className="text-xs uppercase tracking-widest text-stone-500 mb-3">Entry rules</p>
              {[
                "Must have an active pre-order to enter",
                "Tag @b40_designs and your dealership in post",
                "One entry per purchase",
                "Bonus entry for tagging your dealership's account",
                "Contest closes May 31, 2026",
                "Winner announced June 1st",
                "Prize: up to 40 B40 hats for your dealership staff",
              ].map((rule) => (
                <p key={rule} className="text-xs text-stone-500 flex gap-2">
                  <span className="text-red-400/60">—</span> {rule}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-red-400/20 bg-gradient-to-br from-stone-100 to-stone-200 px-6 py-8 text-stone-950 md:px-8 md:py-10">
            <p className="text-xs uppercase tracking-[0.25em] text-stone-500 mb-2">Contest Entry</p>
            <h2 className="text-2xl font-semibold text-stone-950 mb-2">Submit your entry.</h2>
            <p className="text-sm text-stone-600 mb-6">
              Already ordered and posted? Fill this out to lock in your spot.
            </p>
            <ContestEntryForm />
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-5 py-8 text-sm text-stone-500 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Back 40 Designs. Custom headwear with story and identity.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a href="tel:479-544-1366" className="transition hover:text-stone-300">479-544-1366</a>
            <Link href="/dealership-series" className="transition hover:text-stone-300">Dealership Series</Link>
            <Link href="/trail-series" className="transition hover:text-stone-300">Trail Series</Link>
            <Link href="/" className="transition hover:text-stone-300">Back to Home</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
