import { JsonLd } from "./JsonLd";
import {
  buildAutomotiveBusiness,
  buildWebPage,
  buildBreadcrumbList,
} from "@/lib/schema/builders";
import type { SchemaGraph } from "@/lib/schema/types";

export function ContactSchema() {
  const schema: SchemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPage({
        path: "/contact",
        name: "Contact Us | Mobile Mechanics London & Barnet",
        description:
          "Contact London's trusted mobile mechanics. Get instant quotes for car repairs, MOT testing, tyre services. Call 07789934355 or book online.",
        type: "ContactPage",
      }),
      buildAutomotiveBusiness(),
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Contact Us", path: "/contact" },
      ]),
    ],
  };

  return <JsonLd schema={schema} />;
}
