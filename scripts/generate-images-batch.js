const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.PIXMIND_API_KEY;
const ENDPOINT = 'https://aihub-admin.aimix.pro/open-api/v1/image/generate';
const TASK_URL = 'https://aihub-admin.aimix.pro/open-api/v1/task/';
const OUT_DIR = path.join(__dirname, '..', 'images');

// Extract prompts from all category READMEs
function extractPrompts(dir) {
  const categories = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());
  const allTasks = [];

  for (const cat of categories.sort()) {
    const readme = path.join(dir, cat, 'README.md');
    if (!fs.existsSync(readme)) continue;

    const content = fs.readFileSync(readme, 'utf-8');
    // Split by "##" headers
    const sections = content.split(/^## /m).slice(1);

    for (const section of sections) {
      const titleMatch = section.match(/^(\d+)\.\s+(.+)/);
      if (!titleMatch) continue;
      const num = titleMatch[1].padStart(2, '0');
      const title = titleMatch[2].split('\n')[0].trim().replace(/[^a-zA-Z0-9_\-\s]/g, '').replace(/\s+/g, '-').toLowerCase().substring(0, 50);

      // Extract prompt from code block
      const codeMatch = section.match(/```\n([\s\S]*?)```/);
      if (!codeMatch) continue;
      const prompt = codeMatch[1].trim();
      if (prompt.length < 20) continue;

      // Determine aspect ratio based on category and content
      let ratio = '1:1';
      const catNum = parseInt(cat);
      const pLower = prompt.toLowerCase();

      if (pLower.includes('vertical') || pLower.includes('9:16') || pLower.includes('poster') && catNum === 9) {
        ratio = '2:3';
      } else if (pLower.includes('wide') || pLower.includes('16:9') || pLower.includes('landscape') || pLower.includes('cinematic wide')) {
        ratio = '16:9';
      } else if (pLower.includes('2:3') || pLower.includes('portrait')) {
        ratio = '2:3';
      } else if (catNum === 5 || catNum === 7) {
        ratio = '1:1';
      } else if (catNum === 6) {
        ratio = '16:9';
      } else if (catNum === 9) {
        ratio = '2:3';
      } else if (catNum === 8) {
        ratio = '3:2';
      } else {
        ratio = '2:3';
      }

      const imgName = `${num}-${title}.jpg`;
      const imgDir = path.join(OUT_DIR, cat);

      // Check if image already exists
      if (fs.existsSync(path.join(imgDir, imgName))) continue;

      allTasks.push({
        name: `${cat}/${imgName}`,
        prompt: prompt,
        model: 'gpt-image-2-eco',
        quality: 'high',
        aspectRatio: ratio
      });
    }
  }
  return allTasks;
}

function post(url, body, headers) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const data = JSON.stringify(body);
    const opts = {
      hostname: u.hostname, path: u.pathname, method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers, 'Content-Length': Buffer.byteLength(data) }
    };
    const req = https.request(opts, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { reject(new Error(d)); } });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function get(url, headers) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const opts = { hostname: u.hostname, path: u.pathname, method: 'GET', headers };
    const req = https.request(opts, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { reject(new Error(d)); } });
    });
    req.on('error', reject);
    req.end();
  });
}

function download(url, filepath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const file = fs.createWriteStream(filepath);
    const doRequest = (reqUrl) => {
      https.get(reqUrl, res => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          doRequest(res.headers.location);
          return;
        }
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }).on('error', e => { fs.unlink(filepath, () => {}); reject(e); });
    };
    doRequest(url);
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function pollTask(taskId, maxAttempts = 50) {
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(5000);
    try {
      const result = await get(TASK_URL + taskId, { 'X-API-Key': API_KEY });
      if (result.data && result.data.status === 'ready' && result.data.images && result.data.images.length > 0) {
        return result.data.images[0];
      }
      if (result.data && result.data.status === 'failed') return null;
    } catch(e) {}
  }
  return null;
}

async function main() {
  const promptsDir = path.join(__dirname, '..', 'prompts');
  const tasks = extractPrompts(promptsDir);

  // Filter out already existing images
  const pending = tasks.filter(t => {
    const fullPath = path.join(OUT_DIR, t.name);
    return !fs.existsSync(fullPath) || fs.statSync(fullPath).size < 1000;
  });

  console.log(`\n=== Total prompts: ${tasks.length}, Pending: ${pending.length} ===\n`);

  // Submit one at a time with rate limiting (60/min limit, keep to 50/min)
  const submitted = [];
  const SUBMIT_DELAY = 1500; // 1.5s between submissions = ~40/min

  for (let i = 0; i < pending.length; i++) {
    const task = pending[i];
    try {
      const body = {
        prompt: task.prompt.substring(0, 4000),
        model: task.model,
        aspectRatio: task.aspectRatio,
        sampleCount: 1,
        quality: task.quality
      };
      const result = await post(ENDPOINT, body, { 'X-API-Key': API_KEY });
      const taskId = result.data?.taskId;
      if (taskId) {
        console.log(`  [${i+1}/${pending.length}] OK: ${task.name} -> ${taskId}`);
        submitted.push({ ...task, taskId });
      } else if (result.code === 1001) {
        // Rate limited - wait 60s and retry
        console.log(`  [${i+1}] RATE LIMITED, waiting 60s...`);
        await sleep(60000);
        i--; // retry this one
      } else {
        console.log(`  [${i+1}] FAIL: ${task.name} - ${JSON.stringify(result)}`);
      }
    } catch(e) {
      console.log(`  [${i+1}] ERR: ${task.name} - ${e.message}`);
    }
    await sleep(SUBMIT_DELAY);
  }

  console.log(`\n=== Submitted ${submitted.length} tasks. Polling... ===\n`);

  let success = 0, fail = 0;

  // Poll and download sequentially with concurrency
  for (let i = 0; i < submitted.length; i++) {
    const task = submitted[i];
    process.stdout.write(`  [${i+1}/${submitted.length}] ${task.name.split('/')[1].substring(0,35)}`);
    const imgUrl = await pollTask(task.taskId);
    if (imgUrl) {
      const outPath = path.join(OUT_DIR, task.name);
      await download(imgUrl, outPath);
      const size = fs.statSync(outPath).size;
      console.log(` OK (${(size/1024).toFixed(0)}KB)`);
      success++;
    } else {
      console.log(` FAIL`);
      fail++;
    }
  }

  console.log(`\n=== Done: ${success} success, ${fail} failed ===`);
}

main().catch(e => { console.error(e); process.exit(1); });
