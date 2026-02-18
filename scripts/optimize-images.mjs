import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("assets/images");
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const JPEG_QUALITY = 82;
const WEBP_QUALITY = 82;
const PNG_QUALITY = 82;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (EXTENSIONS.has(ext)) files.push(fullPath);
  }

  return files;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const input = sharp(filePath, { failOn: "none" });
  const metadata = await input.metadata();
  const tempPath = `${filePath}.tmp`;

  let pipeline = sharp(filePath, { failOn: "none" }).rotate();

  if (metadata.width && metadata.width > 3200) {
    pipeline = pipeline.resize({ width: 3200, withoutEnlargement: true });
  }

  if (ext === ".jpg" || ext === ".jpeg") {
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tempPath);
    await fs.rename(tempPath, filePath);
    return;
  }

  if (ext === ".png") {
    await pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true }).toFile(tempPath);
    await fs.rename(tempPath, filePath);
    return;
  }

  await pipeline.webp({ quality: WEBP_QUALITY }).toFile(tempPath);
  await fs.rename(tempPath, filePath);
}

async function main() {
  const files = await walk(ROOT);
  if (files.length === 0) {
    console.log("No image files found under assets/images.");
    return;
  }

  console.log(`Optimizing ${files.length} images...`);
  for (const file of files) {
    await optimizeImage(file);
    console.log(`- ${path.relative(process.cwd(), file)}`);
  }
  console.log("Image optimization complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
