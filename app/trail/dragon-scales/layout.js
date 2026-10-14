export const metadata = {
  alternates: { canonical: "/trail/dragon-scales" },
  title: "Dragon Scales | B40 Trail Series",
  description: "Black diamond. Rock gardens. Fast drops into hard banks. The most technical run at Slaughter Pen. Custom patch snapback by Back 40 Design Co.",
  openGraph: {
    title: "Dragon Scales | B40 Trail Series",
    description: "Black diamond. Rock gardens. Fast drops into hard banks. Not for the faint of heart.",
    url: "https://www.back40designco.com/trail/dragon-scales",
    images: [{ url: "https://www.back40designco.com/images/trail-dragon-scales.jpg", width: 1200, height: 630, alt: "Dragon Scales Hat" }],
    siteName: "Back 40 Design Co.",
  },
  twitter: { card: "summary_large_image", title: "Dragon Scales | B40 Trail Series", description: "Black diamond. Rock gardens. Not for the faint of heart.", images: ["https://www.back40designco.com/images/trail-dragon-scales.jpg"] },
};
export default function Layout({ children }) {
  return <>{children}</>;
}
