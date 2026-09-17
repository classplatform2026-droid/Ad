import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { CategoryId } from '../types';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ShieldCheck, 
  ArrowUpDown, 
  RotateCcw,
  Check,
  Truck,
  Phone,
  MessageCircle,
  ChevronRight,
  Filter,
  Sparkles
} from 'lucide-react';
import { formatBDT } from '../utils/formatters';
import { BRAND_CONFIG } from '../data/mockData';

export const CatalogView: React.FC = () => {
  const {
    products,
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
    searchQuery,
    setSearchQuery,
    language,
  } = useShop();

  const [pricePreset, setPricePreset] = useState<'all' | 'under500' | '500to1000' | 'above1000'>('all');
  const [sunnahOnly, setSunnahOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price_low' | 'price_high' | 'rating'>('popular');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategoryId !== 'all' && p.category !== selectedCategoryId) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBangla = p.banglaName.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q) || p.banglaDescription.toLowerCase().includes(q);
          if (!matchName && !matchBangla && !matchDesc) return false;
        }
        // Sunnah certified
        if (sunnahOnly && !p.sunnah_certified) {
          return false;
        }
        // In stock
        if (inStockOnly && !p.available) {
          return false;
        }
        // Price presets
        if (pricePreset === 'under500' && p.price >= 500) return false;
        if (pricePreset === '500to1000' && (p.price < 500 || p.price > 1000)) return false;
        if (pricePreset === 'above1000' && p.price <= 1000) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        // Default popular
        return (b.reviews_count || 0) - (a.reviews_count || 0);
      });
  }, [products, selectedCategoryId, searchQuery, sunnahOnly, inStockOnly, pricePreset, sortBy]);

  const resetAllFilters = () => {
    setSelectedCategoryId('all');
    setSearchQuery('');
    setPricePreset('all');
    setSunnahOnly(false);
    setInStockOnly(false);
    setSortBy('popular');
  };

  const hasActiveFilters =
    selectedCategoryId !== 'all' ||
    searchQuery !== '' ||
    pricePreset !== 'all' ||
    sunnahOnly ||
    inStockOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Catalog Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium mb-1">
            <span>{language === 'bn' ? 'হোম' : 'Home'}</span>
            <span>/</span>
            <span className="text-[#2d5016] font-bold">
              {language === 'bn' ? 'পণ্য ক্যাটালগ' : 'Product Catalog'}
            </span>
          </div>
          <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold text-neutral-900">
            {language === 'bn' ? 'সকল পণ্য সংগ্রহ' : 'All Products Collection'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            {language === 'bn'
              ? 'খাঁটি মধু, আজওয়া খেজুর, অর্গানিক স্কিনকেয়ার ও প্রিমিয়াম লাইফস্টাইল পণ্য এক সিঙ্গেল ডেলিভারিতে'
              : 'Authentic pure nutrition, natural skincare, and premium lifestyle essentials'}
          </p>
        </div>

        {/* Search bar inside catalog */}
        <div className="relative w-full md:w-80">
          <input
            id="catalog-search-field"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'bn' ? 'নাম দিয়ে পণ্য খুঁজুন...' : 'Search product by name...'
            }
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm focus:outline-none focus:border-[#2d5016] shadow-xs"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Two-Column Layout: Left Sidebar (Desktop) + Right Content */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
        {/* ============================================================ */}
        {/* BEST-IN-CLASS DESKTOP FILTER SIDEBAR */}
        {/* ============================================================ */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain pr-1.5 self-start">
          <div className="bg-white p-5 rounded-3xl border border-neutral-200/90 shadow-sm space-y-6">
            {/* Sidebar Header with Active Count & Reset */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#2d5016]" />
                <span className="font-bold text-neutral-900 text-sm">
                  {language === 'bn' ? 'ফিল্টার ও ক্যাটাগরি' : 'Filters & Categories'}
                </span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-700 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{language === 'bn' ? 'রিসেট' : 'Reset'}</span>
                </button>
              )}
            </div>

            {/* 1. Category Tree Section */}
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400 block px-1">
                {language === 'bn' ? 'ক্যাটাগরি সমূহ' : 'Categories'}
              </span>

              <div className="space-y-1">
                {/* All products button */}
                <button
                  onClick={() => setSelectedCategoryId('all')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategoryId === 'all'
                      ? 'bg-[#2d5016] text-white shadow-xs'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">🌟</span>
                    <span>{language === 'bn' ? 'সকল পণ্য' : 'All Products'}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    selectedCategoryId === 'all' ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    {products.length}
                  </span>
                </button>

                {/* Individual Categories */}
                {categories.map((cat) => {
                  const count = products.filter((p) => p.category === cat._id).length;
                  const isSelected = selectedCategoryId === cat._id;
                  return (
                    <button
                      key={cat._id}
                      onClick={() => setSelectedCategoryId(cat._id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#2d5016] text-white font-bold shadow-xs'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img 
                          src={cat.image} 
                          alt="" 
                          className="w-5 h-5 rounded-md object-cover border border-neutral-200 shrink-0" 
                        />
                        <span className="truncate">
                          {language === 'bn' ? cat.banglaName : cat.name}
                        </span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Price Presets Section */}
            <div className="space-y-2 pt-4 border-t border-neutral-100">
              <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400 block px-1">
                {language === 'bn' ? 'মূল্য পরিসীমা' : 'Price Range'}
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'all', labelBn: 'যেকোনো মূল্য (All)', labelEn: 'All Prices' },
                  { id: 'under500', labelBn: '৳৫০০ এর নিচে', labelEn: 'Under ৳500' },
                  { id: '500to1000', labelBn: '৳৫০০ থেকে ৳১০০০', labelEn: '৳500 - ৳1000' },
                  { id: 'above1000', labelBn: '৳১০০০ এর উপরে', labelEn: 'Above ৳1000' },
                ].map((p) => {
                  const isCurrent = pricePreset === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPricePreset(p.id as any)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#2d5016]/10 text-[#2d5016] border border-[#2d5016]/30 font-bold'
                          : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200/70'
                      }`}
                    >
                      <span>{language === 'bn' ? p.labelBn : p.labelEn}</span>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-[#2d5016]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Purity & Stock Filter Switches */}
            <div className="space-y-2.5 pt-4 border-t border-neutral-100">
              <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400 block px-1">
                {language === 'bn' ? 'বিশেষ পছন্দ' : 'Preferences'}
              </span>

              {/* Pure & Certified Switch */}
              <button
                onClick={() => setSunnahOnly(!sunnahOnly)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                  sunnahOnly
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                    : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-2 text-xs">
                  <ShieldCheck className={`w-4 h-4 ${sunnahOnly ? 'text-emerald-600' : 'text-neutral-400'}`} />
                  <span>{language === 'bn' ? '১০০% খাঁটি ও নির্ভেজাল' : '100% Pure Certified'}</span>
                </div>
                <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                  sunnahOnly ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-neutral-300'
                }`}>
                  {sunnahOnly && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>

              {/* In Stock Switch */}
              <button
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                  inStockOnly
                    ? 'bg-neutral-900 border-neutral-900 text-white font-bold'
                    : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <span className="text-xs">{language === 'bn' ? 'শুধু স্টকে আছে এমন' : 'In-Stock Only'}</span>
                <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                  inStockOnly ? 'bg-[#d4af37] border-[#d4af37] text-neutral-950' : 'border-neutral-300'
                }`}>
                  {inStockOnly && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            </div>

            {/* 4. Single Delivery Trust Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#faf8f2] to-[#f2eee1] border border-[#e8dfcb] space-y-2">
              <div className="flex items-center gap-2 text-[#2d5016]">
                <Truck className="w-4 h-4 text-[#2d5016]" />
                <span className="text-xs font-bold">
                  {language === 'bn' ? 'একক ডেলিভারি সুবিধা' : 'Single Delivery Charge'}
                </span>
              </div>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                {language === 'bn'
                  ? 'ঢাকা মাত্র ৭০৳ ও সারা বাংলাদেশ ১২০৳। যত পণ্য খুশি যোগ করুন, একটি ডেলিভারি চার্জ।'
                  : 'Pay once for delivery no matter how many items you add.'}
              </p>
            </div>
          </div>
        </aside>

        {/* ============================================================ */}
        {/* RIGHT CONTENT COLUMN: Sort Bar + Products Grid */}
        {/* ============================================================ */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          {/* Circular Category Strip (Fast visual jumping) */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-neutral-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                {language === 'bn' ? 'দ্রুত ক্যাটাগরি বাছাই' : 'Quick Category Selection'}
              </span>
              {selectedCategoryId !== 'all' && (
                <button
                  onClick={() => setSelectedCategoryId('all')}
                  className="text-xs font-semibold text-[#2d5016] hover:underline cursor-pointer"
                >
                  {language === 'bn' ? 'সব পণ্য দেখান' : 'View All Products'}
                </button>
              )}
            </div>

            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 no-scrollbar justify-start">
              {/* All Products Circular Option */}
              <button
                id="cat-circle-all"
                onClick={() => setSelectedCategoryId('all')}
                className="flex-shrink-0 w-18 sm:w-22 flex flex-col items-center text-center group cursor-pointer focus:outline-none"
              >
                <div
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 transition-all duration-300 ${
                    selectedCategoryId === 'all'
                      ? 'ring-3 ring-[#2d5016] ring-offset-2 scale-105 shadow-md bg-[#2d5016]/10'
                      : 'border-2 border-[#e5e3dc] group-hover:border-[#2d5016] group-hover:scale-105 bg-white shadow-xs'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a1a] via-[#2d5016] to-[#1a1a1a] text-white shadow-inner">
                    <span className="text-sm sm:text-base font-bold text-[#d4af37]">KG</span>
                    <span className="text-[9px] font-semibold text-neutral-200 mt-0.5">
                      {language === 'bn' ? 'সব' : 'All'}
                    </span>
                  </div>
                  <div
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full text-[9px] font-bold shadow-xs whitespace-nowrap transition-colors border border-white ${
                      selectedCategoryId === 'all'
                        ? 'bg-[#2d5016] text-[#d4af37]'
                        : 'bg-[#1a1a1a] text-white group-hover:bg-[#2d5016]'
                    }`}
                  >
                    {products.length}
                  </div>
                </div>
                <span
                  className={`text-[11px] sm:text-xs font-bold mt-2 leading-tight transition-colors line-clamp-1 px-1 ${
                    selectedCategoryId === 'all'
                      ? 'text-[#2d5016]'
                      : 'text-neutral-700 group-hover:text-[#2d5016]'
                  }`}
                >
                  {language === 'bn' ? 'সকল পণ্য' : 'All'}
                </span>
              </button>

              {/* Each Category Circular Item */}
              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat._id).length;
                const isSelected = selectedCategoryId === cat._id;
                return (
                  <button
                    key={cat._id}
                    id={`cat-circle-${cat._id}`}
                    onClick={() => setSelectedCategoryId(cat._id)}
                    className="flex-shrink-0 w-18 sm:w-22 flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                  >
                    <div
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 transition-all duration-300 ${
                        isSelected
                          ? 'ring-3 ring-[#2d5016] ring-offset-2 scale-105 shadow-md bg-[#2d5016]/10'
                          : 'border-2 border-[#e5e3dc] group-hover:border-[#2d5016] group-hover:scale-105 bg-white shadow-xs'
                      }`}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-100 shadow-inner">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500"
                        />
                        <div
                          className={`absolute inset-0 transition-colors duration-300 ${
                            isSelected
                              ? 'bg-[#2d5016]/25'
                              : 'bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-[#2d5016]/30'
                          }`}
                        />
                      </div>
                      <div
                        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full text-[9px] font-bold shadow-xs whitespace-nowrap transition-colors border border-white ${
                          isSelected
                            ? 'bg-[#2d5016] text-[#d4af37]'
                            : 'bg-[#1a1a1a] text-white group-hover:bg-[#2d5016]'
                        }`}
                      >
                        {count}
                      </div>
                    </div>
                    <span
                      className={`text-[11px] sm:text-xs font-bold mt-2 leading-tight transition-colors line-clamp-1 px-1 ${
                        isSelected
                          ? 'text-[#2d5016]'
                          : 'text-neutral-700 group-hover:text-[#2d5016]'
                      }`}
                    >
                      {language === 'bn' ? cat.banglaName : cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls Bar: Mobile Filter Toggle, Active Badges, and Sorting */}
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-neutral-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {/* Mobile Filter Toggle Button (opens slide-over filter drawer) */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-800 bg-neutral-50 hover:bg-neutral-100 cursor-pointer transition-colors shadow-xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#2d5016]" />
                <span>{language === 'bn' ? 'ফিল্টার ও ক্যাটাগরি' : 'Filter & Categories'}</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-[#2d5016]" />
                )}
              </button>

              {/* Active Category / Filter Indicator Pill */}
              <div className="text-xs font-semibold text-neutral-700">
                <span>
                  {language === 'bn'
                    ? `মোট ${filteredProducts.length}টি পণ্য`
                    : `Showing ${filteredProducts.length} products`}
                </span>
                {selectedCategoryId !== 'all' && (
                  <span className="text-[#2d5016] font-bold ml-1.5">
                    • {language === 'bn'
                      ? categories.find((c) => c._id === selectedCategoryId)?.banglaName
                      : categories.find((c) => c._id === selectedCategoryId)?.name}
                  </span>
                )}
              </div>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-neutral-500 font-medium hidden sm:inline">
                {language === 'bn' ? 'সর্ট করুন:' : 'Sort by:'}
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1.5 pr-8 rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-800 bg-white focus:outline-none focus:border-[#2d5016] cursor-pointer appearance-none shadow-xs"
                >
                  <option value="popular">{language === 'bn' ? 'জনপ্রিয় (Popular)' : 'Most Popular'}</option>
                  <option value="newest">{language === 'bn' ? 'নতুন সংযোজন (New)' : 'New Arrivals'}</option>
                  <option value="price_low">{language === 'bn' ? 'দাম: কম থেকে বেশি' : 'Price: Low to High'}</option>
                  <option value="price_high">{language === 'bn' ? 'দাম: বেশি থেকে কম' : 'Price: High to Low'}</option>
                  <option value="rating">{language === 'bn' ? 'সর্বোচ্চ রেটিং' : 'Top Rated'}</option>
                </select>
                <ArrowUpDown className="w-3 h-3 text-neutral-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Product Grid: 3-cols on desktop with sidebar, 2-cols on mobile */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                <Search className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  {language === 'bn' ? 'কোনো পণ্য পাওয়া যায়নি' : 'No products found'}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  {language === 'bn'
                    ? 'অনুগ্রহ করে ফিল্টার পরিবর্তন করুন অথবা ভিন্ন কি-ওয়ার্ড দিয়ে সার্চ করুন।'
                    : 'Try adjusting your filters or search keywords.'}
                </p>
              </div>
              <button
                onClick={resetAllFilters}
                className="px-5 py-2.5 rounded-xl bg-[#2d5016] text-white text-xs font-bold cursor-pointer hover:bg-[#234011]"
              >
                {language === 'bn' ? 'সব ফিল্টার মুছুন' : 'Clear All Filters'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* LUXURY MOBILE FILTER SLIDE-OVER DRAWER (SIDEBAR) */}
      {/* ============================================================ */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[9999] overflow-hidden lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileFilterOpen(false)}
            aria-hidden="true"
          />

          {/* Sliding Filter Panel */}
          <div className="fixed inset-y-0 right-0 max-w-[340px] xs:max-w-[380px] w-[88vw] bg-white shadow-2xl flex flex-col h-full z-[10000] animate-in slide-in-from-right duration-300 border-l border-neutral-200">
            {/* Header */}
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 shrink-0">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#2d5016]" />
                <span className="font-bold text-neutral-900 text-sm">
                  {language === 'bn' ? 'পণ্য ফিল্টার করুন' : 'Filter Products'}
                </span>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 cursor-pointer shadow-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Category selector */}
              <div>
                <span className="text-xs font-bold text-neutral-800 block mb-2">
                  {language === 'bn' ? 'ক্যাটাগরি সমূহ' : 'Categories'}
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategoryId('all')}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold ${
                      selectedCategoryId === 'all'
                        ? 'bg-[#2d5016] text-white font-bold'
                        : 'bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <span>{language === 'bn' ? 'সকল পণ্য' : 'All Products'}</span>
                    <span>{products.length}</span>
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c._id}
                      onClick={() => setSelectedCategoryId(c._id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold ${
                        selectedCategoryId === c._id
                          ? 'bg-[#2d5016] text-white font-bold'
                          : 'bg-neutral-50 text-neutral-700'
                      }`}
                    >
                      <span>{language === 'bn' ? c.banglaName : c.name}</span>
                      <span>{products.filter(p => p.category === c._id).length}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Presets */}
              <div>
                <span className="text-xs font-bold text-neutral-800 block mb-2">
                  {language === 'bn' ? 'মূল্য পরিসীমা' : 'Price Range'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'all', label: language === 'bn' ? 'সব মূল্য' : 'All' },
                    { id: 'under500', label: '< ৳৫০০' },
                    { id: '500to1000', label: '৳৫০০-৳১০০০' },
                    { id: 'above1000', label: '> ৳১০০০' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPricePreset(p.id as any)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border ${
                        pricePreset === p.id
                          ? 'bg-[#2d5016] text-white border-[#2d5016]'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <button
                  onClick={() => setSunnahOnly(!sunnahOnly)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold ${
                    sunnahOnly
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{language === 'bn' ? '১০০% খাঁটি পণ্য' : '100% Pure Certified'}</span>
                  </div>
                  {sunnahOnly && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                </button>

                <button
                  onClick={() => setInStockOnly(!inStockOnly)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold ${
                    inStockOnly
                      ? 'bg-neutral-900 border-neutral-900 text-white'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                  }`}
                >
                  <span>{language === 'bn' ? 'স্টকে আছে' : 'In Stock Only'}</span>
                  {inStockOnly && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center gap-2 shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="flex-1 py-3 px-3 rounded-xl border border-neutral-300 text-neutral-700 text-xs font-bold hover:bg-neutral-100 cursor-pointer"
                >
                  {language === 'bn' ? 'রিসেট' : 'Reset'}
                </button>
              )}
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 px-3 rounded-xl bg-[#2d5016] text-white text-xs font-bold hover:bg-[#234011] cursor-pointer shadow-xs text-center"
              >
                {language === 'bn' ? 'পণ্য দেখুন' : 'Apply Filters'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
