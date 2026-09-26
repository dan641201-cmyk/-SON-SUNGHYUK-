import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, ExternalLink } from 'lucide-react';
import { VideoSourceType } from '../types/portfolio';

interface VideoPlayerProps {
  type: VideoSourceType;
  url: string;
  thumbnail: string;
  title: string;
  autoPlay?: boolean;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  type,
  url,
  thumbnail,
  title,
  autoPlay = false,
  className,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(autoPlay);
  const [loadError, setLoadError] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract YouTube ID helper (supports shorts, embed, youtu.be, standard watch)
  const getYouTubeId = (inputUrl: string): string => {
    if (!inputUrl) return '';
    const trimmed = inputUrl.trim();
    const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (shortsMatch) return shortsMatch[1];
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([a-zA-Z0-9_-]{11}).*/;
    const match = trimmed.match(regExp);
    if (match && match[2]) return match[2];
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
    return trimmed;
  };

  // Extract Vimeo ID helper
  const getVimeoId = (inputUrl: string): string => {
    if (!inputUrl) return '';
    const match = inputUrl.trim().match(/(?:vimeo\.com\/)(\d+)/);
    return match ? match[1] : inputUrl.trim();
  };

  const youtubeId = type === 'youtube' ? getYouTubeId(url) : '';
  const vimeoId = type === 'vimeo' ? getVimeoId(url) : '';

  const displayThumbnail =
    thumbnail || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : '');

  // Handle native video controls
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      setHasStarted(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  useEffect(() => {
    setIsPlaying(autoPlay);
    setHasStarted(autoPlay);
    if (autoPlay) {
      setIsMuted(true);
    }
    setCurrentTime(0);
    setLoadError(false);
  }, [url, type, autoPlay]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={
        className ||
        'relative w-full aspect-video bg-neutral-950 rounded-xl overflow-hidden shadow-2xl border border-neutral-800/80 group select-none'
      }
    >
      {/* 1. YouTube Player */}
      {type === 'youtube' && (
        <div className="w-full h-full relative">
          {hasStarted ? (
            <iframe
              key={`${youtubeId}-${isMuted ? 'muted' : 'sound'}`}
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${youtubeId}&rel=0&modestbranding=1&playsinline=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <div
              onClick={() => setHasStarted(true)}
              className="w-full h-full relative cursor-pointer group/overlay"
            >
              <img
                src={displayThumbnail}
                alt={title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (youtubeId && !e.currentTarget.src.includes('hqdefault')) {
                    e.currentTarget.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
                  }
                }}
                className="w-full h-full object-cover brightness-90 group-hover/overlay:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col items-center justify-center p-6 text-center">
                <button
                  type="button"
                  aria-label="영상 재생"
                  className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover/overlay:scale-110 group-hover/overlay:bg-amber-400 group-hover/overlay:text-black transition-all shadow-2xl mb-3 cursor-pointer"
                >
                  <Play className="w-7 h-7 translate-x-0.5 fill-current" />
                </button>
                <span className="text-xs uppercase tracking-widest text-neutral-200 font-mono-num font-semibold drop-shadow-md">
                  메인 페이지에서 재생하기 (클릭)
                </span>
                <span className="text-[11px] text-neutral-400 mt-1">
                  YouTube · 클릭 시 바로 재생됩니다
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Vimeo Player */}
      {type === 'vimeo' && (
        <div className="w-full h-full relative">
          {hasStarted ? (
            <iframe
              key={`${vimeoId}-${isMuted ? 'muted' : 'sound'}`}
              src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=${isMuted ? 1 : 0}&loop=1&playsinline=1&title=0&byline=0&portrait=0`}
              title={title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <div
              onClick={() => setHasStarted(true)}
              className="w-full h-full relative cursor-pointer group/overlay"
            >
              <img
                src={displayThumbnail}
                alt={title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-90 group-hover/overlay:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col items-center justify-center p-6 text-center">
                <button
                  type="button"
                  aria-label="Vimeo 영상 재생"
                  className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover/overlay:scale-110 group-hover/overlay:bg-amber-400 group-hover/overlay:text-black transition-all shadow-2xl mb-3 cursor-pointer"
                >
                  <Play className="w-7 h-7 translate-x-0.5 fill-current" />
                </button>
                <span className="text-xs uppercase tracking-widest text-neutral-200 font-mono-num font-semibold drop-shadow-md">
                  메인 페이지에서 재생하기 (클릭)
                </span>
                <span className="text-[11px] text-neutral-400 mt-1">
                  Vimeo · 클릭 시 바로 재생됩니다
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Native MP4 Video Player */}
      {type === 'mp4' && (
        <div className="w-full h-full relative">
          <video
            ref={videoRef}
            src={url}
            poster={thumbnail}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onError={() => setLoadError(true)}
            className="w-full h-full object-cover"
            playsInline
            onClick={togglePlay}
          />

          {/* Big Center Play button if paused */}
          {!isPlaying && !loadError && (
            <button
              onClick={togglePlay}
              type="button"
              aria-label="재생"
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:scale-110 hover:bg-amber-400 hover:text-black transition-all shadow-2xl cursor-pointer"
            >
              <Play className="w-7 h-7 translate-x-0.5 fill-current" />
            </button>
          )}

          {/* Error fallback state */}
          {loadError && (
            <div className="absolute inset-0 bg-neutral-900/90 flex flex-col items-center justify-center p-6 text-center">
              <p className="text-sm text-neutral-300 mb-3">
                MP4 영상 링크를 불러오는 중입니다. 외부 파일 상태를 확인해주세요.
              </p>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-amber-400 flex items-center gap-1 hover:underline"
              >
                직접 열기 <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Custom Controls Bar */}
          <div
            className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent px-4 py-3 transition-opacity duration-300 ${
              isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Progress Scrubber */}
            <div className="relative w-full flex items-center mb-2.5">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  type="button"
                  className="p-1 hover:text-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      setCurrentTime(0);
                    }
                  }}
                  type="button"
                  className="p-1 hover:text-white transition-colors"
                  title="처음으로"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1.5 ml-1">
                  <button
                    onClick={toggleMute}
                    type="button"
                    className="p-1 hover:text-white transition-colors"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-neutral-400" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1 bg-neutral-700 rounded appearance-none cursor-pointer accent-amber-400"
                  />
                </div>

                <span className="font-mono-num text-[11px] text-neutral-400 ml-2">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleFullScreen}
                  type="button"
                  className="p-1 hover:text-white transition-colors"
                  title="전체화면"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
