import { MdTrendingUp, MdWorkspacePremium, MdLayers } from "react-icons/md";

const Leaderboard = () => {
  const students = [
    { rank: 1, name: "Priya K.", xp: "4,820", delta: "+320", isUser: false },
    { rank: 2, name: "Jonas M.", xp: "4,610", delta: "+280", isUser: false },
    { rank: 3, name: "Alex (You)", xp: "4,230", delta: "+190", isUser: true },
    { rank: 4, name: "Sofia R.", xp: "3,980", delta: "+160", isUser: false },
    { rank: 5, name: "Tariq N.", xp: "3,750", delta: "+140", isUser: false },
  ];

  return (
    <div className="bg-white dark:bg-[#16423C] border border-gray-200/60 dark:border-white/5 rounded-2xl shadow-sm dark:shadow-xl p-6 transition-all duration-200 flex flex-col justify-between h-full space-y-5">
      {/* Header Info Block */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/5">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-1.5">
            <MdWorkspacePremium
              className="text-amber-500 dark:text-[#E2FB6C]"
              size={16}
            />
            Top Learners This Week
          </h3>
          <p className="text-[11px] text-gray-400 dark:text-[#6B8A85] font-medium">
            Weekly leaderboard cycle
          </p>
        </div>

        <button className="text-[11px] font-bold text-[#16423C] dark:text-[#E2FB6C] hover:underline cursor-pointer flex items-center gap-0.5">
          Full Board →
        </button>
      </div>

      {/* High-Density Row Grid Stack */}
      <div className="space-y-1.5 flex-1">
        {students.map((student) => (
          <div
            key={student.rank}
            className={`flex items-center justify-between p-2.5 rounded-xl transition-all border ${
              student.isUser
                ? "bg-gray-100/70 dark:bg-black/20 border-[#16423C]/20 dark:border-[#E2FB6C]/30 shadow-sm"
                : "bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-white/5"
            }`}
          >
            {/* Left Hand: Position Medal / Rank & Student Name */}
            <div className="flex items-center space-x-3">
              <span
                className={`w-5 h-5 flex items-center justify-center font-mono text-[11px] font-bold rounded-md ${
                  student.rank === 1
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : student.rank === 2
                      ? "bg-slate-400/10 text-slate-500"
                      : student.rank === 3 && !student.isUser
                        ? "bg-amber-700/10 text-amber-800"
                        : "text-gray-400 dark:text-[#6B8A85]"
                }`}
              >
                {student.rank}
              </span>

              {/* Dynamic Identity Initial Icon Badge */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold select-none ${
                  student.isUser
                    ? "bg-[#16423C] dark:bg-[#E2FB6C] text-white dark:text-[#16423C]"
                    : "bg-gray-200 dark:bg-white/5 text-gray-600 dark:text-gray-300"
                }`}
              >
                {student.name.substring(0, 2).toUpperCase()}
              </div>

              <span
                className={`text-xs font-semibold ${
                  student.isUser
                    ? "text-gray-900 dark:text-[#E2FB6C]"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                {student.name}
              </span>
            </div>

            {/* Right Hand: Metric Readings & Delta Variations */}
            <div className="flex items-center space-x-4 font-mono text-[11px]">
              <span className="text-gray-500 dark:text-gray-300 font-bold">
                {student.xp}{" "}
                <span className="text-[9px] font-sans font-normal text-gray-400">
                  XP
                </span>
              </span>
              <span className="text-emerald-600 dark:text-[#E2FB6C] font-semibold flex items-center gap-0.5 min-w-11 justify-end">
                <MdTrendingUp size={12} />
                {student.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Foot Global Summary Module Card */}
      <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[11px] font-medium text-gray-400 dark:text-[#6B8A85]">
        <div className="flex items-center gap-1.5">
          <MdLayers size={14} className="text-[#16423C] dark:text-[#E2FB6C]" />
          <span>
            You're{" "}
            <span className="text-emerald-600 dark:text-[#E2FB6C] font-bold font-mono">
              top 3%
            </span>{" "}
            globally
          </span>
        </div>
        <span className="font-mono text-[10px] text-gray-400/80 dark:text-gray-400">
          +190 XP vs last week 🚀
        </span>
      </div>
    </div>
  );
};

export default Leaderboard;
