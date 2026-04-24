"use client";

import Link from "next/link";

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        <Link href="/" className="text-lg font-bold tracking-wide text-white">
          BACK 40 DESIGNS
        </Link>

        <div className="flex items-center gap-6 text-sm text-white/70">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/gallery" className="hover:text-white">Gallery</Link>
          <Link href="/dealership-series" className="hover:text-white">Dealer Series</Link>
          <Link href="/collections/shop-hats" className="hover:text-white">Shop</Link>
        </div>

      </div>
    </nav>
  );
}
