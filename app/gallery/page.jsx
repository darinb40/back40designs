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
    <main className="min-h-screen bg-black pt-24 text-white">

      {/* HERO */}
      <section className="border-b border-white/10 px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-6xl font-bold">
            Past work that shows what Back 40 is built to do.
          </h1>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="px-4 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.title}
              className="rounded-xl cursor-pointer hover:scale-105 transition"
              onClick={() => openImage(index)}
            />
          ))}
        </div>
      </section>

      {/* DEALER CTA (CORRECT POSITION) */}
      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold">
            See how this translates inside a dealership.
          </h2>
          <p className="mt-4 text-stone-300">
            These same concepts are being built into a full dealership-driven line.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <a href="/dealership-series" className="bg-white text-black px-6 py-3 rounded-full">
              Dealer Series →
            </a>
            <a href="/collections/shop-hats" className="border px-6 py-3 rounded-full">
              Shop Hats
            </a>
          </div>
        </div>
      </section>

      {/* START PROJECT */}
      <section className="px-6 py-16 md:px-10 text-center">
        <h2 className="text-2xl md:text-4xl font-bold">
          Want something built for your brand?
        </h2>
        <a href={ctaLink} className="mt-6 inline-block bg-white text-black px-6 py-3 rounded-full">
          Let’s Talk
        </a>
      </section>

      {/* MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center">
          <img src={selectedItem.image} className="max-h-[80vh]" />
        </div>
      )}

    </main>
  );
}
