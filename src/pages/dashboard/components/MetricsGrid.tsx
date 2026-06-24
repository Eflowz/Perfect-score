/*

import {
  MdPeople,
  MdAssignmentTurnedIn,
  MdRadioButtonChecked,
  MdTrendingUp,
} from "react-icons/md";

const MetricsGrid = () => {


  const metrics = [
    {
      title: "Active Attendance",
      value: "96.4%",
      subtext: "+1.2% vs last week",
      icon: MdPeople,
      accent: "text-emerald-600 dark:text-[#E2FB6C]",
      chartColor: "bg-emerald-600 dark:bg-[#E2FB6C]",
      // Simple preview path points for a high-density mini line chart
      chartPoints: [40, 45, 38, 52, 60, 58, 70],
    },
    {
      title: "Pending Grading",
      value: "18",
      subtext: "82% of batch evaluated",
      icon: MdAssignmentTurnedIn,
      accent: "text-[#16423C] dark:text-white/90",
      progressBar: true,
      progressValue: 82,
    },
    {
      title: "Active Live Rooms",
      value: "3 Sessions",
      subtext: "Live broadcast running",
      icon: MdRadioButtonChecked,
      accent: "text-rose-600 dark:text-rose-400",
      isLive: true,
    },
  ];


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;

        return (
          <div
            key={idx}
            className="p-6 bg-white dark:bg-[#16423C] border border-gray-200/60 dark:border-white/5 rounded-2xl shadow-sm dark:shadow-xl flex flex-col justify-between transition-all duration-200"
          >
            // Top Row: Metric Labels & Icon Wrapper 
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs font-medium text-gray-400 dark:text-[#6B8A85] tracking-tight">
                  {metric.title}
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {metric.value}
                </h3>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-300 border border-gray-100 dark:border-white/5">
                <Icon size={20} />
              </div>
            </div>

            // Bottom Row: Dynamic Visual Element Layer based on data type

            <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">

              {metric.chartPoints && (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-end space-x-0.5 h-6">
                    {metric.chartPoints.map((point, pIdx) => (
                      <div
                        key={pIdx}
                        style={{ height: `${point}%` }}
                        className={`w-1 rounded-t-sm transition-all duration-300 ${metric.chartColor} opacity-70 hover:opacity-100`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-[#E2FB6C] flex items-center gap-0.5 font-mono">
                    <MdTrendingUp size={14} />
                    {metric.subtext}
                  </span>
                </div>
              )}

              // Context B: Linear clean loading track indicator (Grading Card)
              {metric.progressBar && (
                <div className="w-full space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] font-medium">
                    <span className="text-gray-400 dark:text-[#6B8A85]">
                      {metric.subtext}
                    </span>
                    <span className="text-gray-700 dark:text-white font-mono">
                      {metric.progressValue}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${metric.progressValue}%` }}
                      className="h-full bg-[#16423C] dark:bg-[#E2FB6C] rounded-full transition-all duration-500"
                    />
                  </div>
                </div>
              )}

              // Context C: Animated live beacon indicator (Live Status Card) 
              {metric.isLive && (
                <div className="flex items-center justify-between w-full">
                  <span className="text-[11px] font-medium text-gray-400 dark:text-[#6B8A85]">
                    {metric.subtext}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-950/50">
                    <span className="w-1.5 h-1.5 bg-rose-600 dark:bg-rose-400 rounded-full animate-pulse" />
                    Live Now
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );







};

export default MetricsGrid;
*/

import {
 MdPeople,
 MdAssignmentTurnedIn,
 MdRadioButtonChecked,
 MdTrendingUp,
} from "react-icons/md";
import { useState, useEffect } from "react";
import { getDashboardMetrics } from "../../../api/dashboard.api";

const MetricsGrid = () => {
 const [metrics, setMetrics] = useState<any[]>([]);
 const [loading, setLoading] = useState(false);

 useEffect(() => {
 const loadMetrics = async () => {
 try {
 setLoading(true);

 const data = await getDashboardMetrics();
 console.log("metrics:", data);

 const formatted = [
 {
 key: "attendance",
 ...data.attendance,
 icon: MdPeople,
 chartPoints: data.attendance?.chartPoints || [],
 chartColor: "bg-emerald-500",
 },
 {
 key: "grading",
 ...data.grading,
 icon: MdAssignmentTurnedIn,
 progressBar: true,
 },
 {
 key: "live",
 ...data.liveSessions,
 icon: MdRadioButtonChecked,
 },
 ];

 setMetrics(formatted);
 } catch (err) {
 console.log("Metrics error", err);
 } finally {
 setLoading(false);
 }
 };

 loadMetrics();
 }, []);

 if (loading) return <p>Loading metrics...</p>;
 if (metrics.length === 0) return <p>No metrics data</p>;

 return (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
 {metrics.map((metric, idx) => {
 const Icon = metric.icon;

 return (
 <div
 key={idx}
 className="p-6 bg-white dark:bg-[#16423C] border border-gray-200/60 dark:border-white/5 rounded-2xl shadow-sm flex flex-col justify-between"
 >
 {/* Top Row */}
 <div className="flex items-start justify-between">
 <div className="space-y-1">
 <span className="text-xs text-gray-400">
 {metric.title}
 </span>
 <h3 className="text-2xl font-bold">
 {metric.value}
 </h3>
 </div>

 <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5">
 <Icon size={20} />
 </div>
 </div>

 {/* Bottom Section */}
 <div className="mt-5 pt-4 border-t">
 {metric.chartPoints && (
 <div className="flex items-center justify-between w-full">
 <div className="flex items-end space-x-1 h-6">
 {metric.chartPoints.map((point: number, pIdx: number) => (
 <div
 key={pIdx}
 style={{ height: `${point}%` }}
 className={`w-1 rounded-t-sm ${metric.chartColor}`}
 />
 ))}
 </div>

 <span className="text-xs flex items-center gap-1">
 <MdTrendingUp />
 {metric.subtext}
 </span>
 </div>
 )}

 {metric.progressBar && (
 <div className="w-full space-y-1">
 <div className="flex justify-between text-xs">
 <span>{metric.subtext}</span>
 <span>{metric.progressValue}%</span>
 </div>

 <div className="w-full h-2 bg-gray-200 rounded-full">
 <div
 style={{ width: `${metric.progressValue}%` }}
 className="h-full bg-[#16423C]"
 />
 </div>
 </div>
 )}

 {metric.isLive && (
 <div className="flex justify-between text-xs">
 <span>{metric.subtext}</span>
 <span className="text-red-500 animate-pulse">
 Live
 </span>
 </div>
 )}
 </div>
 </div>
 );
 })}
 </div>
 );
};

export default MetricsGrid;