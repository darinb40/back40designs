"use client";

import React, { useState, useCallback } from "react";

// Q2 2026 curated word pool — random layout per player
const Q2_POOL = [
  "Closing Percentage", "Sustainable Growth", "Move the Needle", "Follow Up",
  "Urgency", "Opportunity", "Pipeline", "Circle Back", "Road to the Sale",
  "Accountability", "The Process", "Phone Skills", "Talk About Gross",
  "Low Hanging Fruit", "Prospecting", "Own It", "Coachable",
  "At The End Of The Day", "Win The Morning", "Work The Numbers",
  "What's Your Why", "Service to Sales", "Inspect What You Expect",
  "Get On The Same Page", "Slow Down", "Take Control", "Mindset",
  "Discipline", "Consistency", "Show Up",
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateCard() {
  const picked = shuffle(Q2_POOL).slice(0, 24);
  picked.splice(12, 0, "FREE");
  return picked;
}

export default function BingoQ2Page() {
  const [card, setCard] = useState(() => generateCard());
  const [marked, setMarked] = useState(new Set([12]));
  const [winner, setWinner] = useState(false);
  const [copied, setCopied] = useState(false);

  const newCard = () => {
    setCard(generateCard());
    setMarked(new Set([12]));
    setWinner(false);
  };

  const checkWinner = useCallback((newMarked) => {
    const lines = [
      [0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24],
      [0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24],
      [0,6,12,18,24],[4,8,12,16,20],
    ];
    return lines.some(line => line.every(i => newMarked.has(i)));
  }, []);

  const toggleCell = useCallback((i) => {
    if (i === 12) return;
    setMarked(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      if (checkWinner(next)) setWinner(true);
      else setWinner(false);
      return next;
    });
  }, [checkWinner]);

  const handleShare = () => {
    navigator.clipboard.writeText("https://back40designco.com/dealership-series/bingo");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const cols = ["B", "4", "0", "G", "O"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0a0a0a;
          color: white;
          font-family: 'DM Mono', monospace;
          min-height: 100dvh;
        }

        .page {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 1rem 5rem;
          position: relative;
          overflow: hidden;
        }

        .bg-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(220,38,38,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220,38,38,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }

        .content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 560px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }

        /* Header */
        .header { text-align: center; width: 100%; }

        .eyebrow {
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #dc2626;
          margin-bottom: 0.4rem;
        }

        .title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.5rem, 12vw, 6rem);
          letter-spacing: 0.04em;
          line-height: 1;
          color: white;
        }

        .title span { color: #dc2626; }

        .quarter-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(220,38,38,0.25);
          background: rgba(220,38,38,0.08);
          border-radius: 100px;
          padding: 5px 14px;
          margin-top: 0.6rem;
        }

        .quarter-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #dc2626;
          animation: pulse 2s infinite;
        }

        .quarter-badge-text {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #dc2626;
        }

        .subtitle {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-top: 0.5rem;
          font-style: italic;
        }

        /* Card */
        .card-wrap { width: 100%; }

        .col-headers {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 3px;
          margin-bottom: 3px;
        }

        .col-header {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem, 6vw, 3rem);
          text-align: center;
          color: #dc2626;
          letter-spacing: 0.05em;
          line-height: 1;
          padding: 4px 0;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 3px;
        }

        .cell {
          aspect-ratio: 1;
          background: #161616;
          border: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 3px;
          cursor: pointer;
          transition: all 0.12s ease;
          position: relative;
          overflow: hidden;
          border-radius: 3px;
          -webkit-tap-highlight-color: transparent;
        }

        .cell:active { transform: scale(0.96); }

        .cell:hover:not(.free):not(.marked) {
          background: #1f1f1f;
          border-color: rgba(220,38,38,0.2);
        }

        .cell.marked {
          background: #dc2626;
          border-color: #dc2626;
        }

        .cell.marked::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
        }

        .cell.free {
          background: #161616;
          border-color: rgba(184,149,10,0.4);
          cursor: default;
        }

        .cell-text {
          font-size: clamp(6px, 1.6vw, 10px);
          line-height: 1.25;
          font-family: 'DM Mono', monospace;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
          transition: color 0.12s;
          word-break: break-word;
          hyphens: auto;
        }

        .cell.free .cell-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1rem, 3vw, 1.4rem);
          color: #b8950a;
          letter-spacing: 0.08em;
        }

        .cell.marked .cell-text { color: white; }

        /* Progress bar */
        .progress-wrap {
          width: 100%;
          background: #161616;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 100px;
          height: 4px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: #dc2626;
          border-radius: 100px;
          transition: width 0.3s ease;
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 4px;
        }

        /* Actions */
        .actions {
          display: flex;
          gap: 8px;
          width: 100%;
        }

        .btn {
          flex: 1;
          padding: 11px 16px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.12s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .btn:active { transform: scale(0.97); }
        .btn-primary { background: white; color: #0a0a0a; font-weight: 500; }
        .btn-primary:hover { background: #f0f0f0; }

        .btn-secondary {
          background: transparent;
          color: rgba(255,255,255,0.4);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .btn-secondary:hover { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.7); }

        /* Next quarter teaser */
        .teaser {
          width: 100%;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 3px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .teaser-left { }
        .teaser-label { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.2); }
        .teaser-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; color: rgba(255,255,255,0.35); letter-spacing: 0.05em; margin-top: 2px; }
        .teaser-date { font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.15); text-align: right; }

        /* Winner overlay */
        .winner-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.88);
          backdrop-filter: blur(10px);
          animation: fadeIn 0.25s ease;
        }

        .winner-inner { text-align: center; padding: 2rem; }

        .winner-word {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(5rem, 20vw, 12rem);
          color: #dc2626;
          line-height: 1;
          animation: stamp 0.4s cubic-bezier(0.2,1.4,0.3,1) forwards;
          opacity: 0;
        }

        .winner-sub {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.25em;
          text-transform: uppercase;
          margin-top: 1rem;
        }

        .winner-actions {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        @keyframes stamp {
          0% { opacity: 0; transform: scale(3.5) rotate(-3deg); }
          60% { opacity: 1; transform: scale(0.95) rotate(-1deg); }
          80% { transform: scale(1.02) rotate(-1deg); }
          100% { opacity: 1; transform: scale(1) rotate(-1deg); }
        }

        /* ── PRINT ── */
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .bg-grid { display: none !important; }
          .winner-overlay { display: none !important; }
          .page { padding: 0.5rem; background: white !important; }

          .eyebrow { color: #cc0000 !important; }
          .title { color: black !important; }
          .title span { color: #cc0000 !important; }
          .quarter-badge { border-color: #cc0000 !important; background: transparent !important; }
          .quarter-badge-dot { background: #cc0000 !important; animation: none !important; }
          .quarter-badge-text { color: #cc0000 !important; }
          .subtitle { color: #666 !important; }
          .col-header { color: #cc0000 !important; }

          .cell { background: white !important; border: 1.5px solid #ddd !important; border-radius: 0 !important; }
          .cell.marked { background: #fff5f5 !important; border-color: #cc0000 !important; }
          .cell.marked::before { display: none !important; }
          .cell.free { background: white !important; border-color: #b8950a !important; }
          .cell-text { color: black !important; font-size: 7pt !important; }
          .cell.free .cell-text { color: #b8950a !important; }
          .cell.marked .cell-text { color: #cc0000 !important; font-weight: bold !important; }

          .progress-wrap, .actions, .teaser { display: none !important; }
          .card-wrap { max-width: 100% !important; }
        }
      `}</style>

      <div className="page">
        <div className="bg-grid" />

        {/* Winner overlay */}
        {winner && (
          <div className="winner-overlay" onClick={() => setWinner(false)}>
            <div className="winner-inner">
              <div className="winner-word">BINGO!</div>
              <p className="winner-sub">Try not to look too excited.</p>
              <div className="winner-actions">
                <button
                  className="btn btn-primary no-print"
                  style={{ minWidth: "140px" }}
                  onClick={(e) => { e.stopPropagation(); setWinner(false); }}
                >
                  Keep Playing
                </button>
                <button
                  className="btn btn-secondary no-print"
                  style={{ minWidth: "140px" }}
                  onClick={(e) => { e.stopPropagation(); handleShare(); }}
                >
                  {copied ? "✓ Copied" : "Send to the Team"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="content">

          {/* Header */}
          <div className="header no-print">
            <p className="eyebrow">B40 // Back Lot Exclusive</p>
            <h1 className="title">Meeting <span>Bingo</span></h1>
            <div className="quarter-badge">
              <div className="quarter-badge-dot" />
              <span className="quarter-badge-text">Q2 2026 — April · May · June</span>
            </div>
            <p className="subtitle">One card. All quarter. Don't get caught.</p>
          </div>

          {/* Print-only header */}
          <div style={{ display: "none", textAlign: "center", width: "100%", marginBottom: "0.5rem" }}>
            <p style={{ fontSize: "9pt", letterSpacing: "0.25em", textTransform: "uppercase", color: "#cc0000" }}>B40 // Back Lot — Q2 2026</p>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "42pt", lineHeight: 1, color: "black" }}>
              Meeting <span style={{ color: "#cc0000" }}>Bingo</span>
            </h1>
            <p style={{ fontSize: "8pt", color: "#666", marginTop: "4px" }}>April · May · June 2026 — back40designco.com</p>
          </div>

          {/* Progress */}
          <div style={{ width: "100%" }} className="no-print">
            <div className="progress-label">
              <span>Marked</span>
              <span>{marked.size - 1} / 24</span>
            </div>
            <div className="progress-wrap">
              <div className="progress-bar" style={{ width: `${((marked.size - 1) / 24) * 100}%` }} />
            </div>
          </div>

          {/* Card */}
          <div className="card-wrap">
            <div className="col-headers">
              {["B","4","0","G","O"].map(c => (
                <div key={c} className="col-header">{c}</div>
              ))}
            </div>
            <div className="grid">
              {card.map((word, i) => (
                <div
                  key={i}
                  className={`cell${i === 12 ? " free" : ""}${marked.has(i) ? " marked" : ""}`}
                  onClick={() => toggleCell(i)}
                >
                  <span className="cell-text">{word}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="actions no-print">
            <button className="btn btn-primary" onClick={newCard}>
              New Card
            </button>
            <button className="btn btn-secondary" onClick={() => window.print()}>
              Print
            </button>
            <button className="btn btn-secondary" onClick={handleShare}>
              {copied ? "✓ Copied" : "Share"}
            </button>
          </div>

          {/* Next quarter teaser */}
          <div className="teaser no-print">
            <div className="teaser-left">
              <p className="teaser-label">Coming Next</p>
              <p className="teaser-title">Q3 2026 Card</p>
            </div>
            <p className="teaser-date">Drops July 1</p>
          </div>

        </div>
      </div>
    </>
  );
}

