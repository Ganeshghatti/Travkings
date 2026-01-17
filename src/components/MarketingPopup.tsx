"use client";

import React, { useState, useEffect } from "react";

const MarketingPopup: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem("travkings_popup_dismissed");
      if (!dismissed) setShow(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem("travkings_popup_dismissed", "true");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-brownCoffee/80 backdrop-blur-md"
        onClick={dismiss}
      />
      <div className="relative bg-white max-w-xl w-full rounded-none overflow-hidden shadow-2xl flex flex-col md:flex-row border border-uocGold/20 animate-scale-up">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-brownCoffee hover:text-brandy z-10 p-2"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <div
          className="md:w-2/5 h-48 md:h-auto bg-cover bg-center grayscale"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&auto=format&fit=crop)`,
          }}
        />

        <div className="p-10 md:w-3/5 flex flex-col justify-center space-y-4">
          <span className="text-brandy font-medium text-[10px] uppercase tracking-[0.3em] block">
            Exclusive Offer
          </span>
          <h2 className="text-2xl font-medium tracking-headline text-brownCoffee uppercase leading-brand">
            Signature <br />
            <span className="text-uocGold">European</span> Escape
          </h2>
          <div className="w-10 h-px bg-uocGold"></div>
          <p className="text-brownCoffee/70 text-xs font-normal leading-brand">
            Secure a preferred 15% rate on our premium European tour packages
            this season. Experience world-class hospitality.
          </p>
          <button className="bg-brandy text-white py-4 px-8 rounded-none font-medium text-[10px] uppercase tracking-widest hover:bg-brownCoffee transition-all duration-300 shadow-lg w-full">
            Claim Invitation
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketingPopup;
