"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { patchShapes } from "./patchShapes";
import { leatheretteColors, leatherColors } from "./leatherColors";
import { smsLink, EMAIL, PHONES } from "./contact";

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
const FORMSPREE_ID = "xzdywzvy"; // same form as the home page contact form
const QUANTITIES = ["1–10", "11–24", "25–50", "51+ (best pricing)"];
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

// Up to two lines of text stacked into one block, each line shaped by `warp`.
function renderTextBlock(lines, { px, family, ink, warp }) {
  const rendered = lines.map((l) => renderLine(l, { px, family, ink, warp }));
  const trim = px * 0.3; // each line carries padding; overlap it so lines sit close
  const W = Math.max(1, ...rendered.map((c) => c.width));
  const H = Math.max(1, Math.ceil(rendered.reduce((a, c) => a + c.height - trim * 2, 0) + trim * 2));
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const x = c.getContext("2d");
  let y = 0;
  rendered.forEach((lc) => {
    x.drawImage(lc, (W - lc.width) / 2, y);
    y += lc.height - trim * 2;
  });
  return c;
}

// An uploaded (or the default) logo, ready to use: `print` is the full-color art
// trimmed to its edges, `mask` the matching one-color version for engraving.
function makeLogo(img, isDefault = false) {
  const print = printLogo(img);
  const full = logoMask(img), b = print.box;
  const mask = document.createElement("canvas");
  mask.width = b.w;
  mask.height = b.h;
  mask.getContext("2d").drawImage(full, b.x, b.y, b.w, b.h, 0, 0, b.w, b.h);
  return { img, print, mask, isDefault };
}

// Draws the logo and text into the artwork area [ax, ay, aw, ah] of a canvas whose
// current transform maps those units to pixels at scale k. Positions are fractions
// of the artwork area from its center. Returns where each piece landed, for clicking.
function drawArtwork(x, { area, k, engrave, burn, logo, logoSize, logoPos, lines, font, textSize, textPos, textColor, warp }) {
  const [ax, ay, aw, ah] = area;
  const hits = {};
  if (logo) {
    const lw = logo.print.width, lh = logo.print.height;
    const fit = Math.min(aw / lw, ah / lh) * 0.86 * (logoSize / 100);
    const w = lw * fit, h = lh * fit;
    const cx = ax + aw / 2 + logoPos.x * aw, cy = ay + ah / 2 + logoPos.y * ah;
    x.drawImage(engrave ? tint(logo.mask, burn) : logo.print, cx - w / 2, cy - h / 2, w, h);
    hits.logo = [cx - w / 2, cy - h / 2, w, h];
  }
  if (lines.length) {
    const px = ah * 0.24 * (textSize / 100) * k; // drawn at full pixel size so it stays sharp
    const block = renderTextBlock(lines, { px, family: font.family, ink: engrave ? burn : textColor, warp });
    // never wider than the artwork area, so long names don't run off the patch
    const fitText = Math.min(1, (aw * 0.98) / (block.width / k - (0.5 * px) / k));
    const w = (block.width / k) * fitText, h = (block.height / k) * fitText, padIn = ((0.25 * px) / k) * fitText;
    const cx = ax + aw / 2 + textPos.x * aw, cy = ay + ah / 2 + textPos.y * ah;
    x.drawImage(block, cx - w / 2, cy - h / 2, w, h);
    // the clickable box skips the block's empty padding
    hits.text = [cx - w / 2 + padIn, cy - h / 2 + padIn, w - padIn * 2, h - padIn * 2];
  }
  return hits;
}

// Full-color UV print: no patch, just the artwork on a clear sheet that gets
// wrapped onto the hat. The sheet stays a fixed size so moving one piece doesn't shift the other.
const PRINT_SHEET = [0, 0, 1200, 800];
function drawPrint(art) {
  const c = document.createElement("canvas");
  c.width = PRINT_SHEET[2];
  c.height = PRINT_SHEET[3];
  const hits = drawArtwork(c.getContext("2d"), { ...art, area: PRINT_SHEET, k: 1, engrave: false });
  c.hits = hits;
  c.artScale = { x: 1, y: 1 };
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

function drawPatch({ shape, material, color, art }) {
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
  toShape();
  x.save();
  x.clip(new Path2D(shape.art));
  const engrave = material.mode === "engrave";
  const hits = drawArtwork(x, { ...art, area: shape.artBox, k, engrave, burn: look.burn });
  x.restore();
  // remember where things are in patch pixels, so clicks on the hat can find them
  const toPx = ([hx, hy, hw, hh]) => [(hx - bx) * k, (hy - by) * k, hw * k, hh * k];
  c.hits = Object.fromEntries(Object.entries(hits).map(([key, r]) => [key, toPx(r)]));
  c.artScale = { x: bw / shape.artBox[2], y: bh / shape.artBox[3] };

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
  if (!patch) return null;
  const p = HAT.profile;
  const pw = p.width * W * (widthIn / HAT.fitWidthIn) * (size / 100);
  const ph = pw * (patch.height / patch.width);
  const geom = { W, H, p, pw, ph, off };
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
  return geom;
}

// The reverse of the crown wrap: a point on the hat photo back to (u, v) on the patch.
function unwrapPoint(X, Y, { W, H, p, pw, ph, off }) {
  const half = Math.PI * p.wrap * 0.5;
  const s = ((X - (p.cx + off.x) * W) / pw) * 2 * Math.sin(half);
  if (Math.abs(s) > 1) return null;
  const q = Math.asin(s) / (Math.PI * p.wrap);
  const edge = (1 - Math.cos(q * Math.PI * p.wrap)) / (1 - Math.cos(half));
  return { u: q + 0.5, v: (Y - (p.cy + off.y) * H - p.edgeDrop * edge * ph) / ph + 0.5 };
}

// Dashed outline around the selected piece, following the crown's curve.
function drawSelection(canvas, geom, patch, rect) {
  const ctx = canvas.getContext("2d");
  const [rx, ry, rw, rh] = rect;
  const pts = [];
  const edge = (x0, y0, x1, y1) => {
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      pts.push(wrapPoint((x0 + (x1 - x0) * t) / patch.width, (y0 + (y1 - y0) * t) / patch.height, geom.W, geom.H, geom.p, geom.pw, geom.ph, geom.off));
    }
  };
  edge(rx, ry, rx + rw, ry);
  edge(rx + rw, ry, rx + rw, ry + rh);
  edge(rx + rw, ry + rh, rx, ry + rh);
  edge(rx, ry + rh, rx, ry);
  ctx.save();
  ctx.beginPath();
  pts.forEach((pt, i) => (i ? ctx.lineTo(pt.x, pt.y) : ctx.moveTo(pt.x, pt.y)));
  ctx.closePath();
  ctx.lineWidth = Math.max(2, geom.W * 0.003);
  ctx.setLineDash([geom.W * 0.012, geom.W * 0.008]);
  ctx.strokeStyle = "#c6a36b";
  ctx.shadowColor = "rgba(0,0,0,0.8)";
  ctx.shadowBlur = 4;
  ctx.stroke();
  ctx.restore();
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

// One-tap starting points. Colors are found by name in the material's list.
const STRAIGHT = { bend: 0, width: 100, height: 100, spacing: 0 };
const STARTERS = [
  { name: "Ranch", shape: "Arkansas", material: "leatherette", color: "Rawhide / Black", lines: ["DOUBLE R RANCH", "EST. 1998"], font: "Western", textSize: 70 },
  { name: "Bass Club", shape: "Ridgeback", material: "wood", color: "Walnut", lines: ["BIG BASS CLUB", ""], font: "Block", textSize: 130, warp: { ...STRAIGHT, bend: -45 } },
  { name: "Car Lot", shape: "Ironhide", material: "leatherette", color: "Black / Gold", lines: ["FRONT LINE", "MOTORS"], font: "Stencil", textSize: 95 },
  { name: "Little League", shape: "Bullseye", material: "uv", lines: ["TIGERS", "2026"], font: "Varsity", textSize: 120, hue: 0, shade: 45, warp: { ...STRAIGHT, bend: 40 } },
  { name: "Hunting Camp", shape: "Cowboy Buckle", material: "leather", color: "Jersey Tan", lines: ["DEER CAMP", ""], font: "Western", textSize: 120 },
  { name: "Small Business", shape: "Forge", material: "leatherette", color: "Black / Silver", lines: ["YOUR BUSINESS", "BELLA VISTA, AR"], font: "Block", textSize: 110 },
];

// A design packed into a short link-safe string (and back) for share links.
const packDesign = (d) => btoa(unescape(encodeURIComponent(JSON.stringify(d)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unpackDesign = (str) => JSON.parse(decodeURIComponent(escape(atob(str.replace(/-/g, "+").replace(/_/g, "/")))));

// Quick "Lookin' good!" with a burst of confetti over the hat when a design is saved.
function Celebration() {
  const colors = ["#c6a36b", "#ffffff", "#c0262d", "#3e69b2", "#e3d310"];
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
      {Array.from({ length: 36 }, (_, i) => (
        <span key={i} className="confetti-piece absolute left-1/2 top-1/2 h-2.5 w-1.5 rounded-sm"
          style={{ background: colors[i % colors.length], "--dx": `${Math.cos(i * 2.4) * (140 + (i % 5) * 40)}px`, "--dy": `${Math.sin(i * 2.4) * (110 + (i % 4) * 35) - 60}px`, "--r": `${i * 47}deg`, animationDelay: `${(i % 6) * 0.03}s` }} />
      ))}
      <p className="celebrate-pop rounded-full bg-black/80 px-6 py-3 text-3xl uppercase text-white shadow-2xl md:text-4xl" style={bebas}>Lookin&apos; good! 🤠</p>
    </div>
  );
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
  const b40Logo = useRef(null);
  const wantB40 = useRef(true); // false once a starter or share link says "no logo"
  const [logoSize, setLogoSize] = useState(100);
  // where the logo and text sit, as fractions of the patch's artwork area from its center
  const [logoPos, setLogoPos] = useState({ x: 0, y: 0 });
  const [textPos, setTextPos] = useState({ x: 0, y: 0.33 });
  const [selected, setSelected] = useState(null); // "patch", "logo" or "text": what a drag moves
  const geomRef = useRef(null);
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
    b40.onload = () => {
      b40Logo.current = makeLogo(b40, true);
      if (wantB40.current) setLogo((current) => current || b40Logo.current);
    };
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
  const typed = [line1, line2].map((l) => l.trim()).filter(Boolean);
  const art = { logo, logoSize, logoPos, lines: typed, font, textSize, textPos, textColor, warp };

  // The first time someone types, make room: logo moves up a bit, text goes under it.
  const hadText = useRef(false);
  useEffect(() => {
    if (!typed.length || hadText.current) return;
    hadText.current = true;
    if (logo) {
      setLogoPos((p) => (p.x === 0 && p.y === 0 ? { x: 0, y: -0.16 } : p));
      setLogoSize((v) => (v === 100 ? 72 : v));
    } else setTextPos({ x: 0, y: 0 });
  }, [typed.length]);

  const hatWidthIn = usingOwn ? 3.5 : direct ? 4.4 : shape.widthIn;
  const [moved, setMoved] = useState(false);

  // The patch is drawn once per design change; moving it only re-wraps it onto the hat.
  const patch = useMemo(() => {
    if (!artBoxes) return null;
    if (usingOwn) return ownPatch;
    if (direct) return logo || typed.length ? drawPrint(art) : null;
    return drawPatch({ shape: { ...shape, artBox: artBoxes[shapeIndex] }, material, color, art });
  }, [artBoxes, shapeIndex, materialId, colorIndex, logo, logoSize, logoPos, line1, line2, fontIndex, textSize, textPos, textColor, warp, fontsReady, ownPatch, woodImgs]);

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
    const geom = renderHat(canvasRef.current, hatImg, patch, hatWidthIn, patchSize, offset);
    geomRef.current = geom;
    if (geom && selected) {
      const rect = selected === "patch" ? [0, 0, patch.width, patch.height] : patch.hits && patch.hits[selected];
      if (rect) drawSelection(canvasRef.current, geom, patch, rect);
    }
  }, [hatImg, patch, hatWidthIn, patchSize, offset, selected]);

  // Click the patch, logo or text to pick it up, then drag to move it.
  const startDrag = (e) => {
    const cv = e.currentTarget, r = cv.getBoundingClientRect(), geom = geomRef.current;
    let target = "patch";
    if (geom && patch && patch.hits) {
      const uv = unwrapPoint(((e.clientX - r.left) * cv.width) / r.width, ((e.clientY - r.top) * cv.height) / r.height, geom);
      if (uv) {
        const X = uv.u * patch.width, Y = uv.v * patch.height;
        const inside = (rect) => rect && X >= rect[0] && X <= rect[0] + rect[2] && Y >= rect[1] && Y <= rect[1] + rect[3];
        if (inside(patch.hits.text)) target = "text";
        else if (inside(patch.hits.logo)) target = "logo";
      }
    }
    setSelected(target);
    drag.current = { x: e.clientX, y: e.clientY, target };
    cv.setPointerCapture(e.pointerId);
  };
  const moveDrag = (e) => {
    if (!drag.current) return;
    const cv = e.currentTarget, r = cv.getBoundingClientRect(), geom = geomRef.current;
    const dx = (e.clientX - drag.current.x) / r.width, dy = (e.clientY - drag.current.y) / r.height;
    drag.current = { ...drag.current, x: e.clientX, y: e.clientY };
    const { target } = drag.current;
    setMoved(true);
    if (target === "patch" || !geom || !patch.artScale) {
      const clamp = (v) => Math.max(-0.32, Math.min(0.32, v));
      setOffset((o) => ({ x: clamp(o.x + dx), y: clamp(o.y + dy) }));
      return;
    }
    // screen movement → movement across the patch's artwork area
    const du = ((dx * geom.W) / geom.pw) * patch.artScale.x, dv = ((dy * geom.H) / geom.ph) * patch.artScale.y;
    const clamp = (v) => Math.max(-0.7, Math.min(0.7, v));
    const move = (pos) => ({ x: clamp(pos.x + du), y: clamp(pos.y + dv) });
    if (target === "logo") setLogoPos(move);
    else setTextPos(move);
  };
  const endDrag = () => { drag.current = null; };
  const resetPositions = () => {
    setMoved(false);
    setOffset({ x: 0, y: 0 });
    setLogoPos(typed.length && logo ? { x: 0, y: -0.16 } : { x: 0, y: 0 });
    setTextPos(typed.length && logo ? { x: 0, y: 0.33 } : { x: 0, y: 0 });
    setPatchSize(100);
  };

  // Everything needed to rebuild this design, for share links.
  const design = {
    v: 1, s: shapeIndex, m: materialId, c: colorIndex, l: [line1, line2], f: fontIndex, ts: textSize, w: warp,
    h: textHue, sh: textShade, lg: logo ? (logo.isDefault ? "b40" : "own") : "none", ls: logoSize, lp: logoPos, tp: textPos, o: offset, ps: patchSize,
  };
  const applyDesign = (d) => {
    hadText.current = true; // the design already has its own layout
    wantB40.current = d.lg === "b40";
    setLogo(d.lg === "b40" ? b40Logo.current : null);
    setShapeIndex(d.s === -1 ? 7 : d.s);
    setMaterialId(d.m);
    setColorIndex(d.c || 0);
    setLine1(d.l[0] || "");
    setLine2(d.l[1] || "");
    setFontIndex(d.f || 0);
    setTextSize(d.ts || 100);
    setWarp(d.w || STRAIGHT);
    setTextHue(d.h ?? 40);
    setTextShade(d.sh ?? 100);
    setLogoSize(d.ls || 100);
    setLogoPos(d.lp || { x: 0, y: 0 });
    setTextPos(d.tp || { x: 0, y: 0 });
    setOffset(d.o || { x: 0, y: 0 });
    setPatchSize(d.ps || 100);
    setSelected(null);
    setMoved(false);
  };
  const applyStarter = (st) => {
    const mat = materials.find((m) => m.id === st.material);
    const ci = mat.colors ? Math.max(0, mat.colors.findIndex((c) => c.name === st.color)) : 0;
    applyDesign({
      s: patchShapes.findIndex((sh) => sh.name === st.shape), m: st.material, c: ci, l: st.lines,
      f: FONTS.findIndex((f) => f.name === st.font), ts: st.textSize, w: st.warp || STRAIGHT, h: st.hue, sh: st.shade, lg: "none",
    });
    setStarter(st.name);
  };
  const [starter, setStarter] = useState(null);

  // Opened from a share link? Rebuild that design.
  const [sharedNeedsLogo, setSharedNeedsLogo] = useState(false);
  useEffect(() => {
    const d = new URLSearchParams(window.location.search).get("d");
    if (!d) return;
    try {
      const shared = unpackDesign(d);
      applyDesign(shared);
      setSharedNeedsLogo(shared.lg === "own");
    } catch {}
  }, []);
  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    setShareUrl(`${window.location.origin}/try-it-on?d=${packDesign(design)}#try-it-on`);
  }, [JSON.stringify(design)]);
  const [copied, setCopied] = useState(false);
  const copyShare = async () => {
    try { await navigator.clipboard.writeText(shareUrl); } catch { window.prompt("Copy this link:", shareUrl); }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const [celebrating, setCelebrating] = useState(0);
  const celebrate = () => {
    setCelebrating((n) => n + 1);
    setTimeout(() => setCelebrating(0), 2400);
  };
  const countHat = () =>
    fetch("/api/hat-count", { method: "POST" })
      .then((r) => r.json())
      .then((d) => d.count != null && window.dispatchEvent(new CustomEvent("hat-count", { detail: d.count }))) // rolls the odometer
      .catch(() => {});

  // "Send This Design to B40": picture goes to our storage, details go to Formspree.
  const [sendOpen, setSendOpen] = useState(false);
  const [sendForm, setSendForm] = useState({ name: "", contact: "", quantity: "", notes: "" });
  const [sendStatus, setSendStatus] = useState("idle"); // idle | sending | sent | error
  const sendDesign = async (e) => {
    e.preventDefault();
    setSendStatus("sending");
    let imageUrl = "(picture didn't upload)";
    try {
      const clean = document.createElement("canvas");
      renderHat(clean, hatImg, patch, hatWidthIn, patchSize, offset);
      const res = await fetch("/api/design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: clean.toDataURL("image/jpeg", 0.88) }),
      });
      if (res.ok) imageUrl = (await res.json()).imageUrl;
    } catch {}
    try {
      const contact = sendForm.contact.trim();
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Hat Maker design from ${sendForm.name}`,
          name: sendForm.name,
          contact,
          ...(contact.includes("@") ? { email: contact } : { phone: contact }),
          quantity: sendForm.quantity,
          message: sendForm.notes,
          design: fullSummary,
          picture: imageUrl,
          open_their_design: shareUrl,
        }),
      });
      if (!res.ok) throw new Error();
      setSendStatus("sent");
      celebrate();
      countHat();
    } catch {
      setSendStatus("error");
    }
  };

  const summary = usingOwn
    ? `my own patch design on a ${HAT.name}`
    : direct
    ? `${logo && !logo.isDefault ? "my logo" : "a design"} printed in full color right on a ${HAT.name}`
    : `${/^[AEIOU]/.test(shape.name) ? "an" : "a"} ${shape.name} patch in ${color ? `${color.name} ` : ""}${material.name}${logo && !logo.isDefault ? " with my logo" : ""} on a ${HAT.name}`;
  const fullSummary = summary + (typed.length ? `, with the text "${typed.join(" / ")}" in the ${font.name} font` : "");

  const save = () => {
    const clean = document.createElement("canvas");
    renderHat(clean, hatImg, patch, hatWidthIn, patchSize, offset);
    clean.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "B40-Try-It-On.png";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    }, "image/png");
    celebrate();
    countHat(); // every saved hat counts toward the Hat Maker total
  };

  return (
    <div>
      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Start from an idea</p>
        <div className="flex flex-wrap gap-2">
          {STARTERS.map((st) => (
            <button key={st.name} onClick={() => applyStarter(st)} className={chip(starter === st.name)}>{st.name}</button>
          ))}
        </div>
      </div>
      {sharedNeedsLogo && !logo && (
        <p className="mb-4 rounded-lg border border-[#c6a36b]/40 bg-[#c6a36b]/10 px-4 py-2 text-sm text-white/80">Someone shared this design with you. Add your logo to finish it.</p>
      )}
      <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
        Shape <span className="text-[#c6a36b]">·</span> Material <span className="text-[#c6a36b]">·</span> Your Logo <span className="text-[#c6a36b]">·</span> Text <span className="text-[#c6a36b]">·</span> Save &amp; Send
      </p>
      <div className="grid items-start gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
        {/* the hat */}
        {/* stays in view while the controls scroll, so every change shows on the hat */}
        <div className="sticky top-[65px] z-20 -mx-6 bg-black px-6 pb-2 pt-1 lg:top-[97px] lg:mx-0 lg:px-0 lg:pb-0 lg:pt-0">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]">
            {celebrating > 0 && <Celebration key={celebrating} />}
            <canvas ref={canvasRef} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}
              className="mx-auto block h-auto max-h-[36vh] w-auto max-w-full cursor-grab touch-none active:cursor-grabbing lg:max-h-[calc(100vh-150px)]" aria-label={`Preview: ${summary}`} />
          </div>
          <p className="mt-2 text-center text-[11px] text-white/60 lg:mt-3 lg:text-xs">
            {selected === "logo" ? "Logo selected: drag it anywhere on the " + (direct ? "hat." : "patch.")
              : selected === "text" ? "Text selected: drag it anywhere on the " + (direct ? "hat." : "patch.")
              : selected === "patch" ? `${direct ? "Design" : "Patch"} selected: drag to move everything. Click the logo or text to move just that.`
              : `Click the ${direct ? "design" : "patch"}, logo, or text, then drag to move it.`}
            {moved ? <button onClick={resetPositions} className="ml-2 uppercase tracking-[0.12em] text-[#c6a36b] hover:text-white">Oops, Start Over</button> : null}
          </p>
          <p className="mt-1 text-center text-[11px] text-white/35 lg:text-xs">Showing one hat: the {HAT.name}. We carry 17+ brands and dozens of styles. Preview colors are close, not exact.</p>
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
            {!direct && <p className="mt-3 rounded-lg border border-[#c6a36b]/30 bg-[#c6a36b]/[0.06] px-3 py-2 text-xs text-white/70"><span className="text-[#c6a36b]">+</span> Want a different shape? We can cut almost any shape. Just ask.</p>}
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
            <p className="mt-3 rounded-lg border border-[#c6a36b]/30 bg-[#c6a36b]/[0.06] px-3 py-2 text-xs text-white/70"><span className="text-[#c6a36b]">+</span> Also available: PVC, embroidery, camo and patterned leatherette, and more. Just ask.</p>
          </Panel>

          <Panel step="03" title="Add Your Logo" dim={usingOwn}>
            <label className={`${chip(false)} flex cursor-pointer justify-center py-3`}>
              {logo && !logo.isDefault ? "Change Logo" : "Upload Your Logo"}
              <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" disabled={usingOwn} className="hidden"
                onChange={(e) => loadImage(e.target.files[0], (img) => { setLogo(makeLogo(img)); setSelected("logo"); })} />
            </label>
            <p className="mt-2 text-xs text-white/45">A PNG with a see-through background works best. It stays on your device.</p>
            {logo && (
              <div className="mt-3 space-y-2">
                <Slider label="Logo Size" value={logoSize} min={20} max={150} onChange={setLogoSize} />
                <button onClick={() => { setLogo(null); if (selected === "logo") setSelected(null); }} className="text-xs uppercase tracking-[0.15em] text-white/40 hover:text-white">Remove logo</button>
              </div>
            )}
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

          <Panel step="05" title="Save & Send">
            <p className="mb-3 text-sm text-white/60">Love it? Send it straight to us and we&apos;ll take it from there.</p>
            {sendStatus === "sent" ? (
              <div className="mb-3 rounded-lg border border-[#c6a36b]/50 bg-[#c6a36b]/10 p-4 text-center">
                <p className="text-2xl uppercase" style={bebas}>Got it! 🤠</p>
                <p className="text-sm text-white/70">Darin or Kayla will reach out soon about your hat.</p>
              </div>
            ) : !sendOpen ? (
              <button onClick={() => setSendOpen(true)} className="mb-2 w-full bg-[#c6a36b] px-3 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-black transition hover:bg-[#d4b07a]">Send This Design to B40</button>
            ) : (
              <form onSubmit={sendDesign} className="mb-3 space-y-2 rounded-lg border border-white/15 p-3">
                {[["name", "Your name", "text"], ["contact", "Phone or email", "text"]].map(([key, label, type]) => (
                  <input key={key} required type={type} placeholder={label} value={sendForm[key]} onChange={(e) => setSendForm({ ...sendForm, [key]: e.target.value })}
                    className="w-full rounded-lg border border-white/15 bg-black px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#c6a36b] focus:outline-none" />
                ))}
                <p className="pt-1 text-xs uppercase tracking-[0.15em] text-white/50">How many hats?</p>
                <div className="grid grid-cols-2 gap-2">
                  {QUANTITIES.map((q) => (
                    <button type="button" key={q} onClick={() => setSendForm({ ...sendForm, quantity: q })} className={`${chip(sendForm.quantity === q)} normal-case tracking-normal`}>{q}</button>
                  ))}
                </div>
                <textarea placeholder="Anything else? (optional, like 'need them by May')" rows={2} value={sendForm.notes} onChange={(e) => setSendForm({ ...sendForm, notes: e.target.value })}
                  className="w-full rounded-lg border border-white/15 bg-black px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#c6a36b] focus:outline-none" />
                <button type="submit" disabled={sendStatus === "sending" || !sendForm.quantity}
                  className="w-full bg-[#c6a36b] px-3 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-black transition hover:bg-[#d4b07a] disabled:opacity-50">
                  {sendStatus === "sending" ? "Sending…" : sendForm.quantity ? "Send It" : "Pick how many hats"}
                </button>
                {sendStatus === "error" && <p className="text-xs text-red-300">That didn&apos;t go through. Try again, or use Send It to Darin below.</p>}
                <p className="text-[11px] text-white/35">Your picture and details go only to B40.</p>
              </form>
            )}
            <button onClick={save} className="mb-2 w-full border border-white/20 px-3 py-3 text-xs font-bold uppercase tracking-[0.12em] transition hover:border-white/50">Snap a Pic 📸</button>
            <div className="grid grid-cols-2 gap-2">
              {PHONES.map((ph) => (
                <a key={ph.name} href={smsLink(`Hi ${ph.name}! I made ${fullSummary} on your Hat Maker. I'll send you the picture. Here's my design: ${shareUrl}`, ph)}
                  className="border border-white/20 px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] transition hover:border-white/50">Send It to {ph.name}</a>
              ))}
              <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Try It On: ${usingOwn ? "My own patch" : `${shape.name} / ${color ? `${color.name} ` : ""}${material.name}`}`)}&body=${encodeURIComponent(`Hi! I made ${fullSummary}. I'll attach the picture.\n\nMy design: ${shareUrl}`)}`}
                className="border border-white/20 px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] transition hover:border-white/50">Email Us</a>
              <button onClick={copyShare} className="border border-white/20 px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] transition hover:border-white/50">
                {copied ? "Link Copied! ✓" : "Copy Share Link"}
              </button>
            </div>
            {logo && !logo.isDefault && <p className="mt-2 text-xs text-white/40">Share links include everything except your uploaded logo, which stays on your device.</p>}
          </Panel>
        </div>
      </div>
    </div>
  );
}
