
import { Service, CarouselItem, ValueItem } from './types';

// Large Logo with Name for Desktop
export const COMPANY_LOGO_WIDE = "/primary_logo_desktop.svg";
// Smaller Icon-only Logo for Mobile
export const COMPANY_LOGO_ICON = "/primary_logomark_mobile.svg";

export const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1920&auto=format&fit=crop",
    title: "Corporate Excellence",
    subtitle: "End-to-end travel management for professionals and organizations."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1920&auto=format&fit=crop",
    title: "Bespoke Luxury Holidays",
    subtitle: "Tailored experiences crafted with precision for your ultimate comfort."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=1920&auto=format&fit=crop",
    title: "Global Visa Facilitation",
    subtitle: "Smooth documentation and processing for all your international needs."
  }
];

export const SERVICES: Service[] = [
  {
    id: "air-ticketing",
    title: "Air Ticketing",
    icon: "fa-plane-departure",
    imageUrl: "https://images.unsplash.com/photo-1694716549854-f26e21e70c04?w=800&auto=format&fit=crop",
    description: "Domestic and International flights powered by strong partnerships with renowned global airlines, including IATA and top budget carriers.",
    features: [
      "Competitive fares & flexible options",
      "24/7 support & itinerary management",
      "Multi-city & round-trip expertise",
      "Zero Compromise on Comfort, efficiency & Convenience."
    ]
  },
  {
    id: "tour-packages",
    title: "Tour Packages",
    icon: "fa-suitcase-rolling",
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop",
    description: "Customized international & domestic tours curated by our travel specialists.",
    features: [
      "Family & honeymoon packages",
      "Adventure & luxury holidays",
      "Specialist-curated experiences",
      "Specialized Group Packages"
    ]
  },
  {
    id: "holiday-bookings",
    title: "Holiday Bookings",
    icon: "fa-hotel",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop",
    description: "Hotels, resorts, cruises, and destination stays at exclusive partner rates.",
    features: [
      "Exclusive partner rates",
      "Personalized style recommendations",
      "Premium hotel & cruise selections"
    ]
  },
  {
    id: "corporate-travel",
    title: "Corporate Management",
    icon: "fa-briefcase",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    description: "Dedicated account management for corporate travel, logistics, and MICE.",
    features: [
      "MICE coordination",
      "Corporate travel policy reporting",
      "Dedicated account managers"
    ]
  },
  {
    id: "visa-assistance",
    title: "Visa Assistance",
    icon: "fa-passport",
    imageUrl: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&auto=format&fit=crop",
    description: "Tourist, business, and student visa facilitation with expert guidance.",
    features: [
      "Documentation guidance",
      "Appointment management",
      "High success rate support"
    ]
  },
  {
    id: "end-to-end",
    title: "Concierge Services",
    icon: "fa-concierge-bell",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop",
    description: "Airport transfers, travel insurance, and foreign exchange for a seamless journey.",
    features: [
      "Ground transportation",
      "Foreign exchange support",
      "Travel insurance coverage",
      "Meet & Assist Service"
    ]
  },
  {
    id: "private-jet-charters",
    title: "Private Jet & Charters Flights",
    icon: "fa-plane-departure",
    imageUrl: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?q=80&w=1208&auto=format&fit=crop",
    description: "Exclusive private aviation services with luxury aircraft, personalized flight experiences, and premium concierge support for discerning travelers.",
    features: [
      "Light jets, mid-size & heavy jets available",
      "On-demand charter & scheduled services",
      "Luxury cabin amenities & catering",
      "Private terminal access & expedited security",
    ]
  }
];

export const VALUES: ValueItem[] = [
  { title: "Customer-Centricity", description: "Every journey is tailored to individual preferences.", icon: "fa-heart" },
  { title: "Integrity & Transparency", description: "Ethical, honest, and responsible practices.", icon: "fa-shield-halved" },
  { title: "Quality & Excellence", description: "High standards in service, safety, and efficiency.", icon: "fa-medal" },
  { title: "Innovation", description: "Adopting modern tools and creative solutions.", icon: "fa-lightbulb" },
  { title: "Reliability", description: "Consistent delivery of professional services.", icon: "fa-clock" },
  { title: "Global Presence", description: "A vast network of international partners for your ease.", icon: "fa-earth-americas" }
];

export const CONTACT2 = "/contact/contact-2.jpg";

export const SOCIAL_LINKS = [
  { icon: "fa-facebook", url: "#", name: "Facebook" },
  { icon: "fa-instagram", url: "#", name: "Instagram" },
  { icon: "fa-twitter", url: "#", name: "Twitter" },
  { icon: "fa-linkedin", url: "#", name: "LinkedIn" }
];
