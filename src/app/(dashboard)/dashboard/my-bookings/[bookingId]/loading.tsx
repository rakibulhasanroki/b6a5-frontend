export default function Loading() {
  return (
    <div className="max-w-3xl space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-6 w-48 bg-muted rounded" />
        <div className="h-4 w-32 bg-muted rounded" />
      </div>

      {/* Card */}
      <div className="border rounded-lg divide-y">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center justify-between p-4 gap-4">
            <div className="h-3 w-32 bg-muted rounded" />
            <div className="h-3 w-40 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
