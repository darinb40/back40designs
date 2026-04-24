"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const linkStyle = (path) =>
    pathname === path
      ? "text-white font-semibold"
      : "text-white/70 hover:text-white";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        <Link href="/" className="text-lg font-bold tracking-wide text-white">
          BACK 40 DESIGNS
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className={linkStyle("/")}>
            Home
          </Link>

          <Link href="/gallery" className={linkStyle("/gallery")}>
            Gallery
          </Link>

          <Link href="/dealership-series" className={linkStyle("/dealership-series")}>
            Dealer Series
          </Link>

          <Link href="/collections/shop-hats" className={linkStyle("/collections/shop-hats")}>
            Shop
          </Link>
        </div>

      </div>
    </nav>
  );
}
