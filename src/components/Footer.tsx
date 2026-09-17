import React from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_CONFIG } from '../data/mockData';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Truck, 
  Star, 
  Heart, 
  ExternalLink 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedCategoryId, language } = useShop();

  return (
    <footer className="bg-[#141414] text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-800 to-[#2d5016] flex items-center justify-center border border-[#d4af37]/40 shadow-sm">
                <span className="font-serif-brand text-xl font-bold text-[#d4af37]">KG</span>
              </div>
              <div>
                <span className="font-serif-brand text-xl font-bold text-white tracking-tight">
                  Kasab Gallery
                </span>
                <span className="block text-[11px] text-[#d4af37] font-medium">
                  {language === 'bn' ? BRAND_CONFIG.tagline : BRAND_CONFIG.taglineEn}
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              {language === 'bn'
                ? 'Kasab Gallery - একটি খাঁটি ও প্রাকৃতিক উপাদানভিত্তিক ই-কমার্স উদ্যোগ। খাঁটি মধু, আজওয়া খেজুর, অর্গানিক স্কিনকেয়ার ও প্রিমিয়াম লাইফস্টাইল পণ্য পৌঁছে দিচ্ছি এক সিঙ্গেল ডেলিভারি চার্জে।'
                : 'Authentic pure natural lifestyle e-commerce platform offering wild honey, premium dates, organic skincare, and curated essentials across Bangladesh.'}
            </p>

            {/* Trust pill */}
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <span className="inline-flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>৫.০ রেটিং</span>
              </span>
              <span className="text-neutral-600">•</span>
              <span>{BRAND_CONFIG.ratingText}</span>
            </div>

            {/* Social Link */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={BRAND_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Facebook ({BRAND_CONFIG.followersText})</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={BRAND_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Categories Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'bn' ? 'পণ্য ক্যাটাগরি' : 'Categories'}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryId('food');
                    setCurrentPage('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  খাদ্য ও পুষ্টি (Food & Nutrition)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryId('skincare');
                    setCurrentPage('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  প্রাকৃতিক স্কিনকেয়ার (Skincare)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryId('accessories');
                    setCurrentPage('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  দৈনন্দিন এক্সেসরিজ (Accessories)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryId('islamic');
                    setCurrentPage('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ইসলামিক আইটেমস ও আতর (Islamic)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryId('winter');
                    setCurrentPage('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  উইন্টার কালেকশন (Winter)
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'bn' ? 'গুরুত্বপূর্ণ লিংক' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'হোম পেজ' : 'Home'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategoryId('all');
                    setCurrentPage('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'সকল পণ্য' : 'All Products'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('blog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white text-emerald-400 font-semibold transition-colors cursor-pointer"
                >
                  ✍️ {language === 'bn' ? 'স্বাস্থ্য ও পুষ্টি ব্লগ' : 'Health & Nutrition Blog'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Kasab Gallery'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'যোগাযোগ ও সহায়তা' : 'Contact Support'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#d4af37] hover:underline font-semibold cursor-pointer"
                >
                  {language === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin Portal'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'bn' ? 'অফিস ও যোগাযোগ' : 'Contact & Hours'}
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.banglaAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${BRAND_CONFIG.phone}`} className="hover:text-white font-bold">
                  {BRAND_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                <a href={`mailto:${BRAND_CONFIG.email}`} className="hover:text-white">
                  {BRAND_CONFIG.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-400 font-medium">{BRAND_CONFIG.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Trust Strip */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="text-neutral-400 font-bold">পেমেন্ট পদ্ধতি:</span>
            <span className="px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 font-semibold">
              ক্যাশ অন ডেলিভারি (COD)
            </span>
            <span className="px-2.5 py-1 rounded bg-pink-950/60 text-pink-300 font-semibold border border-pink-900/40">
              bKash
            </span>
            <span className="px-2.5 py-1 rounded bg-orange-950/60 text-orange-300 font-semibold border border-orange-900/40">
              Nagad
            </span>
            <span className="px-2.5 py-1 rounded bg-purple-950/60 text-purple-300 font-semibold border border-purple-900/40">
              Rocket
            </span>
          </div>

          <p className="text-center md:text-right">
            © {new Date().getFullYear()} Kasab Gallery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
