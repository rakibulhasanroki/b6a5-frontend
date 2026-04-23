export default function EventStatsBar({
  participantsCount,
  requestsCount,
}: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
      <Stat label="Participants" value={participantsCount} />
      <Stat label="Requests" value={requestsCount} />
    </div>
  );
}

function Stat({ label, value }: any) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
