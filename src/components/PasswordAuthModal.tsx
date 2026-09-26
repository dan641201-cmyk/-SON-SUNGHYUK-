import React, { useState } from 'react';
import { Lock, X, Check, KeyRound, AlertCircle } from 'lucide-react';
import { verifyPassword, setAuthorized } from '../utils/auth';

interface PasswordAuthModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
  title?: string;
  description?: string;
}

export const PasswordAuthModal: React.FC<PasswordAuthModalProps> = ({
  isOpen,
  onSuccess,
  onClose,
  title = '관리자 및 수정 권한 인증',
  description = '수정 및 관리자 접근을 위해 비밀번호를 입력해주세요.',
}) => {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMsg('비밀번호를 입력해주세요.');
      return;
    }

    if (verifyPassword(password)) {
      setAuthorized(true);
      setErrorMsg('');
      setPassword('');
      onSuccess();
      onClose();
    } else {
      setErrorMsg('비밀번호가 올바르지 않습니다.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword('');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-sm bg-[#0e0e14] border border-neutral-800 rounded-2xl p-6 text-center shadow-2xl relative transition-transform ${
          isShaking ? 'translate-x-[-8px] duration-100 ring-2 ring-red-500/50' : ''
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Lock Icon */}
        <div className="w-14 h-14 rounded-2xl bg-amber-400/15 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-400/10">
          <Lock className="w-6 h-6" />
        </div>

        <h3 className="text-base font-bold text-white mb-1.5 font-display tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-neutral-400 font-light mb-6 leading-relaxed">
          {description}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              inputMode="numeric"
              maxLength={8}
              autoFocus
              placeholder="비밀번호 4자리 입력"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              className="w-full px-4 py-3 text-center text-lg font-mono-num tracking-widest bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl text-white placeholder-neutral-600 focus:outline-none transition-colors"
            />
          </div>

          {errorMsg && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-red-400 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-medium rounded-xl transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-md shadow-amber-400/20 flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>인증 확인</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
