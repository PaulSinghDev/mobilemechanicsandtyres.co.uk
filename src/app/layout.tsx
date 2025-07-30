import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mobilemechanicsandtyres.co.uk"),
  title: {
    default:
      "Mobile Mechanics and Tyres | Car Mechanic London, Barnet | Vehicle Repairs & MOT",
    template: "%s | Mobile Mechanics and Tyres",
  },
  description:
    "Professional mobile mechanic services in London & Barnet. Expert car repairs, MOT testing, tyre services & vehicle maintenance at your location. DVSA approved, RMI & IMI certified. Call 07789934355",
  keywords: [
    "mobile mechanic london",
    "car mechanic barnet",
    "mechanic near me",
    "car repair london",
    "car repair barnet",
    "mobile garage london",
    "mot testing london",
    "mot testing barnet",
    "vehicle repairs london",
    "tyre replacement london",
    "car servicing london",
    "mobile car mechanic",
    "auto repair london",
    "car maintenance london",
    "vehicle diagnostics london",
    "emergency car repair",
    "collection drop off service",
    "DVSA approved garage",
    "RMI certified mechanic",
    "IMI qualified technician",
  ],
  authors: [{ name: "Mobile Mechanics and Tyres" }],
  creator: "Mobile Mechanics and Tyres",
  publisher: "Mobile Mechanics and Tyres",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      {
        url: "/apple-touch-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/apple-touch-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#0C4A6E",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://mobilemechanicsandtyres.co.uk",
    siteName: "Mobile Mechanics and Tyres",
    title:
      "Mobile Mechanics and Tyres | Car Mechanic London, Barnet | Vehicle Repairs & MOT",
    description:
      "Professional mobile mechanic services in London & Barnet. Expert car repairs, MOT testing, tyre services & vehicle maintenance at your location. DVSA approved, RMI & IMI certified.",
    images: [
      {
        url: "/api/og?title=Mobile Mechanics and Tyres&description=Professional mobile mechanic services in London & Barnet",
        width: 1200,
        height: 630,
        alt: "Mobile Mechanics and Tyres - London's Trusted Mobile Mechanics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Mobile Mechanics and Tyres | Car Mechanic London, Barnet | Vehicle Repairs & MOT",
    description:
      "Professional mobile mechanic services in London & Barnet. Expert car repairs, MOT testing, tyre services & vehicle maintenance at your location.",
    images: [
      "/api/og?title=Mobile Mechanics and Tyres&description=Professional mobile mechanic services in London & Barnet",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code-here", // Replace with actual verification code
  },
  alternates: {
    canonical: "https://mobilemechanicsandtyres.co.uk",
  },
  other: {
    "geo.region": "GB-LND",
    "geo.placename": "London, Barnet",
    "geo.position": "51.6518;-0.1754", // Approximate coordinates for Barnet
    ICBM: "51.6518, -0.1754",
    "business:contact_data:street_address":
      "Unit 4, Red Rose Trading Estate, Lancaster Rd",
    "business:contact_data:locality": "Barnet",
    "business:contact_data:region": "London",
    "business:contact_data:postal_code": "EN4 8BZ",
    "business:contact_data:country_name": "United Kingdom",
    "business:contact_data:phone_number": "07789934355",
    "business:contact_data:email": "info@mobilemechanicsandtyres.co.uk",
    "msapplication-TileColor": "#0C4A6E",
    "msapplication-TileImage": "/mstile-144x144.png",
    "theme-color": "#0C4A6E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="canonical" href="https://mobilemechanicsandtyres.co.uk" />
        <StructuredData />
      </head>
      <body className={`${notoSans.className} antialiased bg-gray-50`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
