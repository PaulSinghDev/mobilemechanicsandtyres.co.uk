import { JsonLd } from "./JsonLd";
import { buildWebPage, buildBreadcrumbList } from "@/lib/schema/builders";
import type { SchemaGraph } from "@/lib/schema/types";

export function AboutSchema() {
  const schema: SchemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPage({
        path: "/about",
        name: "About Us | Award-Winning Mobile Mechanics London & Barnet",
        description:
          "Learn about London's award-winning mobile mechanics. 12+ years experience, DVSA approved, RMI & IMI certified. Multiple FixMyCar awards.",
        type: "AboutPage",
      }),
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
      ]),
    ],
  };

  return <JsonLd schema={schema} />;
}
