"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CAROUSEL_ITEMS } from "@/lib/constants";

const Carousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-brownCoffee">
      {CAROUSEL_ITEMS.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
            style={{ backgroundImage: `url(${item.image})` }}
          />
          {/* Refined Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-brownCoffee/40 via-brownCoffee/10 to-brownCoffee/60" />

          {/* Content */}
          <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-center text-center">
            <div
              className={`max-w-4xl transform transition-all duration-1000 delay-300 ${
                index === current
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
            >
              <div className="flex justify-center items-center space-x-3 mb-6">
                <div className="h-px w-8 bg-uocGold"></div>
                <span className="text-uocGold font-medium tracking-[0.2em] uppercase text-xs">
                  A Heritage of Excellence
                </span>
                <div className="h-px w-8 bg-uocGold"></div>
              </div>

              <h1 className="text-5xl md:text-8xl font-medium tracking-headline text-white leading-brand mb-8 uppercase">
                {item.title}
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-12 leading-brand font-normal max-w-2xl mx-auto">
                {item.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/services"
                  className="bg-brandy hover:bg-white hover:text-brandy text-white px-10 py-5 rounded-none font-medium text-xs uppercase tracking-widest transition-all duration-500 shadow-2xl min-w-50"
                >
                  View Experiences
                </Link>
                <Link
                  href="/about"
                  className="bg-white/10 hover:bg-uocGold backdrop-blur-md text-white px-10 py-5 rounded-none font-medium text-xs uppercase tracking-widest transition-all duration-500 border border-white/20 min-w-50"
                >
                  Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Modern Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center space-x-6 z-30">
        {CAROUSEL_ITEMS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className="group relative py-2"
          >
            <div
              className={`h-0.5 transition-all duration-500 ${
                index === current
                  ? "w-12 bg-uocGold"
                  : "w-6 bg-white/40 group-hover:bg-white"
              }`}
            />
            <span
              className={`absolute -top-4 left-0 text-[10px] font-bold text-white transition-opacity ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            >
              0{index + 1}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
