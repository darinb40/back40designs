import "./globals.css";
import Header from "../components/Header";
export const metadata = {
  title: "Back40 Designs",
  description: "Custom hats that look sharp and mean something.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="pt-24">
          {children}
       </div>
     </body>
    </html>
  );
}
