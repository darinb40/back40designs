"use client";

import { useEffect, useRef, useState } from "react";
import { patchShapes } from "./patchShapes";
import { smsLink, mailtoLink } from "./contact";

// Customer "try it on" preview: draws a patch (shape + material + optional logo)
// and wraps it onto a front-facing hat photo, using the crown-wrap math from
// the B40 Patch Studio. Everything runs in the visitor's browser; uploads never leave it.

const bebas = { fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif" };

const HAT = {
  name: "Black Richardson 112",
  src: "/images/try-it-on/r112-black.png", // cut out, so it sits on a soft spotlight
  // Where the patch sits on this photo, as fractions of the image (from the studio's r112_front profile).
  profile: { cx: 0.5, cy: 0.474, width: 0.377, wrap: 0.28, edgeDrop: 0.035, shade: 0.12 },
  // The profile width fits a Ridgeback; other shapes scale by their real width.
  fitWidthIn: 3.69,
};

// Stand-in looks until real material photos are in. `engrave` materials burn the
// logo and border in one color; `color` materials show the logo in full color.
const materials = [
  {
    id: "leatherette", name: "Leatherette", mode: "engrave", texture: "grain",
    colors: [
      { name: "Black", base: "#1c1c1c", burn: "#8d8a84" },
      { name: "Brown", base: "#5b3a24", burn: "#1d120b" },
      { name: "Tan", base: "#b48a5d", burn: "#3a2314" },
      { name: "Rawhide", base: "#cdb08a", burn: "#4a2e1a" },
      { name: "Gray", base: "#7c7c79", burn: "#1f1f1f" },
      { name: "Navy", base: "#25314a", burn: "#9ba6ba" },
    ],
  },
  { id: "leather", name: "Genuine Leather", mode: "engrave", texture: "leather", base: "#9a6a3f", burn: "#3a2010" },
  { id: "wood", name: "Real Wood", mode: "engrave", texture: "wood", base: "#c99b65", burn: "#4b2b13" },
  { id: "acrylic", name: "Acrylic", mode: "color", texture: "gloss", base: "#141414", burn: "#d9d9d9" },
  { id: "pvc", name: "PVC", mode: "color", texture: "rubber", base: "#232323", burn: "#c6a36b" },
  { id: "uv", name: "Full-Color UV Print", mode: "color", texture: "grain", base: "#f1ede6", burn: "#2b2b2b" },
  { id: "embroidery", name: "Embroidery", mode: "color", texture: "thread", base: "#161616", burn: "#e9e4da" },
];

const PATCH_PX = 900;

// Small seeded random so textures don't shimmer between redraws.
function rng(seed) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

function drawTexture(ctx, texture, w, h) {
  const rand = rng(40);
  ctx.save();
  if (texture === "leather" || texture === "grain") {
    const n = texture === "leather" ? 9000 : 5000;
    for (let i = 0; i < n; i++) {
      ctx.fillStyle = rand() > 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.09)";
      ctx.fillRect(rand() * w, rand() * h, 1 + rand() * 2.5, 1 + rand() * 2.5);
    }
    if (texture === "leather") {
      const g = ctx.createRadialGradient(w * 0.4, h * 0.35, 0, w * 0.5, h * 0.5, w * 0.7);
      g.addColorStop(0, "rgba(255,220,170,0.12)");
      g.addColorStop(1, "rgba(40,20,5,0.25)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }
  } else if (texture === "wood") {
    for (let y = -20; y < h + 20; y += 6 + rand() * 10) {
      ctx.strokeStyle = `rgba(90,50,20,${0.12 + rand() * 0.22})`;
      ctx.lineWidth = 1 + rand() * 3;
      ctx.beginPath();
      const amp = 3 + rand() * 8, freq = 0.004 + rand() * 0.006, phase = rand() * 6;
      for (let x = 0; x <= w; x += 10) ctx.lineTo(x, y + Math.sin(x * freq + phase) * amp);
      ctx.stroke();
    }
  } else if (texture === "gloss") {
    const g = ctx.createLinearGradient(0, 0, w * 0.7, h);
    g.addColorStop(0, "rgba(255,255,255,0.22)");
    g.addColorStop(0.35, "rgba(255,255,255,0.04)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  } else if (texture === "rubber") {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "rgba(255,255,255,0.08)");
    g.addColorStop(1, "rgba(0,0,0,0.2)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  } else if (texture === "thread") {
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    for (let x = -h; x < w; x += 4) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + h, h);
      ctx.stroke();
    }
  }
  ctx.restore();
}

// Bounding box of an SVG path, found by drawing it small and scanning the pixels.
function pathBounds(d, box) {
  const s = 400 / Math.max(box[2], box[3]);
  const c = document.createElement("canvas");
  c.width = Math.ceil(box[2] * s) + 2;
  c.height = Math.ceil(box[3] * s) + 2;
  const x = c.getContext("2d");
  x.setTransform(s, 0, 0, s, -box[0] * s + 1, -box[1] * s + 1);
  x.fill(new Path2D(d));
  const px = x.getImageData(0, 0, c.width, c.height).data;
  let minX = c.width, minY = c.height, maxX = 0, maxY = 0;
  for (let y = 0; y < c.height; y++)
    for (let i = 0; i < c.width; i++)
      if (px[(y * c.width + i) * 4 + 3] > 0) {
        minX = Math.min(minX, i); maxX = Math.max(maxX, i);
        minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      }
  return [box[0] + (minX - 1) / s, box[1] + (minY - 1) / s, (maxX - minX) / s, (maxY - minY) / s];
}

// A logo as a one-color mask for engraving. Dark ink engraves and white drops
// out, like a laser would see it. A mostly-white logo on a see-through
// background is flipped so its white artwork engraves instead.
function logoMask(img) {
  const c = document.createElement("canvas");
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const x = c.getContext("2d");
  x.drawImage(img, 0, 0);
  const data = x.getImageData(0, 0, c.width, c.height);
  const px = data.data;
  const lumAt = (i) => (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]) / 255;
  let inkLight = 0, inkTotal = 0;
  for (let i = 0; i < px.length; i += 16) {
    const a = px[i + 3] / 255;
    inkTotal += a;
    inkLight += a * lumAt(i);
  }
  const transparent = inkTotal < (px.length / 16) * 0.97;
  const whiteArt = transparent && inkLight / (inkTotal || 1) > 0.6;
  for (let i = 0; i < px.length; i += 4) {
    const lum = lumAt(i);
    const ink = whiteArt ? (lum - 0.12) / 0.7 : (1 - lum - 0.12) / 0.7;
    const a = (px[i + 3] / 255) * Math.min(1, Math.max(0, ink));
    px[i] = px[i + 1] = px[i + 2] = 0;
    px[i + 3] = a * 255;
  }
  x.putImageData(data, 0, 0);
  return c;
}

function tint(mask, color) {
  const c = document.createElement("canvas");
  c.width = mask.width;
  c.height = mask.height;
  const x = c.getContext("2d");
  x.drawImage(mask, 0, 0);
  x.globalCompositeOperation = "source-in";
  x.fillStyle = color;
  x.fillRect(0, 0, c.width, c.height);
  return c;
}

function drawPatch({ shape, material, color, logo, logoSize, logoX, logoY }) {
  const [bx, by, bw, bh] = shape.box;
  const k = PATCH_PX / Math.max(bw, bh);
  const c = document.createElement("canvas");
  c.width = Math.ceil(bw * k);
  c.height = Math.ceil(bh * k);
  const x = c.getContext("2d");
  const toShape = () => x.setTransform(k, 0, 0, k, -bx * k, -by * k);
  const cut = new Path2D(shape.cut);
  const look = color || material;

  // material
  toShape();
  x.save();
  x.clip(cut);
  x.fillStyle = look.base;
  x.fillRect(bx, by, bw, bh);
  x.setTransform(1, 0, 0, 1, 0, 0);
  drawTexture(x, material.texture, c.width, c.height);
  x.restore();

  // logo, clipped to the artwork area
  if (logo) {
    toShape();
    x.save();
    x.clip(new Path2D(shape.art));
    const [ax, ay, aw, ah] = shape.artBox;
    const src = material.mode === "engrave" ? tint(logo.mask, look.burn) : logo.img;
    const iw = logo.img.naturalWidth, ih = logo.img.naturalHeight;
    const fit = Math.min(aw / iw, ah / ih) * 0.86 * (logoSize / 100);
    const w = iw * fit, h = ih * fit;
    const cx = ax + aw / 2 + (logoX / 100) * aw, cy = ay + ah / 2 + (logoY / 100) * ah;
    x.drawImage(src, cx - w / 2, cy - h / 2, w, h);
    x.restore();
  }

  // classic border
  toShape();
  x.fillStyle = look.burn;
  x.fill(new Path2D(shape.border));

  // soft edge so the patch reads as a raised piece
  x.save();
  x.clip(cut);
  x.lineWidth = 6 / k;
  x.strokeStyle = "rgba(0,0,0,0.35)";
  x.stroke(cut);
  x.restore();
  return c;
}

// ── Crown wrap (from the B40 Patch Studio mockup) ──
function wrapPoint(u, v, W, H, p, pw, ph) {
  const q = u - 0.5, half = Math.PI * p.wrap * 0.5;
  const nx = Math.sin(q * Math.PI * p.wrap) / (2 * Math.sin(half));
  const edge = (1 - Math.cos(q * Math.PI * p.wrap)) / (1 - Math.cos(half));
  return { x: p.cx * W + nx * pw, y: p.cy * H + (v - 0.5) * ph + p.edgeDrop * edge * ph };
}

function drawTriangle(c, img, s0, s1, s2, d0, d1, d2) {
  const den = s0.x * (s1.y - s2.y) + s1.x * (s2.y - s0.y) + s2.x * (s0.y - s1.y);
  if (Math.abs(den) < 0.00001) return;
  const a = (d0.x * (s1.y - s2.y) + d1.x * (s2.y - s0.y) + d2.x * (s0.y - s1.y)) / den;
  const cx = (d0.x * (s2.x - s1.x) + d1.x * (s0.x - s2.x) + d2.x * (s1.x - s0.x)) / den;
  const e = (d0.x * (s1.x * s2.y - s2.x * s1.y) + d1.x * (s2.x * s0.y - s0.x * s2.y) + d2.x * (s0.x * s1.y - s1.x * s0.y)) / den;
  const b = (d0.y * (s1.y - s2.y) + d1.y * (s2.y - s0.y) + d2.y * (s0.y - s1.y)) / den;
  const d = (d0.y * (s2.x - s1.x) + d1.y * (s0.x - s2.x) + d2.y * (s1.x - s0.x)) / den;
  const f = (d0.y * (s1.x * s2.y - s2.x * s1.y) + d1.y * (s2.x * s0.y - s0.x * s2.y) + d2.y * (s0.x * s1.y - s1.x * s0.y)) / den;
  // grow each triangle slightly so no seams show between them
  const gx = (d0.x + d1.x + d2.x) / 3, gy = (d0.y + d1.y + d2.y) / 3;
  const l0 = Math.hypot(d1.x - d2.x, d1.y - d2.y), l1 = Math.hypot(d0.x - d2.x, d0.y - d2.y), l2 = Math.hypot(d0.x - d1.x, d0.y - d1.y);
  const area = Math.abs((d1.x - d0.x) * (d2.y - d0.y) - (d2.x - d0.x) * (d1.y - d0.y)) / 2;
  const inr = (2 * area) / (l0 + l1 + l2 || 1);
  const grow = inr > 0.01 ? Math.min(1 + 0.6 / inr, 1.6) : 1;
  const g = (pt) => ({ x: gx + (pt.x - gx) * grow, y: gy + (pt.y - gy) * grow });
  const q0 = g(d0), q1 = g(d1), q2 = g(d2);
  c.save();
  c.beginPath();
  c.moveTo(q0.x, q0.y);
  c.lineTo(q1.x, q1.y);
  c.lineTo(q2.x, q2.y);
  c.closePath();
  c.clip();
  c.setTransform(a, b, cx, d, e, f);
  c.drawImage(img, 0, 0);
  c.restore();
}

function renderHat(canvas, hatImg, patch, widthIn, size) {
  const W = hatImg.naturalWidth, H = hatImg.naturalHeight;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  const spot = ctx.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.5, W * 0.62);
  spot.addColorStop(0, "#3a3a3a");
  spot.addColorStop(1, "#0b0b0b");
  ctx.fillStyle = spot;
  ctx.fillRect(0, 0, W, H);
  ctx.drawImage(hatImg, 0, 0, W, H);
  if (!patch) return;
  const p = HAT.profile;
  const pw = p.width * W * (widthIn / HAT.fitWidthIn) * (size / 100);
  const ph = pw * (patch.height / patch.width);
  const layer = document.createElement("canvas");
  layer.width = W;
  layer.height = H;
  const lc = layer.getContext("2d");
  const cols = 18, rows = 12;
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++) {
      const u0 = i / cols, u1 = (i + 1) / cols, v0 = j / rows, v1 = (j + 1) / rows;
      const s00 = { x: u0 * patch.width, y: v0 * patch.height }, s10 = { x: u1 * patch.width, y: v0 * patch.height };
      const s01 = { x: u0 * patch.width, y: v1 * patch.height }, s11 = { x: u1 * patch.width, y: v1 * patch.height };
      const d00 = wrapPoint(u0, v0, W, H, p, pw, ph), d10 = wrapPoint(u1, v0, W, H, p, pw, ph);
      const d01 = wrapPoint(u0, v1, W, H, p, pw, ph), d11 = wrapPoint(u1, v1, W, H, p, pw, ph);
      drawTriangle(lc, patch, s00, s10, s11, d00, d10, d11);
      drawTriangle(lc, patch, s00, s11, s01, d00, d11, d01);
    }
  // crown lighting
  lc.globalCompositeOperation = "source-atop";
  const g = lc.createLinearGradient((p.cx - p.width * 0.55) * W, 0, (p.cx + p.width * 0.55) * W, 0);
  g.addColorStop(0, `rgba(0,0,0,${p.shade * 0.55})`);
  g.addColorStop(0.42, "rgba(255,255,255,.10)");
  g.addColorStop(0.7, "rgba(0,0,0,.03)");
  g.addColorStop(1, `rgba(0,0,0,${p.shade})`);
  lc.fillStyle = g;
  lc.fillRect(0, 0, W, H);
  // contact shadow
  ctx.save();
  ctx.globalAlpha = 0.32;
  ctx.filter = `blur(${Math.max(2, W * 0.006)}px)`;
  ctx.drawImage(layer, W * 0.004, H * 0.008);
  ctx.restore();
  ctx.drawImage(layer, 0, 0);
}

function loadImage(file, done) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => done(img);
    img.onerror = () => alert("That file couldn't be opened. Try a PNG or JPG.");
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function Panel({ step, title, children, dim }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-white/[0.03] p-4 transition md:p-5 ${dim ? "opacity-40" : ""}`}>
      <p className="mb-3 text-xl uppercase md:text-2xl" style={bebas}>
        <span className="mr-2 text-[#c6a36b]">{step}</span>{title}
      </p>
      {children}
    </div>
  );
}

function Slider({ label, value, min, max, onChange }) {
  return (
    <label className="block text-xs uppercase tracking-[0.15em] text-white/50">
      <span className="flex justify-between"><span>{label}</span></span>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-1 w-full accent-[#c6a36b]" />
    </label>
  );
}

const chip = (on) =>
  `rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition ${
    on ? "border-[#c6a36b] bg-[#c6a36b]/15 text-white" : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
  }`;

export default function HatTryOn() {
  const canvasRef = useRef(null);
  const [hatImg, setHatImg] = useState(null);
  const [shapeIndex, setShapeIndex] = useState(7); // Ridgeback
  const [materialId, setMaterialId] = useState("leather");
  const [colorIndex, setColorIndex] = useState(0);
  const [logo, setLogo] = useState(null);
  const [logoSize, setLogoSize] = useState(100);
  const [logoX, setLogoX] = useState(0);
  const [logoY, setLogoY] = useState(0);
  const [ownPatch, setOwnPatch] = useState(null);
  const [patchSize, setPatchSize] = useState(100);
  const [artBoxes, setArtBoxes] = useState(null);

  const material = materials.find((m) => m.id === materialId);
  const color = material.colors ? material.colors[colorIndex] : null;
  const shape = patchShapes[shapeIndex];
  const usingOwn = ownPatch && shapeIndex === -1;

  useEffect(() => {
    const img = new Image();
    img.onload = () => setHatImg(img);
    img.src = HAT.src;
    setArtBoxes(patchShapes.map((s) => pathBounds(s.art, s.box)));
  }, []);

  useEffect(() => {
    if (!hatImg || !artBoxes || !canvasRef.current) return;
    const patch = usingOwn
      ? ownPatch
      : drawPatch({ shape: { ...shape, artBox: artBoxes[shapeIndex] }, material, color, logo, logoSize, logoX, logoY });
    renderHat(canvasRef.current, hatImg, patch, usingOwn ? 3.5 : shape.widthIn, patchSize);
  }, [hatImg, artBoxes, shapeIndex, materialId, colorIndex, logo, logoSize, logoX, logoY, ownPatch, patchSize]);

  const summary = usingOwn
    ? `my own patch design on a ${HAT.name}`
    : `a ${shape.name} patch in ${color ? `${color.name} ` : ""}${material.name}${logo ? " with my logo" : ""} on a ${HAT.name}`;

  const save = () =>
    canvasRef.current.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "B40-Try-It-On.png";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    }, "image/png");

  return (
    <div>
      <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
        Shape <span className="text-[#c6a36b]">·</span> Material <span className="text-[#c6a36b]">·</span> Your Logo <span className="text-[#c6a36b]">·</span> Save &amp; Send
      </p>
      <div className="grid items-start gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
        {/* the hat */}
        <div className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]">
            <canvas ref={canvasRef} className="block h-auto w-full" aria-label={`Preview: ${summary}`} />
          </div>
          <p className="mt-3 text-center text-xs text-white/40">{HAT.name} · Preview colors are close, not exact. Ask us for samples.</p>
        </div>

        {/* the controls */}
        <div className="space-y-3">
          <Panel step="01" title="Pick a Shape">
            <div className="grid grid-cols-3 gap-2">
              {patchShapes.map((s, i) => (
                <button key={s.name} onClick={() => setShapeIndex(i)} className={`${chip(i === shapeIndex)} flex flex-col items-center gap-1.5 px-1`}>
                  <svg viewBox={s.box.join(" ")} className="h-8 w-full">
                    <path d={s.cut} fill="none" stroke="currentColor" strokeWidth={Math.max(s.box[2], s.box[3]) / 40} />
                  </svg>
                  <span className="text-[10px] leading-tight">{s.name}</span>
                </button>
              ))}
            </div>
            <label className={`${chip(usingOwn)} mt-2 flex cursor-pointer flex-col items-center gap-0.5 border-dashed py-3 text-center normal-case tracking-normal`}>
              <span className="text-sm font-semibold">Don&apos;t have the shape you want? Upload a PNG.</span>
              <span className="text-xs font-normal text-white/45">Your finished patch shows on the hat as-is.</span>
              <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="hidden" onChange={(e) => loadImage(e.target.files[0], (img) => { setOwnPatch(img); setShapeIndex(-1); })} />
            </label>
            <div className="mt-3">
              <Slider label="Patch Size" value={patchSize} min={70} max={125} onChange={setPatchSize} />
            </div>
          </Panel>

          <Panel step="02" title="Pick a Material" dim={usingOwn}>
            <div className="flex flex-wrap gap-2">
              {materials.map((m) => (
                <button key={m.id} disabled={usingOwn} onClick={() => setMaterialId(m.id)} className={chip(m.id === materialId)}>{m.name}</button>
              ))}
            </div>
            {material.colors && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {material.colors.map((c, i) => (
                  <button key={c.name} disabled={usingOwn} onClick={() => setColorIndex(i)} title={c.name} aria-label={c.name}
                    className={`h-7 w-7 rounded-full border-2 transition ${i === colorIndex ? "border-[#c6a36b]" : "border-white/20"}`} style={{ background: c.base }} />
                ))}
                <span className="ml-1 text-xs text-white/45">{color.name} · and many more colors</span>
              </div>
            )}
          </Panel>

          <Panel step="03" title="Add Your Logo" dim={usingOwn}>
            <label className={`${chip(false)} flex cursor-pointer justify-center py-3`}>
              {logo ? "Change Logo" : "Upload Your Logo"}
              <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" disabled={usingOwn} className="hidden"
                onChange={(e) => loadImage(e.target.files[0], (img) => { setLogo({ img, mask: logoMask(img) }); setLogoSize(100); setLogoX(0); setLogoY(0); })} />
            </label>
            <p className="mt-2 text-xs text-white/45">A PNG with a see-through background works best. It stays on your device.</p>
            {logo && (
              <div className="mt-3 space-y-2">
                <Slider label="Logo Size" value={logoSize} min={30} max={140} onChange={setLogoSize} />
                <Slider label="Left / Right" value={logoX} min={-40} max={40} onChange={setLogoX} />
                <Slider label="Up / Down" value={logoY} min={-40} max={40} onChange={setLogoY} />
                <button onClick={() => setLogo(null)} className="text-xs uppercase tracking-[0.15em] text-white/40 hover:text-white">Remove logo</button>
              </div>
            )}
          </Panel>

          <Panel step="04" title="Save & Send">
            <p className="mb-3 text-sm text-white/60">Love it? Save the picture, then text or email it to us and we&apos;ll take it from there.</p>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={save} className="bg-[#c6a36b] px-3 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black transition hover:bg-[#d4b07a]">Save Image</button>
              <a href={smsLink(`Hi! I made ${summary} on your Try It On page. I'll send you the picture.`)} className="border border-white/20 px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] transition hover:border-white/50">Text Us</a>
              <a href={mailtoLink(`Try It On: ${usingOwn ? "My own patch" : `${shape.name} / ${color ? `${color.name} ` : ""}${material.name}`}`)} className="border border-white/20 px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] transition hover:border-white/50">Email Us</a>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
