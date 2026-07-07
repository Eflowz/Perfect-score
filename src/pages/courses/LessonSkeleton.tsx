const LessonSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#faf9f7] dark:bg-[#0a0f0e] flex flex-col animate-pulse">
      {/* Progress Header Skeleton */}
      <header className="h-12 border-b border-gray-200/50 dark:border-white/5 bg-white/40 dark:bg-white/2 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="h-3 w-28 rounded-full bg-gray-200 dark:bg-white/6" />
          <div className="w-24 h-1 bg-gray-200/60 dark:bg-white/6 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-gray-300 dark:bg-white/8 rounded-full" />
          </div>
        </div>
        <div className="h-3 w-16 rounded-full bg-gray-200 dark:bg-white/6" />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-8 lg:px-10 lg:py-12 space-y-10">
          {/* Module Header Skeleton */}
          <div className="space-y-3">
            <div className="h-8 w-3/4 rounded-lg bg-gray-200 dark:bg-white/6" />
            <div className="h-4 w-full rounded-lg bg-gray-100 dark:bg-white/4" />
            <div className="h-4 w-2/3 rounded-lg bg-gray-100 dark:bg-white/4" />
          </div>

          {/* Content Blocks Skeleton */}
          <div className="space-y-6">
            {/* Paragraph lines */}
            <div className="space-y-3">
              <div className="h-4 w-full rounded-lg bg-gray-100 dark:bg-white/4" />
              <div className="h-4 w-full rounded-lg bg-gray-100 dark:bg-white/4" />
              <div className="h-4 w-5/6 rounded-lg bg-gray-100 dark:bg-white/4" />
              <div className="h-4 w-4/6 rounded-lg bg-gray-100 dark:bg-white/4" />
            </div>

            {/* Code block skeleton */}
            <div className="rounded-lg overflow-hidden border border-gray-200/60 dark:border-white/8 bg-[#f6f5f4] dark:bg-[#111a18]">
              <div className="flex items-center px-4 py-2 bg-white/50 dark:bg-white/3 border-b border-gray-200/40 dark:border-white/5">
                <div className="h-3 w-16 rounded bg-gray-200 dark:bg-white/6" />
              </div>
              <div className="p-5 space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-white/6" />
                <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-white/6" />
                <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-white/6" />
                <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-white/6" />
              </div>
            </div>

            {/* More paragraph lines */}
            <div className="space-y-3">
              <div className="h-4 w-full rounded-lg bg-gray-100 dark:bg-white/4" />
              <div className="h-4 w-3/4 rounded-lg bg-gray-100 dark:bg-white/4" />
              <div className="h-4 w-full rounded-lg bg-gray-100 dark:bg-white/4" />
              <div className="h-4 w-5/6 rounded-lg bg-gray-100 dark:bg-white/4" />
            </div>

            {/* Another code block */}
            <div className="rounded-lg overflow-hidden border border-gray-200/60 dark:border-white/8 bg-[#f6f5f4] dark:bg-[#111a18]">
              <div className="flex items-center px-4 py-2 bg-white/50 dark:bg-white/3 border-b border-gray-200/40 dark:border-white/5">
                <div className="h-3 w-12 rounded bg-gray-200 dark:bg-white/6" />
              </div>
              <div className="p-5 space-y-2">
                <div className="h-4 w-4/5 rounded bg-gray-200 dark:bg-white/6" />
                <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-white/6" />
              </div>
            </div>

            {/* Paragraph lines */}
            <div className="space-y-3">
              <div className="h-4 w-full rounded-lg bg-gray-100 dark:bg-white/4" />
              <div className="h-4 w-2/3 rounded-lg bg-gray-100 dark:bg-white/4" />
            </div>
          </div>

          {/* Actions Section Skeleton */}
          <div className="space-y-5 pt-4 border-t border-gray-200/60 dark:border-white/6">
            {/* Quiz Card Skeleton */}
            <div className="flex items-start gap-4 p-5 rounded-xl bg-[#f0f7f4] dark:bg-[#0d1a17] border border-[#16423C]/10 dark:border-[#C5E89D]/10">
              <div className="p-2 rounded-lg bg-gray-200 dark:bg-white/8">
                <div className="w-5 h-5 rounded bg-gray-300 dark:bg-white/10" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 rounded-lg bg-gray-200 dark:bg-white/8" />
                <div className="h-3 w-64 rounded-lg bg-gray-200 dark:bg-white/6" />
              </div>
              <div className="h-8 w-24 rounded-lg bg-gray-200 dark:bg-white/8 shrink-0" />
            </div>

            {/* Completion Section Skeleton */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-36 rounded-lg bg-gray-200 dark:bg-white/6" />
                <div className="h-3 w-56 rounded-lg bg-gray-100 dark:bg-white/4" />
              </div>
              <div className="h-10 w-40 rounded-lg bg-gray-200 dark:bg-white/8" />
            </div>
          </div>

          {/* Navigation Skeleton */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200/60 dark:border-white/6">
            <div className="h-10 w-28 rounded-lg bg-gray-200 dark:bg-white/6" />
            <div className="h-10 w-28 rounded-lg bg-gray-200 dark:bg-white/8" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonSkeleton;