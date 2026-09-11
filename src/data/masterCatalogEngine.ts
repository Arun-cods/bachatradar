import { Product, PlatformId } from '../types';
import { COMPREHENSIVE_GROCERY_DATA, generateStoreOffers } from './comprehensiveCatalog';

export interface CategoryMeta {
  id: string;
  label: string;
  icon: string;
  totalSkus: number;
}

export const CATEGORY_TOTALS: Record<string, number> = {
  all: 24580,
  dairy: 2410,
  veggies: 3890,
  staples: 4150,
  snacks: 4820,
  beverages: 2940,
  instant: 2110,
  household: 2620,
  personal: 1640,
};

// Seed blueprints for each Indian grocery category
interface Blueprint {
  item: string;
  hindi: string;
  category: string;
  basePrice: number;
  mrpRatio: number;
  brands: string[];
  variants: { unit: string; mult: number }[];
  images: string[];
  isEssential?: boolean;
}

const BLUEPRINTS: Record<string, Blueprint[]> = {
  dairy: [
    {
      item: 'Fresh Full Cream Milk',
      hindi: 'फुल क्रीम ताजा दूध',
      category: 'dairy',
      basePrice: 34,
      mrpRatio: 1.05,
      brands: ['Amul Gold', 'Mother Dairy Full Cream', 'Nandini Special', 'Country Delight Desi', 'Akshayakalpa Organic'],
      variants: [{ unit: '500 ml Pouch', mult: 1 }, { unit: '1 Litre Pouch', mult: 1.95 }, { unit: '1 Litre Tetra Pack', mult: 2.2 }, { unit: '2 Litre Family Can', mult: 3.8 }],
      images: ['https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Toned Fresh Milk',
      hindi: 'ताजा टोन्ड दूध',
      category: 'dairy',
      basePrice: 27,
      mrpRatio: 1.04,
      brands: ['Amul Taaza', 'Mother Dairy Toned', 'Nandini Blue Toned', 'Nestle A+ Milk'],
      variants: [{ unit: '500 ml Pouch', mult: 1 }, { unit: '1 Litre Pouch', mult: 1.96 }, { unit: '1 Litre Tetra Pack', mult: 2.15 }, { unit: '200 ml Tetra (Pack of 6)', mult: 2.6 }],
      images: ['https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Fresh Malai Paneer',
      hindi: 'ताजा मलाई पनीर',
      category: 'dairy',
      basePrice: 85,
      mrpRatio: 1.15,
      brands: ['Amul', 'Mother Dairy', 'Milky Mist', 'Gowardhan', 'Nature Soy'],
      variants: [{ unit: '200 g Block', mult: 1 }, { unit: '500 g Value Pack', mult: 2.35 }, { unit: '1 kg Commercial Pack', mult: 4.5 }, { unit: '200 g Diced Cubes', mult: 1.1 }],
      images: ['https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Fresh Dahi / Curd',
      hindi: 'ताजा दही',
      category: 'dairy',
      basePrice: 32,
      mrpRatio: 1.08,
      brands: ['Amul Masti', 'Mother Dairy Classic', 'Milky Mist', 'Epigamia Greek', 'Gowardhan'],
      variants: [{ unit: '200 g Cup', mult: 0.65 }, { unit: '400 g Pouch', mult: 1 }, { unit: '1 kg Family Bucket', mult: 2.4 }, { unit: '400 g Tub', mult: 1.3 }],
      images: ['https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Pasteurised Salted Table Butter',
      hindi: 'मक्खन',
      category: 'dairy',
      basePrice: 56,
      mrpRatio: 1.08,
      brands: ['Amul', 'Mother Dairy', 'Britannia', 'Nutralite'],
      variants: [{ unit: '100 g Bar', mult: 1 }, { unit: '500 g Value Block', mult: 4.8 }, { unit: '200 g Tub', mult: 2.1 }],
      images: ['https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Farm Fresh White Eggs',
      hindi: 'फार्म फ्रेश अंडे',
      category: 'dairy',
      basePrice: 54,
      mrpRatio: 1.15,
      brands: ['Fresho Farm Fresh', 'Eggoz Nutri-Rich', 'Country Delight Free Range', 'Hello Eggs'],
      variants: [{ unit: 'Pack of 6', mult: 1 }, { unit: 'Pack of 10 Saver', mult: 1.55 }, { unit: 'Pack of 12', mult: 1.85 }, { unit: 'Pack of 30 Tray', mult: 4.4 }],
      images: [
        'https://www.bbassets.com/media/uploads/p/l/150502_11-fresho-farm-eggs-table-tray-medium-antibiotic-residue-free.jpg',
        'https://www.bbassets.com/media/uploads/p/l/40211592_7-eggoz-white-farm-fresh-eggs-omega-3-rich-with-no-ddgs-hormone-steroids.jpg',
        'https://www.bbassets.com/media/uploads/p/l/40348875_8-fresho-premium-white-eggs.jpg',
        'https://www.bbassets.com/media/uploads/p/l/40374433_1-hello-eggs-brown-eggs.jpg',
      ],
      isEssential: true,
    },
    {
      item: 'Whole Wheat Brown Bread',
      hindi: 'ब्राउन ब्रेड',
      category: 'dairy',
      basePrice: 42,
      mrpRatio: 1.12,
      brands: ['Harvest Gold', 'English Oven', 'Britannia 100% Atta', 'Modern Bread', 'The Health Factory'],
      variants: [{ unit: '400 g Loaf', mult: 1 }, { unit: '450 g Family Pack', mult: 1.15 }, { unit: 'Sub Footlong Loaf', mult: 1.3 }],
      images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Processed Cheese Slices & Cubes',
      hindi: 'चीज स्लाइस व क्यूब्स',
      category: 'dairy',
      basePrice: 125,
      mrpRatio: 1.15,
      brands: ['Amul', 'Britannia Cheezza', 'Go Cheese', 'Milky Mist Mozzarella'],
      variants: [{ unit: '10 Slices (200 g)', mult: 1 }, { unit: '20 Slices (400 g Saver)', mult: 1.9 }, { unit: '200 g Cubes Box', mult: 1.05 }, { unit: '500 g Diced Pizza Blend', mult: 2.4 }],
      images: ['https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&auto=format&fit=crop&q=80'],
    },
    {
      item: 'Spiced Buttermilk (Chhach)',
      hindi: 'मसाला छाछ',
      category: 'dairy',
      basePrice: 15,
      mrpRatio: 1.05,
      brands: ['Amul Masti', 'Mother Dairy Tadka', 'Nandini', 'Paper Boat'],
      variants: [{ unit: '200 ml Pouch', mult: 0.8 }, { unit: '500 ml Bottle', mult: 1.8 }, { unit: '200 ml Tetra (Pack of 4)', mult: 3.2 }],
      images: ['https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=80'],
    },
  ],
  veggies: [
    {
      item: 'Hybrid Fresh Red Tomatoes',
      hindi: 'ताजा हाइब्रिड टमाटर',
      category: 'veggies',
      basePrice: 28,
      mrpRatio: 1.25,
      brands: ['Farm Fresh Daily', 'Fresho Select', 'Organic Mandi', 'Pluckk Cleaned Hydroponic'],
      variants: [{ unit: '500 g Pack', mult: 0.55 }, { unit: '1 kg Net Bag', mult: 1 }, { unit: '2 kg Value Pack', mult: 1.9 }, { unit: '5 kg Mega Box', mult: 4.5 }],
      images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'New Crop Jyoti Fresh Potato (Aloo)',
      hindi: 'ज्योति आलू',
      category: 'veggies',
      basePrice: 24,
      mrpRatio: 1.2,
      brands: ['Mandi Fresh', 'Fresho Farm Picked', 'Nature Choice', 'Agro Fresh Daily'],
      variants: [{ unit: '1 kg Bag', mult: 1 }, { unit: '2 kg Family Pack', mult: 1.92 }, { unit: '5 kg Value Sack', mult: 4.6 }, { unit: 'Baby Potato (Dum Aloo) 500g', mult: 0.7 }],
      images: ['https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Fresh Red Onion (Pyaz)',
      hindi: 'ताजा लाल प्याज',
      category: 'veggies',
      basePrice: 32,
      mrpRatio: 1.22,
      brands: ['Nashik Premium Onion', 'Fresho Red Onion', 'Mandi Direct', 'Daily Harvest'],
      variants: [{ unit: '1 kg Net Bag', mult: 1 }, { unit: '2 kg Mesh Bag', mult: 1.95 }, { unit: '5 kg Jumbo Sack', mult: 4.7 }, { unit: 'Sambhar Small Onion 500g', mult: 1.2 }],
      images: ['https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Fresh Green Lady Finger (Bhindi)',
      hindi: 'ताजा भिंडी',
      category: 'veggies',
      basePrice: 26,
      mrpRatio: 1.25,
      brands: ['Farm Fresh Bhindi', 'Fresho Tender Okra', 'Green Valley'],
      variants: [{ unit: '250 g Pack', mult: 0.55 }, { unit: '500 g Tray', mult: 1 }, { unit: '1 kg Value Pack', mult: 1.9 }],
      images: ['https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Fresh Cauliflower (Phool Gobhi)',
      hindi: 'फूल गोभी',
      category: 'veggies',
      basePrice: 35,
      mrpRatio: 1.2,
      brands: ['Fresho Cleaned Cauliflower', 'Daily Mandi Select', 'Green Organic'],
      variants: [{ unit: '1 pc (400g - 600g)', mult: 1 }, { unit: 'Pack of 2 pcs', mult: 1.9 }, { unit: 'Cut & Washed Florets 300g', mult: 1.15 }],
      images: ['https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Shimla Royal Gala Fresh Apples',
      hindi: 'शिमला सेब',
      category: 'veggies',
      basePrice: 140,
      mrpRatio: 1.25,
      brands: ['Kashmir Delight', 'Shimla Royal Gala', 'Washington Red Premium', 'Fresho Select Apples'],
      variants: [{ unit: '500 g (3-4 pcs)', mult: 0.55 }, { unit: '1 kg Box (6-8 pcs)', mult: 1 }, { unit: '2 kg Family Basket', mult: 1.92 }],
      images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Fresh Robusta & Yelakki Bananas',
      hindi: 'ताजा केला',
      category: 'veggies',
      basePrice: 38,
      mrpRatio: 1.2,
      brands: ['Robusta Golden', 'Yelakki Elaichi Banana', 'Fresho Bananas', 'Organic Cavendish'],
      variants: [{ unit: '500 g (3-4 pcs)', mult: 0.6 }, { unit: '1 kg (6-8 pcs)', mult: 1 }, { unit: 'Yelakki 500g Bunch', mult: 1.3 }],
      images: ['https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Pomegranate (Anar) Premium',
      hindi: 'ताजा अनार',
      category: 'veggies',
      basePrice: 135,
      mrpRatio: 1.25,
      brands: ['Fresho Ruby Red Anar', 'Solapur Premium Pomegranate', 'FruitBox Fresh'],
      variants: [{ unit: '500 g (2-3 pcs)', mult: 0.58 }, { unit: '1 kg Box (4-5 pcs)', mult: 1 }, { unit: 'Fresh Peeled Arils 200g Cup', mult: 0.85 }],
      images: ['https://images.unsplash.com/photo-1541344999736-83eca872f242?w=300&auto=format&fit=crop&q=80'],
    },
    {
      item: 'Fresh Coriander, Mint & Curry Leaves Trio',
      hindi: 'धनिया, पुदीना व कढ़ी पत्ता',
      category: 'veggies',
      basePrice: 22,
      mrpRatio: 1.2,
      brands: ['Hydroponic Cleaned Herbs', 'Mandi Fresh Daily', 'Fresho Herbs'],
      variants: [{ unit: 'Coriander 100g Bunch', mult: 0.6 }, { unit: 'Mint 100g Bunch', mult: 0.55 }, { unit: 'Indian Seasoning Combo Pack', mult: 1 }],
      images: ['https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Fresh Green Capsicum (Shimla Mirch)',
      hindi: 'शिमला मिर्च',
      category: 'veggies',
      basePrice: 32,
      mrpRatio: 1.25,
      brands: ['Fresho Green Capsicum', 'Pluckk Farm Fresh', 'Hydroponic Valley'],
      variants: [{ unit: '250 g Pack', mult: 0.55 }, { unit: '500 g Pack', mult: 1 }, { unit: 'Red & Yellow Bell Pepper Combo 2pcs', mult: 2.1 }],
      images: ['https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&auto=format&fit=crop&q=80'],
    },
  ],
  staples: [
    {
      item: 'Shudh Chakki Fresh Whole Wheat Atta',
      hindi: 'शुद्ध चक्की आटा',
      category: 'staples',
      basePrice: 215,
      mrpRatio: 1.18,
      brands: ['Aashirvaad', 'Fortune', 'Pillsbury', 'Nature Fresh', 'Tata Sampann'],
      variants: [{ unit: '5 kg Bag', mult: 1 }, { unit: '10 kg Mega Saver Bag', mult: 1.95 }, { unit: '1 kg Pouch', mult: 0.24 }, { unit: 'Multigrain 5 kg Bag', mult: 1.35 }],
      images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Rozana Super Basmati / Sona Masoori Rice',
      hindi: 'बासमती व सोना मसूरी चावल',
      category: 'staples',
      basePrice: 110,
      mrpRatio: 1.25,
      brands: ['Daawat', 'India Gate', 'Fortune', 'BB Royal', 'Kohinoor'],
      variants: [{ unit: '1 kg Pouch', mult: 1 }, { unit: '5 kg Bag', mult: 4.8 }, { unit: '10 kg Value Bag', mult: 9.2 }, { unit: '25 kg Family Sack', mult: 22.0 }],
      images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Refined Sunflower Cooking Oil',
      hindi: 'कुकिंग ऑयल (सूरजमुखी)',
      category: 'staples',
      basePrice: 135,
      mrpRatio: 1.2,
      brands: ['Fortune', 'Saffola', 'Dhara', 'Gemini', 'Emami'],
      variants: [{ unit: '1 Litre Pouch', mult: 1 }, { unit: '1 Litre Pet Bottle', mult: 1.08 }, { unit: '2 Litre Jar', mult: 2.05 }, { unit: '5 Litre Family Jar', mult: 4.85 }],
      images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Unpolished Arhar / Toor Dal (Yellow Split)',
      hindi: 'अरहर / तूर दाल',
      category: 'staples',
      basePrice: 165,
      mrpRatio: 1.2,
      brands: ['Tata Sampann', 'Fortune', 'Organic Tattva', 'BB Royal'],
      variants: [{ unit: '500 g Pouch', mult: 0.54 }, { unit: '1 kg Bag', mult: 1 }, { unit: '2 kg Saver Pack', mult: 1.92 }, { unit: '5 kg Value Bucket', mult: 4.75 }],
      images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Moong Dal (Yellow Dhuli & Green Split)',
      hindi: 'मूंग दाल',
      category: 'staples',
      basePrice: 130,
      mrpRatio: 1.18,
      brands: ['Tata Sampann', 'Fortune', 'Organic Tattva', 'BB Royal'],
      variants: [{ unit: '500 g Pouch', mult: 0.53 }, { unit: '1 kg Pouch', mult: 1 }, { unit: '2 kg Saver Pack', mult: 1.94 }],
      images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Vacuum Evaporated Iodised Table Salt',
      hindi: 'आयोडीन युक्त नमक',
      category: 'staples',
      basePrice: 26,
      mrpRatio: 1.12,
      brands: ['Tata Salt', 'Tata Salt Lite', 'Aashirvaad', 'Catch'],
      variants: [{ unit: '1 kg Pouch', mult: 1 }, { unit: '1 kg Lite Low Sodium', mult: 1.45 }, { unit: 'Rock Salt (Sendha Namak) 1kg', mult: 1.6 }],
      images: ['https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Pure Desi Cow Ghee (Danedar)',
      hindi: 'शुद्ध देशी गाय का घी',
      category: 'staples',
      basePrice: 320,
      mrpRatio: 1.15,
      brands: ['Amul', 'Mother Dairy', 'Gowardhan', 'Aashirvaad Svasti', 'Patanjali'],
      variants: [{ unit: '500 ml Pouch', mult: 1 }, { unit: '500 ml Glass Jar', mult: 1.1 }, { unit: '1 Litre Pouch', mult: 1.95 }, { unit: '1 Litre Tin Box', mult: 2.15 }, { unit: '5 Litre Family Jar', mult: 9.5 }],
      images: ['https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Authentic Indian Ground Spices (Haldi, Mirch, Dhaniya)',
      hindi: 'हल्दी, मिर्च, धनिया पाउडर',
      category: 'staples',
      basePrice: 58,
      mrpRatio: 1.25,
      brands: ['Everest Spices', 'MDH Deggi Mirch', 'Catch Pure Spices', 'Tata Sampann Spices', 'Badshah Masala'],
      variants: [{ unit: '100 g Box', mult: 0.55 }, { unit: '200 g Box', mult: 1 }, { unit: '500 g Saver Pouch', mult: 2.3 }, { unit: 'Garam Masala 100g', mult: 1.4 }],
      images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&auto=format&fit=crop&q=80'],
    },
    {
      item: 'Pure & Hygienic Crystal White Sugar',
      hindi: 'सफेद चीनी',
      category: 'staples',
      basePrice: 52,
      mrpRatio: 1.15,
      brands: ['Madhur Pure & Hygienic', 'Uttam Sugar', 'Organic Tattva Brown Sugar', 'Dhampure Sulphur Free'],
      variants: [{ unit: '1 kg Pouch', mult: 1 }, { unit: '5 kg Mega Pack', mult: 4.8 }, { unit: 'Jaggery Powder (Gud) 1kg', mult: 1.3 }],
      images: ['https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
  ],
  snacks: [
    {
      item: 'Crispy Potato Chips & Crunchy Munchies',
      hindi: 'आलू चिप्स व कुरकुरे नमकीन',
      category: 'snacks',
      basePrice: 20,
      mrpRatio: 1.0,
      brands: ['Lay\'s India\'s Magic Masala', 'Lay\'s Spanish Tomato', 'Kurkure Masala Munch', 'Bingo! Mad Angles', 'Doritos Nacho Cheese', 'Pringles Original'],
      variants: [{ unit: '50 g Pack', mult: 1 }, { unit: '90 g Family Pack', mult: 1.9 }, { unit: '115 g Party Pack', mult: 2.45 }, { unit: 'Pringles Canister 110g', mult: 5.5 }],
      images: ['https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&auto=format&fit=crop&q=80'],
    },
    {
      item: 'Everyday Tea Biscuits & Cookies',
      hindi: 'बिस्कुट व कुकीज',
      category: 'snacks',
      basePrice: 35,
      mrpRatio: 1.15,
      brands: ['Parle-G Original Gluco', 'Britannia Good Day Cashew', 'Britannia Marie Gold', 'Sunfeast Dark Fantasy', 'Oreo Vanilla Cream', 'Parle Hide & Seek'],
      variants: [{ unit: '100 g Regular Pack', mult: 0.6 }, { unit: '250 g Value Pack', mult: 1 }, { unit: '600 g Family Party Pack', mult: 2.2 }, { unit: '1 kg Mega Saver Box', mult: 3.5 }],
      images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Traditional Bikaneri Bhujia & Aloo Bhujia',
      hindi: 'बीकानेरी भुजिया व आलू भुजिया',
      category: 'snacks',
      basePrice: 58,
      mrpRatio: 1.15,
      brands: ['Haldiram\'s Nagpur', 'Bikaji Bhujia No. 1', 'Balaji Wafers & Namkeen', 'Chhedas Banana Chips'],
      variants: [{ unit: '200 g Pouch', mult: 1 }, { unit: '400 g Saver Pouch', mult: 1.9 }, { unit: '1 kg Jumbo Family Bag', mult: 4.4 }, { unit: 'Moong Dal Salted 200g', mult: 1.1 }],
      images: ['https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=300&auto=format&fit=crop&q=80'],
    },
    {
      item: 'Cadbury Dairy Milk & Silk Chocolates',
      hindi: 'डेयरी मिल्क सिल्क चॉकलेट',
      category: 'snacks',
      basePrice: 75,
      mrpRatio: 1.08,
      brands: ['Cadbury Dairy Milk', 'Cadbury Dairy Milk Silk', 'Nestle KitKat 4-Finger', 'Cadbury 5 Star 3D', 'Ferrero Rocher Gold'],
      variants: [{ unit: '55 g Classic Bar', mult: 1 }, { unit: '150 g Silk Large Bar', mult: 2.4 }, { unit: 'Ferrero Box of 16 pcs', mult: 6.8 }, { unit: 'Snickers Peanut Bar 45g', mult: 0.65 }],
      images: ['https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&auto=format&fit=crop&q=80'],
    },
    {
      item: 'Premium California Almonds & Cashews',
      hindi: 'बादाम व काजू',
      category: 'snacks',
      basePrice: 240,
      mrpRatio: 1.35,
      brands: ['Farmley Prasadam Makhana', 'Nutraj California Almonds', 'Happilo Premium Cashews', 'BB Royal Walnuts Akhrot'],
      variants: [{ unit: '250 g Pouch', mult: 1 }, { unit: '500 g Value Zip Pouch', mult: 1.92 }, { unit: '1 kg Mega Pack', mult: 3.75 }, { unit: 'Roasted Makhana 100g', mult: 0.65 }],
      images: ['https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=300&auto=format&fit=crop&q=80'],
    },
  ],
  beverages: [
    {
      item: 'Brooke Bond & Tata Premium Chai Tea Leaf',
      hindi: 'प्रीमियम चाय पत्ती',
      category: 'beverages',
      basePrice: 145,
      mrpRatio: 1.15,
      brands: ['Brooke Bond Red Label', 'Tata Tea Gold', 'Taj Mahal Premium Leaf', 'Wagh Bakri CTC Tea', 'Tetley Green Tea Lemon'],
      variants: [{ unit: '250 g Pack', mult: 0.55 }, { unit: '500 g Box', mult: 1 }, { unit: '1 kg Value Saver Bag', mult: 1.92 }, { unit: 'Green Tea 25 Tea Bags', mult: 0.9 }],
      images: ['https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Pure Instant Coffee & Filter Coffee Blend',
      hindi: 'इंस्टेंट कॉफी',
      category: 'beverages',
      basePrice: 185,
      mrpRatio: 1.2,
      brands: ['Nescafe Classic Instant', 'Bru Instant Coffee', 'Continental Xtra Coffee', 'Davidoff Rich Aroma', 'Bru Gold Pure Coffee'],
      variants: [{ unit: '50 g Glass Jar', mult: 0.58 }, { unit: '100 g Glass Jar', mult: 1 }, { unit: '200 g Refill Pouch', mult: 1.85 }, { unit: 'Davidoff 100g Luxury Jar', mult: 2.8 }],
      images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80'],
    },
    {
      item: 'Chilled Cold Drinks, Colas & Sodas',
      hindi: 'कोल्ड ड्रिंक्स व सोडा',
      category: 'beverages',
      basePrice: 40,
      mrpRatio: 1.0,
      brands: ['Coca-Cola Original', 'Thums Up Charged', 'Sprite Lemon Lime', 'Limca Refreshing', 'Pepsi Zero Sugar', 'Bisleri Club Soda'],
      variants: [{ unit: '250 ml Can', mult: 0.9 }, { unit: '750 ml Bottle', mult: 1 }, { unit: '1.25 Litre Bottle', mult: 1.45 }, { unit: '2.25 Litre Party Pack', mult: 2.35 }],
      images: ['https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&auto=format&fit=crop&q=80'],
    },
    {
      item: '100% Real Fruit Power & Pulp Juices',
      hindi: 'फलों का ताजा जूस',
      category: 'beverages',
      basePrice: 115,
      mrpRatio: 1.25,
      brands: ['Real Fruit Power Mixed', 'Tropicana 100% Orange', 'Paper Boat Aamras', 'Frooti Mango Drink', 'B Natural Mixed Fruit'],
      variants: [{ unit: '1 Litre Tetra Pack', mult: 1 }, { unit: '1 Litre Pack of 2 Combo', mult: 1.88 }, { unit: '200 ml Tetra Pack with Straw', mult: 0.25 }],
      images: ['https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300&auto=format&fit=crop&q=80'],
    },
    {
      item: 'Health Malt Nutrition Drinks (Bournvita, Horlicks, Boost)',
      hindi: 'बॉर्नविटा व हॉर्लिक्स',
      category: 'beverages',
      basePrice: 320,
      mrpRatio: 1.15,
      brands: ['Cadbury Bournvita Pro-Health', 'Horlicks Classic Malt', 'Boost Energy Drink', 'Complan Royale Chocolate'],
      variants: [{ unit: '500 g Refill', mult: 0.55 }, { unit: '1 kg Pet Jar', mult: 1 }, { unit: '2 kg Mega Saver Pack', mult: 1.9 }],
      images: ['https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=300&auto=format&fit=crop&q=80'],
    },
    {
      item: 'Red Bull & Monster Energy Drinks',
      hindi: 'रेड बुल एनर्जी ड्रिंक',
      category: 'beverages',
      basePrice: 115,
      mrpRatio: 1.1,
      brands: ['Red Bull Energy Drink', 'Monster Energy Original', 'Sting Energy Drink 250ml', 'Hell Energy Classic'],
      variants: [{ unit: '250 ml Can', mult: 1 }, { unit: '350 ml Tall Can', mult: 1.35 }, { unit: 'Pack of 4 Cans (250 ml)', mult: 3.8 }],
      images: ['https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&auto=format&fit=crop&q=80'],
    },
  ],
  instant: [
    {
      item: 'Maggi 2-Minute Masala Instant Noodles',
      hindi: 'मैगी मसाला नूडल्स',
      category: 'instant',
      basePrice: 56,
      mrpRatio: 1.08,
      brands: ['Maggi 2-Minute Masala', 'Maggi Special Masala', 'Maggi Veg Atta Noodles', 'Sunfeast YiPPee! Magic Masala', 'Ching\'s Schezwan Noodles'],
      variants: [{ unit: '4-Pack Saver (280 g)', mult: 1 }, { unit: '8-Pack Value Pack (560 g)', mult: 1.95 }, { unit: '12-Pack Family Feast (840 g)', mult: 2.85 }, { unit: 'Single 70 g Pocket Pack', mult: 0.28 }],
      images: ['https://images.unsplash.com/photo-1612927601601-6638404737ce?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Rich Tomato Ketchup & Schezwan Chutney',
      hindi: 'टोमैटो केचप व शेजवान चटनी',
      category: 'instant',
      basePrice: 110,
      mrpRatio: 1.25,
      brands: ['Maggi Rich Tomato Ketchup', 'Kissan Fresh Tomato Ketchup', 'Heinz Tomato Ketchup', 'Ching\'s Secret Schezwan Chutney'],
      variants: [{ unit: '500 g Squeezy Bottle', mult: 0.6 }, { unit: '1 kg Squeezy Bottle Saver', mult: 1 }, { unit: 'Ching\'s Schezwan 250g Jar', mult: 0.75 }],
      images: ['https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&auto=format&fit=crop&q=80'],
    },
    {
      item: 'Durum Wheat Penne & Fusilli Pasta',
      hindi: 'पास्ता व मैकरोनी',
      category: 'instant',
      basePrice: 85,
      mrpRatio: 1.3,
      brands: ['Disano 100% Durum Wheat Penne', 'Barilla Italian Pasta', 'Borges Fusilli Pasta', 'Bambino Roasted Vermicelli'],
      variants: [{ unit: '500 g Pouch', mult: 1 }, { unit: '1 kg Family Saver Bag', mult: 1.9 }, { unit: 'Vermicelli Sevai 500g', mult: 0.6 }],
      images: ['https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=300&auto=format&fit=crop&q=80'],
    },
    {
      item: 'MTR Ready-to-Eat Dal Makhani & Paneer Tikka',
      hindi: 'रेडी-टू-ईट दाल मखनी व पनीर',
      category: 'instant',
      basePrice: 120,
      mrpRatio: 1.2,
      brands: ['MTR Ready to Eat', 'Tata Sampann Yumside', 'Gits Instant Mix Gulab Jamun', 'MTR Rava Idli Mix'],
      variants: [{ unit: '300 g Retort Pouch', mult: 1 }, { unit: 'Pack of 2 Combo', mult: 1.9 }, { unit: 'Instant Idli Mix 500g', mult: 0.85 }],
      images: ['https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&auto=format&fit=crop&q=80'],
    },
  ],
  household: [
    {
      item: 'Matic Washing Machine Detergent Powder & Liquid',
      hindi: 'डिटर्जेंट पाउडर व लिक्विड',
      category: 'household',
      basePrice: 285,
      mrpRatio: 1.22,
      brands: ['Surf Excel Matic Top Load', 'Surf Excel Matic Front Load', 'Ariel Matic Powder', 'Tide Plus Extra Power', 'Rin Advanced Powder'],
      variants: [{ unit: '1 kg Pouch', mult: 0.55 }, { unit: '2 kg Value Box', mult: 1 }, { unit: '4 kg + 2 kg Free Bucket', mult: 2.1 }, { unit: 'Matic Liquid Detergent 1 Litre', mult: 0.95 }],
      images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Lemon Anti-Germ Dishwash Gel & Bar',
      hindi: 'डिशवॉश जेल व साबुन',
      category: 'household',
      basePrice: 95,
      mrpRatio: 1.2,
      brands: ['Vim Dishwash Liquid Lemon', 'Pril Lime Dishwash Gel', 'Vim Dishwash Bar 500g Tub', 'Scotch-Brite Heavy Duty Scrubbers'],
      variants: [{ unit: '750 ml Bottle', mult: 1 }, { unit: '2 Litre Saver Refill Pouch', mult: 2.3 }, { unit: 'Vim Bar 3-Pack with Scrubber', mult: 0.55 }, { unit: 'Scotch-Brite Sponge Wipes 3s', mult: 0.9 }],
      images: ['https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Disinfectant Floor & Toilet Cleaners',
      hindi: 'फ्लोर व टॉयलेट क्लीनर',
      category: 'household',
      basePrice: 165,
      mrpRatio: 1.2,
      brands: ['Lizol Disinfectant Floor Cleaner Citrus', 'Harpic Power Plus Toilet Cleaner Blue', 'Colin Glass Cleaner Spray', 'Domex Fresh Guard'],
      variants: [{ unit: '1 Litre Bottle', mult: 1 }, { unit: '2 Litre Family Pack', mult: 1.9 }, { unit: 'Colin Spray 500ml', mult: 0.6 }, { unit: 'Harpic + Lizol Power Combo', mult: 1.85 }],
      images: ['https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Mosquito Vaporizers & Insect Killers',
      hindi: 'मच्छर मार रिफिल व स्प्रे',
      category: 'household',
      basePrice: 145,
      mrpRatio: 1.18,
      brands: ['All Out Ultra Power+ Twin Refill', 'Good Knight Gold Flash Machine + Refill', 'Black HIT Mosquito Spray', 'Red HIT Cockroach Spray'],
      variants: [{ unit: 'Machine + Refill Combo', mult: 1 }, { unit: 'Twin Refill Pack (90 Nights)', mult: 1.1 }, { unit: 'HIT Spray 625 ml Tall Can', mult: 1.5 }],
      images: ['https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=300&auto=format&fit=crop&q=80'],
    },
    {
      item: 'Kitchen Foil, Cling Wrap & Garbage Bags',
      hindi: 'किचन फॉयल व गारबेज बैग्स',
      category: 'household',
      basePrice: 99,
      mrpRatio: 1.25,
      brands: ['Freshee Aluminium Foil 18m', 'Origami Kitchen Paper Towels', 'Glad Cling Wrap 30m', 'Shalimar Oxo-Biodegradable Garbage Bags'],
      variants: [{ unit: '18 Meter Heavy Duty Foil', mult: 1 }, { unit: '72 Meter Commercial Roll', mult: 2.8 }, { unit: 'Garbage Bags Roll (30 Bags)', mult: 0.85 }, { unit: 'Kitchen Towel 2 Rolls Pack', mult: 0.95 }],
      images: ['https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=300&auto=format&fit=crop&q=80'],
    },
  ],
  personal: [
    {
      item: 'Bathing Soap Bars with Germ Protection & Glycerin',
      hindi: 'नहाने का साबुन',
      category: 'personal',
      basePrice: 145,
      mrpRatio: 1.18,
      brands: ['Dettol Original Germ Protection', 'Dove White Beauty Moisture Bar', 'Pears Pure & Gentle Glycerin', 'Lifebuoy Total 10', 'Cinthol Original Deodorant'],
      variants: [{ unit: 'Pack of 4 (125 g each)', mult: 1 }, { unit: 'Pack of 5 (Value Saver)', mult: 1.2 }, { unit: 'Dove Body Wash 800ml Pump', mult: 2.6 }],
      images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Anti-Dandruff & Hair Fall Control Shampoos',
      hindi: 'शैम्पू व हेयर ऑयल',
      category: 'personal',
      basePrice: 260,
      mrpRatio: 1.22,
      brands: ['Head & Shoulders Cool Menthol', 'Dove Intense Repair Shampoo', 'Pantene Pro-V Hair Fall Control', 'Tresemme Keratin Smooth', 'Parachute Pure Coconut Hair Oil'],
      variants: [{ unit: '340 ml Bottle', mult: 0.65 }, { unit: '650 ml Family Pump Bottle', mult: 1 }, { unit: '1 Litre Salon Size Bottle', mult: 1.5 }, { unit: 'Parachute Oil 500ml Bottle', mult: 0.75 }],
      images: ['https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&auto=format&fit=crop&q=80'],
    },
    {
      item: 'Toothpaste & Whole Mouth Care Brushes',
      hindi: 'टूथपेस्ट व ब्रश',
      category: 'personal',
      basePrice: 140,
      mrpRatio: 1.2,
      brands: ['Colgate MaxFresh Spicy Red Gel', 'Colgate Strong Teeth Fluoride', 'Sensodyne Fresh Mint Sensitive', 'Close Up Deep Action Red Hot', 'Oral-B Pro-Health Toothbrushes'],
      variants: [{ unit: '150 g x 2 (Twin Saver Pack)', mult: 1 }, { unit: '300 g Mega Family Pack', mult: 1.4 }, { unit: 'Sensodyne Rapid Relief 80g', mult: 1.15 }, { unit: 'Oral-B Soft Brushes Pack of 4', mult: 0.95 }],
      images: ['https://images.unsplash.com/photo-1559591937-e1032c525f20?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
    {
      item: 'Shaving Razors, Foams & Deodorants',
      hindi: 'शेविंग रेज़र व डिओडोरेंट',
      category: 'personal',
      basePrice: 180,
      mrpRatio: 1.15,
      brands: ['Gillette Mach3 Razor with Cartridges', 'Gillette Classic Shaving Foam', 'Fogg Scent Xpressio Perfume', 'Nivea Men Deep Black Carbon Deodorant', 'Wild Stone Edge Body Spray'],
      variants: [{ unit: '150 ml Body Spray Can', mult: 1 }, { unit: 'Mach3 Razor + 2 Cartridges', mult: 1.8 }, { unit: 'Gillette Shave Foam 418g Can', mult: 1.1 }, { unit: 'Fogg 120ml No Gas Perfume', mult: 1.25 }],
      images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80'],
    },
    {
      item: 'Feminine Hygiene Wings Pads & Baby Diaper Pants',
      hindi: 'सेनेटरी पैड्स व बेबी डायपर',
      category: 'personal',
      basePrice: 220,
      mrpRatio: 1.2,
      brands: ['Whisper Choice Ultra Wings XL (20 Pads)', 'Stayfree Secure Cottony XL (40 Pads)', 'Pampers All Round Diaper Pants M', 'Huggies Wonder Pants Large'],
      variants: [{ unit: 'Pack of 20-30 Pads Saver', mult: 1 }, { unit: 'Pack of 40-50 Pads Mega Pack', mult: 1.6 }, { unit: 'Baby Diapers 72s Mega Box', mult: 3.5 }],
      images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80'],
      isEssential: true,
    },
  ],
};

// Simple deterministic pseudo-random generator with seed
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Generate a deterministic SKU from the index and category
export function generateDeterministicSku(globalIndex: number, categoryId: string, cityMultiplier = 1.0): Product {
  const targetCategory = categoryId === 'all' 
    ? (['dairy', 'veggies', 'staples', 'snacks', 'beverages', 'instant', 'household', 'personal'][globalIndex % 8])
    : categoryId;

  const blueprints = BLUEPRINTS[targetCategory] || BLUEPRINTS.staples;
  const blueprintIndex = globalIndex % blueprints.length;
  const bp = blueprints[blueprintIndex];

  const brandIndex = Math.floor(globalIndex / blueprints.length) % bp.brands.length;
  const brand = bp.brands[brandIndex];

  const variantIndex = Math.floor(globalIndex / (blueprints.length * bp.brands.length)) % bp.variants.length;
  const variant = bp.variants[variantIndex];

  const imageIndex = globalIndex % bp.images.length;
  const imageUrl = bp.images[imageIndex];

  // Variations seed
  const seed = globalIndex * 7919 + targetCategory.charCodeAt(0);
  const priceVariation = 0.95 + pseudoRandom(seed) * 0.1; // +/- 5%
  const baseCalculatedPrice = Math.round(bp.basePrice * variant.mult * priceVariation * cityMultiplier);
  const mrp = Math.round(baseCalculatedPrice * bp.mrpRatio);

  const skuId = `sku_${targetCategory}_${globalIndex + 1}`;
  const fullName = `${brand} ${bp.item} (${variant.unit})`;

  return {
    id: skuId,
    name: fullName,
    nameHindi: `${brand.split(' ')[0]} ${bp.hindi} (${variant.unit})`,
    brand: brand,
    category: targetCategory as any,
    unit: variant.unit,
    imageUrl: imageUrl,
    trending: (globalIndex % 7 === 0),
    isDailyEssential: bp.isEssential || (globalIndex % 4 === 0),
    offers: generateStoreOffers(baseCalculatedPrice, mrp, fullName),
  };
}

export interface PaginatedResult {
  items: Product[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Get paginated items with search, filter, and sort across all 24,580 SKUs
export function queryMasterCatalog(options: {
  category: string;
  searchQuery?: string;
  page: number;
  pageSize: number;
  sortBy?: 'savings' | 'price-asc' | 'price-desc';
  onlyEssentials?: boolean;
  cityMultiplier?: number;
}): PaginatedResult {
  const {
    category = 'all',
    searchQuery = '',
    page = 1,
    pageSize = 24,
    sortBy = 'savings',
    onlyEssentials = false,
    cityMultiplier = 1.0,
  } = options;

  const q = searchQuery.toLowerCase().trim();
  const maxCategorySkus = CATEGORY_TOTALS[category] || 24580;

  // If there is an active search query: scan seed + generated items to find matching SKUs
  if (q.length > 0) {
    const matchedProducts: Product[] = [];
    // Check static comprehensive first
    for (const p of COMPREHENSIVE_GROCERY_DATA) {
      if (category !== 'all' && p.category !== category) continue;
      if (onlyEssentials && !p.isDailyEssential) continue;
      if (p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || (p.nameHindi && p.nameHindi.includes(q))) {
        matchedProducts.push(p);
      }
    }

    // Search across generated deterministic items (scan first 1,500 items in relevant category)
    const scanLimit = Math.min(maxCategorySkus, 2000);
    for (let i = 0; i < scanLimit && matchedProducts.length < 200; i++) {
      const p = generateDeterministicSku(i, category, cityMultiplier);
      if (onlyEssentials && !p.isDailyEssential) continue;
      if (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.nameHindi && p.nameHindi.includes(q))
      ) {
        matchedProducts.push(p);
      }
    }

    // Sort matched
    matchedProducts.sort((a, b) => {
      const getSavings = (prod: Product) => {
        const prices = Object.values(prod.offers).filter((o) => o.inStock).map((o) => o.price);
        return prices.length >= 2 ? Math.max(...prices) - Math.min(...prices) : 0;
      };
      const getMinPrice = (prod: Product) => {
        const prices = Object.values(prod.offers).filter((o) => o.inStock).map((o) => o.price);
        return prices.length > 0 ? Math.min(...prices) : 9999;
      };

      if (sortBy === 'savings') return getSavings(b) - getSavings(a);
      if (sortBy === 'price-asc') return getMinPrice(a) - getMinPrice(b);
      if (sortBy === 'price-desc') return getMinPrice(b) - getMinPrice(a);
      return 0;
    });

    const totalCount = matchedProducts.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const startIdx = (safePage - 1) * pageSize;
    const items = matchedProducts.slice(startIdx, startIdx + pageSize);

    return {
      items,
      totalCount,
      page: safePage,
      pageSize,
      totalPages,
    };
  }

  // No search query: full catalog navigation across all 24,580 SKUs
  const totalCount = maxCategorySkus;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (safePage - 1) * pageSize;

  const items: Product[] = [];

  // For the very first page of category 'all' or specific category, include our hand-crafted static items first
  if (safePage === 1) {
    const staticMatches = COMPREHENSIVE_GROCERY_DATA.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (onlyEssentials && !p.isDailyEssential) return false;
      return true;
    });

    for (let i = 0; i < Math.min(staticMatches.length, pageSize); i++) {
      items.push(staticMatches[i]);
    }
  }

  // Fill remainder from deterministic generator
  let genIndex = startIndex;
  while (items.length < pageSize && genIndex < totalCount) {
    const p = generateDeterministicSku(genIndex, category, cityMultiplier);
    if (!onlyEssentials || p.isDailyEssential) {
      items.push(p);
    }
    genIndex++;
  }

  // Sort items according to preference
  items.sort((a, b) => {
    const getSavings = (prod: Product) => {
      const prices = Object.values(prod.offers).filter((o) => o.inStock).map((o) => o.price);
      return prices.length >= 2 ? Math.max(...prices) - Math.min(...prices) : 0;
    };
    const getMinPrice = (prod: Product) => {
      const prices = Object.values(prod.offers).filter((o) => o.inStock).map((o) => o.price);
      return prices.length > 0 ? Math.min(...prices) : 9999;
    };

    if (sortBy === 'savings') return getSavings(b) - getSavings(a);
    if (sortBy === 'price-asc') return getMinPrice(a) - getMinPrice(b);
    if (sortBy === 'price-desc') return getMinPrice(b) - getMinPrice(a);
    return 0;
  });

  return {
    items,
    totalCount,
    page: safePage,
    pageSize,
    totalPages,
  };
}
