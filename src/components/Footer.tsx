import React from "react";
import Link from "next/link";
import {
  COMPANY_LOGO_WIDE,
  COMPANY_LOGO_ICON,
  SOCIAL_LINKS,
} from "@/lib/constants";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-brownCoffee text-white/70 pt-24 pb-12 border-t-4 border-uocGold">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        {/* Brand Identity */}
        <div className="space-y-8">
          <div className="flex items-center">
            <Image
              src={COMPANY_LOGO_ICON}
              alt="Travkings"
              width={48}
              height={48}
              className="w-auto h-12 lg:hidden"
            />
            <Image
              src={COMPANY_LOGO_WIDE}
              alt="Travkings"
              width={200}
              height={56}
              className="w-auto h-14 hidden lg:block"
            />
          </div>
          <p className="text-sm leading-brand font-normal italic">
            &quot;A legacy of over 10 years, crafting bespoke journeys that
            mirror the prestige and reliability of the Kings Group.&quot;
          </p>
          <div className="flex space-x-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-brandy hover:border-brandy transition-all duration-300"
              >
                <i className={`fa-brands ${social.icon} text-sm`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white text-xs font-medium uppercase tracking-[0.2em] mb-10">
            Navigation
          </h4>
          <ul className="space-y-4 text-sm font-normal">
            <li>
              <Link
                href="/"
                className="hover:text-uocGold transition-colors flex items-center"
              >
                <span className="w-2 h-[1px] bg-uocGold/40 mr-3"></span> Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-uocGold transition-colors flex items-center"
              >
                <span className="w-2 h-[1px] bg-uocGold/40 mr-3"></span> About
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-uocGold transition-colors flex items-center"
              >
                <span className="w-2 h-[1px] bg-uocGold/40 mr-3"></span>{" "}
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-uocGold transition-colors flex items-center"
              >
                <span className="w-2 h-[1px] bg-uocGold/40 mr-3"></span> Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Travel Solutions */}
        <div>
          <h4 className="text-white text-xs font-medium uppercase tracking-[0.2em] mb-10">
            Solutions
          </h4>
          <ul className="space-y-4 text-sm font-normal">
            <li>
              <Link
                href="/services"
                className="hover:text-uocGold transition-colors"
              >
                Corporate Management
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-uocGold transition-colors"
              >
                Luxury Tour Packages
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-uocGold transition-colors"
              >
                Global Visa Assistance
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-uocGold transition-colors"
              >
                Bespoke Ticketing
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h4 className="text-white text-xs font-medium uppercase tracking-[0.2em] mb-10">
            Contact Details
          </h4>
          <ul className="space-y-6 text-sm font-normal">
            <li className="flex items-start space-x-4">
              <i className="fa-solid fa-location-dot mt-1 text-uocGold"></i>
              <span>
                B/603, Venus Tower, Veera Desai Rd,
                <br />
                Andheri (W), Mumbai.
              </span>
            </li>
            <li className="flex items-center space-x-4">
              <i className="fa-solid fa-phone text-uocGold"></i>
              <span>+91 88280 06599</span>
            </li>
            <li className="flex items-center space-x-4">
              <i className="fa-solid fa-phone text-uocGold"></i>
              <span>+91 88280 08399</span>
            </li>
            <li className="flex items-center space-x-4">
              <i className="fa-solid fa-envelope text-uocGold"></i>
              <span>holidays@travkings.com</span>
            </li>
            <li className="flex items-center space-x-4">
              <i className="fa-solid fa-envelope text-uocGold"></i>
              <span>ticketing@travkings.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-white/40">
        <p>
          &copy; {new Date().getFullYear()} Travkings Tours & Travels Pvt. Ltd.
          | Kings Group Africa
        </p>
        <div className="mt-4 md:mt-0 space-x-6">
          <Link href="#" className="hover:text-uocGold">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-uocGold">
            Terms of Excellence
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
