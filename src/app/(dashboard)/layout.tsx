import DashboardLayout from "@/components/layouts/Dashboard/DashboardLayout";
import { getNavUser } from "@/service/user/user.actions";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getNavUser();
  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
