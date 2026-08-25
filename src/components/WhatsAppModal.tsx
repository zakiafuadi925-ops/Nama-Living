import React, { useState, useEffect } from 'react';
import { 
  X, 
  MessageCircle, 
  Send, 
  Check, 
  Sparkles, 
  Calendar, 
  Compass, 
  Ruler, 
  Package 
} from 'lucide-react';
import { ContactInfo } from '../types';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
  contactInfo: ContactInfo;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  initialMessage = '',
  contactInfo,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [city, setCity] = useState('');
  const [inquiryType, setInquiryType] = useState<'custom' | 'ready' | 'interior' | 'visit'>('custom');
  const [customText, setCustomText] = useState(initialMessage);

  useEffect(() => {
    if (initialMessage) {
      setCustomText(initialMessage);
    } else {
      generateDefaultMessage(inquiryType, customerName, city);
    }
  }, [initialMessage, isOpen]);

  if (!isOpen) return null;

  const generateDefaultMessage = (type: string, name: string, userCity: string) => {
    const senderGreeting = name ? `Halo NAMA LIVING, saya ${name}${userCity ? ` dari ${userCity}` : ''}.\n\n` : `Halo NAMA LIVING,\n\n`;
    
    if (type === 'custom') {
      setCustomText(`${senderGreeting}Saya tertarik untuk memesan custom furniture (meja / kitchen / credenza / tempat tidur). Bisakah saya berdiskusi mengenai ukuran, jenis kayu solid, dan perkiraan biayanya?`);
    } else if (type === 'ready') {
      setCustomText(`${senderGreeting}Saya ingin menanyakan ketersediaan produk mebel ready stock yang ada di katalog website.`);
    } else if (type === 'interior') {
      setCustomText(`${senderGreeting}Saya berencana merancang interior (rumah / apartemen / cafe). Bisakah saya menjadwalkan konsultasi desain dengan tim interior NAMA LIVING?`);
    } else if (type === 'visit') {
      setCustomText(`${senderGreeting}Saya ingin menjadwalkan kunjungan ke workshop NAMA LIVING untuk melihat langsung sampel kayu dan pengerjaan mebel.`);
    }
  };

  const handleTypeSelect = (type: 'custom' | 'ready' | 'interior' | 'visit') => {
    setInquiryType(type);
    generateDefaultMessage(type, customerName, city);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = contactInfo.phoneWhatsapp.replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(customText);
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      id="whatsapp-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="whatsapp-modal-card"
        className="bg-[#FBF9F5] w-full max-w-lg rounded-2xl border border-[#E8E2D5] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2E6B47] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 fill-white/30" />
            </div>
            <div>
              <h3 className="font-serif-display text-lg font-bold">Konsultasi WhatsApp Resmi</h3>
              <p className="text-[11px] text-white/80">Tim kami merespons setiap hari kerja (09.00 - 18.00)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendWhatsApp} className="p-6 space-y-4 overflow-y-auto">
          {/* Quick Scenario Pills */}
          <div>
            <label className="block text-[11px] font-bold text-[#4A3525] uppercase tracking-wider mb-2">
              Pilih Keperluan Anda:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'custom', label: 'Custom Mebel', icon: Ruler },
                { id: 'ready', label: 'Cek Stok Produk', icon: Package },
                { id: 'interior', label: 'Proyek Interior', icon: Compass },
                { id: 'visit', label: 'Kunjungan Workshop', icon: Calendar },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = inquiryType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTypeSelect(item.id as any)}
                    className={`p-2 rounded-lg border text-left text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#4A3525] text-white border-[#4A3525]'
                        : 'bg-white text-[#5A524A] border-[#E0D7C8] hover:bg-[#F4F0E8]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name & City Input */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#5A524A] mb-1">
                Nama Anda:
              </label>
              <input
                type="text"
                placeholder="Contoh: Dimas"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  generateDefaultMessage(inquiryType, e.target.value, city);
                }}
                className="w-full px-3 py-2 bg-white border border-[#DDD3C2] rounded-lg text-xs text-[#2C2723] focus:outline-hidden focus:border-[#2E6B47]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#5A524A] mb-1">
                Kota Domisili:
              </label>
              <input
                type="text"
                placeholder="Contoh: Jakarta Selatan"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  generateDefaultMessage(inquiryType, customerName, e.target.value);
                }}
                className="w-full px-3 py-2 bg-white border border-[#DDD3C2] rounded-lg text-xs text-[#2C2723] focus:outline-hidden focus:border-[#2E6B47]"
              />
            </div>
          </div>

          {/* Message Text Area */}
          <div>
            <label className="block text-[11px] font-bold text-[#4A3525] uppercase tracking-wider mb-1">
              Pratinjau Pesan WhatsApp:
            </label>
            <textarea
              rows={4}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full p-3 bg-white border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723] leading-relaxed focus:outline-hidden focus:border-[#2E6B47] resize-none"
              required
            />
          </div>

          {/* Contact Details Note */}
          <div className="text-[11px] text-[#6E645A] bg-[#F4F0E8] p-3 rounded-lg border border-[#E8E2D5]">
            <p>
              Nomor WhatsApp Tujuan: <strong className="text-[#2C2723]">{contactInfo.phoneDisplay}</strong>
            </p>
            <p className="text-[10px] text-[#8C7E70] mt-0.5">
              Pesan akan otomatis terisi saat aplikasi WhatsApp Anda terbuka.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#2E6B47] hover:bg-[#255739] text-white py-3.5 px-6 rounded-full text-xs sm:text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-98"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Pesan via WhatsApp Sekarang</span>
          </button>
        </form>
      </div>
    </div>
  );
};
