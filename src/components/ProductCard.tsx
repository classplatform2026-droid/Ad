import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { formatBDT } from '../utils/formatters';
import { ShoppingBag, Eye, Star, ShieldCheck, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    setSelectedProduct,
    setCurrentPage,
    setQuickViewProduct,
    language,
    generateWhatsAppOrderUrl,
  } = useShop();

  const handleProductClick = () => {
    setSelectedProduct(product);
    setCurrentPage('product_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleDirectWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = generateWhatsAppOrderUrl([], undefined, product);
    window.open(url, '_blank');
  };

  return (
    <div
      id={`product-card-${product._id}`}
      onClick={handleProductClick}
      className="group relative bg-white rounded-2xl border border-[#e8e6df] hover:border-[#2d5016]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer active:scale-[0.98]"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full bg-[#f4f2ea] overflow-hidden">
        <img
          src={product.image}
          alt={language === 'bn' ? product.banglaName : product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 z-10">
          {product.sunnah_certified && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2d5016]/95 backdrop-blur-xs text-white text-[9px] sm:text-xs font-bold shadow-sm">
              <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#d4af37]" />
              <span>{language === 'bn' ? '১০০% খাঁটি' : '100% Pure'}</span>
            </span>
          )}
          {product.badge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#d4af37] text-neutral-900 text-[9px] sm:text-xs font-black shadow-sm">
              {product.badge}
            </span>
          )}
        </div>

        {/* Quick View Floating Button (Desktop) */}
        <button
          type="button"
          onClick={handleQuickView}
          id={`quick-view-btn-${product._id}`}
          className="hidden sm:flex absolute right-2.5 top-2.5 p-2 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-[#2d5016] shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          title={language === 'bn' ? 'কুইক ভিউ' : 'Quick View'}
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Stock status overlay if unavailable */}
        {!product.available && (
          <div className="absolute inset-0 bg-black/65 backdrop-blur-xs flex items-center justify-center">
            <span className="px-2.5 py-1 rounded-md bg-neutral-900 text-white text-[11px] sm:text-xs font-bold">
              {language === 'bn' ? 'স্টক শেষ' : 'Out of Stock'}
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-neutral-500 mb-1">
            <div className="flex items-center text-amber-500">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
            </div>
            <span className="font-bold text-neutral-800 text-[10px] sm:text-xs">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[9px] sm:text-[11px] text-neutral-400">
              ({product.reviews_count})
            </span>
          </div>

          {/* Titles */}
          <h3 className="font-semibold text-neutral-900 text-xs sm:text-base line-clamp-2 leading-snug group-hover:text-[#2d5016] transition-colors">
            {language === 'bn' ? product.banglaName : product.name}
          </h3>
          <p className="text-[10px] sm:text-[11px] text-neutral-400 font-medium line-clamp-1 mt-0.5">
            {language === 'bn' ? product.name : product.banglaName}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-2.5 pt-2 border-t border-neutral-100">
          <div className="flex items-baseline justify-between gap-1 mb-2">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-sm sm:text-lg font-black text-[#2d5016]">
                {formatBDT(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[10px] sm:text-xs text-neutral-400 line-through">
                  {formatBDT(product.originalPrice)}
                </span>
              )}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                -৳{product.originalPrice - product.price}
              </span>
            )}
          </div>

          {/* Action Row - Enhanced touch targets for mobile thumbs */}
          <div className="grid grid-cols-5 gap-1.5">
            <button
              type="button"
              id={`add-cart-btn-${product._id}`}
              onClick={handleAddToCart}
              disabled={!product.available}
              className="col-span-4 min-h-[38px] sm:min-h-[42px] flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-[#2d5016] hover:bg-[#234011] disabled:bg-neutral-300 text-white text-[11px] sm:text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span>{language === 'bn' ? 'কার্টে যোগ' : 'Add to Cart'}</span>
            </button>

            <button
              type="button"
              id={`card-whatsapp-btn-${product._id}`}
              onClick={handleDirectWhatsApp}
              title={language === 'bn' ? 'হোয়াটসঅ্যাপে অর্ডার' : 'Order via WhatsApp'}
              className="col-span-1 min-h-[38px] sm:min-h-[42px] flex items-center justify-center p-2 rounded-xl bg-emerald-50 hover:bg-[#25D366] hover:text-white text-[#25D366] border border-emerald-200 transition-all cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
