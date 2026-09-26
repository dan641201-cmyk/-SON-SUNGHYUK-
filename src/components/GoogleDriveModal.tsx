import React, { useState, useEffect } from 'react';
import {
  X,
  HardDrive,
  Upload,
  Search,
  RefreshCw,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  Video,
  FileText,
  Image as ImageIcon,
  Folder,
  AlertTriangle,
  LogOut,
  File,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken,
} from '../services/googleDriveAuth';
import {
  listGoogleDriveFiles,
  uploadFileToGoogleDrive,
  deleteGoogleDriveFile,
  GoogleDriveFile,
  formatFileSize,
} from '../services/googleDriveApi';

interface GoogleDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile?: (file: GoogleDriveFile) => void;
  title?: string;
}

export const GoogleDriveModal: React.FC<GoogleDriveModalProps> = ({
  isOpen,
  onClose,
  onSelectFile,
  title = 'Google Drive 미디어 & 애셋 관리',
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [files, setFiles] = useState<GoogleDriveFile[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'video' | 'image' | 'doc'>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Destructive delete confirmation dialog state
  const [fileToDelete, setFileToDelete] = useState<GoogleDriveFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        if (token) {
          fetchFiles();
        }
      },
      () => {
        setCurrentUser(null);
        setFiles([]);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [isOpen]);

  const fetchFiles = async () => {
    const token = await getAccessToken();
    if (!token) return;

    setIsLoadingFiles(true);
    setErrorMsg(null);
    try {
      let q = 'trashed = false';
      if (filterType === 'video') {
        q += " and (mimeType contains 'video/')" ;
      } else if (filterType === 'image') {
        q += " and (mimeType contains 'image/')" ;
      } else if (filterType === 'doc') {
        q += " and (mimeType contains 'application/pdf' or mimeType contains 'document' or mimeType contains 'sheet' or mimeType contains 'presentation' or mimeType contains 'text/')" ;
      }

      if (searchQuery.trim()) {
        const sanitized = searchQuery.trim().replace(/['\\]/g, '');
        q += ` and name contains '${sanitized}'`;
      }

      const res = await listGoogleDriveFiles(q, 40);
      setFiles(res.files || []);
    } catch (err: any) {
      console.error('Drive list error:', err);
      setErrorMsg(err.message || 'Google Drive 파일 목록을 불러오지 못했습니다.');
    } finally {
      setIsLoadingFiles(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchFiles();
    }
  }, [filterType]);

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    setErrorMsg(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        fetchFiles();
      }
    } catch (err: any) {
      console.error('Sign in error:', err);
      setErrorMsg(err.message || 'Google 로그인에 실패했습니다.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setCurrentUser(null);
    setFiles([]);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setIsUploading(true);
    setErrorMsg(null);
    try {
      const uploaded = await uploadFileToGoogleDrive(selectedFile);
      setFiles((prev) => [uploaded, ...prev]);
      setSuccessMsg(`"${uploaded.name}" 파일이 Google Drive에 성공적으로 업로드되었습니다.`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      console.error('Upload error:', err);
      setErrorMsg(err.message || '파일 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const confirmDeleteFile = async () => {
    if (!fileToDelete) return;
    setIsDeleting(true);
    setErrorMsg(null);
    try {
      await deleteGoogleDriveFile(fileToDelete.id);
      setFiles((prev) => prev.filter((f) => f.id !== fileToDelete.id));
      setSuccessMsg(`"${fileToDelete.name}" 파일이 Google Drive에서 삭제되었습니다.`);
      setTimeout(() => setSuccessMsg(null), 3500);
      setFileToDelete(null);
    } catch (err: any) {
      console.error('Delete error:', err);
      setErrorMsg(err.message || '파일 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCopyLink = (file: GoogleDriveFile) => {
    const link = file.webViewLink || file.webContentLink || `https://drive.google.com/file/d/${file.id}/view`;
    navigator.clipboard.writeText(link);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-[#0d0d12] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-auto text-neutral-200 flex flex-col max-h-[92vh]"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800/80 bg-neutral-950/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <HardDrive className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>{title}</span>
                <span className="text-[10px] font-mono-num px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-amber-400">
                  WORKSPACE API
                </span>
              </h2>
              <p className="text-xs text-neutral-400 font-light">
                포트폴리오 영상 파일, 원본 클립, 프로젝트 기획 문서를 안전하게 연결하고 활용하세요.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser && (
              <button
                onClick={handleSignOut}
                className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                title="로그아웃"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">로그아웃</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notices */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-red-950/50 border border-red-800/80 rounded-xl text-xs text-red-300 flex items-center justify-between gap-2">
            <span>{errorMsg}</span>
            <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        {successMsg && (
          <div className="mx-6 mt-4 p-3 bg-emerald-950/50 border border-emerald-800/80 rounded-xl text-xs text-emerald-300 flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              {successMsg}
            </span>
            <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col space-y-5">
          {!currentUser ? (
            /* Unauthenticated View: Sign in with Google */
            <div className="my-auto py-12 flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 mb-5 shadow-inner">
                <HardDrive className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">
                Google 계정으로 Google Drive 연결
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Google Drive에 보관된 고화질 영상 소스, 브랜디드 콘텐츠 기획안, 현장 스케치 사진을 포트폴리오에서 직접 불러오고 관리할 수 있습니다.
              </p>

              {/* Official Google Sign-In Button */}
              <button
                onClick={handleSignIn}
                disabled={isAuthenticating}
                className="w-full max-w-xs flex items-center justify-center gap-3 px-5 py-3 bg-white text-neutral-800 hover:bg-neutral-100 rounded-xl font-medium text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>{isAuthenticating ? '인증 진행 중...' : 'Google 계정으로 로그인'}</span>
              </button>

              <div className="mt-4 text-[11px] text-neutral-500 font-mono-num">
                안전한 OAuth 2.0 클라이언트 인증
              </div>
            </div>
          ) : (
            /* Authenticated View: Drive Files Browser */
            <div className="space-y-4">
              {/* User Account Bar & Controls */}
              <div className="p-4 bg-neutral-950 border border-neutral-800/80 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'Google User'}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full border border-neutral-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center border border-amber-400/30">
                      {currentUser.displayName?.[0] || 'G'}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {currentUser.displayName || 'Google 사용자'}
                    </div>
                    <div className="text-xs text-neutral-400 font-mono-num">
                      {currentUser.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold rounded-lg transition-colors shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? '업로드 중...' : 'Google Drive에 파일 업로드'}</span>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={fetchFiles}
                    disabled={isLoadingFiles}
                    className="p-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-lg text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    title="새로고침"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingFiles ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Search & Filter Tabs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 p-1 bg-neutral-950 border border-neutral-800 rounded-xl overflow-x-auto">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      filterType === 'all'
                        ? 'bg-amber-400 text-black font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    전체 ({files.length})
                  </button>
                  <button
                    onClick={() => setFilterType('video')}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      filterType === 'video'
                        ? 'bg-amber-400 text-black font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>영상 (Video)</span>
                  </button>
                  <button
                    onClick={() => setFilterType('image')}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      filterType === 'image'
                        ? 'bg-amber-400 text-black font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>이미지</span>
                  </button>
                  <button
                    onClick={() => setFilterType('doc')}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      filterType === 'doc'
                        ? 'bg-amber-400 text-black font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>기획서·문서</span>
                  </button>
                </div>

                {/* Search Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    fetchFiles();
                  }}
                  className="relative flex-1 sm:max-w-xs"
                >
                  <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="드라이브 파일명 검색..."
                    className="w-full pl-9 pr-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </form>
              </div>

              {/* Files Grid */}
              {isLoadingFiles ? (
                <div className="py-20 flex flex-col items-center justify-center text-neutral-400 text-xs">
                  <RefreshCw className="w-6 h-6 animate-spin text-amber-400 mb-3" />
                  <span>Google Drive 파일 목록을 동기화하는 중...</span>
                </div>
              ) : files.length === 0 ? (
                <div className="py-20 text-center border border-dashed border-neutral-800 rounded-2xl">
                  <Folder className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
                  <p className="text-neutral-400 text-xs mb-2">조건에 일치하는 파일이 없습니다.</p>
                  <p className="text-neutral-600 text-[11px]">
                    우측 상단의 [Google Drive에 파일 업로드] 버튼으로 새 미디어를 올릴 수 있습니다.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {files.map((file) => {
                    const isVid = file.mimeType.includes('video');
                    const isImg = file.mimeType.includes('image');
                    const isDoc =
                      file.mimeType.includes('pdf') ||
                      file.mimeType.includes('document') ||
                      file.mimeType.includes('sheet');

                    return (
                      <div
                        key={file.id}
                        className="group p-3.5 bg-[#0e0e14] border border-neutral-800/80 rounded-xl hover:border-neutral-600 transition-all flex flex-col justify-between"
                      >
                        <div>
                          {/* File Icon & Type badge */}
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400">
                              {isVid ? (
                                <Video className="w-4 h-4" />
                              ) : isImg ? (
                                <ImageIcon className="w-4 h-4" />
                              ) : isDoc ? (
                                <FileText className="w-4 h-4" />
                              ) : (
                                <File className="w-4 h-4" />
                              )}
                            </span>
                            <span className="text-[10px] font-mono-num text-neutral-500">
                              {formatFileSize(file.size)}
                            </span>
                          </div>

                          {/* File Name */}
                          <div
                            title={file.name}
                            className="text-xs font-medium text-white truncate group-hover:text-amber-300 transition-colors mb-1"
                          >
                            {file.name}
                          </div>
                          <div className="text-[10px] font-mono-num text-neutral-500 truncate mb-3">
                            {file.modifiedTime
                              ? new Date(file.modifiedTime).toLocaleDateString('ko-KR')
                              : '—'}
                          </div>
                        </div>

                        {/* File Action Buttons */}
                        <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-neutral-400 text-xs">
                          <div className="flex items-center gap-1.5">
                            {file.webViewLink && (
                              <a
                                href={file.webViewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 hover:text-white transition-colors"
                                title="Google Drive에서 열기"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              onClick={() => handleCopyLink(file)}
                              className="p-1 hover:text-white transition-colors cursor-pointer"
                              title="링크 복사"
                            >
                              {copiedId === file.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              onClick={() => setFileToDelete(file)}
                              className="p-1 hover:text-red-400 transition-colors cursor-pointer"
                              title="삭제 (확인 필요)"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {onSelectFile && (
                            <button
                              onClick={() => onSelectFile(file)}
                              className="px-2 py-0.5 bg-amber-400/10 border border-amber-400/30 text-amber-300 hover:bg-amber-400 hover:text-black rounded text-[11px] font-medium transition-colors cursor-pointer"
                            >
                              선택
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-neutral-950 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Google Drive API v3 연동 활성화</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-lg text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>

      {/* Mandatory User Confirmation Dialog for Destructive Operations */}
      {fileToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#121218] border border-red-900/60 rounded-2xl p-6 text-neutral-200 shadow-2xl space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-800/80 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-base font-bold text-white">Google Drive 파일 삭제 확인</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                다음 파일을 Google Drive에서 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
              </p>
            </div>

            <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs space-y-1">
              <div className="font-semibold text-white truncate">{fileToDelete.name}</div>
              <div className="text-[11px] font-mono-num text-neutral-500">
                크기: {formatFileSize(fileToDelete.size)} · 유형: {fileToDelete.mimeType}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setFileToDelete(null)}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 rounded-xl text-xs font-medium text-neutral-300 transition-colors cursor-pointer"
              >
                취소
              </button>
              <button
                type="button"
                onClick={confirmDeleteFile}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? '삭제 중...' : '확인 및 삭제'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
