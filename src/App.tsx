import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Ruler, 
  Compass, 
  Tag, 
  CheckCircle2,
  TreePine
} from 'lucide-react';
import { Product, Project, ContactInfo } from './types';
import { 
  getStoredProducts, 
  saveStoredProducts, 
  getStoredProjects, 
  saveStoredProjects, 
  getStoredContact, 
  saveStoredContact, 
  resetToDefaultData 
} from './utils/storage';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { CustomCalculator } from './components/CustomCalculator';
import { StudioValues } from './components/StudioValues';
import { AdminStudio } from './components/AdminStudio';
import { WhatsAppModal } from './components/WhatsAppModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'catalog' | 'portfolio' | 'calculator' | 'about' | 'admin'>('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(getStoredContact());
  
  // WhatsApp Modal State
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');

  // Initial Data Hydration
  useEffect(() => {
    setProducts(getStoredProducts());
    setProjects(getStoredProjects());
    setContactInfo(getStoredContact());
  }, []);

  // Update handlers with storage sync
  const handleUpdateProducts = (updated: Product[]) => {
    setProducts(updated);
    saveStoredProducts(updated);
  };

  const handleUpdateProjects = (updated: Project[]) => {
    setProjects(updated);
    saveStoredProjects(updated);
  };

  const handleUpdateContact = (updated: ContactInfo) => {
    setContactInfo(updated);
    saveStoredContact(updated);
  };

  const handleResetDefaults = () => {
    resetToDefaultData();
    setProducts(getStoredProducts());
    setProjects(getStoredProjects());
    setContactInfo(getStoredContact());
  };

  const handleOpenWhatsApp = (customMsg?: string) => {
    setWhatsAppMessage(customMsg || '');
    setIsWhatsAppOpen(true);
  };

  const handleOpenCalculatorForProduct = (product: Product) => {
    setActiveTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Featured Products for Home
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#2C2723]">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        contactInfo={contactInfo}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              setActiveTab={setActiveTab}
              onOpenWhatsApp={handleOpenWhatsApp}
              contactInfo={contactInfo}
            />

            {/* Featured Furniture Teaser Section */}
            <section className="py-16 bg-[#F4F0E8]/60 border-y border-[#E8E2D5]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBE4D6] border border-[#DDD3C2] text-[#4A3525] text-xs font-semibold uppercase tracking-wider mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#8C6D52]" />
                      <span>Koleksi Terpilih</span>
                    </div>
                    <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1F1D1A]">
                      Mebel Unggulan Japandi
                    </h2>
                  </div>

                  <button
                    id="home-view-all-catalog-btn"
                    onClick={() => {
                      setActiveTab('catalog');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-[#4A3525] hover:bg-[#342418] text-white px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Lihat Semua Katalog ({products.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Catalog Grid */}
                <ProductCatalog
                  products={featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4)}
                  onOpenWhatsApp={handleOpenWhatsApp}
                  onOpenCalculatorForProduct={handleOpenCalculatorForProduct}
                />
              </div>
            </section>

            {/* Portfolio Highlights on Home */}
            <section className="py-16 bg-[#FBF9F5]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBE4D6] border border-[#DDD3C2] text-[#4A3525] text-xs font-semibold uppercase tracking-wider mb-2">
                      <Compass className="w-3.5 h-3.5 text-[#8C6D52]" />
                      <span>Portofolio Ruang</span>
                    </div>
                    <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1F1D1A]">
                      Karya Desain Interior Terkini
                    </h2>
                  </div>

                  <button
                    id="home-view-all-projects-btn"
                    onClick={() => {
                      setActiveTab('portfolio');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#8C6D52] hover:text-[#4A3525] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Jelajahi Semua Proyek ({projects.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <PortfolioShowcase
                  projects={projects.slice(0, 3)}
                  onOpenWhatsApp={handleOpenWhatsApp}
                />
              </div>
            </section>

            {/* Interactive Calculator Teaser Section */}
            <section className="py-16 bg-[#F4F0E8] border-t border-[#E8E2D5]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <CustomCalculator onOpenWhatsApp={handleOpenWhatsApp} />
              </div>
            </section>

            {/* Studio Values & FAQ */}
            <StudioValues
              contactInfo={contactInfo}
              onOpenWhatsApp={handleOpenWhatsApp}
            />
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="pt-20">
            <ProductCatalog
              products={products}
              onOpenWhatsApp={handleOpenWhatsApp}
              onOpenCalculatorForProduct={handleOpenCalculatorForProduct}
            />
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="pt-20">
            <PortfolioShowcase
              projects={projects}
              onOpenWhatsApp={handleOpenWhatsApp}
            />
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="pt-20">
            <CustomCalculator onOpenWhatsApp={handleOpenWhatsApp} />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="pt-20">
            <StudioValues
              contactInfo={contactInfo}
              onOpenWhatsApp={handleOpenWhatsApp}
            />
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="pt-20">
            <AdminStudio
              products={products}
              setProducts={handleUpdateProducts}
              projects={projects}
              setProjects={handleUpdateProjects}
              contactInfo={contactInfo}
              setContactInfo={handleUpdateContact}
              onResetDefaults={handleResetDefaults}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        contactInfo={contactInfo}
        setActiveTab={setActiveTab}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* Floating Fast WhatsApp Trigger */}
      <div className="fixed bottom-6 right-6 z-30 flex items-center gap-2">
        <button
          id="floating-wa-btn"
          onClick={() => handleOpenWhatsApp()}
          className="bg-[#2E6B47] hover:bg-[#255739] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
          aria-label="Konsultasi WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-white/20" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
          </div>
          <span className="hidden sm:inline text-xs font-bold tracking-wide">
            Konsultasi WhatsApp
          </span>
        </button>
      </div>

      {/* WhatsApp Smart Inquiry Modal */}
      {isWhatsAppOpen && (
        <WhatsAppModal
          isOpen={isWhatsAppOpen}
          onClose={() => setIsWhatsAppOpen(false)}
          initialMessage={whatsAppMessage}
          contactInfo={contactInfo}
        />
      )}
    </div>
  );
}
