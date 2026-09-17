import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BlogPost } from '../types';
import { BookOpen, Clock, ArrowRight, User, Calendar, Tag, Search, Sparkles } from 'lucide-react';

export const BlogView: React.FC = () => {
  const { blogs, setSelectedBlog, setCurrentPage, language } = useShop();
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchBlog, setSearchBlog] = useState('');

  const allTags = Array.from(new Set(blogs.flatMap((b) => b.tags)));

  const filteredBlogs = blogs.filter((b) => {
    if (selectedTag !== 'all' && !b.tags.includes(selectedTag)) {
      return false;
    }
    if (searchBlog.trim()) {
      const q = searchBlog.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.banglaTitle.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.banglaExcerpt.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleReadBlog = (post: BlogPost) => {
    setSelectedBlog(post);
    setCurrentPage('blog_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Blog Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2d5016]/10 text-[#2d5016] text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>{language === 'bn' ? 'কাসাব নলেজ হাব' : 'Kasab Knowledge Hub'}</span>
        </div>
        <h1 className="font-serif-brand text-2xl sm:text-4xl font-bold text-neutral-900">
          {language === 'bn' ? 'প্রাকৃতিক স্বাস্থ্য ও সুন্নাহ লাইফস্টাইল ব্লগ' : 'Natural Health & Wellness Articles'}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600">
          {language === 'bn'
            ? 'খাঁটি মধুর পরীক্ষা, কালোজিরার অলৌকিক উপকারিতা ও ইসলামিক স্বাস্থ্যবিধি নিয়ে গবেষণাধর্মী টিপস।'
            : 'Evidence-based insights into organic superfoods, sunnah remedies, and natural well-being.'}
        </p>

        {/* Search & Tag Strip */}
        <div className="pt-2 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchBlog}
              onChange={(e) => setSearchBlog(e.target.value)}
              placeholder={language === 'bn' ? 'ব্লগ অনুসন্ধান করুন...' : 'Search articles...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-neutral-300 bg-white text-xs sm:text-sm focus:outline-none focus:border-[#2d5016]"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
          </div>
        </div>
      </div>

      {/* Tag Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
        <button
          onClick={() => setSelectedTag('all')}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
            selectedTag === 'all'
              ? 'bg-[#2d5016] text-white shadow-xs'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          {language === 'bn' ? 'সব বিষয়' : 'All Topics'}
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
              selectedTag === tag
                ? 'bg-[#2d5016] text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((post) => (
          <article
            key={post._id}
            onClick={() => handleReadBlog(post)}
            className="bg-white rounded-3xl border border-neutral-200 hover:border-[#d4af37]/60 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[#d4af37] text-[10px] font-bold border border-[#d4af37]/30">
                    {language === 'bn' ? post.banglaCategoryName : post.categoryName}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-neutral-300 flex items-center gap-1 border border-white/10">
                  <Clock className="w-3 h-3 text-[#d4af37]" />
                  <span>{language === 'bn' ? post.banglaReadTime : post.readTime}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.publishedDate}</span>
                </div>

                <h3 className="font-serif-brand text-lg font-bold text-neutral-900 group-hover:text-[#2d5016] transition-colors leading-snug line-clamp-2">
                  {language === 'bn' ? post.banglaTitle : post.title}
                </h3>

                <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                  {language === 'bn' ? post.banglaExcerpt : post.excerpt}
                </p>
              </div>
            </div>

            {/* Footer / Read button */}
            <div className="p-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs text-neutral-500 font-medium">
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2d5016] group-hover:translate-x-1 transition-transform">
                <span>{language === 'bn' ? 'সম্পূর্ণ পড়ুন' : 'Read Article'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
