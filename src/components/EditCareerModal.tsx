import React, { useState } from 'react';
import { X, Check, RotateCcw, Plus, Trash2, Briefcase, ChevronUp, ChevronDown, CheckCircle } from 'lucide-react';
import { CareerItem } from '../types/portfolio';
import { CAREER_HISTORY } from '../data/initialProjects';

interface EditCareerModalProps {
  initialCareers: CareerItem[];
  onClose: () => void;
  onSave: (updated: CareerItem[]) => void;
}

export const EditCareerModal: React.FC<EditCareerModalProps> = ({
  initialCareers,
  onClose,
  onSave,
}) => {
  const [careers, setCareers] = useState<CareerItem[]>(() => {
    return initialCareers && initialCareers.length > 0 ? initialCareers : CAREER_HISTORY;
  });

  const handleUpdateCareer = (index: number, field: keyof CareerItem, value: any) => {
    setCareers((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleUpdateHighlights = (index: number, highlightsText: string) => {
    const list = highlightsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    handleUpdateCareer(index, 'highlights', list);
  };

  const handleAddCareer = () => {
    const newCareer: CareerItem = {
      id: `career-${Date.now()}`,
      company: '새로운 회사 / 프로젝트',
      team: '콘텐츠 제작팀',
      role: '영상 PD / 디렉터',
      period: '2026.01 – 현재',
      description: '담당했던 주요 제작 업무 및 프로젝트 총괄 내역을 기술합니다.',
      highlights: ['핵심 성과 지표 1', '주요 프로젝트 완수 및 런칭 성과'],
    };
    setCareers((prev) => [newCareer, ...prev]);
  };

  const handleDeleteCareer = (index: number) => {
    if (careers.length <= 1) {
      alert('최소 1개 이상의 경력 항목이 필요합니다.');
      return;
    }
    if (window.confirm(`'${careers[index].company}' 경력 항목을 삭제하시겠습니까?`)) {
      setCareers((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= careers.length) return;
    setCareers((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[newIdx];
      copy[newIdx] = temp;
      return copy;
    });
  };

  const handleReset = () => {
    if (window.confirm('모든 경력 이력을 기본 데이터로 복원하시겠습니까?')) {
      setCareers(CAREER_HISTORY);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(careers);
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
        className="relative w-full max-w-4xl bg-[#0f0f15] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-auto text-neutral-200 flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800/80 bg-neutral-950/70 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                CAREER (경력 이력) 수정
              </h2>
              <p className="text-xs text-neutral-400 font-light">
                회사명, 소속 부서, 역할, 근무 기간, 주요 업무 및 하이라이트 성과를 관리합니다.
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
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-num text-neutral-400">
              등록된 경력: <strong className="text-amber-400">{careers.length}개</strong>
            </span>
            <button
              type="button"
              onClick={handleAddCareer}
              className="px-3.5 py-1.5 bg-neutral-900 border border-neutral-700 hover:border-amber-400 text-xs font-medium text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>새 경력 추가</span>
            </button>
          </div>

          <div className="space-y-5">
            {careers.map((career, idx) => (
              <div
                key={career.id || idx}
                className="p-4 sm:p-6 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-4 transition-all hover:border-neutral-700"
              >
                {/* Header Row: Company, Period, Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-900">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono-num font-bold text-amber-400 flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={career.company}
                      onChange={(e) => handleUpdateCareer(idx, 'company', e.target.value)}
                      placeholder="회사명 (예: 그립컴퍼니)"
                      className="bg-neutral-900 border border-neutral-800 focus:border-amber-400 rounded-lg px-3 py-1.5 text-sm sm:text-base text-white font-bold focus:outline-none flex-1 min-w-[180px]"
                    />
                    <input
                      type="text"
                      value={career.period}
                      onChange={(e) => handleUpdateCareer(idx, 'period', e.target.value)}
                      placeholder="근무 기간 (예: 2023.03 – 2026.02)"
                      className="bg-neutral-900 border border-neutral-800 focus:border-amber-400 rounded-lg px-2.5 py-1.5 text-xs text-amber-300 font-mono-num focus:outline-none w-[170px]"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, 'up')}
                      className="p-1.5 bg-neutral-900 border border-neutral-800 disabled:opacity-30 rounded-lg hover:border-neutral-600 text-neutral-300 transition-colors cursor-pointer"
                      title="위로 이동"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === careers.length - 1}
                      onClick={() => handleMove(idx, 'down')}
                      className="p-1.5 bg-neutral-900 border border-neutral-800 disabled:opacity-30 rounded-lg hover:border-neutral-600 text-neutral-300 transition-colors cursor-pointer"
                      title="아래로 이동"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCareer(idx)}
                      className="p-1.5 bg-neutral-900 border border-neutral-800 hover:border-red-500/60 rounded-lg text-neutral-400 hover:text-red-400 transition-colors cursor-pointer ml-1"
                      title="경력 삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Team & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                      소속 부서 / 팀
                    </label>
                    <input
                      type="text"
                      value={career.team}
                      onChange={(e) => handleUpdateCareer(idx, 'team', e.target.value)}
                      placeholder="예: 라이브 미디어 프로덕션"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                      담당 직무 / 역할
                    </label>
                    <input
                      type="text"
                      value={career.role}
                      onChange={(e) => handleUpdateCareer(idx, 'role', e.target.value)}
                      placeholder="예: 미디어 총괄 영상 PD / 테크니컬 디렉터"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                    담당 업무 요약
                  </label>
                  <textarea
                    rows={2}
                    value={career.description}
                    onChange={(e) => handleUpdateCareer(idx, 'description', e.target.value)}
                    placeholder="해당 직무에서 수행한 전반적인 업무와 프로젝트 범위"
                    className="w-full bg-neutral-900/70 border border-neutral-800 focus:border-amber-400 rounded-xl p-2.5 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Highlights (줄바꿈 구분) */}
                <div>
                  <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                    주요 성과 및 하이라이트 (한 줄에 하나씩 작성)
                  </label>
                  <textarea
                    rows={3}
                    value={career.highlights.join('\n')}
                    onChange={(e) => handleUpdateHighlights(idx, e.target.value)}
                    placeholder="예: 현대백화점, 아모레퍼시픽 등 대형 브랜드 라이브 150회 이상 송출"
                    className="w-full bg-neutral-900/70 border border-neutral-800 focus:border-amber-400 rounded-xl p-2.5 text-xs text-amber-200/90 placeholder-neutral-600 focus:outline-none leading-relaxed"
                  />
                  <div className="space-y-1 mt-2">
                    {career.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-1.5 text-[11px] text-neutral-300">
                        <CheckCircle className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80">
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-xl text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>기본 경력 이력으로 복원</span>
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
                <span>경력 이력 저장하기</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
