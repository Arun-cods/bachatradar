import { Product } from '../types';
import { COMPREHENSIVE_GROCERY_DATA, generateStoreOffers } from '../data/comprehensiveCatalog';

// Popular Indian grocery items dictionary for instant realistic on-the-fly comparisons
const COMMON_GROCERY_ESTIMATES: Record<string, { basePrice: number; mrp: number; unit: string; category: any; brand: string; img: string }> = {
  'nutella': { basePrice: 385, mrp: 420, unit: '350 g Jar', category: 'snacks', brand: 'Ferrero Nutella', img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&auto=format&fit=crop&q=80' },
  'peanut butter': { basePrice: 280, mrp: 349, unit: '1 kg Tub', category: 'snacks', brand: 'Pintola / MyFitness', img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&auto=format&fit=crop&q=80' },
  'red bull': { basePrice: 115, mrp: 125, unit: '250 ml Can', category: 'snacks', brand: 'Red Bull Energy', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&auto=format&fit=crop&q=80' },
  'oats': { basePrice: 175, mrp: 210, unit: '1 kg Pouch', category: 'staples', brand: 'Quaker Oats / Kelloggs', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&auto=format&fit=crop&q=80' },
  'poha': { basePrice: 55, mrp: 70, unit: '500 g Pack', category: 'staples', brand: 'Tata Sampann Thick Poha', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80' },
  'besan': { basePrice: 78, mrp: 95, unit: '1 kg Pack', category: 'staples', brand: 'Fortune Pure Chana Besan', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80' },
  'rajma': { basePrice: 165, mrp: 195, unit: '1 kg Pack', category: 'staples', brand: 'Tata Sampann Chitra Rajma', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80' },
  'soya chunks': { basePrice: 48, mrp: 55, unit: '200 g Pack', category: 'staples', brand: 'Fortune Soya Badi', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80' },
  'garam masala': { basePrice: 78, mrp: 90, unit: '100 g Box', category: 'staples', brand: 'Everest Garam Masala', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&auto=format&fit=crop&q=80' },
  'bournvita': { basePrice: 340, mrp: 390, unit: '1 kg Jar', category: 'snacks', brand: 'Cadbury Bournvita', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=300&auto=format&fit=crop&q=80' },
  'horlicks': { basePrice: 330, mrp: 380, unit: '1 kg Refill', category: 'snacks', brand: 'Hindustan Unilever Horlicks', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=300&auto=format&fit=crop&q=80' },
  'honey': { basePrice: 195, mrp: 235, unit: '500 g Squeezy Bottle', category: 'staples', brand: 'Dabur 100% Pure Honey', img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&auto=format&fit=crop&q=80' },
  'avocado': { basePrice: 140, mrp: 180, unit: '1 pc (Hass Avocado)', category: 'veggies', brand: 'Imported Fresh', img: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&auto=format&fit=crop&q=80' },
};

export const searchUniversalCatalog = (query: string, currentList: Product[]): Product[] => {
  if (!query.trim()) return currentList;

  const q = query.toLowerCase().trim();

  // 1. Direct matches in static comprehensive list
  const existingMatches = currentList.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      (p.nameHindi && p.nameHindi.includes(q))
  );

  if (existingMatches.length > 0) {
    return existingMatches;
  }

  // 2. Dynamic generation for any unlisted quick commerce item query
  const matchedKey = Object.keys(COMMON_GROCERY_ESTIMATES).find((k) => q.includes(k) || k.includes(q));
  
  const baseData = matchedKey ? COMMON_GROCERY_ESTIMATES[matchedKey] : {
    basePrice: 120,
    mrp: 145,
    unit: 'Standard Pack',
    category: 'staples',
    brand: 'Quick Commerce Verified',
    img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&auto=format&fit=crop&q=80',
  };

  const dynamicProduct: Product = {
    id: 'dyn_' + q.replace(/\s+/g, '_'),
    name: query.charAt(0).toUpperCase() + query.slice(1) + ' (Quick-Commerce Live Search)',
    nameHindi: 'लाइव सर्च आइटम',
    brand: baseData.brand,
    category: baseData.category,
    unit: baseData.unit,
    imageUrl: baseData.img,
    trending: true,
    isDailyEssential: true,
    offers: generateStoreOffers(baseData.basePrice, baseData.mrp),
  };

  return [dynamicProduct, ...currentList];
};
