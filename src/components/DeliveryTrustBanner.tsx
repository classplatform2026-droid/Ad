import React from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_CONFIG } from '../data/mockData';
import { Truck, ShieldCheck, HeartHandshake, Award, ArrowRight } from 'lucide-react';

export const DeliveryTrustBanner: React.FC = () => {
  const { language, setCurrentPage, setSelectedCategoryId } = useShop();

  return (
    <section className="bg-gradient-to-r from-[#2d5016] via-[#234011] to-[#1a1a1a] text-white py-4 px-4 sm:px-6 relative overflow-hidden shadow-inner">
      {/* Decorative background geometry */}
      <div className="absolute -right-10 -top-10 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        {/* Main USP Highlight */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-12 h-12 rounded-2xl bg-[#d4af37] text-neutral-900 flex items-center justify-center shrink-0 shadow-lg font-bold">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="px-2 py-0.5 rounded bg-[#d4af37]/20 text-[#d4af37] text-[11px] font-bold tracking-wider uppercase border border-[#d4af37]/30">
                {language === 'bn' ? 'বিশেষ সুবিধা' : 'Exclusive USP'}
              </span>
              <span className="text-xs text-neutral-300 font-medium">
                {language === 'bn' ? 'ঢাকা ৳৭০ | ঢাকার বাইরে ৳১২০' : 'Dhaka ৳70 | Outside ৳120'}
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
              {language === 'bn' ? BRAND_CONFIG.singleDeliveryChargeText : BRAND_CONFIG.singleDeliveryChargeTextEn}
            </h4>
            <p className="text-xs text-neutral-300">
              {language === 'bn'
                ? 'কার্টে যত খুশি আইটেম যুক্ত করুন, পুরো পার্সেলের জন্য প্রদান করবেন শুধুমাত্র একটি নির্দিষ্ট ডেলিভারি চার্জ!'
                : 'Add unlimited items across all categories, pay delivery fee once per full order!'}
            </p>
          </div>
        </div>

        {/* Action Button & Trust pill */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 text-xs text-neutral-200">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span>{BRAND_CONFIG.ratingText}</span>
          </div>

          <button
            id="usp-explore-btn"
            onClick={() => {
              setSelectedCategoryId('all');
              setCurrentPage('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d4af37] hover:bg-[#c29e2f] text-neutral-950 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <span>{language === 'bn' ? 'অর্ডার শুরু করুন' : 'Explore & Order'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
