export interface PostalAddress {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface GeoCoordinates {
  "@type": "GeoCoordinates";
  latitude: number;
  longitude: number;
}

export interface OpeningHoursSpecification {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string | readonly string[] | string[];
  opens: string;
  closes: string;
}

export interface AggregateRating {
  "@type": "AggregateRating";
  ratingValue: string | number;
  reviewCount: string | number;
  bestRating: string | number;
  worstRating: string | number;
}

export interface ImageObject {
  "@type": "ImageObject";
  url: string;
  width?: number;
  height?: number;
}

export interface Organization {
  "@type": "Organization" | "AutomotiveBusiness" | "LocalBusiness";
  "@id"?: string;
  name: string;
  url?: string;
  logo?: ImageObject;
  telephone?: string;
  email?: string;
  address?: PostalAddress;
}

export interface WebSite {
  "@context"?: string;
  "@type": "WebSite";
  "@id": string;
  name: string;
  url: string;
  publisher: { "@id": string };
  potentialAction?: SearchAction;
}

export interface SearchAction {
  "@type": "SearchAction";
  target: {
    "@type": "EntryPoint";
    urlTemplate: string;
  };
  "query-input": string;
}

export interface WebPage {
  "@context"?: string;
  "@type": "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  "@id": string;
  name: string;
  description: string;
  url: string;
  isPartOf: { "@id": string };
  about?: { "@id": string };
  breadcrumb?: { "@id": string };
}

export interface BreadcrumbList {
  "@context"?: string;
  "@type": "BreadcrumbList";
  "@id": string;
  itemListElement: ListItem[];
}

export interface ListItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item?: string;
}

export interface AutomotiveBusiness {
  "@context"?: string;
  "@type": "AutomotiveBusiness";
  "@id": string;
  name: string;
  legalName?: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: PostalAddress;
  geo: GeoCoordinates;
  openingHours: string[];
  openingHoursSpecification: OpeningHoursSpecification[];
  priceRange: string;
  currenciesAccepted: string;
  paymentAccepted: string;
  areaServed: AreaServed[];
  serviceArea?: GeoCircle;
  aggregateRating: AggregateRating;
  logo: ImageObject;
  image: string[];
  sameAs: string[];
  hasOfferCatalog?: OfferCatalog;
}

export interface AreaServed {
  "@type": "City";
  name: string;
}

export interface GeoCircle {
  "@type": "GeoCircle";
  geoMidpoint: GeoCoordinates;
  geoRadius: string;
}

export interface OfferCatalog {
  "@type": "OfferCatalog";
  name: string;
  itemListElement: Offer[];
}

export interface Offer {
  "@type": "Offer";
  itemOffered: Service;
}

export interface Service {
  "@context"?: string;
  "@type": "Service";
  "@id"?: string;
  name: string;
  description: string;
  url?: string;
  provider?: { "@id": string };
  areaServed?: AreaServed[];
  serviceType?: string;
}

export interface ItemList {
  "@context"?: string;
  "@type": "ItemList";
  "@id"?: string;
  name?: string;
  itemListElement: ItemListElement[];
}

export interface ItemListElement {
  "@type": "ListItem";
  position: number;
  name: string;
  url: string;
  description?: string;
}

export interface SchemaGraph {
  "@context": "https://schema.org";
  "@graph": (
    | WebSite
    | WebPage
    | AutomotiveBusiness
    | BreadcrumbList
    | Service
    | ItemList
  )[];
}
