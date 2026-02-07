import { BUSINESS, SERVICES_CATALOG } from "./constants";
import type {
  WebSite,
  WebPage,
  AutomotiveBusiness,
  BreadcrumbList,
  ListItem,
  Service,
  ItemList,
  ItemListElement,
  OpeningHoursSpecification,
} from "./types";

const BASE_URL = BUSINESS.url;
const WEBSITE_ID = `${BASE_URL}/#website`;
const BUSINESS_ID = `${BASE_URL}/#localbusiness`;

export function buildWebSite(): WebSite {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: BUSINESS.name,
    url: BASE_URL,
    publisher: { "@id": BUSINESS_ID },
  };
}

export function buildAutomotiveBusiness(): AutomotiveBusiness {
  return {
    "@type": "AutomotiveBusiness",
    "@id": BUSINESS_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: BASE_URL,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      ...BUSINESS.geo,
    },
    openingHours: [BUSINESS.hours.weekdays, BUSINESS.hours.saturday],
    openingHoursSpecification: BUSINESS.openingHoursSpecification.map(
      (spec): OpeningHoursSpecification => ({
        "@type": "OpeningHoursSpecification",
        ...spec,
      })
    ),
    priceRange: BUSINESS.priceRange,
    currenciesAccepted: BUSINESS.currenciesAccepted,
    paymentAccepted: BUSINESS.paymentAccepted,
    areaServed: BUSINESS.areaServed.map((city) => ({
      "@type": "City",
      name: city,
    })),
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        ...BUSINESS.geo,
      },
      geoRadius: BUSINESS.serviceRadius,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.rating.value,
      reviewCount: BUSINESS.rating.count,
      bestRating: BUSINESS.rating.bestRating,
      worstRating: BUSINESS.rating.worstRating,
    },
    logo: {
      "@type": "ImageObject",
      ...BUSINESS.logo,
    },
    image: [...BUSINESS.images],
    sameAs: [...BUSINESS.sameAs],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Automotive Services",
      itemListElement: SERVICES_CATALOG.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          url: service.url,
        },
      })),
    },
  };
}

export function buildWebPage(options: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
}): WebPage {
  const { path, name, description, type = "WebPage" } = options;
  const url = path === "/" ? BASE_URL : `${BASE_URL}${path}`;

  return {
    "@type": type,
    "@id": `${url}/#webpage`,
    name,
    description,
    url,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    breadcrumb: { "@id": `${url}/#breadcrumb` },
  };
}

export function buildBreadcrumbList(
  items: Array<{ name: string; path?: string }>
): BreadcrumbList {
  const lastItem = items[items.length - 1];
  const url = lastItem.path
    ? lastItem.path === "/"
      ? BASE_URL
      : `${BASE_URL}${lastItem.path}`
    : BASE_URL;

  return {
    "@type": "BreadcrumbList",
    "@id": `${url}/#breadcrumb`,
    itemListElement: items.map(
      (item, index): ListItem => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        ...(item.path !== undefined && {
          item: item.path === "/" ? BASE_URL : `${BASE_URL}${item.path}`,
        }),
      })
    ),
  };
}

export function buildService(options: {
  name: string;
  description: string;
  slug: string;
}): Service {
  const { name, description, slug } = options;
  const url = `${BASE_URL}/services/${slug}`;

  return {
    "@type": "Service",
    "@id": `${url}/#service`,
    name,
    description,
    url,
    provider: { "@id": BUSINESS_ID },
    areaServed: BUSINESS.areaServed.map((city) => ({
      "@type": "City",
      name: city,
    })),
    serviceType: "Automotive Repair",
  };
}

export function buildServicesItemList(
  services: Array<{
    title: string;
    description: string;
    slug: string;
  }>
): ItemList {
  return {
    "@type": "ItemList",
    "@id": `${BASE_URL}/services/#itemlist`,
    name: "Automotive Services",
    itemListElement: services.map(
      (service, index): ItemListElement => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        url: `${BASE_URL}/services/${service.slug}`,
        description: service.description,
      })
    ),
  };
}

export { WEBSITE_ID, BUSINESS_ID, BASE_URL };
