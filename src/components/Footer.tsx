import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  MessageCircle, 
  ArrowUp,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { ContactInfo } from '../types';

interface FooterProps {
  contactInfo: ContactInfo;
  setActiveTab: (tab: 'home' | 'catalog' | 'portfolio' | 'calculator' | 'about' | 'admin') => void;
  onOpenWhatsApp: (msg?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  contactInfo,
  setActiveTab,
  onOpenWhatsApp,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#1F1D1A] text-[#E5DFD3] pt-16 pb-12 border-t border-[#342F2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#342F2A]">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#8C6D52] text-[#1F1D1A] flex items-center justify-center font-serif-display text-xl font-bold tracking-widest">
                NL
              </div>
              <div>
                <span className="block font-serif-display text-xl font-bold tracking-[0.18em] text-[#FBF9F5] uppercase">
                  {contactInfo.brandName}
                </span>
                <span className="block text-[10px] tracking-[0.2em] text-[#A08E7E] uppercase -mt-0.5">
                  Japandi Furniture & Interior
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A08E7E] leading-relaxed font-light">
              Studio pengerjaan mebel kayu solid & rancang bangun interior dengan harmoni filosofi Wabi-Sabi Jepang dan kepresisian Skandinavia.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-[#C4B5A5]">
              <ShieldCheck className="w-4 h-4 text-[#8C6D52]" />
              <span>Garansi Konstruksi 5 Tahun</span>
            </div>
          </div>

          {/* Nav Links Col */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#FBF9F5] uppercase tracking-widest">
              Navigasi
            </h4>
            <ul className="space-y-2 text-xs text-[#A08E7E]">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('catalog');
                    scrollToTop();
                  }}
                  className="hover:text-[#FBF9F5] transition-colors cursor-pointer"
                >
                  Katalog Mebel
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('portfolio');
                    scrollToTop();
                  }}
                  className="hover:text-[#FBF9F5] transition-colors cursor-pointer"
                >
                  Portofolio Proyek
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('calculator');
                    scrollToTop();
                  }}
                  className="hover:text-[#FBF9F5] transition-colors cursor-pointer"
                >
                  Kalkulator Custom
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('about');
                    scrollToTop();
                  }}
                  className="hover:text-[#FBF9F5] transition-colors cursor-pointer"
                >
                  Tentang Studio & Nilai
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('admin');
                    scrollToTop();
                  }}
                  className="hover:text-[#D9C3B0] transition-colors cursor-pointer text-[#8C6D52] flex items-center gap-1 mt-1"
                >
                  <Settings className="w-3 h-3" />
                  <span>Panel Studio CMS</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#FBF9F5] uppercase tracking-widest">
              Spesialisasi Kayu
            </h4>
            <ul className="space-y-1.5 text-xs text-[#A08E7E]">
              <li>• Meja Makan Kayu Jati TPK Solid</li>
              <li>• Curved Armchair Sungkai Japandi</li>
              <li>• Low-Profile Sofa Modular Bouclé</li>
              <li>• Kitchen Set & Island Counter Bespoke</li>
              <li>• Slatted Media Credenza & Wardrobe</li>
              <li>• Tempat Tidur Tatami Platform</li>
            </ul>
          </div>

          {/* Contact & Workshop Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#FBF9F5] uppercase tracking-widest">
              Workshop & Kontak
            </h4>
            <div className="space-y-2 text-xs text-[#A08E7E]">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8C6D52] shrink-0 mt-0.5" />
                <span>{contactInfo.workshopAddress}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8C6D52] shrink-0" />
                <span>{contactInfo.phoneDisplay}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8C6D52] shrink-0" />
                <span>{contactInfo.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#8C6D52] shrink-0" />
                <span>{contactInfo.instagram}</span>
              </p>
              <p className="flex items-start gap-2 pt-1 text-[11px] text-[#8C7E70]">
                <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{contactInfo.operationalHours}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7E70]">
          <p>© {new Date().getFullYear()} {contactInfo.brandName}. All rights reserved. Japandi Furniture & Custom Interior Studio.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenWhatsApp()}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#2E6B47]" />
              <span>WhatsApp Hotline</span>
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
