import type { HeroSection } from "@/lib/content";

type StructuredDataProps = {
  hero: HeroSection;
};

export function StructuredData({ hero }: StructuredDataProps) {
  const name = hero.name ?? "";
  const title = hero.title ?? "";
  const linkedInUrl = hero.linkedInUrl ?? "";
  const location = hero.location ?? "";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: title,
    // Email removed from structured data to prevent spam bot scraping
    // Contact information is available through the contact section
    url: linkedInUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: location,
    },
    sameAs: [linkedInUrl],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON.stringify is safe here
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
