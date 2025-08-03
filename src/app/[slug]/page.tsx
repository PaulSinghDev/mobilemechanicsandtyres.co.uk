import type { Metadata } from "next";
import { pages } from "@/data/pages";
import { notFound } from "next/navigation";
import { GenericPageView } from "@/views/generic-page-view";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const pageData = pages.find((page) => page.slug === slug);

  if (!pageData) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  // Create SEO-optimized metadata based on page type
  const getPageMetadata = (
    pageSlug: string,
    pageData: (typeof pages)[number]
  ) => {
    const baseLocation = "London & Barnet";

    switch (pageSlug) {
      case "about":
        return {
          title: `About Us | Award-Winning Mobile Mechanics ${baseLocation} | 12+ Years Experience`,
          description: `Learn about London's award-winning mobile mechanics. 12+ years experience, DVSA approved, RMI & IMI certified. Multiple FixMyCar awards. Professional vehicle repairs ${baseLocation}.`,
          keywords: [
            "mobile mechanic london",
            "mobile mechanic barnet",
            "about mobile mechanics",
            "award winning garage london",
            "DVSA approved mechanic",
            "RMI certified mechanic",
            "IMI qualified mechanic",
            "experienced car mechanic",
            "professional vehicle repairs",
            "london garage awards",
            "FixMyCar awards",
            "12 years experience mechanic",
            "qualified automotive technician",
            "certified vehicle specialist",
          ],
        };
      case "contact":
        return {
          title: `Contact Us | Mobile Mechanics ${baseLocation} | Get Quote | 07789934355`,
          description: `Contact London's trusted mobile mechanics. Get instant quotes for car repairs, MOT testing, tyre services. Call 07789934355 or book online. Serving ${baseLocation} and surrounding areas.`,
          keywords: [
            "contact mobile mechanic london",
            "contact car mechanic barnet",
            "mobile mechanic phone number",
            "mobile mechanic contact details",
            "car repair quote london",
            "mechanic near me contact",
            "emergency car repair contact",
            "mobile garage contact",
            "vehicle repair quote",
            "car servicing contact",
            "MOT booking london",
            "07789934355",
            "mobile mechanic barnet en4",
          ],
        };
      case "terms":
        return {
          title: `Terms & Conditions | Mobile Mechanics ${baseLocation} | Service Terms`,
          description: `Read our terms and conditions for mobile mechanic services in ${baseLocation}. Comprehensive coverage of our vehicle repair, MOT testing, and tyre service policies.`,
          keywords: [
            "mobile mechanic terms",
            "car repair terms conditions",
            "vehicle service terms",
            "MOT testing terms",
            "garage terms conditions",
            "automotive service terms",
            "repair warranty terms",
            "mobile mechanic policy",
          ],
        };
      case "privacy-policy":
        return {
          title: `Privacy Policy | Mobile Mechanics ${baseLocation} | Data Protection`,
          description: `Our privacy policy explains how we handle your personal data when providing mobile mechanic services in ${baseLocation}. GDPR compliant data protection.`,
          keywords: [
            "mobile mechanic privacy",
            "garage privacy policy",
            "automotive data protection",
            "vehicle service privacy",
            "GDPR compliance garage",
            "customer data protection",
            "mechanic privacy policy",
          ],
        };
      default:
        return {
          title: `${pageData.title} | Mobile Mechanics ${baseLocation}`,
          description: pageData.description,
          keywords: [
            "mobile mechanic london",
            "mobile mechanic barnet",
            "car repair london",
            "vehicle services",
          ],
        };
    }
  };

  const pageMetadata = getPageMetadata(pageData.slug, pageData);

  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
    keywords: pageMetadata.keywords,
    openGraph: {
      title: pageMetadata.title,
      description: pageMetadata.description,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(
            pageData.title
          )}&description=${encodeURIComponent(pageMetadata.description)}`,
          width: 1200,
          height: 630,
          alt: `${pageData.title} - Mobile Mechanics London & Barnet`,
        },
      ],
    },
    twitter: {
      title: pageMetadata.title,
      description: pageMetadata.description,
      images: [
        `/api/og?title=${encodeURIComponent(
          pageData.title
        )}&description=${encodeURIComponent(pageMetadata.description)}`,
      ],
    },
    alternates: {
      canonical: `https://mobilemechanicsandtyres.co.uk/${pageData.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function GenericPage({ params }: Props) {
  const slug = (await params).slug;

  const pageData = pages.find((page) => page.slug === slug);
  if (!pageData) {
    return notFound();
  }

  return (
    <GenericPageView
      title={pageData.title}
      description={pageData.description}
      headerImage={pageData.headerImage}
      content={pageData.content}
    />
  );
}
