import React, { useState } from 'react';
import { X, Check, RotateCcw, Mail, Phone, Type, AlignLeft, Tag } from 'lucide-react';
import { ContactInfoConfig, DEFAULT_CONTACT_INFO } from '../services/portfolioStorage';

interface EditContactModalProps {
  initialData: ContactInfoConfig;
  onClose: () => void;
  onSave: (updated: ContactInfoConfig) => void;
}

export const EditContactModal: React.FC<EditContactModalProps> = ({
  initialData,
  onClose,
  onSave,
}) => {
  const [badge, setBadge] = useState(initialData.badge || DEFAULT_CONTACT_INFO.badge);
  const [headline, setHeadline] = useState(initialData.headline || DEFAULT_CONTACT_INFO.headline);
  const [subhead, setSubhead] = useState(initialData.subhead || DEFAULT_CONTACT_INFO.subhead);
  const [description, setDescription] = useState(initialData.description || DEFAULT_CONTACT_INFO.description);
  const [email, setEmail] = useState(initialData.email || DEFAULT_CONTACT_INFO.email);
  const [phone, setPhone] = useState(initialData.phone || DEFAULT_CONTACT_INFO.phone);
  const [errorMsg, setErrorMsg] = useState('');

  const handleReset = () => {
    if (window.confirm('문의 및 연락처 섹션 설정을 기본값으로 복원하시겠습니까?')) {
      setBadge(DEFAULT_CONTACT_INFO.badge);
      setHeadline(DEFAULT_CONTACT_INFO.headline);
      setSubhead(DEFAULT_CONTACT_INFO.subhead);
      setDescription(DEFAULT_CONTACT_INFO.description);
      setEmail(DEFAULT_CONTACT_INFO.email);
      setPhone(DEFAULT_CONTACT_INFO.phone);
      setErrorMsg('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline.trim()) {
      setErrorMsg('헤드라인 타이틀을 입력해주세요.');
      return;
    }
    if (!email.trim() && !phone.trim()) {
      setErrorMsg('이메일 또는 전화번호 중 최소 하나는 입력해야 합니다.');
      return;
    }

    onSave({
      badge: badge.trim(),
      headline: headline.trim(),
      subhead: subhead.trim(),
      description: description.trim(),
      email: email.trim(),
      phone: phone.trim(),
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
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                CONTACT 섹션 문구 및 연락처 수정
              </h3>
              <p className="text-[11px] text-neutral-400 font-light">
                하단 프로젝트 협업 문의 문구와 이메일/전화번호를 편집할 수 있습니다.
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1">
          {errorMsg && (
            <div className="p-3 bg-red-950/50 border border-red-500/50 rounded-xl text-xs text-red-300">
              {errorMsg}
            </div>
          )}

          {/* Section 1: Titles & Headlines */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono-num">
              <Type className="w-3.5 h-3.5" />
              <span>헤드라인 및 안내 문구</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-300 mb-1.5 font-medium flex items-center gap-1.5">
                  <Tag className="w-3 h-3 text-neutral-400" />
                  <span>상단 라벨 (Badge)</span>
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="예: START A PROJECT"
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-colors font-mono-num"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1.5 font-medium">
                  메인 타이틀 (Headline) <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="예: LET'S WORK TOGETHER"
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-colors font-display"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1.5 font-medium">
                서브 카피 (Subhead)
              </label>
              <input
                type="text"
                value={subhead}
                onChange={(e) => setSubhead(e.target.value)}
                placeholder="예: 새로운 콘텐츠를 함께 만들어보세요."
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1.5 font-medium">
                소개 본문 단락 (Description)
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="예: 기업 사내 영상, 브랜디드 다큐멘터리, 유튜브 채널 론칭과 성장..."
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-colors leading-relaxed resize-y"
              />
            </div>
          </div>

          {/* Section 2: Contact Information */}
          <div className="space-y-4 pt-3 border-t border-neutral-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono-num">
              <Mail className="w-3.5 h-3.5" />
              <span>연락처 정보 (이메일 & 전화번호)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-300 mb-1.5 font-medium flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-neutral-400" />
                  <span>이메일 주소</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="예: ssh641201@naver.com"
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1.5 font-medium flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-neutral-400" />
                  <span>전화번호</span>
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="예: 010-6412-0176"
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-colors font-mono"
                />
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 space-y-3 text-center">
            <div className="text-[11px] font-mono-num uppercase tracking-wider text-amber-400 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>실시간 미리보기 (Live Preview)</span>
            </div>
            {badge && (
              <div className="text-[11px] font-mono-num uppercase tracking-wider text-amber-400">
                {badge}
              </div>
            )}
            <h4 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
              {headline || "LET'S WORK TOGETHER"}
            </h4>
            {subhead && (
              <p className="text-xs sm:text-sm text-neutral-300 font-light">
                {subhead}
              </p>
            )}
            {description && (
              <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed font-light max-w-lg mx-auto">
                {description}
              </p>
            )}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              {email && (
                <div className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 font-mono flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-amber-400" />
                  <span>{email}</span>
                </div>
              )}
              {phone && (
                <div className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 font-mono flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-amber-400" />
                  <span>{phone}</span>
                </div>
              )}
            </div>
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
