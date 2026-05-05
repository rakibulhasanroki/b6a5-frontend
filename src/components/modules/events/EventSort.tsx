"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const options = [
  {
    label: "Newest",
    value: "NEWEST",
    icon: ArrowUpDown,
  },
  {
    label: "Price ↑",
    value: "PRICE_ASC",
    icon: ArrowUp,
  },
  {
    label: "Price ↓",
    value: "PRICE_DESC",
    icon: ArrowDown,
  },
];

export default function EventsSort({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <Button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          variant={value === opt.value ? "default" : "outline"}
          className="h-9 px-4 cursor-pointer"
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}
