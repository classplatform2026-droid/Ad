import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollingNoticeBar } from './components/ScrollingNoticeBar';
import { NavigationSidebar } from './components/NavigationSidebar';
import { QuickViewModal } from './components/QuickViewModal';
import { ScrollToTopButton } from './components/ScrollToTopButton';

// View Components
import { HomeView } from './components/HomeView';
import { CatalogView } from './components/CatalogView';
import { ProductDetailView } from './components/ProductDetailView';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { BlogView } from './components/BlogView';
import { BlogDetailView } from './components/BlogDetailView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { CheckCircle, AlertCircle, Info, Sparkles } from 'lucide-react';

const AppLayout: React.FC = () => {
  const { currentPage, toastMessage } = useShop();

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView />;
      case 'catalog':
        return <CatalogView />;
      case 'product_detail':
        return <ProductDetailView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'blog':
        return <BlogView />;
      case 'blog_detail':
        return <BlogDetailView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'admin':
        return <AdminDashboardView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f5] text-[#1a1a1a] font-sans antialiased selection:bg-[#2d5016] selection:text-white">
      {/* 1. Global Announcement / Scrolling Text Notice Bar */}
      <ScrollingNoticeBar />

      {/* 2. Global Sticky Navbar */}
      <Navbar />

      {/* 3. Global Navigation Drawer / Sidebar */}
      <NavigationSidebar />

      {/* 4. Main Body Content View */}
      <main className="flex-1 w-full">
        {renderCurrentView()}
      </main>

      {/* 5. Global Footer */}
      <Footer />

      {/* 6. Quick View Modal if triggered */}
      <QuickViewModal />

      {/* 7. Scroll to Top Floating Button */}
      <ScrollToTopButton />

      {/* 8. Global Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#1a1a1a] text-white shadow-2xl border border-[#d4af37]/40 text-xs font-semibold backdrop-blur-md">
            <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppLayout />
    </ShopProvider>
  );
}
