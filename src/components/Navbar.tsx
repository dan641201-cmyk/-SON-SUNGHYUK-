import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Settings,
  Type,
  Film,
  FolderKanban,
  ChevronRight,
  Mail,
  User,
  Cpu,
  Briefcase,
} from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenEditHeroIntro: () => void;
  onOpenEditShowreel: () => void;
  onOpenEditAboutMe: () => void;
  onOpenEditSkills: () => void;
  onOpenEditCareer: () => void;
  onOpenEditContact: () => void;
  onOpenResume: () => void;
  onOpenDrive?: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  onOpenEditHeroIntro,
  onOpenEditShowreel,
  onOpenEditAboutMe,
  onOpenEditSkills,
  onOpenEditCareer,
  onOpenEditContact,
  onOpenResume,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const settingsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(event.target as Node)
      ) {
        setIsSettingsMenuOpen(false);
      }
    };
    if (isSettingsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSettingsMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08080a]/90 backdrop-blur-md border-b border-neutral-800/80 py-3.5 shadow-lg shadow-black/40'
          : 'bg-transparent py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="text-lg md:text-xl font-bold font-display tracking-tight text-white hover:text-amber-400 transition-colors shrink-0"
        >
          SON SUNG HYUK
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-wider uppercase font-medium text-neutral-400">
          <button
            onClick={() => scrollToSection('home')}
            className={`hover:text-white transition-colors relative py-1 cursor-pointer ${
              activeSection === 'home' ? 'text-white font-semibold' : ''
            }`}
          >
            Home
            {activeSection === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
            )}
          </button>
          <button
            onClick={() => scrollToSection('work')}
            className={`hover:text-white transition-colors relative py-1 cursor-pointer ${
              activeSection === 'work' ? 'text-white font-semibold' : ''
            }`}
          >
            Work
            {activeSection === 'work' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
            )}
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className={`hover:text-white transition-colors relative py-1 cursor-pointer ${
              activeSection === 'about' ? 'text-white font-semibold' : ''
            }`}
          >
            About
            {activeSection === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
            )}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className={`hover:text-white transition-colors relative py-1 cursor-pointer ${
              activeSection === 'contact' ? 'text-white font-semibold' : ''
            }`}
          >
            Contact
            {activeSection === 'contact' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
            )}
          </button>
        </nav>

        {/* Zone 3: Primary actions & Settings Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center px-3.5 py-1.5 text-xs font-medium text-neutral-300 border border-neutral-700 rounded-lg hover:border-neutral-500 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
          >
            이력서 (CV)
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-4 py-1.5 text-xs font-semibold text-black bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap shadow-sm cursor-pointer"
          >
            Let's Work
          </button>

          {/* Top-Right Settings Gear Menu */}
          <div className="relative" ref={settingsMenuRef}>
            <button
              onClick={() => setIsSettingsMenuOpen((prev) => !prev)}
              title="사이트 설정 및 관리 옵션"
              className={`p-2 rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                isSettingsMenuOpen
                  ? 'bg-amber-400/20 text-amber-400 border border-amber-400/40 shadow-lg shadow-amber-400/10'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80 border border-transparent'
              }`}
              aria-label="사이트 설정 메뉴"
            >
              <Settings className={`w-4 h-4 transition-transform duration-200 ${isSettingsMenuOpen ? 'rotate-90 text-amber-400' : ''}`} />
            </button>

            {isSettingsMenuOpen && (
              <div className="absolute right-0 top-full mt-2.5 w-80 max-h-[85vh] overflow-y-auto bg-[#0e0e14]/98 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2.5 border-b border-neutral-800/80 mb-1.5">
                  <p className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    사이트 설정 및 관리
                  </p>
                  <p className="text-[11px] text-neutral-400 font-light mt-0.5">
                    수정할 섹션 또는 옵션을 선택하세요
                  </p>
                </div>

                <div className="space-y-1">
                  {/* Option 1: Edit Hero Intro */}
                  <button
                    onClick={() => {
                      setIsSettingsMenuOpen(false);
                      onOpenEditHeroIntro();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-neutral-900 transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 group-hover:border-amber-400/50">
                        <Type className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-neutral-200 group-hover:text-amber-400 transition-colors">
                          메인 소개 문구 수정
                        </div>
                        <div className="text-[10px] text-neutral-500 font-light">
                          헤드라인 및 자기소개 본문 편집
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
                  </button>

                  {/* Option 2: Edit Hero Showreel Video */}
                  <button
                    onClick={() => {
                      setIsSettingsMenuOpen(false);
                      onOpenEditShowreel();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-neutral-900 transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 group-hover:border-amber-400/50">
                        <Film className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-neutral-200 group-hover:text-amber-400 transition-colors">
                          메인 영상 변경
                        </div>
                        <div className="text-[10px] text-neutral-500 font-light">
                          하이라이트 쇼릴 영상 URL 및 정보
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
                  </button>

                  <div className="my-1 border-t border-neutral-900" />

                  {/* Option 3: Edit ABOUT ME */}
                  <button
                    onClick={() => {
                      setIsSettingsMenuOpen(false);
                      onOpenEditAboutMe();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-neutral-900 transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 group-hover:border-amber-400/50">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-neutral-200 group-hover:text-amber-400 transition-colors">
                          ABOUT ME 수정
                        </div>
                        <div className="text-[10px] text-neutral-500 font-light">
                          소개 타이틀, 서브헤드, 스토리 본문
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
                  </button>

                  {/* Option 4: Edit PRODUCTION SKILLS */}
                  <button
                    onClick={() => {
                      setIsSettingsMenuOpen(false);
                      onOpenEditSkills();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-neutral-900 transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 group-hover:border-amber-400/50">
                        <Cpu className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-neutral-200 group-hover:text-amber-400 transition-colors">
                          PRODUCTION SKILLS 수정
                        </div>
                        <div className="text-[10px] text-neutral-500 font-light">
                          핵심 제작 역량 및 사용 툴 편집
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
                  </button>

                  {/* Option 5: Edit CAREER */}
                  <button
                    onClick={() => {
                      setIsSettingsMenuOpen(false);
                      onOpenEditCareer();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-neutral-900 transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 group-hover:border-amber-400/50">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-neutral-200 group-hover:text-amber-400 transition-colors">
                          CAREER 수정
                        </div>
                        <div className="text-[10px] text-neutral-500 font-light">
                          경력 회사, 역할, 프로젝트 성과 타임라인
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
                  </button>

                  <div className="my-1 border-t border-neutral-900" />

                  {/* Option 6: Edit Contact Information */}
                  <button
                    onClick={() => {
                      setIsSettingsMenuOpen(false);
                      onOpenEditContact();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-neutral-900 transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 group-hover:border-amber-400/50">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-neutral-200 group-hover:text-amber-400 transition-colors">
                          문의 및 연락처 수정
                        </div>
                        <div className="text-[10px] text-neutral-500 font-light">
                          CONTACT 문구 · 이메일 · 전화번호
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
                  </button>

                  <div className="my-1 border-t border-neutral-800/80" />

                  {/* Option 7: Admin Dashboard */}
                  <button
                    onClick={() => {
                      setIsSettingsMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-neutral-900 transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-300 shrink-0 group-hover:border-neutral-500">
                        <FolderKanban className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-neutral-200 group-hover:text-white transition-colors">
                          포트폴리오 관리자 (Admin)
                        </div>
                        <div className="text-[10px] text-neutral-500 font-light">
                          프로젝트 추가·수정 및 전체 관리
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-300 hover:text-white transition-colors"
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0d0d12]/98 border-b border-neutral-800 px-6 py-6 transition-all animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4 text-sm font-medium text-neutral-300 mb-6">
            <button
              onClick={() => scrollToSection('home')}
              className="text-left py-2 hover:text-amber-400 transition-colors"
            >
              00 / HOME
            </button>
            <button
              onClick={() => scrollToSection('work')}
              className="text-left py-2 hover:text-amber-400 transition-colors"
            >
              01 / WORK (포트폴리오)
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left py-2 hover:text-amber-400 transition-colors"
            >
              02 / ABOUT (소개 & 역량)
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left py-2 hover:text-amber-400 transition-colors"
            >
              03 / CONTACT (협업 문의)
            </button>
          </nav>

          <div className="flex flex-col gap-2 pt-4 border-t border-neutral-800">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2.5 text-xs text-center font-medium text-neutral-200 border border-neutral-700 rounded-lg hover:bg-neutral-800"
            >
              이력서 / 경력서 상세 보기
            </button>

            <div className="pt-3 border-t border-neutral-800/80 flex flex-col gap-1">
              <span className="text-[10px] font-mono-num text-neutral-500 uppercase px-1 mb-1">
                사이트 설정 및 관리
              </span>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenEditHeroIntro();
                }}
                className="w-full py-2 px-3 text-xs text-left font-medium text-neutral-300 hover:text-amber-400 hover:bg-neutral-900 rounded-lg flex items-center gap-2"
              >
                <Type className="w-3.5 h-3.5 text-amber-400" />
                <span>메인 소개 문구 수정</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenEditShowreel();
                }}
                className="w-full py-2 px-3 text-xs text-left font-medium text-neutral-300 hover:text-amber-400 hover:bg-neutral-900 rounded-lg flex items-center gap-2"
              >
                <Film className="w-3.5 h-3.5 text-amber-400" />
                <span>메인 영상 변경</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenEditAboutMe();
                }}
                className="w-full py-2 px-3 text-xs text-left font-medium text-neutral-300 hover:text-amber-400 hover:bg-neutral-900 rounded-lg flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>ABOUT ME 수정</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenEditSkills();
                }}
                className="w-full py-2 px-3 text-xs text-left font-medium text-neutral-300 hover:text-amber-400 hover:bg-neutral-900 rounded-lg flex items-center gap-2"
              >
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span>PRODUCTION SKILLS 수정</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenEditCareer();
                }}
                className="w-full py-2 px-3 text-xs text-left font-medium text-neutral-300 hover:text-amber-400 hover:bg-neutral-900 rounded-lg flex items-center gap-2"
              >
                <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                <span>CAREER 수정</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenEditContact();
                }}
                className="w-full py-2 px-3 text-xs text-left font-medium text-neutral-300 hover:text-amber-400 hover:bg-neutral-900 rounded-lg flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>문의 및 연락처 수정</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2 px-3 text-xs text-left font-medium text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg flex items-center gap-2"
              >
                <FolderKanban className="w-3.5 h-3.5 text-neutral-400" />
                <span>포트폴리오 관리자 (Admin)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
