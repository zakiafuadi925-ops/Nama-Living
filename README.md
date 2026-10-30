# 🪑 NAMA LIVING — Japandi Furniture & Interior Studio

> Portofolio mebel kayu solid & studio interior bergaya *Japandi warm wood* dengan integrasi **AI Assistant (Google Gemini)** untuk rekomendasi tata ruang, kalkulator estimasi biaya *custom*, serta manajemen katalog produk.

[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-8E75B5?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![Deploy Status](https://img.shields.io/badge/Vercel-Live-success?style=for-the-badge&logo=vercel&logoColor=white)](https://nama-living.vercel.app)

---

## 🌐 Live Demo & Tautan

- **Production Deployment**: [nama-living.vercel.app](https://nama-living.vercel.app)
- **AI Studio App**: [View in Google AI Studio](https://ai.studio/apps/8335a563-4d24-45f2-beb4-c6a13aa02eb6)

---

## ✨ Fitur Utama

- **🪵 Katalog Mebel Modern**: Galeri produk mebel berbahan kayu solid dengan filter kategori, detail material, dan estetika Japandi (*Japanese-Scandi*).
- **🤖 AI Interior Designer**: Asisten AI terintegrasi menggunakan Google Gemini API (Server-Side) untuk memberikan konsultasi gaya, perpaduan warna, dan tata letak ruang.
- **🧮 Kalkulator Estimasi Custom**: Modul kalkulator interaktif untuk menghitung perkiraan biaya proyek interior berdasarkan luas ruangan dan pilihan material.
- **🏢 Studio Portfolio & Project Showcase**: Dokumentasi proyek renovasi dan penataan interior hunian.
- **⚡ Modern & Responsive UI**: Tampilan interaktif dengan performa tinggi menggunakan React 19 dan Tailwind CSS v4.

---

## 🛠️ Tech Stack

| Layer | Teknologi / Tool | Deskripsi |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 (TypeScript) | UI deklaratif dengan performa rendering optimal |
| **Build System** | Vite 6 | Tooling dan server pengembangan super cepat |
| **Styling** | Tailwind CSS v4 | Framework Utility-first CSS dengan palet warna hangat khas Japandi |
| **AI Integration** | `@google/genai` (Gemini API) | Server-side API untuk asisten desain interior |
| **Backend / Server** | Express.js | Handler ringan untuk API endpoint jika diperlukan |
| **Deployment** | Vercel | Hosting otomatis berbasis continuous deployment |

---

## 📁 Struktur Repositori

```text
Nama-Living/
├── .env.example          # Template variabel lingkungan (API Keys)
├── .gitignore            # Pengecualian berkas git
├── index.html            # Entry point HTML utama
├── metadata.json         # Metadata aplikasi & kapabilitas AI Studio
├── package.json          # Dependensi & skrip proyek
├── tsconfig.json         # Konfigurasi TypeScript
├── vite.config.ts        # Konfigurasi Vite & plugin React/Tailwind
└── src/                  # Kode sumber aplikasi
    ├── main.tsx          # Root rendering entry point
    ├── App.tsx           # Layout utama & routing
    ├── components/       # Komponen UI modular (Cards, Navbar, Modal, AI Chat)
    ├── pages/            # Halaman utama (Home, Catalog, Estimator, Portfolio)
    └── lib/              # Utilitas pembantu & integrasi SDK Gemini API
```

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

### Prasyarat
- **Node.js** (versi 18.x atau yang lebih baru)
- **npm** atau **bun** / **yarn**

### Langkah-Langkah

1. **Kloning Repositori**
   ```bash
   git clone https://github.com/zakiafuadi925-ops/Nama-Living.git
   cd Nama-Living
   ```

2. **Instal Dependensi**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variable**
   Salin berkas `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

4. **Jalankan Server Development**
   ```bash
   npm run dev
   ```
   Buka peramban kamu di `http://localhost:5173` (atau port yang ditampilkan di terminal).

---

## 📜 Lisensi & Atribusi

Proyek ini dibuat dan dikembangkan oleh **[@zakiafuadi925-ops](https://github.com/zakiafuadi925-ops)** sebagai portofolio studio interior dan aplikasi web berbasis AI.

- Berkas terbuka untuk tujuan demonstrasi, pembelajaran, dan referensi arsitektur React + Gemini.
- Untuk pertanyaan kolaborasi atau lisensi komersial, silakan hubungi pemilik repositori.
