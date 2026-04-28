import { promises as fs } from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"]);

export interface PublicImage {
  src: string;
  alt: string;
  folder: string;
}

function toAltText(fileName: string) {
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

function toPublicSrc(relativePath: string) {
  return `/${relativePath
    .split(path.sep)
    .join("/")
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}

async function walkImages(baseAbsolutePath: string, relativePath = ""): Promise<string[]> {
  const entries = await fs.readdir(path.join(baseAbsolutePath, relativePath), { withFileTypes: true });
  const files: string[] = [];

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

export async function getPublicImages(baseFolder = "images"): Promise<PublicImage[]> {
  const publicRoot = path.join(process.cwd(), "public");
  const targetFolder = path.join(publicRoot, baseFolder);

  let imageFiles: string[] = [];
  try {
    imageFiles = await walkImages(targetFolder);
  } catch {
    return [];
  }

  return imageFiles
    .map((relativeFilePath) => {
      const normalizedRelativePath = path.join(baseFolder, relativeFilePath);
      const fileName = path.basename(relativeFilePath);
      const folderPath = path.dirname(relativeFilePath);

      return {
        src: toPublicSrc(normalizedRelativePath),
        alt: toAltText(fileName),
        folder: folderPath === "." ? "General" : folderPath.split(path.sep).join("/"),
      };
    })
    .sort((a, b) => a.src.localeCompare(b.src, "es", { numeric: true }));
}
