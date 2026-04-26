export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* PAGE TITLE */}
      <div className="h-6 w-40 bg-muted rounded-md" />

      {/* LIST */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border bg-background p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* LEFT SIDE (TEXT BLOCK) */}
            <div className="space-y-3">
              <div className="h-4 w-48 bg-muted rounded" />
              <div className="h-3 w-32 bg-muted rounded" />
              <div className="h-3 w-24 bg-muted rounded" />
            </div>

            {/* RIGHT SIDE (BADGES + BUTTONS) */}
            <div className="flex flex-col md:items-end gap-3">
              {/* badges */}
              <div className="flex gap-2 justify-end">
                <div className="h-5 w-16 bg-muted rounded-full" />
                <div className="h-5 w-20 bg-muted rounded-full" />
              </div>

              {/* optional second line */}
              <div className="h-3 w-24 bg-muted rounded ml-auto" />

              {/* buttons */}
              <div className="flex gap-2">
                <div className="h-8 w-24 bg-muted rounded-md" />
                <div className="h-8 w-24 bg-muted rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
