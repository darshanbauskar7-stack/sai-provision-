import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, Send, Copy, Check, ShoppingCart, User, MapPin } from 'lucide-react';
import { STORE_INFO, getWhatsAppLink } from '../data/storeInfo';
import { CartItem, CustomKiranaItem, Language } from '../types/store';

interface KiranaChitDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  customItems: CustomKiranaItem[];
  currentLanguage: Language;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onAddCustomItem: (name: string, quantity: string) => void;
  onRemoveCustomItem: (id: string) => void;
  onClearAll: () => void;
}

export const KiranaChitDrawer: React.FC<KiranaChitDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  customItems,
  currentLanguage,
  onUpdateQuantity,
  onRemoveItem,
  onAddCustomItem,
  onRemoveCustomItem,
  onClearAll,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [colonyArea, setColonyArea] = useState('Gaytri Nagar / Snehal Colony');
  const [additionalNote, setAdditionalNote] = useState('');
  const [selectedPhone, setSelectedPhone] = useState<string>(STORE_INFO.primaryPhone);

  const [customItemInput, setCustomItemInput] = useState('');
  const [customQtyInput, setCustomQtyInput] = useState('1 unit');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalIndicativePrice = cartItems.reduce(
    (sum, item) => sum + item.product.indicativePrice * item.quantity,
    0
  );

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0) + customItems.length;

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customItemInput.trim()) return;
    onAddCustomItem(customItemInput.trim(), customQtyInput.trim() || '1');
    setCustomItemInput('');
    setCustomQtyInput('1 unit');
  };

  const generateWhatsAppMessage = () => {
    let msg = `🛒 *किराणा यादी - साई प्रोव्हिजन अँड जनरल स्टोअर्स*\n`;
    msg += `📍 *Gaytri Nagar, Snehal Colony, Jalgaon*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    if (customerName.trim()) {
      msg += `👤 *ग्राहक नाव:* ${customerName.trim()}\n`;
    }
    if (colonyArea.trim()) {
      msg += `🏡 *पत्ता/परिसर:* ${colonyArea.trim()}\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*सामान यादी / Item List:*\n`;

    let index = 1;
    cartItems.forEach((item) => {
      msg += `${index}. ${item.product.name} (${item.product.regionalName.mr}) - [${item.product.unit}] x ${item.quantity} = ₹${item.product.indicativePrice * item.quantity}\n`;
      index++;
    });

    customItems.forEach((item) => {
      msg += `${index}. ${item.name} (${item.quantity})\n`;
      index++;
    });

    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💰 *अंदाजे एकूण रक्कम:* ₹${totalIndicativePrice} (Indicative)\n`;
    if (additionalNote.trim()) {
      msg += `📝 *टीप:* ${additionalNote.trim()}\n`;
    }
    msg += `\n*कृपया हे सामान तयार ठेवा. मी काउंटरवरून घेईन किंवा पत्त्यावर पाठवा. धन्यवाद!*`;
    return msg;
  };

  const handleSendWhatsApp = () => {
    const text = generateWhatsAppMessage();
    window.open(getWhatsAppLink(selectedPhone, text), '_blank', 'noopener,noreferrer');
  };

  const handleCopyChit = async () => {
    const text = generateWhatsAppMessage();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-lg bg-[#FDFBF7] h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-stone-300">
        {/* Drawer Header */}
        <div className="bg-[#0F5132] text-white p-4 sm:p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
              <ShoppingCart className="w-4 h-4 text-emerald-950" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                {currentLanguage === 'mr' ? 'डिजिटल किराणा पर्ची (यादी)' : 'Digital Kirana Parchi'}
              </h2>
              <p className="text-xs text-emerald-200">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} in your grocery list
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/80 transition-colors cursor-pointer"
            aria-label="Close chit drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Chit Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {totalItemsCount === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-[#0F5132] flex items-center justify-center">
                <ShoppingCart className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-stone-800 text-base">Your Kirana Chit is empty</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Browse our catalog and tap (+) on items to build your grocery list, or write custom items below!
              </p>
            </div>
          ) : (
            <>
              {/* Added Standard Items List */}
              {cartItems.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-500 uppercase tracking-wider pb-1">
                    <span>Catalog Items ({cartItems.length})</span>
                    <button
                      onClick={onClearAll}
                      className="text-red-700 hover:text-red-900 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>

                  <div className="divide-y divide-stone-200/80 bg-white rounded-xl border border-stone-200/90 shadow-2xs">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="p-3 flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-stone-900 truncate">
                            {item.product.name}
                          </div>
                          <div className="text-[11px] text-stone-500">
                            {item.product.regionalName.mr} · {item.product.unit} · ₹{item.product.indicativePrice}
                          </div>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="w-7 h-7 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold font-mono tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="w-7 h-7 rounded-md bg-emerald-100 hover:bg-emerald-200 text-emerald-900 flex items-center justify-center font-bold cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-1 text-stone-400 hover:text-red-700 ml-1 cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Extra Items */}
              {customItems.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                    Custom Added Items ({customItems.length})
                  </span>
                  <div className="divide-y divide-stone-200 bg-amber-50/50 rounded-xl border border-amber-200/80">
                    {customItems.map((item) => (
                      <div key={item.id} className="p-3 flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold text-stone-900">{item.name}</div>
                          <div className="text-[11px] text-amber-900">Qty: {item.quantity}</div>
                        </div>
                        <button
                          onClick={() => onRemoveCustomItem(item.id)}
                          className="p-1 text-stone-400 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Add Custom Item Form (Kirana Parchi handwritten feel) */}
          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs space-y-2">
            <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
              <span>✍️</span>
              <span>{currentLanguage === 'mr' ? 'इतर काही हवे आहे का? (येथे लिहा)' : 'Need something else? Add custom item'}</span>
            </span>
            <form onSubmit={handleAddCustom} className="flex gap-2">
              <input
                type="text"
                value={customItemInput}
                onChange={(e) => setCustomItemInput(e.target.value)}
                placeholder="उदा. २५० ग्रॅम जिरे, १ पॅक कापूर..."
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              <input
                type="text"
                value={customQtyInput}
                onChange={(e) => setCustomQtyInput(e.target.value)}
                placeholder="Qty (250g)"
                className="w-20 px-2 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              <button
                type="submit"
                className="btn-pop px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs rounded-lg shrink-0 cursor-pointer shadow-xs hover:shadow-md"
              >
                + Add
              </button>
            </form>
          </div>

          {/* Customer Delivery / Pickup Info */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 space-y-3">
            <span className="text-xs font-bold text-stone-800 block">
              {currentLanguage === 'mr' ? 'आपली माहिती (व्हॉट्सॲप मेसेजसाठी)' : 'Your Details (For WhatsApp Message)'}
            </span>

            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your Name (आपले नाव)"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-white border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                <input
                  type="text"
                  value={colonyArea}
                  onChange={(e) => setColonyArea(e.target.value)}
                  placeholder="Colony / Area in Jalgaon"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-white border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <input
                type="text"
                value={additionalNote}
                onChange={(e) => setAdditionalNote(e.target.value)}
                placeholder="Special note (e.g. Call before delivery, pack by 5 PM)"
                className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            {/* Choose WhatsApp Number */}
            <div className="pt-1">
              <span className="text-[11px] text-stone-500 font-medium block mb-1">
                Send to Store Contact:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedPhone(STORE_INFO.primaryPhone)}
                  className={`p-2 rounded-lg border text-left cursor-pointer transition-colors ${
                    selectedPhone === STORE_INFO.primaryPhone
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                      : 'border-stone-200 bg-white text-stone-700'
                  }`}
                >
                  <span className="block text-[10px] text-stone-500">Manoj Bauskar (Primary)</span>
                  <span className="font-mono">{STORE_INFO.primaryPhone}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPhone(STORE_INFO.secondaryPhone)}
                  className={`p-2 rounded-lg border text-left cursor-pointer transition-colors ${
                    selectedPhone === STORE_INFO.secondaryPhone
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                      : 'border-stone-200 bg-white text-stone-700'
                  }`}
                >
                  <span className="block text-[10px] text-stone-500">Store Support (Alt)</span>
                  <span className="font-mono">{STORE_INFO.secondaryPhone}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="bg-white border-t border-stone-200 p-4 sm:p-5 space-y-3 shadow-lg">
          {/* Indicative Total Bar */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-500">Estimated Total (अंदाजे रक्कम):</span>
            <span className="text-lg font-black text-stone-900 font-mono tabular-nums">
              ₹{totalIndicativePrice}*
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopyChit}
              disabled={totalItemsCount === 0}
              className="btn-pop px-3.5 py-3 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs hover:shadow-md transition-all disabled:opacity-50 cursor-pointer"
              title="Copy text list"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleSendWhatsApp}
              disabled={totalItemsCount === 0}
              className="btn-pop flex-1 py-3 px-4 rounded-xl bg-[#0F5132] hover:bg-[#166534] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all disabled:opacity-50 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-amber-300" />
              <span>
                {currentLanguage === 'mr'
                  ? `यादी व्हॉट्सॲपवर पाठवा (${selectedPhone})`
                  : `Send List to WhatsApp (${selectedPhone})`}
              </span>
            </button>
          </div>

          <p className="text-[10px] text-stone-400 text-center">
            *Final bill calculated by store based on actual weight and live mandi rates upon packaging.
          </p>
        </div>
      </div>
    </div>
  );
};
