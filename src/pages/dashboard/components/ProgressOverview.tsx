import { useEffect, useState } from "react";
import { getAllUserProgress } from "../../../api/progress.api";
import {
  MdCheckCircle,
  MdAccessTime,
  MdSchool,
  MdTrendingUp,
} from "react-icons/md";

// Strict interface contract mapping exactly to your GET /api/v1/progress/user backend markdown specification
interface ProgressItem {
  id: string;
  userId: string;
  courseId: string;
  moduleId: string;
  completed: boolean;
  lastAccessed: string;
  timeSpent: number;
  course: {
    id: string;
    title: string;
  };
  module: {
    id: string;
    title: string;
  };
}

const ProgressOverview = () => {
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const response = await getAllUserProgress();
        // Handle wrapper envelope adjustments if your axios instances don't unpack data.data globally
        const progressData = response?.data ? response.data : response;
        setProgress(Array.isArray(progressData) ? progressData : []);
      } catch (err) {
        console.error("Progress error context:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, []);

  const completedCount = progress.filter((item) => item.completed).length;
  const totalTime = progress.reduce((acc, item) => acc + item.timeSpent, 0);
  const activeCoursesCount = new Set(progress.map((item) => item.courseId)).size;

  if (loading) {
    return (
      <div className="w-full bg-white dark:bg-[#16423C] border border-gray-200/60 dark:border-white/5 rounded-2xl p-6 text-xs text-gray-400 dark:text-[#6B8A85] font-medium animate-pulse text-left">
        Analyzing neural metrics and user tracks...
      </div>
    );
  }

  return (
    <section
      className="
        bg-white dark:bg-[#16423C]
        border border-gray-200/60 dark:border-white/5
        rounded-2xl
        shadow-sm dark:shadow-xl
        p-6
        space-y-6
        text-left
        transition-colors duration-200
      "
    >
      {/* Header Panel block */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight uppercase font-mono">
            Learning Progress
          </h2>
          <p className="text-[11px] text-gray-500 dark:text-[#6B8A85] font-medium">
            Track your analytics & task solution timeline journey
          </p>
        </div>

        <MdTrendingUp
          size={22}
          className="text-[#16423C] dark:text-[#E2FB6C]"
        />
      </div>

      {/* Numerical Telemetry Metrics Sub-Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Metric Card 1 */}
        <div className="rounded-xl bg-gray-50/50 dark:bg-black/20 p-4 border border-gray-100 dark:border-white/5">
          <MdCheckCircle className="text-emerald-600 dark:text-[#E2FB6C] mb-1.5" size={20} strokeWidth={1} />
          <p className="text-[10px] font-bold text-gray-400 dark:text-[#6B8A85] uppercase tracking-wider">
            Completed Modules
          </p>
          <h3 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mt-0.5">
            {completedCount}
          </h3>
        </div>

        {/* Metric Card 2 */}
        <div className="rounded-xl bg-gray-50/50 dark:bg-black/20 p-4 border border-gray-100 dark:border-white/5">
          <MdAccessTime className="text-[#16423C] dark:text-[#E2FB6C] mb-1.5" size={20} />
          <p className="text-[10px] font-bold text-gray-400 dark:text-[#6B8A85] uppercase tracking-wider">
            Time Invested
          </p>
          <h3 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mt-0.5">
            {totalTime} <span className="text-xs font-sans font-normal text-gray-400">mins</span>
          </h3>
        </div>

        {/* Metric Card 3 */}
        <div className="rounded-xl bg-gray-50/50 dark:bg-black/20 p-4 border border-gray-100 dark:border-white/5">
          <MdSchool className="text-purple-500 dark:text-purple-400 mb-1.5" size={20} />
          <p className="text-[10px] font-bold text-gray-400 dark:text-[#6B8A85] uppercase tracking-wider">
            Active Cohorts
          </p>
          <h3 className="text-xl font-bold font-mono tracking-tight text-gray-900 dark:text-white mt-0.5">
            {activeCoursesCount}
          </h3>
        </div>

      </div>

      {/* Activity Timeline List viewports */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-gray-900 dark:text-white tracking-tight uppercase font-mono">
          Recent Learning Activity
        </h3>

        {progress.length === 0 ? (
          <div className="text-center py-8 text-xs text-gray-400 border border-dashed border-gray-200 dark:border-white/5 rounded-xl font-mono">
            No learning activity telemetry logged yet.
          </div>
        ) : (
          <div className="space-y-2">
            {progress.map((item) => (
              <div
                key={item.id}
                className="
                  flex items-center justify-between
                  p-3.5
                  rounded-xl
                  bg-gray-50/30 dark:bg-black/10
                  border border-gray-100 dark:border-white/5
                  hover:border-gray-200/80 dark:hover:border-white/10
                  transition-all duration-150
                "
              >
                <div className="space-y-0.5 min-w-0 pr-4">
                  <p className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                    {item.course?.title || "Unknown Track"}
                  </p>
                  <p className="text-[11px] font-medium text-gray-400 dark:text-[#6B8A85] truncate font-mono">
                    {item.module?.title || "Parsing module dynamic variables..."}
                  </p>
                </div>

                <span
                  className={`
                    text-[10px] font-mono
                    px-2.5 py-1
                    rounded-md
                    font-bold
                    uppercase tracking-wider shrink-0 scale-95 origin-right
                    ${
                      item.completed
                        ? "bg-emerald-500/10 text-emerald-600 dark:bg-[#E2FB6C]/10 dark:text-[#E2FB6C]"
                        : "bg-amber-500/10 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                    }
                  `}
                >
                  {item.completed ? "Completed" : "In Progress"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgressOverview;