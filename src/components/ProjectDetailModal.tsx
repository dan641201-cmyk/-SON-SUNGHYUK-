import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Calendar,
  UserCheck,
  Layers,
  Eye,
  Play,
  Settings,
  Sparkles,
  ExternalLink,
  Film,
  Check,
  Smartphone,
  Radio,
  Plus,
} from 'lucide-react';
import { Project, ProjectVideoItem, VerticalPhotoItem } from '../types/portfolio';
import { VideoPlayer } from './VideoPlayer';
import { ensureTenVideoSlots, getMaxEpisodeSlots } from '../utils/projectVideos';
import { EditVideoSlotModal } from './EditVideoSlotModal';
import { VerticalLiveCommerceGallery } from './VerticalLiveCommerceGallery';
import { PasswordAuthModal } from './PasswordAuthModal';
import { DEFAULT_LIVE_COMMERCE_VERTICAL_PHOTOS } from '../data/initialProjects';
import { isAuthorized } from '../utils/auth';

interface ProjectDetailModalProps {
  project: Project | null;
  projects: Project[];
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  onUpdateProject?: (updated: Project) => void;
}

// Helper to render formatted overview with **bold** headings
const renderFormattedOverview = (text: string) => {
  if (!text) return null;
  const paragraphs = text.split('\n\n');
  return (
    <div className="space-y-4">
      {paragraphs.map((para, pIdx) => {
        const lines = para.split('\n');
        return (
          <div key={pIdx} className="space-y-1">
            {lines.map((line, lIdx) => {
              const isOnlyBold =
                line.startsWith('**') &&
                line.endsWith('**') &&
                line.indexOf('**', 2) === line.length - 2;

              if (isOnlyBold) {
                return (
                  <div
                    key={lIdx}
                    className="text-base sm:text-lg font-bold text-white tracking-tight pt-1.5"
                  >
                    {line.slice(2, -2)}
                  </div>
                );
              }

              const parts = line.split(/(\*\*.*?\*\*)/g);
              return (
                <div
                  key={lIdx}
                  className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light"
                >
                  {parts.map((part, partIdx) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return (
                        <strong key={partIdx} className="font-bold text-white">
                          {part.slice(2, -2)}
                        </strong>
                      );
                    }
                    return <span key={partIdx}>{part}</span>;
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  projects,
  onClose,
  onSelectProject,
  onUpdateProject,
}) => {
  // Esc key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  // 10 Video Slots State
  const [videoSlots, setVideoSlots] = useState<ProjectVideoItem[]>(() =>
    ensureTenVideoSlots(project)
  );
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(0);
  const [editingSlot, setEditingSlot] = useState<ProjectVideoItem | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authAction, setAuthAction] = useState<(() => void) | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');

  const maxAllowedSlots = getMaxEpisodeSlots(project);

  const handleOpenEditSlot = () => {
    setAuthAction(() => () => setEditingSlot(activeVideo));
    setIsAuthOpen(true);
  };

  const handleOpenAddSlot = () => {
    const doAdd = () => {
      const nextSlotNum = videoSlots.length + 1;
      const newSlot: ProjectVideoItem = {
        id: `slot-${project.id}-${nextSlotNum}`,
        slotNumber: nextSlotNum,
        title: `${project.title} — 영상 슬롯 ${String(nextSlotNum).padStart(2, '0')}`,
        subtitle: '프로젝트 추가 영상 클립',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
        duration: '03:00',
        tag: `EP.${String(nextSlotNum).padStart(2, '0')}`,
      };
      setEditingSlot(newSlot);
    };

    setAuthAction(() => doAdd);
    setIsAuthOpen(true);
  };

  const isLiveCommerce = project.id === 'project-live-commerce' || project.category === 'live';
  const hasVerticalGallery = Boolean(
    (project.verticalPhotos && project.verticalPhotos.length > 0) || isLiveCommerce
  );

  const [verticalPhotos, setVerticalPhotos] = useState<VerticalPhotoItem[]>(() => {
    if (project.verticalPhotos && project.verticalPhotos.length > 0) {
      return project.verticalPhotos;
    }
    if (isLiveCommerce) {
      return DEFAULT_LIVE_COMMERCE_VERTICAL_PHOTOS;
    }
    return [];
  });

  // Re-sync slots and reset active index when switching to another project
  useEffect(() => {
    if (project) {
      setVideoSlots(ensureTenVideoSlots(project));
      setActiveSlotIndex(0);
      const isLive = project.id === 'project-live-commerce' || project.category === 'live';
      if (project.verticalPhotos && project.verticalPhotos.length > 0) {
        setVerticalPhotos(project.verticalPhotos);
      } else if (isLive) {
        setVerticalPhotos(DEFAULT_LIVE_COMMERCE_VERTICAL_PHOTOS);
      } else {
        setVerticalPhotos([]);
      }
    }
  }, [project.id]);

  const handleUpdateVerticalPhotos = (updatedPhotos: VerticalPhotoItem[]) => {
    setVerticalPhotos(updatedPhotos);
    const updatedProject: Project = {
      ...project,
      verticalPhotos: updatedPhotos,
    };
    if (onUpdateProject) {
      onUpdateProject(updatedProject);
    }
    setToastMessage('9:16 세로형 라이브 사진 5장이 성공적으로 저장되었습니다.');
    setTimeout(() => setToastMessage(''), 3500);
  };

  const activeVideo = videoSlots[activeSlotIndex] || videoSlots[0];

  // Save slot edit
  const handleSaveSlot = (updatedSlot: ProjectVideoItem) => {
    const exists = videoSlots.some((s) => s.slotNumber === updatedSlot.slotNumber);
    const updatedList = exists
      ? videoSlots.map((s) => (s.slotNumber === updatedSlot.slotNumber ? updatedSlot : s))
      : [...videoSlots, updatedSlot];
    setVideoSlots(updatedList);
    if (!exists) {
      setActiveSlotIndex(updatedList.length - 1);
    }

    const updatedProject: Project = {
      ...project,
      episodesCount: `${updatedList.length}편`,
      videos: updatedList,
      // If updating slot 1, also sync main project videoUrl
      ...(updatedSlot.slotNumber === 1
        ? {
            videoUrl: updatedSlot.videoUrl,
            videoType: updatedSlot.videoType,
            thumbnail: updatedSlot.thumbnail || project.thumbnail,
          }
        : {}),
    };

    if (onUpdateProject) {
      onUpdateProject(updatedProject);
    }

    setToastMessage(`영상 슬롯 ${String(updatedSlot.slotNumber).padStart(2, '0')} 정보가 저장되었습니다.`);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Find index in list for Next/Prev project
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const totalCount = projects.length;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < totalCount - 1 ? projects[currentIndex + 1] : null;

  const handlePrevSlot = () => {
    setActiveSlotIndex((prev) => (prev > 0 ? prev - 1 : videoSlots.length - 1));
  };

  const handleNextSlot = () => {
    setActiveSlotIndex((prev) => (prev < videoSlots.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl bg-[#0d0d12] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-auto text-neutral-200 flex flex-col max-h-[94vh]"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800/80 bg-neutral-950/70 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-num font-semibold text-amber-400">
              PROJECT ARCHIVE
            </span>
            <span className="text-neutral-600">/</span>
            <span className="text-xs font-mono-num text-neutral-400">
              {project.code} OF {String(totalCount).padStart(2, '0')}
            </span>
            {videoSlots.length > 1 && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono-num text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-full">
                <Film className="w-3 h-3 text-amber-400" />
                {videoSlots.length} VIDEOS
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Prev / Next Project */}
            <div className="hidden sm:flex items-center gap-1 border border-neutral-800 rounded-lg p-0.5">
              <button
                disabled={!prevProject}
                onClick={() => prevProject && onSelectProject(prevProject)}
                className="p-1 hover:text-white disabled:text-neutral-700 disabled:hover:text-neutral-700 transition-colors"
                title="이전 프로젝트"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={!nextProject}
                onClick={() => nextProject && onSelectProject(nextProject)}
                className="p-1 hover:text-white disabled:text-neutral-700 disabled:hover:text-neutral-700 transition-colors"
                title="다음 프로젝트"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto px-6 md:px-10 py-8 space-y-10">
          {/* Toast Notice */}
          {toastMessage && (
            <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl flex items-center justify-between text-xs text-amber-300 animate-in fade-in">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400" />
                <span>{toastMessage}</span>
              </div>
              <button
                onClick={() => setToastMessage('')}
                className="text-neutral-400 hover:text-white text-[11px]"
              >
                닫기
              </button>
            </div>
          )}

          {/* Title & Metadata Strip */}
          <div>
            <div className="text-xs font-mono-num uppercase tracking-wider text-amber-400 mb-2">
              {project.client} · {project.categoryLabel} · {project.year}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight mb-2">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light">
              {project.subtitle}
            </p>
          </div>

          {/* Media Section: 9:16 Vertical Gallery & Video Player */}
          <div className="space-y-4">

            {/* Display 9:16 Vertical Gallery for Live Commerce, or Video Player for other projects */}
            {hasVerticalGallery ? (
              <VerticalLiveCommerceGallery
                photos={verticalPhotos}
                projectTitle={project.title}
                onUpdatePhotos={handleUpdateVerticalPhotos}
              />
            ) : (
              /* Interactive Video Player */
              <div className="space-y-3">
                <VideoPlayer
                  key={`${activeVideo.slotNumber}-${activeVideo.videoUrl}`}
                  type={activeVideo.videoType}
                  url={activeVideo.videoUrl}
                  thumbnail={activeVideo.thumbnail || project.thumbnail}
                  title={activeVideo.title}
                  autoPlay={false}
                />

                {/* Active Video Slot Bar & Controls */}
                <div className="p-3.5 bg-neutral-950 border border-neutral-800/80 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono-num font-semibold text-[11px]">
                      <Play className="w-3 h-3 fill-current" />
                      SLOT {String(activeVideo.slotNumber).padStart(2, '0')} / {String(videoSlots.length).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="text-white font-medium truncate max-w-[280px] sm:max-w-md">
                        {activeVideo.title}
                      </div>
                      {activeVideo.subtitle && (
                        <div className="text-neutral-400 text-[11px] font-light truncate max-w-[280px] sm:max-w-md">
                          {activeVideo.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      onClick={handlePrevSlot}
                      className="px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-lg text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                      title="이전 슬롯 영상"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span className="text-[11px]">이전</span>
                    </button>
                    <button
                      onClick={handleNextSlot}
                      className="px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-lg text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                      title="다음 슬롯 영상"
                    >
                      <span className="text-[11px]">다음</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleOpenEditSlot}
                      className="px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 hover:border-amber-400/60 rounded-lg text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
                      title="현재 영상 링크/정보 수정"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      <span className="text-[11px]">영상 수정</span>
                    </button>
                    {videoSlots.length < maxAllowedSlots && (
                      <button
                        onClick={handleOpenAddSlot}
                        className="px-2.5 py-1.5 bg-amber-400/10 border border-amber-400/40 hover:bg-amber-400/20 hover:border-amber-400 rounded-lg text-amber-300 hover:text-amber-200 transition-colors cursor-pointer flex items-center gap-1.5"
                        title="새 영상 1개 더 추가"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span className="text-[11px]">영상 추가</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Quick Episode Switcher Tabs if multiple videos */}
                {(videoSlots.length > 1 || videoSlots.length < maxAllowedSlots) && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
                    {videoSlots.map((slot, idx) => (
                      <button
                        key={slot.id || idx}
                        onClick={() => setActiveSlotIndex(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
                          idx === activeSlotIndex
                            ? 'bg-amber-400 text-black border-amber-400 font-semibold shadow-sm'
                            : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white'
                        }`}
                      >
                        <span className="font-mono-num text-[11px] opacity-80">
                          EP.{String(slot.slotNumber).padStart(2, '0')}
                        </span>
                        <span className="truncate max-w-[180px] sm:max-w-xs">{slot.title}</span>
                      </button>
                    ))}
                    {videoSlots.length < maxAllowedSlots && (
                      <button
                        onClick={handleOpenAddSlot}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border border-dashed border-amber-400/40 text-amber-400 hover:bg-amber-400/10 hover:border-amber-400 shrink-0"
                        title="새 영상 1개 더 추가"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>영상 추가</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* PROJECT OVERVIEW */}
          <div className="border-t border-neutral-800 pt-8">
            <h3 className="text-xs uppercase tracking-widest font-mono-num text-neutral-400 mb-3">
              PROJECT OVERVIEW
            </h3>
            {renderFormattedOverview(project.overview)}
          </div>

          {/* PROJECT INFO Grid */}
          <div
            className={`grid grid-cols-1 ${
              (project.episodesCount && project.episodesCount.trim() !== '') ||
              (project.viewsCount && project.viewsCount.trim() !== '')
                ? 'sm:grid-cols-2 lg:grid-cols-4'
                : 'sm:grid-cols-2'
            } gap-4 py-2`}
          >
            <div className="p-4 bg-neutral-900/60 border border-neutral-800/80 rounded-xl">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1 font-mono-num">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>제작 기간</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {project.period}
              </div>
            </div>

            <div className="p-4 bg-neutral-900/60 border border-neutral-800/80 rounded-xl">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1 font-mono-num">
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>담당 업무</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {project.id === 'project-shorts-viral'
                  ? '숏폼 기획 및 제작'
                  : project.roles.length <= 3
                  ? project.roles.join(' · ')
                  : `${project.roles.slice(0, 2).join(' · ')} 외`}
              </div>
            </div>

            {project.episodesCount && project.episodesCount.trim() !== '' && (
              <div className="p-4 bg-neutral-900/60 border border-neutral-800/80 rounded-xl">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1 font-mono-num">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>제작 편수</span>
                </div>
                <div className="text-sm font-semibold text-white font-mono-num">
                  {project.episodesCount}
                </div>
              </div>
            )}

            {project.viewsCount && project.viewsCount.trim() !== '' && (
              <div className="p-4 bg-neutral-900/60 border border-neutral-800/80 rounded-xl">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1 font-mono-num">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>누적 성과</span>
                </div>
                <div className="text-sm font-semibold text-white font-mono-num">
                  {project.viewsCount}
                </div>
              </div>
            )}
          </div>

          {/* MY ROLE & INTENT DUAL SECTION */}
          <div
            className={`grid grid-cols-1 ${
              (project.purposeAndTarget && project.purposeAndTarget.trim() !== '') ||
              (project.planningIntent && project.planningIntent.trim() !== '')
                ? 'md:grid-cols-2'
                : 'md:grid-cols-1'
            } gap-8 border-t border-neutral-800 pt-8`}
          >
            <div>
              <h3 className="text-xs uppercase tracking-widest font-mono-num text-neutral-400 mb-4">
                MY ROLE & RESPONSIBILITY
              </h3>
              <ul className="space-y-2.5 text-sm text-neutral-300">
                {project.roles.map((role, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span>{role}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-neutral-800/60">
                <div className="text-xs text-neutral-400 font-mono-num mb-2">
                  PRODUCTION TOOLS & GEAR
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-neutral-300">
                  {project.toolsUsed.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 font-mono-num text-[11px]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {((project.purposeAndTarget && project.purposeAndTarget.trim() !== '') ||
              (project.planningIntent && project.planningIntent.trim() !== '')) && (
              <div>
                <h3 className="text-xs uppercase tracking-widest font-mono-num text-neutral-400 mb-4">
                  PURPOSE & PLANNING INTENT
                </h3>
                <div className="space-y-4 text-sm text-neutral-300">
                  {project.purposeAndTarget && project.purposeAndTarget.trim() !== '' && (
                    <div>
                      <div className="text-xs text-neutral-400 font-medium mb-1">
                        타깃 및 제작 목적
                      </div>
                      <p className="text-neutral-200">{project.purposeAndTarget}</p>
                    </div>
                  )}
                  {project.planningIntent && project.planningIntent.trim() !== '' && (
                    <div>
                      <div className="text-xs text-neutral-400 font-medium mb-1">
                        기획 의도 및 연출 포인트
                      </div>
                      <p className="text-neutral-200">{project.planningIntent}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* PRODUCTION PROCESS */}
          {project.productionProcess && project.productionProcess.length > 0 && (
            <div className="border-t border-neutral-800 pt-8">
              <h3 className="text-xs uppercase tracking-widest font-mono-num text-neutral-400 mb-4">
                PRODUCTION PROCESS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.productionProcess.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl relative"
                  >
                    <span className="text-xs font-mono-num text-amber-400 font-bold block mb-2">
                      STEP 0{idx + 1}
                    </span>
                    <p className="text-xs text-neutral-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RESULTS & IMPACT */}
          {project.resultsAndImpact && project.resultsAndImpact.length > 0 && (
            <div className="border-t border-neutral-800 pt-8 pb-4">
              <h3 className="text-xs uppercase tracking-widest font-mono-num text-neutral-400 mb-4">
                RESULTS & IMPACT (성과)
              </h3>
              <div className="space-y-3">
                {project.resultsAndImpact.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 bg-neutral-900/40 border border-neutral-800/80 rounded-xl text-sm text-neutral-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Navigator Footer */}
        <div className="px-6 py-4 bg-neutral-950 border-t border-neutral-800/80 flex items-center justify-between shrink-0">
          <div>
            {prevProject ? (
              <button
                onClick={() => onSelectProject(prevProject)}
                className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">이전 프로젝트:</span>
                <span className="text-neutral-200 font-medium truncate max-w-[150px] sm:max-w-[200px]">
                  {prevProject.title}
                </span>
              </button>
            ) : (
              <div />
            )}
          </div>

          <div>
            {nextProject ? (
              <button
                onClick={() => onSelectProject(nextProject)}
                className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <span className="hidden sm:inline">다음 프로젝트:</span>
                <span className="text-neutral-200 font-medium truncate max-w-[150px] sm:max-w-[200px]">
                  {nextProject.title}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="text-xs text-neutral-400 hover:text-white cursor-pointer"
              >
                목록으로 돌아가기
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Password Auth Modal */}
      {isAuthOpen && (
        <PasswordAuthModal
          isOpen={isAuthOpen}
          title="영상 슬롯 수정 권한 인증"
          description="영상 링크 및 슬롯 정보를 수정하거나 추가하려면 비밀번호를 입력해주세요."
          onSuccess={() => {
            setIsAuthOpen(false);
            if (authAction) {
              authAction();
              setAuthAction(null);
            } else {
              setEditingSlot(activeVideo);
            }
          }}
          onClose={() => {
            setIsAuthOpen(false);
            setAuthAction(null);
          }}
        />
      )}

      {/* Edit Slot Modal */}
      {editingSlot && (
        <EditVideoSlotModal
          slot={editingSlot}
          onSave={handleSaveSlot}
          onClose={() => setEditingSlot(null)}
        />
      )}
    </div>
  );
};
