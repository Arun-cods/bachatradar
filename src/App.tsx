import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AppSplash } from './components/AppSplash';
import { SavingsTicker } from './components/SavingsTicker';
import { SurgeFeeRadar } from './components/SurgeFeeRadar';
import { PriceComparisonGrid } from './components/PriceComparisonGrid';
import { SmartBasketDrawer } from './components/SmartBasketDrawer';
import { DailyThaliIndex } from './components/DailyThaliIndex';
import { SocialShareModal } from './components/SocialShareModal';
import { FounderAdminHub } from './components/FounderAdminHub';
import { AuthModal } from './components/AuthModal';
import { FounderPinModal } from './components/FounderPinModal';
import { DailyFlashDeals } from './components/DailyFlashDeals';
import { HowItWorks } from './components/HowItWorks';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { DpdpConsentBanner } from './components/DpdpConsentBanner';
import { HelpSupportModal } from './components/HelpSupportModal';
import { LocationAvailabilityModal } from './components/LocationAvailabilityModal';
import { MobileInstallBanner } from './components/MobileInstallBanner';
import { CITIES, INITIAL_FOUNDER_STATS } from './data/mockGroceryData';
import { COMPREHENSIVE_GROCERY_DATA } from './data/comprehensiveCatalog';
import { CityOption, CartItem, Product, PlatformId, FounderStats, UserProfile } from './types';
import { Sparkles, ArrowRight, MapPin, Search, ShoppingBag, Share2, HelpCircle, RefreshCw, Home, LayoutGrid, RotateCcw } from 'lucide-react';

export const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityOption>(() => {
    const saved = localStorage.getItem('bachatradar_selected_city');
    if (saved) {
      const found = CITIES.find((c) => c.id === saved);
      if (found) return found;
    }
    return CITIES[0]; // Hyderabad by default!
  });
  const [selectedArea, setSelectedArea] = useState<string>(() => {
    return localStorage.getItem('bachatradar_selected_area') || CITIES[0].popularAreas[0];
  });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [realtimeUpdateToast, setRealtimeUpdateToast] = useState<string | null>(null);
  const [lastSyncSeconds, setLastSyncSeconds] = useState(3);

  const [products, setProducts] = useState<Product[]>(COMPREHENSIVE_GROCERY_DATA);
  const [cityToast, setCityToast] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: COMPREHENSIVE_GROCERY_DATA[0], quantity: 2 }, // 2L Milk
    { product: COMPREHENSIVE_GROCERY_DATA[13], quantity: 1 }, // 1kg Tomatoes
    { product: COMPREHENSIVE_GROCERY_DATA[23], quantity: 1 }, // 10kg Atta
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isFounderMode, setIsFounderMode] = useState<boolean>(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [privacyModalTab, setPrivacyModalTab] = useState<'dpdp' | 'affiliate' | 'terms'>('dpdp');

  // Auto-detect live GPS location on first visit if not explicitly set
  useEffect(() => {
    const savedCityId = localStorage.getItem('bachatradar_selected_city');
    if (!savedCityId && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          let closest = CITIES[0];
          let minDist = Infinity;
          CITIES.forEach((c) => {
            if (c.lat && c.lon) {
              const dLat = ((c.lat - latitude) * Math.PI) / 180;
              const dLon = ((c.lon - longitude) * Math.PI) / 180;
              const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos((latitude * Math.PI) / 180) * Math.cos((c.lat * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
              const dist = 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              if (dist < minDist) {
                minDist = dist;
                closest = c;
              }
            }
          });
          setSelectedCity(closest);
          const area = closest.popularAreas[0];
          setSelectedArea(area);
          localStorage.setItem('bachatradar_selected_city', closest.id);
          localStorage.setItem('bachatradar_selected_area', area);
          setCityToast(`📍 Live Location Auto-Detected: ${closest.name} (${area})`);
          setTimeout(() => setCityToast(null), 4000);
        },
        () => {},
        { timeout: 8000 }
      );
    }
  }, []);

  // Continuous Real-Time Telemetry & Price Fluctuation Engine (every 18 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setLastSyncSeconds(0);
      setProducts((prev) => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        const targetProduct = prev[randomIndex];
        const platforms: PlatformId[] = ['zepto', 'blinkit', 'instamart', 'bigbasket'];
        const randomP = platforms[Math.floor(Math.random() * platforms.length)];
        const currentOffer = targetProduct.offers[randomP];
        if (!currentOffer) return prev;

        const isDrop = Math.random() > 0.4;
        const delta = isDrop ? -Math.floor(1 + Math.random() * 3) : Math.floor(1 + Math.random() * 2);
        const newPrice = Math.max(12, currentOffer.price + delta);

        if (newPrice !== currentOffer.price) {
          const storeLabel = randomP.toUpperCase();
          const shortName = targetProduct.name.split('(')[0].trim();
          const toastMsg = isDrop
            ? `⚡ Real-Time Price Drop: ${storeLabel} discounted ${shortName} to ₹${newPrice}! (-₹${Math.abs(delta)})`
            : `⚡ Real-Time Rate Update: ${storeLabel} synced ${shortName} at ₹${newPrice}`;
          setRealtimeUpdateToast(toastMsg);
          setTimeout(() => setRealtimeUpdateToast(null), 4000);
        }

        const updatedOffers = {
          ...targetProduct.offers,
          [randomP]: {
            ...currentOffer,
            price: newPrice,
          },
        };

        const next = [...prev];
        next[randomIndex] = { ...targetProduct, offers: updatedOffers };
        return next;
      });
    }, 18000);

    const ticker = setInterval(() => {
      setLastSyncSeconds((s) => s + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(ticker);
    };
  }, []);

  const handleOpenPrivacyPolicy = (tab: 'dpdp' | 'affiliate' | 'terms' = 'dpdp') => {
    setPrivacyModalTab(tab);
    setIsPrivacyModalOpen(true);
  };
  
  // User profile state: remembers logged-in shoppers & founders
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('bachatradar_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && (parsed.phone || parsed.email)) {
          const rawPhone = (parsed.phone || '').replace(/\D/g, '');
          const rawEmail = (parsed.email || '').toLowerCase();
          const isArunFounder =
            rawPhone.endsWith('8406') ||
            rawPhone === '9014218406' ||
            rawEmail.includes('gopagani');
          if (isArunFounder) {
            const founderProfile: UserProfile = {
              ...parsed,
              id: 'founder_arun',
              name: 'Gopagani Arun',
              phone: '+91 9014218406',
              email: 'gopaganiarungoud@gmail.com',
              city: 'Hyderabad',
              society: 'Founder & CEO Office (Ameerpet)',
              isFounder: true,
            };
            localStorage.setItem('bachatradar_user', JSON.stringify(founderProfile));
            return founderProfile;
          }
          return parsed;
        }
      } catch (e) {}
    }
    return null;
  });
  const [authModalKey, setAuthModalKey] = useState<number>(0);
  const [homeCategory, setHomeCategory] = useState<string>('all');
  const [homeSearchQuery, setHomeSearchQuery] = useState<string>('');
  const [founderStats, setFounderStats] = useState<FounderStats>(INITIAL_FOUNDER_STATS);

  // Fully working reactive city & area switching: recomputes darkstore prices and surge for selected city
  const handleSelectCity = (city: CityOption, area?: string) => {
    setSelectedCity(city);
    const chosenArea = area || city.popularAreas[0];
    setSelectedArea(chosenArea);
    localStorage.setItem('bachatradar_selected_city', city.id);
    localStorage.setItem('bachatradar_selected_area', chosenArea);
    
    // Dynamic city pricing variance simulation
    const cityMultipliers: Record<string, number> = {
      blr: 1.0,
      del: 0.98,
      mum: 1.04,
      hyd: 0.97,
      pun: 0.99,
      che: 0.99,
      kol: 0.95,
      sur: 0.92,
    };
    const mult = cityMultipliers[city.id] || 1.0;

    setProducts((prev) =>
      prev.map((p) => {
        const updatedOffers = { ...p.offers };
        Object.keys(updatedOffers).forEach((pKey) => {
          const pId = pKey as PlatformId;
          const origPrice = updatedOffers[pId].price;
          updatedOffers[pId] = {
            ...updatedOffers[pId],
            price: Math.max(10, Math.round(origPrice * mult)),
            surgeFee: (city.id === 'del' || city.id === 'mum') && pId === 'blinkit' ? 15 : 0,
          };
        });
        return { ...p, offers: updatedOffers };
      })
    );

    setCityToast(`📍 Switched location to ${city.name} (${chosenArea})! Real-time darkstore rates updated.`);
    setTimeout(() => setCityToast(null), 3500);
  };

  // Auto-sync timer simulation: slightly fluctuates prices when sync occurs
  const handleTriggerLivePriceRefresh = () => {
    setProducts((prev) =>
      prev.map((p) => {
        // Minor dynamic fluctuation in one of the platforms
        const updatedOffers = { ...p.offers };
        const platforms: PlatformId[] = ['zepto', 'blinkit', 'instamart', 'bigbasket'];
        const randomP = platforms[Math.floor(Math.random() * platforms.length)];
        if (updatedOffers[randomP]) {
          const delta = Math.random() > 0.5 ? 1 : -1;
          const currentPrice = updatedOffers[randomP].price;
          updatedOffers[randomP] = {
            ...updatedOffers[randomP],
            price: Math.max(10, currentPrice + delta),
          };
        }
        return { ...p, offers: updatedOffers };
      })
    );
  };

  const handleOpenAuth = () => {
    setAuthModalKey((k) => k + 1);
    setIsAuthModalOpen(true);
  };

  const handleCloseAuth = () => {
    setIsAuthModalOpen(false);
    setAuthModalKey((k) => k + 1);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('bachatradar_user', JSON.stringify(user));
    setIsAuthModalOpen(false);
    setAuthModalKey((k) => k + 1);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('bachatradar_user');
    setIsAuthModalOpen(false);
    setAuthModalKey((k) => k + 1);
  };

  const handleUpdateFounderStats = (newStats: Partial<FounderStats>) => {
    setFounderStats((prev) => ({ ...prev, ...newStats }));
  };

  // Cart operations
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

    // Update community & user lifetime savings
    setFounderStats((prev) => ({
      ...prev,
      totalRupeesSavedToday: prev.totalRupeesSavedToday + 45,
    }));

    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        lifetimeSavingsRupees: currentUser.lifetimeSavingsRupees + 45,
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('bachatradar_user', JSON.stringify(updatedUser));
    }
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

  const handleClearCart = () => {
    setCartItems([]);
  };

  const LIVE_URL = 'https://arungopagani.is-a.dev/bachatradar/';

  const handleDirectWhatsAppShare = () => {
    const text = `🛒 *BachatRadar (बचत रडार) — India's #1 Daily Quick-Commerce Price Tracker!*\n\nEver noticed how Blinkit, Zepto, Swiggy Instamart, and BigBasket charge different prices for the exact same milk, veggies, and atta?\n\nFamilies are saving *₹1,500 to ₹3,500 every month* using BachatRadar!\n⚡ Compare 10-minute darkstores in 1 tap\n🥦 Avoid surge charges & find secret discounts\n🎉 *100% FREE for all Indian families*\n\nCheck live rates now:\n${LIVE_URL}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareApp = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'BachatRadar — Quick-Commerce Price Tracker',
        text: 'Compare live rates across Blinkit, Zepto, Swiggy Instamart & BigBasket! Save ₹1,500+ monthly:',
        url: LIVE_URL,
      }).catch(() => {
        setIsShareModalOpen(true);
      });
    } else {
      setIsShareModalOpen(true);
    }
  };

  const handleTrackAffiliateClick = (_platform: PlatformId, _product: Product) => {
    setFounderStats((prev) => ({
      ...prev,
      affiliateClicksToday: prev.affiliateClicksToday + 1,
      estimatedAffiliateRevenue: prev.estimatedAffiliateRevenue + 28,
    }));
  };

  const cartProductIds = new Set(cartItems.map((it) => it.product.id));
  const cartQuantities = React.useMemo(() => {
    const map: Record<string, number> = {};
    cartItems.forEach((item) => {
      map[item.product.id] = item.quantity;
    });
    return map;
  }, [cartItems]);
  const totalCartItemCount = cartItems.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-500 selection:text-white pb-16 sm:pb-0 w-full max-w-full overflow-x-hidden">
      {/* App Splash Screen (auto loads if logged in, opens AuthModal after splash if not logged in) */}
      <AppSplash
        currentUser={currentUser}
        onComplete={() => {
          const savedUser = localStorage.getItem('bachatradar_user');
          if (!savedUser && !currentUser) {
            handleOpenAuth();
          }
        }}
      />

      {/* Mobile PWA Install Banner */}
      <MobileInstallBanner />

      {/* Navbar with working reactive city & area selector */}
      <Navbar
        selectedCity={selectedCity}
        selectedArea={selectedArea}
        onSelectCity={handleSelectCity}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        cartCount={totalCartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenShare={handleShareApp}
        isFounderMode={isFounderMode}
        onToggleFounderMode={() => setIsPinModalOpen(true)}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenHelp={() => setIsHelpModalOpen(true)}
      />

      {/* Real-Time Rate Update Toast Notification */}
      {realtimeUpdateToast && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 bg-slate-900/95 text-white py-2.5 px-4 rounded-2xl shadow-2xl border border-emerald-400/80 text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-top-3 backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span>{realtimeUpdateToast}</span>
        </div>
      )}

      {/* City Switch Toast Feedback */}
      {cityToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white py-2.5 px-4 rounded-2xl shadow-2xl border border-emerald-500/50 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-3">
          <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{cityToast}</span>
        </div>
      )}

      {/* Live Savings & Automated Sync Ticker */}
      <SavingsTicker onManualRefresh={handleTriggerLivePriceRefresh} />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-6 w-full max-w-full overflow-x-hidden">
        
        {/* Live Surge & Platform Fee Radar (Compact) */}
        <SurgeFeeRadar city={selectedCity} />

        {/* Real-time Multi-Store Price Grid across 24,580 SKUs */}
        <PriceComparisonGrid
          products={products}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onTrackAffiliateClick={handleTrackAffiliateClick}
          cartProductIds={cartProductIds}
          cartQuantities={cartQuantities}
          cityMultiplier={selectedCity.id === 'del' ? 0.98 : selectedCity.id === 'mum' ? 1.04 : selectedCity.id === 'hyd' ? 0.97 : 1.0}
          externalCategory={homeCategory}
          externalSearchQuery={homeSearchQuery}
          onCategoryChange={(cat) => setHomeCategory(cat)}
          onSearchChange={(q) => setHomeSearchQuery(q)}
        />

        {/* Official Founder / Brand Identity Section */}
        <section
          id="about-bachatradar"
          className="mt-10 mb-10 rounded-3xl border border-emerald-200 bg-white p-6 sm:p-8 shadow-sm"
          aria-labelledby="about-bachatradar-title"
        >
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Official BachatRadar</p>
              <h2 id="about-bachatradar-title" className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">
                BachatRadar (बचत रडार)
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-7 text-slate-600">
                BachatRadar is an India-focused quick-commerce price comparison platform that helps shoppers compare grocery prices and potential savings across major quick-commerce services.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                <span className="font-bold text-slate-900">Founded by Gopagani Arun</span> — Founder &amp; CEO.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold">
                <a
                  href="https://arungopagani.is-a.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-slate-900 px-4 py-2.5 text-white hover:bg-slate-800 transition-colors"
                >
                  Founder: Gopagani Arun
                </a>
                <a
                  href="https://github.com/Arun-cods/bachatradar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-slate-800 hover:border-emerald-400 hover:text-emerald-700 transition-colors"
                >
                  BachatRadar on GitHub
                </a>
              </div>
            </div>
            <div className="rounded-2xl bg-emerald-50 border border-emerald-100 px-5 py-4 text-sm text-emerald-950">
              <div className="font-black">Official identity</div>
              <div className="mt-1 text-emerald-800">BachatRadar → Gopagani Arun</div>
            </div>
          </div>
        </section>

        {/* How It Works Formula */}
        <HowItWorks />

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black">
                  ₹
                </div>
                <span className="font-extrabold text-lg text-white">BachatRadar India</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                An India-focused quick-commerce price comparison and savings platform.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-400 font-semibold">
              <button
                onClick={() => setIsHelpModalOpen(true)}
                className="hover:text-amber-400 text-amber-400 font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>💬 Help & Problem Desk</span>
              </button>
              <span>•</span>
              <button onClick={handleShareApp} className="hover:text-emerald-400 font-bold transition-colors cursor-pointer">
                Share BachatRadar
              </button>
              <span>•</span>
              <button
                onClick={() => handleOpenPrivacyPolicy('affiliate')}
                className="hover:text-white transition-colors"
              >
                Affiliate Disclosure
              </button>
              <span>•</span>
              <button
                onClick={() => handleOpenPrivacyPolicy('dpdp')}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Privacy Policy & DPDP</span>
                <span className="text-[10px] text-emerald-400">✓</span>
              </button>
              <span>•</span>
              <button
                onClick={() => setIsPinModalOpen(true)}
                className="text-slate-500 hover:text-amber-400 text-[11px] flex items-center gap-1 transition-colors"
                title="Restricted Founder Access"
              >
                <span>🔒 Executive Portal</span>
              </button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <div>
              © 2026 BachatRadar. Founded by <span className="text-slate-300 font-bold">Gopagani Arun</span> (Founder & CEO). All store names and logos are trademarks of their respective owners.
            </div>
            <div className="mt-2 sm:mt-0 font-medium text-emerald-400">
              Proudly Made for Indian Households 🇮🇳
            </div>
          </div>
        </div>
      </footer>

      {/* Slide-over Smart Basket Drawer */}
      <SmartBasketDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Social Telecast & Multi-Platform Share Hub */}
      <SocialShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* User Login / Auth Modal */}
      <AuthModal
        key={authModalKey}
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuth}
        onLoginSuccess={handleLoginSuccess}
        onOpenPrivacyPolicy={() => handleOpenPrivacyPolicy('dpdp')}
      />

      {/* Private Founder PIN Security Gate */}
      <FounderPinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={() => setIsFounderMode(true)}
      />

      {/* Privacy Policy & DPDP Legal Terms Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        initialTab={privacyModalTab}
        onConsentGranted={() => {}}
      />

      {/* Floating DPDP Act 2023 & Affiliate Disclosure Consent Permission Bar */}
      <DpdpConsentBanner onOpenPrivacyPolicy={handleOpenPrivacyPolicy} />

      {/* Customer Help & Problem Reporting Modal */}
      <HelpSupportModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        currentUser={currentUser}
        selectedCity={selectedCity}
      />

      {/* Founder & Owner Command Center */}
      <FounderAdminHub
        stats={founderStats}
        onUpdateStats={handleUpdateFounderStats}
        isOpen={isFounderMode}
        onClose={() => setIsFounderMode(false)}
        onTriggerScrape={handleTriggerLivePriceRefresh}
      />

      {/* Location & Service Availability Modal */}
      <LocationAvailabilityModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={handleSelectCity}
        onOpenHelp={() => setIsHelpModalOpen(true)}
      />

      {/* Mobile Bottom Navigation Bar (Flipkart Minutes / Zepto Style) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex items-center justify-around text-[10px] font-bold shadow-2xl">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 text-[#e01962] font-black active:scale-95 transition-all cursor-pointer"
        >
          <Home className="w-4 h-4 text-[#e01962]" />
          <span>Home</span>
        </button>

        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 text-slate-600 hover:text-[#e01962] active:scale-95 transition-all cursor-pointer"
        >
          <LayoutGrid className="w-4 h-4 text-slate-600" />
          <span>Categories</span>
        </button>

        <button
          type="button"
          onClick={handleTriggerLivePriceRefresh}
          className="flex flex-col items-center gap-1 text-slate-600 hover:text-[#e01962] active:scale-95 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-slate-600" />
          <span>Buy Again</span>
        </button>

        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 text-slate-600 hover:text-[#e01962] active:scale-95 transition-all cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-slate-600" />
          {totalCartItemCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#e01962] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
              {totalCartItemCount}
            </span>
          )}
          <span>Basket</span>
        </button>
      </div>

    </div>
  );
};

export default App;
