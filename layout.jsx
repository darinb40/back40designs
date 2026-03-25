import "./globals.css";

export const metadata = {
  title: "Back40 Designs",
  description: "Custom hats that look sharp and mean something.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
