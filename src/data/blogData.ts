import { BlogPost } from '../types';

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    _id: 'blog-1',
    slug: 'how-to-identify-pure-raw-honey-health-benefits',
    title: 'How to Identify 100% Pure Raw Honey & Natural Healing Benefits',
    banglaTitle: 'খাঁটি মধু চেনার উপায় ও স্বাস্থ্য উপকারিতা',
    excerpt: 'Discover easy home tests to identify raw unfiltered honey and understand the immense therapeutic values and antioxidant benefits.',
    banglaExcerpt: 'সুন্দরবনের খাঁটি মধু কীভাবে চিনবেন? বুদবুদ পরীক্ষা, পানির টেস্ট এবং মধু পানের বৈজ্ঞানিক ও স্বাস্থ্যকর নিয়ম জানুন বিস্তারিত।',
    category: 'honey_guide',
    categoryName: 'Honey & Nutrition',
    banglaCategoryName: 'মধু ও পুষ্টি গাইড',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200&auto=format&fit=crop&q=80',
    author: 'ড. রফিকুল ইসলাম',
    authorRole: 'Food Nutritionist & Health Researcher',
    banglaAuthorRole: 'খাদ্য পুষ্টিবিদ ও স্বাস্থ্য গবেষক',
    publishedDate: 'ফেব্রুয়ারি ২৮, ২০২৫',
    readTime: '৫ মিনিট',
    banglaReadTime: '৫ মিনিট পড়ার সময়',
    featured: true,
    relatedProductIds: ['prod-1', 'prod-3'],
    tags: ['মধু', 'খাঁটি মধু পরীক্ষা', 'প্রাকৃতিক খাদ্য', 'রোগ প্রতিরোধ'],
    content: `Honey has been cherished across civilizations for centuries as a natural source of healing and energy. Consuming pure honey mixed with lukewarm water in the morning on an empty stomach stimulates gut digestion, revitalizes stamina, and cleanses the lymphatic vessels.

### 3 Reliable Tests to Identify Pure Wild Honey:
1. **The Water Dispersion Test**: Add one teaspoon of honey into a transparent glass of cold water. Pure raw honey will sink to the bottom as a dense droplet without dissolving immediately. Sugar syrup will dilute quickly.
2. **The Hexagonal Memory Test (Honeycomb Test)**: Put a spoonful of honey on a shallow plate, add a little water, and swirl gently. Pure honey naturally forms a hexagonal pattern resembling a honeycomb due to its organic memory.
3. **Purity of Aroma**: Genuine Sundarban wild honey carries a light floral and earthen tang with natural enzyme bubbles upon opening.

At Kasab Gallery, our wild honey is collected straight by traditional Mouwals from deep Sundarban forests without any industrial heat processing, preserving its natural diastase enzymes.`,
    banglaContent: `মধুকে আবহমানকাল থেকেই মানবজাতির জন্য প্রাকৃতিক নিরাময় ও শক্তির ভাণ্ডার হিসেবে গণ্য করা হয়। সকালবেলা হালকা কুসুম গরম পানিতে খাঁটি মধু মিশিয়ে পান করা পাকস্থলী সুস্থ রাখতে, হজমশক্তি বাড়াতে এবং রক্ত পরিষ্কার করতে অপরিসীম ভূমিকা পালন করে।

### খাঁটি মধু চেনার ৩টি পরীক্ষিত ঘরোয়া পদ্ধতি:
১. **পানির গ্লাস টেস্ট:** একটি স্বচ্ছ কাঁচের গ্লাসে পানি নিয়ে তাতে এক চা চামচ মধু দিন। খাঁটি মধু পানির নিচে দানা আকারে তলিয়ে যাবে এবং সাথে সাথে দ্রবীভূত হবে না। চিনি মিশ্রিত কৃত্রিম মধু পানিতে দ্রুত ছড়িয়ে পড়ে।
২. **হানি-কম্ব (ষড়ভুজ) টেস্ট:** একটি ছোট প্লেটে সামান্য মধু ঢেলে তার ওপর সামান্য পানি দিন। এবার প্লেটটি ধীরে ধীরে ঘোরাতে থাকলে মধুর উপরিভাগে মৌচাকের মতো প্রাকৃতিক ষড়ভুজ নকশা ফুটে উঠবে।
৩. **প্রাকৃতিক গন্ধ ও বুদবুদ:** সুন্দরবনের প্রাকৃতিক বুনো মধুতে খলিসা বা কেওড়া ফুলের সুবাস এবং অপরিশোধিত প্রাকৃতিক এনজাইমের কারণে বোতল খুললে হালকা ফেনা বা গ্যাস লক্ষ্য করা যায়—যা শতভাগ বিশুদ্ধতার সবচেয়ে বড় প্রমাণ।

Kasab Gallery-র সুন্দরবনের বুনো মধু মৌয়ালদের থেকে সরাসরি সংগৃহীত, যা কোনো কৃত্রিম তাপ বা প্রক্রিয়াকরণ ছাড়া সম্পূর্ণ কাঁচা (Raw) অবস্থায় বোতলজাত করা হয়।`
  },
  {
    _id: 'blog-2',
    slug: 'health-benefits-of-madinah-ajwa-dates',
    title: 'The Remarkable Health Benefits of Madinah Ajwa Dates',
    banglaTitle: 'মদিনার আজওয়া খেজুরের পুষ্টিগুণ ও স্বাস্থ্য উপকারিতা',
    excerpt: 'Learn why Ajwa dates are globally celebrated for heart strength, natural energy, and rich antioxidant properties.',
    banglaExcerpt: 'প্রতিদিন সকালে আজওয়া খেজুর খাওয়ার বিস্ময়কর কার্যকারিতা, হৃদরোগ প্রতিরোধ ও শরীরের ক্লান্তি দূরীকরণে এর ভূমিকা জানুন।',
    category: 'sunnah_health',
    categoryName: 'Natural Nutrition',
    banglaCategoryName: 'প্রাকৃতিক পুষ্টি ও স্বাস্থ্য',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=1200&auto=format&fit=crop&q=80',
    author: 'ড. মোহাম্মাদ রাশেদুল ইসলাম',
    authorRole: 'Nutritionist & Wellness Writer',
    banglaAuthorRole: 'পুষ্টিবিদ ও জীবনযাপন বিশেষজ্ঞ',
    publishedDate: 'মার্চ ০২, ২০২৫',
    readTime: '৪ মিনিট',
    banglaReadTime: '৪ মিনিট পড়ার সময়',
    featured: true,
    relatedProductIds: ['prod-2', 'prod-1'],
    tags: ['আজওয়া খেজুর', 'মদিনা শরিফ', 'হৃদরোগ প্রতিরোধ', 'প্রাকৃতিক পুষ্টি'],
    content: `Ajwa dates are renowned worldwide for their rich nutritional density and unique texture. Modern nutritional science confirms that Ajwa dates contain exceptionally high levels of polyphenols, magnesium, and potassium, which optimize cardiovascular arterial health.

### Key Nutritional Wonders:
- **Cardiovascular Protection**: Daily consumption reduces bad cholesterol (LDL) and supports arterial elasticity.
- **Natural Energy Fuel**: High content of slow-burning fructose and dietary fibers prevents sugar crashes while sustaining high stamina.
- **Digestive Harmony**: High prebiotic fiber cleanses the colon and fosters beneficial microbiome flora.

Kasab Gallery sources original VIP Grade Ajwa directly from certified farms in Madinah Al-Munawwarah.`,
    banglaContent: `বিশ্বজুড়ে আজওয়া খেজুর তার অতুলনীয় পুষ্টিগুণ ও ঘন টেক্সচারের জন্য সুপরিচিত।

আধুনিক মেডিকেল সায়েন্স প্রমাণ করেছে যে আজওয়া খেজুরে রয়েছে পর্যাপ্ত পটাশিয়াম, ম্যাগনেসিয়াম ও অ্যান্টিঅক্সিডেন্ট ফ্ল্যাভোনয়েডস, যা হার্টের পেশিকে শক্তিশালী করে এবং রক্তনালীর স্থিতিস্থাপকতা রক্ষা করতে সহায়তা করে।

### আজওয়া খেজুরের প্রধান ৫টি স্বাস্থ্য গুণ:
১. **হৃদরোগ প্রতিরোধ ও রক্তচাপ নিয়ন্ত্রণ:** এতে সোডিয়ামের পরিমাণ অত্যন্ত কম কিন্তু পটাশিয়াম অনেক বেশি, যা রক্তচাপ স্বাভাবিক রাখতে এবং হার্ট সুস্থ রাখতে সাহায্য করে।
২. **তাৎক্ষণিক শক্তির উৎস:** সারাদিনের ক্লান্তি কাটাতে আজওয়া খেজুর শরীরে দ্রুত প্রাকৃতিক গ্লুকোজ ও শক্তির যোগান দেয়।
৩. **গর্ভবতী মা ও শিশুদের শক্তি সঞ্চার:** আজওয়া খেজুরে থাকা আয়রন রক্তশূন্যতা রোধে এবং শারীরিক দুর্বলতা কাটাতে অসাধারণ ভূমিকা রাখে।
৪. **হজমশক্তি বৃদ্ধি ও কোষ্ঠকাঠিন্য দূরীকরণ:** প্রচুর ডায়েটরি ফাইবার পাচনতন্ত্রকে সচল ও পরিচ্ছন্ন রাখে।

Kasab Gallery সরাসরি মদিনা শরিফের বিশ্বস্ত বাগান থেকে গ্রেড-এ অরিজিনাল আজওয়া খেজুর আপনাদের দোরগোড়ায় পৌঁছে দিচ্ছে।`
  },
  {
    _id: 'blog-3',
    slug: 'cold-pressed-black-seed-oil-usage-guide',
    title: 'Cold-Pressed Black Seed Oil: Proper Usage & Scientific Health Benefits',
    banglaTitle: 'কালোজিরা তেল: রোগ প্রতিরোধ ও সঠিক সেবন পদ্ধতি',
    excerpt: 'Understand the power of Thymoquinone in Nigella Sativa oil and how to use it safely for immune vitality, respiratory relief, and joint care.',
    banglaExcerpt: 'কালোজিরা তেলের সঠিক সেবনবিধি, কুসুম গরম দুধ বা মধুর সাথে ব্যবহার এবং ত্বক ও চুলের যত্নে এর অনন্য ব্যবহার জানুন।',
    category: 'sunnah_health',
    categoryName: 'Herbal Remedies',
    banglaCategoryName: 'ভেষজ ও নিরাময়',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=1200&auto=format&fit=crop&q=80',
    author: 'হাকিম সামিউল হক',
    authorRole: 'Herbal Specialist',
    banglaAuthorRole: 'ভেষজ ও ইউনানী গবেষক',
    publishedDate: 'মার্চ ০৫, ২০২৫',
    readTime: '৬ মিনিট',
    banglaReadTime: '৬ মিনিট পড়ার সময়',
    featured: false,
    relatedProductIds: ['prod-3', 'prod-1'],
    tags: ['কালোজিরা তেল', 'রোগ প্রতিরোধ', 'ঠান্ডা কাশি', 'প্রাকৃতিক চিকিৎসা'],
    content: `Black seed (Nigella Sativa) has been revered for millennia across the world. The principal bioactive compound is Thymoquinone, a powerful immunomodulator and cellular protector.

### Recommended Usage Methods:
1. **Immunity Booster**: Mix 1/2 teaspoon of cold-pressed virgin black seed oil with 1 tablespoon of raw honey in warm water every morning.
2. **Cold, Cough & Bronchial Relief**: Warm a few drops between palms and gently massage over chest and throat before sleeping. Inhaling steam with 3-4 drops eases nasal congestion.
3. **Joint & Muscle Relief**: Rub warmed oil over knees or lower back to reduce stiffness.

Always choose Cold-Pressed (Wood-Pressed) oil, as heat extraction destroys volatile flavonoids.`,
    banglaContent: `ভেষজ চিকিৎসা ও ঐতিহ্যবাহী আয়ুর্বেদে কালোজিরাকে প্রকৃতির এক অমূল্য উপহার হিসেবে গণ্য করা হয়।

কালোজিরার প্রধান সক্রিয় উপাদান হলো **থাইমোকুইনোন (Thymoquinone)**, যা একটি অতুলনীয় অ্যান্টিঅক্সিডেন্ট, অ্যান্টি-ইনফ্ল্যামেটরি ও জীবাণুনাশক উপাদান।

### সঠিক সেবন ও ব্যবহারের নিয়ম:
- **রোগ প্রতিরোধ ক্ষমতা বৃদ্ধিতে:** প্রতিদিন সকালে ১ চা চামচ খাঁটি মধুর সাথে আধ চা চামচ কোল্ড-প্রেসড কালোজিরা তেল মিশিয়ে সেবন করুন।
- **সর্দি, কাশি ও শ্বাসকষ্টে:** রাতে ঘুমানোর আগে বুকে ও গলায় হালকা গরম কালোজিরা তেল মালিশ করুন। ফুটন্ত গরম পানিতে ৩-৪ ফোঁটা তেল দিয়ে ভাপ (Inhalation) নিলে বন্ধ নাক দ্রুত খুলে যায়।
- **চুল পড়া রোধে:** নারকেল তেল বা অলিভ অয়েলের সাথে কয়েক ফোঁটা কালোজিরা তেল মিশিয়ে চুলের গোড়ায় নিয়মিত ম্যাসাজ করলে চুল পড়া বন্ধ হয় ও খুশকি দূর হয়।
- **বাতের ব্যথা ও জয়েন্টের যত্নে:** আক্রান্ত স্থানে দিনে দুইবার কুসুম গরম কালোজিরা তেল হালকা হাতে মালিশ করুন।

Kasab Gallery-র কালোজিরা তেল কাঠের ঘানিতে সম্পূর্ণ ঠান্ডা প্রক্রিয়ায় (Cold-Pressed) ভাঙানো হয়, ফলে এর সব ঔষধি গুণ ১০০% অটুট থাকে।`
  },
  {
    _id: 'blog-4',
    slug: 'elegance-of-alcohol-free-pure-attar',
    title: 'The Elegance & Serenity of Alcohol-Free Concentrated Attar',
    banglaTitle: 'অ্যালকোহলমুক্ত সুগন্ধি আতর: আভিজাত্য, স্থায়িত্ব ও ব্যবহারের নিয়ম',
    excerpt: 'Explore why applying pure non-alcoholic concentrated perfume oil elevates personal presence and creates a soothing aura.',
    banglaExcerpt: 'আতর ব্যবহারের সঠিক পদ্ধতি, দীর্ঘস্থায়ী সুবাস ধরে রাখার গোপন কৌশল এবং অ্যালকোহলমুক্ত প্রাকৃতিক আতরের উপকারিতা জানুন।',
    category: 'halal_lifestyle',
    categoryName: 'Fragrance & Lifestyle',
    banglaCategoryName: 'সুগন্ধি ও লাইফস্টাইল',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&auto=format&fit=crop&q=80',
    author: 'তানভীর আহমেদ',
    authorRole: 'Fragrance Specialist',
    banglaAuthorRole: 'সুগন্ধি ও লাইফস্টাইল গবেষক',
    publishedDate: 'মার্চ ০৬, ২০২৫',
    readTime: '৪ মিনিট',
    banglaReadTime: '৪ মিনিট পড়ার সময়',
    featured: false,
    relatedProductIds: ['prod-7', 'prod-8', 'prod-6'],
    tags: ['আতর', 'সুগন্ধি', 'আভিজাত্য', 'প্রিমিয়াম লাইফস্টাইল'],
    content: `Fragrance is an art of personal grace and tranquility. Applying non-alcoholic concentrated perfume oil (Attar) elevates the mood, sharpens focus, and creates a tranquil ambiance throughout the day.

### Tips to Maximize Attar Longevity:
1. Apply to warm pulse points: wrist insides, behind earlobes, and neck base.
2. Rub a single drop between your palms and pass gently over your clothes.
3. Natural attar contains zero synthetic alcohol, ensuring skin hydration without dryness or burning.`,
    banglaContent: `সুগন্ধি শুধু ব্যক্তিত্বকেই ফুটিয়ে তোলে না, বরং মানসিক প্রশান্তি ও আত্মবিশ্বাস বাড়াতে অনন্য ভূমিকা রাখে।

### আতরের সুবাস দীর্ঘস্থায়ী করার কিছু গোপন টিপস:
১. **পালস পয়েন্টে ব্যবহার:** কবজির ভেতরের অংশে, কানের পেছনে এবং গলার পাশে আতর লাগালে শরীরের স্বাভাবিক তাপমাত্রায় সুবাস দীর্ঘ সময় ছড়িয়ে পড়ে।
২. **পোশাকের ভাঁজে স্পর্শ:** দুই হাতের তালুতে সামান্য আতর নিয়ে হালকা ঘষে পোশাকে বুলিয়ে নিন।
৩. **অ্যালকোহলমুক্ত আতরের সুবিধা:** কেমিক্যাল স্প্রে বাতাস দ্রুত শুষ্ক করে দেয় ও ত্বকে জ্বালাতন করতে পারে, কিন্তু বিশুদ্ধ ভেষজ এসেনশিয়াল অয়েলের আতর দীর্ঘ সময় পর্যন্ত স্নিগ্ধ অনুভূতি বজায় রাখে।

Kasab Gallery-তে পাবেন প্রিমিয়াম হোয়াইট উদ, জান্নাতুল ফেরদৌস ও কস্তুরীর আসল ঘ্রাণ যা দৈনন্দিন ব্যবহারে এনে দেয় নিখাদ প্রশান্তি।`
  },
  {
    _id: 'blog-5',
    slug: 'natural-skincare-botanical-care',
    title: 'Natural Skincare: Pure Botanical Care & Chemical-Free Glow',
    banglaTitle: 'প্রাকৃতিক উপায়ে ত্বকের যত্ন: কেমিক্যালমুক্ত ভেষজ পরিচর্যা',
    excerpt: 'Switching away from harsh synthetic chemicals to pure rose water, saffron elixirs, and cold-pressed plant oils for holistic facial glow.',
    banglaExcerpt: 'ক্ষতিকর কেমিক্যালযুক্ত ফেয়ারনেস ক্রিম বাদ দিয়ে গোলাপজল, খাঁটি জাফরান ও অর্গানিক তেলের সাহায্যে ত্বকের স্থায়ী প্রাকৃতিক উজ্জ্বলতা ফিরিয়ে আনুন।',
    category: 'skincare_tips',
    categoryName: 'Natural Skincare',
    banglaCategoryName: 'প্রাকৃতিক স্কিনকেয়ার',
    image: 'https://images.unsplash.com/photo-1608248597359-5613521255ec?w=1200&auto=format&fit=crop&q=80',
    author: 'ফারহানা ইয়াসমিন',
    authorRole: 'Organic Beauty & Skincare Consultant',
    banglaAuthorRole: 'অর্গানিক বিউটি কেয়ার কনসালটেন্ট',
    publishedDate: 'মার্চ ০৭, ২০২৫',
    readTime: '৫ মিনিট',
    banglaReadTime: '৫ মিনিট পড়ার সময়',
    featured: false,
    relatedProductIds: ['prod-4', 'prod-5', 'prod-1'],
    tags: ['গোলাপজল', 'জাফরান সিরাম', 'স্কিনকেয়ার', 'প্রাকৃতিক যত্ন'],
    content: `Cleanliness and gentle skincare are fundamental to overall health and confidence. In contemporary times, chemical bleaches and paraben-loaded creams degrade the skin's natural barrier. Botanical alternatives like pure steam-distilled rose water and Kashmiri saffron oil rejuvenate the dermis safely.

### Simple 3-Step Night Ritual:
1. **Cleanse**: Wash face with lukewarm water, pat dry gently.
2. **Tone**: Mist pure organic Damask rose water to balance skin pH and tighten pores.
3. **Nourish**: Apply 2 drops of Kashmiri Saffron Night Glow serum, pressing into cheekbones with upward strokes.`,
    banglaContent: `রূপচর্চা ও ত্বকের যত্ন নেওয়া প্রতিটি মানুষের স্বাভাবিক সুস্থতার অংশ। ত্বকের যত্ন নেওয়ার মাধ্যমেই আমরা শরীরকে সতেজ ও সুন্দর রাখতে পারি।

বাজারে প্রচলিত প্যারাবেন ও ক্ষতিকর মার্কারিযুক্ত ফেয়ারনেস ক্রিম সাময়িক ফর্সা করলেও ত্বকের এপিডার্মিস পাতলা করে ফেলে। এর বিপরীতে প্রাকৃতিক গোলাপজল ও কাশ্মীরি জাফরানের নিয়মিত ব্যবহারে ত্বক পায় গভীর পুষ্টি।

### রাতের সহজ ৩ ধাপের ভেষজ যত্ন রুটিন:
১. **পরিষ্কার:** হালকা কুসুম গরম পানিতে মুখ ধুয়ে সুতি তোয়ালে দিয়ে আলতো চেপে শুকিয়ে নিন।
২. **টোনিং:** মুখ ও গলায় খাঁটি অর্গানিক গোলাপজল স্প্রে করুন। এটি ত্বকের পিএইচ (pH) ব্যালেন্স ঠিক রাখে ও পোরস সঙ্কুচিত করে।
৩. **জাফরান ময়েশ্চারাইজিং:** কাশ্মীরি জাফরান সিরামের ২-৩ ফোঁটা আঙুলের ডগায় নিয়ে রাতে ঘুমানোর আগে আলতো ম্যাসাজ করুন। এটি ডার্ক স্পট ও ফাইন লাইনস দূর করে প্রাকৃতিক লাবণ্য ফিরিয়ে আনে।

Kasab Gallery নিয়ে এসেছে ১০০% নিরাপদ ও কেমিক্যালমুক্ত প্রাকৃতিক রূপচর্চা সামগ্রী।`
  },
  {
    _id: 'blog-6',
    slug: 'winter-wellness-diet-lifestyle-guide',
    title: 'Winter Wellness: Nourishing Foods & Vital Habits for Cold Weather',
    banglaTitle: 'শীতকালে সুস্থ থাকার কার্যকরী প্রাকৃতিক খাদ্য ও লাইফস্টাইল গাইড',
    excerpt: 'How olive oil, pure honey, raw black seeds, and warming modest clothing protect your family against seasonal flu and winter ailments.',
    banglaExcerpt: 'শীতের শুষ্ক আবহাওয়ায় সর্দি-কাশি থেকে বাঁচতে এবং শরীরের রোগ প্রতিরোধ ক্ষমতা বাড়াতে প্রাকৃতিক খাদ্যের ব্যবহারিক নির্দেশনা।',
    category: 'sunnah_health',
    categoryName: 'Seasonal Care',
    banglaCategoryName: 'ঋতুভিত্তিক স্বাস্থ্য যত্ন',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=1200&auto=format&fit=crop&q=80',
    author: 'ডা. আবদুল্লাহ আল-মামুন',
    authorRole: 'Health & Lifestyle Writer',
    banglaAuthorRole: 'স্বাস্থ্য ও জীবনধারা লেখক',
    publishedDate: 'মার্চ ০৮, ২০২৫',
    readTime: '৪ মিনিট',
    banglaReadTime: '৪ মিনিট পড়ার সময়',
    featured: false,
    relatedProductIds: ['prod-9', 'prod-1', 'prod-3'],
    tags: ['শীতকালীন যত্ন', 'মধু পানি', 'কাশ্মীরি শাল', 'সুস্থ জীবনধারা'],
    content: `To safeguard body warmth and resilience in winter, regular intake of warm honey water, olive oil moisturizing, and protective modest attire are key habits.

Wrap yourself in pure warm wool or cashmere, hydrate consistently with natural warm drinks, and safeguard your health with daily black seed oil drops.`,
    banglaContent: `শীতের ঠান্ডা ও শুষ্ক বাতাসে ত্বক খসখসে হওয়া, সর্দি-কাশি ও টনসিলের সমস্যায় পরিবারের ছোট-বড় সবাই ভুগে থাকে। একটু সতর্কতা ও সঠিক প্রাকৃতিক খাদ্যাভ্যাস বজায় রাখলে শীতকালেও সম্পূর্ণ সুস্থ ও চনমনে থাকা সম্ভব।

### শীতের স্বাস্থ্যকর খাদ্য ও লাইফস্টাইল টিপস:
- **সকালের গরম মধু পানি:** সকালে এক গ্লাস কুসুম গরম পানিতে ১ চামচ সুন্দরবনের মধু ও লেবুর রস মিশিয়ে পান করলে ফুসফুস ও শ্বাসনালী পরিষ্কার থাকে।
- **শরীরে অলিভ অয়েল বা কালোজিরা তেল মালিশ:** গোসলের আগে বা রাতে শোবার আগে তেল মালিশ ত্বকের শুষ্কতা দূর করে ও শরীর উষ্ণ রাখে।
- **মার্জিত উষ্ণ শাল ও পোশাক:** শীতের ঠান্ডা বাতাস থেকে বুক ও গলা বাঁচাতে ভালো মানের উষ্ণ কাশ্মীরি শাল বা কটি ব্যবহার করুন।

Kasab Gallery আপনাদের শীতের প্রতিটি প্রয়োজনে পৌঁছে দিচ্ছে প্রিমিয়াম কাশ্মীরি শাল, খাঁটি মধু ও কোল্ড-প্রেসড তেল।`
  }
];

export const BLOG_POSTS = INITIAL_BLOG_POSTS;
