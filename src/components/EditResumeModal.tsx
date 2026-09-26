import React, { useState } from 'react';
import { X, Check, RotateCcw, FileText, Sparkles, Award, Wrench, Plus, Trash2 } from 'lucide-react';
import { ResumeData, ResumeAchievement } from '../types/portfolio';
import { DEFAULT_RESUME_DATA } from '../services/portfolioStorage';

interface EditResumeModalProps {
  initialData: ResumeData;
  onClose: () => void;
  onSave: (updated: ResumeData) => void;
}

export const EditResumeModal: React.FC<EditResumeModalProps> = ({
  initialData,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<ResumeData>(() => ({
    ...DEFAULT_RESUME_DATA,
    ...initialData,
  }));

  const handleChange = (field: keyof ResumeData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateAchievement = (
    index: number,
    field: keyof ResumeAchievement,
    value: string
  ) => {
    setFormData((prev) => {
      const achievements = prev.achievements.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      return { ...prev, achievements };
    });
  };

  const handleAddAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        { title: '신규 핵심 성과', description: '성과 및 프로젝트 상세 기술' },
      ],
    }));
  };

  const handleDeleteAchievement = (index: number) => {
    if (formData.achievements.length <= 1) {
      alert('최소 1개 이상의 핵심 성과가 필요합니다.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  const handleReset = () => {
    if (window.confirm('이력서 기본 정보 및 스택을 초기 기본값으로 복원하시겠습니까?')) {
      setFormData(DEFAULT_RESUME_DATA);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#0f0f15] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-auto text-neutral-200 flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800/80 bg-neutral-950/70 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                이력서(RESUME & CV) 정보 수정
              </h2>
              <p className="text-xs text-neutral-400 font-light">
                인적사항, 핵심 성과(Achievements), 장비 및 소프트웨어 스택을 수정합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto px-6 py-6 space-y-6">
          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <div className="text-xs font-mono-num uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>기본 인적사항 & 직무 타이틀</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
                  이름 (국문)
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="손성혁"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
                  영문 성명 (English Name)
                </label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => handleChange('nameEn', e.target.value)}
                  placeholder="SON SUNG HYUK"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
                직무 / 서브 타이틀
              </label>
              <input
                type="text"
                value={formData.roleTitle}
                onChange={(e) => handleChange('roleTitle', e.target.value)}
                placeholder="Video Producer & Content PD (영상 기획 · 연출 · 촬영 · 편집)"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
                  이메일 (Email)
                </label>
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="ssh641201@naver.com"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors font-mono-num"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
                  전화번호 (Phone)
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="010-6412-0176"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors font-mono-num"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
                  활동 지역 (Location)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="Seoul, South Korea"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
                자기소개 요약 (Summary Statement)
              </label>
              <textarea
                rows={3}
                value={formData.summary}
                onChange={(e) => handleChange('summary', e.target.value)}
                placeholder='기획 의도 수립부터 렌즈 앞 디렉팅, 컷편집, 라이브 송출까지 전체 영상 프로덕션 사이클을 설계하는 비디오 프로듀서...'
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl p-3 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors leading-relaxed"
              />
            </div>
          </div>

          {/* Section 2: Core Highlights & Achievements */}
          <div className="space-y-4 border-t border-neutral-800/80 pt-5">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono-num uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>핵심 성과 & 수상 실적 (CORE HIGHLIGHTS & ACHIEVEMENTS)</span>
              </div>
              <button
                type="button"
                onClick={handleAddAchievement}
                className="px-2.5 py-1 bg-neutral-900 border border-neutral-700 hover:border-amber-400 text-[11px] text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3 h-3 text-amber-400" />
                <span>성과 추가</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formData.achievements.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2 relative group"
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        handleUpdateAchievement(idx, 'title', e.target.value)
                      }
                      placeholder="성과 타이틀 (예: 유튜브 실버버튼 수훈)"
                      className="bg-neutral-900 border border-neutral-800 focus:border-amber-400 rounded-lg px-2.5 py-1 text-xs text-white font-bold focus:outline-none flex-1 mr-2"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteAchievement(idx)}
                      className="p-1 text-neutral-500 hover:text-red-400 rounded transition-colors"
                      title="성과 항목 삭제"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) =>
                      handleUpdateAchievement(idx, 'description', e.target.value)
                    }
                    placeholder="성과 설명 및 수치"
                    className="w-full bg-neutral-900/60 border border-neutral-800 focus:border-amber-400 rounded-lg p-2 text-xs text-neutral-300 placeholder-neutral-600 focus:outline-none leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Technical Proficiency / Equipment & Software */}
          <div className="space-y-4 border-t border-neutral-800/80 pt-5">
            <div className="text-xs font-mono-num uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-bold">
              <Wrench className="w-3.5 h-3.5" />
              <span>장비 및 소프트웨어 스택 (EQUIPMENT & SOFTWARE STACK)</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                  카메라 & 조명 (Cameras & Lighting)
                </label>
                <input
                  type="text"
                  value={formData.camerasLighting}
                  onChange={(e) => handleChange('camerasLighting', e.target.value)}
                  placeholder="Sony FX3, Sony FX6, GM Primes, Aputure 300d..."
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                  음향 & 방송 장비 (Audio & Broadcast Gear)
                </label>
                <input
                  type="text"
                  value={formData.audioBroadcast}
                  onChange={(e) => handleChange('audioBroadcast', e.target.value)}
                  placeholder="Sennheiser G4 Wireless, Blackmagic ATEM Mini Extreme ISO..."
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                  포스트 프로덕션 소프트웨어 (Post-Production Software)
                </label>
                <input
                  type="text"
                  value={formData.postProduction}
                  onChange={(e) => handleChange('postProduction', e.target.value)}
                  placeholder="Adobe Premiere Pro, DaVinci Resolve Studio, After Effects..."
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                  채널 운영 및 라이브 스트리밍 (Channel Operation)
                </label>
                <input
                  type="text"
                  value={formData.channelOperation}
                  onChange={(e) => handleChange('channelOperation', e.target.value)}
                  placeholder="YouTube Analytics, OBS Studio, vMix Live Streaming..."
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80">
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-xl text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>기본 이력서 정보로 복원</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded-xl text-xs font-medium transition-colors cursor-pointer"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-black rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-400/20"
              >
                <Check className="w-4 h-4" />
                <span>이력서 저장하기</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
