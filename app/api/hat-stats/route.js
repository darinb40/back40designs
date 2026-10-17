// Quiet totals for the Hat Maker, so B40 can see whether it brings in orders.
// Only counts, no names or personal info. Stored in the same Redis as the hat counter.
import { createClient } from "redis";

export const dynamic = "force-dynamic";

const EVENTS = ["view", "send_open", "send", "text_darin", "text_kayla", "email", "share", "compare"];
const key = (e) => `hatmaker:stats:${e}`;

let client;
async function redis() {
  if (!process.env.REDIS_URL) throw new Error("REDIS_URL is not set");
  if (!client) {
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

export async function GET() {
  try {
    const db = await redis();
    const values = await db.mGet([...EVENTS.map(key), "hatmaker:saves"]);
    const totals = Object.fromEntries(EVENTS.map((e, i) => [e, Number(values[i]) || 0]));
    totals.save = Number(values[EVENTS.length]) || 0;
    return Response.json(totals, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
}

export async function POST(request) {
  try {
    const { event } = await request.json();
    if (!EVENTS.includes(event)) return Response.json({ ok: false }, { status: 400 });
    await (await redis()).incr(key(event));
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 503 });
  }
}
