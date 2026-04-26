import DashboardLayout from "@/components/layouts/Dashboard/DashboardLayout";
import { getNavUser } from "@/service/user/user.actions";
import { IUser } from "@/types/user";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: IUser | null = await getNavUser();

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
