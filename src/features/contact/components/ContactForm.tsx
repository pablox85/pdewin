"use client";

import { FormEvent, useState } from "react";
import { trackGenerateLead } from "@/lib/analytics/gtag";

// Formulario cliente para disparar evento GA4 en envio exitoso.
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const service = String(formData.get("servicio") ?? "sin_servicio");
    const payload = {
      nombre: String(formData.get("nombre") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      servicio: service,
      mensaje: String(formData.get("mensaje") ?? "").trim(),
    };

    setSubmitted(false);
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error ?? "No se pudo enviar la consulta.");
      }

      trackGenerateLead(service);
      setSubmitted(true);
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo enviar la consulta.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={isSubmitting}
      className="lift-card rounded-2xl border border-slate-300 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-800 dark:text-slate-200">
          Nombre
          <input
            required
            type="text"
            name="nombre"
            disabled={isSubmitting}
            placeholder="Tu nombre"
            className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-brand-500/40 focus:ring-4 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:ring-brand-100/30"
          />
        </label>
        <label className="text-sm font-medium text-slate-800 dark:text-slate-200">
          Email
          <input
            required
            type="email"
            name="email"
            disabled={isSubmitting}
            placeholder="tu@email.com"
            className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-brand-500/40 focus:ring-4 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:ring-brand-100/30"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium text-slate-800 dark:text-slate-200">
        Servicio de interes
        <select
          required
          name="servicio"
          disabled={isSubmitting}
          className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-brand-500/40 focus:ring-4 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:ring-brand-100/30"
          defaultValue=""
        >
          <option value="" disabled>
            Seleccionar
          </option>
          <option value="vehiculos">Vehiculos</option>
          <option value="cardetailing">Car Detailing</option>
          <option value="home">Home</option>
          <option value="office">Office</option>
          <option value="business">Business</option>
        </select>
      </label>

      <label className="mt-4 block text-sm font-medium text-slate-800 dark:text-slate-200">
        Mensaje
        <textarea
          required
          name="mensaje"
          disabled={isSubmitting}
          rows={5}
          placeholder="Contanos que necesitas, para cuando lo necesitas y cual es tu objetivo."
          className="mt-2 w-full resize-none rounded-xl border border-slate-400 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-brand-500/40 focus:ring-4 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:ring-brand-100/30"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="cta-pop mt-5 rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white outline-none ring-offset-2 transition hover:bg-brand-500 focus-visible:ring-2 focus-visible:ring-brand-900 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus-visible:ring-blue-200"
      >
        {isSubmitting ? "Enviando..." : "Quiero mi propuesta"}
      </button>

      {submitted ? (
        <p className="mt-3 text-sm font-medium text-emerald-800 dark:text-emerald-300">
          Consulta enviada con exito. Te responderemos a la brevedad.
        </p>
      ) : null}

      {errorMessage ? (
        <p className="mt-3 text-sm font-medium text-rose-700 dark:text-rose-300">{errorMessage}</p>
      ) : null}
    </form>
  );
}
