export function StructuredData() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: "Mobile Mechanics and Tyres",
    description:
      "Professional mobile mechanic services in London & Barnet. Expert car repairs, MOT testing, tyre services & vehicle maintenance at your location.",
    url: "https://mobilemechanicsandtyres.co.uk",
    telephone: "07789934355",
    email: "info@mobilemechanicsandtyres.co.uk",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 4, Red Rose Trading Estate, Lancaster Rd",
      addressLocality: "Barnet",
      addressRegion: "London",
      postalCode: "EN4 8BZ",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.6518,
      longitude: -0.1754,
    },
    openingHours: ["Mo-Fr 08:00-18:00", "Sa 08:00-16:00"],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 51.6518,
        longitude: -0.1754,
      },
      geoRadius: "50000",
    },
    priceRange: "£",
    currenciesAccepted: "GBP",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    founder: {
      "@type": "Person",
      name: "Mobile Mechanics and Tyres",
    },
    areaServed: [
      {
        "@type": "City",
        name: "London",
      },
      {
        "@type": "City",
        name: "Barnet",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Automotive Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vehicle Repair",
            description:
              "Comprehensive vehicle repair services including engine, brake, transmission, and electrical repairs",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "MOT Testing",
            description:
              "DVSA approved MOT testing for cars, vans, and motorcycles",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tyre Services",
            description:
              "Mobile tyre replacement, puncture repair, wheel alignment, and balancing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vehicle Diagnostics",
            description:
              "Advanced fault diagnosis using latest OBD scanners and diagnostic equipment",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Collection & Drop-off Service",
            description:
              "Free vehicle collection and drop-off service across London",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "450",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        author: {
          "@type": "Person",
          name: "Satisfied Customer",
        },
        reviewBody:
          "Excellent mobile mechanic service. Professional, reliable, and competitively priced.",
      },
    ],
    sameAs: [
      "https://www.whocanfixmycar.com/",
      "https://www.rmif.co.uk/",
      "https://www.theimi.org.uk/",
    ],
    logo: {
      "@type": "ImageObject",
      url: "https://mobilemechanicsandtyres.co.uk/api/og?title=Mobile Mechanics and Tyres&description=Professional mobile mechanic services in London",
      width: 1200,
      height: 630,
    },
    image: [
      "https://mobilemechanicsandtyres.co.uk/assets/images/header-home.jpg",
      "https://mobilemechanicsandtyres.co.uk/assets/images/services/vehicle-repair.jpg",
      "https://mobilemechanicsandtyres.co.uk/assets/images/services/mot-servicing.jpg",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessSchema),
      }}
    />
  );
}
