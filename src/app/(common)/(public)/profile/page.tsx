import PageContainer from "@/components/custom/PageContainer";
import PageHeader from "@/components/custom/PageHeader";
import ProfileView from "@/components/modules/profile/ProfileView";

export default function ProfilePage() {
  return (
    <PageContainer>
      <PageHeader title="My Profile" className="mt-14" />

      <ProfileView />
    </PageContainer>
  );
}
