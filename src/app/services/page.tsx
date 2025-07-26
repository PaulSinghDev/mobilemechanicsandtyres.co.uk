import { ServiceCard } from "@/components/cards/service-card";
import { GenericHeader } from "@/components/header/generic-header";
import { services } from "@/data/services";

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
