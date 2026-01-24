import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-brownCoffee pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(/globe.svg)` }}></div>
        <div className="container mx-auto px-6 relative text-center space-y-4">
           <span className="text-uocGold font-medium text-xs uppercase tracking-[0.4em] block">Legal</span>
           <h1 className="text-4xl md:text-6xl font-medium tracking-headline text-white uppercase leading-brand">Terms & Conditions</h1>
           <div className="w-20 h-[2px] bg-brandy mx-auto"></div>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12 text-brownCoffee/80 leading-relaxed font-normal">
            
            <p className="text-lg">
              This website (the “Website”) is owned and operated by <strong>Travkings Tours & Travels Pvt. Ltd.</strong> (“Travkings”, “we”, “us”, “our”). By accessing or using this Website and by making any booking through us, you agree to be bound by the following Terms and Conditions. Please read them carefully before proceeding with any booking.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">1. Legal Agreement</h2>
              <p>
                When you make a booking with us, a legal contract is created between you and the respective service provider, and Travkings acts only as an intermediary or booking agent. Your right to refund, cancellation, or amendment is governed by these Terms & Conditions and the individual supplier’s policies.
              </p>
              <p>
                Once payment is made, it is deemed that you have read, understood, and accepted all applicable terms. If you do not agree, please do not use this Website or our services.
              </p>
              <p>
                Travkings reserves the right to modify these Terms & Conditions at any time without prior notice. Continued use of the Website constitutes acceptance of the updated terms.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">2. Role of Travkings as Agent</h2>
              <p>
                Travkings Tours & Travels Pvt. Ltd. acts only as an agent for airlines, hotels, transport providers, tour operators, cruise lines, insurance providers, and other service suppliers.
              </p>
              <p>
                We do not own or operate any airline, hotel, transport service, or tour operation, and we are not responsible for the acts, omissions, delays, or failures of any supplier.
              </p>
              <p>
                All travel documents are issued subject to the terms and conditions of the respective suppliers.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">3. Availability of Services</h2>
              <p>
                All bookings are subject to availability and confirmation by suppliers. Services may be withdrawn, changed, or sold out without prior notice.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">4. Limitation of Liability</h2>
              <p>Travkings shall not be liable for any injury, loss, accident, delay, inconvenience, expense, or damage caused by:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acts or omissions of suppliers</li>
                <li>Natural disasters, strikes, political disturbances, or technical failures</li>
                <li>Changes in schedules, routes, or services by suppliers</li>
              </ul>
              <p>
                Where liability cannot be excluded under law, it shall be limited to the amount paid to Travkings for the specific booking.
              </p>
              <p>We reserve the right to refuse or cancel any booking at our discretion.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">5. Passenger Details</h2>
              <p>
                It is your responsibility to ensure that all passenger names and details match exactly with passport or government ID.
              </p>
              <p>
                Any mismatch may result in denied boarding or cancellation, and Travkings will not be responsible for losses arising from incorrect information.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">6. Supplier-Specific Conditions</h2>
              <p>Each airline, hotel, and service provider has its own rules regarding:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cancellations</li>
                <li>Amendments</li>
                <li>No-shows</li>
                <li>Refunds</li>
                <li>Baggage and check-in</li>
              </ul>
              <p>
                These conditions may involve heavy penalties or complete non-refundability. By booking through Travkings, you agree to abide by the supplier’s rules.
              </p>
              <p>It is your responsibility to understand these conditions before confirming your booking.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">7. Third-Party Content and Links</h2>
              <p>
                Information on this Website may be provided by third-party suppliers. While we try to keep information accurate, Travkings does not guarantee completeness or correctness.
              </p>
              <p>
                Links to third-party websites are provided for convenience. We are not responsible for their content or privacy practices.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">8. Changes to Itineraries</h2>
              <p>
                Suppliers may change schedules, routes, hotels, or services due to operational reasons. Any right to cancel or refund will depend solely on the supplier’s policies.
              </p>
              <p>Acceptance of tickets or vouchers confirms acceptance of such changes.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">9. Service Fees</h2>
              <p>
                Travkings may charge service or handling fees for bookings, cancellations, amendments, or consultation services. These fees are non-refundable unless stated otherwise.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">10. Prices and Taxes</h2>
              <p>
                All prices are subject to availability and change until full payment is made and documents are issued.
              </p>
              <p>Prices may exclude:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Government taxes</li>
                <li>Airport charges</li>
                <li>Fuel surcharges</li>
                <li>Local city taxes</li>
              </ul>
              <p>Any increase in taxes or charges must be paid by the traveller.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">11. Passport, Visa & Health Requirements</h2>
              <p>It is solely the traveller’s responsibility to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hold valid passport (usually minimum 6 months validity)</li>
                <li>Obtain required visas</li>
                <li>Follow health and vaccination requirements</li>
              </ul>
              <p>Travkings may assist, but we do not guarantee visa approval.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">12. Discounts and Promotions</h2>
              <p>
                Any discounts offered are at the sole discretion of Travkings and may be modified or withdrawn without notice.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">13. Website Usage Rules</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Website for illegal purposes</li>
                <li>Send spam or unauthorized promotions</li>
                <li>Attempt to hack or misuse the Website</li>
                <li>Misrepresent your identity</li>
              </ul>
              <p>We may restrict access if misuse is detected.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">14. Security</h2>
              <p>
                Online transactions are protected using standard SSL encryption. However, no system is completely secure, and Travkings cannot guarantee absolute security of data transmission.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">15. Images and Descriptions</h2>
              <p>
                All photos and descriptions are for promotional purposes only and may not represent exact services or facilities.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">16. Intellectual Property</h2>
              <p>
                All Website content including text, logos, graphics, and images are the property of Travkings or its licensors and may not be copied or used commercially without written permission.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">17. Marketing Communication</h2>
              <p>
                By sharing your contact details, you agree to receive promotional messages, emails, or calls from Travkings. You may opt out anytime by contacting us.
              </p>
              <p>
                Your data will not be sold to third parties, but may be shared with service providers for booking purposes.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">18. Disclaimer of Website Content</h2>
              <p>
                While we try to ensure accuracy, Travkings does not guarantee that all Website content is error-free or updated at all times and is not liable for any losses due to reliance on Website information.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">19. Website Availability</h2>
              <p>
                Travkings does not guarantee uninterrupted access to the Website and is not liable for downtime due to maintenance or technical issues.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">20. Use of Submitted Content</h2>
              <p>
                Any feedback, messages, or suggestions shared with Travkings may be used by us for business purposes without compensation, subject to privacy laws.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">21. Termination of Access</h2>
              <p>
                We may suspend or terminate Website access at any time without notice if terms are violated.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">22. Cookies</h2>
              <p>
                We may use cookies to improve Website performance and user experience. You may disable cookies in your browser, but some features may not function properly.
              </p>
            </div>

            <div className="space-y-4 pt-8 border-t border-brownCoffee/10">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">23. Governing Law and Jurisdiction</h2>
              <p>
                These Terms & Conditions shall be governed by the laws of India. All disputes shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
