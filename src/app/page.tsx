import Link from "next/link";
import type { Metadata } from "next";
import { ServiceCard } from "@/components/cards/service-card";
import Image from "next/image";
import { Car, ShieldCheck, Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { services } from "@/data/services";
import { ContactSection } from "@/page-sections/contact/section";
import { HeroSection } from "@/components/hero-section";

export const metadata: Metadata = {
  title:
    "Mobile Mechanic London & Barnet | Car Repair Near Me | Vehicle Services",
  description:
    "★ 4.9/5 rated mobile mechanic in London & Barnet. Expert car repairs, MOT testing, tyre services at your location. 12+ years experience. DVSA approved. Call 07789934355 for immediate assistance.",
  keywords: [
    "mobile mechanic london",
    "mobile mechanic barnet",
    "car mechanic near me",
    "car repair london",
    "car repair barnet",
    "mechanic near me",
    "mobile garage london",
    "car servicing london",
    "mot testing london",
    "tyre replacement london",
    "vehicle repairs london",
    "auto repair london",
    "emergency car repair london",
    "mobile car mechanic",
    "car breakdown london",
    "DVSA approved mechanic",
  ],
  openGraph: {
    title: "Mobile Mechanic London & Barnet | Car Repair Near Me | 4.9★ Rated",
    description:
      "★ 4.9/5 rated mobile mechanic in London & Barnet. Expert car repairs, MOT testing, tyre services at your location. 12+ years experience. DVSA approved.",
    images: [
      {
        url: "/api/og?title=Mobile Mechanic London & Barnet&description=★ 4.9/5 rated mobile mechanic. Expert car repairs at your location. 12+ years experience.",
        width: 1200,
        height: 630,
        alt: "Mobile Mechanic London & Barnet - Car Repair Near Me",
      },
    ],
  },
  twitter: {
    title: "Mobile Mechanic London & Barnet | Car Repair Near Me | 4.9★ Rated",
    description:
      "★ 4.9/5 rated mobile mechanic in London & Barnet. Expert car repairs, MOT testing, tyre services at your location. 12+ years experience.",
    images: [
      "/api/og?title=Mobile Mechanic London & Barnet&description=★ 4.9/5 rated mobile mechanic. Expert car repairs at your location.",
    ],
  },
  alternates: {
    canonical: "https://mobilemechanicsandtyres.co.uk",
  },
};

const networks = [
  {
    image: "/assets/images/networks/brembo.jpg",
    href: "https://www.whocanfixmycar.com/networks/brembo",
    label: "Brembo",
    title: "Brembo",
  },
  {
    image: "/assets/images/networks/luk.jpg",
    href: "https://www.whocanfixmycar.com/networks/luk",
    label: "LUK",
    title: "LUK",
  },
  {
    image: "/assets/images/networks/fag.jpg",
    href: "https://www.whocanfixmycar.com/networks/fag",
    label: "FAG",
    title: "FAG",
  },
  {
    image: "/assets/images/networks/shell.jpg",
    href: "https://www.whocanfixmycar.com/networks/shell",
    label: "Shell Helix",
    title: "Shell Helix",
  },
  {
    image: "/assets/images/networks/ina.jpg",
    href: "https://www.whocanfixmycar.com/networks/ina",
    label: "INA",
    title: "INA",
  },
  {
    image: "/assets/images/networks/varta.jpg",
    href: "https://www.whocanfixmycar.com/networks/varta",
    label: "Varta",
    title: "Varta",
  },
  {
    image: "/assets/images/networks/rmif.jpg",
    href: "https://www.rmif.co.uk/",
    label: "RMI",
    title: "RMI",
  },
  {
    image: "/assets/images/networks/thimi.jpg",
    href: "https://www.theimi.org.uk/",
    label: "IMI",
    title: "IMI",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Popular Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-sky-900 font-bold text-center mb-12">
            Popular Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={JSON.stringify(service)} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-sky-900">
        <div className="container mx-auto px-4 text-white">
          <h2 className="text-4xl font-bold text-center mb-18">
            Why Choose Us?
          </h2>

          <div className="mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Star size={30} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  12+ Years Experience
                </h3>
                <p className="text-gray-200 font-light">
                  Having been in the industry for over 12 years we have a proven
                  track record in repairing mechanical, electrical and hydraulic
                  systems.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck size={30} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Accredited & Certified
                </h3>
                <p className="text-gray-200 font-light">
                  We have received accreditation from multiple trade bodies
                  including the RMI and IMI, and awards from whocanfixmycar.com.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Car size={30} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Courtesy Car</h3>
                <p className="text-gray-200 font-light">
                  We do our best to get you back on the road ASAP and offer a
                  courtesy car service when available.
                </p>
              </div>
            </div>

            {/* Brand Logos Section */}
            <div className="text-center">
              <p className="text-gray-200 mt-18 mb-12">
                Trusted by customers and certified by leading industry bodies
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8">
                {networks.map((network) => (
                  <div key={JSON.stringify(network)}>
                    <Tooltip>
                      <TooltipTrigger className="transition-opacity opacity-60 hover:opacity-100 rounded-full overflow-hidden">
                        <Link
                          href={network.href}
                          rel={"noopener noreferrer"}
                          target="_blank"
                        >
                          <Image
                            src={network.image}
                            width={100}
                            height={100}
                            alt={`Logo of ${network.title}`}
                          />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>{network.title}</TooltipContent>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
