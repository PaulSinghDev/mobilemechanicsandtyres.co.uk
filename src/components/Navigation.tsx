"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import colors from "tailwindcss/colors";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

const navLinks = [
  { href: "/", title: "Home page", label: "Home" },
  { href: "/services", title: "Services", label: "Services" },
  { href: "/about", title: "About", label: "About" },
  { href: "/contact", title: "Contact", label: "Contact" },
];

export default function Navigation() {
  const nav = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleScroll = () => {
      if (window.scrollY <= 100) {
        nav.current?.style.setProperty("background", "transparent");
      } else {
        nav.current?.style.setProperty("background", colors.sky[700]);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={nav}
      className={cn(
        "fixed top-0 left-0 w-full z-50 bg-transparent transition-colors"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-blue-400 bg-white p-2 rounded-sm"
          >
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link) => {
                  return (
                    <NavigationMenuItem key={JSON.stringify(link)}>
                      <NavigationMenuLink
                        className="text-white px-4 py-2 rounded-md transition-colors"
                        asChild
                      >
                        <Link href={link.href} title={link.title}>
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label="Toggle menu"
                >
                  <MenuIcon className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  <Link
                    href="/"
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    href="/services"
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Services
                  </Link>
                  <Link
                    href="/about"
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Contact
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
