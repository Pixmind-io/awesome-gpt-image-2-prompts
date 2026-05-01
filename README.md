# Awesome GPT Image 2 Prompts

A curated collection of **100+ production-ready prompts** for OpenAI's GPT Image 2 model, organized by category with prompt engineering guides and templates.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Prompts](https://img.shields.io/badge/Prompts-100%2B-blue.svg)](#prompt-categories)

**[English](README.md)** | [中文](README_zh.md)

---

## Why This Repo?

GPT Image 2 supports **20,000-character prompts** -- far beyond competitors -- but most users only scratch the surface. This repo collects battle-tested prompts from photographers, designers, game artists, and AI researchers.

What you'll find:
- **100+ copy-paste prompts** across 10 categories
- **8-slot structured prompt formula** for complex scenes
- **Anti-slop rules** for avoiding generic AI output
- **3 prompting modes**: Generate, Edit, and Composite
- **Common failures and fixes** from real production work
- **Bilingual (EN/CN)** documentation

## Quick Start

1. Browse the [prompt categories](#prompt-categories) below
2. Copy any prompt that matches your needs
3. Paste into ChatGPT or the OpenAI API
4. Tweak one slot at a time (lighting, camera angle, style) to iterate

> **Pro tip:** If a render is 80% right, don't rewrite the whole prompt. Copy it, change one element, and regenerate. Average iterations to a hero-quality frame: ~2.8.

## Prompt Categories

| # | Category | Description | Count |
|---|----------|-------------|-------|
| 01 | [Cinematic Portraits](prompts/01-cinematic-portraits/) | Film stills, editorial headshots, dramatic lighting, documentary | 25 |
| 02 | [Action & Sports](prompts/02-action-sports/) | Frozen motion, sports photography, dynamic scenes | 9 |
| 03 | [Nature & Landscapes](prompts/03-nature-landscapes/) | Aerial views, atmospheric scenes, travel photography | 13 |
| 04 | [Fantasy & Illustration](prompts/04-fantasy-illustration/) | Anime, cyberpunk, Ghibli, concept art | 16 |
| 05 | [Product & Commercial](prompts/05-product-commercial/) | Product shots, advertising, brand imagery, packaging | 18 |
| 06 | [UI/UX Design](prompts/06-ui-ux-design/) | App mockups, landing pages, dashboard designs | 13 |
| 07 | [Game Assets](prompts/07-game-assets/) | In-game screenshots, sprites, environments, items | 12 |
| 08 | [Character Design](prompts/08-character-design/) | Character sheets, turnarounds, expression boards | 12 |
| 09 | [Poster & Graphic Design](prompts/09-poster-graphic/) | Movie posters, infographics, logos, comics | 16 |
| 10 | [Text Rendering](prompts/10-text-rendering/) | Typography, signage, calligraphy, word art, ad copy | 16 |

## Prompt Engineering Guide

### The 8-Slot Formula

For complex scenes, use this structured template (borrowed from film production):

```
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
```

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
```
Scene: [where]
Subject: [who/what]
Important details: [materials, lighting, camera]
Use case: [editorial photo / product mockup / poster]
Constraints: [no watermark / no logos]
```

**2. Edit (text + image -> image):** Modify an existing image.
```
Change: [exactly what should change]
Preserve: [face, identity, pose, lighting, framing, background]
Constraints: [no extra objects, no redesign, no logo drift]
```

**3. Composite (text + multiple images -> image):** Combine elements from multiple inputs.
```
Image 1: base scene to preserve.
Image 2: style/object reference.
Instruction: [how they interact]
Preserve: [what must not drift]
```

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

Prompts and techniques in this collection were sourced from:

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

**What we're looking for:**
- New prompt examples with category tags
- Translations (Chinese, Japanese, Korean, etc.)
- Tips and techniques from real usage
- Example output images

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## Star History

If you find this repo useful, please consider giving it a star! It helps others discover it.

---

<p align="center">
  Made with care for the AI image generation community
</p>
