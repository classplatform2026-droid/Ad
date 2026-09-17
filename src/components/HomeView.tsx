import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_CONFIG } from '../data/mockData';
import { ProductCard } from './ProductCard';
import { HeroSlider } from './HeroSlider';
import { CategoryId } from '../types';
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  MessageCircle, 
  Phone, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  ExternalLink 
} from 'lucide-react';
import { formatBDT } from '../utils/formatters';

export const HomeView: React.FC = () => {
  const {
    products,
    categories,
    testimonials,
    blogs,
    setSelectedBlog,
    setCurrentPage,
    setSelectedCategoryId,
    language,
  } = useShop();

  // Tabbed filter for home products showcase
  const [activeTab, setActiveTab] = useState<'all' | 'pure' | 'food' | 'islamic' | 'winter'>('all');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'pure') return p.sunnah_certified;
    if (activeTab === 'food') return p.category === 'food';
    if (activeTab === 'islamic') return p.category === 'islamic';
    if (activeTab === 'winter') return p.category === 'winter';
    return true;
  });

  const handleCategoryClick = (catId: CategoryId) => {
    setSelectedCategoryId(catId);
    setCurrentPage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-10 sm:space-y-16 pb-12 sm:pb-16">
      {/* 1. DYNAMIC SLIDING IMAGE HERO CAROUSEL (Controlled via Admin Dashboard) */}
      <section className="relative">
        <HeroSlider />
      </section>

      {/* MOBILE QUICK DELIVERY & TRUST HIGHLIGHT BAR */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 -mt-4 sm:-mt-6 relative z-20">
        <div className="bg-[#1a1a1a] text-white rounded-2xl p-3 sm:p-4 shadow-xl border border-[#d4af37]/30 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div className="w-8 h-8 rounded-xl bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#d4af37]">
                {language === 'bn' ? '🚚 যত খুশি পণ্য কিনুন — ডেলিভারি চার্জ মাত্র একটি!' : '🚚 Flat Single Delivery Fee on All Items!'}
              </p>
              <p className="text-[10px] sm:text-xs text-neutral-300">
                {language === 'bn' ? 'ঢাকার ভেতরে ৳৭০ • ঢাকার বাইরে ৳১২০ • ১০০% ক্যাশ অন ডেলিভারি' : 'Inside Dhaka ৳70 • Outside Dhaka ৳120 • 100% Cash on Delivery'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              {language === 'bn' ? 'শতভাগ বিশুদ্ধ ও খাঁটি' : '100% Pure & Authentic'}
            </span>
            <a
              href={BRAND_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] px-3 py-1 rounded-full shadow-sm active:scale-95 transition-all"
            >
              <MessageCircle className="w-3 h-3 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY GRID: 5 Sections (Food, Skincare, Accessories, Islamic, Winter) */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-2 mb-4 sm:mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#2d5016]">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{language === 'bn' ? 'ক্যাটাগরি সমূহ' : 'Our Collections'}</span>
            </div>
            <h2 className="font-serif-brand text-xl sm:text-3xl font-bold text-[#1a1a1a] mt-0.5 sm:mt-1">
              {language === 'bn' ? 'পণ্য ক্যাটাগরি অনুসারে কিনুন' : 'Shop by Curated Category'}
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategoryId('all');
              setCurrentPage('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs sm:text-sm font-bold text-[#2d5016] hover:text-[#1a1a1a] flex items-center gap-1 group cursor-pointer shrink-0 pb-1"
          >
            <span>{language === 'bn' ? 'সবগুলো' : 'View All'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 5 Distinct Category Circle Shapes - Smooth swipe on mobile */}
        <div className="flex sm:grid sm:grid-cols-5 gap-3 sm:gap-6 lg:gap-8 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 no-scrollbar justify-start sm:justify-items-center px-0.5 snap-x snap-mandatory">
          {categories.map((category) => {
            const count = products.filter((p) => p.category === category._id).length;
            return (
              <div
                key={category._id}
                id={`cat-card-${category._id}`}
                onClick={() => handleCategoryClick(category._id)}
                className="flex-shrink-0 w-20 xs:w-24 sm:w-full flex flex-col items-center text-center group cursor-pointer snap-center active:scale-95 transition-transform"
              >
                {/* Outer Circular Frame */}
                <div className="relative w-18 h-18 xs:w-22 xs:h-22 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full p-1 sm:p-1.5 bg-white border-2 border-[#e5e3dc] group-hover:border-[#2d5016] shadow-xs group-hover:shadow-xl transition-all duration-300">
                  {/* Inner Circle with Image */}
                  <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-100 shadow-inner">
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-[#2d5016]/40 transition-colors duration-300" />
                  </div>

                  {/* Floating Product Count Badge */}
                  <div className="absolute -bottom-1 sm:-bottom-1.5 left-1/2 -translate-x-1/2 px-1.5 sm:px-2.5 py-0.2 sm:py-0.5 rounded-full bg-[#1a1a1a] group-hover:bg-[#2d5016] text-[#d4af37] group-hover:text-white text-[9px] sm:text-[11px] font-bold shadow-md whitespace-nowrap transition-colors border border-white">
                    {count} {language === 'bn' ? 'পণ্য' : 'items'}
                  </div>
                </div>

                {/* Category Titles & Description */}
                <h3 className="font-serif-brand font-bold text-[11px] sm:text-sm md:text-base text-[#1a1a1a] group-hover:text-[#2d5016] transition-colors mt-2 sm:mt-4 leading-tight line-clamp-1 px-0.5">
                  {language === 'bn' ? category.banglaName : category.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-neutral-500 line-clamp-1 mt-0.5 hidden sm:block max-w-[160px]">
                  {language === 'bn' ? category.banglaDescription : category.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SHOWCASE WITH INTERACTIVE TABS */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#2d5016]">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{language === 'bn' ? 'জনপ্রিয় ও খাঁটি কালেকশন' : 'Top Picks & 100% Pure'}</span>
            </div>
            <h2 className="font-serif-brand text-xl sm:text-3xl font-bold text-[#1a1a1a] mt-0.5 sm:mt-1">
              {language === 'bn' ? 'গ্রাহকদের পছন্দের সেরা পণ্যসমূহ' : 'Our Most Loved Essentials'}
            </h2>
          </div>

          {/* Category Tabs - Touch friendly horizontal scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
            {[
              { id: 'all', bn: 'সবগুলো', en: 'All' },
              { id: 'pure', bn: '🌿 খাঁটি ও বিশুদ্ধ', en: 'Pure & Natural' },
              { id: 'food', bn: '🍯 খাদ্য', en: 'Food' },
              { id: 'islamic', bn: '🕌 ইসলামিক', en: 'Islamic' },
              { id: 'winter', bn: '🧣 শীতের পোশাক', en: 'Winter' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`min-h-[34px] px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95 ${
                  activeTab === tab.id
                    ? 'bg-[#2d5016] text-white shadow-sm'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {language === 'bn' ? tab.bn : tab.en}
              </button>
            ))}
          </div>
        </div>

        {/* 4 cols Desktop, 2 cols Mobile grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* View full catalog button */}
        <div className="mt-6 sm:mt-8 text-center">
          <button
            id="view-all-products-btn"
            onClick={() => {
              setSelectedCategoryId('all');
              setCurrentPage('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-full bg-[#1a1a1a] hover:bg-[#2d5016] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <span>{language === 'bn' ? 'সকল পণ্য দেখুন (ক্যাটালগ)' : 'View All Products in Catalog'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. WHY CHOOSE KASAB GALLERY / QUALITY COMMITMENT (Mobile 2x2 Grid) */}
      <section className="bg-[#f2efe9] py-8 sm:py-16 border-y border-[#e2dfd5]">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#2d5016] uppercase bg-white/80 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-neutral-300">
              {language === 'bn' ? 'আমাদের বিশেষ অঙ্গীকার' : 'Our Core Commitment'}
            </span>
            <h2 className="font-serif-brand text-xl sm:text-3xl font-bold text-[#1a1a1a] mt-2">
              {language === 'bn' ? 'কেন Kasab Gallery বেছে নিবেন?' : 'Why Kasab Gallery is Trusted across Bangladesh'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 sm:mt-2">
              {language === 'bn'
                ? 'শতভাগ খাঁটি, পরীক্ষিত ও প্রাকৃতিক উপাদান প্রতিটি ঘরে পৌঁছে দিতে আমরা দায়বদ্ধ।'
                : 'Combining authentic traditional care with uncompromised lab-tested quality and direct personal attention.'}
            </p>
          </div>

          {/* 2-col on Mobile, 4-col on Desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            <div className="bg-white p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-neutral-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#2d5016]/10 text-[#2d5016] flex items-center justify-center font-bold mb-2 sm:mb-4">
                <Truck className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-bold text-neutral-900 text-xs sm:text-base mb-0.5 sm:mb-1">
                {language === 'bn' ? 'সিঙ্গেল ডেলিভারি চার্জ' : 'Single Delivery Charge'}
              </h3>
              <p className="text-[10px] sm:text-xs text-neutral-600 leading-relaxed">
                {language === 'bn'
                  ? 'কার্টে যত খুশি পণ্য যোগ করুন, ডেলিভারি চার্জ ১টিই।'
                  : 'Add any number of items. Flat delivery fee.'}
              </p>
            </div>

            <div className="bg-white p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-neutral-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#d4af37]/20 text-[#b58f1f] flex items-center justify-center font-bold mb-2 sm:mb-4">
                <ShieldCheck className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-bold text-neutral-900 text-xs sm:text-base mb-0.5 sm:mb-1">
                {language === 'bn' ? '১০০% খাঁটি ও নির্ভেজাল' : '100% Pure & Natural'}
              </h3>
              <p className="text-[10px] sm:text-xs text-neutral-600 leading-relaxed">
                {language === 'bn'
                  ? 'কোনো ক্ষতিকর কেমিক্যাল, প্রিজারভেটিভ বা ভেজাল নেই।'
                  : 'Pure, chemical-free, lab-tested natural ingredients.'}
              </p>
            </div>

            <div className="bg-white p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-neutral-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-2 sm:mb-4">
                <Star className="w-4 h-4 sm:w-6 sm:h-6 fill-current" />
              </div>
              <h3 className="font-bold text-neutral-900 text-xs sm:text-base mb-0.5 sm:mb-1">
                {language === 'bn' ? '১০০% পজিটিভ রেটিং' : '100% Facebook Rating'}
              </h3>
              <p className="text-[10px] sm:text-xs text-neutral-600 leading-relaxed">
                {language === 'bn'
                  ? '১০,০০০+ ফেসবুক অনুসারী ও শতভাগ সন্তুষ্টি।'
                  : 'Over 10K+ followers & 100% positive feedback.'}
              </p>
            </div>

            <div className="bg-white p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-neutral-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-2 sm:mb-4">
                <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-bold text-neutral-900 text-xs sm:text-base mb-0.5 sm:mb-1">
                {language === 'bn' ? 'সরাসরি দ্রুত অর্ডার' : 'Instant WhatsApp Order'}
              </h3>
              <p className="text-[10px] sm:text-xs text-neutral-600 leading-relaxed">
                {language === 'bn'
                  ? 'ফর্ম পূরণের ঝামেলা ছাড়াই সরাসরি হোয়াটসঅ্যাপে অর্ডার।'
                  : 'Quick order directly via WhatsApp or phone.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FACEBOOK REVIEWS / TRUST TESTIMONIALS (Mobile Swipeable Carousel) */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-2 mb-4 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-[10px] sm:text-xs font-semibold mb-1">
              <CheckCircle2 className="w-3 h-3 text-blue-600" />
              <span>{language === 'bn' ? 'ফেসবুক রিভিউ থেকে প্রমাণিত' : 'Verified Facebook Reviews'}</span>
            </div>
            <h2 className="font-serif-brand text-xl sm:text-3xl font-bold text-[#1a1a1a]">
              {language === 'bn' ? 'গ্রাহকদের সন্তুষ্টির অভিজ্ঞতা' : 'What Our Customers Say'}
            </h2>
          </div>

          <span className="text-[10px] sm:text-xs text-neutral-400 font-medium sm:hidden shrink-0 pb-1">
            👉 {language === 'bn' ? 'সোয়াইপ করুন' : 'Swipe'}
          </span>
        </div>

        {/* Swipeable on Mobile, 4-col Grid on Desktop */}
        <div className="flex lg:grid lg:grid-cols-4 gap-3 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-3 sm:pb-0 no-scrollbar -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="w-[82vw] max-w-[310px] shrink-0 snap-center lg:w-auto bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-[#e5e3dc] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                  <div className="flex items-center text-amber-500">
                    {[...Array(Math.max(1, Math.min(5, t.rating || 5)))].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-neutral-400">{t.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic mb-3">
                  "{language === 'bn' ? (t.banglaComment || t.comment) : (t.comment || t.banglaComment)}"
                </p>
              </div>

              <div className="pt-2.5 border-t border-neutral-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-neutral-900">
                      {t.author}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-neutral-400">{t.city}</p>
                  </div>
                  {t.verifiedBuyer !== false && (
                    <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      {language === 'bn' ? 'ভেরিফাইড' : 'Verified'}
                    </span>
                  )}
                </div>
                {t.productMention && (
                  <p className="text-[9px] sm:text-[10px] text-[#2d5016] font-medium mt-1 truncate">
                    🏷️ {t.productMention}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Facebook Link Banner */}
        <div className="mt-4 sm:mt-8 bg-blue-50/70 border border-blue-200/80 rounded-2xl p-3.5 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base sm:text-lg shrink-0">
              f
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-xs sm:text-sm">
                {language === 'bn' ? 'আমাদের অফিসিয়াল ফেসবুক পেইজে যুক্ত হন' : 'Join our Facebook Community'}
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-600">
                {language === 'bn'
                  ? '১০,০০০+ ফলোয়ার্স ও ১০০% পজিটিভ মতামত'
                  : '10K+ followers, live product updates, and 100% recommended rating'}
              </p>
            </div>
          </div>

          <a
            href={BRAND_CONFIG.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs active:scale-95"
          >
            <span>{language === 'bn' ? 'ফেসবুক ভিজিট করুন' : 'Visit Facebook'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 5.5 SUNNAH KNOWLEDGE & BLOG SECTION */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#2d5016]">
              <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{language === 'bn' ? 'কাসাব নলেজ হাব' : 'Kasab Knowledge Hub'}</span>
            </div>
            <h2 className="font-serif-brand text-xl sm:text-3xl font-bold text-[#1a1a1a] mt-0.5">
              {language === 'bn' ? 'প্রাকৃতিক স্বাস্থ্য, পুষ্টি ও লাইফস্টাইল ব্লগ' : 'Natural Wellness & Lifestyle Guides'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              {language === 'bn'
                ? 'খাঁটি মধুর পরীক্ষা, আজওয়া খেজুরের পুষ্টিগুণ ও স্বাস্থ্যকর জীবনধারার পরামর্শ'
                : 'Practical guidance on pure organic nutrition and everyday wellness.'}
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentPage('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#2d5016] hover:text-[#1e380f] cursor-pointer self-start sm:self-auto"
          >
            <span>{language === 'bn' ? 'সকল আর্টিকেল দেখুন' : 'View All Articles'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {blogs.slice(0, 3).map((post) => (
            <article
              key={post._id}
              onClick={() => {
                setSelectedBlog(post);
                setCurrentPage('blog_detail');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white rounded-2xl border border-neutral-200 hover:border-[#d4af37]/60 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[#d4af37] text-[10px] font-bold border border-[#d4af37]/30">
                      {language === 'bn' ? post.banglaCategoryName : post.categoryName}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-neutral-300 flex items-center gap-1 border border-white/10">
                    <Clock className="w-3 h-3 text-[#d4af37]" />
                    <span>{language === 'bn' ? post.banglaReadTime : post.readTime}</span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 space-y-2">
                  <span className="text-[11px] text-neutral-400 font-medium">
                    {post.publishedDate}
                  </span>
                  <h3 className="font-serif-brand text-base sm:text-lg font-bold text-neutral-900 group-hover:text-[#2d5016] transition-colors line-clamp-2 leading-snug">
                    {language === 'bn' ? post.banglaTitle : post.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {language === 'bn' ? post.banglaExcerpt : post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 font-medium truncate max-w-[150px]">
                  {post.author}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2d5016]">
                  <span>{language === 'bn' ? 'পড়ুন' : 'Read'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. DIRECT WHATSAPP & PHONE ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1a1a1a] via-[#2d5016] to-[#1a1a1a] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2 max-w-xl">
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#d4af37] text-neutral-950 text-[10px] sm:text-xs font-bold uppercase tracking-wider inline-block">
              {language === 'bn' ? 'দ্রুত সহায়তা ও অর্ডার' : 'Instant Order Assistance'}
            </span>
            <h2 className="font-serif-brand text-xl sm:text-3xl font-bold text-white leading-tight">
              {language === 'bn'
                ? 'পণ্য সম্পর্কে জানতে চান বা সরাসরি অর্ডার করতে চান?'
                : 'Need guidance or want to order directly?'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300">
              {language === 'bn'
                ? 'আমাদের প্রতিনিধি সরাসরি কথা বলতে প্রস্তুত। যেকোনো সময় কল বা হোয়াটসঅ্যাপ করুন।'
                : 'Our friendly team is always available to help you select genuine quality items.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-end gap-2.5 w-full sm:w-auto shrink-0">
            <a
              href={BRAND_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{language === 'bn' ? 'WhatsApp' : 'WhatsApp'}</span>
            </a>
            <a
              href={`tel:${BRAND_CONFIG.phone}`}
              className="min-h-[44px] px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-full bg-white text-neutral-900 hover:bg-neutral-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#2d5016]" />
              <span>{language === 'bn' ? 'কল করুন' : 'Call Now'}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
