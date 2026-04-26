export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
      {/* Title */}
      <div className="h-6 w-40 bg-muted rounded" />

      {/* Inputs */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-10 w-full bg-muted rounded" />
        </div>
      ))}

      {/* Date row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-10 bg-muted rounded" />
        <div className="h-10 bg-muted rounded" />
      </div>

      {/* Button */}
      <div className="h-10 w-full bg-muted rounded" />
    </div>
  );
}
