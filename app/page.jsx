'use client';

import React from 'react';

// ─── Settings you might want to tweak ───────────────────────────────
// On phones, the hero photo is cropped. The FIRST number slides the
// picture left/right (0% = far left, 100% = far right). If the hat is
// cut off on your phone, nudge this number up or down by 5-10%.
const HERO_MOBILE_FOCUS = "78% 50%";

const FORMSPREE_ID = "xzdywzvy";
const PHONE = "479-544-1366";
const PHONE_LINK = "tel:+14795441366";
const EMAIL = "info@back40designco.com";
const INSTAGRAM = "https://www.instagram.com/b40_designs/";
const FACEBOOK = "https://www.facebook.com/profile.php?id=61574511363635";

// Palette (pulled from the blueprint hero)
// ink    #021125  main background
// deep   #04172f  raised panels
// paper  #f2f5fa  light panels / form
// muted  #9fb0c9  body text on dark
// signal #c50000  red accent

// ─── Blueprint grid background ──────────────────────────────────────
function BlueprintGrid({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(150,182,230,0.10) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(150,182,230,0.10) 1px, transparent 1px)," +
          "linear-gradient(rgba(150,182,230,0.05) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(150,182,230,0.05) 1px, transparent 1px)",
        backgroundSize: "160px 160px, 160px 160px, 32px 32px, 32px 32px",
      }}
    />
  );
}

// ─── Image frame with blueprint corner marks ────────────────────────
function SpecFrame({ children, className = "" }) {
  const mark = "absolute h-4 w-4 border-[#9fb0c9]/70";
  return (
    <div className={`relative p-2 ${className}`}>
      <span aria-hidden="true" className={`${mark} left-0 top-0 border-l border-t`} />
      <span aria-hidden="true" className={`${mark} right-0 top-0 border-r border-t`} />
      <span aria-hidden="true" className={`${mark} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden="true" className={`${mark} bottom-0 right-0 border-b border-r`} />
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

const linkStyle =
  "inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-[#c50000] decoration-2 underline-offset-[6px] transition hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

// ─── Contact form ───────────────────────────────────────────────────
const EMPTY_FORM = { name: "", email: "", phone: "", projectType: "", quantity: "", message: "", _gotcha: "" };

function ContactForm() {
  const [status, setStatus] = React.useState("idle");
  const [form, setForm] = React.useState(EMPTY_FORM);

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
        setForm(EMPTY_FORM);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const input =
    "w-full border border-[#021125]/20 bg-white px-4 py-3 text-base text-[#021125] placeholder-[#021125]/40 transition focus:border-[#021125] focus:outline-none";
  const label = "mb-1.5 block text-sm font-semibold text-[#021125]";

  if (status === "success") {
    return (
      <div className="border border-[#021125]/15 bg-white p-8 text-center">
        <p className="text-2xl font-black text-[#021125]">Inquiry sent.</p>
        <p className="mt-3 text-sm leading-6 text-[#021125]/70">
          Darin will get back to you within 1-2 business days. Need it sooner? Call or text{' '}
          <a href={PHONE_LINK} className="font-semibold underline">{PHONE}</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Spam trap. Real people never see or fill this. */}
      <input type="text" name="_gotcha" value={form._gotcha} onChange={handleChange} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>Name *</label>
          <input id="cf-name" type="text" name="name" required autoComplete="name" placeholder="First and last name" value={form.name} onChange={handleChange} className={input} />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>Email *</label>
          <input id="cf-email" type="email" name="email" required autoComplete="email" placeholder="you@yourbusiness.com" value={form.email} onChange={handleChange} className={input} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-phone" className={label}>Phone or text</label>
          <input id="cf-phone" type="tel" name="phone" autoComplete="tel" placeholder="479-000-0000" value={form.phone} onChange={handleChange} className={input} />
        </div>
        <div>
          <label htmlFor="cf-qty" className={label}>How many hats?</label>
          <select id="cf-qty" name="quantity" value={form.quantity} onChange={handleChange} className={input}>
            <option value="">Pick a range</option>
            <option value="1-11">1-11</option>
            <option value="12-24">12-24</option>
            <option value="25-48">25-48</option>
            <option value="49-99">49-99</option>
            <option value="100+">100+</option>
            <option value="Not Sure">Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-type" className={label}>What kind of project?</label>
        <select id="cf-type" name="projectType" value={form.projectType} onChange={handleChange} className={input}>
          <option value="">Pick one</option>
          <option value="Business Merch">Business or brand merch</option>
          <option value="Event / Team">Event or team order</option>
          <option value="Legacy Build">Legacy build (personal story)</option>
          <option value="Dealership Series">Dealership order</option>
          <option value="Trail Series">Trail Series</option>
          <option value="Not Sure">Not sure yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="cf-msg" className={label}>Tell me about it *</label>
        <textarea id="cf-msg" name="message" required rows={4} placeholder="Business name, logo, the look you want, and any deadline." value={form.message} onChange={handleChange} className={`${input} resize-none`} />
      </div>

      {status === "error" && (
        <p className="border-l-2 border-[#c50000] pl-3 text-sm text-[#021125]">
          Your inquiry didn't send. Text Darin at{' '}
          <a href={PHONE_LINK} className="font-semibold underline">{PHONE}</a> or email{' '}
          <a href={`mailto:${EMAIL}`} className="font-semibold underline">{EMAIL}</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-[#c50000] py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#a80000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#021125] disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send project inquiry"}
      </button>
    </form>
  );
}

// ─── Page ───────────────────────────────────────────────────────────
export default function Back40LandingPage() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const nav = [
    ["/trail-series", "Shop"],
    ["/gallery", "Gallery"],
    ["#story", "Our Story"],
  ];

  const customBuilds = [
    {
      title: "Business merch",
      text: "Hats for shops, restaurants, dealerships, teams, and events. Built around your logo, made so your crew and customers actually want to wear them.",
      image: "/images/b40-home-dt-apparel.jpg",
      alt: "Custom business merch hat by Back 40",
    },
    {
      title: "Legacy builds",
      text: "One-off pieces built from a place, a family name, or a memory. The kind of hat that gets handed down instead of thrown out.",
      image: "/images/b40-home-war-eagle.jpg",
      alt: "War Eagle legacy build hat by Back 40",
    },
  ];

  const collections = [
    {
      title: "Trail Series",
      text: "Four hats, four Northwest Arkansas trails.",
      image: "/images/b40-home-little-sugar.jpg",
      link: "/trail-series",
    },
    {
      title: "Dealership Series",
      text: "Made from inside the car business, for the people in it.",
      image: "/images/firefly-dealership.png",
      link: "/dealership-series",
    },
  ];

  const steps = [
    { title: "Send the idea", text: "A logo, a business name, a rough sketch, or just the feel you want. That's enough to start." },
    { title: "Dial in the design", text: "We pick the hat, the patch material, and the layout together, and adjust until it's right." },
    { title: "Production", text: "Once you approve it, your run is built and finished by hand. Standard turnaround is 3-4 weeks." },
  ];

  const pillars = [
    ["Purpose", "Every build starts with a reason: a business, a place, or a story worth putting on a hat."],
    ["Quality", "Premium blanks, clean patch work, and a finish that holds up to daily wear."],
    ["Identity", "Designs that say something about the person or brand behind them, not pulled from a catalog."],
  ];

  const faqs = [
    { q: "Is there a minimum order?", a: "No. One hat or a few hundred. Small runs and one-off pieces are welcome." },
    { q: "How long does it take?", a: "Standard production is 3-4 weeks. Rush production is available if you're up against a deadline." },
    { q: "What do I need to get started?", a: "A logo, a rough idea, or just the direction you want. We'll work out the rest together." },
    { q: "Do you work with businesses?", a: "Yes. Shops, restaurants, dealerships, teams, events, and local brands are a big part of what we build." },
  ];

  const testimonials = [
    { name: "Trey Lee", role: "Business Owner", text: "Ordering branded items for my business used to be a challenge until I started working with Back 40 Designs. Their communication is excellent, and the quality of the shirts and hats I've received has been outstanding. I highly recommend reaching out to them for your business needs." },
    { name: "All American PDR", role: "Company", text: "Consistently outstanding experience. I've ordered both hats and shirts, and the quality, along with the speed of delivery, far exceeds others in the area. I highly recommend getting your gear here." },
    { name: "Jonathan Woolbright", role: "Woolbright Auto Glass", text: "Back 40 Designs put together work shirts and ballcaps for Woolbright Auto Glass. Did a great job outfitting our team!" },
    { name: "Scott Clark", role: "Customer", text: "Badass hats made custom by a badass individual. Highly recommend!" },
  ];

  return (
    <div className="min-h-screen bg-[#021125] text-[#f2f5fa] antialiased">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#021125]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10 md:py-4">
          <a href="/" className="shrink-0">
            <img src="/images/b40-home-logo.png" alt="Back 40 Design Co." className="h-9 w-auto md:h-11" />
          </a>

          <nav className="hidden items-center gap-9 text-sm font-semibold text-[#c9d3e3] md:flex">
            {nav.map(([href, label]) => (
              <a key={label} href={href} className="transition hover:text-white">{label}</a>
            ))}
            <a href="#contact" className="bg-[#c50000] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#a80000]">
              Start a custom order
            </a>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} className="-mr-2 p-2 text-2xl leading-none text-white md:hidden" aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#021125] px-5 pb-6 pt-2 md:hidden">
            <nav className="flex flex-col">
              {nav.map(([href, label]) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)} className="border-b border-white/10 py-4 text-lg font-semibold text-white">{label}</a>
              ))}
            </nav>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-5 block bg-[#c50000] py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-white">
              Start a custom order
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#021125]">
        {/* Desktop: full wallpaper behind the text */}
        <div aria-hidden="true" className="absolute inset-0 hidden bg-[url('/images/b40-hero-wallpaper.png')] bg-cover bg-center lg:block" />
        <div aria-hidden="true" className="absolute inset-0 hidden bg-gradient-to-r from-[#021025]/55 via-[#021025]/15 to-transparent lg:block" />

        {/* Mobile: blueprint grid, with the hat photo shown on its own up top */}
        <BlueprintGrid className="lg:hidden" />
        <div className="relative lg:hidden">
          <img
            src="/images/b40-hero-wallpaper.png"
            alt="Back 40 custom patch hat on a blueprint background"
            className="h-[48vh] max-h-[440px] min-h-[280px] w-full object-cover"
            style={{ objectPosition: HERO_MOBILE_FOCUS }}
          />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent to-[#021125]" />
        </div>

        <div className="relative z-10 mx-auto -mt-16 max-w-7xl px-5 pb-14 md:px-10 lg:mt-0 lg:flex lg:min-h-[760px] lg:items-center lg:py-20">
          <div className="w-full max-w-[600px]">
            <h1 className="text-[clamp(2.5rem,10vw,3.5rem)] font-black leading-[0.98] tracking-[-0.045em] text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.3)] lg:text-[clamp(3.3rem,5.2vw,5.5rem)]">
              A Story<br />Worth Wearing.
            </h1>
            <div className="mt-5 h-[5px] w-16 bg-[#c50000] lg:mt-6 lg:w-20" />
            <p className="mt-6 max-w-[540px] text-lg font-medium leading-snug text-white sm:text-2xl">
              Premium custom patch hats, designed with purpose and built to stand apart.
            </p>
            <p className="mt-4 max-w-[500px] text-base leading-7 text-[#b6bed1] lg:text-lg">
              Acrylic, leatherette, and laser-engraved patches for businesses, teams, and the stories that matter to you.
            </p>

            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
              <a href="#contact" className="inline-flex min-h-[56px] items-center justify-center border border-red-400 bg-[#c50000] px-7 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#a80000]">
                Start a custom order
              </a>
              <a href="/trail-series" className="inline-flex min-h-[56px] items-center justify-center border border-white/60 bg-[#031025]/60 px-7 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white/10">
                Shop hats
              </a>
            </div>

            <dl className="mt-10 grid max-w-[560px] grid-cols-3 border-t border-white/15 pt-5">
              {[
                ["No", "minimum order"],
                ["3-4 wk", "standard turnaround"],
                ["NWA", "built in Bella Vista, AR"],
              ].map(([big, small], i) => (
                <div key={small} className={`pr-3 ${i < 2 ? "border-r border-white/15" : ""} ${i > 0 ? "pl-3 sm:pl-5" : ""}`}>
                  <dt className="text-lg font-black tracking-tight text-white sm:text-2xl">{big}</dt>
                  <dd className="mt-1 text-xs leading-snug text-[#b6bed1] sm:text-sm">{small}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="border-b border-white/10 bg-[#04172f]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-8 md:flex-row md:justify-between md:px-10">
          <p className="text-sm text-[#9fb0c9]">Proud to work with</p>
          <div className="grid w-full grid-cols-3 items-center gap-6 md:w-auto md:gap-16">
            {[
              ["https://pinnaclesportsventures.com", "/images/psv.png", "Pinnacle Sports Ventures"],
              ["https://www.bentonvillebicyclecompany.com", "/images/bentonville-bicycle-logo.png", "Bentonville Bicycle Co."],
              ["https://lonestaradhesive.com", "/images/lonestar.png", "LoneStar Adhesive"],
            ].map(([href, src, alt]) => (
              <a key={alt} href={href} target="_blank" rel="noreferrer" className="flex justify-center opacity-70 transition hover:opacity-100">
                <img src={src} alt={alt} className="h-12 w-auto object-contain md:h-16" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section className="relative overflow-hidden border-b border-white/10">
        <BlueprintGrid />
        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">What we build</h2>
            <p className="mt-4 text-base leading-7 text-[#9fb0c9] md:text-lg">
              Custom patch hats from a single piece to a full company order.
            </p>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-8">
            {customBuilds.map((item) => (
              <article key={item.title}>
                <SpecFrame>
                  <img src={item.image} alt={item.alt} className="aspect-[4/3] w-full object-cover" />
                </SpecFrame>
                <h3 className="mt-5 text-2xl font-black tracking-tight text-white">{item.title}</h3>
                <p className="mt-2 max-w-md text-base leading-7 text-[#9fb0c9]">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <a href="/gallery" className={linkStyle}>See past builds in the gallery</a>
          </div>

          {/* Ready-to-wear collections, kept small */}
          <div className="mt-16 border-t border-white/10 pt-10">
            <h3 className="text-xl font-black tracking-tight text-white md:text-2xl">Ready to wear</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {collections.map((c) => (
                <a key={c.title} href={c.link} className="group flex items-center gap-4 border border-white/10 bg-[#04172f]/80 p-3 transition hover:border-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                  <img src={c.image} alt="" className="h-20 w-20 shrink-0 object-cover md:h-24 md:w-24" />
                  <div className="min-w-0">
                    <p className="text-lg font-bold text-white">{c.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#9fb0c9]">{c.text}</p>
                    <p className="mt-1 text-sm font-semibold text-white underline decoration-[#c50000] decoration-2 underline-offset-4">Shop the collection</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY BACK 40 (featured build + pillars) ── */}
      <section className="border-b border-white/10 bg-[#04172f]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <figure>
            <SpecFrame>
              <img src="/images/b40-home-lot-nine.jpg" alt="Lot Nine Billiards custom hat by Back 40" className="w-full object-cover" />
            </SpecFrame>
            <figcaption className="mt-3 text-sm text-[#9fb0c9]">Custom build for Lot Nine Billiards & Games</figcaption>
          </figure>
          <div>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">Not just another hat company.</h2>
            <p className="mt-4 text-base leading-7 text-[#9fb0c9] md:text-lg">
              The best custom gear feels personal. Every Back 40 build runs through the same three filters.
            </p>
            <dl className="mt-8 space-y-6">
              {pillars.map(([title, text]) => (
                <div key={title} className="border-l-2 border-[#c50000] pl-5">
                  <dt className="text-lg font-bold text-white">{title}</dt>
                  <dd className="mt-1 text-base leading-7 text-[#9fb0c9]">{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="relative overflow-hidden border-b border-white/10">
        <BlueprintGrid />
        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <h2 className="max-w-2xl text-3xl font-black tracking-tight text-white md:text-5xl">How a custom order works</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-0">
            {steps.map((s, i) => (
              <li key={s.title} className="relative border-l border-white/15 pl-6 md:border-l-0 md:border-t md:pl-0 md:pr-8 md:pt-8">
                <span aria-hidden="true" className="absolute -left-[5px] top-1 h-[9px] w-[9px] bg-[#c50000] md:-top-[5px] md:left-0" />
                <p className="text-sm font-bold text-[#c50000]">Step {i + 1}</p>
                <h3 className="mt-1 text-xl font-bold text-white md:text-2xl">{s.title}</h3>
                <p className="mt-2 max-w-sm text-base leading-7 text-[#9fb0c9]">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── TESTIMONIALS (swipe on phones) ── */}
      <section className="border-b border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">What customers say</h2>
          <p className="mt-3 text-sm text-[#9fb0c9] md:hidden">Swipe to read more</p>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-10 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex w-[85%] shrink-0 snap-start flex-col border border-white/10 bg-[#04172f] p-6 md:w-auto">
              <p aria-label="5 out of 5 stars" className="text-sm tracking-[0.2em] text-[#c50000]">★★★★★</p>
              <blockquote className="mt-4 flex-1 text-base leading-7 text-[#dbe2ee]">"{t.text}"</blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <p className="font-bold text-white">{t.name}</p>
                <p className="text-sm text-[#9fb0c9]">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── STORY ── */}
      <section id="story" className="scroll-mt-20 border-b border-white/10 bg-black px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-start md:gap-14">
          <div className="grid gap-5 md:sticky md:top-28">
            <SpecFrame>
              <img src="/images/papa-fuzzy.jpg" alt="James E. McKeel, Papa Fuzzy" className="block w-full" />
            </SpecFrame>
            <SpecFrame>
              <img src="/images/b40-founders-darin-kayla.jpg" alt="Darin and Kayla Keen, founders of Back 40" className="block w-full object-cover" />
            </SpecFrame>
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">Back 40 wasn't built overnight.</h2>
            <div className="mt-8 space-y-6 text-base leading-8 text-[#c9d3e3] md:text-lg">
              <p>It started long before I ever made my first hat.</p>
              <p>Growing up, my grandfather, <strong className="text-white">James E. McKeel, "Papa Fuzzy,"</strong> always had a hat on. Every day it was a different one. He would get excited to show me when he got a new one, and before long, I too became obsessed with buying hats, just like him.</p>
              <p>Just about every picture I have of him, he is wearing a hat. Except one. The family photo. One of his rare moments without one on.</p>
              <p>He was a hard worker, a baker for most of his life, up before the sun came up, putting on his white work hat and heading out the door. Then he would come home, change hats, and give everything he had to his grandchildren.</p>
              <p className="font-semibold text-white">Being his first, I felt that first hand.</p>
              <p>Back 40 comes from that same place. This brand is about more than headwear. It's about building something with meaning. Something honest. Something that reflects the people, places, and stories that matter most.</p>
              <p className="font-semibold text-white">Every hat, every patch, and every design carries that mindset.</p>
            </div>
            <p className="mt-10 border-t border-white/15 pt-6 text-sm text-[#9fb0c9]">Darin & Kayla Keen, founders</p>
          </div>
        </div>
      </section>

      {/* ── CONTACT + FAQ ── */}
      <section id="contact" className="relative scroll-mt-20 overflow-hidden">
        <BlueprintGrid />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">Start your project</h2>
            <p className="mt-4 max-w-md text-base leading-7 text-[#9fb0c9] md:text-lg">
              Fill out the form and Darin will get back to you within 1-2 business days. Rather talk it through? Call or text{' '}
              <a href={PHONE_LINK} className="font-semibold text-white underline decoration-[#c50000] decoration-2 underline-offset-4">{PHONE}</a>.
            </p>

            <div className="mt-10 border-t border-white/15">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-white/15">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-semibold text-white md:text-lg [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden="true" className="text-xl text-[#c50000] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-5 pr-8 text-base leading-7 text-[#9fb0c9]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="bg-[#f2f5fa] p-6 shadow-2xl md:p-10">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 bg-[#010b18] px-5 py-10 text-sm text-[#9fb0c9] md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-bold text-white">Back 40 Design Co.</p>
            <p className="mt-1">Custom headwear from Bella Vista, Arkansas. © 2026</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <a href={PHONE_LINK} className="hover:text-white">{PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="hover:text-white">Email</a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
            <a href={FACEBOOK} target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a>
            <a href="/privacy" className="hover:text-white">Privacy Policy</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
