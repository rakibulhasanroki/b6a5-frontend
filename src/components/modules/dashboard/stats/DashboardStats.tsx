import StatsTabs from "./StatsTabs";

export default function DashboardStats({ stats }: { stats: any }) {
  if (!stats) return null;

  return (
    <div className="space-y-6">
      <StatsTabs stats={stats} />
    </div>
  );
}
