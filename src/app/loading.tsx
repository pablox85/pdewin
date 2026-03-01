// Skeleton global de ruta para evitar pantalla vacia durante carga.
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-16 border-b border-slate-200 bg-white px-5">
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between">
          <div className="h-4 w-40 rounded bg-slate-200" />
          <div className="hidden gap-3 md:flex">
            <div className="h-9 w-24 rounded bg-slate-200" />
            <div className="h-9 w-24 rounded bg-slate-200" />
            <div className="h-9 w-24 rounded bg-slate-200" />
            <div className="h-9 w-24 rounded bg-slate-200" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] space-y-10 px-5 py-10">
        <div className="space-y-4">
          <div className="h-6 w-40 rounded bg-slate-200" />
          <div className="h-10 w-full max-w-3xl rounded bg-slate-200" />
          <div className="h-5 w-full max-w-2xl rounded bg-slate-200" />
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <div className="h-48 rounded-2xl bg-slate-200" />
          <div className="h-48 rounded-2xl bg-slate-200" />
          <div className="h-48 rounded-2xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
