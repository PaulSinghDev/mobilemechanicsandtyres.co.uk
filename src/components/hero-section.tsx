"use client";

import { useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CallbackForm } from "@/components/callback-form";

export function HeroSection() {
  const header = useRef<HTMLDivElement>(null);

  return (
    <header className="text-white py-40 relative" ref={header}>
      <div
        className={[
          "bg-[url('/assets/images/header-home.jpg')] absolute top-0 left-0 w-full h-full bg-cover -z-1",
          "before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary before:opacity-80",
        ].join(" ")}
      ></div>
      <div className="container flex flex-col md:flex-row mx-auto px-4 text-center gap-12">
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl font-extrabold tracking-tight mb-4">
            Mobile Mechanic and Tyres
          </h1>
          <p className="text-xl mb-8">
            Taking the hassle out of vehicle repairs at a fair price.
          </p>

          {/* Rating Display */}
          <div className="flex items-center justify-center mb-8">
            <div className="px-6 py-3 rounded-lg">
              <div className="flex flex-col gap-4 items-center space-x-2">
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-7 h-7 md:w-12 md:h-12 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L0 6.91l6.564-.955L10 0l3.436 5.955L20 6.91l-5.245 4.635L15.878 18z" />
                    </svg>
                  ))}
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">4.9/5</span>
                  <span className="font-bold">(450+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* book */}
        <div className="container mx-auto px-4 max-w-100">
          <Card className="max-w-md mx-auto bg-gray-800/80 rounded-lg shadow-md pt-0 overflow-hidden border-none">
            <CardHeader className="bg-gradient-to-br from-sky-800 to to-sky-900 px-8 py-4 flex items-center justify-center text-white">
              <h2 className="text-2xl font-semibold text-center">
                Request a Callback
              </h2>
            </CardHeader>
            <CardContent className="px-0">
              <CallbackForm />
            </CardContent>

            <CardFooter>
              <p className="text-xs text-gray-300 text-center">
                This site is protected by reCAPTCHA and the Google Privacy
                Policy and Terms of Service apply.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </header>
  );
}
