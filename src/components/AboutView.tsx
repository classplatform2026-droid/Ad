import React from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_CONFIG } from '../data/mockData';
import { 
  ShieldCheck, 
  Heart, 
  Star, 
  Award, 
  Truck, 
  CheckCircle2, 
  Users, 
  ExternalLink,
  MessageCircle
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setCurrentPage, setSelectedCategoryId, language } = useShop();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Brand Hero */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a1a1a] via-[#2d5016] to-[#1a1a1a] text-[#d4af37] font-serif-brand font-bold text-3xl flex items-center justify-center mx-auto shadow-md border border-[#d4af37]/30">
          KG
        </div>
        <h1 className="font-serif-brand text-3xl sm:text-4xl font-bold text-neutral-900">
          Kasab Gallery - খাঁটি ও বিশুদ্ধতার বিশ্বস্ত ঠিকানা
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          {language === 'bn'
            ? 'আমাদের লক্ষ্য প্রতিটি পরিবারে পৌঁছে দেওয়া সম্পূর্ণ নির্ভেজাল, প্রাকৃতিক এবং স্বাস্থ্যসম্মত খাবার ও প্রাত্যহিক প্রসাধন।'
            : 'Committed to bringing genuine organic superfoods, sunnah items, and natural skincare to every home across Bangladesh.'}
        </p>
      </div>

      {/* Brand Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#2d5016]/10 text-[#2d5016] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif-brand text-lg font-bold text-neutral-900">১০০% নির্ভেজাল পণ্য</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            কোনো প্রকার রাসায়নিক, কৃত্রিম ফ্লেভার বা ক্ষতিকর প্রিজারভেটিভ ছাড়া সরাসরি খাঁটি উৎস থেকে সংগৃহীত।
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/20 text-[#2d5016] flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-serif-brand text-lg font-bold text-neutral-900">একক ডেলিভারি চার্জ</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            গ্রাহকদের সুবিধার্থে যত পণ্যই অর্ডার করা হোক না কেন, সারা বাংলাদেশে একটি মাত্র ফিক্সড ডেলিভারি চার্জ প্রযোজ্য।
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Star className="w-6 h-6 fill-current" />
          </div>
          <h3 className="font-serif-brand text-lg font-bold text-neutral-900">১০,০০০+ ফেসবুক অনুসারী</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            ফেসবুকে শতভাগ পজিটিভ রেটিং ও হাজারো সন্তুষ্ট গ্রাহকের ভালোবাসা নিয়ে আমাদের প্রতিদিনের অগ্রযাত্রা।
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200 space-y-6">
        <h2 className="font-serif-brand text-2xl font-bold text-neutral-900">আমাদের গল্প ও পথচলা</h2>
        <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <p>
            বাজারের অধিকাংশ খাদ্যদ্রব্য ও প্রসাধন সামগ্রীতে ভেজাল এবং রাসায়নিক উপাদানের আধিক্য আমাদের স্বাস্থ্যকে প্রতিনিয়ত হুমকির মুখে ফেলছে। এই বাস্তবতায় খাঁটি, পুষ্টিকর ও অর্গানিক সামগ্রীর চাহিদা পূরণের দৃঢ় প্রত্যয় নিয়ে <strong>Kasab Gallery</strong>-র যাত্রা শুরু।
          </p>
          <p>
            সুন্দরবনের বুনো মধু সংগ্রহকারীদের কাছ থেকে সরাসরি খাঁটি মধু সংগ্রহ, সৌদি আরব থেকে প্রিমিয়াম গ্রেডের আজওয়া খেজুর আমদানি, শতভাগ খাঁটি কোল্ড প্রেসড এক্সট্রা ভার্জিন কালোজিরা তেল এবং প্রাকৃতিক উপাদানসমৃদ্ধ অর্গানিক স্কিনকেয়ার পণ্যের মাধ্যমে আমরা একটি স্বাস্থ্যকর জীবনধারা উপহার দিতে কাজ করছি।
          </p>
          <p>
            আমাদের ফেসবুক পেইজে ১০ হাজারের বেশি অনুসারী এবং ১০০% রেটিং প্রমাণ করে—গ্রাহকের আস্থাই আমাদের সবচেয়ে বড় অর্জন।
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center gap-4">
          <a
            href={BRAND_CONFIG.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2"
          >
            <span>ফেসবুক পেইজ ভিজিট করুন</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={BRAND_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>সরাসরি হোয়াটসঅ্যাপে কথা বলুন</span>
          </a>
        </div>
      </div>
    </div>
  );
};
