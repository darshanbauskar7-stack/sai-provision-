import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { KiranaChitDrawer } from './components/KiranaChitDrawer';
import { UpiPaymentSection } from './components/UpiPaymentSection';
import { StoreLocationContact } from './components/StoreLocationContact';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Product, CartItem, CustomKiranaItem, Language } from './types/store';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('sai_store_lang');
      return (saved as Language) || 'en';
    } catch {
      return 'en';
    }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sai_store_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customItems, setCustomItems] = useState<CustomKiranaItem[]>(() => {
    try {
      const saved = localStorage.getItem('sai_store_custom_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sai_store_lang', currentLanguage);
    } catch {}
  }, [currentLanguage]);

  useEffect(() => {
    try {
      localStorage.setItem('sai_store_cart', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('sai_store_custom_items', JSON.stringify(customItems));
    } catch {}
  }, [customItems]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 2400);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showNotification(`Added ${product.name} to your Kirana Chit`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleAddCustomItem = (name: string, quantity: string) => {
    const newItem: CustomKiranaItem = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name,
      quantity,
    };
    setCustomItems((prev) => [...prev, newItem]);
    showNotification(`Added "${name}" to your list`);
  };

  const handleRemoveCustomItem = (id: string) => {
    setCustomItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setCartItems([]);
    setCustomItems([]);
    showNotification('Cleared grocery list');
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0) + customItems.length;

  const handleNavigateToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] flex flex-col font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 bg-[#0F5132] text-white px-4 py-2 rounded-xl shadow-lg border border-emerald-700/80 text-xs font-semibold animate-in fade-in slide-in-from-top-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          currentLanguage={currentLanguage}
          onOpenCart={() => setIsCartOpen(true)}
          onNavigateToCatalog={handleNavigateToCatalog}
        />

        {/* Grocery & General Store Catalog */}
        <ProductCatalog
          currentLanguage={currentLanguage}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* UPI Payments Section */}
        <UpiPaymentSection currentLanguage={currentLanguage} />

        {/* Store Location, Timings, Map & FAQs */}
        <StoreLocationContact currentLanguage={currentLanguage} />
      </main>

      {/* Footer */}
      <Footer currentLanguage={currentLanguage} />

      {/* Slide-In Digital Kirana Chit Drawer */}
      <KiranaChitDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        customItems={customItems}
        currentLanguage={currentLanguage}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddCustomItem={handleAddCustomItem}
        onRemoveCustomItem={handleRemoveCustomItem}
        onClearAll={handleClearAll}
      />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        currentLanguage={currentLanguage}
      />
    </div>
  );
}
