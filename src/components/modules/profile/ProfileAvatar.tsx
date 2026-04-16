"use client";

interface Props {
  image?: string;
  name?: string;
}

export default function ProfileAvatar({ image, name }: Props) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0">
        {image ? (
          <img
            src={image}
            alt="avatar"
            className="h-20 w-20 min-h-[80px] min-w-[80px] rounded-full object-cover border-2 border-primary/20 shadow-md aspect-square"
          />
        ) : (
          <div className="h-20 w-20 min-h-[80px] min-w-[80px] rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold border aspect-square">
            {initials}
          </div>
        )}

        <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
      </div>

      <div className="min-w-0">
        <h2 className="text-lg font-semibold truncate">
          {name || "User Name"}
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage your profile information
        </p>
      </div>
    </div>
  );
}
