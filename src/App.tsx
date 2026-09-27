import React, { useState, useEffect } from 'react';
import { Project, AboutMeData, SkillItem, CareerItem } from './types/portfolio';
import {
  portfolioStorage,
  HeroIntroConfig,
  ShowreelConfig,
  ContactInfoConfig,
} from './services/portfolioStorage';
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
import { EditHeroIntroModal } from './components/EditHeroIntroModal';
import { EditShowreelModal } from './components/EditShowreelModal';
import { EditContactModal } from './components/EditContactModal';
import { EditAboutMeModal } from './components/EditAboutMeModal';
import { EditProductionSkillsModal } from './components/EditProductionSkillsModal';
import { EditCareerModal } from './components/EditCareerModal';

export default function App() {
  const [projects, setProjects] = useState<Project[]>(() => portfolioStorage.getProjects());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isDriveOpen, setIsDriveOpen] = useState<boolean>(false);

  // Hero Intro, Showreel, and Contact states
  const [heroIntro, setHeroIntro] = useState<HeroIntroConfig>(() => portfolioStorage.getHeroIntro());
  const [showreel, setShowreel] = useState<ShowreelConfig>(() => portfolioStorage.getShowreel());
  const [contactInfo, setContactInfo] = useState<ContactInfoConfig>(() => portfolioStorage.getContactInfo());

  // About, Skills, and Career states
  const [aboutData, setAboutData] = useState<AboutMeData>(() => portfolioStorage.getAboutMe());
  const [skillsData, setSkillsData] = useState<SkillItem[]>(() => portfolioStorage.getProductionSkills());
  const [careersData, setCareersData] = useState<CareerItem[]>(() => portfolioStorage.getCareerHistory());

  // Modal Open states
  const [isIntroEditOpen, setIsIntroEditOpen] = useState(false);
  const [isShowreelEditOpen, setIsShowreelEditOpen] = useState(false);
  const [isContactEditOpen, setIsContactEditOpen] = useState(false);
  const [isAboutEditOpen, setIsAboutEditOpen] = useState(false);
  const [isSkillsEditOpen, setIsSkillsEditOpen] = useState(false);
  const [isCareerEditOpen, setIsCareerEditOpen] = useState(false);

  // Standalone auth modal (used for Footer Admin link)
  const [authConfig, setAuthConfig] = useState<{
    isOpen: boolean;
    title: string;
    onSuccess: () => void;
  } | null>(null);

  const [activeSection, setActiveSection] = useState<string>('home');

  // Since the user is already authenticated with 3798 to open the gear menu,
  // clicking options directly opens the corresponding modal seamlessly.
  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
  };

  const handleOpenFooterAdmin = () => {
    setAuthConfig({
      isOpen: true,
      title: '관리자 권한 인증',
      onSuccess: () => {
        setAuthConfig(null);
        setIsAdminOpen(true);
      },
    });
  };

  const handleOpenEditHeroIntro = () => {
    setIsIntroEditOpen(true);
  };

  const handleOpenEditShowreel = () => {
    setIsShowreelEditOpen(true);
  };

  const handleOpenEditAboutMe = () => {
    setIsAboutEditOpen(true);
  };

  const handleOpenEditSkills = () => {
    setIsSkillsEditOpen(true);
  };

  const handleOpenEditCareer = () => {
    setIsCareerEditOpen(true);
  };

  const handleOpenEditContact = () => {
    setIsContactEditOpen(true);
  };

  const handleSaveHeroIntro = (updated: HeroIntroConfig) => {
    portfolioStorage.saveHeroIntro(updated);
    setHeroIntro(updated);
  };

  const handleSaveShowreel = (updated: ShowreelConfig) => {
    portfolioStorage.saveShowreel(updated);
    setShowreel(updated);
  };

  const handleSaveContactInfo = (updated: ContactInfoConfig) => {
    portfolioStorage.saveContactInfo(updated);
    setContactInfo(updated);
  };

  const handleSaveAbout = (updated: AboutMeData) => {
    portfolioStorage.saveAboutMe(updated);
    setAboutData(updated);
  };

  const handleSaveSkills = (updated: SkillItem[]) => {
    portfolioStorage.saveProductionSkills(updated);
    setSkillsData(updated);
  };

  const handleSaveCareer = (updated: CareerItem[]) => {
    portfolioStorage.saveCareerHistory(updated);
    setCareersData(updated);
  };

  const refreshProjects = () => {
    const updated = portfolioStorage.getProjects();
    setProjects(updated);
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
        onOpenEditHeroIntro={handleOpenEditHeroIntro}
        onOpenEditShowreel={handleOpenEditShowreel}
        onOpenEditAboutMe={handleOpenEditAboutMe}
        onOpenEditSkills={handleOpenEditSkills}
        onOpenEditCareer={handleOpenEditCareer}
        onOpenEditContact={handleOpenEditContact}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenDrive={() => setIsDriveOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section (Clean, cinematic, without floating edit buttons) */}
        <HeroSection
          heroIntro={heroIntro}
          showreel={showreel}
          onExploreWork={() => scrollToSection('work')}
          onContactClick={() => scrollToSection('contact')}
        />

        {/* 2. Work Portfolio Section */}
        <WorkSection
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 3. About & Skills Section */}
        <AboutSection
          aboutData={aboutData}
          skillsData={skillsData}
          careersData={careersData}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 4. Contact & Collaboration Section */}
        <ContactSection
          contactInfo={contactInfo}
          onOpenResume={() => setIsResumeOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={handleOpenFooterAdmin}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Fallback Auth Modal for footer links */}
      {authConfig && authConfig.isOpen && (
        <PasswordAuthModal
          isOpen={authConfig.isOpen}
          title={authConfig.title}
          onSuccess={authConfig.onSuccess}
          onClose={() => setAuthConfig(null)}
        />
      )}

      {/* Edit Hero Intro Modal */}
      {isIntroEditOpen && (
        <EditHeroIntroModal
          initialData={heroIntro}
          onClose={() => setIsIntroEditOpen(false)}
          onSave={handleSaveHeroIntro}
        />
      )}

      {/* Edit Showreel Modal */}
      {isShowreelEditOpen && (
        <EditShowreelModal
          initialData={showreel}
          onClose={() => setIsShowreelEditOpen(false)}
          onSave={handleSaveShowreel}
        />
      )}

      {/* Edit About Me Modal */}
      {isAboutEditOpen && (
        <EditAboutMeModal
          initialData={aboutData}
          onClose={() => setIsAboutEditOpen(false)}
          onSave={handleSaveAbout}
        />
      )}

      {/* Edit Production Skills Modal */}
      {isSkillsEditOpen && (
        <EditProductionSkillsModal
          initialSkills={skillsData}
          onClose={() => setIsSkillsEditOpen(false)}
          onSave={handleSaveSkills}
        />
      )}

      {/* Edit Career Modal */}
      {isCareerEditOpen && (
        <EditCareerModal
          initialCareers={careersData}
          onClose={() => setIsCareerEditOpen(false)}
          onSave={handleSaveCareer}
        />
      )}

      {/* Edit Contact Modal */}
      {isContactEditOpen && (
        <EditContactModal
          initialData={contactInfo}
          onClose={() => setIsContactEditOpen(false)}
          onSave={handleSaveContactInfo}
        />
      )}

      {/* Project Detail Modal */}
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

      {/* Portfolio Admin Modal */}
      {isAdminOpen && (
        <AdminModal
          projects={projects}
          initialAuthenticated={true}
          onClose={() => setIsAdminOpen(false)}
          onProjectsUpdated={refreshProjects}
        />
      )}

      {/* Resume Modal */}
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
