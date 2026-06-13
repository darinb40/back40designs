'use client';

import React from 'react';

// ── EDIT THESE IF NEEDED ─────────────────────────────────────────
const PRICE = "$45";              // <-- PLACEHOLDER. Set the real price before you go live.
const FORMSPREE_ID = "xzdywzvy";  // <-- your existing Formspree form. Swap for a dedicated one if you want these fully separate.
// ─────────────────────────────────────────────────────────────────

const phoneLink = "tel:479-544-1366";
const phoneNumber = "479-544-1366";

// ── Pre-Order Form ───────────────────────────────────────────────
function PreOrderForm() {
  const [status, setStatus] = React.useState("idle");
  const [form, setForm] = React.useState({ name: "", email: "", phone: "", quantity: "", message: "" });

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _subject: "Dante Scavone Hat - Pre-Order" }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", quantity: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full rounded-2xl border border-stone-300/60 bg-white/70 px-4 py-3 text-sm text-stone-900 placeholder-stone-500 transition focus:border-stone-600 focus:outline-none";
  const labelClass = "block text-xs font-semibold uppercase tracking-[0.2em] mb-1.5 text-stone-600";

  if (status === "success") {
    return (
      <div className="rounded-[2rem] border border-stone-300/40 bg-white/60 p-8 text-center">
        <p className="text-3xl mb-3">✓</p>
        <p className="text-lg font-semibold text-stone-900">Pre-order received.</p>
        <p className="mt-2 text-sm text-stone-600">
          Darin will send you a secure payment link by text or email within 1-2 business days to lock in your hat. Nothing has been charged yet. Questions? Text{" "}
          <a href={phoneLink} className="font-semibold underline">{phoneNumber}</a>.
        </p>
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
          <input type="email" name="email" required placeholder="you@email.com" value={form.email} onChange={handleChange} className={inputClass} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Phone / Text *</label>
          <input type="tel" name="phone" required placeholder="479-000-0000" value={form.phone} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>How many? *</label>
          <select name="quantity" required value={form.quantity} onChange={handleChange} className={`${inputClass} bg-white/80`}>
            <option value="">Select...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5+">5 or more</option>
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass}>Anything else? (optional)</label>
        <textarea name="message" rows={3} placeholder="Questions, special requests, or how you heard about the drop..." value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-500">
          Something went wrong. Text Darin directly at{" "}
          <a href={phoneLink} className="underline">{phoneNumber}</a> or email{" "}
          <a href="mailto:info@back40designco.com" className="underline">info@back40designco.com</a>.
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className="w-full rounded-2xl bg-stone-950 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-stone-800 disabled:opacity-60">
        {status === "sending" ? "Sending..." : "Reserve My Hat"}
      </button>
      <p className="text-center text-xs text-stone-500">
        No payment is taken on this form. You'll get a secure pay link after you submit.
      </p>
    </form>
  );
}

// ── Page ─────────────────────────────────────────────────────────
export default function DanteScavonePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const specs = [
    "7-panel rope hat with braided teal rope detail",
    "Light grey performance body with perforated back panels",
    "Old-school camo brim and back panels",
    "Copper engraved patch: longhorn, revolver, poker hand, barbwire, and DS initials",
    "Adjustable snapback, one size fits most",
    "B40 woven side tag",
  ];

  const steps = [
    ["01", "Reserve yours", "Fill out the short form below. Takes about 30 seconds and costs nothing."],
    ["02", "Get your pay link", "Darin sends you a secure payment link by text or email within 1-2 business days."],
    ["03", "It ships", "Once the limited run is produced, your hat ships straight to your door."],
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-stone-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10 md:py-4">
          <a href="/">
            <img src="/images/b402026.png" alt="Back 40 Designs" className="h-10 w-auto md:h-12" />
          </a>
          <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
            <a href="/trail-series" className="transition hover:text-white">Shop</a>
            <a href="/trail-series" className="transition hover:text-white">Trail Series</a>
            <a href="/dealership-series" className="transition hover:text-white">Dealership Series</a>
            <a href="/gallery" className="transition hover:text-white">Gallery</a>
            <a href="#preorder" className="transition hover:text-white">Pre-Order</a>
          </nav>
          <div className="flex items-center gap-2 md:gap-3">
            <a href="#preorder" className="inline-flex items-center gap-1.5 rounded-2xl bg-[#c6a36b] px-3 py-2 text-xs font-semibold text-black shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d4b07a] md:px-4 md:text-sm">
              Pre-Order
            </a>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-lg p-2 text-stone-300 transition hover:bg-white/5 md:hidden" aria-label="Toggle menu">
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-stone-950 px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-4 text-sm text-stone-300">
              {[
                ["/trail-series", "Shop"],
                ["/trail-series", "Trail Series"],
                ["/dealership-series", "Dealership Series"],
                ["/gallery", "Gallery"],
                ["#preorder", "Pre-Order"],
              ].map(([href, label]) => (
                <a key={label} href={href} onClick={() => setMobileMenuOpen(false)} className="border-b border-white/5 pb-3 transition hover:text-white">{label}</a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="border-b border-white/10 bg-stone-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 md:items-center md:px-10 md:py-16">
          <div className="overflow-hidden rounded-[2rem] border border-[#c6a36b]/30 shadow-2xl">
            <img src="/images/dante-scavone.jpg" alt="Dante Scavone official hat release, limited run available now" className="block w-full object-cover" />
          </div>
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#c6a36b]">Limited Release · Pre-Order</p>
            <h1 className="text-5xl font-black uppercase leading-[0.95] md:text-7xl" style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}>
              The Dante<br />Scavone Hat
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-stone-300 md:text-lg">
              A limited B40 build for Dante Scavone. 7-panel rope hat, copper engraved patch, old-school camo. Made in a small run, so reserve yours before it's gone.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-3xl font-bold text-white">{PRICE}</span>
              <span className="rounded-full border border-[#c6a36b]/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c6a36b]">Limited run</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#preorder" className="inline-flex items-center gap-2 rounded-2xl bg-[#c6a36b] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-black shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d4b07a]">
                Reserve Yours →
              </a>
              <a href={phoneLink} className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-stone-100 transition hover:bg-white/5">
                Text {phoneNumber}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECS ── */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-10 md:py-20">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-stone-400">The Build</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">What you're getting.</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {specs.map((s) => (
            <div key={s} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
              <span className="mt-0.5 text-[#c6a36b]">▣</span>
              <p className="text-sm leading-7 text-stone-300">{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW PRE-ORDER WORKS ── */}
      <section className="border-y border-white/10 bg-stone-900/40">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-10 md:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.25em] text-stone-400">How Pre-Order Works</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Simple and no risk.</h2>
            <p className="mt-4 text-base leading-7 text-stone-300">
              This is a pre-order for a limited run. You reserve your hat now and only pay once Darin sends your secure payment link. No card info is entered on this page.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {steps.map(([num, title, text]) => (
              <div key={num} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500">{num}</p>
                <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRE-ORDER FORM ── */}
      <section id="preorder" className="mx-auto max-w-3xl px-4 py-14 md:px-10 md:py-20">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-stone-100 to-stone-200 px-6 py-8 text-stone-950 shadow-2xl md:px-10 md:py-10">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-600">Reserve Yours</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Pre-order the Dante Scavone hat.</h2>
          <p className="mt-2 mb-6 text-sm leading-6 text-stone-600">
            Fill this out and Darin will send a secure pay link within 1-2 business days. {PRICE} each. Limited run.
          </p>
          <PreOrderForm />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 px-4 py-8 text-sm text-stone-500 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-stone-300">Back 40 Designs</p>
            <p>© 2026 Back 40 Designs. Custom headwear with story and identity.</p>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a href={phoneLink} className="transition hover:text-stone-300">{phoneNumber}</a>
            <a href="mailto:info@back40designco.com" className="transition hover:text-stone-300">Email</a>
            <a href="https://www.instagram.com/b40_designs/" target="_blank" rel="noreferrer" className="transition hover:text-stone-300">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61574511363635" target="_blank" rel="noreferrer" className="transition hover:text-stone-300">Facebook</a>
            <a href="/trail-series" className="transition hover:text-stone-300">Shop</a>
            <a href="/privacy" className="transition hover:text-stone-300">Privacy Policy</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
