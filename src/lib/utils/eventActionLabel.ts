import { Event } from "@/types/event";

export function getEventActionLabel(event: Event, isFull: boolean) {
  if (event.status === "ENDED") return "Event Ended";
  if (isFull) return "Full";

  if (event.visibility === "PUBLIC" && event.fee === 0) return "Join";
  if (event.visibility === "PUBLIC" && event.fee > 0) return "Pay & Join";
  if (event.visibility === "PRIVATE" && event.fee === 0) return "Request";
  if (event.visibility === "PRIVATE" && event.fee > 0) return "Pay & Request";

  return "View Details";
}
