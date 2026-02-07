import { JsonLd } from "./JsonLd";
import { buildWebPage, buildBreadcrumbList } from "@/lib/schema/builders";
import type { SchemaGraph } from "@/lib/schema/types";

interface GenericPageSchemaProps {
  title: string;
  description: string;
  slug: string;
}

export function GenericPageSchema({
  title,
  description,
  slug,
}: GenericPageSchemaProps) {
  const schema: SchemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPage({
        path: `/${slug}`,
        name: title,
        description,
      }),
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: title, path: `/${slug}` },
      ]),
    ],
  };

  return <JsonLd schema={schema} />;
}
