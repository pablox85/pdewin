"use client";

import { FormEvent, useState } from "react";
import { trackGenerateLead } from "@/lib/analytics/gtag";

// Formulario cliente para disparar evento GA4 en envio exitoso.
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const service = String(formData.get("servicio") ?? "sin_servicio");

    trackGenerateLead(service);
    setSubmitted(true);
    form.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="lift-card rounded-2xl border border-slate-300 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-800 dark:text-slate-200">
          Nombre
          <input
            required
            type="text"
            name="nombre"
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
          className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-brand-500/40 focus:ring-4 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:ring-brand-100/30"
          defaultValue=""
        >
          <option value="" disabled>
            Seleccionar
          </option>
          <option value="vehiculos">Vehiculos</option>
          <option value="car-detailing">Car Detailing</option>
          <option value="home-deco">Home</option>
          <option value="home-deco">Office</option>  {/* modificado linea nueva */}
          <option value="home-deco">Bussines</option> {/* Este es un comentario en JSX */}
        </select>
      </label>

      <label className="mt-4 block text-sm font-medium text-slate-800 dark:text-slate-200">
        Mensaje
        <textarea
          required
          name="mensaje"
          rows={5}
          placeholder="Contanos que necesitas, para cuando lo necesitas y cual es tu objetivo."
          className="mt-2 w-full resize-none rounded-xl border border-slate-400 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-brand-500/40 focus:ring-4 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:ring-brand-100/30"
        />
      </label>

      <button
        type="submit"
        className="cta-pop mt-5 rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white outline-none ring-offset-2 transition hover:bg-brand-500 focus-visible:ring-2 focus-visible:ring-brand-900 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus-visible:ring-blue-200"
      >
        Quiero mi propuesta
      </button>

      {submitted ? (
        <p className="mt-3 text-sm font-medium text-emerald-800 dark:text-emerald-300">
          Consulta enviada con exito. Te responderemos a la brevedad.
        </p>
      ) : null}
    </form>
  );
}
