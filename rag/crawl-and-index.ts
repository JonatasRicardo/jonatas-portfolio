/**
 * Crawl and index jonatas-portfolio-two.vercel.app for RAG.
 * - Crawls sitemap and selected sections (posts, articles)
 * - Extracts readable text
 * - Chunks, embeds, and stores vectors in a local JSON index
 *
 * Run:  ts-node scripts/crawl-and-index.ts
 */
import 'dotenv/config';
import fs from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";
import pLimit from "p-limit";
import crypto from "node:crypto";
import OpenAI from "openai";

const OPENAI_EMBED_MODEL = "text-embedding-3-large";
const BASE = "https://www.jonatasricardo.com";
const OUT = path.join(process.cwd(), "rag", "site-index.json");

// --- tiny vector helpers
type Doc = { id: string; url: string; title: string; text: string; embedding: number[] };
type Raw = { url: string; html: string };

const ai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Basic scope: homepage, posts, and articles listing
const SEEDS = [
  `${BASE}/`,
  `${BASE}/resume`,
  `${BASE}/posts/myth-use-client-ssr-en`,
];

/** discover more URLs from homepage/articles list */
async function discoverSeeds(): Promise<string[]> {
  const res = await fetch(`${BASE}/`);
  const html = await res.text();
  const dom = new JSDOM(html);
  const anchors = Array.from(dom.window.document.querySelectorAll("a"))
    .map(a => (a as HTMLAnchorElement).href)
    .filter(href => href.startsWith(BASE) || href.startsWith("/"))
    .map(href => href.startsWith("/") ? `${BASE}${href}` : href)
    .filter(href =>
      href.startsWith(`${BASE}/posts/`) ||
      href === `${BASE}/` ||
      href.includes("/articles")
    );
  return Array.from(new Set([...SEEDS, ...anchors]));
}

async function fetchPage(url: string): Promise<Raw> {
  const r = await fetch(url, { headers: { "User-Agent": "Jonatas-Assistant/1.0" } });
  if (!r.ok) throw new Error(`Fetch failed ${url} -> ${r.status}`);
  return { url, html: await r.text() };
}

function extractMainText(raw: Raw): { title: string; text: string } {
  const dom = new JSDOM(raw.html);
  const d = dom.window.document;

  // Prefer article/post containers, fallback to main
  const article =
    d.querySelector("article") ||
    d.querySelector("main") ||
    d.body;

  // Drop nav/aside/footer/script/style
  article?.querySelectorAll("nav,aside,footer,script,style").forEach(n => n.remove());

  const title =
    d.querySelector("h1")?.textContent?.trim() ||
    d.title?.trim() ||
    raw.url;

  const text = article?.textContent?.replace(/\s+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim() || "";
  return { title, text };
}

// Simple sentence-ish chunker
function chunkText(text: string, maxChars = 1200): string[] {
  if (text.length <= maxChars) return [text];
  const parts: string[] = [];
  let buf = "";
  for (const para of text.split(/\n{2,}/)) {
    if ((buf + "\n\n" + para).length > maxChars) {
      if (buf) parts.push(buf.trim());
      buf = para;
    } else {
      buf += (buf ? "\n\n" : "") + para;
    }
  }
  if (buf) parts.push(buf.trim());
  return parts.filter(Boolean);
}

async function embed(texts: string[]): Promise<number[][]> {
  const resp = await ai.embeddings.create({
    model: OPENAI_EMBED_MODEL,
    input: texts,
  });
  return resp.data.map(d => d.embedding as number[]);
}

function hashId(url: string, idx: number) {
  return crypto.createHash("sha1").update(url + "#" + idx).digest("hex").slice(0, 16);
}

function cosine(a: number[], b: number[]) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] ** 2; nb += b[i] ** 2; }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

async function main() {
  await fs.mkdir(path.dirname(OUT), { recursive: true });
  const urls = await discoverSeeds();

  const limit = pLimit(5);
  const raws = await Promise.all(
    urls.map(u => limit(() => fetchPage(u).catch(() => null)))
  ).then(all => all.filter(Boolean) as Raw[]);

  const docs: Doc[] = [];
  for (const raw of raws) {
    const { title, text } = extractMainText(raw);
    if (!text) continue;
    const chunks = chunkText(text);
    const embs = await embed(chunks);
    chunks.forEach((chunk, i) => {
      docs.push({
        id: hashId(raw.url, i),
        url: raw.url,
        title,
        text: chunk,
        embedding: embs[i],
      });
    });
  }

  await fs.writeFile(OUT, JSON.stringify({ createdAt: new Date().toISOString(), base: BASE, docs }, null, 2), "utf-8");
  console.log(`Indexed ${docs.length} chunks from ${urls.length} pages -> ${OUT}`);
}

// Optional: quick query test `node -e '...'` calls can import cosine + index.
export { cosine };
main().catch(err => { console.error(err); process.exit(1); });
