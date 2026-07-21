import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Alexander Gutheil. All rights reserved.
          </p>
          <Link
            href="/impressum"
            className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
          >
            Impressum
          </Link>
        </div>
      </div>
    </footer>
  );
}
