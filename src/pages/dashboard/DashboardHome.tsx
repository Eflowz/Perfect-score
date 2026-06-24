import PerformanceTracker from "./components/PerformanceTracker";
import Leaderboard from "./components/Leaderboard";
import DaysChallenge from "./components/DaysChallenge";
import MetricsGrid from "./components/MetricsGrid";

const DashboardHome = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start animate-in fade-in duration-300">
      {/* Left Content Pipeline Pane */}
      <div className="lg:col-span-2 space-y-6">
        <DaysChallenge />
        <PerformanceTracker />
        <MetricsGrid />
        
      </div>

      {/* Right Content Analytic Standings Row */}
      <div className="h-full">
        <Leaderboard />
      </div>
    </div>
  );
};

export default DashboardHome;
