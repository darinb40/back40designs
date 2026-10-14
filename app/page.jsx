'use client';

import React from 'react';

// ─── Icon Components ────────────────────────────────────────────────
const ArrowRight = ({ className = "h-4 w-4" }) => <span className={className}>→</span>;

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
const FORMSPREE_ID = "xzdywzvy";

function ContactForm({ light = false }) {
  const [status, setStatus] = React.useState("idle");
  const [form, setForm] = React.useState({
    name: "", email: "", phone: "", projectType: "", quantity: "", message: "",
  });

  // Coming from a hat in the gallery (/?hat=Name#contact): start the message with that hat.
  React.useEffect(() => {
    const hat = new URLSearchParams(window.location.search).get("hat");
    if (hat) setForm((prev) => ({ ...prev, message: `I'm interested in a hat like "${hat}" from your gallery.\n\n` }));
  }, []);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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
        <p className={`text-lg font-semibold ${light ? "text-stone-900" : "text-white"}`}>Message received.</p>
        <p className={`mt-2 text-sm ${light ? "text-stone-600" : "text-stone-400"}`}>
          Darin will be in touch within 1-2 business days. You can also email{" "}
          <a href="mailto:info@back40designco.com" className="underline">info@back40designco.com</a>.
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
          <input type="email" name="email" required placeholder="you@yourbusiness.com" value={form.email} onChange={handleChange} className={inputClass} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Phone / Text</label>
          <input type="tel" name="phone" placeholder="479-000-0000" value={form.phone} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Project Type</label>
          <select name="projectType" value={form.projectType} onChange={handleChange} className={`${inputClass} ${light ? "bg-white/60" : "bg-stone-900"}`}>
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
        <select name="quantity" value={form.quantity} onChange={handleChange} className={`${inputClass} ${light ? "bg-white/60" : "bg-stone-900"}`}>
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
        <textarea name="message" required rows={4} placeholder="Business name, what you're going for, any logo details, deadline, or whatever comes to mind..." value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Please email Darin directly at{" "}
          <a href="mailto:info@back40designco.com" className="underline">info@back40designco.com</a>.
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className={`w-full rounded-2xl py-3.5 text-sm font-semibold shadow-lg transition hover:-translate-y-0.5 disabled:opacity-60 ${light ? "bg-stone-950 text-white hover:bg-stone-800" : "bg-white text-stone-950 hover:bg-stone-100"}`}>
        {status === "sending" ? "Sending..." : "Send Project Inquiry"}
      </button>
      <p className={`text-center text-xs ${light ? "text-stone-500" : "text-stone-500"}`}>
        Or email directly:{" "}
        <a href="mailto:info@back40designco.com" className={`font-semibold underline ${light ? "text-stone-700" : "text-stone-300"}`}>info@back40designco.com</a>
      </p>
    </form>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────
export default function Back40LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const instagramLink = "https://www.instagram.com/b40_designs/";
  const facebookLink = "https://www.facebook.com/profile.php?id=61574511363635";
  const phoneLink = "tel:479-544-1366";
  const phoneNumber = "479-544-1366";
  const email = "info@back40designco.com";

  const bebas = { fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" };

  // Featured on the home page — the rest live in the gallery.
  const featured = [
    { title: "Wood Motor Company", tag: "Brand Work", image: "/images/home-wood-motor.jpg" },
    { title: "Lot Nine Billiards & Games", tag: "Brand Work", image: "/images/home-lot-nine.jpg" },
    { title: "The Hubcap Kid", tag: "Brand Work", image: "/images/home-hubcap-kid.jpg" },
    { title: "New Light Electric", tag: "Brand Work", image: "/images/home-new-light-electric.jpg" },
    { title: "Dante's Hat", tag: "B40 Original", image: "/images/home-dantes-hat.jpg" },
    { title: "Samurai", tag: "B40 Original", image: "/images/home-samurai.jpg" },
    { title: "Dragon Scales", tag: "Trail Series", image: "/images/home-dragon-scales.jpg" },
    { title: "Black Marble Lightning", tag: "B40 Style", image: "/images/home-black-marble-lightning.jpg" },
  ];

  const stats = [
    ["6", "Years making hats"],
    ["7,500+", "Hats made", "On track for 10,000 by 2027"],
    ["25+", "Brands built for"],
    ["Bella Vista", "Arkansas made"],
  ];

  const madeHere = [
    { image: "/images/production-laser.jpg", title: "We make the patch", text: "Patches cut and engraved in our own shop." },
    { image: "/images/production-bench.jpg", title: "We build every hat", text: "Patches go on by hand, one hat at a time." },
    { image: "/images/production-order.jpg", title: "We deliver the order", text: "From a handful of hats to full team and business runs." },
  ];

  const builtFor = [
    "Wood Motor Company", "Hyundai Bentonville", "Woolbright Auto Glass", "Seven Lakes Church",
    "Pinnacle Sports Ventures", "War Eagle Mill", "Lot Nine Billiards & Games", "Garrett X",
    "Complete Wheel Restoration", "Webb Auto Remarketing", "Vagabond Coffee Bar", "New Light Electric",
  ];

  const series = [
    { title: "B40 Trail Series", text: "4 hats. 4 trails. Built for the riders, shops, and trail towns of Northwest Arkansas.", image: "/images/trail-back-40-loop.jpg", link: "/trail-series", cta: "See the Trail Series" },
    { title: "B40 Dealership Series", text: "Built for the people who live inside the car business, from the front line to the back lot.", image: "/images/dealership-card.jpg", link: "/dealership-series", cta: "Enter the Series" },
  ];

  const process = [
    { step: "01", title: "Start with the idea", text: "Send a logo, a concept, a business name, or even just the vibe you want. That is enough to get moving.", icon: "/images/lightbulb.png" },
    { step: "02", title: "Shape the build", text: "We dial in the hat, the acrylic, leatherette, or metal patch, and the layout until the design feels right and fits the brand.", icon: "/images/shape.png" },
    { step: "03", title: "Bring it to life", text: "Once approved, the run is built with a clean, premium finish made to be worn — not forgotten.", icon: "/images/life.png" },
  ];

  const faqs = [
    { q: "What do I need to get started?", a: "A logo, rough idea, business name, quantity, or even just the overall direction is enough to start the conversation." },
    { q: "Do you work with businesses and local brands?", a: "Yes. Back 40 is built for shops, restaurants, events, dealerships, teams, and local brands that want better merch." },
    { q: "Can you do one-off special projects too?", a: "Yes. Some of the best builds come from personal stories, landmarks, family history, and custom legacy pieces." },
    { q: "How long does production take?", a: "Standard production is 3-4 weeks. Rush production is available for projects with a tighter deadline." },
    { q: "What's the minimum order?", a: "No minimums. Small runs are welcome, with the best pricing at 24+ hats." },
  ];

  const testimonials = [
    { name: "Trey Lee", role: "Business Owner", text: "Ordering branded items for my business used to be a challenge until I started working with Back 40 Designs. Their communication is excellent, and the quality of the shirts and hats I've received has been outstanding. I highly recommend reaching out to them for your business needs.", rating: 5 },
    { name: "Jonathan Woolbright", role: "Woolbright Auto Glass", image: "/images/home-woolbright.jpg", text: "Back 40 Designs put together work shirts and ballcaps for Woolbright Auto Glass. Did a great job outfitting our team!", rating: 5 },
    { name: "All American PDR", role: "Company", text: "Consistently outstanding experience. I've ordered both hats and shirts, and the quality, along with the speed of delivery, far exceeds others in the area. I highly recommend getting your gear here.", rating: 5 },
    { name: "Scott Clark", role: "Customer", text: "Badass hats made custom by a badass individual. Highly recommend!", rating: 5 },
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
            <a href="/trail-series" className="transition hover:text-white">Trail Series</a>
            <a href="/dealership-series" className="transition hover:text-white">Dealership Series</a>
            <a href="/gallery" className="transition hover:text-white">Gallery</a>
            <a href="#contact" className="transition hover:text-white">Custom Orders</a>
          </nav>
          <div className="flex items-center gap-2 md:gap-3">
            <a href="#contact" className="inline-flex items-center gap-1.5 rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-stone-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-stone-100 md:px-4 md:text-sm">
              Start a Project
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
                ["/trail-series", "Trail Series"],
                ["/dealership-series", "Dealership Series"],
                ["/gallery", "Gallery"],
                ["#contact", "Custom Orders"],
              ].map(([href, label]) => (
                <a key={label} href={href} onClick={() => setMobileMenuOpen(false)} className="border-b border-white/5 pb-3 transition hover:text-white">{label}</a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-black">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-6 px-4 pb-6 pt-8 md:px-10 md:pb-8 md:pt-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#c6a36b] md:text-sm">A story worth wearing.</p>
            <h1 className="text-6xl uppercase leading-[0.9] md:text-8xl" style={bebas}>
              Not just hats.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-stone-300 md:text-lg md:leading-8">
              Premium patch hats for local brands, businesses, and real-world stories that deserve more than generic merch.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 bg-[#c6a36b] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#d4b07a]">
                Start a Project →
              </a>
              <a href="#work" className="inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:border-white/50">
                See Our Work
              </a>
            </div>
          </div>
          {/* Hat is cut out onto pure black so it floats on the page; the mask fades out its reflection. */}
          <img
            src="/images/hero-b40-og-flat-bill.jpg"
            alt="B40 OG Flat Bill"
            className="mx-auto max-h-[46vh] w-auto lg:mr-0 [-webkit-mask-image:linear-gradient(to_bottom,black_72%,transparent)] [mask-image:linear-gradient(to_bottom,black_72%,transparent)]"
          />
        </div>
      </section>

      {/* ── FEATURED WORK ── */}
      <section id="work" className="bg-black">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-4 md:px-10 md:pb-20">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-3xl uppercase text-[#c6a36b] md:text-4xl" style={bebas}>Our Work</h2>
            <a href="/gallery" className="text-xs font-bold uppercase tracking-[0.15em] text-white/70 transition hover:text-white">
              View Full Gallery <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
            {featured.map((item) => (
              <a key={item.title} href="/gallery" className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:-translate-y-0.5 hover:border-[#c6a36b]/50">
                <div className="aspect-[4/3] overflow-hidden bg-black">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" />
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/85">{item.title}</p>
                  <p className="mt-0.5 text-xs text-white/35">{item.tag}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="/gallery" className="inline-flex items-center gap-2 border border-[#c6a36b] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[#c6a36b] transition hover:bg-[#c6a36b] hover:text-black">
              View Full Gallery →
            </a>
          </div>
        </div>
      </section>

      {/* ── PROOF ── */}
      <section className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-10 md:py-12">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {stats.map(([value, label, note]) => (
              <div key={label}>
                <p className="text-4xl uppercase text-[#c6a36b] md:text-5xl" style={bebas}>{value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">{label}</p>
                {note && <p className="mt-1 text-xs text-stone-500">{note}</p>}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Brands we've built for</p>
            <p className="mx-auto mt-3 max-w-5xl text-sm leading-7 text-stone-300 md:text-base md:leading-8">
              {builtFor.map((name) => (
                <span key={name} className="inline-block whitespace-nowrap">{name}<span className="mx-2 text-[#c6a36b]/50">·</span></span>
              ))}
              <a href="/gallery" className="whitespace-nowrap text-[#c6a36b] underline-offset-4 hover:underline">and more</a>
            </p>
          </div>
        </div>
      </section>

      {/* ── MADE IN BELLA VISTA ── */}
      <section className="bg-black">
        <div className="mx-auto max-w-7xl px-4 pb-14 md:px-10 md:pb-20">
          <h2 className="mb-6 text-3xl uppercase text-[#c6a36b] md:text-4xl" style={bebas}>Made in Bella Vista</h2>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {madeHere.map((item) => (
              <figure key={item.title} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <img src={item.image} alt={item.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <figcaption className="p-4">
                  <p className="text-2xl uppercase text-white" style={bebas}>{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-stone-400">{item.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER LOGOS ── */}
      <section className="border-y border-white/10 bg-stone-900/40">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-10 md:py-14">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Trusted by leading brands</p>
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

      {/* ── PROCESS ── */}
      <section id="process" className="mx-auto max-w-7xl px-4 py-14 md:px-10 md:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-400">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Simple, clean, and built around custom work.</h2>
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

      {/* ── SERIES ── */}
      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-10 md:pb-20">
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {series.map((item) => (
            <a key={item.title} href={item.link} className="group grid overflow-hidden rounded-[2rem] border border-white/10 bg-stone-900/70 transition hover:-translate-y-1 sm:grid-cols-[0.9fr_1fr]">
              <div className="aspect-[4/3] overflow-hidden sm:aspect-auto">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="flex flex-col justify-center p-6">
                <h3 className="text-3xl uppercase text-white" style={bebas}>{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-400">{item.text}</p>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-[#c6a36b]">{item.cta} →</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="mx-auto max-w-7xl border-b border-white/10 px-4 py-14 md:px-10 md:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-stone-400">Customer Reviews</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Real people, real feedback.</h2>
        </div>
        {testimonials.filter((t) => t.image).map((t) => (
          <div key={t.name} className="mb-4 grid overflow-hidden rounded-[2rem] border border-[#c6a36b]/30 bg-white/5 md:grid-cols-[1fr_1.2fr]">
            <img src={t.image} alt={`${t.role} hat by Back 40 Designs`} className="aspect-[4/3] w-full object-cover" />
            <div className="flex flex-col justify-center p-6 md:p-10">
              <div className="mb-4 flex gap-1">
                {[...Array(t.rating)].map((_, i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
              </div>
              <p className="mb-6 text-lg leading-8 text-stone-200 md:text-xl md:leading-9">"{t.text}"</p>
              <p className="font-semibold text-white">{t.name}</p>
              <p className="text-sm text-stone-400">{t.role}</p>
            </div>
          </div>
        ))}
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.filter((t) => !t.image).map((t) => (
            <div key={t.name} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-7">
              <div className="mb-4 flex gap-1">
                {[...Array(t.rating)].map((_, i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
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
            <div className="rounded-[2rem] border border-white/10 bg-stone-900/80 p-6 backdrop-blur md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Questions</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">What buyers usually want to know.</h2>
              <div className="mt-8 space-y-3">
                {faqs.map((item) => (
                  <details key={item.q} className="group rounded-[1.5rem] border border-white/10 bg-stone-950/90 p-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-stone-100 md:text-lg">
                      {item.q}
                      <span className="text-[#c6a36b] transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm leading-7 text-stone-300">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-stone-100 to-stone-200 px-6 py-8 text-stone-950 shadow-2xl md:px-10 md:py-10">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-600">Let's build something</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Start your project here.</h2>
              <p className="mt-2 text-sm leading-6 text-stone-600 mb-6">
                Fill out the form and Darin will be in touch within 1-2 business days. Prefer email? Write to{" "}
                <a href={`mailto:${email}`} className="font-semibold text-stone-900 underline">{email}</a>.
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
                <img src="/images/b40-founders-darin-kayla.jpg" alt="Darin and Kayla Keen, founders of Back 40 Designs" className="block w-full rounded-2xl object-cover" />
              </div>
            </div>
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">Built from something real</p>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Back 40 wasn't built overnight.</h2>
              <div className="mt-8 space-y-6 text-base leading-7 text-stone-300 md:text-lg md:leading-8">
                <p>It started long before I ever made my first hat.</p>
                <p>Growing up, my grandfather — <strong className="text-white">James E. McKeel, "Papa Fuzzy"</strong> — always had a hat on. Every day it was a different one. He would get excited to show me when he got a new one, and before long, I too became obsessed with buying hats, just like him.</p>
                <p>Just about every picture I have of him, he is wearing a hat — except one. The family photo. One of his rare moments without one on.</p>
                <p>He was a hard worker — a baker for most of his life — up before the sun came up, putting on his white work hat and heading out the door. Then he would come home, change hats, and give everything he had to his grandchildren.</p>
                <p className="font-medium text-white">Being his first, I felt that first hand.</p>
                <p>But Back 40 isn't a one-man story. <strong className="text-white">Kayla and I have been together for 21 years</strong>, and for the last 6 of them, we've been building hats side by side as a husband-and-wife team.</p>
                <p>Back 40 comes from that same place. This brand is about more than headwear — it's about building something with meaning. Something honest. Something that reflects the people, places, and stories that matter most.</p>
                <p className="font-semibold uppercase tracking-[0.14em] text-white">Every hat, every patch, and every design carries that mindset.</p>
              </div>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur md:mt-10 md:p-6">
                <p className="text-lg font-semibold text-white">More than a hat. <span className="font-bold">A story worth wearing.</span></p>
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
            <a href="/privacy" className="transition hover:text-stone-300">Privacy Policy</a>
          </div>
        </div>
      </footer>

    </div>
  );
}