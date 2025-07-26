import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-sky-950 text-sky-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div
              className="space-y-2 text-sm"
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <div className="flex flex-col">
                <span itemProp="streetAddress">
                  Unit 4 <br />
                  Red Rose Trading Estate <br /> Lancaster Rd
                </span>
                <span itemProp="addressLocality">London</span>
                <span itemProp="addressRegion">Barnet</span>
                <span itemProp="postalCode">EN4 8BZ</span>
              </div>

              <div itemProp="telephone">
                <a href="tel:+447789934355" className="hover:underline">
                  07789934355
                </a>
              </div>
            </div>
          </div>

          {/* Open hours */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Open Hours</h3>
            <div className="space-y-1 text-sm">
              <div>Mon - Fri: 09:00 - 18:00</div>
              <div>Saturday: 09:00 - 18:00</div>
              <div>Sunday: Closed</div>
            </div>
          </div>

          {/* Useful links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links</h3>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block hover:underline">
                About
              </Link>
              <Link href="/contact" className="block hover:underline">
                Contact
              </Link>
              <Link href="/services" className="block hover:underline">
                Services
              </Link>
              <Link
                href="/assets/pdf/brochure.pdf"
                className="block hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Brochure
              </Link>
            </div>
          </div>

          {/* Logos placeholder */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Trusted Partners</h3>
            <div className="text-sm">
              Certified mechanics with trusted industry partners
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="border-t pt-6">
          <div className="text-xs text-sky-100 space-y-4">
            <div>
              <p className="mb-2">
                <strong>Disclaimer:</strong> Mobile Mechanics and Tyres provides
                automotive repair and maintenance services. All work is carried
                out by qualified technicians and covered by our service
                warranty. Prices may vary based on vehicle type and parts
                required. We are not liable for any indirect or consequential
                damages arising from our services.
              </p>
              <p>
                © {new Date().getFullYear()} Mobile Mechanics and Tyres. All
                rights reserved. This website and its content are protected by
                copyright and other intellectual property laws.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-xs">
              <Link href="/privacy-policy" className="hover:underlineunderline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:underlineunderline">
                Terms & Conditions
              </Link>
              <span>Company Registration: [Your Company Number]</span>
              <span>VAT Number: [Your VAT Number]</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
