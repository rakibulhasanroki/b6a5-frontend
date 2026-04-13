import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container py-12">
        {/* Top Section */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Brand */}
          <div className="text-center md:text-left space-y-1">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Planora
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage and join events seamlessly
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/about"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span className="tracking-tight">planora@gmail.com</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-border/70 pt-6 flex flex-col items-center justify-between gap-3 md:flex-row text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Planora. All rights reserved.</p>

          <div className="flex gap-4">
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
