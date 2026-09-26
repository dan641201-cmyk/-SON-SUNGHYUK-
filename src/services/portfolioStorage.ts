import { Project, ProjectInquiry, AboutMeData, SkillItem, CareerItem, ResumeData } from '../types/portfolio';
import {
  INITIAL_PROJECTS,
  CAREER_HISTORY,
  PRODUCTION_SKILLS,
  PHILOSOPHY_PRINCIPLES,
} from '../data/initialProjects';

const STORAGE_KEY = 'song_seong_hyeok_portfolio_projects_v1';
const INQUIRIES_KEY = 'song_seong_hyeok_portfolio_inquiries_v1';
const SHOWREEL_KEY = 'song_seong_hyeok_portfolio_showreel_v1';
const HERO_INTRO_KEY = 'song_seong_hyeok_portfolio_hero_intro_v1';
const ABOUT_ME_KEY = 'song_seong_hyeok_portfolio_about_v1';
const SKILLS_KEY = 'song_seong_hyeok_portfolio_skills_v1';
const CAREER_KEY = 'song_seong_hyeok_portfolio_career_v1';
const RESUME_KEY = 'song_seong_hyeok_portfolio_resume_v1';

export interface HeroIntroConfig {
  headlineLine1: string;
  headlineLine2: string;
  subhead: string;
  description: string;
}

export const DEFAULT_HERO_INTRO: HeroIntroConfig = {
  headlineLine1: '사람과 브랜드를 이해하고,',
  headlineLine2: '그 가치를 콘텐츠에 담습니다.',
  subhead: '콘텐츠의 시작부터 완성까지 모든 장면을 설계합니다.',
  description:
    '콘텐츠를 기획하고 촬영부터 편집, 라이브 송출까지 직접 수행하며, 농협은행과 그립컴퍼니 등에서 재직하며, 기업 브랜드의 메시지와 다양한 사람들의 이야기를 콘텐츠로 만들어 왔습니다.',
};

export interface ShowreelConfig {
  title: string;
  subtitle: string;
  videoType: 'youtube' | 'vimeo' | 'mp4';
  videoUrl: string;
  thumbnail?: string;
}

export const DEFAULT_SHOWREEL: ShowreelConfig = {
  title: '2026 SON SUNG HYUK SHOWREEL',
  subtitle: '기획 · 촬영 · 편집 · 라이브 송출 하이라이트 영상',
  videoType: 'youtube',
  videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
};

export const DEFAULT_RESUME_DATA: ResumeData = {
  name: '손성혁',
  nameEn: 'SON SUNG HYUK',
  roleTitle: 'Video Producer & Content PD (영상 기획 · 연출 · 촬영 · 편집)',
  email: 'ssh641201@naver.com',
  phone: '010-6412-0176',
  location: 'Seoul, South Korea',
  summary:
    '"아이디어를 콘텐츠로, 메시지를 영상으로." 기획 의도 수립부터 현장 카메라 운용, 프리미어/리졸브 기반의 정밀한 컷편집, 그리고 대형 라이브 송출까지 전체 영상 프로덕션 사이클을 1인 혹은 팀 리더로서 설계하고 완결짓는 비디오 프로듀서입니다.',
  achievements: [
    {
      title: '유튜브 실버버튼 수훈',
      description: '구독자 500명에서 10만 명 달성 및 누적 1,850만 조회수 견인',
    },
    {
      title: '브랜디드 다큐멘터리 35편 완제',
      description: '그립 셀러 인터뷰 시리즈 누적 77만 조회수 및 신규 입점 42% 증대',
    },
    {
      title: '150회+ 라이브 방송 무결점 송출',
      description: '멀티캠 ATEM 시스템 구축으로 방송 무사고율 0.0% 달성',
    },
    {
      title: '사내 콘텐츠 만족도 96.4%',
      description: '농협은행 전국 우수 지점 혁신 인터뷰 기획 및 사내 최고 시청 기록',
    },
  ],
  camerasLighting:
    'Sony FX3, Sony FX6, Sony A7S3, GM Primes/Zooms, DJI RS3 Gimbal, Aputure 300d/600d, Nanlite PavoTubes',
  audioBroadcast:
    'Sennheiser G4 Wireless, Rode NTG3, Blackmagic ATEM Mini Extreme ISO, Behringer X32, Hollyland Cosmo C1',
  postProduction:
    'Adobe Premiere Pro, DaVinci Resolve Studio (Color Grading), After Effects, Photoshop, Illustrator, iZotope RX Audio',
  channelOperation:
    'YouTube Analytics, OBS Studio, vMix Live Streaming, Notion Pipeline',
};

export const DEFAULT_ABOUT_ME: AboutMeData = {
  badge: 'PROFILE & EXPERTISE',
  headline: 'ABOUT ME',
  subheadline: '기획부터 촬영, 편집까지 콘텐츠 제작의 전 과정을 경험하고 완결짓는 영상 PD 손성혁입니다.',
  storyParagraphs: [
    '저는 영상 제작의 분업화된 단계 중 어느 한 부분에만 머무르지 않고, 기획 의도를 수립하는 첫 순간부터 카메라 렌즈 앞에서의 디렉팅, 컷의 호흡을 조율하는 편집과 최종 라이브 송출까지 전체 사이클을 직접 실행하고 조율해 왔습니다.',
    '농협은행의 신뢰도 높은 사내 커뮤니케이션 영상부터, 그립컴퍼니에서 77만 조회수를 기록한 진솔한 셀러 인터뷰 브랜디드 다큐멘터리, 500명에서 10만 명까지 일궈낸 공식 유튜브 채널 성장 전략, 그리고 150회 이상의 대형 라이브커머스 무사고 테크니컬 디렉팅까지—각 프로젝트의 비즈니스 목적에 최적화된 시각 문법을 설계합니다.',
  ],
  principles: PHILOSOPHY_PRINCIPLES,
};

export const portfolioStorage = {
  getHeroIntro: (): HeroIntroConfig => {
    try {
      const data = localStorage.getItem(HERO_INTRO_KEY);
      if (!data) return DEFAULT_HERO_INTRO;
      return { ...DEFAULT_HERO_INTRO, ...JSON.parse(data) };
    } catch {
      return DEFAULT_HERO_INTRO;
    }
  },

  saveHeroIntro: (config: HeroIntroConfig): HeroIntroConfig => {
    try {
      localStorage.setItem(HERO_INTRO_KEY, JSON.stringify(config));
    } catch (e) {
      console.error(e);
    }
    return config;
  },

  getShowreel: (): ShowreelConfig => {
    try {
      const data = localStorage.getItem(SHOWREEL_KEY);
      if (!data) return DEFAULT_SHOWREEL;
      return { ...DEFAULT_SHOWREEL, ...JSON.parse(data) };
    } catch {
      return DEFAULT_SHOWREEL;
    }
  },

  saveShowreel: (config: ShowreelConfig): ShowreelConfig => {
    try {
      localStorage.setItem(SHOWREEL_KEY, JSON.stringify(config));
    } catch (e) {
      console.error(e);
    }
    return config;
  },

  getProjects: (): Project[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
        return INITIAL_PROJECTS;
      }
      let parsed: Project[] = JSON.parse(data);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
        return INITIAL_PROJECTS;
      }

      // Normalize categories and labels to match current schema
      let hasChanges = false;
      const categoryLabelMap: Record<string, string> = {
        corporate: '기업, 사내 콘텐츠',
        channel: '유튜브 채널 콘텐츠',
        shorts: '쇼츠',
        live: '라이브 방송 제작',
      };

      // Filter out deleted projects
      if (parsed.some((p) => p.id === 'project-grip-youtube')) {
        parsed = parsed.filter((p) => p.id !== 'project-grip-youtube');
        hasChanges = true;
      }

      parsed = parsed.map((p) => {
        let updated = { ...p };
        const initialMatch = INITIAL_PROJECTS.find((ip) => ip.id === p.id);
        if (initialMatch) {
          if (updated.order !== initialMatch.order || updated.code !== initialMatch.code) {
            updated.order = initialMatch.order;
            updated.code = initialMatch.code;
            hasChanges = true;
          }
        }
        if (p.id === 'project-nh-bank') {
          const initialNh = INITIAL_PROJECTS.find((ip) => ip.id === 'project-nh-bank');
          if (initialNh) {
            updated.title = initialNh.title;
            updated.subtitle = initialNh.subtitle;
            updated.period = initialNh.period;
            updated.roles = initialNh.roles;
            updated.episodesCount = initialNh.episodesCount;
            updated.viewsCount = initialNh.viewsCount;
            updated.overview = initialNh.overview;
            updated.purposeAndTarget = initialNh.purposeAndTarget;
            updated.planningIntent = initialNh.planningIntent;
            updated.productionProcess = initialNh.productionProcess;
            updated.resultsAndImpact = initialNh.resultsAndImpact;
            updated.toolsUsed = initialNh.toolsUsed;
            if (!updated.videos || updated.videos.length !== 6 || updated.videos.some((v) => (v.slotNumber || 1) > 6)) {
              if (updated.videos && updated.videos.length === 5 && initialNh.videos?.[5]) {
                updated.videos = [...updated.videos, initialNh.videos[5]];
              } else {
                updated.videos = initialNh.videos;
              }
            }
            hasChanges = true;
          }
        }
        if (p.id === 'project-grip-seller') {
          const initialGrip = INITIAL_PROJECTS.find((ip) => ip.id === 'project-grip-seller');
          if (initialGrip) {
            updated.title = initialGrip.title;
            updated.subtitle = initialGrip.subtitle;
            updated.year = initialGrip.year;
            updated.period = initialGrip.period;
            updated.roles = initialGrip.roles;
            updated.viewsCount = initialGrip.viewsCount;
            updated.toolsUsed = initialGrip.toolsUsed;
            updated.productionProcess = initialGrip.productionProcess;
            updated.resultsAndImpact = initialGrip.resultsAndImpact;
            hasChanges = true;
          }
        }
        if (p.id === 'project-grip-docu') {
          const initialDocu = INITIAL_PROJECTS.find((ip) => ip.id === 'project-grip-docu');
          if (initialDocu) {
            updated.title = initialDocu.title;
            updated.subtitle = initialDocu.subtitle;
            updated.year = initialDocu.year;
            updated.period = initialDocu.period;
            updated.roles = initialDocu.roles;
            updated.episodesCount = initialDocu.episodesCount;
            updated.viewsCount = initialDocu.viewsCount;
            updated.overview = initialDocu.overview;
            updated.purposeAndTarget = initialDocu.purposeAndTarget;
            updated.planningIntent = initialDocu.planningIntent;
            updated.toolsUsed = initialDocu.toolsUsed;
            updated.productionProcess = initialDocu.productionProcess;
            updated.resultsAndImpact = initialDocu.resultsAndImpact;
            hasChanges = true;
          }
        }
        if (p.id === 'project-shorts-viral') {
          const initialShorts = INITIAL_PROJECTS.find((ip) => ip.id === 'project-shorts-viral');
          if (initialShorts) {
            updated.title = initialShorts.title;
            updated.subtitle = initialShorts.subtitle;
            updated.year = initialShorts.year;
            updated.client = initialShorts.client;
            updated.period = initialShorts.period;
            updated.roles = initialShorts.roles;
            updated.episodesCount = initialShorts.episodesCount;
            updated.viewsCount = initialShorts.viewsCount;
            updated.overview = initialShorts.overview;
            updated.purposeAndTarget = initialShorts.purposeAndTarget;
            updated.planningIntent = initialShorts.planningIntent;
            updated.toolsUsed = initialShorts.toolsUsed;
            updated.productionProcess = initialShorts.productionProcess;
            updated.resultsAndImpact = initialShorts.resultsAndImpact;
            // Trim to max 6 episodes (ep 7,8,9,10 deleted)
            if (!updated.videos || updated.videos.length !== 6 || updated.videos.some((v) => (v.slotNumber || 1) > 6)) {
              updated.videos = initialShorts.videos;
            }
            hasChanges = true;
          }
        }
        if (p.id === 'project-vet-medical') {
          const initialVet = INITIAL_PROJECTS.find((ip) => ip.id === 'project-vet-medical');
          if (initialVet) {
            updated.episodesCount = initialVet.episodesCount;
            // Trim to max 5 episodes (ep 6,7,8,9,10 deleted)
            if (!updated.videos || updated.videos.length !== 5 || updated.videos.some((v) => (v.slotNumber || 1) > 5)) {
              updated.videos = initialVet.videos;
            }
            hasChanges = true;
          }
        }
        // General guard: any promo / event sketch project should not have ep > 5
        if (
          updated.title.includes('현장스케치') ||
          updated.title.includes('홍보영상') ||
          (updated.subtitle && (updated.subtitle.includes('현장스케치') || updated.subtitle.includes('현장 스케치')))
        ) {
          if (updated.videos && updated.videos.some((v) => (v.slotNumber || 1) > 5)) {
            updated.videos = updated.videos.filter((v) => (v.slotNumber || 1) <= 5);
            hasChanges = true;
          }
        }
        if (p.id === 'project-live-commerce') {
          const initialLive = INITIAL_PROJECTS.find((ip) => ip.id === 'project-live-commerce');
          if (initialLive) {
            if (!updated.verticalPhotos || updated.verticalPhotos.length === 0) {
              updated.verticalPhotos = initialLive.verticalPhotos;
              hasChanges = true;
            } else {
              // Ensure planningDirection is present on existing stored verticalPhotos
              const synced = updated.verticalPhotos.map((item, idx) => {
                const initialItem = initialLive.verticalPhotos?.[idx];
                if (!item.planningDirection || item.planningDirection.includes('동접') || item.planningDirection.includes('완판')) {
                  hasChanges = true;
                  return {
                    ...item,
                    planningDirection: initialItem?.planningDirection || item.planningDirection || item.metrics,
                    metrics: initialItem?.metrics || item.metrics,
                  };
                }
                return item;
              });
              updated.verticalPhotos = synced;
            }
          }
        }
        if ((p.category as string) === 'branded') {
          updated.category = 'channel';
          updated.categoryLabel = '유튜브 채널 콘텐츠';
          hasChanges = true;
        } else if (categoryLabelMap[p.category] && p.categoryLabel !== categoryLabelMap[p.category]) {
          updated.categoryLabel = categoryLabelMap[p.category];
          hasChanges = true;
        }
        return updated;
      });

      // Ensure project-grip-docu is present
      const hasGripDocu = parsed.some((p) => p.id === 'project-grip-docu');
      if (!hasGripDocu) {
        const initialDocu = INITIAL_PROJECTS.find((p) => p.id === 'project-grip-docu');
        if (initialDocu) {
          parsed.push(initialDocu);
          hasChanges = true;
        }
      }

      // Ensure at least one shorts project is present from INITIAL_PROJECTS
      const hasShorts = parsed.some((p) => p.category === 'shorts');
      if (!hasShorts) {
        const initialShorts = INITIAL_PROJECTS.find((p) => p.category === 'shorts');
        if (initialShorts) {
          parsed.push(initialShorts);
          hasChanges = true;
        }
      }

      if (hasChanges) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      }

      return parsed.sort((a, b) => a.order - b.order);
    } catch {
      return INITIAL_PROJECTS;
    }
  },

  getProjectById: (id: string): Project | undefined => {
    const list = portfolioStorage.getProjects();
    return list.find((p) => p.id === id);
  },

  saveProjects: (projects: Project[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (err) {
      console.error('Failed to save projects to localStorage:', err);
    }
  },

  addProject: (newProject: Omit<Project, 'id' | 'order' | 'code'>): Project => {
    const list = portfolioStorage.getProjects();
    const nextOrder = list.length > 0 ? Math.max(...list.map((p) => p.order)) + 1 : 1;
    const formattedCode = String(nextOrder).padStart(2, '0');
    const created: Project = {
      ...newProject,
      id: `project-${Date.now()}`,
      order: nextOrder,
      code: formattedCode,
    };
    const updated = [...list, created];
    portfolioStorage.saveProjects(updated);
    return created;
  },

  updateProject: (id: string, updates: Partial<Project>): Project | null => {
    const list = portfolioStorage.getProjects();
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) return null;
    const updatedProject = { ...list[index], ...updates };
    list[index] = updatedProject;
    portfolioStorage.saveProjects(list);
    return updatedProject;
  },

  deleteProject: (id: string): boolean => {
    const list = portfolioStorage.getProjects();
    const filtered = list.filter((p) => p.id !== id);
    if (filtered.length === list.length) return false;
    // re-normalize order and code
    const reordered = filtered.map((p, idx) => ({
      ...p,
      order: idx + 1,
      code: String(idx + 1).padStart(2, '0'),
    }));
    portfolioStorage.saveProjects(reordered);
    return true;
  },

  reorderProject: (id: string, direction: 'up' | 'down'): Project[] => {
    const list = [...portfolioStorage.getProjects()];
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) return list;
    if (direction === 'up' && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === 'down' && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }
    const normalized = list.map((p, idx) => ({
      ...p,
      order: idx + 1,
      code: String(idx + 1).padStart(2, '0'),
    }));
    portfolioStorage.saveProjects(normalized);
    return normalized;
  },

  toggleVisibility: (id: string): boolean => {
    const list = portfolioStorage.getProjects();
    const target = list.find((p) => p.id === id);
    if (!target) return false;
    target.isPublished = !target.isPublished;
    portfolioStorage.saveProjects(list);
    return target.isPublished;
  },

  resetToDefaults: (): Project[] => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
    return INITIAL_PROJECTS;
  },

  exportJSON: (): string => {
    const list = portfolioStorage.getProjects();
    return JSON.stringify(list, null, 2);
  },

  importJSON: (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed) && parsed.length > 0) {
        portfolioStorage.saveProjects(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  // Contact inquiries
  saveInquiry: (inquiry: Omit<ProjectInquiry, 'createdAt'>): ProjectInquiry => {
    const item: ProjectInquiry = {
      ...inquiry,
      createdAt: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem(INQUIRIES_KEY) || '[]');
      existing.unshift(item);
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(existing));
    } catch (e) {
      console.error(e);
    }
    return item;
  },

  getInquiries: (): ProjectInquiry[] => {
    try {
      return JSON.parse(localStorage.getItem(INQUIRIES_KEY) || '[]');
    } catch {
      return [];
    }
  },

  // ABOUT ME
  getAboutMe: (): AboutMeData => {
    try {
      const data = localStorage.getItem(ABOUT_ME_KEY);
      if (!data) return DEFAULT_ABOUT_ME;
      return { ...DEFAULT_ABOUT_ME, ...JSON.parse(data) };
    } catch {
      return DEFAULT_ABOUT_ME;
    }
  },

  saveAboutMe: (data: AboutMeData): AboutMeData => {
    try {
      localStorage.setItem(ABOUT_ME_KEY, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
    return data;
  },

  resetAboutMe: (): AboutMeData => {
    try {
      localStorage.setItem(ABOUT_ME_KEY, JSON.stringify(DEFAULT_ABOUT_ME));
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_ABOUT_ME;
  },

  // PRODUCTION SKILLS
  getProductionSkills: (): SkillItem[] => {
    try {
      const data = localStorage.getItem(SKILLS_KEY);
      if (!data) return PRODUCTION_SKILLS;
      let parsed = JSON.parse(data);
      if (!Array.isArray(parsed) || parsed.length === 0) return PRODUCTION_SKILLS;
      if (parsed.some((s: SkillItem) => s.name?.includes('컬러 그레이딩') || s.nameEn?.includes('Color Grading'))) {
        parsed = parsed.filter((s: SkillItem) => !s.name?.includes('컬러 그레이딩') && !s.nameEn?.includes('Color Grading'));
        localStorage.setItem(SKILLS_KEY, JSON.stringify(parsed));
      }
      return parsed;
    } catch {
      return PRODUCTION_SKILLS;
    }
  },

  saveProductionSkills: (skills: SkillItem[]): SkillItem[] => {
    try {
      localStorage.setItem(SKILLS_KEY, JSON.stringify(skills));
    } catch (e) {
      console.error(e);
    }
    return skills;
  },

  resetProductionSkills: (): SkillItem[] => {
    try {
      localStorage.setItem(SKILLS_KEY, JSON.stringify(PRODUCTION_SKILLS));
    } catch (e) {
      console.error(e);
    }
    return PRODUCTION_SKILLS;
  },

  // CAREER HISTORY
  getCareerHistory: (): CareerItem[] => {
    try {
      const data = localStorage.getItem(CAREER_KEY);
      if (!data) return CAREER_HISTORY;
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : CAREER_HISTORY;
    } catch {
      return CAREER_HISTORY;
    }
  },

  saveCareerHistory: (careers: CareerItem[]): CareerItem[] => {
    try {
      localStorage.setItem(CAREER_KEY, JSON.stringify(careers));
    } catch (e) {
      console.error(e);
    }
    return careers;
  },

  resetCareerHistory: (): CareerItem[] => {
    try {
      localStorage.setItem(CAREER_KEY, JSON.stringify(CAREER_HISTORY));
    } catch (e) {
      console.error(e);
    }
    return CAREER_HISTORY;
  },

  // RESUME
  getResumeData: (): ResumeData => {
    try {
      const data = localStorage.getItem(RESUME_KEY);
      if (!data) return DEFAULT_RESUME_DATA;
      return { ...DEFAULT_RESUME_DATA, ...JSON.parse(data) };
    } catch {
      return DEFAULT_RESUME_DATA;
    }
  },

  saveResumeData: (resume: ResumeData): ResumeData => {
    try {
      localStorage.setItem(RESUME_KEY, JSON.stringify(resume));
    } catch (e) {
      console.error(e);
    }
    return resume;
  },

  resetResumeData: (): ResumeData => {
    try {
      localStorage.setItem(RESUME_KEY, JSON.stringify(DEFAULT_RESUME_DATA));
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_RESUME_DATA;
  },
};
