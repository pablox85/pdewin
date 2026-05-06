#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const publicImagesRoot = path.join(repoRoot, "public", "images");
const outputPath = path.join(repoRoot, "src", "lib", "gallery", "generated-public-images.json");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"]);

function toAltText(fileName) {
  const withoutExtension = fileName.replace(/\.[^.]+$/, "");
  const normalized = withoutExtension.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  const lower = normalized.toLowerCase();

  if (lower.startsWith("pola")) return "Trabajo de polarizado vehicular";
  if (lower.startsWith("det")) return "Trabajo de car detailing";
  if (lower.startsWith("office") || lower.startsWith("sorri") || lower.startsWith("home")) {
    return "Instalacion de laminas para home y office";
  }
  if (lower.startsWith("pesados")) return "Laminado en vehiculo de gran porte";
  if (lower.startsWith("car")) return "Trabajo de carteleria y vinilo";

  return normalized || "Imagen de trabajo realizado";
}

function toPublicSrc(relativePath) {
  return `/${relativePath
    .split(path.sep)
    .join("/")
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}

async function walkImages(baseAbsolutePath, relativePath = "") {
  const entries = await fs.readdir(path.join(baseAbsolutePath, relativePath), { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const nextRelativePath = relativePath ? path.join(relativePath, entry.name) : entry.name;

    if (entry.isDirectory()) {
      files.push(...(await walkImages(baseAbsolutePath, nextRelativePath)));
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (IMAGE_EXTENSIONS.has(extension)) {
      files.push(nextRelativePath);
    }
  }

  return files;
}

async function run() {
  const imageFiles = await walkImages(publicImagesRoot);

  const manifest = imageFiles
    .map((relativeFilePath) => {
      const normalizedRelativePath = path.join("images", relativeFilePath);
      const fileName = path.basename(relativeFilePath);
      const folderPath = path.dirname(relativeFilePath);

      return {
        src: toPublicSrc(normalizedRelativePath),
        alt: toAltText(fileName),
        folder: folderPath === "." ? "General" : folderPath.split(path.sep).join("/"),
      };
    })
    .sort((a, b) => a.src.localeCompare(b.src, "es", { numeric: true }));

  await fs.writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`Manifest generado con ${manifest.length} imagenes: ${outputPath}`);
}

run().catch((error) => {
  console.error("No se pudo generar el manifest de galeria:", error);
  process.exit(1);
});
