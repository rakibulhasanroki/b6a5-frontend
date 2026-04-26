export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Title */}
      <div className="h-6 w-40 bg-muted rounded" />

      {/* List */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border p-4 flex flex-col md:flex-row md:justify-between gap-4"
          >
            {/* LEFT */}
            <div className="space-y-3">
              <div className="h-4 w-48 bg-muted rounded" />
              <div className="h-3 w-32 bg-muted rounded" />
              <div className="h-3 w-24 bg-muted rounded" />
              <div className="h-5 w-20 bg-muted rounded-full" />
            </div>

            {/* RIGHT */}
            <div className="flex gap-2">
              <div className="h-8 w-20 bg-muted rounded" />
              <div className="h-8 w-24 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
