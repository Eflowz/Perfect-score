import StatCard from "./StatCard";
import { MdBook, MdPeople, MdLayers } from "react-icons/md";

type Props = {
  totalCourses: number;
  totalUsers?: number;
  totalModules?: number;
  activeLearners?: number;
};

export default function StatsGrid({
  totalCourses,
  totalUsers,
  totalModules,
  activeLearners,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Courses"
        value={totalCourses}
        icon={<MdBook size={22} />}
      />

      <StatCard
        title="Total Users"
        value={totalUsers ?? "-"}
        icon={<MdPeople size={22} />}
        color="#2563eb"
      />

      <StatCard
        title="Total Modules"
        value={totalModules ?? "-"}
        icon={<MdLayers size={22} />}
        color="#f59e0b"
      />

      <StatCard
        title="Active Learners"
        value={activeLearners ?? "-"}
        icon={<MdPeople size={22} />}
        color="#10b981"
      />
    </div>
  );
}
