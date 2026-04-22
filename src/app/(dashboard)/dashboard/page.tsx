import DashboardStats from "@/components/modules/dashboard/stats/DashboardStats";
import { getUserStatsAction } from "@/service/user/user.actions";
import { IUserStats } from "@/types/user";

export default async function DashboardPage() {
  const stats: IUserStats | null = await getUserStatsAction();

  return (
    <div className="space-y-6">
      <DashboardStats stats={stats} />
    </div>
  );
}
