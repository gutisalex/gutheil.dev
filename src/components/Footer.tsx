import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <p className="font-mono text-xs tracking-wide text-muted-foreground">
          © {new Date().getFullYear()} Alexander Gutheil
        </p>
        <Link
          href="/impressum"
          className="text-sm text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
        >
          Impressum
        </Link>
      </div>
    </footer>
  );
}
