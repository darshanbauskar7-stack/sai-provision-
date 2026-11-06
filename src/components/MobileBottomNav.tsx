import React from 'react';
import { Store, ShoppingBag, QrCode, Phone, MessageCircle } from 'lucide-react';
import { STORE_INFO, getWhatsAppLink, getPhoneLink } from '../data/storeInfo';
import { Language } from '../types/store';

interface MobileBottomNavProps {
  cartItemCount: number;
  onOpenCart: () => void;
  currentLanguage: Language;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  cartItemCount,
  onOpenCart,
  currentLanguage,
}) => {
  const handleWhatsApp = () => {
    const text = currentLanguage === 'mr'
      ? `नमस्कार मनोजजी, मला साई प्रोव्हिजन मधून किराणा ऑर्डर करायचा आहे.`
      : `Hello Manoj ji, I want to order groceries from Sai Provision and General Stores.`;
    window.open(getWhatsAppLink(STORE_INFO.primaryPhone, text), '_blank', 'noopener,noreferrer');
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg px-2 py-1.5 flex items-center justify-around text-[10px] font-semibold text-stone-600"
      style={{ maxHeight: '64px' }}
      aria-label="Mobile Bottom Navigation"
    >
      {/* Home / Top */}
      <a
        href="#"
        className="flex flex-col items-center gap-0.5 p-1.5 text-stone-600 hover:text-emerald-800"
      >
        <Store className="w-4 h-4 text-emerald-800" />
        <span>Shop</span>
      </a>

      {/* Catalog */}
      <a
        href="#catalog"
        className="flex flex-col items-center gap-0.5 p-1.5 text-stone-600 hover:text-emerald-800"
      >
        <ShoppingBag className="w-4 h-4 text-emerald-800" />
        <span>Items</span>
      </a>

      {/* Kirana Chit Button with Counter Badge */}
      <button
        onClick={onOpenCart}
        className="relative flex flex-col items-center gap-0.5 p-1.5 text-[#0F5132] font-bold cursor-pointer"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shadow-xs">
            <ShoppingBag className="w-4 h-4" />
          </div>
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center font-mono">
              {cartItemCount}
            </span>
          )}
        </div>
        <span className="text-[9px]">Chit ({cartItemCount})</span>
      </button>

      {/* UPI QR */}
      <a
        href="#upi-payment"
        className="flex flex-col items-center gap-0.5 p-1.5 text-stone-600 hover:text-emerald-800"
      >
        <QrCode className="w-4 h-4 text-emerald-800" />
        <span>UPI Pay</span>
      </a>

      {/* Direct WhatsApp Order */}
      <button
        onClick={handleWhatsApp}
        className="flex flex-col items-center gap-0.5 p-1.5 text-emerald-800 font-bold cursor-pointer"
      >
        <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
        <span>WhatsApp</span>
      </button>
    </nav>
  );
};
