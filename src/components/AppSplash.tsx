import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Check, CheckCircle2, RefreshCw, Smartphone, Sparkles, X, Mail } from 'lucide-react';
import { UserProfile } from '../types';

interface AppSplashProps {
  currentUser?: UserProfile | null;
  onLoginSuccess?: (user: UserProfile) => void;
  onComplete?: () => void;
}

export const AppSplash: React.FC<AppSplashProps> = ({
  currentUser,
  onLoginSuccess,
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  
  // If already logged in, show a quick 0.8s splash then auto-enter
  const isLoggedIn = Boolean(currentUser || (typeof window !== 'undefined' && localStorage.getItem('bachatradar_user')));

  // Login flow state
  const [step, setStep] = useState<'phone' | 'otp' | 'google'>('phone');
  const [phone, setPhone] = useState('');
  const [secretOtp, setSecretOtp] = useState('9544');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);

  // Google flow state
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Auto-dismiss if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, 850);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: any;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleDismiss = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 350);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setOtpError('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    setOtpError('');

    // Generate clean 4-digit OTP
    const generated = Math.floor(1000 + Math.random() * 9000).toString();
    setSecretOtp(generated);

    // Call real SMS dispatch endpoint if gateway configured
    const smsApiKey = localStorage.getItem('bachatradar_sms_key') || '';
    fetch('/api/send-sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: cleanPhone, code: generated, apiKey: smsApiKey }),
    }).catch(() => {});

    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setCountdown(30);
      setOtpDigits(['', '', '', '']);
    }, 400);
  };

  const handleOtpDigitChange = (index: number, val: string) => {
    const cleanVal = val.replace(/\D/g, '').slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = cleanVal;
    setOtpDigits(newDigits);
    setOtpError('');

    if (cleanVal && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    if (cleanVal && index === 3 && newDigits.every((d) => d !== '')) {
      const enteredCode = newDigits.join('');
      if (enteredCode === secretOtp) {
        completeLogin(phone);
      } else {
        setOtpError('Invalid verification code. Please check and try again.');
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otpDigits.join('');
    if (entered === secretOtp) {
      completeLogin(phone);
    } else {
      setOtpError('Invalid verification code. Please try again.');
    }
  };

  const handleResendOtp = () => {
    if (countdown > 0) return;
    const cleanPhone = phone.replace(/\D/g, '');
    const generated = Math.floor(1000 + Math.random() * 9000).toString();
    setSecretOtp(generated);
    setCountdown(30);
    setOtpDigits(['', '', '', '']);
    setOtpError('');

    const smsApiKey = localStorage.getItem('bachatradar_sms_key') || '';
    fetch('/api/send-sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: cleanPhone, code: generated, apiKey: smsApiKey }),
    }).catch(() => {});
  };

  const completeLogin = (userPhone: string, userName?: string, userEmail?: string) => {
    const cleanPhone = userPhone.replace(/\D/g, '');
    const profile: UserProfile = {
      id: 'user_' + (cleanPhone || Date.now()),
      name: userName || 'Shopper',
      phone: cleanPhone || '9876543210',
      email: userEmail || '',
      city: 'Hyderabad',
      society: 'Local Area',
      lifetimeSavingsRupees: 350,
      isPro: false,
    };

    try {
      localStorage.setItem('bachatradar_user', JSON.stringify(profile));
    } catch (e) {}

    onLoginSuccess?.(profile);
    handleDismiss();
  };

  const handleGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail || !googleEmail.includes('@')) {
      setOtpError('Please enter a valid Google email address');
      return;
    }
    completeLogin('9876543210', googleName || googleEmail.split('@')[0], googleEmail);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-slate-950 text-white p-4 sm:p-6 select-none overflow-y-auto transition-opacity duration-350 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ transition: 'opacity 350ms ease-out' }}
    >
      {/* Top Bar: Skip Option */}
      <div className="w-full flex items-center justify-between max-w-md mx-auto pt-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Live Darkstore Rates</span>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="text-xs font-bold text-slate-400 hover:text-white transition-colors py-1.5 px-3 rounded-full bg-slate-900 border border-slate-800 cursor-pointer shadow-sm hover:border-slate-700"
        >
          Skip ↗
        </button>
      </div>

      {/* Main Entrance Content */}
      <div className="w-full max-w-md mx-auto my-auto py-4 flex flex-col items-center">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-600 to-teal-800 flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-2xl shadow-emerald-500/30 border border-emerald-300/40">
              ₹
            </div>
            <div className="absolute -inset-1.5 rounded-2xl bg-emerald-500/20 blur-md -z-10 animate-pulse" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center gap-1">
            <span>Bachat</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Radar
            </span>
          </h1>
          <p className="text-emerald-400 text-[11px] font-bold mt-0.5 tracking-wider uppercase">
            बचत रडार • 100% Free Public Utility
          </p>
          <p className="text-slate-400 text-xs mt-1.5 font-medium px-4">
            Compare prices across Blinkit, Zepto, Swiggy Instamart & BigBasket in real-time
          </p>
        </div>

        {/* If user is already logged in, show quick loading screen */}
        {isLoggedIn ? (
          <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-center shadow-xl">
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-bold mb-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Welcome Back!</span>
            </div>
            <p className="text-xs text-slate-400">
              Entering BachatRadar with live darkstore comparison...
            </p>
            <div className="w-full bg-slate-800 rounded-full h-1 mt-4 overflow-hidden">
              <div className="h-full bg-emerald-500 w-full animate-pulse" />
            </div>
          </div>
        ) : (
          /* Entrance Login Card (Like all quick commerce apps) */
          <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-black/60">
            {/* STEP 1: MOBILE NUMBER INPUT */}
            {step === 'phone' && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="text-center sm:text-left">
                  <h2 className="text-base sm:text-lg font-black text-white">
                    Log in or Sign up
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Enter your mobile number to get started
                  </p>
                </div>

                <div>
                  <div className="flex rounded-2xl border border-slate-700 bg-slate-950 overflow-hidden focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                    <span className="px-3.5 py-3 text-xs sm:text-sm font-black text-slate-400 border-r border-slate-800 bg-slate-900/60 flex items-center shrink-0">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value.replace(/\D/g, ''));
                        setOtpError('');
                      }}
                      placeholder="Enter 10-digit mobile number"
                      className="w-full px-3.5 py-3 bg-transparent text-sm sm:text-base font-bold text-white placeholder:text-slate-600 focus:outline-none tracking-wider"
                      autoFocus
                    />
                  </div>
                  {otpError && (
                    <p className="text-rose-400 text-xs font-semibold mt-1.5 text-center sm:text-left">
                      {otpError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || phone.replace(/\D/g, '').length !== 10}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 active:scale-98 cursor-pointer"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  ) : (
                    <>
                      <span>Continue with OTP</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative flex items-center justify-center py-1">
                  <div className="border-t border-slate-800 w-full" />
                  <span className="bg-slate-900 px-3 text-[10px] font-black text-slate-500 uppercase tracking-widest shrink-0">
                    OR
                  </span>
                  <div className="border-t border-slate-800 w-full" />
                </div>

                {/* Continue with Google */}
                <button
                  type="button"
                  onClick={() => {
                    setStep('google');
                    setOtpError('');
                  }}
                  className="w-full py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-rose-400" />
                  <span>Continue with Google</span>
                </button>

                {/* Terms / DPDP hint */}
                <p className="text-[10px] text-slate-500 text-center leading-relaxed pt-1">
                  By continuing, you agree to BachatRadar's Privacy Policy & DPDP terms. 100% Free & No spam.
                </p>
              </form>
            )}

            {/* STEP 2: 4-DIGIT OTP VERIFICATION */}
            {step === 'otp' && (
              <form onSubmit={handleVerifyOtpSubmit} className="space-y-4">
                <div className="text-center">
                  <h2 className="text-base sm:text-lg font-black text-white">
                    Verify Mobile Number
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Enter the 4-digit code sent to <span className="text-emerald-400 font-bold">+91 {phone}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('phone');
                      setOtpError('');
                    }}
                    className="text-[11px] text-emerald-400 hover:underline font-bold mt-1 inline-block"
                  >
                    Change Number
                  </button>
                </div>

                <div>
                  <div className="flex justify-center gap-2.5 sm:gap-3 my-2">
                    {otpDigits.map((digit, index) => (
                      <input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpDigitChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-11 h-12 sm:w-12 sm:h-14 rounded-2xl bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-center text-lg sm:text-xl font-black text-emerald-400 focus:outline-none transition-all"
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>

                  {otpError && (
                    <p className="text-rose-400 text-xs font-semibold mt-1 text-center">
                      {otpError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={otpDigits.some((d) => d === '')}
                  className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 active:scale-98 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Verify OTP & Enter BachatRadar</span>
                </button>

                <div className="text-center pt-1">
                  {countdown > 0 ? (
                    <span className="text-xs text-slate-500 font-medium">
                      Resend code in <strong className="text-slate-400">{countdown}s</strong>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-xs text-emerald-400 hover:underline font-bold"
                    >
                      Resend Code
                    </button>
                  )}
                </div>
              </form>
            )}

            {/* STEP 3: GOOGLE LOGIN POPUP SIMULATION */}
            {step === 'google' && (
              <form onSubmit={handleGoogleSubmit} className="space-y-4">
                <div className="text-center">
                  <h2 className="text-base sm:text-lg font-black text-white">
                    Sign in with Google
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Connect your Google account to save preferences
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={googleName}
                      onChange={(e) => setGoogleName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-emerald-500 text-xs text-white placeholder:text-slate-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      Google Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={googleEmail}
                      onChange={(e) => setGoogleEmail(e.target.value)}
                      placeholder="e.g. user@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-emerald-500 text-xs text-white placeholder:text-slate-600 focus:outline-none"
                    />
                  </div>

                  {otpError && (
                    <p className="text-rose-400 text-xs font-semibold">{otpError}</p>
                  )}
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('phone');
                      setOtpError('');
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                  >
                    Back to Mobile
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs"
                  >
                    Continue
                  </button>
                </div>
              </form>
            )}

            {/* Guest / Skip Option: Never block a user */}
            <div className="mt-4 pt-3.5 border-t border-slate-800 text-center">
              <button
                type="button"
                onClick={handleDismiss}
                className="text-xs text-slate-400 hover:text-emerald-400 font-bold transition-colors cursor-pointer py-1"
              >
                Skip for now & Continue as Guest →
              </button>
            </div>
          </div>
        )}

        {/* Bottom Store Badges */}
        <div className="flex flex-col items-center gap-2 mt-6">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <span>Comparing Live Darkstores</span>
          </div>
          <div className="flex items-center flex-wrap justify-center gap-2 text-[11px] font-bold text-slate-300">
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 shadow-sm">🟡 Blinkit</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 shadow-sm">⚡ Zepto</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 shadow-sm">🟠 Instamart</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 shadow-sm">🟢 BB Now</span>
          </div>
        </div>
      </div>
    </div>
  );
};
