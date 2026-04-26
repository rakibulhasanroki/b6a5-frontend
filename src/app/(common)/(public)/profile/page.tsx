import PageContainer from "@/components/custom/PageContainer";
import PageHeader from "@/components/custom/PageHeader";
import ProfileView from "@/components/modules/profile/ProfileView";
import { getMeService } from "@/service/user/user.service";

export const metadata = {
  title: "Profile",
};
export default async function ProfilePage() {
  const user = await getMeService();

  return (
    <PageContainer>
      <PageHeader title="My Profile" className="mt-6" />

      <ProfileView user={user.data} />
    </PageContainer>
  );
}
