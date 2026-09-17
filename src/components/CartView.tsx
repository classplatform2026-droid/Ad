import React from 'react';
import { useShop } from '../context/ShopContext';
import { formatBDT } from '../utils/formatters';
import { BRAND_CONFIG } from '../data/mockData';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  Truck, 
  ShieldCheck, 
  MessageCircle,
  Sparkles
} from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    deliveryCharge,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
    setCurrentPage,
    language,
    generateWhatsAppOrderUrl,
  } = useShop();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-[#2d5016]/10 text-[#2d5016] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif-brand text-2xl font-bold text-neutral-900">
            {language === 'bn' ? 'আপনার শপিং কার্ট খালি' : 'Your Shopping Cart is Empty'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto">
            {language === 'bn'
              ? 'খাঁটি সুন্দরবনের মধু, পুষ্টিকর আজওয়া খেজুর অথবা প্রাকৃতিক উপাদান যোগ করে সিঙ্গেল ডেলিভারি সুবিধা গ্রহণ করুন।'
              : 'Explore our natural pure products and enjoy a single delivery charge across all items.'}
          </p>
        </div>
        <button
          onClick={() => setCurrentPage('catalog')}
          className="px-6 py-3 rounded-full bg-[#2d5016] hover:bg-[#234011] text-white text-sm font-bold shadow-md cursor-pointer transition-transform active:scale-95"
        >
          {language === 'bn' ? 'পণ্যসমূহ দেখতে যান' : 'Start Shopping Now'}
        </button>
      </div>
    );
  }

  const handleWhatsAppInstantOrder = () => {
    const url = generateWhatsAppOrderUrl(cart);
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Back */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
            <button
              onClick={() => setCurrentPage('catalog')}
              className="hover:text-[#2d5016] font-medium flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'কেনাকাটা চালিয়ে যান' : 'Continue Shopping'}</span>
            </button>
          </div>
          <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold text-neutral-900">
            {language === 'bn' ? 'শপিং কার্ট' : 'Shopping Cart'} ({cartCount} {language === 'bn' ? 'টি আইটেম' : 'items'})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-neutral-400 hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'সব মুছুন' : 'Clear Cart'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          {/* Single Delivery Reminder Callout */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
            <Truck className="w-5 h-5 text-emerald-700 shrink-0" />
            <div className="text-xs text-emerald-900">
              <span className="font-bold">
                {language === 'bn' ? 'সিঙ্গেল ডেলিভারি চার্জ সক্রিয়:' : 'Single Delivery Active:'}
              </span>{' '}
              {language === 'bn'
                ? 'আপনার সকল আইটেম একটি মাত্র পার্সেল হিসেবে এক ডেলিভারি চার্জে পৌঁছাবে।'
                : 'All cart items will be delivered under a single fixed delivery charge.'}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 divide-y divide-neutral-100 overflow-hidden shadow-xs">
            {cart.map(({ product, quantity }) => (
              <div key={product._id} className="p-4 sm:p-5 flex gap-4 items-center">
                {/* Product Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#f4f2ea] shrink-0 border border-neutral-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 line-clamp-1">
                    {language === 'bn' ? product.banglaName : product.name}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-1">
                    {language === 'bn' ? product.name : product.banglaName}
                  </p>
                  <div className="text-xs sm:text-sm font-extrabold text-[#2d5016] mt-1">
                    {formatBDT(product.price)}
                  </div>

                  {/* Quantity Controls & Remove */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-neutral-300 rounded-lg bg-white overflow-hidden shadow-xs">
                      <button
                        onClick={() => updateQuantity(product._id, quantity - 1)}
                        className="px-2.5 py-1 text-neutral-600 hover:bg-neutral-100 font-bold text-xs cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-neutral-900 min-w-[28px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product._id, quantity + 1)}
                        className="px-2.5 py-1 text-neutral-600 hover:bg-neutral-100 font-bold text-xs cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-neutral-800">
                        {formatBDT(product.price * quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-6">
          <h2 className="font-serif-brand text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
            {language === 'bn' ? 'অর্ডার সারাংশ' : 'Order Summary'}
          </h2>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>{language === 'bn' ? 'পণ্যের মোট মূল্য' : 'Subtotal'}</span>
              <span className="font-bold text-neutral-900">{formatBDT(cartSubtotal)}</span>
            </div>

            <div className="flex justify-between items-center text-neutral-600">
              <div className="flex items-center gap-1.5">
                <span>{language === 'bn' ? 'সিঙ্গেল ডেলিভারি চার্জ' : 'Single Delivery Fee'}</span>
                <span className="text-[10px] font-bold bg-[#d4af37]/20 text-[#2d5016] px-1.5 py-0.5 rounded">
                  {language === 'bn' ? 'ফিক্সড' : 'Fixed'}
                </span>
              </div>
              <span className="font-bold text-neutral-900">{formatBDT(deliveryCharge)}</span>
            </div>

            <p className="text-[11px] text-neutral-400 italic">
              * {language === 'bn' ? 'ঢাকার ভেতরে ৳৭০, ঢাকার বাইরে ৳১২০' : 'Dhaka ৳70, Outside Dhaka ৳120'}
            </p>

            <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
              <span className="text-base font-bold text-neutral-900">
                {language === 'bn' ? 'সর্বমোট প্রদেয়' : 'Total Amount'}
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#2d5016]">
                {formatBDT(cartTotal)}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            <button
              id="proceed-checkout-btn"
              onClick={() => {
                setCurrentPage('checkout');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-[#2d5016] hover:bg-[#234011] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>{language === 'bn' ? 'অর্ডার সম্পন্ন করতে এগিয়ে যান' : 'Proceed to Checkout'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="cart-whatsapp-order-btn"
              onClick={handleWhatsAppInstantOrder}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{language === 'bn' ? 'কার্ট হোয়াটসঅ্যাপে কনফার্ম করুন' : 'Confirm Cart via WhatsApp'}</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{language === 'bn' ? 'ক্যাশ অন ডেলিভারি (পণ্য দেখে মূল্য পরিশোধ)' : 'Cash on Delivery available'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>{language === 'bn' ? '১০০% আসল ও নির্ভেজাল পণ্যের নিশ্চয়তা' : '100% Genuine pure & natural products'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
