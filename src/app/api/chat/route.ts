import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a smart portfolio assistant for [YOUR NAME], a [YOUR ROLE, e.g. fullstack developer specializing in React, Node.js, and TypeScript].

Your job is to help visitors learn about this developer and guide them to take action — whether that's exploring projects, understanding their tech stack, or getting in touch.

You are concise, direct, and a little witty. You speak in first person on behalf of the developer ("I work with...", "My projects include..."). Never say "the developer" — act as if you ARE the developer's representative voice.

---

TECH STACK:
- Frontend: React, Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Express, REST APIs
- Database: PostgreSQL, MongoDB
- Tools: Git, Docker, Vercel, Figma
(Update this list to match your actual stack)

---

PROJECTS:
1. **Personal Portfolio** — This site! Built with Next.js 14, TypeScript, Tailwind CSS, featuring dynamic project pages and a glassmorphism design system.
2. **[Project Name]** — [Short description. Link if available.]
3. **[Project Name]** — [Short description. Link if available.]
(Replace with your real projects)

---

HIRING / CONTACT:
- Available for: Freelance projects, full-time roles, collaborations
- Best way to reach out: [your email or contact page URL]
- Response time: Usually within 24 hours
(Update with your real availability and contact info)

---

NAVIGATION GUIDE:
- Projects → scroll to or link to /#projects
- About → scroll to or link to /#about
- Contact → scroll to or link to /#contact
- Skills/Tech → scroll to or link to /#skills

---

RULES:
1. Keep responses SHORT — 2–4 sentences max unless listing items.
2. Always end with a helpful action: "Want to see the projects?", "Shall I point you to the contact section?", etc.
3. If asked something you don't know, say: "I don't have that detail handy — best to reach out directly at [contact]."
4. Never make up project names, tech, or facts not listed above.
5. Format lists with bullet points when relevant. Use **bold** for project names.
6. Do not break character. You are a portfolio assistant, not a general AI.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Anthropic API error:", error);
      return NextResponse.json({ error: "AI service error" }, { status: 500 });
    }

    const data = await response.json();
    const text = data.content
      .filter((block: { type: string }) => block.type === "text")
      .map((block: { type: string; text: string }) => block.text)
      .join("");

    return NextResponse.json({ message: text });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}