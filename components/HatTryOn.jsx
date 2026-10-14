"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { patchShapes } from "./patchShapes";
import { leatheretteColors, leatherColors } from "./leatherColors";
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

// Real wood grain photos (free CC0 textures from ambientCG.com) until we have our
// own close-ups. `turn` rotates photos whose grain runs up and down so it runs across the patch.
const woodColors = [
  { name: "Maple", photo: "maple", base: "#d9b77f", burn: "#4a2c14" },
  { name: "Ash", photo: "ash", base: "#d8c09a", burn: "#4a2c14" },
  { name: "Oak", photo: "oak", base: "#c4955f", burn: "#3d2310", turn: true },
  { name: "Hickory", photo: "hickory", base: "#a8743f", burn: "#2e190a" },
  { name: "Cherry", photo: "cherry", base: "#c47a45", burn: "#2e1608", turn: true },
  { name: "Cedar", photo: "cedar", base: "#d0814c", burn: "#2e1608" },
  { name: "Redwood", photo: "redwood", base: "#a65435", burn: "#241006", turn: true },
  { name: "Mahogany", photo: "mahogany", base: "#7e3e1d", burn: "#1d0c04", turn: true },
  { name: "Walnut", photo: "walnut", base: "#5a3820", burn: "#160c05" },
  { name: "Weathered Gray", photo: "weathered", base: "#5b544c", burn: "#1a1612", turn: true },
].map((w) => ({ ...w, src: `/images/try-it-on/wood/${w.photo}.jpg` }));

// Leather and leatherette colors come from our supplier (leatherColors.js); the
// other materials are stand-in looks until real material photos are in. `engrave` materials burn the
// logo and border in one color; `color` materials show the logo in full color; `direct`
// skips the patch and prints the logo straight onto the hat.
const materials = [
  {
    id: "leatherette", name: "Leatherette", mode: "engrave", texture: "grain",
    colors: leatheretteColors,
  },
  { id: "leather", name: "Genuine Leather", mode: "engrave", texture: "leather", colors: leatherColors },
  { id: "wood", name: "Real Wood", mode: "engrave", colors: woodColors },
  { id: "acrylic", name: "Acrylic", mode: "color", texture: "gloss", base: "#141414", burn: "#d9d9d9" },
  { id: "uv", name: "Full-Color UV Print", mode: "direct" },
];

const PATCH_PX = 900;
const DEFAULT_LOGO = "/images/b402026.png";

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
  } else if (texture === "gloss") {
    const g = ctx.createLinearGradient(0, 0, w * 0.7, h);
    g.addColorStop(0, "rgba(255,255,255,0.22)");
    g.addColorStop(0.35, "rgba(255,255,255,0.04)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
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

// A logo for printing straight onto the hat: trimmed to its artwork, and a flat
// white background (JPG logos) is dropped so it doesn't print as a white box.
function printLogo(img) {
  const c = document.createElement("canvas");
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const x = c.getContext("2d");
  x.drawImage(img, 0, 0);
  const data = x.getImageData(0, 0, c.width, c.height);
  const px = data.data;
  let transparent = false;
  for (let i = 3; i < px.length; i += 16) if (px[i] < 250) { transparent = true; break; }
  let minX = c.width, minY = c.height, maxX = 0, maxY = 0;
  for (let i = 0; i < px.length; i += 4) {
    if (!transparent && Math.min(px[i], px[i + 1], px[i + 2]) > 238) px[i + 3] = 0;
    if (px[i + 3] > 10) {
      const k = i / 4, X = k % c.width, Y = (k - X) / c.width;
      minX = Math.min(minX, X); maxX = Math.max(maxX, X); minY = Math.min(minY, Y); maxY = Math.max(maxY, Y);
    }
  }
  x.putImageData(data, 0, 0);
  if (maxX < minX) { c.box = { x: 0, y: 0, w: c.width, h: c.height }; return c; }
  const out = document.createElement("canvas");
  out.width = maxX - minX + 1;
  out.height = maxY - minY + 1;
  out.getContext("2d").drawImage(c, -minX, -minY);
  out.box = { x: minX, y: minY, w: out.width, h: out.height };
  return out;
}

// Fonts for the text box (Google Fonts, free to use). Loaded only on this page.
const FONTS = [
  { name: "Western", family: "Rye" },
  { name: "Block", family: "Bebas Neue" },
  { name: "Varsity", family: "Graduate" },
  { name: "Stencil", family: "Black Ops One" },
  { name: "Script", family: "Yellowtail" },
];
const FONT_CSS = "https://fonts.googleapis.com/css2?family=Rye&family=Bebas+Neue&family=Graduate&family=Black+Ops+One&family=Yellowtail&display=swap";
// UV printing can do any color, so text color is picked with two sliders:
// hue (around the rainbow) and shade (black, through the pure color, to white).
const textColorOf = (hue, shade) => `hsl(${hue}, 85%, ${shade}%)`;

// One line of text, drawn letter by letter so it can be bent into an arch (bend > 0)
// or a smile (bend < 0), squished or stretched (width/height %), and spaced out.
function renderLine(text, { px, family, ink, warp }) {
  const { bend, width, height, spacing } = warp;
  const sx = width / 100, sy = height / 100, gapPx = (spacing / 100) * px;
  const m = document.createElement("canvas").getContext("2d");
  m.font = `${px}px "${family}"`;
  const chars = [...text];
  const widths = chars.map((ch) => m.measureText(ch).width * sx);
  const total = widths.reduce((a, w) => a + w, 0) + gapPx * (chars.length - 1);
  const glyphH = px * 1.15 * sy;
  const theta = (Math.abs(bend) / 100) * Math.PI * 0.95; // how much of a circle the line wraps
  const R = theta > 0.01 ? total / theta : 0;
  const sag = R ? R * (1 - Math.cos(theta / 2)) : 0;
  const pad = px * 0.3;
  const W = Math.ceil((R ? 2 * R * Math.sin(Math.min(theta, Math.PI) / 2) : total) + glyphH + pad * 2);
  const H = Math.ceil(glyphH + sag + pad * 2);
  const c = document.createElement("canvas");
  c.width = Math.max(1, W);
  c.height = Math.max(1, H);
  const x = c.getContext("2d");
  x.font = `${px}px "${family}"`;
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillStyle = ink;
  const cx = W / 2, cy = bend >= 0 ? pad + glyphH / 2 : pad + glyphH / 2 + sag;
  let along = -total / 2;
  chars.forEach((ch, i) => {
    const mid = along + widths[i] / 2;
    along += widths[i] + gapPx;
    let px0 = cx + mid, py0 = cy, rot = 0;
    if (R) {
      const a = mid / R;
      px0 = cx + R * Math.sin(a);
      py0 = bend > 0 ? cy + R * (1 - Math.cos(a)) : cy - R * (1 - Math.cos(a));
      rot = bend > 0 ? a : -a;
    }
    x.save();
    x.translate(px0, py0);
    x.rotate(rot);
    x.scale(sx, sy);
    x.fillText(ch, 0, 0);
    x.restore();
  });
  return c;
}

// Logo and up to two lines of text, laid out as one piece of artwork: the logo on
// top, text centered under it. Returns a one-color `mask` (for engraving) and a
// full-color `print`, both the same size.
function composeArt({ logo, lines, font, textSize, textGap, textColor, warp }) {
  lines = lines.map((l) => l.trim()).filter(Boolean);
  if (!logo && !lines.length) return null;
  const box = logo ? logo.print.box : null;
  const lw = box ? box.w : 0, lh = box ? box.h : 0;
  const px = (box ? Math.max(lw, lh * 1.6) : 1000) * 0.2 * (textSize / 100);
  const rendered = (ink) => lines.map((l) => renderLine(l, { px, family: font.family, ink, warp }));
  const sample = rendered("#000");
  // rendered lines include padding; overlap them a little so they sit like normal lines
  const trim = px * 0.3;
  const textW = Math.max(0, ...sample.map((c) => c.width));
  const textH = sample.reduce((a, c) => a + c.height - trim * 2, 0) + trim * 2;
  const gap = box && lines.length ? lh * 0.1 + (textGap / 100) * lh - trim : 0;
  const textTop = lh + gap;
  const top = Math.min(0, textTop), bottom = Math.max(lh, textTop + (lines.length ? textH : 0));
  const pad = px * 0.15;
  const W = Math.ceil(Math.max(lw, textW) + pad * 2), H = Math.ceil(bottom - top + pad * 2);
  const make = (logoSrc, lineCanvases) => {
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const x = c.getContext("2d");
    const oy = pad - top;
    if (box) {
      if (logoSrc === logo.print) x.drawImage(logo.print, (W - lw) / 2, oy);
      else x.drawImage(logoSrc, box.x, box.y, box.w, box.h, (W - lw) / 2, oy, lw, lh);
    }
    let y = oy + textTop;
    lineCanvases.forEach((lc) => {
      x.drawImage(lc, (W - lc.width) / 2, y);
      y += lc.height - trim * 2;
    });
    return c;
  };
  return { mask: make(logo ? logo.mask : null, sample), print: make(logo ? logo.print : null, rendered(textColor)) };
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

function drawPatch({ shape, material, color, art, logoSize, logoX, logoY }) {
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
  if (look.img) {
    // grain photo, scaled to cover the whole patch
    const turn = look.turn, iw = turn ? look.img.height : look.img.width, ih = turn ? look.img.width : look.img.height;
    const sc = Math.max(c.width / iw, c.height / ih);
    x.translate(c.width / 2, c.height / 2);
    if (turn) x.rotate(Math.PI / 2);
    x.drawImage(look.img, (-look.img.width * sc) / 2, (-look.img.height * sc) / 2, look.img.width * sc, look.img.height * sc);
    x.setTransform(1, 0, 0, 1, 0, 0);
  } else {
    drawTexture(x, material.texture, c.width, c.height);
  }
  x.restore();

  // logo and text, clipped to the artwork area
  if (art) {
    toShape();
    x.save();
    x.clip(new Path2D(shape.art));
    const [ax, ay, aw, ah] = shape.artBox;
    const src = material.mode === "engrave" ? tint(art.mask, look.burn) : art.print;
    const iw = art.print.width, ih = art.print.height;
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
function wrapPoint(u, v, W, H, p, pw, ph, off) {
  const q = u - 0.5, half = Math.PI * p.wrap * 0.5;
  const nx = Math.sin(q * Math.PI * p.wrap) / (2 * Math.sin(half));
  const edge = (1 - Math.cos(q * Math.PI * p.wrap)) / (1 - Math.cos(half));
  return { x: (p.cx + off.x) * W + nx * pw, y: (p.cy + off.y) * H + (v - 0.5) * ph + p.edgeDrop * edge * ph };
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

function renderHat(canvas, hatImg, patch, widthIn, size, off) {
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
      const d00 = wrapPoint(u0, v0, W, H, p, pw, ph, off), d10 = wrapPoint(u1, v0, W, H, p, pw, ph, off);
      const d01 = wrapPoint(u0, v1, W, H, p, pw, ph, off), d11 = wrapPoint(u1, v1, W, H, p, pw, ph, off);
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
        {step && <span className="mr-2 text-[#c6a36b]">{step}</span>}{title}
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
  const [colorIndex, setColorIndex] = useState(1); // Jersey Tan leather
  const [logo, setLogo] = useState(null);
  const [logoSize, setLogoSize] = useState(100);
  const [logoX, setLogoX] = useState(0);
  const [logoY, setLogoY] = useState(0);
  const [ownPatch, setOwnPatch] = useState(null);
  const [patchSize, setPatchSize] = useState(100);
  const [artBoxes, setArtBoxes] = useState(null);
  const [woodImgs, setWoodImgs] = useState({}); // grain photos, loaded the first time Real Wood is picked
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // where the patch sits, as a fraction of the photo
  const drag = useRef(null);
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [fontIndex, setFontIndex] = useState(0);
  const [textSize, setTextSize] = useState(100);
  const [textGap, setTextGap] = useState(0);
  const NO_WARP = { bend: 0, width: 100, height: 100, spacing: 0 };
  const [warp, setWarp] = useState(NO_WARP);
  const setWarpPart = (k) => (v) => setWarp((w) => ({ ...w, [k]: v }));
  const [textHue, setTextHue] = useState(40);
  const [textShade, setTextShade] = useState(100); // starts white
  const textColor = textColorOf(textHue, textShade);
  const [fontsReady, setFontsReady] = useState(0);

  const material = materials.find((m) => m.id === materialId);
  const pick = material.colors ? material.colors[colorIndex] : null;
  const color = pick && pick.src ? { ...pick, img: woodImgs[pick.photo] } : pick;
  const shape = patchShapes[shapeIndex];
  const usingOwn = ownPatch && shapeIndex === -1;
  const direct = material.mode === "direct" && !usingOwn;

  useEffect(() => {
    const img = new Image();
    img.onload = () => setHatImg(img);
    // Start with the B40 logo on the patch so the preview shows off right away.
    const b40 = new Image();
    b40.onload = () => setLogo((current) => current || { img: b40, mask: logoMask(b40), print: printLogo(b40), isDefault: true });
    b40.src = DEFAULT_LOGO;
    img.src = HAT.src;
    setArtBoxes(patchShapes.map((s) => pathBounds(s.art, s.box)));
    if (!document.getElementById("try-it-on-fonts")) {
      const link = document.createElement("link");
      link.id = "try-it-on-fonts";
      link.rel = "stylesheet";
      link.href = FONT_CSS;
      document.head.appendChild(link);
    }
    // redraw as each font arrives so typed text never shows in a fallback font
    FONTS.forEach((f) => document.fonts.load(`80px "${f.family}"`).then(() => setFontsReady((n) => n + 1)));
  }, []);

  const font = FONTS[fontIndex];
  const art = useMemo(
    () => composeArt({ logo, lines: [line1, line2], font, textSize, textGap, textColor, warp }),
    [logo, line1, line2, fontIndex, textSize, textGap, textColor, warp, fontsReady]
  );
  const typed = [line1, line2].map((l) => l.trim()).filter(Boolean);

  // The patch is drawn once per design change; moving it only re-wraps it onto the hat.
  const patch = useMemo(() => {
    if (!artBoxes) return null;
    if (usingOwn) return ownPatch;
    if (direct) return art ? art.print : null;
    return drawPatch({ shape: { ...shape, artBox: artBoxes[shapeIndex] }, material, color, art, logoSize, logoX, logoY });
  }, [artBoxes, shapeIndex, materialId, colorIndex, art, logoSize, logoX, logoY, ownPatch, woodImgs]);

  useEffect(() => {
    if (materialId !== "wood" || Object.keys(woodImgs).length) return;
    for (const w of woodColors) {
      const img = new Image();
      img.onload = () => setWoodImgs((m) => ({ ...m, [w.photo]: img }));
      img.src = w.src;
    }
  }, [materialId]);

  useEffect(() => {
    if (!hatImg || !canvasRef.current) return;
    const widthIn = usingOwn ? 3.5 : direct ? 3.2 * (logoSize / 100) : shape.widthIn;
    renderHat(canvasRef.current, hatImg, patch, widthIn, patchSize, offset);
  }, [hatImg, patch, patchSize, offset, logoSize]);

  // Drag the patch around the hat with a mouse or finger.
  const startDrag = (e) => {
    drag.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const moveDrag = (e) => {
    if (!drag.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - drag.current.x) / r.width, dy = (e.clientY - drag.current.y) / r.height;
    drag.current = { x: e.clientX, y: e.clientY };
    const clamp = (v) => Math.max(-0.32, Math.min(0.32, v));
    setOffset((o) => ({ x: clamp(o.x + dx), y: clamp(o.y + dy) }));
  };
  const endDrag = () => { drag.current = null; };

  const summary = usingOwn
    ? `my own patch design on a ${HAT.name}`
    : direct
    ? `${logo && !logo.isDefault ? "my logo" : "a design"} printed in full color right on a ${HAT.name}`
    : `a ${shape.name} patch in ${color ? `${color.name} ` : ""}${material.name}${logo && !logo.isDefault ? " with my logo" : ""} on a ${HAT.name}`;
  const fullSummary = summary + (typed.length ? `, with the text "${typed.join(" / ")}" in the ${font.name} font` : "");

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
        Shape <span className="text-[#c6a36b]">·</span> Material <span className="text-[#c6a36b]">·</span> Your Logo <span className="text-[#c6a36b]">·</span> Text <span className="text-[#c6a36b]">·</span> Save &amp; Send
      </p>
      <div className="grid items-start gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
        {/* the hat */}
        {/* stays in view while the controls scroll, so every change shows on the hat */}
        <div className="sticky top-[65px] z-20 -mx-6 bg-black px-6 pb-2 pt-1 lg:top-[97px] lg:mx-0 lg:px-0 lg:pb-0 lg:pt-0">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]">
            <canvas ref={canvasRef} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}
              className="mx-auto block h-auto max-h-[36vh] w-auto max-w-full cursor-grab touch-none active:cursor-grabbing lg:max-h-[calc(100vh-150px)]" aria-label={`Preview: ${summary}`} />
          </div>
          <p className="mt-2 text-center text-[11px] text-white/60 lg:mt-3 lg:text-xs">
            Drag the {direct ? "logo" : "patch"} to move it anywhere on the hat.
            {(offset.x !== 0 || offset.y !== 0) && <button onClick={() => setOffset({ x: 0, y: 0 })} className="ml-2 uppercase tracking-[0.12em] text-[#c6a36b] hover:text-white">Center it</button>}
          </p>
          <p className="mt-1 text-center text-[11px] text-white/35 lg:text-xs">{HAT.name} · Preview colors are close, not exact. Ask us for samples.</p>
        </div>

        {/* the controls */}
        <div className="space-y-3">
          <Panel step="01" title="Pick a Shape">
            {direct && <p className="mb-2 text-xs text-white/60">Full-color UV prints go right on the hat, so there&apos;s no patch shape.</p>}
            <div className={direct ? "pointer-events-none opacity-40" : ""}>
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
              <span className="text-sm font-semibold">Have a different shape in mind? Upload your own patch.</span>
              <span className="text-xs font-normal text-white/45">Got a picture of a patch you designed? Add it here and we&apos;ll show it on the hat just as it looks.</span>
              <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="hidden" onChange={(e) => loadImage(e.target.files[0], (img) => { setOwnPatch(img); setShapeIndex(-1); })} />
            </label>
            </div>
            <div className="mt-3">
              <Slider label={direct ? "Print Size" : "Patch Size"} value={patchSize} min={70} max={125} onChange={setPatchSize} />
            </div>
          </Panel>

          <Panel step="02" title="Pick a Material" dim={usingOwn}>
            <div className="flex flex-wrap gap-2">
              {materials.map((m) => (
                <button key={m.id} disabled={usingOwn} onClick={() => { setMaterialId(m.id); setColorIndex(0); }} className={chip(m.id === materialId)}>{m.name}</button>
              ))}
            </div>
            {direct && <p className="mt-3 text-xs text-white/60">No patch: your logo is printed in full color right onto the hat.{!logo && " Add your logo below to see it."}</p>}
            {material.colors && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {material.colors.map((c, i) => (
                  <button key={c.name} disabled={usingOwn} onClick={() => setColorIndex(i)} title={c.name} aria-label={c.name}
                    className={`h-7 w-7 rounded-full border-2 transition ${i === colorIndex ? "scale-110 border-[#c6a36b]" : "border-white/20"}`}
                    style={{ background: c.src ? `center / cover url(${c.src})` : `linear-gradient(135deg, ${c.base} 58%, ${c.burn} 58%)` }} />
                ))}
                <p className="w-full text-xs text-white/60">{color.name} <span className="text-white/35">· {materialId === "wood" ? `${material.colors.length} woods` : `base / engrave color · ${material.colors.length} colors`}</span></p>
              </div>
            )}
          </Panel>

          <Panel step="03" title="Add Your Logo" dim={usingOwn}>
            <label className={`${chip(false)} flex cursor-pointer justify-center py-3`}>
              {logo && !logo.isDefault ? "Change Logo" : "Upload Your Logo"}
              <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" disabled={usingOwn} className="hidden"
                onChange={(e) => loadImage(e.target.files[0], (img) => { setLogo({ img, mask: logoMask(img), print: printLogo(img) }); setLogoSize(100); setLogoX(0); setLogoY(0); })} />
            </label>
            <p className="mt-2 text-xs text-white/45">A PNG with a see-through background works best. It stays on your device.</p>
            {logo && <button onClick={() => setLogo(null)} className="mt-2 text-xs uppercase tracking-[0.15em] text-white/40 hover:text-white">Remove logo</button>}
          </Panel>

          <Panel step="04" title="Add Text" dim={usingOwn}>
            <div className="space-y-2">
              {[[line1, setLine1, "Line 1 (like your name or business)"], [line2, setLine2, "Line 2 (optional, like EST. 2024)"]].map(([value, set, hint], i) => (
                <input key={i} value={value} onChange={(e) => set(e.target.value)} placeholder={hint} maxLength={28} disabled={usingOwn}
                  className="w-full rounded-lg border border-white/15 bg-black px-3 py-2.5 text-white placeholder:text-white/30 focus:border-[#c6a36b] focus:outline-none"
                  style={{ fontFamily: `"${font.family}", sans-serif`, fontSize: 18 }} />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {FONTS.map((f, i) => (
                <button key={f.name} disabled={usingOwn} onClick={() => setFontIndex(i)} className={`${chip(i === fontIndex)} normal-case tracking-normal`}
                  style={{ fontFamily: `"${f.family}", sans-serif`, fontSize: 16 }}>{f.name}</button>
              ))}
            </div>
            {material.mode !== "engrave" && (
              <div className="mt-3 space-y-2">
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/50">
                  Text Color <span className="h-5 w-5 rounded-full border border-white/30" style={{ background: textColor }} />
                  <span className="normal-case tracking-normal text-white/35">Any color, printed in full color</span>
                </p>
                <input type="range" min={0} max={360} value={textHue} onChange={(e) => setTextHue(Number(e.target.value))} aria-label="Text color"
                  className="color-slider h-3 w-full cursor-pointer appearance-none rounded-full"
                  style={{ background: "linear-gradient(to right, hsl(0,85%,50%), hsl(60,85%,50%), hsl(120,85%,50%), hsl(180,85%,50%), hsl(240,85%,50%), hsl(300,85%,50%), hsl(360,85%,50%))" }} />
                <input type="range" min={0} max={100} value={textShade} onChange={(e) => setTextShade(Number(e.target.value))} aria-label="Text shade, dark to light"
                  className="color-slider h-3 w-full cursor-pointer appearance-none rounded-full"
                  style={{ background: `linear-gradient(to right, #000, ${textColorOf(textHue, 50)}, #fff)` }} />
                <div className="flex justify-between text-[10px] uppercase tracking-[0.15em] text-white/35"><span>Darker</span><span>Lighter</span></div>
              </div>
            )}
            {typed.length > 0 && (
              <div className="mt-3 space-y-2">
                <Slider label="Text Size" value={textSize} min={40} max={180} onChange={setTextSize} />
                {logo && <Slider label="Space Between Logo & Text" value={textGap} min={-60} max={60} onChange={setTextGap} />}
                <p className="pt-2 text-xs uppercase tracking-[0.15em] text-white/70">Shape the Text</p>
                <Slider label="Bend ← smile · arch →" value={warp.bend} min={-100} max={100} onChange={setWarpPart("bend")} />
                <Slider label="Squish ← width → stretch" value={warp.width} min={50} max={170} onChange={setWarpPart("width")} />
                <Slider label="Short ← height → tall" value={warp.height} min={50} max={170} onChange={setWarpPart("height")} />
                <Slider label="Letter Spacing" value={warp.spacing} min={-15} max={60} onChange={setWarpPart("spacing")} />
                {JSON.stringify(warp) !== JSON.stringify(NO_WARP) && (
                  <button onClick={() => setWarp(NO_WARP)} className="text-xs uppercase tracking-[0.15em] text-[#c6a36b] hover:text-white">Straighten text</button>
                )}
              </div>
            )}
            {material.mode === "engrave" && typed.length > 0 && <p className="mt-2 text-xs text-white/45">Text is engraved, just like the logo.</p>}
          </Panel>

          {art && (
            <Panel step="" title="Size & Position">
              <p className="-mt-1 mb-3 text-xs text-white/45">Moves your logo and text together.{!direct && " Drag the patch on the hat to move the whole patch."}</p>
              <div className="space-y-2">
                <Slider label="Size" value={logoSize} min={30} max={140} onChange={setLogoSize} />
                {!direct && <Slider label="Left / Right" value={logoX} min={-40} max={40} onChange={setLogoX} />}
                {!direct && <Slider label="Up / Down" value={logoY} min={-40} max={40} onChange={setLogoY} />}
              </div>
            </Panel>
          )}

          <Panel step="05" title="Save & Send">
            <p className="mb-3 text-sm text-white/60">Love it? Save the picture, then text or email it to us and we&apos;ll take it from there.</p>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={save} className="bg-[#c6a36b] px-3 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black transition hover:bg-[#d4b07a]">Save Image</button>
              <a href={smsLink(`Hi! I made ${fullSummary} on your Try It On page. I'll send you the picture.`)} className="border border-white/20 px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] transition hover:border-white/50">Text Us</a>
              <a href={mailtoLink(`Try It On: ${usingOwn ? "My own patch" : `${shape.name} / ${color ? `${color.name} ` : ""}${material.name}`}`)} className="border border-white/20 px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] transition hover:border-white/50">Email Us</a>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
