import React from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_CONFIG } from '../data/mockData';
import { Volume2, Sparkles, Phone, ArrowRight, Truck } from 'lucide-react';

export const ScrollingNoticeBar: React.FC = () => {
  const { scrollingNotice, language, setCurrentPage, setSelectedCategoryId } = useShop();

  if (!scrollingNotice || !scrollingNotice.enabled) {
    return null;
  }

  // Determine marquee duration based on speed setting
  const getDuration = () => {
    switch (scrollingNotice.speed) {
      case 'slow':
        return '40s';
      case 'fast':
        return '16s';
      case 'normal':
      default:
        return '26s';
    }
  };

  const displayText =
    language === 'en' && scrollingNotice.textEn
      ? scrollingNotice.textEn
      : scrollingNotice.text;

  const displayBadge =
    language === 'en' && scrollingNotice.badgeEn
      ? scrollingNotice.badgeEn
      : scrollingNotice.badge || (language === 'bn' ? '📢 বিশেষ ঘোষণা' : '📢 Notice');

  const handleLinkClick = () => {
    if (scrollingNotice.link) {
      if (scrollingNotice.link.startsWith('http')) {
        window.open(scrollingNotice.link, '_blank', 'noopener,noreferrer');
      } else if (scrollingNotice.link === 'catalog') {
        setSelectedCategoryId('all');
        setCurrentPage('catalog');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      id="top-scrolling-notice-bar"
      className="bg-[#1b340e] text-[#f5f4ef] border-b border-[#2d5016]/40 relative overflow-hidden z-40 text-xs select-none shadow-xs"
    >
      <div className="max-w-7xl mx-auto flex items-center h-8 sm:h-9 px-2 sm:px-4">
        {/* Left Fixed Badge / Icon */}
        <div className="flex items-center gap-1.5 shrink-0 bg-[#d4af37] text-neutral-950 font-bold px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] shadow-xs mr-2.5 sm:mr-3 z-10">
          <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-900 shrink-0 animate-pulse" />
          <span className="whitespace-nowrap tracking-wide">{displayBadge}</span>
        </div>

        {/* Scrolling Marquee Container */}
        <div className="flex-1 overflow-hidden relative cursor-default" title="Pause on hover">
          {/* Subtle gradient fades on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#1b340e] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-[#1b340e] to-transparent z-10 pointer-events-none" />

          <div
            className="animate-ticker-marquee flex items-center gap-8 text-[11px] sm:text-xs font-medium tracking-wide text-neutral-100"
            style={{ '--ticker-duration': getDuration() } as React.CSSProperties}
          >
            {/* Repeat content twice for smooth continuous infinite loop */}
            {[0, 1].map((copyIndex) => (
              <div key={copyIndex} className="flex items-center gap-8 shrink-0">
                <span
                  onClick={handleLinkClick}
                  className={`inline-flex items-center gap-2 ${
                    scrollingNotice.link ? 'cursor-pointer hover:underline text-[#fef9c3]' : ''
                  }`}
                >
                  {displayText}
                </span>

                <span className="text-[#d4af37] text-[10px]">✦</span>

                <span className="inline-flex items-center gap-1.5 text-neutral-300">
                  <Truck className="w-3 h-3 text-[#d4af37]" />
                  <span>
                    {language === 'bn'
                      ? 'সিঙ্গেল ডেলিভারি চার্জ: ঢাকা ৳৭০ | ঢাকার বাইরে ৳১২০'
                      : 'Single Delivery Fee: Dhaka ৳70 | Outside ৳120'}
                  </span>
                </span>

                <span className="text-[#d4af37] text-[10px]">✦</span>

                <a
                  href={`tel:${BRAND_CONFIG.phone}`}
                  className="inline-flex items-center gap-1 text-[#d4af37] hover:underline"
                >
                  <Phone className="w-3 h-3" />
                  <span>হটলাইন: {BRAND_CONFIG.displayPhone}</span>
                </a>

                <span className="text-[#d4af37] text-[10px]">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Quick Support / Hotline (Desktop only) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0 ml-3 pl-3 border-l border-white/10 text-[11px] font-semibold text-neutral-300">
          <a
            href={BRAND_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d4af37] transition-colors flex items-center gap-1"
          >
            <span>WhatsApp অর্ডার</span>
          </a>
        </div>
      </div>
    </div>
  );
};
