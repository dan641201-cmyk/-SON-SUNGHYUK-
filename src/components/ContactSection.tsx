import React, { useState } from 'react';
import { Mail, Phone, Copy, Check } from 'lucide-react';

interface ContactSectionProps {
  onOpenResume?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const emailAddress = 'ssh641201@naver.com';
  const phoneNumber = '010-6412-0176';
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-10 max-w-4xl mx-auto border-t border-neutral-900 text-center">
      <div className="text-xs font-mono-num uppercase tracking-wider text-amber-400 mb-2">
        START A PROJECT
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight mb-4">
        LET'S WORK TOGETHER
      </h2>

      <p className="text-lg text-neutral-300 font-light mb-2">
        새로운 콘텐츠를 함께 만들어보세요.
      </p>
      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light mb-10 max-w-xl mx-auto">
        기업 사내 영상, 브랜디드 다큐멘터리, 유튜브 채널 론칭과 성장, 라이브 송출까지 다양한 프로젝트의 목적을 이해하고, 그에 맞는 콘텐츠 제작 방식을 설계하고 구현합니다.
      </p>

      {/* Contact Cards: Email & Phone directly under it */}
      <div className="flex flex-col items-center gap-3 max-w-md mx-auto">
        {/* Email Box */}
        <div className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-400/60 transition-all text-neutral-200 text-sm font-mono-num shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <a
              href={`mailto:${emailAddress}`}
              className="text-white hover:text-amber-400 transition-colors tracking-tight font-medium"
            >
              {emailAddress}
            </a>
          </div>
          <button
            onClick={() => handleCopy(emailAddress, 'email')}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1"
            title="이메일 복사"
          >
            {copiedType === 'email' ? (
              <span className="text-amber-400 text-xs flex items-center gap-1 font-mono-num font-semibold">
                <Check className="w-3.5 h-3.5" /> 복사됨
              </span>
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Phone Box */}
        <div className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-400/60 transition-all text-neutral-200 text-sm font-mono-num shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <a
              href={`tel:${phoneNumber.replace(/-/g, '')}`}
              className="text-white hover:text-amber-400 transition-colors tracking-wider font-semibold"
            >
              {phoneNumber}
            </a>
          </div>
          <button
            onClick={() => handleCopy(phoneNumber, 'phone')}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1"
            title="전화번호 복사"
          >
            {copiedType === 'phone' ? (
              <span className="text-amber-400 text-xs flex items-center gap-1 font-mono-num font-semibold">
                <Check className="w-3.5 h-3.5" /> 복사됨
              </span>
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
