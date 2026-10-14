'use client';

import React from 'react';
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import MobileContactBar from "../components/MobileContactBar";

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
      <div className={`absolute inset-0 bg-[url('/images/topo-lines.jpg')] bg-cover bg-center ${opacity}`} />
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
  const phoneNumber = "479-544-1366";
  const email = "info@back40designco.com";
  // Texts open the visitor's messages app with a starter message they can edit.
  const smsLink = (message = "Hi! I'm interested in a custom hat project.") => `sms:+14795441366?&body=${encodeURIComponent(message)}`;

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
    ["6", "Years of hat-making experience"],
    ["7,500+", "Hats made", "On track for 10,000 by 2027"],
    ["25+", "Brands built for"],
    ["Bella Vista", "Arkansas made"],
  ];

  // How it works
  const steps = [
    { step: "01", title: "Send us the idea", text: "A logo, a concept, a business name, or just the vibe you want. That's enough to get moving.", image: "/images/production-sketch.jpg" },
    { step: "02", title: "We make the patch", text: "We dial in the hat and the acrylic, leatherette, or metal patch, then cut and engrave it in our own shop.", image: "/images/production-cutting.jpg" },
    { step: "03", title: "We build every hat", text: "Patches go on by hand, one hat at a time, with a clean, premium finish.", image: "/images/production-bench.jpg" },
    { step: "04", title: "We deliver the order", text: "From a handful of hats to full team and business runs.", image: "/images/production-order.jpg" },
  ];

  const builtFor = [
    "Wood Motor Company", "Hyundai Bentonville", "Acura of Fayetteville", "71B Auto Auction",
    "Woolbright Auto Glass", "Pinnacle Sports Ventures", "War Eagle Mill",
    "Lot Nine Billiards & Games", "The Hubcap Kid", "All American PDR",
    "Complete Wheel Restoration", "Webb Auto Remarketing", "Vagabond Coffee Bar",
    "New Light Electric", "Amor Patriae",
  ];

  const series = [
    { title: "B40 Trail Series", text: "4 hats. 4 trails. Built for the riders, shops, and trail towns of Northwest Arkansas.", image: "/images/trail-back-40-loop.jpg", link: "/trail-series", cta: "See the Trail Series" },
    { title: "B40 Dealership Series", text: "Built for the people who live inside the car business, from the front line to the back lot.", image: "/images/custom-just-looking.jpg", link: "/dealership-series", cta: "Enter the Series" },
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
    { name: "Jonathan Woolbright", role: "Woolbright Auto Glass", brand: "Woolbright Auto Glass", image: "/images/home-woolbright.jpg", text: "Back 40 Designs put together work shirts and ballcaps for Woolbright Auto Glass. Did a great job outfitting our team!", rating: 5 },
    { name: "All American PDR", role: "Repeat customer", brand: "All American PDR", image: "/images/home-all-american-pdr.jpg", text: "Consistently outstanding experience. I've ordered both hats and shirts, and the quality, along with the speed of delivery, far exceeds others in the area. I highly recommend getting your gear here.", rating: 5 },
    { name: "Scott Clark", role: "Customer", text: "Badass hats made custom by a badass individual. Highly recommend!", rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-stone-950 pb-14 text-stone-100 md:pb-0">

      <SiteHeader position="sticky" />

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
              <a href={smsLink()} className="inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:border-white/50">
                Text Us
              </a>
              <a href="#work" className="inline-flex items-center gap-2 px-2 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white/60 transition hover:text-white">
                See Our Work ↓
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

      {/* ── HOW IT WORKS ── */}
      <section id="process" className="bg-black">
        <div className="mx-auto max-w-7xl px-4 pb-14 md:px-10 md:pb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c6a36b]">Made in Bella Vista, AR</p>
          <h2 className="mb-6 mt-2 text-3xl uppercase text-white md:text-4xl" style={bebas}>How it works</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
            {steps.map((item) => (
              <figure key={item.step} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                {item.image ? (
                  <img src={item.image} alt={item.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-black">
                    <img src={item.icon} alt="" className="h-24 w-24 object-contain md:h-28 md:w-28" />
                  </div>
                )}
                <figcaption className="p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c6a36b]">{item.step}</p>
                  <p className="mt-1 text-2xl uppercase text-white" style={bebas}>{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-stone-400">{item.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>
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
        {testimonials.filter((t) => t.image).map((t, i) => (
          <div key={t.name} className={`mb-4 grid overflow-hidden rounded-[2rem] border border-[#c6a36b]/30 bg-white/5 ${i % 2 ? "md:grid-cols-[1.9fr_1fr]" : "md:grid-cols-[1fr_1.9fr]"}`}>
            <img src={t.image} alt={`${t.brand} hat by Back 40 Designs`} className={`aspect-[4/3] w-full object-cover ${i % 2 ? "md:order-last" : ""}`} />
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
        <div className="grid gap-4 md:grid-cols-2">
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
                Fill out the form and Darin will be in touch within 1-2 business days. Prefer to text? Text{" "}
                <a href={smsLink()} className="font-semibold text-stone-900 underline">{phoneNumber}</a>, or email{" "}
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

      <SiteFooter />
      <MobileContactBar />


    </div>
  );
}