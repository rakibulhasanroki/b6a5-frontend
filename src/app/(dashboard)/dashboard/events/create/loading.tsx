export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <h2 className="text-xl font-semibold">Create Event</h2>

      {/* Title */}
      <div className="space-y-2">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-10 w-full bg-gray-200 rounded-md" />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-20 w-full bg-gray-200 rounded-md" />
      </div>

      {/* Event Type */}
      <div className="space-y-2">
        <div className="h-4 w-28 bg-gray-200 rounded" />
        <div className="h-10 w-full bg-gray-200 rounded-md" />
      </div>

      {/* Dynamic Field */}
      <div className="space-y-2">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-10 w-full bg-gray-200 rounded-md" />
      </div>

      {/* Visibility */}
      <div className="space-y-2">
        <div className="h-4 w-28 bg-gray-200 rounded" />
        <div className="h-10 w-full bg-gray-200 rounded-md" />
      </div>

      {/* DateTime */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-10 bg-gray-200 rounded-md" />
        <div className="h-10 bg-gray-200 rounded-md" />
      </div>

      {/* Fee + Participants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-10 bg-gray-200 rounded-md" />
        <div className="h-10 bg-gray-200 rounded-md" />
      </div>

      {/* Button */}
      <div className="h-10 w-full bg-gray-200 rounded-md" />
    </div>
  );
}
