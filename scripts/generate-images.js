const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.PIXMIND_API_KEY;
const ENDPOINT = 'https://aihub-admin.aimix.pro/open-api/v1/image/generate';
const TASK_URL = 'https://aihub-admin.aimix.pro/open-api/v1/task/';

const OUT_DIR = path.join(__dirname, '..', 'images');

const tasks = [
  {
    name: '01-cinematic-portraits/noir-hong-kong.jpg',
    prompt: 'Film noir cinematic shot. A dangerously beautiful femme fatale in a curve-hugging red silk dress with a thigh-high slit, walking through a rain-soaked Hong Kong back alley at night. Neon signs in Chinese characters reflect red and blue on the wet cobblestones. She carries a black umbrella over one shoulder, her red-painted lips the only warm color against the cold teal lighting. Anamorphic lens, shallow depth of field, cinematic grain. Ultra-realistic 4K.',
    model: 'gpt-image-2-eco',
    quality: 'high',
    aspectRatio: '2:3'
  },
  {
    name: '01-cinematic-portraits/wes-anderson-lobby.jpg',
    prompt: 'Wes Anderson style cinematic composition. A 1960s hotel concierge in a burgundy uniform stands dead-center in a pastel-pink Art Deco lobby, flanked by perfectly symmetrical potted palms and brass sconces. Flat front-on framing, everything on center axis. Soft fluorescent overhead lighting. Pastel pink and mint green color palette. 35mm film look. Ultra-detailed 4K.',
    model: 'gpt-image-2-eco',
    quality: 'high',
    aspectRatio: '16:9'
  },
  {
    name: '02-action-sports/surf-barrel.jpg',
    prompt: 'Epic wide-angle shot of a female surfer riding inside a massive crystal-clear barrel wave at golden hour. Her silhouette visible through the translucent turquoise water of the wave tube. Golden sunlight creates an explosion of light and water mist behind her. Dramatic backlit composition. GoPro-style immersive perspective. Ultra-realistic 4K cinematic quality.',
    model: 'gpt-image-2-eco',
    quality: 'high',
    aspectRatio: '16:9'
  },
  {
    name: '03-nature-landscapes/aurora-cabin.jpg',
    prompt: 'Wide landscape of a tiny warm-lit wooden cabin in a Norwegian fjord valley at 1am. A spectacular green and purple aurora borealis dances overhead, reflecting in the still black fjord water. Snow-dusted pine trees and mountains frame the scene. The cabin glow is the only warm color in an otherwise cold composition. Long exposure feel. Ultra-realistic 4K astrophotography.',
    model: 'gpt-image-2-eco',
    quality: 'high',
    aspectRatio: '16:9'
  },
  {
    name: '04-fantasy-illustration/ghibli-fox-spirit.jpg',
    prompt: 'Studio Ghibli style painterly scene. A small forest spirit that looks like a glowing white fox with three tails walks through a mossy enchanted forest at dusk. Fireflies dance around it. Soft painterly brushstrokes, warm honey-gold light filtering through massive ancient trees. Hayao Miyazaki watercolor aesthetic. Ultra-detailed animation cel quality.',
    model: 'gpt-image-2-eco',
    quality: 'high',
    aspectRatio: '1:1'
  },
  {
    name: '04-fantasy-illustration/cyberpunk-samurai.jpg',
    prompt: 'Cyberpunk fantasy fusion. A female samurai with a chrome katana stands on the rain-slicked rooftop of a neo-Tokyo megacorp tower at night. She wears a fusion of traditional kimono and carbon-fiber combat armor. Holographic cherry blossoms drift around her. Neon reflections on the wet rooftop, flying ad-drones in the background. Ultra-detailed 4K concept art.',
    model: 'gpt-image-2-eco',
    quality: 'high',
    aspectRatio: '9:16'
  },
  {
    name: '05-product-commercial/luxury-perfume.jpg',
    prompt: 'High-end product photography of a luxury perfume bottle on a polished black glass surface. The bottle is crystal-clear with gold cap and rose-gold liquid inside. Single hard spotlight from above-left creates a sharp reflection on the surface and a glowing caustic pattern through the liquid. Ultra-clean background, deep black gradient. Shot on 100mm macro lens, f/8. Editorial luxury ad quality. Ultra-realistic 4K.',
    model: 'gpt-image-2-eco',
    quality: 'high',
    aspectRatio: '1:1'
  },
  {
    name: '06-ui-ux-design/saas-dashboard.jpg',
    prompt: 'UI design of a modern SaaS analytics dashboard in dark mode. Left sidebar with navigation icons. Main content area shows a large area chart with gradient fill, four KPI cards at the top, and a recent activity table below. Color scheme: dark charcoal background, electric blue accents, white text. Clean sans-serif typography. Figma-quality UI design.',
    model: 'gpt-image-2-eco',
    quality: 'high',
    aspectRatio: '16:9'
  },
  {
    name: '07-game-assets/isometric-alchemist.jpg',
    prompt: 'Isometric game environment tile of a cozy fantasy alchemist shop interior. Wooden shelves with colorful potion bottles, dried herbs hanging from the ceiling, a stone hearth with a cauldron, and a wooden counter with a brass scale. Warm candlelight glow. Worn stone floor. Hand-painted 2.5D isometric game art style. Rich detail, warm color palette. Ultra-detailed 4K.',
    model: 'gpt-image-2-eco',
    quality: 'high',
    aspectRatio: '1:1'
  },
  {
    name: '08-character-design/steampunk-sheet.jpg',
    prompt: 'Character design sheet of a female steampunk inventor. Three views: front, 3/4, and back, arranged side by side on neutral gray background. Age 25 with messy auburn hair, goggles on forehead, brown leather apron over white blouse, utility belt, high leather boots. One mechanical arm from elbow down in brass and copper. Confident expression. Clean line art with flat color fills.',
    model: 'gpt-image-2-eco',
    quality: 'high',
    aspectRatio: '3:2'
  },
  {
    name: '09-poster-graphic/scifi-poster-nexus.jpg',
    prompt: 'Movie poster design for a sci-fi film. A lone astronaut in a white spacesuit stands on a desert planet surface, looking up at a massive floating alien crystalline structure emitting cold blue light. Dramatic vertical composition, 2:3 poster aspect ratio. Cinematic color grade with orange desert below and blue structure above. Ultra-detailed 4K.',
    model: 'gpt-image-2-eco',
    quality: 'high',
    aspectRatio: '2:3'
  },
  {
    name: '10-text-rendering/neon-open-sign.jpg',
    prompt: 'A glowing neon sign on a dark brick wall reading OPEN in cursive script neon tubing. The neon is warm white with a soft pink-orange glow halo around the letters. A thin chain hangs the sign from a dark metal bracket. Slight reflection on the brick surface below. Photorealistic neon sign photography. Ultra-detailed 4K.',
    model: 'gpt-image-2-eco',
    quality: 'high',
    aspectRatio: '1:1'
  }
];

function post(url, body, headers) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const data = JSON.stringify(body);
    const opts = {
      hostname: u.hostname,
      path: u.pathname,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers, 'Content-Length': Buffer.byteLength(data) }
    };
    const req = https.request(opts, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { reject(e); } });
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
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { reject(e); } });
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
    https.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        download(res.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', e => { fs.unlink(filepath, () => {}); reject(e); });
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function pollTask(taskId) {
  for (let i = 0; i < 40; i++) {
    await sleep(5000);
    const result = await get(TASK_URL + taskId, { 'X-API-Key': API_KEY });
    if (result.data && result.data.status === 'ready' && result.data.images && result.data.images.length > 0) {
      return result.data.images[0];
    }
    if (i % 3 === 0) process.stdout.write('.');
  }
  return null;
}

async function main() {
  console.log(`\n=== Generating ${tasks.length} images with Pixmind API ===\n`);

  // Submit all tasks in parallel
  const submitted = [];
  for (const task of tasks) {
    try {
      const body = {
        prompt: task.prompt,
        model: task.model,
        aspectRatio: task.aspectRatio,
        sampleCount: 1,
        ...(task.quality ? { quality: task.quality } : {})
      };
      const result = await post(ENDPOINT, body, { 'X-API-Key': API_KEY });
      const taskId = result.data?.taskId;
      if (taskId) {
        console.log(`  Submitted: ${task.name} -> Task ${taskId}`);
        submitted.push({ ...task, taskId });
      } else {
        console.log(`  FAILED: ${task.name} - ${JSON.stringify(result)}`);
      }
    } catch (e) {
      console.log(`  ERROR: ${task.name} - ${e.message}`);
    }
    await sleep(1000); // Rate limit
  }

  console.log(`\n=== Polling ${submitted.length} tasks ===\n`);

  // Poll and download
  for (const task of submitted) {
    process.stdout.write(`  Polling ${task.name}`);
    const imgUrl = await pollTask(task.taskId);
    if (imgUrl) {
      const outPath = path.join(OUT_DIR, task.name);
      await download(imgUrl, outPath);
      const size = fs.statSync(outPath).size;
      console.log(` OK (${(size/1024).toFixed(0)}KB)`);
    } else {
      console.log(` TIMEOUT`);
    }
  }

  console.log('\n=== Done ===');
}

main().catch(e => { console.error(e); process.exit(1); });
