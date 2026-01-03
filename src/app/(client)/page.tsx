import Link from 'next/link';
import Carousel from '@/components/Carousel';
import MarketingPopup from '@/components/MarketingPopup';
import { SERVICES, VALUES } from '@/lib/constants';


export default function Home() {
  return (
    <div className="overflow-hidden bg-white">
      <MarketingPopup />
      <Carousel />

      {/* Intro Section - Purity & Clarity */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2 space-y-10">
              <div className="inline-flex items-center space-x-4">
                <span className="w-12 h-[2px] bg-brandy"></span>
                <span className="text-brandy font-medium text-xs uppercase tracking-[0.3em]">A Legacy of Prestige</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-medium tracking-headline text-brownCoffee leading-brand uppercase">
                A Decade of Designing <br/><span className="text-uocGold">Extraordinary</span> Journeys
              </h2>
              <p className="text-lg text-brownCoffee/80 leading-brand font-normal">
                Travkings Tours & Travels Pvt. Ltd., a premium travel management brand under the Kings Group, has built a 10-year legacy of excellence in the global travel arena. Recognized for bespoke, high-quality travel solutions, we offer a complete portfolio of services—from flights and holidays to corporate travel.
              </p>
              <div className="grid grid-cols-2 gap-12 py-6 border-y border-slate-100">
                <div>
                  <h3 className="text-4xl font-medium tracking-headline text-brownCoffee mb-2">10+</h3>
                  <p className="text-uocGold text-[10px] uppercase tracking-widest font-bold">Years of Heritage</p>
                </div>
                <div>
                  <h3 className="text-4xl font-medium tracking-headline text-brownCoffee mb-2">50k+</h3>
                  <p className="text-uocGold text-[10px] uppercase tracking-widest font-bold">Curated Experiences</p>
                </div>
              </div>
              <Link href="/about" className="inline-block bg-brandy text-white px-10 py-5 rounded-none font-medium text-xs uppercase tracking-widest hover:bg-brownCoffee transition-all duration-500 shadow-xl">
                Explore Our Heritage
              </Link>
            </div>
            <div className="lg:w-1/2 relative group">
              <div className="aspect-[3/4] rounded-none overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1517400508447-f8dd518b86db?w=800&auto=format&fit=crop" alt="Luxury Travel" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-uocGold/10 -z-10" />
              <div className="absolute top-12 -right-12 p-10 bg-brownCoffee shadow-2xl text-white hidden md:block max-w-[280px]">
                <p className="text-uocGold font-bold italic text-xl leading-brand mb-2">&quot;Excellence in every mile.&quot;</p>
                <div className="w-8 h-[1px] bg-uocGold mb-2"></div>
                <p className="text-[10px] uppercase tracking-widest text-white/60">Kings Group Africa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Portfolio - Unified Visual Grid */}
      <section className="py-32 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
            <span className="text-uocGold font-medium text-xs uppercase tracking-[0.3em] block">Our Signature Services</span>
            <h2 className="text-4xl md:text-5xl font-medium tracking-headline text-brownCoffee uppercase leading-brand">Bespoke Travel Management</h2>
            <div className="w-20 h-[2px] bg-brandy mx-auto"></div>
            <p className="text-brownCoffee/70 font-normal italic leading-brand">Precision, personalization, and exceptional service in every itinerary we craft.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.id} className="group relative bg-white border border-slate-100 overflow-hidden flex flex-col h-full hover:z-10 transition-all duration-500 hover:shadow-2xl">
                {/* Fixed Aspect Ratio for Uniformity */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                   <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                   <div className="absolute inset-0 bg-brownCoffee/40 group-hover:bg-brownCoffee/10 transition-all duration-500"></div>
                </div>
                <div className="p-8 flex flex-col flex-grow bg-white">
                  <div className="text-uocGold text-2xl mb-6">
                      <i className={`fa-solid ${service.icon}`}></i>
                  </div>
                  <h3 className="text-2xl font-medium tracking-headline text-brownCoffee mb-4 uppercase">{service.title}</h3>
                  <p className="text-brownCoffee/70 text-sm leading-brand font-normal mb-8 flex-grow">{service.description}</p>
                  <ul className="space-y-4 mb-10">
                    {service.features.slice(0, 3).map(f => (
                      <li key={f} className="text-[10px] uppercase tracking-widest text-brownCoffee/60 flex items-center">
                        <span className="w-4 h-[1px] bg-uocGold mr-3"></span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/services" className="inline-block border border-brownCoffee text-brownCoffee py-4 px-8 text-[10px] font-medium uppercase tracking-widest hover:bg-brownCoffee hover:text-white transition-all duration-500 text-center">
                    Explore Experience
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Now a Balanced 2x3 Grid */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
           <div className="flex flex-col lg:flex-row items-stretch gap-20">
              <div className="lg:w-1/2">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-100 border border-slate-100 shadow-xl overflow-hidden">
                    {VALUES.map((val, i) => (
                      <div key={i} className="p-12 bg-white hover:bg-slate-50 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                          <i className={`fa-solid ${val.icon} text-2xl text-uocGold group-hover:scale-110 transition-transform`}></i>
                          <span className="text-[10px] font-bold text-brownCoffee/20 tracking-widest">0{i+1}</span>
                        </div>
                        <h4 className="font-medium tracking-headline text-brownCoffee mb-4 uppercase text-sm">{val.title}</h4>
                        <p className="text-xs leading-brand text-brownCoffee/60 font-normal">{val.description}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="lg:w-1/2 flex flex-col justify-center space-y-10">
                 <div className="space-y-4">
                    <span className="text-uocGold font-medium text-xs uppercase tracking-[0.3em] block">Why Travkings</span>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-headline text-brownCoffee uppercase leading-brand">Prestige Built on <span className="text-brandy">Trust</span></h2>
                 </div>
                 <p className="text-lg text-brownCoffee/80 font-normal leading-brand">
                   Since inception, Travkings has built a reputation for reliability, professionalism, and personalized travel solutions. We don&apos;t just plan trips—we create journeys that inspire, connect, and elevate your travel experience.
                 </p>
                 <div className="space-y-6 pt-4">
                    {[
                      "Global Partner Network",
                      "Bespoke Personalization",
                      "Heritage of Kings Group",
                      "24/7 Concierge Support"
                    ].map(item => (
                      <div key={item} className="flex items-center space-x-4">
                         <div className="w-5 h-5 border border-uocGold flex items-center justify-center text-uocGold text-[8px]">
                            <i className="fa-solid fa-check"></i>
                         </div>
                         <span className="text-xs font-medium uppercase tracking-widest text-brownCoffee">{item}</span>
                      </div>
                    ))}
                 </div>
                 <Link href="/contact" className="inline-block bg-brownCoffee text-white px-12 py-5 rounded-none font-medium text-xs uppercase tracking-widest hover:bg-brandy transition-all duration-500 shadow-xl self-start">
                    Speak to a Concierge
                 </Link>
              </div>
           </div>
        </div>
      </section>

      {/* Redesigned Signature CTA - LIGHT Contrast to break away from Footer */}
      <section className="relative py-48 overflow-hidden bg-white border-t border-slate-100">
        {/* LIGHT Background Image for visual break */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10 grayscale-0 transition-all duration-1000" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=1920&auto=format&fit=crop')` }}
        />
        {/* WHITE Backdrop for massive contrast against the dark footer */}
        <div className="absolute inset-0 bg-white/90" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-5xl mx-auto py-24 space-y-12 bg-white/40 shadow-[0_0_80px_rgba(73,34,38,0.05)] border-y border-brandy/5">
             <div className="flex justify-center items-center space-x-4">
                <div className="h-[1px] w-12 bg-brandy"></div>
                <span className="text-brandy font-medium text-xs uppercase tracking-[0.5em] block">Signature Service</span>
                <div className="h-[1px] w-12 bg-brandy"></div>
             </div>
             
             <h2 className="text-5xl md:text-7xl font-medium tracking-headline text-brownCoffee uppercase leading-brand">
               Start Your <span className="text-uocGold italic">Curated</span> Journey
             </h2>
             
             <p className="text-xl text-brownCoffee/70 max-w-2xl mx-auto font-normal leading-brand">
               Every detail of your itinerary is handled with the world-class care that defines the Kings Group heritage. We invite you to experience travel at its peak.
             </p>
             
             <div className="pt-6">
                <Link href="/contact" className="inline-block bg-brandy hover:bg-brownCoffee text-white px-16 py-7 rounded-none font-medium text-xs uppercase tracking-[0.2em] transition-all duration-700 shadow-2xl border border-brandy">
                  Inquire Now
                </Link>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
