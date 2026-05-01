# Text Rendering

Typography, signage, calligraphy, word art, and prompts that specifically require readable text in the generated image.

> GPT Image 2 has significantly improved text rendering compared to previous models, but still rewards careful handling. Wrap literal text in quotes or ALL CAPS, specify font style, size, color, and placement. Keep text to 1-5 words for best results.

---

## 01. Neon Sign Typography

**Style:** Neon Sign / Dark Brick Wall
**Source:** Community

```
A glowing neon sign on a dark brick wall reading "OPEN" in cursive script neon tubing. The neon is warm white with a soft pink-orange glow halo around the letters. A thin chain hangs the sign from a dark metal bracket. Slight reflection of the neon glow on the brick surface below. Photorealistic neon sign photography. Ultra-detailed 4K.
```

![Neon Open Sign result](../../images/10-text-rendering/neon-open-sign.jpg)

---

## 02. Chalkboard Menu Typography

**Style:** Chalkboard / Hand-Lettered
**Source:** Community

```
A rustic wooden-framed chalkboard menu for a coffee shop. Elegant chalk hand-lettering in white and gold chalk marker. Header reads "TODAY'S SPECIAL" in large ornate script. Below, three items listed: "Vanilla Latte $5", "Matcha Mocha $6", "Cold Brew $4" in neat serif chalk writing. Small decorative flourishes and a coffee cup doodle in the corner. Realistic chalk texture with smudges. Photorealistic.
```

![](../../images/10-text-rendering/02-chalkboard-menu-typography.jpg)

---

## 03. Gold Foil Calligraphy

**Style:** Luxury Stationery / Gold Foil
**Source:** Community

```
Elegant gold foil calligraphy on deep navy blue cardstock. The word "ELEGANCE" is written in flowing Spencerian script with metallic gold foil that catches the light, showing subtle reflections and texture. Small decorative flourishes extend from the first and last letters. Macro close-up showing the foil texture and slight embossing on the paper surface. Luxury stationery photography. Ultra-detailed 4K.
```

![](../../images/10-text-rendering/03-gold-foil-calligraphy.jpg)

---

## 04. Diner Menu Board at 5 AM

**Style:** Diner Signage / Documentary
**Source:** [fal.ai Prompting Guide](https://fal.ai/learn/tools/prompting-gpt-image-2)

```
Create a photoreal photograph of a 24 hour diner menu board at 5 in the morning, shot from the counter seat at slight angle. Plastic letter tracks, uneven letter spacing, one missing letter slot, yellowed light from incandescent bulbs, legible prices, categories labeled BREAKFAST, GRIDDLE, SANDWICHES, SIDES, DRINKS, and a daily special that reads CHICKEN FRIED STEAK 8.25. The type must be 100 percent readable and physically believable. No watermark, no brand logos, no text artifacts.
```

![](../../images/10-text-rendering/04-diner-menu-board-at-5-am.jpg)

**Technique:** Category headings in ALL CAPS without quotes. The daily special given as an exact line. "100 percent readable and physically believable" locks the finish.

---

## 05. Billboard with Exact Text

**Style:** Billboard Mockup / Advertising
**Source:** [fal.ai Prompting Guide](https://fal.ai/learn/tools/prompting-gpt-image-2)

```
Create a realistic roadside billboard mockup at sunset.

Billboard headline (EXACT TEXT, one line only):
"Fresh and clean"

Typography:
Bold sans serif, centered, high contrast, clean kerning, easy to read from a distance.

Layout:
Bottle on the right, headline on the left, generous negative space.

Constraints:
Render the text verbatim.
No extra words.
No duplicate text.
No additional logos.
No watermark.
```

![](../../images/10-text-rendering/05-billboard-with-exact-text.jpg)

**Technique:** Mark text as EXACT TEXT, specify font style, size, color, and placement. State "no extra words" and "no duplicate text" to prevent ghosting.

---

## 06. Protest Sign in Rain

**Style:** Documentary / Handwritten Text
**Source:** [fal.ai Prompting Guide](https://fal.ai/learn/tools/prompting-gpt-image-2)

```
Create a documentary photograph of a handmade cardboard protest sign held in winter rain.
The sign reads, across two lines: FUND THE LIBRARIES.
Wet cardboard edges, black marker bleeding slightly, gloved hand holding it, out-of-focus crowd behind, calm determined tone, overcast natural light.
The text must be legible.
No branding. No watermark.
```

![](../../images/10-text-rendering/06-protest-sign-in-rain.jpg)

---

## 07. Vintage Marquee Letters

**Style:** Vintage / Marquee Letters
**Source:** Community

```
Vintage marquee letters spelling "CINEMA" on a dark wall. Each letter is a separate metal-frame unit with exposed warm white bulbs, some slightly dimmed for character. The metal frames are rusted and weathered with layers of peeling paint in faded red and cream. Industrial vintage aesthetic. Shot straight-on with shallow depth of field. Ultra-detailed 4K.
```

![](../../images/10-text-rendering/07-vintage-marquee-letters.jpg)

---

## 08. Graffiti Wall Art

**Style:** Urban Street Art / Spray Paint
**Source:** Community

```
Urban graffiti mural on a concrete wall in a city alley. Large bold spray-painted letters reading "DREAM" in wildstyle graffiti with 3D depth effect. Colors: electric blue, hot pink, and white highlights on a dark purple shadow. Drip effects on the bottom of letters. Background has smaller tags and splashes. Raw urban street art photography. Ultra-detailed 4K.
```

![](../../images/10-text-rendering/08-graffiti-wall-art.jpg)

---

## 09. Letterpress Printing

**Style:** Artisan Craft / Macro
**Source:** Community

```
Close-up macro shot of letterpress printed text on thick cotton paper. The words "HELLO WORLD" in classic serif type, showing the characteristic deep impression into the paper and the slight ink variation characteristic of letterpress printing. Ink color is a deep rich navy blue. Paper is natural cream with visible fiber texture. Soft natural side-lighting reveals the debossed depth. Artisan craft photography. Ultra-detailed 4K.
```

![](../../images/10-text-rendering/09-letterpress-printing.jpg)

---

## 10. Marketing Creative with Exact Text

**Style:** Advertising / In-Image Text
**Source:** [OpenAI Official Cookbook](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide)

```
Create a realistic billboard mockup of the product on a highway scene during sunset.
Billboard text (EXACT, verbatim, no extra characters):
"Fresh and clean"
Typography: bold sans-serif, high contrast, centered, clean kerning.
Ensure text appears once and is perfectly legible.
No watermarks, no logos.
```

![Marketing Creative with Exact Text](../../images/10-text-rendering/10-marketing-creative-with-exact-text.jpg)

**Technique:** Use `quality="medium"` or `quality="high"` for text-heavy images. "medium" works for large text; "high" is better for small or dense text.

---

## 11. Thread Brand Campaign Ad

**Style:** Fashion Campaign / Tagline
**Source:** [OpenAI Official Cookbook](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide)

```
Give me a cool in culture ad / fashion shot for a brand called Thread.
It's a hip young street brand. The ad shows a group of friends hanging out together with the tagline "Yours to Create."
Make it feel like a polished campaign image for a youth streetwear audience: stylish, contemporary, energetic, and tasteful.
Use clean composition, strong color direction, natural poses, and premium fashion photography cues.
Render the tagline exactly once, clearly and legibly, integrated into the ad layout.
No extra text, no watermarks, no unrelated logos.
```

![Thread Brand Campaign Ad](../../images/10-text-rendering/11-thread-brand-campaign-ad.jpg)

---

## 12. Skincare Instagram Story Ad

**Style:** Social Media Ad / Flat Lay
**Source:** [NoteGPT](https://notegpt.io/blog/gpt-image-2-prompt-guide-use-cases)

```
A flat-lay photograph of a high-end skincare set on a marble surface. Surrounded by pink peony petals. Soft natural light. Clean white text at the bottom reads '7-DAY GLOW' in a modern serif font.
```

![Skincare Instagram Story Ad](../../images/10-text-rendering/12-skincare-instagram-story-ad.jpg)

---

## 13. Viral Social Media Post (AI IS HERE)

**Style:** 3D Illustration / Social Media
**Source:** [NoteGPT](https://notegpt.io/blog/gpt-image-2-prompt-guide-use-cases)

```
A 3D isometric illustration of a digital workspace. A glowing laptop in the center with a 3D speech bubble coming out of the screen saying 'AI IS HERE' in bold, clean 3D letters. Vibrant purple and blue color palette. Soft clay-style render, high-quality 3D art.
```

![Viral Social Media Post (AI IS HERE)](../../images/10-text-rendering/13-viral-social-media-post-ai-is-here.jpg)

---

## 14. YouTube Thumbnail (THE FIX)

**Style:** YouTube Thumbnail / Split Screen
**Source:** [NoteGPT](https://notegpt.io/blog/gpt-image-2-prompt-guide-use-cases)

```
A split-screen image. Left side: A frustrated man looking at a messy pile of papers. Right side: The same man smiling, holding a clean tablet. High-contrast colors, expressive facial features. Central text overlay in bright yellow: 'THE FIX'.
```

![YouTube Thumbnail (THE FIX)](../../images/10-text-rendering/14-youtube-thumbnail-the-fix.jpg)

---

## 15. Bookstore Window with Alphabet Poster

**Style:** Storefront / Window Display / Reflected Text
**Source:** [fal.ai Prompting Guide](https://fal.ai/learn/tools/prompting-gpt-image-2)

```
Create a photograph of a bookstore window with a readable alphabet poster and reflected street scene.
```

![Bookstore Window with Alphabet Poster](../../images/10-text-rendering/15-bookstore-window-with-alphabet-poster.jpg)

**Technique:** Once the prompt treats copy as layout, the image can carry real reading load. Bookstore windows are excellent stress tests for text because they combine readable poster text with reflected street text on glass.

---

## 16. Localization Translation (Infographic)

**Style:** Translation Edit / Preserve Layout
**Source:** [OpenAI Official Cookbook](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide)

```
Translate the text in the infographic to Spanish. Do not change any other aspect of the image.
```

![Localization Translation (Infographic)](../../images/10-text-rendering/16-localization-translation-infographic.jpg)

**Technique:** This is an edit prompt. Provide the original image and the translation instruction. GPT Image 2 preserves typography style, placement, spacing, and hierarchy while translating verbatim.

---

## Anti-Slop Rules for Text Rendering

From the [fal.ai Prompting Guide](https://fal.ai/learn/tools/prompting-gpt-image-2):

1. **Wrap literal text in quotes or ALL CAPS** and specify font style, size, color, and placement
2. **Spell hard words letter by letter** when the model keeps ghosting them
3. **State "no extra words" and "no duplicate text"** to prevent text artifacts
4. **Use `quality="high"`** for small text, dense information panels, and multi-font layouts
5. **Keep text to 1-5 words** for best reliability; longer text is more prone to errors

---

## Tips for Text Rendering

- **Keep text short**: 1-5 words maximum for reliable results
- **Simple words work best**: Common words like "OPEN", "HELLO", "DREAM" render more reliably than unusual text
- **Specify the medium**: neon, chalk, foil, spray paint, letterpress -- each has unique texture
- **Add context**: A sign on a wall, text on a menu, letters on a building -- context helps the model place text correctly
- **Fallback strategy**: If text fails, add "no text, no letters" to the prompt and overlay text in Photoshop/Figma
- **Mark text as EXACT TEXT**: Use phrases like "EXACT TEXT, verbatim" to signal the model to render text precisely

---

[Back to Main](../../README.md)
