import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Trees, 
  Hammer, 
  Compass, 
  Sliders, 
  CheckCircle2 
} from 'lucide-react';
import { ContactInfo } from '../types';

interface HeroSectionProps {
  setActiveTab: (tab: 'home' | 'catalog' | 'portfolio' | 'calculator' | 'about' | 'admin') => void;
  onOpenWhatsApp: (msg?: string) => void;
  contactInfo: ContactInfo;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  setActiveTab,
  onOpenWhatsApp,
  contactInfo,
}) => {
  const materials = [
    { name: 'Kayu Jati Solid TPK', desc: 'Grade A Oven Kering, Serat Padat & Tahan Puluhan Tahun', color: '#785338' },
    { name: 'Kayu Sungkai Cerah', desc: 'Tone Hangat Alami Japandi, Grain Halus & Lembut', color: '#C8A882' },
    { name: 'Kayu Oak Jepang', desc: 'Serat Elegan Karakter Kuat, Finishing Natural Matte', color: '#9D7D5D' },
    { name: 'Linen Belgia & Bouclé', desc: 'Tekstil Bernapas Alami, Ramah Kulit & Anti Alergi', color: '#E5DFD3' },
  ];

  return (
    <section id="hero-section" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Subtle organic background aura */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#EFE8DC]/60 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Typography & Narrative + Hero Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Manifesto */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBE4D6] border border-[#DDD3C2] text-[#4A3525] text-xs font-semibold tracking-wider uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5 text-[#8C6D52]" />
              <span>Japandi Warm Wood Living</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#1F1D1A] font-bold leading-[1.12] tracking-tight mb-6">
              Keheningan <span className="italic font-normal text-[#8C6D52]">Wabi-Sabi</span>, Presisi Skandinavia, & Kayu Solid Nusantara.
            </h1>

            {/* Description */}
            <p className="text-[#5A524A] text-base sm:text-lg leading-relaxed max-w-2xl font-light mb-8">
              <strong className="font-medium text-[#2C2723]">{contactInfo.brandName}</strong> merancang dan membuat mebel kayu solid serta interior bernuansa hangat dan tenang. Menghadirkan keseimbangan antara fungsionalitas ruang modern dan keindahan tekstur kayu alami yang bertahan lintas generasi.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10">
              <button
                id="hero-cta-catalog"
                onClick={() => setActiveTab('catalog')}
                className="w-full sm:w-auto bg-[#4A3525] hover:bg-[#342418] text-[#FBF9F5] px-7 py-3.5 rounded-full text-sm font-medium tracking-wide flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
              >
                <span>Lihat Katalog Produk</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-cta-calculator"
                onClick={() => setActiveTab('calculator')}
                className="w-full sm:w-auto bg-[#F4F0E8] hover:bg-[#EAE2D4] border border-[#DDD3C2] text-[#4A3525] px-6 py-3.5 rounded-full text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-[#8C6D52]" />
                <span>Kalkulator Custom Mebel</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#E8E2D5] w-full">
              <div className="flex items-start gap-2.5">
                <Trees className="w-5 h-5 text-[#8C6D52] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-bold text-[#2C2723]">100% Kayu Solid</h2>
                  <p className="text-[11px] text-[#6E645A]">Oven Kiln-Dried MC &lt; 12%</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Hammer className="w-5 h-5 text-[#8C6D52] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-bold text-[#2C2723]">Artisan Jepara</h2>
                  <p className="text-[11px] text-[#6E645A]">Tradisi Sambungan Kayu</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#8C6D52] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-bold text-[#2C2723]">Garansi 5 Tahun</h2>
                  <p className="text-[11px] text-[#6E645A]">Kekuatan Struktur & Engsel</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Compass className="w-5 h-5 text-[#8C6D52] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-bold text-[#2C2723]">Custom Bespoke</h2>
                  <p className="text-[11px] text-[#6E645A]">Sesuaikan Ukuran Ruang</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Framing */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-[#FFFFFF] aspect-4/5 group">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
                alt="Japandi Warm Wood Interior NAMA LIVING"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

              {/* Floating Highlight Card */}
              <div className="absolute bottom-5 left-5 right-5 bg-[#FBF9F5]/95 backdrop-blur-md p-4 rounded-xl border border-[#E8E2D5] shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-[#8C6D52] uppercase">
                      Proyek Pilihan Minggu Ini
                    </span>
                    <h2 className="font-serif-display text-base font-bold text-[#1F1D1A]">
                      Komorebi Sanctuary Villa & Dining
                    </h2>
                    <p className="text-[11px] text-[#5A524A]">Kayu Jati Solid TPK • Finishing Bio-Oil Matte</p>
                  </div>
                  <button
                    id="hero-view-highlight-proj"
                    onClick={() => setActiveTab('portfolio')}
                    className="shrink-0 bg-[#4A3525] hover:bg-[#342418] text-white p-2 rounded-lg cursor-pointer transition-colors"
                    aria-label="Lihat Proyek Interior"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary Floating Badge */}
            <div className="absolute -top-4 -right-3 hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full border border-[#E8E2D5] shadow-md">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-[#2C2723]">Workshop Aktif: Menerima Custom Order</span>
            </div>
          </div>
        </div>

        {/* Material Swatches Bar */}
        <div className="mt-16 bg-[#F4F0E8] rounded-2xl p-6 border border-[#E8E2D5]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xs font-bold text-[#4A3525] tracking-wider uppercase">
                Pilihan Material Kayu & Finishing Alami
              </h2>
              <p className="text-xs text-[#6E645A]">
                Hanya menggunakan kayu legal tersertifikasi SVLK dari hutan lestari.
              </p>
            </div>
            <button
              id="hero-consult-material-btn"
              onClick={() => onOpenWhatsApp('Halo NAMA LIVING, saya ingin konsultasi pemilihan jenis kayu yang cocok untuk hunian saya.')}
              className="text-xs font-semibold text-[#8C6D52] hover:text-[#4A3525] flex items-center gap-1.5 cursor-pointer underline"
            >
              <span>Konsultasi Sampel Kayu</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {materials.map((mat, idx) => (
              <div
                key={idx}
                className="bg-white/80 rounded-xl p-3.5 border border-[#EAE3D6] flex items-center gap-3 shadow-xs hover:border-[#8C6D52] transition-colors"
              >
                <div 
                  className="w-9 h-9 rounded-lg shrink-0 border border-black/10 shadow-inner"
                  style={{ backgroundColor: mat.color }}
                />
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-[#2C2723] truncate">{mat.name}</h3>
                  <p className="text-[10px] text-[#6E645A] leading-tight line-clamp-2">{mat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
