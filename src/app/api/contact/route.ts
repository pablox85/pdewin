import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";

interface ContactPayload {
  nombre: string;
  email: string;
  servicio: string;
  mensaje: string;
  captchaA: number;
  captchaB: number;
  captchaAnswer: number;
}

const SMTP_HOST = process.env.SMTP_HOST?.trim() ?? "";
const SMTP_PORT = Number(process.env.SMTP_PORT?.trim() ?? "465");
const SMTP_USER = process.env.SMTP_USER?.trim() ?? "";
const SMTP_PASS = process.env.SMTP_PASS?.trim() ?? "";
const SMTP_FROM = process.env.SMTP_FROM?.trim() || SMTP_USER || siteConfig.contactEmail;
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO?.trim() || siteConfig.contactEmail;
const hasMailConfig = Boolean(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && SMTP_FROM && CONTACT_EMAIL_TO);
const missingMailConfig = [
  !SMTP_HOST ? "SMTP_HOST" : null,
  !SMTP_PORT ? "SMTP_PORT" : null,
  !SMTP_USER ? "SMTP_USER" : null,
  !SMTP_PASS ? "SMTP_PASS" : null,
  !SMTP_FROM ? "SMTP_FROM" : null,
  !CONTACT_EMAIL_TO ? "CONTACT_EMAIL_TO" : null,
].filter((value): value is string => Boolean(value));

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

// Rate limit in-memory: suficiente como barrera simple, pero no compartido entre instancias serverless.
const contactRateLimitStore = new Map<string, RateLimitEntry>();

export const runtime = "nodejs";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sanitizeText(value: unknown) {
  return String(value ?? "").trim();
}

function isWithinLength(value: string, min: number, max: number) {
  return value.length >= min && value.length <= max;
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    forwardedFor ||
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    "unknown"
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();

  for (const [storedIp, entry] of contactRateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      contactRateLimitStore.delete(storedIp);
    }
  }

  const currentEntry = contactRateLimitStore.get(ip);

  if (!currentEntry || currentEntry.resetAt <= now) {
    contactRateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (currentEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  currentEntry.count += 1;
  return false;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getPayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const payload = body as Record<string, unknown>;
  const nombre = sanitizeText(payload.nombre);
  const email = sanitizeText(payload.email);
  const servicio = sanitizeText(payload.servicio);
  const mensaje = sanitizeText(payload.mensaje);
  const website = sanitizeText(payload.website);
  const captchaA = Number(payload.captchaA);
  const captchaB = Number(payload.captchaB);
  const captchaAnswer = Number(payload.captchaAnswer);

  if (website) {
    return null;
  }

  if (!nombre || !email || !servicio || !mensaje) {
    return null;
  }

  const hasValidLengths =
    isWithinLength(nombre, 2, 80) &&
    isWithinLength(email, 1, 120) &&
    isWithinLength(servicio, 1, 60) &&
    isWithinLength(mensaje, 10, 2000);

  if (!hasValidLengths) {
    return null;
  }

  if (!isValidEmail(email)) {
    return null;
  }

  const isValidCaptchaValues =
    Number.isInteger(captchaA) &&
    Number.isInteger(captchaB) &&
    Number.isInteger(captchaAnswer) &&
    captchaA >= 1 &&
    captchaA <= 9 &&
    captchaB >= 1 &&
    captchaB <= 9 &&
    captchaAnswer === captchaA + captchaB;

  if (!isValidCaptchaValues) {
    return null;
  }

  return { nombre, email, servicio, mensaje, captchaA, captchaB, captchaAnswer };
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { error: "Demasiados intentos. Esperá unos minutos antes de volver a enviar el formulario." },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const payload = getPayload(body);

    if (!payload) {
      return NextResponse.json(
        { error: "Datos inválidos. Revisar nombre, email, servicio, mensaje y captcha." },
        { status: 400 },
      );
    }

    if (!hasMailConfig) {
      console.error("Configuración SMTP incompleta. Variables faltantes:", missingMailConfig.join(", "));
      return NextResponse.json(
        { error: "La configuración de correo no está completa en el servidor. Faltan variables SMTP." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: SMTP_FROM,
      to: CONTACT_EMAIL_TO,
      replyTo: payload.email,
      subject: `Consulta Web:  ${payload.servicio}`,
      text: [
        "Consulta desde Polarizados del este.",
        "",
        `Nombre: ${payload.nombre}`,
        `Email: ${payload.email}`,
        `Servicio: ${payload.servicio}`,
        "",
        "Mensaje:",
        payload.mensaje,
      ].join("\n"),
      html: `
        <h2>Consulta desde Polarizadosdeleste.com</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(payload.nombre)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Servicio:</strong> ${escapeHtml(payload.servicio)}</p>
        <p><strong>Mensaje:</strong></p>
         <p style="margin-top:12px; line-height:1.8; font-size:16px; font-weight:700; color:#0f172a;">
          ${escapeHtml(payload.mensaje).replace(/\n/g, "<br />")}
        </p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error al enviar el formulario de contacto", error);
    return NextResponse.json(
      { error: "No se pudo enviar la consulta en este momento." },
      { status: 500 },
    );
  }
}
