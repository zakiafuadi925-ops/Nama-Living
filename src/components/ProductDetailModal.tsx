import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  MessageCircle, 
  ShieldCheck, 
  Ruler, 
  Truck, 
  Package, 
  Sparkles, 
  ArrowRight,
  Maximize2,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Product, WoodType, FinishingType } from '../types';
import { formatCurrencyIDR } from '../utils/storage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenWhatsApp: (customMsg?: string) => void;
  onOpenCalculatorForProduct?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenWhatsApp,
  onOpenCalculatorForProduct,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedWood, setSelectedWood] = useState<WoodType>(product?.materialWood || 'Kayu Jati Solid TPK');
  const [selectedFinishing, setSelectedFinishing] = useState<FinishingType>(product?.finishing || 'Natural Doff Matte (Water-based)');
  const [customDimensionNote, setCustomDimensionNote] = useState('');

  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      setSelectedWood(product.materialWood);
      setSelectedFinishing(product.finishing);
      setCustomDimensionNote('');
    }
  }, [product?.id]);

  if (!product) return null;

  const woodOptions: WoodType[] = [
    'Kayu Jati Solid TPK',
    'Kayu Sungkai Natural',
    'Kayu Oak Jepang',
    'Kayu Mindi Eksotis',
  ];

  const finishingOptions: FinishingType[] = [
    'Natural Doff Matte (Water-based)',
    'Walnut Dark Stain',
    'Bleached Japandi Light',
    'Organic Hardwax Oil',
  ];

  const handleWhatsAppOrder = () => {
    let msg = `Halo NAMA LIVING, saya ingin memesan/konsultasi produk *${product.title}*:\n`;
    msg += `• Kategori: ${product.category.toUpperCase()}\n`;
    msg += `• Pilihan Kayu: ${selectedWood}\n`;
    msg += `• Finishing: ${selectedFinishing}\n`;
    msg += `• Ukuran Standar: ${product.dimensions.length} x ${product.dimensions.width} x ${product.dimensions.height} cm\n`;
    msg += `• Estimasi Harga: ${formatCurrencyIDR(product.price)}\n`;
    if (customDimensionNote.trim()) {
      msg += `• Catatan Custom Dimensi/Ruangan: ${customDimensionNote.trim()}\n`;
    }
    msg += `\nMohon info ketersediaan stok & prosedur pemesanan. Terima kasih.`;

    onOpenWhatsApp(msg);
  };

  return (
    <div 
      id="product-detail-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="product-detail-modal-card"
        className="bg-[#FBF9F5] w-full max-w-4xl rounded-2xl border border-[#E8E2D5] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E2D5] bg-[#F4F0E8]/70">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-widest text-[#8C6D52] uppercase">
              Katalog Mebel #{product.id}
            </span>
            <span className="text-[#C4B5A5]">•</span>
            <span className="text-xs text-[#6E645A] capitalize">{product.category}</span>
          </div>
          <button
            id="close-product-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EAE2D4] text-[#5A524A] hover:text-[#1F1D1A] transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Gallery Images Column */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#EAE4D7] border border-[#E0D7C8] shadow-inner">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#4A3525]/90 backdrop-blur-xs text-white text-[11px] font-medium px-3 py-1 rounded-full">
                  {product.leadTime}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'border-[#4A3525] ring-2 ring-[#4A3525]/20 scale-105'
                          : 'border-[#E0D7C8] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Dimension Graphic Representation */}
              <div className="bg-[#F4F0E8] p-4 rounded-xl border border-[#E8E2D5]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#4A3525] uppercase tracking-wider mb-2">
                  <Ruler className="w-4 h-4 text-[#8C6D52]" />
                  <span>Spesifikasi Dimensi (cm)</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/80 p-2.5 rounded-lg border border-[#EAE3D6]">
                    <span className="block text-[10px] text-[#7A7065] uppercase">Panjang (P)</span>
                    <span className="text-base font-bold text-[#2C2723]">{product.dimensions.length} cm</span>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-lg border border-[#EAE3D6]">
                    <span className="block text-[10px] text-[#7A7065] uppercase">Lebar (L)</span>
                    <span className="text-base font-bold text-[#2C2723]">{product.dimensions.width} cm</span>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-lg border border-[#EAE3D6]">
                    <span className="block text-[10px] text-[#7A7065] uppercase">Tinggi (T)</span>
                    <span className="text-base font-bold text-[#2C2723]">{product.dimensions.height} cm</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#6E645A] mt-2 italic text-center">
                  *Bisa request custom ukuran sesuai denah ruangan Anda.
                </p>
              </div>
            </div>

            {/* Product Details & Customizer Column */}
            <div className="md:col-span-6 space-y-6">
              <div>
                <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F1D1A] mb-2 leading-tight">
                  {product.title}
                </h2>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-[#4A3525]">
                    {formatCurrencyIDR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#8C7E70] line-through">
                      {formatCurrencyIDR(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-[#5A524A] text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Material Customizer Choice */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#4A3525] uppercase tracking-wider">
                  Pilih Varian Kayu: <span className="font-normal text-[#8C6D52]">{selectedWood}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {woodOptions.map((wood) => (
                    <button
                      key={wood}
                      onClick={() => setSelectedWood(wood)}
                      className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                        selectedWood === wood
                          ? 'border-[#4A3525] bg-[#4A3525] text-white shadow-xs'
                          : 'border-[#E0D7C8] bg-white text-[#4A3525] hover:bg-[#F4F0E8]'
                      }`}
                    >
                      <span className="truncate">{wood}</span>
                      {selectedWood === wood && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Finishing Customizer Choice */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#4A3525] uppercase tracking-wider">
                  Pilihan Finishing: <span className="font-normal text-[#8C6D52]">{selectedFinishing}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {finishingOptions.map((fin) => (
                    <button
                      key={fin}
                      onClick={() => setSelectedFinishing(fin)}
                      className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                        selectedFinishing === fin
                          ? 'border-[#8C6D52] bg-[#8C6D52] text-white shadow-xs'
                          : 'border-[#E0D7C8] bg-white text-[#5A524A] hover:bg-[#F4F0E8]'
                      }`}
                    >
                      <span className="truncate">{fin}</span>
                      {selectedFinishing === fin && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hardware / Fabric Detail */}
              {product.fabricOrHardware && (
                <div className="p-3 bg-[#F4F0E8] rounded-lg border border-[#E8E2D5] text-xs text-[#5A524A]">
                  <strong className="text-[#2C2723]">Detail Material Pendukung:</strong> {product.fabricOrHardware}
                </div>
              )}

              {/* Custom Size Request Note */}
              <div className="space-y-2">
                <label htmlFor="custom-dim-note-input" className="block text-xs font-semibold text-[#4A3525]">
                  Catatan Tambahan / Request Ukuran Khusus (Opsional):
                </label>
                <input
                  id="custom-dim-note-input"
                  type="text"
                  placeholder="Contoh: Tolong panjangnya disesuaikan jadi 180cm..."
                  value={customDimensionNote}
                  onChange={(e) => setCustomDimensionNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD3C2] rounded-lg text-xs text-[#2C2723] focus:outline-hidden focus:border-[#4A3525]"
                />
              </div>

              {/* Features List */}
              <div className="space-y-2 pt-2 border-t border-[#E8E2D5]">
                <h4 className="text-xs font-bold text-[#4A3525] uppercase tracking-wider">
                  Keunggulan Produk Ini
                </h4>
                <ul className="space-y-1.5">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#5A524A]">
                      <Check className="w-3.5 h-3.5 text-[#2E6B47] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                <button
                  id="modal-wa-order-btn"
                  onClick={handleWhatsAppOrder}
                  className="w-full sm:flex-1 bg-[#2E6B47] hover:bg-[#255739] text-white py-3.5 px-6 rounded-full text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>Pesan via WhatsApp Sekarang</span>
                </button>

                {onOpenCalculatorForProduct && (
                  <button
                    id="modal-calc-btn"
                    onClick={() => {
                      onClose();
                      onOpenCalculatorForProduct(product);
                    }}
                    className="w-full sm:w-auto bg-[#F4F0E8] hover:bg-[#EAE2D4] text-[#4A3525] border border-[#DDD3C2] py-3.5 px-5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5 text-[#8C6D52]" />
                    <span>Hitung Custom</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
