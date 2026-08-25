import React, { useState } from 'react';
import { 
  Sparkles, 
  Trees, 
  Hammer, 
  ShieldCheck, 
  HeartHandshake, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  MessageCircle,
  Clock,
  Compass
} from 'lucide-react';
import { ContactInfo } from '../types';

interface StudioValuesProps {
  contactInfo: ContactInfo;
  onOpenWhatsApp: (msg?: string) => void;
}

export const StudioValues: React.FC<StudioValuesProps> = ({
  contactInfo,
  onOpenWhatsApp,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const values = [
    {
      icon: Trees,
      title: 'Kayu Solid Berkelanjutan (SVLK)',
      desc: 'Kami hanya menggunakan kayu jati perhutani, sungkai, dan mindi berizin legal dari perkebunan lestari dengan pengeringan kiln-dried MC < 12% untuk mencegah retak dan melengkung.',
    },
    {
      icon: Hammer,
      title: 'Artisan Woodcraft & Mortise-Tenon',
      desc: 'Setiap sambungan dikerjakan presisi dengan teknik sambungan purus kayu tradisional nusantara dan dipadukan dengan mesin finishing modern berstandar ekspor.',
    },
    {
      icon: Sparkles,
      title: 'Filosofi Wabi-Sabi & Japandi',
      desc: 'Menghargai keindahan serat kayu alami, guratan mata kayu, dan proporsi sederhana yang menenangkan jiwa dalam keseharian ruang hidup.',
    },
    {
      icon: ShieldCheck,
      title: 'Garansi Struktur 5 Tahun',
      desc: 'Kami memberikan komitmen nyata pada kekuatan rangka kayu, sambungan struktural, serta ketahanan fungsi engsel dan rel laci.',
    },
  ];

  const faqs = [
    {
      q: 'Berapa lama estimasi waktu pengerjaan untuk custom mebel?',
      a: 'Untuk pesanan mebel lepas (*loose furniture*) seperti meja makan atau credenza berkisar antara 14–21 hari kerja. Untuk proyek interior menyeluruh (built-in wardrobe, kitchen set, kabinet komplit) membutuhkan waktu sekitar 4–8 minggu tergantung skala luasan.',
    },
    {
      q: 'Apakah bisa memesan furnitur dengan ukuran dan desain custom sendiri?',
      a: 'Tentu saja! Lebih dari 80% proyek kami adalah custom bespoke. Anda bisa menggunakan Kalkulator Estimasi di website ini atau mengirimkan sketsa/foto referensi denah Anda langsung ke WhatsApp tim kami.',
    },
    {
      q: 'Apakah melayani pengiriman dan perakitan ke luar kota?',
      a: 'Ya, kami melayani pengiriman ke seluruh Indonesia (Jabodetabek, Bandung, Surabaya, Bali, Semarang, dsb). Khusus area Jabodetabek dan Jawa Tengah/Yogyakarta, tim teknisi kami menyediakan opsi perakitan dan instalasi langsung di tempat.',
    },
    {
      q: 'Bagaimana cara berkunjung ke workshop atau melihat sampel kayu?',
      a: 'Anda dapat membuat janji temu (*appointment*) melalui WhatsApp untuk mengunjungi workshop kami di Cilandak, Jakarta Selatan atau workshop produksi kayu kami di Jepara. Kami dengan senang hati memperlihatkan sampel jenis kayu dan lapisan finishing secara langsung.',
    },
  ];

  return (
    <section id="about-section" className="py-16 md:py-24 bg-[#F4F0E8]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBE4D6] border border-[#DDD3C2] text-[#4A3525] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#8C6D52]" />
              <span>Tentang Studio Kami</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F1D1A] leading-tight">
              Menghadirkan Keheningan & Kehangatan Kayu ke Dalam Hunian
            </h2>
            <p className="text-[#5A524A] text-sm sm:text-base leading-relaxed font-light">
              <strong className="font-semibold text-[#2C2723]">{contactInfo.brandName}</strong> berawal dari kecintaan kami pada aroma kayu jati perhutani dan ketenangan filosofi desain Jepang dan Skandinavia (*Japandi*).
            </p>
            <p className="text-[#5A524A] text-sm sm:text-base leading-relaxed font-light">
              Di tengah hiruk pikuk kehidupan modern, kami percaya bahwa rumah harus menjadi tempat perlindungan yang memulihkan energi. Mebel yang kami ciptakan bukan sekadar benda pengisi ruang, melainkan karya abadi yang menyatu dengan kisah keseharian Anda.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                id="about-visit-workshop-btn"
                onClick={() => onOpenWhatsApp('Halo NAMA LIVING, saya ingin menjadwalkan kunjungan ke workshop untuk melihat sampel kayu dan konsultasi desain.')}
                className="bg-[#4A3525] hover:bg-[#342418] text-white px-6 py-3 rounded-full text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-98"
              >
                <Clock className="w-4 h-4" />
                <span>Buat Janji Kunjungan Workshop</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=800&q=80"
                  alt="Artisan Woodworking NAMA LIVING"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-[#EBE4D6] p-5 rounded-2xl border border-[#DDD3C2] text-center">
                <span className="font-serif-display text-3xl font-bold text-[#4A3525] block">250+</span>
                <span className="text-[11px] text-[#6E645A] font-medium uppercase tracking-wider">Proyek Mebel & Interior</span>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="bg-[#4A3525] text-white p-5 rounded-2xl text-center">
                <span className="font-serif-display text-3xl font-bold text-[#D9C3B0] block">10+ Th</span>
                <span className="text-[11px] text-[#E0D7C8] font-medium uppercase tracking-wider">Dedikasi Pengrajin Kayu</span>
              </div>
              <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80"
                  alt="Japandi Interior Space"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F1D1A]">
              Nilai & Prinsip Pengerjaan Kami
            </h3>
            <p className="text-xs sm:text-sm text-[#6E645A] mt-2">
              Kualitas tanpa kompromi dari pemilihan log kayu hingga perakitan akhir.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-[#E8E2D5] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#8C6D52] transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#F4F0E8] text-[#4A3525] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#2C2723] mb-2">{val.title}</h4>
                    <p className="text-xs text-[#5A524A] font-light leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs">
          <div className="text-center mb-8">
            <h3 className="font-serif-display text-2xl font-bold text-[#1F1D1A]">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h3>
            <p className="text-xs text-[#6E645A] mt-1">
              Informasi lengkap seputar pemesanan mebel dan konsultasi interior.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#EAE3D6] rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-[#2C2723] hover:bg-[#FBF9F5] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#8C6D52] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8C6D52] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-[#5A524A] leading-relaxed border-t border-[#F4F0E8] pt-3 bg-[#FBF9F5]/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
