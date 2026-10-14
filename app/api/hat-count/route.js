// Hat Maker counter: how many hats people have saved on the Try It On page.
// Stored in the Redis database connected to this project in Vercel (REDIS_URL).
import { createClient } from "redis";
import { createHash } from "crypto";

export const dynamic = "force-dynamic";

const KEY = "hatmaker:saves";

let client;
async function redis() {
  if (!process.env.REDIS_URL) throw new Error("REDIS_URL is not set");
  if (!client) {
    // fail fast instead of retrying forever, so the page never waits on the counter
    client = createClient({ url: process.env.REDIS_URL, socket: { connectTimeout: 4000, reconnectStrategy: false } });
    client.on("error", () => {});
    try {
      await client.connect();
    } catch (err) {
      client = null;
      throw err;
    }
  }
  return client;
}

// When the counter is down, say why (setting names only, never their values).
const down = (err) =>
  Response.json(
    { count: null, reason: String(err && err.message).slice(0, 120), settings: Object.keys(process.env).filter((k) => /REDIS|KV_/.test(k)) },
    { status: 503 }
  );

export async function GET() {
  try {
    const count = Number(await (await redis()).get(KEY)) || 0;
    return Response.json({ count });
  } catch (err) {
    return down(err);
  }
}

// One save per visitor every 20 seconds counts, so mashing Save can't run it up.
export async function POST(request) {
  try {
    const db = await redis();
    const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
    const visitor = createHash("sha256").update(ip).digest("hex").slice(0, 16);
    const fresh = await db.set(`hatmaker:recent:${visitor}`, "1", { NX: true, EX: 20 });
    const count = fresh ? await db.incr(KEY) : Number(await db.get(KEY)) || 0;
    return Response.json({ count });
  } catch (err) {
    return down(err);
  }
}
