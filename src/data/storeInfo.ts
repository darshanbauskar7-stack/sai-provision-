import { StoreDetails } from '../types/store';

export const STORE_INFO: StoreDetails = {
  name: 'Sai Provision and General Stores',
  marathiName: 'साई प्रोव्हिजन अँड जनरल स्टोअर्स',
  ownerName: 'Manoj Vasant Bauskar',
  marathiOwnerName: 'मनोज वसंत बाऊस्कर',
  ownerPhotoUrl: '/assets/manoj_vasant_bauskar.jpg',
  primaryPhone: '8177871407',
  secondaryPhone: '7276791407',
  addressLine: 'Gaytri Nagar, Snehal Colony',
  colony: 'Snehal Colony',
  area: 'Gaytri Nagar',
  city: 'Jalgaon',
  state: 'Maharashtra',
  pincode: '425001',
  openTime: '07:00 AM',
  closeTime: '10:00 PM',
  upiIdPrimary: '8177871407@upi',
  upiIdSecondary: '7276791407@upi',
  specialSign: 'Authorized Hangyo Ice Cream & Cold Dairy Point',
  paymentQrUrl: '/assets/sai_payment_qr.png',
};

export const getWhatsAppLink = (phone: string, text: string) => {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/91${cleanPhone}?text=${encodedText}`;
};

export const getPhoneLink = (phone: string) => {
  const cleanPhone = phone.replace(/\D/g, '');
  return `tel:+91${cleanPhone}`;
};
