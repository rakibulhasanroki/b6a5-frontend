"use client";

import { Button } from "@/components/ui/button";

interface Props {
  active: string;
  onChange: (v: string) => void;
}

const filters = [
  "ALL",
  "PUBLIC_FREE",
  "PUBLIC_PAID",
  "PRIVATE_FREE",
  "PRIVATE_PAID",
];

export default function EventsFilters({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <Button
          key={f}
          onClick={() => onChange(f)}
          variant={active === f ? "default" : "outline"}
          className="h-9 px-4 cursor-pointer"
        >
          {f.replace("_", " ")}
        </Button>
      ))}
    </div>
  );
}
