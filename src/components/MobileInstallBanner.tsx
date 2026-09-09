import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Sparkles, CheckCircle2, Share } from 'lucide-react';

export const MobileInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    return localStorage.getItem('bachatradar_install_dismissed') === 'true';
  });
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed as app)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Capture Android/Chrome PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      setIsInstallable(false);
    } else if (isIos) {
      alert("To install BachatRadar on your iPhone/iPad:\n\n1. Tap the Share button (square with arrow) at the bottom of Safari.\n2. Scroll down and tap 'Add to Home Screen'.\n3. Tap 'Add' in the top right.\n\nBachatRadar will appear on your phone home screen like a native app!");
    } else {
      alert("To install BachatRadar on your mobile:\n\n1. Tap your browser menu (3 dots in top right).\n2. Tap 'Install App' or 'Add to Home screen'.\n\nBachatRadar will install directly on your phone!");
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('bachatradar_install_dismissed', 'true');
  };

  if (isDismissed || isInstalled) return null;

  return (
    <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 text-white px-4 py-2.5 border-b border-emerald-500/40 flex items-center justify-between gap-3 text-xs shadow-md">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md shrink-0">
          ₹
        </div>
        <div>
          <div className="font-extrabold text-white flex items-center gap-1.5">
            <span>Install BachatRadar App on Mobile</span>
            <span className="text-[9.5px] px-1.5 py-0.2 rounded-full bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-400/40">
              FAST & FREE
            </span>
          </div>
          <div className="text-[10px] text-slate-300 hidden sm:block">
            Works smoothly on all Android & iOS phones with instant live darkstore alerts.
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={handleInstallClick}
          className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
        >
          {isIos ? <Share className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
          <span>{isIos ? 'Add to Phone' : 'Install App'}</span>
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};