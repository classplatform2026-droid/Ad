import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatBDT } from '../utils/formatters';
import { BRAND_CONFIG } from '../data/mockData';
import { OrderCustomer, Order } from '../types';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Truck, 
  MessageCircle, 
  ShoppingBag, 
  ArrowLeft, 
  Phone, 
  ShieldCheck, 
  MapPin, 
  User, 
  Mail, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    createOrder,
    setCurrentPage,
    language,
    generateWhatsAppOrderUrl,
  } = useShop();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState<'Dhaka' | 'Outside Dhaka'>('Dhaka');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const deliveryCharge =
    city === 'Outside Dhaka'
      ? BRAND_CONFIG.fixedDeliveryOutside
      : BRAND_CONFIG.fixedDeliveryDhaka;
  const grandTotal = cartSubtotal + deliveryCharge;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = language === 'bn' ? 'আপনার নাম লিখুন' : 'Name is required';
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone =
        language === 'bn'
          ? 'সঠিক মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)'
          : 'Valid phone number is required';
    }
    if (!address.trim()) {
      newErrors.address =
        language === 'bn'
          ? 'ডেলিভারির সম্পূর্ণ ঠিকানা লিখুন'
          : 'Full delivery address is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2d5016', '#d4af37', '#10b981', '#1a1a1a'],
      });
    } catch (e) {
      // ignore
    }
  };

  const handleCodOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const customer: OrderCustomer = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      address: address.trim(),
      city,
      notes: notes.trim() || undefined,
    };

    const order = createOrder(customer, 'website_cod');
    setCompletedOrder(order);
    triggerConfetti();
  };

  const handleWhatsAppOrder = () => {
    if (!validateForm()) return;

    const customer: OrderCustomer = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      address: address.trim(),
      city,
      notes: notes.trim() || undefined,
    };

    const order = createOrder(customer, 'whatsapp');
    setCompletedOrder(order);
    triggerConfetti();

    // Redirect to WhatsApp with prefilled message
    const url = generateWhatsAppOrderUrl(cart, customer);
    window.open(url, '_blank');
  };

  // If order was successfully placed, show Confirmation / Invoice Receipt
  if (completedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg animate-in zoom-in-50 duration-300">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-[#d4af37]/20 text-[#2d5016] text-xs font-bold uppercase tracking-wider">
            {language === 'bn' ? 'অর্ডার সফল হয়েছে' : 'Order Confirmed'}
          </span>
          <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold text-neutral-900">
            {language === 'bn' ? 'ধন্যবাদ! আপনার অর্ডার সফলভাবে গৃহীত হয়েছে।' : 'Thank You! Your Order has been Placed.'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
            {language === 'bn'
              ? 'আমাদের Kasab Gallery টিম দ্রুত আপনার সাথে ফোনে অথবা হোয়াটসঅ্যাপে যোগাযোগ করে ডেলিভারি নিশ্চিত করবে।'
              : 'Our Kasab Gallery support team will contact you via phone/WhatsApp to confirm dispatch.'}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm text-left space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div>
              <span className="text-xs text-neutral-400 block">অর্ডার আইডি (Order ID):</span>
              <span className="text-base font-bold text-neutral-900">{completedOrder._id}</span>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 uppercase">
              {completedOrder.status}
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
              {language === 'bn' ? 'অর্ডারকৃত পণ্যসমূহ' : 'Ordered Items'}:
            </h4>
            <div className="divide-y divide-neutral-100 text-xs">
              {completedOrder.items.map((i, idx) => (
                <div key={idx} className="py-2 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-neutral-100 flex items-center justify-center font-bold text-neutral-600 text-[10px]">
                      {i.quantity}x
                    </span>
                    <span className="font-medium text-neutral-800">{i.banglaName}</span>
                  </div>
                  <span className="font-bold text-neutral-900">{formatBDT(i.price * i.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-neutral-100 pt-3 space-y-1.5 text-xs text-neutral-600">
            <div className="flex justify-between">
              <span>{language === 'bn' ? 'সিঙ্গেল ডেলিভারি চার্জ' : 'Delivery Charge'}:</span>
              <span className="font-bold text-neutral-900">{formatBDT(completedOrder.delivery_charge)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-neutral-900 pt-1 border-t border-dashed border-neutral-200">
              <span>{language === 'bn' ? 'সর্বমোট' : 'Grand Total'}:</span>
              <span className="text-base font-black text-[#2d5016]">{formatBDT(completedOrder.total)}</span>
            </div>
          </div>

          <div className="bg-[#fcfaf5] p-3 rounded-xl border border-[#ebe7db] text-xs text-neutral-600 space-y-1">
            <p><strong>ডেলিভারি ঠিকানা:</strong> {completedOrder.customer.address}, {completedOrder.customer.city}</p>
            <p><strong>গ্রাহক:</strong> {completedOrder.customer.name} ({completedOrder.customer.phone})</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={BRAND_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে স্ট্যাটাস জানুন' : 'Check WhatsApp Status'}</span>
          </a>

          <button
            onClick={() => {
              setCompletedOrder(null);
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-full bg-[#1a1a1a] hover:bg-[#2d5016] text-white text-xs sm:text-sm font-bold cursor-pointer"
          >
            {language === 'bn' ? 'হোমে ফিরে যান' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  // If cart is empty and no order
  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-4">
        <p className="text-neutral-500">
          {language === 'bn' ? 'চেকআউট করার মতো কোনো পণ্য কার্টে নেই।' : 'No items in cart to checkout.'}
        </p>
        <button
          onClick={() => setCurrentPage('catalog')}
          className="px-6 py-2.5 rounded-full bg-[#2d5016] text-white text-xs font-bold"
        >
          {language === 'bn' ? 'কেনাকাটা করুন' : 'Explore Products'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Header & Back to Cart */}
      <div>
        <button
          onClick={() => setCurrentPage('cart')}
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-[#2d5016] font-medium mb-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'কার্টে ফিরে যান' : 'Back to Cart'}</span>
        </button>
        <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold text-neutral-900">
          {language === 'bn' ? 'চেকআউট ও ডেলিভারি তথ্য' : 'Checkout & Delivery Info'}
        </h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          {language === 'bn'
            ? 'ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে মূল্য পরিশোধ) অথবা হোয়াটসঅ্যাপে নিশ্চিত করুন'
            : 'Cash on delivery or confirm via WhatsApp'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Customer Form (Single Column Mobile Optimized) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200 shadow-xs space-y-5">
          <h2 className="font-serif-brand text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
            {language === 'bn' ? '১. আপনার তথ্য' : '1. Customer Details'}
          </h2>

          <form onSubmit={handleCodOrder} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {language === 'bn' ? 'আপনার নাম *' : 'Full Name *'}
              </label>
              <div className="relative">
                <input
                  id="checkout-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'bn' ? 'উদা: মো: তানভীর হাসান' : 'e.g. Mohammad Tanvir'}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:border-[#2d5016] ${
                    errors.name ? 'border-red-400 bg-red-50/20' : 'border-neutral-300'
                  }`}
                />
                <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              </div>
              {errors.name && (
                <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Mobile Phone Number */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {language === 'bn' ? 'মোবাইল নম্বর (সচল নম্বর) *' : 'Phone Number *'}
              </label>
              <div className="relative">
                <input
                  id="checkout-phone-input"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:border-[#2d5016] ${
                    errors.phone ? 'border-red-400 bg-red-50/20' : 'border-neutral-300'
                  }`}
                />
                <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              </div>
              {errors.phone && (
                <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Delivery Zone / City */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                {language === 'bn' ? 'ডেলিভারি এরিয়া / জোন *' : 'Delivery Area *'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCity('Dhaka')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    city === 'Dhaka'
                      ? 'border-[#2d5016] bg-[#2d5016]/5 ring-1 ring-[#2d5016]'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-neutral-900">
                      {language === 'bn' ? 'ঢাকা সিটি' : 'Inside Dhaka'}
                    </span>
                    <span className="text-xs font-black text-[#2d5016]">৳৭০</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 block mt-0.5">
                    {language === 'bn' ? '২৪-৪৮ ঘণ্টার মধ্যে হোম ডেলিভারি' : '24-48 Hours Delivery'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setCity('Outside Dhaka')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    city === 'Outside Dhaka'
                      ? 'border-[#2d5016] bg-[#2d5016]/5 ring-1 ring-[#2d5016]'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-neutral-900">
                      {language === 'bn' ? 'ঢাকার বাইরে' : 'Outside Dhaka'}
                    </span>
                    <span className="text-xs font-black text-[#2d5016]">৳১২০</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 block mt-0.5">
                    {language === 'bn' ? 'সারা বাংলাদেশে কুরিয়ার' : 'Courier all BD'}
                  </span>
                </button>
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {language === 'bn' ? 'সম্পূর্ণ ডেলিভারি ঠিকানা *' : 'Delivery Address *'}
              </label>
              <div className="relative">
                <textarea
                  id="checkout-address-input"
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={
                    language === 'bn'
                      ? 'বাড়ি নং, রোড নং, এলাকা/থানা, জেলা...'
                      : 'House, Road, Area, District...'
                  }
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:border-[#2d5016] ${
                    errors.address ? 'border-red-400 bg-red-50/20' : 'border-neutral-300'
                  }`}
                />
                <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              </div>
              {errors.address && (
                <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>
              )}
            </div>

            {/* Optional Email */}
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">
                {language === 'bn' ? 'ইমেইল (ঐচ্ছিক)' : 'Email (Optional)'}
              </label>
              <div className="relative">
                <input
                  id="checkout-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#2d5016]"
                />
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Notes / Special instruction */}
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">
                {language === 'bn' ? 'বিশেষ কোনো নির্দেশনা (ঐচ্ছিক)' : 'Special Delivery Note (Optional)'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={language === 'bn' ? 'উদা: জোহরের পর ডেলিভারি দেবেন...' : 'e.g. Deliver after 4pm...'}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#2d5016]"
                />
                <FileText className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Two Action Buttons: WhatsApp and COD */}
            <div className="pt-4 space-y-3">
              <button
                type="submit"
                id="submit-cod-order-btn"
                className="w-full py-4 px-4 rounded-xl bg-[#2d5016] hover:bg-[#234011] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>
                  {language === 'bn' ? 'ক্যাশ অন ডেলিভারিতে অর্ডার কনফার্ম করুন' : 'Confirm Order (Cash on Delivery)'}
                </span>
              </button>

              <button
                type="button"
                id="submit-whatsapp-order-btn"
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  {language === 'bn' ? 'হোয়াটসঅ্যাপের মাধ্যমে অর্ডার কনফার্ম করুন' : 'Confirm Order via WhatsApp'}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary Preview */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-5">
          <h2 className="font-serif-brand text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
            {language === 'bn' ? '২. অর্ডার সারাংশ' : '2. Order Summary'}
          </h2>

          <div className="divide-y divide-neutral-100 max-h-72 overflow-y-auto pr-1">
            {cart.map(({ product, quantity }) => (
              <div key={product._id} className="py-2.5 flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover border border-neutral-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-neutral-900 truncate">
                    {language === 'bn' ? product.banglaName : product.name}
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    {formatBDT(product.price)} x {quantity}টি
                  </p>
                </div>
                <span className="text-xs font-bold text-neutral-900">
                  {formatBDT(product.price * quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="pt-3 border-t border-neutral-200 space-y-2 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>{language === 'bn' ? 'পণ্যের মোট মূল্য' : 'Subtotal'}:</span>
              <span className="font-bold text-neutral-900">{formatBDT(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between items-center text-neutral-600">
              <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                <Truck className="w-3.5 h-3.5" />
                {language === 'bn' ? 'সিঙ্গেল ডেলিভারি চার্জ' : 'Single Delivery Charge'}:
              </span>
              <span className="font-bold text-neutral-900">{formatBDT(deliveryCharge)}</span>
            </div>
            <div className="pt-2 border-t border-neutral-200 flex justify-between items-baseline text-sm font-bold">
              <span className="text-neutral-900">{language === 'bn' ? 'সর্বমোট প্রদেয়' : 'Total Amount'}:</span>
              <span className="text-xl font-black text-[#2d5016]">{formatBDT(grandTotal)}</span>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="p-3.5 rounded-2xl bg-[#faf9f5] border border-[#ebe8dd] space-y-2 text-xs text-neutral-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'bn' ? '১০০% খাঁটি ও নির্ভেজাল পণ্যের গ্যারান্টি' : '100% Pure & Authentic guarantee'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#d4af37]" />
              <span>{language === 'bn' ? '২৪-৭২ ঘণ্টায় সারা বাংলাদেশে ডেলিভারি' : 'Delivery in 24-72 hours across BD'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
