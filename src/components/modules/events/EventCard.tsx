import { Event } from "@/types/event";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getEventActionLabel } from "@/lib/utils/eventActionLabel";
import { createBookingAction } from "@/service/bookings/booking.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

function getLightGradient(title: string) {
  const gradients = [
    "from-purple-50 via-white to-purple-100",
    "from-indigo-50 via-white to-purple-50",
    "from-violet-50 via-white to-fuchsia-50",
    "from-sky-50 via-white to-indigo-50",
    "from-rose-50 via-white to-purple-50",
  ];

  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }

  return gradients[Math.abs(hash) % gradients.length];
}

function shortDesc(text?: string) {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > 15 ? words.slice(0, 15).join(" ") + "..." : text;
}

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const hasImage = !!event.image;

  const max = event.maxParticipants;
  const isFull = event.isFull ?? false;
  const spotsLeft = event.spotsLeft ?? 0;

  const actionLabel = getEventActionLabel(event, isFull);
  const isDisabled = event.status === "ENDED" || isFull;

  const handleJoin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const raw: any = await createBookingAction({
        eventId: event.id,
      });

      if (!raw?.success) {
        if (raw?.statusCode === 401) {
          toast.error("Please login to continue");
          const current = window.location.pathname + window.location.search;
          setTimeout(() => {
            router.push(`/login?redirectTo=${encodeURIComponent(current)}`);
          }, 600);
          return;
        }
        toast.error(raw?.message || "Failed to join event");
        return;
      }

      const res = raw?.data.data ?? raw;

      if (res?.requiresPayment && res?.paymentUrl) {
        toast.info("Redirecting to payment...");
        setTimeout(() => (window.location.href = res.paymentUrl), 200);
        return;
      }

      if (res?.id) {
        toast.success("Joined successfully");
        router.push(`/dashboard/my-bookings/${res.id}`);
        return;
      }

      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="group overflow-hidden rounded-xl border p-0 transition-all duration-300 hover:shadow-lg hover:-translate-y-[2px]">
      {/* ================= BANNER ================= */}
      <div className="relative h-44 w-full overflow-hidden rounded-t-xl">
        {/* IMAGE MODE */}
        {hasImage ? (
          <>
            <Image
              src={event.image as string}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-black/20" />
          </>
        ) : (
          <>
            {/* GRADIENT MODE */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${getLightGradient(
                event.title,
              )} transition-all duration-500 ease-out group-hover:scale-[1.05]`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-white/10 to-transparent" />

            <div className="absolute -top-12 -left-12 w-44 h-44 bg-purple-300/20 blur-3xl rounded-full transition-all duration-500 group-hover:scale-110 group-hover:opacity-90" />
            <div className="absolute bottom-0 right-0 w-36 h-36 bg-purple-200/20 blur-2xl rounded-full transition-all duration-500 group-hover:scale-110 group-hover:opacity-80" />
          </>
        )}

        {/* BADGES */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
          <span className="text-[10px] px-2 py-[3px] rounded-md bg-white/80 backdrop-blur text-gray-800 font-medium">
            {event.eventType}
          </span>

          <span
            className={`text-[10px] px-2 py-[3px] rounded-full font-semibold ${
              event.fee === 0
                ? "bg-green-100 text-green-700"
                : "bg-purple-100 text-purple-700"
            }`}
          >
            {event.fee === 0 ? "Free" : "Paid"}
          </span>
        </div>

        {!hasImage && (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center z-10">
            <h3 className="text-[17px] font-semibold text-gray-900 leading-snug line-clamp-3 tracking-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.6)] transition-transform duration-300 group-hover:scale-[1.03]">
              {event.title}
            </h3>
          </div>
        )}

        {/* DATE */}
        <div
          className={`absolute bottom-3 left-3 text-[11px] z-10 font-medium ${
            hasImage
              ? "px-2.5 py-[4px] rounded-md bg-gradient-to-r from-black/70 via-black/60 to-black/40 text-white backdrop-blur-sm shadow-sm"
              : "text-gray-800"
          }`}
        >
          {event.startDateTime
            ? format(new Date(event.startDateTime), "PPP")
            : "N/A"}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <CardContent className="p-3 flex flex-col h-[205px]">
        {/* TITLE (ONLY IMAGE MODE) */}
        {hasImage && (
          <h3 className="text-[15px] font-semibold text-gray-900 leading-snug line-clamp-2">
            {event.title}
          </h3>
        )}

        {/* DESCRIPTION */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 min-h-[36px] ">
          {shortDesc(event.description)}
        </p>

        <div className="flex flex-col gap-1.5 mt-auto">
          {/* META */}
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span className="truncate">{event.organizer.name}</span>

            <div className="flex items-center gap-1.5">
              {/* VISIBILITY */}
              <Badge
                variant="outline"
                className={
                  event.visibility === "PUBLIC"
                    ? "border-gray-300 text-gray-700"
                    : "border-amber-300 text-amber-700 bg-amber-50"
                }
              >
                {event.visibility}
              </Badge>
              {/* STATUS */}
              <Badge
                className={
                  event.status === "UPCOMING"
                    ? "bg-blue-100 text-blue-700"
                    : event.status === "ONGOING"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                }
              >
                {event.status}
              </Badge>
            </div>
          </div>

          {/* PRICE */}
          <div className="text-sm font-semibold text-gray-900">
            {event.fee === 0
              ? "Free"
              : new Intl.NumberFormat("en-BD", {
                  style: "currency",
                  currency: "BDT",
                }).format(event.fee)}
          </div>

          {/* SPOTS */}
          <div className="text-[11px] text-muted-foreground">
            {max
              ? isFull
                ? "Event Full"
                : `${spotsLeft} spots left`
              : "Unlimited"}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2 pt-1">
            <Button
              className="w-[60%] h-9 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.97] cursor-pointer"
              disabled={isDisabled || loading}
              onClick={handleJoin}
            >
              {loading ? "Processing..." : actionLabel}
            </Button>

            <Button asChild variant="outline" className="w-[40%] h-9">
              <Link href={`/events/${event.id}`}>Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
