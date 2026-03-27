const ArrowRight = ({ className = "h-4 w-4" }) => <span className={className}>→</span>;
const CheckCircle2 = ({ className = "h-5 w-5" }) => <span className={className}>✓</span>;
const InstagramIcon = ({ className = "h-4 w-4" }) => <span className={className}>◎</span>;
const MailIcon = ({ className = "h-4 w-4" }) => <span className={className}>✉</span>;
const MessageSquareIcon = ({ className = "h-5 w-5" }) => <span className={className}>💬</span>;
const MountainIcon = ({ className = "h-5 w-5" }) => <span className={className}>△</span>;
const ShieldCheckIcon = ({ className = "h-5 w-5" }) => <span className={className}>⬢</span>;
const StoreIcon = ({ className = "h-5 w-5" }) => <span className={className}>▣</span>;

export default function Back40LandingPage() {
  const ctaLink = "mailto:info@back40designco.com?subject=Back40%20Project%20Inquiry";
  const shopLink = "https://back40-headwear.myshopify.com/collections/b40-trail-series";
  const instagramLink = "https://www.instagram.com/b40_designs/";
  const facebookLink = "https://www.facebook.com/";

  const pillars = [
    {
      title: "Purpose",
      text: "Every build starts with a reason. A business, a place, a memory, or a story worth putting on a hat.",
      icon: ShieldCheckIcon,
    },
    {
      title: "Quality",
      text: "Patch-forward headwear built with clean execution, premium materials, and a finish that feels intentional.",
      icon: CheckCircle2,
    },
    {
      title: "Identity",
      text: "Back 40 designs are made to stand out and actually say something about the person, brand, or place behind them.",
      icon: MountainIcon,
    },
  ];

  const collections = [
    {
      title: "Trail Series",
      eyebrow: "Signature Line",
      description: "Topo-driven hats inspired by Arkansas trails, ridgelines, and the outdoor culture that built the brand.",
      icon: MountainIcon,
    },
    {
      title: "Business Merch",
      eyebrow: "For Shops & Brands",
      description: "Custom hats for local businesses, bike shops, restaurants, events, and teams that want merch with real identity.",
      icon: StoreIcon,
    },
    {
      title: "Legacy Builds",
      eyebrow: "One-Off Projects",
      description: "Story-driven pieces built from places, memories, family history, and meaningful details worth preserving.",
      icon: ShieldCheckIcon,
    },
  ];

  const process = [
    {
      step: "01",
      title: "Start with the idea",
      text: "Send a logo, a concept, a business name, or even just the vibe you want. That is enough to get moving.",
    },
    {
      step: "02",
      title: "Shape the build",
      text: "We dial in patch style, hat choice, materials, and layout until the design feels right and fits the brand.",
    },
    {
      step: "03",
      title: "Bring it to life",
      text: "Once approved, the run is built with a clean, premium finish made to be worn — not forgotten.",
    },
  ];

  const proofPoints = [
    "Custom acrylic and leatherette patch hats",
    "Built for local brands, events, shops, and collabs",
    "Small-run friendly and story-driven by design",
    "Made to feel personal, not pulled from a template",
  ];

  const gallery = [
    {
      title: "Henny Dogs Collab",
      tag: "Client Work",
      image: "/images/henny-dogs.jpg",
    },
    {
      title: "Bella Vista Trail Hat",
      tag: "Trail Series",
      image: "/images/bella-vista-trail.jpg",
    },
    {
      title: "Amor Patriae",
      tag: "Statement Build",
      image: "/images/ap-12.jpg",
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
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-stone-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <div>
            <p className="text-lg font-semibold tracking-tight">Back 40 Designs</p>
            <p className="text-xs uppercase tracking-[0.28em] text-stone-400">Custom Patch Headwear</p>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-stone-300 md:flex">
            <a href="#pillars" className="transition hover:text-white">Pillars</a>
            <a href="#collections" className="transition hover:text-white">Collections</a>
            <a href="#process" className="transition hover:text-white">Process</a>
            <a href="#work" className="transition hover:text-white">Work</a>
            <a href="#story" className="transition hover:text-white">Story</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={shopLink}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-stone-200 transition hover:bg-white/5 md:inline-flex"
            >
              Shop
            </a>
            <a
              href={ctaLink}
              className="inline-flex items-center gap-2 rounded-2xl bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-950 transition hover:-translate-y-0.5"
            >
              Start a Project <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_26%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:52px_52px]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-12 md:px-10 md:pb-28 md:pt-18 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <img
              src="/images/logo.png"
              alt="Back 40 Designs"
              className="mb-8 w-56 md:w-72 lg:w-80"
            />

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-stone-400">
              Purpose-built custom headwear
            </p>

            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
              <span className="font-bold text-white">Custom hats</span> with <span className="font-bold text-white">real identity</span>.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300 md:text-xl">
              Back 40 Designs creates premium patch-forward hats for local brands, businesses, events,
              and story-driven projects that deserve more than generic merch.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={ctaLink}
                className="inline-flex items-center gap-2 rounded-2xl bg-stone-100 px-6 py-3 text-sm font-semibold text-stone-950 shadow-lg transition hover:-translate-y-0.5"
              >
                Request a Quote <MailIcon className="h-4 w-4" />
              </a>

              <a
                href={instagramLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-stone-100 transition hover:bg-white/5"
              >
                See the Work <InstagramIcon className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {proofPoints.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-stone-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-stone-900 to-black p-5 shadow-2xl md:p-6">
              <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-stone-950">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-stone-500">Featured Build</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">Patch-Forward Headwear</h2>
                  </div>
                  <div className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-stone-300">
                    Back 40 Style
                  </div>
                </div>

                <div className="flex items-center justify-center px-5 py-6">
                  <img
                    src="/images/featured-hat.jpg"
                    alt="Back 40 featured custom hat"
                    className="w-full max-w-[460px] rounded-[1.5rem] border border-white/10 object-contain shadow-2xl"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 px-5 pb-5 text-center text-xs text-stone-400">
                  <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-2">Clean Layout</div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-2">Premium Patch</div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-2">Built to Wear</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pillars" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-stone-400">The foundation</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            The <span className="font-bold text-white">3 Pillars</span> of Back 40 Designs.
          </h2>
          <p className="mt-4 text-base leading-8 text-stone-300 md:text-lg">
            Everything built here runs through the same filter: <strong className="text-white">purpose</strong>, <strong className="text-white">quality</strong>, and <strong className="text-white">identity</strong>.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-7 shadow-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-stone-950">
                  <Icon className="h-5 w-5 text-stone-300" />
                </div>
                <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-300">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-stone-900/50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-stone-950/70 p-8 md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-stone-400">What Back 40 means</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Merch should feel like it belongs to your brand.
              </h2>
            </div>

            <div className="space-y-5 text-sm leading-8 text-stone-300 md:text-base">
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

      <section id="collections" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Collections</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Built for brands, stories, and repeatable merch wins.
            </h2>
          </div>

          <p className="max-w-xl text-stone-300 leading-7">
            Whether you need a signature hat for your business or a one-off project with a story
            behind it, Back 40 is built to make it wearable.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {collections.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[2rem] border border-white/10 bg-stone-900/70 p-7 shadow-xl transition hover:-translate-y-1"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-stone-500">{item.eyebrow}</p>
                <div className="my-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-stone-950">
                  <Icon className="h-5 w-5 text-stone-300" />
                </div>
                <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-300">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="work" className="bg-stone-950">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Past work</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Real builds. Real brands. Real hats people want to wear.
              </h2>
            </div>

            <p className="max-w-xl leading-7 text-stone-300">
              A look at the kind of work Back 40 can build for retail shops, trail culture,
              food businesses, collabs, and local merch lines.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {gallery.map((item, index) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-stone-900 shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                  />
                </div>

                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.25em] text-stone-500">0{index + 1}</p>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-stone-400">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xl font-semibold text-stone-100">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Process</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Simple, clean, and built around custom work.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {process.map((item) => (
            <div key={item.step} className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <p className="text-sm font-semibold tracking-[0.25em] text-stone-500">{item.step}</p>
              <h3 className="mt-5 text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-stone-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-stone-900/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Why Back 40</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              <span className="font-bold text-white">Not</span> just another hat company.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
              The best custom gear feels personal. Back 40 focuses on hats that connect to a place,
              a business, a memory, or a brand identity people actually care about.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              [
                "Intentional Design",
                "Each concept is built to feel original, not pulled from a generic catalog or filler template.",
              ],
              [
                "Strong Patch Aesthetic",
                "Acrylic and leatherette patch styles give every build a clean, premium, signature look.",
              ],
              [
                "Built for Real Brands",
                "Perfect for owners, teams, and creators who want merch people actually wear more than once.",
              ],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.75rem] border border-white/10 bg-stone-950 p-6">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-stone-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-stone-900 p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Questions</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              What buyers usually want to know.
            </h2>

            <div className="mt-8 space-y-4">
              {faqs.map((item) => (
                <div key={item.q} className="rounded-[1.5rem] border border-white/10 bg-stone-950 p-5">
                  <p className="text-lg font-semibold text-stone-100">{item.q}</p>
                  <p className="mt-2 text-sm leading-7 text-stone-300">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <section
            className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-stone-100 to-stone-300 px-8 py-10 text-stone-950 shadow-2xl md:px-12 md:py-14"
          >
            <div className="flex h-full flex-col justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-stone-700">Let’s build something</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                  Need custom hats for your brand or next project?
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-stone-700 md:text-lg">
                  Start with an idea, a logo, or a rough direction. Back 40 can turn that into a
                  clean, wearable concept with real identity.
                </p>
              </div>

              <div className="grid gap-3 text-sm text-stone-800">
                <a
                  href={ctaLink}
                  className="flex items-center gap-3 rounded-2xl border border-stone-700/20 bg-white/50 px-4 py-4 transition hover:bg-white/70"
                >
                  <MailIcon className="h-5 w-5" />
                  <span>Email your project idea</span>
                </a>

                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-stone-700/20 bg-white/50 px-4 py-4 transition hover:bg-white/70"
                >
                  <InstagramIcon className="h-5 w-5" />
                  <span>See more on Instagram</span>
                </a>

                <a
                  href={shopLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-stone-700/20 bg-white/50 px-4 py-4 transition hover:bg-white/70"
                >
                  <MessageSquareIcon className="h-5 w-5" />
                  <span>Shop the Trail Series</span>
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={ctaLink}
                  className="inline-flex items-center gap-2 rounded-2xl bg-stone-950 px-6 py-3 text-sm font-semibold text-stone-100 shadow-lg transition hover:-translate-y-0.5"
                >
                  Request a Quote <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section id="story" className="border-t border-white/10 bg-black px-6 py-20 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-black p-1 shadow-2xl">
              <img
                src="/images/papa-fuzzy.jpg"
                alt="Papa Fuzzy"
                className="block w-full rounded-[1.7rem] object-cover"
              />
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">
                Built from something real
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                Back 40 wasn’t built overnight.
              </h2>

              <div className="mt-8 space-y-6 text-base leading-8 text-stone-300 md:text-lg">
                <p>
                  It started long before the first hat was ever made.
                </p>

                <p>
                  Growing up, my grandfather — <strong className="text-white">James E. McKeel, “Papa Fuzzy”</strong> —
                  always had a hat on. Every day it was a different one. He loved them, he noticed
                  them, and before long, I did too.
                </p>

                <p>
                  He was a hard worker — a baker for most of his life — up before the sun, putting
                  on his white work hat and heading out the door. Then he would come home, change
                  hats, and give everything he had to his family.
                </p>

                <p className="font-medium text-white">
                  That kind of consistency leaves a mark.
                </p>

                <p>
                  Back 40 comes from that same place. Not from hype. Not from trying to be loud.
                  From wanting to build something honest — something that reflects the people,
                  places, and stories that matter.
                </p>

                <p className="font-semibold uppercase tracking-[0.14em] text-white">
                  Purpose over hype. Quality over shortcuts. Story over noise.
                </p>
              </div>

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-lg font-semibold text-white">
                  More than a hat. <span className="font-bold">A story worth wearing.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-sm text-stone-500 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Back 40 Designs. Custom patch hats with story and identity.</p>

          <div className="flex gap-5">
            <a href={instagramLink} target="_blank" rel="noreferrer" className="transition hover:text-stone-300">
              Instagram
            </a>
            <a href={facebookLink} target="_blank" rel="noreferrer" className="transition hover:text-stone-300">
              Facebook
            </a>
            <a href={ctaLink} className="transition hover:text-stone-300">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
