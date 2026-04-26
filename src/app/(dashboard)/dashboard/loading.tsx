export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Tabs skeleton */}
      <div className="flex gap-2 border-b pb-2">
        <div className="h-8 w-28 bg-muted animate-pulse rounded-md" />
        <div className="h-8 w-28 bg-muted animate-pulse rounded-md" />
        <div className="h-8 w-28 bg-muted animate-pulse rounded-md" />
      </div>

      {/* Stats grid skeleton */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    </div>
  );
}
