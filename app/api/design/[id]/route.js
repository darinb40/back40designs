// Shows a saved design picture (from the private DesignUploads store) to anyone
// with its link, like the one in B40's Formspree email.
import { get } from "@vercel/blob";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const id = params.id;
  if (!/^[a-f0-9]{24}$/.test(id)) return new Response("Not found", { status: 404 });
  try {
    const result = await get(`designs/${id}.jpg`, { access: "private" });
    if (!result || result.statusCode !== 200) return new Response("Not found", { status: 404 });
    return new Response(result.stream, {
      headers: { "Content-Type": "image/jpeg", "Cache-Control": "private, max-age=86400" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
