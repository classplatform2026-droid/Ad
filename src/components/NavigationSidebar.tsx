import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { BRAND_CONFIG } from '../data/mockData';
import { 
  X, 
  Search, 
  Home, 
  ShoppingBag, 
  BookOpen, 
  Info, 
  Phone, 
  MessageCircle, 
  LayoutDashboard, 
  Globe, 
  ChevronRight, 
  Truck, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

export const NavigationSidebar: React.FC = () => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    products,
    categories,
    currentPage,
    setCurrentPage,
    selectedCategoryId,
    setSelectedCategoryId,
    language,
    setLanguage,
    searchQuery,
    setSearchQuery,
  } = useShop();

  // Close on Escape key press & prevent background body scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSidebarOpen, setIsSidebarOpen]);

  const handleNav = (page: typeof currentPage, categoryId?: any) => {
    if (categoryId !== undefined) {
      setSelectedCategoryId(categoryId);
    }
    setCurrentPage(page);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (currentPage !== 'catalog') {
        setCurrentPage('catalog');
      }
      setIsSidebarOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <div 
          id="global-navigation-sidebar-container" 
          className="fixed inset-0 z-[9998] flex justify-end select-none"
        >
          {/* 1. Animated Backdrop Overlay */}
          <motion.div
            id="sidebar-backdrop"
            onClick={() => setIsSidebarOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* 2. Animated Slide-Over Panel (Right Aligned) */}
          <motion.div 
            id="sidebar-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative z-[9999] w-[88vw] max-w-[360px] sm:max-w-[400px] h-full max-h-[100dvh] bg-white shadow-2xl flex flex-col border-l border-neutral-200"
          >
            {/* Top Brand Accent Gradient */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#d4af37] via-[#2d5016] to-[#d4af37] shrink-0" />

            {/* Header with Brand & Close Button */}
            <div className="p-4 sm:p-5 border-b border-neutral-200/90 flex items-center justify-between gap-3 bg-neutral-50/90 shrink-0">
              <button
                onClick={() => handleNav('home')}
                className="flex items-center gap-3 text-left min-w-0 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1a1a1a] via-[#2d5016] to-[#1a1a1a] flex items-center justify-center shadow-md border border-[#d4af37]/40 shrink-0 group-hover:scale-105 transition-transform">
                  <span className="font-serif-brand text-xl font-bold text-[#d4af37]">
                    KG
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif-brand text-lg font-black text-neutral-900 tracking-tight truncate">
                      Kasab Gallery
                    </span>
                    <span className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded bg-[#2d5016]/10 text-[#2d5016] border border-[#2d5016]/20 shrink-0">
                      {language === 'bn' ? 'ন্যাচারাল' : 'Natural'}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 font-medium truncate">
                    {language === 'bn' ? BRAND_CONFIG.tagline : BRAND_CONFIG.taglineEn}
                  </p>
                </div>
              </button>

              {/* High-visibility Close Button */}
              <button
                id="sidebar-close-action-btn"
                onClick={() => setIsSidebarOpen(false)}
                className="w-10 h-10 rounded-full bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-700 hover:text-neutral-950 flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0 shadow-xs"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 overscroll-contain">
              {/* In-sidebar Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  id="sidebar-search-box"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'bn' ? 'পণ্য বা মধু খুঁজুন...' : 'Search products...'}
                  className="w-full pl-10 pr-9 py-2.5 bg-neutral-100 border border-neutral-300 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#2d5016] focus:bg-white transition-all shadow-inner"
                />
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>

              {/* Primary Navigation Menu */}
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 px-2 block pb-1">
                  {language === 'bn' ? 'প্রধান মেনু' : 'Main Menu'}
                </span>
                {[
                  { page: 'home', labelBn: 'হোম পেজ', labelEn: 'Home', icon: Home },
                  { page: 'catalog', labelBn: 'সকল পণ্য কালেকশন', labelEn: 'All Products', icon: ShoppingBag, badge: products.length },
                  { page: 'blog', labelBn: 'ব্লগ ও স্বাস্থ্য গাইড', labelEn: 'Blog & Health Guides', icon: BookOpen },
                  { page: 'about', labelBn: 'আমাদের কথা', labelEn: 'About Kasab Gallery', icon: Info },
                  { page: 'contact', labelBn: 'যোগাযোগ ও সরাসরি সাহায্য', labelEn: 'Contact & Support', icon: Phone },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.page || (item.page === 'blog' && currentPage === 'blog_detail');
                  return (
                    <button
                      key={item.page}
                      id={`sidebar-link-${item.page}`}
                      onClick={() => handleNav(item.page as any)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#2d5016] text-white shadow-sm'
                          : 'text-neutral-800 hover:bg-neutral-100 hover:text-neutral-950'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#d4af37]' : 'text-neutral-500'}`} />
                        <span>{language === 'bn' ? item.labelBn : item.labelEn}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge !== undefined && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                            isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white/70' : 'text-neutral-300'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Product Categories Section */}
              <div className="space-y-2 pt-1 border-t border-neutral-100">
                <div className="flex items-center justify-between px-2 pt-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                    {language === 'bn' ? 'পণ্য ক্যাটাগরি সমূহ' : 'Product Categories'}
                  </span>
                  <button
                    onClick={() => handleNav('catalog', 'all')}
                    className="text-[11px] font-bold text-[#2d5016] hover:underline cursor-pointer"
                  >
                    {language === 'bn' ? 'সবগুলো' : 'View All'}
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-1.5">
                  {categories.map((cat) => {
                    const count = products.filter(p => p.category === cat._id).length;
                    const isCatSelected = currentPage === 'catalog' && selectedCategoryId === cat._id;
                    return (
                      <button
                        key={cat._id}
                        id={`sidebar-category-btn-${cat._id}`}
                        onClick={() => handleNav('catalog', cat._id)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                          isCatSelected
                            ? 'bg-[#2d5016]/10 border-[#2d5016]/40 text-[#2d5016] font-bold shadow-xs'
                            : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-800'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={cat.image}
                            alt=""
                            className="w-9 h-9 rounded-xl object-cover border border-neutral-200 shrink-0"
                          />
                          <div className="text-left min-w-0">
                            <div className="text-xs font-bold text-neutral-900 truncate">
                              {language === 'bn' ? cat.banglaName : cat.name}
                            </div>
                            <div className="text-[10px] text-neutral-500 truncate">
                              {cat.descriptionBn || cat.description}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-white text-neutral-700 border border-neutral-200 shrink-0">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Delivery & Purity Trust Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#faf8f2] to-[#f4f1e6] border border-[#e8e2cd] space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-[#2d5016]">
                  <Truck className="w-4 h-4 text-[#2d5016] shrink-0" />
                  <span className="text-xs font-bold">
                    {language === 'bn' ? 'একক ডেলিভারি চার্জের নিশ্চয়তা' : 'Single Delivery Charge'}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  {language === 'bn'
                    ? 'যত খুশি পণ্য অর্ডার করুন, ঢাকা মাত্র ৭০৳ ও সারা বাংলাদেশ ১২০৳ এক ডেলিভারি চার্জ।'
                    : 'Order as many products as you want for a single flat shipping fee.'}
                </p>
                <div className="flex items-center gap-1.5 pt-1 text-[10px] font-bold text-neutral-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{language === 'bn' ? '১০০% খাঁটি, প্রাকৃতিক ও ল্যাব পরীক্ষিত' : '100% Pure & Lab-Tested'}</span>
                </div>
              </div>

              {/* Direct Support & Order Channels */}
              <div className="space-y-2 pt-1 border-t border-neutral-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 px-2 block">
                  {language === 'bn' ? 'সরাসরি সহায়তা ও অর্ডার' : 'Instant Help & Order'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={BRAND_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${BRAND_CONFIG.phone}`}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{language === 'bn' ? 'সরাসরি কল' : 'Call Now'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Sticky Drawer Footer (Language Switcher & Admin Portal) */}
            <div className="p-3.5 sm:p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between gap-2 shrink-0">
              <button
                id="sidebar-language-toggle"
                onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs font-bold text-neutral-800 hover:bg-neutral-100 cursor-pointer active:scale-95 shadow-xs"
              >
                <Globe className="w-4 h-4 text-neutral-600" />
                <span>{language === 'bn' ? 'English (EN)' : 'বাংলা (BN)'}</span>
              </button>

              <button
                id="sidebar-admin-portal-btn"
                onClick={() => handleNav('admin')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 text-[#d4af37] text-xs font-bold hover:bg-black cursor-pointer active:scale-95 shadow-xs"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{language === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin Panel'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
