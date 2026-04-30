  'use client';

import React from 'react';

// ─── Icon Components ────────────────────────────────────────────────
const ArrowRight = ({ className = "h-4 w-4" }) => <span className={className}>→</span>;
const InstagramIcon = ({ className = "h-4 w-4" }) => <span className={className}>◎</span>;
const MailIcon = ({ className = "h-4 w-4" }) => <span className={className}>✉</span>;
const MountainIcon = ({ className = "h-5 w-5" }) => <span className={className}>△</span>;
const ShieldCheckIcon = ({ className = "h-5 w-5" }) => <span className={className}>⬢</span>;
const StoreIcon = ({ className = "h-5 w-5" }) => <span className={className}>▣</span>;

// ─── Background Overlays ────────────────────────────────────────────
function HeavyTopoOverlay({ opacity = "opacity-55", dark = "bg-black/65" }) {
  return (
    <>
      <div className={`absolute inset-0 bg-[url('/images/topo-heavy.png')] bg-cover bg-center ${opacity}`} />
      <div className={`absolute inset-0 ${dark}`} />
    </>
  );
}

function LineTopoOverlay({ opacity = "opacity-20", dark = "bg-black/75" }) {
  return (
    <>
      <div className={`absolute inset-0 bg-[url('/images/topo-lines.png')] bg-cover bg-center ${opacity}`} />
      <div className={`absolute inset-0 ${dark}`} />
    </>
  );
}

// ─── Contact Form Component ─────────────────────────────────────────
const FORMSPREE_ID = "YOUR_FORM_ID";

function ContactForm({ light = false }) {
  const [status, setStatus] = React.useState("idle");
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    quantity: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", projectType: "", quantity: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const base = light
    ? "bg-white/60 border-stone-300/60 text-stone-900 placeholder-stone-500 focus:border-stone-600"
    : "bg-white/5 border-white/10 text-white placeholder-stone-500 focus:border-white/30";

  const inputClass = `w-full rounded-2xl border px-4 py-3 text-sm transition focus:outline-none ${base}`;
  const labelClass = `block text-xs font-semibold uppercase tracking-[0.2em] mb-1.5 ${light ? "text-stone-600" : "text-stone-400"}`;

  if (status === "success") {
    return (
      <div className={`rounded-[2rem] border p-8 text-center ${light ? "border-stone-300/40 bg-white/50" : "border-white/10 bg-white/5"}`}>
        <p className="text-3xl mb-3">✓</p>
        <p className={`text-lg font-semibold ${light ? "text-stone-900" : "text-white"}`}>
          Message received.
        </p>
        <p className={`mt-2 text-sm ${light ? "text-stone-600" : "text-stone-400"}`}>
          Darin will be in touch within 1-2 business days. You can also text or call directly at{" "}
          <a href="tel:479-544-1366" className="underline">479-544-1366</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Your Name *</label>
          <input
            type="text"
            name="name"
            required
            placeholder="First and last name"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@yourbusiness.com"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Phone / Text</label>
          <input
            type="tel"
            name="phone"
            placeholder="479-000-0000"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Project Type</label>
          <select
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            className={`${inputClass} ${light ? "bg-white/60" : "bg-stone-900"}`}
          >
            <option value="">Select one...</option>
            <option value="Business Merch">Business / Brand Merch</option>
            <option value="Trail Series">Trail Series / Outdoor</option>
            <option value="Legacy Build">Legacy / Personal Build</option>
            <option value="Dealership Series">Dealership Series</option>
            <option value="Event / Team">Event or Team Order</option>
            <option value="Not Sure">Not Sure Yet</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Estimated Quantity</label>
        <select
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          className={`${inputClass} ${light ? "bg-white/60" : "bg-stone-900"}`}
        >
          <option value="">Select a range...</option>
          <option value="1-11">1-11 (one-off / small run)</option>
          <option value="12-24">12-24</option>
          <option value="25-48">25-48</option>
          <option value="49-99">49-99</option>
          <option value="100+">100+</option>
          <option value="Not Sure">Not sure yet</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Tell me about the project *</label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Business name, what you're going for, any logo details, deadline, or whatever comes to mind..."
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Text Darin directly at{" "}
          <a href="tel:479-544-1366" className="underline">479-544-1366</a> or email{" "}
          <a href="mailto:info@back40designco.com" className="underline">info@back40designco.com</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className={`w-full rounded-2xl py-3.5 text-sm font-semibold shadow-lg transition hover:-translate-y-0.5 disabled:opacity-60 ${
          light
            ? "bg-stone-950 text-white hover:bg-stone-800"
            : "bg-white text-stone-950 hover:bg-stone-100"
        }`}
      >
        {status === "sending" ? "Sending..." : "Send Project Inquiry"}
      </button>

      <p className={`text-center text-xs ${light ? "text-stone-500" : "text-stone-500"}`}>
        Or text / call directly:{" "}
        <a href="tel:479-544-1366" className={`font-semibold underline ${light ? "text-stone-700" : "text-stone-300"}`}>
          479-544-1366
        </a>
      </p>
    </form>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────
export default function Back40LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const shopLink = "https://back40-headwear.myshopify.com/collections/b40-trail-series";
  const instagramLink = "https://www.instagram.com/b40_designs/";
  const facebookLink = "https://www.facebook.com/";
  const phoneLink = "tel:479-544-1366";
  const phoneNumber = "479-544-1366";

  const pillars = [
    {
      title: "Purpose",
      text: "Every build starts with a reason. A business, a place, a memory, or a story worth putting on a hat.",
      icon: "/images/purpose.png",
    },
    {
      title: "Quality",
      text: "Patch-forward headwear built with clean execution, premium materials, and a finish that feels intentional.",
      icon: "/images/quality.png",
    },
    {
      title: "Identity",
      text: "Back 40 designs are made to stand out and actually say something about the person, brand, or place behind them.",
      icon: "/images/identity.png",
    },
  ];

  const collections = [
    {
      title: "Trail Series",
      eyebrow: "Signature Line",
      description: "Topo-driven hats inspired by Arkansas trails, ridgelines, and the outdoor culture that built the brand.",
      icon: MountainIcon,
      image: "/images/holding-hero.jpg",
      link: "/trail-series",
    },
    {
      title: "Business Merch",
      eyebrow: "For Shops & Brands",
      description: "Custom hats for local businesses, bike shops, restaurants, events, and teams that want merch with real identity.",
      icon: StoreIcon,
      image: "/images/psv-hat.jpg",
      link: "/gallery",
    },
    {
      title: "Legacy Builds",
      eyebrow: "One-Off Projects",
      description: "Story-driven pieces built from places, memories, family history, and meaningful details worth preserving.",
      icon: ShieldCheckIcon,
      image: "/images/legacy-hat.jpg",
      link: "/gallery",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Start with the idea",
      text: "Send a logo, a concept, a business name, or even just the vibe you want. That is enough to get moving.",
      icon: "/images/lightbulb.png",
    },
    {
      step: "02",
      title: "Shape the build",
      text: "We dial in patch style, hat choice, materials, and layout until the design feels right and fits the brand.",
      icon: "/images/shape.png",
    },
    {
      step: "03",
      title: "Bring it to life",
      text: "Once approved, the run is built with a clean, premium finish made to be worn — not forgotten.",
      icon: "/images/life.png",
    },
  ];

  const faqs = [
    {
      q: "What do I need to get started?",
      a: "A logo, rough idea, business name, quantity, or even just the overall direction is enough to start the conversation.",
    },
    {
      q: "Do you work with businesses and local brands?",
      a: "Yes. Back 40 is built for shops, restaurants, events, dealerships, teams, and local brands that want better merch.",
    },
    {
      q: "Can you do one-off special projects too?",
      a: "Yes. Some of the best builds come from personal stories, landmarks, family history, and custom legacy pieces.",
    },
    {
      q: "How long does production take?",
      a: "Standard production is 3-4 weeks. Rush production is available for projects with a tighter deadline.",
    },
    {
      q: "What's the minimum order?",
      a: "No minimums. We build small runs and one-off custom pieces. Scale up as you grow.",
    },
  ];

  const testimonials = [
    {
      name: "Trey Lee",
      role: "Business Owner",
      text: "Ordering branded items for my business used to be a challenge until I started working with Back 40 Designs. Their communication is excellent, and the quality of the shirts and hats I've received has been outstanding. I highly recommend reaching out to them for your business needs.",
      rating: 5,
    },
    {
      name: "Jonathan Woolbright",
      role: "Woolbright Auto Glass",
      text: "Back 40 Designs put together work shirts and ballcaps for Woolbright Auto Glass. Did a great job outfitting our team!",
      rating: 5,
    },
    {
      name: "All American PDR",
      role: "Company",
      text: "Consistently outstanding experience. I've ordered both hats and shirts, and the quality, along with the speed of delivery, far exceeds others in the area. I highly recommend getting your gear here.",
      rating: 5,
    },
    {
      name: "Scott Clark",
      role: "Customer",
      text: "Badass hats made custom by a badass individual. Highly recommend!",
      rating: 5,
    },
  ];

  const homeGallery = [
    { title: "Jesters Privilege", image: "/images/jester.jpg" },
    { title: "Trail Series — Dragon Scales", image: "/images/dragon-scales.jpg" },
    { title: "Back 40 Loop", image: "/images/topo-row.jpg" },
    { title: "Gravette Bad Bananas", image: "/images/bad-bananas.jpg" },
    { title: "B40 Collection", image: "/images/b40-stack.JPG" },
    { title: "Pinnacle Sports", image: "/images/pinnacle.JPG" },
    { title: "Little Sugar — Bella Vista", image: "/images/little-sugar-held.jpg" },
    { title: "Hubcap Kid", image: "/images/hubccap-kid.JPG" },
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-stone-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10 md:py-4">

          {/* Logo */}
          <a href="/">
            <div className="flex flex-col leading-none">
              <span
                className="text-xl font-black uppercase tracking-[0.12em] text-white md:text-2xl"
                style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" }}
              >
                Back 40
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-stone-400 md:text-[10px]">
                Headwear.
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
            <a href={shopLink} target="_blank" rel="noreferrer" className="transition hover:text-white">Shop</a>
            <a href="/trail-series" className="transition hover:text-white">Trail Series</a>
            <a href="/dealership-series" className="transition hover:text-white">Dealership Series</a>
            <a href="/gallery" className="transition hover:text-white">Gallery</a>
            <a href="#contact" className="transition hover:text-white">Custom Orders</a>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-stone-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-stone-100 md:px-4 md:text-sm"
            >
              Start a Project
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-stone-300 transition hover:bg-white/5 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-stone-950 px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-4 text-sm text-stone-300">
              <a
                href={shopLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-white/5 pb-3 transition hover:text-white"
              >
                Shop
              </a>
              <a
                href="/trail-series"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-white/5 pb-3 transition hover:text-white"
              >
                Trail Series
              </a>
              <a
                href="/dealership-series"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-white/5 pb-3 transition hover:text-white"
              >
                Dealership Series
              </a>
              <a
                href="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-white/5 pb-3 transition hover:text-white"
              >
                Gallery
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-white/5 pb-3 transition hover:text-white"
              >
                Custom Orders
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
<section className="relative overflow-hidden border-b border-white/10">
     <div className="absolute inset-0 bg-[url('/images/welcome-bg.png')] bg-cover bg-[center_30%]" />
      <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-10 md:px-10 md:pb-24 md:pt-16">
            <img
              src="/images/logo.png"
              alt="Back 40 Designs"
              className="mb-5 w-36 md:w-64 lg:w-72"
            />

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-stone-400 md:text-sm">
              A story worth wearing.
            </p>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Not just hats.
              <br />
              <span className="font-bold text-white">
                Built for people who actually have something to say.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-300 md:text-lg md:leading-8">
              Back 40 Designs creates premium patch-forward hats for local brands, businesses,
              and real-world stories that deserve more than generic merch.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-stone-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-stone-100"
              >
                Request a Quote
              </a>
              <a
                href={shopLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-stone-100 transition hover:bg-white/5"
              >
                Shop Hats
              </a>
            </div>
            </section>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Custom acrylic and leatherette patch hats",
                "Built for local brands, events, shops, and collabs",
                "Small-run friendly and story-driven by design",
                "Made to feel personal, not pulled from a template",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/35 p-4 text-sm leading-6 text-stone-300 backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

      {/* ── PARTNER LOGOS ── */}
      <section className="border-b border-white/10 bg-stone-900/40">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-10 md:py-14">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
              Trusted by leading brands
            </p>
            <p className="mt-2 text-sm text-stone-400">
              Official partners with Pinnacle Sports Ventures, Bentonville Bicycle Co., and LoneStar Adhesive
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-20">
            <a href="https://pinnaclesportsventures.com" target="_blank" rel="noreferrer" className="opacity-70 transition hover:opacity-100">
              <img src="/images/psv.png" alt="Pinnacle Sports Ventures" className="h-16 w-auto object-contain md:h-28" />
            </a>
            <a href="https://www.bentonvillebicyclecompany.com" target="_blank" rel="noreferrer" className="opacity-70 transition hover:opacity-100">
              <img src="/images/bentonville-bicycle-logo.png" alt="Bentonville Bicycle Co." className="h-16 w-auto object-contain md:h-28" />
            </a>
            <a href="https://lonestaradhesive.com" target="_blank" rel="noreferrer" className="opacity-70 transition hover:opacity-100">
              <img src="/images/lonestar.png" alt="LoneStar Adhesive" className="h-16 w-auto object-contain md:h-28" />
            </a>
          </div>
        </div>
      </section>

      {/* ── DEALERSHIP SERIES ── */}
      <section id="dealership-series" className="relative overflow-hidden border-b border-white/10">
        <HeavyTopoOverlay opacity="opacity-55" dark="bg-black/80" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 py-16 md:px-10 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-red-400 md:text-sm">New Collection</p>
            <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">B40 Dealership Series</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-300 md:text-xl md:leading-8">
              Built for the people who live inside the car business — from the clean front line, to the service bay, to the back lot where the real stories happen.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Front Line", "Clean, customer-facing dealership gear."],
                ["Service Bay", "Built for the techs and the shop floor."],
                ["Back Lot", "Insider-only car business culture."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur">
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-400">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/dealership-series" className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-stone-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-stone-100">Enter the Series</a>
              <a href="/dealership-series/backlot" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-stone-100 transition hover:bg-white/5">Back Lot Access</a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-black/45 p-3 shadow-2xl backdrop-blur md:p-5">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-stone-950">
              <img src="/images/hat-lineup.jpg" alt="B40 Dealership Series hat lineup" className="h-full w-full object-cover" />
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500">Built by one of you</p>
              <p className="mt-2 text-sm leading-6 text-stone-300">Sales floor. Finance. Management. Back lot. This collection was made from inside the business — not from a catalog.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section id="pillars" className="mx-auto max-w-7xl px-4 py-14 md:px-10 md:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-stone-400">The foundation</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            The <span className="font-bold text-white">3 Pillars</span> of Back 40 Designs.
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-300 md:text-lg md:leading-8">
            Everything built here runs through the same filter:{" "}
            <strong className="text-white">purpose</strong>,{" "}
            <strong className="text-white">quality</strong>, and{" "}
            <strong className="text-white">identity</strong>.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {pillars.map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl md:p-7">
              <img src={item.icon} alt={item.title} className="mb-6 h-20 w-20 object-contain md:h-28 md:w-28" />
              <h3 className="text-xl font-semibold text-white md:text-2xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-stone-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BRAND MEANING CALLOUT ── */}
      <section className="relative border-y border-white/10">
        <LineTopoOverlay opacity="opacity-15" dark="bg-black/80" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 md:px-10 md:py-20">
          <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-stone-950/70 p-6 backdrop-blur md:grid-cols-[0.9fr_1.1fr] md:gap-8 md:p-10">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-stone-400">What Back 40 means</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Merch should feel like it belongs to your brand.
              </h2>
            </div>
            <div className="space-y-5 text-sm leading-7 text-stone-300 md:text-base md:leading-8">
              <p>
                Back 40 is built around the idea that the best hats carry something with them — a
                place, a business, a memory, or a message people actually connect to.
              </p>
              <p>
                That means stronger concepts, cleaner execution, and a final product that feels
                intentional from the first look to the final stitch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS ── */}
      <section id="collections" className="mx-auto max-w-7xl px-4 py-14 md:px-10 md:py-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Collections</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Built for brands, stories, and repeatable merch wins.
            </h2>
          </div>
          <p className="max-w-xl leading-7 text-stone-300">
            Whether you need a signature hat for your business or a one-off project with a story
            behind it, Back 40 is built to make it wearable.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {collections.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.title}
                href={item.link}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-stone-900/70 shadow-xl transition hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5 md:p-7">
                  <p className="text-xs uppercase tracking-[0.25em] text-stone-500">{item.eyebrow}</p>
                  <div className="my-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-stone-950">
                    <Icon className="h-5 w-5 text-stone-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white md:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-300">{item.description}</p>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="work" className="bg-stone-950">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-10 md:py-20">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Past Work</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                A look at past builds, collaborations, and custom work.
              </h2>
              <p className="mt-4 max-w-xl text-stone-300">
                Built for brands, shops, and projects that need more than generic merch.
              </p>
            </div>
            <a href="/gallery" className="inline-flex w-fit items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5">
              See All Builds <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {homeGallery.map((item) => (
              <a key={item.title} href="/gallery" className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-stone-900 transition hover:-translate-y-1 md:rounded-[2rem]">
                <div className="aspect-square overflow-hidden">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-white leading-snug md:text-base">{item.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="mx-auto max-w-7xl px-4 py-14 md:px-10 md:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Process</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Simple, clean, and built around custom work.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {process.map((item) => (
            <div key={item.step} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-7">
              <img src={item.icon} alt={item.title} className="mb-5 h-20 w-20 object-contain md:h-28 md:w-28" />
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500">{item.step}</p>
              <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-stone-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY BACK 40 ── */}
      <section className="relative border-y border-white/10">
        <LineTopoOverlay opacity="opacity-15" dark="bg-black/80" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 py-14 md:px-10 md:py-20 lg:grid-cols-2 lg:gap-10 lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Why Back 40</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              <span className="font-bold text-white">Not</span> just another hat company.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-stone-300 md:text-lg md:leading-8">
              The best custom gear feels personal. Back 40 focuses on hats that connect to a place,
              a business, a memory, or a brand identity people actually care about.
            </p>
            <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
              <img
                src="/images/jester.jpg"
                alt="Jesters Privilege — custom commission by Back 40 Designs"
                className="w-full object-cover"
              />
              <div className="border-t border-white/10 bg-black/60 px-5 py-3 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Custom Commission</p>
                <p className="mt-0.5 text-sm font-semibold text-stone-200">Jesters Privilege — Legacy Build</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              ["Intentional Design", "Each concept is built to feel original, not pulled from a generic catalog or filler template."],
              ["Strong Patch Aesthetic", "Acrylic and leatherette patch styles give every build a clean, premium, signature look."],
              ["Built for Real Brands", "Perfect for owners, teams, and creators who want merch people actually wear more than once."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.75rem] border border-white/10 bg-stone-950/80 p-5 backdrop-blur md:p-6">
                <h3 className="text-lg font-semibold text-white md:text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-stone-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="mx-auto max-w-7xl border-b border-white/10 px-4 py-14 md:px-10 md:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-stone-400">Customer Reviews</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Real people, real feedback.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-7">
              <div className="mb-4 flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="mb-6 text-sm leading-7 text-stone-300 md:text-base">"{t.text}"</p>
              <p className="font-semibold text-white">{t.name}</p>
              <p className="text-sm text-stone-400">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ + CONTACT FORM ── */}
      <section id="contact" className="relative">
        <HeavyTopoOverlay opacity="opacity-40" dark="bg-black/65" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 md:px-10 md:py-20">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">

            {/* FAQ */}
            <div className="rounded-[2rem] border border-white/10 bg-stone-900/80 p-6 backdrop-blur md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Questions</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                What buyers usually want to know.
              </h2>
              <div className="mt-8 space-y-4">
                {faqs.map((item) => (
                  <div key={item.q} className="rounded-[1.5rem] border border-white/10 bg-stone-950/90 p-5">
                    <p className="text-base font-semibold text-stone-100 md:text-lg">{item.q}</p>
                    <p className="mt-2 text-sm leading-7 text-stone-300">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-stone-100 to-stone-200 px-6 py-8 text-stone-950 shadow-2xl md:px-10 md:py-10">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-600">Let's build something</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                Start your project here.
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone-600 mb-6">
                Fill out the form and Darin will be in touch within 1-2 business days. Prefer to talk?
                Call or text directly at{" "}
                <a href={phoneLink} className="font-semibold text-stone-900 underline">
                  {phoneNumber}
                </a>.
              </p>
              <ContactForm light={true} />
            </div>

          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section id="story" className="border-t border-white/10 bg-black px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-12">
            <div className="flex flex-col gap-4">
              <div className="w-full overflow-hidden rounded-2xl border border-white/20 bg-black p-1">
                <img src="/images/papa-fuzzy.jpg" alt="Papa Fuzzy" className="block w-full scale-[1.02]" />
              </div>
              <div className="w-full overflow-hidden rounded-2xl border border-white/20 bg-black p-1">
                <img src="/images/bentonville-bicycle.JPG" alt="Back 40 at Bentonville Bicycle Co." className="block w-full rounded-2xl object-cover" />
              </div>
            </div>
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">
                Built from something real
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                Back 40 wasn't built overnight.
              </h2>
              <div className="mt-8 space-y-6 text-base leading-7 text-stone-300 md:text-lg md:leading-8">
                <p>It started long before I ever made my first hat.</p>
                <p>
                  Growing up, my grandfather —{" "}
                  <strong className="text-white">James E. McKeel, "Papa Fuzzy"</strong> — always had a hat on.
                  Every day it was a different one. He would get excited to show me when he got a new one,
                  and before long, I too became obsessed with buying hats, just like him.
                </p>
                <p>
                  Just about every picture I have of him, he is wearing a hat — except one. The family photo.
                  One of his rare moments without one on.
                </p>
                <p>
                  He was a hard worker — a baker for most of his life — up before the sun came up, putting
                  on his white work hat and heading out the door. Then he would come home, change
                  hats, and give everything he had to his grandchildren.
                </p>
                <p className="font-medium text-white">Being his first, I felt that first hand.</p>
                <p>
                  Back 40 comes from that same place. This brand is about more than headwear — it's about
                  building something with meaning. Something honest. Something that reflects the people, places,
                  and stories that matter most.
                </p>
                <p className="font-semibold uppercase tracking-[0.14em] text-white">
                  Every hat, every patch, and every design carries that mindset.
                </p>
              </div>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur md:mt-10 md:p-6">
                <p className="text-lg font-semibold text-white">
                  More than a hat. <span className="font-bold">A story worth wearing.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative overflow-hidden border-t border-white/10 px-4 py-8 text-sm text-stone-500 md:px-10">
        <LineTopoOverlay opacity="opacity-10" dark="bg-black/85" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-stone-300">Back 40 Designs</p>
            <p>© 2026 Back 40 Designs. Custom headwear with story and identity.</p>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a href={phoneLink} className="transition hover:text-stone-300">{phoneNumber}</a>
            <a href="mailto:info@back40designco.com" className="transition hover:text-stone-300">Email</a>
            <a href={instagramLink} target="_blank" rel="noreferrer" className="transition hover:text-stone-300">Instagram</a>
            <a href={facebookLink} target="_blank" rel="noreferrer" className="transition hover:text-stone-300">Facebook</a>
            <a href={shopLink} target="_blank" rel="noreferrer" className="transition hover:text-stone-300">Shop</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
