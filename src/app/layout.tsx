import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/footer";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mobile Mechanics and Tyres | Vehicle Repairs, Servicing & MOTs",
  description:
    "Professional mobile mechanic services in London. Vehicle repairs, MOT testing, tyre services, and maintenance at your location. Fair prices, experienced technicians.",
  keywords: [
    "mobile mechanic",
    "car repair",
    "MOT testing",
    "tyre services",
    "vehicle maintenance",
    "London",
    "mobile garage",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className} antialiased bg-gray-50`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
