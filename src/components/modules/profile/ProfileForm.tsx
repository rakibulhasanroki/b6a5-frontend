"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),

  phoneNumber: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;

        // Length check
        if (val.length < 11 || val.length > 14) return false;

        // Validity check
        const bdRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;

        if (!bdRegex.test(val)) return false;

        const digitsOnly = val.replace(/\D/g, "");
        if (/^(\d)\1+$/.test(digitsOnly)) return false;

        return true;
      },
      {
        message: "Enter a valid BD phone number",
      },
    ),

  bio: z.string().max(200, "Bio max 200 chars").optional(),
});
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
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = profileSchema.safeParse({
      name,
      phoneNumber,
      bio,
    });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});

    const formData = new FormData();

    if (name) formData.append("name", name);
    if (phoneNumber) formData.append("phoneNumber", phoneNumber);
    if (bio) formData.append("bio", bio);
    if (imageFile) formData.append("profilePhoto", imageFile);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="flex flex-col gap-6 flex-1">
        {/* IMAGE */}
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full overflow-hidden border">
            <img
              src={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : user?.image || "/avatar.png"
              }
              className="h-full w-full object-cover"
            />
          </div>

          <label className="cursor-pointer text-sm border px-3 py-2 rounded-md hover:bg-muted transition">
            Change Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors?.name && (
              <p className="text-xs text-red-500">{errors.name[0]}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors?.phoneNumber && (
              <p className="text-xs text-red-500">{errors.phoneNumber[0]}</p>
            )}
          </div>

          <div>
            <textarea
              placeholder="Write something about yourself..."
              className="w-full min-h-[120px] rounded-md border p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            {errors?.bio && (
              <p className="text-xs text-red-500">{errors.bio[0]}</p>
            )}
          </div>
        </div>
      </div>

      {/* BUTTON STAYS AT BOTTOM */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer"
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </div>
    </form>
  );
}
