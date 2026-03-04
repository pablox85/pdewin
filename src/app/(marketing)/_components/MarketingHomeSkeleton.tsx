// Skeleton para home de marketing.
export function MarketingHomeSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-16 border-b border-slate-200 bg-white px-5 dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between">
          <div className="h-5 w-44 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="hidden gap-3 md:flex">
            <div className="h-9 w-20 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-9 w-24 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-9 w-28 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-9 w-24 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] space-y-10 px-5 py-10 sm:px-8 lg:px-10">
        <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="h-4 w-44 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-12 w-full max-w-2xl rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-5 w-full max-w-xl rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-5 w-4/5 max-w-lg rounded bg-slate-200 dark:bg-slate-700" />
            <div className="flex gap-3 pt-2">
              <div className="h-11 w-40 rounded-xl bg-slate-200 dark:bg-slate-700" />
              <div className="h-11 w-44 rounded-xl bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
          <div className="h-56 rounded-2xl bg-slate-200 dark:bg-slate-700" />
        </section>

        <section>
          <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="mt-3 h-10 w-full max-w-3xl rounded bg-slate-200 dark:bg-slate-700" />
          <div className="mt-2 h-5 w-full max-w-2xl rounded bg-slate-200 dark:bg-slate-700" />
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="h-52 rounded-2xl bg-slate-200 dark:bg-slate-700" />
            <div className="h-52 rounded-2xl bg-slate-200 dark:bg-slate-700" />
            <div className="h-52 rounded-2xl bg-slate-200 dark:bg-slate-700" />
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <div className="h-44 rounded-2xl bg-slate-200 dark:bg-slate-700" />
          <div className="h-44 rounded-2xl bg-slate-200 dark:bg-slate-700" />
          <div className="h-44 rounded-2xl bg-slate-200 dark:bg-slate-700" />
        </section>
      </div>
    </div>
  );
}
