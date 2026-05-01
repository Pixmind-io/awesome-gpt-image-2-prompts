const fs = require('fs');
const path = require('path');

const PROMPTS_DIR = path.join(__dirname, '..', 'prompts');
const IMAGES_DIR = path.join(__dirname, '..', 'images');

function updateReadme(catDir) {
  const readmePath = path.join(catDir, 'README.md');
  if (!fs.existsSync(readmePath)) return;

  const cat = path.basename(catDir);
  const imgDir = path.join(IMAGES_DIR, cat);
  let content = fs.readFileSync(readmePath, 'utf-8');

  // Get all available images for this category
  const images = {};
  if (fs.existsSync(imgDir)) {
    for (const f of fs.readdirSync(imgDir)) {
      if (f.endsWith('.jpg') || f.endsWith('.webp') || f.endsWith('.png')) {
        const num = f.match(/^(\d+)/)?.[1];
        if (num) images[num.padStart(2, '0')] = f;
      }
    }
  }

  // Process each ## section
  const lines = content.split('\n');
  const newLines = [];
  let inCodeBlock = false;
  let currentNum = null;
  let addedImage = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Track prompt number
    const headerMatch = line.match(/^## (\d+)\./);
    if (headerMatch) {
      currentNum = headerMatch[1].padStart(2, '0');
      addedImage = false;
    }

    // Track code blocks
    if (line.trim() === '```') {
      if (!inCodeBlock) {
        inCodeBlock = true;
      } else {
        inCodeBlock = false;
        // After code block closes, check if next line is already an image
        // or if there's an image to add
        newLines.push(line);

        // Check if next non-empty line is already an image reference
        let nextIdx = i + 1;
        while (nextIdx < lines.length && lines[nextIdx].trim() === '') nextIdx++;
        const nextLine = lines[nextIdx] || '';

        if (currentNum && images[currentNum] && !addedImage && !nextLine.startsWith('![')) {
          const imgFile = images[currentNum];
          const imgPath = `../../images/${cat}/${imgFile}`;
          // Extract title from the heading
          const titleLine = newLines.find(l => l.startsWith(`## ${parseInt(currentNum)}.`));
          const title = titleLine ? titleLine.replace(/^## \d+\.\s*/, '').trim() : '';
          newLines.push('');
          newLines.push(`![${title}](${imgPath})`);
          addedImage = true;
        }
        continue;
      }
    }

    newLines.push(line);
  }

  fs.writeFileSync(readmePath, newLines.join('\n'));
  console.log(`Updated: ${cat} (${Object.keys(images).length} images)`);
}

// Process all categories
const cats = fs.readdirSync(PROMPTS_DIR).filter(f =>
  fs.statSync(path.join(PROMPTS_DIR, f)).isDirectory()
);

for (const cat of cats.sort()) {
  updateReadme(path.join(PROMPTS_DIR, cat));
}

console.log('\nDone!');
