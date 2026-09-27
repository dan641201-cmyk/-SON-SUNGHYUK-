import React from 'react';
import { CheckCircle, FileText } from 'lucide-react';
import { AboutMeData, SkillItem, CareerItem } from '../types/portfolio';
import { portfolioStorage } from '../services/portfolioStorage';

interface AboutSectionProps {
  onOpenResume: () => void;
  aboutData?: AboutMeData;
  skillsData?: SkillItem[];
  careersData?: CareerItem[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenResume,
  aboutData: propAboutData,
  skillsData: propSkillsData,
  careersData: propCareersData,
}) => {
  const localAboutData = portfolioStorage.getAboutMe();
  const localSkillsData = portfolioStorage.getProductionSkills();
  const localCareersData = portfolioStorage.getCareerHistory();

  const aboutData = propAboutData || localAboutData;
  const skillsData = propSkillsData || localSkillsData;
  const careersData = propCareersData || localCareersData;

  return (
    <section id="about" className="py-24 px-6 md:px-10 max-w-7xl mx-auto border-t border-neutral-900 relative">
      {/* Header: ABOUT ME (Clean presentation without edit button) */}
      <div className="mb-16">
        <div className="text-xs font-mono-num uppercase tracking-wider text-amber-400 mb-2">
          {aboutData.badge || 'PROFILE & EXPERTISE'}
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight">
          {aboutData.headline || 'ABOUT ME'}
        </h2>
        {aboutData.subheadline && (
          <p className="text-base sm:text-xl text-neutral-300 font-light mt-4 max-w-3xl leading-relaxed text-balance">
            {aboutData.subheadline}
          </p>
        )}
      </div>

      {/* Intro Story */}
      <div className="mb-20 max-w-4xl space-y-6">
        <div className="space-y-5 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
          {aboutData.storyParagraphs && aboutData.storyParagraphs.map((p, pIdx) => (
            <p key={pIdx}>{p}</p>
          ))}
        </div>
        <div className="pt-2 flex items-center gap-4">
          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 border border-neutral-700 hover:border-amber-400 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>상세 이력서 / 경력 기술서 보기</span>
          </button>
        </div>
      </div>

      {/* PRODUCTION SKILLS */}
      <div className="mb-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-900">
          <div>
            <div className="text-xs font-mono-num text-amber-400 uppercase tracking-wider mb-1">
              CORE CAPABILITIES
            </div>
            <h3 className="text-2xl font-bold font-display text-white">
              PRODUCTION SKILLS
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-num text-neutral-500">
              {skillsData.length} SKILLS ACTIVE
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((skill, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#0d0d12] border border-neutral-800/80 rounded-2xl flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-colors"
            >
              <div>
                <div className="mb-1">
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {skill.name}
                  </h4>
                </div>
                <div className="text-[11px] font-mono-num text-amber-400/90 uppercase mb-3">
                  {skill.nameEn}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {skill.description}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-900/80">
                <div className="flex flex-wrap gap-1.5">
                  {skill.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono-num text-neutral-300 px-2 py-0.5 bg-neutral-950 border border-neutral-800 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CAREER TIMELINE */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-900">
          <div>
            <div className="text-xs font-mono-num text-amber-400 uppercase tracking-wider mb-1">
              WORK EXPERIENCE
            </div>
            <h3 className="text-2xl font-bold font-display text-white">
              CAREER
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-num text-neutral-500">
              {careersData.length} CAREER TRACKS
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {careersData.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-[#0d0d12] border border-neutral-800/80 rounded-2xl transition-all hover:border-neutral-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-bold text-white">
                    {item.company}
                  </h4>
                  <span className="text-xs text-neutral-400">·</span>
                  <span className="text-xs text-neutral-400 font-medium">
                    {item.team}
                  </span>
                </div>
                <div className="text-xs font-mono-num text-amber-400 font-medium">
                  {item.period}
                </div>
              </div>

              <div className="text-xs font-semibold text-neutral-300 mb-2">
                {item.role}
              </div>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light mb-4">
                {item.description}
              </p>

              <div className="space-y-2 border-t border-neutral-900 pt-3">
                {item.highlights && item.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
