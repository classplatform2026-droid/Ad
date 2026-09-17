import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { HeroSlide, CategoryId } from '../types';
import { BRAND_CONFIG } from '../data/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroSlider: React.FC = () => {
  const {
    heroSlides,
    products,
    setCurrentPage,
    setSelectedCategoryId,
    setSelectedProduct,
  } = useShop();

  // Active sorted slides
  const activeSlides = heroSlides
    .filter((s) => s.active)
    .sort((a, b) => a.order - b.order);

  const displaySlides = activeSlides.length > 0 ? activeSlides : heroSlides;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play slides every 5s
  useEffect(() => {
    if (displaySlides.length <= 1 || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displaySlides.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [displaySlides.length, isPaused]);

  // Make sure current index is within bounds
  useEffect(() => {
    if (currentIndex >= displaySlides.length) {
      setCurrentIndex(0);
    }
  }, [displaySlides.length, currentIndex]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % displaySlides.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      // Swiped left -> next slide
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev slide
      handlePrev();
    }
  };

  const handleSlideAction = (slide: HeroSlide) => {
    if (slide.linkType === 'category') {
      const catId = (slide.linkValue || 'all') as CategoryId | 'all';
      setSelectedCategoryId(catId);
      setCurrentPage('catalog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (slide.linkType === 'catalog') {
      setSelectedCategoryId('all');
      setCurrentPage('catalog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (slide.linkType === 'product' && slide.linkValue) {
      const prod = products.find((p) => p._id === slide.linkValue);
      if (prod) {
        setSelectedProduct(prod);
        setCurrentPage('product_detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSelectedCategoryId('all');
        setCurrentPage('catalog');
      }
    } else if (slide.linkType === 'whatsapp') {
      window.open(BRAND_CONFIG.whatsappUrl, '_blank', 'noopener,noreferrer');
    } else if (slide.linkType === 'url' && slide.linkValue) {
      window.open(slide.linkValue, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedCategoryId('all');
      setCurrentPage('catalog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!displaySlides || displaySlides.length === 0) {
    return null;
  }

  const currentSlide = displaySlides[currentIndex] || displaySlides[0];

  return (
    <div 
      className="relative w-full overflow-hidden bg-neutral-950 rounded-b-2xl sm:rounded-b-[2rem] shadow-xl border-b border-neutral-200 select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pure Banner Images Carousel Container (No text overlay) */}
      <div 
        onClick={() => handleSlideAction(currentSlide)}
        className="relative w-full h-[190px] xs:h-[230px] sm:h-[340px] md:h-[420px] lg:h-[480px] xl:h-[520px] cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label="Banner slide"
      >
        {displaySlides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide._id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Pure Crisp Banner Image */}
              <img
                src={slide.image}
                alt=""
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
          );
        })}

        {/* Prev & Next Slide Buttons (Icons only, no text) */}
        {displaySlides.length > 1 && (
          <>
            <button
              id="hero-slider-prev-btn"
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/80 text-white/90 hover:text-white border border-white/20 hover:border-white/50 backdrop-blur-md flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-110 active:scale-95 opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              id="hero-slider-next-btn"
              onClick={handleNext}
              aria-label="Next Slide"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/80 text-white/90 hover:text-white border border-white/20 hover:border-white/50 backdrop-blur-md flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-110 active:scale-95 opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {/* Slide Indicator Dots (Pure graphical dots, no text) */}
        {displaySlides.length > 1 && (
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/15 shadow-sm"
          >
            {displaySlides.map((slide, idx) => (
              <button
                key={slide._id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`transition-all duration-300 cursor-pointer rounded-full ${
                  idx === currentIndex
                    ? 'w-6 sm:w-7 h-2 bg-gradient-to-r from-[#d4af37] to-[#f3db83] shadow-xs'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
