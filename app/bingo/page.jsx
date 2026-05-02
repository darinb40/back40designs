"use client";

import React, { useState } from "react";
import Link from "next/link";

const rules = [
  { number: "01", title: "One card per meeting.", body: "Generate your card before the meeting starts. Don't regenerate mid-meeting just because you're losing. That's weak." },
  { number: "02", title: "You hear it, you mark it.", body: "If the word or phrase is used in the meeting — even in passing, even sarcastically — it counts. No debates." },
  { number: "03", title: "Five in a row wins.", body: "Horizontal, vertical, or diagonal. FREE space counts. First one to five wins. Do not announce BINGO out loud." },
  { number: "04", title: "Keep it together.", body: "You are a professional. You are engaged. You are definitely not playing bingo right now. Maintain eye contact." },
  { number: "05", title: "The card is good all quarter.", body: "Q2 runs April through June. Same pool of words, different layout every time you generate. One card per meeting, all quarter long." },
];

const previewWords = [
  "Closing %", "Sustainable Growth", "Move the Needle", "Follow Up", "Urgency",
  "Opportunity", "Pipeline", "Circle Back", "Road to the Sale", "Accountability",
  "The Process", "Phone Skills", "FREE", "Talk About Gross", "Low Hanging Fruit",
  "Prospecting", "Own It", "Coachable", "At The End Of The Day", "Win The Morning",
  "Work The Numbers", "What's Your Why", "Service to Sales", "Inspect What You Expect", "Get On The Same Page",
];

export default function BingoLandingPage() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText("https://back40designco.com/dealership-series/bingo");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #080808; color: white; font-family: 'DM Mono', monospace; overflow-x: hidden; }

        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
        @keyframes scanline { 0%{transform:translateY(-100%)}100%{transform:translateY(100vh)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }

        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .fade-up-2 { animation: fadeUp 0.6s 0.15s ease both; }
        .fade-up-3 { animation: fadeUp 0.6s 0.3s ease both; }
        .fade-up-4 { animation: fadeUp 0.6s 0.45s ease both; }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: white; color: #080808;
          padding: 14px 28px; border-radius: 4px;
          font-family: 'DM Mono', monospace;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          text-decoration: none; border: none; cursor: pointer;
          transition: all 0.15s ease;
        }
        .btn-primary:hover { background: #f0f0f0; transform: translateY(-1px); }

        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: rgba(255,255,255,0.5);
          padding: 14px 28px; border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.1);
          font-family: 'DM Mono', monospace;
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          cursor: pointer; transition: all 0.15s ease;
        }
        .btn-secondary:hover { border-color: rgba(255,255,255,0.3); color: white; }

        .setup-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1px;
          border: 1px solid rgba(255,255,255,0.05);
          background: rgba(255,255,255,0.05);
          border-radius: 4px; overflow: hidden;
        }

        .setup-cell { padding: 2rem 1.5rem; background: #0f0f0f; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100dvh", position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "6rem 1.5rem 4rem", overflow: "hidden", background: "#080808" }}>

        {/* Background */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/pre-order-page.png')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2 }} />

        {/* Scanline */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 1 }}>
          <div style={{ position: "absolute", left: 0, right: 0, height: "2px", background: "linear-gradient(transparent, rgba(220,38,38,0.12), transparent)", animation: "scanline 8s linear infinite" }} />
        </div>

        {/* Grid overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(220,38,38,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        {/* Vignette */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "820px" }}>

          {/* Badge */}
          <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid rgba(220,38,38,0.25)", background: "rgba(220,38,38,0.08)", borderRadius: "100px", padding: "5px 14px", marginBottom: "1.5rem" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#dc2626", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#dc2626" }}>B40 // Back Lot Exclusive — Q2 2026</span>
          </div>

          {/* Headline */}
          <h1 className="fade-up-2" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem, 13vw, 9rem)", lineHeight: 0.92, letterSpacing: "0.02em", color: "white", marginBottom: "1.5rem" }}>
            Your Boss<br />Has <span style={{ color: "#dc2626" }}>No Idea</span><br />What's Happening.
          </h1>

          {/* Subhead */}
          <p className="fade-up-3" style={{ fontSize: "clamp(13px, 2.5vw, 17px)", lineHeight: 1.75, color: "rgba(255,255,255,0.55)", maxWidth: "520px", marginBottom: "2.5rem" }}>
            Every meeting. Same words. Same energy. Same speech about the pipeline.
            <br />
            <span style={{ color: "rgba(255,255,255,0.85)", fontStyle: "italic" }}>This quarter, you come prepared.</span>
          </p>

          {/* CTAs */}
          <div className="fade-up-4" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Link href="/dealership-series/bingo/card" className="btn-primary">Get My Card →</Link>
            <button onClick={handleShare} className="btn-secondary">
              {copied ? "✓ Link Copied" : "Send to the Team"}
            </button>
          </div>

        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>Scroll</span>
          <div style={{ width: "1px", height: "32px", background: "linear-gradient(rgba(220,38,38,0.5), transparent)" }} />
        </div>

      </section>

      {/* ── THE SETUP ── */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "900px", margin: "0 auto" }}>
        <div className="setup-grid">
          {[
            ["The Situation", "Every Monday. Same faces. Same agenda. Same words. You've heard it all before. Now you can profit from it."],
            ["The Card", "Q2 2026. 30 curated buzzwords. Randomly dealt every time. One card per meeting, all quarter long."],
            ["The Game", "Mark it when you hear it. Five in a row wins. Don't get caught celebrating. That's the whole game."],
          ].map(([title, body]) => (
            <div key={title} className="setup-cell">
              <p style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#dc2626", marginBottom: "0.75rem" }}>{title}</p>
              <p style={{ fontSize: "13px", lineHeight: 1.75, color: "rgba(255,255,255,0.5)" }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CARD PREVIEW ── */}
      <section style={{ padding: "0 1.5rem 5rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ maxWidth: "460px", width: "100%", textAlign: "center" }}>
          <p style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "1.25rem" }}>Q2 2026 Word Pool Preview</p>

          <div style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: "4px", overflow: "hidden", background: "#0f0f0f", padding: "3px", opacity: 0.65 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "2px", marginBottom: "2px" }}>
              {["B","4","0","G","O"].map(c => (
                <div key={c} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", textAlign: "center", color: "#dc2626", letterSpacing: "0.05em" }}>{c}</div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "2px" }}>
              {previewWords.map((word, i) => (
                <div key={i} style={{ aspectRatio: "1", background: i === 12 ? "#161616" : "#141414", border: i === 12 ? "1px solid rgba(184,149,10,0.3)" : "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2px", borderRadius: "2px" }}>
                  <span style={{ fontSize: "clamp(5px, 1.3vw, 7px)", lineHeight: 1.2, fontFamily: i === 12 ? "'Bebas Neue', sans-serif" : "'DM Mono', monospace", color: i === 12 ? "#b8950a" : "rgba(255,255,255,0.35)", letterSpacing: i === 12 ? "0.08em" : "0" }}>
                    {word}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginTop: "1rem", fontStyle: "italic" }}>
            Your card is randomly generated. No two are the same.
          </p>
        </div>
      </section>

      {/* ── OFFICIAL RULES ── */}
      <section style={{ padding: "0 1.5rem 5rem", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "4rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 6vw, 3.5rem)", letterSpacing: "0.05em", color: "white" }}>Official Rules</p>
            <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>Read before you play</p>
          </div>
          <div>
            {rules.map((rule, i) => (
              <div key={rule.number} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: "1.5rem", padding: "1.5rem 0", borderBottom: i < rules.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", alignItems: "start" }}>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "#dc2626", letterSpacing: "0.05em", lineHeight: 1, opacity: 0.5 }}>{rule.number}</p>
                <div>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: "500", fontSize: "13px", color: "white", marginBottom: "0.4rem", letterSpacing: "0.05em" }}>{rule.title}</p>
                  <p style={{ fontSize: "12px", lineHeight: 1.75, color: "rgba(255,255,255,0.4)" }}>{rule.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ padding: "0 1.5rem 6rem", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
        <div style={{ border: "1px solid rgba(220,38,38,0.15)", background: "rgba(220,38,38,0.05)", borderRadius: "4px", padding: "3rem 2rem", textAlign: "center" }}>
          <p style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#dc2626", marginBottom: "1rem" }}>Q2 2026 — April · May · June</p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 8vw, 5rem)", lineHeight: 1, color: "white", marginBottom: "1rem" }}>Your Card Is Waiting.</h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: "400px", margin: "0 auto 2rem" }}>
            Generate yours before the next meeting. Keep it all quarter. Play every time.
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/dealership-series/bingo/card" className="btn-primary">Get My Card →</Link>
            <button onClick={handleShare} className="btn-secondary">{copied ? "✓ Copied" : "Send to the Team"}</button>
          </div>
          <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>Next drop</p>
            <div style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.1)" }} />
            <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>Q3 2026 — July 1</p>
          </div>
        </div>
      </section>

      {/* ── NAV LINKS ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "1.5rem", display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "center", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
        {[
          ["/dealership-series/bingo/card", "Get My Card"],
          ["/dealership-series/green-pea-guide", "Green Pea Guide"],
          ["/dealership-series", "Dealership Series"],
          ["/", "Home"],
        ].map(([href, label]) => (
          <Link key={label} href={href} style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", transition: "color 0.15s" }}>
            {label}
          </Link>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "1rem 1.5rem 2rem", textAlign: "center" }}>
        <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.12)", letterSpacing: "0.1em" }}>© 2026 Back 40 Designs</p>
      </footer>

    </>
  );
}
