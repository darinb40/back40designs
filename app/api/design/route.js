// Stores the hat picture from "Send This Design to B40" in the private Vercel Blob
// store (DesignUploads) and returns a link our own site serves it from, so the
// Formspree email to B40 can include it.
import { put } from "@vercel/blob";
import { randomBytes } from "crypto";

export const dynamic = "force-dynamic";

const MAX_BYTES = 3 * 1024 * 1024;

export async function POST(request) {
  try {
    const { image } = await request.json();
    const match = /^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/.exec(image || "");
    if (!match) return Response.json({ error: "bad image" }, { status: 400 });
    const bytes = Buffer.from(match[1], "base64");
    if (bytes.length > MAX_BYTES) return Response.json({ error: "image too large" }, { status: 413 });
    const id = randomBytes(12).toString("hex");
    await put(`designs/${id}.jpg`, bytes, { access: "private", contentType: "image/jpeg", addRandomSuffix: false });
    const origin = new URL(request.url).origin;
    return Response.json({ id, imageUrl: `${origin}/api/design/${id}` });
  } catch (err) {
    return Response.json({ error: String(err && err.message).slice(0, 120) }, { status: 500 });
  }
}
