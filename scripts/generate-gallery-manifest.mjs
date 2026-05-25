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
const EXCLUDED_IMAGE_FILE_NAMES = new Set([
  "BLANCO-FONDO-TRANSPARENTE.png",
  "FONDO-NEGRO.png",
  "NEGRO-FONDO-TRANSPARENTE.png",
]);

function pickTemplate(templates, index) {
  return templates[index % templates.length];
}

function toAltText(fileName, relativeFilePath = "") {
  const withoutExtension = fileName.replace(/\.[^.]+$/, "");
  const normalized = withoutExtension.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  const lower = normalized.toLowerCase();
  const pathLower = relativeFilePath.split(path.sep).join("/").toLowerCase();
  const numberMatch = lower.match(/\d+/);
  const photoNumber = numberMatch ? Number(numberMatch[0]) : 0;
  const photoLabel = photoNumber ? ` - foto ${photoNumber}` : "";

  if (lower.includes("blanco") && lower.includes("transparente")) {
    return "Logotipo blanco de Polarizados del Este con fondo transparente";
  }
  if (lower.includes("negro") && lower.includes("transparente")) {
    return "Logotipo negro de Polarizados del Este con fondo transparente";
  }
  if (lower.includes("fondo negro")) {
    return "Logotipo de Polarizados del Este sobre fondo negro";
  }

  if (pathLower.includes("sorrifacil")) {
    const sorrifacilMatch = lower.match(/sorrifacil\s*(\d+)/);
    const sorrifacilNumber = Number(sorrifacilMatch?.[1] ?? 0);
    const sorrifacilIndex = sorrifacilNumber > 0 ? sorrifacilNumber - 1 : 0;

    return pickTemplate([
      "Láminas para vidrios en oficina comercial Sorrifacil",
      "Aplicación de láminas de privacidad en consultorio Sorrifacil",
      "Solución de control visual para oficina comercial Sorrifacil",
      "Instalación de láminas decorativas en espacio de atención Sorrifacil",
      "Terminación de láminas para vidrios interiores en Sorrifacil",
      "Proyecto de láminas para oficina y recepción comercial Sorrifacil",
      "Resultado final de láminas instaladas en oficina Sorrifacil",
    ], sorrifacilIndex);
  }
  if (lower.startsWith("pola")) {
    return `${pickTemplate([
      "Polarizado automotriz con láminas de control solar en vehículo particular",
      "Instalación de láminas de seguridad para auto en Ciudad de la Costa",
      "Terminación de polarizado vehicular realizada por Polarizados del Este",
      "Polarizado para mejorar privacidad y confort térmico del vehículo",
    ], photoNumber)}${photoLabel}`;
  }
  if (lower.startsWith("det")) {
    return `${pickTemplate([
      "Proceso de car detailing para recuperación estética vehicular",
      "Tratamiento de protección y brillo en pintura de vehículo",
      "Detalle de limpieza técnica y terminación exterior del auto",
      "Resultado de car detailing profesional con acabado cuidado",
    ], photoNumber)}${photoLabel}`;
  }
  if (lower.startsWith("office") || lower.startsWith("sorri") || lower.startsWith("home")) {
    return `${pickTemplate([
      "Instalación de láminas para vidrios en home, office y espacios comerciales",
      "Láminas de control solar para mejorar confort en interiores",
      "Solución de privacidad y protección solar para oficina o comercio",
      "Aplicación de láminas decorativas y funcionales para espacios interiores",
    ], photoNumber)}${photoLabel}`;
  }
  if (lower.startsWith("pesados")) {
    return `${pickTemplate([
      "Laminado de vidrios en maquinaria pesada para protección solar",
      "Instalación de láminas en vehículo de gran porte",
      "Polarizado para cabina de maquinaria o unidad de trabajo",
      "Láminas de seguridad y control solar en vehículo pesado",
    ], photoNumber)}${photoLabel}`;
  }
  if (lower.startsWith("car")) {
    return `${pickTemplate([
      "Trabajo de cartelería y vinilo para comunicación visual comercial",
      "Aplicación de vinilo publicitario en superficie comercial",
      "Proyecto de cartelería para reforzar imagen de marca",
      "Instalación de gráfica adhesiva y vinilo decorativo",
    ], photoNumber)}${photoLabel}`;
  }

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

function shouldIncludeImage(fileName) {
  return !EXCLUDED_IMAGE_FILE_NAMES.has(fileName);
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
    if (IMAGE_EXTENSIONS.has(extension) && shouldIncludeImage(entry.name)) {
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
        alt: toAltText(fileName, relativeFilePath),
        folder: folderPath === "." ? "General" : folderPath.split(path.sep).join("/"),
      };
    })
    .sort((a, b) => a.src.localeCompare(b.src, "es", { numeric: true }));

  await fs.writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`Manifest generado con ${manifest.length} imágenes: ${outputPath}`);
}

run().catch((error) => {
  console.error("No se pudo generar el manifest de galería:", error);
  process.exit(1);
});
