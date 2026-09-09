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
  Activity,
  Heart,
  Headphones,
  Pill,
  Star,
  Eye,
  Sparkle
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
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  
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

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Top Maroon Festive Category Header (from screenshot: All | Ganeshotsav [New] | Electronics | Beauty | Pharmacy)
  const festiveTopCategories = [
    { id: 'all', label: 'All', icon: ShoppingBag, isNew: false },
    { id: 'festive', label: 'Ganeshotsav', icon: Sparkle, isNew: true },
    { id: 'electronics', label: 'Electronics', icon: Headphones, isNew: false },
    { id: 'beauty', label: 'Beauty', icon: Sparkles, isNew: false },
    { id: 'pharmacy', label: 'Pharmacy', icon: Pill, isNew: false },
  ];

  // Specific Festive Picks products matching user's uploaded screenshot (Mangal Murti, Backdrop, Modak mould, Camphor, Flowers)
  const festivePicksProducts: (Product & {
    isTrending?: boolean;
    isPriceDrop?: boolean;
    specs?: string[];
    rating?: number;
    reviewCount?: number;
    soldVelocity?: string;
    deliveryMins?: number;
    packLabel?: string;
  })[] = [
    {
      id: 'festive_ganesh_idol_8in',
      name: 'Mangal Murti Mitti Ganesh Idol Svasti',
      brand: 'Svasti',
      category: 'festive' as any,
      price: 499,
      mrp: 780,
      unit: '1 pc',
      packLabel: '1 pc',
      imageUrl: 'https://images.unsplash.com/photo-1567591414240-e144c9ecf889?auto=format&fit=crop&w=400&q=80',
      isTrending: true,
      specs: ['8"', 'Clay'],
      rating: 4.8,
      reviewCount: 845,
      deliveryMins: 8,
      isPriceDrop: false,
      offers: generateStoreOffers(499, 780, 'Mitti Ganesh Idol'),
    },
    {
      id: 'festive_backdrop_kit',
      name: 'Festive Backdrop Decoration Kit for Ganesh Chaturthi',
      brand: 'Picfest',
      category: 'festive' as any,
      price: 449,
      mrp: 969,
      unit: '1 set (7 pcs)',
      packLabel: '1 set • 7 pcs',
      imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
      isTrending: true,
      isPriceDrop: true,
      specs: ['Plastic', '4 x 8 ft'],
      rating: 4.1,
      reviewCount: 845,
      soldVelocity: '1k+ sold last week',
      deliveryMins: 27,
      offers: generateStoreOffers(449, 969, 'Festive Backdrop Decoration Kit'),
    },
    {
      id: 'festive_modak_mould_yellow',
      name: '4 Cavity Modak Mould (Yellow) - Picfest',
      brand: 'Picfest',
      category: 'festive' as any,
      price: 99,
      mrp: 299,
      unit: '1 pc',
      packLabel: '1 pc',
      imageUrl: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80',
      isTrending: true,
      isPriceDrop: true,
      specs: ['5.1" x 1.3" x 1.9"'],
      rating: 4.3,
      reviewCount: 29,
      deliveryMins: 8,
      offers: generateStoreOffers(99, 299, 'Modak Mould 4 Cavity'),
    },
    {
      id: 'festive_bhimseni_kapoor',
      name: 'Mangal Aarti Pure Bhimseni Camphor Tablets',
      brand: 'Mangaldeep',
      category: 'festive' as any,
      price: 55,
      mrp: 75,
      unit: '50g',
      packLabel: '50g',
      imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80',
      isTrending: false,
      isPriceDrop: false,
      specs: ['Pure Camphor', 'Smoke Free'],
      rating: 4.7,
      reviewCount: 1240,
      deliveryMins: 8,
      offers: generateStoreOffers(55, 75, 'Bhimseni Camphor'),
    },
    {
      id: 'festive_fresh_marigold_mala',
      name: 'Farm Fresh Yellow Marigold Garland (Puja Mala)',
      brand: 'Direct Mandi',
      category: 'festive' as any,
      price: 40,
      mrp: 60,
      unit: '1 pc (3 ft)',
      packLabel: '1 pc',
      imageUrl: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=400&q=80',
      isTrending: true,
      isPriceDrop: true,
      specs: ['Fresh Farm', 'Daily Harvest'],
      rating: 4.6,
      reviewCount: 520,
      deliveryMins: 8,
      offers: generateStoreOffers(40, 60, 'Yellow Marigold Garland'),
    },
    {
      id: 'festive_cycle_agarbatti',
      name: 'Cycle Pure Sandalwood & Champa Agarbatti Pack',
      brand: 'Cycle',
      category: 'festive' as any,
      price: 65,
      mrp: 85,
      unit: '1 box',
      packLabel: '1 box',
      imageUrl: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=400&q=80',
      isTrending: false,
      isPriceDrop: false,
      specs: ['Sandalwood', '100% Herbal'],
      rating: 4.8,
      reviewCount: 2430,
      deliveryMins: 8,
      offers: generateStoreOffers(65, 85, 'Cycle Pure Agarbatti'),
    },
  ];

  // Frequently Bought Bundles (Exact match to screenshot with 2 photos side by side and '+X more' badge)
  const frequentlyBoughtCategories = [
    {
      id: 'veggies',
      title: 'Vegetables & Fruits',
      badge: '+9 more',
      img1: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=150&q=80',
      img2: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=150&q=80',
      bgColor: 'bg-emerald-50/70 border-emerald-200/80',
    },
    {
      id: 'staples',
      title: 'Oil, Ghee & Masala',
      badge: '+2 more',
      img1: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=150&q=80',
      img2: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80',
      bgColor: 'bg-amber-50/70 border-amber-200/80',
    },
    {
      id: 'snacks',
      title: 'Chips & Namkeen',
      badge: '+6 more',
      img1: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=150&q=80',
      img2: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281061?auto=format&fit=crop&w=150&q=80',
      bgColor: 'bg-sky-50/70 border-sky-200/80',
    },
    {
      id: 'dairy',
      title: 'Daily Dairy & Bread',
      badge: '+8 more',
      img1: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=150&q=80',
      img2: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80',
      bgColor: 'bg-rose-50/70 border-rose-200/80',
    },
    {
      id: 'staples_grain',
      title: 'Atta, Rice & Dal',
      badge: '+5 more',
      img1: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=150&q=80',
      img2: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=150&q=80',
      bgColor: 'bg-yellow-50/70 border-yellow-200/80',
    },
  ];

  // Instant Delivery Rows for Horizontal Scrolling ("multiple items in one line")
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
    const valid = Object.values(product.offers || {}).filter((o) => o && o.inStock);
    if (!valid.length) {
      const p = product.price || 35;
      const m = product.mrp || p;
      return { price: p, mrp: m, platform: 'zepto' as PlatformId, savings: Math.max(0, m - p) };
    }
    const lowest = valid.reduce((min, o) => (o.price < min.price ? o : min), valid[0]);
    const m = lowest.mrp || lowest.price;
    const savings = Math.max(0, m - lowest.price);
    return { price: lowest.price, mrp: m, platform: lowest.platform as PlatformId, savings };
  };

  const handleCategoryClick = (catId: string) => {
    setActiveCategoryPill(catId);
    onSelectCategory(catId);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Sample thumbnail for floating button
  const sampleCartThumb = 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=80&q=80';

  return (
    <div className="w-full max-w-full overflow-hidden bg-white pb-14 pt-0">
      
      {/* 1. TOP MAROON HEADER: SEARCH + CATEGORIES (1:1 from media_1788979980020.jpg) */}
      <div className="bg-[#480b0b] text-white pt-2 pb-3 px-3 sm:px-6 shadow-md">
        
        {/* Search Bar with Soundwave / Mic Icon */}
        <div className="max-w-7xl mx-auto mb-3">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for atta, dal, coke and more"
              className="w-full bg-white rounded-2xl py-2.5 pl-10 pr-12 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none shadow-inner"
            />
            {/* Soundwave Mic Button */}
            <button
              type="button"
              onClick={() => onSearchChange(searchQuery ? '' : 'Amul Milk')}
              className="absolute right-2 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-emerald-700 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
              title="Voice Search"
            >
              <div className="flex items-center gap-0.5 px-0.5">
                <span className="w-0.5 h-2.5 bg-emerald-700 rounded-full" />
                <span className="w-0.5 h-4 bg-emerald-700 rounded-full animate-pulse" />
                <span className="w-0.5 h-3 bg-emerald-700 rounded-full" />
                <span className="w-0.5 h-4 bg-emerald-700 rounded-full animate-pulse" />
                <span className="w-0.5 h-2 bg-emerald-700 rounded-full" />
              </div>
            </button>
          </div>
        </div>

        {/* Maroon Category Pills Bar (All | Ganeshotsav [New] | Electronics | Beauty | Pharmacy) */}
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1 overflow-x-auto scrollbar-none px-1 text-center">
          {festiveTopCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategoryPill === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className="relative flex flex-col items-center gap-1 min-w-[62px] py-1 cursor-pointer group shrink-0"
              >
                {cat.isNew && (
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-[#ff2e63] text-white text-[8.5px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-tighter shadow-xs animate-bounce">
                    New
                  </span>
                )}
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-white/20 scale-110' : 'group-hover:bg-white/10'}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10.5px] font-bold text-white tracking-tight leading-none">
                  {cat.label}
                </span>
                {isActive && (
                  <div className="w-4 h-0.5 bg-amber-400 rounded-full mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. ADDRESS / LOCATION BAR & 7 MIN SPEED PILL */}
      <div className="bg-amber-50/80 border-b border-amber-100/80 px-3 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={onOpenLocationModal}
            className="flex items-center gap-1.5 text-xs text-left min-w-0 flex-1 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <span className="font-black text-slate-900 flex items-center gap-1 shrink-0">
              <span>🏠 HOME</span>
            </span>
            <span className="text-slate-600 truncate font-semibold">
              {selectedArea || selectedCity.popularAreas[0] || 'Ameerpet'}, {selectedCity.name}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          <div className="px-2.5 py-1 rounded-full bg-[#7c004d] text-white font-black text-xs flex items-center gap-1 shrink-0 shadow-xs">
            <span className="text-xs leading-none">⚡ 7</span>
            <span className="text-[9px] font-bold uppercase tracking-wider">min</span>
          </div>
        </div>
      </div>

      {/* 3. LIVE PRICE DROP TELEMETRY TICKER */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 my-2.5">
        <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900 text-white border border-emerald-500/40 flex items-center justify-between gap-2 shadow-xs text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <div className="truncate text-[11px] font-semibold text-slate-200">
              {liveUpdatesList[liveUpdateIndex].text}
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[9px] text-slate-400 font-mono hidden sm:inline">
              {lastSyncSec}s ago
            </span>
            <button
              type="button"
              onClick={onTriggerLiveRefresh}
              className="px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 font-black text-[9px] hover:bg-emerald-400 transition-colors active:scale-95 cursor-pointer"
            >
              Sync
            </button>
          </div>
        </div>
      </div>

      {/* 4. FESTIVE PICKS SCALLOPED SECTION & HORIZONTAL CAROUSEL (1:1 from user screenshot) */}
      <div className="mt-2 mb-4 bg-gradient-to-b from-[#fff6e5] via-[#fffbf2] to-white pt-3 pb-4 border-t border-amber-200/50">
        
        {/* Scalloped Floral Header: 🌺 Festive Picks 🌺 */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 mb-3 text-center relative">
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg">🌸</span>
            <h2 className="text-xl sm:text-2xl font-black text-[#963816] tracking-tight font-serif">
              Festive Picks
            </h2>
            <span className="text-lg">🌺</span>
          </div>
          <p className="text-[11px] text-amber-900/80 font-medium mt-0.5">
            Ganesh Chaturthi idols, modak moulds & pooja essentials delivered in 8 mins
          </p>
        </div>

        {/* Horizontal Scroll Product Cards ("scroll and multiple in one line") */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2 pt-1">
            {festivePicksProducts.map((product) => {
              const qty = cartQuantities[product.id] || 0;
              const isWished = wishlist[product.id];
              const pPrice = product.price || 0;
              const pMrp = product.mrp || pPrice;
              const discount = Math.max(0, pMrp - pPrice);

              return (
                <div
                  key={product.id}
                  className="w-40 sm:w-44 bg-white rounded-2xl border border-slate-200 p-2.5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between shrink-0 text-left"
                >
                  <div>
                    {/* Image Area with Trending Tag, Wishlist Heart, and Carousel Dots */}
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 mb-2">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      
                      {product.isTrending && (
                        <span className="absolute top-1.5 left-1.5 bg-pink-50/95 text-pink-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md border border-pink-200/80 shadow-2xs">
                          Trending
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={(e) => toggleWishlist(product.id, e)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-400 hover:text-red-500 shadow-xs transition-colors cursor-pointer"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${isWished ? 'fill-red-500 text-red-500' : ''}`}
                        />
                      </button>

                      <div className="absolute bottom-1.5 left-2 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                        <span className="w-1 h-1 rounded-full bg-slate-400/80" />
                        <span className="w-1 h-1 rounded-full bg-slate-400/80" />
                      </div>
                    </div>

                    {/* Unit / Pack size & Green ADD button row */}
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-[11px] font-bold text-slate-600">
                        {product.packLabel || product.unit}
                      </span>

                      {qty > 0 ? (
                        <div className="flex items-center rounded-lg bg-emerald-700 text-white font-black text-xs shadow-xs">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity?.(product.id, -1)}
                            className="px-1.5 py-0.5 hover:bg-emerald-800 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-1 text-[11px] font-black">{qty}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity?.(product.id, 1)}
                            className="px-1.5 py-0.5 hover:bg-emerald-800 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onAddToCart(product)}
                          className="px-3 py-1 rounded-lg border border-emerald-600 text-emerald-700 font-black text-xs hover:bg-emerald-50 active:scale-95 transition-all shadow-2xs bg-white cursor-pointer"
                        >
                          ADD
                        </button>
                      )}
                    </div>

                    {/* Price row + Price Drop / ₹OFF Tag */}
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-base font-black text-slate-900">₹{product.price}</span>
                      <span className="text-xs text-slate-400 line-through">₹{product.mrp}</span>
                    </div>

                    <div className="mb-1.5">
                      {product.isPriceDrop ? (
                        <span className="inline-block bg-[#ffea79] text-amber-950 text-[9px] font-black px-1.5 py-0.5 rounded border border-dashed border-amber-400 uppercase tracking-tight">
                          🏷️ Price Drop
                        </span>
                      ) : (
                        <span className="inline-block bg-sky-50 text-sky-700 text-[9.5px] font-black px-1.5 py-0.5 rounded border border-sky-200">
                          ₹{discount} OFF
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug mb-1.5">
                      {product.name}
                    </h4>

                    {product.specs && (
                      <div className="flex flex-wrap gap-1 mb-1.5">
                        {product.specs.map((s, i) => (
                          <span
                            key={i}
                            className="text-[9.5px] font-semibold bg-amber-50 text-amber-900 border border-amber-200/60 rounded px-1.5 py-0.2"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-col gap-0.5 text-[10px] text-slate-500 font-medium mb-2">
                      {product.rating && (
                        <div className="flex items-center gap-1">
                          <span className="text-amber-500 font-bold">⭐ {product.rating}</span>
                          <span>({product.reviewCount})</span>
                        </div>
                      )}
                      {product.soldVelocity && (
                        <div className="flex items-center gap-1 text-slate-600">
                          <Eye className="w-2.5 h-2.5 text-slate-400" />
                          <span>{product.soldVelocity}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-slate-600 font-semibold">
                        <Clock className="w-2.5 h-2.5 text-amber-500" />
                        <span>{product.deliveryMins || 8} mins</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCategoryClick('festive')}
                    className="w-full py-1 px-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center justify-center gap-0.5 transition-colors cursor-pointer mt-1"
                  >
                    <span>See more like this</span>
                    <ChevronRight className="w-3 h-3 text-emerald-700" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. EXCLUSIVE PAYMENT OFFERS STRIP (1:1 from user screenshot) */}
      <div className="bg-[#fef7ea] border-y border-amber-200/70 py-2.5 px-3 sm:px-6 mb-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none text-xs">
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-black text-[10px] uppercase tracking-wider text-slate-800">
              EXCLUSIVE PAYMENT OFFERS
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2 py-0.5 rounded bg-[#97144d] text-white font-black text-[9px] uppercase shadow-2xs">
              AXIS BANK
            </span>
            <span className="px-2 py-0.5 rounded bg-[#002f6c] text-white font-black text-[9px] uppercase shadow-2xs">
              RBL Bank
            </span>
            <span className="px-2 py-0.5 rounded bg-[#1a1f71] text-white font-black text-[9px] uppercase shadow-2xs">
              VISA
            </span>
            <span className="px-2 py-0.5 rounded bg-[#e31837] text-white font-black text-[9px] uppercase shadow-2xs">
              YES BANK
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </div>
        </div>
      </div>

      {/* 6. FREQUENTLY BOUGHT (1:1 from user screenshot with 2-item preview cards and '+X more' badge) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Frequently bought
          </h3>
          <span
            onClick={() => handleCategoryClick('all')}
            className="text-xs text-emerald-700 font-bold hover:underline cursor-pointer"
          >
            See all products ↗
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
          {frequentlyBoughtCategories.map((bundle) => (
            <button
              key={bundle.id}
              type="button"
              onClick={() => handleCategoryClick(bundle.id)}
              className={`w-44 sm:w-52 p-3 rounded-2xl border ${bundle.bgColor} shadow-xs hover:shadow-md transition-all flex flex-col justify-between shrink-0 text-center cursor-pointer group`}
            >
              <div className="relative mb-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-200/80 shadow-2xs">
                    <img
                      src={bundle.img1}
                      alt={bundle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-200/80 shadow-2xs">
                    <img
                      src={bundle.img2}
                      alt={bundle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                </div>

                <div className="flex justify-center -mt-2 relative z-10">
                  <span className="bg-white/95 text-emerald-800 text-[9.5px] font-black px-2 py-0.5 rounded-full border border-emerald-300 shadow-xs">
                    {bundle.badge}
                  </span>
                </div>
              </div>

              <div className="font-extrabold text-xs text-slate-900 group-hover:text-emerald-800 transition-colors mt-1">
                {bundle.title}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-3">
          <button
            type="button"
            onClick={() => handleCategoryClick('all')}
            className="w-full py-2 px-3 rounded-2xl bg-teal-50/80 hover:bg-teal-100 border border-teal-200/70 flex items-center justify-center gap-2 transition-all cursor-pointer text-slate-800 shadow-2xs"
          >
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=60&q=80"
                className="w-5 h-5 rounded-full border border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=60&q=80"
                className="w-5 h-5 rounded-full border border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=60&q=80"
                className="w-5 h-5 rounded-full border border-white object-cover"
              />
            </div>
            <span className="text-xs font-black text-emerald-900">See all products</span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-800" />
          </button>
        </div>
      </div>

      {/* 7. REAL INSTANT DELIVERY PRODUCTS FOR HORIZONTAL ROWS ("MULTIPLE ITEMS IN ONE LINE") */}
      {instantDeliveryRows.map((row) => (
        <div key={row.id} className="max-w-7xl mx-auto px-3 sm:px-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>{row.title}</span>
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">{row.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => handleCategoryClick('all')}
              className="text-xs text-emerald-700 font-black hover:underline cursor-pointer shrink-0"
            >
              View All ↗
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2 pt-1">
            {row.items.map((product) => {
              const { price, mrp, platform, savings } = getLowestPrice(product);
              const qty = cartQuantities[product.id] || 0;

              return (
                <div
                  key={product.id}
                  className="w-36 sm:w-44 bg-white rounded-2xl border border-slate-200 p-2.5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between shrink-0"
                >
                  <div>
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

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                    <div>
                      <div className="text-sm font-black text-slate-900">₹{price}</div>
                      {(mrp || 0) > (price || 0) && (
                        <div className="text-[10px] text-slate-400 line-through">₹{mrp}</div>
                      )}
                    </div>

                    {qty > 0 ? (
                      <div className="flex items-center rounded-lg bg-emerald-700 text-white font-black text-xs shadow-xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity?.(product.id, -1)}
                          className="px-1.5 py-0.5 hover:bg-emerald-800 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-1 text-[11px] font-black">{qty}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity?.(product.id, 1)}
                          className="px-1.5 py-0.5 hover:bg-emerald-800 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onAddToCart(product)}
                        className="px-3 py-1 rounded-lg border border-emerald-600 text-emerald-700 font-black text-xs hover:bg-emerald-50 active:scale-95 transition-all shadow-2xs bg-white cursor-pointer"
                      >
                        ADD
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* 8. FLOATING GREEN "VIEW CART" PILL (1:1 from user screenshot) */}
      {totalCartItemCount > 0 && (
        <div className="fixed bottom-16 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-300">
          <button
            type="button"
            onClick={onOpenCart}
            className="pointer-events-auto bg-[#15803d] hover:bg-[#166534] text-white shadow-2xl rounded-full px-4 py-2.5 flex items-center gap-3 transition-all active:scale-95 cursor-pointer max-w-xs w-full justify-between border border-emerald-500/50"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white overflow-hidden p-0.5 shadow-xs shrink-0">
                <img
                  src={sampleCartThumb}
                  alt="Cart product"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="text-left leading-tight">
                <div className="text-xs font-black">View cart</div>
                <div className="text-[10px] text-emerald-200 font-bold">
                  {totalCartItemCount} {totalCartItemCount === 1 ? 'item' : 'items'}
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white shrink-0" />
          </button>
        </div>
      )}

    </div>
  );
};
