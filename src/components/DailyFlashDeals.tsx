import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShoppingBag, ExternalLink, Clock, Flame, Plus, Minus } from 'lucide-react';
import { Product, PlatformId } from '../types';
import { PLATFORMS } from '../data/mockGroceryData';
import { getDirectStoreBuyUrl } from '../utils/storeLinks';

interface DailyFlashDealsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity?: (productId: string, delta: number) => void;
  onTrackAffiliate: (platform: PlatformId, product: Product) => void;
  cartQuantities?: Record<string, number>;
}

export const DailyFlashDeals: React.FC<DailyFlashDealsProps> = ({
  products,
  onAddToCart,
  onUpdateQuantity,
  onTrackAffiliate,
  cartQuantities,
}) => {
  // Select top 4 highest discount % deals
  const flashDeals = products
    .map((p) => {
      const valid = Object.values(p.offers).filter((o) => o.inStock);
      if (valid.length === 0) return null;
      const lowest = valid.reduce((min, o) => (o.price < min.price ? o : min), valid[0]);
      const discountPct = Math.round(((lowest.mrp - lowest.price) / lowest.mrp) * 100);
      return { product: p, lowest, discountPct };
    })
    .filter((d): d is { product: Product; lowest: any; discountPct: number } => d !== null && d.discountPct >= 15)
    .sort((a, b) => b.discountPct - a.discountPct)
    .slice(0, 4);

  return (
    <section className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-red-100 text-red-600 font-bold">
            <Flame className="w-4 h-4" />
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Today's Flash Arbitrage Steals</span>
              <span className="text-xs bg-red-500 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                UP TO 35% OFF
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Live price drops identified across quick-commerce darkstores in the last 15 minutes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span>Deals refresh every 60 mins</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {flashDeals.map(({ product, lowest, discountPct }) => {
          const platform = PLATFORMS[lowest.platform as PlatformId];

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-red-200/80 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
            >
              <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                {discountPct}% OFF
              </span>

              <div className="flex gap-3 items-start mb-3">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0"
                />
                <div className="flex-1 pr-10">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">{product.unit}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 line-through">MRP ₹{lowest.mrp}</div>
                  <div className="text-base font-black text-slate-900">
                    ₹{lowest.price}{' '}
                    <a
                      href={getDirectStoreBuyUrl(lowest.platform as PlatformId, product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-emerald-600 hover:text-emerald-700 font-extrabold underline hover:no-underline"
                      title={`Buy directly on ${platform.name}`}
                    >
                      on {platform.name} ↗
                    </a>
                  </div>
                </div>

                {cartQuantities && cartQuantities[product.id] > 0 ? (
                  <div className="flex items-center rounded-xl bg-emerald-600 text-white font-black text-xs shadow-sm overflow-hidden border border-emerald-600">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity ? onUpdateQuantity(product.id, -1) : onAddToCart(product)}
                      className="px-2 py-1.5 hover:bg-emerald-700 transition-colors flex items-center justify-center font-black text-xs cursor-pointer active:scale-95"
                      title="Decrease or remove"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 py-1 font-black text-xs min-w-[1.25rem] text-center bg-emerald-700/50 select-none">
                      {cartQuantities[product.id]}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity ? onUpdateQuantity(product.id, 1) : onAddToCart(product)}
                      className="px-2 py-1.5 hover:bg-emerald-700 transition-colors flex items-center justify-center font-black text-xs cursor-pointer active:scale-95"
                      title="Add more"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onAddToCart(product)}
                    className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center gap-1 transition-colors border border-emerald-200 cursor-pointer"
                    title="Add to Smart Basket"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="text-[11px]">+ Cart</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
