import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Maximize2, 
  Clock, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles,
  Quote,
  ChevronLeft,
  ChevronRight,
  SplitSquareVertical
} from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenWhatsApp: (customMsg?: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenWhatsApp,
}) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'before-after'>('gallery');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [comparePosition, setComparePosition] = useState(50); // percentage for before/after slider

  useEffect(() => {
    if (project) {
      setActiveTab('gallery');
      setSelectedImageIndex(0);
      setComparePosition(50);
    }
  }, [project?.id]);

  if (!project) return null;

  const handleWhatsAppInquiry = () => {
    const msg = `Halo NAMA LIVING, saya baru saja melihat portofolio proyek *${project.title}* di ${project.location}.\nSaya berencana merenovasi/mengisi interior hunian saya dengan konsep serupa. Bisakah jadwalkan sesi konsultasi desain?`;
    onOpenWhatsApp(msg);
  };

  return (
    <div
      id="project-detail-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="project-detail-modal-card"
        className="bg-[#FBF9F5] w-full max-w-5xl rounded-2xl border border-[#E8E2D5] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E2D5] bg-[#F4F0E8]/70">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-widest text-[#8C6D52] uppercase">
              Portofolio Proyek #{project.id}
            </span>
            <span className="text-[#C4B5A5]">•</span>
            <span className="text-xs text-[#6E645A] font-medium">{project.category}</span>
          </div>
          <button
            id="close-project-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EAE2D4] text-[#5A524A] hover:text-[#1F1D1A] transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8">
          {/* Project Title & Metadata Bar */}
          <div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#7A7065] mb-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#8C6D52]" />
                {project.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#8C6D52]" />
                Tahun Selesai: {project.year}
              </span>
              <span className="flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 text-[#8C6D52]" />
                Luas: {project.areaSqM} m²
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#8C6D52]" />
                Durasi: {project.durationWeeks} Minggu
              </span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-4xl font-bold text-[#1F1D1A]">
              {project.title}
            </h2>
            <p className="text-xs font-semibold text-[#8C6D52] uppercase tracking-wider mt-1">
              Konsep: {project.concept}
            </p>
          </div>

          {/* Media Presentation (Gallery vs Before-After) */}
          <div className="space-y-3">
            {project.beforeImage && project.afterImage && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'gallery'
                      ? 'bg-[#4A3525] text-white shadow-xs'
                      : 'bg-[#F4F0E8] text-[#5A524A] hover:bg-[#EAE2D4]'
                  }`}
                >
                  Galeri Foto Hasil
                </button>
                <button
                  onClick={() => setActiveTab('before-after')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'before-after'
                      ? 'bg-[#8C6D52] text-white shadow-xs'
                      : 'bg-[#F4F0E8] text-[#5A524A] hover:bg-[#EAE2D4]'
                  }`}
                >
                  <SplitSquareVertical className="w-3.5 h-3.5" />
                  <span>Komparasi Transformasi (Before / After)</span>
                </button>
              </div>
            )}

            {activeTab === 'gallery' ? (
              <div className="space-y-3">
                <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-[#EAE4D7] border border-[#E0D7C8] shadow-inner">
                  <img
                    src={project.galleryImages[selectedImageIndex] || project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {project.galleryImages.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-1">
                    {project.galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative w-24 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
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
              </div>
            ) : (
              /* Interactive Before/After Comparison */
              <div className="space-y-2">
                <div className="relative aspect-16/9 rounded-xl overflow-hidden border border-[#E0D7C8] select-none">
                  {/* After Image (Background) */}
                  <img
                    src={project.afterImage || project.coverImage}
                    alt="After Project"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <span className="absolute bottom-3 right-3 bg-[#4A3525]/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md z-10">
                    HASIL AKHIR (AFTER)
                  </span>

                  {/* Before Image (Clipped Overlay) */}
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${comparePosition}%` }}
                  >
                    <img
                      src={project.beforeImage}
                      alt="Before Project"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%' }}
                    />
                    <span className="absolute bottom-3 left-3 bg-black/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                      SEBELUM (BEFORE)
                    </span>
                  </div>

                  {/* Divider Line & Handle */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
                    style={{ left: `${comparePosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#4A3525] shadow-lg flex items-center justify-center font-bold text-xs border border-[#4A3525]/20">
                      ↔
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#6E645A] px-1">
                  <span>Geser slider untuk melihat perbandingan transformasi ruang:</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={comparePosition}
                    onChange={(e) => setComparePosition(Number(e.target.value))}
                    className="w-48 accent-[#4A3525]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Narrative & Story Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 space-y-4">
              <h3 className="font-serif-display text-xl font-bold text-[#1F1D1A]">
                Cerita & Solusi Desain
              </h3>
              <p className="text-[#5A524A] text-sm leading-relaxed">
                {project.story}
              </p>

              {/* Testimonial Box */}
              {project.testimonial && (
                <div className="bg-[#F4F0E8] p-5 rounded-xl border border-[#E8E2D5] space-y-2 mt-4">
                  <div className="flex items-center gap-1.5 text-[#8C6D52]">
                    <Quote className="w-5 h-5 fill-[#8C6D52]/20" />
                    <span className="text-xs font-bold uppercase tracking-wider">Ulasan Klien</span>
                  </div>
                  <p className="text-xs text-[#2C2723] italic leading-relaxed">
                    "{project.testimonial.quote}"
                  </p>
                  <div className="text-[11px] text-[#6E645A] font-medium pt-1">
                    — {project.testimonial.author} ({project.testimonial.role})
                  </div>
                </div>
              )}
            </div>

            {/* Scope & Material Breakdown Column */}
            <div className="md:col-span-5 space-y-6">
              {/* Materials Used */}
              <div className="bg-white p-4 rounded-xl border border-[#E8E2D5] shadow-xs">
                <h4 className="text-xs font-bold text-[#4A3525] uppercase tracking-wider mb-3">
                  Material & Finishing Utama
                </h4>
                <ul className="space-y-2">
                  {project.materialsList.map((mat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[#5A524A]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8C6D52]" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Custom Furnitures Included */}
              <div className="bg-white p-4 rounded-xl border border-[#E8E2D5] shadow-xs">
                <h4 className="text-xs font-bold text-[#4A3525] uppercase tracking-wider mb-3">
                  Item Mebel Bespoke yang Dibuat
                </h4>
                <ul className="space-y-2">
                  {project.furnitureItemsIncluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#5A524A]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2E6B47] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Footer Bar */}
          <div className="pt-4 border-t border-[#E8E2D5] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-[#1F1D1A]">Punya Ruangan Serupa yang Ingin Diisi?</p>
              <p className="text-xs text-[#6E645A]">Konsultasikan denah, moodboard, dan estimasi biaya bersama desainer kami.</p>
            </div>

            <button
              id="project-consult-btn"
              onClick={handleWhatsAppInquiry}
              className="w-full sm:w-auto bg-[#2E6B47] hover:bg-[#255739] text-white px-6 py-3.5 rounded-full text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-98"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Konsultasi Proyek via WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
