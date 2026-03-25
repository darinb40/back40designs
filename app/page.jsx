const ArrowRight = ({ className = "h-4 w-4" }) => <span className={className}>→</span>;
const CheckCircle2 = ({ className = "h-5 w-5" }) => <span className={className}>✓</span>;
const InstagramIcon = ({ className = "h-4 w-4" }) => <span className={className}>◎</span>;
const MailIcon = ({ className = "h-4 w-4" }) => <span className={className}>✉</span>;
const MessageSquareIcon = ({ className = "h-5 w-5" }) => <span className={className}>💬</span>;
const MountainIcon = ({ className = "h-5 w-5" }) => <span className={className}>△</span>;
const ShieldCheckIcon = ({ className = "h-5 w-5" }) => <span className={className}>⬢</span>;
const StoreIcon = ({ className = "h-5 w-5" }) => <span className={className}>▣</span>;
const BadgeDollarSignIcon = ({ className = "h-5 w-5" }) => <span className={className}>$</span>;

export default function Back40LandingPage() {
  const featuredCollections = [
    {
      title: "Trail Series",
      eyebrow: "Signature Line",
      description:
        "Topo-driven patch hats inspired by Arkansas trails, ridgelines, and ride culture.",
      icon: MountainIcon,
    },
    {
      title: "Business & Merch",
      eyebrow: "For Shops & Brands",
      description:
        "Custom hats for bike shops, restaurants, events, and local businesses that want merch with real identity.",
      icon: StoreIcon,
    },
    {
      title: "Legacy Projects",
      eyebrow: "One-Off Builds",
      description:
        "Meaningful pieces built from places, memories, stories, and personal landmarks worth preserving.",
      icon: ShieldCheckIcon,
    },
  ];

  const process = [
    {
      step: "01",
      title: "Send the idea",
      text: "Start with a logo, a rough concept, a business name, or even just the vibe you want.",
    },
    {
      step: "02",
      title: "Dial in the design",
      text: "We shape the patch direction, hat style, materials, and overall look until it feels right.",
    },
    {
      step: "03",
      title: "Build the run",
      text: "Once approved, the hats are produced with a clean, premium patch-forward finish.",
    },
  ];

  const highlights = [
    "Custom acrylic and leatherette patch hats",
    "Small business merch with strong visual identity",
    "Outdoor, trail, retail, and legacy-inspired concepts",
    "Built to feel personal, not mass produced",
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
      title: "Little Sugar Trail",
      tag: "Bold Build",
      image: "/images/little-sugar-trail.jpg",
    },
  ];

  const offerPoints = [
    "Designed for small business merch, collabs, events, and custom runs",
    "Strong patch-first look with acrylic and leatherette options",
    "Easy quote process without agency-style overhead",
    "Built for people who care what their hat actually says about them",
  ];

  const faqs = [
    {
      q: "What do I need to get started?",
      a: "A logo, a rough idea, a business name, or even just the style you want is enough to start the conversation.",
    },
    {
      q: "Do you work with businesses and local brands?",
      a: "Yes. Back40 is built for bike shops, restaurants, events, dealerships, local teams, and small business merch projects.",
    },
    {
      q: "Can you do one-off special projects too?",
      a: "Yes. Some of the best builds come from personal stories, landmarks, memories, or custom legacy pieces.",
    },
  ];

  const ctaLink = "mailto:info@back40designco.com?subject=Back40%20Project%20Inquiry";
  const instagramLink = "https://www.instagram.com/b40_designs/";

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-stone-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <div>
            <p className="text-lg font-semibold tracking-tight">Back40 Designs</p>
            <p className="text-xs uppercase tracking-[0.25em] text-stone-400">Custom Patch Hats</p>
          </div>
          <div className="hidden items-center gap-8 text-sm text-stone-300 md:flex">
            <a href="#collections" className="transition hover:text-white">Collections</a>
            <a href="#process" className="transition hover:text-white">Process</a>
            <a href="#pricing" className="transition hover:text-white">Pricing</a>
            <a href="#work" className="transition hover:text-white">Past Work</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </div>
          <a
            href={ctaLink}
            className="rounded-2xl border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            Start a Project
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_24%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <img 
  src="/images/logo.png" 
  alt="Back40 Designs" 
  className="h-45 w-auto mb-6"
/>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
              Custom hats that look sharp and mean something.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300 md:text-xl">
              Built for local brands, bike shops, events, businesses, and story-driven one-off projects that deserve more than generic merch.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={ctaLink}
                className="inline-flex items-center gap-2 rounded-2xl bg-stone-100 px-6 py-3 text-sm font-semibold text-stone-950 shadow-lg transition hover:-translate-y-0.5"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={instagramLink}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-stone-100 transition hover:bg-white/5"
              >
                See the Work <InstagramIcon className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-stone-300"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-stone-300">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Custom hats</div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Patch-forward design</div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Business merch</div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-stone-900 to-black p-6 shadow-2xl">
              <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[1.5rem] border border-white/10 bg-stone-900 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-stone-400">Featured Build</p>
                      <h2 className="mt-2 text-2xl font-semibold">Trail Patch Series</h2>
                    </div>
                    <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-stone-300">
                      Limited Runs
                    </div>
                  </div>

                  <div className="aspect-[4/5] rounded-[1.25rem] border border-dashed border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] p-4">
                    <div className="flex h-full flex-col justify-between rounded-[1rem] border border-white/10 bg-stone-950 p-5">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-stone-500">
                        <span>Hero Mockup</span>
                        <span>Patch Preview</span>
                      </div>
                      <div className="flex flex-1 items-center justify-center py-8">
                        <div className="w-full max-w-[260px] rounded-[2rem] border border-white/10 bg-stone-900 p-5 shadow-xl">
                          <div className="mb-4 h-12 w-28 rounded-full border border-white/10 bg-stone-950" />
                          <div className="mx-auto flex aspect-[1.2/1] w-full items-center justify-center rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_40%)] text-center">
                            <div>
                              <p className="text-xs uppercase tracking-[0.22em] text-stone-400">Patch Area</p>
                              <p className="mt-2 text-base font-medium text-stone-200">
                                Topo texture + bold front patch + outdoor identity
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs text-stone-400">
                        <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-2">Acrylic</div>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-2">Leatherette</div>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-2">Custom Fit</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[1.5rem] border border-white/10 bg-stone-900 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Why it works</p>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-300">
                      <li>• Premium patch-forward design language</li>
                      <li>• Clean branding for retail, teams, and local businesses</li>
                      <li>• Story-driven concepts people actually remember</li>
                    </ul>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-stone-900 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Best fit</p>
                    <p className="mt-4 text-sm leading-6 text-stone-300">
                      Bike shops, restaurants, events, outdoor brands, dealership teams, and custom client projects.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-stone-900 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Built for</p>
                    <p className="mt-4 text-sm leading-6 text-stone-300">
                      Brands that want their merch to feel like part of the culture, not just another giveaway item.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 md:grid-cols-3 md:p-10">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-stone-400">Made for people who care</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Merch that feels intentional.
            </h2>
          </div>
          <div className="text-sm leading-7 text-stone-300">
            Back40 is built around the idea that the best hats carry something with them — a place, a business, a memory, or a style people actually want to wear.
          </div>
          <div className="text-sm leading-7 text-stone-300">
            That means stronger concepts, cleaner patch execution, and a final product that feels like it belongs to your brand instead of looking pulled from a catalog.
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8 md:px-10">
        <div className="grid gap-6 md:grid-cols-4">
          {offerPoints.map((point) => (
            <div key={point} className="rounded-[1.75rem] border border-white/10 bg-stone-900/70 p-5">
              <CheckCircle2 className="mb-4 h-5 w-5 text-stone-300" />
              <p className="text-sm leading-7 text-stone-300">{point}</p>
            </div>
          ))}
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
          <p className="max-w-xl text-stone-300">
            Whether you need a signature hat for your business or a custom run with a story behind it, Back40 is designed to help you stand out.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredCollections.map((item) => {
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
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-300">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="pricing" className="border-y border-white/10 bg-stone-900/50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Pricing approach</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Clear enough to qualify. Flexible enough to sell.
            </h2>
            <p className="mt-4 text-stone-300">
              Use this section to set expectations without boxing yourself in. It helps serious buyers understand the kind of work you do.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-stone-950 p-8">
              <div className="mb-6 flex items-center gap-3">
                <BadgeDollarSignIcon className="h-5 w-5 text-stone-300" />
                <p className="text-sm uppercase tracking-[0.22em] text-stone-400">Suggested language</p>
              </div>
              <h3 className="text-3xl font-semibold">Custom runs start with real intent.</h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-300">
                Most Back40 projects are designed around custom runs for businesses, events, or special projects. Minimums, materials, and final pricing depend on the patch style, hat selection, and complexity of the build.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Good for</p>
                  <p className="mt-3 text-lg font-semibold">Shops & brands</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Built around</p>
                  <p className="mt-3 text-lg font-semibold">Custom patch work</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Next step</p>
                  <p className="mt-3 text-lg font-semibold">Request a quote</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-stone-100 to-stone-300 p-8 text-stone-950">
              <p className="text-sm uppercase tracking-[0.22em] text-stone-700">Quote starter</p>
              <h3 className="mt-3 text-3xl font-semibold">Ready to build something?</h3>
              <p className="mt-4 text-sm leading-7 text-stone-700">
                Send your logo, idea, quantity, and rough direction. That is enough to start pricing and design conversation.
              </p>
              <div className="mt-8 space-y-3 text-sm text-stone-800">
                <div className="rounded-2xl border border-stone-400/40 bg-white/40 px-4 py-3">Business or project name</div>
                <div className="rounded-2xl border border-stone-400/40 bg-white/40 px-4 py-3">Quantity needed</div>
                <div className="rounded-2xl border border-stone-400/40 bg-white/40 px-4 py-3">Patch style or concept</div>
                <div className="rounded-2xl border border-stone-400/40 bg-white/40 px-4 py-3">Deadline if you have one</div>
              </div>
              <a
                href={ctaLink}
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-stone-950 px-6 py-3 text-sm font-semibold text-stone-100 shadow-lg transition hover:-translate-y-0.5"
              >
                Request a Quote <MailIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="bg-stone-950">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Past work</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Real builds. Real brands. Real products people want to wear.
              </h2>
            </div>
            <p className="max-w-xl text-stone-300">
              Here’s a look at the kind of custom hat work Back40 can build for retail shops, trail brands, food businesses, and local merch lines.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {gallery.map((item, index) => (
              <div key={item.title} className="overflow-hidden rounded-[2rem] border border-white/10 bg-stone-900 shadow-xl">
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
            Simple, clear, and built around custom work.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {process.map((item) => (
            <div key={item.step} className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <p className="text-sm font-semibold tracking-[0.25em] text-stone-500">{item.step}</p>
              <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-stone-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-stone-900/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Why Back40</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Not just another hat company.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
              The best custom gear feels personal. Back40 Designs focuses on hats that connect to a place, a business, a memory, or a brand identity people actually care about.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              ["Intentional Design", "Each concept is built to feel unique, not pulled from a generic catalog."],
              ["Strong Patch Aesthetic", "Acrylic and leatherette patch styles give the product a premium, signature feel."],
              ["Local Business Friendly", "Perfect for owners who want a clean merch option without huge brand-agency overhead."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.75rem] border border-white/10 bg-stone-950 p-6">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-stone-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 text-center md:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 md:p-14">
          <p className="text-sm uppercase tracking-[0.25em] text-stone-400">Brand perspective</p>
          <blockquote className="mt-5 text-2xl font-medium leading-10 text-stone-100 md:text-3xl">
            “Back40 is about more than just making hats. It’s about building something people want to wear because it means something.”
          </blockquote>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-stone-900 p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Frequently asked</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Questions buyers usually have.</h2>
            <div className="mt-8 space-y-4">
              {faqs.map((item) => (
                <div key={item.q} className="rounded-[1.5rem] border border-white/10 bg-stone-950 p-5">
                  <p className="text-lg font-semibold text-stone-100">{item.q}</p>
                  <p className="mt-2 text-sm leading-7 text-stone-300">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <section id="contact" className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-stone-100 to-stone-300 px-8 py-10 text-stone-950 shadow-2xl md:px-12 md:py-14">
            <div className="flex h-full flex-col justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-stone-700">Let’s build something</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                  Need custom hats for your brand or next project?
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-stone-700 md:text-lg">
                  Start with an idea, a logo, or just a rough direction. Back40 Designs can turn that into a clean, wearable concept.
                </p>
              </div>

              <div className="grid gap-3 text-sm text-stone-800">
                <a href={ctaLink} className="flex items-center gap-3 rounded-2xl border border-stone-700/20 bg-white/50 px-4 py-4 transition hover:bg-white/70">
                  <MailIcon className="h-5 w-5" />
                  <span>Email your project idea</span>
                </a>
                <a href={instagramLink} className="flex items-center gap-3 rounded-2xl border border-stone-700/20 bg-white/50 px-4 py-4 transition hover:bg-white/70">
                  <InstagramIcon className="h-5 w-5" />
                  <span>See more on Instagram</span>
                </a>
                <a href={ctaLink} className="flex items-center gap-3 rounded-2xl border border-stone-700/20 bg-white/50 px-4 py-4 transition hover:bg-white/70">
                  <MessageSquareIcon className="h-5 w-5" />
                  <span>Request a quote today</span>
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

      <section className="mx-auto max-w-7xl px-6 pb-8 md:px-10">
        <div className="rounded-[1.5rem] border border-amber-500/20 bg-amber-500/10 p-5 text-sm text-amber-100">
          <p className="font-semibold">Vercel deployment note</p>
          <p className="mt-2 leading-7 text-amber-50/90">
            Put your images in <span className="font-semibold">public/images</span> with these exact file names: <span className="font-semibold">henny-dogs.jpg</span>, <span className="font-semibold">bella-vista-trail.jpg</span>, and <span className="font-semibold">little-sugar-trail.jpg</span>.
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-sm text-stone-500 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Back40 Designs. Custom patch hats with story and identity.</p>
          <div className="flex gap-5">
            <a href={instagramLink} className="transition hover:text-stone-300">Instagram</a>
            <a href={instagramLink} className="transition hover:text-stone-300">Facebook</a>
            <a href={ctaLink} className="transition hover:text-stone-300">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
