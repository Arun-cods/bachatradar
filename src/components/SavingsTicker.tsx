import React, { useState, useEffect } from 'react';
import { RefreshCw, Check, Zap, Activity, Clock, ShieldCheck } from 'lucide-react';

interface SavingsTickerProps {
  onManualRefresh?: () => void;
}

export const SavingsTicker: React.FC<SavingsTickerProps> = ({ onManualRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [justRefreshed, setJustRefreshed] = useState(false);
  const [secondsSinceSync, setSecondsSinceSync] = useState(0);
  const [liveMillisTime, setLiveMillisTime] = useState<string>('');
  const [liveSavings, setLiveSavings] = useState(489320);
  const [realtimeActive, setRealtimeActive] = useState(true);
  const [activeLatency, setActiveLatency] = useState({
    zepto: 18,
    blinkit: 32,
    instamart: 24,
    bb: 35,
    flipkart: 22,
    amazon: 41,
  });

  // Millisecond-Precision Real-Time Clock (Ticking every 40ms)
  useEffect(() => {
    const msTimer = setInterval(() => {
      const now = new Date();
      const ms = String(now.getMilliseconds()).padStart(3, '0');
      setLiveMillisTime(`${now.toLocaleTimeString('en-IN', { hour12: false })}.${ms}`);
    }, 40);

    return () => clearInterval(msTimer);
  }, []);

  // 1-Second Auto-Sync Heartbeat & Micro-Arbitrage Fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsSinceSync((prev) => prev + 1);

      // In real-time mode: occasionally increment live shopping basket savings and fluctuate millisecond latencies
      if (realtimeActive) {
        if (Math.random() > 0.4) {
          setLiveSavings((prev) => prev + Math.floor(Math.random() * 30 + 10));
          setActiveLatency({
            zepto: Math.floor(14 + Math.random() * 10),
            blinkit: Math.floor(26 + Math.random() * 12),
            instamart: Math.floor(20 + Math.random() * 11),
            bb: Math.floor(30 + Math.random() * 15),
            flipkart: Math.floor(18 + Math.random() * 10),
            amazon: Math.floor(35 + Math.random() * 16),
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [realtimeActive]);

  const handleSyncClick = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setJustRefreshed(true);
      setSecondsSinceSync(0);
      setLiveSavings((prev) => prev + 140);
      if (onManualRefresh) onManualRefresh();
      setTimeout(() => setJustRefreshed(false), 2500);
    }, 600);
  };

  return (
    <div className="bg-slate-950 text-white overflow-hidden py-2 px-3 sm:px-4 border-b border-slate-800 text-xs sm:text-sm select-none shadow-sm w-full max-w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4 w-full max-w-full overflow-hidden">
        
        {/* Live Real-Time Pulse Indicator */}
        <div className="flex items-center gap-2 shrink-0 font-extrabold text-emerald-400">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-wider font-black">
            <span>REALTIME ARBITRAGE</span>
            <span className="hidden md:inline px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] border border-emerald-500/30">
              ⚡ {liveMillisTime || 'LIVE'}
            </span>
          </div>
        </div>

        {/* Scrolling or highlighted ticker items */}
        <div className="flex-1 min-w-0 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-5 text-slate-300 text-xs">
          
          {/* Live Engine Status */}
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>Auto-Sync Engine:</span>
            </span>
            <span className="text-white font-semibold">
              {secondsSinceSync === 0 ? 'Synced just now' : `Synced ${secondsSinceSync}s ago`}
            </span>
            <span className="bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded text-[10px] border border-emerald-500/30 font-mono">
              ⚡ Darkstore Latency: {activeLatency.zepto}ms
            </span>
          </div>

          <span className="text-slate-700">•</span>

          {/* Real-time Darkstore Ping Latencies */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-slate-900/90 px-2.5 py-0.5 rounded-lg border border-slate-800">
            <span className="text-slate-500 font-sans font-bold">6 Store Latencies:</span>
            <span className="text-pink-400">Zepto {activeLatency.zepto}ms</span>
            <span>|</span>
            <span className="text-amber-400">Blinkit {activeLatency.blinkit}ms</span>
            <span>|</span>
            <span className="text-blue-400">Flipkart {activeLatency.flipkart}ms</span>
            <span>|</span>
            <span className="text-orange-400">Instamart {activeLatency.instamart}ms</span>
            <span>|</span>
            <span className="text-emerald-400">BB {activeLatency.bb}ms</span>
            <span>|</span>
            <span className="text-sky-400">Amazon {activeLatency.amazon}ms</span>
          </div>

          <span className="text-slate-700 hidden lg:inline">•</span>

          {/* Bengaluru deal */}
          <div className="flex items-center gap-1.5">
            <span className="text-amber-400 font-bold">⚡ Bengaluru:</span>
            <span>Zepto Tomatoes ₹36 vs Blinkit ₹52</span>
            <span className="bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded text-[10px]">
              Save ₹16/kg
            </span>
          </div>

          <span className="text-slate-700">•</span>

          {/* Delhi deal */}
          <div className="flex items-center gap-1.5">
            <span className="text-amber-400 font-bold">🌾 Delhi NCR:</span>
            <span>BB Now Atta 10kg ₹449 vs Blinkit ₹490</span>
            <span className="bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded text-[10px]">
              Save ₹41
            </span>
          </div>

          <span className="text-slate-700">•</span>

          {/* Surge Warning */}
          <div className="flex items-center gap-1.5">
            <span className="text-amber-400 font-bold">🟡 Surge Alert:</span>
            <span>Blinkit +₹15 surge fee active in Gurugram & Bandra</span>
          </div>

          <span className="text-slate-700">•</span>

          {/* Live Dynamic Savings Ticking Up Every Second */}
          <div className="flex items-center gap-1.5 bg-emerald-950/50 px-2 py-0.5 rounded-lg border border-emerald-500/30">
            <span className="text-emerald-400 font-bold">💰 Live Indian Savings:</span>
            <span className="text-emerald-300 font-black font-mono">
              ₹{liveSavings.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-emerald-500 font-medium">across 24,850 carts</span>
          </div>
        </div>

        {/* Live Manual Re-Sync Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSyncClick}
            disabled={isRefreshing}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-sm border ${
              isRefreshing
                ? 'bg-slate-800 text-slate-400 border-slate-700'
                : justRefreshed
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20'
                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:border-emerald-500'
            }`}
            title="Instant Darkstore Re-sync across Zepto, Blinkit, Swiggy Instamart & BigBasket"
          >
            {isRefreshing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                <span>Syncing 24.5k SKUs...</span>
              </>
            ) : justRefreshed ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Synchronized (0s ago)!</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Sync Live Now</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
