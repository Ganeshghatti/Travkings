import { VALUES } from '@/lib/constants';

export default function About() {
  return (
    <div className="bg-white">
      {/* Premium Header */}
      <div className="bg-brownCoffee pt-70 pb-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20 grayscale" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1920&auto=format&fit=crop)` }}></div>
        <div className="container mx-auto px-3 md:px-6 relative text-center space-y-6">
           <span className="text-uocGold font-medium text-xs uppercase tracking-[0.4em] block">Our Legacy</span>
           <h1 className="text-5xl md:text-8xl font-medium tracking-headline text-white uppercase leading-brand">Our Story</h1>
           <div className="w-20 h-[2px] bg-brandy mx-auto"></div>
        </div>
      </div>

      {/* Heritage Content */}
      <section className="py-32">
        <div className="container mx-auto px-3 md:px-6">
          <div className="max-w-5xl mx-auto space-y-24">
            
            {/* Overview Section */}
            <div className="flex flex-col md:flex-row gap-20 items-start">
              <div className="md:w-1/3">
                <h2 className="text-3xl font-medium tracking-headline text-brownCoffee uppercase border-l-4 border-uocGold pl-8 leading-brand">
                  Company <br/><span className="text-uocGold">Overview</span>
                </h2>
              </div>
              <div className="md:w-2/3 space-y-8 text-lg text-brownCoffee/80 leading-brand font-normal">
                <p>
                  <strong>Travkings Tours & Travels Pvt. Ltd.</strong>, part of the prestigious Kings Group, is a distinguished travel management company with a proven legacy of over 10 years in international markets.
                </p>
                <p>
                  Since inception, Travkings has built a reputation for reliability, professionalism, and personalized travel solutions tailored to meet the unique needs of every traveler—individuals, families, and corporate clients alike.
                </p>
                <p>
                  With a strong network of global partners and a team of seasoned travel specialists, Travkings delivers end-to-end travel services marked by efficiency, transparency, and exceptional customer care.
                </p>
              </div>
            </div>

            {/* Vision & Mission - High Contrast */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-slate-100 shadow-2xl">
               <div className="p-16 bg-brownCoffee text-white space-y-8">
                  <div className="w-12 h-12 border border-uocGold flex items-center justify-center text-uocGold mb-2">
                    <i className="fa-solid fa-eye text-xl"></i>
                  </div>
                  <h3 className="text-3xl font-medium tracking-headline uppercase">Our Vision</h3>
                  <div className="w-10 h-[2px] bg-uocGold"></div>
                  <p className="text-white/70 leading-brand font-normal italic">
                    To be a leading global travel management company known for innovation, trust, and excellence—offering unmatched, personalized travel experiences that inspire and enrich every journey.
                  </p>
               </div>
               <div className="p-16 bg-white text-brownCoffee space-y-8">
                  <div className="w-12 h-12 border border-brandy flex items-center justify-center text-brandy mb-2">
                    <i className="fa-solid fa-bullseye text-xl"></i>
                  </div>
                  <h3 className="text-3xl font-medium tracking-headline uppercase">Our Mission</h3>
                  <div className="w-10 h-[2px] bg-brandy"></div>
                  <p className="text-brownCoffee/70 leading-brand font-normal">
                    To understand and anticipate the needs of our clients by providing impeccable, bespoke travel services. We are committed to delivering seamless, stress-free travel experiences through meticulous planning and global expertise.
                  </p>
               </div>
            </div>

            {/* Values Grid */}
            <div className="space-y-16">
               <div className="text-center space-y-4">
                  <span className="text-uocGold font-medium text-xs uppercase tracking-[0.3em]">Foundation</span>
                  <h2 className="text-4xl font-medium tracking-headline text-brownCoffee uppercase">Our Core Values</h2>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {VALUES.map((val, i) => (
                    <div key={i} className="p-10 border border-slate-50 bg-slate-50/50 space-y-6 hover:bg-white hover:shadow-xl transition-all group">
                      <div className="flex justify-between items-center">
                        <i className={`fa-solid ${val.icon} text-xl text-brandy group-hover:text-uocGold transition-colors`}></i>
                        <span className="text-[10px] text-brownCoffee/20 font-bold">0{i+1}</span>
                      </div>
                      <h4 className="font-medium tracking-headline text-brownCoffee uppercase text-sm">{val.title}</h4>
                      <p className="text-xs leading-brand text-brownCoffee/60 font-normal">{val.description}</p>
                    </div>
                  ))}
               </div>
            </div>

            {/* Final Commitment */}
            <div className="bg-brownCoffee/5 p-20 text-center space-y-10">
               <div className="flex justify-center"><i className="fa-solid fa-quote-left text-4xl text-uocGold opacity-40"></i></div>
               <p className="text-2xl font-medium tracking-headline text-brownCoffee leading-brand uppercase max-w-3xl mx-auto">
                 &quot;Every journey begins with understanding your aspirations. We ensure your experience is smooth, memorable, and truly enriching.&quot;
               </p>
               <div className="flex flex-col items-center">
                  <div className="w-12 h-[1px] bg-brandy mb-4"></div>
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brownCoffee/40">The Travkings Commitment</span>
               </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

