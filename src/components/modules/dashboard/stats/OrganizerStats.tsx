import { CTA, Grid, StatCard } from "@/components/shared/DahsboardSahred";

export default function OrganizerStats({ stats }: { stats: any }) {
  const data = stats.organizer;

  if (data.eventsCreated === 0) {
    return (
      <CTA
        text="You haven’t created any events yet."
        action="Create Event"
        href="/dashboard/events"
      />
    );
  }

  return (
    <Grid>
      <StatCard label="Events Created" value={data.eventsCreated} />
      <StatCard label="Participants" value={data.participants.total} />
      <StatCard label="Pending Requests" value={data.participants.pending} />
      <StatCard label="Confirmed" value={data.participants.confirmed} />
      <StatCard label="Banned" value={data.participants.banned} />
      <StatCard label="Revenue" value={`৳${data.revenue.totalAmount}`} />
    </Grid>
  );
}
