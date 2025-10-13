import fs from "node:fs/promises";
import path from "node:path";
import OpenAI from "openai";

// === RAG load ===
type Doc = { id: string; url: string; title: string; text: string; embedding: number[] };
type Index = { docs: Doc[] };
const ai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const EMBED_MODEL = "text-embedding-3-large";
const RAG_PATH = path.join(process.cwd(), "rag", "site-index.json");

// cosine
function cosine(a: number[], b: number[]) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] ** 2; nb += b[i] ** 2; }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

async function embedOnce(text: string) {
  const e = await ai.embeddings.create({ model: EMBED_MODEL, input: text });
  return e.data[0].embedding as number[];
}

async function retrieve(query: string, k = 4): Promise<Doc[]> {
  const raw = await fs.readFile(RAG_PATH, "utf-8").catch(() => "{}");
  const idx: Index = JSON.parse(raw || "{}");
  if (!idx.docs?.length) return [];
  const q = await embedOnce(query);
  const scored = idx.docs
    .map(d => ({ d, score: cosine(q, d.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map(s => s.d);
  return scored;
}

// === System prompt (your identity, tone, precedence rules) ===
const SYSTEM = `
You are Jonatas, a professional assistant that faithfully represents
Jônatas Ricardo Silva dos Santos — Senior Frontend Software Engineer (Brazil, 15 years experience).
Speak in the first person ("I" in English, "eu" in Portuguese). Default to English.
Be confident, technically precise, and professional.

SOURCE PRECEDENCE:
1) PDF resume (uploaded) is the single source of truth for biography, roles, dates, companies, skills. Do not contradict it.
2) Website content at jonatas-portfolio-two.vercel.app is allowed as supplemental knowledge for articles, insights, and examples.
3) If website /resume conflicts with the PDF resume, prefer the PDF resume.

When you use website knowledge, include short, inline source mentions like:
[Source: jonatas-portfolio-two.vercel.app/posts/...]
Never invent employers, dates, or degrees. Never claim roles not present in the PDF resume.
`;

// === PDF facts summary (short, from your resume) ===
// Keep this concise to anchor identity. (Optionally load from a local YAML/JSON you generate.)
const RESUME_FACTS = `
- Senior Frontend Engineer, Optii Solutions (Apr 2022 – Present, remote, Texas, USA)
- Ensinando.tech (Feb 2020 – Present): VTEX training + AI VTEX Expert Assistant (Next.js + GraphQL + Vercel AI SDK)
- AB InBev / ZX Ventures (Aug 2021 – Apr 2022): VTEX IO micro-frontends; vendor→in-house migration
- Riachuelo (Nov 2020 – Aug 2021): Magento→Next.js/React migration; Azure pipelines
- ICN (Apr 2018 – Nov 2020): React/Node/MongoDB; Jenkins/Docker
- Lojas Americanas (2017–2018): React/Node + IBM Watson/AWS; chatbots
- Profit-e (2015–2017): Head of Frontend; VTEX/React/Angular/Ionic
- Navio Web (2012–2015): Founder; CMS/custom frontends
- WB Internet (2010–2012): Web designer/front-end
- Education: MIT DS/ML (Jun–Oct 2025); PUC Minas (2019–2020); UFF (2014–2017)
`;

// === Main API ===
export async function askJonatas(userPrompt: string) {
  // Retrieve site context
  const passages = await retrieve(userPrompt, 4);

  const contextBlocks = passages.map(p =>
    `# Source: ${p.url}\n${p.text.substring(0, 1200)}`
  ).join("\n\n---\n\n");

  const prompt = `
    ${SYSTEM}\n
    RESUME FACTS (authoritative):\n${RESUME_FACTS}\n
    WEBSITE CONTEXT (supplemental, cite when used):\n${contextBlocks || "(no site context retrieved)"}
  `
  return {
    prompt,
    sources: passages.map(p => ({ url: p.url, title: p.title })),
  };
}
