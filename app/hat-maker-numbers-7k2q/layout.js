// Private numbers page for Darin and Kayla: not linked anywhere, not in the sitemap,
// and search engines are told to skip it.
export const metadata = {
  title: "Hat Maker Numbers",
  robots: { index: false, follow: false },
};
export default function Layout({ children }) {
  return <>{children}</>;
}
