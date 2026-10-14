import { EMAIL, PHONES, INSTAGRAM, FACEBOOK, smsLink } from "./contact";

// The one footer used on every page. Extra bottom padding on phones keeps it
// clear of the fixed Text/Email bar.
export default function SiteFooter() {
  return (
    <footer className="relative z-10 font-sans border-t border-white/10 bg-black px-5 pb-20 pt-8 text-sm text-white/45 md:px-10 md:pb-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Back 40 Designs. Custom headwear with story and identity. Bella Vista, AR.</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {PHONES.map((phone) => (
            <a key={phone.name} href={smsLink(undefined, phone)} className="transition hover:text-white">
              Text {phone.name} {phone.display}
            </a>
          ))}
          <a href={`mailto:${EMAIL}`} className="transition hover:text-white">{EMAIL}</a>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="transition hover:text-white">Instagram</a>
          <a href={FACEBOOK} target="_blank" rel="noreferrer" className="transition hover:text-white">Facebook</a>
          <a href="/privacy" className="transition hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
