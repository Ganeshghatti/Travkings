import { Service, CarouselItem, ValueItem } from "./types";

// Large Logo with Name for Desktop
// Use unified logo from public folder
export const COMPANY_LOGO_WIDE = "/logo.png";
// Smaller Icon-only Logo for Mobile
export const COMPANY_LOGO_ICON = "/logo.png";

export const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1920&auto=format&fit=crop",
    title: "Corporate Excellence",
    subtitle:
      "End-to-end travel management for professionals and organizations.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1920&auto=format&fit=crop",
    title: "Bespoke Luxury Holidays",
    subtitle:
      "Tailored experiences crafted with precision for your ultimate comfort.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1920&auto=format&fit=crop",
    title: "Global Visa Facilitation",
    subtitle:
      "Smooth documentation and processing for all your international needs.",
  },
];

export const SERVICES: Service[] = [
  {
    id: "air-ticketing",
    title: "Air Ticketing",
    icon: "fa-plane-departure",
    imageUrl:
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&auto=format&fit=crop",
    description:
      "Domestic and International flights powered by strong partnerships with renowned global airlines, including IATA and top budget carriers.",
    features: [
      "Competitive fares & flexible options",
      "24/7 support & itinerary management",
      "Multi-city & round-trip expertise",
      "Zero Compromise on Comfort, efficiency & Convenience.",
    ],
  },
  {
    id: "tour-packages",
    title: "Tour Packages",
    icon: "fa-suitcase-rolling",
    imageUrl:
      "https://images.unsplash.com/photo-1761134342227-a94e55c59cef?q=80&w=1170&auto=format&fit=crop",
    description:
      "Customized international & domestic tours curated by our travel specialists.",
    features: [
      "Family & honeymoon packages",
      "Adventure & luxury holidays",
      "Specialist-curated experiences",
      "Specialized Group Packages",
    ],
  },
  {
    id: "holiday-bookings",
    title: "Holiday Bookings",
    icon: "fa-hotel",
    imageUrl:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1174&auto=format&fit=crop",
    description:
      "Hotels, resorts, cruises, and destination stays at exclusive partner rates.",
    features: [
      "Exclusive partner rates",
      "Personalized style recommendations",
      "Premium hotel & cruise selections",
    ],
  },
  {
    id: "corporate-travel",
    title: "Corporate Management",
    icon: "fa-briefcase",
    imageUrl:
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvcnBvcmF0ZSUyMG9mZmljZXxlbnwwfHwwfHx8Mg%3D%3D",
    description:
      "Dedicated account management for corporate travel, logistics, and MICE.",
    features: [
      "MICE coordination",
      "Corporate travel policy reporting",
      "Dedicated account managers",
    ],
  },
  {
    id: "visa-assistance",
    title: "Visa Assistance",
    icon: "fa-passport",
    imageUrl:
      "https://images.unsplash.com/photo-1454496406107-dc34337da8d6?q=80&w=1300&auto=format&fit=crop",
    description:
      "Tourist, business, and student visa facilitation with expert guidance.",
    features: [
      "Documentation guidance",
      "Appointment management",
      "High success rate support",
    ],
  },
  {
    id: "end-to-end",
    title: "Concierge Services",
    icon: "fa-concierge-bell",
    imageUrl:
      "https://emilyslimousineservice.com/wp-content/uploads/2024/10/Banner042.jpg",
    description:
      "Airport transfers, travel insurance, and foreign exchange for a seamless journey.",
    features: [
      "Ground transportation",
      "Foreign exchange support",
      "Travel insurance coverage",
      "Meet & Assist Service",
    ],
  },
  {
    id: "private-jet-charters",
    title: "Private Jet & Charters Flights",
    icon: "fa-plane-departure",
    imageUrl:
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&auto=format&fit=crop",
    description:
      "Exclusive private aviation services with luxury aircraft, personalized flight experiences, and premium concierge support for discerning travelers.",
    features: [
      "Light jets, mid-size & heavy jets available",
      "On-demand charter & scheduled services",
      "Luxury cabin amenities & catering",
      "Private terminal access & expedited security",
    ],
  },
];

export const VALUES: ValueItem[] = [
  {
    title: "Customer-Centricity",
    description: "Every journey is tailored to individual preferences.",
    icon: "fa-heart",
    
  },
  {
    title: "Integrity & Transparency",
    description: "Ethical, honest, and responsible practices.",
    icon: "fa-shield-halved",
  },
  {
    title: "Quality & Excellence",
    description: "High standards in service, safety, and efficiency.",
    icon: "fa-medal",
  },
  {
    title: "Innovation",
    description: "Adopting modern tools and creative solutions.",
    icon: "fa-lightbulb",
  },
  {
    title: "Reliability",
    description: "Consistent delivery of professional services.",
    icon: "fa-clock",
  },
  {
    title: "Global Presence",
    description: "A vast network of international partners for your ease.",
    icon: "fa-earth-americas",
  },
];

export const CONTACT2 = "/contact/contact-2.jpg";

export const SOCIAL_LINKS = [
  { icon: "fa-instagram", url: "https://www.instagram.com/travkings_/", name: "Instagram" },
  { icon: "fa-linkedin", url: "https://www.linkedin.com/company/travkings-tours-travels", name: "LinkedIn" },
];
