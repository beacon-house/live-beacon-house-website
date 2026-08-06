import { NextResponse } from "next/server";
import { getRoleBySlug } from "@/lib/careers-data";

const MAX_CV_BYTES = 3 * 1024 * 1024;

/**
 * Receives a careers application and forwards it to Make.com, which writes the
 * row to the hiring sheet, drops the CV into Drive and emails Krishna.
 *
 * The webhook URL stays server-side so it cannot be scraped off the page and
 * spammed directly.
 */
export async function POST(request: Request) {
  const webhook = process.env.MAKE_CAREERS_WEBHOOK_URL;
  if (!webhook) {
    console.error("MAKE_CAREERS_WEBHOOK_URL is not set");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot. Bots fill it, humans never see it. Return 200 so the bot does
  // not learn it was caught.
  if (form.get("company")) {
    return NextResponse.json({ ok: true });
  }

  const text = (key: string) => String(form.get(key) ?? "").trim();

  const name = text("name");
  const email = text("email");
  const phone = text("phone");
  const linkedin = text("linkedin");
  const roleSlug = text("roleSlug");
  const answer = text("answer");
  const roleTitle = text("role");

  if (!name || !email || !phone || !linkedin || !roleSlug || !answer) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const role = getRoleBySlug(roleSlug);
  if (!role) {
    return NextResponse.json({ error: "Unknown role" }, { status: 400 });
  }

  if (
    answer.length < role.screen.minChars ||
    answer.length > role.screen.maxChars
  ) {
    return NextResponse.json({ error: "Invalid answer length" }, { status: 400 });
  }

  const cv = form.get("cv");
  if (!(cv instanceof File) || cv.size === 0) {
    return NextResponse.json({ error: "CV required" }, { status: 400 });
  }
  if (cv.size > MAX_CV_BYTES) {
    return NextResponse.json({ error: "CV too large" }, { status: 413 });
  }

  const buffer = Buffer.from(await cv.arrayBuffer());
  const cvPayload = {
    filename: cv.name,
    mimeType: cv.type || "application/pdf",
    data: buffer.toString("base64"),
  };

  const payload = {
    name,
    email,
    phone,
    linkedin,
    role: roleTitle || role.title,
    roleSlug,
    answer,
    screenQuestion: role.screen.question,
    videoUrl: text("videoUrl"),
    submittedAt: new Date().toISOString(),
    cv: cvPayload,
  };

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Make.com rejected the application", response.status);
      return NextResponse.json({ error: "Upstream failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("Failed to reach Make.com", error);
    return NextResponse.json({ error: "Upstream unreachable" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
