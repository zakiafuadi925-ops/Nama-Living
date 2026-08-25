import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Sparkles, 
  MessageCircle, 
  Sliders, 
  Layers, 
  Compass, 
  Settings,
  PhoneCall
} from 'lucide-react';
import { ContactInfo } from '../types';

interface NavbarProps {
  activeTab: 'home' | 'catalog' | 'portfolio' | 'calculator' | 'about' | 'admin';
  setActiveTab: (tab: 'home' | 'catalog' | 'portfolio' | 'calculator' | 'about' | 'admin') => void;
  contactInfo: ContactInfo;
  onOpenWhatsApp: (customMsg?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  contactInfo,
  onOpenWhatsApp,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: {
    id: 'home' | 'catalog' | 'portfolio' | 'calculator' | 'about';
    label: string;
    badge?: string;
  }[] = [
    { id: 'home', label: 'Beranda' },
    { id: 'catalog', label: 'Katalog Mebel' },
    { id: 'portfolio', label: 'Portofolio Interior' },
    { id: 'calculator', label: 'Kalkulator Custom', badge: 'Estimator' },
    { id: 'about', label: 'Tentang Studio' },
  ];

  const handleNavClick = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      id="main-header" 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E8E2D5] shadow-xs py-3.5' 
          : 'bg-[#FBF9F5]/60 backdrop-blur-xs border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <button 
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-sm bg-[#4A3525] text-[#FBF9F5] flex items-center justify-center font-serif-display text-xl font-bold tracking-widest shadow-xs group-hover:bg-[#342418] transition-colors">
              NL
            </div>
            <div>
              <span className="block font-serif-display text-xl sm:text-2xl font-bold tracking-[0.18em] text-[#2C2723] uppercase">
                {contactInfo.brandName}
              </span>
              <span className="block text-[10px] tracking-[0.25em] text-[#8C6D52] font-medium uppercase -mt-0.5">
                Japandi Wood Studio
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#F4F0E8] p-1 rounded-full border border-[#E8E2D5]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-medium tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#4A3525] text-[#FBF9F5] shadow-xs'
                      : 'text-[#5A524A] hover:text-[#2C2723] hover:bg-[#EBE5DA]'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                      isActive 
                        ? 'bg-[#8C6D52] text-[#FBF9F5]' 
                        : 'bg-[#D9C3B0] text-[#4A3525]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Admin Studio Toggle */}
            <button
              id="nav-admin-studio-btn"
              onClick={() => handleNavClick('admin')}
              className={`p-2.5 rounded-full border transition-all cursor-pointer flex items-center justify-center text-xs gap-1.5 font-medium ${
                activeTab === 'admin'
                  ? 'bg-[#4A3525] text-white border-[#4A3525]'
                  : 'bg-white border-[#E0D7C8] text-[#5A524A] hover:text-[#2C2723] hover:bg-[#F4F0E8]'
              }`}
              title="Panel Kelola Konten & Katalog (CMS)"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden xl:inline">Studio CMS</span>
            </button>

            {/* Direct WhatsApp CTA */}
            <button
              id="nav-wa-cta-btn"
              onClick={() => onOpenWhatsApp()}
              className="bg-[#2E6B47] hover:bg-[#255739] text-white px-4 py-2 rounded-full text-xs font-medium tracking-wide flex items-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Konsultasi WA</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-admin-btn"
              onClick={() => handleNavClick('admin')}
              className="p-2 rounded-lg border border-[#E8E2D5] bg-[#F4F0E8] text-[#4A3525] cursor-pointer"
              aria-label="Admin CMS"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg border border-[#E8E2D5] bg-[#F4F0E8] text-[#2C2723] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden bg-[#FBF9F5] border-b border-[#E8E2D5] px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-between ${
                  activeTab === item.id
                    ? 'bg-[#4A3525] text-[#FBF9F5]'
                    : 'text-[#4A3525] hover:bg-[#F4F0E8]'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] bg-[#8C6D52] text-white px-2 py-0.5 rounded-full uppercase">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}

            <div className="pt-3 mt-2 border-t border-[#E8E2D5] flex flex-col gap-2">
              <button
                id="mobile-nav-admin"
                onClick={() => handleNavClick('admin')}
                className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border ${
                  activeTab === 'admin' 
                    ? 'bg-[#4A3525] text-white border-[#4A3525]'
                    : 'bg-white border-[#E0D7C8] text-[#4A3525]'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Panel Admin Studio (Kelola Produk & Proyek)</span>
              </button>

              <button
                id="mobile-nav-wa"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsApp();
                }}
                className="w-full bg-[#2E6B47] text-white py-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hubungi Kami via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
