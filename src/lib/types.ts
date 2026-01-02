
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  imageUrl: string;
}

export interface CarouselItem {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

export interface ValueItem {
  title: string;
  description: string;
  icon: string;
}

// Database Model Types
export interface TravelPackage {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnail: string;
  price: number;
  currency: string;
  duration: number;
  destination: string;
  destinations: string[];
  images: string[];
  category: 'luxury' | 'adventure' | 'family' | 'corporate' | 'honeymoon' | 'group' | 'solo' | 'other';
  inclusions: string[];
  exclusions: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
    activities?: string[];
  }>;
  highlights: string[];
  isActive: boolean;
  isFeatured: boolean;
  maxTravelers?: number;
  minTravelers: number;
  departureDates: Date[];
  bookingDeadline?: Date;
  tags: string[];
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Query {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  travelDate?: Date;
  message: string;
  status: 'pending' | 'resolved';
  source: string;
  packageId?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

