export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-5 w-48 bg-muted rounded" />
          <div className="h-4 w-32 bg-muted rounded" />
        </div>

        <div className="flex gap-2">
          <div className="h-9 w-24 bg-muted rounded" />
          <div className="h-9 w-24 bg-muted rounded" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-16 bg-muted rounded" />
        <div className="h-16 bg-muted rounded" />
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side */}
        <div className="lg:col-span-2 space-y-4">
          <div className="h-10 w-full bg-muted rounded" />
          <div className="h-40 w-full bg-muted rounded" />
          <div className="h-40 w-full bg-muted rounded" />
        </div>

        {/* Right side */}
        <div className="space-y-4">
          <div className="h-40 w-full bg-muted rounded" />
          <div className="h-32 w-full bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}
