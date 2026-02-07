export const BUSINESS = {
  name: "Mobile Mechanics and Tyres",
  legalName: "Mobile Mechanics and Tyres",
  url: "https://mobilemechanicsandtyres.co.uk",
  telephone: "+447789934355",
  email: "info@mobilemechanicsandtyres.co.uk",
  description:
    "Professional mobile mechanic services in London & Barnet. Expert car repairs, MOT testing, tyre services & vehicle maintenance at your location.",
  foundingDate: "2013",
  address: {
    streetAddress: "Unit 4, Red Rose Trading Estate, Lancaster Rd",
    addressLocality: "Barnet",
    addressRegion: "London",
    postalCode: "EN4 8BZ",
    addressCountry: "GB",
  },
  geo: {
    latitude: 51.6518,
    longitude: -0.1754,
  },
  hours: {
    weekdays: "Mo-Fr 08:00-18:00",
    saturday: "Sa 08:00-16:00",
  },
  openingHoursSpecification: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "16:00",
    },
  ],
  rating: {
    value: 4.9,
    count: 450,
    bestRating: 5,
    worstRating: 1,
  },
  priceRange: "££",
  currenciesAccepted: "GBP",
  paymentAccepted: "Cash, Credit Card, Debit Card, Bank Transfer",
  areaServed: ["London", "Barnet"],
  serviceRadius: "50000",
  sameAs: [
    "https://www.whocanfixmycar.com/",
    "https://www.rmif.co.uk/",
    "https://www.theimi.org.uk/",
  ],
  logo: {
    url: "https://mobilemechanicsandtyres.co.uk/api/og?title=Mobile Mechanics and Tyres&description=Professional mobile mechanic services in London",
    width: 1200,
    height: 630,
  },
  images: [
    "https://mobilemechanicsandtyres.co.uk/assets/images/header-home.jpg",
    "https://mobilemechanicsandtyres.co.uk/assets/images/services/vehicle-repair.jpg",
    "https://mobilemechanicsandtyres.co.uk/assets/images/services/mot-servicing.jpg",
  ],
} as const;

export const SERVICES_CATALOG = [
  {
    name: "Vehicle Repair",
    description:
      "Comprehensive vehicle repair services including engine, brake, transmission, and electrical repairs",
    url: "https://mobilemechanicsandtyres.co.uk/services/vehicle-repair",
  },
  {
    name: "MOT Testing",
    description:
      "DVSA approved MOT testing for cars, vans, and motorcycles",
    url: "https://mobilemechanicsandtyres.co.uk/services/vehicle-mot-service",
  },
  {
    name: "Tyre Services",
    description:
      "Mobile tyre replacement, puncture repair, wheel alignment, and balancing",
    url: "https://mobilemechanicsandtyres.co.uk/services/tyre-replacement-repair",
  },
  {
    name: "Vehicle Diagnostics",
    description:
      "Advanced fault diagnosis using latest OBD scanners and diagnostic equipment",
    url: "https://mobilemechanicsandtyres.co.uk/services/vehicle-fault-diagnosis",
  },
  {
    name: "Collection & Drop-off Service",
    description: "Free vehicle collection and drop-off service across London",
    url: "https://mobilemechanicsandtyres.co.uk/services/vehicle-collection-drop-off",
  },
] as const;
