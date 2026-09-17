import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatBDT } from '../utils/formatters';
import { X, ShoppingBag, MessageCircle, Star, ShieldCheck, ArrowRight } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    setSelectedProduct,
    setCurrentPage,
    language,
    generateWhatsAppOrderUrl,
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!quickViewProduct) return null;

  const allImages = quickViewProduct.images && quickViewProduct.images.length > 0
    ? quickViewProduct.images
    : [quickViewProduct.image];

  const currentDisplayImg = allImages[activeImgIndex] || quickViewProduct.image;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
  };

  const handleViewFullDetails = () => {
    setSelectedProduct(quickViewProduct);
    setQuickViewProduct(null);
    setCurrentPage('product_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const url = generateWhatsAppOrderUrl([], undefined, quickViewProduct);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl border border-neutral-200">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute right-4 top-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 cursor-pointer transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Product Image and Multi-image thumbnails */}
          <div className="space-y-2.5">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
              <img
                src={currentDisplayImg}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {quickViewProduct.sunnah_certified && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#2d5016] text-white text-[11px] font-bold flex items-center gap-1 shadow">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{language === 'bn' ? '১০০% খাঁটি ও নির্ভেজাল' : '100% Pure Certified'}</span>
                </div>
              )}
            </div>

            {/* Thumbnails row if multiple images */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      activeImgIndex === idx
                        ? 'border-[#2d5016] ring-2 ring-[#2d5016]/20'
                        : 'border-neutral-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mb-1">
                <Star className="w-4 h-4 fill-current" />
                <span>{quickViewProduct.rating}</span>
                <span className="text-neutral-400 font-normal">
                  ({quickViewProduct.reviews_count} রিভিউ)
                </span>
              </div>

              <h2 className="font-serif-brand text-xl font-bold text-neutral-900 leading-snug">
                {language === 'bn' ? quickViewProduct.banglaName : quickViewProduct.name}
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                {language === 'bn' ? quickViewProduct.name : quickViewProduct.banglaName}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#2d5016]">
                {formatBDT(quickViewProduct.price)}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-neutral-400 line-through">
                  {formatBDT(quickViewProduct.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
              {language === 'bn' ? quickViewProduct.banglaDescription : quickViewProduct.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-neutral-700">পরিমাণ:</span>
              <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1 text-neutral-600 hover:bg-neutral-100 font-bold text-xs"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold text-neutral-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2.5 py-1 text-neutral-600 hover:bg-neutral-100 font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-2.5 px-4 rounded-xl bg-[#2d5016] hover:bg-[#234011] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{language === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart'}</span>
              </button>

              <button
                onClick={handleWhatsApp}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে অর্ডার' : 'Order via WhatsApp'}</span>
              </button>

              <button
                onClick={handleViewFullDetails}
                className="w-full py-2 text-center text-xs font-semibold text-neutral-500 hover:text-neutral-900 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>{language === 'bn' ? 'সম্পূর্ণ বিবরণ দেখুন' : 'View Full Details'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
