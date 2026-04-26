import DashboardLayout from "@/components/layouts/Dashboard/DashboardLayout";
import { getNavUser } from "@/service/user/user.actions";
import { IUser } from "@/types/user";

export const metadata = {
  title: {
    default: "Dashboard",
    template: " %s | Dashboard",
  },
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: IUser | null = await getNavUser();

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
