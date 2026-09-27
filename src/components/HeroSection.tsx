import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { heroReelImg } from '../data/initialProjects';
import { VideoPlayer } from './VideoPlayer';
import { portfolioStorage, ShowreelConfig, HeroIntroConfig } from '../services/portfolioStorage';

interface HeroSectionProps {
  onExploreWork: () => void;
  onContactClick: () => void;
  heroIntro?: HeroIntroConfig;
  showreel?: ShowreelConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWork,
  heroIntro: propHeroIntro,
  showreel: propShowreel,
}) => {
  const [localShowreel] = useState<ShowreelConfig>(() => portfolioStorage.getShowreel());
  const [localHeroIntro] = useState<HeroIntroConfig>(() => portfolioStorage.getHeroIntro());
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  const showreel = propShowreel || localShowreel;
  const heroIntro = propHeroIntro || localHeroIntro;

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 px-6 md:px-10 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Subtle Ambient Background Glows */}
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
            {heroIntro.headlineLine1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
              {heroIntro.headlineLine2}
            </span>
          </h1>

          {/* Sub copies */}
          {heroIntro.subhead && (
            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-4 max-w-2xl text-balance">
              {heroIntro.subhead}
            </p>
          )}
          {heroIntro.description && (
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-8 max-w-xl">
              {heroIntro.description}
            </p>
          )}

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
        <div className="lg:col-span-5 relative flex flex-col justify-center">
          {/* Top Control Bar above Video: Label */}
          <div className="flex items-center gap-2 mb-2.5 px-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] font-mono-num uppercase tracking-wider text-neutral-400">
              HIGHLIGHT SHOWREEL
            </span>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl group">
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

      {/* Showreel Modal (if opened separately) */}
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
              <button
                onClick={() => setIsShowreelOpen(false)}
                className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white border border-neutral-800 rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer"
              >
                닫기
              </button>
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
    </section>
  );
};
