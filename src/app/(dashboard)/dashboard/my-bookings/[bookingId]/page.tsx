import { getBookingByIdAction } from "@/service/bookings/booking.actions";
import { redirect } from "next/navigation";
import { BookingWithEvent } from "@/types/booking";
import { EventStatus } from "@/types/event";
export const metadata = {
  title: "Booking Details",
};
const formatDate = (date?: string | null) => {
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en-BD", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-100 text-green-700";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "CANCELLED":
      return "bg-red-100 text-red-700";
    case "BANNED":
      return "bg-red-200 text-red-800";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getComputedStatus = (
  start?: string | null,
  end?: string | null,
): EventStatus => {
  const now = new Date();

  if (end && now > new Date(end)) return "ENDED";
  if (start && now >= new Date(start)) return "ONGOING";
  return "UPCOMING";
};

const getEventStatusStyle = (status: EventStatus) => {
  switch (status) {
    case "UPCOMING":
      return "bg-blue-100 text-blue-700";
    case "ONGOING":
      return "bg-green-100 text-green-700";
    case "ENDED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default async function BookingDetailsPage({
  params,
}: {
  params: { bookingId: string };
}) {
  const { bookingId } = await params;

  let booking: BookingWithEvent | null = null;

  try {
    const res = await getBookingByIdAction(bookingId);
    booking = res ?? null;

    if (!booking?.event) {
      redirect("/dashboard/my-bookings");
    }
  } catch {
    redirect("/dashboard/my-bookings");
  }

  if (!booking || !booking.event) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">Booking Details</h1>
        <p className="text-sm text-muted-foreground">Booking not found</p>
      </div>
    );
  }

  const event = booking.event;
  const computedStatus = getComputedStatus(
    event.startDateTime,
    event.endDateTime,
  );

  return (
    <div className="max-w-3xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">{event.title}</h1>
        <p className="text-sm text-muted-foreground">Booking Details</p>
      </div>

      <div className="border rounded-lg divide-y">
        <div className="flex items-center justify-between p-4">
          <span className="text-sm text-muted-foreground">Booking Status</span>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusStyle(
              booking.status,
            )}`}
          >
            {booking.status}
          </span>
        </div>

        <div className="flex items-center justify-between p-4">
          <span className="text-sm text-muted-foreground">Event Status</span>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${getEventStatusStyle(
              computedStatus,
            )}`}
          >
            {computedStatus}
          </span>
        </div>

        <div className="flex items-center justify-between p-4">
          <span className="text-sm text-muted-foreground">Start</span>
          <span className="text-sm font-medium text-right">
            {formatDate(event.startDateTime)}
          </span>
        </div>

        {event.endDateTime && (
          <div className="flex items-center justify-between p-4">
            <span className="text-sm text-muted-foreground">End</span>
            <span className="text-sm font-medium text-right">
              {formatDate(event.endDateTime)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between p-4">
          <span className="text-sm text-muted-foreground">Type</span>
          <span className="text-sm font-medium">{event.eventType}</span>
        </div>

        <div className="flex items-center justify-between p-4">
          <span className="text-sm text-muted-foreground">Visibility</span>
          <span className="text-sm font-medium">{event.visibility}</span>
        </div>

        {event.location && (
          <div className="flex items-center justify-between p-4">
            <span className="text-sm text-muted-foreground">Location</span>
            <span className="text-sm font-medium text-right break-words">
              {event.location}
            </span>
          </div>
        )}

        {event.meetingLink && (
          <div className="flex items-center justify-between p-4">
            <span className="text-sm text-muted-foreground">Meeting</span>
            <a
              href={event.meetingLink}
              target="_blank"
              className="text-sm font-medium text-primary underline break-all"
            >
              Join Link
            </a>
          </div>
        )}

        {event.organizer && (
          <div className="flex items-center justify-between p-4">
            <span className="text-sm text-muted-foreground">Organizer</span>
            <span className="text-sm font-medium">{event.organizer.name}</span>
          </div>
        )}

        <div className="flex items-center justify-between p-4">
          <span className="text-sm text-muted-foreground">Fee</span>
          <span className="text-sm font-medium">
            {event.fee > 0 ? `৳ ${event.fee}` : "Free"}
          </span>
        </div>

        {booking.payment && (
          <div className="flex items-center justify-between p-4">
            <span className="text-sm text-muted-foreground">Payment</span>
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                booking.payment.status === "PAID"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {booking.payment.status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
