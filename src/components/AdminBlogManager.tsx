import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BlogPost, BlogCategory } from '../types';
import {
  PenTool,
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Calendar,
  Clock,
  User,
  Tag,
  ImageIcon,
  Check,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  X,
  ShoppingBag,
  Sparkles,
  RefreshCw,
  Star,
  ExternalLink
} from 'lucide-react';
import { ImageUploadDropzone } from './ImageUploadDropzone';

const BLOG_CATEGORIES: { id: BlogCategory; bn: string; en: string }[] = [
  { id: 'honey_guide', bn: 'মধু ও পুষ্টি গাইড', en: 'Honey & Nutrition' },
  { id: 'sunnah_health', bn: 'সুন্নাহ ও প্রাকৃতিক স্বাস্থ্য', en: 'Sunnah & Natural Health' },
  { id: 'halal_lifestyle', bn: 'হালাল লাইফস্টাইল', en: 'Halal Lifestyle' },
  { id: 'skincare_tips', bn: 'প্রাকৃতিক রূপচর্চা ও ত্বক', en: 'Organic Skincare & Care' },
];

const PRESET_COVERS = [
  {
    label: 'খাঁটি মধু',
    url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200&auto=format&fit=crop&q=80',
  },
  {
    label: 'মদিনা আজওয়া',
    url: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=1200&auto=format&fit=crop&q=80',
  },
  {
    label: 'কালোজিরা ও তেল',
    url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1200&auto=format&fit=crop&q=80',
  },
  {
    label: 'অলিভ ও হার্বাল',
    url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&auto=format&fit=crop&q=80',
  },
  {
    label: 'ভেষজ চা ও আয়ুর্বেদ',
    url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1200&auto=format&fit=crop&q=80',
  },
];

const SUGGESTED_TAGS = [
  'মধু',
  'খাঁটি মধু পরীক্ষা',
  'আজওয়া খেজুর',
  'কালোজিরা',
  'সুন্নাহ স্বাস্থ্য',
  'প্রাকৃতিক পুষ্টি',
  'রোগ প্রতিরোধ',
  'অর্গানিক ত্বকের যত্ন',
  'হজম শক্তি',
  'সরিষার তেল',
];

interface AdminBlogManagerProps {
  onBackToDashboard?: () => void;
}

export const AdminBlogManager: React.FC<AdminBlogManagerProps> = ({ onBackToDashboard }) => {
  const {
    blogs,
    products,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    setSelectedBlog,
    setCurrentPage,
    language,
    showToast,
  } = useShop();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [featuredFilter, setFeaturedFilter] = useState<boolean | 'all'>('all');

  // Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [activeEditorTab, setActiveEditorTab] = useState<'bangla' | 'english' | 'publishing' | 'preview'>('bangla');

  // Delete Confirmation Modal
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  // Form Fields
  const [banglaTitle, setBanglaTitle] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [banglaExcerpt, setBanglaExcerpt] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [banglaContent, setBanglaContent] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<BlogCategory>('honey_guide');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('কাসাব রিসার্চ টিম');
  const [banglaAuthorRole, setBanglaAuthorRole] = useState('খাদ্য পুষ্টিবিদ ও স্বাস্থ্য গবেষক');
  const [authorRole, setAuthorRole] = useState('Nutrition & Wellness Specialist');
  const [publishedDate, setPublishedDate] = useState('');
  const [banglaReadTime, setBanglaReadTime] = useState('৪ মিনিট পড়ার সময়');
  const [readTime, setReadTime] = useState('4 min read');
  const [featured, setFeatured] = useState(false);
  const [tagsInput, setTagsInput] = useState('');
  const [relatedProductIds, setRelatedProductIds] = useState<string[]>([]);

  // Get current Bengali formatted date
  const getTodayBanglaDate = () => {
    const now = new Date();
    const months = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];
    const month = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    // Convert to Bangla digits
    const toBnDigits = (num: number) => {
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      return num.toString().split('').map(d => bnDigits[parseInt(d, 10)] || d).join('');
    };
    return `${month} ${toBnDigits(day)}, ${toBnDigits(year)}`;
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingPostId(null);
    setBanglaTitle('');
    setTitle('');
    setSlug('');
    setBanglaExcerpt('');
    setExcerpt('');
    setBanglaContent('');
    setContent('');
    setCategory('honey_guide');
    setImage(PRESET_COVERS[0].url);
    setAuthor('কাসাব রিসার্চ টিম');
    setBanglaAuthorRole('খাদ্য পুষ্টিবিদ ও স্বাস্থ্য গবেষক');
    setAuthorRole('Nutrition & Wellness Specialist');
    setPublishedDate(getTodayBanglaDate());
    setBanglaReadTime('৪ মিনিট পড়ার সময়');
    setReadTime('4 min read');
    setFeatured(false);
    setTagsInput('মধু, প্রাকৃতিক খাদ্য, পুষ্টি');
    setRelatedProductIds(products.slice(0, 2).map((p) => p._id));
    setActiveEditorTab('bangla');
    setIsEditorOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (post: BlogPost) => {
    setEditingPostId(post._id);
    setBanglaTitle(post.banglaTitle);
    setTitle(post.title);
    setSlug(post.slug);
    setBanglaExcerpt(post.banglaExcerpt);
    setExcerpt(post.excerpt);
    setBanglaContent(post.banglaContent);
    setContent(post.content);
    setCategory(post.category);
    setImage(post.image);
    setAuthor(post.author);
    setBanglaAuthorRole(post.banglaAuthorRole || 'খাদ্য পুষ্টিবিদ ও গবেষক');
    setAuthorRole(post.authorRole || 'Nutrition Specialist');
    setPublishedDate(post.publishedDate);
    setBanglaReadTime(post.banglaReadTime);
    setReadTime(post.readTime);
    setFeatured(!!post.featured);
    setTagsInput(post.tags.join(', '));
    setRelatedProductIds(post.relatedProductIds || []);
    setActiveEditorTab('bangla');
    setIsEditorOpen(true);
  };

  // Auto calculate reading time based on content length
  const handleAutoCalculateReadTime = () => {
    const textToCount = banglaContent || content;
    const words = textToCount.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 140));
    
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const bnMin = minutes.toString().split('').map(d => bnDigits[parseInt(d, 10)] || d).join('');
    
    setBanglaReadTime(`${bnMin} মিনিট পড়ার সময়`);
    setReadTime(`${minutes} min read`);
    showToast(`পড়ার সময় নির্ধারিত হয়েছে: ${bnMin} মিনিট`);
  };

  // Auto generate slug from title
  const handleGenerateSlug = () => {
    const source = title || banglaTitle;
    const generated = source
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(generated || `kasab-article-${Date.now()}`);
  };

  // Helper to insert formatting in content
  const handleInsertFormatting = (prefix: string, suffix: string = '') => {
    setBanglaContent((prev) => `${prev}\n${prefix}আপনার পয়েন্ট এখানে লিখুন${suffix}\n`);
  };

  // Save Blog Post (Create or Update)
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!banglaTitle.trim()) {
      showToast('অনুগ্রহ করে ব্লগের বাংলা শিরোনাম দিন');
      setActiveEditorTab('bangla');
      return;
    }

    if (!banglaContent.trim()) {
      showToast('অনুগ্রহ করে ব্লগের বাংলা বিস্তারিত কনটেন্ট লিখুন');
      setActiveEditorTab('bangla');
      return;
    }

    const selectedCategoryObj = BLOG_CATEGORIES.find((c) => c.id === category) || BLOG_CATEGORIES[0];

    const tagsArray = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const postPayload: Omit<BlogPost, '_id'> = {
      title: title.trim() || banglaTitle.trim(),
      banglaTitle: banglaTitle.trim(),
      slug: slug.trim() || `kasab-blog-${Date.now()}`,
      excerpt: excerpt.trim() || banglaExcerpt.trim().slice(0, 140),
      banglaExcerpt: banglaExcerpt.trim() || banglaContent.trim().slice(0, 160) + '...',
      content: content.trim() || banglaContent.trim(),
      banglaContent: banglaContent.trim(),
      category: category,
      categoryName: selectedCategoryObj.en,
      banglaCategoryName: selectedCategoryObj.bn,
      image: image.trim() || PRESET_COVERS[0].url,
      author: author.trim() || 'কাসাব রিসার্চ টিম',
      authorRole: authorRole.trim() || 'Health Specialist',
      banglaAuthorRole: banglaAuthorRole.trim() || 'খাদ্য পুষ্টিবিদ ও স্বাস্থ্য গবেষক',
      publishedDate: publishedDate.trim() || getTodayBanglaDate(),
      readTime: readTime.trim() || '৪ মিনিট',
      banglaReadTime: banglaReadTime.trim() || '৪ মিনিট পড়ার সময়',
      featured: featured,
      tags: tagsArray.length > 0 ? tagsArray : ['প্রাকৃতিক খাদ্য', 'স্বাস্থ্য'],
      relatedProductIds: relatedProductIds,
    };

    if (editingPostId) {
      await updateBlogPost(editingPostId, postPayload);
    } else {
      await addBlogPost(postPayload);
    }

    setIsEditorOpen(false);
  };

  // Quick toggle featured status directly from table
  const handleToggleFeatured = async (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    await updateBlogPost(post._id, { featured: !post.featured });
  };

  // Delete handler
  const handleConfirmDelete = async () => {
    if (postToDelete) {
      await deleteBlogPost(postToDelete._id);
      setPostToDelete(null);
    }
  };

  // View post live in client view
  const handleViewLive = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedBlog(post);
    setCurrentPage('blog_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered Blogs
  const filteredBlogs = blogs.filter((b) => {
    if (categoryFilter !== 'all' && b.category !== categoryFilter) {
      return false;
    }
    if (featuredFilter !== 'all' && Boolean(b.featured) !== featuredFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchBnTitle = b.banglaTitle?.toLowerCase().includes(q);
      const matchEnTitle = b.title?.toLowerCase().includes(q);
      const matchAuthor = b.author?.toLowerCase().includes(q);
      const matchTag = b.tags?.some((t) => t.toLowerCase().includes(q));
      return matchBnTitle || matchEnTitle || matchAuthor || matchTag;
    }
    return true;
  });

  const featuredCount = blogs.filter((b) => b.featured).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d5016] hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← ড্যাশবোর্ড ওভারভিউতে ফিরুন</span>
            </button>
          )}
          <span className="text-neutral-300 hidden sm:inline">|</span>
          <span className="text-[11px] text-neutral-500 font-medium">
            কাসাব নলেজ হাব ও পাবলিকেশন সিস্টেম
          </span>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-2xl bg-[#2d5016] text-white hover:bg-[#234011] text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <PenTool className="w-4 h-4 text-[#d4af37]" />
          <span>নতুন ব্লগ লিখুন (Write Article)</span>
        </button>
      </div>

      {/* Main Header & Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#2d5016] to-[#1e3410] text-white p-5 rounded-3xl col-span-1 md:col-span-2 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-[#d4af37] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>কনটেন্ট ও পাবলিকেশন ইঞ্জিন</span>
            </div>
            <h2 className="font-serif-brand text-xl sm:text-2xl font-bold text-white">
              ব্লগ ও আর্টিকেল পাবলিশিং
            </h2>
            <p className="text-xs text-neutral-200 mt-1 font-light leading-relaxed">
              মধুর উপকারিতা, সুন্নাহ স্বাস্থ্য টিপস ও ইসলামিক লাইফস্টাইল নিয়ে নতুন ব্লগ লিখুন এবং তাৎক্ষণিক প্রকাশ করুন।
            </p>
          </div>

          <div className="flex items-center gap-3 pt-4 mt-2 border-t border-white/10 text-xs">
            <span className="font-semibold text-white/90">
              মোট প্রকাশিত: <b className="text-[#d4af37] font-black">{blogs.length}</b> টি
            </span>
            <span>•</span>
            <span className="font-semibold text-white/90">
              হোম ফিচারে: <b className="text-[#d4af37] font-black">{featuredCount}</b> টি
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-bold">মোট ব্লগ পোস্ট</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-black text-neutral-900">{blogs.length}</span>
            <span className="text-[11px] text-neutral-500 block mt-0.5">লাইভ ওয়েবসাইটে দৃশ্যমান</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-bold">ক্যাটাগরি সমূহ</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Tag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-black text-[#2d5016]">৪টি</span>
            <span className="text-[11px] text-neutral-500 block mt-0.5">মধু, সুন্নাহ, হালাল ও স্কিনকেয়ার</span>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-3xl p-4 border border-neutral-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ব্লগ শিরোনাম, লেখক বা ট্যাগ দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-neutral-200 bg-neutral-50 text-xs focus:outline-none focus:border-[#2d5016] focus:bg-white transition-colors"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-2xl border border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-700 focus:outline-none focus:border-[#2d5016] cursor-pointer"
          >
            <option value="all">সকল ক্যাটাগরি ({blogs.length})</option>
            {BLOG_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.bn} ({blogs.filter((b) => b.category === c.id).length})
              </option>
            ))}
          </select>

          {/* Featured Filter */}
          <button
            onClick={() => setFeaturedFilter(featuredFilter === true ? 'all' : true)}
            className={`px-3 py-2 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              featuredFilter === true
                ? 'bg-[#d4af37] text-neutral-900 border-[#d4af37]'
                : 'border-neutral-200 text-neutral-600 bg-neutral-50 hover:bg-neutral-100'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${featuredFilter === true ? 'fill-neutral-900' : ''}`} />
            <span>ফিচার্ড ({featuredCount})</span>
          </button>
        </div>
      </div>

      {/* Blogs Article Cards & Table */}
      {filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-serif-brand text-base font-bold text-neutral-900">
            কোনো ব্লগ আর্টিকেল পাওয়া যায়নি
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            আপনার সার্চ ফিল্টারের সাথে মিলে এমন কোনো ব্লগ নেই, অথবা এখনো কোনো ব্লগ লেখা হয়নি।
          </p>
          <button
            onClick={handleOpenCreate}
            className="mt-2 px-4 py-2 rounded-xl bg-[#2d5016] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>নতুন ব্লগ তৈরি করুন</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBlogs.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative"
            >
              {/* Cover Image & Category Badges */}
              <div className="relative aspect-[16/9] w-full bg-neutral-100 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.banglaTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category Pill */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                    {post.banglaCategoryName || post.categoryName}
                  </span>
                </div>

                {/* Featured Badge Toggle */}
                <button
                  onClick={(e) => handleToggleFeatured(post, e)}
                  title={post.featured ? 'ফিচার্ড স্ট্যাটাস বন্ধ করুন' : 'হোম ফিচার্ড করুন'}
                  className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                    post.featured
                      ? 'bg-[#d4af37] text-neutral-900 shadow-sm'
                      : 'bg-black/50 text-white/80 hover:bg-black/80 hover:text-white'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${post.featured ? 'fill-neutral-900' : ''}`} />
                </button>

                {/* Reading Time */}
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.banglaReadTime || post.readTime}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                    <Calendar className="w-3 h-3" />
                    <span>{post.publishedDate}</span>
                    <span>•</span>
                    <span className="truncate max-w-[140px] text-neutral-600 font-medium">
                      {post.author}
                    </span>
                  </div>

                  <h3 className="font-serif-brand font-bold text-base text-neutral-900 line-clamp-2 leading-snug group-hover:text-[#2d5016] transition-colors">
                    {post.banglaTitle}
                  </h3>

                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                    {post.banglaExcerpt || post.excerpt}
                  </p>
                </div>

                {/* Tags Strip */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-neutral-100">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-[10px] text-neutral-400">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(post)}
                      className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-[#2d5016] hover:text-white text-neutral-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>এডিট</span>
                    </button>

                    <button
                      onClick={(e) => handleViewLive(post, e)}
                      className="p-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-600 hover:text-[#2d5016] transition-colors cursor-pointer"
                      title="ওয়েবসাইটে সরাসরি দেখুন"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => setPostToDelete(post)}
                    className="p-1.5 rounded-xl text-neutral-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
                    title="ব্লগ মুছে ফেলুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================= */}
      {/* BLOG WRITER / EDITOR MODAL */}
      {/* ========================================================= */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#2d5016] text-[#d4af37] flex items-center justify-center">
                  <PenTool className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-brand font-bold text-base sm:text-lg text-neutral-900">
                    {editingPostId ? 'ব্লগ আর্টিকেল এডিট করুন' : 'নতুন ব্লগ আর্টিকেল লিখুন'}
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    কাসাব নলেজ হাবে গ্রাহকদের জন্য আকর্ষণীয় আর্টিকেল পাবলিশ করুন
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditorOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-neutral-200 flex items-center justify-center text-neutral-500 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Subtabs */}
            <div className="flex items-center gap-1 px-5 pt-3 border-b border-neutral-200 bg-white shrink-0 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveEditorTab('bangla')}
                className={`px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeEditorTab === 'bangla'
                    ? 'border-[#2d5016] text-[#2d5016]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <span>১. বাংলা কনটেন্ট (মূল)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </button>

              <button
                type="button"
                onClick={() => setActiveEditorTab('publishing')}
                className={`px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeEditorTab === 'publishing'
                    ? 'border-[#2d5016] text-[#2d5016]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>২. কভার ছবি, ক্যাটাগরি ও মিডিয়া</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveEditorTab('english')}
                className={`px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeEditorTab === 'english'
                    ? 'border-[#2d5016] text-[#2d5016]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <span>৩. English Version (ঐচ্ছিক)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveEditorTab('preview')}
                className={`px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ml-auto ${
                  activeEditorTab === 'preview'
                    ? 'border-[#d4af37] text-neutral-900 bg-[#d4af37]/10 rounded-t-xl'
                    : 'border-transparent text-[#2d5016] hover:bg-[#2d5016]/5 rounded-t-xl'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>লাইভ প্রিভিউ (Live Preview)</span>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSavePost} className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* TAB 1: BANGLA CONTENT */}
              {activeEditorTab === 'bangla' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      বাংলা শিরোনাম (Bangla Title) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={banglaTitle}
                      onChange={(e) => setBanglaTitle(e.target.value)}
                      placeholder="যেমন: খাঁটি সুন্দরবনের মধু চেনার সহজ ঘরোয়া উপায় ও উপকারিতা"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-semibold focus:outline-none focus:border-[#2d5016]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      বাংলা সংক্ষিপ্ত সারসংক্ষেপ (Excerpt / Summary)
                    </label>
                    <textarea
                      rows={2}
                      value={banglaExcerpt}
                      onChange={(e) => setBanglaExcerpt(e.target.value)}
                      placeholder="ব্লগ কার্ড ও সোশ্যাল মিডিয়ায় প্রদর্শিত হওয়ার জন্য ২-৩ লাইনের ভূমিকা..."
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#2d5016]"
                    />
                  </div>

                  {/* Formatting Toolbar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <label className="block text-xs font-bold text-neutral-700">
                        বাংলা মূল নিবন্ধ (Full Article Content) <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleInsertFormatting('### ')}
                          className="px-2 py-0.5 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-[10px] font-bold text-neutral-700 cursor-pointer"
                        >
                          + সাব-হেডিং (H3)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInsertFormatting('১. ')}
                          className="px-2 py-0.5 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-[10px] font-bold text-neutral-700 cursor-pointer"
                        >
                          + তালিকা (List)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInsertFormatting('> ')}
                          className="px-2 py-0.5 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-[10px] font-bold text-neutral-700 cursor-pointer"
                        >
                          + কোটেশন ব্লক
                        </button>
                        <button
                          type="button"
                          onClick={handleAutoCalculateReadTime}
                          className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold hover:bg-emerald-100 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Clock className="w-3 h-3" />
                          <span>পড়ার সময় অটো-গণনা</span>
                        </button>
                      </div>
                    </div>

                    <textarea
                      rows={12}
                      required
                      value={banglaContent}
                      onChange={(e) => setBanglaContent(e.target.value)}
                      placeholder="এখানে আপনার ব্লগের সম্পূর্ণ লেখা বিস্তারিতভাবে লিখুন। অনুচ্ছেদ অনুযায়ী প্যারাগ্রাফ তৈরি করুন। সাব-হেডিং এবং পয়েন্ট ব্যবহারে পাঠক সহজে পড়তে পারবে..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm font-sans leading-relaxed focus:outline-none focus:border-[#2d5016]"
                    />
                  </div>

                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center justify-between text-xs text-amber-800">
                    <span>লেখা শেষ হলে পরবর্তী ট্যাবে গিয়ে কভার ছবি ও ক্যাটাগরি নির্ধারণ করুন।</span>
                    <button
                      type="button"
                      onClick={() => setActiveEditorTab('publishing')}
                      className="px-3 py-1 rounded-xl bg-amber-700 text-white font-bold text-[11px] cursor-pointer hover:bg-amber-800 flex items-center gap-1"
                    >
                      <span>পরবর্তী: মিডিয়া সেটিংস</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: PUBLISHING, MEDIA & AUTHOR */}
              {activeEditorTab === 'publishing' && (
                <div className="space-y-5">
                  {/* Category Selection */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      ব্লগ ক্যাটাগরি নির্বাচন করুন
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BLOG_CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.id)}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                            category === cat.id
                              ? 'border-[#2d5016] bg-[#2d5016]/10 text-[#2d5016] font-bold shadow-xs'
                              : 'border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-white'
                          }`}
                        >
                          <span className="block text-xs font-bold">{cat.bn}</span>
                          <span className="block text-[10px] text-neutral-400 mt-0.5">{cat.en}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cover Photo Upload & Presets */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-neutral-700">
                      কভার ফটো (Cover Photo URL / Upload)
                    </label>

                    {/* Image Preview */}
                    {image && (
                      <div className="relative aspect-[21/9] max-h-48 w-full rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100">
                        <img src={image} alt="Preview" className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px]">
                          বর্তমান কভার ফটো
                        </span>
                      </div>
                    )}

                    {/* Dropzone for direct Cloudinary upload */}
                    <ImageUploadDropzone
                      onUploadSuccess={(url) => {
                        setImage(url);
                        showToast('কভার ছবি সফলভাবে আপলোড হয়েছে!');
                      }}
                      folder="blogs"
                    />

                    {/* Image URL manual input */}
                    <div>
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="অথবা সরাসরি ইমেজ লিংক (https://...) পেস্ট করুন"
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#2d5016]"
                      />
                    </div>

                    {/* Preset Organic Covers */}
                    <div>
                      <span className="text-[11px] font-bold text-neutral-500 block mb-1.5">
                        অথবা এক ক্লিকে সেরা কভার ছবি নির্বাচন করুন:
                      </span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {PRESET_COVERS.map((preset) => (
                          <button
                            key={preset.url}
                            type="button"
                            onClick={() => setImage(preset.url)}
                            className="px-2.5 py-1 rounded-xl border border-neutral-200 hover:border-[#2d5016] text-[11px] text-neutral-700 bg-neutral-50 hover:bg-white transition-all cursor-pointer"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Author, Date & Reading Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        লেখক / টিম নাম (Author)
                      </label>
                      <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="যেমন: ড. রফিকুল ইসলাম"
                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#2d5016]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        লেখকের পদবী (Bangla Role)
                      </label>
                      <input
                        type="text"
                        value={banglaAuthorRole}
                        onChange={(e) => setBanglaAuthorRole(e.target.value)}
                        placeholder="যেমন: খাদ্য পুষ্টিবিদ ও গবেষক"
                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#2d5016]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        প্রকাশের তারিখ (Bangla Date)
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={publishedDate}
                          onChange={(e) => setPublishedDate(e.target.value)}
                          placeholder="যেমন: মার্চ ১৬, ২০২৬"
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#2d5016]"
                        />
                        <button
                          type="button"
                          onClick={() => setPublishedDate(getTodayBanglaDate())}
                          className="px-2.5 py-2 rounded-xl border border-neutral-200 bg-neutral-100 hover:bg-neutral-200 text-[11px] font-bold text-neutral-700 cursor-pointer shrink-0"
                          title="আজকের তারিখ বসান"
                        >
                          আজ
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Reading Time & Tags */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        পড়ার সময় (Read Time)
                      </label>
                      <input
                        type="text"
                        value={banglaReadTime}
                        onChange={(e) => setBanglaReadTime(e.target.value)}
                        placeholder="যেমন: ৪ মিনিট পড়ার সময়"
                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#2d5016]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        ট্যাগস (কমা দিয়ে লিখুন)
                      </label>
                      <input
                        type="text"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        placeholder="মধু, সুন্দরবন, স্বাস্থ্য, রোগ প্রতিরোধ"
                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#2d5016]"
                      />
                    </div>
                  </div>

                  {/* Quick Tag Pills */}
                  <div>
                    <span className="text-[11px] font-bold text-neutral-500 block mb-1">
                      জনপ্রিয় ট্যাগ চিপস (ক্লিক করে যোগ করুন):
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {SUGGESTED_TAGS.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            const current = tagsInput ? tagsInput.split(',').map(t => t.trim()) : [];
                            if (!current.includes(tag)) {
                              setTagsInput([...current, tag].join(', '));
                            }
                          }}
                          className="px-2 py-0.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-[11px] text-neutral-700 cursor-pointer"
                        >
                          +{tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Featured Blog & Slug Settings */}
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="w-4 h-4 rounded text-[#2d5016] focus:ring-[#2d5016] cursor-pointer"
                      />
                      <span className="text-xs font-bold text-neutral-900">
                        এই ব্লগটি হোমপেজ ও ব্লগ ব্যানারে ফিচার্ড (Featured Article) হিসেবে দেখান
                      </span>
                    </label>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-neutral-700">
                          URL স্লাগ (SEO Friendly Slug)
                        </label>
                        <button
                          type="button"
                          onClick={handleGenerateSlug}
                          className="text-[10px] text-[#2d5016] hover:underline font-bold cursor-pointer"
                        >
                          অটো-জেনারেট করুন
                        </button>
                      </div>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="how-to-identify-pure-honey"
                        className="w-full px-3 py-1.5 rounded-xl border border-neutral-300 text-xs font-mono focus:outline-none focus:border-[#2d5016]"
                      />
                    </div>
                  </div>

                  {/* Related Products Selector */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      ব্লগের সাথে সংযুক্ত শপ পণ্য (Related Store Products)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-2 border border-neutral-200 rounded-2xl bg-neutral-50">
                      {products.map((p) => {
                        const isSelected = relatedProductIds.includes(p._id);
                        return (
                          <div
                            key={p._id}
                            onClick={() => {
                              if (isSelected) {
                                setRelatedProductIds(relatedProductIds.filter((id) => id !== p._id));
                              } else {
                                setRelatedProductIds([...relatedProductIds, p._id]);
                              }
                            }}
                            className={`p-2 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-[#2d5016]/10 border-[#2d5016] text-[#2d5016]'
                                : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                            }`}
                          >
                            <img src={p.image} alt="" className="w-7 h-7 rounded-lg object-cover" />
                            <span className="text-[11px] font-bold truncate flex-1">{p.banglaName}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#2d5016] shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ENGLISH VERSION */}
              {activeEditorTab === 'english' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      English Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. How to Identify 100% Pure Raw Honey & Health Benefits"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm focus:outline-none focus:border-[#2d5016]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      English Excerpt
                    </label>
                    <textarea
                      rows={2}
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Short summary in English..."
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#2d5016]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      English Content
                    </label>
                    <textarea
                      rows={10}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Full article in English if available..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm font-sans leading-relaxed focus:outline-none focus:border-[#2d5016]"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: LIVE PREVIEW */}
              {activeEditorTab === 'preview' && (
                <div className="bg-neutral-50 rounded-2xl p-4 sm:p-6 border border-neutral-200 space-y-5">
                  <div className="text-center pb-2 border-b border-neutral-200">
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                      ✓ প্রিভিউ মোড: ওয়েবসাইটে ঠিক যেমন দেখাবে
                    </span>
                  </div>

                  {/* Header preview */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-[#2d5016]/10 text-[#2d5016] text-xs font-bold">
                        {BLOG_CATEGORIES.find((c) => c.id === category)?.bn || 'ক্যাটাগরি'}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-neutral-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{banglaReadTime || '৪ মিনিট পড়ার সময়'}</span>
                      </div>
                      <span className="text-neutral-300">•</span>
                      <div className="flex items-center gap-1 text-xs text-neutral-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{publishedDate || getTodayBanglaDate()}</span>
                      </div>
                    </div>

                    <h1 className="font-serif-brand text-xl sm:text-2xl font-bold text-neutral-900 leading-snug">
                      {banglaTitle || 'ব্লগের বাংলা শিরোনাম এখানে দেখা যাবে'}
                    </h1>

                    <div className="flex items-center gap-2 pt-1 text-xs text-neutral-600">
                      <div className="w-6 h-6 rounded-full bg-[#2d5016] text-[#d4af37] flex items-center justify-center font-bold text-[10px]">
                        ক
                      </div>
                      <span className="font-bold">{author || 'কাসাব রিসার্চ টিম'}</span>
                      <span className="text-neutral-400">|</span>
                      <span className="text-neutral-500">{banglaAuthorRole}</span>
                    </div>
                  </div>

                  {/* Image preview */}
                  <div className="aspect-[16/9] max-h-72 w-full rounded-2xl overflow-hidden border border-neutral-200">
                    <img
                      src={image || PRESET_COVERS[0].url}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content Preview */}
                  <div className="bg-white p-5 rounded-2xl border border-neutral-200 space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    {banglaExcerpt && (
                      <p className="font-medium text-neutral-800 border-l-4 border-[#2d5016] pl-3 italic">
                        {banglaExcerpt}
                      </p>
                    )}
                    <div className="whitespace-pre-line">
                      {banglaContent || 'এখানে আপনার বিস্তারিত ব্লগের লেখা প্রদর্শিত হবে।'}
                    </div>
                  </div>
                </div>
              )}
            </form>

            {/* Modal Footer Controls */}
            <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="px-4 py-2 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                বাতিল করুন
              </button>

              <div className="flex items-center gap-2">
                {activeEditorTab !== 'preview' && (
                  <button
                    type="button"
                    onClick={() => setActiveEditorTab('preview')}
                    className="px-3.5 py-2 rounded-xl border border-[#d4af37] text-[#2d5016] hover:bg-[#d4af37]/10 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>প্রিভিউ দেখুন</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleSavePost}
                  className="px-5 py-2 rounded-xl bg-[#2d5016] hover:bg-[#234011] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <Check className="w-4 h-4 text-[#d4af37]" />
                  <span>{editingPostId ? 'পরিবর্তন সংরক্ষণ করুন' : 'পাবলিশ করুন (Publish)'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ========================================================= */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-serif-brand font-bold text-base text-neutral-900">
                ব্লগ আর্টিকেলটি মুছে ফেলতে চান?
              </h3>
              <p className="text-xs text-neutral-500">
                "{postToDelete.banglaTitle}" স্থায়ীভাবে মুছে যাবে এবং লাইভ ওয়েবসাইট থেকে সরিয়ে ফেলা হবে।
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPostToDelete(null)}
                className="flex-1 py-2 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                না, রাখুন
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
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
