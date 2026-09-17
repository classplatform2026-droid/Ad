import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_CONFIG } from '../data/mockData';
import { formatBDT } from '../utils/formatters';
import { ProductCard } from './ProductCard';
import { 
  ShoppingBag, 
  MessageCircle, 
  Phone, 
  Star, 
  ShieldCheck, 
  Truck, 
  ArrowLeft, 
  Share2, 
  Check, 
  Sparkles,
  RefreshCw,
  Zap
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    products,
    addToCart,
    setCurrentPage,
    setSelectedCategoryId,
    language,
    generateWhatsAppOrderUrl,
    showToast,
  } = useShop();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [detailTab, setDetailTab] = useState<'bangla' | 'english'>('bangla');

  if (!selectedProduct) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <p className="text-neutral-500 mb-4">
          {language === 'bn' ? 'কোনো পণ্য নির্বাচিত হয়নি' : 'No product selected'}
        </p>
        <button
          onClick={() => setCurrentPage('catalog')}
          className="px-5 py-2.5 rounded-full bg-[#2d5016] text-white text-xs font-bold"
        >
          {language === 'bn' ? 'ক্যাটালগ দেখুন' : 'Back to Catalog'}
        </button>
      </div>
    );
  }

  const galleryImages = selectedProduct.images?.length > 0
    ? selectedProduct.images
    : [selectedProduct.image];

  const currentImage = galleryImages[selectedImageIndex] || selectedProduct.image;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
  };

  const handleInstantBuy = () => {
    addToCart(selectedProduct, quantity);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppOrder = () => {
    const url = generateWhatsAppOrderUrl([], undefined, selectedProduct);
    window.open(url, '_blank');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(
        language === 'bn' ? 'প্রোডাক্টের লিংক কপি হয়েছে' : 'Product link copied'
      );
    }
  };

  // Related products from same category
  const relatedProducts = products
    .filter(
      (p) => p.category === selectedProduct.category && p._id !== selectedProduct._id
    )
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      {/* Top Breadcrumb & Back */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setCurrentPage('catalog')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-[#2d5016] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'bn' ? 'ক্যাটালগে ফিরে যান' : 'Back to Products'}</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 text-xs text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5 text-neutral-500" />
          <span>{language === 'bn' ? 'শেয়ার করুন' : 'Share'}</span>
        </button>
      </div>

      {/* Main Product Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#f5f4ef] border border-neutral-200">
            <img
              src={currentImage}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
            {selectedProduct.sunnah_certified && (
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2d5016] text-white text-xs font-bold shadow-md">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>{language === 'bn' ? '১০০% খাঁটি ও নির্ভেজাল' : '100% Pure Certified'}</span>
              </div>
            )}
            {selectedProduct.badge && (
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#d4af37] text-neutral-900 text-xs font-bold shadow-md">
                {selectedProduct.badge}
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-[#2d5016] ring-2 ring-[#2d5016]/20'
                      : 'border-neutral-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Information & Actions */}
        <div className="lg:col-span-6 space-y-6">
          {/* Title & Ratings */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="inline-flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                <Star className="w-4 h-4 fill-current" />
                <span>{selectedProduct.rating} / 5.0</span>
              </div>
              <span className="text-xs text-neutral-500">
                {BRAND_CONFIG.ratingText} ({selectedProduct.reviews_count} {language === 'bn' ? 'রিভিউ' : 'reviews'})
              </span>
            </div>

            <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight">
              {language === 'bn' ? selectedProduct.banglaName : selectedProduct.name}
            </h1>
            <p className="text-sm font-medium text-neutral-500 mt-1">
              {language === 'bn' ? selectedProduct.name : selectedProduct.banglaName}
            </p>
          </div>

          {/* Price & Savings */}
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-[#faf9f5] border border-[#ebe8dc]">
            <div>
              <span className="text-xs text-neutral-500 block mb-0.5">
                {language === 'bn' ? 'বিক্রয় মূল্য' : 'Special Price'}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#2d5016]">
                {formatBDT(selectedProduct.price)}
              </span>
            </div>
            {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
              <div>
                <span className="text-xs text-neutral-400 block mb-0.5">
                  {language === 'bn' ? 'পূর্বের মূল্য' : 'Regular'}
                </span>
                <span className="text-sm sm:text-base text-neutral-400 line-through">
                  {formatBDT(selectedProduct.originalPrice)}
                </span>
              </div>
            )}
            {selectedProduct.originalPrice && (
              <span className="ml-auto px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                {language === 'bn' ? `৳${selectedProduct.originalPrice - selectedProduct.price} সাশ্রয়` : `Save ৳${selectedProduct.originalPrice - selectedProduct.price}`}
              </span>
            )}
          </div>

          {/* Short description / সংক্ষিপ্ত বিবরণ */}
          <div className="text-sm text-neutral-700 leading-relaxed bg-[#faf9f5] p-3.5 rounded-2xl border border-neutral-200">
            <span className="block text-[11px] font-bold text-[#2d5016] uppercase tracking-wider mb-1">
              {language === 'bn' ? 'সংক্ষিপ্ত বিবরণ' : 'Quick Summary'}
            </span>
            <p className="text-neutral-800">
              {selectedProduct.shortDescription || (language === 'bn' ? selectedProduct.banglaDescription : selectedProduct.description)}
            </p>
          </div>

          {/* Single Delivery Charge Reminder Box */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
            <Truck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900">
              <span className="font-bold block">
                {language === 'bn' ? 'সিঙ্গেল ডেলিভারি চার্জের সুযোগ:' : 'Single Delivery Guarantee:'}
              </span>
              <span>
                {language === 'bn'
                  ? 'এই অর্ডারে অন্যান্য পণ্য যুক্ত করলেও ডেলিভারি চার্জ বাড়বে না (ঢাকা ৳৭০, বাইরে ৳১২০)।'
                  : 'Add more items from any category and pay only a single delivery fee.'}
              </span>
            </div>
          </div>

          {/* Quantity selector & Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-neutral-700">
                {language === 'bn' ? 'পরিমাণ:' : 'Quantity:'}
              </span>
              <div className="flex items-center border border-neutral-300 rounded-xl bg-white overflow-hidden shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-2 text-neutral-600 hover:bg-neutral-100 font-bold text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-2 text-xs sm:text-sm font-bold text-neutral-900 min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-2 text-neutral-600 hover:bg-neutral-100 font-bold text-sm cursor-pointer"
                >
                  +
                </button>
              </div>

              <span className="text-xs text-neutral-500 font-medium ml-auto">
                {language === 'bn' ? 'মোট:' : 'Subtotal:'}{' '}
                <strong className="text-neutral-900 font-bold">{formatBDT(selectedProduct.price * quantity)}</strong>
              </span>
            </div>

            {/* Main Action Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Add to Cart */}
              <button
                type="button"
                id="detail-add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!selectedProduct.available}
                className="py-3.5 px-4 rounded-xl bg-[#2d5016] hover:bg-[#234011] disabled:bg-neutral-300 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{language === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart'}</span>
              </button>

              {/* Order via WhatsApp */}
              <button
                type="button"
                id="detail-whatsapp-order-btn"
                onClick={handleWhatsAppOrder}
                className="py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে অর্ডার' : 'Order via WhatsApp'}</span>
              </button>
            </div>

            {/* Direct Call to Order Button */}
            <a
              href={`tel:${BRAND_CONFIG.phone}`}
              id="detail-call-order-btn"
              className="w-full py-3 px-4 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#2d5016]" />
              <span>
                {language === 'bn' ? `সরাসরি ফোন করে অর্ডার করুন (${BRAND_CONFIG.displayPhone})` : `Call to Order (${BRAND_CONFIG.displayPhone})`}
              </span>
            </a>
          </div>

          {/* Detailed Discussion & English Details (Health benefits removed as requested) */}
          <div className="pt-4 border-t border-neutral-200 space-y-3">
            <div className="flex items-center gap-4 border-b border-neutral-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setDetailTab('bangla')}
                className={`pb-2.5 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
                  detailTab === 'bangla'
                    ? 'border-[#2d5016] text-[#2d5016]'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'বিস্তারিত আলোচনা' : 'Detailed Discussion'}</span>
              </button>
              <button
                type="button"
                onClick={() => setDetailTab('english')}
                className={`pb-2.5 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
                  detailTab === 'english'
                    ? 'border-[#2d5016] text-[#2d5016]'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                <span>English Details</span>
              </button>
            </div>

            <div className="text-xs sm:text-sm text-neutral-700 leading-relaxed bg-[#fbfaf6] p-4 rounded-2xl border border-[#ebe7db] space-y-2 whitespace-pre-line">
              {detailTab === 'bangla' ? (
                <p>
                  {selectedProduct.longDescription || selectedProduct.banglaDescription || selectedProduct.description}
                </p>
              ) : (
                <p>
                  {selectedProduct.description || selectedProduct.longDescription || selectedProduct.banglaDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-brand text-xl sm:text-2xl font-bold text-neutral-900">
              {language === 'bn' ? 'একই ক্যাটাগরির আরও পণ্য' : 'Related Products in this Category'}
            </h3>
            <button
              onClick={() => {
                setSelectedCategoryId(selectedProduct.category);
                setCurrentPage('catalog');
              }}
              className="text-xs font-bold text-[#2d5016] hover:underline"
            >
              {language === 'bn' ? 'সবগুলো দেখুন' : 'View All'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
