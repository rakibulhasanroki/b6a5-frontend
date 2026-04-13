"use client";

interface Props {
  image?: string;
  name?: string;
}

export default function ProfileAvatar({ image, name }: Props) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={image || "https://i.pravatar.cc/150"}
        alt="avatar"
        className="h-20 w-20 rounded-full object-cover border"
      />

      <div>
        <h2 className="text-lg font-semibold">{name || "User Name"}</h2>
        <p className="text-sm text-muted-foreground">
          Manage your profile information
        </p>
      </div>
    </div>
  );
}
