import { Grid, StatCard } from "@/components/shared/DahsboardSahred";

export default function AdminStats({ stats }: { stats: any }) {
  const data = stats.admin;

  if (!data) return null;

  return (
    <Grid>
      <StatCard label="Users" value={data.users.total} />
      <StatCard label="Events" value={data.platform.totalEvents} />
      <StatCard label="Bookings" value={data.platform.totalBookings} />
      <StatCard label="Revenue" value={`৳${data.platform.totalRevenue}`} />
    </Grid>
  );
}
