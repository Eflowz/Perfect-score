import {
  MdCheckCircle,
  MdPlayCircleFilled,
  MdLock,
  MdAutoAwesome,
  MdArrowForward,
} from "react-icons/md";

const PerformanceTracker = () => {
  // Active course track summary data modeling
  const activeTrack = {
    title: "AI Learning Roadmap",
    trackName: "Python Pro Track",
    stats: "2 of 5 modules complete",
    recommendation:
      "Based on your cohort's current pace, they will master Algorithms 4 days ahead of schedule. Consider opening up the next exam early.",
  };

  const modules = [
    {
      id: 1,
      name: "Python Basics",
      lessons: "12 lessons",
      status: "completed",
      percentage: 100,
    },
    {
      id: 2,
      name: "Data Structures",
      lessons: "14 lessons",
      status: "active",
      percentage: 68,
    },
    {
      id: 3,
      name: "Algorithms",
      lessons: "16 lessons",
      status: "locked",
      percentage: 0,
    },
    {
      id: 4,
      name: "Web Dev + Django",
      lessons: "20 lessons",
      status: "locked",
      percentage: 0,
    },
  ];

  return (
    <div className="bg-white dark:bg-[#16423C] border border-gray-200/60 dark:border-white/5 rounded-2xl shadow-sm dark:shadow-xl p-6 transition-all duration-200 space-y-6">
      {/* 1. Header Layer Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-white/5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-[#E2FB6C]">
              <MdAutoAwesome size={16} />
            </span>
            <h3 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
              {activeTrack.title}
            </h3>
          </div>
          <p className="text-xs text-gray-400 dark:text-[#6B8A85] font-medium">
            Active Module Overview •{" "}
            <span className="text-gray-600 dark:text-gray-300 font-mono">
              {activeTrack.stats}
            </span>
          </p>
        </div>

        {/* Track tag label */}
        <div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#16423C]/5 dark:bg-white/5 text-[#16423C] dark:text-[#E2FB6C] border border-[#16423C]/10 dark:border-white/10">
            {activeTrack.trackName}
          </span>
        </div>
      </div>

      {/* 2. Visual Roadmap Nodes Pipeline Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className={`p-4 rounded-xl border transition-all duration-200 relative group flex flex-col justify-between h-32 ${
              mod.status === "active"
                ? "bg-gray-50 dark:bg-white/5 border-[#16423C]/20 dark:border-[#E2FB6C]/30 shadow-sm"
                : mod.status === "completed"
                  ? "bg-white dark:bg-[#16423C] border-gray-100 dark:border-white/5 opacity-80"
                  : "bg-white dark:bg-[#16423C] border-gray-100 dark:border-white/5 opacity-40"
            }`}
          >
            {/* Top Node Indicator row */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-gray-400 dark:text-[#6B8A85]">
                {mod.lessons}
              </span>

              {/* Contextual Node Status Icons */}
              {mod.status === "completed" && (
                <MdCheckCircle
                  className="text-emerald-600 dark:text-[#E2FB6C]"
                  size={20}
                />
              )}
              {mod.status === "active" && (
                <div className="relative flex items-center justify-center">
                  <MdPlayCircleFilled
                    className="text-[#16423C] dark:text-[#E2FB6C] animate-pulse z-10"
                    size={20}
                  />
                  <span className="absolute w-5 h-5 bg-[#16423C]/20 dark:bg-[#E2FB6C]/20 rounded-full animate-ping" />
                </div>
              )}
              {mod.status === "locked" && (
                <MdLock
                  className="text-gray-400 dark:text-gray-500"
                  size={16}
                />
              )}
            </div>

            {/* Bottom Title & Analytics Label */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-[#16423C] dark:group-hover:text-[#E2FB6C] transition-colors">
                {mod.name}
              </h4>

              {/* Dynamic progress bar metrics block per module node */}
              {mod.percentage > 0 && (
                <div className="space-y-1">
                  <div className="w-full h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${mod.percentage}%` }}
                      className="h-full bg-[#16423C] dark:bg-[#E2FB6C] rounded-full"
                    />
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 dark:text-[#6B8A85] block text-right">
                    {mod.percentage}% complete
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Action Insight Callout Card Banner */}
      <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200/50 dark:border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3 max-w-2xl">
          <span className="text-amber-600 dark:text-[#E2FB6C] mt-0.5 font-mono text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 dark:bg-[#E2FB6C]/10 shrink-0">
            Insight
          </span>
          <p className="text-xs text-gray-500 dark:text-gray-300 leading-relaxed font-medium">
            {activeTrack.recommendation}
          </p>
        </div>
        <button className="flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold px-3 py-2 bg-[#16423C] dark:bg-[#E2FB6C] text-white dark:text-[#16423C] rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-sm">
          <span>Adjust Roadmap</span>
          <MdArrowForward size={14} />
        </button>
      </div>
    </div>
  );
};

export default PerformanceTracker;
