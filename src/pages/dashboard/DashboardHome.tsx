import PerformanceTracker from "./components/PerformanceTracker";
import DaysChallenge from "./components/DaysChallenge";
import MetricsGrid from "./components/MetricsGrid";
import ProgressOverview from "./components/ProgressOverview";

const DashboardHome = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <DaysChallenge />
      <PerformanceTracker />
      <ProgressOverview />
      <MetricsGrid />
    </div>
  );
};

export default DashboardHome;
