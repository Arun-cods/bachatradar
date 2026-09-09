import React, { useState, useEffect } from 'react';
import {
  Search,
  Mic,
  MapPin,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Zap,
  Tag,
  ArrowRight,
  TrendingDown,
  Clock,
  CheckCircle2,
  ExternalLink,
  Flame,
  Layers,
  Award,
  RefreshCw,
  Plus,
  Minus,
  Activity
} from 'lucide-react';
import { CityOption, Product, UserProfile, PlatformId } from '../types';
import { PLATFORMS } from '../data/mockGroceryData';
import { COMPREHENSIVE_GROCERY_DATA, generateStoreOffers } from '../data/comprehensiveCatalog';

interface QuickCommerceHomeViewProps {
  selectedCity: CityOption;
  selectedArea: string;
  onOpenLocationModal: () => void;
  currentUser: UserProfile | null;
  onSelectCategory: (catId: string) => void;
  selectedCategory: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCart: () => void;
  onOpenShare: () => void;
  totalCartItemCount: number;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity?: (productId: string, delta: number) => void;
  cartQuantities?: Record<string, number>;
  onTrackAffiliateClick?: (platform: PlatformId, product: Product) => void;
  onTriggerLiveRefresh?: () => void;
}

export const QuickCommerceHomeView: React.FC<QuickCommerceHomeViewProps> = ({
  selectedCity,
  selectedArea,
  onOpenLocationModal,
  currentUser,
  onSelectCategory,
  selectedCategory,
  searchQuery,
  onSearchChange,
  onOpenCart,
  onOpenShare,
  totalCartItemCount,
  onAddToCart,
  onUpdateQuantity,
  cartQuantities = {},
  onTrackAffiliateClick,
  onTriggerLiveRefresh,
}) => {
  const [activeBrandTab, setActiveBrandTab] = useState<'minutes' | 'flipkart' | 'zepto' | 'blinkit' | 'instamart'>('minutes');
  const [activeCategoryPill, setActiveCategoryPill] = useState<string>(selectedCategory || 'all');
  
  // Real-Time Live Update Telemetry Ticker
  const [liveUpdateIndex, setLiveUpdateIndex] = useState(0);
  const [lastSyncSec, setLastSyncSec] = useState(2);

  const liveUpdatesList = [
    { platform: 'Zepto', text: '⚡ Zepto dropped Amul Taaza 500ml to ₹27 (-₹2) in Ameerpet (8m delivery)', isDrop: true },
    { platform: 'Blinkit', text: '⚡ Blinkit flash rate: Hybrid Tomatoes 1kg at ₹38 (-₹4 drop)', isDrop: true },
    { platform: 'BB Now', text: '⚡ BB Now synchronized Aashirvaad Atta 10kg at lowest ₹435 (-₹15)', isDrop: true },
    { platform: 'Instamart', text: '⚡ Swiggy Instamart updated Farm Fresh Eggs 6s at ₹44', isDrop: false },
    { platform: 'Flipkart', text: '⚡ Flipkart Minutes Express slot active: 7 mins to Balaji Colony', isDrop: false },
  ];

  useEffect(() => {
    const ticker = setInterval(() => {
      setLiveUpdateIndex((prev) => (prev + 1) % liveUpdatesList.length);
      setLastSyncSec(0);
    }, 4500);

    const timer = setInterval(() => {
      setLastSyncSec((s) => s + 1);
    }, 1000);

    return () => {
      clearInterval(ticker);
      clearInterval(timer);
    };
  }, []);

  // Personalized name from screenshot: "Hey Gopagani, your quick picks"
  const displayName = currentUser ? (currentUser.name.split(' ')[0] || 'Gopagani') : 'Gopagani';

  const brandTabs = [
    { id: 'flipkart', label: 'Flipkart', icon: '🛒' },
    { id: 'minutes', label: 'Minutes', icon: '🛵', isPrimary: true },
    { id: 'blinkit', label: 'Blinkit', icon: '🟡' },
    { id: 'zepto', label: 'Zepto', icon: '⚡' },
    { id: 'instamart', label: 'Instamart', icon: '🟠' },
  ];

  const quickStoryCategories = [
    { id: 'all', label: 'For You', icon: '🛍️' },
    { id: 'dairy', label: 'Dairy & Milk', icon: '🥛' },
    { id: 'veggies', label: 'Fresh Veggies', icon: '🍎' },
    { id: 'staples', label: 'Atta & Dal', icon: '🌾' },
    { id: 'snacks', label: 'Munchies', icon: '🍪' },
    { id: 'beverages', label: 'Cold Drinks', icon: '🥤' },
    { id: 'household', label: 'Cleaning', icon: '🧼' },
  ];

  // 4-Item Preview Bundles for "Hey Gopagani, your quick picks" (Exact match to screenshot)
  const quickPickBundles = [
    {
      id: 'beverages',
      title: 'Beverages',
      countLabel: '+7',
      items: [
        { name: 'Coke', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=150&q=80' },
        { name: 'Juice', img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=150&q=80' },
        { name: 'Syrup', img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=150&q=80' },
        { name: 'Soda', img: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=150&q=80' },
      ],
    },
    {
      id: 'snacks',
      title: 'Munchies and Snacks',
      countLabel: '+5',
      items: [
        { name: 'Chips', img: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=150&q=80' },
        { name: 'Biscuits', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=150&q=80' },
        { name: 'Namkeen', img: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281061?auto=format&fit=crop&w=150&q=80' },
        { name: 'Mixture', img: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=150&q=80' },
      ],
    },
    {
      id: 'veggies',
      title: 'Fruits and Vegetables',
      countLabel: '+4',
      items: [
        { name: 'Potatoes', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=150&q=80' },
        { name: 'Coriander', img: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=150&q=80' },
        { name: 'Grapes', img: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=150&q=80' },
        { name: 'Beans', img: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=150&q=80' },
      ],
    },
    {
      id: 'dairy',
      title: 'Dairy and Breakfast',
      countLabel: '+8',
      items: [
        { name: 'Milk', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=150&q=80' },
        { name: 'Paneer', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=150&q=80' },
        { name: 'Butter', img: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=150&q=80' },
        { name: 'Curd', img: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=150&q=80' },
      ],
    },
  ];

  // REAL INSTANT DELIVERY PRODUCTS FOR HORIZONTAL ROWS ("MULTIPLE ITEMS IN ONE LINE")
  const instantDeliveryRows = [
    {
      id: 'row-dairy',
      title: '⚡ Daily Milk, Bread & Dairy in 7 Mins',
      subtitle: 'Lowest rates across Zepto, Blinkit & BB Now',
      items: COMPREHENSIVE_GROCERY_DATA.filter((p) => p.category === 'dairy').slice(0, 8),
    },
    {
      id: 'row-veggies',
      title: '🍅 Farm Fresh Vegetables & Direct Mandi',
      subtitle: 'Synced with local darkstores every 15 mins',
      items: COMPREHENSIVE_GROCERY_DATA.filter((p) => p.category === 'veggies').slice(0, 8),
    },
    {
      id: 'row-staples',
      title: '🌾 Kitchen Staples (Atta, Rice, Dal & Ghee)',
      subtitle: 'Save ₹80–₹150 on family pack arbitrage',
      items: COMPREHENSIVE_GROCERY_DATA.filter((p) => p.category === 'staples').slice(0, 8),
    },
    {
      id: 'row-snacks',
      title: '🍪 Munchies, Biscuits & Instant Foods',
      subtitle: 'Blinkit vs Zepto snack pricing compared',
      items: COMPREHENSIVE_GROCERY_DATA.filter((p) => p.category === 'snacks').slice(0, 8),
    },
  ];

  const getLowestPrice = (product: Product) => {
    const valid = Object.values(product.offers).filter((o) => o.inStock);
    if (!valid.length) return { price: 35, mrp: 40, platform: 'zepto' as PlatformId, savings: 5 };
    const lowest = valid.reduce((min, o) => (o.price < min.price ? o : min), valid[0]);
    const savings = Math.max(0, lowest.mrp - lowest.price);
    return { price: lowest.price, mrp: lowest.mrp, platform: lowest.platform as PlatformId, savings };
  };

  const handleCategoryClick = (catId: string) => {
    setActiveCategoryPill(catId);
    onSelectCategory(catId);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden bg-gradient-to-b from-amber-100/70 via-amber-50/40 to-white pb-6 pt-2">
      
      {/* 1. TOP STORE SWITCHER TABS (Flipkart | Minutes | Travel | Value 365) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 mb-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          {brandTabs.map((tab) => {
            const isActive = activeBrandTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveBrandTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all shadow-xs shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#e01962] text-white shadow-md shadow-[#e01962]/30 scale-102'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. ADDRESS / LOCATION BAR + 7 MIN DELIVERY BADGE */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 mb-3">
        <div className="flex items-center justify-between gap-2.5">
          
          {/* Address Line: [HOME Ameerpet, Balaji Nagar Colony >] */}
          <button
            type="button"
            onClick={onOpenLocationModal}
            className="flex items-center gap-1.5 text-xs text-left min-w-0 flex-1 hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <span className="font-black text-slate-900 flex items-center gap-1 shrink-0">
              <span>🏠 HOME</span>
            </span>
            <span className="text-slate-600 truncate font-semibold">
              {selectedArea || selectedCity.popularAreas[0] || 'Sriram Nagar Colony'}, {selectedCity.name}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* 7 Min Delivery Badge (Exact match to screenshot) */}
          <div className="px-3 py-1 rounded-xl bg-[#7c004d] text-white font-black text-xs flex items-center gap-1 shrink-0 shadow-sm animate-pulse">
            <span className="text-sm leading-none">7</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">min</span>
          </div>

        </div>
      </div>

      {/* 3. UNIVERSAL SEARCH BAR WITH MIC (Exact match to screenshot) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 mb-3.5">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-4 h-4 text-[#e01962]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search in Minutes (Milk, Atta, Tomatoes, Surf Excel...)"
            className="w-full bg-white border border-slate-200 focus:border-[#e01962] rounded-2xl py-3 pl-11 pr-11 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none shadow-sm transition-all"
          />
          <button
            type="button"
            onClick={() => onSearchChange(searchQuery ? '' : 'Amul Milk')}
            className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-700 transition-colors"
            title="Voice Search"
          >
            <Mic className="w-4 h-4 text-slate-500 hover:text-[#e01962]" />
          </button>
        </div>
      </div>

      {/* 4. REAL-TIME TELEMETRY & LIVE UPDATES BAR ("and also give updates") */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 mb-4">
        <div className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white border border-emerald-500/40 flex items-center justify-between gap-2 shadow-sm text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <div className="truncate text-xs font-semibold text-slate-200">
              {liveUpdatesList[liveUpdateIndex].text}
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
              {lastSyncSec}s ago
            </span>
            <button
              type="button"
              onClick={onTriggerLiveRefresh}
              className="px-2 py-0.5 rounded-lg bg-emerald-500 text-slate-950 font-black text-[10px] hover:bg-emerald-400 transition-colors active:scale-95 cursor-pointer"
            >
              Sync
            </button>
          </div>
        </div>
      </div>

      {/* 5. QUICK CATEGORY CIRCLES WITH UNDERLINE (For You | Fresh | Grocery | Chaturthi...) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 mb-5">
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none text-center pb-1">
          {quickStoryCategories.map((cat) => {
            const isActive = activeCategoryPill === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl transition-all shadow-xs ${
                    isActive
                      ? 'bg-gradient-to-br from-pink-100 to-rose-200 border-2 border-[#e01962] scale-105 shadow-sm'
                      : 'bg-white border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.icon}</span>
                </div>
                <span
                  className={`text-[11px] font-extrabold tracking-tight ${
                    isActive ? 'text-[#e01962]' : 'text-slate-700'
                  }`}
                >
                  {cat.label}
                </span>
                {isActive && (
                  <div className="w-6 h-0.5 bg-[#e01962] rounded-full mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. HERO PROMO CAROUSEL (Chocolate affair • Up to 50% Off / BachatRadar Arbitrage) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 mb-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 p-5 sm:p-7 text-slate-950 shadow-md">
          <div className="relative z-10 max-w-sm sm:max-w-md">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/15 text-slate-950 mb-2">
              ⚡ LIVE MULTI-STORE ARBITRAGE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950 leading-tight">
              Chocolate affair & Snacks
            </h2>
            <p className="text-base sm:text-xl font-black text-amber-950 mt-1">
              Up to 50% Off Across Blinkit & Zepto
            </p>
            <p className="text-xs text-slate-800 font-medium mt-1">
              Compare milk, atta, vegetables & snacks side-by-side in real time.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Explore now
              </button>
              <button
                type="button"
                onClick={onOpenShare}
                className="px-3.5 py-2 rounded-xl bg-white/90 hover:bg-white text-slate-900 font-black text-xs transition-all shadow-xs cursor-pointer"
              >
                Share Deal
              </button>
            </div>
          </div>

          <div className="absolute right-2 bottom-0 top-0 w-44 sm:w-60 flex items-center justify-center pointer-events-none opacity-90">
            <img
              src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80"
              alt="Grocery treats"
              className="w-36 h-36 sm:w-48 sm:h-48 object-cover rounded-2xl shadow-lg border-2 border-white/60 -rotate-6"
            />
          </div>
        </div>
      </div>

      {/* 7. TWO PROMO CARDS (Flat ₹50 / ₹100 Off & Free delivery at ₹149) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-100 border border-amber-300/80 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-xl bg-[#e01962] text-white text-center shadow-xs">
                <div className="text-[10px] font-bold leading-none">Flat</div>
                <div className="text-xs font-black">₹50 Off</div>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-[#e01962] text-white text-center shadow-xs">
                <div className="text-[10px] font-bold leading-none">Flat</div>
                <div className="text-xs font-black">₹100 Off</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-extrabold text-amber-950">on ₹999 / ₹1,999</div>
              <div className="text-[11px] font-black text-[#e01962]">Smart Split Savings</div>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-100 via-teal-100 to-emerald-200 border border-emerald-300/80 shadow-xs flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-700 text-white font-black text-xs shadow-xs">
                <span>🏷️ Free delivery</span>
              </div>
              <div className="text-base font-black text-emerald-950 mt-1">at ₹149</div>
              <div className="text-[10px] font-bold text-emerald-800">Zero platform & surge fee</div>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-white/80 border border-emerald-300 flex items-center justify-center text-xl shadow-xs shrink-0">
              🛵
            </div>
          </div>
        </div>
      </div>

      {/* 8. "Hey Gopagani, your quick picks" (Personalized Multi-Item 4-Grid Preview Cards) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 mb-7">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Hey {displayName}, your quick picks
          </h3>
          <span
            onClick={() => handleCategoryClick('all')}
            className="text-xs text-[#e01962] font-black hover:underline cursor-pointer"
          >
            See all
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
          {quickPickBundles.map((bundle) => (
            <button
              key={bundle.id}
              type="button"
              onClick={() => handleCategoryClick(bundle.id)}
              className="w-40 sm:w-48 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between shrink-0 text-left cursor-pointer group"
            >
              <div className="grid grid-cols-2 gap-1.5 mb-2.5">
                {bundle.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    {idx === 3 && (
                      <div className="absolute inset-0 bg-slate-950/65 flex items-center justify-center text-white font-black text-xs">
                        {bundle.countLabel}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="font-extrabold text-xs text-slate-900 truncate group-hover:text-[#e01962] transition-colors">
                {bundle.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 9. REAL INSTANT DELIVERY CAROUSELS ("MULTIPLE ITEMS IN ONE LINE") */}
      {instantDeliveryRows.map((row) => (
        <div key={row.id} className="max-w-7xl mx-auto px-3 sm:px-6 mb-7">
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>{row.title}</span>
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">{row.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => handleCategoryClick('all')}
              className="text-xs text-[#e01962] font-black hover:underline cursor-pointer shrink-0"
            >
              View All ↗
            </button>
          </div>

          {/* Multiple items side-by-side in one horizontal scrollable line */}
          <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2 pt-1">
            {row.items.map((product) => {
              const { price, mrp, platform, savings } = getLowestPrice(product);
              const qty = cartQuantities[product.id] || 0;

              return (
                <div
                  key={product.id}
                  className="w-36 sm:w-44 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between shrink-0"
                >
                  <div>
                    {/* Thumbnail + Delivery badge */}
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 mb-2">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-1 left-1 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-black px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5 text-amber-400" />
                        <span>8m</span>
                      </span>
                      {savings > 0 && (
                        <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-xs">
                          ₹{savings} OFF
                        </span>
                      )}
                    </div>

                    {/* Brand & Name */}
                    <div className="text-[9.5px] font-black uppercase tracking-wider text-slate-400">
                      {product.brand}
                    </div>
                    <h4 className="text-xs font-black text-slate-900 line-clamp-1 leading-snug">
                      {product.name}
                    </h4>
                    <div className="text-[10px] text-slate-500 font-semibold mb-2">
                      {product.unit}
                    </div>
                  </div>

                  {/* Pricing + Add Button */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                    <div>
                      <div className="text-sm font-black text-slate-900">₹{price}</div>
                      {mrp > price && (
                        <div className="text-[10px] text-slate-400 line-through">₹{mrp}</div>
                      )}
                    </div>

                    {/* 1-Tap Add to Basket / Quantity Stepper */}
                    {qty > 0 ? (
                      <div className="flex items-center rounded-xl bg-[#e01962] text-white font-black text-xs shadow-xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity?.(product.id, -1)}
                          className="px-1.5 py-1 hover:bg-[#c21453] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-1.5 text-[11px] font-black">{qty}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity?.(product.id, 1)}
                          className="px-1.5 py-1 hover:bg-[#c21453] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onAddToCart(product)}
                        className="px-3 py-1 rounded-xl bg-white border border-[#e01962] text-[#e01962] font-black text-xs hover:bg-pink-50 active:scale-95 transition-all shadow-2xs cursor-pointer"
                      >
                        + ADD
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

    </div>
  );
};
