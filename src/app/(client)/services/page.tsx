import { SERVICES } from '@/lib/constants';

export default function Services() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-brownCoffee pt-70 pb-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20 grayscale" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1920&auto=format&fit=crop)` }}></div>
        <div className="container mx-auto px-6 relative text-center space-y-6">
           <span className="text-uocGold font-medium text-xs uppercase tracking-[0.4em] block">Our Portfolio</span>
           <h1 className="text-5xl md:text-8xl font-medium tracking-headline text-white uppercase leading-brand">Our Services</h1>
           <div className="w-20 h-[2px] bg-brandy mx-auto"></div>
        </div>
      </div>

      {/* Services Listing */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="space-y-40">
            {SERVICES.map((service, index) => (
              <div key={service.id} className={`flex flex-col lg:flex-row items-center gap-24 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2">
                   <div className="aspect-video rounded-none overflow-hidden shadow-2xl group border border-slate-100">
                      <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                   </div>
                </div>
                <div className="lg:w-1/2 space-y-10">
                   <div className="w-20 h-20 bg-brandy/5 flex items-center justify-center text-brandy text-4xl">
                      <i className={`fa-solid ${service.icon}`}></i>
                   </div>
                   <h2 className="text-4xl font-medium tracking-headline text-brownCoffee uppercase leading-brand">{service.title}</h2>
                   <p className="text-lg text-brownCoffee/70 leading-brand font-normal">
                     {service.description}
                   </p>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map(feature => (
                        <div key={feature} className="flex items-center p-5 bg-slate-50 border border-slate-100">
                           <i className="fa-solid fa-circle-check text-uocGold mr-4 text-sm"></i>
                           <span className="text-brownCoffee font-medium text-xs uppercase tracking-widest">{feature}</span>
                        </div>
                      ))}
                   </div>
                   <button className="bg-brownCoffee text-white px-10 py-5 rounded-none font-medium text-xs uppercase tracking-widest hover:bg-brandy transition-all duration-500 shadow-xl">
                      Inquire About {service.title}
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Support */}
      <section className="py-32 bg-slate-50 border-y border-slate-100">
         <div className="container mx-auto px-6 text-center max-w-5xl space-y-12">
            <span className="text-uocGold font-medium text-xs uppercase tracking-[0.3em] block">World-Class Assurance</span>
            <h2 className="text-4xl md:text-5xl font-medium tracking-headline text-brownCoffee uppercase leading-brand">Comprehensive 24/7 Support</h2>
            <p className="text-xl text-brownCoffee/60 max-w-3xl mx-auto font-normal leading-brand italic">
               No matter where you are in the world, our dedicated concierge team is available around the clock to ensure your journey is effortless.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pt-12">
               <div className="flex flex-col items-center space-y-6">
                  <div className="text-5xl text-brandy opacity-30"><i className="fa-solid fa-headset"></i></div>
                  <h4 className="font-medium tracking-headline text-brownCoffee uppercase text-sm">Expert Assistance</h4>
                  <div className="w-8 h-[1px] bg-uocGold"></div>
               </div>
               <div className="flex flex-col items-center space-y-6">
                  <div className="text-5xl text-brandy opacity-30"><i className="fa-solid fa-shield-heart"></i></div>
                  <h4 className="font-medium tracking-headline text-brownCoffee uppercase text-sm">Travel Insurance</h4>
                  <div className="w-8 h-[1px] bg-uocGold"></div>
               </div>
               <div className="flex flex-col items-center space-y-6">
                  <div className="text-5xl text-brandy opacity-30"><i className="fa-solid fa-hand-holding-dollar"></i></div>
                  <h4 className="font-medium tracking-headline text-brownCoffee uppercase text-sm">Best Value Rates</h4>
                  <div className="w-8 h-[1px] bg-uocGold"></div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}

