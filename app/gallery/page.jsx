export default function GalleryPage() {
  const gallery = [
    { title: "Hyundai Green", tag: "Brand Work", image: "/images/hyundaigreen.png" },
    { title: "Hog Camo", tag: "Custom Build", image: "/images/hog-camo.png" },
    { title: "Cog Camo", tag: "Custom Build", image: "/images/cog-camo1.png" },
    { title: "Merica", tag: "Custom Build", image: "/images/merica.png" },
    { title: "AP Pistols", tag: "Brand Work", image: "/images/appistols.png" },
    { title: "Hyundai 2", tag: "Brand Work", image: "/images/hyundai2.png" },
    { title: "AP Olive", tag: "Custom Build", image: "/images/apolive.png" },

    { title: "MSDT Blue", tag: "Custom Build", image: "/images/msdtblue.png" },
    { title: "Goose", tag: "Custom Build", image: "/images/goose.png" },
    { title: "AR Letters", tag: "Custom Build", image: "/images/arletters.png" },
    { title: "Red Pig", tag: "Custom Build", image: "/images/redpig.png" },
    { title: "USA PDR", tag: "Brand Work", image: "/images/usapdr.png" },
    { title: "Wood Hog", tag: "Custom Build", image: "/images/woodhog.png" },
    { title: "Suicide King", tag: "Custom Build", image: "/images/suicideking.png" },

    { title: "AP Camo", tag: "Custom Build", image: "/images/apcamo.png" },
    { title: "Henny Camo", tag: "Custom Build", image: "/images/hennycamo.png" },
    { title: "Slobber Hog", tag: "Custom Build", image: "/images/slobberhog.png" },

    { title: "Henny Dog", tag: "Custom Build", image: "/images/hennydog.png" },
    { title: "Hog Wood", tag: "Custom Build", image: "/images/hogwood.png" },
    { title: "Lumber Lids", tag: "Brand Work", image: "/images/lumberlids.png" },
    { title: "Ark", tag: "Custom Build", image: "/images/ark.png" },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="border-b border-white/10 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-stone-400">
            Gallery
          </p>

          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
                Past work that shows what Back 40 is built to do.
              </h1>
            </div>

            <div>
              <p className="max-w-xl text-base leading-7 text-stone-300 md:text-lg">
                A full look at custom builds created for brands, businesses,
                teams, and story-driven projects. Clean design. Strong identity.
                Built to be worn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gallery.map((item) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />
                </div>

                <div className="flex items-center justify-between gap-4 px-4 py-4">
                  <div>
                    <h2 className="text-base font-semibold text-white">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-400">
                      {item.tag}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-6 py-16 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">
              Start a Project
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-4xl">
              Want something built for your brand?
            </h2>
            <p className="mt-3 text-base leading-7 text-stone-300">
              Let’s create something that actually feels like yours — not
              generic, not mass-produced, and not forgettable.
            </p>
          </div>

          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
          >
            Let’s Talk
          </a>
        </div>
      </section>
    </main>
  );
}
