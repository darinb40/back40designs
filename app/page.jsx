export default function Page() {
  const gallery = [
    {
      title: "Henny Dogs Collab",
      tag: "Client Work",
      image: "/images/henny-dogs.jpg",
    },
    {
      title: "Bella Vista Trail Hat",
      tag: "Trail Series",
      image: "/images/bella-vista-trail.jpg",
    },
    {
      title: "Little Sugar Trail",
      tag: "Bold Build",
      image: "/images/little-sugar-trail.jpg",
    },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#111", color: "#fff", fontFamily: "Arial, sans-serif" }}>
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
        <p style={{ letterSpacing: 2, textTransform: "uppercase", color: "#aaa", fontSize: 12 }}>
          Back40 Designs
        </p>
        <h1 style={{ fontSize: 48, margin: "16px 0" }}>
          Custom hats that look sharp and mean something.
        </h1>
        <p style={{ maxWidth: 700, color: "#ccc", lineHeight: 1.6, fontSize: 18 }}>
          Built for local brands, bike shops, events, and one-off projects that deserve more than generic merch.
        </p>

        <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href="mailto:info@back40designco.com?subject=Back40%20Project%20Inquiry"
            style={{
              background: "#fff",
              color: "#111",
              padding: "12px 20px",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Request a Quote
          </a>
          <a
            href="https://www.instagram.com/b40_designs/"
            style={{
              border: "1px solid #555",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            See the Work
          </a>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 60px" }}>
        <p style={{ letterSpacing: 2, textTransform: "uppercase", color: "#aaa", fontSize: 12 }}>
          Past Work
        </p>
        <h2 style={{ fontSize: 36, margin: "12px 0 30px" }}>
          Real builds. Real brands. Real products people want to wear.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {gallery.map((item) => (
            <div
              key={item.title}
              style={{
                background: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: 24,
                overflow: "hidden",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }}
              />
              <div style={{ padding: 20 }}>
                <p style={{ fontSize: 12, textTransform: "uppercase", color: "#999", letterSpacing: 1.5 }}>
                  {item.tag}
                </p>
                <h3 style={{ marginTop: 8, fontSize: 22 }}>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: "1px solid #333", padding: "24px", color: "#999" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <p>© 2026 Back40 Designs</p>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="https://www.instagram.com/b40_designs/" style={{ color: "#999", textDecoration: "none" }}>
              Instagram
            </a>
            <a href="mailto:info@back40designco.com" style={{ color: "#999", textDecoration: "none" }}>
              Email
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
