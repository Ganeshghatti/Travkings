import Image from "next/image";

import { CONTACT2 } from "@/lib/constants";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <div className="bg-white">
       {/* Header */}
       <div className="bg-brownCoffee pt-70 pb-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20 grayscale" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=1920&auto=format&fit=crop)` }}></div>
        <div className="container mx-auto px-6 relative text-center space-y-6">
           <span className="text-uocGold font-medium text-xs uppercase tracking-[0.4em] block">Get In Touch</span>
           <h1 className="text-5xl md:text-8xl font-medium tracking-headline text-white uppercase leading-brand">Connect</h1>
           <div className="w-20 h-[2px] bg-brandy mx-auto"></div>
        </div>
      </div>

      <section className="py-32 bg-white">
         <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-24">
               {/* Contact Info */}
               <div className="lg:w-1/3 space-y-16">
                  <div className="space-y-6">
                     <h2 className="text-3xl font-medium tracking-headline text-brownCoffee uppercase leading-brand">Contact <br/>Information</h2>
                     <p className="text-brownCoffee/60 font-normal leading-brand">
                        Reach out to our team of specialists for bespoke itineraries or corporate travel management solutions.
                     </p>
                  </div>

                  <div className="space-y-10">
                     <div className="flex items-start gap-8">
                        <div className="w-14 h-14 border border-uocGold flex items-center justify-center text-uocGold flex-shrink-0 text-xl">
                           <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div className="space-y-1">
                           <h4 className="font-medium tracking-headline text-brownCoffee text-sm uppercase">Our Office</h4>
                           <p className="text-brownCoffee/70 text-sm font-normal">603, Venus Tower, Veera Desai Rd,<br />Andheri (W), Mumbai.</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-8">
                        <div className="w-14 h-14 border border-uocGold flex items-center justify-center text-uocGold flex-shrink-0 text-xl">
                           <i className="fa-solid fa-phone"></i>
                        </div>
                        <div className="space-y-1">
                           <h4 className="font-medium tracking-headline text-brownCoffee text-sm uppercase">Phone Number</h4>
                           <p className="text-brownCoffee/70 text-sm font-normal">+91 88280 06599</p>
                           <p className="text-brownCoffee/70 text-sm font-normal">+91 88280 08399 </p>
                        </div>
                     </div>
                     <div className="flex items-start gap-8">
                        <div className="w-14 h-14 border border-uocGold flex items-center justify-center text-uocGold flex-shrink-0 text-xl">
                           <i className="fa-solid fa-envelope"></i>
                        </div>
                        <div className="space-y-1">
                           <h4 className="font-medium tracking-headline text-brownCoffee text-sm uppercase">Email Address</h4>
                           <p className="text-brownCoffee/70 text-sm font-normal">holidays@travkings.com</p>
                           <p className="text-brownCoffee/70 text-sm font-normal">ticketing@travkings.com</p>
                        </div>
                     </div>
                  </div>

                  <div className="p-12 bg-brownCoffee text-white space-y-8">
                     <h4 className="text-xl font-medium tracking-headline uppercase">Opening Hours</h4>
                     <div className="w-10 h-[1px] bg-uocGold"></div>
                     <ul className="space-y-4 text-xs font-normal uppercase tracking-widest text-white/60">
                        <li className="flex justify-between"><span>Mon - Fri</span> <span className="text-white">09:00 - 18:00</span></li>
                        <li className="flex justify-between"><span>Saturday</span> <span className="text-white">10:00 - 16:00</span></li>
                        <li className="flex justify-between"><span>Sunday</span> <span className="text-white">Closed</span></li>
                     </ul>
                  </div>
               </div>

               {/* Contact Form */}
               <div className="lg:w-2/3">
                  <ContactForm />
               </div>
            </div>
         </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[500px] w-full bg-slate-200 grayscale contrast-125 overflow-hidden border-t border-slate-100">
         <Image src={CONTACT2} alt="Map Location" className="w-full h-full object-cover" fill />
      </section>
    </div>
  );
}

