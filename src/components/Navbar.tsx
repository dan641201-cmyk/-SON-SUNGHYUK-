import React, { useState, useEffect } from 'react';
import { Menu, X, Settings } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenResume: () => void;
  onOpenDrive?: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  onOpenResume,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

        {/* Zone 2: 4-6 clean text navigation links */}
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

        {/* Zone 3: 1-2 primary actions */}
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

          {/* Admin Dashboard trigger */}
          <button
            onClick={onOpenAdmin}
            title="포트폴리오 관리자 (Admin)"
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800/80 rounded-lg transition-colors cursor-pointer"
            aria-label="관리자 모드 열기"
          >
            <Settings className="w-4 h-4" />
          </button>

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
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 text-xs text-center font-medium text-neutral-400 hover:text-white"
            >
              관리자 모드 (영상 & 프로젝트 관리)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
