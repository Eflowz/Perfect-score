export default function ModuleCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200/70 bg-white p-5 dark:border-white/10 dark:bg-white/5">
      <div className="mb-3 h-6 w-24 rounded-full bg-gray-200 dark:bg-white/10" />
      <div className="mb-2 h-5 w-2/3 rounded bg-gray-200 dark:bg-white/10" />
      <div className="h-4 w-full rounded bg-gray-200 dark:bg-white/10" />
      <div className="mt-2 h-4 w-5/6 rounded bg-gray-200 dark:bg-white/10" />
    </div>
  );
}
