import React from 'react';
import { ShoppingBag, MessageCircle, Phone, Menu, X, Check, Download } from 'lucide-react';
import { STORE_INFO, getWhatsAppLink, getPhoneLink } from '../data/storeInfo';
import { Language } from '../types/store';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  cartItemCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  cartItemCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: currentLanguage === 'mr' ? 'किराणा यादी' : currentLanguage === 'hi' ? 'सामान कैटलॉग' : 'Grocery Catalog', href: '#catalog' },
    { label: currentLanguage === 'mr' ? 'डिजिटल पर्ची' : currentLanguage === 'hi' ? 'डिजिटल पर्ची' : 'Kirana Chit', href: '#kirana-chit' },
    { label: currentLanguage === 'mr' ? 'UPI पेमेंट्स' : currentLanguage === 'hi' ? 'UPI पेमेंट' : 'UPI Payments', href: '#upi-payment' },
    { label: currentLanguage === 'mr' ? 'दुकानाची माहिती' : currentLanguage === 'hi' ? 'दुकान की जानकारी' : 'Store Details', href: '#store-info' },
    { label: currentLanguage === 'mr' ? 'संपर्क' : currentLanguage === 'hi' ? 'संपर्क' : 'Contact Us', href: '#contact' },
  ];

  const handleWhatsAppQuickOrder = () => {
    const defaultMsg = currentLanguage === 'mr' 
      ? `नमस्कार मनोजजी, मला साई प्रोव्हिजन अँड जनरल स्टोअर्समधून किराणा सामान ऑर्डर करायचे आहे.`
      : currentLanguage === 'hi'
      ? `नमस्ते मनोज जी, मुझे साई प्रोविजन एंड जनरल स्टोर्स से किराना सामान मंगवाना है।`
      : `Hello Manoj ji, I would like to order groceries from Sai Provision and General Stores, Jalgaon.`;
    window.open(getWhatsAppLink(STORE_INFO.primaryPhone, defaultMsg), '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0F5132] text-white shadow-md border-b border-emerald-900/40">
      {/* Top Utility Announcement Row */}
      <div className="bg-[#0b3c25] px-4 py-1.5 text-xs text-emerald-100 flex items-center justify-between border-b border-emerald-800/60">
        <div className="flex items-center gap-3 truncate">
          <span className="inline-flex items-center gap-1.5 font-medium text-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            {currentLanguage === 'mr' ? 'दुकान सुरू: सकाळी ७ ते रात्री १०' : currentLanguage === 'hi' ? 'दुकान खुली है: सुबह ७ से रात १०' : 'Store Open: 7:00 AM – 10:00 PM'}
          </span>
          <span className="hidden sm:inline text-emerald-400/60">|</span>
          <span className="hidden sm:inline text-emerald-200/90 truncate">
            {STORE_INFO.addressLine}, {STORE_INFO.city}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/sai-provision-stores.zip"
            download="sai-provision-stores.zip"
            className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-900/90 hover:bg-emerald-800 text-amber-300 hover:text-amber-200 text-[11px] font-semibold border border-emerald-700/80 transition-colors"
            title="Download full project ZIP"
          >
            <Download className="w-3 h-3" />
            <span>Download ZIP</span>
          </a>

          <a
            href={getPhoneLink(STORE_INFO.primaryPhone)}
            className="flex items-center gap-1 text-emerald-200 hover:text-white transition-colors"
            title="Call primary contact"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono tabular-nums font-semibold tracking-wide">{STORE_INFO.primaryPhone}</span>
          </a>

          {/* Clean Language Selector */}
          <div className="flex items-center bg-emerald-950/60 rounded px-1 py-0.5 border border-emerald-800/80 text-[11px]">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-1.5 py-0.5 rounded transition-colors ${currentLanguage === 'en' ? 'bg-amber-400 text-slate-900 font-bold' : 'text-emerald-200 hover:text-white'}`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('mr')}
              className={`px-1.5 py-0.5 rounded transition-colors ${currentLanguage === 'mr' ? 'bg-amber-400 text-slate-900 font-bold' : 'text-emerald-200 hover:text-white'}`}
            >
              मराठी
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-1.5 py-0.5 rounded transition-colors ${currentLanguage === 'hi' ? 'bg-amber-400 text-slate-900 font-bold' : 'text-emerald-200 hover:text-white'}`}
            >
              हिंदी
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Nav links) - Zone 3 (Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-2.5 text-white hover:text-amber-300 transition-colors shrink-0">
          <div className="w-9 h-9 rounded-lg bg-amber-400 text-[#0F5132] flex items-center justify-center font-bold text-lg shadow-sm">
            साई
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap leading-tight">
              Sai Provision & General Stores
            </span>
            <span className="text-[11px] text-amber-200/90 font-medium whitespace-nowrap">
              {currentLanguage === 'mr' ? 'गायत्री नगर, स्नेहल कॉलनी, जळगाव' : 'Gaytri Nagar, Snehal Colony, Jalgaon'}
            </span>
          </div>
        </a>

        {/* Zone 2: Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-emerald-100">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Chit Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Kirana Chit Button with Counter */}
          <button
            onClick={onOpenCart}
            className="btn-pop relative flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-800/90 hover:bg-emerald-700 text-white border border-emerald-700/80 shadow-sm cursor-pointer whitespace-nowrap"
            title="Open digital grocery chit"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">
              {currentLanguage === 'mr' ? 'किराणा यादी' : currentLanguage === 'hi' ? 'किराना पर्ची' : 'Kirana Chit'}
            </span>
            {cartItemCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 text-slate-900 font-bold text-xs font-mono tabular-nums">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={handleWhatsAppQuickOrder}
            className="btn-pop hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 shadow-md cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 text-emerald-900 fill-emerald-900" />
            <span>{currentLanguage === 'mr' ? 'व्हॉट्सॲप ऑर्डर' : currentLanguage === 'hi' ? 'व्हाट्सएप ऑर्डर' : 'WhatsApp Order'}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800/60"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c4128] border-t border-emerald-800/80 px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded text-sm font-medium text-emerald-100 hover:text-white hover:bg-emerald-800/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-emerald-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppQuickOrder();
              }}
              className="btn-pop w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold rounded-lg bg-amber-400 text-slate-900 cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-900" />
              <span>{currentLanguage === 'mr' ? 'व्हॉट्सॲपवर संपर्क करा' : 'Contact on WhatsApp (8177871407)'}</span>
            </button>
            <a
              href={getPhoneLink(STORE_INFO.primaryPhone)}
              className="btn-pop w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-emerald-800 text-white cursor-pointer shadow-sm"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>Call Manoj Bauskar (8177871407)</span>
            </a>
            <a
              href="/sai-provision-stores.zip"
              download="sai-provision-stores.zip"
              className="btn-pop w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-emerald-950 text-amber-300 border border-emerald-700/80 hover:bg-emerald-900 cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Complete Project (.ZIP)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
