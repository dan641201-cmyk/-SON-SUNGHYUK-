import React, { useState } from 'react';
import { X, Printer, Mail, Phone, MapPin, Award, CheckCircle, Edit2, Check } from 'lucide-react';
import { portfolioStorage } from '../services/portfolioStorage';
import { ResumeData } from '../types/portfolio';
import { EditResumeModal } from './EditResumeModal';
import { PasswordAuthModal } from './PasswordAuthModal';
import { isAuthorized } from '../utils/auth';

interface ResumeModalProps {
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ onClose }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(() =>
    portfolioStorage.getResumeData()
  );
  const [careers, setCareers] = useState(() => portfolioStorage.getCareerHistory());
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const handleOpenEdit = () => {
    if (isAuthorized()) {
      setIsEditOpen(true);
    } else {
      setIsAuthOpen(true);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveResume = (updated: ResumeData) => {
    portfolioStorage.saveResumeData(updated);
    setResumeData(updated);
    showToast('이력서 정보가 성공적으로 수정되었습니다.');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200 print:p-0 print:bg-white"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] bg-neutral-900 border border-amber-400 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 print:hidden">
          <Check className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-auto text-neutral-200 flex flex-col max-h-[92vh] print:max-h-none print:border-none print:bg-white print:text-black"
      >
        {/* Top Action Bar (hidden on print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0d0d12] shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-num font-semibold text-amber-400">
              RESUME & CV
            </span>
            <span className="text-neutral-600">/</span>
            <span className="text-xs text-neutral-400">영상 제작자 {resumeData.name}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Edit Resume Button */}
            <button
              onClick={handleOpenEdit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-200 hover:text-white bg-neutral-900 border border-neutral-700 hover:border-amber-400 rounded-lg transition-colors cursor-pointer"
              title="이력서 인적사항, 핵심 성과, 장비 스택 수정"
            >
              <Edit2 className="w-3.5 h-3.5 text-amber-400" />
              <span>이력서 수정</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-700 rounded-lg hover:border-neutral-500 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>인쇄 / PDF 저장</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-neutral-950 print:bg-white print:text-neutral-900">
          {/* Header Card */}
          <div className="border-b border-neutral-800 pb-8 print:border-neutral-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold font-display text-white print:text-black tracking-tight">
                  {resumeData.name} {resumeData.nameEn ? `(${resumeData.nameEn})` : ''}
                </h1>
                <p className="text-base text-amber-400 font-medium mt-1">
                  {resumeData.roleTitle}
                </p>
              </div>

              <div className="text-xs space-y-1.5 text-neutral-400 print:text-neutral-600 font-mono-num">
                {resumeData.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>{resumeData.email}</span>
                  </div>
                )}
                {resumeData.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{resumeData.phone}</span>
                  </div>
                )}
                {resumeData.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{resumeData.location}</span>
                  </div>
                )}
              </div>
            </div>

            {resumeData.summary && (
              <p className="mt-4 text-xs sm:text-sm text-neutral-300 print:text-neutral-700 leading-relaxed font-light">
                {resumeData.summary}
              </p>
            )}
          </div>

          {/* Core Competencies & Achievements */}
          {resumeData.achievements && resumeData.achievements.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-widest font-mono-num text-neutral-400 print:text-neutral-500 mb-3">
                CORE HIGHLIGHTS & ACHIEVEMENTS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {resumeData.achievements.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-neutral-900/60 print:bg-neutral-100 rounded-lg border border-neutral-800/80 print:border-neutral-200"
                  >
                    <div className="font-semibold text-white print:text-black mb-1">
                      {item.title}
                    </div>
                    <div className="text-neutral-400 print:text-neutral-600">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs uppercase tracking-widest font-mono-num text-neutral-400 print:text-neutral-500">
                WORK EXPERIENCE
              </h2>
            </div>
            <div className="space-y-6">
              {careers.map((job) => (
                <div
                  key={job.id}
                  className="border-l-2 border-amber-400/80 pl-4 py-0.5 space-y-1.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono-num">
                    <span className="font-bold text-white print:text-black text-sm">
                      {job.company} · {job.team}
                    </span>
                    <span className="text-amber-400 print:text-neutral-600">
                      {job.period}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-neutral-300 print:text-neutral-700">
                    {job.role}
                  </div>
                  <p className="text-xs text-neutral-400 print:text-neutral-600 leading-relaxed">
                    {job.description}
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-neutral-300 print:text-neutral-700">
                    {job.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400 print:text-neutral-500">·</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Proficiency */}
          <div>
            <h2 className="text-xs uppercase tracking-widest font-mono-num text-neutral-400 print:text-neutral-500 mb-3">
              EQUIPMENT & SOFTWARE STACK
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {resumeData.camerasLighting && (
                <div>
                  <span className="text-neutral-400 font-medium block mb-1">
                    Cameras & Lighting:
                  </span>
                  <p className="text-neutral-200 print:text-neutral-800">
                    {resumeData.camerasLighting}
                  </p>
                </div>
              )}
              {resumeData.audioBroadcast && (
                <div>
                  <span className="text-neutral-400 font-medium block mb-1">
                    Audio & Broadcast Gear:
                  </span>
                  <p className="text-neutral-200 print:text-neutral-800">
                    {resumeData.audioBroadcast}
                  </p>
                </div>
              )}
              {resumeData.postProduction && (
                <div>
                  <span className="text-neutral-400 font-medium block mb-1">
                    Post-Production Software:
                  </span>
                  <p className="text-neutral-200 print:text-neutral-800">
                    {resumeData.postProduction}
                  </p>
                </div>
              )}
              {resumeData.channelOperation && (
                <div>
                  <span className="text-neutral-400 font-medium block mb-1">
                    Channel Operation:
                  </span>
                  <p className="text-neutral-200 print:text-neutral-800">
                    {resumeData.channelOperation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#0d0d12] border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500 print:hidden shrink-0">
          <span>{resumeData.name} 포트폴리오 웹사이트 공식 이력서</span>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>

      {/* Password Auth Modal */}
      {isAuthOpen && (
        <PasswordAuthModal
          isOpen={isAuthOpen}
          title="이력서 수정 권한 인증"
          description="이력서 내용을 수정하려면 비밀번호를 입력해주세요."
          onSuccess={() => setIsEditOpen(true)}
          onClose={() => setIsAuthOpen(false)}
        />
      )}

      {/* Edit Resume Modal */}
      {isEditOpen && (
        <EditResumeModal
          initialData={resumeData}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSaveResume}
        />
      )}
    </div>
  );
};
