export type Language = 'en' | 'mr' | 'hi';

export interface Category {
  id: string;
  name: string;
  regionalName: {
    mr: string;
    hi: string;
  };
  description: string;
  iconName: string;
  accentColor: string;
  itemCount?: number;
}

export interface Product {
  id: string;
  name: string;
  regionalName: {
    mr: string;
    hi: string;
  };
  categoryId: string;
  unit: string;
  indicativePrice: number;
  mrp?: number;
  inStock: boolean;
  description: string;
  brand?: string;
  isPopular?: boolean;
  isSpecialty?: boolean;
  tag?: string;
  visualTheme: {
    gradient: string;
    border: string;
    iconBg: string;
    iconColor: string;
    emoji: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  customNote?: string;
}

export interface CustomKiranaItem {
  id: string;
  name: string;
  quantity: string;
}

export interface StoreDetails {
  name: string;
  marathiName: string;
  ownerName: string;
  marathiOwnerName: string;
  primaryPhone: string;
  secondaryPhone: string;
  addressLine: string;
  colony: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  openTime: string;
  closeTime: string;
  upiIdPrimary: string;
  upiIdSecondary: string;
  specialSign: string; // "Hangyo Ice Cream"
  ownerPhotoUrl?: string;
  paymentQrUrl: string;
}
