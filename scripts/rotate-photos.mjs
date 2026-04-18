import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const dir = path.resolve("public/images/work");
const targets = [
  "767 Aileron.jpg",
  "A330 Inboard Flap.jpg",
  "Rudder.jpg",
  "767 Outboard Flap.jpg",
  "A320 Outboard Flap.jpg",
];

for (const name of targets) {
  const src = path.join(dir, name);
  const tmp = path.join(dir, name + ".rotating.jpg");
  try {
    await sharp(src).rotate(90).jpeg({ quality: 90 }).toFile(tmp);
    await fs.rename(tmp, src);
    console.log(`✓ rotated: ${name}`);
  } catch (err) {
    console.error(`✗ failed: ${name} — ${err.message}`);
  }
}
