import React, { useState } from 'react';
import { Play, ArrowUpRight, Filter, Film, Smartphone } from 'lucide-react';
import { Project, ProjectCategory } from '../types/portfolio';

interface WorkSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const categories: { key: ProjectCategory; code: string; label: string; sublabel: string }[] = [
    { key: 'all', code: 'ALL', label: '전체 프로젝트', sublabel: 'ALL WORKS' },
    { key: 'corporate', code: '01', label: '기업, 사내 콘텐츠', sublabel: 'CORPORATE' },
    { key: 'channel', code: '02', label: '유튜브 채널 콘텐츠', sublabel: 'CHANNEL' },
    { key: 'shorts', code: '03', label: '쇼츠', sublabel: 'SHORTS' },
    { key: 'live', code: '04', label: '라이브 방송 제작', sublabel: 'LIVE STREAM' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (!p.isPublished) return false;
    if (activeCategory === 'all') return true;
    if (activeCategory === 'corporate') {
      return p.category === 'corporate';
    }
    if (activeCategory === 'channel') {
      return p.category === 'channel' || p.category === 'branded';
    }
    if (activeCategory === 'shorts') {
      return (
        p.category === 'shorts' ||
        p.categoryLabel === '쇼츠' ||
        p.title.toLowerCase().includes('쇼츠') ||
        p.title.toLowerCase().includes('shorts') ||
        p.subtitle.toLowerCase().includes('쇼츠') ||
        p.subtitle.toLowerCase().includes('숏폼')
      );
    }
    if (activeCategory === 'live') {
      return p.category === 'live';
    }
    return p.category === activeCategory;
  });

  return (
    <section id="work" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-neutral-900 pb-8 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-num text-amber-400 mb-2 uppercase tracking-wider">
            <span>SELECTED ARCHIVE</span>
            <span>·</span>
            <span>2021 – 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight">
            WORK
          </h2>
        </div>

        {/* Tab Filter Control (Functional button tabs) */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-950 border border-neutral-800/80 rounded-xl self-start md:self-auto">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-400 text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <span className="font-mono-num opacity-75 mr-1.5">{cat.code}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-neutral-800 rounded-2xl">
          <Film className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
          <p className="text-neutral-400 text-sm">해당 카테고리의 프로젝트가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer flex flex-col bg-[#0d0d12] border border-neutral-800/80 rounded-2xl overflow-hidden hover:border-neutral-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-black/60"
            >
              {/* Media Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-between p-4 opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-end text-[11px] font-mono-num text-neutral-300">
                    <span className="text-neutral-400 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
                      {project.year}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono-num text-neutral-300 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>
                        {project.verticalPhotos && project.verticalPhotos.length > 0
                          ? `9:16 세로형 라이브 화면 ${project.verticalPhotos.length}장`
                          : project.id === 'project-live-commerce'
                          ? '9:16 세로형 라이브 화면 5장'
                          : project.videos && project.videos.length > 0
                          ? `${project.videos.length} VIDEOS ARCHIVE`
                          : project.id === 'project-nh-bank'
                          ? '6 VIDEOS ARCHIVE'
                          : '10 VIDEOS ARCHIVE'}
                      </span>
                    </span>
                    <div className="w-9 h-9 rounded-full bg-amber-400/90 text-black flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-md">
                      {project.verticalPhotos && project.verticalPhotos.length > 0 ? (
                        <Smartphone className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 translate-x-0.5 fill-current" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Meta & Title */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata with dot separators */}
                  <div className="flex items-center gap-1.5 text-xs text-amber-400/90 font-mono-num mb-2">
                    <span>{project.client}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.categoryLabel}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 mb-2 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-2 font-light leading-relaxed mb-4">
                    {project.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-900 flex items-center justify-between text-xs">
                  {/* Roles inline unboxed list */}
                  <div className="text-neutral-500 text-[11px] truncate max-w-[200px]">
                    {project.id === 'project-shorts-viral'
                      ? '숏폼 기획 및 제작'
                      : project.roles.join(' · ')}
                  </div>

                  <div className="flex items-center gap-1 font-semibold text-neutral-300 group-hover:text-amber-400 transition-colors text-[11px] uppercase tracking-wider font-mono-num shrink-0">
                    <span>VIEW PROJECT</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
