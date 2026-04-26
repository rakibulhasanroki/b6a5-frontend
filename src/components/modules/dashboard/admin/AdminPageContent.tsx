import AdminTabs from "@/components/modules/dashboard/admin/AdminTabs";
import { getAllUsersAction } from "@/service/user/user.actions";
import { getEventsAction } from "@/service/event/event.actions";

export default async function AdminPageContent() {
  const usersRes = await getAllUsersAction({ page: 1, limit: 10 });

  const eventsRes = await getEventsAction(
    { page: 1, limit: 10 },
    {
      cache: "force-cache",
      revalidate: 60,
      tags: ["events"],
    },
  );

  return (
    <AdminTabs
      users={usersRes.data}
      usersMeta={usersRes.meta}
      events={eventsRes.data}
      eventsMeta={eventsRes.meta}
    />
  );
}
