import Skeleton from "../common/Skeleton";

export default function ModuleCardSkeleton() {
  return (
    <div
      className="
 relative overflow-hidden
 border border-gray-200/60 dark:border-white/10
 rounded-2xl p-5
 bg-white/60 dark:bg-white/5
 space-y-4
 "
    >
      {/* top row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-9 h-9 rounded-xl" />

          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>

        <Skeleton className="w-8 h-8 rounded-full" />
      </div>

      {/* content preview */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>

      {/* footer */}
      <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-white/10">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}
