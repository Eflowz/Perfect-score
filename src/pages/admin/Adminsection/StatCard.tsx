type StatCardProps = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color?: string;
};

export default function StatCard({
  title,
  value,
  icon,
  color = "#16423C",
}: StatCardProps) {
  return (
    <div
      className="
 bg-white dark:bg-white/5
 border border-gray-200/70 dark:border-white/10
 rounded-2xl p-4
 flex items-center justify-between
 hover:shadow-md transition
 "
    >
      {/* LEFT */}
      <div>
        <p className="text-xs text-gray-400 dark:text-gray-500">{title}</p>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
          {value}
        </h2>
      </div>

      {/* ICON */}
      <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}15` }}>
        <div style={{ color }}>{icon}</div>
      </div>
    </div>
  );
}
