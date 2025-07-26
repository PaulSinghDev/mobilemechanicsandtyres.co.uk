import { GenericHeader } from "@/components/header/generic-header";
import { services } from "@/data/services";
import { ContactSection } from "@/page-sections/contact/section";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default async function Services({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const service = services.find((service) => service.slug === slug);

  if (!service) {
    return notFound();
  }

  return (
    <div>
      <GenericHeader
        title={service.title}
        copy={service.description}
        image={service.image}
      />
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 gap-4">
          <ReactMarkdown>{service.content}</ReactMarkdown>
        </div>
      </div>
      <ContactSection className="bg-sky-200" />
    </div>
  );
}
