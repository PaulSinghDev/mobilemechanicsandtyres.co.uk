import type { SchemaGraph } from "@/lib/schema/types";

interface JsonLdProps {
  schema: SchemaGraph;
}

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
