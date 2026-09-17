export type CategoryId = 'food' | 'skincare' | 'accessories' | 'islamic' | 'winter' | (string & {});

export interface Product {
  _id: string;
  name: string;
  banglaName: string;
  category: CategoryId;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  banglaDescription: string;
  shortDescription?: string; // সংক্ষিপ্ত বিবরণ
  longDescription?: string; // বিস্তারিত আলোচনা
  sunnah_certified: boolean;
  rating: number;
  reviews_count: number;
  available: boolean;
  featured?: boolean;
  badge?: string;
  stock?: number;
  createdAt: string;
}

export interface Category {
  _id: CategoryId;
  name: string;
  banglaName: string;
  iconName: string;
  description: string;
  banglaDescription: string;
  image: string;
  descriptionBn?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: 'Dhaka' | 'Outside Dhaka';
  notes?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  _id: string;
  items: {
    productId: string;
    name: string;
    banglaName: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  customer: OrderCustomer;
  subtotal: number;
  delivery_charge: number;
  total: number;
  status: OrderStatus;
  orderDate: string;
  channel: 'website_cod' | 'whatsapp' | 'email';
  notes?: string;
  createdAt?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  banglaComment: string;
  productMention: string;
  verifiedBuyer: boolean;
}

export type BlogCategory = 'sunnah_health' | 'honey_guide' | 'halal_lifestyle' | 'skincare_tips';

export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  banglaTitle: string;
  excerpt: string;
  banglaExcerpt: string;
  content: string;
  banglaContent: string;
  category: BlogCategory;
  categoryName: string;
  banglaCategoryName: string;
  image: string;
  author: string;
  authorRole: string;
  banglaAuthorRole: string;
  publishedDate: string;
  readTime: string;
  banglaReadTime: string;
  featured?: boolean;
  relatedProductIds: string[];
  tags: string[];
}

export type ActivePage = 'home' | 'catalog' | 'product_detail' | 'cart' | 'checkout' | 'about' | 'contact' | 'admin' | 'blog' | 'blog_detail';
export type Language = 'bn' | 'en';

export interface HeroSlide {
  _id: string;
  image: string;
  title: string;
  banglaTitle: string;
  subtitle?: string;
  banglaSubtitle?: string;
  badge?: string;
  banglaBadge?: string;
  ctaText?: string;
  banglaCtaText?: string;
  linkType: 'catalog' | 'category' | 'product' | 'whatsapp' | 'url';
  linkValue?: string; // categoryId, productId, or external URL
  active: boolean;
  order: number;
}

export interface DbStatusInfo {
  connected: boolean;
  database: string;
  note?: string;
  counts?: {
    products: number;
    categories: number;
    blogs: number;
    banners: number;
    orders: number;
  };
}

export interface ScrollingNotice {
  enabled: boolean;
  text: string;
  textEn?: string;
  speed: 'slow' | 'normal' | 'fast';
  badge?: string;
  badgeEn?: string;
  link?: string;
}
