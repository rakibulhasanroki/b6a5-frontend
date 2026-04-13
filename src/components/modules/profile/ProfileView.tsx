"use client";

import ProfileAvatar from "./ProfileAvatar";
import CardWrapper from "@/components/custom/CardWrapper";
import ProfileForm from "./ProfileForm";

export default function ProfileView() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    image: "https://i.pravatar.cc/150",
    phoneNumber: "",
    bio: "",
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* LEFT SIDE */}
      <CardWrapper className="p-6">
        <ProfileAvatar image={user.image} name={user.name} />

        <div className="mt-4 space-y-1">
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </CardWrapper>

      {/* RIGHT SIDE */}
      <div className="md:col-span-2">
        <CardWrapper className="p-6">
          <ProfileForm user={user} onSubmit={() => {}} />
        </CardWrapper>
      </div>
    </div>
  );
}
