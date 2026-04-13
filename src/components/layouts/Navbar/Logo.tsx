import Link from "next/link";
import { Star } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative flex h-10 w-10 shrink-0 aspect-square items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-lg transition-transform group-hover:scale-110">
        <Star className="h-5 w-5" />
        <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <span className="text-xl font-bold tracking-tight text-foreground">
        Planora
      </span>
    </Link>
  );
}
