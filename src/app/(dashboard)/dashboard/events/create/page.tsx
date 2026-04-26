import CreateEventForm from "@/components/modules/dashboard/events/create/CreateEventForm";
export const metadata = {
  title: "Create Event",
};
export default function CreateEventPage() {
  return (
    <div className="max-w-4xl mx-auto py-6">
      <CreateEventForm />
    </div>
  );
}
