"use client";

import { useState } from "react";
import { toast } from "sonner";
import ProfileAvatar from "./ProfileAvatar";
import CardWrapper from "@/components/custom/CardWrapper";
import ProfileForm from "./ProfileForm";
import { updateMeAction } from "@/service/user/user.actions";
import { IUser } from "@/types/user";

export default function ProfileView({ user }: { user: IUser }) {
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (formData: FormData) => {
    setUpdating(true);

    const res = await updateMeAction(formData);

    if (!res.success) {
      toast.error(res.message || "Failed to update profile");
      setUpdating(false);
      return;
    }

    toast.success("Profile updated successfully");

    setUpdating(false);
  };

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 items-stretch mb-10">
      {/* LEFT */}
      <CardWrapper className="p-6 h-full flex flex-col justify-between">
        <div>
          <ProfileAvatar image={user?.image || ""} name={user?.name} />

          <div className="space-y-3 text-sm mt-4">
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium break-all">{user?.email}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium">
                {user?.phoneNumber || "Not provided"}
              </p>
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
        </div>
      </CardWrapper>

      {/* RIGHT */}
      <CardWrapper className="p-6 h-full flex flex-col">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Edit Profile</h3>
          <p className="text-sm text-muted-foreground">
            Update your personal information
          </p>
        </div>

        <div className="flex-1 flex flex-col">
          <ProfileForm
            user={user}
            onSubmit={handleUpdate}
            isLoading={updating}
          />
        </div>
      </CardWrapper>
    </div>
  );
}
