import React, { useState } from 'react';
import { X, Video, Link, Tag, Clock, Image, Check, AlertCircle, Sparkles, HardDrive } from 'lucide-react';
import { ProjectVideoItem, VideoSourceType } from '../types/portfolio';
import { getYouTubeThumbnail, getYouTubeId } from '../utils/projectVideos';
import { GoogleDriveModal } from './GoogleDriveModal';

interface EditVideoSlotModalProps {
  slot: ProjectVideoItem;
  onSave: (updatedSlot: ProjectVideoItem) => void;
  onClose: () => void;
}

export const EditVideoSlotModal: React.FC<EditVideoSlotModalProps> = ({
  slot,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState(slot.title);
  const [subtitle, setSubtitle] = useState(slot.subtitle || '');
  const [videoType, setVideoType] = useState<VideoSourceType>(slot.videoType || 'youtube');
  const [videoUrl, setVideoUrl] = useState(slot.videoUrl || '');
  const [thumbnail, setThumbnail] = useState(slot.thumbnail || '');
  const [tag, setTag] = useState(slot.tag || `EP.${String(slot.slotNumber).padStart(2, '0')}`);
  const [duration, setDuration] = useState(slot.duration || '05:00');
  const [isDrivePickerOpen, setIsDrivePickerOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto extract thumbnail from YouTube
  const handleAutoThumbnail = () => {
    if (videoType === 'youtube') {
      const extracted = getYouTubeThumbnail(videoUrl);
      if (extracted) {
        setThumbnail(extracted);
      } else {
        setErrorMsg('유효한 유튜브 영상 링크(URL)를 먼저 입력해주세요.');
        setTimeout(() => setErrorMsg(''), 3000);
      }
    }
  };

  const handleUrlChange = (val: string) => {
    setVideoUrl(val);
    if (videoType === 'youtube') {
      const autoThumb = getYouTubeThumbnail(val);
      if (autoThumb && (!thumbnail || thumbnail.includes('youtube.com'))) {
        setThumbnail(autoThumb);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('영상 제목을 입력해주세요.');
      return;
    }
    if (!videoUrl.trim()) {
      setErrorMsg('영상 URL을 입력해주세요.');
      return;
    }

    const updated: ProjectVideoItem = {
      ...slot,
      title: title.trim(),
      subtitle: subtitle.trim(),
      videoType,
      videoUrl: videoUrl.trim(),
      thumbnail: thumbnail.trim() || slot.thumbnail,
      tag: tag.trim(),
      duration: duration.trim(),
    };

    onSave(updated);
    onClose();
  };

  const tagPresets = ['본편', '하이라이트', '인터뷰', '티저', '비하인드', '숏폼', 'B-ROLL', '현장스케치'];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#0e0e14] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl text-neutral-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <h3 className="text-sm font-semibold text-white font-display">
              영상 슬롯 {String(slot.slotNumber).padStart(2, '0')} 설정 및 수정
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-red-950/40 border border-red-800/80 rounded-xl flex items-center gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Video Title */}
          <div>
            <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
              영상 제목 (TITLE) <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 2026 전국 지점 우수 행원 인터뷰 본편"
              className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              required
            />
          </div>

          {/* Subtitle / Description */}
          <div>
            <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
              회차 설명 / 소제목 (SUBTITLE)
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="예: 1화 — 일과 삶의 균형과 고객 감동 스토리"
              className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Video Type & URL */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
                플랫폼 구분
              </label>
              <select
                value={videoType}
                onChange={(e) => setVideoType(e.target.value as VideoSourceType)}
                className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
              >
                <option value="youtube">YouTube</option>
                <option value="vimeo">Vimeo</option>
                <option value="mp4">직접 MP4 파일</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-mono-num text-neutral-400">
                  영상 링크 (URL / ID) <span className="text-amber-400">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsDrivePickerOpen(true)}
                  className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <HardDrive className="w-3 h-3" />
                  <span>Google Drive에서 선택</span>
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full pl-3.5 pr-9 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white font-mono-num focus:outline-none focus:border-amber-400 transition-colors"
                  required
                />
                <Link className="w-4 h-4 text-neutral-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Tag & Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
                태그 구분 (TAG)
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="예: 본편 EP.01"
                className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono-num text-neutral-400 mb-1.5">
                재생 시간 (DURATION)
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="예: 08:45"
                className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white font-mono-num focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Quick Tag Presets */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tagPresets.map((preset) => (
              <button
                type="button"
                key={preset}
                onClick={() => setTag(preset)}
                className={`text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                  tag === preset
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                }`}
              >
                #{preset}
              </button>
            ))}
          </div>

          {/* Thumbnail URL */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono-num text-neutral-400">
                썸네일 이미지 URL (선택)
              </label>
              {videoType === 'youtube' && (
                <button
                  type="button"
                  onClick={handleAutoThumbnail}
                  className="text-[11px] font-mono-num text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" /> 유튜브 썸네일 자동 추출
                </button>
              )}
            </div>
            <input
              type="text"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="https://... (비워두면 기본 썸네일 사용)"
              className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white font-mono-num focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Thumbnail Preview */}
          {thumbnail && (
            <div className="relative aspect-video rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
              <img
                src={thumbnail}
                alt="미리보기"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={() => {}}
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur rounded text-[10px] font-mono-num text-amber-400 border border-white/10">
                PREVIEW · {tag}
              </div>
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 backdrop-blur rounded text-[10px] font-mono-num text-neutral-300">
                {duration}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800/80">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-300 transition-colors text-xs cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>슬롯 저장하기</span>
            </button>
          </div>
        </form>
      </div>

      {isDrivePickerOpen && (
        <GoogleDriveModal
          isOpen={isDrivePickerOpen}
          onClose={() => setIsDrivePickerOpen(false)}
          title="Google Drive에서 영상/애셋 선택"
          onSelectFile={(f) => {
            const url = f.webViewLink || f.webContentLink || `https://drive.google.com/file/d/${f.id}/view`;
            setVideoUrl(url);
            if (f.mimeType.includes('video')) {
              setVideoType('mp4');
            }
            if (f.thumbnailLink && !thumbnail) {
              setThumbnail(f.thumbnailLink);
            }
            setIsDrivePickerOpen(false);
          }}
        />
      )}
    </div>
  );
};
