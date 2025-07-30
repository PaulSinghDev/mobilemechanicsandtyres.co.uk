import { MetadataRoute } from "next";
import { services } from "@/data/services";
import { pages } from "@/data/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mobilemechanicsandtyres.co.uk";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  // Service pages
  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Generic pages (About, Contact, Terms, Privacy)
  const genericPages = pages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency:
      page.slug === "contact" ? ("monthly" as const) : ("yearly" as const),
    priority: page.slug === "contact" ? 0.7 : 0.5,
  }));

  return [...staticPages, ...servicePages, ...genericPages];
}
