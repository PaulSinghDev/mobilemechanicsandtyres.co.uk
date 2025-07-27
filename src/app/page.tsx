"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CallbackForm } from "@/components/callback-form";
import { useRef } from "react";
import { ServiceCard } from "@/components/cards/service-card";
import Image from "next/image";
import { MapPinHouse, ShieldCheck, Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { services } from "@/data/services";
import { ContactSection } from "@/page-sections/contact/section";

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
  const header = useRef<HTMLDivElement>(null);

  return (
    <div>
      {/* Hero Section */}
      <header className="text-white py-40 relative" ref={header}>
        <div
          className={[
            "bg-[url('/assets/images/header-home.jpg')] absolute top-0 left-0 w-full h-full bg-cover -z-1",
            "before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary before:opacity-80",
          ].join(" ")}
        ></div>
        <div className="container flex flex-col md:flex-row mx-auto px-4 text-center gap-12">
          <div className="flex flex-col justify-center">
            <h1 className="text-6xl font-extrabold tracking-tight mb-4">
              Mobile Mechanic and Tyres
            </h1>
            <p className="text-xl mb-8">
              Taking the hassle out of vehicle repairs at a fair price.
            </p>

            {/* Rating Display */}
            <div className="flex items-center justify-center mb-8">
              <div className="px-6 py-3 rounded-lg">
                <div className="flex flex-col gap-4 items-center space-x-2">
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-7 h-7 md:w-12 md:h-12 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L0 6.91l6.564-.955L10 0l3.436 5.955L20 6.91l-5.245 4.635L15.878 18z" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold">4.9/5</span>
                    <span className="font-bold">(450+ reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* book */}
          <div className="container mx-auto px-4 max-w-100">
            <Card className="max-w-md mx-auto bg-gray-800/80 rounded-lg shadow-md pt-0 overflow-hidden border-none">
              <CardHeader className="bg-gradient-to-br from-sky-800 to to-sky-900 px-8 py-4 flex items-center justify-center text-white">
                <h2 className="text-2xl font-semibold text-center">
                  Request a Callback
                </h2>
              </CardHeader>
              <CardContent className="px-0">
                <CallbackForm />
              </CardContent>

              <CardFooter>
                <p className="text-xs text-gray-300 text-center">
                  This site is protected by reCAPTCHA and the Google Privacy
                  Policy and Terms of Service apply.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </header>

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
                  <MapPinHouse size={30} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Mobile Service</h3>
                <p className="text-gray-200 font-light">
                  We have a fully equipped workshop with high precision tools to
                  aid us with repairs and fault diagnosis, and we come to you.
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
