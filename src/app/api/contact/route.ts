import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";

interface ContactPayload {
  nombre: string;
  email: string;
  servicio: string;
  mensaje: string;
}

interface ContactSummary {
  servicioConsultado: string;
  resumenNecesidad: string;
  urgenciaDetectada: "alta" | "media" | "baja";
  accionSugerida: string;
}

const SMTP_HOST = process.env.SMTP_HOST?.trim() ?? "";
const SMTP_PORT = Number(process.env.SMTP_PORT?.trim() ?? "465");
const SMTP_USER = process.env.SMTP_USER?.trim() ?? "";
const SMTP_PASS = process.env.SMTP_PASS?.trim() ?? "";
const SMTP_FROM = process.env.SMTP_FROM?.trim() || SMTP_USER || siteConfig.contactEmail;
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO?.trim() || siteConfig.contactEmail;
const hasMailConfig = Boolean(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && SMTP_FROM && CONTACT_EMAIL_TO);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY?.trim() ?? "";
const OPENAI_MODEL = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
const hasOpenAiConfig = Boolean(OPENAI_API_KEY);

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

function buildFallbackSummary(payload: ContactPayload): ContactSummary {
  const normalizedMessage = payload.mensaje.toLowerCase();
  const highUrgencySignals = ["urgente", "hoy", "ya", "cuanto antes", "inmediato", "esta semana"];
  const mediumUrgencySignals = ["pronto", "presupuesto", "cotizacion", "coordinar", "esta quincena"];

  const urgenciaDetectada = highUrgencySignals.some((signal) => normalizedMessage.includes(signal))
    ? "alta"
    : mediumUrgencySignals.some((signal) => normalizedMessage.includes(signal))
      ? "media"
      : "baja";

  const resumenNecesidad = `El cliente consulta por ${payload.servicio.toLowerCase()} y describe la necesidad en el formulario para avanzar con asesoramiento o cotizacion. Conviene revisar el mensaje original para confirmar alcance, disponibilidad y tipo de trabajo solicitado.`;

  return {
    servicioConsultado: payload.servicio,
    resumenNecesidad,
    urgenciaDetectada,
    accionSugerida: "Responder por mail o WhatsApp, confirmar alcance del trabajo y preparar una propuesta inicial.",
  };
}

async function generateInternalSummary(payload: ContactPayload): Promise<ContactSummary> {
  if (!hasOpenAiConfig) {
    return buildFallbackSummary(payload);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text:
                  "Asistente contacto Polarizados del Este: polarizados, car detailing, soluciones hogar/comercial. Ciudad de la Costa, Uruguay.",
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `Cliente envio formulario:\n- Nombre: ${payload.nombre}\n- Email: ${payload.email}\n- Servicio: ${payload.servicio}\n- Mensaje: ${payload.mensaje}\n\nGenerar resumen espanol para equipo interno:\n\n1. Datos cliente (nombre, email)\n2. Servicio consultado\n3. Resumen necesidad (2-3 oraciones)\n4. Urgencia detectada (alta/media/baja) segun tono mensaje\n5. Accion sugerida proximo paso\n\nDirecto, sin saludos ni introducciones.`,
              },
            ],
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "contact_internal_summary",
            strict: true,
            schema: {
              type: "object",
              properties: {
                servicioConsultado: { type: "string" },
                resumenNecesidad: { type: "string" },
                urgenciaDetectada: {
                  type: "string",
                  enum: ["alta", "media", "baja"],
                },
                accionSugerida: { type: "string" },
              },
              required: [
                "servicioConsultado",
                "resumenNecesidad",
                "urgenciaDetectada",
                "accionSugerida",
              ],
              additionalProperties: false,
            },
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API respondio con estado ${response.status}`);
    }

    const data = (await response.json()) as { output_text?: string };
    const parsed = JSON.parse(data.output_text ?? "") as ContactSummary;

    if (
      !parsed ||
      !parsed.servicioConsultado ||
      !parsed.resumenNecesidad ||
      !parsed.urgenciaDetectada ||
      !parsed.accionSugerida
    ) {
      throw new Error("OpenAI devolvio una respuesta incompleta");
    }

    return parsed;
  } catch (error) {
    console.error("No se pudo generar el resumen interno con OpenAI", error);
    return buildFallbackSummary(payload);
  }
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

    const summary = await generateInternalSummary(payload);

    await transporter.sendMail({
      from: SMTP_FROM,
      to: CONTACT_EMAIL_TO,
      replyTo: payload.email,
      subject: `Nueva consulta web: ${payload.servicio}`,
      text: [
        "Nueva consulta recibida desde la landing.",
        "",
        "Resumen interno:",
        `Servicio consultado: ${summary.servicioConsultado}`,
        `Resumen necesidad: ${summary.resumenNecesidad}`,
        `Urgencia detectada: ${summary.urgenciaDetectada}`,
        `Accion sugerida: ${summary.accionSugerida}`,
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
        <h3>Resumen interno</h3>
        <p><strong>Servicio consultado:</strong> ${escapeHtml(summary.servicioConsultado)}</p>
        <p><strong>Resumen necesidad:</strong> ${escapeHtml(summary.resumenNecesidad)}</p>
        <p><strong>Urgencia detectada:</strong> ${escapeHtml(summary.urgenciaDetectada)}</p>
        <p><strong>Accion sugerida:</strong> ${escapeHtml(summary.accionSugerida)}</p>
        <hr />
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
