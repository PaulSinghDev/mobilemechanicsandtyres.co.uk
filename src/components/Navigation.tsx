"use client";

import { useEffect, useRef, useState } from "react";
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
import { ChevronDownIcon, MenuIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { services } from "@/data/services";

const navLinks = [
  { href: "/", title: "Home page", label: "Home" },
  { href: "/services", title: "Services", label: "Services" },
  { href: "/about", title: "About", label: "About" },
  { href: "/contact", title: "Contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
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
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label="Toggle menu"
                >
                  <MenuIcon className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] sm:w-[400px] max-h-full overflow-auto"
              >
                <SheetHeader className="sticky top-0 bg-white w-full">
                  <SheetTitle className="flex gap-4 items-center">
                    <Logo className="text-sky-500" />
                    <div className="grid gap-0 leading-tight text-sky-800">
                      <span className="font-bold">Mobile Mechanics</span>
                      <span className="italic font-medium">and Tyres</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-2 px-4">
                  <Link
                    href="/"
                    className="transition-colors w-full text-sky-900 m-0 font-bold text-lg flex items-center px-3 justify-start rounded-none py-3 h-[unset] [&>svg]:ml-auto [&[data-state=open]>svg]:rotate-180 hover:shadow-none hover:underline hover:bg-accent/50 max-h-10"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Separator className="my-2" />
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full text-sky-900 m-0 font-bold text-lg justify-start rounded-none [&>svg]:ml-auto [&[data-state=open]>svg]:rotate-180 hover:shadow-none hover:underline hover:bg-accent/50 max-h-10"
                      >
                        Services
                        <ChevronDownIcon className="w-4 h-4 transition-transform duration-300" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="CollapsibleContent">
                      <ul className="grid list-none gap-3 p-0 m-0 overflow-auto border-t mt-4 pt-2">
                        <li>
                          <Link
                            onClick={() => {
                              setIsOpen(false);
                            }}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:no-underline"
                            )}
                            href={"/services"}
                          >
                            <div className="font-bold text-sky-900 leading-none">
                              View All
                            </div>
                            <p className="line-clamp-2 text-sm font-normal leading-snug text-muted-foreground">
                              View all of our services in the services listing
                              page
                            </p>
                          </Link>
                        </li>
                        {services.map((service) => (
                          <li key={service.slug}>
                            <Link
                              onClick={() => {
                                setIsOpen(false);
                              }}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:no-underline"
                              )}
                              href={service.link.href || ""}
                            >
                              <div className="font-bold text-sky-900 leading-none">
                                {service.title}
                              </div>
                              <p className="line-clamp-2 text-sm font-normal leading-snug text-muted-foreground">
                                {service.description}
                              </p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                  <Separator className="my-2" />
                  <Link
                    href="/about"
                    className="transition-colors w-full text-sky-900 m-0 font-bold text-lg flex items-center px-3 justify-start rounded-none py-3 h-[unset] [&>svg]:ml-auto [&[data-state=open]>svg]:rotate-180 hover:shadow-none hover:underline hover:bg-accent/50 max-h-10"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  <Separator className="my-2" />
                  <Link
                    href="/contact"
                    className="transition-colors w-full text-sky-900 m-0 font-bold text-lg flex items-center px-3 justify-start rounded-none py-3 h-[unset] [&>svg]:ml-auto [&[data-state=open]>svg]:rotate-180 hover:shadow-none hover:underline hover:bg-accent/50 max-h-10"
                    onClick={() => setIsOpen(false)}
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
