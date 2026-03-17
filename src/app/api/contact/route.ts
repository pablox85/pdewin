import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";

interface ContactPayload {
  nombre: string;
  email: string;
  servicio: string;
  mensaje: string;
}

const SMTP_HOST = process.env.SMTP_HOST?.trim() ?? "";
const SMTP_PORT = Number(process.env.SMTP_PORT?.trim() ?? "465");
const SMTP_USER = process.env.SMTP_USER?.trim() ?? "";
const SMTP_PASS = process.env.SMTP_PASS?.trim() ?? "";
const SMTP_FROM = process.env.SMTP_FROM?.trim() || SMTP_USER || siteConfig.contactEmail;
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO?.trim() || siteConfig.contactEmail;
const hasMailConfig = Boolean(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && SMTP_FROM && CONTACT_EMAIL_TO);

export const runtime = "nodejs";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sanitizeText(value: unknown) {
  return String(value ?? "").trim();
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

  if (!nombre || !email || !servicio || !mensaje) {
    return null;
  }

  if (!isValidEmail(email)) {
    return null;
  }

  return { nombre, email, servicio, mensaje };
}

export async function POST(request: Request) {
  if (!hasMailConfig) {
    return NextResponse.json(
      { error: "La configuracion de correo no esta completa en el servidor." },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const payload = getPayload(body);

    if (!payload) {
      return NextResponse.json(
        { error: "Datos invalidos. Revisar nombre, email, servicio y mensaje." },
        { status: 400 },
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
      subject: `Nueva consulta web: ${payload.servicio}`,
      text: [
        "Nueva consulta recibida desde la landing.",
        "",
        `Nombre: ${payload.nombre}`,
        `Email: ${payload.email}`,
        `Servicio: ${payload.servicio}`,
        "",
        "Mensaje:",
        payload.mensaje,
      ].join("\n"),
      html: `
        <h2>Nueva consulta recibida desde la landing</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(payload.nombre)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Servicio:</strong> ${escapeHtml(payload.servicio)}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(payload.mensaje).replace(/\n/g, "<br />")}</p>
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
