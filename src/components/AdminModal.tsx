import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Download,
  Upload,
  Video,
  Image as ImageIcon,
  Check,
  Lock,
  Unlock,
  Inbox,
  Film
} from 'lucide-react';
import { Project, ProjectInquiry } from '../types/portfolio';
import { portfolioStorage } from '../services/portfolioStorage';
import { isAuthorized, verifyPassword, setAuthorized } from '../utils/auth';

interface AdminModalProps {
  projects: Project[];
  onClose: () => void;
  onProjectsUpdated: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  projects,
  onClose,
  onProjectsUpdated,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isAuthorized());
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'projects' | 'inquiries'>('projects');

  // Form editing state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);

  // Form fields
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: 'corporate' as Project['category'],
    categoryLabel: '기업·사내 콘텐츠',
    year: '2026',
    client: '',
    period: '',
    roles: '기획, 촬영, 편집',
    episodesCount: '1편',
    viewsCount: '10만 회',
    thumbnail: '',
    videoType: 'youtube' as Project['videoType'],
    videoUrl: '',
    overview: '',
    purposeAndTarget: '',
    planningIntent: '',
    productionProcess: '사전 기획\n촬영 진행\n편집 및 색보정',
    resultsAndImpact: '조회수 달성\n클라이언트 만족도 우수',
    toolsUsed: 'Sony FX3, Premiere Pro',
    isPublished: true,
    isFeatured: false,
  });

  const [inquiries, setInquiries] = useState<ProjectInquiry[]>(() => portfolioStorage.getInquiries());
  const [successNotice, setSuccessNotice] = useState<string>('');

  const showNotice = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => setSuccessNotice(''), 3000);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPassword(pinInput)) {
      setAuthorized(true);
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('비밀번호가 올바르지 않습니다.');
    }
  };

  const handleOpenAdd = () => {
    setCurrentEditId(null);
    setFormData({
      title: '',
      subtitle: '',
      category: 'corporate',
      categoryLabel: '기업·사내 콘텐츠',
      year: new Date().getFullYear().toString(),
      client: '',
      period: '2026.01 – 2026.06',
      roles: '기획, 촬영, 편집',
      episodesCount: '1편',
      viewsCount: '10만 회',
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
      videoType: 'youtube',
      videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
      overview: '',
      purposeAndTarget: '',
      planningIntent: '',
      productionProcess: '기획 및 사전 취재\n로케이션 촬영 진행\n편집 및 사운드 마스터링',
      resultsAndImpact: '목표 조회수 초과 달성\n사내외 긍정적 반응 도출',
      toolsUsed: 'Sony FX3, Premiere Pro, DaVinci Resolve',
      isPublished: true,
      isFeatured: false,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (project: Project) => {
    setCurrentEditId(project.id);
    setFormData({
      title: project.title,
      subtitle: project.subtitle,
      category: project.category,
      categoryLabel: project.categoryLabel,
      year: project.year,
      client: project.client,
      period: project.period,
      roles: project.roles.join(', '),
      episodesCount: project.episodesCount,
      viewsCount: project.viewsCount,
      thumbnail: project.thumbnail,
      videoType: project.videoType,
      videoUrl: project.videoUrl,
      overview: project.overview,
      purposeAndTarget: project.purposeAndTarget,
      planningIntent: project.planningIntent,
      productionProcess: project.productionProcess.join('\n'),
      resultsAndImpact: project.resultsAndImpact.join('\n'),
      toolsUsed: project.toolsUsed.join(', '),
      isPublished: project.isPublished,
      isFeatured: project.isFeatured,
    });
    setIsEditing(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();

    const rolesArr = formData.roles.split(',').map((s) => s.trim()).filter(Boolean);
    const toolsArr = formData.toolsUsed.split(',').map((s) => s.trim()).filter(Boolean);
    const processArr = formData.productionProcess.split('\n').map((s) => s.trim()).filter(Boolean);
    const resultsArr = formData.resultsAndImpact.split('\n').map((s) => s.trim()).filter(Boolean);

    // Map category to label
    const categoryLabels: Record<Project['category'], string> = {
      corporate: '기업, 사내 콘텐츠',
      channel: '유튜브 채널 콘텐츠',
      shorts: '쇼츠',
      live: '라이브 방송 제작',
      branded: '유튜브 채널 콘텐츠',
    };

    if (currentEditId) {
      portfolioStorage.updateProject(currentEditId, {
        title: formData.title,
        subtitle: formData.subtitle,
        category: formData.category,
        categoryLabel: categoryLabels[formData.category] || formData.categoryLabel,
        year: formData.year,
        client: formData.client,
        period: formData.period,
        roles: rolesArr,
        episodesCount: formData.episodesCount,
        viewsCount: formData.viewsCount,
        thumbnail: formData.thumbnail,
        videoType: formData.videoType,
        videoUrl: formData.videoUrl,
        overview: formData.overview,
        purposeAndTarget: formData.purposeAndTarget,
        planningIntent: formData.planningIntent,
        productionProcess: processArr,
        resultsAndImpact: resultsArr,
        toolsUsed: toolsArr,
        isPublished: formData.isPublished,
        isFeatured: formData.isFeatured,
      });
      showNotice('프로젝트 정보가 성공적으로 수정되었습니다.');
    } else {
      portfolioStorage.addProject({
        title: formData.title,
        subtitle: formData.subtitle,
        category: formData.category,
        categoryLabel: categoryLabels[formData.category] || formData.categoryLabel,
        year: formData.year,
        client: formData.client,
        period: formData.period,
        roles: rolesArr,
        episodesCount: formData.episodesCount,
        viewsCount: formData.viewsCount,
        thumbnail: formData.thumbnail,
        videoType: formData.videoType,
        videoUrl: formData.videoUrl,
        overview: formData.overview,
        purposeAndTarget: formData.purposeAndTarget,
        planningIntent: formData.planningIntent,
        productionProcess: processArr,
        resultsAndImpact: resultsArr,
        toolsUsed: toolsArr,
        isPublished: formData.isPublished,
        isFeatured: formData.isFeatured,
      });
      showNotice('새 프로젝트가 추가되었습니다.');
    }

    setIsEditing(false);
    onProjectsUpdated();
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`'${title}' 프로젝트를 삭제하시겠습니까?`)) {
      portfolioStorage.deleteProject(id);
      showNotice('프로젝트가 삭제되었습니다.');
      onProjectsUpdated();
    }
  };

  const handleToggleVisibility = (id: string) => {
    portfolioStorage.toggleVisibility(id);
    onProjectsUpdated();
  };

  const handleReorder = (id: string, direction: 'up' | 'down') => {
    portfolioStorage.reorderProject(id, direction);
    onProjectsUpdated();
  };

  const handleResetDefaults = () => {
    if (window.confirm('모든 데이터를 초기 기본값(손성혁 대표 프로젝트 6개)으로 초기화하시겠습니까?')) {
      portfolioStorage.resetToDefaults();
      showNotice('기본 프로젝트 목록으로 초기화되었습니다.');
      onProjectsUpdated();
    }
  };

  // Local file upload handler for thumbnail or MP4
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetField: 'thumbnail' | 'videoUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setFormData((prev) => ({
          ...prev,
          [targetField]: result,
          ...(targetField === 'videoUrl' ? { videoType: 'mp4' } : {}),
        }));
        showNotice(`${targetField === 'thumbnail' ? '썸네일 이미지' : '영상 파일'}이 업로드되었습니다.`);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-[#0d0d12] border border-neutral-800 rounded-2xl p-6 text-center shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">포트폴리오 관리자 인증</h3>
          <p className="text-xs text-neutral-400 mb-6">
            프로젝트 추가/수정 권한 확인을 위해 비밀번호를 입력해주세요.
          </p>
          <form onSubmit={handlePinSubmit} className="space-y-3">
            <input
              type="password"
              placeholder="PIN 번호 입력"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full px-3 py-2 text-center text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
              autoFocus
            />
            {pinError && <p className="text-xs text-red-400">{pinError}</p>}
            <button
              type="submit"
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              로그인
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-xs text-neutral-400 hover:text-white"
            >
              취소
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-[#0d0d12] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-auto text-neutral-200 flex flex-col max-h-[92vh]"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-num font-semibold text-amber-400">
              ADMIN DASHBOARD
            </span>
            <span className="text-neutral-600">/</span>
            <span className="text-xs text-neutral-400">포트폴리오 영상 & 프로젝트 관리</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection & Actions Bar */}
        <div className="px-6 py-3 bg-neutral-950 border-b border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('projects');
                setIsEditing(false);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'projects'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>프로젝트 관리 ({projects.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('inquiries');
                setIsEditing(false);
                setInquiries(portfolioStorage.getInquiries());
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'inquiries'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>수신된 문의함 ({inquiries.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing && activeTab === 'projects' && (
              <button
                onClick={handleOpenAdd}
                className="px-3.5 py-1.5 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>새 프로젝트 추가</span>
              </button>
            )}

            <button
              onClick={handleResetDefaults}
              title="원래 기본 프로젝트 데이터로 복구"
              className="p-1.5 text-neutral-400 hover:text-neutral-200 border border-neutral-800 hover:border-neutral-700 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">초기화</span>
            </button>
          </div>
        </div>

        {/* Feedback notice toast */}
        {successNotice && (
          <div className="bg-amber-400/10 border-b border-amber-400/20 px-6 py-2 text-xs text-amber-300 flex items-center gap-2">
            <Check className="w-3.5 h-3.5" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-6 flex-1">
          {/* TAB 1: PROJECTS TABLE OR EDIT FORM */}
          {activeTab === 'projects' && (
            <div>
              {isEditing ? (
                /* Edit / Add Project Form */
                <form onSubmit={handleSaveForm} className="space-y-6 max-w-3xl mx-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <h3 className="text-base font-bold text-white">
                      {currentEditId ? '프로젝트 정보 수정' : '새 프로젝트 등록'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="text-xs text-neutral-400 hover:text-white"
                    >
                      취소하고 목록으로
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                        프로젝트 제목 *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:border-amber-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                        카테고리 *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category: e.target.value as Project['category'],
                          })
                        }
                        className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:border-amber-400 outline-none cursor-pointer"
                      >
                        <option value="corporate">01 / 기업, 사내 콘텐츠 (Corporate)</option>
                        <option value="channel">02 / 유튜브 채널 콘텐츠 (Channel)</option>
                        <option value="shorts">03 / 쇼츠 (Shorts)</option>
                        <option value="live">04 / 라이브 방송 제작 (Live Stream)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                        고객사 / 클라이언트
                      </label>
                      <input
                        type="text"
                        placeholder="예: 농협은행, 그립컴퍼니"
                        value={formData.client}
                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:border-amber-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                        제작 기간
                      </label>
                      <input
                        type="text"
                        placeholder="예: 2026.01 – 2026.09"
                        value={formData.period}
                        onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:border-amber-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                        연도 (표기용)
                      </label>
                      <input
                        type="text"
                        placeholder="예: 2026"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:border-amber-400 outline-none"
                      />
                    </div>
                  </div>

                  {/* Video & Media Management */}
                  <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl space-y-4">
                    <div className="text-xs font-mono-num text-amber-400 font-semibold flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5" />
                      <span>영상 관리 (YouTube / Vimeo / MP4 직접 등록)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                          영상 재생 방식
                        </label>
                        <select
                          value={formData.videoType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              videoType: e.target.value as Project['videoType'],
                            })
                          }
                          className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white outline-none cursor-pointer"
                        >
                          <option value="youtube">YouTube 링크</option>
                          <option value="vimeo">Vimeo 링크</option>
                          <option value="mp4">직접 MP4 파일 / URL</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                          영상 URL 또는 동영상 링크 *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={formData.videoUrl}
                          onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-amber-400 outline-none font-mono-num"
                        />
                      </div>
                    </div>

                    {/* Local MP4 file attachment */}
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1 font-mono-num">
                        또는 PC에서 MP4 영상 직접 선택 (브라우저 로컬 저장)
                      </label>
                      <input
                        type="file"
                        accept="video/mp4,video/webm"
                        onChange={(e) => handleFileUpload(e, 'videoUrl')}
                        className="text-xs text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-neutral-800 file:text-neutral-200 hover:file:bg-neutral-700 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Thumbnail Management */}
                  <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl space-y-4">
                    <div className="text-xs font-mono-num text-amber-400 font-semibold flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>썸네일 이미지 관리</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                          썸네일 이미지 URL
                        </label>
                        <input
                          type="text"
                          placeholder="https://..."
                          value={formData.thumbnail}
                          onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-amber-400 outline-none font-mono-num"
                        />
                        <div className="mt-2">
                          <label className="block text-[11px] text-neutral-400 mb-1 font-mono-num">
                            또는 PC에서 썸네일 이미지 파일 선택
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'thumbnail')}
                            className="text-xs text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-neutral-800 file:text-neutral-200 hover:file:bg-neutral-700 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="aspect-video bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 flex items-center justify-center">
                        {formData.thumbnail ? (
                          <img
                            src={formData.thumbnail}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[11px] text-neutral-500">미리보기</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Summary & Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                        담당 업무 (쉼표 구분)
                      </label>
                      <input
                        type="text"
                        placeholder="기획, 촬영, 편집, 색보정"
                        value={formData.roles}
                        onChange={(e) => setFormData({ ...formData, roles: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:border-amber-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                        제작 편수
                      </label>
                      <input
                        type="text"
                        placeholder="예: 35편"
                        value={formData.episodesCount}
                        onChange={(e) => setFormData({ ...formData, episodesCount: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:border-amber-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                        누적 성과 (조회수 등)
                      </label>
                      <input
                        type="text"
                        placeholder="예: 누적 77만 회"
                        value={formData.viewsCount}
                        onChange={(e) => setFormData({ ...formData, viewsCount: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:border-amber-400 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                      한 줄 부제목 / 요약
                    </label>
                    <input
                      type="text"
                      placeholder="프로젝트를 한 문장으로 나타내는 설명"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                      프로젝트 소개 (Overview) *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="프로젝트의 전반적인 내용 및 배경"
                      value={formData.overview}
                      onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:border-amber-400 outline-none resize-none leading-relaxed"
                    />
                  </div>

                  {/* Intent & Target */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                        제작 목적 및 타깃
                      </label>
                      <input
                        type="text"
                        value={formData.purposeAndTarget}
                        onChange={(e) => setFormData({ ...formData, purposeAndTarget: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:border-amber-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                        기획 의도 및 연출 포인트
                      </label>
                      <input
                        type="text"
                        value={formData.planningIntent}
                        onChange={(e) => setFormData({ ...formData, planningIntent: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:border-amber-400 outline-none"
                      />
                    </div>
                  </div>

                  {/* Process & Results */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                        제작 과정 (한 줄에 한 단계씩)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.productionProcess}
                        onChange={(e) => setFormData({ ...formData, productionProcess: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:border-amber-400 outline-none resize-none font-mono-num"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                        결과 및 성과 (한 줄에 하나씩)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.resultsAndImpact}
                        onChange={(e) => setFormData({ ...formData, resultsAndImpact: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:border-amber-400 outline-none resize-none font-mono-num"
                      />
                    </div>
                  </div>

                  {/* Tools & Visibility */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div>
                      <label className="block text-xs font-mono-num text-neutral-400 mb-1">
                        사용 장비 / 소프트웨어 (쉼표 구분)
                      </label>
                      <input
                        type="text"
                        value={formData.toolsUsed}
                        onChange={(e) => setFormData({ ...formData, toolsUsed: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:border-amber-400 outline-none font-mono-num"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-4">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                        <input
                          type="checkbox"
                          checked={formData.isPublished}
                          onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                          className="w-4 h-4 rounded text-amber-400 bg-neutral-950 border-neutral-800"
                        />
                        <span>사이트 공개 여부</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                    >
                      {currentEditId ? '수정 내용 저장' : '새 프로젝트 등록 완료'}
                    </button>
                  </div>
                </form>
              ) : (
                /* Projects Management Table */
                <div className="space-y-4">
                  <div className="overflow-x-auto border border-neutral-800 rounded-xl">
                    <table className="w-full text-left text-xs text-neutral-300">
                      <thead className="bg-neutral-950 text-neutral-400 uppercase font-mono-num text-[11px] border-b border-neutral-800">
                        <tr>
                          <th className="py-3 px-3 w-12 text-center">순서</th>
                          <th className="py-3 px-3 w-20">썸네일</th>
                          <th className="py-3 px-4">제목 & 클라이언트</th>
                          <th className="py-3 px-3">카테고리</th>
                          <th className="py-3 px-3">성과</th>
                          <th className="py-3 px-3 text-center">상태</th>
                          <th className="py-3 px-4 text-right">관리</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-900">
                        {projects.map((project, idx) => (
                          <tr
                            key={project.id}
                            className="hover:bg-neutral-900/40 transition-colors"
                          >
                            <td className="py-3 px-3 text-center font-mono-num text-neutral-500">
                              <div className="flex flex-col items-center gap-0.5">
                                <button
                                  disabled={idx === 0}
                                  onClick={() => handleReorder(project.id, 'up')}
                                  className="text-neutral-500 hover:text-white disabled:opacity-20 cursor-pointer"
                                  title="위로 이동"
                                >
                                  <ArrowUp className="w-3 h-3" />
                                </button>
                                <span>{project.code}</span>
                                <button
                                  disabled={idx === projects.length - 1}
                                  onClick={() => handleReorder(project.id, 'down')}
                                  className="text-neutral-500 hover:text-white disabled:opacity-20 cursor-pointer"
                                  title="아래로 이동"
                                >
                                  <ArrowDown className="w-3 h-3" />
                                </button>
                              </div>
                            </td>

                            <td className="py-3 px-3">
                              <div className="w-16 aspect-video bg-neutral-950 rounded overflow-hidden border border-neutral-800">
                                <img
                                  src={project.thumbnail}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </td>

                            <td className="py-3 px-4">
                              <div className="font-semibold text-white max-w-xs truncate">
                                {project.title}
                              </div>
                              <div className="text-[11px] text-neutral-400 font-mono-num">
                                {project.client} · {project.year}
                              </div>
                            </td>

                            <td className="py-3 px-3">
                              <span className="text-[11px] font-mono-num text-amber-400">
                                {project.category.toUpperCase()}
                              </span>
                            </td>

                            <td className="py-3 px-3 font-mono-num text-neutral-400">
                              {project.viewsCount}
                            </td>

                            <td className="py-3 px-3 text-center">
                              <button
                                onClick={() => handleToggleVisibility(project.id)}
                                className={`p-1.5 rounded transition-colors cursor-pointer ${
                                  project.isPublished
                                    ? 'text-emerald-400 hover:bg-emerald-950/40'
                                    : 'text-neutral-500 hover:bg-neutral-800'
                                }`}
                                title={project.isPublished ? '현재 공개 중 (클릭 시 비공개)' : '현재 비공개 (클릭 시 공개)'}
                              >
                                {project.isPublished ? (
                                  <Eye className="w-4 h-4" />
                                ) : (
                                  <EyeOff className="w-4 h-4" />
                                )}
                              </button>
                            </td>

                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenEdit(project)}
                                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors cursor-pointer"
                                  title="수정"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDelete(project.id, project.title)}
                                  className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-950/30 rounded transition-colors cursor-pointer"
                                  title="삭제"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-[11px] text-neutral-500 font-mono-num text-right">
                    * 프로젝트 추가 시 실시간으로 WORK 섹션 및 상세 모달에 자동 반영됩니다.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INQUIRIES INBOX */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white font-mono-num">
                  수신된 프로젝트 제작 문의함
                </h3>
                <span className="text-xs text-neutral-500 font-mono-num">
                  총 {inquiries.length}건
                </span>
              </div>

              {inquiries.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-neutral-800 rounded-xl text-neutral-500 text-xs">
                  아직 접수된 프로젝트 문의가 없습니다.
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2 text-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-neutral-400 gap-1 pb-2 border-b border-neutral-900">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{inq.name}</span>
                          {inq.company && <span>({inq.company})</span>}
                          <span className="text-amber-400 font-mono-num font-medium">
                            · {inq.projectType}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono-num text-neutral-500">
                          {new Date(inq.createdAt).toLocaleString()}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono-num text-neutral-400">
                        <div>회신 이메일: <span className="text-neutral-200">{inq.email}</span></div>
                        {inq.phone && <div>연락처: <span className="text-neutral-200">{inq.phone}</span></div>}
                        <div>예산: <span className="text-neutral-200">{inq.budget}</span></div>
                      </div>

                      <div className="p-3 bg-neutral-900/50 rounded text-neutral-200 leading-relaxed font-light mt-2">
                        {inq.message}
                      </div>

                      <div className="pt-1 flex justify-end">
                        <a
                          href={`mailto:${inq.email}?subject=RE: ${inq.name}님, 손성혁 영상 PD입니다.`}
                          className="text-[11px] text-amber-400 hover:underline font-mono-num"
                        >
                          답장 보내기 →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500 font-mono-num shrink-0">
          <span>PORTFOLIO ADMIN VERSION 2.0</span>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            대시보드 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
