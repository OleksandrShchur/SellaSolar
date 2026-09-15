import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import sharp from 'sharp'

const root = resolve(import.meta.dirname, '..')

async function toWebp(inputRel, outputRel, quality = 78) {
  const input = resolve(root, inputRel)
  const output = resolve(root, outputRel)
  mkdirSync(dirname(output), { recursive: true })
  await sharp(input).webp({ quality }).toFile(output)
  console.log('wrote', outputRel)
}

async function toOgJpeg(inputRel, outputRel) {
  const input = resolve(root, inputRel)
  const output = resolve(root, outputRel)
  mkdirSync(dirname(output), { recursive: true })
  await sharp(input)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(output)
  console.log('wrote', outputRel)
}

await toWebp('public/assets/hero/morning.png', 'public/assets/hero/morning.webp')
await toWebp('public/assets/hero/night.png', 'public/assets/hero/night.webp')
await toOgJpeg('public/assets/hero/morning.png', 'public/assets/og/og-image.jpg')
