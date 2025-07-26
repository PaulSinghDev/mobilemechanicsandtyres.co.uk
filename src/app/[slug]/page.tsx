import { GenericHeader } from "@/components/header/generic-header";
import { ContactSection } from "@/page-sections/contact/section";
import { pages } from "@/data/pages";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default async function GenericPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const pageData = pages.find((page) => page.slug === slug);
  if (!pageData) {
    return notFound();
  }

  return (
    <div>
      <GenericHeader
        title={pageData.title}
        copy={pageData.description}
        image={pageData.headerImage}
      />

      <div className="container max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-24 flex flex-col gap-4">
        <ReactMarkdown>{pageData.content}</ReactMarkdown>
      </div>
      <ContactSection className="bg-sky-200" />
    </div>
  );
}
