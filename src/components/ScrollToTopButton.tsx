import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface ScrollToTopButtonProps {
  threshold?: number;
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ threshold = 320 }) => {
  const { language } = useShop();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          
          setIsVisible(scrollY > threshold);

          if (totalHeight > 0) {
            const progress = Math.min(Math.max((scrollY / totalHeight) * 100, 0), 100);
            setScrollProgress(progress);
          } else {
            setScrollProgress(0);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG Progress circle calculation
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed bottom-6 right-4 sm:right-6 z-40 select-none group"
        >
          {/* Tooltip on Desktop hover */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden md:flex items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-[#1a1a1a] text-white text-[11px] font-semibold tracking-wide py-1.5 px-3 rounded-lg shadow-xl border border-[#d4af37]/30 whitespace-nowrap">
              {language === 'bn' ? 'উপরে যান' : 'Scroll to top'}
              <span className="text-[#d4af37] ml-1.5 text-[10px] font-mono">
                {Math.round(scrollProgress)}%
              </span>
            </div>
            {/* Arrow pointer */}
            <div className="w-1.5 h-1.5 bg-[#1a1a1a] border-t border-r border-[#d4af37]/30 rotate-45 -ml-1" />
          </div>

          {/* Floating Action Button */}
          <button
            id="scroll-to-top-button"
            type="button"
            onClick={scrollToTop}
            aria-label={language === 'bn' ? 'পৃষ্ঠার শুরুতে স্ক্রোল করুন' : 'Scroll to top of page'}
            title={language === 'bn' ? 'উপরে যান' : 'Scroll to top'}
            className="relative w-12 h-12 rounded-full bg-[#1a1a1a]/95 hover:bg-[#2d5016] text-white shadow-xl hover:shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 border border-[#d4af37]/40 hover:border-[#d4af37] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2 backdrop-blur-md"
          >
            {/* SVG Circular Progress Bar */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              {/* Background Ring Track */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="text-white/10"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Active Progress Ring */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="text-[#d4af37] transition-[stroke-dashoffset] duration-150 ease-linear"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Icon */}
            <ArrowUp className="w-5 h-5 text-white group-hover:text-[#d4af37] group-hover:-translate-y-0.5 transition-all duration-200 relative z-10" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
