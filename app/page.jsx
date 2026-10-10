'use client';

import React from 'react';

// ─── Your info ──────────────────────────────────────────────────────
const FORMSPREE_ID = "xzdywzvy";
const PHONE = "479-544-1366";
const PHONE_LINK = "tel:+14795441366";
const EMAIL = "info@back40designco.com";
const INSTAGRAM = "https://www.instagram.com/b40_designs/";
const FACEBOOK = "https://www.facebook.com/profile.php?id=61574511363635";

// ─── Gallery ────────────────────────────────────────────────────────
// To add a hat:
//   1. Upload the photo to public/images/ in GitHub.
//   2. Copy one line below, paste it underneath, and change the
//      title, the image file name, and the category.
// Category must be exactly one of: "Business Merch", "Trail Series", "Legacy Builds"
// The FIRST hat in the list shows up big as the featured photo.
const GALLERY = [
  { title: "Lot Nine Billiards & Games", image: "/images/b40-home-lot-nine.jpg", category: "Business Merch" },
  { title: "Business merch build", image: "/images/b40-home-dt-apparel.jpg", category: "Business Merch" },
  { title: "War Eagle", image: "/images/b40-home-war-eagle.jpg", category: "Legacy Builds" },
  { title: "Little Sugar", image: "/images/b40-home-little-sugar.jpg", category: "Trail Series" },
];

const FILTERS = ["All", "Business Merch", "Trail Series", "Legacy Builds"];

// ─── Colors (Workshop Steel) ────────────────────────────────────────
// slate  #1C2124  main background
// panel  #252B2F  raised sections
// bone   #ECE6DA  main text / light sections
// steel  #A9B0B3  secondary text
// orange #D2763A  accent and buttons (hover #E8915A)
const FONTS_CSS = `@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700&family=Bebas+Neue&display=swap');`;
const display = "font-['Bebas_Neue',Impact,sans-serif] font-normal";
const btn =
  "inline-flex min-h-[52px] items-center justify-center bg-[#D2763A] px-7 font-bold text-[#1C2124] transition hover:bg-[#E8915A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ECE6DA]";

// ─── Contact form ───────────────────────────────────────────────────
const EMPTY_FORM = { name: "", email: "", phone: "", projectType: "", quantity: "", message: "", _gotcha: "" };

function ContactForm({ interest }) {
  const [status, setStatus] = React.useState("idle");
  const [form, setForm] = React.useState(EMPTY_FORM);

  // When someone taps "Want one like this?" in the gallery,
  // start their message for them.
  React.useEffect(() => {
    if (!interest) return;
    setForm((prev) => ({
      ...prev,
      projectType: prev.projectType || interest.category,
      message: prev.message || `I'd like something like the ${interest.title} hat. `,
    }));
  }, [interest]);

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
    "w-full border border-[#9AA2A7] bg-white px-4 py-3 text-base text-[#1C2124] placeholder-[#1C2124]/40 focus:border-[#1C2124] focus:outline-none";
  const label = "mb-1.5 block text-sm font-bold text-[#1C2124]";

  if (status === "success") {
    return (
      <div className="border border-[#1C2124]/20 bg-white p-8 text-center">
        <p className={`${display} text-4xl text-[#1C2124]`}>Inquiry sent</p>
        <p className="mt-3 text-base leading-7 text-[#3E464C]">
          Darin will get back to you within 1-2 business days. Need it sooner? Call or text{' '}
          <a href={PHONE_LINK} className="font-bold underline">{PHONE}</a>.
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
          <option value="Legacy Builds">Legacy build (personal story)</option>
          <option value="Trail Series">Trail Series</option>
          <option value="Not Sure">Not sure yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="cf-msg" className={label}>Tell me about it *</label>
        <textarea id="cf-msg" name="message" required rows={4} placeholder="Business name, logo, the look you want, and any deadline." value={form.message} onChange={handleChange} className={`${input} resize-none`} />
      </div>

      {status === "error" && (
        <p className="border border-[#D2763A] bg-white p-3 text-sm text-[#1C2124]">
          Your inquiry didn't send. Text Darin at{' '}
          <a href={PHONE_LINK} className="font-bold underline">{PHONE}</a> or email{' '}
          <a href={`mailto:${EMAIL}`} className="font-bold underline">{EMAIL}</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-[56px] w-full bg-[#1C2124] text-lg font-bold text-[#ECE6DA] transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C2124] disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send my inquiry"}
      </button>
    </form>
  );
}

// ─── Page ───────────────────────────────────────────────────────────
export default function Back40LandingPage() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("All");
  const [interest, setInterest] = React.useState(null);

  const nav = [
    ["#gallery", "Gallery"],
    ["/trail-series", "Trail Series"],
    ["#story", "Our Story"],
  ];

  const shown = filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter);

  const pickHat = (hat) => {
    setInterest({ ...hat, at: Date.now() });
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const steps = [
    { title: "Send the idea", text: "A logo, a business name, a sketch, or just the feel you want." },
    { title: "Approve the design", text: "We pick the hat, patch material, and layout together." },
    { title: "We build it", text: "Finished by hand. Standard turnaround is 3-4 weeks." },
  ];

  const faqs = [
    { q: "Is there a minimum order?", a: "No. One hat or a few hundred. Small runs and one-off pieces are welcome." },
    { q: "How long does it take?", a: "Standard production is 3-4 weeks. Rush production is available if you're up against a deadline." },
    { q: "What do I need to get started?", a: "A logo, a rough idea, or just the direction you want. We'll work out the rest together." },
  ];

  const testimonials = [
    { name: "Trey Lee", role: "Business owner", text: "Ordering branded items for my business used to be a challenge until I started working with Back 40 Designs. Their communication is excellent, and the quality of the shirts and hats I've received has been outstanding." },
    { name: "All American PDR", role: "Company", text: "Consistently outstanding experience. The quality, along with the speed of delivery, far exceeds others in the area." },
    { name: "Jonathan Woolbright", role: "Woolbright Auto Glass", text: "Back 40 Designs put together work shirts and ballcaps for Woolbright Auto Glass. Did a great job outfitting our team!" },
  ];

  return (
    <div className="min-h-screen bg-[#1C2124] font-['Archivo',Helvetica,sans-serif] text-[#ECE6DA] antialiased">
      <style>{FONTS_CSS}</style>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 border-b border-[#39424A] bg-[#1C2124]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3 md:px-10">
          <a href="/" className="flex shrink-0 items-center gap-3" aria-label="Back 40 Design Co. home">
            <span className={`${display} flex h-10 w-10 items-center justify-center border-2 border-[#D2763A] text-xl text-[#D2763A]`}>40</span>
            <span className={`${display} hidden text-2xl tracking-[0.08em] sm:block`}>Back 40 Design Co.</span>
          </a>

          <nav className="hidden items-center gap-8 font-medium md:flex">
            {nav.map(([href, label]) => (
              <a key={label} href={href} className="transition hover:text-[#D2763A]">{label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Always-visible order button, phone and desktop */}
            <a href="#contact" className="inline-flex min-h-[44px] items-center bg-[#D2763A] px-4 text-sm font-bold text-[#1C2124] transition hover:bg-[#E8915A] md:px-5">
              Start your order
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-2xl leading-none md:hidden" aria-label="Toggle menu" aria-expanded={menuOpen}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="flex flex-col border-t border-[#39424A] px-5 pb-4 md:hidden">
            {nav.map(([href, label]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)} className="border-b border-[#39424A] py-4 text-lg font-bold">{label}</a>
            ))}
          </nav>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-14 md:px-10 md:pt-20">
        <h1 className={`${display} text-[clamp(4.5rem,12vw,11rem)] leading-[0.86]`}>
          Your logo.<br /><span className="text-[#D2763A]">Built to last.</span>
        </h1>
        <div className="mt-8 flex flex-col gap-8 border-t border-[#39424A] pt-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-lg leading-8 text-[#C9CDCF] md:text-xl">
              Laser-cut acrylic, leatherette, and engraved patch hats for businesses, teams, and families. A Story Worth Wearing, made in Bella Vista, Arkansas.
            </p>
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#A9B0B3]">
              <div><dt className="inline font-bold text-[#ECE6DA]">No minimum </dt><dd className="inline">order</dd></div>
              <div><dt className="inline font-bold text-[#ECE6DA]">3-4 weeks </dt><dd className="inline">standard turnaround</dd></div>
            </dl>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className={btn}>Start your order</a>
            <a href="#gallery" className="inline-flex min-h-[52px] items-center justify-center border border-[#ECE6DA] px-7 font-bold transition hover:bg-[#ECE6DA] hover:text-[#1C2124]">See the gallery</a>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="mx-auto max-w-7xl scroll-mt-20 px-5 pb-20 md:px-10">
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter gallery">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`min-h-[44px] px-4 text-sm font-bold transition ${filter === f ? "bg-[#ECE6DA] text-[#1C2124]" : "border border-[#4A545C] hover:border-[#ECE6DA]"}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((hat, i) => (
            <figure key={hat.image} className={`group relative overflow-hidden bg-[#252B2F] ${i === 0 && filter === "All" ? "sm:col-span-2 lg:row-span-2" : ""}`}>
              <img src={hat.image} alt={`${hat.title} custom hat by Back 40`} className="aspect-square h-full w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-2 bg-gradient-to-t from-black/85 to-transparent p-4 pt-12">
                <span className="font-bold">{hat.title}</span>
                <button onClick={() => pickHat(hat)} className="min-h-[44px] bg-[#D2763A] px-3 text-sm font-bold text-[#1C2124] transition hover:bg-[#E8915A]">
                  Want one like this?
                </button>
              </figcaption>
            </figure>
          ))}
        </div>

        <a href="/gallery" className="mt-6 inline-block font-bold text-[#D2763A] underline underline-offset-4 hover:text-[#E8915A]">
          See every build in the full gallery
        </a>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-[#252B2F]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-4 md:items-center md:px-10">
          <h2 className={`${display} text-4xl leading-none`}>Three steps.<br />That's it.</h2>
          {steps.map((s, i) => (
            <div key={s.title} className="flex gap-4">
              <span className={`${display} text-5xl leading-none text-[#D2763A]`}>{i + 1}</span>
              <div>
                <p className="font-bold">{s.title}</p>
                <p className="mt-1 text-sm leading-6 text-[#A9B0B3]">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PARTNERS + TESTIMONIALS ── */}
      <section className="border-b border-[#39424A]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <p className={`${display} text-2xl tracking-[0.05em]`}>Proud to work with</p>
            <div className="grid w-full grid-cols-3 items-center gap-6 md:w-auto md:gap-14">
              {[
                ["https://pinnaclesportsventures.com", "/images/psv.png", "Pinnacle Sports Ventures"],
                ["https://www.bentonvillebicyclecompany.com", "/images/bentonville-bicycle-logo.png", "Bentonville Bicycle Co."],
                ["https://lonestaradhesive.com", "/images/lonestar.png", "LoneStar Adhesive"],
              ].map(([href, src, alt]) => (
                <a key={alt} href={href} target="_blank" rel="noreferrer" className="flex justify-center opacity-75 transition hover:opacity-100">
                  <img src={src} alt={alt} className="h-12 w-auto object-contain md:h-14" />
                </a>
              ))}
            </div>
          </div>

          <div className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex w-[85%] shrink-0 snap-start flex-col bg-[#252B2F] p-6 md:w-auto">
                <p aria-label="5 out of 5 stars" className="tracking-[0.2em] text-[#D2763A]">★★★★★</p>
                <blockquote className="mt-4 flex-1 leading-7 text-[#C9CDCF]">"{t.text}"</blockquote>
                <figcaption className="mt-5">
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-[#A9B0B3]">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAIL SERIES ── */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center md:px-10">
        <div>
          <h2 className={`${display} text-7xl leading-[0.9]`}>Trail<br />Series</h2>
          <p className="mt-4 max-w-md text-lg leading-8 text-[#C9CDCF]">
            Our own line, mapped from the Northwest Arkansas trails: Back 40 Loop, RWB, Little Sugar, and Dragon Scales.
          </p>
          <a href="/trail-series" className="mt-6 inline-block border-b-2 border-[#D2763A] pb-1 font-bold text-[#D2763A] hover:text-[#E8915A]">
            Explore the Trail Series
          </a>
        </div>
        <img src="/images/b40-home-little-sugar.jpg" alt="Little Sugar Trail Series hat" className="aspect-[4/3] w-full object-cover" />
      </section>

      {/* ── CONTACT + FAQ ── */}
      <section id="contact" className="scroll-mt-20 bg-[#ECE6DA] text-[#1C2124]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className={`${display} text-6xl leading-[0.9] md:text-7xl`}>Start your order</h2>
            <p className="mt-4 max-w-md text-lg leading-8 text-[#3E464C]">
              Darin will get back to you within 1-2 business days. Rather talk it through? Call or text{' '}
              <a href={PHONE_LINK} className="font-bold underline">{PHONE}</a>.
            </p>

            <div className="mt-10 border-t border-[#1C2124]/20">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-[#1C2124]/20">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden="true" className="text-2xl text-[#B35F27] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-5 pr-8 leading-7 text-[#3E464C]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <ContactForm interest={interest} />
        </div>
      </section>

      {/* ── STORY (Papa Fuzzy, Darin & Kayla) ── */}
      <section id="story" className="scroll-mt-20 bg-[#151A1C] px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-start md:gap-14">
          <div className="grid gap-5 md:sticky md:top-28">
            <img src="/images/papa-fuzzy.jpg" alt="James E. McKeel, Papa Fuzzy" className="block w-full" />
            <img src="/images/b40-founders-darin-kayla.jpg" alt="Darin and Kayla Keen, founders of Back 40" className="block w-full object-cover" />
          </div>
          <div>
            <h2 className={`${display} text-6xl leading-[0.9] md:text-7xl`}>Back 40 wasn't built overnight.</h2>
            <div className="mt-8 space-y-6 text-lg leading-8 text-[#C9CDCF]">
              <p>It started long before I ever made my first hat.</p>
              <p>Growing up, my grandfather, <strong className="text-[#ECE6DA]">James E. McKeel, "Papa Fuzzy,"</strong> always had a hat on. Every day it was a different one. He would get excited to show me when he got a new one, and before long, I too became obsessed with buying hats, just like him.</p>
              <p>Just about every picture I have of him, he is wearing a hat. Except one. The family photo. One of his rare moments without one on.</p>
              <p>He was a hard worker, a baker for most of his life, up before the sun came up, putting on his white work hat and heading out the door. Then he would come home, change hats, and give everything he had to his grandchildren.</p>
              <p className="font-bold text-[#ECE6DA]">Being his first, I felt that first hand.</p>
              <p>Back 40 comes from that same place. This brand is about more than headwear. It's about building something with meaning. Something honest. Something that reflects the people, places, and stories that matter most.</p>
              <p className="font-bold text-[#ECE6DA]">Every hat, every patch, and every design carries that mindset.</p>
            </div>
            <p className="mt-10 border-t border-[#39424A] pt-6 text-[#A9B0B3]">Darin & Kayla Keen, founders</p>
            <a href="#contact" className={`${btn} mt-8`}>Start your order</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#39424A] px-5 py-10 text-sm text-[#A9B0B3] md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className={`${display} text-2xl tracking-[0.05em] text-[#ECE6DA]`}>Back 40 Design Co.</p>
            <p className="mt-1">Custom headwear from Bella Vista, Arkansas. © 2026</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <a href={PHONE_LINK} className="hover:text-[#ECE6DA]">{PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="hover:text-[#ECE6DA]">Email</a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="hover:text-[#ECE6DA]">Instagram</a>
            <a href={FACEBOOK} target="_blank" rel="noreferrer" className="hover:text-[#ECE6DA]">Facebook</a>
            <a href="/privacy" className="hover:text-[#ECE6DA]">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
