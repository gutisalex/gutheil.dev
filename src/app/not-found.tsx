import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary/80">
          404
        </p>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Page not found
          </h1>
          <p className="text-pretty text-muted-foreground">
            The page you requested could not be found. It may have been moved,
            deleted, or the URL might be incorrect.
          </p>
        </div>
        <Button render={<Link href="/" />} size="lg" className="shadow-premium">
          Back to home
        </Button>
      </div>
    </div>
  );
}
