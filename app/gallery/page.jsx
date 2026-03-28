"use client";

import { useEffect, useState } from "react";

export default function GalleryPage() {
  const ctaLink =
    "mailto:info@back40designco.com?subject=Back40%20Project%20Inquiry";

  const gallery = [
    { title: "Hyundai Green", tag: "Brand Work", image: "/images/hyundaigreen.png" },
    { title: "Hog Green Camo", tag: "Custom Build", image: "/images/hog-camo.png" },
    { title: "Hog Brown Camo", tag: "Custom Build", image: "/images/cog-camo1.png" },
    { title: "Merica", tag: "Custom Build", image: "/images/merica.png" },
    { title: "Amor Patriae Pistols", tag: "Brand Work", image: "/images/appistols.png" },
    { title: "Hyundai Bentonville", tag: "Brand Work", image: "/images/hyundai2.png" },
    { title: "Amor Patriea", tag: "Brasnd Work", image: "/images/apolive.png" },

    { title: "MSDT", tag: "Brand Work", image: "/images/msdtblue.png" },
    { title: "Goose", tag: "Custom Build", image: "/images/goose.png" },
    { title: "AR", tag: "Custom Build", image: "/images/arletters.png" },
    { title: "Red Pig Hat Co", tag: "Brand Work", image: "/images/redpig.png" },
    { title: "All American PDR", tag: "Brand Work", image: "/images/usapdr.png" },
    { title: "Wooden Hog", tag: "Custom Build", image: "/images/woodhog.png" },
    { title: "Suicide King", tag: "Custom Build", image: "/images/suicideking.png" },

    { title: "Amor Patriae Camo", tag: "Brand Work", image: "/images/apcamo.png" },
    { title: "Henny Dogs Camo", tag: "Brand Work", image: "/images/hennycamo.png" },
    { title: "Slobber Hog", tag: "Custom Build", image: "/images/slobberhog.png" },

    { title: "Henny Dog", tag: "Brand Work", image: "/images/hennydog.png" },
    { title: "Wooden Hogs Heather Grey", tag: "Custom Build", image: "/images/hogwood.png" },
    { title: "Lumber Lids", tag: "Brand Work", image: "/images/lumberlids.png" },
    { title: "Arkansas", tag: "Custom Build", image: "/images/ark.png" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);

  const openImage = (index) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);

  const showPrev = () => {
    setSelectedIndex((prev) =>
      prev === null ? null : prev === 0 ? gallery.length - 1 : prev - 1
    );
  };

  const showNext = () => {
    setSelectedIndex((prev) =>
      prev === null ? null : prev === gallery.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedIndex === null) return;

      if (event.key === "Escape") closeImage();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const selectedItem = selectedIndex !== null ? gallery[selectedIndex] : null;

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-white/10 px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <a
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-stone-400 transition hover:text-white"
          >
            ← Back to Home
          </a>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-stone-400">
                Gallery
              </p>

              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
                Past work that shows what Back 40 is built to do.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-stone-300 md:text-lg">
                A full look at custom builds created for brands, businesses,
                teams, and story-driven projects. Clean design. Strong identity.
                Built to be worn.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 md:p-7">
              <p className="text-sm uppercase tracking-[0.18em] text-stone-400">
                What you’re looking at
              </p>
              <div className="mt-4 grid gap-3 text-sm text-stone-300">
                <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                  Brand builds
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                  Custom patch concepts
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                  Story-driven projects
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-stone-500">
                Selected Work
              </p>
              <p className="mt-2 text-sm text-stone-400">
                Click any image to view it larger.
              </p>
            </div>

            <div className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-stone-400">
              {gallery.length} Builds
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4>
            {gallery.map((item, index) => (
              <button
                key={`${item.title}-${index}`}
                type="button"
                onClick={() => openImage(index)}
                className="group overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 text-left transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                  <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-stone-200 backdrop-blur">
                    Tap to enlarge
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 px-4 py-4">
                  <div>
                    <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-400">
                      {item.tag}
                    </p>
                  </div>

                  <div className="text-stone-500 transition group-hover:text-white">
                    ↗
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

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
            href={ctaLink}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
          >
            Let’s Talk
          </a>
        </div>
      </section>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
          onClick={closeImage}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute left-3 top-3 z-20 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white backdrop-blur">
              {selectedIndex + 1} / {gallery.length}
            </div>

            <button
              type="button"
              onClick={closeImage}
              className="absolute right-3 top-3 z-20 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black"
            >
              Close
            </button>

            <button
              type="button"
              onClick={showPrev}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/70 px-4 py-3 text-xl text-white transition hover:bg-black"
              aria-label="Previous image"
            >
              ←
            </button>

            <button
              type="button"
              onClick={showNext}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/70 px-4 py-3 text-xl text-white transition hover:bg-black"
              aria-label="Next image"
            >
              →
            </button>

            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-stone-950 shadow-2xl">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="max-h-[78vh] w-full object-contain bg-black"
              />
            </div>

            <div className="mt-4 flex flex-col gap-2 px-1 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white md:text-3xl">
                  {selectedItem.title}
                </h2>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-400">
                  {selectedItem.tag}
                </p>
              </div>

              <p className="text-sm text-stone-400">
                Use arrow keys to move through the gallery.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
