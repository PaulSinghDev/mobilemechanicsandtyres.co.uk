import { JsonLd } from "./JsonLd";
import {
  buildWebPage,
  buildBreadcrumbList,
  buildService,
} from "@/lib/schema/builders";
import type { SchemaGraph } from "@/lib/schema/types";

interface ServicePageSchemaProps {
  title: string;
  description: string;
  slug: string;
}

export function ServicePageSchema({
  title,
  description,
  slug,
}: ServicePageSchemaProps) {
  const schema: SchemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      buildService({
        name: title,
        description,
        slug,
      }),
      buildWebPage({
        path: `/services/${slug}`,
        name: `${title} London & Barnet`,
        description,
      }),
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: title, path: `/services/${slug}` },
      ]),
    ],
  };

  return <JsonLd schema={schema} />;
}
