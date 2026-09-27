import React, { useState } from 'react';
import { X, Check, Film, Youtube, RotateCcw } from 'lucide-react';
import { ShowreelConfig, DEFAULT_SHOWREEL } from '../services/portfolioStorage';

interface EditShowreelModalProps {
  initialData: ShowreelConfig;
  onClose: () => void;
  onSave: (updated: ShowreelConfig) => void;
}

export const EditShowreelModal: React.FC<EditShowreelModalProps> = ({
  initialData,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(initialData.title || DEFAULT_SHOWREEL.title);
  const [subtitle, setSubtitle] = useState(initialData.subtitle || DEFAULT_SHOWREEL.subtitle);
  const [videoType, setVideoType] = useState<'youtube' | 'vimeo' | 'mp4'>(
    initialData.videoType || 'youtube'
  );
  const [videoUrl, setVideoUrl] = useState(initialData.videoUrl || DEFAULT_SHOWREEL.videoUrl);
  const [thumbnail, setThumbnail] = useState(initialData.thumbnail || '');
  const [errorMsg, setErrorMsg] = useState('');

  const handleReset = () => {
    if (window.confirm('메인 쇼릴 영상 설정을 기본값으로 복원하시겠습니까?')) {
      setTitle(DEFAULT_SHOWREEL.title);
      setSubtitle(DEFAULT_SHOWREEL.subtitle);
      setVideoType(DEFAULT_SHOWREEL.videoType);
      setVideoUrl(DEFAULT_SHOWREEL.videoUrl);
      setThumbnail('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) {
      setErrorMsg('동영상 링크(URL)를 입력해주세요.');
      return;
    }

    onSave({
      title: title.trim() || '2024 PRODUCER SHOWREEL',
      subtitle: subtitle.trim() || 'Commercials · Brand Films · Live Commerce',
      videoType,
      videoUrl: videoUrl.trim(),
      thumbnail: thumbnail.trim(),
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
        className="w-full max-w-lg bg-[#0e0e14] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                메인 쇼릴 영상 변경
              </h3>
              <p className="text-[11px] text-neutral-400 font-light">
                메인 화면 우측에 상영되는 하이라이트 영상 및 링크를 편집합니다.
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 flex-1">
          {errorMsg && (
            <div className="p-3 bg-red-950/50 border border-red-500/50 rounded-xl text-xs text-red-300">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-xs text-neutral-300 mb-1.5 font-medium">
              쇼릴 타이틀
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 2024 PRODUCER SHOWREEL"
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-neutral-300 mb-1.5 font-medium">
              서브 설명
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="예: Commercials · Brand Films · Live Commerce"
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-neutral-300 mb-1.5 font-medium">
              동영상 플랫폼 유형
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setVideoType('youtube')}
                className={`py-2 px-3 text-xs rounded-xl border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  videoType === 'youtube'
                    ? 'border-amber-400 bg-amber-400/10 text-amber-400 font-semibold'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                }`}
              >
                <Youtube className="w-3.5 h-3.5" />
                <span>유튜브 (YouTube)</span>
              </button>
              <button
                type="button"
                onClick={() => setVideoType('vimeo')}
                className={`py-2 px-3 text-xs rounded-xl border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  videoType === 'vimeo'
                    ? 'border-amber-400 bg-amber-400/10 text-amber-400 font-semibold'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>비메오 (Vimeo)</span>
              </button>
              <button
                type="button"
                onClick={() => setVideoType('mp4')}
                className={`py-2 px-3 text-xs rounded-xl border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  videoType === 'mp4'
                    ? 'border-amber-400 bg-amber-400/10 text-amber-400 font-semibold'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                }`}
              >
                <span>MP4 직접 링크</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs text-neutral-300 mb-1.5 font-medium">
              동영상 링크 (URL) <span className="text-amber-400">*</span>
            </label>
            <input
              type="url"
              required
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... 또는 https://vimeo.com/..."
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 font-mono transition-colors"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              * 유튜브 일반 주소, 단축 주소(youtu.be/...), 비메오 링크를 모두 지원합니다.
            </p>
          </div>

          {/* Presets shortcut */}
          <div className="pt-2 border-t border-neutral-900">
            <div className="text-[11px] text-neutral-400 mb-1.5">샘플 프리셋 불러오기</div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setVideoUrl('https://www.youtube.com/watch?v=ScMzIvxBSi4');
                  setVideoType('youtube');
                }}
                className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-[11px] text-neutral-400 hover:text-neutral-200 border border-neutral-800 rounded-lg cursor-pointer"
              >
                유튜브 샘플 (기본)
              </button>
              <button
                type="button"
                onClick={() => {
                  setVideoUrl('https://vimeo.com/76979871');
                  setVideoType('vimeo');
                }}
                className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-[11px] text-neutral-400 hover:text-neutral-200 border border-neutral-800 rounded-lg cursor-pointer"
              >
                비메오 샘플 (Vimeo)
              </button>
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
