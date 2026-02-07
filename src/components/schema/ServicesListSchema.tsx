import { JsonLd } from "./JsonLd";
import {
  buildWebPage,
  buildBreadcrumbList,
  buildServicesItemList,
} from "@/lib/schema/builders";
import type { SchemaGraph } from "@/lib/schema/types";
import { services } from "@/data/services";

export function ServicesListSchema() {
  const schema: SchemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPage({
        path: "/services",
        name: "Car Repair Services London & Barnet",
        description:
          "Comprehensive car repair services in London & Barnet. Mobile mechanics for vehicle repairs, MOT testing, tyre services, fault diagnosis & more.",
        type: "CollectionPage",
      }),
      buildServicesItemList(services),
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
      ]),
    ],
  };

  return <JsonLd schema={schema} />;
}
