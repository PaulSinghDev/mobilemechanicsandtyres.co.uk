import type { Metadata } from "next";
import { ServiceCard } from "@/components/cards/service-card";
import { GenericHeader } from "@/components/header/generic-header";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title:
    "Car Repair Services London & Barnet | Mobile Mechanic Services | MOT & Tyres",
  description:
    "Comprehensive car repair services in London & Barnet. Mobile mechanics for vehicle repairs, MOT testing, tyre services, fault diagnosis & more. DVSA approved. Call 07789934355",
  keywords: [
    "car repair services london",
    "car repair services barnet",
    "mobile mechanic services",
    "vehicle repair london",
    "vehicle repair barnet",
    "mot testing london",
    "mot testing barnet",
    "tyre replacement london",
    "tyre repair london",
    "vehicle fault diagnosis",
    "car servicing london",
    "auto repair services",
    "mechanic services near me",
    "collection drop off service",
    "emergency car repair",
    "brake repair london",
    "engine repair london",
    "transmission repair london",
    "DVSA approved services",
  ],
  openGraph: {
    title: "Car Repair Services London & Barnet | Mobile Mechanic Services",
    description:
      "Comprehensive car repair services in London & Barnet. Mobile mechanics for vehicle repairs, MOT testing, tyre services, fault diagnosis & more. DVSA approved.",
    images: [
      {
        url: "/api/og?title=Car Repair Services London & Barnet&description=Comprehensive mobile mechanic services. Vehicle repairs, MOT testing, tyre services & more.",
        width: 1200,
        height: 630,
        alt: "Car Repair Services London & Barnet - Mobile Mechanic Services",
      },
    ],
  },
  twitter: {
    title: "Car Repair Services London & Barnet | Mobile Mechanic Services",
    description:
      "Comprehensive car repair services in London & Barnet. Mobile mechanics for vehicle repairs, MOT testing, tyre services, fault diagnosis & more.",
    images: [
      "/api/og?title=Car Repair Services London & Barnet&description=Comprehensive mobile mechanic services. Vehicle repairs, MOT testing, tyre services & more.",
    ],
  },
  alternates: {
    canonical: "https://mobilemechanicsandtyres.co.uk/services",
  },
};

export default function Services() {
  return (
    <div>
      <GenericHeader
        title="Services"
        copy="View our most popular services. If you require something which isn't listed below please get in contact as we may still be able to help you"
        image="/assets/images/header-services.jpg"
      />
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={JSON.stringify(service)} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}
