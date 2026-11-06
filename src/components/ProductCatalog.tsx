import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, MessageCircle, Check, Info, Sparkles, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { STORE_INFO, getWhatsAppLink } from '../data/storeInfo';
import { Product, Language, CartItem } from '../types/store';

interface ProductCatalogProps {
  currentLanguage: Language;
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onOpenCart: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  currentLanguage,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onOpenCart,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [onlyPopular, setOnlyPopular] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Cart lookup map
  const cartItemMap = useMemo(() => {
    const map = new Map<string, number>();
    cartItems.forEach((item) => {
      map.set(item.product.id, item.quantity);
    });
    return map;
  }, [cartItems]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.categoryId !== selectedCategory) {
        return false;
      }

      // Popular filter
      if (onlyPopular && !product.isPopular) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesMr = product.regionalName.mr.toLowerCase().includes(query);
        const matchesHi = product.regionalName.hi.toLowerCase().includes(query);
        const matchesBrand = product.brand?.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        return matchesName || matchesMr || matchesHi || matchesBrand || matchesDesc;
      }

      return true;
    });
  }, [selectedCategory, onlyPopular, searchQuery]);

  const handleProductWhatsAppEnquiry = (product: Product) => {
    const text = currentLanguage === 'mr'
      ? `नमस्कार मनोजजी, मला साई प्रोव्हिजन मधून '${product.regionalName.mr}' (${product.name} - ${product.unit}) बद्दल चौकशी करायची आहे.`
      : currentLanguage === 'hi'
      ? `नमस्ते मनोज जी, मुझे साई प्रोविजन से '${product.regionalName.hi}' (${product.name} - ${product.unit}) के बारे में पूछना है।`
      : `Hello Manoj ji, I want to inquire about '${product.name}' (${product.unit}) from Sai Provision and General Stores.`;

    window.open(getWhatsAppLink(STORE_INFO.primaryPhone, text), '_blank', 'noopener,noreferrer');
  };

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return PRODUCTS.length;
    return PRODUCTS.filter((p) => p.categoryId === categoryId).length;
  };

  return (
    <section id="catalog" className="py-12 bg-[#FDFBF7] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>{currentLanguage === 'mr' ? 'किराणा व जनरल वस्तू' : currentLanguage === 'hi' ? 'किराना व जनरल सामान' : 'Store Catalog & Staples'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              {currentLanguage === 'mr' ? 'सर्व किराणा सामान शोधा आणि यादी बनवा' : 'Browse Quality Groceries & Daily Needs'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {currentLanguage === 'mr'
                ? 'खालील वस्तूंमधून निवडा, (+) दाबून डिजिटल पर्चीमध्ये जोडा आणि एका क्लिकवर व्हॉट्सॲपवर पाठवा.'
                : 'Select items to build your Kirana Parchi (order list), then send directly to WhatsApp for fast pickup.'}
            </p>
          </div>

          {/* Quick Indicative Price Note */}
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-900 text-xs shrink-0 max-w-md">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Note:</strong> Indicative Jalgaon retail prices. Exact cost depends on pack size & daily mandi rates.
            </span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                currentLanguage === 'mr'
                  ? 'तांदूळ, डाळ, तेल, मॅगी, साबण, हँक्यो आईस्क्रीम शोधा...'
                  : currentLanguage === 'hi'
                  ? 'चावल, दाल, तेल, मैगी, साबुन, हैंग्यो आइसक्रीम खोजें...'
                  : 'Search rice, toor dal, oil, spices, snacks, Hangyo ice cream...'
              }
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-stone-900 placeholder:text-stone-400 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Quick Switches */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setOnlyPopular(!onlyPopular)}
              className={`btn-pop flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                onlyPopular
                  ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-md'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50 shadow-2xs'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentLanguage === 'mr' ? 'लोकप्रिय वस्तू' : 'Popular Items'}</span>
            </button>

            <button
              onClick={onOpenCart}
              className="btn-pop flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#0F5132] text-white hover:bg-[#166534] transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>View Chit ({cartItems.reduce((acc, curr) => acc + curr.quantity, 0)})</span>
            </button>
          </div>
        </div>

        {/* Category Horizontal Scroll Bar with subtle fade-in-up */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar text-xs font-medium"
        >
          {CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategory === cat.id;
            const count = getCategoryCount(cat.id);
            return (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.015 }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F5132] text-white font-bold shadow-md'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 shadow-2xs hover:shadow-sm'
                }`}
              >
                <span>
                  {currentLanguage === 'mr'
                    ? cat.regionalName.mr
                    : currentLanguage === 'hi'
                    ? cat.regionalName.hi
                    : cat.name}
                </span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full tabular-nums ${
                    isSelected ? 'bg-emerald-900 text-emerald-200' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Results Counter and Filter feedback */}
        <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
          <div>
            Showing <strong className="text-stone-800 tabular-nums">{filteredProducts.length}</strong> items
            {selectedCategory !== 'all' && (
              <span>
                {' '}in category <em>{CATEGORIES.find((c) => c.id === selectedCategory)?.name}</em>
              </span>
            )}
            {searchQuery && (
              <span> matching &quot;{searchQuery}&quot;</span>
            )}
          </div>
          {(selectedCategory !== 'all' || searchQuery || onlyPopular) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setOnlyPopular(false);
              }}
              className="text-emerald-700 hover:underline font-semibold"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mt-10 p-12 text-center bg-white rounded-2xl border border-dashed border-stone-300">
            <p className="text-stone-600 font-medium">No items found matching your search query.</p>
            <p className="text-xs text-stone-500 mt-1">
              You can still add any custom Kirana item directly into your WhatsApp Chit!
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setOnlyPopular(false);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800"
              >
                Clear Filters
              </button>
              <button
                onClick={onOpenCart}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-[#0F5132] text-white hover:bg-[#166534]"
              >
                Add Custom Item to Chit
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            layout
            className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filteredProducts.map((product, index) => {
              const currentQty = cartItemMap.get(product.id) || 0;

              return (
                <motion.div
                  key={product.id}
                  layout="position"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{
                    duration: 0.32,
                    delay: Math.min((index % 6) * 0.04, 0.24),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -3, transition: { duration: 0.15 } }}
                  className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  {/* Top Visual Showcase Area (65% proportion per e-commerce reference) */}
                  <div>
                    <div
                      className={`relative h-44 w-full bg-gradient-to-br ${product.visualTheme.gradient} p-4 flex flex-col justify-between border-b ${product.visualTheme.border}`}
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold tracking-wider uppercase text-stone-600 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded">
                          {product.brand || 'Daily Essential'}
                        </span>
                        {product.isSpecialty ? (
                          <span className="text-[10px] font-bold text-pink-700 bg-pink-100/90 px-2 py-0.5 rounded border border-pink-200">
                            Hangyo Special
                          </span>
                        ) : product.isPopular ? (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded border border-amber-200">
                            Customer Favorite
                          </span>
                        ) : null}
                      </div>

                      {/* Center Food / Product Motif Graphic */}
                      <div className="flex flex-col items-center justify-center my-auto">
                        <span className="text-4xl filter drop-shadow-sm select-none group-hover:scale-110 transition-transform duration-200">
                          {product.visualTheme.emoji}
                        </span>
                        <span className="text-[11px] font-medium text-stone-600 mt-1 font-mono">
                          {product.unit}
                        </span>
                      </div>

                      {/* Bottom Visual Tag */}
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-stone-500 font-medium truncate max-w-[150px]">
                          {product.regionalName.mr}
                        </span>
                        <span className="text-emerald-800 font-bold bg-white/90 px-1.5 py-0.5 rounded shadow-2xs">
                          In Store
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 space-y-2">
                      <div className="space-y-0.5">
                        <h3 className="font-bold text-sm text-stone-900 group-hover:text-emerald-900 transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-stone-500 font-medium line-clamp-1">
                          {product.regionalName.mr} · {product.regionalName.hi}
                        </p>
                      </div>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Price Strip */}
                      <div className="pt-2 flex items-baseline justify-between border-t border-stone-100">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-extrabold text-stone-900 font-mono tabular-nums">
                            ₹{product.indicativePrice}
                          </span>
                          <span className="text-[11px] text-stone-500">/ {product.unit}</span>
                          {product.mrp && product.mrp > product.indicativePrice && (
                            <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                              ₹{product.mrp}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-medium">
                          Indicative
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-4 pt-0 space-y-2">
                    {/* Add to Chit / Stepper Button */}
                    {currentQty === 0 ? (
                      <button
                        onClick={() => onAddToCart(product)}
                        className="btn-pop w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#0F5132] font-bold text-xs border border-emerald-300/80 flex items-center justify-center gap-1.5 shadow-2xs hover:shadow-md cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-emerald-800" />
                        <span>{currentLanguage === 'mr' ? 'यादीत जोडा' : 'Add to WhatsApp Chit'}</span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-between bg-emerald-800 text-white rounded-xl p-1 shadow-sm">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="w-8 h-8 rounded-lg bg-emerald-900 hover:bg-emerald-950 flex items-center justify-center font-bold text-sm transition-transform active:scale-90 hover:scale-105 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold font-mono text-sm tabular-nums">
                          {currentQty} in list
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="w-8 h-8 rounded-lg bg-emerald-700 hover:bg-emerald-600 flex items-center justify-center font-bold text-sm transition-transform active:scale-90 hover:scale-105 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Direct WhatsApp Enquiry Link */}
                    <button
                      onClick={() => handleProductWhatsAppEnquiry(product)}
                      className="btn-pop w-full py-1.5 text-[11px] text-stone-600 hover:text-emerald-800 font-semibold flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{currentLanguage === 'mr' ? 'या वस्तूबद्दल विचारा' : 'Direct WhatsApp Ask'}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};
