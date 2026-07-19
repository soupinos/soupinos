import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { EB_Garamond, Manrope } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

// EB Garamond & Manrope both ship a verified Greek subset (Playfair Display
// and Montserrat do NOT — the whole site is Greek, so they can't be used).
const display = EB_Garamond({
  subsets: ["latin", "greek"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-display-raw",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin", "greek"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body-raw",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://praxiscreations.gr"),
  title: "PraxisWeb Creations — Ψηφιακές εμπειρίες με ψυχή, από την Κέρκυρα",
  description:
    "Σχεδιάζουμε και κατασκευάζουμε καλαίσθητα, γρήγορα websites και e-shops από την Κέρκυρα. Ψηφιακές εμπειρίες με ψυχή — για επιχειρήσεις που θέλουν να ξεχωρίσουν.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "el_GR",
    siteName: "PraxisWeb Creations",
    title: "PraxisWeb Creations — Ψηφιακές εμπειρίες με ψυχή",
    description: "Σχεδιασμός & ανάπτυξη websites και e-shops από την Κέρκυρα, για τον κόσμο.",
  },
};

export const viewport: Viewport = {
  themeColor: "#efe6d7",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "PraxisWeb Creations",
  description: "Σχεδιασμός & ανάπτυξη ιστοσελίδων και ηλεκτρονικών καταστημάτων.",
  areaServed: "Κέρκυρα, Ελλάδα",
  address: { "@type": "PostalAddress", addressLocality: "Κέρκυρα", addressCountry: "GR" },
  knowsAbout: ["Web Design", "Web Development", "E-Commerce", "SEO"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="el" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
