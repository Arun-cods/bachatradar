import { Product, PlatformId } from '../types';
import { getDirectStoreBuyUrl } from '../utils/storeLinks';

export const generateStoreOffers = (basePrice: number, mrp: number, productName: string = '', unit: string = ''): Record<PlatformId, any> => {
  let hash = 0;
  for (let i = 0; i < (productName || '').length; i++) {
    hash = (hash << 5) - hash + productName.charCodeAt(i);
    hash |= 0;
  }
  const factor = (Math.abs(hash) % 100) / 1000;

  const zeptoPrice = Math.max(Math.min(basePrice, mrp), Math.round(basePrice * (0.96 + factor * 0.03)));
  const blinkitPrice = Math.min(mrp, Math.max(basePrice, Math.round(basePrice * (0.99 + factor * 0.02))));
  const instamartPrice = Math.min(mrp, Math.max(zeptoPrice, Math.round(basePrice * (0.98 + factor * 0.03))));
  const bbPrice = Math.max(Math.round(basePrice * 0.90), Math.round(basePrice * (0.92 + factor * 0.03)));
  const amazonPrice = Math.max(Math.round(basePrice * 0.91), Math.round(basePrice * (0.93 + factor * 0.03)));
  const flipkartPrice = Math.max(Math.round(basePrice * 0.91), Math.round(basePrice * (0.92 + factor * 0.04)));

  return {
    zepto: {
      platform: 'zepto',
      price: zeptoPrice,
      mrp,
      inStock: true,
      deliveryTimeMin: 7 + (Math.abs(hash) % 4),
      surgeFee: 0,
      handlingFee: 4,
      affiliateUrl: getDirectStoreBuyUrl('zepto', productName, undefined, unit),
    },
    blinkit: {
      platform: 'blinkit',
      price: blinkitPrice,
      mrp,
      inStock: true,
      deliveryTimeMin: 10 + (Math.abs(hash) % 4),
      surgeFee: (Math.abs(hash) % 6 === 0) ? 15 : 0,
      handlingFee: 5,
      affiliateUrl: getDirectStoreBuyUrl('blinkit', productName, undefined, unit),
    },
    instamart: {
      platform: 'instamart',
      price: instamartPrice,
      mrp,
      inStock: true,
      deliveryTimeMin: 12 + (Math.abs(hash) % 5),
      surgeFee: 0,
      handlingFee: 6,
      affiliateUrl: getDirectStoreBuyUrl('instamart', productName, undefined, unit),
    },
    bigbasket: {
      platform: 'bigbasket',
      price: bbPrice,
      mrp,
      inStock: true,
      deliveryTimeMin: 18 + (Math.abs(hash) % 6),
      surgeFee: 0,
      handlingFee: 3,
      affiliateUrl: getDirectStoreBuyUrl('bigbasket', productName, undefined, unit),
    },
    amazon: {
      platform: 'amazon',
      price: amazonPrice,
      mrp,
      inStock: true,
      deliveryTimeMin: 25 + (Math.abs(hash) % 15),
      surgeFee: 0,
      handlingFee: 0,
      affiliateUrl: getDirectStoreBuyUrl('amazon', productName, undefined, unit),
    },
    flipkart: {
      platform: 'flipkart',
      price: flipkartPrice,
      mrp,
      inStock: true,
      deliveryTimeMin: 9 + (Math.abs(hash) % 4),
      surgeFee: 0,
      handlingFee: 4,
      affiliateUrl: getDirectStoreBuyUrl('flipkart', productName, undefined, unit),
    },
  };
};

export const MASTER_CATALOG_CATEGORIES = [
  { id: 'all', label: 'All Items', icon: '🛒', totalSkus: '24,580' },
  { id: 'dairy', label: 'Dairy, Bread & Eggs', icon: '🥛', totalSkus: '2,410' },
  { id: 'veggies', label: 'Fresh Vegetables & Fruits', icon: '🍅', totalSkus: '3,890' },
  { id: 'staples', label: 'Atta, Rice, Dal & Ghee', icon: '🌾', totalSkus: '4,150' },
  { id: 'snacks', label: 'Snacks, Biscuits & Munchies', icon: '🍪', totalSkus: '4,820' },
  { id: 'beverages', label: 'Tea, Coffee & Cold Drinks', icon: '☕', totalSkus: '2,940' },
  { id: 'instant', label: 'Instant Food, Noodles & Sauces', icon: '🍜', totalSkus: '2,110' },
  { id: 'household', label: 'Cleaning & Home Essentials', icon: '🧼', totalSkus: '2,620' },
  { id: 'personal', label: 'Personal Care & Grooming', icon: '🧴', totalSkus: '1,640' },
];

export const COMPREHENSIVE_GROCERY_DATA: Product[] = [
  {
    "id": "zepto-rin-matic-top-load-2kg",
    "name": "Rin Matic Top Load Detergent Liquid | Pouch (2 kg)",
    "nameHindi": "रिन मैटिक टॉप लोड लिक्विड डिटर्जेंट",
    "brand": "Rin",
    "category": "household",
    "unit": "2 kg Pouch",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40320190_10-surf-excel-matic-front-load-liquid-detergent-refill.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 215,
        "mrp": 260,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zepto.com/pn/rin-matic-top-load-detergent-liquid-pouch/pvid/5f54bb83-f3e0-4d8d-89b0-6339f3312089"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 220,
        "mrp": 260,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Rin%20Matic%20Top%20Load%20Liquid%202kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 218,
        "mrp": 260,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Rin%20Matic%20Top%20Load%20Liquid%202kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 214,
        "mrp": 260,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/ps/?q=Rin%20Matic%20Top%20Load%20Liquid%202kg"
      },
      "amazon": {
        "platform": "amazon",
        "price": 218,
        "mrp": 260,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Rin+Matic+Top+Load+Liquid+2kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 215,
        "mrp": 260,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Rin%20Matic%20Top%20Load%20Liquid%202kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "zepto-tide-plus-lemon-mint-2kg",
    "name": "Tide Plus Lemon & Mint Detergent Powder (2 kg)",
    "nameHindi": "टाइड प्लस लेमन व मिंट डिटर्जेंट पाउडर",
    "brand": "Tide",
    "category": "household",
    "unit": "2 kg Pack",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40320190_10-surf-excel-matic-front-load-liquid-detergent-refill.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 270,
        "mrp": 280,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zepto.com/pn/tide-plus-lemon-mint-detergent-powder/pvid/5562d0cc-ace3-4c62-aa38-81c8b1d0f645"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 275,
        "mrp": 280,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Tide%20Plus%20Lemon%20Mint%202kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 272,
        "mrp": 280,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Tide%20Plus%20Lemon%20Mint%202kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 269,
        "mrp": 280,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/ps/?q=Tide%20Plus%20Lemon%20Mint%202kg"
      },
      "amazon": {
        "platform": "amazon",
        "price": 270,
        "mrp": 280,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Tide+Plus+Lemon+Mint+2kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 270,
        "mrp": 280,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Tide%20Plus%20Lemon%20Mint%202kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "zepto-india-gate-dubar-basmati-1kg",
    "name": "India Gate Dubar Basmati Rice | Long Slender Grains (1 kg)",
    "nameHindi": "इंडिया गेट दुबार बासमती चावल",
    "brand": "India Gate",
    "category": "staples",
    "unit": "1 kg Pack",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40075897_15-bb-royal-sona-masoori-rice-raw-rice-super-premium.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 130,
        "mrp": 167,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zepto.com/pn/india-gate-dubar-basmati-rice-long-slender-grains/pvid/ca22643f-69a5-4e44-88ca-0a13ec97f149"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 138,
        "mrp": 167,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=India%20Gate%20Dubar%20Basmati%20Rice%201kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 135,
        "mrp": 167,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=India%20Gate%20Dubar%20Basmati%20Rice%201kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 129,
        "mrp": 167,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/ps/?q=India%20Gate%20Dubar%20Basmati%20Rice%201kg"
      },
      "amazon": {
        "platform": "amazon",
        "price": 132,
        "mrp": 167,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=India+Gate+Dubar+Basmati+Rice+1kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 130,
        "mrp": 167,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=India%20Gate%20Dubar%20Basmati%20Rice%201kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "zepto-daawat-rozana-super-basmati-1kg",
    "name": "Daawat Rozana Super Basmati Rice | Medium Grain (1 kg)",
    "nameHindi": "दावत रोज़ाना सुपर बासमती चावल",
    "brand": "Daawat",
    "category": "staples",
    "unit": "1 kg Pack",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40075897_15-bb-royal-sona-masoori-rice-raw-rice-super-premium.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 87,
        "mrp": 100,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zepto.com/pn/daawat-rozana-super-basmati-rice-medium-grain/pvid/6b78d070-ba4c-459c-9d4d-fe058f71d5cf"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 92,
        "mrp": 100,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Daawat%20Rozana%20Super%20Basmati%20Rice%201kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 89,
        "mrp": 100,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Daawat%20Rozana%20Super%20Basmati%20Rice%201kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 86,
        "mrp": 100,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/ps/?q=Daawat%20Rozana%20Super%20Basmati%20Rice%201kg"
      },
      "amazon": {
        "platform": "amazon",
        "price": 88,
        "mrp": 100,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Daawat+Rozana+Super+Basmati+Rice+1kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 87,
        "mrp": 100,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Daawat%20Rozana%20Super%20Basmati%20Rice%201kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "fresho-farm-eggs-regular-30",
    "name": "Fresho Farm Eggs, Regular (Table Tray - 30 pcs)",
    "nameHindi": "फ्रेशो फार्म अंडे (30 पीस ट्रे)",
    "brand": "Fresho",
    "category": "dairy",
    "unit": "30 pcs Tray",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/150502_11-fresho-farm-eggs-table-tray-medium-antibiotic-residue-free.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 247,
        "mrp": 300,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Fresho%20Fresho%20Farm%20Eggs%2C%20Regular%20%2030%20pcs%20Tray"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 250,
        "mrp": 300,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Fresho%20Fresho%20Farm%20Eggs%2C%20Regular%20%2030%20pcs%20Tray"
      },
      "instamart": {
        "platform": "instamart",
        "price": 249,
        "mrp": 300,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Fresho%20Fresho%20Farm%20Eggs%2C%20Regular%20%2030%20pcs%20Tray"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 242.5,
        "mrp": 300,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/150502/fresho-farm-eggs-table-tray-medium-antibiotic-residue-free-30-pcs/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 247,
        "mrp": 300,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Fresho%20Fresho%20Farm%20Eggs%2C%20Regular%20%2030%20pcs%20Tray&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 245,
        "mrp": 300,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Fresho%20Fresho%20Farm%20Eggs%2C%20Regular%20%2030%20pcs%20Tray&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "eggoz-farm-fresh-white-30",
    "name": "Eggoz Farm Fresh White Eggs (30 pcs Tray)",
    "nameHindi": "एग्गोज़ फार्म फ्रेश सफेद अंडे (30 पीस ट्रे)",
    "brand": "Eggoz",
    "category": "dairy",
    "unit": "30 pcs Tray",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40211592_7-eggoz-white-farm-fresh-eggs-omega-3-rich-with-no-ddgs-hormone-steroids.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 376,
        "mrp": 449,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Eggoz%20Eggoz%20Farm%20Fresh%20White%20Eggs%20%2030%20pcs%20Tray"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 380,
        "mrp": 449,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Eggoz%20Eggoz%20Farm%20Fresh%20White%20Eggs%20%2030%20pcs%20Tray"
      },
      "instamart": {
        "platform": "instamart",
        "price": 378,
        "mrp": 449,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Eggoz%20Eggoz%20Farm%20Fresh%20White%20Eggs%20%2030%20pcs%20Tray"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 369,
        "mrp": 449,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40211592/eggoz-white-farm-fresh-eggs-omega-3-rich-with-no-ddgs-hormone-steroids-30-pcs/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 376,
        "mrp": 449,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Eggoz%20Eggoz%20Farm%20Fresh%20White%20Eggs%20%2030%20pcs%20Tray&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 373,
        "mrp": 449,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Eggoz%20Eggoz%20Farm%20Fresh%20White%20Eggs%20%2030%20pcs%20Tray&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "fresho-premium-large-white-12",
    "name": "Fresho Premium Large White Eggs (12 pcs)",
    "nameHindi": "फ्रेशो प्रीमियम लार्ज सफेद अंडे (12 पीस)",
    "brand": "Fresho",
    "category": "dairy",
    "unit": "12 pcs Pack",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40348875_8-fresho-premium-white-eggs.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 117,
        "mrp": 200,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Fresho%20Fresho%20Premium%20Large%20White%20Eggs%20%2012%20pcs%20Pack"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 118,
        "mrp": 200,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Fresho%20Fresho%20Premium%20Large%20White%20Eggs%20%2012%20pcs%20Pack"
      },
      "instamart": {
        "platform": "instamart",
        "price": 118,
        "mrp": 200,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Fresho%20Fresho%20Premium%20Large%20White%20Eggs%20%2012%20pcs%20Pack"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 115,
        "mrp": 200,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40348875/fresho-premium-white-eggs-12-pcs/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 117,
        "mrp": 200,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Fresho%20Fresho%20Premium%20Large%20White%20Eggs%20%2012%20pcs%20Pack&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 116,
        "mrp": 200,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Fresho%20Fresho%20Premium%20Large%20White%20Eggs%20%2012%20pcs%20Pack&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "eggoz-protein-plus-large-10",
    "name": "Eggoz Protein Plus Large White Eggs (10 pcs)",
    "nameHindi": "एग्गोज़ प्रोटीन प्लस लार्ज सफेद अंडे (10 पीस)",
    "brand": "Eggoz",
    "category": "dairy",
    "unit": "10 pcs Pack",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40254134_4-eggoz-nutrition-nutra-egg-rich-in-omega-3-vitamin-b12.jpg",
    "trending": false,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 146,
        "mrp": 170,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Eggoz%20Eggoz%20Protein%20Plus%20Large%20White%20Eggs%20%2010%20pcs%20Pack"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 147,
        "mrp": 170,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Eggoz%20Eggoz%20Protein%20Plus%20Large%20White%20Eggs%20%2010%20pcs%20Pack"
      },
      "instamart": {
        "platform": "instamart",
        "price": 146,
        "mrp": 170,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Eggoz%20Eggoz%20Protein%20Plus%20Large%20White%20Eggs%20%2010%20pcs%20Pack"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 142.8,
        "mrp": 170,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40254134/eggoz-nutrition-nutra-egg-rich-in-omega-3-vitamin-b12-10-pcs/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 146,
        "mrp": 170,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Eggoz%20Eggoz%20Protein%20Plus%20Large%20White%20Eggs%20%2010%20pcs%20Pack&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 144,
        "mrp": 170,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Eggoz%20Eggoz%20Protein%20Plus%20Large%20White%20Eggs%20%2010%20pcs%20Pack&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "just-laid-brown-eggs-6",
    "name": "Just Laid Farm Fresh Brown Eggs (6 pcs)",
    "nameHindi": "जस्ट लेड फार्म फ्रेश ब्राउन अंडे (6 पीस)",
    "brand": "Just Laid",
    "category": "dairy",
    "unit": "6 pcs Pack",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40131159_4-just-laid-eggs-brown-antibiotic-free.jpg",
    "trending": false,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 90,
        "mrp": 90,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Just%20Laid%20Just%20Laid%20Farm%20Fresh%20Brown%20Eggs%20%206%20pcs%20Pack"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 90,
        "mrp": 90,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Just%20Laid%20Just%20Laid%20Farm%20Fresh%20Brown%20Eggs%20%206%20pcs%20Pack"
      },
      "instamart": {
        "platform": "instamart",
        "price": 90,
        "mrp": 90,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Just%20Laid%20Just%20Laid%20Farm%20Fresh%20Brown%20Eggs%20%206%20pcs%20Pack"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 90,
        "mrp": 90,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40131159/just-laid-eggs-brown-antibiotic-free-6-pcs/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 90,
        "mrp": 90,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Just%20Laid%20Just%20Laid%20Farm%20Fresh%20Brown%20Eggs%20%206%20pcs%20Pack&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 90,
        "mrp": 90,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Just%20Laid%20Just%20Laid%20Farm%20Fresh%20Brown%20Eggs%20%206%20pcs%20Pack&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "hello-eggs-brown-30",
    "name": "Hello Eggs Brown Eggs (30 pcs Tray)",
    "nameHindi": "हेलो एग्स ब्राउन अंडे (30 पीस ट्रे)",
    "brand": "Hello Eggs",
    "category": "dairy",
    "unit": "30 pcs Tray",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40374433_1-hello-eggs-brown-eggs.jpg",
    "trending": false,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 390,
        "mrp": 450,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Hello%20Eggs%20Hello%20Eggs%20Brown%20Eggs%20%2030%20pcs%20Tray"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 394,
        "mrp": 450,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Hello%20Eggs%20Hello%20Eggs%20Brown%20Eggs%20%2030%20pcs%20Tray"
      },
      "instamart": {
        "platform": "instamart",
        "price": 392,
        "mrp": 450,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Hello%20Eggs%20Hello%20Eggs%20Brown%20Eggs%20%2030%20pcs%20Tray"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 382.5,
        "mrp": 450,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40374433/hello-eggs-brown-eggs-30-pcs/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 390,
        "mrp": 450,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Hello%20Eggs%20Hello%20Eggs%20Brown%20Eggs%20%2030%20pcs%20Tray&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 386,
        "mrp": 450,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Hello%20Eggs%20Hello%20Eggs%20Brown%20Eggs%20%2030%20pcs%20Tray&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-264679",
    "name": "Milky Mist Paneer (200 g)",
    "nameHindi": "Milky Mist ताजा दूध",
    "brand": "Milky Mist",
    "category": "dairy",
    "unit": "200 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/264679_8-milky-mist-paneer-premium-fresh.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 73,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Milky%20Mist%20Milky%20Mist%20Paneer%20%20200%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 74,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Milky%20Mist%20Milky%20Mist%20Paneer%20%20200%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 74,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Milky%20Mist%20Milky%20Mist%20Paneer%20%20200%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 72,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/264679/milky-mist-paneer-premium-fresh-200-g-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 73,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Milky%20Mist%20Milky%20Mist%20Paneer%20%20200%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 73,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Milky%20Mist%20Milky%20Mist%20Paneer%20%20200%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40147597",
    "name": "Heritage Daily Health Toned Milk (500 ml)",
    "nameHindi": "Heritage ताजा दूध",
    "brand": "Heritage",
    "category": "dairy",
    "unit": "500 ml",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40147597_11-heritage-daily-health-toned-milk.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 33,
        "mrp": 33,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Heritage%20Heritage%20Daily%20Health%20Toned%20Milk%20%20500%20ml"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 33,
        "mrp": 33,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Heritage%20Heritage%20Daily%20Health%20Toned%20Milk%20%20500%20ml"
      },
      "instamart": {
        "platform": "instamart",
        "price": 33,
        "mrp": 33,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Heritage%20Heritage%20Daily%20Health%20Toned%20Milk%20%20500%20ml"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 33,
        "mrp": 33,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40147597/heritage-daily-health-toned-milk-500-ml-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 33,
        "mrp": 33,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Heritage%20Heritage%20Daily%20Health%20Toned%20Milk%20%20500%20ml&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 33,
        "mrp": 33,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Heritage%20Heritage%20Daily%20Health%20Toned%20Milk%20%20500%20ml&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-242671",
    "name": "Nandini GoodLife Toned Milk (500 ml)",
    "nameHindi": "Nandini ताजा दूध",
    "brand": "Nandini",
    "category": "dairy",
    "unit": "500 ml",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/242671_1-nandini-goodlife-toned-milk.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 26,
        "mrp": 26,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Nandini%20Nandini%20GoodLife%20Toned%20Milk%20%20500%20ml"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 26,
        "mrp": 26,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Nandini%20Nandini%20GoodLife%20Toned%20Milk%20%20500%20ml"
      },
      "instamart": {
        "platform": "instamart",
        "price": 26,
        "mrp": 26,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Nandini%20Nandini%20GoodLife%20Toned%20Milk%20%20500%20ml"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 26,
        "mrp": 26,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/242671/nandini-goodlife-toned-milk-500-ml-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 26,
        "mrp": 26,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Nandini%20Nandini%20GoodLife%20Toned%20Milk%20%20500%20ml&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 26,
        "mrp": 26,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Nandini%20Nandini%20GoodLife%20Toned%20Milk%20%20500%20ml&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40090893",
    "name": "Amul Gold Full Cream Milk (500 ml)",
    "nameHindi": "Amul ताजा दूध",
    "brand": "Amul",
    "category": "dairy",
    "unit": "500 ml",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40090893_10-amul-amul-gold.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 32,
        "mrp": 32,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Amul%20Amul%20Gold%20Full%20Cream%20Milk%20%20500%20ml"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 32,
        "mrp": 32,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Amul%20Amul%20Gold%20Full%20Cream%20Milk%20%20500%20ml"
      },
      "instamart": {
        "platform": "instamart",
        "price": 32,
        "mrp": 32,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Amul%20Amul%20Gold%20Full%20Cream%20Milk%20%20500%20ml"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 32,
        "mrp": 32,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40090893/amul-amul-gold-500-ml-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 32,
        "mrp": 32,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Amul%20Amul%20Gold%20Full%20Cream%20Milk%20%20500%20ml&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 32,
        "mrp": 32,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Amul%20Amul%20Gold%20Full%20Cream%20Milk%20%20500%20ml&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-100285703",
    "name": "Nandini GoodLife UHT Treated Toned Milk (1 L)",
    "nameHindi": "Nandini ताजा दूध",
    "brand": "Nandini",
    "category": "dairy",
    "unit": "1 L",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/100285703_15-nandini-goodlife-toned-milk.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 64,
        "mrp": 64,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Nandini%20Nandini%20GoodLife%20UHT%20Treated%20Toned%20Milk%20%201%20L"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 64,
        "mrp": 64,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Nandini%20Nandini%20GoodLife%20UHT%20Treated%20Toned%20Milk%20%201%20L"
      },
      "instamart": {
        "platform": "instamart",
        "price": 64,
        "mrp": 64,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Nandini%20Nandini%20GoodLife%20UHT%20Treated%20Toned%20Milk%20%201%20L"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 64,
        "mrp": 64,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/100285703/nandini-goodlife-toned-milk-1-l-carton/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 64,
        "mrp": 64,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Nandini%20Nandini%20GoodLife%20UHT%20Treated%20Toned%20Milk%20%201%20L&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 64,
        "mrp": 64,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Nandini%20Nandini%20GoodLife%20UHT%20Treated%20Toned%20Milk%20%201%20L&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-306926",
    "name": "Amul Taaza Homogenised Toned Milk (1 L)",
    "nameHindi": "Amul ताजा दूध",
    "brand": "Amul",
    "category": "dairy",
    "unit": "1 L",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/306926_6-amul-homogenised-toned-milk.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 77,
        "mrp": 77,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Amul%20Amul%20Taaza%20Homogenised%20Toned%20Milk%20%201%20L"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 77,
        "mrp": 77,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Amul%20Amul%20Taaza%20Homogenised%20Toned%20Milk%20%201%20L"
      },
      "instamart": {
        "platform": "instamart",
        "price": 77,
        "mrp": 77,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Amul%20Amul%20Taaza%20Homogenised%20Toned%20Milk%20%201%20L"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 77,
        "mrp": 77,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/306926/amul-homogenised-toned-milk-1-l-carton/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 77,
        "mrp": 77,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Amul%20Amul%20Taaza%20Homogenised%20Toned%20Milk%20%201%20L&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 77,
        "mrp": 77,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Amul%20Amul%20Taaza%20Homogenised%20Toned%20Milk%20%201%20L&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40131633",
    "name": "Akshayakalpa Organic Malai Paneer (200 g)",
    "nameHindi": "Akshayakalpa ताजा पनीर",
    "brand": "Akshayakalpa",
    "category": "dairy",
    "unit": "200 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40131633_10-akshayakalpa-malai-paneer-organic.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 135,
        "mrp": 135,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Akshayakalpa%20Akshayakalpa%20Organic%20Malai%20Paneer%20%20200%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 135,
        "mrp": 135,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Akshayakalpa%20Akshayakalpa%20Organic%20Malai%20Paneer%20%20200%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 135,
        "mrp": 135,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Akshayakalpa%20Akshayakalpa%20Organic%20Malai%20Paneer%20%20200%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 135,
        "mrp": 135,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40131633/akshayakalpa-malai-paneer-organic-200-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 135,
        "mrp": 135,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Akshayakalpa%20Akshayakalpa%20Organic%20Malai%20Paneer%20%20200%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 135,
        "mrp": 135,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Akshayakalpa%20Akshayakalpa%20Organic%20Malai%20Paneer%20%20200%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-270620",
    "name": "Nandini Fresh Paneer (200 g)",
    "nameHindi": "Nandini ताजा पनीर",
    "brand": "Nandini",
    "category": "dairy",
    "unit": "200 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/270620_4-nandini-paneer.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 96,
        "mrp": 96,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Nandini%20Nandini%20Fresh%20Paneer%20%20200%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 96,
        "mrp": 96,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Nandini%20Nandini%20Fresh%20Paneer%20%20200%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 96,
        "mrp": 96,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Nandini%20Nandini%20Fresh%20Paneer%20%20200%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 96,
        "mrp": 96,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/270620/nandini-paneer-200-g-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 96,
        "mrp": 96,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Nandini%20Nandini%20Fresh%20Paneer%20%20200%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 96,
        "mrp": 96,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Nandini%20Nandini%20Fresh%20Paneer%20%20200%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-104860",
    "name": "Amul Pasteurised Butter (100 g)",
    "nameHindi": "Amul मक्खन",
    "brand": "Amul",
    "category": "dairy",
    "unit": "100 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/104860_10-amul-butter-pasteurised.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 63,
        "mrp": 63,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Amul%20Amul%20Pasteurised%20Butter%20%20100%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 63,
        "mrp": 63,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Amul%20Amul%20Pasteurised%20Butter%20%20100%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 63,
        "mrp": 63,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Amul%20Amul%20Pasteurised%20Butter%20%20100%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 63,
        "mrp": 63,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/104860/amul-butter-pasteurised-100-g-carton/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 63,
        "mrp": 63,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Amul%20Amul%20Pasteurised%20Butter%20%20100%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 63,
        "mrp": 63,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Amul%20Amul%20Pasteurised%20Butter%20%20100%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40096747",
    "name": "Amul Fresh Malai Paneer (200 g)",
    "nameHindi": "Amul ताजा पनीर",
    "brand": "Amul",
    "category": "dairy",
    "unit": "200 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40096747_11-amul-malai-fresh-paneer.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 76,
        "mrp": 76,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Amul%20Amul%20Fresh%20Malai%20Paneer%20%20200%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 76,
        "mrp": 76,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Amul%20Amul%20Fresh%20Malai%20Paneer%20%20200%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 76,
        "mrp": 76,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Amul%20Amul%20Fresh%20Malai%20Paneer%20%20200%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 76,
        "mrp": 76,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40096747/amul-malai-fresh-paneer-200-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 76,
        "mrp": 76,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Amul%20Amul%20Fresh%20Malai%20Paneer%20%20200%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 76,
        "mrp": 76,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Amul%20Amul%20Fresh%20Malai%20Paneer%20%20200%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-104808",
    "name": "Amul Pure Milk Cheese Slices (200 g)",
    "nameHindi": "Amul ताजा दूध",
    "brand": "Amul",
    "category": "dairy",
    "unit": "200 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/104808_11-amul-cheese-slices.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 140,
        "mrp": 140,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Amul%20Amul%20Pure%20Milk%20Cheese%20Slices%20%20200%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 140,
        "mrp": 140,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Amul%20Amul%20Pure%20Milk%20Cheese%20Slices%20%20200%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 140,
        "mrp": 140,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Amul%20Amul%20Pure%20Milk%20Cheese%20Slices%20%20200%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 137,
        "mrp": 140,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/104808/amul-cheese-slices-200-g-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 140,
        "mrp": 140,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Amul%20Amul%20Pure%20Milk%20Cheese%20Slices%20%20200%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 138,
        "mrp": 140,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Amul%20Amul%20Pure%20Milk%20Cheese%20Slices%20%20200%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40276324",
    "name": "Milky Mist Curd (400 g)",
    "nameHindi": "Milky Mist ताजा दूध",
    "brand": "Milky Mist",
    "category": "dairy",
    "unit": "400 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40276324_4-milky-mist-curd-rich-in-taste-no-added-preservatives.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 35,
        "mrp": 37,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Milky%20Mist%20Milky%20Mist%20Curd%20%20400%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 35,
        "mrp": 37,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Milky%20Mist%20Milky%20Mist%20Curd%20%20400%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 35,
        "mrp": 37,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Milky%20Mist%20Milky%20Mist%20Curd%20%20400%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 34,
        "mrp": 37,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40276324/milky-mist-curd-rich-in-taste-no-added-preservatives-400-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 35,
        "mrp": 37,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Milky%20Mist%20Milky%20Mist%20Curd%20%20400%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 34,
        "mrp": 37,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Milky%20Mist%20Milky%20Mist%20Curd%20%20400%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-180584",
    "name": "Amul Spiced Buttermilk (1 L)",
    "nameHindi": "Amul ताजा दूध",
    "brand": "Amul",
    "category": "dairy",
    "unit": "1 L",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/180584_9-amul-masti-buttermilk-spice.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 70,
        "mrp": 70,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Amul%20Amul%20Spiced%20Buttermilk%20%201%20L"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 70,
        "mrp": 70,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Amul%20Amul%20Spiced%20Buttermilk%20%201%20L"
      },
      "instamart": {
        "platform": "instamart",
        "price": 70,
        "mrp": 70,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Amul%20Amul%20Spiced%20Buttermilk%20%201%20L"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 70,
        "mrp": 70,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/180584/amul-masti-buttermilk-spice-1-l/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 70,
        "mrp": 70,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Amul%20Amul%20Spiced%20Buttermilk%20%201%20L&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 70,
        "mrp": 70,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Amul%20Amul%20Spiced%20Buttermilk%20%201%20L&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40162924",
    "name": "Britannia Zero Maida Whole Wheat Bread (450 g)",
    "nameHindi": "Britannia ब्रेड",
    "brand": "Britannia",
    "category": "dairy",
    "unit": "450 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40162924_8-britannia-100-whole-wheat-bread.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 50,
        "mrp": 50,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Britannia%20Britannia%20Zero%20Maida%20Whole%20Wheat%20Bread%20%20450%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 50,
        "mrp": 50,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Britannia%20Britannia%20Zero%20Maida%20Whole%20Wheat%20Bread%20%20450%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 50,
        "mrp": 50,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Britannia%20Britannia%20Zero%20Maida%20Whole%20Wheat%20Bread%20%20450%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 50,
        "mrp": 50,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40162924/britannia-100-whole-wheat-bread-450-g-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 50,
        "mrp": 50,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Britannia%20Britannia%20Zero%20Maida%20Whole%20Wheat%20Bread%20%20450%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 50,
        "mrp": 50,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Britannia%20Britannia%20Zero%20Maida%20Whole%20Wheat%20Bread%20%20450%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-242668",
    "name": "Nandini Unsalted Pasteurised Cooking Butter (500 g)",
    "nameHindi": "Nandini मक्खन",
    "brand": "Nandini",
    "category": "dairy",
    "unit": "500 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/242668_5-nandini-cooking-butter-unsalted.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 198,
        "mrp": 198,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Nandini%20Nandini%20Unsalted%20Pasteurised%20Cooking%20Butter%20%20500%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 198,
        "mrp": 198,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Nandini%20Nandini%20Unsalted%20Pasteurised%20Cooking%20Butter%20%20500%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 198,
        "mrp": 198,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Nandini%20Nandini%20Unsalted%20Pasteurised%20Cooking%20Butter%20%20500%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 198,
        "mrp": 198,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/242668/nandini-cooking-butter-unsalted-500-g-carton/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 198,
        "mrp": 198,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Nandini%20Nandini%20Unsalted%20Pasteurised%20Cooking%20Butter%20%20500%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 198,
        "mrp": 198,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Nandini%20Nandini%20Unsalted%20Pasteurised%20Cooking%20Butter%20%20500%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40335473",
    "name": "Milky Mist High Protein Low Fat Paneer (200 g)",
    "nameHindi": "Milky Mist ताजा दूध",
    "brand": "Milky Mist",
    "category": "dairy",
    "unit": "200 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40335473_2-milky-mist-high-protein-paneer.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 145,
        "mrp": 165,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Milky%20Mist%20Milky%20Mist%20High%20Protein%20Low%20Fat%20Paneer%20%20200%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 146,
        "mrp": 165,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Milky%20Mist%20Milky%20Mist%20High%20Protein%20Low%20Fat%20Paneer%20%20200%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 146,
        "mrp": 165,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Milky%20Mist%20Milky%20Mist%20High%20Protein%20Low%20Fat%20Paneer%20%20200%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 142,
        "mrp": 165,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40335473/milky-mist-high-protein-paneer-200-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 145,
        "mrp": 165,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Milky%20Mist%20Milky%20Mist%20High%20Protein%20Low%20Fat%20Paneer%20%20200%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 143,
        "mrp": 165,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Milky%20Mist%20Milky%20Mist%20High%20Protein%20Low%20Fat%20Paneer%20%20200%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-20001190",
    "name": "fresho! Onion (500 g)",
    "nameHindi": "fresho! प्याज",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "500 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/20001190_13-fresho-onion.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 11,
        "mrp": 17,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Onion%20%20500%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 11,
        "mrp": 17,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Onion%20%20500%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 11,
        "mrp": 17,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Onion%20%20500%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 10,
        "mrp": 17,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/20001190/fresho-onion-500-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 10,
        "mrp": 17,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Onion%20%20500%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 10,
        "mrp": 17,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Onion%20%20500%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40189104",
    "name": "fresho! Potato (20 kg)",
    "nameHindi": "fresho! आलू",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "20 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40189104_1-fresho-new-potato.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 457,
        "mrp": 560,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Potato%20%2020%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 461,
        "mrp": 560,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Potato%20%2020%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 459,
        "mrp": 560,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Potato%20%2020%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 448,
        "mrp": 560,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40189104/fresho-new-potato-20-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 457,
        "mrp": 560,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Potato%20%2020%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 452,
        "mrp": 560,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Potato%20%2020%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-10000070",
    "name": "fresho! Carrot - Orange (1 kg)",
    "nameHindi": "fresho! गाजर",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/10000070_17-fresho-carrot-orange.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 83,
        "mrp": 102,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Carrot%20-%20Orange%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 84,
        "mrp": 102,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Carrot%20-%20Orange%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 84,
        "mrp": 102,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Carrot%20-%20Orange%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 81.6,
        "mrp": 102,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/10000070/fresho-carrot-orange-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 83,
        "mrp": 102,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Carrot%20-%20Orange%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 82,
        "mrp": 102,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Carrot%20-%20Orange%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40183216",
    "name": "fresho! Local Tomato - Premium (20 kg)",
    "nameHindi": "fresho! टमाटर",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "20 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40183216_3-fresho-tomato-local.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 237,
        "mrp": 290,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Local%20Tomato%20-%20Premium%20%2020%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 239,
        "mrp": 290,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Local%20Tomato%20-%20Premium%20%2020%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 238,
        "mrp": 290,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Local%20Tomato%20-%20Premium%20%2020%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 232,
        "mrp": 290,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40183216/fresho-tomato-local-20-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 237,
        "mrp": 290,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Local%20Tomato%20-%20Premium%20%2020%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 234,
        "mrp": 290,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Local%20Tomato%20-%20Premium%20%2020%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-10000326",
    "name": "fresho! Coriander Leaves Without Roots (1 kg)",
    "nameHindi": "fresho! धनिया पत्ती",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/10000326_17-fresho-coriander-leaves.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 237,
        "mrp": 290,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Coriander%20Leaves%20Without%20Roots%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 239,
        "mrp": 290,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Coriander%20Leaves%20Without%20Roots%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 238,
        "mrp": 290,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Coriander%20Leaves%20Without%20Roots%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 232,
        "mrp": 290,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/10000326/fresho-coriander-leaves-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 237,
        "mrp": 290,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Coriander%20Leaves%20Without%20Roots%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 234,
        "mrp": 290,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Coriander%20Leaves%20Without%20Roots%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-10000031",
    "name": "fresho! Banana - Yelakki (1 kg)",
    "nameHindi": "fresho! केला",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/10000031_22-fresho-banana-yelakki.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 126,
        "mrp": 209,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Banana%20-%20Yelakki%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 127,
        "mrp": 209,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Banana%20-%20Yelakki%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 127,
        "mrp": 209,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Banana%20-%20Yelakki%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 123.5,
        "mrp": 209,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/10000031/fresho-banana-yelakki-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 126,
        "mrp": 209,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Banana%20-%20Yelakki%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 125,
        "mrp": 209,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Banana%20-%20Yelakki%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40023472",
    "name": "fresho! Onion - Organically Grown (1 kg)",
    "nameHindi": "fresho! प्याज",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40023472_7-fresho-onion-organically-grown.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 72,
        "mrp": 101,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Onion%20-%20Organically%20Grown%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 73,
        "mrp": 101,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Onion%20-%20Organically%20Grown%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 72,
        "mrp": 101,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Onion%20-%20Organically%20Grown%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 70.5,
        "mrp": 101,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40023472/fresho-onion-organically-grown-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 72,
        "mrp": 101,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Onion%20-%20Organically%20Grown%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 71,
        "mrp": 101,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Onion%20-%20Organically%20Grown%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40057966",
    "name": "fresho! Tender Coconut (1 pc)",
    "nameHindi": "fresho! उत्पाद",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "1 pc",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40057966_13-fresho-tender-coconut-medium.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 85,
        "mrp": 113,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Tender%20Coconut%20%201%20pc"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 85,
        "mrp": 113,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Tender%20Coconut%20%201%20pc"
      },
      "instamart": {
        "platform": "instamart",
        "price": 85,
        "mrp": 113,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Tender%20Coconut%20%201%20pc"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 83,
        "mrp": 113,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40057966/fresho-tender-coconut-medium-1-pc/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 85,
        "mrp": 113,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Tender%20Coconut%20%201%20pc&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 84,
        "mrp": 113,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Tender%20Coconut%20%201%20pc&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-10000335",
    "name": "fresho! Lemon (1 kg)",
    "nameHindi": "fresho! नींबू",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/10000335_17-fresho-lemon.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 286,
        "mrp": 350,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Lemon%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 288,
        "mrp": 350,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Lemon%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 287,
        "mrp": 350,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Lemon%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 280,
        "mrp": 350,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/10000335/fresho-lemon-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 286,
        "mrp": 350,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Lemon%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 283,
        "mrp": 350,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Lemon%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-10000102",
    "name": "fresho! Cucumber (1 kg)",
    "nameHindi": "fresho! उत्पाद",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/10000102_20-fresho-cucumber.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 58,
        "mrp": 106,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Cucumber%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 58,
        "mrp": 106,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Cucumber%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 58,
        "mrp": 106,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Cucumber%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 56.5,
        "mrp": 106,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/10000102/fresho-cucumber-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 58,
        "mrp": 106,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Cucumber%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 57,
        "mrp": 106,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Cucumber%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-10000067",
    "name": "fresho! Capsicum - Green (1 kg)",
    "nameHindi": "fresho! शिमला मिर्च",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/10000067_27-fresho-capsicum-green.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 41,
        "mrp": 103,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Capsicum%20-%20Green%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 41,
        "mrp": 103,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Capsicum%20-%20Green%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 41,
        "mrp": 103,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Capsicum%20-%20Green%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 40,
        "mrp": 103,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/10000067/fresho-capsicum-green-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 41,
        "mrp": 103,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Capsicum%20-%20Green%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 40,
        "mrp": 103,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Capsicum%20-%20Green%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-10000142",
    "name": "fresho! Ladies' Fingers (1 kg)",
    "nameHindi": "fresho! उत्पाद",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/10000142_21-fresho-ladies-finger.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 69,
        "mrp": 86,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Ladies'%20Fingers%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 70,
        "mrp": 86,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Ladies'%20Fingers%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 70,
        "mrp": 86,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Ladies'%20Fingers%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 68,
        "mrp": 86,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/10000142/fresho-ladies-finger-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 69,
        "mrp": 86,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Ladies'%20Fingers%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 69,
        "mrp": 86,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Ladies'%20Fingers%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40179391",
    "name": "fresho! Banana - Robusta, Small (500 g)",
    "nameHindi": "fresho! केला",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "500 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40179391_8-fresho-baby-banana-robusta.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 25,
        "mrp": 36,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Banana%20-%20Robusta%2C%20Small%20%20500%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 25,
        "mrp": 36,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Banana%20-%20Robusta%2C%20Small%20%20500%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 25,
        "mrp": 36,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Banana%20-%20Robusta%2C%20Small%20%20500%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 24,
        "mrp": 36,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40179391/fresho-baby-banana-robusta-500-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 24,
        "mrp": 36,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Banana%20-%20Robusta%2C%20Small%20%20500%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 24,
        "mrp": 36,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Banana%20-%20Robusta%2C%20Small%20%20500%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-10000187",
    "name": "fresho! Palak - Cleaned, Without Roots (1 kg)",
    "nameHindi": "fresho! पालक साग",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/10000187_15-fresho-palak-cleaned-without-roots.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 80,
        "mrp": 98,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Palak%20-%20Cleaned%2C%20Without%20Roots%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 80,
        "mrp": 98,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Palak%20-%20Cleaned%2C%20Without%20Roots%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 80,
        "mrp": 98,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Palak%20-%20Cleaned%2C%20Without%20Roots%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 78,
        "mrp": 98,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/10000187/fresho-palak-cleaned-without-roots-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 80,
        "mrp": 98,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Palak%20-%20Cleaned%2C%20Without%20Roots%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 79,
        "mrp": 98,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Palak%20-%20Cleaned%2C%20Without%20Roots%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-10000273",
    "name": "fresho! Mushrooms - Button (1 Pack)",
    "nameHindi": "fresho! उत्पाद",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "1 Pack",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/10000273_19-fresho-mushrooms-button.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 64,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Mushrooms%20-%20Button%20%201%20Pack"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 65,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Mushrooms%20-%20Button%20%201%20Pack"
      },
      "instamart": {
        "platform": "instamart",
        "price": 65,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Mushrooms%20-%20Button%20%201%20Pack"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 63,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/10000273/fresho-mushrooms-button-1-pack/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 64,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Mushrooms%20-%20Button%20%201%20Pack&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 64,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Mushrooms%20-%20Button%20%201%20Pack&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-10000117",
    "name": "fresho! Ginger (100 g)",
    "nameHindi": "fresho! अदरक",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "100 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/10000117_22-fresho-ginger.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 11,
        "mrp": 15,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Ginger%20%20100%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 11,
        "mrp": 15,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Ginger%20%20100%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 11,
        "mrp": 15,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Ginger%20%20100%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 10,
        "mrp": 15,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/10000117/fresho-ginger-100-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 10,
        "mrp": 15,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Ginger%20%20100%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 10,
        "mrp": 15,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Ginger%20%20100%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-10000074",
    "name": "fresho! Cauliflower (1 pc)",
    "nameHindi": "fresho! उत्पाद",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "1 pc",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/10000074_22-fresho-cauliflower.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 38,
        "mrp": 48,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Cauliflower%20%201%20pc"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 38,
        "mrp": 48,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Cauliflower%20%201%20pc"
      },
      "instamart": {
        "platform": "instamart",
        "price": 38,
        "mrp": 48,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Cauliflower%20%201%20pc"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 37,
        "mrp": 48,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/10000074/fresho-cauliflower-1-pc/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 38,
        "mrp": 48,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Cauliflower%20%201%20pc&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 37,
        "mrp": 48,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Cauliflower%20%201%20pc&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-20000709",
    "name": "fresho! Pomegranate - Regular ((Approx. 400 - 500g))",
    "nameHindi": "fresho! उत्पाद",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "(Approx. 400 - 500g)",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/20000709_20-fresho-pomegranate.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 75,
        "mrp": 92,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Pomegranate%20-%20Regular%20)%20(Approx.%20400%20-%20500g)"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 76,
        "mrp": 92,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Pomegranate%20-%20Regular%20)%20(Approx.%20400%20-%20500g)"
      },
      "instamart": {
        "platform": "instamart",
        "price": 76,
        "mrp": 92,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Pomegranate%20-%20Regular%20)%20(Approx.%20400%20-%20500g)"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 73.7,
        "mrp": 92,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/20000709/fresho-pomegranate-500-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 75,
        "mrp": 92,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Pomegranate%20-%20Regular%20)%20(Approx.%20400%20-%20500g)&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 74,
        "mrp": 92,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Pomegranate%20-%20Regular%20)%20(Approx.%20400%20-%20500g)&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-10000330",
    "name": "fresho! Garlic (1 kg)",
    "nameHindi": "fresho! लहसुन",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/10000330_17-fresho-garlic.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 102,
        "mrp": 489,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Garlic%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 103,
        "mrp": 489,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Garlic%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 102,
        "mrp": 489,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Garlic%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 100,
        "mrp": 489,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/10000330/fresho-garlic-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 102,
        "mrp": 489,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Garlic%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 101,
        "mrp": 489,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Garlic%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-10000025",
    "name": "fresho! Banana - Robusta (1 kg)",
    "nameHindi": "fresho! केला",
    "brand": "fresho!",
    "category": "veggies",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/10000025_32-fresho-banana-robusta.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 21,
        "mrp": 104,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Banana%20-%20Robusta%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 21,
        "mrp": 104,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Banana%20-%20Robusta%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 21,
        "mrp": 104,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Banana%20-%20Robusta%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 20,
        "mrp": 104,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/10000025/fresho-banana-robusta-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 20,
        "mrp": 104,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Banana%20-%20Robusta%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 20,
        "mrp": 104,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Banana%20-%20Robusta%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-213273",
    "name": "Nandini Pure Ghee/Tuppa (1 L)",
    "nameHindi": "Nandini शुद्ध घी",
    "brand": "Nandini",
    "category": "staples",
    "unit": "1 L",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/213273_9-nandini-pure-ghee.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 676,
        "mrp": 715,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Nandini%20Nandini%20Pure%20Ghee%2FTuppa%20%201%20L"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 683,
        "mrp": 715,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Nandini%20Nandini%20Pure%20Ghee%2FTuppa%20%201%20L"
      },
      "instamart": {
        "platform": "instamart",
        "price": 680,
        "mrp": 715,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Nandini%20Nandini%20Pure%20Ghee%2FTuppa%20%201%20L"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 663,
        "mrp": 715,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/213273/nandini-pure-ghee-1-l-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 676,
        "mrp": 715,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Nandini%20Nandini%20Pure%20Ghee%2FTuppa%20%201%20L&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 670,
        "mrp": 715,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Nandini%20Nandini%20Pure%20Ghee%2FTuppa%20%201%20L&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-126903",
    "name": "Aashirvaad Atta/Godihittu - Whole Wheat (5 kg)",
    "nameHindi": "Aashirvaad गेहूं का आटा",
    "brand": "Aashirvaad",
    "category": "staples",
    "unit": "5 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/126903_12-aashirvaad-atta-whole-wheat.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 283,
        "mrp": 314,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Aashirvaad%20Aashirvaad%20Atta%2FGodihittu%20-%20Whole%20Wheat%20%205%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 285,
        "mrp": 314,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Aashirvaad%20Aashirvaad%20Atta%2FGodihittu%20-%20Whole%20Wheat%20%205%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 284,
        "mrp": 314,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Aashirvaad%20Aashirvaad%20Atta%2FGodihittu%20-%20Whole%20Wheat%20%205%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 277,
        "mrp": 314,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/126903/aashirvaad-atta-whole-wheat-5-kg-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 283,
        "mrp": 314,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Aashirvaad%20Aashirvaad%20Atta%2FGodihittu%20-%20Whole%20Wheat%20%205%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 280,
        "mrp": 314,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Aashirvaad%20Aashirvaad%20Atta%2FGodihittu%20-%20Whole%20Wheat%20%205%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40075897",
    "name": "bb Royal Sona Masoori Rice/Akki Raw Rice/Akki - Super Premium (10 kg)",
    "nameHindi": "bb Royal चावल",
    "brand": "bb Royal",
    "category": "staples",
    "unit": "10 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40075897_15-bb-royal-sona-masoori-rice-raw-rice-super-premium.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 738,
        "mrp": 1000,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=bb%20Royal%20bb%20Royal%20Sona%20Masoori%20Rice%2FAkki%20Raw%20Rice%2FAkki%20-%20Super%20Premium%20%2010%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 746,
        "mrp": 1000,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=bb%20Royal%20bb%20Royal%20Sona%20Masoori%20Rice%2FAkki%20Raw%20Rice%2FAkki%20-%20Super%20Premium%20%2010%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 742,
        "mrp": 1000,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=bb%20Royal%20bb%20Royal%20Sona%20Masoori%20Rice%2FAkki%20Raw%20Rice%2FAkki%20-%20Super%20Premium%20%2010%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 724,
        "mrp": 1000,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40075897/bb-royal-sona-masoori-rice-raw-rice-super-premium-10-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 738,
        "mrp": 1000,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=bb%20Royal%20bb%20Royal%20Sona%20Masoori%20Rice%2FAkki%20Raw%20Rice%2FAkki%20-%20Super%20Premium%20%2010%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 731,
        "mrp": 1000,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=bb%20Royal%20bb%20Royal%20Sona%20Masoori%20Rice%2FAkki%20Raw%20Rice%2FAkki%20-%20Super%20Premium%20%2010%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-276764",
    "name": "Fortune Premium Kachi Ghani Pure Mustard Oil (500 ml)",
    "nameHindi": "Fortune खाना पकाने का तेल",
    "brand": "Fortune",
    "category": "staples",
    "unit": "500 ml",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/276764_13-fortune-fortune-premium-kachi-ghani-pure-mustard-oil.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 86,
        "mrp": 96,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Fortune%20Fortune%20Premium%20Kachi%20Ghani%20Pure%20Mustard%20Oil%20%20500%20ml"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 87,
        "mrp": 96,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Fortune%20Fortune%20Premium%20Kachi%20Ghani%20Pure%20Mustard%20Oil%20%20500%20ml"
      },
      "instamart": {
        "platform": "instamart",
        "price": 86,
        "mrp": 96,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Fortune%20Fortune%20Premium%20Kachi%20Ghani%20Pure%20Mustard%20Oil%20%20500%20ml"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 84,
        "mrp": 96,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/276764/fortune-fortune-premium-kachi-ghani-pure-mustard-oil-500-ml-bottle/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 86,
        "mrp": 96,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Fortune%20Fortune%20Premium%20Kachi%20Ghani%20Pure%20Mustard%20Oil%20%20500%20ml&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 85,
        "mrp": 96,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Fortune%20Fortune%20Premium%20Kachi%20Ghani%20Pure%20Mustard%20Oil%20%20500%20ml&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-30005417",
    "name": "bb Popular Sugar/Sakkare (5 kg)",
    "nameHindi": "bb Popular चीनी",
    "brand": "bb Popular",
    "category": "staples",
    "unit": "5 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/30005417_10-bb-popular-sugar.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 393,
        "mrp": 410,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=bb%20Popular%20bb%20Popular%20Sugar%2FSakkare%20%205%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 397,
        "mrp": 410,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=bb%20Popular%20bb%20Popular%20Sugar%2FSakkare%20%205%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 395,
        "mrp": 410,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=bb%20Popular%20bb%20Popular%20Sugar%2FSakkare%20%205%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 385,
        "mrp": 410,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/30005417/bb-popular-sugar-5-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 393,
        "mrp": 410,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=bb%20Popular%20bb%20Popular%20Sugar%2FSakkare%20%205%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 389,
        "mrp": 410,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=bb%20Popular%20bb%20Popular%20Sugar%2FSakkare%20%205%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40000292",
    "name": "Tata Sampann Toor Dal/Togari Bele (500 g)",
    "nameHindi": "Tata Sampann उत्पाद",
    "brand": "Tata Sampann",
    "category": "staples",
    "unit": "500 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40000292_11-tata-sampann-unpolished-toor-dalarhar-dal.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 88,
        "mrp": 118,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Tata%20Sampann%20Tata%20Sampann%20Toor%20Dal%2FTogari%20Bele%20%20500%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 89,
        "mrp": 118,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Tata%20Sampann%20Tata%20Sampann%20Toor%20Dal%2FTogari%20Bele%20%20500%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 88,
        "mrp": 118,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Tata%20Sampann%20Tata%20Sampann%20Toor%20Dal%2FTogari%20Bele%20%20500%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 86,
        "mrp": 118,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40000292/tata-sampann-unpolished-toor-dalarhar-dal-500-g-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 88,
        "mrp": 118,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Tata%20Sampann%20Tata%20Sampann%20Toor%20Dal%2FTogari%20Bele%20%20500%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 87,
        "mrp": 118,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Tata%20Sampann%20Tata%20Sampann%20Toor%20Dal%2FTogari%20Bele%20%20500%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40021402",
    "name": "bb Popular Cashew/Godambi - Whole (1 kg)",
    "nameHindi": "bb Popular उत्पाद",
    "brand": "bb Popular",
    "category": "staples",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40021402_7-bb-popular-cashewkaju-whole.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 1058,
        "mrp": 1920,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=bb%20Popular%20bb%20Popular%20Cashew%2FGodambi%20-%20Whole%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 1068,
        "mrp": 1920,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=bb%20Popular%20bb%20Popular%20Cashew%2FGodambi%20-%20Whole%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 1063,
        "mrp": 1920,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=bb%20Popular%20bb%20Popular%20Cashew%2FGodambi%20-%20Whole%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 1037,
        "mrp": 1920,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40021402/bb-popular-cashewkaju-whole-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 1058,
        "mrp": 1920,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=bb%20Popular%20bb%20Popular%20Cashew%2FGodambi%20-%20Whole%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 1047,
        "mrp": 1920,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=bb%20Popular%20bb%20Popular%20Cashew%2FGodambi%20-%20Whole%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-30010383",
    "name": "bb Popular Peanuts/Kadalekayi - Raw (1 kg)",
    "nameHindi": "bb Popular उत्पाद",
    "brand": "bb Popular",
    "category": "staples",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/30010383_13-bb-popular-peanutsmungaphalishengdana-raw.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 220,
        "mrp": 279,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=bb%20Popular%20bb%20Popular%20Peanuts%2FKadalekayi%20-%20Raw%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 222,
        "mrp": 279,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=bb%20Popular%20bb%20Popular%20Peanuts%2FKadalekayi%20-%20Raw%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 221,
        "mrp": 279,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=bb%20Popular%20bb%20Popular%20Peanuts%2FKadalekayi%20-%20Raw%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 216,
        "mrp": 279,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/30010383/bb-popular-peanutsmungaphalishengdana-raw-1-kg-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 220,
        "mrp": 279,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=bb%20Popular%20bb%20Popular%20Peanuts%2FKadalekayi%20-%20Raw%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 218,
        "mrp": 279,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=bb%20Popular%20bb%20Popular%20Peanuts%2FKadalekayi%20-%20Raw%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-10000404",
    "name": "bb Royal Rice/Akki - Raw, Sona Masoori, 12-17 Months Old (10 kg)",
    "nameHindi": "bb Royal चावल",
    "brand": "bb Royal",
    "category": "staples",
    "unit": "10 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/10000404_21-bb-royal-rice-raw-sona-masoori-12-17-months-old.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 738,
        "mrp": 900,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=bb%20Royal%20bb%20Royal%20Rice%2FAkki%20-%20Raw%2C%20Sona%20Masoori%2C%2012-17%20Months%20Old%20%2010%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 746,
        "mrp": 900,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=bb%20Royal%20bb%20Royal%20Rice%2FAkki%20-%20Raw%2C%20Sona%20Masoori%2C%2012-17%20Months%20Old%20%2010%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 742,
        "mrp": 900,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=bb%20Royal%20bb%20Royal%20Rice%2FAkki%20-%20Raw%2C%20Sona%20Masoori%2C%2012-17%20Months%20Old%20%2010%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 724,
        "mrp": 900,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/10000404/bb-royal-rice-raw-sona-masoori-12-17-months-old-10-kg-bag/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 738,
        "mrp": 900,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=bb%20Royal%20bb%20Royal%20Rice%2FAkki%20-%20Raw%2C%20Sona%20Masoori%2C%2012-17%20Months%20Old%20%2010%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 731,
        "mrp": 900,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=bb%20Royal%20bb%20Royal%20Rice%2FAkki%20-%20Raw%2C%20Sona%20Masoori%2C%2012-17%20Months%20Old%20%2010%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-10000412",
    "name": "bb Popular Toor/Arhar Dal (5 kg)",
    "nameHindi": "bb Popular उत्पाद",
    "brand": "bb Popular",
    "category": "staples",
    "unit": "5 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/10000412_17-bb-popular-toorarhar-dal.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 803,
        "mrp": 1349,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=bb%20Popular%20bb%20Popular%20Toor%2FArhar%20Dal%20%205%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 811,
        "mrp": 1349,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=bb%20Popular%20bb%20Popular%20Toor%2FArhar%20Dal%20%205%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 807,
        "mrp": 1349,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=bb%20Popular%20bb%20Popular%20Toor%2FArhar%20Dal%20%205%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 787.2,
        "mrp": 1349,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/10000412/bb-popular-toorarhar-dal-5-kg-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 803,
        "mrp": 1349,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=bb%20Popular%20bb%20Popular%20Toor%2FArhar%20Dal%20%205%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 795,
        "mrp": 1349,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=bb%20Popular%20bb%20Popular%20Toor%2FArhar%20Dal%20%205%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40306989",
    "name": "Borges Olive Oil (3 L)",
    "nameHindi": "Borges खाना पकाने का तेल",
    "brand": "Borges",
    "category": "staples",
    "unit": "3 L",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40306989_2-borges-olive-oil.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 2804,
        "mrp": 6000,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Borges%20Borges%20Olive%20Oil%20%203%20L"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 2831,
        "mrp": 6000,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Borges%20Borges%20Olive%20Oil%20%203%20L"
      },
      "instamart": {
        "platform": "instamart",
        "price": 2818,
        "mrp": 6000,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Borges%20Borges%20Olive%20Oil%20%203%20L"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 2749,
        "mrp": 6000,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40306989/borges-olive-oil-3-l-pet/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 2804,
        "mrp": 6000,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Borges%20Borges%20Olive%20Oil%20%203%20L&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 2776,
        "mrp": 6000,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Borges%20Borges%20Olive%20Oil%20%203%20L&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40236231",
    "name": "Aashirvaad Select MP Sharbati Atta (10 kg)",
    "nameHindi": "Aashirvaad गेहूं का आटा",
    "brand": "Aashirvaad",
    "category": "staples",
    "unit": "10 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40236231_5-aashirvaad-select-sharbati-atta-100-mp-whole-wheat-rotis-stay-softer-for-longer.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 638,
        "mrp": 680,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Aashirvaad%20Aashirvaad%20Select%20MP%20Sharbati%20Atta%20%2010%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 644,
        "mrp": 680,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Aashirvaad%20Aashirvaad%20Select%20MP%20Sharbati%20Atta%20%2010%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 641,
        "mrp": 680,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Aashirvaad%20Aashirvaad%20Select%20MP%20Sharbati%20Atta%20%2010%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 625.6,
        "mrp": 680,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40236231/aashirvaad-select-sharbati-atta-100-mp-whole-wheat-rotis-stay-softer-for-longer-10-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 638,
        "mrp": 680,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Aashirvaad%20Aashirvaad%20Select%20MP%20Sharbati%20Atta%20%2010%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 632,
        "mrp": 680,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Aashirvaad%20Aashirvaad%20Select%20MP%20Sharbati%20Atta%20%2010%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40253563",
    "name": "Madhur Sugar (1 kg)",
    "nameHindi": "Madhur चीनी",
    "brand": "Madhur",
    "category": "staples",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40253563_2-madhur-sugar-pure-hygienic-fine-grain-natural-sulphur-free.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 65,
        "mrp": 65,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Madhur%20Madhur%20Sugar%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 65,
        "mrp": 65,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Madhur%20Madhur%20Sugar%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 65,
        "mrp": 65,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Madhur%20Madhur%20Sugar%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 64,
        "mrp": 65,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40253563/madhur-sugar-pure-hygienic-fine-grain-natural-sulphur-free-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 65,
        "mrp": 65,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Madhur%20Madhur%20Sugar%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 65,
        "mrp": 65,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Madhur%20Madhur%20Sugar%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40021405",
    "name": "bb Popular Almond/Badam - Californian, Giri (1 kg)",
    "nameHindi": "bb Popular उत्पाद",
    "brand": "bb Popular",
    "category": "staples",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40021405_12-bb-popular-almondbadam-californian-giri.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 1046,
        "mrp": 1046,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=bb%20Popular%20bb%20Popular%20Almond%2FBadam%20-%20Californian%2C%20Giri%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 1046,
        "mrp": 1046,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=bb%20Popular%20bb%20Popular%20Almond%2FBadam%20-%20Californian%2C%20Giri%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 1046,
        "mrp": 1046,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=bb%20Popular%20bb%20Popular%20Almond%2FBadam%20-%20Californian%2C%20Giri%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 1045,
        "mrp": 1046,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40021405/bb-popular-almondbadam-californian-giri-1-kg-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 1046,
        "mrp": 1046,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=bb%20Popular%20bb%20Popular%20Almond%2FBadam%20-%20Californian%2C%20Giri%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 1046,
        "mrp": 1046,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=bb%20Popular%20bb%20Popular%20Almond%2FBadam%20-%20Californian%2C%20Giri%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-276757",
    "name": "Dhara  VitAE Refined Sunflower Oil (1 L)",
    "nameHindi": "Dhara  खाना पकाने का तेल",
    "brand": "Dhara ",
    "category": "staples",
    "unit": "1 L",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/276757_12-dhara-refined-sunflower-oil.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 182,
        "mrp": 225,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Dhara%20%20Dhara%20%20VitAE%20Refined%20Sunflower%20Oil%20%201%20L"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 184,
        "mrp": 225,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Dhara%20%20Dhara%20%20VitAE%20Refined%20Sunflower%20Oil%20%201%20L"
      },
      "instamart": {
        "platform": "instamart",
        "price": 183,
        "mrp": 225,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Dhara%20%20Dhara%20%20VitAE%20Refined%20Sunflower%20Oil%20%201%20L"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 178.5,
        "mrp": 225,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/276757/dhara-refined-sunflower-oil-1-l-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 182,
        "mrp": 225,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Dhara%20%20Dhara%20%20VitAE%20Refined%20Sunflower%20Oil%20%201%20L&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 180,
        "mrp": 225,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Dhara%20%20Dhara%20%20VitAE%20Refined%20Sunflower%20Oil%20%201%20L&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-274129",
    "name": "Gold Winner Refined Sunflower Oil (500 ml)",
    "nameHindi": "Gold Winner खाना पकाने का तेल",
    "brand": "Gold Winner",
    "category": "staples",
    "unit": "500 ml",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/274129_1-gold-winner-refined-oil-sunflower.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 84,
        "mrp": 100,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Gold%20Winner%20Gold%20Winner%20Refined%20Sunflower%20Oil%20%20500%20ml"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 85,
        "mrp": 100,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Gold%20Winner%20Gold%20Winner%20Refined%20Sunflower%20Oil%20%20500%20ml"
      },
      "instamart": {
        "platform": "instamart",
        "price": 85,
        "mrp": 100,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Gold%20Winner%20Gold%20Winner%20Refined%20Sunflower%20Oil%20%20500%20ml"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 82.8,
        "mrp": 100,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/274129/gold-winner-refined-oil-sunflower-500-ml-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 84,
        "mrp": 100,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Gold%20Winner%20Gold%20Winner%20Refined%20Sunflower%20Oil%20%20500%20ml&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 84,
        "mrp": 100,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Gold%20Winner%20Gold%20Winner%20Refined%20Sunflower%20Oil%20%20500%20ml&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-1204454",
    "name": "Fortune Rice Bran Health Physically Refined Oil (3x870 g)",
    "nameHindi": "Fortune चावल",
    "brand": "Fortune",
    "category": "staples",
    "unit": "3x870 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/1204454_2-fortune-refined-oil-rice-bran.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 546,
        "mrp": 657,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Fortune%20Fortune%20Rice%20Bran%20Health%20Physically%20Refined%20Oil%20%203x870%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 552,
        "mrp": 657,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Fortune%20Fortune%20Rice%20Bran%20Health%20Physically%20Refined%20Oil%20%203x870%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 549,
        "mrp": 657,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Fortune%20Fortune%20Rice%20Bran%20Health%20Physically%20Refined%20Oil%20%203x870%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 535.5,
        "mrp": 657,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/1204454/fortune-refined-oil-rice-bran-3x1-l/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 546,
        "mrp": 657,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Fortune%20Fortune%20Rice%20Bran%20Health%20Physically%20Refined%20Oil%20%203x870%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 541,
        "mrp": 657,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Fortune%20Fortune%20Rice%20Bran%20Health%20Physically%20Refined%20Oil%20%203x870%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40274476",
    "name": "Tata Sampann California Almonds (1 kg)",
    "nameHindi": "Tata Sampann उत्पाद",
    "brand": "Tata Sampann",
    "category": "staples",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40274476_10-tata-sampann-100-pure-premium-california-almonds-whole-protein-rich.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 1349,
        "mrp": 1470,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Tata%20Sampann%20Tata%20Sampann%20California%20Almonds%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 1363,
        "mrp": 1470,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Tata%20Sampann%20Tata%20Sampann%20California%20Almonds%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 1356,
        "mrp": 1470,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Tata%20Sampann%20Tata%20Sampann%20California%20Almonds%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 1323,
        "mrp": 1470,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40274476/tata-sampann-100-pure-premium-california-almonds-whole-protein-rich-1-kg-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 1349,
        "mrp": 1470,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Tata%20Sampann%20Tata%20Sampann%20California%20Almonds%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 1336,
        "mrp": 1470,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Tata%20Sampann%20Tata%20Sampann%20California%20Almonds%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-30002287",
    "name": "Tata Sampann Moong Dal/Hesaru Bele (1 kg)",
    "nameHindi": "Tata Sampann उत्पाद",
    "brand": "Tata Sampann",
    "category": "staples",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/30002287_12-tata-sampann-unpolished-moong-dal.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 184,
        "mrp": 212,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Tata%20Sampann%20Tata%20Sampann%20Moong%20Dal%2FHesaru%20Bele%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 185,
        "mrp": 212,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Tata%20Sampann%20Tata%20Sampann%20Moong%20Dal%2FHesaru%20Bele%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 184,
        "mrp": 212,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Tata%20Sampann%20Tata%20Sampann%20Moong%20Dal%2FHesaru%20Bele%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 180,
        "mrp": 212,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/30002287/tata-sampann-unpolished-moong-dal-1-kg-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 184,
        "mrp": 212,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Tata%20Sampann%20Tata%20Sampann%20Moong%20Dal%2FHesaru%20Bele%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 182,
        "mrp": 212,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Tata%20Sampann%20Tata%20Sampann%20Moong%20Dal%2FHesaru%20Bele%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40030808",
    "name": "bb Royal Cumin/Jeera/Jeerige - Whole (1 kg)",
    "nameHindi": "bb Royal उत्पाद",
    "brand": "bb Royal",
    "category": "staples",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40030808_12-bb-royal-cuminjeera-whole.jpg",
    "trending": true,
    "isDailyEssential": true,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 373,
        "mrp": 630,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=bb%20Royal%20bb%20Royal%20Cumin%2FJeera%2FJeerige%20-%20Whole%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 377,
        "mrp": 630,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=bb%20Royal%20bb%20Royal%20Cumin%2FJeera%2FJeerige%20-%20Whole%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 375,
        "mrp": 630,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=bb%20Royal%20bb%20Royal%20Cumin%2FJeera%2FJeerige%20-%20Whole%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 366,
        "mrp": 630,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40030808/bb-royal-cuminjeera-whole-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 373,
        "mrp": 630,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=bb%20Royal%20bb%20Royal%20Cumin%2FJeera%2FJeerige%20-%20Whole%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 370,
        "mrp": 630,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=bb%20Royal%20bb%20Royal%20Cumin%2FJeera%2FJeerige%20-%20Whole%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40211241",
    "name": "Bisleri  Packaged Drinking Water - With Added Minerals (10 L)",
    "nameHindi": "Bisleri  पीने का पानी",
    "brand": "Bisleri ",
    "category": "beverages",
    "unit": "10 L",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40211241_5-bisleri-mineral-water.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 108,
        "mrp": 108,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Bisleri%20%20Bisleri%20%20Packaged%20Drinking%20Water%20-%20With%20Added%20Minerals%20%2010%20L"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 108,
        "mrp": 108,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Bisleri%20%20Bisleri%20%20Packaged%20Drinking%20Water%20-%20With%20Added%20Minerals%20%2010%20L"
      },
      "instamart": {
        "platform": "instamart",
        "price": 108,
        "mrp": 108,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Bisleri%20%20Bisleri%20%20Packaged%20Drinking%20Water%20-%20With%20Added%20Minerals%20%2010%20L"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 108,
        "mrp": 108,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40211241/bisleri-mineral-water-10-l-can/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 108,
        "mrp": 108,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Bisleri%20%20Bisleri%20%20Packaged%20Drinking%20Water%20-%20With%20Added%20Minerals%20%2010%20L&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 108,
        "mrp": 108,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Bisleri%20%20Bisleri%20%20Packaged%20Drinking%20Water%20-%20With%20Added%20Minerals%20%2010%20L&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-252171",
    "name": "Cothas Coffee Powder Speciality Blend (200 g)",
    "nameHindi": "Cothas Coffee कॉफ़ी",
    "brand": "Cothas Coffee",
    "category": "beverages",
    "unit": "200 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/252171_10-cothas-coffee-coffee-powder-speciality-blend-of-coffee-chicory-powder.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 214,
        "mrp": 214,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Cothas%20Coffee%20Cothas%20Coffee%20Powder%20Speciality%20Blend%20%20200%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 214,
        "mrp": 214,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Cothas%20Coffee%20Cothas%20Coffee%20Powder%20Speciality%20Blend%20%20200%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 214,
        "mrp": 214,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Cothas%20Coffee%20Cothas%20Coffee%20Powder%20Speciality%20Blend%20%20200%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 213,
        "mrp": 214,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/252171/cothas-coffee-coffee-powder-speciality-blend-of-coffee-chicory-powder-200-g-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 214,
        "mrp": 214,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Cothas%20Coffee%20Cothas%20Coffee%20Powder%20Speciality%20Blend%20%20200%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 214,
        "mrp": 214,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Cothas%20Coffee%20Cothas%20Coffee%20Powder%20Speciality%20Blend%20%20200%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-266579",
    "name": "BRU Instant Coffee Power (200 g)",
    "nameHindi": "BRU कॉफ़ी",
    "brand": "BRU",
    "category": "beverages",
    "unit": "200 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/266579_30-bru-instant-coffee.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 381,
        "mrp": 440,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=BRU%20BRU%20Instant%20Coffee%20Power%20%20200%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 385,
        "mrp": 440,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=BRU%20BRU%20Instant%20Coffee%20Power%20%20200%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 383,
        "mrp": 440,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=BRU%20BRU%20Instant%20Coffee%20Power%20%20200%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 374,
        "mrp": 440,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/266579/bru-instant-coffee-200-g-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 381,
        "mrp": 440,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=BRU%20BRU%20Instant%20Coffee%20Power%20%20200%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 378,
        "mrp": 440,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=BRU%20BRU%20Instant%20Coffee%20Power%20%20200%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-226491",
    "name": "Red Label Natural Care Tea (1 kg)",
    "nameHindi": "Red Label चाय पत्ती",
    "brand": "Red Label",
    "category": "beverages",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/226491_15-red-label-tea-natural-care.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 545,
        "mrp": 660,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Red%20Label%20Red%20Label%20Natural%20Care%20Tea%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 551,
        "mrp": 660,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Red%20Label%20Red%20Label%20Natural%20Care%20Tea%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 548,
        "mrp": 660,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Red%20Label%20Red%20Label%20Natural%20Care%20Tea%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 534.6,
        "mrp": 660,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/226491/red-label-tea-natural-care-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 545,
        "mrp": 660,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Red%20Label%20Red%20Label%20Natural%20Care%20Tea%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 540,
        "mrp": 660,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Red%20Label%20Red%20Label%20Natural%20Care%20Tea%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-102871",
    "name": "Red Label Tea (1 kg)",
    "nameHindi": "Red Label चाय पत्ती",
    "brand": "Red Label",
    "category": "beverages",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/102871_12-red-label-tea.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 579,
        "mrp": 610,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Red%20Label%20Red%20Label%20Tea%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 584,
        "mrp": 610,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Red%20Label%20Red%20Label%20Tea%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 581,
        "mrp": 610,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Red%20Label%20Red%20Label%20Tea%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 567.3,
        "mrp": 610,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/102871/red-label-tea-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 579,
        "mrp": 610,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Red%20Label%20Red%20Label%20Tea%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 573,
        "mrp": 610,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Red%20Label%20Red%20Label%20Tea%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40128171",
    "name": "emperia Kadak Tea (500 g)",
    "nameHindi": "emperia चाय पत्ती",
    "brand": "emperia",
    "category": "beverages",
    "unit": "500 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40128171_9-emperia-kadak-tea.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 189,
        "mrp": 300,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=emperia%20emperia%20Kadak%20Tea%20%20500%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 191,
        "mrp": 300,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=emperia%20emperia%20Kadak%20Tea%20%20500%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 190,
        "mrp": 300,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=emperia%20emperia%20Kadak%20Tea%20%20500%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 185,
        "mrp": 300,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40128171/emperia-kadak-tea-500-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 189,
        "mrp": 300,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=emperia%20emperia%20Kadak%20Tea%20%20500%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 187,
        "mrp": 300,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=emperia%20emperia%20Kadak%20Tea%20%20500%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-137936",
    "name": "Taj Mahal Rich And Flavourful Tea (1 kg)",
    "nameHindi": "Taj Mahal चाय पत्ती",
    "brand": "Taj Mahal",
    "category": "beverages",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/137936_16-taj-mahal-tea.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 704,
        "mrp": 750,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Taj%20Mahal%20Taj%20Mahal%20Rich%20And%20Flavourful%20Tea%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 711,
        "mrp": 750,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Taj%20Mahal%20Taj%20Mahal%20Rich%20And%20Flavourful%20Tea%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 707,
        "mrp": 750,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Taj%20Mahal%20Taj%20Mahal%20Rich%20And%20Flavourful%20Tea%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 690,
        "mrp": 750,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/137936/taj-mahal-tea-1-kg-carton/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 704,
        "mrp": 750,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Taj%20Mahal%20Taj%20Mahal%20Rich%20And%20Flavourful%20Tea%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 697,
        "mrp": 750,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Taj%20Mahal%20Taj%20Mahal%20Rich%20And%20Flavourful%20Tea%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40200082",
    "name": "Tata Tea Gold Tea With Gently Rolled Long Leaves (1.5 kg)",
    "nameHindi": "Tata Tea Gold चाय पत्ती",
    "brand": "Tata Tea Gold",
    "category": "beverages",
    "unit": "1.5 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40200082_7-tata-tea-gold-tea.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 756,
        "mrp": 930,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Tata%20Tea%20Gold%20Tata%20Tea%20Gold%20Tea%20With%20Gently%20Rolled%20Long%20Leaves%20%201.5%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 764,
        "mrp": 930,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Tata%20Tea%20Gold%20Tata%20Tea%20Gold%20Tea%20With%20Gently%20Rolled%20Long%20Leaves%20%201.5%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 760,
        "mrp": 930,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Tata%20Tea%20Gold%20Tata%20Tea%20Gold%20Tea%20With%20Gently%20Rolled%20Long%20Leaves%20%201.5%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 741.5,
        "mrp": 930,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40200082/tata-tea-gold-tea-15-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 756,
        "mrp": 930,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Tata%20Tea%20Gold%20Tata%20Tea%20Gold%20Tea%20With%20Gently%20Rolled%20Long%20Leaves%20%201.5%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 749,
        "mrp": 930,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Tata%20Tea%20Gold%20Tata%20Tea%20Gold%20Tea%20With%20Gently%20Rolled%20Long%20Leaves%20%201.5%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-100401162",
    "name": "Coca Cola Diet Coke Soft Drink (300 ml)",
    "nameHindi": "Coca Cola उत्पाद",
    "brand": "Coca Cola",
    "category": "beverages",
    "unit": "300 ml",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/100401162_21-coca-cola-diet-coke-soft-drink.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 40,
        "mrp": 40,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Coca%20Cola%20Coca%20Cola%20Diet%20Coke%20Soft%20Drink%20%20300%20ml"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 40,
        "mrp": 40,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Coca%20Cola%20Coca%20Cola%20Diet%20Coke%20Soft%20Drink%20%20300%20ml"
      },
      "instamart": {
        "platform": "instamart",
        "price": 40,
        "mrp": 40,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Coca%20Cola%20Coca%20Cola%20Diet%20Coke%20Soft%20Drink%20%20300%20ml"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 40,
        "mrp": 40,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/100401162/coca-cola-diet-coke-soft-drink-300-ml-can/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 40,
        "mrp": 40,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Coca%20Cola%20Coca%20Cola%20Diet%20Coke%20Soft%20Drink%20%20300%20ml&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 40,
        "mrp": 40,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Coca%20Cola%20Coca%20Cola%20Diet%20Coke%20Soft%20Drink%20%20300%20ml&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-186077",
    "name": "Cothas Coffee Powder Premium Special - Hotel Blend (500 g)",
    "nameHindi": "Cothas Coffee कॉफ़ी",
    "brand": "Cothas Coffee",
    "category": "beverages",
    "unit": "500 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/186077_3-cothas-coffee-coffee-powder-premium-special.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 460,
        "mrp": 460,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Cothas%20Coffee%20Cothas%20Coffee%20Powder%20Premium%20Special%20-%20Hotel%20Blend%20%20500%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 460,
        "mrp": 460,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Cothas%20Coffee%20Cothas%20Coffee%20Powder%20Premium%20Special%20-%20Hotel%20Blend%20%20500%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 460,
        "mrp": 460,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Cothas%20Coffee%20Cothas%20Coffee%20Powder%20Premium%20Special%20-%20Hotel%20Blend%20%20500%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 460,
        "mrp": 460,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/186077/cothas-coffee-coffee-powder-premium-special-500-g-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 460,
        "mrp": 460,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Cothas%20Coffee%20Cothas%20Coffee%20Powder%20Premium%20Special%20-%20Hotel%20Blend%20%20500%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 460,
        "mrp": 460,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Cothas%20Coffee%20Cothas%20Coffee%20Powder%20Premium%20Special%20-%20Hotel%20Blend%20%20500%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-262799",
    "name": "BRU Filter Coffee - Green Label (500 g)",
    "nameHindi": "BRU कॉफ़ी",
    "brand": "BRU",
    "category": "beverages",
    "unit": "500 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/262799_24-bru-filter-coffee-green-label.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 201,
        "mrp": 205,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=BRU%20BRU%20Filter%20Coffee%20-%20Green%20Label%20%20500%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 203,
        "mrp": 205,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=BRU%20BRU%20Filter%20Coffee%20-%20Green%20Label%20%20500%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 202,
        "mrp": 205,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=BRU%20BRU%20Filter%20Coffee%20-%20Green%20Label%20%20500%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 196.8,
        "mrp": 205,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/262799/bru-filter-coffee-green-label-500-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 201,
        "mrp": 205,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=BRU%20BRU%20Filter%20Coffee%20-%20Green%20Label%20%20500%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 199,
        "mrp": 205,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=BRU%20BRU%20Filter%20Coffee%20-%20Green%20Label%20%20500%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40334329",
    "name": "CLEAR WATER Premium Drinking Water With Added Minerals (24x500 ml)",
    "nameHindi": "CLEAR WATER पीने का पानी",
    "brand": "CLEAR WATER",
    "category": "beverages",
    "unit": "24x500 ml",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40334329_2-clear-water-premium-drinking-water-with-added-minerals.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 215,
        "mrp": 240,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=CLEAR%20WATER%20CLEAR%20WATER%20Premium%20Drinking%20Water%20With%20Added%20Minerals%20%2024x500%20ml"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 218,
        "mrp": 240,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=CLEAR%20WATER%20CLEAR%20WATER%20Premium%20Drinking%20Water%20With%20Added%20Minerals%20%2024x500%20ml"
      },
      "instamart": {
        "platform": "instamart",
        "price": 216,
        "mrp": 240,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=CLEAR%20WATER%20CLEAR%20WATER%20Premium%20Drinking%20Water%20With%20Added%20Minerals%20%2024x500%20ml"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 211.2,
        "mrp": 240,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40334329/clear-water-premium-drinking-water-with-added-minerals-500-ml-x-24/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 215,
        "mrp": 240,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=CLEAR%20WATER%20CLEAR%20WATER%20Premium%20Drinking%20Water%20With%20Added%20Minerals%20%2024x500%20ml&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 213,
        "mrp": 240,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=CLEAR%20WATER%20CLEAR%20WATER%20Premium%20Drinking%20Water%20With%20Added%20Minerals%20%2024x500%20ml&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-20005895",
    "name": "Nescafe  Instant Sunrise Coffee Chicory Mix Powder (45 g)",
    "nameHindi": "Nescafe  कॉफ़ी",
    "brand": "Nescafe ",
    "category": "beverages",
    "unit": "45 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/20005895_18-nescafe-sunrise-instant-coffee-chicory-mixture.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 92,
        "mrp": 120,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Nescafe%20%20Nescafe%20%20Instant%20Sunrise%20Coffee%20Chicory%20Mix%20Powder%20%2045%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 93,
        "mrp": 120,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Nescafe%20%20Nescafe%20%20Instant%20Sunrise%20Coffee%20Chicory%20Mix%20Powder%20%2045%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 92,
        "mrp": 120,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Nescafe%20%20Nescafe%20%20Instant%20Sunrise%20Coffee%20Chicory%20Mix%20Powder%20%2045%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 90,
        "mrp": 120,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/20005895/nescafe-sunrise-instant-coffee-chicory-mixture-50-g-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 92,
        "mrp": 120,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Nescafe%20%20Nescafe%20%20Instant%20Sunrise%20Coffee%20Chicory%20Mix%20Powder%20%2045%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 91,
        "mrp": 120,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Nescafe%20%20Nescafe%20%20Instant%20Sunrise%20Coffee%20Chicory%20Mix%20Powder%20%2045%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-253502",
    "name": "Boost Chocolate Nutrition Drink Powder (750 g)",
    "nameHindi": "Boost उत्पाद",
    "brand": "Boost",
    "category": "beverages",
    "unit": "750 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/253502_11-boost-nutrition-drink-health-energy-sports.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 368,
        "mrp": 415,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Boost%20Boost%20Chocolate%20Nutrition%20Drink%20Powder%20%20750%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 372,
        "mrp": 415,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Boost%20Boost%20Chocolate%20Nutrition%20Drink%20Powder%20%20750%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 370,
        "mrp": 415,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Boost%20Boost%20Chocolate%20Nutrition%20Drink%20Powder%20%20750%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 361,
        "mrp": 415,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/253502/boost-nutrition-drink-health-energy-sports-750-g-carton/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 368,
        "mrp": 415,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Boost%20Boost%20Chocolate%20Nutrition%20Drink%20Powder%20%20750%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 365,
        "mrp": 415,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Boost%20Boost%20Chocolate%20Nutrition%20Drink%20Powder%20%20750%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40228625",
    "name": "indiSecrets Pure Tulsi Chamomile Tea (36 g)",
    "nameHindi": "indiSecrets चाय पत्ती",
    "brand": "indiSecrets",
    "category": "beverages",
    "unit": "36 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40228625_3-indisecrets-organic-tulsi-honey-chamomile.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 143,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=indiSecrets%20indiSecrets%20Pure%20Tulsi%20Chamomile%20Tea%20%2036%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 144,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=indiSecrets%20indiSecrets%20Pure%20Tulsi%20Chamomile%20Tea%20%2036%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 144,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=indiSecrets%20indiSecrets%20Pure%20Tulsi%20Chamomile%20Tea%20%2036%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 140,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40228625/indisecrets-organic-tulsi-honey-chamomile-36g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 143,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=indiSecrets%20indiSecrets%20Pure%20Tulsi%20Chamomile%20Tea%20%2036%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 141,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=indiSecrets%20indiSecrets%20Pure%20Tulsi%20Chamomile%20Tea%20%2036%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40176780",
    "name": "Tata Coffee Grand Filter Coffee (100 g)",
    "nameHindi": "Tata Coffee कॉफ़ी",
    "brand": "Tata Coffee",
    "category": "beverages",
    "unit": "100 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40176780_8-tata-coffee-filter-coffee-grand-rich-aromatic.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 37,
        "mrp": 48,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Tata%20Coffee%20Tata%20Coffee%20Grand%20Filter%20Coffee%20%20100%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 37,
        "mrp": 48,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Tata%20Coffee%20Tata%20Coffee%20Grand%20Filter%20Coffee%20%20100%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 37,
        "mrp": 48,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Tata%20Coffee%20Tata%20Coffee%20Grand%20Filter%20Coffee%20%20100%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 36,
        "mrp": 48,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40176780/tata-coffee-filter-coffee-grand-rich-aromatic-100-g-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 37,
        "mrp": 48,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Tata%20Coffee%20Tata%20Coffee%20Grand%20Filter%20Coffee%20%20100%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 36,
        "mrp": 48,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Tata%20Coffee%20Tata%20Coffee%20Grand%20Filter%20Coffee%20%20100%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-271205",
    "name": "iD Fresh Idly & Dosa Batter (1 kg)",
    "nameHindi": "iD Fresh उत्पाद",
    "brand": "iD Fresh",
    "category": "snacks",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/271205_19-id-fresho-idly-dosa-batter.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 80,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=iD%20Fresh%20iD%20Fresh%20Idly%20%26%20Dosa%20Batter%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 80,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=iD%20Fresh%20iD%20Fresh%20Idly%20%26%20Dosa%20Batter%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 80,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=iD%20Fresh%20iD%20Fresh%20Idly%20%26%20Dosa%20Batter%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 80,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/271205/id-fresho-idly-dosa-batter-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 80,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=iD%20Fresh%20iD%20Fresh%20Idly%20%26%20Dosa%20Batter%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 80,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=iD%20Fresh%20iD%20Fresh%20Idly%20%26%20Dosa%20Batter%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-266112",
    "name": "Maggi 2-Minute Instant Masala Noodles (420 g)",
    "nameHindi": "Maggi नूडल्स",
    "brand": "Maggi",
    "category": "snacks",
    "unit": "420 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/266112_30-maggi-2-minute-instant-noodles-masala.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 74,
        "mrp": 84,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Maggi%20Maggi%202-Minute%20Instant%20Masala%20Noodles%20%20420%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 75,
        "mrp": 84,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Maggi%20Maggi%202-Minute%20Instant%20Masala%20Noodles%20%20420%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 75,
        "mrp": 84,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Maggi%20Maggi%202-Minute%20Instant%20Masala%20Noodles%20%20420%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 73,
        "mrp": 84,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/266112/maggi-2-minute-instant-noodles-masala-420-g-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 74,
        "mrp": 84,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Maggi%20Maggi%202-Minute%20Instant%20Masala%20Noodles%20%20420%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 74,
        "mrp": 84,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Maggi%20Maggi%202-Minute%20Instant%20Masala%20Noodles%20%20420%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40163718",
    "name": "fresho! Frozen Green Peas - No Preservatives (1 kg)",
    "nameHindi": "fresho! उत्पाद",
    "brand": "fresho!",
    "category": "snacks",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40163718_13-fresho-frozen-green-peas.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 172,
        "mrp": 260,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=fresho!%20fresho!%20Frozen%20Green%20Peas%20-%20No%20Preservatives%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 174,
        "mrp": 260,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=fresho!%20fresho!%20Frozen%20Green%20Peas%20-%20No%20Preservatives%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 173,
        "mrp": 260,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=fresho!%20fresho!%20Frozen%20Green%20Peas%20-%20No%20Preservatives%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 169,
        "mrp": 260,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40163718/fresho-frozen-green-peas-1-kg-slider-zip-standy-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 172,
        "mrp": 260,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=fresho!%20fresho!%20Frozen%20Green%20Peas%20-%20No%20Preservatives%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 171,
        "mrp": 260,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=fresho!%20fresho!%20Frozen%20Green%20Peas%20-%20No%20Preservatives%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40219148",
    "name": "Bingo! Original Style Chilli Sprinkled Potato Chips (85 g)",
    "nameHindi": "Bingo! आलू",
    "brand": "Bingo!",
    "category": "snacks",
    "unit": "85 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40219148_10-bingo-original-style-potato-chips-chilli-sprinkled.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 39,
        "mrp": 50,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Bingo!%20Bingo!%20Original%20Style%20Chilli%20Sprinkled%20Potato%20Chips%20%2085%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 39,
        "mrp": 50,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Bingo!%20Bingo!%20Original%20Style%20Chilli%20Sprinkled%20Potato%20Chips%20%2085%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 39,
        "mrp": 50,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Bingo!%20Bingo!%20Original%20Style%20Chilli%20Sprinkled%20Potato%20Chips%20%2085%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 37.5,
        "mrp": 50,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40219148/bingo-original-style-potato-chips-chilli-sprinkled-100-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 38,
        "mrp": 50,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Bingo!%20Bingo!%20Original%20Style%20Chilli%20Sprinkled%20Potato%20Chips%20%2085%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 38,
        "mrp": 50,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Bingo!%20Bingo!%20Original%20Style%20Chilli%20Sprinkled%20Potato%20Chips%20%2085%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40197801",
    "name": "Britannia Marie Gold Biscuits (950 g)",
    "nameHindi": "Britannia बिस्कुट",
    "brand": "Britannia",
    "category": "snacks",
    "unit": "950 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40197801_9-britannia-marie-gold-biscuits.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 123,
        "mrp": 140,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Britannia%20Britannia%20Marie%20Gold%20Biscuits%20%20950%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 124,
        "mrp": 140,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Britannia%20Britannia%20Marie%20Gold%20Biscuits%20%20950%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 123,
        "mrp": 140,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Britannia%20Britannia%20Marie%20Gold%20Biscuits%20%20950%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 120.4,
        "mrp": 140,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40197801/britannia-marie-gold-biscuits-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 123,
        "mrp": 140,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Britannia%20Britannia%20Marie%20Gold%20Biscuits%20%20950%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 122,
        "mrp": 140,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Britannia%20Britannia%20Marie%20Gold%20Biscuits%20%20950%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-208345",
    "name": "Quaker Rolled Oats (1 kg)",
    "nameHindi": "Quaker उत्पाद",
    "brand": "Quaker",
    "category": "snacks",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/208345_25-quaker-oats-breakfast-cereal-rich-in-protein-dietary-fibre-nutritious-easy-to-cook.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 167,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Quaker%20Quaker%20Rolled%20Oats%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 169,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Quaker%20Quaker%20Rolled%20Oats%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 168,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Quaker%20Quaker%20Rolled%20Oats%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 164,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/208345/quaker-oats-breakfast-cereal-rich-in-protein-dietary-fibre-nutritious-easy-to-cook-1-kg-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 167,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Quaker%20Quaker%20Rolled%20Oats%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 166,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Quaker%20Quaker%20Rolled%20Oats%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-103692",
    "name": "Safal Frozen - Green Peas (1 kg)",
    "nameHindi": "Safal उत्पाद",
    "brand": "Safal",
    "category": "snacks",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/103692_4-safal-frozen-green-peas.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 211,
        "mrp": 240,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Safal%20Safal%20Frozen%20-%20Green%20Peas%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 213,
        "mrp": 240,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Safal%20Safal%20Frozen%20-%20Green%20Peas%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 212,
        "mrp": 240,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Safal%20Safal%20Frozen%20-%20Green%20Peas%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 206.4,
        "mrp": 240,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/103692/safal-frozen-green-peas-1-kg-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 211,
        "mrp": 240,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Safal%20Safal%20Frozen%20-%20Green%20Peas%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 208,
        "mrp": 240,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Safal%20Safal%20Frozen%20-%20Green%20Peas%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40185056",
    "name": "Asal Idly & Dosa Batter (2 kg)",
    "nameHindi": "Asal उत्पाद",
    "brand": "Asal",
    "category": "snacks",
    "unit": "2 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40185056_4-asal-idly-dosa-batter-mildly-salted.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 147,
        "mrp": 160,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Asal%20Asal%20Idly%20%26%20Dosa%20Batter%20%202%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 148,
        "mrp": 160,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Asal%20Asal%20Idly%20%26%20Dosa%20Batter%20%202%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 148,
        "mrp": 160,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Asal%20Asal%20Idly%20%26%20Dosa%20Batter%20%202%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 144,
        "mrp": 160,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40185056/asal-idly-dosa-batter-mildly-salted-2-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 147,
        "mrp": 160,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Asal%20Asal%20Idly%20%26%20Dosa%20Batter%20%202%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 145,
        "mrp": 160,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Asal%20Asal%20Idly%20%26%20Dosa%20Batter%20%202%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-100022552",
    "name": "Haldiram's Namkeen - Bhujia Sev (1 kg)",
    "nameHindi": "Haldiram's उत्पाद",
    "brand": "Haldiram's",
    "category": "snacks",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/100022552_6-haldirams-namkeen-bhujia-sev.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 1,
        "mrp": 1,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Haldiram's%20Haldiram's%20Namkeen%20-%20Bhujia%20Sev%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 1,
        "mrp": 1,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Haldiram's%20Haldiram's%20Namkeen%20-%20Bhujia%20Sev%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 1,
        "mrp": 1,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Haldiram's%20Haldiram's%20Namkeen%20-%20Bhujia%20Sev%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 1,
        "mrp": 1,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/100022552/haldirams-namkeen-bhujia-sev-1-kg-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 1,
        "mrp": 1,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Haldiram's%20Haldiram's%20Namkeen%20-%20Bhujia%20Sev%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 1,
        "mrp": 1,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Haldiram's%20Haldiram's%20Namkeen%20-%20Bhujia%20Sev%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40353468",
    "name": "Maggi Double Masala Instant Noodles (95 g)",
    "nameHindi": "Maggi नूडल्स",
    "brand": "Maggi",
    "category": "snacks",
    "unit": "95 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40353468_3-maggi-double-masala-instant-noodles.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 20,
        "mrp": 20,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Maggi%20Maggi%20Double%20Masala%20Instant%20Noodles%20%2095%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 20,
        "mrp": 20,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Maggi%20Maggi%20Double%20Masala%20Instant%20Noodles%20%2095%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 20,
        "mrp": 20,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Maggi%20Maggi%20Double%20Masala%20Instant%20Noodles%20%2095%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 20,
        "mrp": 20,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40353468/maggi-double-masala-instant-noodles-95-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 20,
        "mrp": 20,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Maggi%20Maggi%20Double%20Masala%20Instant%20Noodles%20%2095%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 20,
        "mrp": 20,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Maggi%20Maggi%20Double%20Masala%20Instant%20Noodles%20%2095%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-263597",
    "name": "Britannia Nutri Choice Digestive High Fibre Biscuits (250 g)",
    "nameHindi": "Britannia बिस्कुट",
    "brand": "Britannia",
    "category": "snacks",
    "unit": "250 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/263597_14-britannia-nutrichoice-digestive-high-fibre-biscuits-family-pack.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 46,
        "mrp": 60,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Britannia%20Britannia%20Nutri%20Choice%20Digestive%20High%20Fibre%20Biscuits%20%20250%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 46,
        "mrp": 60,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Britannia%20Britannia%20Nutri%20Choice%20Digestive%20High%20Fibre%20Biscuits%20%20250%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 46,
        "mrp": 60,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Britannia%20Britannia%20Nutri%20Choice%20Digestive%20High%20Fibre%20Biscuits%20%20250%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 45,
        "mrp": 60,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/263597/britannia-nutrichoice-digestive-high-fibre-biscuits-family-pack-250-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 46,
        "mrp": 60,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Britannia%20Britannia%20Nutri%20Choice%20Digestive%20High%20Fibre%20Biscuits%20%20250%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 45,
        "mrp": 60,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Britannia%20Britannia%20Nutri%20Choice%20Digestive%20High%20Fibre%20Biscuits%20%20250%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-1212514",
    "name": "Lay's American Style Cream & Onion Potato Chips (2x80 g)",
    "nameHindi": "Lay's प्याज",
    "brand": "Lay's",
    "category": "snacks",
    "unit": "2x80 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/1212514_12-lays-potato-chips-american-style-cream-onion-flavour.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 61,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Lay's%20Lay's%20American%20Style%20Cream%20%26%20Onion%20Potato%20Chips%20%202x80%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 62,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Lay's%20Lay's%20American%20Style%20Cream%20%26%20Onion%20Potato%20Chips%20%202x80%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 61,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Lay's%20Lay's%20American%20Style%20Cream%20%26%20Onion%20Potato%20Chips%20%202x80%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 60,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/1212514/lays-potato-chips-american-style-cream-onion-flavour-2x115-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 61,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Lay's%20Lay's%20American%20Style%20Cream%20%26%20Onion%20Potato%20Chips%20%202x80%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 61,
        "mrp": 80,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Lay's%20Lay's%20American%20Style%20Cream%20%26%20Onion%20Potato%20Chips%20%202x80%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-294904",
    "name": "iD Fresh Idly & Dosa Batter (2 kg)",
    "nameHindi": "iD Fresh उत्पाद",
    "brand": "iD Fresh",
    "category": "snacks",
    "unit": "2 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/294904_11-id-idly-dosa-batter.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 116,
        "mrp": 145,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=iD%20Fresh%20iD%20Fresh%20Idly%20%26%20Dosa%20Batter%20%202%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 117,
        "mrp": 145,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=iD%20Fresh%20iD%20Fresh%20Idly%20%26%20Dosa%20Batter%20%202%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 117,
        "mrp": 145,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=iD%20Fresh%20iD%20Fresh%20Idly%20%26%20Dosa%20Batter%20%202%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 114,
        "mrp": 145,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/294904/id-idly-dosa-batter-2-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 116,
        "mrp": 145,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=iD%20Fresh%20iD%20Fresh%20Idly%20%26%20Dosa%20Batter%20%202%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 115,
        "mrp": 145,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=iD%20Fresh%20iD%20Fresh%20Idly%20%26%20Dosa%20Batter%20%202%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-20007785",
    "name": "iD Fresh Idly & Dosa Batter (500 g)",
    "nameHindi": "iD Fresh उत्पाद",
    "brand": "iD Fresh",
    "category": "snacks",
    "unit": "500 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/20007785_6-id-fresho-idly-dosa-batter-ready-to-make.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 64,
        "mrp": 64,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=iD%20Fresh%20iD%20Fresh%20Idly%20%26%20Dosa%20Batter%20%20500%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 64,
        "mrp": 64,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=iD%20Fresh%20iD%20Fresh%20Idly%20%26%20Dosa%20Batter%20%20500%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 64,
        "mrp": 64,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=iD%20Fresh%20iD%20Fresh%20Idly%20%26%20Dosa%20Batter%20%20500%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 64,
        "mrp": 64,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/20007785/id-fresho-idly-dosa-batter-ready-to-make-500-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 64,
        "mrp": 64,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=iD%20Fresh%20iD%20Fresh%20Idly%20%26%20Dosa%20Batter%20%20500%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 64,
        "mrp": 64,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=iD%20Fresh%20iD%20Fresh%20Idly%20%26%20Dosa%20Batter%20%20500%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-1212516",
    "name": "Lay's India's Magic Masala Potato Chips (2x82 g)",
    "nameHindi": "Lay's आलू",
    "brand": "Lay's",
    "category": "snacks",
    "unit": "2x82 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/1212516_11-lays-potato-chips-indias-magic-masala.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 73,
        "mrp": 96,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Lay's%20Lay's%20India's%20Magic%20Masala%20Potato%20Chips%20%202x82%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 74,
        "mrp": 96,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Lay's%20Lay's%20India's%20Magic%20Masala%20Potato%20Chips%20%202x82%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 74,
        "mrp": 96,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Lay's%20Lay's%20India's%20Magic%20Masala%20Potato%20Chips%20%202x82%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 72,
        "mrp": 96,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/1212516/lays-potato-chips-indias-magic-masala-2x115-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 73,
        "mrp": 96,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Lay's%20Lay's%20India's%20Magic%20Masala%20Potato%20Chips%20%202x82%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 73,
        "mrp": 96,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Lay's%20Lay's%20India's%20Magic%20Masala%20Potato%20Chips%20%202x82%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40373863",
    "name": "Haldiram's Kaju Katli (100 g)",
    "nameHindi": "Haldiram's उत्पाद",
    "brand": "Haldiram's",
    "category": "snacks",
    "unit": "100 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40373863_2-haldiram-kaju-katli.jpg",
    "trending": true,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 76,
        "mrp": 149,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Haldiram's%20Haldiram's%20Kaju%20Katli%20%20100%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 77,
        "mrp": 149,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Haldiram's%20Haldiram's%20Kaju%20Katli%20%20100%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 76,
        "mrp": 149,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Haldiram's%20Haldiram's%20Kaju%20Katli%20%20100%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 74.5,
        "mrp": 149,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40373863/haldiram-kaju-katli-100-g-box/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 76,
        "mrp": 149,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Haldiram's%20Haldiram's%20Kaju%20Katli%20%20100%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 75,
        "mrp": 149,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Haldiram's%20Haldiram's%20Kaju%20Katli%20%20100%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40132307",
    "name": "bb home Toilet Tissue Paper Roll - 3 Ply (10 pcs)",
    "nameHindi": "bb home खाना पकाने का तेल",
    "brand": "bb home",
    "category": "household",
    "unit": "10 pcs",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40132307_6-bb-home-toilet-roll-3-ply-100-virgin-pulppaper.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 285,
        "mrp": 550,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=bb%20home%20bb%20home%20Toilet%20Tissue%20Paper%20Roll%20-%203%20Ply%20%2010%20pcs"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 287,
        "mrp": 550,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=bb%20home%20bb%20home%20Toilet%20Tissue%20Paper%20Roll%20-%203%20Ply%20%2010%20pcs"
      },
      "instamart": {
        "platform": "instamart",
        "price": 286,
        "mrp": 550,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=bb%20home%20bb%20home%20Toilet%20Tissue%20Paper%20Roll%20-%203%20Ply%20%2010%20pcs"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 279,
        "mrp": 550,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40132307/bb-home-toilet-roll-3-ply-100-virgin-pulppaper-200-pulls/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 285,
        "mrp": 550,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=bb%20home%20bb%20home%20Toilet%20Tissue%20Paper%20Roll%20-%203%20Ply%20%2010%20pcs&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 282,
        "mrp": 550,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=bb%20home%20bb%20home%20Toilet%20Tissue%20Paper%20Roll%20-%203%20Ply%20%2010%20pcs&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40320190",
    "name": "Surf Excel Matic Front Load Liquid Detergent (4 kg)",
    "nameHindi": "Surf Excel डिटर्जेंट",
    "brand": "Surf Excel",
    "category": "household",
    "unit": "4 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40320190_10-surf-excel-matic-front-load-liquid-detergent-refill.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 612,
        "mrp": 799,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Surf%20Excel%20Surf%20Excel%20Matic%20Front%20Load%20Liquid%20Detergent%20%204%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 618,
        "mrp": 799,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Surf%20Excel%20Surf%20Excel%20Matic%20Front%20Load%20Liquid%20Detergent%20%204%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 615,
        "mrp": 799,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Surf%20Excel%20Surf%20Excel%20Matic%20Front%20Load%20Liquid%20Detergent%20%204%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 600,
        "mrp": 799,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40320190/surf-excel-matic-front-load-liquid-detergent-refill-4-l-pouch/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 612,
        "mrp": 799,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Surf%20Excel%20Surf%20Excel%20Matic%20Front%20Load%20Liquid%20Detergent%20%204%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 606,
        "mrp": 799,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Surf%20Excel%20Surf%20Excel%20Matic%20Front%20Load%20Liquid%20Detergent%20%204%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-900459772",
    "name": "Vim Dishwash Liquid - Removes 100+ Odours & Grease In 1 Wash (3 L)",
    "nameHindi": "Vim डिशवॉश लिक्विड",
    "brand": "Vim",
    "category": "household",
    "unit": "3 L",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/900459772_10-vim-dishwash-liquid-gel.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 444,
        "mrp": 545,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Vim%20Vim%20Dishwash%20Liquid%20-%20Removes%20100%2B%20Odours%20%26%20Grease%20In%201%20Wash%20%203%20L"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 448,
        "mrp": 545,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Vim%20Vim%20Dishwash%20Liquid%20-%20Removes%20100%2B%20Odours%20%26%20Grease%20In%201%20Wash%20%203%20L"
      },
      "instamart": {
        "platform": "instamart",
        "price": 446,
        "mrp": 545,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Vim%20Vim%20Dishwash%20Liquid%20-%20Removes%20100%2B%20Odours%20%26%20Grease%20In%201%20Wash%20%203%20L"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 435,
        "mrp": 545,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/900459772/vim-dishwash-liquid-gel-32-l/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 444,
        "mrp": 545,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Vim%20Vim%20Dishwash%20Liquid%20-%20Removes%20100%2B%20Odours%20%26%20Grease%20In%201%20Wash%20%203%20L&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 439,
        "mrp": 545,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Vim%20Vim%20Dishwash%20Liquid%20-%20Removes%20100%2B%20Odours%20%26%20Grease%20In%201%20Wash%20%203%20L&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40359652",
    "name": "Harpic Original Fresh Disinfectant Toilet Cleaner Liquid (5 L)",
    "nameHindi": "Harpic खाना पकाने का तेल",
    "brand": "Harpic",
    "category": "household",
    "unit": "5 L",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40359652_2-harpic-original-fresh-disinfectant-toilet-cleaner-liquid.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 764,
        "mrp": 999,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Harpic%20Harpic%20Original%20Fresh%20Disinfectant%20Toilet%20Cleaner%20Liquid%20%205%20L"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 772,
        "mrp": 999,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Harpic%20Harpic%20Original%20Fresh%20Disinfectant%20Toilet%20Cleaner%20Liquid%20%205%20L"
      },
      "instamart": {
        "platform": "instamart",
        "price": 768,
        "mrp": 999,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Harpic%20Harpic%20Original%20Fresh%20Disinfectant%20Toilet%20Cleaner%20Liquid%20%205%20L"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 749.3,
        "mrp": 999,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40359652/harpic-original-fresh-disinfectant-toilet-cleaner-liquid-5-l/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 764,
        "mrp": 999,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Harpic%20Harpic%20Original%20Fresh%20Disinfectant%20Toilet%20Cleaner%20Liquid%20%205%20L&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 757,
        "mrp": 999,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Harpic%20Harpic%20Original%20Fresh%20Disinfectant%20Toilet%20Cleaner%20Liquid%20%205%20L&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-317229",
    "name": "Vim Lemon Dishwash Tub Bar (480 g)",
    "nameHindi": "Vim नींबू",
    "brand": "Vim",
    "category": "household",
    "unit": "480 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/317229_14-vim-dishwash-bar-lemon.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 55,
        "mrp": 55,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Vim%20Vim%20Lemon%20Dishwash%20Tub%20Bar%20%20480%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 55,
        "mrp": 55,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Vim%20Vim%20Lemon%20Dishwash%20Tub%20Bar%20%20480%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 55,
        "mrp": 55,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Vim%20Vim%20Lemon%20Dishwash%20Tub%20Bar%20%20480%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 55,
        "mrp": 55,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/317229/vim-dishwash-bar-lemon-500-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 55,
        "mrp": 55,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Vim%20Vim%20Lemon%20Dishwash%20Tub%20Bar%20%20480%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 55,
        "mrp": 55,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Vim%20Vim%20Lemon%20Dishwash%20Tub%20Bar%20%20480%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40132301",
    "name": "bb home Toilet Tissue Paper Rolls - 2 Ply (4 pcs)",
    "nameHindi": "bb home खाना पकाने का तेल",
    "brand": "bb home",
    "category": "household",
    "unit": "4 pcs",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40132301_3-bb-home-toilet-roll-2-ply-100-virgin-pulppaper.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 90,
        "mrp": 220,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=bb%20home%20bb%20home%20Toilet%20Tissue%20Paper%20Rolls%20-%202%20Ply%20%204%20pcs"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 91,
        "mrp": 220,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=bb%20home%20bb%20home%20Toilet%20Tissue%20Paper%20Rolls%20-%202%20Ply%20%204%20pcs"
      },
      "instamart": {
        "platform": "instamart",
        "price": 90,
        "mrp": 220,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=bb%20home%20bb%20home%20Toilet%20Tissue%20Paper%20Rolls%20-%202%20Ply%20%204%20pcs"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 88,
        "mrp": 220,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40132301/bb-home-toilet-roll-2-ply-100-virgin-pulppaper-200-pulls/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 90,
        "mrp": 220,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=bb%20home%20bb%20home%20Toilet%20Tissue%20Paper%20Rolls%20-%202%20Ply%20%204%20pcs&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 89,
        "mrp": 220,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=bb%20home%20bb%20home%20Toilet%20Tissue%20Paper%20Rolls%20-%202%20Ply%20%204%20pcs&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40222462",
    "name": "Surf Excel Matic Top Load Liquid Detergent (3 kg)",
    "nameHindi": "Surf Excel डिटर्जेंट",
    "brand": "Surf Excel",
    "category": "household",
    "unit": "3 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40222462_13-surf-excel-matic-liquid-detergent-top-load-refill-pack.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 418,
        "mrp": 469,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Surf%20Excel%20Surf%20Excel%20Matic%20Top%20Load%20Liquid%20Detergent%20%203%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 422,
        "mrp": 469,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Surf%20Excel%20Surf%20Excel%20Matic%20Top%20Load%20Liquid%20Detergent%20%203%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 420,
        "mrp": 469,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Surf%20Excel%20Surf%20Excel%20Matic%20Top%20Load%20Liquid%20Detergent%20%203%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 410,
        "mrp": 469,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40222462/surf-excel-matic-liquid-detergent-top-load-refill-pack-4-l/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 418,
        "mrp": 469,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Surf%20Excel%20Surf%20Excel%20Matic%20Top%20Load%20Liquid%20Detergent%20%203%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 414,
        "mrp": 469,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Surf%20Excel%20Surf%20Excel%20Matic%20Top%20Load%20Liquid%20Detergent%20%203%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40132303",
    "name": "bb home Toilet Tissue Paper Roll - 3 Ply (4 pcs)",
    "nameHindi": "bb home खाना पकाने का तेल",
    "brand": "bb home",
    "category": "household",
    "unit": "4 pcs",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40132303_5-bb-home-toilet-roll-3-ply-100-virgin-pulppaper.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 223,
        "mrp": 260,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=bb%20home%20bb%20home%20Toilet%20Tissue%20Paper%20Roll%20-%203%20Ply%20%204%20pcs"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 226,
        "mrp": 260,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=bb%20home%20bb%20home%20Toilet%20Tissue%20Paper%20Roll%20-%203%20Ply%20%204%20pcs"
      },
      "instamart": {
        "platform": "instamart",
        "price": 224,
        "mrp": 260,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=bb%20home%20bb%20home%20Toilet%20Tissue%20Paper%20Roll%20-%203%20Ply%20%204%20pcs"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 219,
        "mrp": 260,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40132303/bb-home-toilet-roll-3-ply-100-virgin-pulppaper-200-pulls/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 223,
        "mrp": 260,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=bb%20home%20bb%20home%20Toilet%20Tissue%20Paper%20Roll%20-%203%20Ply%20%204%20pcs&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 221,
        "mrp": 260,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=bb%20home%20bb%20home%20Toilet%20Tissue%20Paper%20Roll%20-%203%20Ply%20%204%20pcs&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40326742",
    "name": "Ariel Power Gel Front Load Liquid Detergent (6 kg)",
    "nameHindi": "Ariel डिटर्जेंट",
    "brand": "Ariel",
    "category": "household",
    "unit": "6 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40326742_13-ariel-matic-front-load-liquid-detergent.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 863,
        "mrp": 1159,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Ariel%20Ariel%20Power%20Gel%20Front%20Load%20Liquid%20Detergent%20%206%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 871,
        "mrp": 1159,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Ariel%20Ariel%20Power%20Gel%20Front%20Load%20Liquid%20Detergent%20%206%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 867,
        "mrp": 1159,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Ariel%20Ariel%20Power%20Gel%20Front%20Load%20Liquid%20Detergent%20%206%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 846.1,
        "mrp": 1159,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40326742/ariel-matic-front-load-liquid-detergent-4-l/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 863,
        "mrp": 1159,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Ariel%20Ariel%20Power%20Gel%20Front%20Load%20Liquid%20Detergent%20%206%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 855,
        "mrp": 1159,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Ariel%20Ariel%20Power%20Gel%20Front%20Load%20Liquid%20Detergent%20%206%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40338208",
    "name": "Dettol Antiseptic Liquid (1.3 L)",
    "nameHindi": "Dettol लिक्विड",
    "brand": "Dettol",
    "category": "household",
    "unit": "1.3 L",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40338208_2-dettol-antiseptic-liquid.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 537,
        "mrp": 537,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Dettol%20Dettol%20Antiseptic%20Liquid%20%201.3%20L"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 537,
        "mrp": 537,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Dettol%20Dettol%20Antiseptic%20Liquid%20%201.3%20L"
      },
      "instamart": {
        "platform": "instamart",
        "price": 537,
        "mrp": 537,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Dettol%20Dettol%20Antiseptic%20Liquid%20%201.3%20L"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 537.5,
        "mrp": 537,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40338208/dettol-antiseptic-liquid-13-l/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 537,
        "mrp": 537,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Dettol%20Dettol%20Antiseptic%20Liquid%20%201.3%20L&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 537,
        "mrp": 537,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Dettol%20Dettol%20Antiseptic%20Liquid%20%201.3%20L&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40141965",
    "name": "Anandam Deepam Oil (850 g)",
    "nameHindi": "Anandam खाना पकाने का तेल",
    "brand": "Anandam",
    "category": "household",
    "unit": "850 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40141965_9-anandam-pooja-oil.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 179,
        "mrp": 200,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Anandam%20Anandam%20Deepam%20Oil%20%20850%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 181,
        "mrp": 200,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Anandam%20Anandam%20Deepam%20Oil%20%20850%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 180,
        "mrp": 200,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Anandam%20Anandam%20Deepam%20Oil%20%20850%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 175.4,
        "mrp": 200,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40141965/anandam-pooja-oil-900-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 179,
        "mrp": 200,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Anandam%20Anandam%20Deepam%20Oil%20%20850%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 177,
        "mrp": 200,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Anandam%20Anandam%20Deepam%20Oil%20%20850%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-215595",
    "name": "Surf Excel Easy Wash Detergent Powder (5 kg)",
    "nameHindi": "Surf Excel डिटर्जेंट",
    "brand": "Surf Excel",
    "category": "household",
    "unit": "5 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/215595_27-surf-excel-easy-wash-detergent-powder.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 719,
        "mrp": 780,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Surf%20Excel%20Surf%20Excel%20Easy%20Wash%20Detergent%20Powder%20%205%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 726,
        "mrp": 780,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Surf%20Excel%20Surf%20Excel%20Easy%20Wash%20Detergent%20Powder%20%205%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 723,
        "mrp": 780,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Surf%20Excel%20Surf%20Excel%20Easy%20Wash%20Detergent%20Powder%20%205%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 705,
        "mrp": 780,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/215595/surf-excel-easy-wash-detergent-powder-5-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 719,
        "mrp": 780,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Surf%20Excel%20Surf%20Excel%20Easy%20Wash%20Detergent%20Powder%20%205%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 712,
        "mrp": 780,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Surf%20Excel%20Surf%20Excel%20Easy%20Wash%20Detergent%20Powder%20%205%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40206009",
    "name": "bb home Lemon With Aloe Vera Liquid Dishwash (2 L)",
    "nameHindi": "bb home नींबू",
    "brand": "bb home",
    "category": "household",
    "unit": "2 L",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40206009_10-bb-home-dishwash-liquid-lemon-with-aloe-vera.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 254,
        "mrp": 445,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=bb%20home%20bb%20home%20Lemon%20With%20Aloe%20Vera%20Liquid%20Dishwash%20%202%20L"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 256,
        "mrp": 445,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=bb%20home%20bb%20home%20Lemon%20With%20Aloe%20Vera%20Liquid%20Dishwash%20%202%20L"
      },
      "instamart": {
        "platform": "instamart",
        "price": 255,
        "mrp": 445,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=bb%20home%20bb%20home%20Lemon%20With%20Aloe%20Vera%20Liquid%20Dishwash%20%202%20L"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 249,
        "mrp": 445,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40206009/bb-home-dishwash-liquid-lemon-with-aloe-vera-2-l/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 254,
        "mrp": 445,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=bb%20home%20bb%20home%20Lemon%20With%20Aloe%20Vera%20Liquid%20Dishwash%20%202%20L&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 251,
        "mrp": 445,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=bb%20home%20bb%20home%20Lemon%20With%20Aloe%20Vera%20Liquid%20Dishwash%20%202%20L&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40007017",
    "name": "HIT Cockroach Killer Spray (400 ml)",
    "nameHindi": "HIT उत्पाद",
    "brand": "HIT",
    "category": "household",
    "unit": "400 ml",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40007017_5-hit-cockroach-killer-spray.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 189,
        "mrp": 189,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=HIT%20HIT%20Cockroach%20Killer%20Spray%20%20400%20ml"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 189,
        "mrp": 189,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=HIT%20HIT%20Cockroach%20Killer%20Spray%20%20400%20ml"
      },
      "instamart": {
        "platform": "instamart",
        "price": 189,
        "mrp": 189,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=HIT%20HIT%20Cockroach%20Killer%20Spray%20%20400%20ml"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 186,
        "mrp": 189,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40007017/hit-cockroach-killer-spray-400-ml/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 189,
        "mrp": 189,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=HIT%20HIT%20Cockroach%20Killer%20Spray%20%20400%20ml&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 188,
        "mrp": 189,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=HIT%20HIT%20Cockroach%20Killer%20Spray%20%20400%20ml&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40081006",
    "name": "Harpic Disinfectant Bathroom Cleaner Liquid - Lemon (1 L)",
    "nameHindi": "Harpic नींबू",
    "brand": "Harpic",
    "category": "household",
    "unit": "1 L",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40081006_13-harpic-disinfectant-bathroom-cleaner-liquid-lemon.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 191,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Harpic%20Harpic%20Disinfectant%20Bathroom%20Cleaner%20Liquid%20-%20Lemon%20%201%20L"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 193,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Harpic%20Harpic%20Disinfectant%20Bathroom%20Cleaner%20Liquid%20-%20Lemon%20%201%20L"
      },
      "instamart": {
        "platform": "instamart",
        "price": 192,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Harpic%20Harpic%20Disinfectant%20Bathroom%20Cleaner%20Liquid%20-%20Lemon%20%201%20L"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 187.1,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40081006/harpic-disinfectant-bathroom-cleaner-liquid-lemon-1-l/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 191,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Harpic%20Harpic%20Disinfectant%20Bathroom%20Cleaner%20Liquid%20-%20Lemon%20%201%20L&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 189,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Harpic%20Harpic%20Disinfectant%20Bathroom%20Cleaner%20Liquid%20-%20Lemon%20%201%20L&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40361885",
    "name": "bb home Green Garbage Bags - Medium, 48 x 53 cm (30 pcs)",
    "nameHindi": "bb home उत्पाद",
    "brand": "bb home",
    "category": "household",
    "unit": "30 pcs",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40361885_4-bb-home-green-garbage-bags-medium-48-x-53-cm.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 70,
        "mrp": 89,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=bb%20home%20bb%20home%20Green%20Garbage%20Bags%20-%20Medium%2C%2048%20x%2053%20cm%20%2030%20pcs"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 71,
        "mrp": 89,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=bb%20home%20bb%20home%20Green%20Garbage%20Bags%20-%20Medium%2C%2048%20x%2053%20cm%20%2030%20pcs"
      },
      "instamart": {
        "platform": "instamart",
        "price": 71,
        "mrp": 89,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=bb%20home%20bb%20home%20Green%20Garbage%20Bags%20-%20Medium%2C%2048%20x%2053%20cm%20%2030%20pcs"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 69,
        "mrp": 89,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40361885/bb-home-green-garbage-bags-medium-48-x-53-cm-30-pcs/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 70,
        "mrp": 89,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=bb%20home%20bb%20home%20Green%20Garbage%20Bags%20-%20Medium%2C%2048%20x%2053%20cm%20%2030%20pcs&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 70,
        "mrp": 89,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=bb%20home%20bb%20home%20Green%20Garbage%20Bags%20-%20Medium%2C%2048%20x%2053%20cm%20%2030%20pcs&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40326186",
    "name": "The Whole Truth Cold Coffee 24g Whey Protein Powder (1 kg)",
    "nameHindi": "The Whole Truth कॉफ़ी",
    "brand": "The Whole Truth",
    "category": "personal",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40326186_7-the-whole-truth-cold-coffee-pro-whey-protein-powder.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 4499,
        "mrp": 4499,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=The%20Whole%20Truth%20The%20Whole%20Truth%20Cold%20Coffee%2024g%20Whey%20Protein%20Powder%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 4499,
        "mrp": 4499,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=The%20Whole%20Truth%20The%20Whole%20Truth%20Cold%20Coffee%2024g%20Whey%20Protein%20Powder%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 4499,
        "mrp": 4499,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=The%20Whole%20Truth%20The%20Whole%20Truth%20Cold%20Coffee%2024g%20Whey%20Protein%20Powder%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 4499,
        "mrp": 4499,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40326186/the-whole-truth-cold-coffee-pro-whey-protein-powder-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 4499,
        "mrp": 4499,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=The%20Whole%20Truth%20The%20Whole%20Truth%20Cold%20Coffee%2024g%20Whey%20Protein%20Powder%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 4499,
        "mrp": 4499,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=The%20Whole%20Truth%20The%20Whole%20Truth%20Cold%20Coffee%2024g%20Whey%20Protein%20Powder%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40338208",
    "name": "Dettol Antiseptic Liquid (1.3 L)",
    "nameHindi": "Dettol लिक्विड",
    "brand": "Dettol",
    "category": "personal",
    "unit": "1.3 L",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40338208_2-dettol-antiseptic-liquid.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 537,
        "mrp": 537,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Dettol%20Dettol%20Antiseptic%20Liquid%20%201.3%20L"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 537,
        "mrp": 537,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Dettol%20Dettol%20Antiseptic%20Liquid%20%201.3%20L"
      },
      "instamart": {
        "platform": "instamart",
        "price": 537,
        "mrp": 537,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Dettol%20Dettol%20Antiseptic%20Liquid%20%201.3%20L"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 537.5,
        "mrp": 537,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40338208/dettol-antiseptic-liquid-13-l/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 537,
        "mrp": 537,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Dettol%20Dettol%20Antiseptic%20Liquid%20%201.3%20L&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 537,
        "mrp": 537,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Dettol%20Dettol%20Antiseptic%20Liquid%20%201.3%20L&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40195476",
    "name": "Whisper Ultra Upto No Gap,No Leaks Pads For Heavy Flow - xL+ (50 pcs)",
    "nameHindi": "Whisper उत्पाद",
    "brand": "Whisper",
    "category": "personal",
    "unit": "50 pcs",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40195476_13-whisper-ultra-clean-sanitary-pads-xl-plus-locks-wetness-odour.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 414,
        "mrp": 749,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Whisper%20Whisper%20Ultra%20Upto%20No%20Gap%2CNo%20Leaks%20Pads%20For%20Heavy%20Flow%20-%20xL%2B%20%2050%20pcs"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 418,
        "mrp": 749,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Whisper%20Whisper%20Ultra%20Upto%20No%20Gap%2CNo%20Leaks%20Pads%20For%20Heavy%20Flow%20-%20xL%2B%20%2050%20pcs"
      },
      "instamart": {
        "platform": "instamart",
        "price": 416,
        "mrp": 749,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Whisper%20Whisper%20Ultra%20Upto%20No%20Gap%2CNo%20Leaks%20Pads%20For%20Heavy%20Flow%20-%20xL%2B%20%2050%20pcs"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 406,
        "mrp": 749,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40195476/whisper-ultra-clean-sanitary-pads-xl-plus-locks-wetness-odour-50-pcs/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 414,
        "mrp": 749,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Whisper%20Whisper%20Ultra%20Upto%20No%20Gap%2CNo%20Leaks%20Pads%20For%20Heavy%20Flow%20-%20xL%2B%20%2050%20pcs&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 410,
        "mrp": 749,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Whisper%20Whisper%20Ultra%20Upto%20No%20Gap%2CNo%20Leaks%20Pads%20For%20Heavy%20Flow%20-%20xL%2B%20%2050%20pcs&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-100968",
    "name": "Mysore Sandal Bathing Soap (450 g)",
    "nameHindi": "Mysore Sandal नहाने का साबुन",
    "brand": "Mysore Sandal",
    "category": "personal",
    "unit": "450 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/100968_5-mysore-sandal-bathing-soap-superior-with-pure-sandalwood-oil.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 220,
        "mrp": 220,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Mysore%20Sandal%20Mysore%20Sandal%20Bathing%20Soap%20%20450%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 220,
        "mrp": 220,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Mysore%20Sandal%20Mysore%20Sandal%20Bathing%20Soap%20%20450%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 220,
        "mrp": 220,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Mysore%20Sandal%20Mysore%20Sandal%20Bathing%20Soap%20%20450%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 220,
        "mrp": 220,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/100968/mysore-sandal-bathing-soap-superior-with-pure-sandalwood-oil-150-g-carton/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 220,
        "mrp": 220,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Mysore%20Sandal%20Mysore%20Sandal%20Bathing%20Soap%20%20450%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 220,
        "mrp": 220,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Mysore%20Sandal%20Mysore%20Sandal%20Bathing%20Soap%20%20450%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40326185",
    "name": "The Whole Truth Light Cocoa Pro Whey Protein Powder (1 kg)",
    "nameHindi": "The Whole Truth उत्पाद",
    "brand": "The Whole Truth",
    "category": "personal",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40326185_7-the-whole-truth-light-cocoa-pro-whey-protein-powder.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 5007,
        "mrp": 5399,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=The%20Whole%20Truth%20The%20Whole%20Truth%20Light%20Cocoa%20Pro%20Whey%20Protein%20Powder%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 5056,
        "mrp": 5399,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=The%20Whole%20Truth%20The%20Whole%20Truth%20Light%20Cocoa%20Pro%20Whey%20Protein%20Powder%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 5032,
        "mrp": 5399,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=The%20Whole%20Truth%20The%20Whole%20Truth%20Light%20Cocoa%20Pro%20Whey%20Protein%20Powder%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 4909,
        "mrp": 5399,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40326185/the-whole-truth-light-cocoa-pro-whey-protein-powder-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 5007,
        "mrp": 5399,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=The%20Whole%20Truth%20The%20Whole%20Truth%20Light%20Cocoa%20Pro%20Whey%20Protein%20Powder%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 4958,
        "mrp": 5399,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=The%20Whole%20Truth%20The%20Whole%20Truth%20Light%20Cocoa%20Pro%20Whey%20Protein%20Powder%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40228625",
    "name": "indiSecrets Pure Tulsi Chamomile Tea (36 g)",
    "nameHindi": "indiSecrets चाय पत्ती",
    "brand": "indiSecrets",
    "category": "personal",
    "unit": "36 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40228625_3-indisecrets-organic-tulsi-honey-chamomile.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 143,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=indiSecrets%20indiSecrets%20Pure%20Tulsi%20Chamomile%20Tea%20%2036%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 144,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=indiSecrets%20indiSecrets%20Pure%20Tulsi%20Chamomile%20Tea%20%2036%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 144,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=indiSecrets%20indiSecrets%20Pure%20Tulsi%20Chamomile%20Tea%20%2036%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 140,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40228625/indisecrets-organic-tulsi-honey-chamomile-36g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 143,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=indiSecrets%20indiSecrets%20Pure%20Tulsi%20Chamomile%20Tea%20%2036%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 141,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=indiSecrets%20indiSecrets%20Pure%20Tulsi%20Chamomile%20Tea%20%2036%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40333557",
    "name": "The Whole Truth Unflavoured Raw Whey Protein Concentrate Powder For Adults (1 kg)",
    "nameHindi": "The Whole Truth उत्पाद",
    "brand": "The Whole Truth",
    "category": "personal",
    "unit": "1 kg",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40333557_6-the-whole-truth-unflavoured-raw-whey-protein-concentrate.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 3569,
        "mrp": 4499,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=The%20Whole%20Truth%20The%20Whole%20Truth%20Unflavoured%20Raw%20Whey%20Protein%20Concentrate%20Powder%20For%20Adults%20%201%20kg"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 3604,
        "mrp": 4499,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=The%20Whole%20Truth%20The%20Whole%20Truth%20Unflavoured%20Raw%20Whey%20Protein%20Concentrate%20Powder%20For%20Adults%20%201%20kg"
      },
      "instamart": {
        "platform": "instamart",
        "price": 3586,
        "mrp": 4499,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=The%20Whole%20Truth%20The%20Whole%20Truth%20Unflavoured%20Raw%20Whey%20Protein%20Concentrate%20Powder%20For%20Adults%20%201%20kg"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 3499,
        "mrp": 4499,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40333557/the-whole-truth-unflavoured-raw-whey-protein-concentrate-1-kg/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 3569,
        "mrp": 4499,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=The%20Whole%20Truth%20The%20Whole%20Truth%20Unflavoured%20Raw%20Whey%20Protein%20Concentrate%20Powder%20For%20Adults%20%201%20kg&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 3534,
        "mrp": 4499,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=The%20Whole%20Truth%20The%20Whole%20Truth%20Unflavoured%20Raw%20Whey%20Protein%20Concentrate%20Powder%20For%20Adults%20%201%20kg&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40186855",
    "name": "Colgate Strong Teeth Anticavity Toothpaste - With Amino Shakti Formula (500 g)",
    "nameHindi": "Colgate उत्पाद",
    "brand": "Colgate",
    "category": "personal",
    "unit": "500 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40186855_19-colgate-strong-teeth-anticavity-toothpaste-with-amino-shakti-formula-provides-fresher-breath.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 246,
        "mrp": 294,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Colgate%20Colgate%20Strong%20Teeth%20Anticavity%20Toothpaste%20-%20With%20Amino%20Shakti%20Formula%20%20500%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 248,
        "mrp": 294,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Colgate%20Colgate%20Strong%20Teeth%20Anticavity%20Toothpaste%20-%20With%20Amino%20Shakti%20Formula%20%20500%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 247,
        "mrp": 294,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Colgate%20Colgate%20Strong%20Teeth%20Anticavity%20Toothpaste%20-%20With%20Amino%20Shakti%20Formula%20%20500%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 241.1,
        "mrp": 294,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40186855/colgate-strong-teeth-anticavity-toothpaste-with-amino-shakti-formula-provides-fresher-breath-500-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 246,
        "mrp": 294,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Colgate%20Colgate%20Strong%20Teeth%20Anticavity%20Toothpaste%20-%20With%20Amino%20Shakti%20Formula%20%20500%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 244,
        "mrp": 294,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Colgate%20Colgate%20Strong%20Teeth%20Anticavity%20Toothpaste%20-%20With%20Amino%20Shakti%20Formula%20%20500%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40160740",
    "name": "Dettol Skincare Liquid Handwash (1350 ml)",
    "nameHindi": "Dettol लिक्विड",
    "brand": "Dettol",
    "category": "personal",
    "unit": "1350 ml",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40160740_24-dettol-liquid-handwash-skincare-everyday-protection-ph-balanced-moisturising.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 206,
        "mrp": 219,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Dettol%20Dettol%20Skincare%20Liquid%20Handwash%20%201350%20ml"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 208,
        "mrp": 219,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Dettol%20Dettol%20Skincare%20Liquid%20Handwash%20%201350%20ml"
      },
      "instamart": {
        "platform": "instamart",
        "price": 207,
        "mrp": 219,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Dettol%20Dettol%20Skincare%20Liquid%20Handwash%20%201350%20ml"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 201.5,
        "mrp": 219,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40160740/dettol-liquid-handwash-skincare-everyday-protection-ph-balanced-moisturising-15-l-refill/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 206,
        "mrp": 219,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Dettol%20Dettol%20Skincare%20Liquid%20Handwash%20%201350%20ml&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 204,
        "mrp": 219,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Dettol%20Dettol%20Skincare%20Liquid%20Handwash%20%201350%20ml&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40132874",
    "name": "Parachute  Pure Coconut Oil (330 ml)",
    "nameHindi": "Parachute  खाना पकाने का तेल",
    "brand": "Parachute ",
    "category": "personal",
    "unit": "330 ml",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40132874_6-parachute-pure-coconut-oil.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 177,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Parachute%20%20Parachute%20%20Pure%20Coconut%20Oil%20%20330%20ml"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 179,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Parachute%20%20Parachute%20%20Pure%20Coconut%20Oil%20%20330%20ml"
      },
      "instamart": {
        "platform": "instamart",
        "price": 178,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Parachute%20%20Parachute%20%20Pure%20Coconut%20Oil%20%20330%20ml"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 174,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40132874/parachute-pure-coconut-oil-300-ml-bottle/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 177,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Parachute%20%20Parachute%20%20Pure%20Coconut%20Oil%20%20330%20ml&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 176,
        "mrp": 199,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Parachute%20%20Parachute%20%20Pure%20Coconut%20Oil%20%20330%20ml&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40206046",
    "name": "Dove Care & Protect Beauty Bathing Bar (400 g)",
    "nameHindi": "Dove उत्पाद",
    "brand": "Dove",
    "category": "personal",
    "unit": "400 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40206046_4-dove-care-protect-moisturising-cream-beauty-bathing-bar.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 220,
        "mrp": 288,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Dove%20Dove%20Care%20%26%20Protect%20Beauty%20Bathing%20Bar%20%20400%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 222,
        "mrp": 288,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Dove%20Dove%20Care%20%26%20Protect%20Beauty%20Bathing%20Bar%20%20400%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 221,
        "mrp": 288,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Dove%20Dove%20Care%20%26%20Protect%20Beauty%20Bathing%20Bar%20%20400%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 216,
        "mrp": 288,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40206046/dove-care-protect-moisturising-cream-beauty-bathing-bar-100-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 220,
        "mrp": 288,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Dove%20Dove%20Care%20%26%20Protect%20Beauty%20Bathing%20Bar%20%20400%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 218,
        "mrp": 288,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Dove%20Dove%20Care%20%26%20Protect%20Beauty%20Bathing%20Bar%20%20400%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40016660",
    "name": "Pears Original Glycerin Soap Bar - Pure & Gentle Glow (125 g)",
    "nameHindi": "Pears नहाने का साबुन",
    "brand": "Pears",
    "category": "personal",
    "unit": "125 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40016660_17-pears-pure-gentle-bathing-bar.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 296,
        "mrp": 363,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Pears%20Pears%20Original%20Glycerin%20Soap%20Bar%20-%20Pure%20%26%20Gentle%20Glow%20%20125%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 299,
        "mrp": 363,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Pears%20Pears%20Original%20Glycerin%20Soap%20Bar%20-%20Pure%20%26%20Gentle%20Glow%20%20125%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 298,
        "mrp": 363,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Pears%20Pears%20Original%20Glycerin%20Soap%20Bar%20-%20Pure%20%26%20Gentle%20Glow%20%20125%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 290.4,
        "mrp": 363,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40016660/pears-pure-gentle-bathing-bar-125-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 296,
        "mrp": 363,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Pears%20Pears%20Original%20Glycerin%20Soap%20Bar%20-%20Pure%20%26%20Gentle%20Glow%20%20125%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 293,
        "mrp": 363,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Pears%20Pears%20Original%20Glycerin%20Soap%20Bar%20-%20Pure%20%26%20Gentle%20Glow%20%20125%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40220103",
    "name": "STAYFREE Secure Nights Sanitary Pad - With Cottony Soft Comfort & Back Leak Guard (40 pcs)",
    "nameHindi": "STAYFREE उत्पाद",
    "brand": "STAYFREE",
    "category": "personal",
    "unit": "40 pcs",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40220103_4-stayfree-secure-nights-sanitary-pad-with-cottony-soft-comfort-back-leak-guard.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 257,
        "mrp": 350,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=STAYFREE%20STAYFREE%20Secure%20Nights%20Sanitary%20Pad%20-%20With%20Cottony%20Soft%20Comfort%20%26%20Back%20Leak%20Guard%20%2040%20pcs"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 260,
        "mrp": 350,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=STAYFREE%20STAYFREE%20Secure%20Nights%20Sanitary%20Pad%20-%20With%20Cottony%20Soft%20Comfort%20%26%20Back%20Leak%20Guard%20%2040%20pcs"
      },
      "instamart": {
        "platform": "instamart",
        "price": 258,
        "mrp": 350,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=STAYFREE%20STAYFREE%20Secure%20Nights%20Sanitary%20Pad%20-%20With%20Cottony%20Soft%20Comfort%20%26%20Back%20Leak%20Guard%20%2040%20pcs"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 252,
        "mrp": 350,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40220103/stayfree-secure-nights-sanitary-pad-with-cottony-soft-comfort-back-leak-guard-40-pcs/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 257,
        "mrp": 350,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=STAYFREE%20STAYFREE%20Secure%20Nights%20Sanitary%20Pad%20-%20With%20Cottony%20Soft%20Comfort%20%26%20Back%20Leak%20Guard%20%2040%20pcs&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 255,
        "mrp": 350,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=STAYFREE%20STAYFREE%20Secure%20Nights%20Sanitary%20Pad%20-%20With%20Cottony%20Soft%20Comfort%20%26%20Back%20Leak%20Guard%20%2040%20pcs&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40186837",
    "name": "Whisper Thick Bindazzz Nights Sanitary Pads - xxxL, For Super Heavy Flow (20 pcs)",
    "nameHindi": "Whisper उत्पाद",
    "brand": "Whisper",
    "category": "personal",
    "unit": "20 pcs",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40186837_6-whisper-bindazzz-nights-sanitary-pads-double-huge-wings-wider-back-xxxl.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 419,
        "mrp": 800,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Whisper%20Whisper%20Thick%20Bindazzz%20Nights%20Sanitary%20Pads%20-%20xxxL%2C%20For%20Super%20Heavy%20Flow%20%2020%20pcs"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 423,
        "mrp": 800,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Whisper%20Whisper%20Thick%20Bindazzz%20Nights%20Sanitary%20Pads%20-%20xxxL%2C%20For%20Super%20Heavy%20Flow%20%2020%20pcs"
      },
      "instamart": {
        "platform": "instamart",
        "price": 421,
        "mrp": 800,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Whisper%20Whisper%20Thick%20Bindazzz%20Nights%20Sanitary%20Pads%20-%20xxxL%2C%20For%20Super%20Heavy%20Flow%20%2020%20pcs"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 411,
        "mrp": 800,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40186837/whisper-bindazzz-nights-sanitary-pads-double-huge-wings-wider-back-xxxl-20-pcs/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 419,
        "mrp": 800,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Whisper%20Whisper%20Thick%20Bindazzz%20Nights%20Sanitary%20Pads%20-%20xxxL%2C%20For%20Super%20Heavy%20Flow%20%2020%20pcs&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 415,
        "mrp": 800,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Whisper%20Whisper%20Thick%20Bindazzz%20Nights%20Sanitary%20Pads%20-%20xxxL%2C%20For%20Super%20Heavy%20Flow%20%2020%20pcs&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40228313",
    "name": "Sensodyne Repair & Protect Sensitive Toothpaste (70 g)",
    "nameHindi": "Sensodyne उत्पाद",
    "brand": "Sensodyne",
    "category": "personal",
    "unit": "70 g",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40228313_3-sensodyne-repair-protection-toothpaste-for-strong-teeth-improves-oral-health.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 316,
        "mrp": 382,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Sensodyne%20Sensodyne%20Repair%20%26%20Protect%20Sensitive%20Toothpaste%20%2070%20g"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 319,
        "mrp": 382,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Sensodyne%20Sensodyne%20Repair%20%26%20Protect%20Sensitive%20Toothpaste%20%2070%20g"
      },
      "instamart": {
        "platform": "instamart",
        "price": 317,
        "mrp": 382,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Sensodyne%20Sensodyne%20Repair%20%26%20Protect%20Sensitive%20Toothpaste%20%2070%20g"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 309.6,
        "mrp": 382,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40228313/sensodyne-repair-protection-toothpaste-for-strong-teeth-improves-oral-health-70-g/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 316,
        "mrp": 382,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Sensodyne%20Sensodyne%20Repair%20%26%20Protect%20Sensitive%20Toothpaste%20%2070%20g&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 313,
        "mrp": 382,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Sensodyne%20Sensodyne%20Repair%20%26%20Protect%20Sensitive%20Toothpaste%20%2070%20g&marketplace=GROCERY"
      }
    }
  },
  {
    "id": "bb-40178947",
    "name": "Nivea Body Milk Nourishing Lotion (600 ml)",
    "nameHindi": "Nivea ताजा दूध",
    "brand": "Nivea",
    "category": "personal",
    "unit": "600 ml",
    "imageUrl": "https://www.bbassets.com/media/uploads/p/l/40178947_15-nivea-body-lotion-for-very-dry-skin-with-2x-almond-oil-for-men-women.jpg",
    "trending": false,
    "isDailyEssential": false,
    "offers": {
      "zepto": {
        "platform": "zepto",
        "price": 587,
        "mrp": 799,
        "inStock": true,
        "deliveryTimeMin": 8,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.zeptonow.com/search?q=Nivea%20Nivea%20Body%20Milk%20Nourishing%20Lotion%20%20600%20ml"
      },
      "blinkit": {
        "platform": "blinkit",
        "price": 593,
        "mrp": 799,
        "inStock": true,
        "deliveryTimeMin": 11,
        "surgeFee": 0,
        "handlingFee": 5,
        "affiliateUrl": "https://blinkit.com/s/?q=Nivea%20Nivea%20Body%20Milk%20Nourishing%20Lotion%20%20600%20ml"
      },
      "instamart": {
        "platform": "instamart",
        "price": 590,
        "mrp": 799,
        "inStock": true,
        "deliveryTimeMin": 14,
        "surgeFee": 0,
        "handlingFee": 6,
        "affiliateUrl": "https://www.swiggy.com/instamart/search?query=Nivea%20Nivea%20Body%20Milk%20Nourishing%20Lotion%20%20600%20ml"
      },
      "bigbasket": {
        "platform": "bigbasket",
        "price": 575.3,
        "mrp": 799,
        "inStock": true,
        "deliveryTimeMin": 18,
        "surgeFee": 0,
        "handlingFee": 3,
        "affiliateUrl": "https://www.bigbasket.com/pd/40178947/nivea-body-lotion-for-very-dry-skin-with-2x-almond-oil-for-men-women-600-ml/"
      },
      "amazon": {
        "platform": "amazon",
        "price": 587,
        "mrp": 799,
        "inStock": true,
        "deliveryTimeMin": 25,
        "surgeFee": 0,
        "handlingFee": 0,
        "affiliateUrl": "https://www.amazon.in/s?k=Nivea%20Nivea%20Body%20Milk%20Nourishing%20Lotion%20%20600%20ml&i=nowstore"
      },
      "flipkart": {
        "platform": "flipkart",
        "price": 581,
        "mrp": 799,
        "inStock": true,
        "deliveryTimeMin": 10,
        "surgeFee": 0,
        "handlingFee": 4,
        "affiliateUrl": "https://www.flipkart.com/search?q=Nivea%20Nivea%20Body%20Milk%20Nourishing%20Lotion%20%20600%20ml&marketplace=GROCERY"
      }
    }
  }
];
