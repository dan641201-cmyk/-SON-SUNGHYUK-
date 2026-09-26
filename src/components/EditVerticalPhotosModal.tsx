import React, { useState } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Check,
  RotateCcw,
  Sparkles,
  Smartphone,
  Tag,
  Eye,
  Info,
} from 'lucide-react';
import { VerticalPhotoItem } from '../types/portfolio';
import { DEFAULT_LIVE_COMMERCE_VERTICAL_PHOTOS } from '../data/initialProjects';

interface EditVerticalPhotosModalProps {
  photos: VerticalPhotoItem[];
  initialActiveSlot?: number;
  onClose: () => void;
  onSave: (updatedPhotos: VerticalPhotoItem[]) => void;
}

export const EditVerticalPhotosModal: React.FC<EditVerticalPhotosModalProps> = ({
  photos,
  initialActiveSlot = 1,
  onClose,
  onSave,
}) => {
  // Ensure we always work with 5 slots
  const [photoList, setPhotoList] = useState<VerticalPhotoItem[]>(() => {
    if (photos && photos.length > 0) {
      return photos;
    }
    return DEFAULT_LIVE_COMMERCE_VERTICAL_PHOTOS;
  });

  const [activeSlotNumber, setActiveSlotNumber] = useState<number>(initialActiveSlot);
  const [uploadError, setUploadError] = useState<string>('');

  const currentPhotoIndex = photoList.findIndex((p) => p.slotNumber === activeSlotNumber);
  const currentPhoto = photoList[currentPhotoIndex] || photoList[0];

  const handleUpdateCurrent = (updates: Partial<VerticalPhotoItem>) => {
    setPhotoList((prev) =>
      prev.map((item) =>
        item.slotNumber === activeSlotNumber ? { ...item, ...updates } : item
      )
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('이미지 파일(JPG, PNG, WEBP 등)만 업로드할 수 있습니다.');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError('이미지 용량은 최대 8MB까지 지원됩니다.');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        handleUpdateCurrent({ imageUrl: result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetToDefault = () => {
    if (window.confirm('모든 세로형 사진(5장)을 기본 큐레이션 이미지로 복원하시겠습니까?')) {
      setPhotoList(DEFAULT_LIVE_COMMERCE_VERTICAL_PHOTOS);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(photoList);
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
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                9:16 세로형 라이브 송출 사진 관리 (5개 슬롯)
              </h2>
              <p className="text-xs text-neutral-400 font-light">
                스마트폰 규격 라이브커머스 방송 화면 사진과 지표를 실시간으로 교체합니다.
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

        {/* Slot Selector Strip */}
        <div className="px-6 py-3 bg-neutral-950/90 border-b border-neutral-800/80 flex items-center gap-2 overflow-x-auto shrink-0">
          <span className="text-xs font-mono-num text-neutral-500 mr-1 shrink-0 uppercase">
            슬롯 선택:
          </span>
          {photoList.map((item) => (
            <button
              key={item.slotNumber}
              type="button"
              onClick={() => {
                setActiveSlotNumber(item.slotNumber);
                setUploadError('');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-num font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                item.slotNumber === activeSlotNumber
                  ? 'bg-amber-400 text-black border-amber-400 shadow'
                  : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-600'
              }`}
            >
              <span>SLOT {String(item.slotNumber).padStart(2, '0')}</span>
              <span className="text-[11px] opacity-80 font-normal">
                {item.categoryTag ? item.categoryTag.split('·')[0].trim() : `사진 ${item.slotNumber}`}
              </span>
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto px-6 py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left: 9:16 Aspect Preview */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="text-xs font-mono-num text-neutral-400 mb-2 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>9:16 실시간 미리보기 (SLOT {String(activeSlotNumber).padStart(2, '0')})</span>
              </div>

              <div className="relative w-full max-w-[210px] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-neutral-700 bg-black shadow-xl group">
                <img
                  src={currentPhoto.imageUrl}
                  alt={currentPhoto.title}
                  className="w-full h-full object-cover"
                />

                {/* Simulated UI Overlay */}
                <div className="absolute inset-0 p-3 bg-gradient-to-t from-black/80 via-transparent to-black/50 flex flex-col justify-between pointer-events-none">
                  <div className="flex items-center justify-between text-[9px] text-white font-bold">
                    <span className="bg-red-600 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                      LIVE
                    </span>
                    <span className="bg-black/60 px-1.5 py-0.5 rounded-full font-mono-num text-[9px] text-amber-300">
                      9:16 LIVE
                    </span>
                  </div>

                  <div>
                    {currentPhoto.categoryTag && (
                      <span className="text-[8px] bg-amber-400 text-black px-1.5 py-0.2 rounded font-bold">
                        {currentPhoto.categoryTag}
                      </span>
                    )}
                    <div className="text-[11px] font-bold text-white line-clamp-1 mt-0.5">
                      {currentPhoto.title || '제목 없음'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload button under preview */}
              <div className="w-full max-w-[210px] mt-3 space-y-2">
                <label className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-neutral-900 border border-neutral-700 hover:border-amber-400 rounded-xl text-xs font-medium text-neutral-200 hover:text-white cursor-pointer transition-colors shadow-sm">
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span>내 사진 업로드 (JPG/PNG)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {uploadError && (
                  <p className="text-[11px] text-red-400 text-center leading-tight">
                    {uploadError}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Slot Fields */}
            <div className="md:col-span-8 space-y-4">
              {/* Image URL */}
              <div>
                <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
                  사진 이미지 URL (직접 입력 또는 파일 업로드)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={currentPhoto.imageUrl}
                    onChange={(e) => handleUpdateCurrent({ imageUrl: e.target.value })}
                    placeholder="https://example.com/vertical-photo.jpg"
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
                    방송 타이틀 (Title)
                  </label>
                  <input
                    type="text"
                    value={currentPhoto.title}
                    onChange={(e) => handleUpdateCurrent({ title: e.target.value })}
                    placeholder="예: K-Beauty 글로벌 런칭 라이브"
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
                    서브 타이틀 / 한 줄 요약
                  </label>
                  <input
                    type="text"
                    value={currentPhoto.subtitle || ''}
                    onChange={(e) => handleUpdateCurrent({ subtitle: e.target.value })}
                    placeholder="예: 피부 결 디테일 매크로 및 3점 조명 세팅"
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Brand & Category Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
                    브랜드 / 클라이언트 (Brand)
                  </label>
                  <input
                    type="text"
                    value={currentPhoto.brand || ''}
                    onChange={(e) => handleUpdateCurrent({ brand: e.target.value })}
                    placeholder="예: Grip × 글로벌 코스메틱"
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
                    카테고리 태그 (Category Tag)
                  </label>
                  <input
                    type="text"
                    value={currentPhoto.categoryTag || ''}
                    onChange={(e) => handleUpdateCurrent({ categoryTag: e.target.value })}
                    placeholder="예: 뷰티 · 코스메틱, 패션 · 어패럴 등"
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Planning Direction */}
              <div>
                <label className="block text-xs font-mono-num text-amber-400 mb-1.5 flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  방송 기획 방향
                </label>
                <input
                  type="text"
                  value={currentPhoto.planningDirection ?? currentPhoto.metrics ?? ''}
                  onChange={(e) =>
                    handleUpdateCurrent({
                      planningDirection: e.target.value,
                      metrics: e.target.value,
                    })
                  }
                  placeholder="예: 초밀착 텍스처 시연과 실시간 피부 고민 Q&A 소통 중심 기획"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
                  기술 및 연출 세부 설명
                </label>
                <textarea
                  rows={3}
                  value={currentPhoto.description || ''}
                  onChange={(e) => handleUpdateCurrent({ description: e.target.value })}
                  placeholder="송출 장비 세팅, 멀티캠 스위칭, 조명 세팅 등 현장 연출 내역"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="px-3.5 py-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-xl text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>기본 5장 사진으로 복원</span>
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
                <span>5개 슬롯 저장하기</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
