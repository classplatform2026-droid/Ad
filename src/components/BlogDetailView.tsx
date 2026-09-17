import React from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_CONFIG } from '../data/mockData';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Tag, 
  MessageCircle, 
  ShoppingBag,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const BlogDetailView: React.FC = () => {
  const { selectedBlog, blogs, setSelectedBlog, setCurrentPage, setSelectedCategoryId, language, showToast } = useShop();

  if (!selectedBlog) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <p className="text-neutral-500 mb-4">কোনো ব্লগ পাওয়া যায়নি।</p>
        <button
          onClick={() => setCurrentPage('blog')}
          className="px-5 py-2.5 rounded-full bg-[#2d5016] text-white text-xs font-bold"
        >
          ব্লগ তালিকায় ফিরে যান
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(language === 'bn' ? 'ব্লগ লিংক কপি হয়েছে' : 'Article link copied');
    }
  };

  const otherBlogs = blogs.filter((b) => b._id !== selectedBlog._id).slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentPage('blog')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-[#2d5016] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'bn' ? 'সকল ব্লগে ফিরে যান' : 'Back to Articles'}</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 text-xs text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5 text-neutral-500" />
          <span>{language === 'bn' ? 'শেয়ার' : 'Share'}</span>
        </button>
      </div>

      {/* Hero Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-[#2d5016]/10 text-[#2d5016] text-xs font-bold">
            {language === 'bn' ? selectedBlog.banglaCategoryName : selectedBlog.categoryName}
          </span>
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? selectedBlog.banglaReadTime : selectedBlog.readTime}</span>
          </div>
          <span className="text-neutral-300">•</span>
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{selectedBlog.publishedDate}</span>
          </div>
        </div>

        <h1 className="font-serif-brand text-2xl sm:text-4xl font-bold text-neutral-900 leading-tight">
          {language === 'bn' ? selectedBlog.banglaTitle : selectedBlog.title}
        </h1>

        <div className="flex items-center gap-2 pt-1 border-t border-neutral-100">
          <div className="w-8 h-8 rounded-full bg-[#2d5016]/20 text-[#2d5016] font-bold text-xs flex items-center justify-center">
            KG
          </div>
          <div>
            <span className="text-xs font-bold text-neutral-900 block">{selectedBlog.author}</span>
            <span className="text-[10px] text-neutral-400">Kasab Gallery Editorial</span>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200">
        <img
          src={selectedBlog.image}
          alt={selectedBlog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200 shadow-xs space-y-6 text-neutral-800 text-sm sm:text-base leading-relaxed">
        {/* Intro */}
        <p className="text-base sm:text-lg font-medium text-neutral-700 leading-relaxed border-l-4 border-[#2d5016] pl-4 italic">
          {language === 'bn' ? selectedBlog.banglaExcerpt : selectedBlog.excerpt}
        </p>

        {/* Formatted Content Paragraphs */}
        <div className="space-y-4 text-neutral-700 whitespace-pre-line leading-relaxed">
          {language === 'bn' ? selectedBlog.banglaContent : selectedBlog.content}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-neutral-100 flex items-center gap-2 flex-wrap">
          <Tag className="w-4 h-4 text-neutral-400" />
          <span className="text-xs font-bold text-neutral-500">ট্যাগস:</span>
          {selectedBlog.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Embedded Shop Promotion Banner */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d5016] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif-brand text-lg font-bold text-[#d4af37]">
              খাঁটি ও প্রাকৃতিক পণ্যের জন্য Kasab Gallery
            </h4>
            <p className="text-xs text-neutral-300">
              একটি মাত্র ডেলিভারি চার্জে বাংলাদেশের যেকোনো প্রান্ত থেকে খাঁটি পণ্য সংগ্রহ করুন।
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategoryId('all');
              setCurrentPage('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-full bg-[#d4af37] hover:bg-[#c49f2b] text-neutral-950 text-xs font-bold shadow-md cursor-pointer shrink-0"
          >
            পণ্যসমূহ দেখুন
          </button>
        </div>
      </div>

      {/* More Blogs */}
      {otherBlogs.length > 0 && (
        <div className="pt-8 border-t border-neutral-200 space-y-4">
          <h3 className="font-serif-brand text-xl font-bold text-neutral-900">
            {language === 'bn' ? 'আরও গুরুত্বপূর্ণ আর্টিকেল' : 'Read Next'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherBlogs.map((b) => (
              <div
                key={b._id}
                onClick={() => {
                  setSelectedBlog(b);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white p-4 rounded-2xl border border-neutral-200 hover:border-[#2d5016] transition-colors cursor-pointer flex gap-3 items-center"
              >
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] text-neutral-400 block">{b.publishedDate}</span>
                  <h4 className="text-xs font-bold text-neutral-900 line-clamp-2">
                    {language === 'bn' ? b.banglaTitle : b.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
