import React, { useState, useEffect } from 'react';
import { Project } from './types/portfolio';
import { portfolioStorage } from './services/portfolioStorage';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WorkSection } from './components/WorkSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AdminModal } from './components/AdminModal';
import { ResumeModal } from './components/ResumeModal';
import { PasswordAuthModal } from './components/PasswordAuthModal';
import { GoogleDriveModal } from './components/GoogleDriveModal';
import { isAuthorized } from './utils/auth';

export default function App() {
  const [projects, setProjects] = useState<Project[]>(() => portfolioStorage.getProjects());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isDriveOpen, setIsDriveOpen] = useState<boolean>(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  const handleOpenAdmin = () => {
    setIsAdminAuthModalOpen(true);
  };

  const refreshProjects = () => {
    const updated = portfolioStorage.getProjects();
    setProjects(updated);
    // If the currently selected project was updated, update its reference
    if (selectedProject) {
      const refreshedTarget = updated.find((p) => p.id === selectedProject.id);
      if (refreshedTarget) setSelectedProject(refreshedTarget);
    }
  };

  // Scroll spy to update active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'work', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
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
    <div className="min-h-screen bg-[#08080a] text-neutral-100 flex flex-col selection:bg-amber-400 selection:text-black">
      {/* 1. Header / Navbar */}
      <Navbar
        activeSection={activeSection}
        onOpenAdmin={handleOpenAdmin}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenDrive={() => setIsDriveOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onExploreWork={() => scrollToSection('work')}
          onContactClick={() => scrollToSection('contact')}
        />

        {/* 2. Work Portfolio Section */}
        <WorkSection
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 2. About & Skills Section */}
        <AboutSection onOpenResume={() => setIsResumeOpen(true)} />

        {/* 3. Contact & Collaboration Section */}
        <ContactSection onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={handleOpenAdmin}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Modals */}
      {isAdminAuthModalOpen && (
        <PasswordAuthModal
          isOpen={isAdminAuthModalOpen}
          title="관리자 권한 인증"
          description="관리자 대시보드(프로젝트 추가·수정·삭제) 접근을 위해 비밀번호(3798)를 입력해주세요."
          onSuccess={() => setIsAdminOpen(true)}
          onClose={() => setIsAdminAuthModalOpen(false)}
        />
      )}

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          projects={projects.filter((p) => p.isPublished)}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(p) => setSelectedProject(p)}
          onUpdateProject={(updated) => {
            portfolioStorage.updateProject(updated.id, updated);
            refreshProjects();
          }}
        />
      )}

      {isAdminOpen && (
        <AdminModal
          projects={projects}
          initialAuthenticated={true}
          onClose={() => setIsAdminOpen(false)}
          onProjectsUpdated={refreshProjects}
        />
      )}

      {isResumeOpen && (
        <ResumeModal onClose={() => setIsResumeOpen(false)} />
      )}

      {/* Google Drive Media & Assets Hub Modal */}
      {isDriveOpen && (
        <GoogleDriveModal
          isOpen={isDriveOpen}
          onClose={() => setIsDriveOpen(false)}
        />
      )}
    </div>
  );
}
