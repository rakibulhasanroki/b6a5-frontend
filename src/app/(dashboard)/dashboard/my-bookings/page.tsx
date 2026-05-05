import MyBookingsList from "@/components/modules/dashboard/bookings/MyBookingList";
import MyBookingsPagination from "@/components/modules/dashboard/bookings/MyBookingPagination";
import MyBookingsControls from "@/components/modules/dashboard/bookings/MyBookingsControls";
import { getMyBookingsAction } from "@/service/bookings/booking.actions";

export const metadata = {
  title: "My Bookings",
};

export default async function MyBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    status?: string;
  }>;
}) {
  const params = await searchParams;

  const page = Number(params?.page || 1);
  const limit = 6;

  const status =
    params?.status === "CONFIRMED" ||
    params?.status === "PENDING" ||
    params?.status === "CANCELLED" ||
    params?.status === "BANNED"
      ? params.status
      : undefined;

  const res = await getMyBookingsAction({
    page,
    limit,
    status,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">My Bookings</h1>

      <MyBookingsControls />

      <MyBookingsList bookings={res.data} />
      <MyBookingsPagination totalPages={res.meta.totalPages} page={page} />
    </div>
  );
}
