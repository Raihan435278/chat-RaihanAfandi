// scripts/generate-icons.js
// Jalankan: node scripts/generate-icons.js

import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_IMAGE = join(__dirname, '../src/app/icon.svg');
const OUTPUT_DIR = join(__dirname, '../public/icons');
const APP_DIR = join(__dirname, '../src/app');
const SIZES = [72, 96, 128, 144, 152, 180, 192, 384, 512];

async function generateIcons() {
  // Pastikan folder output ada
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✅ Folder dibuat: ${OUTPUT_DIR}`);
  }

  if (!existsSync(SOURCE_IMAGE)) {
    console.error(`❌ File sumber tidak ditemukan: ${SOURCE_IMAGE}`);
    process.exit(1);
  }

  console.log(`🔧 Membaca sumber icon dari: ${SOURCE_IMAGE}`);
  console.log(`📁 Output ke: ${OUTPUT_DIR}`);
  console.log('');

  for (const size of SIZES) {
    const outputFile = join(OUTPUT_DIR, `icon-${size}x${size}.png`);
    try {
      await sharp(SOURCE_IMAGE)
        .resize(size, size, {
          fit: 'cover',
        })
        .png()
        .toFile(outputFile);
      console.log(`✅ Generated: icon-${size}x${size}.png`);
    } catch (err) {
      console.error(`❌ Gagal membuat icon-${size}x${size}.png:`, err.message);
    }
  }

  const appIcon = await sharp(SOURCE_IMAGE).resize(512, 512).png().toBuffer();
  await writeFile(join(APP_DIR, 'icon.png'), appIcon);

  const faviconPng = await sharp(SOURCE_IMAGE).resize(256, 256).png().toBuffer();
  const faviconHeader = Buffer.alloc(22);
  faviconHeader.writeUInt16LE(1, 2);
  faviconHeader.writeUInt16LE(1, 4);
  faviconHeader.writeUInt8(0, 6);
  faviconHeader.writeUInt8(0, 7);
  faviconHeader.writeUInt16LE(1, 10);
  faviconHeader.writeUInt16LE(32, 12);
  faviconHeader.writeUInt32LE(faviconPng.length, 14);
  faviconHeader.writeUInt32LE(faviconHeader.length, 18);
  await writeFile(join(APP_DIR, 'favicon.ico'), Buffer.concat([faviconHeader, faviconPng]));

  console.log('\n🎉 Ikon aplikasi, favicon, dan ikon PWA berhasil dibuat.');
}

generateIcons();
