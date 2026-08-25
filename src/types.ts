export type ProductCategory = 'semua' | 'sofa' | 'meja' | 'kursi' | 'storage' | 'kitchen' | 'dekorasi';

export type WoodType = 
  | 'Kayu Jati Solid TPK'
  | 'Kayu Sungkai Natural'
  | 'Kayu Oak Jepang'
  | 'Kayu Mindi Eksotis'
  | 'Multiplex + HPL Premium';

export type FinishingType = 
  | 'Natural Doff Matte (Water-based)'
  | 'Walnut Dark Stain'
  | 'Bleached Japandi Light'
  | 'Smoked Charcoal Oak'
  | 'Organic Hardwax Oil';

export type StockStatus = 'Ready Stock' | 'Pre-Order (14-21 Hari)' | 'Custom Made Only';

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: 'sofa' | 'meja' | 'kursi' | 'storage' | 'kitchen' | 'dekorasi';
  price: number;
  originalPrice?: number;
  dimensions: {
    length: number; // cm
    width: number;  // cm
    height: number; // cm
  };
  materialWood: WoodType;
  finishing: FinishingType;
  fabricOrHardware?: string;
  images: string[];
  shortDesc: string;
  description: string;
  features: string[];
  leadTime: StockStatus;
  isFeatured?: boolean;
  inStock: boolean;
  weightApproxKg?: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'Residential Villa' | 'Apartment Studio' | 'Commercial & Cafe' | 'Private House';
  location: string;
  year: string;
  clientName?: string;
  areaSqM: number;
  durationWeeks: number;
  coverImage: string;
  galleryImages: string[];
  beforeImage?: string;
  afterImage?: string;
  shortDesc: string;
  story: string;
  concept: string;
  materialsList: string[];
  furnitureItemsIncluded: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface CustomEstimateItem {
  furnitureType: 'meja_makan' | 'coffee_table' | 'kitchen_set' | 'credenza_tv' | 'lemari_pakaian' | 'sofa_custom' | 'tempat_tidur';
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  woodType: WoodType;
  finishing: FinishingType;
  hardwareGrade: 'Standard Soft-Close' | 'Blum Premium Austria' | 'Hidden Push-to-Open' | 'Solid Brass Hardware';
  includeInstallation: boolean;
  notes: string;
}

export interface ContactInfo {
  brandName: string;
  tagline: string;
  phoneWhatsapp: string;
  phoneDisplay: string;
  email: string;
  workshopAddress: string;
  city: string;
  googleMapsUrl: string;
  instagram: string;
  operationalHours: string;
}
