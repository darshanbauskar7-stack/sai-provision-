import { Category } from '../types/store';

export const CATEGORIES: Category[] = [
  {
    id: 'all',
    name: 'All Items',
    regionalName: {
      mr: 'सर्व वस्तू',
      hi: 'सभी सामान',
    },
    description: 'Complete grocery & general store selection',
    iconName: 'Store',
    accentColor: '#0F5132',
  },
  {
    id: 'grains-atta',
    name: 'Rice, Grains & Atta',
    regionalName: {
      mr: 'तांदूळ, धान्य व पीठ',
      hi: 'चावल, अनाज और आटा',
    },
    description: 'Kolam rice, Basmati, Sharbati wheat atta, maida, sooji & poha',
    iconName: 'Wheat',
    accentColor: '#D97706',
  },
  {
    id: 'pulses-dal',
    name: 'Pulses & Dal',
    regionalName: {
      mr: 'डाळी व कडधान्ये',
      hi: 'दालें और दलहन',
    },
    description: 'Gavran Toor dal, Moong, Chana dal, Urad, Matki & Rajma',
    iconName: 'CircleDot',
    accentColor: '#B45309',
  },
  {
    id: 'oils-ghee',
    name: 'Cooking Oil & Ghee',
    regionalName: {
      mr: 'खाद्यतेल व साजूक तूप',
      hi: 'कुकिंग ऑयल और घी',
    },
    description: 'Groundnut, Sunflower, Mustard, Cottonseed & Pure Cow Ghee',
    iconName: 'Droplet',
    accentColor: '#EA580C',
  },
  {
    id: 'spices-sugar-salt',
    name: 'Spices, Salt & Sugar',
    regionalName: {
      mr: 'मसाले, मीठ व साखर',
      hi: 'मसाले, नमक और चीनी',
    },
    description: 'Haldi, Mirchi, Dhaniya powder, Tata salt, M-30 sugar & hing',
    iconName: 'Sparkles',
    accentColor: '#DC2626',
  },
  {
    id: 'tea-beverages',
    name: 'Tea, Coffee & Drinks',
    regionalName: {
      mr: 'चहा, कॉफी व पेये',
      hi: 'चाय, कॉफी और पेय',
    },
    description: 'Wagh Bakri, Red Label, Society tea, Nescafe coffee & syrups',
    iconName: 'Coffee',
    accentColor: '#92400E',
  },
  {
    id: 'snacks-biscuits',
    name: 'Biscuits, Snacks & Maggi',
    regionalName: {
      mr: 'बिस्किटे, स्नॅक्स व मॅगी',
      hi: 'बिस्कुट, नमकीन और मैगी',
    },
    description: 'Parle-G, Good Day, Marie, Toast, Kurkure, Lays & 2-min Noodles',
    iconName: 'Cookie',
    accentColor: '#CA8A04',
  },
  {
    id: 'dairy-icecream',
    name: 'Dairy & Hangyo Ice Cream',
    regionalName: {
      mr: 'डेअरी व हँक्यो आईस्क्रीम',
      hi: 'डेयरी और हैंग्यो आइसक्रीम',
    },
    description: 'Amul fresh milk, curd, paneer, Hangyo ice cream cones & cups',
    iconName: 'IceCream',
    accentColor: '#DB2777',
  },
  {
    id: 'personal-care',
    name: 'Soaps & Personal Care',
    regionalName: {
      mr: 'साबण व पर्सनल केअर',
      hi: 'साबुन और व्यक्तिगत देखभाल',
    },
    description: 'Dettol, Lifebuoy, Colgate, Clinic Plus shampoo & hair oils',
    iconName: 'Smile',
    accentColor: '#2563EB',
  },
  {
    id: 'cleaning-homecare',
    name: 'Detergents & Cleaning',
    regionalName: {
      mr: 'डिटर्जंट व स्वच्छता',
      hi: 'सर्फ, डिटर्जेंट और सफाई',
    },
    description: 'Surf Excel, Rin, Wheel, Vim dishwash bar, Harpic & brooms',
    iconName: 'ShieldCheck',
    accentColor: '#059669',
  },
  {
    id: 'pooja-essentials',
    name: 'Pooja & Daily Essentials',
    regionalName: {
      mr: 'पूजा व रोजचे साहित्य',
      hi: 'पूजा और दैनिक आवश्यक वस्तुएं',
    },
    description: 'Mangaldeep agarbatti, camphor, batti wicks, matchboxes & dhoop',
    iconName: 'Flame',
    accentColor: '#7C3AED',
  },
  {
    id: 'stationery-general',
    name: 'Stationery & General Store',
    regionalName: {
      mr: 'स्टेशनरी व जनरल सामान',
      hi: 'स्टेशनरी और जनरल स्टोर',
    },
    description: 'Notebooks, pens, glue, cellotape, batteries & sewing thread',
    iconName: 'BookOpen',
    accentColor: '#475569',
  },
];
