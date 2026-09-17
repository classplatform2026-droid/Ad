import React, { useState } from 'react';
import { BRAND_CONFIG } from '../data/mockData';
import { useShop } from '../context/ShopContext';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2,
  ExternalLink 
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { language, showToast } = useShop();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      showToast(language === 'bn' ? 'অনুগ্রহ করে সকল তথ্য দিন' : 'Please fill all fields');
      return;
    }
    setSubmitted(true);
    showToast(language === 'bn' ? 'আপনার বার্তা গৃহীত হয়েছে!' : 'Message received!');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="font-serif-brand text-3xl sm:text-4xl font-bold text-neutral-900">
          {language === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন' : 'Contact Us'}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600">
          {language === 'bn'
            ? 'পণ্য সম্পর্কে তথ্য, যেকোনো প্রশ্ন বা সরাসরি অর্ডারের জন্য আমাদের কাস্টমার কেয়ারে যোগাযোগ করুন।'
            : 'For product inquiries, bulk orders, or order support, reach out directly.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#1a1a1a] via-[#243d12] to-[#1a1a1a] text-white p-8 rounded-3xl space-y-6 shadow-md">
          <div className="space-y-2">
            <span className="text-xs text-[#d4af37] font-bold uppercase tracking-wider">
              {language === 'bn' ? 'সরাসরি সহায়তা' : 'Direct Support'}
            </span>
            <h2 className="font-serif-brand text-2xl font-bold">Kasab Gallery</h2>
            <p className="text-xs text-neutral-300">
              {BRAND_CONFIG.banglaAddress}
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">ফোন নম্বর:</span>
                <a href={`tel:${BRAND_CONFIG.phone}`} className="font-bold text-sm hover:underline">
                  {BRAND_CONFIG.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">হোয়াটসঅ্যাপ:</span>
                <a
                  href={BRAND_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-sm hover:underline text-emerald-300"
                >
                  WhatsApp চ্যাট শুরু করুন
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-neutral-300" />
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">ইমেইল:</span>
                <a href={`mailto:${BRAND_CONFIG.email}`} className="font-medium hover:underline">
                  {BRAND_CONFIG.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-[#d4af37]" />
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">সাপোর্ট সময়:</span>
                <span className="font-medium text-[#d4af37]">{BRAND_CONFIG.hours}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <a
              href={BRAND_CONFIG.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>অফিসিয়াল ফেসবুক পেইজ</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-neutral-200 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif-brand text-xl font-bold text-neutral-900">
                ধন্যবাদ! আপনার বার্তা সফলভাবে পাঠানো হয়েছে।
              </h3>
              <p className="text-xs text-neutral-500">
                আমাদের প্রতিনিধি দ্রুত আপনার মোবাইল বা হোয়াটসঅ্যাপে যোগাযোগ করবেন।
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2 rounded-full bg-[#2d5016] text-white text-xs font-bold"
              >
                আরেকটি বার্তা পাঠান
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif-brand text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
                আমাদের বার্তা পাঠান
              </h3>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  আপনার নাম *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার পূর্ণ নাম"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm focus:outline-none focus:border-[#2d5016]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  মোবাইল নম্বর *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm focus:outline-none focus:border-[#2d5016]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  আপনার বার্তা বা অনুসন্ধানের বিবরণ *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="আপনি কোন পণ্যটি সম্পর্কে জানতে চান বা বিশেষ কি নির্দেশনা আছে লিখুন..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm focus:outline-none focus:border-[#2d5016]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#2d5016] hover:bg-[#234011] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" />
                <span>বার্তা পাঠান</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
