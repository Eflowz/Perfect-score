import type { Module } from "../../types/courses.types";

type ModuleCardProps = {
  module: Module;
  index: number;
  courseId: string;
  quizAvailable: boolean;
};

export default function ModuleCard({
  module,
  index,
  courseId,
  quizAvailable,
}: ModuleCardProps) {
  return (
    <article className="rounded-2xl border border-gray-200/70 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="rounded-full bg-[#16423C]/10 px-2.5 py-1 text-xs font-semibold text-[#16423C] dark:bg-[#dcf36c]/10 dark:text-[#dcf36c]">
              Module {index + 1}
            </span>
            <span className="text-xs">Course {courseId}</span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {module.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {module.content || "No content added yet for this module."}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 dark:border-white/10 dark:text-gray-300">
            {quizAvailable ? "Quiz ready" : "No quiz"}
          </span>
          <span className="text-xs text-gray-400">
            Order {module.order}
          </span>
        </div>
      </div>
    </article>
  );
}
