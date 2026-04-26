import MyBookingsList from "@/components/modules/dashboard/bookings/MyBookingList";
import { getMyBookingsAction } from "@/service/bookings/booking.actions";
import { BookingWithEvent } from "@/types/booking";
export const metadata = {
  title: "My Bookings",
};
export default async function MyBookingsPage() {
  const bookings: BookingWithEvent[] = await getMyBookingsAction();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">My Bookings</h1>

      <MyBookingsList bookings={bookings} />
    </div>
  );
}
