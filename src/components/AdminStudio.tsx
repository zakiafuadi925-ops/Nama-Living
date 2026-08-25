import React, { useState } from 'react';
import { 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Check, 
  X, 
  Eye, 
  Image as ImageIcon,
  FolderOpen,
  Compass,
  Package,
  Phone,
  Layers,
  AlertCircle
} from 'lucide-react';
import { Product, Project, ContactInfo, WoodType, FinishingType, StockStatus, ProductCategory } from '../types';
import { formatCurrencyIDR } from '../utils/storage';

interface AdminStudioProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  contactInfo: ContactInfo;
  setContactInfo: (contact: ContactInfo) => void;
  onResetDefaults: () => void;
}

export const AdminStudio: React.FC<AdminStudioProps> = ({
  products,
  setProducts,
  projects,
  setProjects,
  contactInfo,
  setContactInfo,
  onResetDefaults,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'products' | 'projects' | 'contact' | 'backup'>('products');
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Product Form State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    title: '',
    category: 'meja',
    price: 3500000,
    dimensions: { length: 180, width: 80, height: 75 },
    materialWood: 'Kayu Jati Solid TPK',
    finishing: 'Natural Doff Matte (Water-based)',
    fabricOrHardware: '',
    images: ['https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80'],
    shortDesc: '',
    description: '',
    features: ['100% Kayu Solid Oven Kering', 'Finishing Water-based ramah lingkungan'],
    leadTime: 'Pre-Order (14-21 Hari)',
    isFeatured: false,
    inStock: true,
  });

  // Project Form State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    category: 'Residential Villa',
    location: 'Jakarta Selatan',
    year: '2024',
    clientName: '',
    areaSqM: 120,
    durationWeeks: 6,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
    shortDesc: '',
    story: '',
    concept: 'Japandi Warm Wabi-Sabi',
    materialsList: ['Kayu Jati Solid TPK', 'Lantai Microcement Warm Beige', 'Linen Belgia'],
    furnitureItemsIncluded: ['Custom Dining Set', 'Kitchen Island Bar', 'Low Bed Tatami'],
  });

  // Contact Form State
  const [contactForm, setContactForm] = useState<ContactInfo>(contactInfo);

  const showFeedback = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedbackMsg({ type, text });
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  // Helper for image upload to base64 data url
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isProject: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      if (isProject) {
        setProjectForm((prev) => ({ ...prev, coverImage: base64 }));
      } else {
        setProductForm((prev) => ({
          ...prev,
          images: [base64, ...(prev.images?.slice(1) || [])],
        }));
      }
      showFeedback('Foto berhasil diunggah!');
    };
    reader.readAsDataURL(file);
  };

  // PRODUCT ACTIONS
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title || !productForm.price) {
      showFeedback('Judul dan harga produk wajib diisi!', 'error');
      return;
    }

    if (editingProduct) {
      // Update existing
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...editingProduct,
              ...productForm,
              title: productForm.title!,
              category: productForm.category as any,
              price: Number(productForm.price),
              dimensions: productForm.dimensions || editingProduct.dimensions,
              materialWood: productForm.materialWood as WoodType,
              finishing: productForm.finishing as FinishingType,
              images: productForm.images?.length ? productForm.images : editingProduct.images,
              shortDesc: productForm.shortDesc || '',
              description: productForm.description || '',
              features: productForm.features || [],
              leadTime: productForm.leadTime as StockStatus,
              isFeatured: !!productForm.isFeatured,
              inStock: productForm.inStock !== false,
            }
          : p
      );
      setProducts(updated);
      showFeedback(`Produk "${productForm.title}" berhasil diperbarui!`);
      setEditingProduct(null);
    } else {
      // Create new
      const newProd: Product = {
        id: `prod-${Date.now().toString().slice(-4)}`,
        title: productForm.title!,
        slug: productForm.title!.toLowerCase().replace(/\s+/g, '-'),
        category: (productForm.category || 'meja') as any,
        price: Number(productForm.price),
        dimensions: productForm.dimensions || { length: 150, width: 80, height: 75 },
        materialWood: (productForm.materialWood || 'Kayu Jati Solid TPK') as WoodType,
        finishing: (productForm.finishing || 'Natural Doff Matte (Water-based)') as FinishingType,
        fabricOrHardware: productForm.fabricOrHardware || '',
        images: productForm.images?.length ? productForm.images : ['https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80'],
        shortDesc: productForm.shortDesc || 'Mebel kayu solid buatan artisan NAMA LIVING.',
        description: productForm.description || productForm.shortDesc || '',
        features: productForm.features || ['100% Kayu Solid Oven Kering', 'Garansi konstruksi 5 tahun'],
        leadTime: (productForm.leadTime || 'Pre-Order (14-21 Hari)') as StockStatus,
        isFeatured: !!productForm.isFeatured,
        inStock: true,
      };
      setProducts([newProd, ...products]);
      showFeedback(`Produk baru "${newProd.title}" berhasil ditambahkan!`);
      setIsAddingProduct(false);
    }
  };

  const handleDeleteProduct = (id: string, title: string) => {
    if (window.confirm(`Hapus produk "${title}" dari katalog?`)) {
      setProducts(products.filter((p) => p.id !== id));
      showFeedback(`Produk "${title}" telah dihapus.`);
    }
  };

  // PROJECT ACTIONS
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.location) {
      showFeedback('Judul dan lokasi proyek wajib diisi!', 'error');
      return;
    }

    if (editingProject) {
      const updated = projects.map((p) =>
        p.id === editingProject.id
          ? {
              ...editingProject,
              ...projectForm,
              title: projectForm.title!,
              category: projectForm.category as any,
              location: projectForm.location!,
              year: projectForm.year || '2024',
              areaSqM: Number(projectForm.areaSqM) || 100,
              durationWeeks: Number(projectForm.durationWeeks) || 4,
              coverImage: projectForm.coverImage || editingProject.coverImage,
              galleryImages: projectForm.galleryImages?.length ? projectForm.galleryImages : editingProject.galleryImages,
              shortDesc: projectForm.shortDesc || '',
              story: projectForm.story || '',
              concept: projectForm.concept || 'Japandi Interior',
              materialsList: projectForm.materialsList || [],
              furnitureItemsIncluded: projectForm.furnitureItemsIncluded || [],
            }
          : p
      );
      setProjects(updated);
      showFeedback(`Proyek "${projectForm.title}" berhasil diperbarui!`);
      setEditingProject(null);
    } else {
      const newProj: Project = {
        id: `proj-${Date.now().toString().slice(-4)}`,
        title: projectForm.title!,
        slug: projectForm.title!.toLowerCase().replace(/\s+/g, '-'),
        category: (projectForm.category || 'Residential Villa') as any,
        location: projectForm.location!,
        year: projectForm.year || '2024',
        clientName: projectForm.clientName || 'Private Client',
        areaSqM: Number(projectForm.areaSqM) || 100,
        durationWeeks: Number(projectForm.durationWeeks) || 6,
        coverImage: projectForm.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
        galleryImages: projectForm.galleryImages || [projectForm.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
        shortDesc: projectForm.shortDesc || 'Dokumentasi proyek interior ruang Japandi NAMA LIVING.',
        story: projectForm.story || projectForm.shortDesc || '',
        concept: projectForm.concept || 'Japandi Warm Wabi-Sabi',
        materialsList: projectForm.materialsList || ['Kayu Jati Solid TPK', 'Microcement'],
        furnitureItemsIncluded: projectForm.furnitureItemsIncluded || ['Custom Built-in Furniture'],
      };
      setProjects([newProj, ...projects]);
      showFeedback(`Proyek "${newProj.title}" berhasil ditambahkan!`);
      setIsAddingProject(false);
    }
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (window.confirm(`Hapus proyek "${title}" dari portofolio?`)) {
      setProjects(projects.filter((p) => p.id !== id));
      showFeedback(`Proyek "${title}" telah dihapus.`);
    }
  };

  // CONTACT UPDATE
  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactInfo(contactForm);
    showFeedback('Informasi kontak & lokasi studio berhasil diperbarui!');
  };

  // BACKUP & EXPORT/IMPORT
  const handleExportData = () => {
    const backupObj = {
      brand: contactInfo,
      products,
      projects,
      exportDate: new Date().toISOString(),
    };
    const jsonStr = JSON.stringify(backupObj, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `namaliving_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showFeedback('File cadangan JSON berhasil diunduh!');
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.products && Array.isArray(parsed.products)) {
          setProducts(parsed.products);
        }
        if (parsed.projects && Array.isArray(parsed.projects)) {
          setProjects(parsed.projects);
        }
        if (parsed.brand) {
          setContactInfo(parsed.brand);
          setContactForm(parsed.brand);
        }
        showFeedback('Data portofolio & katalog berhasil diimpor!');
      } catch (err) {
        showFeedback('Format file JSON tidak valid.', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <section id="admin-studio-section" className="py-16 md:py-24 bg-[#F4F0E8]/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-[#E8E2D5] shadow-xs">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A3525] text-white text-[11px] font-bold uppercase tracking-wider mb-2">
              <Settings className="w-3.5 h-3.5" />
              <span>Studio Content Manager (CMS)</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F1D1A]">
              Panel Manajemen Katalog & Portofolio
            </h2>
            <p className="text-xs text-[#6E645A]">
              Kelola produk mebel, proyek interior, foto, dan informasi kontak studio secara instan tanpa perlu database eksternal.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="admin-reset-data-btn"
              onClick={() => {
                if (window.confirm('Kembalikan semua data katalog & portofolio ke contoh bawaan awal?')) {
                  onResetDefaults();
                  showFeedback('Data telah direset ke setelan awal.');
                }
              }}
              className="px-4 py-2 bg-[#F4F0E8] hover:bg-[#EAE2D4] text-[#4A3525] border border-[#DDD3C2] rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data Default</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert Banner */}
        {feedbackMsg && (
          <div
            className={`p-4 rounded-xl mb-6 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200 ${
              feedbackMsg.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {feedbackMsg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{feedbackMsg.text}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#DDD3C2] pb-3 mb-8 overflow-x-auto">
          {[
            { id: 'products', label: `Katalog Produk (${products.length})`, icon: Package },
            { id: 'projects', label: `Proyek Interior (${projects.length})`, icon: Compass },
            { id: 'contact', label: 'Info Studio & Kontak', icon: Phone },
            { id: 'backup', label: 'Cadangan / Backup JSON', icon: FolderOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`admin-tab-${tab.id}`}
                onClick={() => {
                  setActiveAdminTab(tab.id as any);
                  setEditingProduct(null);
                  setIsAddingProduct(false);
                  setEditingProject(null);
                  setIsAddingProject(false);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#4A3525] text-white shadow-xs'
                    : 'bg-white text-[#5A524A] hover:bg-[#EAE2D4] border border-[#E8E2D5]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeAdminTab === 'products' && (
          <div className="space-y-6">
            {!isAddingProduct && !editingProduct ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#2C2723] uppercase tracking-wider">
                    Daftar Produk Mebel Aktif
                  </h3>
                  <button
                    id="admin-add-product-btn"
                    onClick={() => {
                      setProductForm({
                        title: '',
                        category: 'meja',
                        price: 3500000,
                        dimensions: { length: 160, width: 80, height: 75 },
                        materialWood: 'Kayu Jati Solid TPK',
                        finishing: 'Natural Doff Matte (Water-based)',
                        fabricOrHardware: '',
                        images: ['https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80'],
                        shortDesc: '',
                        description: '',
                        features: ['100% Kayu Solid Oven Kering', 'Finishing ramah lingkungan'],
                        leadTime: 'Pre-Order (14-21 Hari)',
                        isFeatured: false,
                        inStock: true,
                      });
                      setIsAddingProduct(true);
                    }}
                    className="bg-[#4A3525] hover:bg-[#342418] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Produk Baru</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-[#E8E2D5] overflow-hidden shadow-xs">
                  <div className="divide-y divide-[#F0EBE1]">
                    {products.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#FBF9F5] transition-colors"
                      >
                        <div className="flex items-center gap-3.5">
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-16 h-14 rounded-lg object-cover bg-[#EAE4D7] shrink-0 border border-[#E0D7C8]"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold bg-[#F4F0E8] text-[#8C6D52] px-2 py-0.5 rounded-full uppercase">
                                {item.category}
                              </span>
                              {item.isFeatured && (
                                <span className="text-[10px] bg-[#4A3525] text-white px-1.5 py-0.5 rounded-full">
                                  Unggulan
                                </span>
                              )}
                              <span className="text-[10px] text-[#6E645A]">{item.leadTime}</span>
                            </div>
                            <h4 className="text-sm font-bold text-[#1F1D1A] mt-0.5">{item.title}</h4>
                            <p className="text-xs text-[#5A524A]">
                              {formatCurrencyIDR(item.price)} • {item.materialWood} ({item.dimensions.length}x{item.dimensions.width}x{item.dimensions.height}cm)
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                          <button
                            onClick={() => {
                              setEditingProduct(item);
                              setProductForm(item);
                            }}
                            className="p-2 rounded-lg bg-[#F4F0E8] hover:bg-[#EAE2D4] text-[#4A3525] text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(item.id, item.title)}
                            className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* ADD / EDIT PRODUCT FORM */
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-4 mb-6">
                  <h3 className="font-serif-display text-xl font-bold text-[#1F1D1A]">
                    {editingProduct ? `Edit Produk: ${editingProduct.title}` : 'Tambah Produk Mebel Baru'}
                  </h3>
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setIsAddingProduct(false);
                    }}
                    className="p-1.5 rounded-lg text-[#5A524A] hover:bg-[#F4F0E8] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#4A3525] mb-1">Nama Produk / Mebel *</label>
                      <input
                        type="text"
                        required
                        value={productForm.title || ''}
                        onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                        placeholder="Contoh: Asahi Round Coffee Table"
                        className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723] focus:outline-hidden focus:border-[#4A3525]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A3525] mb-1">Kategori *</label>
                      <select
                        value={productForm.category || 'meja'}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723] focus:outline-hidden focus:border-[#4A3525] cursor-pointer"
                      >
                        <option value="meja">Meja Makan & Kopi</option>
                        <option value="kursi">Kursi & Armchair</option>
                        <option value="sofa">Sofa Japandi</option>
                        <option value="storage">Storage & Credenza</option>
                        <option value="kitchen">Kitchen & Island</option>
                        <option value="dekorasi">Dekorasi & Lampu</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A3525] mb-1">Harga (IDR) *</label>
                      <input
                        type="number"
                        required
                        value={productForm.price || ''}
                        onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                        placeholder="3500000"
                        className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723] focus:outline-hidden focus:border-[#4A3525]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A3525] mb-1">Status Ketersediaan</label>
                      <select
                        value={productForm.leadTime || 'Pre-Order (14-21 Hari)'}
                        onChange={(e) => setProductForm({ ...productForm, leadTime: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723] focus:outline-hidden focus:border-[#4A3525] cursor-pointer"
                      >
                        <option value="Ready Stock">Ready Stock</option>
                        <option value="Pre-Order (14-21 Hari)">Pre-Order (14-21 Hari)</option>
                        <option value="Custom Made Only">Custom Made Only</option>
                      </select>
                    </div>
                  </div>

                  {/* Dimensions */}
                  <div>
                    <label className="block text-xs font-bold text-[#4A3525] mb-1">Dimensi Standar (Panjang x Lebar x Tinggi cm)</label>
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="number"
                        placeholder="Panjang (cm)"
                        value={productForm.dimensions?.length || 150}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            dimensions: {
                              ...productForm.dimensions!,
                              length: Number(e.target.value),
                            },
                          })
                        }
                        className="px-3 py-2 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs"
                      />
                      <input
                        type="number"
                        placeholder="Lebar (cm)"
                        value={productForm.dimensions?.width || 80}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            dimensions: {
                              ...productForm.dimensions!,
                              width: Number(e.target.value),
                            },
                          })
                        }
                        className="px-3 py-2 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs"
                      />
                      <input
                        type="number"
                        placeholder="Tinggi (cm)"
                        value={productForm.dimensions?.height || 75}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            dimensions: {
                              ...productForm.dimensions!,
                              height: Number(e.target.value),
                            },
                          })
                        }
                        className="px-3 py-2 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  {/* Wood & Finishing */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#4A3525] mb-1">Bahan Kayu Utama</label>
                      <select
                        value={productForm.materialWood || 'Kayu Jati Solid TPK'}
                        onChange={(e) => setProductForm({ ...productForm, materialWood: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723] cursor-pointer"
                      >
                        <option value="Kayu Jati Solid TPK">Kayu Jati Solid TPK</option>
                        <option value="Kayu Sungkai Natural">Kayu Sungkai Natural</option>
                        <option value="Kayu Oak Jepang">Kayu Oak Jepang</option>
                        <option value="Kayu Mindi Eksotis">Kayu Mindi Eksotis</option>
                        <option value="Multiplex + HPL Premium">Multiplex + HPL Premium</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A3525] mb-1">Finishing</label>
                      <select
                        value={productForm.finishing || 'Natural Doff Matte (Water-based)'}
                        onChange={(e) => setProductForm({ ...productForm, finishing: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723] cursor-pointer"
                      >
                        <option value="Natural Doff Matte (Water-based)">Natural Doff Matte (Water-based)</option>
                        <option value="Walnut Dark Stain">Walnut Dark Stain</option>
                        <option value="Bleached Japandi Light">Bleached Japandi Light</option>
                        <option value="Organic Hardwax Oil">Organic Hardwax Oil</option>
                        <option value="Smoked Charcoal Oak">Smoked Charcoal Oak</option>
                      </select>
                    </div>
                  </div>

                  {/* Image URL & File Upload */}
                  <div>
                    <label className="block text-xs font-bold text-[#4A3525] mb-1">Foto Utama Produk</label>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={productForm.images?.[0] || ''}
                        onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })}
                        className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723] focus:outline-hidden focus:border-[#4A3525]"
                      />
                      <label className="w-full sm:w-auto shrink-0 bg-[#EAE2D4] hover:bg-[#DFD5C4] text-[#4A3525] px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Unggah File Foto</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileUpload(e, false)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {productForm.images?.[0] && (
                      <div className="mt-2 w-20 h-16 rounded-lg overflow-hidden border border-[#E0D7C8]">
                        <img src={productForm.images[0]} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Short & Long Description */}
                  <div>
                    <label className="block text-xs font-bold text-[#4A3525] mb-1">Ringkasan Singkat (1-2 kalimat)</label>
                    <input
                      type="text"
                      value={productForm.shortDesc || ''}
                      onChange={(e) => setProductForm({ ...productForm, shortDesc: e.target.value })}
                      placeholder="Meja makan minimalis sudut melengkung..."
                      className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A3525] mb-1">Deskripsi Lengkap & Cerita Produk</label>
                    <textarea
                      rows={3}
                      value={productForm.description || ''}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723]"
                    />
                  </div>

                  {/* Featured Toggle */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isFeaturedProduct"
                      checked={!!productForm.isFeatured}
                      onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                      className="rounded accent-[#4A3525]"
                    />
                    <label htmlFor="isFeaturedProduct" className="text-xs font-semibold text-[#2C2723] cursor-pointer">
                      Jadikan Produk Unggulan di Halaman Depan
                    </label>
                  </div>

                  {/* Save Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E2D5]">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct(null);
                        setIsAddingProduct(false);
                      }}
                      className="px-5 py-2.5 rounded-xl border border-[#DDD3C2] text-xs font-semibold text-[#5A524A] hover:bg-[#F4F0E8] cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#4A3525] hover:bg-[#342418] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan Perubahan Produk</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT */}
        {activeAdminTab === 'projects' && (
          <div className="space-y-6">
            {!isAddingProject && !editingProject ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#2C2723] uppercase tracking-wider">
                    Daftar Portofolio Proyek Interior
                  </h3>
                  <button
                    onClick={() => {
                      setProjectForm({
                        title: '',
                        category: 'Residential Villa',
                        location: 'Jakarta Selatan',
                        year: '2024',
                        clientName: '',
                        areaSqM: 140,
                        durationWeeks: 6,
                        coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
                        galleryImages: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
                        shortDesc: '',
                        story: '',
                        concept: 'Japandi Warm Wood',
                        materialsList: ['Kayu Jati Solid TPK', 'Microcement'],
                        furnitureItemsIncluded: ['Custom Dining Set', 'Kitchen Island'],
                      });
                      setIsAddingProject(true);
                    }}
                    className="bg-[#4A3525] hover:bg-[#342418] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Proyek Baru</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-[#E8E2D5] overflow-hidden shadow-xs divide-y divide-[#F0EBE1]">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#FBF9F5] transition-colors"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={proj.coverImage}
                          alt={proj.title}
                          className="w-16 h-14 rounded-lg object-cover bg-[#EAE4D7] shrink-0 border border-[#E0D7C8]"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold bg-[#F4F0E8] text-[#8C6D52] px-2 py-0.5 rounded-full uppercase">
                              {proj.category}
                            </span>
                            <span className="text-[10px] text-[#6E645A]">{proj.location} • {proj.year}</span>
                          </div>
                          <h4 className="text-sm font-bold text-[#1F1D1A] mt-0.5">{proj.title}</h4>
                          <p className="text-xs text-[#5A524A]">
                            Luas: {proj.areaSqM} m² • Konsep: {proj.concept}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => {
                            setEditingProject(proj);
                            setProjectForm(proj);
                          }}
                          className="p-2 rounded-lg bg-[#F4F0E8] hover:bg-[#EAE2D4] text-[#4A3525] text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id, proj.title)}
                          className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* ADD / EDIT PROJECT FORM */
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-4 mb-6">
                  <h3 className="font-serif-display text-xl font-bold text-[#1F1D1A]">
                    {editingProject ? `Edit Proyek: ${editingProject.title}` : 'Tambah Proyek Interior Baru'}
                  </h3>
                  <button
                    onClick={() => {
                      setEditingProject(null);
                      setIsAddingProject(false);
                    }}
                    className="p-1.5 rounded-lg text-[#5A524A] hover:bg-[#F4F0E8] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveProject} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#4A3525] mb-1">Nama Proyek *</label>
                      <input
                        type="text"
                        required
                        value={projectForm.title || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        placeholder="Contoh: Komorebi Villa Sanctuary"
                        className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A3525] mb-1">Kategori Proyek</label>
                      <select
                        value={projectForm.category || 'Residential Villa'}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723] cursor-pointer"
                      >
                        <option value="Residential Villa">Residential Villa</option>
                        <option value="Apartment Studio">Apartment Studio</option>
                        <option value="Commercial & Cafe">Commercial & Cafe</option>
                        <option value="Private House">Private House</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A3525] mb-1">Lokasi Proyek *</label>
                      <input
                        type="text"
                        required
                        value={projectForm.location || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                        placeholder="Contoh: Canggu, Bali"
                        className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A3525] mb-1">Tahun & Luas Area (m²)</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="2024"
                          value={projectForm.year || '2024'}
                          onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                          className="px-3 py-2 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs"
                        />
                        <input
                          type="number"
                          placeholder="150"
                          value={projectForm.areaSqM || 100}
                          onChange={(e) => setProjectForm({ ...projectForm, areaSqM: Number(e.target.value) })}
                          className="px-3 py-2 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A3525] mb-1">Foto Sampul Utama (Cover Image URL)</label>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={projectForm.coverImage || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, coverImage: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723]"
                      />
                      <label className="w-full sm:w-auto shrink-0 bg-[#EAE2D4] hover:bg-[#DFD5C4] text-[#4A3525] px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Unggah Foto</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileUpload(e, true)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A3525] mb-1">Konsep & Ringkasan Proyek</label>
                    <input
                      type="text"
                      placeholder="Konsep: Wabi-Sabi Warm Minimalism"
                      value={projectForm.concept || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, concept: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723] mb-2"
                    />
                    <textarea
                      rows={3}
                      placeholder="Cerita transformasi ruang dan solusi furnitur yang dihadirkan..."
                      value={projectForm.story || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, story: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E2D5]">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject(null);
                        setIsAddingProject(false);
                      }}
                      className="px-5 py-2.5 rounded-xl border border-[#DDD3C2] text-xs font-semibold text-[#5A524A] hover:bg-[#F4F0E8] cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#4A3525] hover:bg-[#342418] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan Proyek</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CONTACT & BRAND SETTINGS */}
        {activeAdminTab === 'contact' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs max-w-3xl">
            <h3 className="font-serif-display text-xl font-bold text-[#1F1D1A] mb-4">
              Informasi Brand, Kontak WhatsApp & Workshop
            </h3>

            <form onSubmit={handleSaveContact} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A3525] mb-1">Nama Brand</label>
                  <input
                    type="text"
                    value={contactForm.brandName}
                    onChange={(e) => setContactForm({ ...contactForm, brandName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A3525] mb-1">Nomor WhatsApp (Angka Tanpa + / Spasi)</label>
                  <input
                    type="text"
                    value={contactForm.phoneWhatsapp}
                    onChange={(e) => setContactForm({ ...contactForm, phoneWhatsapp: e.target.value })}
                    placeholder="6281234567890"
                    className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A3525] mb-1">Tampilan Nomor Telepon</label>
                  <input
                    type="text"
                    value={contactForm.phoneDisplay}
                    onChange={(e) => setContactForm({ ...contactForm, phoneDisplay: e.target.value })}
                    placeholder="+62 812-3456-7890"
                    className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A3525] mb-1">Email Resmi</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A3525] mb-1">Alamat Workshop & Showroom</label>
                <textarea
                  rows={2}
                  value={contactForm.workshopAddress}
                  onChange={(e) => setContactForm({ ...contactForm, workshopAddress: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A3525] mb-1">Akun Instagram</label>
                  <input
                    type="text"
                    value={contactForm.instagram}
                    onChange={(e) => setContactForm({ ...contactForm, instagram: e.target.value })}
                    placeholder="@namaliving.id"
                    className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A3525] mb-1">Jam Operasional Studio</label>
                  <input
                    type="text"
                    value={contactForm.operationalHours}
                    onChange={(e) => setContactForm({ ...contactForm, operationalHours: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#DDD3C2] rounded-xl text-xs text-[#2C2723]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#4A3525] hover:bg-[#342418] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Info Kontak</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: BACKUP & JSON EXPORT */}
        {activeAdminTab === 'backup' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs max-w-2xl space-y-6">
            <div>
              <h3 className="font-serif-display text-xl font-bold text-[#1F1D1A] mb-2">
                Cadangan Data & Migrasi JSON
              </h3>
              <p className="text-xs text-[#5A524A] leading-relaxed">
                Anda dapat mengekspor seluruh katalog mebel dan data proyek ke file JSON, atau mengimpor data yang sudah ada sebelumnya.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-[#FBF9F5] rounded-xl border border-[#E8E2D5] space-y-3">
                <Download className="w-6 h-6 text-[#4A3525]" />
                <h4 className="text-xs font-bold text-[#2C2723]">Ekspor Data ke JSON</h4>
                <p className="text-[11px] text-[#6E645A]">Unduh salinan cadangan semua produk, proyek, dan kontak.</p>
                <button
                  onClick={handleExportData}
                  className="w-full py-2 bg-[#4A3525] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh File JSON</span>
                </button>
              </div>

              <div className="p-5 bg-[#FBF9F5] rounded-xl border border-[#E8E2D5] space-y-3">
                <Upload className="w-6 h-6 text-[#8C6D52]" />
                <h4 className="text-xs font-bold text-[#2C2723]">Impor Data JSON</h4>
                <p className="text-[11px] text-[#6E645A]">Muat ulang data dari file backup cadangan sebelumnya.</p>
                <label className="w-full py-2 bg-[#F4F0E8] border border-[#DDD3C2] text-[#4A3525] hover:bg-[#EAE2D4] rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Pilih File Backup</span>
                  <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
