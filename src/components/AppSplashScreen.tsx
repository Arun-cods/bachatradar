import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  LogIn,
  UserPlus,
  MapPin,
  Building,
  User,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Eye,
  KeyRound
} from 'lucide-react';
import { UserProfile, CityOption } from '../types';
import { CITIES } from '../data/mockGroceryData';

interface AppSplashScreenProps {
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  selectedCity: CityOption;
}

export const AppSplashScreen: React.FC<AppSplashScreenProps> = ({
  currentUser,
  onLoginSuccess,
  selectedCity,
}) => {
  const [phase, setPhase] = useState<'splash' | 'login_gateway' | 'completed'>('splash');
  const [progress, setProgress] = useState(15);
  const [loadingText, setLoadingText] = useState('Initializing BachatRadar engine...');
  const [welcomeBackUser, setWelcomeBackUser] = useState<UserProfile | null>(null);

  // Login Gateway State
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Registration Form State
  const [regFullName, setRegFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCity, setRegCity] = useState(selectedCity.name);
  const [regSociety, setRegSociety] = useState(selectedCity.popularAreas[0] || 'Ameerpet');

  useEffect(() => {
    // Step 1: Animate splash loading progress
    const t1 = setTimeout(() => {
      setProgress(45);
      setLoadingText('Connecting to Blinkit, Zepto, Swiggy & BigBasket darkstores...');
    }, 400);

    const t2 = setTimeout(() => {
      setProgress(85);
      setLoadingText('Synchronizing real-time pricing & surge fee telemetry...');
    }, 850);

    const t3 = setTimeout(() => {
      setProgress(100);
      setLoadingText('Ready!');

      // Check registration status:
      if (currentUser) {
        // Registered: Welcome them and take directly into app!
        setWelcomeBackUser(currentUser);
        setTimeout(() => {
          setPhase('completed');
        }, 650);
      } else {
        // Not registered / Not logged in: Show app login & registration section!
        setTimeout(() => {
          setPhase('login_gateway');
        }, 400);
      }
    }, 1350);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [currentUser]);

  // Demo accounts for 1-tap fast testing
  const demoAccounts = [
    {
      name: 'Gopagani Arun',
      phone: '9014218406',
      city: 'Hyderabad',
      society: 'Founder & CEO Office (Ameerpet)',
      role: 'Founder & CEO 👑',
      isFounder: true,
    },
    {
      name: 'K. Rajesh Varma',
      phone: '9848022338',
      city: 'Hyderabad',
      society: 'My Home Bhooja, Hitec City',
      role: 'Verified Shopper',
      isFounder: false,
    },
    {
      name: 'Pooja Kulkarni',
      phone: '9820144552',
      city: 'Mumbai',
      society: 'Hiranandani Gardens, Powai',
      role: 'Family Shopper',
      isFounder: false,
    },
  ];

  const handleQuickAccountSelect = (acc: typeof demoAccounts[0]) => {
    const user: UserProfile = {
      id: acc.isFounder ? 'founder_arun_9014218406' : `usr_${acc.phone}`,
      name: acc.name,
      phone: acc.phone,
      city: acc.city,
      society: acc.society,
      lifetimeSavingsRupees: acc.isFounder ? 4850 : 2140,
      isPro: true,
      isFounder: acc.isFounder,
    };
    onLoginSuccess(user);
    setPhase('completed');
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setLoginError('Please enter a valid 10-digit mobile phone number');
      return;
    }
    setLoginError(null);
    const mockOtp = String(Math.floor(1000 + Math.random() * 9000));
    setGeneratedOtp(mockOtp);
    setOtpSent(true);
    setOtpValue(mockOtp); // Auto-fill for friction-free testing
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpValue || otpValue.length < 4) {
      setLoginError('Please enter the 4-digit OTP code');
      return;
    }

    const cleanPhone = phoneNumber.replace(/\D/g, '').slice(-10);
    const isFounder = cleanPhone === '9014218406';

    const user: UserProfile = {
      id: isFounder ? 'founder_arun_9014218406' : `usr_${cleanPhone}`,
      name: isFounder ? 'Gopagani Arun' : `Shopper ${cleanPhone.slice(-4)}`,
      phone: cleanPhone,
      city: selectedCity.name,
      society: selectedCity.popularAreas[0] || 'Local Area',
      lifetimeSavingsRupees: isFounder ? 4850 : 1250,
      isPro: true,
      isFounder,
    };

    onLoginSuccess(user);
    setPhase('completed');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = regPhone.replace(/\D/g, '').slice(-10);
    if (!regFullName.trim()) {
      setLoginError('Please enter your full name');
      return;
    }
    if (cleanPhone.length < 10) {
      setLoginError('Please enter a valid 10-digit mobile number');
      return;
    }

    const isFounder = cleanPhone === '9014218406';
    const user: UserProfile = {
      id: isFounder ? 'founder_arun_9014218406' : `usr_${cleanPhone}`,
      name: regFullName.trim(),
      phone: cleanPhone,
      city: regCity,
      society: regSociety,
      lifetimeSavingsRupees: 650,
      isPro: true,
      isFounder,
    };

    onLoginSuccess(user);
    setPhase('completed');
  };

  const handleContinueAsGuest = () => {
    setPhase('completed');
  };

  if (phase === 'completed') return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950 text-white p-4 select-none overflow-y-auto">
      
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. APP OPENING SPLASH SCREEN PHASE */}
      {phase === 'splash' && (
        <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full animate-in fade-in zoom-in-95 duration-300">
          
          {/* Animated App Logo */}
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-400 via-emerald-600 to-teal-800 flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-emerald-500/40 border-2 border-emerald-300/60 animate-pulse">
              ₹
            </div>
            <div className="absolute -inset-2 rounded-[2rem] bg-emerald-500/20 blur-md -z-10 animate-ping opacity-60" />
          </div>

          {/* App Name & Branding */}
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center justify-center gap-1">
            <span>Bachat</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Radar
            </span>
          </h1>
          <p className="text-emerald-400/90 text-xs font-bold mt-1 tracking-wider uppercase">
            बचत रडार • 100% Free Public Utility
          </p>
          <p className="text-slate-400 text-xs mt-2 max-w-xs font-medium">
            India's Multi-Store Quick-Commerce Arbitrage Engine
          </p>

          {/* Store Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[10px] font-bold text-slate-300">
            <span className="px-2 py-1 rounded-full bg-slate-900/80 border border-slate-800">⚡ Zepto</span>
            <span className="px-2 py-1 rounded-full bg-slate-900/80 border border-slate-800">🟡 Blinkit</span>
            <span className="px-2 py-1 rounded-full bg-slate-900/80 border border-slate-800">🟠 Instamart</span>
            <span className="px-2 py-1 rounded-full bg-slate-900/80 border border-slate-800">🟢 BB Now</span>
            <span className="px-2 py-1 rounded-full bg-slate-900/80 border border-slate-800">🔵 Flipkart</span>
          </div>

          {/* Progress Bar & Real-Time Loading Indicator */}
          <div className="mt-10 w-full max-w-xs">
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-emerald-500/30 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold truncate max-w-[220px]">
                <RefreshCw className="w-3 h-3 animate-spin shrink-0" />
                <span className="truncate">{loadingText}</span>
              </span>
              <span className="font-mono text-emerald-300 font-bold">{progress}%</span>
            </div>
          </div>

          {/* Welcome Back Notification (If already registered) */}
          {welcomeBackUser && (
            <div className="mt-5 bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-bottom-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Welcome back, {welcomeBackUser.name}! Opening app...</span>
            </div>
          )}

        </div>
      )}

      {/* 2. APP LOGIN & REGISTRATION GATEWAY (When not registered / logged in) */}
      {phase === 'login_gateway' && (
        <div className="relative z-10 max-w-md w-full bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-emerald-500/30 p-5 sm:p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header with App Logo & Name */}
          <div className="text-center mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-emerald-600/30 mx-auto mb-2.5 border border-emerald-400/60">
              ₹
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center justify-center gap-1.5">
              <span>Bachat</span>
              <span className="text-emerald-400">Radar</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                APP LOGIN
              </span>
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Never overpay for groceries. Save ₹1,500 – ₹3,500 monthly.
            </p>
          </div>

          {/* Navigation Tabs: Login vs Register */}
          <div className="flex bg-slate-950/80 rounded-2xl p-1 border border-slate-800 mb-4 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setLoginError(null);
              }}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'login'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Mobile Login</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setLoginError(null);
              }}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'register'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>New Registration</span>
            </button>
          </div>

          {/* Error Message if any */}
          {loginError && (
            <div className="mb-4 bg-red-950/50 border border-red-500/50 text-red-200 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* TAB 1: MOBILE PHONE LOGIN */}
          {activeTab === 'login' && (
            <div>
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Enter Mobile Phone Number
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-xs font-black text-slate-400 select-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="90142 18406"
                        className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-2xl py-3 pl-12 pr-4 text-white text-sm font-bold tracking-wider placeholder:text-slate-500 focus:outline-none transition-colors"
                        autoFocus
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      We send a secure 4-digit instant OTP verification SMS.
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 active:scale-95 cursor-pointer"
                  >
                    <span>Send Login OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-3.5">
                  <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-slate-400 text-[10px]">OTP sent to:</div>
                      <div className="text-white font-black">+91 {phoneNumber}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-emerald-400 hover:underline text-[11px] font-bold"
                    >
                      Change
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-300">
                        Enter 4-Digit OTP Code
                      </label>
                      {generatedOtp && (
                        <span className="text-[10px] text-amber-300 font-mono bg-amber-400/20 px-1.5 py-0.5 rounded">
                          OTP: {generatedOtp}
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      maxLength={4}
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                      placeholder="• • • •"
                      className="w-full bg-slate-950 border border-emerald-500/60 rounded-2xl py-3 text-center text-xl font-black tracking-widest text-emerald-400 focus:outline-none shadow-inner"
                      autoFocus
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 active:scale-95 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify OTP & Enter BachatRadar</span>
                  </button>
                </form>
              )}

              {/* 1-Tap Quick Accounts for Seamless Testing */}
              <div className="mt-4 pt-3.5 border-t border-slate-800">
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                  Or 1-Tap Fast Entrance:
                </div>
                <div className="space-y-1.5">
                  {demoAccounts.map((acc) => (
                    <button
                      key={acc.phone}
                      type="button"
                      onClick={() => handleQuickAccountSelect(acc)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 text-left flex items-center justify-between text-xs transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                          {acc.name[0]}
                        </div>
                        <div className="min-w-0">
                          <div className="font-extrabold text-white text-xs truncate group-hover:text-emerald-300">
                            {acc.name}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {acc.city} • {acc.role}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: NEW USER REGISTRATION */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="e.g. Ramesh Reddy"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl py-2.5 px-3 text-white text-xs font-semibold focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Mobile Phone Number
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-black text-slate-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl py-2.5 pl-11 pr-3 text-white text-xs font-bold focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    City
                  </label>
                  <select
                    value={regCity}
                    onChange={(e) => {
                      setRegCity(e.target.value);
                      const city = CITIES.find((c) => c.name === e.target.value);
                      if (city) setRegSociety(city.popularAreas[0]);
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 px-2.5 text-white text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  >
                    {CITIES.map((c) => (
                      <option key={c.id} value={c.name} className="bg-slate-900 text-white">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Area / Society
                  </label>
                  <input
                    type="text"
                    value={regSociety}
                    onChange={(e) => setRegSociety(e.target.value)}
                    placeholder="e.g. Ameerpet / Gachibowli"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl py-2.5 px-3 text-white text-xs font-semibold focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 active:scale-95 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register & Open App Directly</span>
              </button>
            </form>
          )}

          {/* Guest / Skip Option: Never block a user who wants to immediately check prices */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={handleContinueAsGuest}
              className="text-xs text-slate-400 hover:text-emerald-400 font-bold transition-colors cursor-pointer py-1"
            >
              Skip for now & Continue as Guest →
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
