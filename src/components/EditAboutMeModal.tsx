import React, { useState } from 'react';
import { X, Check, RotateCcw, User, Sparkles, BookOpen, Layers } from 'lucide-react';
import { AboutMeData, PhilosophyPrinciple } from '../types/portfolio';
import { DEFAULT_ABOUT_ME } from '../services/portfolioStorage';

interface EditAboutMeModalProps {
  initialData: AboutMeData;
  onClose: () => void;
  onSave: (updated: AboutMeData) => void;
}

export const EditAboutMeModal: React.FC<EditAboutMeModalProps> = ({
  initialData,
  onClose,
  onSave,
}) => {
  const [badge, setBadge] = useState(initialData.badge || 'PROFILE & EXPERTISE');
  const [headline, setHeadline] = useState(initialData.headline || 'ABOUT ME');
  const [subheadline, setSubheadline] = useState(
    initialData.subheadline || '기획부터 촬영, 편집까지 콘텐츠 제작의 전 과정을 경험하고 완결짓는 영상 PD 손성혁입니다.'
  );
  const [storyText, setStoryText] = useState(
    initialData.storyParagraphs ? initialData.storyParagraphs.join('\n\n') : ''
  );
  const [principles, setPrinciples] = useState<PhilosophyPrinciple[]>(
    initialData.principles && initialData.principles.length > 0
      ? initialData.principles
      : DEFAULT_ABOUT_ME.principles
  );

  const handleUpdatePrinciple = (index: number, field: keyof PhilosophyPrinciple, value: string) => {
    setPrinciples((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleReset = () => {
    if (window.confirm('ABOUT ME 및 제작 철학을 기본 소개 내용으로 복원하시겠습니까?')) {
      setBadge(DEFAULT_ABOUT_ME.badge);
      setHeadline(DEFAULT_ABOUT_ME.headline);
      setSubheadline(DEFAULT_ABOUT_ME.subheadline);
      setStoryText(DEFAULT_ABOUT_ME.storyParagraphs.join('\n\n'));
      setPrinciples(DEFAULT_ABOUT_ME.principles);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storyParagraphs = storyText
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    onSave({
      badge,
      headline,
      subheadline,
      storyParagraphs: storyParagraphs.length > 0 ? storyParagraphs : DEFAULT_ABOUT_ME.storyParagraphs,
      principles,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#0f0f15] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-auto text-neutral-200 flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800/80 bg-neutral-950/70 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                ABOUT ME 소개 수정
              </h2>
              <p className="text-xs text-neutral-400 font-light">
                메인 프로필 소개 문구와 상세 소개 스토리를 수정합니다.
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
          {/* Section 1: Headings */}
          <div className="space-y-4">
            <div className="text-xs font-mono-num uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>헤드라인 & 슬로건</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
                  상단 배지 (Badge)
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="예: PROFILE & EXPERTISE"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
                  메인 타이틀 (Title)
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="예: ABOUT ME"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
                핵심 한 줄 소개 (Subheadline)
              </label>
              <input
                type="text"
                value={subheadline}
                onChange={(e) => setSubheadline(e.target.value)}
                placeholder="예: 기획부터 촬영, 편집까지 콘텐츠 제작의 전 과정을 경험하고 완결짓는 영상 PD 손성혁입니다."
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Section 2: Story Paragraphs */}
          <div className="space-y-2 border-t border-neutral-800/80 pt-5">
            <div className="text-xs font-mono-num uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>상세 소개 스토리 본문 (단락은 빈 줄로 구분)</span>
            </div>
            <textarea
              rows={8}
              value={storyText}
              onChange={(e) => setStoryText(e.target.value)}
              placeholder="영상 제작에 대한 이야기와 경험, 전문성을 작성해주세요. 단락 구분은 엔터 두 번(빈 줄)으로 나뉩니다."
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl p-3.5 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors leading-relaxed"
            />
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80">
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-xl text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>기본 소개로 복원</span>
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
                <span>ABOUT ME 저장하기</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
