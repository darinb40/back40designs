// One place for B40's contact details. Change a number or email here and
// every page that uses the shared header, footer, or contact bar updates.
export const EMAIL = "info@back40designco.com";
export const PHONES = [
  { name: "Darin", display: "479-544-1366", digits: "+14795441366" },
  { name: "Kayla", display: "417-291-9738", digits: "+14172919738" },
];
export const INSTAGRAM = "https://www.instagram.com/b40_designs/";
export const FACEBOOK = "https://www.facebook.com/profile.php?id=61574511363635";

const DEFAULT_TEXT = "Hi! I'm interested in a custom hat project.";

// Texts open the visitor's messages app with a starter message they can edit.
export const smsLink = (message = DEFAULT_TEXT, phone = PHONES[0]) =>
  `sms:${phone.digits}?&body=${encodeURIComponent(message)}`;

export const mailtoLink = (subject = "New hat project") =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
