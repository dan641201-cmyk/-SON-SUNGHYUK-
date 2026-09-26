import React, { useState } from 'react';
import {
  X,
  ArrowUp,
  ArrowDown,
  ArrowUpToLine,
  ArrowDownToLine,
  Trash2,
  Plus,
  Film,
  Check,
  Play,
  Layers,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { ProjectVideoItem } from '../types/portfolio';
import { getYouTubeThumbnail } from '../utils/projectVideos';

interface ReorderVideosModalProps {
  videos: ProjectVideoItem[];
  projectTitle: string;
  onSave: (reorderedVideos: ProjectVideoItem[]) => void;
  onAddNewVideo?: () => void;
  onClose: () => void;
}

export const ReorderVideosModal: React.FC<ReorderVideosModalProps> = ({
  videos,
  projectTitle,
  onSave,
  onAddNewVideo,
  onClose,
}) => {
  const [items, setItems] = useState<ProjectVideoItem[]>(() => [...videos]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Move item up by 1 position
  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    setItems((prev) => {
      const next = [...prev];
      const temp = next[index - 1];
      next[index - 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  // Move item down by 1 position
  const handleMoveDown = (index: number) => {
    if (index >= items.length - 1) return;
    setItems((prev) => {
      const next = [...prev];
      const temp = next[index + 1];
      next[index + 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  // Move to top (position 0)
  const handleMoveToTop = (index: number) => {
    if (index <= 0) return;
    setItems((prev) => {
      const next = [...prev];
      const [target] = next.splice(index, 1);
      next.unshift(target);
      return next;
    });
  };

  // Move to bottom (last position)
  const handleMoveToBottom = (index: number) => {
    if (index >= items.length - 1) return;
    setItems((prev) => {
      const next = [...prev];
      const [target] = next.splice(index, 1);
      next.push(target);
      return next;
    });
  };

  // Delete an item (only if items > 1)
  const handleDelete = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
    setDeleteConfirmId(null);
  };

  const handleSave = () => {
    // Re-index slot numbers 1..N
    const reindexed = items.map((item, idx) => ({
      ...item,
      slotNumber: idx + 1,
    }));
    onSave(reindexed);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#0e0e14] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                영상 순서 변경 및 관리
              </h3>
              <p className="text-[11px] text-neutral-400 font-light truncate max-w-sm sm:max-w-md">
                {projectTitle} · 첫 번째 영상(01)이 프로젝트의 대표 영상으로 재생됩니다.
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

        {/* Video List */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-2.5 flex-1">
          {items.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === items.length - 1;
            const thumb = item.thumbnail || (item.videoUrl ? getYouTubeThumbnail(item.videoUrl) : '');

            return (
              <div
                key={item.id || index}
                className={`p-3 sm:p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isFirst
                    ? 'bg-amber-400/5 border-amber-400/40 shadow-sm'
                    : 'bg-neutral-900/60 border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                {/* Left: Slot Order Badge & Video Details */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Slot Number Badge */}
                  <div
                    className={`w-9 h-9 rounded-lg flex flex-col items-center justify-center shrink-0 font-mono-num font-bold text-xs ${
                      isFirst
                        ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                        : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                    }`}
                  >
                    <span className="text-[9px] uppercase leading-none opacity-70">
                      {isFirst ? 'MAIN' : 'EP'}
                    </span>
                    <span className="leading-tight">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="w-16 h-10 rounded-md overflow-hidden bg-black shrink-0 border border-neutral-800 relative">
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-600">
                        <Play className="w-3.5 h-3.5" />
                      </div>
                    )}
                    {isFirst && (
                      <span className="absolute bottom-0 inset-x-0 bg-amber-400 text-black text-[8px] font-bold text-center">
                        대표
                      </span>
                    )}
                  </div>

                  {/* Video Meta Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white truncate max-w-[200px] sm:max-w-xs">
                        {item.title}
                      </span>
                      {item.tag && (
                        <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-neutral-800 text-[10px] text-amber-300 font-mono-num shrink-0">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-light truncate mt-0.5">
                      <span className="truncate max-w-[180px] sm:max-w-sm">
                        {item.subtitle || item.videoUrl}
                      </span>
                      {item.duration && (
                        <span className="font-mono-num text-[10px] text-neutral-500">
                          · {item.duration}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Reorder & Action Controls */}
                <div className="flex items-center gap-1 sm:gap-1.5 self-end sm:self-auto shrink-0">
                  {/* Move Up */}
                  <button
                    type="button"
                    disabled={isFirst}
                    onClick={() => handleMoveUp(index)}
                    title="위로 한 칸 이동 (순서 앞으로)"
                    className="p-1.5 sm:px-2 sm:py-1.5 bg-neutral-800/80 hover:bg-neutral-700 disabled:opacity-30 disabled:hover:bg-neutral-800/80 text-neutral-200 rounded-lg border border-neutral-700 transition-colors flex items-center gap-1 text-xs cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[11px]">위로</span>
                  </button>

                  {/* Move Down */}
                  <button
                    type="button"
                    disabled={isLast}
                    onClick={() => handleMoveDown(index)}
                    title="아래로 한 칸 이동 (순서 뒤로)"
                    className="p-1.5 sm:px-2 sm:py-1.5 bg-neutral-800/80 hover:bg-neutral-700 disabled:opacity-30 disabled:hover:bg-neutral-800/80 text-neutral-200 rounded-lg border border-neutral-700 transition-colors flex items-center gap-1 text-xs cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[11px]">아래로</span>
                  </button>

                  {/* Quick Top */}
                  <button
                    type="button"
                    disabled={isFirst}
                    onClick={() => handleMoveToTop(index)}
                    title="맨 위로 이동 (대표 영상으로 설정)"
                    className="p-1.5 bg-neutral-800/80 hover:bg-neutral-700 disabled:opacity-30 disabled:hover:bg-neutral-800/80 text-neutral-200 rounded-lg border border-neutral-700 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ArrowUpToLine className="w-3.5 h-3.5" />
                  </button>

                  {/* Quick Bottom */}
                  <button
                    type="button"
                    disabled={isLast}
                    onClick={() => handleMoveToBottom(index)}
                    title="맨 아래로 이동"
                    className="p-1.5 bg-neutral-800/80 hover:bg-neutral-700 disabled:opacity-30 disabled:hover:bg-neutral-800/80 text-neutral-200 rounded-lg border border-neutral-700 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ArrowDownToLine className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete Item (only if items > 1) */}
                  {items.length > 1 && (
                    <>
                      {deleteConfirmId === item.id ? (
                        <div className="flex items-center gap-1 bg-red-950/80 border border-red-500/50 rounded-lg px-2 py-1">
                          <span className="text-[10px] text-red-300">삭제?</span>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="text-[10px] font-bold text-red-400 hover:text-white px-1"
                          >
                            확인
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(null)}
                            className="text-[10px] text-neutral-400 hover:text-white px-1"
                          >
                            취소
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(item.id)}
                          title="이 영상 슬롯 삭제"
                          className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-800 bg-neutral-950/80 shrink-0">
          <div>
            {onAddNewVideo && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onAddNewVideo();
                }}
                className="px-3 py-2 bg-neutral-900 border border-neutral-700 hover:border-amber-400 rounded-lg text-xs font-medium text-amber-300 hover:text-amber-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>새 영상 추가</span>
              </button>
            )}
          </div>

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
              onClick={handleSave}
              className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-400/10"
            >
              <Check className="w-4 h-4" />
              <span>순서 저장 완료 ({items.length}개)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
