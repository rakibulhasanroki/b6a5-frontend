export default function Loading() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Tabs */}
      <div className="flex gap-2 border-b pb-2">
        <div className="h-8 w-20 bg-muted rounded" />
        <div className="h-8 w-20 bg-muted rounded" />
        <div className="h-8 w-28 bg-muted rounded" />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div className="h-16 w-full bg-muted rounded" />
        <div className="h-16 w-full bg-muted rounded" />
        <div className="h-16 w-full bg-muted rounded" />
      </div>
    </div>
  );
}
