import React, { useState } from 'react';
import { CheckCircle, Award, Compass, Video, Cpu, FileText, Edit2, Sparkles, Briefcase, Check } from 'lucide-react';
import { AboutMeData, SkillItem, CareerItem } from '../types/portfolio';
import { portfolioStorage } from '../services/portfolioStorage';
import { EditAboutMeModal } from './EditAboutMeModal';
import { EditProductionSkillsModal } from './EditProductionSkillsModal';
import { EditCareerModal } from './EditCareerModal';
import { PasswordAuthModal } from './PasswordAuthModal';
import { isAuthorized } from '../utils/auth';

interface AboutSectionProps {
  onOpenResume: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume }) => {
  const [aboutData, setAboutData] = useState<AboutMeData>(() => portfolioStorage.getAboutMe());
  const [skillsData, setSkillsData] = useState<SkillItem[]>(() => portfolioStorage.getProductionSkills());
  const [careersData, setCareersData] = useState<CareerItem[]>(() => portfolioStorage.getCareerHistory());

  const [isEditAboutOpen, setIsEditAboutOpen] = useState<boolean>(false);
  const [isEditSkillsOpen, setIsEditSkillsOpen] = useState<boolean>(false);
  const [isEditCareerOpen, setIsEditCareerOpen] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<null | 'about' | 'skills' | 'career'>(null);
  const [toastMessage, setToastMessage] = useState<string>('');

  const executeProtectedAction = (action: 'about' | 'skills' | 'career') => {
    if (isAuthorized()) {
      if (action === 'about') setIsEditAboutOpen(true);
      if (action === 'skills') setIsEditSkillsOpen(true);
      if (action === 'career') setIsEditCareerOpen(true);
    } else {
      setPendingAction(action);
    }
  };

  const handleAuthSuccess = () => {
    if (pendingAction === 'about') setIsEditAboutOpen(true);
    if (pendingAction === 'skills') setIsEditSkillsOpen(true);
    if (pendingAction === 'career') setIsEditCareerOpen(true);
    setPendingAction(null);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSaveAbout = (updated: AboutMeData) => {
    portfolioStorage.saveAboutMe(updated);
    setAboutData(updated);
    showToast('ABOUT ME 소개 내용이 성공적으로 수정되었습니다.');
  };

  const handleSaveSkills = (updated: SkillItem[]) => {
    portfolioStorage.saveProductionSkills(updated);
    setSkillsData(updated);
    showToast('PRODUCTION SKILLS 제작 역량이 성공적으로 수정되었습니다.');
  };

  const handleSaveCareers = (updated: CareerItem[]) => {
    portfolioStorage.saveCareerHistory(updated);
    setCareersData(updated);
    showToast('CAREER 경력 이력이 성공적으로 수정되었습니다.');
  };

  return (
    <section id="about" className="py-24 px-6 md:px-10 max-w-7xl mx-auto border-t border-neutral-900 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[90] bg-neutral-900 border border-amber-400 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3">
          <Check className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header: ABOUT ME with Edit Button */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono-num uppercase tracking-wider text-amber-400 mb-2">
            {aboutData.badge || 'PROFILE & EXPERTISE'}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight">
            {aboutData.headline || 'ABOUT ME'}
          </h2>
          <p className="text-base sm:text-xl text-neutral-300 font-light mt-4 max-w-3xl leading-relaxed text-balance">
            {aboutData.subheadline}
          </p>
        </div>

        {/* ABOUT ME Edit Button */}
        <button
          onClick={() => executeProtectedAction('about')}
          className="self-start md:self-auto px-4 py-2 bg-neutral-900/90 border border-neutral-800 hover:border-amber-400 text-xs font-medium text-neutral-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm shrink-0 hover:bg-neutral-850"
          title="ABOUT ME 소개글 수정"
        >
          <Edit2 className="w-3.5 h-3.5 text-amber-400" />
          <span>ABOUT ME 수정</span>
        </button>
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

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="hidden sm:inline text-xs font-mono-num text-neutral-500">
              {skillsData.length} SKILLS ACTIVE
            </span>
            {/* PRODUCTION SKILLS Edit Button */}
            <button
              onClick={() => executeProtectedAction('skills')}
              className="px-4 py-2 bg-neutral-900/90 border border-neutral-800 hover:border-amber-400 text-xs font-medium text-neutral-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm shrink-0 hover:bg-neutral-850"
              title="PRODUCTION SKILLS 제작 역량 항목 수정"
            >
              <Edit2 className="w-3.5 h-3.5 text-amber-400" />
              <span>PRODUCTION SKILLS 수정</span>
            </button>
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

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="hidden sm:inline text-xs font-mono-num text-neutral-500">
              {careersData.length} CAREER TRACKS
            </span>
            {/* CAREER Edit Button */}
            <button
              onClick={() => executeProtectedAction('career')}
              className="px-4 py-2 bg-neutral-900/90 border border-neutral-800 hover:border-amber-400 text-xs font-medium text-neutral-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm shrink-0 hover:bg-neutral-850"
              title="CAREER 경력 이력 목록 수정"
            >
              <Edit2 className="w-3.5 h-3.5 text-amber-400" />
              <span>CAREER 수정</span>
            </button>
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

      {/* Editing Modals */}
      {pendingAction && (
        <PasswordAuthModal
          isOpen={Boolean(pendingAction)}
          title={
            pendingAction === 'about'
              ? 'ABOUT ME 수정 권한 인증'
              : pendingAction === 'skills'
              ? 'PRODUCTION SKILLS 수정 권한 인증'
              : 'CAREER 수정 권한 인증'
          }
          description="항목을 수정하려면 비밀번호를 입력해주세요."
          onSuccess={handleAuthSuccess}
          onClose={() => setPendingAction(null)}
        />
      )}

      {isEditAboutOpen && (
        <EditAboutMeModal
          initialData={aboutData}
          onClose={() => setIsEditAboutOpen(false)}
          onSave={handleSaveAbout}
        />
      )}

      {isEditSkillsOpen && (
        <EditProductionSkillsModal
          initialSkills={skillsData}
          onClose={() => setIsEditSkillsOpen(false)}
          onSave={handleSaveSkills}
        />
      )}

      {isEditCareerOpen && (
        <EditCareerModal
          initialCareers={careersData}
          onClose={() => setIsEditCareerOpen(false)}
          onSave={handleSaveCareers}
        />
      )}
    </section>
  );
};
