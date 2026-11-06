import React from 'react';
import { Phone, MessageCircle, MapPin, Heart, Download } from 'lucide-react';
import { STORE_INFO, getWhatsAppLink, getPhoneLink } from '../data/storeInfo';
import { Language } from '../types/store';

interface FooterProps {
  currentLanguage: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLanguage }) => {
  return (
    <footer id="contact" className="bg-[#0b3c25] text-stone-300 pt-12 pb-24 sm:pb-12 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-emerald-900/60">
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-900 flex items-center justify-center font-bold text-sm">
                साई
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Sai Provision and General Stores
              </span>
            </div>
            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-sm">
              Your dependable neighborhood grocer in Gaytri Nagar, Snehal Colony, Jalgaon. Serving fresh grains, pure edible oils, spices, Hangyo ice creams, and daily essentials with honest rates.
            </p>
            <div className="text-xs text-amber-300 font-medium">
              Proprietor: Manoj Vasant Bauskar ({STORE_INFO.marathiOwnerName})
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Quick Navigation
            </span>
            <ul className="space-y-1.5 text-xs text-emerald-200/80">
              <li>
                <a href="#catalog" className="hover:text-amber-300 transition-colors">
                  Grocery Catalog & Staples
                </a>
              </li>
              <li>
                <a href="#upi-payment" className="hover:text-amber-300 transition-colors">
                  PhonePe, GPay & BHIM UPI
                </a>
              </li>
              <li>
                <a href="#store-info" className="hover:text-amber-300 transition-colors">
                  Store Hours & Directions
                </a>
              </li>
              <li>
                <a href={getWhatsAppLink(STORE_INFO.primaryPhone, 'Hello Manoj ji')} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">
                  Direct WhatsApp Help
                </a>
              </li>
              <li className="pt-1 border-t border-emerald-900/80">
                <a
                  href="/sai-provision-stores.zip"
                  download="sai-provision-stores.zip"
                  className="btn-pop inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-900/60 border border-emerald-700/60 text-amber-300 font-bold hover:text-amber-200 hover:bg-emerald-800/80 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Project (.ZIP)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Store Facts (4 cols) */}
          <div className="md:col-span-4 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Shop Location & Phones
            </span>
            <div className="text-xs space-y-1.5 text-emerald-200/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Gaytri Nagar, Snehal Colony, Jalgaon, Maharashtra – 425001</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={getPhoneLink(STORE_INFO.primaryPhone)} className="hover:text-white font-mono">
                  {STORE_INFO.primaryPhone} (Primary)
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={getPhoneLink(STORE_INFO.secondaryPhone)} className="hover:text-white font-mono">
                  {STORE_INFO.secondaryPhone} (Secondary / UPI)
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/80 gap-3">
          <p>
            © {new Date().getFullYear()} Sai Provision and General Stores. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            <span>Serving Snehal Colony, Jalgaon with care</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
