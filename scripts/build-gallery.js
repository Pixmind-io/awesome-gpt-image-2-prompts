#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PROMPTS_DIR = path.join(ROOT, "prompts");
const IMAGES_DIR = path.join(ROOT, "images");
const README_OUTPUT = path.join(ROOT, "README.md");
const HTML_OUTPUT = path.join(ROOT, "index.html");

const CATEGORY_META = {
  "01-cinematic-portraits": { title: "Cinematic Portraits", desc: "Film stills, editorial headshots, moody portraits, and dramatic character photography" },
  "02-action-sports": { title: "Action & Sports", desc: "Frozen motion, dynamic scenes, athletic photography, and high-speed capture" },
  "03-nature-landscapes": { title: "Nature & Landscapes", desc: "Aerial views, atmospheric scenes, and travel photography" },
  "04-fantasy-illustration": { title: "Fantasy & Illustration", desc: "Anime, cyberpunk, Ghibli, concept art, and illustration" },
  "05-product-commercial": { title: "Product & Commercial", desc: "Product shots, advertising, brand imagery, packaging" },
  "06-ui-ux-design": { title: "UI/UX Design", desc: "App mockups, landing pages, dashboard designs" },
  "07-game-assets": { title: "Game Assets", desc: "Character sprites, environments, in-game screenshots, items" },
  "08-character-design": { title: "Character Design", desc: "Character sheets, turnarounds, expression boards" },
  "09-poster-graphic": { title: "Poster & Graphic Design", desc: "Movie posters, flyers, album covers, infographics, logos" },
  "10-text-rendering": { title: "Text Rendering", desc: "Typography, signage, calligraphy, word art" },
};

function getAvailableImages(slug) {
  const dir = path.join(IMAGES_DIR, slug);
  if (!fs.existsSync(dir)) return new Map();
  const map = new Map();
  for (const f of fs.readdirSync(dir)) {
    const m = f.match(/^(\d+)-/);
    if (m) map.set(m[1], f);
  }
  return map;
}

function parseCategoryPrompts(slug) {
  const readmePath = path.join(PROMPTS_DIR, slug, "README.md");
  if (!fs.existsSync(readmePath)) return [];
  const content = fs.readFileSync(readmePath, "utf-8");
  const imageMap = getAvailableImages(slug);
  const prompts = [];
  for (const section of content.split(/^## /m).slice(1)) {
    const lines = section.split("\n");
    const m = lines[0].match(/^(\d+)\.\s+(.+)/);
    if (!m) continue;
    const num = m[1], title = m[2].trim();
    const body = lines.slice(1).join("\n");
    let style = "", promptText = "", technique = "";
    const sm = body.match(/\*\*Style:\*\*\s*(.+)/);
    if (sm) style = sm[1].trim();
    const cm = body.match(/```\n([\s\S]*?)```/);
    if (cm) promptText = cm[1].trim();
    const tm = body.match(/\*\*Technique:\*\*\s*(.+)/);
    if (tm) technique = tm[1].trim();
    let imagePath = "";
    const padded = num.padStart(2, "0");
    if (imageMap.has(padded)) imagePath = imageMap.get(padded);
    else if (imageMap.has(num)) imagePath = imageMap.get(num);
    if (title && promptText) prompts.push({ num, title, style, promptText, technique, imagePath });
  }
  return prompts;
}

function buildReadme(categories) {
  const total = categories.reduce((s, c) => s + c.prompts.length, 0);

  // TOC
  let toc = categories.map((c, i) =>
    `| ${String(i + 1).padStart(2, " ")} | [${c.title}](#${c.slug}) | ${c.desc} | ${c.prompts.length} |`
  ).join("\n");

  // Prompt sections: image gallery 2/row + prompt list below
  let sections = categories.map(cat => {
    let md = `## ${cat.title}\n\n${cat.desc}\n\n`;

    for (const p of cat.prompts) {
      md += `### ${p.num}. ${p.title}\n`;
      if (p.style) md += `*${p.style}*\n\n`;
      md += `[![${p.title}](images/${cat.slug}/${p.imagePath})](images/${cat.slug}/${p.imagePath})\n\n`;
      md += `\`\`\`\n${p.promptText}\n\`\`\`\n`;
      if (p.technique) md += `\n> *Technique: ${p.technique}*\n`;
      md += `\n---\n\n`;
    }

    return md;
  }).join("\n");

  const readme = `# Awesome GPT Image 2 Prompts

A curated collection of **${total} production-ready prompts** for OpenAI's GPT Image 2 model, organized by category with example results.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Prompts](https://img.shields.io/badge/Prompts-${total}-blue.svg)](#prompt-categories)

**[English](README.md)** | [中文](README_zh.md)

---

## Prompt Categories

| # | Category | Description | Count |
|---|----------|-------------|-------|
${toc}

---

${sections}

---

## Prompt Engineering Guide

### The 8-Slot Formula

For complex scenes, use this structured template (borrowed from film production):

\`\`\`
# SCENE
[Setting: location, time, weather, historical period]

# CHARACTERS
- Character A: [physical description, wardrobe, pose, expression]
- Background extras: [brief description]

# COMPOSITION
[Framing: wide/medium/close. Camera angle. Lens. Depth of field.]

# LIGHTING
[Source, direction, hardness, color temperature, shadow behavior]

# COLOR
[Palette in 3-4 color terms. Grading direction.]

# STYLE
[One dominant reference. E.g., "Roger Deakins cinematography"]

# TECHNICAL
[Resolution, film grain, aspect ratio, quality markers]

# EXCLUSIONS
[What to avoid: "No text, no logos, no watermarks"]
\`\`\`

### Anti-Slop Rules

From the [fal.ai Prompting Guide](https://fal.ai/learn/tools/prompting-gpt-image-2):

1. **Visual facts over vague praise** -- Avoid: stunning, incredible, epic, masterpiece. Prefer: overcast daylight, brushed aluminum, chipped paint, 50mm feel.
2. **Style tags need visual targets** -- Instead of "minimalist brutalist luxury", use "Cream background, heavy black condensed sans serif, one hero object, generous negative space."
3. **Say the real thing** -- If the image must show a transit kiosk, say transit kiosk. Mood language buries the brief.
4. **In edits, separate change from preserve** -- Use "change only X" and "keep everything else the same."
5. **Treat text like typography** -- Wrap literal text in quotes, specify font style, size, color, and placement.
6. **One revision per turn** -- Small iterative edits beat one giant rewrite.

### Key Principles

1. **Lighting > Camera > Subject** -- You can get away with a vague subject if you nail the light direction and lens choice. The opposite is not true.
2. **Concrete nouns beat adjectives** -- "A 28-year-old woman with auburn hair in a camel trench coat crossing a Manhattan crosswalk at 6pm on a rainy Thursday" >> "A beautiful woman in a city."
3. **Name the style, not the artist** -- "Ufotable production quality" or "1970s giallo" works better than risking filter blocks on living artist names.
4. **One dominant style anchor** -- Past ~1,200 words, individual adjectives dilute. Pick one anchor style ("film noir") and let everything else support it.
5. **Setting first for complex scenes** -- Start with the environment, then introduce characters. "In a candle-lit 17th-century library..." frames everything that follows.

### Three Prompting Modes

GPT Image 2 supports three distinct workflows:

**1. Generate (text -> image):** Start from scratch with a structured prompt.
\`\`\`
Scene: [where]
Subject: [who/what]
Important details: [materials, lighting, camera]
Use case: [editorial photo / product mockup / poster]
Constraints: [no watermark / no logos]
\`\`\`

**2. Edit (text + image -> image):** Modify an existing image.
\`\`\`
Change: [exactly what should change]
Preserve: [face, identity, pose, lighting, framing, background]
Constraints: [no extra objects, no redesign, no logo drift]
\`\`\`

**3. Composite (text + multiple images -> image):** Combine elements from multiple inputs.
\`\`\`
Image 1: base scene to preserve.
Image 2: style/object reference.
Instruction: [how they interact]
Preserve: [what must not drift]
\`\`\`

### Prompt Length Guide

| Scene complexity | Recommended length |
|-----------------|-------------------|
| Simple portrait | 80-150 words |
| Cinematic wide shot | 150-250 words |
| Multi-character / campaign | 400-800 words |

### Common Failures & Fixes

| Problem | Fix |
|---------|-----|
| Generic, lifeless output | Use concrete nouns and named places |
| Wrong finger count | Give hands something to hold, or crop to shoulders-up |
| Garbled text in image | Keep text very short ("sign reads OPEN") or add "no text, no letters, no words" |
| Lighting direction ignored | Name direction, hardness, and shadow coverage specifically |
| Wrong setting | Move the setting description to the front of the prompt |
| Overcrowded prompt | Keep one dominant style anchor, limit to ~1,200 words |
| Model "plastic" look | Add "visible pores," "fabric weave," "film grain," or "Shot on Sony A7R IV" |
| Edit drifts from original | Re-state the preserve list on every iteration |

## Structured Template

See [templates/structured-prompt-template.md](templates/structured-prompt-template.md) for a copy-paste template you can use for any scene.

## Sources & Credits

### Official
- [OpenAI Official Prompting Guide](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide) -- The definitive guide with production patterns
- [OpenAI API Documentation](https://platform.openai.com/docs/guides/images) -- API reference
- [Introducing ChatGPT Images 2.0](https://openai.com/index/introducing-chatgpt-images-2-0/) -- Official announcement

### Community & Guides
- [fal.ai GPT Image 2 Prompting Guide](https://fal.ai/learn/tools/prompting-gpt-image-2) -- Structured template, anti-slop rules, copy-paste library
- [EvoLink.ai GPT Image 2 Prompts](https://evolink.ai/gpt-image-2-prompts) -- 100+ curated prompt examples
- [NoteGPT GPT Image 2 Prompt Guide](https://notegpt.io/blog/gpt-image-2-prompt-guide-use-cases) -- 30 real use cases
- [gpt-image2-ai.org Prompt Guide](https://gpt-image2-ai.org/blog/gpt-image-2-prompt-guide) -- 50+ examples with failure fixes
- [r/PromptEngineering](https://reddit.com/r/PromptEngineering) -- Community prompt patterns
- [r/ChatGPT](https://reddit.com/r/ChatGPT) -- Prompt sharing and tips

### Related Repos
- [YouMind-OpenLab/awesome-gpt-image-2](https://github.com/YouMind-OpenLab/awesome-gpt-image-2) -- 2000+ prompts, 16 languages
- [wuyoscar/gpt_image_2_skill](https://github.com/wuyoscar/gpt_image_2_skill) -- Prompt gallery + agentic skill + CLI
- [jamez-bondos/awesome-gpt4o-images](https://github.com/jamez-bondos/awesome-gpt4o-images) -- 106 curated GPT-4o image cases
- [f/awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts) -- 143k stars, general ChatGPT prompts
- [dair-ai/Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide) -- Comprehensive PE guide
- [willwulfken/MidJourney-Styles-and-Keywords-Reference](https://github.com/willwulfken/MidJourney-Styles-and-Keywords-Reference) -- Midjourney style reference

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

---

<p align="center">
  Made with care for the AI image generation community
</p>
`;

  fs.writeFileSync(README_OUTPUT, readme, "utf-8");
  console.log(`Generated README.md with ${total} prompts across ${categories.length} categories`);
}

function escHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildHtml(categories, total) {
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Awesome GPT Image 2 Prompts - ${total} Production-Ready Prompts</title>
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{--bg:#0a0a0b;--surface:#141416;--surface-2:#1c1c1f;--surface-3:#242428;--border:#2a2a2e;--text:#e4e4e7;--text-2:#a1a1aa;--text-3:#71717a;--accent:#6d5cff;--accent-light:#8b7fff;--green:#22c55e}
  html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
  .header{position:sticky;top:0;z-index:100;background:rgba(10,10,11,.85);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:16px 24px}
  .header-inner{max-width:1400px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
  .header h1{font-size:20px;font-weight:700;white-space:nowrap}.header h1 span{color:var(--accent-light)}
  .header-stats{display:flex;gap:16px;font-size:14px;color:var(--text-2)}.header-stats b{color:var(--text);font-weight:600}
  .search-wrap{max-width:1400px;margin:0 auto;padding:20px 24px 0}
  .search-box{width:100%;max-width:480px;padding:10px 16px 10px 40px;background:var(--surface);border:1px solid var(--border);border-radius:12px;color:var(--text);font-size:15px;outline:none;transition:border-color .2s;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='%2371717a' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242.656a5 5 0 1 1 0-10 5 5 0 0 1 0 10z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:14px center}
  .search-box:focus{border-color:var(--accent)}.search-box::placeholder{color:var(--text-3)}
  .cat-nav{max-width:1400px;margin:0 auto;padding:16px 24px;display:flex;gap:8px;overflow-x:auto;scrollbar-width:none}
  .cat-nav::-webkit-scrollbar{display:none}
  .cat-nav button{padding:8px 16px;border-radius:100px;background:var(--surface);border:1px solid var(--border);color:var(--text-2);font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;transition:all .2s}
  .cat-nav button:hover{background:var(--surface-2);color:var(--text)}
  .cat-nav button.active{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:600}
  .cat-nav button .count{margin-left:4px;font-size:11px;opacity:.7}
  .main{max-width:1400px;margin:0 auto;padding:0 24px 60px}
  .category{margin-bottom:48px}
  .category-header{display:flex;align-items:center;gap:12px;margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid var(--border)}
  .category-header h2{font-size:22px;font-weight:700}
  .category-header .desc{font-size:14px;color:var(--text-2);margin-top:2px}
  .cards{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
  .card{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:transform .2s,box-shadow .2s}
  .card:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,.4)}
  .card-img-wrap{width:100%;background:#0e0e10;display:flex;align-items:center;justify-content:center;overflow:hidden;cursor:pointer}
  .card-img{max-width:100%;max-height:400px;object-fit:contain;display:block}
  .card-body{padding:16px}
  .card-title-row{display:flex;align-items:start;justify-content:space-between;gap:8px;margin-bottom:8px}
  .card-title{font-size:15px;font-weight:600;line-height:1.4}
  .card-num{flex-shrink:0;font-size:12px;color:var(--text-3);background:var(--surface-3);padding:2px 8px;border-radius:100px;font-weight:600}
  .card-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px}
  .tag{font-size:11px;padding:3px 8px;border-radius:100px;background:var(--surface-3);color:var(--text-2);font-weight:500}
  .card-prompt{position:relative;background:var(--surface-2);border:1px solid var(--border);border-radius:8px;padding:12px;font-family:'SF Mono',Menlo,monospace;font-size:12px;line-height:1.6;color:var(--text-2);max-height:120px;overflow:hidden;cursor:pointer;transition:max-height .3s}
  .card-prompt.expanded{max-height:none}
  .card-prompt::after{content:'';position:absolute;bottom:0;left:0;right:0;height:40px;background:linear-gradient(transparent,var(--surface-2));pointer-events:none;transition:opacity .3s}
  .card-prompt.expanded::after{opacity:0}
  .card-actions{display:flex;gap:8px;margin-top:10px}
  .btn{padding:6px 12px;border-radius:8px;border:1px solid var(--border);background:var(--surface-2);color:var(--text-2);font-size:12px;font-weight:500;cursor:pointer;transition:all .15s}
  .btn:hover{background:var(--surface-3);color:var(--text)}
  .btn-copy{border-color:var(--accent);color:var(--accent-light)}.btn-copy:hover{background:var(--accent);color:#fff}
  .btn-copy.copied{background:var(--green);border-color:var(--green);color:#fff}
  .card-technique{margin-top:10px;font-size:12px;color:var(--text-3);line-height:1.5;padding-top:8px;border-top:1px solid var(--border)}
  .card-technique strong{color:var(--text-2)}
  .lightbox{display:none;position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.9);backdrop-filter:blur(8px);align-items:center;justify-content:center;padding:40px;cursor:zoom-out}
  .lightbox.open{display:flex}
  .lightbox img{max-width:90vw;max-height:85vh;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.6)}
  .footer{text-align:center;padding:32px 24px;border-top:1px solid var(--border);color:var(--text-3);font-size:13px}
  @media(max-width:768px){.header h1{font-size:17px}.cards{grid-template-columns:1fr}.search-wrap{padding:16px 16px 0}.cat-nav{padding:12px 16px}.main{padding:0 16px 40px}}
</style>
</head>
<body>
<header class="header"><div class="header-inner">
  <h1>Awesome <span>GPT Image 2</span> Prompts</h1>
  <div class="header-stats"><span><b>${total}</b> Prompts</span><span><b>${categories.length}</b> Categories</span></div>
</div></header>
<div class="search-wrap"><input class="search-box" type="text" placeholder="Search prompts..." id="searchInput"></div>
<nav class="cat-nav" id="catNav">
  <button class="active" data-cat="all">All <span class="count">${total}</span></button>
${categories.map(c => `  <button data-cat="${c.slug}">${c.title} <span class="count">${c.prompts.length}</span></button>`).join("\n")}
</nav>
<main class="main" id="main">
${categories.map(cat => `  <section class="category" data-category="${cat.slug}">
    <div class="category-header"><div><h2>${cat.title}</h2><p class="desc">${cat.desc}</p></div></div>
    <div class="cards">
${cat.prompts.map(p => `      <div class="card" data-search="${escHtml((p.title + " " + p.style + " " + p.promptText).toLowerCase())}">
${p.imagePath ? `        <div class="card-img-wrap" onclick="openLightbox(this.querySelector('img').src)"><img class="card-img" src="images/${cat.slug}/${p.imagePath}" alt="${escHtml(p.title)}" loading="lazy"></div>` : ""}
        <div class="card-body">
          <div class="card-title-row"><span class="card-title">${escHtml(p.title)}</span><span class="card-num">#${p.num}</span></div>
          ${p.style ? `<div class="card-tags"><span class="tag">${escHtml(p.style)}</span></div>` : ""}
          <div class="card-prompt" onclick="togglePrompt(this)">${escHtml(p.promptText)}</div>
          <div class="card-actions"><button class="btn btn-copy" onclick="copyPrompt(this,'${Buffer.from(p.promptText).toString("base64")}')">Copy Prompt</button></div>
          ${p.technique ? `<div class="card-technique"><strong>Technique:</strong> ${escHtml(p.technique)}</div>` : ""}
        </div>
      </div>`).join("\n")}
    </div>
  </section>`).join("\n")}
</main>
<div class="lightbox" id="lightbox" onclick="closeLightbox()"><img id="lightboxImg" src="" alt=""></div>
<footer class="footer"><p>Made with care for the AI image generation community</p></footer>
<script>
const catNav=document.getElementById('catNav'),sections=document.querySelectorAll('.category'),cards=document.querySelectorAll('.card');
catNav.addEventListener('click',e=>{const btn=e.target.closest('button');if(!btn)return;catNav.querySelectorAll('button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const cat=btn.dataset.cat;sections.forEach(s=>s.style.display=cat==='all'||s.dataset.category===cat?'':'none');const q=document.getElementById('searchInput').value.toLowerCase().trim();if(q)filterCards(q,cat)});
let debounce;document.getElementById('searchInput').addEventListener('input',()=>{clearTimeout(debounce);debounce=setTimeout(()=>{filterCards(document.getElementById('searchInput').value.toLowerCase().trim(),catNav.querySelector('.active')?.dataset.cat||'all')},200)});
function filterCards(q,cat){cards.forEach(c=>{const mc=cat==='all'||c.closest('.category').dataset.category===cat;const ms=!q||c.dataset.search.includes(q);c.style.display=mc&&ms?'':'none'});sections.forEach(s=>{if(s.style.display==='none')return;const v=s.querySelectorAll('.card:not([style*="display: none"])');s.style.display=v.length===0?'none':''})}
function togglePrompt(el){el.classList.toggle('expanded')}
function copyPrompt(btn,enc){navigator.clipboard.writeText(atob(enc)).then(()=>{btn.textContent='Copied!';btn.classList.add('copied');setTimeout(()=>{btn.textContent='Copy Prompt';btn.classList.remove('copied')},1500)})}
function openLightbox(src){document.getElementById('lightboxImg').src=src;document.getElementById('lightbox').classList.add('open');document.body.style.overflow='hidden'}
function closeLightbox(){document.getElementById('lightbox').classList.remove('open');document.body.style.overflow=''}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});
</script>
</body></html>`;

  fs.writeFileSync(HTML_OUTPUT, html, "utf-8");
  console.log(`Generated index.html with ${total} prompts across ${categories.length} categories`);
}

// --- Main ---
const categories = [];
const dirs = fs.readdirSync(PROMPTS_DIR)
  .filter(d => fs.statSync(path.join(PROMPTS_DIR, d)).isDirectory())
  .sort();

for (const slug of dirs) {
  const meta = CATEGORY_META[slug] || { title: slug, desc: "" };
  const prompts = parseCategoryPrompts(slug);
  if (prompts.length === 0) continue;
  categories.push({ slug, ...meta, prompts });
}

buildReadme(categories);
buildHtml(categories, categories.reduce((s, c) => s + c.prompts.length, 0));
