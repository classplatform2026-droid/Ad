import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { Testimonial } from '../types';
import {
  Star,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  Search,
  ArrowLeft,
  X,
  Save,
  MessageSquareQuote,
  MapPin,
  Calendar,
  ShoppingBag,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  UserCheck,
  Award
} from 'lucide-react';

interface AdminTestimonialsManagerProps {
  onBackToDashboard?: () => void;
}

const PRESET_TESTIMONIALS = [
  {
    author: 'মাহমুদুল হাসান',
    city: 'গুলশান, ঢাকা',
    rating: 5,
    date: '২ দিন আগে',
    banglaComment: 'সুন্দরবনের খাঁটি মধু ও মরিয়ম খেজুর অর্ডার করেছিলাম। প্যাকেজিং অত্যন্ত নিরাপদ ছিল এবং মধুর ঘ্রাণেই বিশুদ্ধতা বোঝা যায়। কাসাব গ্যালারিকে অনেক ধন্যবাদ!',
    comment: 'Ordered wild honey and dates. High quality packaging and genuine authentic taste. Highly recommended!',
    productMention: 'সুন্দরবনের কাঁচা মধু (Wildflower Honey)',
    verifiedBuyer: true,
  },
  {
    author: 'নুসরাত জাহান',
    city: 'আগ্রাবাদ, চট্টগ্রাম',
    rating: 5,
    date: '৪ দিন আগে',
    banglaComment: 'তুর্কি প্রিমিয়াম জায়নামাজটা মাশাল্লাহ অনেক আরামদায়ক ও নরম। আম্মুর হাঁটু ব্যথায় খুব উপকারে এসেছে। আর মাত্র একটা সিঙ্গেল ডেলিভারি চার্জ নিয়েছে।',
    comment: 'The Turkish royal prayer mat is super soft and comfortable. Fast delivery and single shipping charge.',
    productMention: 'টার্কিশ রয়েল ভেলভেট জায়নামাজ',
    verifiedBuyer: true,
  },
  {
    author: 'ডা. রফিকুল ইসলাম',
    city: 'সিলেট সদর',
    rating: 5,
    date: '১ সপ্তাহ আগে',
    banglaComment: 'কালোজিরা তেল এবং কাঠের ঘানি ভাঙা খাঁটি সরিষার তেল নিয়েছি। তেলের ঝাঁঝ ও ঘ্রাণ নিখুঁত প্রাকৃতিক। নির্ভরযোগ্য হালাল ব্র্যান্ড।',
    comment: 'Cold-pressed black seed oil and mustard oil are 100% natural and high grade.',
    productMention: 'প্রাকৃতিক কোল্ড-প্রেসড কালোজিরা তেল',
    verifiedBuyer: true,
  }
];

export const AdminTestimonialsManager: React.FC<AdminTestimonialsManagerProps> = ({
  onBackToDashboard,
}) => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial, products, language } = useShop();

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [verifiedFilter, setVerifiedFilter] = useState<string>('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form Fields
  const [formAuthor, setFormAuthor] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formRating, setFormRating] = useState<number>(5);
  const [formDate, setFormDate] = useState('সম্প্রতি');
  const [formBanglaComment, setFormBanglaComment] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formProductMention, setFormProductMention] = useState('');
  const [formVerifiedBuyer, setFormVerifiedBuyer] = useState(true);

  // Delete Confirmation State
  const [itemToDelete, setItemToDelete] = useState<Testimonial | null>(null);

  // Statistics
  const totalReviews = testimonials.length;
  const fiveStarReviews = testimonials.filter((t) => t.rating === 5).length;
  const verifiedCount = testimonials.filter((t) => t.verifiedBuyer).length;
  const averageRating = totalReviews > 0
    ? (testimonials.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalReviews).toFixed(1)
    : '5.0';

  // Filtered List
  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((t) => {
      const matchesSearch =
        t.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.banglaComment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.comment && t.comment.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (t.productMention && t.productMention.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesRating =
        ratingFilter === 'all' ? true : t.rating === Number(ratingFilter);

      const matchesVerified =
        verifiedFilter === 'all'
          ? true
          : verifiedFilter === 'verified'
          ? t.verifiedBuyer
          : !t.verifiedBuyer;

      return matchesSearch && matchesRating && matchesVerified;
    });
  }, [testimonials, searchTerm, ratingFilter, verifiedFilter]);

  // Open modal for new
  const handleOpenNew = () => {
    setEditingId(null);
    setFormAuthor('');
    setFormCity('ঢাকা');
    setFormRating(5);
    setFormDate('সম্প্রতি');
    setFormBanglaComment('');
    setFormComment('');
    setFormProductMention(products.length > 0 ? (products[0].banglaName || products[0].name) : '');
    setFormVerifiedBuyer(true);
    setIsModalOpen(true);
  };

  // Open modal for edit
  const handleOpenEdit = (item: Testimonial) => {
    setEditingId(item.id);
    setFormAuthor(item.author || '');
    setFormCity(item.city || '');
    setFormRating(item.rating || 5);
    setFormDate(item.date || 'সম্প্রতি');
    setFormBanglaComment(item.banglaComment || '');
    setFormComment(item.comment || '');
    setFormProductMention(item.productMention || '');
    setFormVerifiedBuyer(item.verifiedBuyer ?? true);
    setIsModalOpen(true);
  };

  // Apply preset
  const handleApplyPreset = (preset: typeof PRESET_TESTIMONIALS[0]) => {
    setFormAuthor(preset.author);
    setFormCity(preset.city);
    setFormRating(preset.rating);
    setFormDate(preset.date);
    setFormBanglaComment(preset.banglaComment);
    setFormComment(preset.comment);
    setFormProductMention(preset.productMention);
    setFormVerifiedBuyer(preset.verifiedBuyer);
  };

  // Save (Create or Update)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthor.trim() || !formBanglaComment.trim()) {
      alert('দয়া করে গ্রাহকের নাম ও বাংলা রিভিউ পূরণ করুন');
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        author: formAuthor.trim(),
        city: formCity.trim() || 'ঢাকা',
        rating: Number(formRating) || 5,
        date: formDate.trim() || 'সম্প্রতি',
        banglaComment: formBanglaComment.trim(),
        comment: formComment.trim() || formBanglaComment.trim(),
        productMention: formProductMention.trim(),
        verifiedBuyer: formVerifiedBuyer,
      };

      if (editingId) {
        await updateTestimonial(editingId, payload);
      } else {
        await addTestimonial(payload);
      }
      setIsModalOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      await deleteTestimonial(itemToDelete.id);
      setItemToDelete(null);
    }
  };

  return (
    <div id="admin-testimonials-manager" className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header & Navigation Breadcrumbs */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d5016] hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← ড্যাশবোর্ড ওভারভিউতে ফিরুন</span>
            </button>
          )}
          <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-[#fbf8ee] text-[#855e09] border border-[#d4af37]/30">
            হোমপেজ সোশ্যাল প্রুফ ও রিভিউ
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-brand text-lg sm:text-xl font-bold text-neutral-900">
                  গ্রাহকদের সন্তুষ্টির অভিজ্ঞতা (Customer Satisfaction Reviews)
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  লাইভ ওয়েবসাইট
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                ওয়েবসাইটের হোমপেজে প্রদর্শিত গ্রাহকদের অভিজ্ঞতা, রেটিং এবং পণ্যের রিভিউ আপডেট ও পরিচালনা করুন
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenNew}
            className="px-4 py-2.5 rounded-xl bg-[#2d5016] hover:bg-[#234011] text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-all shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন রিভিউ যুক্ত করুন</span>
          </button>
        </div>

        {/* 2. Overview Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-3.5">
            <div className="flex items-center justify-between text-neutral-500 text-xs mb-1">
              <span>মোট রিভিউ</span>
              <MessageSquareQuote className="w-4 h-4 text-neutral-400" />
            </div>
            <div className="text-xl font-bold text-neutral-900 font-serif-brand">
              {totalReviews} <span className="text-xs font-normal text-neutral-500">টি</span>
            </div>
          </div>

          <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-3.5">
            <div className="flex items-center justify-between text-amber-700 text-xs mb-1">
              <span>গড় রেটিং স্কোর</span>
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
            <div className="text-xl font-bold text-amber-900 font-serif-brand flex items-center gap-1.5">
              <span>{averageRating}</span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-3.5">
            <div className="flex items-center justify-between text-emerald-700 text-xs mb-1">
              <span>৫-স্টার রিভিউ</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl font-bold text-emerald-900 font-serif-brand">
              {fiveStarReviews}{' '}
              <span className="text-xs font-normal text-emerald-700">
                ({totalReviews > 0 ? Math.round((fiveStarReviews / totalReviews) * 100) : 100}%)
              </span>
            </div>
          </div>

          <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-3.5">
            <div className="flex items-center justify-between text-blue-700 text-xs mb-1">
              <span>ভেরিফাইড ক্রেতা</span>
              <UserCheck className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-xl font-bold text-blue-900 font-serif-brand">
              {verifiedCount} <span className="text-xs font-normal text-blue-700">জন</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="গ্রাহকের নাম, এলাকা বা মন্তব্য খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 text-xs focus:ring-2 focus:ring-[#2d5016] focus:border-transparent outline-hidden bg-neutral-50 focus:bg-white"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end overflow-x-auto pb-1 md:pb-0">
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-semibold bg-neutral-50 text-neutral-700 focus:outline-hidden focus:ring-2 focus:ring-[#2d5016]"
          >
            <option value="all">সব রেটিং</option>
            <option value="5">⭐⭐⭐⭐⭐ (৫ স্টার)</option>
            <option value="4">⭐⭐⭐⭐ (৪ স্টার)</option>
            <option value="3">⭐⭐⭐ (৩ স্টার)</option>
          </select>

          <select
            value={verifiedFilter}
            onChange={(e) => setVerifiedFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-semibold bg-neutral-50 text-neutral-700 focus:outline-hidden focus:ring-2 focus:ring-[#2d5016]"
          >
            <option value="all">সব ক্রেতা</option>
            <option value="verified">শুধুমাত্র ভেরিফাইড</option>
            <option value="unverified">অন্যান্য</option>
          </select>
        </div>
      </div>

      {/* 4. Testimonials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTestimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-[#e5e3dc] p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between relative group"
          >
            {/* Card Header: Rating, Date & Quick Actions */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center text-amber-500">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-neutral-400 font-medium">{item.date}</span>
                  <div className="flex items-center gap-1 pl-2 border-l border-neutral-100">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      title="এডিট করুন"
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-[#2d5016] hover:bg-[#2d5016]/10 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setItemToDelete(item)}
                      title="মুছে ফেলুন"
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bangla Comment (Shown on homepage) */}
              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed italic mb-3">
                "{item.banglaComment}"
              </p>

              {/* English Comment (if available) */}
              {item.comment && item.comment !== item.banglaComment && (
                <p className="text-[11px] text-neutral-500 italic mb-3 border-l-2 border-neutral-200 pl-2">
                  EN: "{item.comment}"
                </p>
              )}
            </div>

            {/* Card Footer: Author, Location, Product & Verified Badge */}
            <div className="pt-3 border-t border-neutral-100 mt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900 flex items-center gap-1.5">
                    <span>{item.author}</span>
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-0.5">
                    <MapPin className="w-3 h-3 text-neutral-400" />
                    <span>{item.city}</span>
                  </div>
                </div>

                {item.verifiedBuyer ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>ভেরিফাইড ক্রেতা</span>
                  </span>
                ) : (
                  <span className="text-[10px] text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">
                    সাধারণ রিভিউ
                  </span>
                )}
              </div>

              {item.productMention && (
                <div className="mt-2 text-[10px] text-[#2d5016] font-semibold bg-[#2d5016]/5 px-2 py-1 rounded-md flex items-center gap-1 truncate">
                  <ShoppingBag className="w-3 h-3 shrink-0" />
                  <span className="truncate">{item.productMention}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredTestimonials.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200 space-y-3">
          <MessageSquareQuote className="w-12 h-12 text-neutral-300 mx-auto" />
          <h3 className="font-bold text-neutral-700 text-sm">কোনো গ্রাহক রিভিউ পাওয়া যায়নি</h3>
          <p className="text-xs text-neutral-400">
            নতুন রিভিউ যুক্ত করতে উপরের 'নতুন রিভিউ যুক্ত করুন' বাটনে চাপুন।
          </p>
          <button
            onClick={handleOpenNew}
            className="px-4 py-2 rounded-xl bg-[#2d5016] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন রিভিউ যুক্ত করুন</span>
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. ADD / EDIT TESTIMONIAL MODAL */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="font-serif-brand text-lg font-bold text-neutral-900">
                  {editingId ? 'গ্রাহক রিভিউ এডিট করুন' : 'নতুন গ্রাহক রিভিউ যুক্ত করুন'}
                </h3>
                <p className="text-xs text-neutral-500">
                  এটি সরাসরি হোমপেজের 'গ্রাহকদের সন্তুষ্টির অভিজ্ঞতা' সেকশনে দেখা যাবে
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Preset Bar (only for new) */}
            {!editingId && (
              <div className="bg-[#faf9f5] border border-[#e5e3dc] rounded-2xl p-3 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-700">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>কুইক ডেমো প্রিসেট (এক ক্লিকে পূরণ করুন):</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PRESET_TESTIMONIALS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#2d5016]/10 text-[11px] font-semibold text-neutral-700 border border-neutral-200 transition-colors cursor-pointer"
                    >
                      {preset.author} ({preset.city.split(',')[0]})
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* Row 1: Author & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-neutral-800 flex items-center justify-between">
                    <span>গ্রাহকের নাম (Author Name) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="যেমন: তানভীর হাসান"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2d5016] focus:border-transparent outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-800">
                    এলাকা / জেলা (City / Location) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    placeholder="যেমন: ধানমন্ডি, ঢাকা"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2d5016] focus:border-transparent outline-hidden"
                  />
                </div>
              </div>

              {/* Row 2: Rating Stars & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-neutral-800 block">
                    স্টার রেটিং (Rating: ১ - ৫ স্টার)
                  </label>
                  <div className="flex items-center gap-1.5 p-1.5 rounded-xl border border-neutral-200 bg-neutral-50">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormRating(star)}
                        className={`p-1 rounded-lg transition-colors cursor-pointer ${
                          star <= formRating ? 'text-amber-500' : 'text-neutral-300 hover:text-amber-300'
                        }`}
                      >
                        <Star className={`w-5 h-5 ${star <= formRating ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                    <span className="ml-2 font-bold text-neutral-700">{formRating} স্টার</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-800">
                    রিভিউয়ের সময় (Time / Date)
                  </label>
                  <input
                    type="text"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    placeholder="যেমন: ৩ দিন আগে, বা ১৫ মে ২০২৪"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2d5016] focus:border-transparent outline-hidden"
                  />
                </div>
              </div>

              {/* Row 3: Product Mention & Verified Switch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-neutral-800">
                    ক্রয়কৃত পণ্য (Product Mention)
                  </label>
                  <input
                    type="text"
                    value={formProductMention}
                    onChange={(e) => setFormProductMention(e.target.value)}
                    placeholder="যেমন: সুন্দরবনের কাঁচা মধু"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2d5016] focus:border-transparent outline-hidden"
                  />
                  {products.length > 0 && (
                    <select
                      onChange={(e) => {
                        if (e.target.value) setFormProductMention(e.target.value);
                      }}
                      className="w-full mt-1 px-2 py-1 text-[11px] rounded-lg border border-neutral-200 text-neutral-600 bg-neutral-50"
                    >
                      <option value="">-- স্টোরের পণ্য থেকে বেছে নিন --</option>
                      {products.map((p) => (
                        <option key={p._id} value={p.banglaName || p.name}>
                          {p.banglaName || p.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-800 block">
                    ভেরিফাইড ক্রেতা স্ট্যাটাস
                  </label>
                  <div className="flex items-center gap-3 p-2 rounded-xl border border-neutral-200 bg-neutral-50 mt-1">
                    <button
                      type="button"
                      onClick={() => setFormVerifiedBuyer(!formVerifiedBuyer)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                        formVerifiedBuyer ? 'bg-[#2d5016]' : 'bg-neutral-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          formVerifiedBuyer ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <span className="font-semibold text-neutral-800">
                      {formVerifiedBuyer ? '✅ ভেরিফাইড ক্রেতা ব্যাজ' : '❌ সাধারণ রিভিউ'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 4: Bangla Comment (Primary) */}
              <div className="space-y-1">
                <label className="font-bold text-neutral-800 flex items-center justify-between">
                  <span>গ্রাহকের সন্তুষ্টির রিভিউ মন্তব্য (বাংলা) *</span>
                  <span className="text-[10px] text-neutral-400 font-normal">
                    {formBanglaComment.length} অক্ষর
                  </span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formBanglaComment}
                  onChange={(e) => setFormBanglaComment(e.target.value)}
                  placeholder="যেমন: আলহামদুলিল্লাহ! সুন্দরবনের মধুটা আসলেও খাঁটি। কাঁচা মধুর সুবাস অসাধারণ..."
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2d5016] focus:border-transparent outline-hidden bg-neutral-50 focus:bg-white resize-none"
                />
              </div>

              {/* Row 5: English Comment (Optional) */}
              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 block">
                  ইংরেজি রিভিউ (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  placeholder="Optional English review translation"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2d5016] focus:border-transparent outline-hidden"
                />
              </div>

              {/* Live Card Preview Inside Modal */}
              <div className="space-y-1 pt-2">
                <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                  লাইভ প্রিভিউ (হোমপেজে যেভাবে দেখা যাবে):
                </label>
                <div className="bg-[#faf9f5] p-4 rounded-xl border border-[#e5e3dc] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-amber-500">
                      {[...Array(formRating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-neutral-400">{formDate || 'সম্প্রতি'}</span>
                  </div>
                  <p className="text-xs text-neutral-700 italic">
                    "{formBanglaComment || 'রিভিউ টেক্সট এখানে প্রদর্শিত হবে...'}"
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60 text-[11px]">
                    <div>
                      <span className="font-bold text-neutral-900">{formAuthor || 'গ্রাহকের নাম'}</span>
                      <span className="text-neutral-400 ml-1">({formCity || 'ঠিকানা'})</span>
                    </div>
                    {formVerifiedBuyer && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        ভেরিফাইড
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 font-bold transition-all cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-[#2d5016] hover:bg-[#234011] text-white font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>সংরক্ষণ হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{editingId ? 'রিভিউ আপডেট করুন' : 'রিভিউ সংরক্ষণ করুন'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. DELETE CONFIRMATION MODAL */}
      {/* ========================================================= */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base text-neutral-900">রিভিউটি মুছে ফেলতে চান?</h4>
              <p className="text-xs text-neutral-500 mt-1">
                গ্রাহক <strong>"{itemToDelete.author}"</strong>-এর সন্তুষ্টির রিভিউটি ওয়েবসাইট থেকে সম্পূর্ণ মুছে ফেলা হবে।
              </p>
            </div>
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-600 text-xs font-bold hover:bg-neutral-50 cursor-pointer"
              >
                বাতিল
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                হ্যাঁ, মুছে ফেলুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
