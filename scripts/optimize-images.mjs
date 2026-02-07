#!/usr/bin/env node
/**
 * Image optimization script using sharp (already installed via Next.js)
 * Resizes and converts images to WebP for dramatic size reduction
 */

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

const optimizations = [
  // pochet_*.jpg: 2480x3508 -> 800px wide, quality 80
  ...Array.from({ length: 16 }, (_, i) => ({
    input: `pochet_${i + 1}.jpg`,
    output: `pochet_${i + 1}.webp`,
    width: 800,
    quality: 80,
  })),
  // Hero owl image: 1024x1536 -> 600px wide
  {
    input: 'hero-sova-blur.png',
    output: 'hero-sova-blur.webp',
    width: 600,
    quality: 85,
  },
  {
    input: 'sova.png',
    output: 'sova.webp',
    width: 600,
    quality: 85,
  },
  // Subject images: 1080x1080 -> 600px
  ...['math.jpg', 'informatic.jpg', 'rus-lang.jpg', 'physic.jpg', 'society.jpg',
    'biology.jpg', 'chemistry.jpg', 'english.jpg', 'history.jpg', 'literature.jpg'
  ].map(f => ({
    input: f,
    output: f.replace(/\.(jpg|png)$/, '.webp'),
    width: 600,
    quality: 80,
  })),
  // Dosug images: already small, just convert to webp
  ...Array.from({ length: 6 }, (_, i) => ({
    input: `dosug_${i + 1}.jpeg`,
    output: `dosug_${i + 1}.webp`,
    width: 800,
    quality: 80,
  })),
  // Logo: 1080x1080 -> 200px
  {
    input: 'logo.png',
    output: 'logo.webp',
    width: 200,
    quality: 85,
  },
  // Social icons
  ...['vk.png', 'telegram.png', 'yandex.png'].map(f => ({
    input: f,
    output: f.replace('.png', '.webp'),
    width: 64,
    quality: 85,
  })),
];

let totalOriginal = 0;
let totalOptimized = 0;

for (const opt of optimizations) {
  const inputPath = path.join(PUBLIC_DIR, opt.input);
  const outputPath = path.join(PUBLIC_DIR, opt.output);

  try {
    const inputStat = await fs.stat(inputPath);
    const inputSize = inputStat.size;
    totalOriginal += inputSize;

    await sharp(inputPath)
      .resize(opt.width, null, { withoutEnlargement: true })
      .webp({ quality: opt.quality })
      .toFile(outputPath);

    const outputStat = await fs.stat(outputPath);
    const outputSize = outputStat.size;
    totalOptimized += outputSize;

    const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1);
    console.log(
      `✓ ${opt.input} (${(inputSize / 1024).toFixed(0)}KB) -> ${opt.output} (${(outputSize / 1024).toFixed(0)}KB) [-${reduction}%]`
    );
  } catch (err) {
    console.error(`✗ ${opt.input}: ${err.message}`);
  }
}

console.log('\n--- Summary ---');
console.log(`Original total: ${(totalOriginal / 1024 / 1024).toFixed(1)} MB`);
console.log(`Optimized total: ${(totalOptimized / 1024 / 1024).toFixed(1)} MB`);
console.log(`Reduction: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`);
