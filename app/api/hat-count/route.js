// Hat Maker counter: how many hats people have saved on the Try It On page.
// Stored in the Redis database connected to this project in Vercel (REDIS_URL).
import { createClient } from "redis";
import { createHash } from "crypto";

export const dynamic = "force-dynamic";

const KEY = "hatmaker:saves";

let client;
async function redis() {
  if (!client) {
    client = createClient({ url: process.env.REDIS_URL });
    client.on("error", () => {});
    await client.connect();
  }
  return client;
}

export async function GET() {
  try {
    const count = Number(await (await redis()).get(KEY)) || 0;
    return Response.json({ count });
  } catch {
    return Response.json({ count: null }, { status: 503 });
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
  } catch {
    return Response.json({ count: null }, { status: 503 });
  }
}
