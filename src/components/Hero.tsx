import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, QrCode, ArrowDown, CheckCircle, ZoomIn } from 'lucide-react';
import { STORE_INFO, getWhatsAppLink, getPhoneLink } from '../data/storeInfo';
import { Language } from '../types/store';
import { ProprietorPhotoModal } from './ProprietorPhotoModal';

interface HeroProps {
  currentLanguage: Language;
  onOpenCart: () => void;
  onNavigateToCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLanguage,
  onOpenCart,
  onNavigateToCatalog,
}) => {
  const [isPhotoZoomOpen, setIsPhotoZoomOpen] = useState(false);

  const handleWhatsAppGeneral = () => {
    const text = currentLanguage === 'mr'
      ? `नमस्कार मनोजजी, मला साई प्रोव्हिजन अँड जनरल स्टोअर्स बद्दल माहिती हवी आहे.`
      : `Hello Manoj ji, I am contacting Sai Provision and General Stores regarding groceries and daily needs.`;
    window.open(getWhatsAppLink(STORE_INFO.primaryPhone, text), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8F6F0] to-[#F2EFE8] pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-stone-200/80">
      {/* Decorative Warm Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Store Details & Pitch (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Location & Trust Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-800">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100/90 border border-emerald-300/60">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                Gaytri Nagar, Snehal Colony · Jalgaon
              </span>
              <span className="text-stone-400">·</span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100/90 text-amber-900 border border-amber-300/60 font-mono">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                7:00 AM – 10:00 PM Daily
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
                {currentLanguage === 'mr' ? (
                  <>
                    आपले हक्काचे किराणा दुकान <br />
                    <span className="text-[#0F5132]">साई प्रोव्हिजन अँड जनरल स्टोअर्स</span>
                  </>
                ) : currentLanguage === 'hi' ? (
                  <>
                    आपका विश्वसनीय किराना स्टोर <br />
                    <span className="text-[#0F5132]">साई प्रोविजन एंड जनरल स्टोर्स</span>
                  </>
                ) : (
                  <>
                    Your Trusted Neighborhood Kirana <br />
                    <span className="text-[#0F5132]">Sai Provision & General Stores</span>
                  </>
                )}
              </h1>
              <p className="text-sm sm:text-base text-stone-600 max-w-2xl font-normal leading-relaxed pt-1">
                {currentLanguage === 'mr'
                  ? 'सर्व प्रकारची उच्च दर्जाची अन्नधान्ये, डाळी, मसाले, खाद्यतेल, ताजी डेअरी, हँक्यो आईस्क्रीम आणि घरगुती जनरल वस्तू. प्रोप्रायटर मनोज वसंत बावस्कर यांच्या देखरेखीखाली दर्जेदार सेवा.'
                  : currentLanguage === 'hi'
                  ? 'प्रीमियम अनाज, दालें, मसाले, कुकिंग ऑयल, शुद्ध डेयरी, हैंग्यो आइसक्रीम और दैनिक आवश्यक सामान। प्रोपराइटर मनोज वसंत बावस्कर द्वारा स्नेहल कॉलोनी, जलगांव में सेवा।'
                  : 'Pure staples, unpolished pulses, pure cow ghee, edible oils, dairy, snacks, Hangyo ice creams, and household essentials. Managed with pride by Manoj Vasant Bauskar.'}
              </p>
            </div>

            {/* Store Highlights & Credentials */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white/90 p-3 rounded-xl border border-stone-200/80 shadow-xs flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPhotoZoomOpen(true)}
                  className="group relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-emerald-300 shadow-2xs cursor-pointer focus:outline-hidden"
                  title={currentLanguage === 'mr' ? 'फोटो मोठा करून पाहा (Zoom In)' : 'Click to zoom in on proprietor photo'}
                  aria-label="Zoom in proprietor photo"
                >
                  <img
                    src={STORE_INFO.ownerPhotoUrl || '/assets/aistudio/20231228_045323_551eded9.jpg'}
                    alt={STORE_INFO.ownerName}
                    className="w-full h-full object-cover object-[center_35%] group-hover:scale-110 transition-transform duration-200"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>
                <div className="min-w-0 flex-1">
                  <span className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                    {currentLanguage === 'mr' ? 'दुकानदार' : 'Proprietor'}
                  </span>
                  <span className="block text-sm font-bold text-stone-900 mt-0.5 truncate">
                    Manoj V. Bauskar
                  </span>
                  <span className="text-[11px] text-emerald-700 font-medium truncate block">
                    {STORE_INFO.marathiOwnerName}
                  </span>
                </div>
              </div>

              <div className="bg-white/90 p-3 rounded-xl border border-stone-200/80 shadow-xs">
                <span className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  {currentLanguage === 'mr' ? 'पेमेंट सुविधा' : 'Payments'}
                </span>
                <span className="block text-sm font-bold text-stone-900 mt-0.5">
                  PhonePe · GPay · BHIM
                </span>
                <span className="text-[11px] text-amber-700 font-medium">
                  Direct Zero-Fee UPI
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-white/90 p-3 rounded-xl border border-stone-200/80 shadow-xs">
                <span className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  {currentLanguage === 'mr' ? 'खास आकर्षण' : 'Specialty'}
                </span>
                <span className="block text-sm font-bold text-pink-700 mt-0.5 truncate">
                  Hangyo Ice Cream
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  Authorized Cold Parlor
                </span>
              </div>
            </div>

            {/* Primary Action Button Cluster */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleWhatsAppGeneral}
                className="btn-pop flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F5132] hover:bg-[#166534] text-white font-bold text-sm shadow-md hover:shadow-xl cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-amber-300" />
                <span>
                  {currentLanguage === 'mr' ? 'व्हॉट्सॲपवर ऑर्डर द्या' : 'Order on WhatsApp (8177871407)'}
                </span>
              </button>

              <a
                href={getPhoneLink(STORE_INFO.primaryPhone)}
                className="btn-pop flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-semibold text-sm border border-stone-300 shadow-xs hover:shadow-md transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>Call Manoj Ji</span>
              </a>

              <button
                onClick={onNavigateToCatalog}
                className="btn-pop flex items-center gap-1.5 px-4 py-3 rounded-xl bg-emerald-50/80 hover:bg-emerald-100/80 text-emerald-950 font-bold text-sm border border-emerald-300/60 shadow-xs hover:shadow-md cursor-pointer"
              >
                <span>Browse 60+ Items</span>
                <ArrowDown className="w-4 h-4 text-emerald-700" />
              </button>
            </div>
          </div>

          {/* Right Column: Storefront Badge & Visual Reference (5 cols on lg) */}
          <div className="lg:col-span-5">
            <div className="relative bg-white rounded-2xl border border-stone-200 shadow-lg p-5 sm:p-6 overflow-hidden">
              {/* Top Accent Header imitating the physical storefront fascia */}
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-[#0F5132] via-[#14532d] to-[#0F5132] p-5 text-white shadow-inner">
                {/* Store Board Sign Header */}
                <div className="flex items-center justify-between border-b border-emerald-700/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">
                      ॥ श्री गणेशाय नमः ॥
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-200/90 bg-emerald-950/60 px-2 py-0.5 rounded">
                    Reg. Kirana Store
                  </span>
                </div>

                {/* Prominent Shop Board Title */}
                <div className="py-4 text-center">
                  <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest block">
                    {STORE_INFO.marathiName}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase mt-1 leading-tight">
                    Sai Provision & General Stores
                  </h2>
                  <p className="text-xs text-emerald-100 font-medium mt-1">
                    Gaytri Nagar, Snehal Colony, Jalgaon
                  </p>
                </div>

                {/* Hangyo Ice Cream & Partner Signboard Badge */}
                <div className="mt-2 pt-3 border-t border-emerald-700/60 flex items-center justify-between bg-emerald-950/40 -mx-5 -mb-5 px-5 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-pink-300 tracking-wide">
                      Hangyo Ice Cream Point
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-300 font-mono">
                    Chilled & Fresh
                  </span>
                </div>
              </div>

              {/* Physical Shop Snapshot & Verification Details */}
              <div className="mt-5 space-y-3.5">
                {/* Verified Proprietor & Management Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-stone-50 via-white to-emerald-50/40 border border-stone-200/90 shadow-xs flex items-start gap-3.5 sm:gap-4">
                  {/* Distinctive Proprietor Photograph Frame with Zoom In Button */}
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
                        loading="eager"
                      />
                      {/* Zoom Indicator Overlay */}
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold">
                        <ZoomIn className="w-4 h-4 text-amber-300 drop-shadow" />
                        <span className="scale-90 text-[10px]">Zoom</span>
                      </div>
                    </button>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-700 border-2 border-white flex items-center justify-center shadow-xs pointer-events-none" title="Verified Proprietor">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Information Details */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-900 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-300/70">
                        <CheckCircle className="w-3 h-3 text-emerald-700 shrink-0" />
                        {currentLanguage === 'mr' ? 'दुकान संचालक' : 'Proprietor & Manager'}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-white px-2 py-0.5 rounded border border-stone-200 shadow-2xs">
                        Verified
                      </span>
                    </div>

                    <div className="pt-0.5">
                      <h3 className="text-base sm:text-lg font-black text-stone-900 tracking-tight leading-snug">
                        {STORE_INFO.ownerName}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold text-emerald-800">
                        {STORE_INFO.marathiOwnerName}
                      </p>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {currentLanguage === 'mr'
                        ? 'गायत्री नगर व स्नेहल कॉलनी परिसरातील नागरिकांच्या सेवेत दर्जेदार किराणा व जनरल साहित्य.'
                        : 'Serving Gaytri Nagar, Snehal Colony & Jalgaon with premium staples & household goods.'}
                    </p>
                  </div>
                </div>

                {/* Direct Phone Numbers Strip with Pop-Up Hover */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href={getPhoneLink(STORE_INFO.primaryPhone)}
                    className="btn-pop p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 hover:bg-emerald-100 transition-all flex flex-col shadow-2xs"
                  >
                    <span className="text-[10px] text-emerald-700 font-medium">Primary / WhatsApp</span>
                    <span className="font-mono font-bold text-sm mt-0.5">{STORE_INFO.primaryPhone}</span>
                  </a>

                  <a
                    href={getPhoneLink(STORE_INFO.secondaryPhone)}
                    className="btn-pop p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 hover:bg-amber-100 transition-all flex flex-col shadow-2xs"
                  >
                    <span className="text-[10px] text-amber-700 font-medium">Secondary / UPI Pay</span>
                    <span className="font-mono font-bold text-sm mt-0.5">{STORE_INFO.secondaryPhone}</span>
                  </a>
                </div>

                {/* Quick Interactive Chit CTA with Pop-Up Hover */}
                <div className="pt-1">
                  <button
                    onClick={onOpenCart}
                    className="btn-pop w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-xl cursor-pointer"
                  >
                    <QrCode className="w-4 h-4 text-slate-900" />
                    <span>Create Digital Kirana List (किराणा यादी)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Pillar Trust Strip below Hero Split */}
        <div className="mt-12 pt-8 border-t border-stone-200/80 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-[#0F5132] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-stone-900">100% Pure Staples</h3>
              <p className="text-xs text-stone-500 mt-0.5">Clean unadulterated grains, pulses & oils</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center shrink-0 font-bold text-sm">
              🍦
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-stone-900">Hangyo Ice Creams</h3>
              <p className="text-xs text-stone-500 mt-0.5">Chilled cones, cups, chocobars & fresh dairy</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-stone-900">WhatsApp Grocery Chit</h3>
              <p className="text-xs text-stone-500 mt-0.5">Send your list; packed & ready for pickup</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-stone-900">PhonePe · GPay · UPI</h3>
              <p className="text-xs text-stone-500 mt-0.5">Instant zero-fee QR payment at counter</p>
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
