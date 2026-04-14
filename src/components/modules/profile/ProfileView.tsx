"use client";

import { useState } from "react";
import ProfileAvatar from "./ProfileAvatar";
import CardWrapper from "@/components/custom/CardWrapper";
import ProfileForm from "./ProfileForm";
import { updateMeAction } from "@/service/user/user.actions";

export default function ProfileView({ user: user }: { user: any }) {
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (formData: FormData) => {
    setUpdating(true);
    try {
      await updateMeAction(formData);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* LEFT SIDE (PROFILE INFO) */}
      <CardWrapper className="p-6 space-y-5">
        <ProfileAvatar image={user?.image} name={user?.name} />

        <div className="space-y-3 text-sm mt-4">
          <div>
            <p className="text-muted-foreground">Email</p>
            <p className="font-medium break-all">{user?.email}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Phone</p>
            <p className="font-medium">{user?.phoneNumber || "Not provided"}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Role</p>
            <p className="font-medium">{user?.role}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Status</p>
            <p
              className={`font-medium ${
                user?.status === "ACTIVE" ? "text-green-500" : "text-red-500"
              }`}
            >
              {user?.status}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Bio</p>
            <p className="font-medium text-sm leading-relaxed">
              {user?.bio || "No bio added yet"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Joined</p>
            <p className="font-medium">
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardWrapper>

      {/* RIGHT SIDE (FORM) */}
      <div className="md:col-span-2">
        <CardWrapper className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Edit Profile</h3>
            <p className="text-sm text-muted-foreground">
              Update your personal information
            </p>
          </div>

          <ProfileForm
            user={user}
            onSubmit={handleUpdate}
            isLoading={updating}
          />
        </CardWrapper>
      </div>
    </div>
  );
}
