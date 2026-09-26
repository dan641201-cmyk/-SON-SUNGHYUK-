import React, { useState } from 'react';
import { X, Check, RotateCcw, Sparkles, Type, AlignLeft } from 'lucide-react';
import { HeroIntroConfig, DEFAULT_HERO_INTRO } from '../services/portfolioStorage';

interface EditHeroIntroModalProps {
  initialData: HeroIntroConfig;
  onClose: () => void;
  onSave: (updated: HeroIntroConfig) => void;
}

export const EditHeroIntroModal: React.FC<EditHeroIntroModalProps> = ({
  initialData,
  onClose,
  onSave,
}) => {
  const [headlineLine1, setHeadlineLine1] = useState(initialData.headlineLine1 || DEFAULT_HERO_INTRO.headlineLine1);
  const [headlineLine2, setHeadlineLine2] = useState(initialData.headlineLine2 || DEFAULT_HERO_INTRO.headlineLine2);
  const [subhead, setSubhead] = useState(initialData.subhead || DEFAULT_HERO_INTRO.subhead);
  const [description, setDescription] = useState(initialData.description || DEFAULT_HERO_INTRO.description);
  const [errorMsg, setErrorMsg] = useState('');

  const handleReset = () => {
    if (window.confirm('메인 인트로 문구를 기본 내용으로 복원하시겠습니까?')) {
      setHeadlineLine1(DEFAULT_HERO_INTRO.headlineLine1);
      setHeadlineLine2(DEFAULT_HERO_INTRO.headlineLine2);
      setSubhead(DEFAULT_HERO_INTRO.subhead);
      setDescription(DEFAULT_HERO_INTRO.description);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headlineLine1.trim() && !headlineLine2.trim()) {
      setErrorMsg('헤드라인 문구를 입력해주세요.');
      return;
    }

    onSave({
      headlineLine1: headlineLine1.trim(),
      headlineLine2: headlineLine2.trim(),
      subhead: subhead.trim(),
      description: description.trim(),
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#0e0e14] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                메인 인트로 문구 수정
              </h3>
              <p className="text-[11px] text-neutral-400 font-light">
                메인 첫 화면의 헤드라인과 자기소개 문구를 편집할 수 있습니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1">
          {errorMsg && (
            <div className="p-3 bg-red-950/50 border border-red-500/50 rounded-xl text-xs text-red-300">
              {errorMsg}
            </div>
          )}

          {/* Section 1: Main Headline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono-num">
              <Type className="w-3.5 h-3.5" />
              <span>메인 헤드라인 (Main Headline)</span>
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1.5 font-medium">
                헤드라인 첫 번째 줄
              </label>
              <input
                type="text"
                value={headlineLine1}
                onChange={(e) => setHeadlineLine1(e.target.value)}
                placeholder="예: 사람과 브랜드를 이해하고,"
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1.5 font-medium">
                헤드라인 두 번째 줄 (그라디언트 강조 효과 적용)
              </label>
              <input
                type="text"
                value={headlineLine2}
                onChange={(e) => setHeadlineLine2(e.target.value)}
                placeholder="예: 그 가치를 콘텐츠에 담습니다."
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Section 2: Subhead & Bio Paragraph */}
          <div className="space-y-4 pt-2 border-t border-neutral-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono-num">
              <AlignLeft className="w-3.5 h-3.5" />
              <span>서브 카피 & 소개 본문</span>
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1.5 font-medium">
                서브 캐치프레이즈 (Subheadline)
              </label>
              <input
                type="text"
                value={subhead}
                onChange={(e) => setSubhead(e.target.value)}
                placeholder="예: 콘텐츠의 시작부터 완성까지 모든 장면을 설계합니다."
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1.5 font-medium">
                소개 본문 단락 (Bio / Experience)
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="예: 콘텐츠를 기획하고 촬영부터 편집, 라이브 송출까지 직접 수행하며, 농협은행과 그립컴퍼니 등에서 재직하며..."
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors leading-relaxed resize-y"
              />
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 space-y-2.5">
            <div className="text-[11px] font-mono-num uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>실시간 미리보기 (Live Preview)</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-display text-white leading-tight">
              {headlineLine1 || '헤드라인 첫 번째 줄'} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
                {headlineLine2 || '헤드라인 두 번째 줄'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {subhead || '서브 캐치프레이즈'}
            </p>
            <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed font-light">
              {description || '소개 본문'}
            </p>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-800 bg-neutral-950/80 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 text-xs text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>기본값 복원</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-400/10"
            >
              <Check className="w-4 h-4" />
              <span>저장 완료</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
