import React, { useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Smartphone,
  Eye,
  Tag,
  Radio,
  Edit2,
  ExternalLink,
} from 'lucide-react';
import { VerticalPhotoItem } from '../types/portfolio';

interface VerticalPhotoLightboxProps {
  photo: VerticalPhotoItem | null;
  photos: VerticalPhotoItem[];
  onClose: () => void;
  onSelectPhoto: (photo: VerticalPhotoItem) => void;
  onEditSlot?: (photo: VerticalPhotoItem) => void;
}

export const VerticalPhotoLightbox: React.FC<VerticalPhotoLightboxProps> = ({
  photo,
  photos,
  onClose,
  onSelectPhoto,
  onEditSlot,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!photo) return;
      const currentIndex = photos.findIndex((p) => p.id === photo.id);
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectPhoto(photos[currentIndex - 1]);
      } else if (e.key === 'ArrowRight' && currentIndex < photos.length - 1) {
        onSelectPhoto(photos[currentIndex + 1]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, photos, onClose, onSelectPhoto]);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);
  const totalCount = photos.length;
  const prevPhoto = currentIndex > 0 ? photos[currentIndex - 1] : null;
  const nextPhoto = currentIndex < totalCount - 1 ? photos[currentIndex + 1] : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[95vh] flex flex-col lg:flex-row items-center justify-center gap-6 text-neutral-200"
      >
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute -top-3 right-0 lg:-top-10 lg:-right-2 p-2 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-full transition-colors z-20 cursor-pointer border border-neutral-700/60 shadow-lg"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left / Prev Button */}
        {prevPhoto && (
          <button
            onClick={() => onSelectPhoto(prevPhoto)}
            className="hidden sm:flex absolute left-2 lg:-left-14 top-1/2 -translate-y-1/2 p-3 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/60 text-white rounded-full transition-all hover:scale-105 z-20 cursor-pointer shadow-xl"
            title="이전 사진"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right / Next Button */}
        {nextPhoto && (
          <button
            onClick={() => onSelectPhoto(nextPhoto)}
            className="hidden sm:flex absolute right-2 lg:-right-14 top-1/2 -translate-y-1/2 p-3 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/60 text-white rounded-full transition-all hover:scale-105 z-20 cursor-pointer shadow-xl"
            title="다음 사진"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* 9:16 Smartphone Mockup / Visual Frame */}
        <div className="shrink-0 relative w-[280px] sm:w-[320px] md:w-[350px] aspect-[9/16] rounded-[2.2rem] p-2.5 bg-neutral-900 border-2 border-neutral-700/70 shadow-2xl shadow-black/90 flex flex-col">
          {/* Dynamic Island / Speaker notch simulation */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-950 border border-neutral-800 mr-2" />
            <div className="w-2 h-2 rounded-full bg-blue-950/60" />
          </div>

          {/* Actual 9:16 Photo Content */}
          <div className="relative w-full h-full rounded-[1.7rem] overflow-hidden bg-black flex items-center justify-center group">
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="w-full h-full object-cover select-none"
            />

            {/* Live Streaming UI Overlay */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 bg-gradient-to-b from-black/60 via-transparent to-black/80">
              {/* Top Live Bar */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-1.5 bg-red-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE
                </div>
                <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-mono-num text-neutral-200 border border-white/10">
                  <Eye className="w-3 h-3 text-amber-400" />
                  <span>실시간 송출 중</span>
                </div>
              </div>

              {/* Bottom In-Stream Info */}
              <div className="space-y-1.5 pb-2">
                {photo.categoryTag && (
                  <span className="inline-block px-2 py-0.5 rounded bg-amber-400/90 text-black font-semibold text-[10px] uppercase tracking-wide">
                    {photo.categoryTag}
                  </span>
                )}
                <div className="text-white text-xs font-bold leading-snug drop-shadow line-clamp-2">
                  {photo.title}
                </div>
                {photo.brand && (
                  <div className="text-[11px] text-neutral-300 drop-shadow">
                    {photo.brand}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Info Card */}
        <div className="w-full max-w-md bg-[#111116] border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 max-h-[85vh] overflow-y-auto">
          <div className="space-y-4">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono-num font-semibold text-xs">
                  SLOT {String(photo.slotNumber).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
                </span>
                <span className="text-xs font-mono-num text-neutral-400 flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-neutral-500" />
                  9:16 VERTICAL
                </span>
              </div>
              {onEditSlot && (
                <button
                  onClick={() => {
                    onClose();
                    onEditSlot(photo);
                  }}
                  className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 hover:border-amber-400/60 rounded-lg text-xs text-neutral-300 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                  title="이 사진 수정"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>수정</span>
                </button>
              )}
            </div>

            {/* Brand & Category */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                {photo.categoryTag && (
                  <span className="text-xs font-mono-num font-medium text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                    {photo.categoryTag}
                  </span>
                )}
                {photo.brand && (
                  <span className="text-xs text-neutral-400 font-medium">
                    {photo.brand}
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                {photo.title}
              </h3>
              {photo.subtitle && (
                <p className="text-xs sm:text-sm text-neutral-300 font-light mt-1">
                  {photo.subtitle}
                </p>
              )}
            </div>

            {/* Planning Direction Box */}
            {(photo.planningDirection || photo.metrics) && (
              <div className="p-4 bg-neutral-950/80 border border-amber-400/25 rounded-xl space-y-1.5 bg-gradient-to-r from-amber-400/5 to-transparent">
                <div className="text-[11px] font-mono-num text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  방송 기획 방향
                </div>
                <div className="text-xs sm:text-sm font-medium text-amber-100/90 leading-relaxed">
                  {photo.planningDirection || photo.metrics}
                </div>
              </div>
            )}

            {/* Detailed Description */}
            {photo.description && (
              <div className="space-y-2">
                <div className="text-xs font-mono-num text-neutral-400 uppercase tracking-wider">
                  연출 및 기술 세부 내역
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed bg-neutral-900/40 p-3.5 rounded-xl border border-neutral-800/60">
                  {photo.description}
                </p>
              </div>
            )}
          </div>

          {/* Quick Slot Selector Strip */}
          <div className="pt-4 border-t border-neutral-800/80 space-y-2">
            <div className="text-[11px] font-mono-num text-neutral-500 uppercase tracking-wider">
              다른 슬롯 선택 ({photos.length}개)
            </div>
            <div className="grid grid-cols-5 gap-2">
              {photos.map((p, idx) => (
                <button
                  key={p.id || idx}
                  onClick={() => onSelectPhoto(p)}
                  className={`relative aspect-[9/16] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    p.id === photo.id
                      ? 'border-amber-400 shadow-md scale-105'
                      : 'border-neutral-800 hover:border-neutral-600 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] font-mono-num text-center text-white py-0.5">
                    {String(p.slotNumber).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
