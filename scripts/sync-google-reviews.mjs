#!/usr/bin/env node
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const outputPath = path.join(repoRoot, "src/features/testimonials/data/testimonials.ts");

const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
const placeId = process.env.GOOGLE_PLACE_ID?.trim();
const maxReviews = Number(process.env.GOOGLE_REVIEWS_MAX ?? "6");
const languageCode = process.env.GOOGLE_REVIEWS_LANGUAGE?.trim() || "es";
const regionCode = process.env.GOOGLE_REVIEWS_REGION?.trim() || "UY";

if (!apiKey) {
  console.error("Falta GOOGLE_PLACES_API_KEY");
  process.exit(1);
}

if (!placeId) {
  console.error("Falta GOOGLE_PLACE_ID");
  process.exit(1);
}

if (!Number.isFinite(maxReviews) || maxReviews < 1) {
  console.error("GOOGLE_REVIEWS_MAX debe ser un numero mayor a 0");
  process.exit(1);
}

function escapeForTs(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\"/g, '\\"')
    .replace(/\r?\n/g, " ")
    .trim();
}

function toRole(review) {
  const rating = typeof review.rating === "number" ? review.rating : null;
  if (!rating) {
    return "Reseña de Google";
  }
  return `Reseña de Google (${rating}/5)`;
}

function toQuote(review) {
  const text = review?.text?.text;
  if (typeof text === "string" && text.trim().length > 0) {
    return text.trim();
  }
  return "Reseña de Google sin texto.";
}

function parseGoogleTimestamp(value) {
  if (typeof value !== "string" || value.length === 0) {
    return Number.NaN;
  }

  // Google puede devolver fracciones con 9 digitos; Date.parse en JS no siempre las interpreta bien.
  const normalized = value.replace(/\.(\d{3})\d+Z$/, ".$1Z");
  return Date.parse(normalized);
}

function sortByPublishTimeDesc(a, b) {
  const timeA = parseGoogleTimestamp(a?.publishTime);
  const timeB = parseGoogleTimestamp(b?.publishTime);
  if (Number.isNaN(timeA) || Number.isNaN(timeB)) {
    return 0;
  }
  return timeB - timeA;
}

async function fetchPlaceReviews() {
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=${encodeURIComponent(languageCode)}&regionCode=${encodeURIComponent(regionCode)}`;

  const response = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "displayName,reviews",
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google Places API error ${response.status}: ${body}`);
  }

  return response.json();
}

function buildFileContent(items) {
  const rows = items
    .map((item, index) => {
      const name = escapeForTs(item.name);
      const role = escapeForTs(item.role);
      const quote = escapeForTs(item.quote);
      return `  {\n    id: "g${index + 1}",\n    name: "${name}",\n    role: "${role}",\n    quote: "${quote}",\n  }`;
    })
    .join(",\n");

  return `export interface TestimonialItem {\n  id: string;\n  name: string;\n  role: string;\n  quote: string;\n}\n\nexport const testimonials: TestimonialItem[] = [\n${rows}\n];\n`;
}

async function run() {
  const payload = await fetchPlaceReviews();
  const reviews = Array.isArray(payload?.reviews) ? payload.reviews : [];

  if (reviews.length === 0) {
    throw new Error("No se encontraron resenas para este lugar.");
  }

  const normalized = reviews
    .filter((review) => typeof review?.authorAttribution?.displayName === "string")
    .sort(sortByPublishTimeDesc)
    .slice(0, maxReviews)
    .map((review) => ({
      name: review.authorAttribution.displayName,
      role: toRole(review),
      quote: toQuote(review),
    }));

  if (normalized.length === 0) {
    throw new Error("No se pudieron normalizar resenas con autor.");
  }

  if (normalized.length < maxReviews) {
    throw new Error(
      `Solo se obtuvieron ${normalized.length} reseñas reales y se requieren ${maxReviews}. No se agregan reseñas inventadas.`,
    );
  }

  const fileContent = buildFileContent(normalized.slice(0, maxReviews));
  await writeFile(outputPath, fileContent, "utf8");

  console.log(`Reseñas sincronizadas: ${normalized.length}`);
  console.log(`Archivo actualizado: ${outputPath}`);
}

run().catch((error) => {
  console.error("Error al sincronizar resenas:", error);
  process.exit(1);
});
