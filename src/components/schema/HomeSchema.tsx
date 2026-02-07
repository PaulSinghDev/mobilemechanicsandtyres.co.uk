import { JsonLd } from "./JsonLd";
import {
  buildWebSite,
  buildAutomotiveBusiness,
  buildWebPage,
  buildBreadcrumbList,
} from "@/lib/schema/builders";
import type { SchemaGraph } from "@/lib/schema/types";

export function HomeSchema() {
  const schema: SchemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebSite(),
      buildAutomotiveBusiness(),
      buildWebPage({
        path: "/",
        name: "Mobile Mechanic London & Barnet | Car Repair Near Me",
        description:
          "Professional mobile mechanic services in London & Barnet. Expert car repairs, MOT testing, tyre services at your location. 12+ years experience. DVSA approved.",
      }),
      buildBreadcrumbList([{ name: "Home", path: "/" }]),
    ],
  };

  return <JsonLd schema={schema} />;
}
