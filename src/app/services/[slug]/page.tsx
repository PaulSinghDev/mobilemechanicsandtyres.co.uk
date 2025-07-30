import type { Metadata } from "next";
import { GenericHeader } from "@/components/header/generic-header";
import { services } from "@/data/services";
import { ContactSection } from "@/page-sections/contact/section";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const service = services.find((service) => service.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  // Create SEO-optimized keywords based on service type
  const getServiceKeywords = (serviceSlug: string) => {
    const baseKeywords = [
      "mobile mechanic london",
      "mobile mechanic barnet",
      "car repair london",
      "car repair barnet",
      "mechanic near me",
      "DVSA approved",
      "emergency car repair",
    ];

    switch (serviceSlug) {
      case "vehicle-repair":
        return [
          ...baseKeywords,
          "vehicle repair london",
          "vehicle repair barnet",
          "car repair services",
          "engine repair london",
          "brake repair london",
          "transmission repair",
          "suspension repair",
          "exhaust repair london",
          "automotive repair",
          "car maintenance london",
        ];
      case "vehicle-fault-diagnosis":
        return [
          ...baseKeywords,
          "car diagnostics london",
          "vehicle diagnostics barnet",
          "fault diagnosis london",
          "car diagnostic service",
          "engine diagnostics",
          "check engine light",
          "OBD scanning",
          "electrical fault diagnosis",
          "computer diagnostics",
        ];
      case "vehicle-mot-service":
        return [
          ...baseKeywords,
          "mot testing london",
          "mot testing barnet",
          "mot centre london",
          "mot test near me",
          "DVSA approved mot",
          "mot failure repairs",
          "car servicing london",
          "annual mot test",
          "vehicle servicing",
        ];
      case "tyre-replacement-repair":
        return [
          ...baseKeywords,
          "tyre replacement london",
          "tyre repair london",
          "mobile tyre fitting",
          "puncture repair london",
          "wheel alignment london",
          "tyre balancing",
          "emergency tyre replacement",
          "cheap tyres london",
          "tyre service barnet",
        ];
      case "vehicle-collection-drop-off":
        return [
          ...baseKeywords,
          "car collection service",
          "vehicle collection london",
          "mobile garage collection",
          "car drop off service",
          "courtesy car service",
          "vehicle transport london",
          "garage collection service",
        ];
      default:
        return baseKeywords;
    }
  };

  const keywords = getServiceKeywords(service.slug);

  // Create location-specific title and description
  const locationSuffix = "London & Barnet";
  const seoTitle = `${service.title} ${locationSuffix} | Mobile Mechanic Services`;
  const seoDescription = `Professional ${service.title.toLowerCase()} services in ${locationSuffix}. ${
    service.description
  } DVSA approved mobile mechanics. Call 07789934355`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(
            service.title + " " + locationSuffix
          )}&description=${encodeURIComponent(service.description)}`,
          width: 1200,
          height: 630,
          alt: `${service.title} ${locationSuffix} - Mobile Mechanic Services`,
        },
      ],
    },
    twitter: {
      title: seoTitle,
      description: seoDescription,
      images: [
        `/api/og?title=${encodeURIComponent(
          service.title + " " + locationSuffix
        )}&description=${encodeURIComponent(service.description)}`,
      ],
    },
    alternates: {
      canonical: `https://mobilemechanicsandtyres.co.uk/services/${service.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: Props) {
  const slug = (await params).slug;
  const service = services.find((service) => service.slug === slug);

  if (!service) {
    return notFound();
  }

  return (
    <div>
      <GenericHeader
        title={service.title}
        copy={service.description}
        image={service.image}
      />
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 gap-4">
          <ReactMarkdown>{service.content}</ReactMarkdown>
        </div>
      </div>
      <ContactSection className="bg-sky-200" />
    </div>
  );
}
