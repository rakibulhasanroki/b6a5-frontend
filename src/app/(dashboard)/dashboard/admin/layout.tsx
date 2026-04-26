import { redirect } from "next/navigation";
import { getNavUser } from "@/service/user/user.actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getNavUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  return <>{children}</>;
}
