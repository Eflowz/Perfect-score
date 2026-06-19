import Skeleton from "../common/Skeleton";

export default function CourseCardSkeleton() {
  return (
    <div
      className="rounded-2xl border border-gray-200/60 dark:border-white/10 
 bg-white/70 dark:bg-white/5 p-5 space-y-5 animate-pulse"
    >
      {/* Top badge row */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-24 rounded-full" />

        <Skeleton className="h-4 w-10" />
      </div>

      {/* Title */}
      <Skeleton className="h-5 w-3/4 rounded-md" />

      {/* Description lines */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Divider feel */}
      <div className="h-px bg-gray-200/60 dark:bg-white/10" />

      {/* Bottom row */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-16" />

        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
}
