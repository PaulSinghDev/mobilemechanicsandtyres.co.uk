import { ContactForm } from "@/components/contact-form";
import { Map } from "@/components/map";
import { cn } from "@/lib/utils";

export function ContactSection({ className }: { className?: string }) {
  return (
    <section className={cn("bg-sky-50", className)}>
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-full w-full relative">
            <Map />
          </div>
          <div className="px-8 py-12">
            <h2 className="text-4xl font-bold text-center my-4">Contact Us</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
