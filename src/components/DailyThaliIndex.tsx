import React from 'react';
import { Utensils, TrendingDown, ArrowUpRight, CheckCircle } from 'lucide-react';
import { PLATFORMS } from '../data/mockGroceryData';

export const DailyThaliIndex: React.FC = () => {
  // Calculated basket: 1kg Atta, 500g Dal, 1kg Tomato, 1kg Onion, 500ml Milk
  const thaliRates = [
    { platform: PLATFORMS.bigbasket, cost: 235, tag: 'Cheapest Thali Today', isBest: true },
    { platform: PLATFORMS.zepto, cost: 248, tag: 'Fastest 10m Delivery', isBest: false },
    { platform: PLATFORMS.amazon, cost: 254, tag: 'Next Day Slot', isBest: false },
    { platform: PLATFORMS.instamart, cost: 265, tag: 'Standard', isBest: false },
    { platform: PLATFORMS.blinkit, cost: 284, tag: 'Highest Surge', isBest: false },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-orange-100 text-orange-700">
              <Utensils className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-orange-800 uppercase tracking-wider">
              Daily Macro Radar
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
            The Indian Household "Thali Index" Today
          </h2>
          <p className="text-xs text-slate-500">
            Standard 4-person dinner basket: 1kg Atta + 500g Toor Dal + 1kg Tomatoes + 1kg Onions + 500ml Milk.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl flex items-center gap-3">
          <TrendingDown className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-xs">
            <div className="font-extrabold text-emerald-900">₹49 Gap Between Apps</div>
            <div className="text-emerald-700 font-medium">Blinkit is 20.8% more expensive than BB Now today</div>
          </div>
        </div>
      </div>

      {/* Grid of 5 App Thali Costs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {thaliRates.map((item) => (
          <div
            key={item.platform.id}
            className={`p-4 rounded-xl border text-center relative flex flex-col justify-between transition-all ${
              item.isBest
                ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-400/20'
                : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
            }`}
          >
            {item.isBest && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-sm">
                Winner
              </span>
            )}

            <div>
              <div className="text-lg mb-1">{item.platform.logo}</div>
              <div className="font-extrabold text-xs text-slate-900">{item.platform.name}</div>
              <div className="text-xl font-black text-slate-900 mt-2">₹{item.cost}</div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] font-bold text-slate-500">
              {item.tag}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
