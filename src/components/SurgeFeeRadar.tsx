import React from 'react';
import { Zap, Clock, ShieldAlert, Check, TrendingDown } from 'lucide-react';
import { CityOption } from '../types';
import { PLATFORMS } from '../data/mockGroceryData';

interface SurgeFeeRadarProps {
  city: CityOption;
}

export const SurgeFeeRadar: React.FC<SurgeFeeRadarProps> = ({ city }) => {
  // Live simulated fee metrics for selected city
  const feeStatus = [
    {
      platform: PLATFORMS.zepto,
      surge: 0,
      handling: 4,
      deliveryTime: '8-10 mins',
      surgeStatus: 'Normal (No Surge)',
      isSurging: false,
    },
    {
      platform: PLATFORMS.blinkit,
      surge: 15,
      handling: 5,
      deliveryTime: '12-14 mins',
      surgeStatus: 'Rain / High Demand (+₹15)',
      isSurging: true,
    },
    {
      platform: PLATFORMS.instamart,
      surge: 0,
      handling: 6,
      deliveryTime: '15-18 mins',
      surgeStatus: 'Normal (₹6 fee)',
      isSurging: false,
    },
    {
      platform: PLATFORMS.bigbasket,
      surge: 0,
      handling: 3,
      deliveryTime: '18-25 mins',
      surgeStatus: 'Lowest Fee (₹3)',
      isSurging: false,
    },
    {
      platform: PLATFORMS.flipkart,
      surge: 0,
      handling: 4,
      deliveryTime: '9-12 mins',
      surgeStatus: 'Normal (10m Express)',
      isSurging: false,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-700/50 mb-8 w-full max-w-full overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 w-full max-w-full">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-400 text-amber-950 tracking-wider uppercase">
              Live Fee Radar
            </span>
            <span className="text-xs text-slate-300 font-medium">
              Area: {city.popularAreas[0]} ({city.pincode})
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black tracking-tight mt-1 text-white">
            Quick-Commerce Surge & Platform Fees Right Now
          </h2>
          <p className="text-xs text-slate-400">
            Check hidden charges before you checkout on any app.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
          <TrendingDown className="w-5 h-5 text-emerald-400" />
          <div className="text-left">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">Cheapest Fees Right Now</div>
            <div className="text-sm font-bold text-emerald-400">BB Now & Zepto (Save ₹12-₹16)</div>
          </div>
        </div>
      </div>

      {/* 5 Instant Delivery App Fee Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 w-full max-w-full">
        {feeStatus.map((item) => (
          <div
            key={item.platform.id}
            className={`p-3 sm:p-3.5 rounded-xl border transition-all min-w-0 ${
              item.isSurging
                ? 'bg-amber-950/40 border-amber-500/50'
                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
              <span className="font-extrabold text-xs sm:text-sm flex items-center gap-1 min-w-0">
                <span className="shrink-0">{item.platform.logo}</span>
                <span className="truncate">{item.platform.name}</span>
              </span>
              {item.isSurging ? (
                <span className="flex items-center text-[9.5px] sm:text-[10px] font-bold text-amber-400 bg-amber-400/20 px-1.5 sm:px-2 py-0.5 rounded-full shrink-0">
                  Surging
                </span>
              ) : (
                <span className="flex items-center text-[9.5px] sm:text-[10px] font-bold text-emerald-400 bg-emerald-400/20 px-1.5 sm:px-2 py-0.5 rounded-full shrink-0">
                  No Surge
                </span>
              )}
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Handling Fee:</span>
                <span className="font-semibold">₹{item.handling}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Surge Charge:</span>
                <span className={`font-bold ${item.surge > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {item.surge > 0 ? `+₹${item.surge}` : '₹0'}
                </span>
              </div>
              <div className="flex justify-between text-slate-300 pt-1 border-t border-slate-700/60">
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" /> Time:
                </span>
                <span className="font-semibold text-slate-200">{item.deliveryTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
