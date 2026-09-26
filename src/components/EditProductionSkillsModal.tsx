import React, { useState } from 'react';
import { X, Check, RotateCcw, Plus, Trash2, Cpu, Wrench, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';
import { SkillItem } from '../types/portfolio';
import { PRODUCTION_SKILLS } from '../data/initialProjects';

interface EditProductionSkillsModalProps {
  initialSkills: SkillItem[];
  onClose: () => void;
  onSave: (updated: SkillItem[]) => void;
}

export const EditProductionSkillsModal: React.FC<EditProductionSkillsModalProps> = ({
  initialSkills,
  onClose,
  onSave,
}) => {
  const [skills, setSkills] = useState<SkillItem[]>(() => {
    return initialSkills && initialSkills.length > 0 ? initialSkills : PRODUCTION_SKILLS;
  });

  const handleUpdateSkill = (index: number, field: keyof SkillItem, value: any) => {
    setSkills((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleUpdateTools = (index: number, toolsString: string) => {
    const tools = toolsString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    handleUpdateSkill(index, 'tools', tools);
  };

  const handleAddSkill = () => {
    const newSkill: SkillItem = {
      name: '새로운 프로덕션 스킬',
      nameEn: 'New Production Skill',
      level: 90,
      description: '새로운 기술 및 워크플로우에 대한 설명입니다.',
      tools: ['Tool 1', 'Tool 2'],
    };
    setSkills((prev) => [...prev, newSkill]);
  };

  const handleDeleteSkill = (index: number) => {
    if (skills.length <= 1) {
      alert('최소 1개 이상의 스킬이 필요합니다.');
      return;
    }
    if (window.confirm(`'${skills[index].name}' 스킬을 삭제하시겠습니까?`)) {
      setSkills((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= skills.length) return;
    setSkills((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[newIdx];
      copy[newIdx] = temp;
      return copy;
    });
  };

  const handleReset = () => {
    if (window.confirm('모든 제작 스킬을 기본 항목으로 복원하시겠습니까?')) {
      setSkills(PRODUCTION_SKILLS);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(skills);
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
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                PRODUCTION SKILLS (제작 역량) 수정
              </h2>
              <p className="text-xs text-neutral-400 font-light">
                스킬명, 영문명, 설명, 사용 소프트웨어 및 하드웨어를 추가·수정·삭제합니다.
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
              등록된 스킬: <strong className="text-amber-400">{skills.length}개</strong>
            </span>
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-3.5 py-1.5 bg-neutral-900 border border-neutral-700 hover:border-amber-400 text-xs font-medium text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>새 스킬 추가</span>
            </button>
          </div>

          <div className="space-y-4">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-4 transition-all hover:border-neutral-700"
              >
                {/* Top Row: Title, En Title, Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-900">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono-num font-bold text-amber-400 flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => handleUpdateSkill(idx, 'name', e.target.value)}
                      placeholder="스킬 국문명 (예: 콘텐츠 기획 & 연출)"
                      className="bg-neutral-900 border border-neutral-800 focus:border-amber-400 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-white font-bold focus:outline-none min-w-[200px]"
                    />
                    <input
                      type="text"
                      value={skill.nameEn}
                      onChange={(e) => handleUpdateSkill(idx, 'nameEn', e.target.value)}
                      placeholder="영문명 (예: Content Planning)"
                      className="bg-neutral-900 border border-neutral-800 focus:border-amber-400 rounded-lg px-2.5 py-1.5 text-xs text-neutral-400 font-mono-num focus:outline-none min-w-[160px]"
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
                      disabled={idx === skills.length - 1}
                      onClick={() => handleMove(idx, 'down')}
                      className="p-1.5 bg-neutral-900 border border-neutral-800 disabled:opacity-30 rounded-lg hover:border-neutral-600 text-neutral-300 transition-colors cursor-pointer"
                      title="아래로 이동"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(idx)}
                      className="p-1.5 bg-neutral-900 border border-neutral-800 hover:border-red-500/60 rounded-lg text-neutral-400 hover:text-red-400 transition-colors cursor-pointer ml-1"
                      title="스킬 삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                    역량 설명
                  </label>
                  <textarea
                    rows={2}
                    value={skill.description}
                    onChange={(e) => handleUpdateSkill(idx, 'description', e.target.value)}
                    placeholder="해당 스킬에 대한 구체적인 업무 범위 및 전문성 기술"
                    className="w-full bg-neutral-900/70 border border-neutral-800 focus:border-amber-400 rounded-xl p-2.5 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Tools Used */}
                <div>
                  <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                    사용 툴 및 장비 (쉼표로 구분)
                  </label>
                  <input
                    type="text"
                    value={skill.tools.join(', ')}
                    onChange={(e) => handleUpdateTools(idx, e.target.value)}
                    placeholder="예: Adobe Premiere Pro, Sony FX3, After Effects"
                    className="w-full bg-neutral-900/70 border border-neutral-800 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-amber-200/90 placeholder-neutral-600 focus:outline-none"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {skill.tools.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono-num text-neutral-300 px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded"
                      >
                        {t}
                      </span>
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
              <span>기본 7개 스킬로 복원</span>
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
                <span>스킬 저장하기</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
