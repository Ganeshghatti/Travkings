import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-brownCoffee pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(/globe.svg)` }}></div>
        <div className="container mx-auto px-6 relative text-center space-y-4">
           <span className="text-uocGold font-medium text-xs uppercase tracking-[0.4em] block">Legal</span>
           <h1 className="text-4xl md:text-6xl font-medium tracking-headline text-white uppercase leading-brand">Privacy Policy</h1>
           <div className="w-20 h-[2px] bg-brandy mx-auto"></div>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12 text-brownCoffee/80 leading-relaxed font-normal">
            
            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">1. About This Policy</h2>
              <p>
                This Privacy Policy explains how <strong>Travkings Tours & Travels Pvt. Ltd.</strong> (“Travkings”, “we”, “our”, “us”) collects, uses, stores, and protects personal information shared by users (“you”, “your”) when you visit our website, use our mobile platforms, contact us, or use any of our travel-related services (together called “Service Channels”).
              </p>
              <p>
                By using our Service Channels, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our services.
              </p>
              <p>
                This policy applies only to Travkings platforms and does not cover third-party websites or applications linked from our platforms. We advise you to review the privacy policies of such third parties separately.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">2. Why We Collect Information</h2>
              <p>We collect personal information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide travel services and process bookings</li>
                <li>Communicate with you regarding your enquiries and reservations</li>
                <li>Improve our services and customer experience</li>
                <li>Send updates, offers, and important service notifications</li>
                <li>Meet legal and regulatory requirements</li>
              </ul>
              <p>
                We collect and process data only when we have a lawful reason to do so, such as fulfilling a contract, complying with legal obligations, serving legitimate business interests, or when you have given consent.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">3. Who Controls Your Data</h2>
              <p>
                Travkings acts as the Data Controller for most of the personal data processed through our platforms. In some cases, we may process data on behalf of airlines, hotels, or other service providers and act as a Data Processor.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">4. Information We Collect</h2>
              <p>Depending on how you interact with us, we may collect:</p>
              <div className="pl-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-brownCoffee">a) Personal Details</h3>
                  <p>Name, title, date of birth, Address, email ID, phone number</p>
                </div>
                <div>
                  <h3 className="font-semibold text-brownCoffee">b) Account & Login Details</h3>
                  <p>Username, password, security information</p>
                </div>
                <div>
                  <h3 className="font-semibold text-brownCoffee">c) Booking & Travel Details</h3>
                  <p>Passenger details, travel preferences, booking history, Documents required for visa or forex services such as passport copies, photographs, bank statements, and application forms (only when you request such services)</p>
                </div>
                <div>
                  <h3 className="font-semibold text-brownCoffee">d) Marketing Preferences</h3>
                  <p>Your communication choices and interaction with promotions</p>
                </div>
                <div>
                  <h3 className="font-semibold text-brownCoffee">e) Technical & Usage Data</h3>
                  <p>IP address, browser type, device information, pages visited, time spent on site</p>
                </div>
                <div>
                  <h3 className="font-semibold text-brownCoffee">f) Public or Third-Party Data</h3>
                  <p>Information received from social media platforms or partners where permitted by your privacy settings</p>
                </div>
              </div>
              <p className="mt-4">We do not intentionally collect sensitive personal information unless required for specific services like visa processing.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">5. How We Collect Information</h2>
              <p>We collect information when you:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Make enquiries or bookings online, by phone, email, or at our office</li>
                <li>Register on our platforms or participate in promotions or surveys</li>
                <li>Interact with our social media pages or advertisements</li>
                <li>Browse our website (through cookies and analytics tools)</li>
              </ul>
              <p>We also receive limited technical data from analytics service providers such as Google.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">6. How We Use Your Information</h2>
              <p>Your information may be used to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and manage your bookings based on your preferences and interests</li>
                <li>Send confirmations, reminders, and travel updates</li>
                <li>Provide customer support</li>
                <li>Prevent fraud and ensure platform security</li>
                <li>Improve our products, services, and marketing</li>
                <li>Send promotional messages if you have opted in</li>
              </ul>
              <p>You may unsubscribe from marketing communications at any time.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">7. Sharing of Information</h2>
              <p>We may share your information only when necessary, including with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Airlines, hotels, visa authorities, transport companies, and insurance providers</li>
                <li>Payment gateways and IT service providers</li>
                <li>Group companies and business partners for service fulfilment</li>
              </ul>
              <p>These parties are required to use your information only for service-related purposes and to protect it properly.</p>
              <p>We do not sell or trade your personal data.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">8. International Data Transfers</h2>
              <p>
                Some service providers may be located outside India. When data is transferred internationally, we ensure reasonable security measures and contractual safeguards are in place.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">9. Reviews and User Content</h2>
              <p>
                If you submit reviews, photos, videos, or feedback, they may be displayed publicly on our platforms or marketing channels. By submitting such content, you grant Travkings the right to use it for promotional and business purposes without compensation. Please ensure that any content you post does not violate any law or third-party rights.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">10. Cookies and Tracking</h2>
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your preferences</li>
                <li>Improve website performance</li>
                <li>Analyse traffic patterns</li>
              </ul>
              <p>You can control cookie settings through your browser.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">11. Mobile App Permissions</h2>
              <p>Our mobile app may request access to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Location (to show nearby branches or services)</li>
                <li>Phone (to connect you to customer support)</li>
                <li>SMS (for OTP and service alerts)</li>
                <li>Storage (to save documents and images for faster access)</li>
                <li>Notifications (for offers and booking updates)</li>
              </ul>
              <p>You may manage these permissions through your device settings.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">12. Data Security</h2>
              <p>We use appropriate technical and organizational measures such as:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Secure servers and encrypted connections (SSL)</li>
                <li>Restricted access to sensitive data</li>
                <li>Regular security monitoring and updates</li>
              </ul>
              <p>While we take strong precautions, no online system can be completely secure.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">13. How Long We Keep Your Data</h2>
              <p>We keep your information only as long as needed for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing services</li>
                <li>Legal and regulatory compliance</li>
                <li>Resolving disputes and preventing fraud</li>
              </ul>
              <p>After this period, data is securely deleted or anonymized.</p>
            </div>

             <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">14. Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Updated versions will be posted on our website. Continued use of our services means you accept the updated policy.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">15. Your Data Protection Rights</h2>
              <p>Subject to applicable laws, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion in certain cases</li>
                <li>Limit or object to processing</li>
                <li>Receive a copy of your data</li>
              </ul>
              <p>Requests can be made by contacting us using the details below.</p>
            </div>

            <div className="space-y-4 pt-8 border-t border-brownCoffee/10">
              <h2 className="text-2xl font-medium text-brownCoffee tracking-headline uppercase">16. Contact Details</h2>
              <p>For privacy-related questions or requests, please contact:</p>
              <div className="bg-slate-50 p-6 border border-slate-100 mt-4">
                <p className="font-semibold text-brownCoffee">Data Protection Officer (DPO)</p>
                <p className="mt-2">Corporate Office</p>
                <p className="font-medium text-brownCoffee">Travkings Tours & Travels Pvt. Ltd.</p>
                <p>Venus Tower B-603, Veera Desai Road, Azad Nagar 2,</p>
                <p>Andheri West, Mumbai, Maharashtra – 400053, India</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
