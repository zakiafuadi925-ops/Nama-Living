import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Eye, 
  MessageCircle, 
  Ruler, 
  Sparkles,
  Check,
  Tag,
  ArrowUpDown
} from 'lucide-react';
import { Product, ProductCategory, WoodType } from '../types';
import { formatCurrencyIDR } from '../utils/storage';
import { ProductDetailModal } from './ProductDetailModal';

interface ProductCatalogProps {
  products: Product[];
  onOpenWhatsApp: (customMsg?: string) => void;
  onOpenCalculatorForProduct?: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onOpenWhatsApp,
  onOpenCalculatorForProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWoodFilter, setSelectedWoodFilter] = useState<string>('semua');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const categories: { id: ProductCategory; label: string; count?: number }[] = [
    { id: 'semua', label: 'Semua Produk' },
    { id: 'meja', label: 'Meja Makan & Kopi' },
    { id: 'kursi', label: 'Kursi & Armchair' },
    { id: 'sofa', label: 'Sofa Japandi' },
    { id: 'storage', label: 'Lemari & Credenza' },
    { id: 'kitchen', label: 'Kitchen & Island' },
    { id: 'dekorasi', label: 'Dekorasi & Lampu' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesCat = selectedCategory === 'semua' || item.category === selectedCategory;
        const matchesSearch = 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.materialWood.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesWood = selectedWoodFilter === 'semua' || item.materialWood === selectedWoodFilter;
        return matchesCat && matchesSearch && matchesWood;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name') return a.title.localeCompare(b.title);
        // default featured
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, selectedWoodFilter, sortBy]);

  const handleQuickWhatsAppOrder = (e: React.MouseEvent, item: Product) => {
    e.stopPropagation();
    const msg = `Halo NAMA LIVING, saya tertarik dengan produk *${item.title}* (${formatCurrencyIDR(item.price)}). Apakah produk ini ready stock atau PO?`;
    onOpenWhatsApp(msg);
  };

  return (
    <section id="catalog-section" className="py-16 md:py-24 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBE4D6] border border-[#DDD3C2] text-[#4A3525] text-xs font-semibold tracking-wider uppercase mb-3">
            <Tag className="w-3.5 h-3.5 text-[#8C6D52]" />
            <span>Katalog Furnitur Japandi</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F1D1A] mb-4">
            Karya Kayu Solid untuk Setiap Sudut Ruang
          </h2>
          <p className="text-[#5A524A] text-sm sm:text-base leading-relaxed">
            Dibuat secara presisi oleh pengrajin kayu berpengalaman. Setiap produk mengedepankan proporsi ergonomis, kehangatan serat alami, dan ketahanan konstruksi jangka panjang.
          </p>
        </div>

        {/* Filters and Search Toolbar */}
        <div className="space-y-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-btn-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#4A3525] text-[#FBF9F5] shadow-xs'
                      : 'bg-[#F4F0E8] text-[#5A524A] hover:text-[#2C2723] hover:bg-[#EAE2D4] border border-[#E8E2D5]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search, Material Filter & Sort Control Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-[#F4F0E8] p-3.5 rounded-2xl border border-[#E8E2D5]">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-[#8C7E70] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="catalog-search-input"
                type="text"
                placeholder="Cari meja makan, sofa, kayu jati, sungkai..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-[#DDD3C2] text-xs text-[#2C2723] placeholder-[#9D8E80] focus:outline-hidden focus:border-[#4A3525]"
              />
            </div>

            {/* Wood Type Filter */}
            <div className="sm:col-span-3">
              <select
                id="catalog-wood-filter"
                value={selectedWoodFilter}
                onChange={(e) => setSelectedWoodFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white rounded-xl border border-[#DDD3C2] text-xs text-[#4A3525] font-medium focus:outline-hidden focus:border-[#4A3525] cursor-pointer"
              >
                <option value="semua">Semua Bahan Kayu</option>
                <option value="Kayu Jati Solid TPK">Kayu Jati Solid TPK</option>
                <option value="Kayu Sungkai Natural">Kayu Sungkai Natural</option>
                <option value="Kayu Oak Jepang">Kayu Oak Jepang</option>
                <option value="Kayu Mindi Eksotis">Kayu Mindi Eksotis</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="sm:col-span-3">
              <select
                id="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 bg-white rounded-xl border border-[#DDD3C2] text-xs text-[#4A3525] font-medium focus:outline-hidden focus:border-[#4A3525] cursor-pointer"
              >
                <option value="featured">Urutan: Produk Pilihan</option>
                <option value="price-low">Harga: Rendah ke Tinggi</option>
                <option value="price-high">Harga: Tinggi ke Rendah</option>
                <option value="name">Nama: A - Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#F4F0E8] rounded-2xl border border-dashed border-[#DDD3C2]">
            <p className="text-[#5A524A] text-sm font-medium mb-3">
              Tidak ada produk yang cocok dengan kata kunci atau filter yang dipilih.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('semua');
                setSearchQuery('');
                setSelectedWoodFilter('semua');
              }}
              className="text-xs bg-[#4A3525] text-white px-4 py-2 rounded-full cursor-pointer"
            >
              Reset Filter Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                onClick={() => setActiveModalProduct(product)}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E8E2D5] shadow-xs hover:shadow-xl hover:border-[#8C6D52] transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#F4F0E8]">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    {product.isFeatured && (
                      <span className="bg-[#4A3525] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Unggulan
                      </span>
                    )}
                    <span className="bg-white/90 backdrop-blur-xs text-[#4A3525] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-black/5">
                      {product.leadTime}
                    </span>
                  </div>

                  {/* Hover Quick Action Layer */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-4">
                    <span className="bg-white text-[#2C2723] px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Detail</span>
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Material & Dimension Tag */}
                    <div className="flex items-center justify-between text-[11px] text-[#8C6D52] font-medium mb-1">
                      <span className="truncate max-w-[150px]">{product.materialWood}</span>
                      <span>{product.dimensions.length}x{product.dimensions.width}x{product.dimensions.height} cm</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif-display text-lg font-bold text-[#1F1D1A] group-hover:text-[#8C6D52] transition-colors line-clamp-1">
                      {product.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-[#5A524A] line-clamp-2 mt-1 font-light leading-relaxed">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] text-[#8C7E70] uppercase tracking-wider">Estimasi Harga</span>
                      <span className="text-sm sm:text-base font-bold text-[#4A3525]">
                        {formatCurrencyIDR(product.price)}
                      </span>
                    </div>

                    <button
                      id={`card-wa-btn-${product.id}`}
                      onClick={(e) => handleQuickWhatsAppOrder(e, product)}
                      className="p-2 rounded-full bg-[#F4F0E8] hover:bg-[#2E6B47] text-[#4A3525] hover:text-white transition-colors cursor-pointer"
                      title="Pesan via WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <ProductDetailModal
          product={activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
          onOpenWhatsApp={onOpenWhatsApp}
          onOpenCalculatorForProduct={onOpenCalculatorForProduct}
        />
      )}
    </section>
  );
};
