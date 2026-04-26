export default function Loading() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">My Invitations</h1>

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border bg-background p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-pulse"
          >
            {/* LEFT SIDE (event info) */}
            <div className="space-y-2">
              <div className="h-4 w-48 bg-muted rounded" />
              <div className="h-3 w-32 bg-muted rounded" />
              <div className="h-3 w-28 bg-muted rounded" />
            </div>

            {/* RIGHT SIDE (badges + actions) */}
            <div className="flex flex-col md:items-end gap-3">
              {/* badges */}
              <div className="flex gap-2 flex-wrap justify-end">
                <div className="h-5 w-20 bg-muted rounded-full" />
                <div className="h-5 w-24 bg-muted rounded-full" />
              </div>

              {/* fee line */}
              <div className="h-3 w-28 bg-muted rounded" />

              {/* buttons (only show shape, no logic) */}
              <div className="flex gap-2">
                <div className="h-9 w-24 bg-muted rounded-md" />
                <div className="h-9 w-24 bg-muted rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
