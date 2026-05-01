# Contributing to Awesome GPT Image 2 Prompts

Thank you for your interest in contributing! This guide will help you submit quality prompts.

## How to Contribute

### Adding a New Prompt

1. **Choose the right category** — Browse `prompts/` and find the folder that best matches
2. **Add your prompt** to the category's `README.md` following the format below
3. **Submit a PR** with a clear title like "Add [category] prompt: [brief description]"

### Prompt Format

Each prompt entry should follow this structure:

```markdown
## [Number]. [Descriptive Title]

**Style:** [Style tag — e.g., Cinematic / Photorealistic / Concept Art]
**Source:** [Your name or "Community" / URL if from a guide]

\`\`\`
[Your full prompt text here]
\`\`\`

**Technique:** [Optional — explain WHY this prompt works, any tricks used]
```

### Quality Standards

**Good prompts:**
- Are specific with concrete nouns ("camel trench coat" not "nice clothes")
- Include lighting direction ("single hard spotlight from 45 degrees camera-left")
- Name a lens/camera specification ("85mm lens, f/1.4")
- Have a clear style anchor ("Blade Runner 2049 color grade")
- Are tested and produce consistent results

**Poor prompts:**
- Vague adjectives ("beautiful", "amazing", "stunning" without specifics)
- No lighting or camera information
- Copy-pasted from other repos without attribution
- Untested prompts that produce unreliable results

### Adding a New Category

If your prompt doesn't fit existing categories:
1. Create a new folder under `prompts/` with a numbered prefix (e.g., `11-[category-name]/`)
2. Create a `README.md` inside with the same format as other categories
3. Update the main `README.md` table of categories
4. Include at least 5 prompts to justify a new category

## Adding Translations

We welcome translations! To add a new language:
1. Copy `README.md` to `README_[language-code].md` (e.g., `README_ja.md` for Japanese)
2. Translate all content while keeping the prompt text in English (prompts should stay in English for direct copy-paste use)
3. Add a language link at the top of `README.md`

## Reporting Issues

- **Broken prompts**: If a prompt consistently produces poor results, open an issue with the prompt text and what went wrong
- **Formatting**: If formatting is broken in any file, open an issue or PR

## Style Guide

- Use `markdown` code blocks for prompt text
- Include source attribution when possible
- Keep category tips sections at the bottom of each file
- Maintain the numbered format for easy reference
- Use English for all prompt text (even in translated READMEs)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping build the best GPT Image 2 prompt collection!
