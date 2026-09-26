export type ProjectCategory = 'all' | 'corporate' | 'channel' | 'shorts' | 'live' | 'branded';

export type VideoSourceType = 'youtube' | 'vimeo' | 'mp4';

export interface ProjectVideoItem {
  id: string;
  slotNumber: number; // 1 ~ 10
  title: string;
  subtitle?: string;
  videoType: VideoSourceType;
  videoUrl: string; // youtube id/url, vimeo id/url, or mp4 url/data uri
  thumbnail?: string;
  duration?: string;
  tag?: string; // e.g. "EPISODE", "HIGHLIGHT", "INTERVIEW", "TEASER", "B-ROLL"
}

export interface VerticalPhotoItem {
  id: string;
  slotNumber: number; // 1 ~ 5 (or more)
  imageUrl: string;
  title: string;
  subtitle?: string;
  brand?: string;
  categoryTag?: string; // e.g. "뷰티 · 코스메틱", "패션 · 어패럴", "테크 · 가전", "푸드 · 쿠킹", "대형 페스티벌"
  planningDirection?: string; // 방송 기획 방향
  metrics?: string; // 하위 호환성 유지
  description?: string;
}

export interface Project {
  id: string;
  code: string; // e.g. "01", "02"
  title: string;
  subtitle: string;
  category: 'corporate' | 'channel' | 'shorts' | 'live' | 'branded';
  categoryLabel: string;
  year: string;
  client: string;
  period: string;
  roles: string[];
  episodesCount: string;
  viewsCount: string;
  thumbnail: string;
  videoType: VideoSourceType;
  videoUrl: string; // youtube id/url, vimeo id/url, or mp4 url/data uri
  videos?: ProjectVideoItem[]; // 10 video slots for project episodes / clips
  verticalPhotos?: VerticalPhotoItem[]; // 9:16 vertical photos (e.g. for live commerce)
  overview: string;
  purposeAndTarget: string;
  planningIntent: string;
  productionProcess: string[];
  resultsAndImpact: string[];
  toolsUsed: string[];
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
}

export interface CareerItem {
  id: string;
  period: string;
  company: string;
  team: string;
  role: string;
  description: string;
  highlights: string[];
}

export interface SkillItem {
  name: string;
  nameEn: string;
  level: number; // 1-100
  description: string;
  tools: string[];
}

export interface PhilosophyPrinciple {
  num: string;
  title: string;
  description: string;
}

export interface AboutMeData {
  badge: string;
  headline: string;
  subheadline: string;
  storyParagraphs: string[];
  principles: PhilosophyPrinciple[];
}

export interface ResumeAchievement {
  title: string;
  description: string;
}

export interface ResumeData {
  name: string;
  nameEn: string;
  roleTitle: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  achievements: ResumeAchievement[];
  camerasLighting: string;
  audioBroadcast: string;
  postProduction: string;
  channelOperation: string;
}

export interface ProjectInquiry {
  name: string;
  company: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  targetTimeline: string;
  message: string;
  createdAt: string;
}
