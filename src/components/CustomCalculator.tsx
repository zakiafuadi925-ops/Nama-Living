import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  Ruler, 
  Trees, 
  Sparkles, 
  MessageCircle, 
  Calculator, 
  CheckCircle2, 
  Layers, 
  Info,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Package
} from 'lucide-react';
import { WoodType, FinishingType } from '../types';
import { formatCurrencyIDR } from '../utils/storage';

interface CustomCalculatorProps {
  onOpenWhatsApp: (customMsg?: string) => void;
  prefillItemType?: string;
}

type FurnitureTypeKey = 
  | 'meja_makan' 
  | 'coffee_table' 
  | 'credenza_tv' 
  | 'kitchen_set' 
  | 'lemari_wardrobe' 
  | 'sofa_custom' 
  | 'tatami_bed';

interface FurnitureTypeConfig {
  id: FurnitureTypeKey;
  name: string;
  categoryName: string;
  defaultDims: { length: number; width: number; height: number };
  limits: {
    length: { min: number; max: number; step: number };
    width: { min: number; max: number; step: number };
    height: { min: number; max: number; step: number };
  };
  basePrice: number; // base cost index
  unitName: string;
  desc: string;
}

const FURNITURE_TYPES: FurnitureTypeConfig[] = [
  {
    id: 'meja_makan',
    name: 'Meja Makan Solid (Dining Table)',
    categoryName: 'Dining Room',
    defaultDims: { length: 180, width: 90, height: 75 },
    limits: {
      length: { min: 120, max: 320, step: 10 },
      width: { min: 70, max: 120, step: 5 },
      height: { min: 70, max: 80, step: 1 },
    },
    basePrice: 4200000,
    unitName: 'Unit Meja',
    desc: 'Meja makan kayu solid dengan pinggiran rounded atau live-edge alami.',
  },
  {
    id: 'coffee_table',
    name: 'Meja Kopi / Coffee Table Organik',
    categoryName: 'Living Room',
    defaultDims: { length: 110, width: 60, height: 40 },
    limits: {
      length: { min: 60, max: 160, step: 5 },
      width: { min: 40, max: 90, step: 5 },
      height: { min: 30, max: 55, step: 1 },
    },
    basePrice: 2100000,
    unitName: 'Unit Meja Kopi',
    desc: 'Meja tamu bertinggi rendah dengan lekukan organik khas Japandi.',
  },
  {
    id: 'credenza_tv',
    name: 'Credenza TV / Bufet Kisi-Kisi',
    categoryName: 'Living Room',
    defaultDims: { length: 180, width: 45, height: 50 },
    limits: {
      length: { min: 120, max: 260, step: 10 },
      width: { min: 35, max: 60, step: 5 },
      height: { min: 40, max: 85, step: 5 },
    },
    basePrice: 3800000,
    unitName: 'Unit Credenza',
    desc: 'Kabinet media dengan pintu geser kisi-kisi atau laci soft-close.',
  },
  {
    id: 'kitchen_set',
    name: 'Kitchen Set / Island Counter',
    categoryName: 'Kitchen & Dining',
    defaultDims: { length: 240, width: 60, height: 85 },
    limits: {
      length: { min: 150, max: 500, step: 10 },
      width: { min: 50, max: 90, step: 5 },
      height: { min: 80, max: 95, step: 1 },
    },
    basePrice: 8500000,
    unitName: 'Modul Kitchen',
    desc: 'Kabinet dapur bawah/atas atau island bar dengan top table pilihan.',
  },
  {
    id: 'lemari_wardrobe',
    name: 'Lemari Pakaian / Built-in Wardrobe',
    categoryName: 'Bedroom',
    defaultDims: { length: 160, width: 60, height: 210 },
    limits: {
      length: { min: 100, max: 320, step: 10 },
      width: { min: 50, max: 70, step: 5 },
      height: { min: 180, max: 280, step: 10 },
    },
    basePrice: 6200000,
    unitName: 'Unit Wardrobe',
    desc: 'Lemari pakaian pintu swing/sliding dengan sekat fungsional.',
  },
  {
    id: 'tatami_bed',
    name: 'Tempat Tidur Tatami Platform (Low Bed)',
    categoryName: 'Bedroom',
    defaultDims: { length: 200, width: 180, height: 35 },
    limits: {
      length: { min: 180, max: 220, step: 10 },
      width: { min: 120, max: 210, step: 10 },
      height: { min: 25, max: 50, step: 5 },
    },
    basePrice: 5200000,
    unitName: 'Dipan Tempat Tidur',
    desc: 'Rangka tempat tidur rendah ala Jepang dengan headboard kayu & laci.',
  },
  {
    id: 'sofa_custom',
    name: 'Sofa Kayu Japandi (Low Profile)',
    categoryName: 'Living Room',
    defaultDims: { length: 200, width: 85, height: 75 },
    limits: {
      length: { min: 140, max: 300, step: 10 },
      width: { min: 75, max: 100, step: 5 },
      height: { min: 65, max: 85, step: 5 },
    },
    basePrice: 7200000,
    unitName: 'Sofa Set',
    desc: 'Rangka kayu solid terekspos dengan dudukan busa density tinggi.',
  },
];

export const CustomCalculator: React.FC<CustomCalculatorProps> = ({
  onOpenWhatsApp,
  prefillItemType,
}) => {
  const [selectedTypeKey, setSelectedTypeKey] = useState<FurnitureTypeKey>('meja_makan');
  
  const currentConfig = useMemo(() => {
    return FURNITURE_TYPES.find((f) => f.id === selectedTypeKey) || FURNITURE_TYPES[0];
  }, [selectedTypeKey]);

  // Dimension States
  const [lengthCm, setLengthCm] = useState(currentConfig.defaultDims.length);
  const [widthCm, setWidthCm] = useState(currentConfig.defaultDims.width);
  const [heightCm, setHeightCm] = useState(currentConfig.defaultDims.height);

  // Material & Finishes
  const [selectedWood, setSelectedWood] = useState<WoodType>('Kayu Jati Solid TPK');
  const [selectedFinishing, setSelectedFinishing] = useState<FinishingType>('Natural Doff Matte (Water-based)');
  const [hardwareTier, setHardwareTier] = useState<'Standard Soft-Close' | 'Blum Premium Austria' | 'Solid Brass Hardware'>('Standard Soft-Close');
  const [includeInstallation, setIncludeInstallation] = useState<boolean>(true);
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  // Handle Type Change
  const handleTypeChange = (key: FurnitureTypeKey) => {
    setSelectedTypeKey(key);
    const target = FURNITURE_TYPES.find((f) => f.id === key);
    if (target) {
      setLengthCm(target.defaultDims.length);
      setWidthCm(target.defaultDims.width);
      setHeightCm(target.defaultDims.height);
    }
  };

  // Pricing Calculation Logic
  const calculationResult = useMemo(() => {
    const base = currentConfig.basePrice;

    // Dimension multiplier relative to default volume
    const defaultVol = currentConfig.defaultDims.length * currentConfig.defaultDims.width * currentConfig.defaultDims.height;
    const currentVol = lengthCm * widthCm * heightCm;
    const volumeRatio = Math.max(0.65, Math.min(2.5, currentVol / defaultVol));

    // Wood Multiplier
    let woodMultiplier = 1.0;
    if (selectedWood === 'Kayu Jati Solid TPK') woodMultiplier = 1.45;
    else if (selectedWood === 'Kayu Oak Jepang') woodMultiplier = 1.35;
    else if (selectedWood === 'Kayu Sungkai Natural') woodMultiplier = 1.15;
    else if (selectedWood === 'Kayu Mindi Eksotis') woodMultiplier = 1.05;
    else if (selectedWood === 'Multiplex + HPL Premium') woodMultiplier = 0.90;

    // Finishing Addition
    let finishAdder = 0;
    if (selectedFinishing === 'Organic Hardwax Oil') finishAdder = 350000;
    if (selectedFinishing === 'Bleached Japandi Light') finishAdder = 250000;
    if (selectedFinishing === 'Natural Doff Matte (Water-based)') finishAdder = 150000;

    // Hardware Addition
    let hardwareAdder = 0;
    if (hardwareTier === 'Blum Premium Austria') hardwareAdder = 850000;
    if (hardwareTier === 'Solid Brass Hardware') hardwareAdder = 500000;

    // Installation Adder
    const installAdder = includeInstallation ? 300000 : 0;

    const calculatedBase = (base * volumeRatio * woodMultiplier) + finishAdder + hardwareAdder + installAdder;
    
    // Range: Min and Max to give realistic estimation
    const minPrice = Math.round((calculatedBase * 0.95) / 50000) * 50000;
    const maxPrice = Math.round((calculatedBase * 1.10) / 50000) * 50000;

    return {
      minPrice,
      maxPrice,
      estimatedDays: selectedWood === 'Kayu Jati Solid TPK' ? '14 - 21 Hari' : '10 - 16 Hari',
      volumeM3: (currentVol / 1000000).toFixed(2),
    };
  }, [currentConfig, lengthCm, widthCm, heightCm, selectedWood, selectedFinishing, hardwareTier, includeInstallation]);

  const handleSendToWhatsApp = () => {
    let msg = `Halo NAMA LIVING, saya menggunakan *Kalkulator Estimasi Custom Mebel* dengan rincian berikut:\n\n`;
    msg += `📋 *Rincian Pesanan Custom:*\n`;
    msg += `• Jenis: ${currentConfig.name}\n`;
    msg += `• Dimensi: P ${lengthCm} x L ${widthCm} x T ${heightCm} cm\n`;
    msg += `• Jenis Kayu: ${selectedWood}\n`;
    msg += `• Finishing: ${selectedFinishing}\n`;
    msg += `• Hardware/Fittings: ${hardwareTier}\n`;
    msg += `• Termasuk Jasa Pengiriman & Instalasi: ${includeInstallation ? 'Ya' : 'Tidak'}\n`;
    msg += `• *Estimasi Biaya:* ${formatCurrencyIDR(calculationResult.minPrice)} – ${formatCurrencyIDR(calculationResult.maxPrice)}\n`;
    msg += `• Estimasi Pengerjaan: ${calculationResult.estimatedDays}\n`;
    
    if (additionalNotes.trim()) {
      msg += `• Catatan Khusus: ${additionalNotes.trim()}\n`;
    }
    msg += `\nBisakah saya mengirimkan foto denah/ruangan untuk mendiskusikan detail desain ini?`;

    onOpenWhatsApp(msg);
  };

  return (
    <section id="calculator-section" className="py-16 md:py-24 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBE4D6] border border-[#DDD3C2] text-[#4A3525] text-xs font-semibold tracking-wider uppercase mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#8C6D52]" />
            <span>Kalkulator Custom Furniture</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F1D1A] mb-4">
            Simulasi Biaya & Ukuran Sesuai Kebutuhan Ruang Anda
          </h2>
          <p className="text-[#5A524A] text-sm sm:text-base leading-relaxed">
            Dapatkan estimasi harga transparan dalam hitungan detik. Pilih jenis furnitur, tentukan dimensi presisi, material kayu solid, dan opsi finishing favorit Anda.
          </p>
        </div>

        {/* Interactive Calculator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs space-y-8">
            {/* Step 1: Select Furniture Type */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#4A3525] uppercase tracking-wider">
                1. Pilih Tipe Furnitur:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {FURNITURE_TYPES.map((type) => {
                  const isSelected = selectedTypeKey === type.id;
                  return (
                    <button
                      key={type.id}
                      id={`calc-type-${type.id}`}
                      onClick={() => handleTypeChange(type.id)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                        isSelected
                          ? 'border-[#4A3525] bg-[#4A3525] text-white shadow-xs'
                          : 'border-[#E0D7C8] bg-[#FBF9F5] text-[#2C2723] hover:bg-[#F4F0E8]'
                      }`}
                    >
                      <span className="line-clamp-2">{type.name}</span>
                      <span className={`text-[10px] font-normal ${isSelected ? 'text-[#D9C3B0]' : 'text-[#8C7E70]'}`}>
                        {type.categoryName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Dimensions Slider & Precise Inputs */}
            <div className="space-y-5 pt-4 border-t border-[#E8E2D5]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#4A3525] uppercase tracking-wider flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-[#8C6D52]" />
                  <span>2. Tentukan Dimensi Presisi (cm)</span>
                </label>
                <span className="text-[11px] text-[#6E645A]">
                  Volume: ~{calculationResult.volumeM3} m³
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Length */}
                <div className="bg-[#FBF9F5] p-3.5 rounded-xl border border-[#E8E2D5] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#5A524A]">Panjang (P)</span>
                    <span className="font-bold text-[#2C2723] bg-white px-2 py-0.5 rounded-md border border-[#E0D7C8]">
                      {lengthCm} cm
                    </span>
                  </div>
                  <input
                    type="range"
                    min={currentConfig.limits.length.min}
                    max={currentConfig.limits.length.max}
                    step={currentConfig.limits.length.step}
                    value={lengthCm}
                    onChange={(e) => setLengthCm(Number(e.target.value))}
                    className="w-full accent-[#4A3525] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#8C7E70]">
                    <span>{currentConfig.limits.length.min}cm</span>
                    <span>{currentConfig.limits.length.max}cm</span>
                  </div>
                </div>

                {/* Width */}
                <div className="bg-[#FBF9F5] p-3.5 rounded-xl border border-[#E8E2D5] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#5A524A]">Lebar / Kedalaman (L)</span>
                    <span className="font-bold text-[#2C2723] bg-white px-2 py-0.5 rounded-md border border-[#E0D7C8]">
                      {widthCm} cm
                    </span>
                  </div>
                  <input
                    type="range"
                    min={currentConfig.limits.width.min}
                    max={currentConfig.limits.width.max}
                    step={currentConfig.limits.width.step}
                    value={widthCm}
                    onChange={(e) => setWidthCm(Number(e.target.value))}
                    className="w-full accent-[#4A3525] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#8C7E70]">
                    <span>{currentConfig.limits.width.min}cm</span>
                    <span>{currentConfig.limits.width.max}cm</span>
                  </div>
                </div>

                {/* Height */}
                <div className="bg-[#FBF9F5] p-3.5 rounded-xl border border-[#E8E2D5] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#5A524A]">Tinggi (T)</span>
                    <span className="font-bold text-[#2C2723] bg-white px-2 py-0.5 rounded-md border border-[#E0D7C8]">
                      {heightCm} cm
                    </span>
                  </div>
                  <input
                    type="range"
                    min={currentConfig.limits.height.min}
                    max={currentConfig.limits.height.max}
                    step={currentConfig.limits.height.step}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full accent-[#4A3525] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#8C7E70]">
                    <span>{currentConfig.limits.height.min}cm</span>
                    <span>{currentConfig.limits.height.max}cm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Wood Material Choice */}
            <div className="space-y-3 pt-4 border-t border-[#E8E2D5]">
              <label className="block text-xs font-bold text-[#4A3525] uppercase tracking-wider">
                3. Pilih Jenis Kayu Solid:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { name: 'Kayu Jati Solid TPK', badge: 'Paling Kokoh & Awet', rate: 'Grade A Perhutani' },
                  { name: 'Kayu Sungkai Natural', badge: 'Warna Terang Hangat', rate: 'Favorit Japandi' },
                  { name: 'Kayu Oak Jepang', badge: 'Serat Bertekstur', rate: 'Premium Finish' },
                  { name: 'Kayu Mindi Eksotis', badge: 'Serat Unik Artistik', rate: 'Medium Solid' },
                  { name: 'Multiplex + HPL Premium', badge: 'Ekonomis & Tahan Lembap', rate: 'Struktur Kabinet' },
                ].map((wood) => {
                  const isSelected = selectedWood === wood.name;
                  return (
                    <button
                      key={wood.name}
                      onClick={() => setSelectedWood(wood.name as WoodType)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#4A3525] bg-[#4A3525] text-white shadow-xs'
                          : 'border-[#E0D7C8] bg-white text-[#2C2723] hover:bg-[#FBF9F5]'
                      }`}
                    >
                      <div>
                        <span className="font-bold block">{wood.name}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-[#D9C3B0]' : 'text-[#6E645A]'}`}>
                          {wood.badge}
                        </span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                        isSelected ? 'bg-[#8C6D52] text-white' : 'bg-[#F4F0E8] text-[#5A524A]'
                      }`}>
                        {wood.rate}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Finishing & Hardware */}
            <div className="space-y-4 pt-4 border-t border-[#E8E2D5]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Finishing */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#4A3525] uppercase tracking-wider">
                    4. Opsi Finishing:
                  </label>
                  <select
                    value={selectedFinishing}
                    onChange={(e) => setSelectedFinishing(e.target.value as FinishingType)}
                    className="w-full px-3 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723] font-medium focus:outline-hidden focus:border-[#4A3525] cursor-pointer"
                  >
                    <option value="Natural Doff Matte (Water-based)">Natural Doff Matte (Water-based Eco)</option>
                    <option value="Walnut Dark Stain">Walnut Dark Stain (Cokelat Hangat)</option>
                    <option value="Bleached Japandi Light">Bleached Japandi Light (Nuansa Terang)</option>
                    <option value="Organic Hardwax Oil">Organic Hardwax Oil (Pori Kayu Bernapas)</option>
                    <option value="Smoked Charcoal Oak">Smoked Charcoal Oak (Gelap Elegan)</option>
                  </select>
                </div>

                {/* Hardware */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#4A3525] uppercase tracking-wider">
                    5. Fitting & Hardware:
                  </label>
                  <select
                    value={hardwareTier}
                    onChange={(e) => setHardwareTier(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723] font-medium focus:outline-hidden focus:border-[#4A3525] cursor-pointer"
                  >
                    <option value="Standard Soft-Close">Standard Soft-Close (Slow Motion)</option>
                    <option value="Blum Premium Austria">Blum Premium Austria (Garansi 10 Th)</option>
                    <option value="Solid Brass Hardware">Solid Brass Hardware (Handle Kuningan)</option>
                  </select>
                </div>
              </div>

              {/* Delivery & Installation Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-[#FBF9F5] rounded-xl border border-[#E8E2D5]">
                <div>
                  <span className="text-xs font-bold text-[#2C2723] block">Termasuk Pengiriman & Instalasi di Lokasi</span>
                  <span className="text-[11px] text-[#6E645A]">Tim kami akan merakit dan menempatkan mebel dengan rapi.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeInstallation}
                    onChange={(e) => setIncludeInstallation(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#D9C3B0] peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#DDD3C2] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A3525]"></div>
                </label>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#5A524A] mb-1.5">
                  Catatan Tambahan / Kebutuhan Khusus:
                </label>
                <input
                  type="text"
                  placeholder="Misal: Disesuaikan dengan celah dinding 185cm, warna senada lantai kayu..."
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723] focus:outline-hidden focus:border-[#4A3525]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Price Summary Card */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="bg-[#4A3525] text-[#FBF9F5] rounded-2xl p-6 sm:p-7 border border-[#342418] shadow-xl space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#785338] pb-4">
                <div>
                  <span className="text-[10px] font-bold text-[#D9C3B0] uppercase tracking-widest block">
                    Hasil Kalkulasi Real-Time
                  </span>
                  <h3 className="font-serif-display text-xl font-bold">
                    {currentConfig.name}
                  </h3>
                </div>
                <button
                  onClick={() => handleTypeChange('meja_makan')}
                  className="p-1.5 rounded-lg bg-[#342418] text-[#D9C3B0] hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
                  title="Reset kalkulasi"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>

              {/* Live Spec Summary */}
              <div className="space-y-2 text-xs text-[#E5DFD3]">
                <div className="flex justify-between py-1 border-b border-[#604430]">
                  <span className="text-[#C4B5A5]">Ukuran Custom:</span>
                  <span className="font-bold text-white">{lengthCm} x {widthCm} x {heightCm} cm</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#604430]">
                  <span className="text-[#C4B5A5]">Bahan Kayu:</span>
                  <span className="font-bold text-white truncate max-w-[170px]">{selectedWood}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#604430]">
                  <span className="text-[#C4B5A5]">Finishing:</span>
                  <span className="font-bold text-white truncate max-w-[170px]">{selectedFinishing}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#604430]">
                  <span className="text-[#C4B5A5]">Fitting Hardware:</span>
                  <span className="font-bold text-white truncate max-w-[170px]">{hardwareTier}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#604430]">
                  <span className="text-[#C4B5A5]">Estimasi Pengerjaan:</span>
                  <span className="font-bold text-[#D9C3B0]">{calculationResult.estimatedDays}</span>
                </div>
              </div>

              {/* Price Calculation Display */}
              <div className="bg-[#342418] p-4 rounded-xl border border-[#785338]/50 text-center space-y-1">
                <span className="text-[10px] font-bold text-[#D9C3B0] uppercase tracking-wider block">
                  Rentang Estimasi Biaya (IDR)
                </span>
                <div className="text-xl sm:text-2xl font-bold text-[#FBF9F5] tracking-tight">
                  {formatCurrencyIDR(calculationResult.minPrice)} – {formatCurrencyIDR(calculationResult.maxPrice)}
                </div>
                <p className="text-[10px] text-[#A08E7E] italic pt-1">
                  *Harga final dapat disesuaikan setelah verifikasi detail denah & spesifikasi sambungan kayu.
                </p>
              </div>

              {/* WhatsApp Action Button */}
              <button
                id="calc-send-wa-btn"
                onClick={handleSendToWhatsApp}
                className="w-full bg-[#2E6B47] hover:bg-[#255739] text-white py-4 px-6 rounded-full text-xs sm:text-sm font-bold tracking-wide flex items-center justify-center gap-2.5 shadow-lg transition-all cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Konsultasikan Hasil Estimasi ke WhatsApp</span>
              </button>
            </div>

            {/* Quality Guarantees */}
            <div className="bg-[#F4F0E8] p-4 rounded-xl border border-[#E8E2D5] space-y-2 text-xs text-[#5A524A]">
              <div className="flex items-center gap-2 text-[#4A3525] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#8C6D52]" />
                <span>Jaminan Transparansi & Kualitas</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Setiap pemesanan custom mendapatkan gambar kerja 3D, pemilihan slab kayu langsung dari workshop, dan garansi konstruksi 5 tahun.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
