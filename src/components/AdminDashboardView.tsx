import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, Order, HeroSlide, CategoryId, OrderStatus, Category } from '../types';
import { formatBDT } from '../utils/formatters';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  CheckCircle, 
  Clock, 
  Truck, 
  XCircle, 
  RotateCcw,
  Sparkles,
  ArrowUpDown,
  Search,
  Check,
  Save,
  ShieldCheck,
  Database,
  RefreshCw,
  Cloud,
  Phone,
  MessageCircle,
  Printer,
  ExternalLink,
  X,
  AlertTriangle,
  Star,
  Utensils,
  Moon,
  Snowflake,
  Folder,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Boxes,
  BookOpen,
  PenTool,
  Volume2,
  Megaphone,
  MessageSquareQuote
} from 'lucide-react';
import { ImageUploadDropzone } from './ImageUploadDropzone';
import { AdminBlogManager } from './AdminBlogManager';
import { AdminTestimonialsManager } from './AdminTestimonialsManager';

export const AdminDashboardView: React.FC = () => {
  const {
    products,
    categories,
    orders,
    blogs,
    heroSlides,
    testimonials,
    scrollingNotice,
    updateScrollingNotice,
    dbStatus,
    isLoadingDb,
    refreshDbData,
    addProduct,
    updateProduct,
    deleteProduct,
    updateCategory,
    addCategory,
    deleteCategory,
    updateOrderStatus,
    deleteOrder,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    language,
    showToast,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'categories' | 'banners' | 'blogs' | 'testimonials'>('dashboard');

  // Order Details Modal state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Product modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [pName, setPName] = useState('');
  const [pBanglaName, setPBanglaName] = useState('');
  const [pCategory, setPCategory] = useState<CategoryId>('food');
  const [pPrice, setPPrice] = useState<number>(500);
  const [pOriginalPrice, setPOriginalPrice] = useState<number>(600);
  const [pImage, setPImage] = useState('');
  const [pImages, setPImages] = useState<string[]>([]);
  const [newImgInput, setNewImgInput] = useState('');
  const [pDesc, setPDesc] = useState('');
  const [pBanglaDesc, setPBanglaDesc] = useState('');
  const [pShortDesc, setPShortDesc] = useState('');
  const [pLongDesc, setPLongDesc] = useState('');
  const [pSunnah, setPSunnah] = useState(true);
  const [pBadge, setPBadge] = useState('');
  const [pStock, setPStock] = useState<number>(20);

  // Category modal state
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [cName, setCName] = useState('');
  const [cBanglaName, setCBanglaName] = useState('');
  const [cDesc, setCDesc] = useState('');
  const [cBanglaDesc, setCBanglaDesc] = useState('');
  const [cImage, setCImage] = useState('');
  const [cIconName, setCIconName] = useState('Sparkles');

  // Banner modal state
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBannerId, setEditingBannerId] = useState<string | null>(null);
  const [bTitle, setBTitle] = useState('');
  const [bBanglaTitle, setBBanglaTitle] = useState('');
  const [bSubtitle, setBSubtitle] = useState('');
  const [bBanglaSubtitle, setBBanglaSubtitle] = useState('');
  const [bImage, setBImage] = useState('');
  const [bBadge, setBBadge] = useState('');
  const [bCta, setBCta] = useState('এখনই কিনুন');

  // Product Filter & Search
  const [searchProduct, setSearchProduct] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [cloudinaryStatus, setCloudinaryStatus] = useState<{ configured: boolean; cloudName?: string; message?: string } | null>(null);

  // In-app deletion confirmation states (replaces iframe-blocked window.confirm)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [bannerToDelete, setBannerToDelete] = useState<HeroSlide | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  // Top Scrolling Notice state
  const [noticeEnabled, setNoticeEnabled] = useState(scrollingNotice?.enabled ?? true);
  const [noticeText, setNoticeText] = useState(scrollingNotice?.text || '');
  const [noticeTextEn, setNoticeTextEn] = useState(scrollingNotice?.textEn || '');
  const [noticeBadge, setNoticeBadge] = useState(scrollingNotice?.badge || '📢 বিশেষ ঘোষণা');
  const [noticeBadgeEn, setNoticeBadgeEn] = useState(scrollingNotice?.badgeEn || '📢 Announcement');
  const [noticeSpeed, setNoticeSpeed] = useState<'slow' | 'normal' | 'fast'>(scrollingNotice?.speed || 'normal');
  const [noticeLink, setNoticeLink] = useState(scrollingNotice?.link || '');
  const [isSavingNotice, setIsSavingNotice] = useState(false);

  React.useEffect(() => {
    if (scrollingNotice) {
      setNoticeEnabled(scrollingNotice.enabled);
      setNoticeText(scrollingNotice.text);
      setNoticeTextEn(scrollingNotice.textEn || '');
      setNoticeBadge(scrollingNotice.badge || '📢 বিশেষ ঘোষণা');
      setNoticeBadgeEn(scrollingNotice.badgeEn || '📢 Announcement');
      setNoticeSpeed(scrollingNotice.speed || 'normal');
      setNoticeLink(scrollingNotice.link || '');
    }
  }, [scrollingNotice]);

  const handleSaveNotice = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSavingNotice(true);
    try {
      await updateScrollingNotice({
        enabled: noticeEnabled,
        text: noticeText,
        textEn: noticeTextEn,
        badge: noticeBadge,
        badgeEn: noticeBadgeEn,
        speed: noticeSpeed,
        link: noticeLink,
      });
    } finally {
      setIsSavingNotice(false);
    }
  };

  React.useEffect(() => {
    fetch('/api/cloudinary/status')
      .then((res) => res.json())
      .then((data) => setCloudinaryStatus(data))
      .catch(() => setCloudinaryStatus({ configured: false }));
  }, []);

  // Helper for category icon
  const getCategoryIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'utensils':
      case 'food':
        return <Utensils className="w-4 h-4" />;
      case 'moon':
      case 'islamic':
        return <Moon className="w-4 h-4" />;
      case 'snowflake':
      case 'winter':
        return <Snowflake className="w-4 h-4" />;
      case 'shoppingbag':
      case 'accessories':
        return <ShoppingBag className="w-4 h-4" />;
      case 'shieldcheck':
        return <ShieldCheck className="w-4 h-4" />;
      case 'package':
        return <Package className="w-4 h-4" />;
      case 'sparkles':
      case 'skincare':
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  // Order stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0);

  const handleOpenNewProduct = () => {
    setEditingProductId(null);
    setPName('');
    setPBanglaName('');
    setPCategory('food');
    setPPrice(500);
    setPOriginalPrice(600);
    const defaultImg = 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800';
    setPImage(defaultImg);
    setPImages([defaultImg]);
    setNewImgInput('');
    setPDesc('');
    setPBanglaDesc('');
    setPShortDesc('');
    setPLongDesc('');
    setPSunnah(true);
    setPBadge('নতুন কালেকশন');
    setPStock(25);
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (prod: Product) => {
    setEditingProductId(prod._id);
    setPName(prod.name);
    setPBanglaName(prod.banglaName);
    setPCategory(prod.category);
    setPPrice(prod.price);
    setPOriginalPrice(prod.originalPrice || prod.price);
    const initialImgs = Array.isArray(prod.images) && prod.images.length > 0
      ? prod.images
      : [prod.image || 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800'];
    setPImage(prod.image || initialImgs[0]);
    setPImages(initialImgs);
    setNewImgInput('');
    setPDesc(prod.description);
    setPBanglaDesc(prod.banglaDescription);
    setPShortDesc(prod.shortDescription || prod.banglaDescription || '');
    setPLongDesc(prod.longDescription || prod.banglaDescription || prod.description || '');
    setPSunnah(!!prod.sunnah_certified);
    setPBadge(prod.badge || '');
    setPStock(prod.stock ?? 25);
    setIsProductModalOpen(true);
  };

  const handleAddProductImage = (urlToAdd: string) => {
    const trimmed = urlToAdd.trim();
    if (!trimmed) return;
    if (pImages.includes(trimmed)) {
      showToast('এই ছবিটি ইতিমধ্যে যুক্ত রয়েছে');
      return;
    }
    const updated = [...pImages, trimmed];
    setPImages(updated);
    if (!pImage) setPImage(trimmed);
    setNewImgInput('');
    showToast('নতুন ছবি যুক্ত হয়েছে');
  };

  const handleRemoveProductImage = (indexToRemove: number) => {
    if (pImages.length <= 1) {
      showToast('পণ্যে কমপক্ষে একটি ছবি থাকা আবশ্যক');
      return;
    }
    const targetUrl = pImages[indexToRemove];
    const updated = pImages.filter((_, idx) => idx !== indexToRemove);
    setPImages(updated);
    if (targetUrl === pImage) {
      setPImage(updated[0]);
    }
    showToast('ছবি বাদ দেওয়া হয়েছে');
  };

  const handleSetPrimaryImage = (url: string) => {
    setPImage(url);
    const updated = [url, ...pImages.filter((img) => img !== url)];
    setPImages(updated);
    showToast('মূল ছবি (Primary) নির্ধারণ করা হয়েছে');
  };

  const handleMoveProductImage = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= pImages.length) return;
    const updated = [...pImages];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    setPImages(updated);
    if (fromIdx === 0 || toIdx === 0) {
      setPImage(updated[0]);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName || !pBanglaName || !pPrice) {
      showToast('অনুগ্রহ করে পণ্যের নাম ও মূল্য পূরণ করুন');
      return;
    }

    const validImages = pImages.filter((img) => Boolean(img && img.trim()));
    const finalPrimary = (pImage && validImages.includes(pImage)) ? pImage : (validImages[0] || 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800');
    const finalImagesList = validImages.length > 0 ? validImages : [finalPrimary];

    const finalDesc = pDesc.trim() || pShortDesc.trim() || pBanglaDesc.trim();
    const finalBanglaDesc = pShortDesc.trim() || pBanglaDesc.trim();
    const finalShortDesc = pShortDesc.trim() || finalBanglaDesc;
    const finalLongDesc = pLongDesc.trim() || finalBanglaDesc || finalDesc;

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: pName,
        banglaName: pBanglaName,
        category: pCategory,
        price: Number(pPrice),
        originalPrice: Number(pOriginalPrice),
        image: finalPrimary,
        images: finalImagesList,
        description: finalDesc,
        banglaDescription: finalBanglaDesc,
        shortDescription: finalShortDesc,
        longDescription: finalLongDesc,
        sunnah_certified: pSunnah,
        badge: pBadge || undefined,
        stock: Number(pStock),
      });
      showToast('পণ্য সফলভাবে আপডেট করা হয়েছে');
    } else {
      addProduct({
        name: pName,
        banglaName: pBanglaName,
        category: pCategory,
        price: Number(pPrice),
        originalPrice: Number(pOriginalPrice),
        image: finalPrimary,
        images: finalImagesList,
        description: finalDesc,
        banglaDescription: finalBanglaDesc,
        shortDescription: finalShortDesc,
        longDescription: finalLongDesc,
        available: true,
        rating: 5.0,
        reviews_count: 1,
        sunnah_certified: pSunnah,
        badge: pBadge || undefined,
        stock: Number(pStock),
      });
      showToast('নতুন পণ্য যোগ করা হয়েছে');
    }
    setIsProductModalOpen(false);
  };

  // Category handlers
  const handleOpenNewCategory = () => {
    setEditingCategoryId(null);
    setCName('');
    setCBanglaName('');
    setCBanglaDesc('');
    setCDesc('');
    setCImage('https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800');
    setCIconName('Sparkles');
    setIsCategoryModalOpen(true);
  };

  const handleEditCategory = (cat: any) => {
    setEditingCategoryId(cat._id);
    setCName(cat.name || '');
    setCBanglaName(cat.banglaName || '');
    setCBanglaDesc(cat.banglaDescription || cat.descriptionBn || '');
    setCDesc(cat.description || '');
    setCImage(cat.image || '');
    setCIconName(cat.iconName || 'Sparkles');
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cBanglaName.trim() || !cName.trim()) {
      showToast('ক্যাটাগরির বাংলা ও ইংরেজি নাম আবশ্যক');
      return;
    }

    if (editingCategoryId) {
      updateCategory(editingCategoryId, {
        name: cName.trim(),
        banglaName: cBanglaName.trim(),
        description: cDesc.trim(),
        banglaDescription: cBanglaDesc.trim(),
        image: cImage.trim(),
        iconName: cIconName,
      });
      showToast('ক্যাটাগরি তথ্য সফলভাবে আপডেট হয়েছে');
    } else {
      const generatedSlug = cName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      addCategory({
        _id: generatedSlug || `cat-${Date.now()}`,
        name: cName.trim(),
        banglaName: cBanglaName.trim(),
        description: cDesc.trim(),
        banglaDescription: cBanglaDesc.trim(),
        image: cImage.trim() || 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800',
        iconName: cIconName,
      });
      showToast('নতুন ক্যাটাগরি তৈরি করা হয়েছে');
    }

    setIsCategoryModalOpen(false);
  };

  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const confirmedOrders = orders.filter((o) => o.status === 'confirmed').length;
  const processingOrders = orders.filter((o) => o.status === 'processing').length;
  const deliveredOrders = orders.filter((o) => o.status === 'delivered').length;
  const cancelledOrders = orders.filter((o) => o.status === 'cancelled').length;

  const handleOpenNewBanner = () => {
    setEditingBannerId(null);
    setBTitle('');
    setBBanglaTitle('');
    setBSubtitle('');
    setBBanglaSubtitle('');
    setBImage('https://images.unsplash.com/photo-1546548970-71785318a17b?q=80&w=1600');
    setBBadge('প্রিমিয়াম কোয়ালিটি');
    setBCta('এখনই কিনুন');
    setIsBannerModalOpen(true);
  };

  const handleEditBanner = (slide: HeroSlide) => {
    setEditingBannerId(slide._id);
    setBTitle(slide.title);
    setBBanglaTitle(slide.banglaTitle);
    setBSubtitle(slide.subtitle || '');
    setBBanglaSubtitle(slide.banglaSubtitle || '');
    setBImage(slide.image);
    setBBadge(slide.badge || '');
    setBCta(slide.ctaText || 'এখনই কিনুন');
    setIsBannerModalOpen(true);
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bBanglaTitle || !bImage) {
      showToast('ব্যানারের শিরোনাম ও ইমেজ লিংক দিন');
      return;
    }

    if (editingBannerId) {
      updateHeroSlide(editingBannerId, {
        title: bTitle || bBanglaTitle,
        banglaTitle: bBanglaTitle,
        subtitle: bSubtitle,
        banglaSubtitle: bBanglaSubtitle,
        image: bImage,
        badge: bBadge,
        ctaText: bCta,
      });
      showToast('ব্যানার স্লাইডার সফলভাবে আপডেট হয়েছে');
    } else {
      addHeroSlide({
        title: bTitle || bBanglaTitle,
        banglaTitle: bBanglaTitle,
        subtitle: bSubtitle,
        banglaSubtitle: bBanglaSubtitle,
        image: bImage,
        badge: bBadge,
        ctaText: bCta,
        categoryTarget: 'all',
        linkType: 'catalog',
        active: true,
        order: heroSlides.length + 1,
      });
      showToast('নতুন হিরো স্লাইড যোগ হয়েছে');
    }
    setIsBannerModalOpen(false);
  };

  const currentSelectedOrder = selectedOrder
    ? orders.find((o) => o._id === selectedOrder._id) || selectedOrder
    : null;

  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) {
      return false;
    }
    return true;
  });

  const filteredProducts = products.filter((p) => {
    if (searchProduct.trim()) {
      const q = searchProduct.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.banglaName.toLowerCase().includes(q);
    }
    return true;
  });

  const lowStockProducts = products
    .filter((p) => (p.stock ?? 25) <= 12)
    .sort((a, b) => (a.stock ?? 25) - (b.stock ?? 25))
    .slice(0, 5);

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.orderDate || b.createdAt || 0).getTime() - new Date(a.orderDate || a.createdAt || 0).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#2d5016] uppercase tracking-wider mb-1">
            <LayoutDashboard className="w-4 h-4 text-[#d4af37]" />
            <span>Kasab Gallery Merchant Portal</span>
          </div>
          <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold text-neutral-900">
            অ্যাডমিন প্যানেল (Admin Control Panel)
          </h1>
          <p className="text-xs text-neutral-500">
            স্টোর ড্যাশবোর্ড ওভারভিউ, রিয়েল-টাইম অর্ডার, ক্যাটালগ প্রোডাক্ট, ক্যাটাগরি ও হোম ব্যানার নিয়ন্ত্রণ
          </p>
        </div>

        {/* Quick Tabs - 5 Distinct Sections including Dedicated Dashboard */}
        <div className="flex flex-wrap items-center gap-1.5 bg-neutral-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'dashboard'
                ? 'bg-[#2d5016] text-white shadow-sm'
                : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200/60'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>ড্যাশবোর্ড</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>অর্ডারসমূহ</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              activeTab === 'orders' ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-700'
            }`}>
              {orders.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'products'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>পণ্য ক্যাটালগ</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              activeTab === 'products' ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-700'
            }`}>
              {products.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'categories'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
            }`}
          >
            <Folder className="w-3.5 h-3.5" />
            <span>ক্যাটাগরি সমূহ</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              activeTab === 'categories' ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-700'
            }`}>
              {categories.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('banners')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'banners'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>হোম ব্যানার</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              activeTab === 'banners' ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-700'
            }`}>
              {heroSlides.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'blogs'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>ব্লগ ও আর্টিকেল</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              activeTab === 'blogs' ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-700'
            }`}>
              {blogs.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'testimonials'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
            }`}
          >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>গ্রাহক রিভিউ</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              activeTab === 'testimonials' ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-700'
            }`}>
              {testimonials.length}
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 0: SEPARATE DEDICATED DASHBOARD OVERVIEW SECTION */}
      {/* ========================================================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Welcome & Live Status Header */}
          <div className="bg-gradient-to-r from-[#2d5016] via-[#234011] to-[#1a1a1a] text-white rounded-3xl p-6 sm:p-7 shadow-sm relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>কাসাব গ্যালারি বিজনেস ওপারেশনস হাব</span>
                </div>
                <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-white">
                  ড্যাশবোর্ড ও ওভারভিউ (Overview & Analytics)
                </h2>
                <p className="text-xs sm:text-sm text-neutral-200 mt-1 max-w-2xl font-light">
                  স্টোরের রিয়েল-টাইম বিক্রয় পরিসংখ্যান, সাম্প্রতিক অর্ডার, ক্যাটালগ স্টক ও ক্লাউড ডেটাবেজের কেন্দ্রীয় নিয়ন্ত্রণ।
                </p>
              </div>

              {/* Status Pills and Quick Refresh */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <div className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 border ${
                  dbStatus?.connected
                    ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30'
                    : 'bg-amber-500/20 text-amber-200 border-amber-400/30'
                }`}>
                  <Database className="w-3.5 h-3.5" />
                  <span>{dbStatus?.connected ? 'MongoDB Live' : 'Database Ready'}</span>
                </div>

                <div className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 border ${
                  cloudinaryStatus?.configured
                    ? 'bg-sky-500/20 text-sky-200 border-sky-400/30'
                    : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                }`}>
                  <Cloud className="w-3.5 h-3.5" />
                  <span>{cloudinaryStatus?.configured ? 'Cloudinary CDN' : 'Upload Ready'}</span>
                </div>

                <button
                  onClick={() => refreshDbData()}
                  disabled={isLoadingDb}
                  className="px-3.5 py-1.5 rounded-xl bg-white text-[#2d5016] hover:bg-neutral-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 disabled:opacity-50 shadow-sm"
                  title="তথ্য রিফ্রেশ করুন"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDb ? 'animate-spin' : ''}`} />
                  <span>সিঙ্ক রিফ্রেশ</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4 Primary KPI Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              onClick={() => setActiveTab('orders')}
              className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs hover:border-[#2d5016]/40 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-semibold">মোট বিক্রয় রেভিনিউ</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-black text-[#2d5016] block">
                {formatBDT(totalRevenue)}
              </span>
              <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
                ক্যাশ অন ডেলিভারি ও অনলাইন
              </span>
            </div>

            <div 
              onClick={() => { setActiveTab('orders'); setOrderStatusFilter('all'); }}
              className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs hover:border-[#2d5016]/40 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-semibold">মোট অর্ডার সংখ্যা</span>
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-black text-neutral-900 block">
                {orders.length} টি
              </span>
              <span className="text-[11px] text-amber-600 font-bold mt-1 block">
                {pendingOrders} টি নতুন পেন্ডিং অর্ডার
              </span>
            </div>

            <div 
              onClick={() => setActiveTab('products')}
              className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs hover:border-[#2d5016]/40 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-semibold">সক্রিয় ক্যাটালগ পণ্য</span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Package className="w-4 h-4" />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-black text-neutral-900 block">
                {products.length} টি
              </span>
              <span className="text-[11px] text-neutral-500 mt-1 block">
                {categories.length} টি ক্যাটাগরিতে বিভক্ত
              </span>
            </div>

            <div 
              onClick={() => setActiveTab('banners')}
              className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs hover:border-[#2d5016]/40 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-semibold">হোম ব্যানার ও প্রোমো</span>
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-4 h-4" />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-black text-neutral-900 block">
                {heroSlides.length} টি
              </span>
              <span className="text-[11px] text-[#2d5016] font-medium mt-1 block">
                সরাসরি এডিট ও নিয়ন্ত্রণযোগ্য
              </span>
            </div>
          </div>

          {/* Interactive Order Pipeline Bar */}
          <div className="bg-white rounded-3xl p-5 border border-neutral-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-brand font-bold text-base text-neutral-900">
                  অর্ডার স্ট্যাটাস পাইপলাইন (Order Lifecycle Status)
                </h3>
                <p className="text-xs text-neutral-500">
                  যেকোনো স্ট্যাটাসে ক্লিক করে সরাসরি সেই অর্ডারের তালিকায় ফিল্টার করুন
                </p>
              </div>
              <button
                onClick={() => { setActiveTab('orders'); setOrderStatusFilter('all'); }}
                className="text-xs font-bold text-[#2d5016] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>সকল অর্ডার দেখুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              <button
                onClick={() => { setActiveTab('orders'); setOrderStatusFilter('pending'); }}
                className="p-3 rounded-2xl bg-amber-50/80 hover:bg-amber-100/90 border border-amber-200 text-left transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between text-amber-800 text-xs font-bold">
                  <span>পেন্ডিং</span>
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <div className="text-2xl font-black text-amber-900 mt-1">{pendingOrders}</div>
                <span className="text-[10px] text-amber-700">কনফার্মেশন অপেক্ষা</span>
              </button>

              <button
                onClick={() => { setActiveTab('orders'); setOrderStatusFilter('confirmed'); }}
                className="p-3 rounded-2xl bg-blue-50/80 hover:bg-blue-100/90 border border-blue-200 text-left transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between text-blue-800 text-xs font-bold">
                  <span>কনফার্মড</span>
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className="text-2xl font-black text-blue-900 mt-1">{confirmedOrders}</div>
                <span className="text-[10px] text-blue-700">প্যাকিংয়ের প্রস্তুতি</span>
              </button>

              <button
                onClick={() => { setActiveTab('orders'); setOrderStatusFilter('processing'); }}
                className="p-3 rounded-2xl bg-purple-50/80 hover:bg-purple-100/90 border border-purple-200 text-left transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between text-purple-800 text-xs font-bold">
                  <span>প্রসেসিং</span>
                  <Truck className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <div className="text-2xl font-black text-purple-900 mt-1">{processingOrders}</div>
                <span className="text-[10px] text-purple-700">কুরিয়ারে ডেলিভারি চলমান</span>
              </button>

              <button
                onClick={() => { setActiveTab('orders'); setOrderStatusFilter('delivered'); }}
                className="p-3 rounded-2xl bg-emerald-50/80 hover:bg-emerald-100/90 border border-emerald-200 text-left transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between text-emerald-800 text-xs font-bold">
                  <span>ডেলিভারড</span>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-emerald-900 mt-1">{deliveredOrders}</div>
                <span className="text-[10px] text-emerald-700">সফল ডেলিভারি সম্পন্ন</span>
              </button>

              <button
                onClick={() => { setActiveTab('orders'); setOrderStatusFilter('cancelled'); }}
                className="p-3 rounded-2xl bg-rose-50/80 hover:bg-rose-100/90 border border-rose-200 text-left transition-all cursor-pointer col-span-2 sm:col-span-1"
              >
                <div className="flex items-center justify-between text-rose-800 text-xs font-bold">
                  <span>বাতিল</span>
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                </div>
                <div className="text-2xl font-black text-rose-900 mt-1">{cancelledOrders}</div>
                <span className="text-[10px] text-rose-700">বাতিলকৃত অর্ডার</span>
              </button>
            </div>
          </div>

          {/* Quick Action Hub */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <button
              onClick={handleOpenNewProduct}
              className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-[#2d5016] shadow-xs flex items-center gap-3 transition-all cursor-pointer text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#2d5016]/10 text-[#2d5016] flex items-center justify-center shrink-0 group-hover:bg-[#2d5016] group-hover:text-white transition-colors">
                <Plus className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-neutral-900 block truncate">নতুন পণ্য যোগ</span>
                <span className="text-[11px] text-neutral-500 block truncate">ক্যাটালগে আপলোড</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-[#2d5016] shadow-xs flex items-center gap-3 transition-all cursor-pointer text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-[#2d5016] group-hover:text-white transition-colors">
                <PenTool className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-neutral-900 block truncate">নতুন ব্লগ লিখুন</span>
                <span className="text-[11px] text-neutral-500 block truncate">নলেজ আর্টিকেল</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('orders'); setOrderStatusFilter('all'); }}
              className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-[#2d5016] shadow-xs flex items-center gap-3 transition-all cursor-pointer text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-neutral-900 block truncate">অর্ডার পরিচালনা</span>
                <span className="text-[11px] text-neutral-500 block truncate">স্ট্যাটাস ও ইনভয়েস</span>
              </div>
            </button>

            <button
              onClick={handleOpenNewBanner}
              className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-[#2d5016] shadow-xs flex items-center gap-3 transition-all cursor-pointer text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-neutral-900 block truncate">নতুন ব্যানার যোগ</span>
                <span className="text-[11px] text-neutral-500 block truncate">হোম ক্যারোসেল</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-[#2d5016] shadow-xs flex items-center gap-3 transition-all cursor-pointer text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Folder className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-neutral-900 block truncate">ক্যাটাগরি সাজান</span>
                <span className="text-[11px] text-neutral-500 block truncate">ছবি ও আইকন এডিট</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-[#2d5016] shadow-xs flex items-center gap-3 transition-all cursor-pointer text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <MessageSquareQuote className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-neutral-900 block truncate">গ্রাহক সন্তুষ্টি</span>
                <span className="text-[11px] text-neutral-500 block truncate">{testimonials.length}টি রিভিউ</span>
              </div>
            </button>
          </div>

          {/* 2-Column Section: Recent Orders & Stock / Category Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Recent Orders (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif-brand font-bold text-base text-neutral-900">
                    সাম্প্রতিক অর্ডারসমূহ (Recent Orders)
                  </h3>
                  <p className="text-xs text-neutral-500">
                    সর্বশেষ প্রাপ্ত ৫টি গ্রাহক অর্ডারের অবস্থা
                  </p>
                </div>
                <button
                  onClick={() => { setActiveTab('orders'); setOrderStatusFilter('all'); }}
                  className="text-xs font-bold text-[#2d5016] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>সকল অর্ডার</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {recentOrders.length === 0 ? (
                <div className="py-8 text-center text-xs text-neutral-400">
                  এখনো কোনো অর্ডার পাওয়া যায়নি
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-neutral-200 text-neutral-400 font-bold uppercase text-[10px]">
                        <th className="pb-2 px-2">অর্ডার আইডি</th>
                        <th className="pb-2 px-2">গ্রাহক</th>
                        <th className="pb-2 px-2">মোট মূল্য</th>
                        <th className="pb-2 px-2">স্ট্যাটাস</th>
                        <th className="pb-2 px-2 text-right">বিস্তারিত</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {recentOrders.map((order) => (
                        <tr key={order._id} className="hover:bg-neutral-50 transition-colors">
                          <td className="py-3 px-2 font-mono font-bold text-neutral-900">
                            <span className="text-[#2d5016]">{order._id}</span>
                            <span className="block text-[10px] text-neutral-400 font-sans">
                              {order.channel === 'whatsapp' ? '📱 WhatsApp' : '🌐 Website COD'}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <span className="font-bold text-neutral-900 block truncate max-w-[140px]">
                              {order.customer.name}
                            </span>
                            <span className="text-[11px] text-neutral-500 block truncate max-w-[140px]">
                              {order.customer.phone}
                            </span>
                          </td>
                          <td className="py-3 px-2 font-black text-neutral-900 whitespace-nowrap">
                            {formatBDT(order.total)}
                          </td>
                          <td className="py-3 px-2 whitespace-nowrap">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              order.status === 'delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.status === 'confirmed'
                                ? 'bg-blue-100 text-blue-800'
                                : order.status === 'processing'
                                ? 'bg-purple-100 text-purple-800'
                                : order.status === 'cancelled'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {order.status === 'delivered' ? 'ডেলিভারড' :
                               order.status === 'confirmed' ? 'কনফার্মড' :
                               order.status === 'processing' ? 'প্রসেসিং' :
                               order.status === 'cancelled' ? 'বাতিল' : 'পেন্ডিং'}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right whitespace-nowrap">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-[#2d5016] hover:text-white text-neutral-700 text-[11px] font-bold transition-colors cursor-pointer"
                            >
                              ভিউ
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Right Column: Inventory & Category Distribution (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Low stock alert */}
              <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <h3 className="font-serif-brand font-bold text-base text-neutral-900">
                      ইনভেন্টরি ও স্টক সতর্কতা
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="text-xs font-bold text-[#2d5016] hover:underline cursor-pointer"
                  >
                    সকল পণ্য
                  </button>
                </div>

                {lowStockProducts.length === 0 ? (
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>সব পণ্যের পর্যাপ্ত স্টক মজুদ রয়েছে!</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {lowStockProducts.map((p) => (
                      <div
                        key={p._id}
                        className="flex items-center justify-between p-2 rounded-xl bg-neutral-50 border border-neutral-100 hover:bg-neutral-100/70 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={p.image}
                            alt=""
                            className="w-9 h-9 rounded-lg object-cover border border-neutral-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-neutral-900 block truncate max-w-[130px] sm:max-w-[170px]">
                              {p.banglaName}
                            </span>
                            <span className="text-[10px] text-neutral-400 block truncate">
                              {p.name}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            (p.stock ?? 25) <= 5
                              ? 'bg-rose-100 text-rose-800 font-black'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            স্টক: {p.stock ?? 25} টি
                          </span>
                          <button
                            onClick={() => handleEditProduct(p)}
                            className="p-1 rounded-lg hover:bg-white text-neutral-600 hover:text-[#2d5016] transition-colors cursor-pointer"
                            title="স্টক আপডেট করুন"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Category distribution widget */}
              <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-[#2d5016]" />
                    <h3 className="font-serif-brand font-bold text-base text-neutral-900">
                      ক্যাটাগরি ওভারভিউ ({categories.length} টি)
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('categories')}
                    className="text-xs font-bold text-[#2d5016] hover:underline cursor-pointer"
                  >
                    ম্যানেজ করুন
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => {
                    const count = products.filter((p) => p.category === cat._id).length;
                    return (
                      <div
                        key={cat._id}
                        onClick={() => setActiveTab('products')}
                        className="p-2.5 rounded-xl border border-neutral-200 hover:border-[#2d5016]/40 hover:bg-neutral-50 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <img
                          src={cat.image}
                          alt=""
                          className="w-7 h-7 rounded-lg object-cover border border-neutral-200 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] font-bold text-neutral-800 block truncate">
                            {cat.banglaName}
                          </span>
                          <span className="text-[10px] text-neutral-400 block">
                            {count} টি পণ্য
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Database & Cloudinary Connection Status in Dedicated Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* MongoDB Status */}
            <div className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  dbStatus?.connected ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-neutral-900">
                      {dbStatus?.connected ? 'MongoDB Database: Connected' : 'Database: Ready'}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      dbStatus?.connected ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {dbStatus?.connected ? 'Live Atlas Cloud' : 'Express Store'}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-1">
                    {dbStatus?.connected 
                      ? 'সকল ডেটা ক্লাউড MongoDB Atlas থেকে লোড হচ্ছে।' 
                      : (dbStatus?.note || 'Settings / Secrets-এ MONGODB_URI যোগ করতে পারেন।')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => refreshDbData()}
                disabled={isLoadingDb}
                className="px-2.5 py-1.5 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-[11px] font-semibold text-neutral-700 flex items-center gap-1.5 cursor-pointer shrink-0 disabled:opacity-50"
                title="রিফ্রেশ"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDb ? 'animate-spin' : ''}`} />
                <span>রিফ্রেশ</span>
              </button>
            </div>

            {/* Cloudinary Status */}
            <div className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  cloudinaryStatus?.configured ? 'bg-sky-50 text-sky-700 border border-sky-200' : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                }`}>
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-neutral-900">
                      Cloudinary ইমেজ সিডিএন
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      cloudinaryStatus?.configured ? 'bg-sky-100 text-sky-800' : 'bg-neutral-200 text-neutral-700'
                    }`}>
                      {cloudinaryStatus?.configured ? 'Cloudinary Connected' : 'Upload Ready'}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-1">
                    {cloudinaryStatus?.configured
                      ? 'পণ্য ও ব্যানারের ছবি ক্লাউডিনারি হাই-স্পিড সিডিএন-এ হোস্ট হচ্ছে।'
                      : 'Settings > Secrets-এ CLOUDINARY_CLOUD_NAME, API_KEY ও SECRET যোগ করুন।'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 1: ORDERS MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-5 animate-in fade-in duration-200">
          {/* Section Breadcrumb */}
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d5016] hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← ড্যাশবোর্ড ওভারভিউতে ফিরুন</span>
            </button>
            <span className="text-[11px] text-neutral-400 font-medium">অর্ডার ব্যবস্থাপনা সেকশন</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-serif-brand text-lg font-bold text-neutral-900">
                গ্রাহকদের অর্ডার তালিকা (Customer Orders)
              </h2>
              <p className="text-xs text-neutral-500">
                ক্যাশ অন ডেলিভারি ও হোয়াটসঅ্যাপ অর্ডারের স্ট্যাটাস নিয়ন্ত্রণ ও ইনভয়েস ম্যানেজমেন্ট
              </p>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-neutral-100 p-1.5 rounded-2xl">
              {[
                { id: 'all', label: 'সকল অর্ডার', count: orders.length },
                { id: 'pending', label: 'পেন্ডিং', count: pendingOrders, color: 'text-amber-700' },
                { id: 'confirmed', label: 'কনফার্মড', count: confirmedOrders, color: 'text-blue-700' },
                { id: 'processing', label: 'প্রসেসিং', count: processingOrders, color: 'text-purple-700' },
                { id: 'delivered', label: 'ডেলিভারড', count: deliveredOrders, color: 'text-emerald-700' },
                { id: 'cancelled', label: 'বাতিল', count: cancelledOrders, color: 'text-red-700' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setOrderStatusFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    orderStatusFilter === tab.id
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    orderStatusFilter === tab.id ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f7f6f2] text-neutral-700 font-bold border-y border-neutral-200 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3">অর্ডার আইডি</th>
                  <th className="py-3 px-3">তারিখ</th>
                  <th className="py-3 px-3">গ্রাহক ও যোগাযোগ</th>
                  <th className="py-3 px-3">পণ্য তালিকা</th>
                  <th className="py-3 px-3">ডেলিভারি</th>
                  <th className="py-3 px-3">সর্বমোট</th>
                  <th className="py-3 px-3">স্ট্যাটাস</th>
                  <th className="py-3 px-3">কুইক অ্যাকশন</th>
                  <th className="py-3 px-3 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-neutral-400">
                      কোনো অর্ডার পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-neutral-900 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-[#2d5016] hover:underline cursor-pointer flex items-center gap-1"
                          title="বিস্তারিত দেখতে ক্লিক করুন"
                        >
                          {order._id}
                        </button>
                        <span className="block text-[10px] text-neutral-400 font-sans">
                          {order.channel === 'whatsapp' ? '📱 WhatsApp' : '🌐 Website COD'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-neutral-500 whitespace-nowrap">
                        {new Date(order.orderDate || order.createdAt || Date.now()).toLocaleDateString('bn-BD', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3 px-3 min-w-[150px]">
                        <span className="font-bold text-neutral-900 block">{order.customer.name}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <a href={`tel:${order.customer.phone}`} className="text-[#2d5016] font-semibold hover:underline inline-flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span>{order.customer.phone}</span>
                          </a>
                        </div>
                        <span className="text-[11px] text-neutral-400 block line-clamp-1 mt-0.5">
                          {order.customer.address}
                        </span>
                      </td>
                      <td className="py-3 px-3 min-w-[180px]">
                        <div className="space-y-0.5">
                          {order.items.map((i, idx) => (
                            <div key={idx} className="text-[11px] text-neutral-700">
                              <strong>{i.quantity}x</strong> {i.banglaName}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-800">
                          {order.customer.city}
                        </span>
                        <span className="block text-[10px] text-neutral-400 mt-0.5">
                          চার্জ: {formatBDT(order.delivery_charge)}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-black text-neutral-900 whitespace-nowrap">
                        {formatBDT(order.total)}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value as OrderStatus)}
                          className={`text-xs font-bold px-2 py-1.5 rounded-lg border focus:outline-none cursor-pointer transition-colors ${
                            order.status === 'delivered'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : order.status === 'confirmed'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : order.status === 'processing'
                              ? 'bg-purple-50 text-purple-800 border-purple-300'
                              : order.status === 'cancelled'
                              ? 'bg-red-50 text-red-800 border-red-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="pending">Pending (অপেক্ষারত)</option>
                          <option value="confirmed">Confirmed (নিশ্চিত)</option>
                          <option value="processing">Processing (প্রস্তুত)</option>
                          <option value="delivered">Delivered (পৌঁছেছে)</option>
                          <option value="cancelled">Cancelled (বাতিল)</option>
                        </select>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        {order.status === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order._id, 'confirmed')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold inline-flex items-center gap-1 shadow-xs cursor-pointer"
                            title="অর্ডার এখনই নিশ্চিত করুন"
                          >
                            <Check className="w-3 h-3" />
                            <span>কনফার্ম</span>
                          </button>
                        )}
                        {order.status === 'confirmed' && (
                          <button
                            onClick={() => updateOrderStatus(order._id, 'processing')}
                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold inline-flex items-center gap-1 shadow-xs cursor-pointer"
                            title="প্যাকেজিং ও শিপিং শুরু করুন"
                          >
                            <Truck className="w-3 h-3" />
                            <span>প্রসেসিং</span>
                          </button>
                        )}
                        {order.status === 'processing' && (
                          <button
                            onClick={() => updateOrderStatus(order._id, 'delivered')}
                            className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-[11px] font-bold inline-flex items-center gap-1 shadow-xs cursor-pointer"
                            title="অর্ডারটি সফলভাবে ডেলিভারড মার্ক করুন"
                          >
                            <CheckCircle className="w-3 h-3" />
                            <span>ডেলিভারড</span>
                          </button>
                        )}
                        {order.status === 'delivered' && (
                          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> সম্পন্ন
                          </span>
                        )}
                        {order.status === 'cancelled' && (
                          <span className="text-[11px] text-red-500 font-bold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> বাতিলকৃত
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 cursor-pointer transition-colors"
                            title="অর্ডার বিস্তারিত ও ইনভয়েস দেখুন"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setOrderToDelete(order)}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                            title="অর্ডার মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: PRODUCTS MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-5 animate-in fade-in duration-200">
          {/* Section Breadcrumb */}
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d5016] hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← ড্যাশবোর্ড ওভারভিউতে ফিরুন</span>
            </button>
            <span className="text-[11px] text-neutral-400 font-medium">পণ্য ক্যাটালগ সেকশন</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-serif-brand text-lg font-bold text-neutral-900">
                পণ্য ক্যাটালগ ব্যবস্থাপনা (Catalog Products)
              </h2>
              <p className="text-xs text-neutral-500">
                নতুন পণ্য যোগ করুন, মূল্য পরিবর্তন করুন অথবা বিবরণ এডিট করুন
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
                placeholder="পণ্য খুঁজুন..."
                className="text-xs border border-neutral-300 rounded-xl px-3 py-2 bg-white"
              />
              <button
                onClick={handleOpenNewProduct}
                className="px-4 py-2 rounded-xl bg-[#2d5016] hover:bg-[#234011] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন পণ্য যোগ করুন</span>
              </button>
            </div>
          </div>

          {/* Product Grid / Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f7f6f2] text-neutral-700 font-bold border-y border-neutral-200 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3">ছবি</th>
                  <th className="py-3 px-3">পণ্যের নাম</th>
                  <th className="py-3 px-3">ক্যাটাগরি</th>
                  <th className="py-3 px-3">বিক্রয় মূল্য</th>
                  <th className="py-3 px-3">স্টক</th>
                  <th className="py-3 px-3">খাঁটি সার্টিফিকেট</th>
                  <th className="py-3 px-3 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3 px-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 rounded-lg object-cover border border-neutral-200"
                      />
                    </td>
                    <td className="py-3 px-3 min-w-[200px]">
                      <span className="font-bold text-neutral-900 block">{p.banglaName}</span>
                      <span className="text-[11px] text-neutral-400">{p.name}</span>
                      {p.badge && (
                        <span className="inline-block px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[10px] font-bold mt-0.5">
                          {p.badge}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 font-medium text-[11px]">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-black text-[#2d5016]">
                      {formatBDT(p.price)}
                      {p.originalPrice && p.originalPrice > p.price && (
                        <span className="block text-[10px] text-neutral-400 line-through font-normal">
                          {formatBDT(p.originalPrice)}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-neutral-800">{p.stock} টি</span>
                    </td>
                    <td className="py-3 px-3">
                      {p.sunnah_certified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                          <Check className="w-3.5 h-3.5" /> হ্যাঁ (Pure)
                        </span>
                      ) : (
                        <span className="text-[11px] text-neutral-400">না</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditProduct(p)}
                          className="p-1.5 rounded-lg text-neutral-600 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setProductToDelete(p)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                          title="পণ্য মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: BANNERS & NOTICES MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'banners' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* 1. TOP SCROLLING NOTICE BAR CONTROLLER */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-6">
            {/* Section Breadcrumb & Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d5016] hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>← ড্যাশবোর্ড ওভারভিউতে ফিরুন</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-[#fbf8ee] text-[#855e09] border border-[#d4af37]/30">
                  হোম ব্যানার ও নোটিশ সেকশন
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1b340e] text-[#d4af37] flex items-center justify-center shrink-0 shadow-xs">
                  <Volume2 className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif-brand text-lg font-bold text-neutral-900">
                      শীর্ষ স্ক্রোলিং টেক্সট নোটিশ (Top Scrolling Notice Bar)
                    </h2>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        noticeEnabled
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-neutral-200 text-neutral-600'
                      }`}
                    >
                      {noticeEnabled ? '● ওয়েবসাইটে সক্রিয়' : '○ বন্ধ রাখা আছে'}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    ওয়েবসাইটের প্রধান মেনুর (Navbar) উপরে চলমান নোটিশ, ডেলিভারি অফার ও হটলাইন নিয়ন্ত্রণ করুন
                  </p>
                </div>
              </div>

              {/* Status Toggle Switch */}
              <div className="flex items-center gap-3 bg-neutral-50 px-3.5 py-2 rounded-2xl border border-neutral-200 self-start md:self-auto">
                <span className="text-xs font-semibold text-neutral-700">নোটিশ স্ট্যাটাস:</span>
                <button
                  type="button"
                  onClick={() => setNoticeEnabled(!noticeEnabled)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    noticeEnabled ? 'bg-[#2d5016]' : 'bg-neutral-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      noticeEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-xs font-bold text-neutral-800 min-w-[36px]">
                  {noticeEnabled ? 'অন' : 'অফ'}
                </span>
              </div>
            </div>

            {/* Live Interactive Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-600">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#2d5016]" />
                  <span>লাইভ প্রিভিউ (ওয়েবসাইটে যেভাবে দেখা যাবে):</span>
                </span>
                <span className="text-[11px] text-neutral-400 font-normal">
                  গতি: {noticeSpeed === 'fast' ? 'দ্রুত (16s)' : noticeSpeed === 'slow' ? 'ধীর (40s)' : 'স্বাভাবিক (26s)'}
                </span>
              </div>

              {noticeEnabled ? (
                <div className="rounded-xl overflow-hidden border border-[#2d5016]/40 shadow-xs bg-[#1b340e] text-white p-2 sm:px-4 flex items-center gap-3">
                  <div className="bg-[#d4af37] text-neutral-950 font-bold px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] shrink-0 flex items-center gap-1">
                    <Volume2 className="w-3 h-3 text-neutral-900 shrink-0" />
                    <span>{noticeBadge || '📢 বিশেষ ঘোষণা'}</span>
                  </div>
                  <div className="overflow-hidden flex-1 relative whitespace-nowrap text-xs text-neutral-100 font-medium">
                    <span className="inline-block truncate">
                      {noticeText || 'কোনো নোটিশ টেক্সট লিখা হয়নি...'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-3 text-center text-xs text-neutral-500">
                  ⚠️ নোটিশ বর্তমানে বন্ধ রাখা হয়েছে। ওয়েবসাইটে এটি প্রদর্শিত হবে না।
                </div>
              )}
            </div>

            {/* Quick Presets */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider block">
                ⚡ কুইক প্রিসেট (এক ক্লিকে নোটিশ সেট করুন):
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setNoticeBadge('📢 বিশেষ ঘোষণা');
                    setNoticeText('🌿 কাসাব গ্যালারিতে যেকোনো অর্ডারে একটি নির্দিষ্ট ডেলিভারি চার্জ (ঢাকা ৳৭০ | ঢাকার বাইরে ৳১২০)। হটলাইন: ০১৯১৫-৬৪৭২৯০।');
                    setNoticeEnabled(true);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-[#2d5016]/10 hover:text-[#2d5016] text-[11px] font-semibold text-neutral-700 border border-neutral-200 transition-colors cursor-pointer"
                >
                  🚚 সিঙ্গেল ডেলিভারি চার্জ অফার
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNoticeBadge('🌙 মাহে রমজান');
                    setNoticeText('🌙 পবিত্র মাহে রমজান উপলক্ষে ১০০% খাঁটি সুন্দরবনের মধু ও প্রিমিয়াম মরিয়ম খেজুরে বিশেষ কম্বো ছাড়! হটলাইন: ০১৯১৫-৬৪৭২৯০।');
                    setNoticeEnabled(true);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-[#2d5016]/10 hover:text-[#2d5016] text-[11px] font-semibold text-neutral-700 border border-neutral-200 transition-colors cursor-pointer"
                >
                  🌙 রমজান কম্বো অফার
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNoticeBadge('🌿 খাঁটি পণ্যের নিশ্চয়তা');
                    setNoticeText('🌿 কাসাব গ্যালারি - আপনার সুস্বাস্থ্যের বিশ্বস্ত ঠিকানা। শতভাগ প্রাকৃতিক, নির্ভেজাল খাবার সরাসরি আপনার ঘরে পৌঁছে দিচ্ছি।');
                    setNoticeEnabled(true);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-[#2d5016]/10 hover:text-[#2d5016] text-[11px] font-semibold text-neutral-700 border border-neutral-200 transition-colors cursor-pointer"
                >
                  🌿 ১০০% বিশুদ্ধতার অঙ্গীকার
                </button>
              </div>
            </div>

            {/* Notice Edit Form */}
            <form onSubmit={handleSaveNotice} className="space-y-4 pt-2 border-t border-neutral-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Notice Text Bangla */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-neutral-800 flex items-center justify-between">
                    <span>চলমান নোটিশ টেক্সট (বাংলা) *</span>
                    <span className="text-[10px] text-neutral-400 font-normal">
                      {noticeText.length} অক্ষর
                    </span>
                  </label>
                  <textarea
                    rows={3}
                    value={noticeText}
                    onChange={(e) => setNoticeText(e.target.value)}
                    placeholder="যেমন: 🌿 কাসাব গ্যালারিতে যেকোনো অর্ডারে একটি নির্দিষ্ট ডেলিভারি চার্জ..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-[#2d5016] focus:border-transparent outline-hidden bg-neutral-50 focus:bg-white resize-none"
                    required
                  />
                </div>

                {/* Badge and Speed */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-800 block">
                      ব্যাজ টেক্সট (Badge Label)
                    </label>
                    <input
                      type="text"
                      value={noticeBadge}
                      onChange={(e) => setNoticeBadge(e.target.value)}
                      placeholder="📢 বিশেষ ঘোষণা"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-[#2d5016] focus:border-transparent outline-hidden bg-neutral-50 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-800 block">
                      স্ক্রোলিং গতি (Animation Speed)
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['slow', 'normal', 'fast'] as const).map((spd) => (
                        <button
                          key={spd}
                          type="button"
                          onClick={() => setNoticeSpeed(spd)}
                          className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            noticeSpeed === spd
                              ? 'bg-[#2d5016] text-white shadow-xs'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          {spd === 'slow' ? 'ধীর' : spd === 'normal' ? 'স্বাভাবিক' : 'দ্রুত'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional English Text */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700 block">
                    নোটিশ টেক্সট (ইংরেজি - ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={noticeTextEn}
                    onChange={(e) => setNoticeTextEn(e.target.value)}
                    placeholder="Welcome to Kasab Gallery! Single delivery charge nationwide."
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-[#2d5016] focus:border-transparent outline-hidden bg-neutral-50 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700 block">
                    ক্লিক লিংক (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={noticeLink}
                    onChange={(e) => setNoticeLink(e.target.value)}
                    placeholder="যেমন: catalog বা https://..."
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-[#2d5016] focus:border-transparent outline-hidden bg-neutral-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSavingNotice}
                  className="px-5 py-2.5 rounded-xl bg-[#2d5016] hover:bg-[#234011] text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-all disabled:opacity-50"
                >
                  {isSavingNotice ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>সংরক্ষণ হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>স্ক্রোলিং নোটিশ সংরক্ষণ করুন (Save Notice)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* 2. HERO SLIDER MANAGEMENT */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-serif-brand text-lg font-bold text-neutral-900">
                  হোমপেজ ব্যানার স্লাইডার (Hero Carousel Manager)
                </h2>
                <p className="text-xs text-neutral-500">
                  হোমপেজের মূল প্রমোশনাল ব্যানার ও স্লাইড যুক্ত বা রিমুভ করুন
                </p>
              </div>

              <button
                onClick={handleOpenNewBanner}
                className="px-4 py-2 rounded-xl bg-[#2d5016] hover:bg-[#234011] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন ব্যানার যুক্ত করুন</span>
              </button>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {heroSlides.map((slide) => (
              <div
                key={slide._id || slide.id}
                className="bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden flex flex-col justify-between hover:shadow-sm transition-shadow"
              >
                <div>
                  <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-900 relative">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    {slide.badge && (
                      <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/75 text-[#d4af37] text-[10px] font-bold backdrop-blur-xs">
                        {slide.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-1">
                    <h4 className="font-bold text-neutral-900 text-sm">{slide.banglaTitle}</h4>
                    <p className="text-xs text-neutral-500 line-clamp-2">{slide.banglaSubtitle}</p>
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-neutral-200 flex justify-between items-center bg-white">
                  <span className="text-[11px] text-[#2d5016] font-bold">{slide.ctaText}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditBanner(slide)}
                      className="p-1.5 text-neutral-500 hover:text-[#2d5016] hover:bg-neutral-100 rounded-lg cursor-pointer transition-colors"
                      title="ব্যানার এডিট করুন"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (heroSlides.length <= 1) {
                          showToast('কমপক্ষে ১টি ব্যানার স্লাইড থাকতে হবে');
                          return;
                        }
                        setBannerToDelete(slide);
                      }}
                      className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                      title="ব্যানার ডিলিট করুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: CATEGORIES MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'categories' && (
        <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-6 animate-in fade-in duration-200">
          {/* Section Breadcrumb */}
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d5016] hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← ড্যাশবোর্ড ওভারভিউতে ফিরুন</span>
            </button>
            <span className="text-[11px] text-neutral-400 font-medium">ক্যাটাগরি সেকশন</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-brand text-lg font-bold text-neutral-900">
                  ক্যাটাগরি ব্যবস্থাপনা ও আপডেট (Category Management)
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#2d5016]/10 text-[#2d5016] text-[11px] font-bold">
                  {categories.length} টি ক্যাটাগরি
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                এখানে ক্যাটাগরির নাম, বাংলা বিবরণ, কভার ছবি ও আইকন পরিবর্তন বা ডিলিট করুন।
              </p>
            </div>

            <button
              onClick={handleOpenNewCategory}
              className="px-4 py-2 rounded-xl bg-[#2d5016] hover:bg-[#234011] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন ক্যাটাগরি যোগ করুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => {
              const count = products.filter((p) => p.category === cat._id).length;
              return (
                <div
                  key={cat._id}
                  className="rounded-2xl border border-neutral-200 bg-white hover:border-[#2d5016]/40 hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-5 space-y-4">
                    {/* Header with Circular Avatar & Title */}
                    <div className="flex items-start gap-3.5">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-neutral-100 shadow-xs bg-neutral-100">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2d5016]">
                          {getCategoryIcon(cat.iconName)}
                          <span className="uppercase tracking-wider font-mono text-[10px] text-neutral-400">
                            ID: {cat._id}
                          </span>
                        </div>
                        <h3 className="font-serif-brand font-bold text-base text-neutral-900 truncate mt-0.5">
                          {cat.banglaName}
                        </h3>
                        <p className="text-xs text-neutral-500 font-medium truncate">
                          {cat.name}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="bg-[#faf9f5] p-3 rounded-xl border border-neutral-100 space-y-1">
                      <p className="text-xs font-medium text-neutral-700 line-clamp-2">
                        {cat.banglaDescription || cat.descriptionBn || 'কোনো বাংলা বিবরণ নেই'}
                      </p>
                      {cat.description && (
                        <p className="text-[11px] text-neutral-400 line-clamp-1 italic">
                          {cat.description}
                        </p>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Package className="w-3.5 h-3.5 text-neutral-400" />
                        এই ক্যাটাগরিতে পণ্য:
                      </span>
                      <span className="font-bold text-[#2d5016] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                        {count} টি
                      </span>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-400">
                      আইকন: <strong className="text-neutral-700">{cat.iconName || 'Sparkles'}</strong>
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleEditCategory(cat)}
                        className="px-3 py-1.5 rounded-xl bg-[#2d5016] text-white hover:bg-[#234011] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>এডিট</span>
                      </button>
                      <button
                        onClick={() => setCategoryToDelete(cat)}
                        className="p-1.5 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                        title="ক্যাটাগরি মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: BLOGS & ARTICLES MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'blogs' && (
        <AdminBlogManager onBackToDashboard={() => setActiveTab('dashboard')} />
      )}

      {/* ========================================================= */}
      {/* TAB 6: TESTIMONIALS (Customer Satisfaction Experience) */}
      {/* ========================================================= */}
      {activeTab === 'testimonials' && (
        <AdminTestimonialsManager onBackToDashboard={() => setActiveTab('dashboard')} />
      )}

      {/* ========================================================= */}
      {/* ADD/EDIT PRODUCT MODAL */}
      {/* ========================================================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif-brand text-xl font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              {editingProductId ? 'পণ্য এডিট করুন' : 'নতুন পণ্য যুক্ত করুন'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">বাংলা নাম *</label>
                  <input
                    type="text"
                    required
                    value={pBanglaName}
                    onChange={(e) => setPBanglaName(e.target.value)}
                    placeholder="উদা: খাঁটি সুন্দরবনের মধু"
                    className="w-full p-2.5 rounded-xl border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">ইংরেজি নাম *</label>
                  <input
                    type="text"
                    required
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                    placeholder="e.g. Pure Sundarban Wild Honey"
                    className="w-full p-2.5 rounded-xl border border-neutral-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">ক্যাটাগরি *</label>
                  <select
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value as CategoryId)}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 bg-white"
                  >
                    <option value="food">খাদ্য (Food)</option>
                    <option value="skincare">স্কিনকেয়ার (Skincare)</option>
                    <option value="accessories">এক্সেসরিজ (Accessories)</option>
                    <option value="islamic">ইসলামিক (Islamic)</option>
                    <option value="winter">শীতের পোশাক (Winter)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">বিক্রয় মূল্য (৳) *</label>
                  <input
                    type="number"
                    required
                    value={pPrice}
                    onChange={(e) => setPPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">আগের মূল্য (৳)</label>
                  <input
                    type="number"
                    value={pOriginalPrice}
                    onChange={(e) => setPOriginalPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-neutral-300"
                  />
                </div>
              </div>

              {/* MULTIPLE PRODUCT IMAGES GALLERY MANAGER */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block font-bold text-neutral-900 text-xs flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[#2d5016]" />
                      পণ্যের ছবিসমূহ (Multiple Images Gallery)
                    </label>
                    <span className="text-[11px] text-neutral-500">
                      ১ বা একাধিক ছবি যোগ করতে পারেন। প্রথম ছবিটি মূল কভার (Primary) হিসেবে প্রদর্শিত হবে।
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#2d5016]/10 text-[#2d5016] border border-[#2d5016]/20 shrink-0">
                    {pImages.length} টি ছবি যুক্ত
                  </span>
                </div>

                {/* Thumbnails grid */}
                {pImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    {pImages.map((imgUrl, idx) => {
                      const isPrimary = pImage ? imgUrl === pImage : idx === 0;
                      return (
                        <div
                          key={idx}
                          className={`relative rounded-xl overflow-hidden border-2 bg-white shadow-2xs group transition-all ${
                            isPrimary
                              ? 'border-[#2d5016] ring-2 ring-[#2d5016]/20'
                              : 'border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          <div className="aspect-square relative">
                            <img
                              src={imgUrl}
                              alt={`Product ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {isPrimary && (
                              <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-[#2d5016] text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                                <Star className="w-3 h-3 fill-current text-[#d4af37]" />
                                <span>মূল ছবি</span>
                              </div>
                            )}

                            {/* Delete button */}
                            <button
                              type="button"
                              onClick={() => handleRemoveProductImage(idx)}
                              className="absolute top-1.5 right-1.5 p-1 rounded-md bg-white/90 hover:bg-red-50 text-neutral-500 hover:text-red-600 shadow-xs cursor-pointer transition-colors"
                              title="ছবিটি বাদ দিন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Control row */}
                          <div className="p-1.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[10px]">
                            {!isPrimary ? (
                              <button
                                type="button"
                                onClick={() => handleSetPrimaryImage(imgUrl)}
                                className="text-[#2d5016] font-bold hover:underline cursor-pointer"
                              >
                                মূল ছবি করুন
                              </button>
                            ) : (
                              <span className="text-[#2d5016] font-bold">Primary</span>
                            )}

                            {/* Reorder arrows */}
                            <div className="flex items-center gap-0.5 ml-auto">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveProductImage(idx, idx - 1)}
                                className="p-1 rounded text-neutral-500 hover:bg-neutral-200 disabled:opacity-30 cursor-pointer"
                                title="বামে সরান"
                              >
                                ←
                              </button>
                              <button
                                type="button"
                                disabled={idx === pImages.length - 1}
                                onClick={() => handleMoveProductImage(idx, idx + 1)}
                                className="p-1 rounded text-neutral-500 hover:bg-neutral-200 disabled:opacity-30 cursor-pointer"
                                title="ডানে সরান"
                              >
                                →
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Dropzone for adding new image */}
                <div>
                  <ImageUploadDropzone
                    value=""
                    onChange={(url) => {
                      if (url) {
                        handleAddProductImage(url);
                      }
                    }}
                    folder="products"
                    banglaLabel="নতুন ছবি আপলোড করুন (ক্লাউডিনারি সিডিএন)"
                    label="ড্রপ করে বা ব্রাউজ করে আরও ছবি যুক্ত করুন"
                    aspectRatio="square"
                  />
                </div>

                {/* Add by URL input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="url"
                    value={newImgInput}
                    onChange={(e) => setNewImgInput(e.target.value)}
                    placeholder="অথবা সরাসরি ইমেজ লিংক পেস্ট করুন (https://...)"
                    className="flex-1 p-2 rounded-xl border border-neutral-300 text-xs bg-white focus:border-[#2d5016] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddProductImage(newImgInput)}
                    className="px-3.5 py-2 bg-[#2d5016] hover:bg-[#234011] text-white font-bold rounded-xl text-xs cursor-pointer shrink-0 transition-colors"
                  >
                    + ছবি যোগ করুন
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  সংক্ষিপ্ত বিবরণ (Short Discussion) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={pShortDesc}
                  onChange={(e) => setPShortDesc(e.target.value)}
                  placeholder="পণ্যের সংক্ষিপ্ত বিবরণ লিখুন যা কার্ড ও প্রাইজ বক্সের নিচে এক নজরে পড়ার জন্য প্রদর্শিত হবে..."
                  className="w-full p-2.5 rounded-xl border border-neutral-300 font-medium text-xs focus:border-[#2d5016] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  বিস্তারিত আলোচনা (Long Discussion) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={pLongDesc}
                  onChange={(e) => setPLongDesc(e.target.value)}
                  placeholder="পণ্য সম্পর্কে বিস্তারিত আলোচনা, প্রাকৃতিক গুণাগুণ, খাঁটি হওয়ার নিশ্চয়তা ও ব্যবহার নির্দেশিকা লিখুন..."
                  className="w-full p-2.5 rounded-xl border border-neutral-300 font-medium text-xs focus:border-[#2d5016] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  English Details (ইংরেজি বিবরণ)
                </label>
                <textarea
                  rows={3}
                  value={pDesc}
                  onChange={(e) => setPDesc(e.target.value)}
                  placeholder="English details / specifications of the product..."
                  className="w-full p-2.5 rounded-xl border border-neutral-300 font-medium text-xs focus:border-[#2d5016] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">হাইলাইট ব্যাজ (ঐচ্ছিক)</label>
                  <input
                    type="text"
                    value={pBadge}
                    onChange={(e) => setPBadge(e.target.value)}
                    placeholder="উদা: ১০০% খাঁটি, সেরা ছাড়"
                    className="w-full p-2.5 rounded-xl border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">স্টক পরিমাণ</label>
                  <input
                    type="number"
                    value={pStock}
                    onChange={(e) => setPStock(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-neutral-300"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pSunnahCheck"
                  checked={pSunnah}
                  onChange={(e) => setPSunnah(e.target.checked)}
                  className="w-4 h-4 rounded text-[#2d5016]"
                />
                <label htmlFor="pSunnahCheck" className="text-xs font-semibold text-neutral-800">
                  ১০০% খাঁটি / সুন্নাহ বিশুদ্ধতা সার্টিফাইড পণ্য
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-bold hover:bg-neutral-50 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#2d5016] text-white font-bold hover:bg-[#234011] cursor-pointer"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ADD/EDIT HERO BANNER MODAL */}
      {/* ========================================================= */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-serif-brand text-xl font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              {editingBannerId ? 'ব্যানার স্লাইডার এডিট করুন' : 'নতুন হিরো ব্যানার স্লাইড'}
            </h3>

            <form onSubmit={handleSaveBanner} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">বাংলা টাইটেল *</label>
                <input
                  type="text"
                  required
                  value={bBanglaTitle}
                  onChange={(e) => setBBanglaTitle(e.target.value)}
                  placeholder="উদা: ১০০% খাঁটি প্রাকৃতিক উপাদান"
                  className="w-full p-2.5 rounded-xl border border-neutral-300"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">বাংলা সাবটাইটেল</label>
                <input
                  type="text"
                  value={bBanglaSubtitle}
                  onChange={(e) => setBBanglaSubtitle(e.target.value)}
                  placeholder="উদা: এক ডেলিভারি চার্জে সারা বাংলাদেশে"
                  className="w-full p-2.5 rounded-xl border border-neutral-300"
                />
              </div>

              <div>
                <ImageUploadDropzone
                  value={bImage}
                  onChange={(url) => setBImage(url)}
                  folder="banners"
                  banglaLabel="ব্যানার ছবি আপলোড (Cloudinary Upload)"
                  label="Hero Banner Image"
                  aspectRatio="wide"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">টপ ব্যাজ</label>
                  <input
                    type="text"
                    value={bBadge}
                    onChange={(e) => setBBadge(e.target.value)}
                    placeholder="বিশেষ অফার"
                    className="w-full p-2.5 rounded-xl border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">বাটন টেক্সট</label>
                  <input
                    type="text"
                    value={bCta}
                    onChange={(e) => setBCta(e.target.value)}
                    placeholder="এখনই অর্ডার করুন"
                    className="w-full p-2.5 rounded-xl border border-neutral-300"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-bold hover:bg-neutral-50 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#2d5016] text-white font-bold hover:bg-[#234011] cursor-pointer shadow-sm"
                >
                  {editingBannerId ? 'আপডেট সম্পন্ন করুন' : 'যোগ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ORDER DETAILS & INVOICE MODAL */}
      {/* ========================================================= */}
      {currentSelectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-5 max-h-[92vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-neutral-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif-brand text-xl font-bold text-neutral-900">
                    অর্ডার ইনভয়েস ও বিবরণ
                  </h3>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-neutral-100 font-bold text-neutral-800">
                    #{currentSelectedOrder._id}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    currentSelectedOrder.channel === 'whatsapp' ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-700'
                  }`}>
                    {currentSelectedOrder.channel === 'whatsapp' ? '📱 WhatsApp' : '🌐 Website COD'}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  তারিখ: {new Date(currentSelectedOrder.orderDate || currentSelectedOrder.createdAt || Date.now()).toLocaleDateString('bn-BD', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer transition-colors"
                title="বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Switcher Bar */}
            <div className="bg-[#f9f8f5] p-3.5 rounded-2xl border border-neutral-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#2d5016]" />
                  <span>অর্ডার বর্তমান স্ট্যাটাস:</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    currentSelectedOrder.status === 'delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : currentSelectedOrder.status === 'confirmed'
                      ? 'bg-blue-100 text-blue-800'
                      : currentSelectedOrder.status === 'processing'
                      ? 'bg-purple-100 text-purple-800'
                      : currentSelectedOrder.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {currentSelectedOrder.status.toUpperCase()}
                  </span>
                </span>
                <span className="text-[11px] text-neutral-500">স্ট্যাটাস পরিবর্তনে ক্লিক করুন:</span>
              </div>

              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {[
                  { id: 'pending', label: 'পেন্ডিং', color: 'hover:bg-amber-50 text-amber-700 border-amber-300', active: 'bg-amber-500 text-white font-bold' },
                  { id: 'confirmed', label: 'কনফার্মড', color: 'hover:bg-blue-50 text-blue-700 border-blue-300', active: 'bg-blue-600 text-white font-bold' },
                  { id: 'processing', label: 'প্রসেসিং', color: 'hover:bg-purple-50 text-purple-700 border-purple-300', active: 'bg-purple-600 text-white font-bold' },
                  { id: 'delivered', label: 'ডেলিভারড', color: 'hover:bg-emerald-50 text-emerald-700 border-emerald-300', active: 'bg-emerald-600 text-white font-bold' },
                  { id: 'cancelled', label: 'বাতিল', color: 'hover:bg-red-50 text-red-700 border-red-300', active: 'bg-red-600 text-white font-bold' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => updateOrderStatus(currentSelectedOrder._id, s.id as OrderStatus)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-medium border text-center cursor-pointer transition-all ${
                      currentSelectedOrder.status === s.id
                        ? `${s.active} shadow-xs border-transparent`
                        : `bg-white ${s.color}`
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Details Box */}
            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80 space-y-3">
              <h4 className="font-bold text-xs text-neutral-900 uppercase tracking-wider">
                গ্রাহকের ঠিকানা ও তথ্য
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-neutral-500 block">গ্রাহকের নাম:</span>
                  <span className="font-bold text-neutral-900 text-sm">
                    {currentSelectedOrder.customer.name}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block">ফোন নম্বর ও দ্রুত যোগাযোগ:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <a
                      href={`tel:${currentSelectedOrder.customer.phone}`}
                      className="px-2.5 py-1 bg-white border border-neutral-300 rounded-lg text-neutral-800 font-bold hover:bg-neutral-100 inline-flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#2d5016]" />
                      <span>{currentSelectedOrder.customer.phone}</span>
                    </a>
                    <a
                      href={`https://wa.me/${currentSelectedOrder.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `আসসালামু আলাইকুম ${currentSelectedOrder.customer.name}! Kasab Gallery থেকে যোগাযোগ করছি আপনার অর্ডার #${currentSelectedOrder._id} সংক্রান্ত বিষয়ে।`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold inline-flex items-center gap-1.5"
                      title="গ্রাহককে হোয়াটসঅ্যাপে মেসেজ দিন"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
                <div>
                  <span className="text-neutral-500 block">ডেলিভারি এলাকা:</span>
                  <span className="font-bold text-neutral-900">
                    {currentSelectedOrder.customer.city}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block">সম্পূর্ণ ডেলিভারি ঠিকানা:</span>
                  <span className="font-medium text-neutral-800">
                    {currentSelectedOrder.customer.address}
                  </span>
                </div>
                {currentSelectedOrder.customer.notes && (
                  <div className="sm:col-span-2 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200">
                    <span className="text-[11px] font-bold text-amber-800 block">গ্রাহকের বিশেষ নোট:</span>
                    <p className="text-xs text-amber-900 mt-0.5">{currentSelectedOrder.customer.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Ordered Items Table */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-neutral-900 uppercase tracking-wider">
                অর্ডারকৃত পণ্য তালিকা
              </h4>
              <div className="border border-neutral-200 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#f7f6f2] font-bold text-neutral-700 border-b border-neutral-200">
                    <tr>
                      <th className="py-2.5 px-3">পণ্য</th>
                      <th className="py-2.5 px-3 text-center">পরিমাণ</th>
                      <th className="py-2.5 px-3 text-right">একক মূল্য</th>
                      <th className="py-2.5 px-3 text-right">মোট</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {currentSelectedOrder.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50">
                        <td className="py-2.5 px-3 flex items-center gap-2.5">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded-lg border border-neutral-200 shrink-0"
                            />
                          )}
                          <div>
                            <span className="font-bold text-neutral-900 block">{item.banglaName}</span>
                            <span className="text-[11px] text-neutral-400 block">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-center font-bold text-neutral-800">
                          {item.quantity} টি
                        </td>
                        <td className="py-2.5 px-3 text-right text-neutral-600">
                          {formatBDT(item.price)}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-neutral-900">
                          {formatBDT(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment & Invoice Breakdown */}
            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>পণ্য উপমোট (Subtotal):</span>
                <span>{formatBDT(currentSelectedOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>ডেলিভারি চার্জ ({currentSelectedOrder.customer.city}):</span>
                <span>{formatBDT(currentSelectedOrder.delivery_charge)}</span>
              </div>
              <div className="border-t border-neutral-200 pt-2 flex justify-between text-sm font-black text-[#2d5016]">
                <span>সর্বমোট প্রদেয় (Cash on Delivery):</span>
                <span className="text-base">{formatBDT(currentSelectedOrder.total)}</span>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
              <button
                onClick={() => {
                  setOrderToDelete(currentSelectedOrder);
                }}
                className="px-3.5 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>অর্ডার ডিলিট করুন</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 font-bold text-xs flex items-center gap-1.5 hover:bg-neutral-50 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>প্রিন্ট চালান</span>
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-5 py-2 rounded-xl bg-[#2d5016] text-white font-bold text-xs hover:bg-[#234011] cursor-pointer"
                >
                  সম্পন্ন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PRODUCT DELETION CONFIRMATION MODAL */}
      {/* ========================================================= */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-serif-brand text-lg font-bold text-neutral-900">
                  পণ্য ডিলিট নিশ্চিতকরণ
                </h3>
                <p className="text-xs text-neutral-500">এই অ্যাকশনটি স্থায়ী এবং অপরিবর্তনীয়</p>
              </div>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center gap-3">
              {productToDelete.image && (
                <img
                  src={productToDelete.image}
                  alt={productToDelete.name}
                  className="w-14 h-14 object-cover rounded-xl border border-neutral-200 shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-sm text-neutral-900 truncate">
                  {productToDelete.banglaName}
                </h4>
                <p className="text-xs text-neutral-500 truncate">{productToDelete.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-black text-[#2d5016]">
                    {formatBDT(productToDelete.price)}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-700 font-semibold">
                    {productToDelete.category}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              আপনি কি নিশ্চিত যে <strong className="text-neutral-900 font-bold">"{productToDelete.banglaName}"</strong> পণ্যটি ক্যাটালগ ও ডাটাবেজ থেকে মুছে ফেলতে চান?
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-bold text-xs hover:bg-neutral-50 cursor-pointer transition-colors"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={async () => {
                  const targetId = productToDelete._id || (productToDelete as any).id;
                  await deleteProduct(targetId);
                  setProductToDelete(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>হ্যাঁ, মুছে ফেলুন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* BANNER DELETION CONFIRMATION MODAL */}
      {/* ========================================================= */}
      {bannerToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-serif-brand text-lg font-bold text-neutral-900">
                  ব্যানার ডিলিট নিশ্চিতকরণ
                </h3>
                <p className="text-xs text-neutral-500">হোমপেজ স্লাইডার থেকে ব্যানারটি মুছে যাবে</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-neutral-200">
              <div className="aspect-[16/9] w-full bg-neutral-900">
                <img
                  src={bannerToDelete.image}
                  alt={bannerToDelete.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 bg-neutral-50">
                <h4 className="font-bold text-xs text-neutral-900">{bannerToDelete.banglaTitle}</h4>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setBannerToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-bold text-xs hover:bg-neutral-50 cursor-pointer transition-colors"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={async () => {
                  const targetId = bannerToDelete._id || bannerToDelete.id;
                  await deleteHeroSlide(targetId);
                  setBannerToDelete(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>হ্যাঁ, মুছে ফেলুন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ORDER DELETION CONFIRMATION MODAL */}
      {/* ========================================================= */}
      {orderToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-serif-brand text-lg font-bold text-neutral-900">
                  অর্ডার ডিলিট নিশ্চিতকরণ
                </h3>
                <p className="text-xs text-neutral-500">অর্ডারটি ডাটাবেজ থেকে সম্পূর্ণ মুছে যাবে</p>
              </div>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1.5 text-xs">
              <div className="flex justify-between font-mono font-bold">
                <span>অর্ডার আইডি:</span>
                <span className="text-neutral-900">#{orderToDelete._id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">গ্রাহক:</span>
                <span className="font-bold text-neutral-900">{orderToDelete.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">সর্বমোট:</span>
                <span className="font-black text-[#2d5016]">{formatBDT(orderToDelete.total)}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              আপনি কি নিশ্চিত যে অর্ডার <strong className="text-neutral-900 font-bold">#{orderToDelete._id}</strong> স্থায়ীভাবে ডাটাবেজ থেকে মুছে ফেলতে চান?
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setOrderToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-bold text-xs hover:bg-neutral-50 cursor-pointer transition-colors"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={async () => {
                  await deleteOrder(orderToDelete._id);
                  if (selectedOrder && selectedOrder._id === orderToDelete._id) {
                    setSelectedOrder(null);
                  }
                  setOrderToDelete(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>হ্যাঁ, মুছে ফেলুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ========================================================= */}
      {/* EDIT / CREATE CATEGORY MODAL */}
      {/* ========================================================= */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#2d5016] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#d4af37]" />
                  {editingCategoryId ? 'ক্যাটাগরি আপডেট' : 'নতুন ক্যাটাগরি'}
                </span>
                <h3 className="font-serif-brand text-xl font-bold text-neutral-900">
                  {editingCategoryId ? (cBanglaName ? `ক্যাটাগরি: ${cBanglaName}` : 'ক্যাটাগরি এডিট') : 'নতুন ক্যাটাগরি যোগ করুন'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
              {/* Category ID info if editing */}
              {editingCategoryId && (
                <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200 flex items-center justify-between text-neutral-600">
                  <span className="font-semibold">ক্যাটাগরি আইডি (Slug):</span>
                  <span className="font-mono font-bold text-neutral-900 bg-white px-2 py-0.5 rounded border">
                    {editingCategoryId}
                  </span>
                </div>
              )}

              {/* Names */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">বাংলা নাম *</label>
                  <input
                    type="text"
                    required
                    value={cBanglaName}
                    onChange={(e) => setCBanglaName(e.target.value)}
                    placeholder="উদা: প্রাকৃতিক মধু ও খাদ্য"
                    className="w-full p-2.5 rounded-xl border border-neutral-300 font-medium text-xs focus:border-[#2d5016] focus:ring-1 focus:ring-[#2d5016] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">ইংরেজি নাম *</label>
                  <input
                    type="text"
                    required
                    value={cName}
                    onChange={(e) => setCName(e.target.value)}
                    placeholder="e.g. Pure Food & Honey"
                    className="w-full p-2.5 rounded-xl border border-neutral-300 font-medium text-xs focus:border-[#2d5016] focus:ring-1 focus:ring-[#2d5016] outline-none"
                  />
                </div>
              </div>

              {/* Icon selector */}
              <div>
                <label className="block font-bold text-neutral-700 mb-1">ক্যাটাগরি আইকন</label>
                <select
                  value={cIconName}
                  onChange={(e) => setCIconName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-300 bg-white font-medium text-xs focus:border-[#2d5016] focus:ring-1 focus:ring-[#2d5016] outline-none"
                >
                  <option value="Utensils">Utensils (খাদ্য ও পুষ্টি)</option>
                  <option value="Sparkles">Sparkles (স্কিনকেয়ার ও রূপচর্চা)</option>
                  <option value="Moon">Moon (ইসলামিক ও সুন্নাহ সামগ্রী)</option>
                  <option value="Snowflake">Snowflake (শীতের পোশাক / Winter Collection)</option>
                  <option value="ShoppingBag">ShoppingBag (এক্সেসরিজ ও ব্যাগ)</option>
                  <option value="ShieldCheck">ShieldCheck (১০০% বিশুদ্ধ সার্টিফাইড)</option>
                  <option value="Package">Package (প্যাকেজ সামগ্রী)</option>
                </select>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block font-bold text-neutral-700 mb-1">বাংলা বিবরণ</label>
                <textarea
                  rows={2}
                  value={cBanglaDesc}
                  onChange={(e) => setCBanglaDesc(e.target.value)}
                  placeholder="ক্যাটাগরির সংক্ষিপ্ত বিবরণ লিখুন..."
                  className="w-full p-2.5 rounded-xl border border-neutral-300 font-medium text-xs focus:border-[#2d5016] focus:ring-1 focus:ring-[#2d5016] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">ইংরেজি বিবরণ (ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={cDesc}
                  onChange={(e) => setCDesc(e.target.value)}
                  placeholder="Brief English category description"
                  className="w-full p-2.5 rounded-xl border border-neutral-300 font-medium text-xs focus:border-[#2d5016] focus:ring-1 focus:ring-[#2d5016] outline-none"
                />
              </div>

              {/* Category Cover Image with Live Preview */}
              <div className="space-y-2">
                <label className="block font-bold text-neutral-700">ক্যাটাগরি কভার ছবি</label>
                
                {/* Live circular preview like HomeView */}
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <div className="w-16 h-16 rounded-full p-0.5 bg-white border-2 border-[#2d5016] shadow-xs shrink-0 overflow-hidden">
                    <img
                      src={cImage || 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800'}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-neutral-900 block">হোমপেজ সার্কেল প্রিভিউ</span>
                    <span className="text-[11px] text-neutral-500">হোমপেজের কালেকশন সার্কেলে এই ছবিটি প্রদর্শিত হবে।</span>
                  </div>
                </div>

                <ImageUploadDropzone
                  value={cImage}
                  onChange={(url) => setCImage(url)}
                  folder="categories"
                  banglaLabel="নতুন ক্যাটাগরি ছবি আপলোড (Cloudinary Upload)"
                  label="ছবি ড্রপ করুন বা ব্রাউজ করুন"
                  aspectRatio="square"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-bold hover:bg-neutral-50 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#2d5016] text-white font-bold hover:bg-[#234011] cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingCategoryId ? 'ক্যাটাগরি আপডেট সংরক্ষণ করুন' : 'নতুন ক্যাটাগরি তৈরি করুন'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CATEGORY DELETION CONFIRMATION MODAL */}
      {/* ========================================================= */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-serif-brand text-lg font-bold text-neutral-900">
                  ক্যাটাগরি মুছে ফেলা নিশ্চিত করুন
                </h3>
                <p className="text-xs text-neutral-500">ডাটাবেজ থেকে ক্যাটাগরিটি সম্পূর্ণ ডিলিট করা হবে</p>
              </div>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center gap-3 text-xs">
              <img
                src={categoryToDelete.image}
                alt={categoryToDelete.name}
                className="w-12 h-12 rounded-xl object-cover border border-neutral-200"
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-neutral-900 text-sm truncate">
                  {categoryToDelete.banglaName}
                </div>
                <div className="text-neutral-500 text-[11px] truncate">
                  {categoryToDelete.name} ({categoryToDelete._id})
                </div>
                <div className="text-[#2d5016] font-bold text-[11px] mt-0.5">
                  বর্তমান পণ্য: {products.filter((p) => p.category === categoryToDelete._id).length} টি
                </div>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              আপনি কি নিশ্চিত যে ক্যাটাগরি <strong className="text-neutral-900 font-bold">{categoryToDelete.banglaName}</strong> ডিলিট করতে চান?
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setCategoryToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-bold text-xs hover:bg-neutral-50 cursor-pointer transition-colors"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={async () => {
                  await deleteCategory(categoryToDelete._id);
                  setCategoryToDelete(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>হ্যাঁ, ক্যাটাগরি ডিলিট করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
