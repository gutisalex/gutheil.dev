import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Legal notice and contact information",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ImpressumPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen pt-16">
        <main className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
          <h1 className="mb-8 text-4xl font-bold tracking-tight">Impressum</h1>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">
                Angaben gemäß § 5 TMG
              </h2>
              <p className="mb-2">
                <strong>Alexander Gutheil</strong>
              </p>
              <p className="mb-2">In der Hofstatt 24</p>
              <p className="mb-4">34134 Kassel</p>
              <p className="mb-2">
                <strong>Kontakt:</strong>
              </p>
              <p>
                E-Mail:{" "}
                <a
                  href={`mailto:${process.env.CONTACT_EMAIL || ""}`}
                  className="text-primary hover:underline"
                >
                  {process.env.CONTACT_EMAIL || "Kontakt per E-Mail"}
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">
                Verantwortlich für den Inhalt
              </h2>
              <p>Alexander Gutheil</p>
              <p>In der Hofstatt 24</p>
              <p>34134 Kassel</p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">
                Haftungsausschluss
              </h2>

              <h3 className="mb-3 text-xl font-semibold">
                Haftung für Inhalte
              </h3>
              <p className="mb-4">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter
                sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen
                Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
                bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen oder nach Umständen zu forschen, die
                auf eine rechtswidrige Tätigkeit hinweisen.
              </p>

              <h3 className="mb-3 text-xl font-semibold">Haftung für Links</h3>
              <p className="mb-4">
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf
                deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
                diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
                wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
                überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
                Verlinkung nicht erkennbar. Eine permanente inhaltliche
                Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
                Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
                Bekanntwerden von Rechtsverstößen werden wir derartige Links
                umgehend entfernen.
              </p>

              <h3 className="mb-3 text-xl font-semibold">Urheberrecht</h3>
              <p className="mb-4">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
                schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                Downloads und Kopien dieser Seite sind nur für den privaten,
                nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf
                dieser Seite nicht vom Betreiber erstellt wurden, werden die
                Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
                Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
                Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
                entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverstößen
                werden wir derartige Inhalte umgehend entfernen.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/" className="text-primary hover:underline text-sm">
              ← Zurück zur Startseite
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
