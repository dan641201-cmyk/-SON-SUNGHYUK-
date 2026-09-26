import React, { useState } from 'react';
import { ArrowDown, Play, Settings, ArrowUpRight, Check, X, Youtube, Film, Maximize2 } from 'lucide-react';
import { heroReelImg } from '../data/initialProjects';
import { VideoPlayer } from './VideoPlayer';
import { portfolioStorage, ShowreelConfig } from '../services/portfolioStorage';

interface HeroSectionProps {
  onExploreWork: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWork,
  onContactClick,
}) => {
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [isEditShowreelOpen, setIsEditShowreelOpen] = useState(false);
  const [showreel, setShowreel] = useState<ShowreelConfig>(() => portfolioStorage.getShowreel());

  // Edit form state
  const [editUrl, setEditUrl] = useState(showreel.videoUrl);
  const [editTitle, setEditTitle] = useState(showreel.title);
  const [editType, setEditType] = useState<'youtube' | 'vimeo' | 'mp4'>(showreel.videoType);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleOpenEdit = () => {
    setEditUrl(showreel.videoUrl);
    setEditTitle(showreel.title);
    setEditType(showreel.videoType);
    setSavedSuccess(false);
    setIsEditShowreelOpen(true);
  };

  const handleSaveShowreel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUrl.trim()) return;

    // Auto-detect type if obvious
    let detectedType = editType;
    if (editUrl.includes('youtube.com') || editUrl.includes('youtu.be')) {
      detectedType = 'youtube';
    } else if (editUrl.includes('vimeo.com')) {
      detectedType = 'vimeo';
    } else if (editUrl.endsWith('.mp4')) {
      detectedType = 'mp4';
    }

    const updated: ShowreelConfig = {
      ...showreel,
      title: editTitle.trim() || '2026 SON SUNG HYUK SHOWREEL',
      videoUrl: editUrl.trim(),
      videoType: detectedType,
    };

    portfolioStorage.saveShowreel(updated);
    setShowreel(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setIsEditShowreelOpen(false);
      setSavedSuccess(false);
    }, 600);
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 px-6 md:px-10 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Subtle top ambient glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
        {/* Left Column: Bold Editorial Typography & Pitch */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Kicker label */}
          <div className="flex items-center gap-2.5 text-xs font-mono-num uppercase tracking-wider text-amber-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>SON SUNG HYUK · VIDEO PRODUCER & CONTENT PD</span>
          </div>

          {/* Main Statement */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-white leading-[1.15] mb-6 text-balance">
            사람과 브랜드를 이해하고, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
              그 가치를 콘텐츠에 담습니다.
            </span>
          </h1>

          {/* Sub copies from prompt */}
          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-4 max-w-2xl text-balance">
            콘텐츠의 시작부터 완성까지 모든 장면을 설계합니다.
          </p>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-8 max-w-xl">
            콘텐츠를 기획하고 촬영부터 편집, 라이브 송출까지 직접 수행하며, 농협은행과 그립컴퍼니 등에서 재직하며, 기업 브랜드의 메시지와 다양한 사람들의 이야기를 콘텐츠로 만들어 왔습니다.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreWork}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-black font-semibold text-xs tracking-wider uppercase rounded-lg hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/10 cursor-pointer"
            >
              <span>Explore Works (포트폴리오)</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Hero Visual Frame / Cinematic Production Stage */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl group">
            {/* Top-Right Quick Action: Video Settings Overlay */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenEdit}
                title="하이라이트 쇼릴 영상 변경"
                className="px-2.5 py-1.5 text-xs text-neutral-300 hover:text-white bg-black/75 hover:bg-neutral-900 backdrop-blur-md rounded-lg border border-white/15 transition-all flex items-center gap-1.5 shadow-xl cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-amber-400" />
                <span>영상 변경</span>
              </button>
            </div>

            {/* Main Page Video Player */}
            <div className="w-full aspect-video bg-black relative">
              <VideoPlayer
                type={showreel.videoType}
                url={showreel.videoUrl}
                thumbnail={showreel.thumbnail || heroReelImg}
                title={showreel.title}
                autoPlay={true}
                className="w-full h-full rounded-none border-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll prompt */}
      <div className="flex justify-center pt-6">
        <button
          onClick={onExploreWork}
          className="flex flex-col items-center gap-1.5 text-neutral-500 hover:text-neutral-300 transition-colors group cursor-pointer"
        >
          <span className="text-[10px] tracking-widest uppercase font-mono-num">
            SCROLL TO EXPLORE
          </span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Showreel Modal */}
      {isShowreelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  {showreel.title}
                </h3>
                <p className="text-xs text-neutral-400">
                  {showreel.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsShowreelOpen(false);
                    handleOpenEdit();
                  }}
                  className="px-3 py-1.5 text-xs text-neutral-400 hover:text-amber-400 border border-neutral-800 rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>영상 변경</span>
                </button>
                <button
                  onClick={() => setIsShowreelOpen(false)}
                  className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white border border-neutral-800 rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer"
                >
                  닫기 (ESC)
                </button>
              </div>
            </div>
            <VideoPlayer
              type={showreel.videoType}
              url={showreel.videoUrl}
              thumbnail={heroReelImg}
              title={showreel.title}
              autoPlay={true}
            />
          </div>
        </div>
      )}

      {/* Edit Showreel Modal */}
      {isEditShowreelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">하이라이트 쇼릴 영상 설정</h3>
                  <p className="text-[11px] text-neutral-400">메인 화면에 재생될 쇼릴 영상 링크를 변경합니다</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditShowreelOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveShowreel} className="space-y-4">
              <div>
                <label className="block text-xs text-neutral-300 mb-1.5 font-medium">
                  쇼릴 제목 (선택)
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="2026 SON SUNG HYUK SHOWREEL"
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1.5 font-medium">
                  동영상 플랫폼
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditType('youtube')}
                    className={`py-2 px-3 text-xs rounded-lg border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      editType === 'youtube'
                        ? 'bg-amber-400 text-black font-semibold border-amber-400'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    <span>YouTube</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditType('vimeo')}
                    className={`py-2 px-3 text-xs rounded-lg border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      editType === 'vimeo'
                        ? 'bg-amber-400 text-black font-semibold border-amber-400'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                  >
                    <span>Vimeo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditType('mp4')}
                    className={`py-2 px-3 text-xs rounded-lg border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      editType === 'mp4'
                        ? 'bg-amber-400 text-black font-semibold border-amber-400'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                  >
                    <span>Direct MP4</span>
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
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... 또는 https://vimeo.com/..."
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-mono"
                />
                <p className="text-[11px] text-neutral-500 mt-1">
                  * 유튜브 전체 주소(watch?v=...), 단축 주소(youtu.be/...), 비메오 링크를 지원합니다.
                </p>
              </div>

              {/* Presets shortcut */}
              <div className="pt-2 border-t border-neutral-900">
                <div className="text-[11px] text-neutral-400 mb-1.5">샘플 프리셋 불러오기</div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setEditUrl('https://www.youtube.com/watch?v=ScMzIvxBSi4');
                      setEditType('youtube');
                    }}
                    className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 text-[11px] text-neutral-400 hover:text-neutral-200 border border-neutral-800 rounded cursor-pointer"
                  >
                    유튜브 샘플 (기본)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditUrl('https://vimeo.com/76979871');
                      setEditType('vimeo');
                    }}
                    className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 text-[11px] text-neutral-400 hover:text-neutral-200 border border-neutral-800 rounded cursor-pointer"
                  >
                    비메오 샘플 (Vimeo)
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsEditShowreelOpen(false)}
                  className="px-4 py-2 text-xs text-neutral-400 hover:text-white border border-neutral-800 rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>저장되었습니다!</span>
                    </>
                  ) : (
                    <span>변경사항 저장하기</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
