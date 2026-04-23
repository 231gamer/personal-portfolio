import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  website?: string;
  projectType?: string;
  industry?: string;
  primaryGoal?: string;
  timeline?: string;
  budget?: string;
  message?: string;
  company?: string; // honeypot
};

export async function POST(req: Request) {
  let data: ContactPayload | null = null;
  try {
    data = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  // Basic spam trap: if honeypot is filled, pretend it's okay.
  if (data?.company) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = (data?.name ?? "").trim();
  const email = (data?.email ?? "").trim();
  const message = (data?.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 },
    );
  }

  // Placeholder behavior: in production, send to email/CRM (Resend, SendGrid, etc.)
  // Keeping it minimal and working out-of-the-box.
  console.log("[contact]", {
    name,
    email,
    website: data?.website ?? "",
    projectType: data?.projectType ?? "",
    industry: data?.industry ?? "",
    primaryGoal: data?.primaryGoal ?? "",
    timeline: data?.timeline ?? "",
    budget: data?.budget ?? "",
    message,
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}

