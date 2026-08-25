import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  MapPin, 
  Maximize2, 
  Calendar, 
  ArrowRight, 
  Sparkles,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { Project } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';

interface PortfolioShowcaseProps {
  projects: Project[];
  onOpenWhatsApp: (customMsg?: string) => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  projects,
  onOpenWhatsApp,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: 'semua', label: 'Semua Proyek' },
    { id: 'Residential Villa', label: 'Residential Villa' },
    { id: 'Apartment Studio', label: 'Apartemen & Studio' },
    { id: 'Commercial & Cafe', label: 'Commercial & Cafe' },
  ];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'semua') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <section id="portfolio-section" className="py-16 md:py-24 bg-[#F4F0E8]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBE4D6] border border-[#DDD3C2] text-[#4A3525] text-xs font-semibold tracking-wider uppercase mb-3">
            <Compass className="w-3.5 h-3.5 text-[#8C6D52]" />
            <span>Dokumentasi Proyek Interior</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F1D1A] mb-4">
            Harmoni Ruang & Sentuhan Kayu Nusantara
          </h2>
          <p className="text-[#5A524A] text-sm sm:text-base leading-relaxed">
            Eksplorasi karya interior kami mulai dari villa privat di Bali, apartemen urban di Jakarta, hingga cafe artisanal. Setiap sudut didesain *custom-fit* menghadirkan ketenangan jiwa.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 mb-10 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`portfolio-cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#4A3525] text-[#FBF9F5] shadow-xs'
                    : 'bg-white text-[#5A524A] hover:text-[#2C2723] hover:bg-[#EAE2D4] border border-[#E8E2D5]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              onClick={() => setActiveModalProject(project)}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E8E2D5] shadow-xs hover:shadow-xl hover:border-[#8C6D52] transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Cover Image Container */}
              <div className="relative aspect-16/10 overflow-hidden bg-[#EAE4D7]">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#4A3525]/90 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {project.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#2C2723] text-[10px] font-bold px-2.5 py-1 rounded-full border border-black/5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#8C6D52]" />
                  <span>{project.location}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-[#8C6D52] font-semibold mb-1.5 uppercase tracking-wider">
                    <span>{project.concept}</span>
                    <span>•</span>
                    <span>{project.areaSqM} m²</span>
                  </div>

                  <h3 className="font-serif-display text-xl font-bold text-[#1F1D1A] group-hover:text-[#8C6D52] transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#5A524A] line-clamp-2 mt-2 font-light leading-relaxed">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Bottom Stats & CTA */}
                <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#8C6D52] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Buka Studi Kasus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] text-[#9D8E80]">
                    Pengerjaan: {project.durationWeeks} mgg
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner CTA */}
        <div className="mt-16 bg-[#4A3525] rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-[#D9C3B0] uppercase block mb-2">
              Layanan Desain Interior & Custom Woodwork
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold mb-3">
              Ingin Menata Ruangan Anda dengan Sentuhan Japandi yang Tenang?
            </h3>
            <p className="text-[#E0D7C8] text-xs sm:text-sm font-light leading-relaxed mb-6">
              Kami melayani mulai dari perancangan denah 3D, pemilihan material kayu solid, pembuatan mebel *built-in* dan lepas (*loose*), hingga instalasi di lokasi Anda.
            </p>
            <button
              id="portfolio-consult-cta"
              onClick={() => onOpenWhatsApp('Halo tim desainer NAMA LIVING, saya ingin berdiskusi mengenai proyek desain interior dan furniture custom untuk hunian/bisnis saya.')}
              className="bg-[#D9C3B0] hover:bg-[#C9B19C] text-[#2C2723] px-6 py-3 rounded-full text-xs font-bold tracking-wide flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-98"
            >
              <Compass className="w-4 h-4" />
              <span>Jadwalkan Konsultasi Interior</span>
            </button>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <ProjectDetailModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
          onOpenWhatsApp={onOpenWhatsApp}
        />
      )}
    </section>
  );
};
