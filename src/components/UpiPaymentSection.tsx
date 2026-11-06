import React, { useState } from 'react';
import { QrCode, Copy, Check, ShieldCheck, Smartphone, AlertCircle, ArrowRight } from 'lucide-react';
import { STORE_INFO } from '../data/storeInfo';
import { Language } from '../types/store';

interface UpiPaymentSectionProps {
  currentLanguage: Language;
}

export const UpiPaymentSection: React.FC<UpiPaymentSectionProps> = ({ currentLanguage }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="upi-payment" className="py-12 bg-gradient-to-b from-stone-50 to-[#FDFBF7] border-y border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
            <span>{currentLanguage === 'mr' ? 'डिजिटल पेमेंट सुविधा' : 'Contactless UPI Payments'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {currentLanguage === 'mr' ? 'फोनपे, गुगल पे आणि भीम यूपीआय' : 'PhonePe · Google Pay · BHIM UPI'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            {currentLanguage === 'mr'
              ? 'काउंटरवर थेट क्यूआर कोड स्कॅन करा किंवा व्हॉट्सॲपवर सामान कन्फर्म झाल्यावर मोबाईल नंबरवर यूपीआय पेमेंट करा.'
              : 'Fast, secure and zero-fee payments accepted directly to verified merchant Manoj Vasant Bauskar.'}
          </p>
        </div>

        {/* Main Payment Container */}
        <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8">
          {/* Left Column: QR Code Visual Card (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center text-center p-5 sm:p-6 bg-gradient-to-b from-emerald-50/60 to-white rounded-2xl border border-emerald-100 shadow-xs">
            {/* Merchant Badge */}
            <div className="text-xs font-bold text-emerald-900 bg-emerald-100/80 px-3 py-1 rounded-full mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Verified Local Merchant</span>
            </div>

            {/* Scan to Pay Heading */}
            <div className="mb-3">
              <h3 className="text-lg font-bold text-stone-900 tracking-tight">
                Scan to Pay
              </h3>
              <p className="text-xs text-stone-500">
                {currentLanguage === 'mr' ? 'कोणत्याही यूपीआय ॲपने स्कॅन करा' : 'Scan with any UPI app'}
              </p>
            </div>

            {/* Actual Cropped Payment QR Code */}
            <div className="p-2.5 sm:p-3 bg-white rounded-2xl border-2 border-stone-800 shadow-md relative group">
              <img
                src={STORE_INFO.paymentQrUrl}
                alt="Sai Provision & General Stores UPI QR Code - Scan to Pay"
                className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-xl bg-white"
                loading="eager"
              />
            </div>

            {/* Merchant Identification */}
            <div className="mt-3.5">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                Payee Name
              </span>
              <span className="text-sm font-bold text-stone-900 block">
                {STORE_INFO.ownerName}
              </span>
              <span className="text-xs text-stone-600 font-medium">
                Sai Provision & General Stores
              </span>
            </div>
          </div>

          {/* Right Column: Accepted Apps & Number Copy (7 cols) */}
          <div className="md:col-span-7 space-y-6">
            {/* Accepted App Logos / Badges */}
            <div>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2.5">
                Supported Direct Apps
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {/* PhonePe */}
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-center flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#5f259f] text-white flex items-center justify-center font-bold text-sm">
                    पे
                  </div>
                  <span className="text-xs font-bold text-purple-900 mt-1">PhonePe</span>
                  <span className="text-[10px] text-purple-600 font-mono">Any QR Scan</span>
                </div>

                {/* Google Pay */}
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-white border border-blue-200 text-blue-600 flex items-center justify-center font-black text-sm">
                    G
                  </div>
                  <span className="text-xs font-bold text-blue-900 mt-1">Google Pay</span>
                  <span className="text-[10px] text-blue-600 font-mono">Instant Pay</span>
                </div>

                {/* BHIM UPI */}
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#0F5132] text-amber-300 flex items-center justify-center font-bold text-xs">
                    BHIM
                  </div>
                  <span className="text-xs font-bold text-emerald-900 mt-1">BHIM UPI</span>
                  <span className="text-[10px] text-emerald-600 font-mono">Zero Charges</span>
                </div>
              </div>
            </div>

            {/* Quick Copy UPI Numbers */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                Pay via Registered Mobile Number
              </span>

              {/* Number 1 */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-stone-500 font-medium block">
                    Primary Contact & UPI (Manoj Bauskar)
                  </span>
                  <span className="text-base font-bold text-stone-900 font-mono tabular-nums tracking-wide">
                    {STORE_INFO.primaryPhone}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(STORE_INFO.primaryPhone, 'phone1')}
                  className="btn-pop px-3.5 py-1.5 rounded-lg bg-white hover:bg-stone-100 text-stone-800 text-xs font-semibold border border-stone-300 flex items-center gap-1.5 cursor-pointer shadow-xs active:shadow-inner"
                >
                  {copiedKey === 'phone1' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-600" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Number 2 */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-stone-500 font-medium block">
                    Secondary Support Number
                  </span>
                  <span className="text-base font-bold text-stone-900 font-mono tabular-nums tracking-wide">
                    {STORE_INFO.secondaryPhone}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(STORE_INFO.secondaryPhone, 'phone2')}
                  className="btn-pop px-3.5 py-1.5 rounded-lg bg-white hover:bg-stone-100 text-stone-800 text-xs font-semibold border border-stone-300 flex items-center gap-1.5 cursor-pointer shadow-xs active:shadow-inner"
                >
                  {copiedKey === 'phone2' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-600" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Clear Security & Payment Instructions Notice */}
            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-950 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Safe Payment Policy</span>
              </div>
              <p className="text-[11px] text-emerald-900 leading-relaxed">
                We accept direct in-store UPI scanning or phone payments only after you confirm your grocery list on WhatsApp.
                <strong> We NEVER ask for card numbers, OTPs, or passwords online.</strong> Cash payment is always welcome at the store counter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
