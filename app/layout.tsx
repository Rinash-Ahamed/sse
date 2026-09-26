import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import HashScroll from "@/components/layout/HashScroll";
import Footer from "@/components/layout/Footer";
import WhatsAppBubble from "@/components/layout/WhatsAppBubble";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://www.shreesanjayequipments.com"),
  title: {
    default: "Shree Sanjay Equipments | Construction Equipment, Coimbatore",
    template: "%s | Shree Sanjay Equipments",
  },
  description:
    "Construction equipment, repairs and servicing from Shree Sanjay Equipments, Coimbatore, Tamil Nadu.",
  keywords: [
    "Shree Sanjay Equipments",
    "Construction Equipments Coimbatore",
    "Construction Equipments Supplier Coimbatore",
    "Construction Machinery Coimbatore",
    "Concrete Equipment Coimbatore",
    "Compaction Equipment Coimbatore",
    "Monkey Hoist Coimbatore",
    "Sand Screening Machine Coimbatore",
  ],
  openGraph: {
    title: "Shree Sanjay Equipments | Construction Equipment, Coimbatore",
    description:
      "Construction equipment, repairs and servicing from Shree Sanjay Equipments, Coimbatore, Tamil Nadu.",
    url: "https://www.shreesanjayequipments.com",
    siteName: "Shree Sanjay Equipments",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shree Sanjay Equipments | Construction Equipment, Coimbatore",
    description:
      "Construction equipment, repairs and servicing from Shree Sanjay Equipments, Coimbatore, Tamil Nadu.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Shree Sanjay Equipments",
  foundingDate: "2004",
  image: "https://www.shreesanjayequipments.com/images/brand/logo-full.png",
  telephone: ["+91 98422 30721", "+91 98421 06090"],
  email: "sanjayequipments@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "52/1, Avinashi Road, R.G. Pudur, Chinniampalayam Post",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    postalCode: "641062",
    addressCountry: "IN",
  },
  url: "https://www.shreesanjayequipments.com",
  sameAs: ["https://www.instagram.com/shreesanjayequipments"],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Shree Sanjay Equipments",
  url: "https://www.shreesanjayequipments.com",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{if(location.pathname==='/'&&!location.hash&&!matchMedia('(prefers-reduced-motion: reduce)').matches){var style=document.createElement('style');style.id='sse-intro-initial';style.textContent='#sse-home-intro{display:flex}';document.head.appendChild(style)}}catch(e){}` }} />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <Navbar />
        <HashScroll />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppBubble />
      </body>
    </html>
  );
}
