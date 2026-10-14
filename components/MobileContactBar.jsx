import { smsLink, mailtoLink } from "./contact";

// Text/Email buttons pinned to the bottom of the screen on phones.
export default function MobileContactBar({ textMessage, emailSubject }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 font-sans grid grid-cols-2 border-t border-white/10 bg-black/95 backdrop-blur md:hidden">
      <a href={smsLink(textMessage)} className="py-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-white/85">Text Us</a>
      <a href={mailtoLink(emailSubject)} className="bg-[#c6a36b] py-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-black">Email Us</a>
    </div>
  );
}
