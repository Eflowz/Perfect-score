import { MdExtension, MdCheckCircleOutline } from "react-icons/md";

const DaysChallenge = () => {
  return (
    <div className="w-full p-4 bg-white dark:bg-[#16423C] border border-gray-200/60 dark:border-white/5 rounded-2xl shadow-sm dark:shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-200">
      {/* Left Column: Challenge Prompt details */}
      <div className="flex items-center space-x-3.5 w-full md:w-auto">
        <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-[#16423C] dark:text-[#E2FB6C] border border-gray-100 dark:border-white/5 shrink-0">
          <MdExtension size={18} />
        </div>
        <div className="space-y-0.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-gray-400 dark:text-[#6B8A85] font-bold">
            Today's Challenge
          </p>
          <p className="text-xs font-medium text-gray-700 dark:text-gray-200 leading-relaxed">
            Implement a{" "}
            <code className="px-1.5 py-0.5 font-mono text-[11px] font-bold rounded bg-gray-100 dark:bg-black/30 text-purple-600 dark:text-purple-300">
              BinarySearchTree.inorder()
            </code>{" "}
            with $O(n)$ traversal. You're{" "}
            <span className="text-emerald-600 dark:text-[#E2FB6C] font-bold underline decoration-2">
              2 lessons
            </span>{" "}
            away from unlocking Algorithms.
          </p>
        </div>
      </div>

      {/* Right Column: High-Density Analytics Tracker Indicators */}
      <div className="flex items-center space-x-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-gray-100 dark:border-white/5 pt-3 md:pt-0">
        {/* Metric 1: Circular Progress Tracker Mockups */}
        <div className="flex items-center space-x-2.5">
          <div className="relative w-9 h-9 flex items-center justify-center">
            {/* SVG Background Track Arc ring */}
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="15"
                className="stroke-gray-100 dark:stroke-white/10"
                strokeWidth="3"
                fill="transparent"
              />
              <circle
                cx="18"
                cy="18"
                r="15"
                className="stroke-[#16423C] dark:stroke-[#E2FB6C]"
                strokeWidth="3"
                fill="transparent"
                strokeDasharray="94"
                strokeDashoffset="30"
              />
            </svg>
            <span className="text-[10px] font-mono font-bold text-gray-700 dark:text-white">
              68%
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-[10px] font-bold text-gray-800 dark:text-gray-200 leading-tight">
              Track Progress
            </p>
            <span className="text-[9px] font-mono text-gray-400 dark:text-[#6B8A85]">
              Python Pro Module
            </span>
          </div>
        </div>

        {/* Vertical Split line divider */}
        <div className="h-8 w-px bg-gray-200 dark:bg-white/5 hidden sm:block"></div>

        {/* Metric 2: Project Delivery Stats counter box */}
        <div className="flex items-center space-x-3 bg-gray-50 dark:bg-black/10 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-white/5">
          <MdCheckCircleOutline
            className="text-emerald-600 dark:text-[#E2FB6C]"
            size={16}
          />
          <div className="text-right">
            <p className="text-xs font-mono font-bold text-gray-900 dark:text-white">
              5{" "}
              <span className="text-gray-400 font-normal text-[10px]">/ 8</span>
            </p>
            <p className="text-[9px] font-sans font-medium text-gray-400 dark:text-[#6B8A85] tracking-tight whitespace-nowrap">
              Projects Done
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysChallenge;
