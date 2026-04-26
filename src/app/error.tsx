"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Planora Error Boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md w-full mx-auto text-center px-6">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Something went wrong
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          Planora encountered an unexpected error while processing your request.
          This usually happens due to a temporary issue or network interruption.
        </p>

        {/* Error hint (dev only style) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 text-xs text-left bg-muted border border-border rounded-lg p-3 text-muted-foreground">
            <p className="font-medium mb-1 text-foreground">Debug Info:</p>
            <code className="break-all">{error.message}</code>
            {error.digest && (
              <p className="mt-1 opacity-70">Digest: {error.digest}</p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={reset}
            className="flex-1 gap-2 bg-primary hover:bg-primary/90 cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>

          <Button asChild variant="outline" className="flex-1 gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Footer hint */}
        <p className="text-xs text-muted-foreground mt-6">
          If this persists, refresh the page or contact support.
        </p>
      </div>
    </div>
  );
}
