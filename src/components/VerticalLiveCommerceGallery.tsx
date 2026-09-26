import React, { useState } from 'react';
import {
  Smartphone,
  Eye,
  Radio,
  Edit2,
  Sparkles,
  Maximize2,
  Settings,
  Layers,
} from 'lucide-react';
import { VerticalPhotoItem } from '../types/portfolio';
import { VerticalPhotoLightbox } from './VerticalPhotoLightbox';
import { EditVerticalPhotosModal } from './EditVerticalPhotosModal';
import { PasswordAuthModal } from './PasswordAuthModal';
import { isAuthorized } from '../utils/auth';

interface VerticalLiveCommerceGalleryProps {
  photos: VerticalPhotoItem[];
  projectTitle: string;
  onUpdatePhotos: (updatedPhotos: VerticalPhotoItem[]) => void;
}

export const VerticalLiveCommerceGallery: React.FC<VerticalLiveCommerceGalleryProps> = ({
  photos,
  projectTitle,
  onUpdatePhotos,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<VerticalPhotoItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [activeEditSlot, setActiveEditSlot] = useState<number>(1);

  const handleOpenEdit = (slotNumber?: number) => {
    setActiveEditSlot(slotNumber || 1);
    setIsAuthModalOpen(true);
  };

  const handleSavePhotos = (newPhotos: VerticalPhotoItem[]) => {
    onUpdatePhotos(newPhotos);
    // If selected photo is open, update reference
    if (selectedPhoto) {
      const match = newPhotos.find((p) => p.slotNumber === selectedPhoto.slotNumber);
      if (match) setSelectedPhoto(match);
    }
  };

  return (
    <section className="space-y-4">
      {/* Gallery Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-neutral-950/80 border border-neutral-800/80 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-num font-bold text-amber-400 uppercase tracking-wider">
                9:16 VERTICAL SHOWCASE
              </span>
              <span className="text-[11px] font-mono-num text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {photos.length} SLOTS LIVE
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              모바일 라이브커머스 기획·송출 세로형(9:16) 방송 화면
            </h3>
            <p className="text-xs text-neutral-400 font-light mt-0.5">
              스마트폰 세로 화면에 최적화된 5개 대표 라이브 방송 송출 스크린 (클릭 시 크게 보기)
            </p>
          </div>
        </div>

        <button
          onClick={() => handleOpenEdit(1)}
          className="px-3.5 py-2 bg-neutral-900 border border-neutral-700 hover:border-amber-400 rounded-xl text-xs font-medium text-neutral-200 hover:text-white transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto shrink-0 shadow-sm"
        >
          <Settings className="w-3.5 h-3.5 text-amber-400" />
          <span>5장 사진 관리 및 수정</span>
        </button>
      </div>

      {/* 5-Column Vertical Grid (Visible at once!) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        {photos.map((item) => (
          <div
            key={item.id || item.slotNumber}
            onClick={() => setSelectedPhoto(item)}
            className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 hover:border-amber-400/80 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-amber-400/10 flex flex-col justify-between"
          >
            {/* Background Image */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60 pointer-events-none" />

            {/* Top Bar Overlay */}
            <div className="relative z-10 p-2.5 sm:p-3 flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1 bg-red-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE
                </span>
                <span className="text-[10px] font-mono-num font-bold text-amber-300 bg-black/60 px-1.5 py-0.5 rounded border border-amber-400/30">
                  SLOT {String(item.slotNumber).padStart(2, '0')}
                </span>
              </div>

              {/* View/Zoom Badge */}
              <div className="p-1.5 rounded-full bg-black/60 text-neutral-300 group-hover:text-amber-300 group-hover:bg-amber-400/20 border border-white/10 transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Middle Hover State */}
            <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center pointer-events-none">
              <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-full text-[11px] font-medium text-amber-300 border border-amber-400/40 shadow-lg">
                클릭하여 확대
              </span>
            </div>

            {/* Bottom Info Overlay */}
            <div className="relative z-10 p-3 sm:p-3.5 space-y-1.5">
              {item.categoryTag && (
                <div className="flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded bg-amber-400 text-black text-[9px] font-bold tracking-wide">
                    {item.categoryTag}
                  </span>
                </div>
              )}

              <h4 className="text-white text-xs sm:text-sm font-bold leading-snug line-clamp-2 drop-shadow">
                {item.title}
              </h4>

              {item.brand && (
                <p className="text-[11px] text-neutral-300 truncate font-light drop-shadow">
                  {item.brand}
                </p>
              )}

              {(item.planningDirection || item.metrics) && (
                <div className="pt-1.5 border-t border-white/15 space-y-0.5">
                  <span className="text-[9px] font-mono-num font-bold text-amber-400 uppercase tracking-wider block">
                    기획 방향
                  </span>
                  <p className="text-[10px] text-neutral-200 line-clamp-2 leading-snug font-light">
                    {item.planningDirection || item.metrics}
                  </p>
                </div>
              )}

              {/* Quick Edit Slot Button */}
              <div className="pt-1.5 flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEdit(item.slotNumber);
                  }}
                  className="px-2 py-1 bg-black/75 hover:bg-neutral-800 border border-neutral-700/80 hover:border-amber-400 rounded-lg text-[10px] text-neutral-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  title="이 슬롯 사진 교체"
                >
                  <Edit2 className="w-2.5 h-2.5 text-amber-400" />
                  <span>수정</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <VerticalPhotoLightbox
          photo={selectedPhoto}
          photos={photos}
          onClose={() => setSelectedPhoto(null)}
          onSelectPhoto={(p) => setSelectedPhoto(p)}
          onEditSlot={(p) => handleOpenEdit(p.slotNumber)}
        />
      )}

      {/* Edit Modal */}
      {isAuthModalOpen && (
        <PasswordAuthModal
          isOpen={isAuthModalOpen}
          title="라이브 화면 수정 권한 인증"
          onSuccess={() => setIsEditModalOpen(true)}
          onClose={() => setIsAuthModalOpen(false)}
        />
      )}

      {isEditModalOpen && (
        <EditVerticalPhotosModal
          photos={photos}
          initialActiveSlot={activeEditSlot}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSavePhotos}
        />
      )}
    </section>
  );
};
