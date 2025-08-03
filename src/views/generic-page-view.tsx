import ReactMarkdown from "react-markdown";
import { GenericHeader } from "@/components/header/generic-header";
import { ContactSection } from "@/page-sections/contact/section";

export function GenericPageView({
  title,
  description,
  headerImage,
  content,
}: {
  title: string;
  description?: string;
  headerImage?: string;
  content: string;
}) {
  return (
    <div>
      <GenericHeader title={title} copy={description} image={headerImage} />

      <div className="container max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-24 flex flex-col gap-4">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <ContactSection className="bg-sky-200" />
    </div>
  );
}
