# Prompt Engineering Guide for GPT Image 2

A comprehensive guide to writing effective prompts for OpenAI's GPT Image 2 model.

---

## Model Overview

GPT Image 2 is OpenAI's latest image generation model with these key characteristics:

- **20,000-character prompt ceiling** — far beyond most competitors (typically 1,000-2,000 chars)
- **Strong world knowledge** — understands real locations, art styles, films, and cultural references
- **Excellent text-to-image** — but unreliable for rendering text within images
- **Better hands** — improved over first-gen models, but macro hand close-ups can still fail
- **Stochastic by design** — same prompt produces different results each time (feature, not bug)

---

## The 8-Slot Framework

Every great GPT Image 2 prompt addresses these 8 elements:

### 1. Scene (Setting)
- Where? When? What weather/time period?
- **Power words**: location names, time of day, atmospheric conditions
- **Example**: "A candle-lit 17th-century English library with floor-to-ceiling oak shelves"

### 2. Characters
- Physical description, wardrobe, pose, expression
- Be specific: age, hair color/style, body type, clothing details
- **Example**: "A 32-year-old woman with dark auburn hair in a low chignon wearing a deep emerald silk gown"

### 3. Composition
- Framing (wide/medium/close)
- Camera angle (eye-level/low/high/bird's-eye)
- Lens choice (24mm wide/50mm normal/85mm portrait/200mm telephoto)
- Depth of field (shallow f/1.4/deep f/11)
- Subject placement (rule of thirds/center/golden ratio)

### 4. Lighting
- **This is the single most impactful slot**
- Source, direction, hardness, color temperature
- **Lighting patterns the model knows**:
  - Rembrandt (triangle on shadowed cheek)
  - Split (half face lit, half in shadow)
  - Butterfly (light from directly above, shadow under nose)
  - Loop (small shadow beside nose)
  - Broad/Short (named by which side of face is lit)

### 5. Color
- Name 3-4 specific colors for the palette
- Grading direction (warm/cool/split-tone/desaturated)
- Color theory: complementary pairs (orange/teal, red/green) work well

### 6. Style
- **One dominant style anchor** — don't stack 5 style references
- Film directors, art movements, anime studios, game aesthetics
- Examples: "Blade Runner 2049", "Ufotable production", "1970s giallo", "Wes Anderson"

### 7. Technical
- Resolution: "ultra-realistic 4K" or "8K"
- Film stock: "35mm film grain", "Kodak Portra 400", "Tri-X 400"
- Aspect ratio: "16:9", "2:3", "1:1", "9:16"

### 8. Exclusions
- What to avoid: "no text, no logos, no watermarks, no extra limbs"
- Especially important for avoiding common AI artifacts

---

## Prompt Length Recommendations

| Use Case | Recommended Length | Example |
|----------|-------------------|---------|
| Simple portrait | 80-150 words | Headshot, simple background |
| Cinematic scene | 150-250 words | Film still with specific era + style |
| Multi-character | 400-800 words | Campaign hero, complex narrative |
| Maximum detail | up to 2,000 words | Concept art brief, brand guidelines |

> **Warning**: Past ~1,200 words, individual adjectives start to dilute. Quality plateaus while prompt effort increases.

---

## Common Failures & Fixes

### Failure 1: Generic, Lifeless Output

**Bad:**
```
A beautiful woman in a city.
```

**Good:**
```
A 28-year-old woman with auburn hair pulled into a low ponytail, wearing a camel trench coat, crossing a Manhattan crosswalk at 6pm on a rainy Thursday. Yellow taxis blur past in motion-blurred streaks. 50mm lens, f/2, cinematic grain. Ultra-realistic 4K.
```

**Rule**: Concrete nouns and named places always beat vague adjectives.

### Failure 2: Wrong Finger Count

GPT Image 2 is much better than earlier models, but:
- Don't make fingers the main subject
- Crop them out: "framing is shoulders up only"
- Give hands something to hold: "hands gently holding a ceramic coffee cup"

### Failure 3: Garbled Text in Image

- Keep text very short: "a sign reads OPEN"
- Or explicitly exclude: "no text, no letters, no words anywhere in the image"
- Add typography in post-production (Figma, Photoshop)

### Failure 4: Lighting Direction Ignored

**Bad:**
```
A portrait of a woman with dramatic lighting.
```

**Good:**
```
A portrait of a woman lit by a single hard spotlight from 45 degrees camera-left, with deep black shadow filling the right side of her face. Rembrandt lighting with a small triangle of light on the shadowed cheek.
```

**Rule**: Name the direction, hardness, and shadow coverage.

### Failure 5: Wrong Setting

If the model keeps placing your character in a generic studio, move the setting to the **front** of the prompt:

```
In a candle-lit 17th-century English library with floor-to-ceiling oak shelves, leather-bound books, and a stone fireplace, a woman in...
```

### Failure 6: Overcrowded Prompt

If your prompt is a laundry list of 40 style tags, the model averages them into mush. Keep one dominant anchor and let everything else support it.

---

## Style References That Work

The model responds well to these categories of style references:

### Film Directors
Denis Villeneuve, Wes Anderson, Wong Kar-wai, Roger Deakins (cinematography), Bong Joon-ho, David Fincher

### Art Movements
Art Deco, Baroque, Impressionism, Art Nouveau, Bauhaus, Pop Art

### Anime Studios
Studio Ghibli, Ufotable, Kyoto Animation, Fortiche (Arcane), Trigger

### Film Stocks
Kodak Portra 400 (warm skin), Kodak Tri-X 400 (B&W grit), Fujifilm Velvia (saturated), Ektachrome (vintage)

### Game Aesthetics
Dark Souls, Ori and the Blind Forest, Hades, Disco Elysium, Zelda: Breath of the Wild

---

## Image-to-Image Tips

When using a reference image + prompt (edit mode):

- **Shorter prompts** — the reference image already provides most of the scene information
- **Focus on the change**: "convert to oil painting style, keep subject's pose and outfit identical"
- **Use `input_fidelity: "high"`** to preserve the subject's identity

---

## Iteration Strategy

1. **Run 3 iterations** of the same prompt to see its natural variance
2. If still off, **change one slot** (usually lighting or camera)
3. Don't rewrite everything — copy the 80% successful prompt and fix one element
4. If 8+ regenerations with no progress, the problem is structural — go back to the 8-slot formula

**Average iterations to hero-quality frame**: 2.8 (with structured prompts) vs 6+ (unstructured)

---

[Back to Main](../README.md)
