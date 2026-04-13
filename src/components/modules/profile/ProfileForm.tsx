"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfileForm({
  user,
  onSubmit,
  isLoading,
}: {
  user: any;
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}) {
  const [name, setName] = useState(user?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (name) formData.append("name", name);
    if (phoneNumber) formData.append("phoneNumber", phoneNumber);
    if (bio) formData.append("bio", bio);
    if (imageFile) formData.append("image", imageFile);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image */}
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-full overflow-hidden border">
          {imageFile ? (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={user?.image || "/avatar.png"}
              alt="profile"
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
      </div>

      {/* Fields */}
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Input
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <textarea
        className="w-full rounded-md border p-3 text-sm"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  );
}
