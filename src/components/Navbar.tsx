'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { COMPANY_LOGO_WIDE, COMPANY_LOGO_ICON, SOCIAL_LINKS } from '@/lib/constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // useEffect(() => {
  //   setIsOpen(false);
  // }, [pathname]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-brownCoffee shadow-2xl py-3' : 'bg-transparent py-6'}`}>
      {/* Top bar */}
      {!scrolled && (
        <div className="hidden lg:block border-b border-white/10 pb-3 mb-3">
          <div className="container mx-auto px-6 flex justify-between items-center text-[10px] tracking-widest font-medium text-white/80">
            <div className="flex items-center space-x-6">
              <span className="flex items-center"><i className="fa-solid fa-phone mr-2 text-uocGold"></i> +91 88280 06599</span>
              <span className="flex items-center"><i className="fa-solid fa-envelope mr-2 text-uocGold"></i> holidays@travkings.com</span>
            </div>
            <div className="flex items-center space-x-5">
              {SOCIAL_LINKS.map(social => (
                <a key={social.name} href={social.url} className="hover:text-uocGold transition-colors">
                  <i className={`fa-brands ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center group">
          {/* Responsive Logos - Removed inversion filter to preserve gold color */}
          {/* <Image 
            src={COMPANY_LOGO_ICON} 
            alt="Travkings Icon" 
            width={48}
            height={48}
            priority
            className={`lg:hidden w-auto transition-all duration-500 ${scrolled ? 'h-10' : 'h-12'}`} 
          /> */}
          <Image 
            src={COMPANY_LOGO_WIDE} 
            alt="Travkings Logo" 
            width={200}
            height={64}
            priority
            className={`w-32 md:w-auto object-contain transition-all duration-500 ${scrolled ? 'h-12' : 'h-16'}`} 
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-10">
          {['Home', 'About', 'Services', 'Holidays', 'Contact'].map((item) => (
            item === 'Holidays' ? (
              <a 
                key={item} 
                href="https://holidays.travkings.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium tracking-headline uppercase text-white hover:text-uocGold transition-colors"
              >
                {item}
              </a>
            ) : (
              <Link 
                key={item} 
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="text-xs font-medium tracking-headline uppercase text-white hover:text-uocGold transition-colors"
              >
                {item}
              </Link>
            )
          ))}
          <Link href="/contact" className="bg-brandy hover:bg-brownCoffee border border-brandy hover:border-uocGold text-white px-8 py-3 rounded-none text-xs font-medium uppercase tracking-widest transition-all duration-300 shadow-lg">
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle - Only show hamburger when closed */}
        <button 
          className={`lg:hidden text-2xl text-white ${isOpen ? 'hidden' : 'block'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="fa-solid fa-bars-staggered"></i>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-brownCoffee z-60 transform transition-transform duration-500 lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header with Close Button */}
        <div className="flex justify-between items-center p-6">
          <Image 
            src={COMPANY_LOGO_WIDE} 
            alt="Travkings" 
            width={200}
            height={64}
            className="w-32 md:w-auto object-contain h-12"
          />
          <button 
            className="text-3xl text-white hover:text-uocGold transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        {/* Menu Content */}
        <div className="flex flex-col h-full items-center justify-center space-y-10 text-white -mt-10">
          {['Home', 'About', 'Services', 'Holidays', 'Contact'].map((item) => (
            item === 'Holidays' ? (
              <a 
                key={item} 
                href="https://holidays.travkings.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl font-medium tracking-headline uppercase hover:text-uocGold transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ) : (
              <Link 
                key={item} 
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="text-3xl font-medium tracking-headline uppercase hover:text-uocGold transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            )
          ))}
          <div className="flex space-x-8 text-2xl pt-6">
             {SOCIAL_LINKS.map(social => (
                <a key={social.name} href={social.url} className="hover:text-uocGold transition-colors">
                  <i className={`fa-brands ${social.icon}`}></i>
                </a>
              ))}
          </div>
          <Link 
            href="/contact" 
            className="bg-brandy text-white px-12 py-4 rounded-none text-sm font-medium uppercase tracking-widest mt-6 hover:bg-brownCoffee transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Consult An Expert
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
