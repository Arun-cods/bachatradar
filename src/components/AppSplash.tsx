import React, { useState, useEffect } from 'react';

interface AppSplashProps {
  onComplete?: () => void;
}

export const AppSplash: React.FC<AppSplashProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(25);
  const [statusText, setStatusText] = useState('Initializing darkstore engine...');

  useEffect(() => {
    const t1 = setTimeout(() => {
      setProgress(65);
      setStatusText('Connecting to Blinkit, Zepto, Instamart & BigBasket...');
    }, 400);

    const t2 = setTimeout(() => {
      setProgress(95);
      setStatusText('Syncing live rates & surge fee radar...');
    }, 850);

    const t3 = setTimeout(() => {
      setProgress(100);
      setStatusText('Ready!');
    }, 1250);

    const t4 = setTimeout(() => {
      setIsFading(true);
    }, 1450);

    const t5 = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 200);
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-slate-950 text-white p-6 select-none cursor-pointer transition-opacity duration-400 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Skip Hint */}
      <div className="w-full flex justify-end">
        <button
          type="button"
          onClick={handleSkip}
          className="text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors py-1 px-3 rounded-full bg-slate-900 border border-slate-800 cursor-pointer"
        >
          Skip ↗
        </button>
      </div>

      {/* Center Logo & Name */}
      <div className="flex flex-col items-center text-center max-w-sm">
        {/* Animated 3D Logo */}
        <div className="relative mb-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-emerald-400 via-emerald-600 to-teal-800 flex items-center justify-center text-white text-4xl sm:text-5xl font-black shadow-2xl shadow-emerald-500/40 border border-emerald-300/50 animate-pulse">
            ₹
          </div>
          <div className="absolute -inset-2 rounded-[2rem] bg-emerald-500/20 blur-lg -z-10 animate-ping opacity-60" />
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center justify-center gap-1.5">
          <span>Bachat</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            Radar
          </span>
        </h1>
        <p className="text-emerald-400 text-xs font-bold mt-1 tracking-wider uppercase">
          बचत रडार • 100% Free Public Utility
        </p>
        <p className="text-slate-400 text-xs mt-2 font-medium">
          India's Real-Time Quick-Commerce Price Comparison Engine
        </p>

        {/* Loading Progress Bar */}
        <div className="w-56 sm:w-64 bg-slate-900 rounded-full h-1.5 mt-8 overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-400 mt-2 font-medium">
          {statusText}
        </p>
      </div>

      {/* Bottom Store Badges */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
          <span>Comparing Darkstores:</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-300">
          <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">🟡 Blinkit</span>
          <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">⚡ Zepto</span>
          <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">🟠 Instamart</span>
          <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">🟢 BB Now</span>
        </div>
      </div>
    </div>
  );
};
