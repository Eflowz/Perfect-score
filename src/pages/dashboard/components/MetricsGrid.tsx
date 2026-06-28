import { useEffect, useState } from "react";
import {
  MdPeople,
  MdAssignmentTurnedIn,
  MdRadioButtonChecked,
  MdTrendingUp,
} from "react-icons/md";
import { getDashboardMetrics } from "../../../api/dashboard.api";

interface MetricItem {
  key: string;
  title: string;
  value: string | number;
  subtext: string;
  icon: React.ReactNode; 
  chartPoints?: number[];
  chartColor?: string;
  progressBar?: boolean;
  progressValue?: number;
  isLive?: boolean;
}

const MetricsGrid = () => {
  const [metrics, setMetrics] = useState<MetricItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setLoading(true);
        const data = await getDashboardMetrics();
        
        const metricsData = data?.data ? data.data : data;

        if (metricsData) {
          const formatted: MetricItem[] = [
            {
              key: "attendance",
              title: metricsData.attendance?.title || "Cohort Attendance",
              value: metricsData.attendance?.value || "0%",
              subtext: metricsData.attendance?.subtext || "Stable trend",
              // Instantiate the component directly here with standard sizing props
              icon: <MdPeople size={18} />, 
              chartPoints: metricsData.attendance?.chartPoints || [20, 40, 35, 70, 55, 90],
              chartColor: "bg-emerald-500 dark:bg-[#E2FB6C]",
            },
            {
              key: "grading",
              title: metricsData.grading?.title || "Task Grading Queue",
              value: metricsData.grading?.value || 0,
              subtext: metricsData.grading?.subtext || "Completed reviews",
              icon: <MdAssignmentTurnedIn size={18} />,
              progressBar: true,
              progressValue: metricsData.grading?.progressValue || 0,
            },
            {
              key: "live",
              title: metricsData.liveSessions?.title || "Active Class Rooms",
              value: metricsData.liveSessions?.value || 0,
              subtext: metricsData.liveSessions?.subtext || "No current broadcasts",
              icon: <MdRadioButtonChecked size={18} />,
              isLive: metricsData.liveSessions?.isLive ?? false,
            },
          ];
          setMetrics(formatted);
        }
      } catch (err) {
        console.error("Metrics layout context processing error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, []);

  if (loading) {
    return (
      <div className="w-full text-center py-12 text-xs font-mono text-gray-400 dark:text-[#6B8A85] animate-pulse">
        Polling high-density metrics streams...
      </div>
    );
  }

  if (metrics.length === 0) {
    return (
      <div className="w-full text-center py-12 text-xs font-mono text-gray-400 dark:text-[#6B8A85] border border-dashed border-gray-200 dark:border-white/5 rounded-2xl">
        No metric telemetry records parsed.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left font-sans">
      {metrics.map((metric) => (
        <div
          key={metric.key}
          className="
            p-6 bg-white dark:bg-[#16423C] 
            border border-gray-200/60 dark:border-white/5 
            rounded-2xl shadow-sm dark:shadow-xl
            flex flex-col justify-between
            transition-colors duration-200
          "
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-wider text-gray-400 dark:text-[#6B8A85] uppercase font-mono">
                {metric.title}
              </span>
              <h3 className="text-2xl font-bold font-mono tracking-tight text-gray-900 dark:text-white">
                {metric.value}
              </h3>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-black/20 text-[#16423C] dark:text-[#E2FB6C] border border-gray-100 dark:border-white/5 shrink-0">
              {metric.icon}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/5">
            
            {metric.chartPoints && (
              <div className="flex items-center justify-between w-full gap-4">
                <div className="flex items-end space-x-1 h-6">
                  {metric.chartPoints.map((point, pIdx) => (
                    <div
                      key={pIdx}
                      style={{ height: `${Math.min(Math.max(point, 15), 100)}%` }}
                      className={`w-1 rounded-t-sm transition-all duration-300 ${metric.chartColor}`}
                    />
                  ))}
                </div>

                <span className="text-[11px] font-medium text-gray-500 dark:text-[#6B8A85] flex items-center gap-1 shrink-0 font-mono">
                  <MdTrendingUp className="text-emerald-500 dark:text-[#E2FB6C]" size={14} />
                  {metric.subtext}
                </span>
              </div>
            )}

            {metric.progressBar && (
              <div className="w-full space-y-2">
                <div className="flex justify-between text-[11px] font-medium text-gray-500 dark:text-[#6B8A85] font-mono">
                  <span className="truncate pr-2">{metric.subtext}</span>
                  <span className="text-gray-900 dark:text-white font-bold">{metric.progressValue}%</span>
                </div>

                <div className="w-full h-1.5 bg-gray-100 dark:bg-black/30 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${metric.progressValue}%` }}
                    className="h-full bg-[#16423C] dark:bg-[#E2FB6C] rounded-full transition-all duration-500 ease-out"
                  />
                </div>
              </div>
            )}

            {metric.isLive && (
              <div className="flex justify-between items-center text-[11px] font-medium text-gray-500 dark:text-[#6B8A85] font-mono">
                <span>{metric.subtext}</span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-500/10 text-red-500 font-bold uppercase tracking-wider text-[9px] animate-pulse">
                  <span className="w-1 h-1 rounded-full bg-red-500"></span> Live
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;