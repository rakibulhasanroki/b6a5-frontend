"use client";

import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function EventsSearch({ value, onChange }: Props) {
  return (
    <Input
      placeholder="Search by title or organizer..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10"
    />
  );
}
