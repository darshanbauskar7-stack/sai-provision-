import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation, CheckCircle, ChevronDown, ChevronUp, ZoomIn } from 'lucide-react';
import { STORE_INFO, getWhatsAppLink, getPhoneLink } from '../data/storeInfo';
import { Language } from '../types/store';
import { ProprietorPhotoModal } from './ProprietorPhotoModal';

interface StoreLocationContactProps {
  currentLanguage: Language;
}

export const StoreLocationContact: React.FC<StoreLocationContactProps> = ({ currentLanguage }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isPhotoZoomOpen, setIsPhotoZoomOpen] = useState(false);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Gaytri Nagar, Snehal Colony, Jalgaon, Maharashtra'
  )}`;

  const faqs = [
    {
      q: currentLanguage === 'mr' ? 'व्हॉट्सॲपवरून किराणा कसा मागवायचा?' : 'How do I place an order via WhatsApp?',
      a: currentLanguage === 'mr'
        ? 'तुम्ही वरील कॅटलॉगमधून वस्तू निवडून "डिजिटल किराणा पर्ची" मध्ये जोडू शकता किंवा थेट 8177871407 या नंबरवर तुमची यादी टाईप करून पाठवू शकता. आम्ही तुमचे सामान पॅक करून ठेवू.'
        : 'Simply select products on this website into your "Kirana Chit" and tap "Send to WhatsApp", or directly message your handwritten grocery list to 8177871407. We will pack it ready for pickup or delivery.',
    },
    {
      q: currentLanguage === 'mr' ? 'दुकान उघडण्याची आणि बंद होण्याची वेळ काय आहे?' : 'What are the store operating hours?',
      a: currentLanguage === 'mr'
        ? 'आमचे दुकान दररोज सकाळी ७:०० वाजल्यापासून रात्री १०:०० वाजेपर्यंत सुरू असते. रविवारसह सर्व दिवस दुकान चालू असते.'
        : 'Sai Provision and General Stores is open 7 days a week from 7:00 AM to 10:00 PM without weekly holiday.',
    },
    {
      q: currentLanguage === 'mr' ? 'कोणत्या पेमेंट पद्धती स्वीकारल्या जातात?' : 'What payment options are available?',
      a: currentLanguage === 'mr'
        ? 'आम्ही फोनपे (PhonePe), गुगल पे (Google Pay), भीम यूपीआय (BHIM UPI) आणि रोख रक्कम (Cash) स्वीकारतो.'
        : 'We accept PhonePe, Google Pay, BHIM UPI scanning at counter, direct mobile number UPI transfer, and cash.',
    },
    {
      q: currentLanguage === 'mr' ? 'हँक्यो आईस्क्रीम उपलब्ध आहे का?' : 'Do you have Hangyo Ice Cream in stock?',
      a: currentLanguage === 'mr'
        ? 'होय! आमच्या दुकानात हँक्यो (Hangyo) आईस्क्रीमचे चोकोबार, कुल्फी, कोन आणि कप्स तसेच अमुल दूध व दही कायम थंड उपलब्ध असतात.'
        : 'Yes! We have an authorized Hangyo Ice Cream cooler corner along with chilled Amul milk, curd, and cold refreshments.',
    },
  ];

  return (
    <section id="store-info" className="py-12 bg-[#FDFBF7] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
            <span>{currentLanguage === 'mr' ? 'पत्ता आणि संपर्क' : 'Visit & Contact Our Store'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Gaytri Nagar, Snehal Colony · Jalgaon
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            {currentLanguage === 'mr'
              ? 'आपल्या परिसरातील विश्वासू किराणा दुकान. प्रोप्रायटर मनोज वसंत बावस्कर आपल्या सेवेत सदैव तत्पर.'
              : 'Conveniently located for residents of Gaytri Nagar, Snehal Colony and nearby localities in Jalgaon.'}
          </p>
        </div>

        {/* Info & Map Split Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards & Timings (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Store Address Block */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0F5132] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                    Store Address
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 mt-0.5">
                    Sai Provision and General Stores
                  </h3>
                  <p className="text-sm text-stone-700 mt-1 leading-relaxed">
                    Gaytri Nagar, Snehal Colony, Jalgaon, Maharashtra – 425001
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    Landmark: Near Snehal Colony Road, Gaytri Nagar
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pop flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs shadow-sm hover:shadow-lg transition-all"
                >
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>
            </div>

            {/* Operating Hours & Owner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Hours */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    <Clock className="w-4 h-4 text-emerald-700" />
                    <span>Store Hours</span>
                  </div>
                  <div className="mt-3">
                    <span className="text-xl font-black text-stone-900 font-mono tracking-tight block">
                      7:00 AM – 10:00 PM
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold block mt-1">
                      Open All 7 Days (Mon – Sun)
                    </span>
                    <span className="text-[11px] text-stone-500 mt-1 block">
                      Morning fresh milk arrival: 6:30 AM
                    </span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-emerald-800 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Open today for home delivery & counter pickup</span>
                </div>
              </div>

              {/* Owner Card with Photograph and Zoom In Button */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-start gap-4">
                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsPhotoZoomOpen(true)}
                    className="group relative block rounded-2xl overflow-hidden focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                    title={currentLanguage === 'mr' ? 'फोटो मोठा करून पाहा (Zoom In)' : 'Click to zoom in on proprietor photo'}
                    aria-label="Zoom in proprietor photo"
                  >
                    <img
                      src={STORE_INFO.ownerPhotoUrl || '/assets/aistudio/20231228_045323_551eded9.jpg'}
                      alt={STORE_INFO.ownerName}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-[center_35%] border-2 border-emerald-700/60 shadow-md ring-2 ring-emerald-500/20 bg-emerald-950/5 group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold">
                      <ZoomIn className="w-4 h-4 text-amber-300 drop-shadow" />
                      <span className="scale-90 text-[10px]">Zoom</span>
                    </div>
                  </button>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-700 border-2 border-white flex items-center justify-center shadow-xs pointer-events-none" title="Verified Proprietor">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>Proprietor & Manager</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-base font-black text-stone-900 block truncate">
                      {STORE_INFO.ownerName}
                    </span>
                    <span className="text-xs text-emerald-800 font-bold block">
                      {STORE_INFO.marathiOwnerName}
                    </span>
                    <span className="text-[11px] text-stone-500 mt-1 block">
                      Serving Gaytri Nagar, Snehal Colony & Jalgaon
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href={getPhoneLink(STORE_INFO.primaryPhone)}
                      className="btn-pop inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{STORE_INFO.primaryPhone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Phone Numbers Quick Dial with Pop-Up Hover */}
            <div className="p-5 rounded-2xl bg-emerald-900 text-white shadow-md space-y-3">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                Direct Contact Numbers
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={getPhoneLink(STORE_INFO.primaryPhone)}
                  className="btn-pop p-3 rounded-xl bg-emerald-950/70 border border-emerald-800 hover:bg-emerald-800/80 transition-all flex items-center justify-between shadow-2xs hover:shadow-lg"
                >
                  <div>
                    <span className="text-[10px] text-emerald-300 block font-medium">Primary / WhatsApp</span>
                    <span className="font-mono font-bold text-base text-amber-300">{STORE_INFO.primaryPhone}</span>
                  </div>
                  <Phone className="w-4 h-4 text-emerald-400" />
                </a>

                <a
                  href={getPhoneLink(STORE_INFO.secondaryPhone)}
                  className="btn-pop p-3 rounded-xl bg-emerald-950/70 border border-emerald-800 hover:bg-emerald-800/80 transition-all flex items-center justify-between shadow-2xs hover:shadow-lg"
                >
                  <div>
                    <span className="text-[10px] text-emerald-300 block font-medium">Secondary / UPI</span>
                    <span className="font-mono font-bold text-base text-amber-300">{STORE_INFO.secondaryPhone}</span>
                  </div>
                  <Phone className="w-4 h-4 text-emerald-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Local Map Visual & Frequently Asked Questions (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Interactive Map Visual Card */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Location Visual Guide
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold">
                  Jalgaon, MH
                </span>
              </div>

              {/* Styled Vector Map Illustration */}
              <div className="relative h-44 rounded-xl overflow-hidden bg-emerald-950/5 border border-stone-200 flex flex-col items-center justify-center p-4 text-center">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0F5132_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Marker Pin */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#0F5132] text-amber-400 flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="relative z-10 mt-2">
                  <strong className="text-xs font-bold text-stone-900 block">
                    Sai Provision & General Stores
                  </strong>
                  <span className="text-[11px] text-stone-600 font-medium">
                    Gaytri Nagar, Snehal Colony
                  </span>
                </div>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-stone-600" />
                <span>Open in Google Maps App</span>
              </a>
            </div>

            {/* Local Store FAQ Accordion */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block pb-1 border-b border-stone-100">
                Frequently Asked Questions
              </span>

              <div className="space-y-2">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-stone-200/80 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-3 text-left font-bold text-xs text-stone-800 hover:text-emerald-900 flex items-center justify-between gap-2 bg-stone-50/50 cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="p-3 text-xs text-stone-600 leading-relaxed bg-white border-t border-stone-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proprietor Photo Full Zoom Lightbox Modal */}
      <ProprietorPhotoModal
        isOpen={isPhotoZoomOpen}
        onClose={() => setIsPhotoZoomOpen(false)}
        photoUrl={STORE_INFO.ownerPhotoUrl || '/assets/aistudio/20231228_045323_551eded9.jpg'}
        ownerName={STORE_INFO.ownerName}
        marathiOwnerName={STORE_INFO.marathiOwnerName}
      />
    </section>
  );
};
