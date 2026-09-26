import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050507] border-t border-neutral-900 py-12 px-6 md:px-10 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-white font-bold font-display text-sm mb-1 tracking-tight">
            SON SUNG HYUK
          </div>
          <p className="text-neutral-500 font-light text-[11px]">
            Video Producer & Content PD · Planning · Directing · Shooting · Editing
          </p>
        </div>

        <div className="flex items-center gap-6 text-[11px] font-mono-num text-neutral-400">
          <a href="#home" className="hover:text-white transition-colors">HOME</a>
          <a href="#work" className="hover:text-white transition-colors">WORK</a>
          <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
          <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
          <button
            onClick={onOpenResume}
            className="hover:text-white transition-colors cursor-pointer"
          >
            RESUME
          </button>
          <button
            onClick={onOpenAdmin}
            className="text-neutral-600 hover:text-amber-400 transition-colors cursor-pointer"
          >
            ADMIN
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[11px] font-mono-num text-neutral-600">
            © {new Date().getFullYear()} Son Sung Hyuk. All rights reserved.
          </span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="맨 위로"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
