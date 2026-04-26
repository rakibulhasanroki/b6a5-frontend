export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-5 w-32 bg-muted animate-pulse rounded" />
          <div className="h-4 w-52 bg-muted animate-pulse rounded" />
        </div>

        <div className="h-9 w-32 bg-muted animate-pulse rounded-md" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-2">
        <div className="h-8 w-24 bg-muted animate-pulse rounded-md" />
        <div className="h-8 w-28 bg-muted animate-pulse rounded-md" />
      </div>

      {/* Cards grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border p-4 space-y-3">
            <div className="flex justify-between">
              <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              <div className="h-5 w-14 bg-muted animate-pulse rounded" />
            </div>

            <div className="space-y-2">
              <div className="h-3 w-24 bg-muted animate-pulse rounded" />
              <div className="h-3 w-40 bg-muted animate-pulse rounded" />
            </div>

            <div className="h-3 w-28 bg-muted animate-pulse rounded" />

            <div className="h-9 w-full bg-muted animate-pulse rounded-md mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
