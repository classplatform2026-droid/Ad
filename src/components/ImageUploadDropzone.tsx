import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, X, Loader2, CheckCircle2, AlertCircle, Link } from 'lucide-react';

interface ImageUploadDropzoneProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  banglaLabel?: string;
  aspectRatio?: 'square' | 'wide';
}

export const ImageUploadDropzone: React.FC<ImageUploadDropzoneProps> = ({
  value,
  onChange,
  folder = 'products',
  label = 'Product Image',
  banglaLabel = 'পণ্যের ছবি আপলোড',
  aspectRatio = 'square',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [cloudinaryConfigured, setCloudinaryConfigured] = useState<boolean | null>(null);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check Cloudinary status
  useEffect(() => {
    fetch('/api/cloudinary/status')
      .then((res) => res.json())
      .then((data) => {
        setCloudinaryConfigured(Boolean(data.configured));
      })
      .catch(() => {
        setCloudinaryConfigured(false);
      });
  }, []);

  const handleFileProcess = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('শুধুমাত্র ছবি ফাইল (JPG, PNG, WEBP) আপলোড করুন');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('ছবির সাইজ ১০ মেগাবাইটের কম হতে হবে');
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      // 1. Read file as base64 Data URL
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });

      // 2. Upload to /api/upload
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Data, folder }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'আপলোড ব্যর্থ হয়েছে');
      }

      if (data.url) {
        onChange(data.url);
        setUrlInput(data.url);
      }
    } catch (err: any) {
      console.error('Image upload failed:', err);
      setUploadError(err.message || 'ছবি আপলোড করতে সমস্যা হয়েছে');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUploadError(null);
    }
  };

  const handleRemove = () => {
    onChange('');
    setUrlInput('');
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-neutral-700 block">
          {banglaLabel} <span className="text-[10px] text-neutral-400 font-normal">({label})</span>
        </label>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 text-[11px] bg-neutral-100 p-0.5 rounded-lg">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
              mode === 'upload' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            ফাইল আপলোড (Cloudinary)
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
              mode === 'url' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            ছবি লিংক (URL)
          </button>
        </div>
      </div>

      {/* Preview if image exists */}
      {value ? (
        <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50 group">
          <div className={`${aspectRatio === 'wide' ? 'aspect-21/9 max-h-56' : 'aspect-square max-h-56'} w-full flex items-center justify-center bg-neutral-900/5`}>
            <img
              src={value}
              alt="Uploaded Preview"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Overlay info and remove button */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-xs font-semibold text-neutral-900 shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              পরিবর্তন করুন
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-transform active:scale-95 cursor-pointer"
              title="মুছে ফেলুন"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cloudinary CDN indicator tag */}
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-neutral-900/80 backdrop-blur-xs text-[10px] font-medium text-white flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>
              {value.includes('cloudinary.com') ? 'Cloudinary CDN' : 'ছবির প্রিভিউ'}
            </span>
          </div>
        </div>
      ) : (
        <>
          {mode === 'upload' ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                isDragging
                  ? 'border-[#2d5016] bg-[#2d5016]/5 scale-[1.01]'
                  : 'border-neutral-300 hover:border-neutral-400 bg-neutral-50/60 hover:bg-neutral-50'
              } ${isUploading ? 'opacity-60 pointer-events-none' : ''}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp, image/gif"
                className="hidden"
                onChange={handleFileChange}
              />

              {isUploading ? (
                <div className="flex flex-col items-center justify-center py-4 text-[#2d5016]">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <span className="text-xs font-bold">Cloudinary-তে ছবি আপলোড হচ্ছে...</span>
                  <span className="text-[11px] text-neutral-400 mt-0.5">অনুগ্রহ করে একটু অপেক্ষা করুন</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-neutral-200 flex items-center justify-center text-[#2d5016] mb-3 group-hover:scale-105 transition-transform">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-neutral-800">
                    এখানে ক্লিক করে ছবি নির্বাচন করুন অথবা ড্র্যাগ করুন
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    PNG, JPG, WEBP ফরম্যাট (সর্বোচ্চ ১০MB)
                  </p>

                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-neutral-200 text-[10px] text-neutral-600 font-medium shadow-2xs">
                    <span className={`w-1.5 h-1.5 rounded-full ${cloudinaryConfigured ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span>{cloudinaryConfigured ? 'Cloudinary ক্লাউড স্টোরেজ সক্রিয়' : 'ক্লাউডিনারিতে আপলোড হবে'}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Direct URL input mode */
            <div className="space-y-2 p-3 bg-neutral-50 rounded-2xl border border-neutral-200">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Link className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://images.unsplash.com/... বা যেকোনো ছবির লিংক"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-200 bg-white focus:outline-hidden focus:border-[#2d5016] font-mono"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-3 py-2 rounded-xl bg-[#2d5016] hover:bg-[#1e360e] text-white text-xs font-semibold shrink-0 cursor-pointer"
                >
                  প্রয়োগ
                </button>
              </div>
              <span className="text-[11px] text-neutral-400 block px-1">
                টিপস: আনস্প্ল্যাশ, ক্লাউডিনারি বা যেকোনো অনলাইন ছবির সরাসরি ইমেজ লিংক পেস্ট করতে পারেন।
              </span>
            </div>
          )}
        </>
      )}

      {/* Error Message */}
      {uploadError && (
        <div className="flex items-center gap-2 p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}
    </div>
  );
};
