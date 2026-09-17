import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  Product, 
  Category, 
  CartItem, 
  Order, 
  Testimonial, 
  ActivePage, 
  Language, 
  CategoryId, 
  OrderCustomer, 
  BlogPost, 
  HeroSlide,
  DbStatusInfo,
  ScrollingNotice 
} from '../types';
import { 
  INITIAL_CATEGORIES, 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_TESTIMONIALS, 
  INITIAL_HERO_SLIDES, 
  INITIAL_SCROLLING_NOTICE,
  BRAND_CONFIG 
} from '../data/mockData';
import { BLOG_POSTS } from '../data/blogData';

interface ShopContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  orders: Order[];
  testimonials: Testimonial[];
  blogs: BlogPost[];
  heroSlides: HeroSlide[];
  dbStatus: DbStatusInfo | null;
  isLoadingDb: boolean;
  refreshDbData: () => Promise<void>;
  
  currentPage: ActivePage;
  setCurrentPage: (page: ActivePage) => void;
  selectedCategoryId: CategoryId | 'all';
  setSelectedCategoryId: (id: CategoryId | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  selectedBlog: BlogPost | null;
  setSelectedBlog: (blog: BlogPost | null) => void;
  selectedBlogCategory: string | 'all';
  setSelectedBlogCategory: (cat: string | 'all') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  deliveryCharge: number;
  cartTotal: number;

  // Order Actions
  createOrder: (customer: OrderCustomer, channel: 'website_cod' | 'whatsapp' | 'email') => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
  generateWhatsAppOrderUrl: (items: CartItem[], customer?: Partial<OrderCustomer>, customProduct?: Product) => string;

  // Category Actions
  updateCategory: (id: string, updated: Partial<Category>) => Promise<void>;
  addCategory: (category: Omit<Category, '_id'> & { _id?: string }) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  // Admin Actions
  addProduct: (product: Omit<Product, '_id' | 'createdAt'>) => Promise<void>;
  updateProduct: (id: string, updated: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addBlogPost: (post: Omit<BlogPost, '_id'>) => Promise<void>;
  updateBlogPost: (id: string, updated: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  addHeroSlide: (slide: Omit<HeroSlide, '_id'>) => Promise<void>;
  updateHeroSlide: (id: string, updated: Partial<HeroSlide>) => Promise<void>;
  deleteHeroSlide: (id: string) => Promise<void>;
  reorderHeroSlides: (slides: HeroSlide[]) => void;
  scrollingNotice: ScrollingNotice;
  updateScrollingNotice: (updates: Partial<ScrollingNotice>) => Promise<void>;
  addTestimonial: (item: Omit<Testimonial, 'id'>) => Promise<void>;
  updateTestimonial: (id: string, updated: Partial<Testimonial>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  resetToInitialData: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products loaded from Database
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [blogs, setBlogs] = useState<BlogPost[]>(BLOG_POSTS);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(INITIAL_HERO_SLIDES);
  const [scrollingNotice, setScrollingNotice] = useState<ScrollingNotice>(INITIAL_SCROLLING_NOTICE);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  // DB Connection and Loading Status
  const [dbStatus, setDbStatus] = useState<DbStatusInfo | null>(null);
  const [isLoadingDb, setIsLoadingDb] = useState(true);

  // Cart local state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('kg_cart_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    return [];
  });

  // Navigation & UI state
  const [currentPage, setCurrentPage] = useState<ActivePage>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<string | 'all'>('all');
  const [language, setLanguage] = useState<Language>('bn');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Save cart in localStorage
  useEffect(() => {
    localStorage.setItem('kg_cart_v1', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // ----------------------------------------------------
  // FETCH ALL DATA FROM SERVER / DATABASE
  // ----------------------------------------------------
  const refreshDbData = useCallback(async () => {
    try {
      setIsLoadingDb(true);
      // Fetch DB status
      const statusRes = await fetch('/api/db-status');
      if (statusRes.ok) {
        const statusJson = await statusRes.json();
        setDbStatus(statusJson);
      }

      // 1. Products from DB
      const prodRes = await fetch('/api/products');
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        if (Array.isArray(prodData) && prodData.length > 0) {
          setProducts(prodData);
        }
      }

      // 2. Categories from DB
      const catRes = await fetch('/api/categories');
      if (catRes.ok) {
        const catData = await catRes.json();
        if (Array.isArray(catData) && catData.length > 0) {
          setCategories(catData);
        }
      }

      // 3. Blogs from DB
      const blogRes = await fetch('/api/blogs');
      if (blogRes.ok) {
        const blogData = await blogRes.json();
        if (Array.isArray(blogData) && blogData.length > 0) {
          setBlogs(blogData);
        }
      }

      // 4. Hero Banners from DB
      const bannerRes = await fetch('/api/banners');
      if (bannerRes.ok) {
        const bannerData = await bannerRes.json();
        if (Array.isArray(bannerData) && bannerData.length > 0) {
          setHeroSlides(bannerData);
        }
      }

      // 5. Orders from DB
      const orderRes = await fetch('/api/orders');
      if (orderRes.ok) {
        const orderData = await orderRes.json();
        if (Array.isArray(orderData)) {
          setOrders(orderData);
        }
      }

      // 6. Scrolling Notice from DB
      const noticeRes = await fetch('/api/scrolling-notice');
      if (noticeRes.ok) {
        const noticeData = await noticeRes.json();
        if (noticeData && typeof noticeData.enabled === 'boolean') {
          setScrollingNotice(noticeData);
        }
      }

      // 7. Testimonials (Customer satisfaction reviews) from DB
      const testRes = await fetch('/api/testimonials');
      if (testRes.ok) {
        const testData = await testRes.json();
        if (Array.isArray(testData) && testData.length > 0) {
          setTestimonials(testData);
        }
      }
    } catch (err) {
      console.warn('[ShopContext] API call notice:', err);
    } finally {
      setIsLoadingDb(false);
    }
  }, []);

  // Fetch on initial mount
  useEffect(() => {
    refreshDbData();
  }, [refreshDbData]);

  // ----------------------------------------------------
  // CART ACTIONS
  // ----------------------------------------------------
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(
      language === 'bn'
        ? `"${product.banglaName}" কার্টে যোগ করা হয়েছে`
        : `"${product.name}" added to cart`
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  // Fixed single delivery charge
  const deliveryCharge = cart.length > 0 ? BRAND_CONFIG.fixedDeliveryDhaka : 0;
  const cartTotal = cartSubtotal + deliveryCharge;

  // ----------------------------------------------------
  // ORDER ACTIONS (SAVED TO DATABASE)
  // ----------------------------------------------------
  const createOrder = async (
    customer: OrderCustomer,
    channel: 'website_cod' | 'whatsapp' | 'email'
  ): Promise<Order> => {
    const delivery =
      customer.city === 'Outside Dhaka'
        ? BRAND_CONFIG.fixedDeliveryOutside
        : BRAND_CONFIG.fixedDeliveryDhaka;

    const orderPayload = {
      items: cart.map((i) => ({
        productId: i.product._id,
        name: i.product.name,
        banglaName: i.product.banglaName,
        quantity: i.quantity,
        price: i.product.price,
        image: i.product.image,
      })),
      customer,
      subtotal: cartSubtotal,
      delivery_charge: delivery,
      total: cartSubtotal + delivery,
      status: 'pending' as const,
      channel,
      notes: customer.notes || 'Website placed order',
    };

    let createdOrder: Order;

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      if (res.ok) {
        createdOrder = await res.json();
      } else {
        throw new Error('Server order creation failed');
      }
    } catch (e) {
      // Fallback
      createdOrder = {
        ...orderPayload,
        _id: `KG-${Math.floor(100000 + Math.random() * 900000)}`,
        orderDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
    }

    setOrders((prev) => [createdOrder, ...prev]);
    clearCart();
    return createdOrder;
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === orderId ? { ...o, status } : o))
    );

    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch (e) {
      console.warn('Could not sync status with server:', e);
    }

    showToast(
      language === 'bn'
        ? `অর্ডার ${orderId} স্ট্যাটাস পরিবর্তন হয়েছে (${status})`
        : `Order ${orderId} status updated to ${status}`
    );
  };

  const deleteOrder = async (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o._id !== orderId));
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.warn('Could not delete order from server:', e);
    }
    showToast(
      language === 'bn' ? `অর্ডার #${orderId} মুছে ফেলা হয়েছে` : `Order #${orderId} deleted`
    );
  };

  const generateWhatsAppOrderUrl = (
    items: CartItem[],
    customer?: Partial<OrderCustomer>,
    customProduct?: Product
  ) => {
    let text = '';
    const phoneClean = BRAND_CONFIG.phone.replace(/[^0-9]/g, '');

    if (customProduct) {
      text = `আসসালামু আলাইকুম Kasab Gallery! 🌿\n\nআমি সরাসরি এই পণ্যটি অর্ডার করতে আগ্রহী:\n` +
        `📦 পণ্য: ${customProduct.banglaName} (${customProduct.name})\n` +
        `💰 মূল্য: ৳${customProduct.price}\n\n` +
        `অনুগ্রহ করে ডেলিভারি ও কনফার্মেশন বিস্তারিত জানান। জাযাকাল্লাহু খাইরান!`;
    } else {
      const itemsList = items
        .map(
          (i, idx) =>
            `${idx + 1}. ${i.product.banglaName} (পরিমাণ: ${i.quantity}টি) - ৳${i.product.price * i.quantity}`
        )
        .join('\n');

      const sub = items.reduce(
        (acc, curr) => acc + curr.product.price * curr.quantity,
        0
      );
      const delivery =
        customer?.city === 'Outside Dhaka'
          ? BRAND_CONFIG.fixedDeliveryOutside
          : BRAND_CONFIG.fixedDeliveryDhaka;
      const grandTotal = sub + delivery;

      text =
        `আসসালামু আলাইকুম Kasab Gallery! 🌿\nআমি একটি নতুন অর্ডার কনফার্ম করতে চাই:\n\n` +
        `🛒 **অর্ডারকৃত পণ্যসমূহ:**\n${itemsList}\n\n` +
        `💵 পণ্যের মূল্য: ৳${sub}\n` +
        `🚚 সিঙ্গেল ডেলিভারি চার্জ: ৳${delivery}\n` +
        `🏷️ **সর্বমোট বিল: ৳${grandTotal}**\n\n` +
        `👤 গ্রাহকের নাম: ${customer?.name || 'Customer'}\n` +
        `📞 ফোন নম্বর: ${customer?.phone || ''}\n` +
        `📍 ঠিকানা: ${customer?.address || ''}\n` +
        `🏙️ জোন: ${customer?.city || 'Dhaka'}\n` +
        (customer?.notes ? `📝 বিশেষ নোট: ${customer.notes}\n` : '') +
        `\nঅনুগ্রহ করে অর্ডারটি কনফার্ম করুন। জাযাকাল্লাহু খাইরান!`;
    }

    return `https://wa.me/${phoneClean}?text=${encodeURIComponent(text)}`;
  };

  // ----------------------------------------------------
  // ADMIN ACTIONS (SYNCED WITH DATABASE)
  // ----------------------------------------------------
  const addProduct = async (newP: Omit<Product, '_id' | 'createdAt'>) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newP),
      });
      if (res.ok) {
        const created: Product = await res.json();
        setProducts((prev) => [created, ...prev]);
      } else {
        throw new Error('API failed');
      }
    } catch (e) {
      const fallback: Product = {
        ...newP,
        _id: `prod-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setProducts((prev) => [fallback, ...prev]);
    }
    showToast(
      language === 'bn'
        ? 'নতুন পণ্য ডেটাবেজে সফলভাবে যুক্ত হয়েছে'
        : 'Product added successfully to database'
    );
  };

  const updateProduct = async (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, ...updated } : p))
    );
    try {
      await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch (e) {
      console.warn('Error syncing product update to database:', e);
    }
    showToast(
      language === 'bn' ? 'পণ্য ডেটাবেজে আপডেট সম্পন্ন হয়েছে' : 'Product updated in database'
    );
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p._id !== id && (p as any).id !== id));
    try {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.warn('Error syncing product delete to database:', e);
    }
    showToast(
      language === 'bn' ? 'পণ্যটি ডেটাবেজ থেকে মুছে ফেলা হয়েছে' : 'Product removed from database'
    );
  };

  const addBlogPost = async (post: Omit<BlogPost, '_id'>) => {
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      if (res.ok) {
        const created = await res.json();
        setBlogs((prev) => [created, ...prev]);
      } else {
        throw new Error('Failed to create blog on server');
      }
    } catch (e) {
      const fallback: BlogPost = {
        ...post,
        _id: `blog-${Date.now()}`,
      };
      setBlogs((prev) => [fallback, ...prev]);
    }
    showToast(
      language === 'bn' ? 'নতুন ব্লগ আর্টিকেল প্রকাশিত হয়েছে' : 'Blog post published'
    );
  };

  const updateBlogPost = async (id: string, updated: Partial<BlogPost>) => {
    setBlogs((prev) =>
      prev.map((b) => (b._id === id ? { ...b, ...updated } : b))
    );
    try {
      await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch (e) {
      console.warn('Error updating blog on server:', e);
    }
    showToast(
      language === 'bn' ? 'ব্লগ আর্টিকেল আপডেট করা হয়েছে' : 'Blog post updated'
    );
  };

  const deleteBlogPost = async (id: string) => {
    setBlogs((prev) => prev.filter((b) => b._id !== id));
    try {
      await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.warn('Error deleting blog on server:', e);
    }
    showToast(
      language === 'bn' ? 'ব্লগটি মুছে ফেলা হয়েছে' : 'Blog post deleted'
    );
  };

  const addHeroSlide = async (slide: Omit<HeroSlide, '_id'>) => {
    try {
      const res = await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slide),
      });
      if (res.ok) {
        const created = await res.json();
        setHeroSlides((prev) => [...prev, created]);
      } else {
        throw new Error('Banner API failed');
      }
    } catch (e) {
      const fallback: HeroSlide = {
        ...slide,
        _id: `slide-${Date.now()}`,
      };
      setHeroSlides((prev) => [...prev, fallback]);
    }
    showToast(
      language === 'bn' ? 'নতুন স্লাইডার ব্যানার ডেটাবেজে যোগ হয়েছে' : 'Hero slide added to database'
    );
  };

  const updateHeroSlide = async (id: string, updated: Partial<HeroSlide>) => {
    setHeroSlides((prev) =>
      prev.map((s) => (s._id === id ? { ...s, ...updated } : s))
    );
    try {
      await fetch(`/api/banners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch (e) {
      console.warn('Error updating banner on server:', e);
    }
    showToast(
      language === 'bn' ? 'স্লাইডার ব্যানার আপডেট করা হয়েছে' : 'Hero slide updated'
    );
  };

  const deleteHeroSlide = async (id: string) => {
    setHeroSlides((prev) => prev.filter((s) => s._id !== id));
    try {
      await fetch(`/api/banners/${id}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.warn('Error deleting banner from server:', e);
    }
    showToast(
      language === 'bn' ? 'স্লাইডার ব্যানার মুছে ফেলা হয়েছে' : 'Hero slide deleted'
    );
  };

  const reorderHeroSlides = (newSlides: HeroSlide[]) => {
    setHeroSlides(newSlides);
    showToast(
      language === 'bn' ? 'স্লাইডারের ক্রম আপডেট করা হয়েছে' : 'Slide order updated'
    );
  };

  const updateScrollingNotice = async (updates: Partial<ScrollingNotice>) => {
    setScrollingNotice((prev) => ({ ...prev, ...updates }));
    try {
      const res = await fetch('/api/scrolling-notice', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const data = await res.json();
        setScrollingNotice(data);
      }
    } catch (e) {
      console.warn('Error updating scrolling notice on server:', e);
    }
    showToast(
      language === 'bn' ? 'স্ক্রোলিং নোটিশ সফলভাবে আপডেট হয়েছে' : 'Scrolling notice updated successfully'
    );
  };

  const addTestimonial = async (item: Omit<Testimonial, 'id'>) => {
    const tempId = `rev-${Date.now()}`;
    const newTestimonial: Testimonial = { ...item, id: tempId };
    setTestimonials((prev) => [newTestimonial, ...prev]);

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (res.ok) {
        const created = await res.json();
        setTestimonials((prev) => prev.map((t) => (t.id === tempId ? created : t)));
      }
    } catch (e) {
      console.warn('Error adding testimonial to server:', e);
    }
    showToast(
      language === 'bn' ? 'নতুন গ্রাহক সন্তুষ্টির রিভিউ যুক্ত হয়েছে' : 'New customer review added'
    );
  };

  const updateTestimonial = async (id: string, updated: Partial<Testimonial>) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        const data = await res.json();
        setTestimonials((prev) =>
          prev.map((t) => (t.id === id ? { ...t, ...data } : t))
        );
      }
    } catch (e) {
      console.warn('Error updating testimonial on server:', e);
    }
    showToast(
      language === 'bn' ? 'গ্রাহক রিভিউ সফলভাবে আপডেট হয়েছে' : 'Customer review updated successfully'
    );
  };

  const deleteTestimonial = async (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Error deleting testimonial on server:', e);
    }
    showToast(
      language === 'bn' ? 'গ্রাহক রিভিউ সফলভাবে মুছে ফেলা হয়েছে' : 'Customer review deleted'
    );
  };

  const updateCategory = async (id: string, updated: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c._id === id || (c as any).id === id ? { ...c, ...updated } : c))
    );
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        const data = await res.json();
        setCategories((prev) =>
          prev.map((c) => (c._id === id || (c as any).id === id ? { ...c, ...data } : c))
        );
      }
    } catch (e) {
      console.warn('Error syncing category update to server:', e);
    }
    showToast(
      language === 'bn' ? 'ক্যাটাগরি তথ্য সফলভাবে আপডেট হয়েছে' : 'Category updated successfully'
    );
  };

  const addCategory = async (categoryData: Omit<Category, '_id'> & { _id?: string }) => {
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });
      if (res.ok) {
        const created = await res.json();
        setCategories((prev) => [...prev, created]);
      } else {
        throw new Error('Category create API failed');
      }
    } catch (e) {
      const fallback: Category = {
        ...categoryData,
        _id: (categoryData._id || `cat-${Date.now()}`) as any,
      };
      setCategories((prev) => [...prev, fallback]);
    }
    showToast(
      language === 'bn' ? 'নতুন ক্যাটাগরি তৈরি করা হয়েছে' : 'New category created'
    );
  };

  const deleteCategory = async (id: string) => {
    setCategories((prev) => prev.filter((c) => c._id !== id && (c as any).id !== id));
    try {
      await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.warn('Error deleting category on server:', e);
    }
    showToast(
      language === 'bn' ? 'ক্যাটাগরিটি সফলভাবে মুছে ফেলা হয়েছে' : 'Category deleted successfully'
    );
  };

  const resetToInitialData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setBlogs(BLOG_POSTS);
    setHeroSlides(INITIAL_HERO_SLIDES);
    refreshDbData();
    showToast(
      language === 'bn'
        ? 'ডিফল্ট ডেটায় রিসেট করা হয়েছে'
        : 'Reset to default data'
    );
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        cart,
        orders,
        testimonials,
        blogs,
        heroSlides,
        dbStatus,
        isLoadingDb,
        refreshDbData,
        currentPage,
        setCurrentPage,
        selectedCategoryId,
        setSelectedCategoryId,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        setSelectedProduct,
        quickViewProduct,
        setQuickViewProduct,
        selectedBlog,
        setSelectedBlog,
        selectedBlogCategory,
        setSelectedBlogCategory,
        language,
        setLanguage,
        toastMessage,
        showToast,
        isSidebarOpen,
        setIsSidebarOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        deliveryCharge,
        cartTotal,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        generateWhatsAppOrderUrl,
        updateCategory,
        addCategory,
        deleteCategory,
        addProduct,
        updateProduct,
        deleteProduct,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        reorderHeroSlides,
        scrollingNotice,
        updateScrollingNotice,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        resetToInitialData,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
