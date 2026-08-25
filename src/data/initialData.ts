import { Product, Project, ContactInfo } from '../types';

export const initialContactInfo: ContactInfo = {
  brandName: 'NAMA LIVING',
  tagline: 'Japandi Woodwork & Mindful Living Spaces',
  phoneWhatsapp: '6281234567890',
  phoneDisplay: '+62 812-3456-7890',
  email: 'hello@namaliving.id',
  workshopAddress: 'Jl. Kayu Manis No. 8, Cilandak, Jakarta Selatan & Workshop Kayu Jepara',
  city: 'Jakarta & Jepara, Indonesia',
  googleMapsUrl: 'https://maps.google.com',
  instagram: '@namaliving.id',
  operationalHours: 'Senin - Sabtu: 09.00 - 18.00 WIB (Kunjungan Workshop dengan Janji Temu)',
};

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    title: 'Komorebi Solid Teak Dining Table',
    slug: 'komorebi-solid-teak-dining-table',
    category: 'meja',
    price: 7850000,
    originalPrice: 8500000,
    dimensions: { length: 200, width: 90, height: 75 },
    materialWood: 'Kayu Jati Solid TPK',
    finishing: 'Natural Doff Matte (Water-based)',
    fabricOrHardware: 'Sambungan Tradisional Mortise & Tenon',
    images: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDesc: 'Meja makan kayu jati solid dengan pinggiran rounded lembut khas estetika Japandi.',
    description: 'Meja makan Komorebi dirancang untuk menjadi pusat kehangatan keluarga. Menggunakan kayu jati perhutani tua dengan urat kayu alami yang menawan. Sudut-sudut meja dibentuk melengkung halus (*organic rounded edge*) memberikan keamanan ekstra untuk hunian dengan anak-anak.',
    features: [
      '100% Kayu Jati TPK Grade A Kering Oven (MC < 12%)',
      'Finishing Water-based ramah lingkungan & bebas bau kimia tajam',
      'Kapasitas 6-8 kursi dengan ruang kaki leluasa',
      'Garansi konstruksi 5 tahun'
    ],
    leadTime: 'Pre-Order (14-21 Hari)',
    isFeatured: true,
    inStock: true,
    weightApproxKg: 48,
  },
  {
    id: 'prod-2',
    title: 'Asahi Curved Armchair & Linen Cushion',
    slug: 'asahi-curved-armchair',
    category: 'kursi',
    price: 3450000,
    dimensions: { length: 72, width: 70, height: 78 },
    materialWood: 'Kayu Sungkai Natural',
    finishing: 'Bleached Japandi Light',
    fabricOrHardware: 'Linen Belgia Berkualitas Tinggi + Busa HR 32',
    images: [
      'https://images.unsplash.com/photo-1580481077197-c87a55543c7b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDesc: 'Kursi santai ergonomis dengan sandaran lengkung kayu sungkai dan bantalan linen organik.',
    description: 'Asahi Armchair mengawinkan kepresisian geometri Skandinavia dengan ketenangan Wabi-Sabi Jepang. Struktur kayu sungkai dibentuk ergonomis mengikuti kontur punggung, dilengkapi bantal duduk linen berdaya pantul tinggi.',
    features: [
      'Rangka kayu sungkai oven solid dengan grain serat lurus yang tenang',
      'Cover kain linen dapat dilepas & dicuci (removable cover)',
      'Cocok untuk sudut baca, ruang keluarga, atau lounge hotel/villa'
    ],
    leadTime: 'Ready Stock',
    isFeatured: true,
    inStock: true,
    weightApproxKg: 14,
  },
  {
    id: 'prod-3',
    title: 'Mori 3-Seater Low Profile Japandi Sofa',
    slug: 'mori-3-seater-japandi-sofa',
    category: 'sofa',
    price: 11200000,
    originalPrice: 12500000,
    dimensions: { length: 220, width: 92, height: 70 },
    materialWood: 'Kayu Jati Solid TPK',
    finishing: 'Natural Doff Matte (Water-based)',
    fabricOrHardware: 'Kain Bouclé Organik Off-White & Pocket Spring',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDesc: 'Sofa modular bertinggi rendah dengan base kayu jati solid dan tekstur bouclé mewah.',
    description: 'Konsep low-seating khas Jepang yang memberikan efek ruangan terasa lebih lapang dan bernapas. Base kayu jati terekspos dengan indah membingkai bantalan bouclé empuk berlapis duck down dan high resilience foam.',
    features: [
      'Konstruksi rangka kayu solid anti-rayap',
      'Bantalan tebal empuk dengan per pegas saku tahan ambles',
      'Kain berstandar Oeko-Tex ramah kulit dan bernapas'
    ],
    leadTime: 'Pre-Order (14-21 Hari)',
    isFeatured: true,
    inStock: true,
    weightApproxKg: 62,
  },
  {
    id: 'prod-4',
    title: 'Sora Slatted Low Credenza / TV Cabinet',
    slug: 'sora-slatted-low-credenza',
    category: 'storage',
    price: 5600000,
    dimensions: { length: 180, width: 45, height: 50 },
    materialWood: 'Kayu Oak Jepang',
    finishing: 'Bleached Japandi Light',
    fabricOrHardware: 'Engsel Blum Soft-Close & Jalur Kabel Tersembunyi',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDesc: 'Credenza TV dengan pintu kisi-kisi kayu geser (*slatted sliding door*) yang tembus sinyal remote.',
    description: 'Solusi penyimpanan elegan untuk media dan konsol elektronik. Desain pintu kisi kayu memungkinkan sirkulasi udara optimal pada perangkat elektronik di dalamnya serta menjaga estetika ruang tamu tetap rapi dan bersih.',
    features: [
      'Pintu geser kisi kayu handmade presisi',
      'Sistem manajemen kabel internal rapi',
      'Kaki ramping meruncing dengan penyangga tengah kokoh'
    ],
    leadTime: 'Ready Stock',
    isFeatured: false,
    inStock: true,
    weightApproxKg: 35,
  },
  {
    id: 'prod-5',
    title: 'Nami Organic Oval Coffee Table Set',
    slug: 'nami-organic-oval-coffee-table-set',
    category: 'meja',
    price: 3200000,
    dimensions: { length: 120, width: 65, height: 38 },
    materialWood: 'Kayu Sungkai Natural',
    finishing: 'Organic Hardwax Oil',
    fabricOrHardware: 'Solid Wood Jointing',
    images: [
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDesc: 'Set meja kopi bertumpuk bentuk organik asimetris yang mengalir menenangkan.',
    description: 'Terinspirasi dari bebatuan sungai yang halus terkikis aliran air, meja kopi Nami memberikan sentuhan kelembutan di tengah sudut-sudut ruangan yang kaku. Dapat dipisah atau digeser bertumpuk sesuai kebutuhan ruang.',
    features: [
      'Bentuk fluid asimetris ramah anak tanpa sudut tajam',
      'Set terdiri dari 1 meja utama dan 1 meja pendamping anak',
      'Finishing minyak alami menonjolkan pori-pori serat kayu asli'
    ],
    leadTime: 'Ready Stock',
    isFeatured: false,
    inStock: true,
    weightApproxKg: 18,
  },
  {
    id: 'prod-6',
    title: 'Yūgen Minimalist Island & Kitchen Cabinet Module',
    slug: 'yugen-minimalist-kitchen-cabinet',
    category: 'kitchen',
    price: 18500000,
    dimensions: { length: 240, width: 60, height: 85 },
    materialWood: 'Kayu Jati Solid TPK',
    finishing: 'Natural Doff Matte (Water-based)',
    fabricOrHardware: 'Rel Laci Blum Tip-On & Top Table Marmer Travertine Sintetis',
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDesc: 'Kitchen island modular paduan kayu jati dan top table marmer krem hangat.',
    description: 'Dapur impian berkonsep terbuka (*open kitchen concept*). Dibuat dengan modul presisi, laci penyimpanan rempah dan piring tersembunyi, serta panel kayu bertekstur hangat yang menyatu dengan ruang makan.',
    features: [
      'Bahan inti multiplex marinewood lapis veneer jati solid tahan lembap',
      'Top table tahan panas & noda saus/kopi',
      'Dapat dikustomisasi panjang & konfigurasi sink/kompor'
    ],
    leadTime: 'Custom Made Only',
    isFeatured: true,
    inStock: true,
    weightApproxKg: 110,
  },
  {
    id: 'prod-7',
    title: 'Hikari Rattan & Mindi Cane Side Table',
    slug: 'hikari-rattan-mindi-side-table',
    category: 'storage',
    price: 1850000,
    dimensions: { length: 45, width: 40, height: 55 },
    materialWood: 'Kayu Mindi Eksotis',
    finishing: 'Walnut Dark Stain',
    fabricOrHardware: 'Anyaman Rotan Alami Asli Jepara',
    images: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDesc: 'Nakas samping tempat tidur dengan panel pintu anyaman rotan klasik yang bernapas.',
    description: 'Menghadirkan pesona kearifan lokal anyaman rotan dengan proporsi minimalis modern. Cocok diletakkan di samping kasur untuk lampu tidur, buku, dan wewangian aromaterapi.',
    features: [
      'Anyaman rotan alami grade export',
      'Satu laci tertutup & satu rak terbuka',
      'Ringan namun stabil'
    ],
    leadTime: 'Ready Stock',
    isFeatured: false,
    inStock: true,
    weightApproxKg: 9,
  },
  {
    id: 'prod-8',
    title: 'Tsuki Zen Floor Lamp with Linen Shade',
    slug: 'tsuki-zen-floor-lamp',
    category: 'dekorasi',
    price: 1450000,
    dimensions: { length: 35, width: 35, height: 145 },
    materialWood: 'Kayu Sungkai Natural',
    finishing: 'Bleached Japandi Light',
    fabricOrHardware: 'Kap Lampu Kain Linen Alami + LED Warm White 3000K',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDesc: 'Lampu sudut berdiri dengan pilar kayu sungkai dan pendaran cahaya hangat temaram.',
    description: 'Menghadirkan atmosfer ruangan santai di malam hari. Cahaya lembut tersaring melalui linen alami, menghilangkan silau dan menciptakan ketenangan pikiran sebelum beristirahat.',
    features: [
      'Termasuk bohlam LED hemat energi 3 tingkat kecerahan',
      'Kaki tripod kayu sungkai solid kokoh',
      'Saklar kaki (foot step switch) praktis'
    ],
    leadTime: 'Ready Stock',
    isFeatured: false,
    inStock: true,
    weightApproxKg: 6,
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Komorebi House: Japandi Sanctuary',
    slug: 'komorebi-house-residential',
    category: 'Residential Villa',
    location: 'Canggu, Bali',
    year: '2024',
    clientName: 'Keluarga Bpk. Reza & Ibu Maya',
    areaSqM: 220,
    durationWeeks: 8,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'Transformasi villa tropis menjadi hunian hangat dengan paduan kayu jati perhutani, lantai mikro semen, dan bukaan cahaya alami.',
    story: 'Klien menginginkan hunian yang menjadi tempat melepas penat setelah seharian bekerja. Kami merombak tata ruang menjadi *open layout*, memaksimalkan ventilasi silang, dan mendesain seluruh furnitur secara bespoke menggunakan kayu jati solid berfinishing doff alami.',
    concept: 'Harmoni Wabi-Sabi & Tropis Terbuka',
    materialsList: [
      'Kayu Jati Solid TPK Grade A',
      'Finishing Bio-Oil Matte Doff',
      'Lantai Microcement Warm Beige',
      'Tekstil Linen Belgia Organik',
      'Anyaman Rotan Asli'
    ],
    furnitureItemsIncluded: [
      'Custom 8-Seater Dining Table',
      'Built-in Japandi Kitchen & Island Bar',
      'Low Bed Tatami Frame Master Bedroom',
      'Slatted Wall Divider & TV Console'
    ],
    testimonial: {
      quote: 'NAMA LIVING berhasil mewujudkan hunian impian kami. Setiap detail kayu terasa halus, wangi kayunya alami, dan ruangan terasa 2x lebih lega dan tenang.',
      author: 'Reza Pratama',
      role: 'Homeowner'
    }
  },
  {
    id: 'proj-2',
    title: 'Asahi Minimalist Compact Living',
    slug: 'asahi-compact-apartment',
    category: 'Apartment Studio',
    location: 'Sudirman, Jakarta Selatan',
    year: '2024',
    clientName: 'Andita S.',
    areaSqM: 54,
    durationWeeks: 4,
    coverImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'Apartemen 2-Bedroom 54m² dengan solusi furnitur multifungsi pintar kayu sungkai cerah.',
    story: 'Tantangan ruang terbatas diatasi dengan furnitur kustom yang memiliki *hidden storage*, tempat tidur panggung bergaya tatami dengan laci bawah, serta meja makan lipat dinding yang fleksibel.',
    concept: 'Japanese Micro-Living & Smart Storage',
    materialsList: [
      'Kayu Sungkai Natural Kiln Dried',
      'HPL Taco Warm Sand Texture',
      'Fitting Hardware Blum Tip-On',
      'Lampu Hidden LED Warm Light 2700K'
    ],
    furnitureItemsIncluded: [
      'Tatami Platform Bed with 6 Deep Drawers',
      'Custom Floating Desk & Bookshelf',
      'Compact Kitchen Pantry Module',
      'Wardrobe dengan Pintu Geser Cermin'
    ],
    testimonial: {
      quote: 'Apartemen kecil saya jadi terasa seperti suite hotel di Kyoto. Sangat fungsional tanpa mengorbankan estetika kehangatan kayu.',
      author: 'Andita S.',
      role: 'Professional / Apartment Owner'
    }
  },
  {
    id: 'proj-3',
    title: 'Kissa Kohi: Japandi Slow Coffee Bar',
    slug: 'kissa-kohi-cafe',
    category: 'Commercial & Cafe',
    location: 'Senopati, Jakarta Selatan',
    year: '2023',
    clientName: 'Kissa Group',
    areaSqM: 140,
    durationWeeks: 6,
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDesc: 'Kedai kopi artisanal bernuansa kayu oak gelap, dinding tanah liat washi, dan meja bar komunal.',
    story: 'Menciptakan ruang tenang untuk menikmati kopi manual brew. Meja bar kurva sepanjang 6 meter menjadi bintang utama yang mengundang interaksi hangat antara barista dan pengunjung.',
    concept: 'Wabi-Sabi Slow Bar & Communal Warmth',
    materialsList: [
      'Kayu Oak Jepang & Jati Smoked',
      'Dinding Tekstur Textured Clay Plaster',
      'Lampu Gantung Tembaga Doff Artisan',
      'Batu Andesit Hitam Alam'
    ],
    furnitureItemsIncluded: [
      'Custom 6-Meter Curved Coffee Bar Counter',
      '18 Unit Japandi Bar Stools',
      'L-Shape Banquet Seating with Linen Cushions',
      'Display Rak Biji Kopi & Alat Seduh'
    ],
    testimonial: {
      quote: 'Banyak pengunjung yang datang khusus karena ambience interior yang menenangkan. Pekerjaan kayu dari NAMA LIVING sangat solid untuk penggunaan komersil berat.',
      author: 'Kevin H.',
      role: 'Founder Kissa Kohi'
    }
  }
];
