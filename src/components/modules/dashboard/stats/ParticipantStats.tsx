import { CTA, Grid, StatCard } from "@/components/shared/DahsboardSahred";

export default function ParticipantStats({ stats }: { stats: any }) {
  const data = stats.participant;

  if (data.eventsJoined === 0 && data.invitations.pending === 0) {
    return (
      <CTA
        text="You haven’t joined any events yet."
        action="Explore Events"
        href="/events"
      />
    );
  }

  return (
    <Grid>
      <StatCard label="Events Joined" value={data.eventsJoined} />
      <StatCard label="Bookings" value={data.bookings.total} />
      <StatCard label="Pending" value={data.bookings.pending} />
      <StatCard label="Confirmed" value={data.bookings.confirmed} />

      {/* ✅ FIXED */}
      <StatCard label="Pending Invitations" value={data.invitations.pending} />

      <StatCard label="Payments" value={data.payments.totalPaid} />
      <StatCard label="Total Spent" value={`৳${data.payments.totalAmount}`} />

      <StatCard label="Reviews" value={data.reviews.total} />
    </Grid>
  );
}
