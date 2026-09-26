import { Project, ProjectVideoItem, VideoSourceType } from '../types/portfolio';

// Extract YouTube ID helper
export const getYouTubeId = (inputUrl: string): string => {
  if (!inputUrl) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = inputUrl.match(regExp);
  return match && match[2].length === 11 ? match[2] : inputUrl;
};

// Extract Vimeo ID helper
export const getVimeoId = (inputUrl: string): string => {
  if (!inputUrl) return '';
  const match = inputUrl.match(/(?:vimeo.com\/)(\d+)/);
  return match ? match[1] : inputUrl;
};

// Auto extract YouTube thumbnail
export const getYouTubeThumbnail = (url: string): string => {
  const id = getYouTubeId(url);
  if (id && id.length === 11) {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
  return '';
};

// Realistic YouTube IDs for demonstration
const SAMPLE_YOUTUBE_VIDEOS = [
  'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
  'https://www.youtube.com/watch?v=L_LUpnjgPso',
  'https://www.youtube.com/watch?v=7PIji8OubXU',
  'https://www.youtube.com/watch?v=LXb3EKWsInQ',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://www.youtube.com/watch?v=M7lc1UVf-VE',
  'https://www.youtube.com/watch?v=21X5lGlDOfg',
  'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
  'https://www.youtube.com/watch?v=5qap5aO4i9A',
];

/**
 * Determine max episode slots allowed for each project
 * - 숏폼 프로젝트: EP 7,8,9,10 삭제 -> 최대 6개 (EP.01 ~ EP.06)
 * - 본동물의료센터 콘텐츠 제작: EP 6,7,8,9,10 삭제 -> 최대 5개 (EP.01 ~ EP.05)
 * - 홍보영상 현장스케치: 영상 1개 추가 -> 최대 6개 (EP.01 ~ EP.06)
 */
export const getMaxEpisodeSlots = (project: Project): number => {
  const title = project.title || '';
  const subtitle = project.subtitle || '';
  const id = project.id || '';
  const category = project.category || '';

  // 1. 숏폼 프로젝트 (EP 7,8,9,10 삭제 -> 총 6편)
  if (id === 'project-shorts-viral' || category === 'shorts' || title.includes('숏폼')) {
    return 6;
  }

  // 2. 본동물의료센터 (EP 6,7,8,9,10 삭제 -> 총 5편)
  if (id === 'project-vet-medical' || title.includes('본동물의료센터')) {
    return 5;
  }

  // 3. 홍보영상 현장스케치 (영상 1개 추가 -> 총 6편)
  if (
    id === 'project-nh-bank' ||
    title.includes('현장스케치') ||
    title.includes('홍보영상') ||
    subtitle.includes('현장스케치') ||
    subtitle.includes('현장 스케치') ||
    subtitle.includes('홍보')
  ) {
    return 6;
  }

  return 10;
};

// Context-aware episode labels based on project category and specific project
const getEpisodeTemplates = (project: Project): { title: string; subtitle: string; tag: string; duration: string }[] => {
  const title = project.title || '';
  const subtitle = project.subtitle || '';
  const id = project.id || '';

  // Specific: 본동물의료센터 (총 5개, EP 6~10 삭제됨)
  if (id === 'project-vet-medical' || title.includes('본동물의료센터')) {
    return [
      { title: '본동물의료센터 공식 브랜드 홍보영상 본편', subtitle: '전문 의료 시설의 신뢰도와 생명 존중 철학 시각화', tag: '본편 EP.01', duration: '04:30' },
      { title: '24시 응급외상센터 & 전문 진료 체계 안내', subtitle: '골든타임을 지키는 중환자 집중 치료 시스템', tag: '전문진료 EP.02', duration: '03:45' },
      { title: '첨단 수술실 & 무균 감염관리 시스템 쇼케이스', subtitle: '멸균 수술실 첨단 장비 및 마취 모니터링 환경', tag: '수술실 EP.03', duration: '05:10' },
      { title: '의료진 헌신 인터뷰 & 생명 존중 미니 다큐', subtitle: '수의사 및 전문 간호진의 진솔한 생명 수호 인터뷰', tag: '인터뷰 EP.04', duration: '04:15' },
      { title: '보호자 안심 케어 & 정밀 진단 모션그래픽', subtitle: 'CT/MRI 영상 진단 이해를 돕는 인포그래픽 영상', tag: '모션그래픽 EP.05', duration: '03:20' },
    ];
  }

  // Specific: 홍보영상 현장스케치 / 농협은행 사내행사 스케치 (총 6개, EP 06 추가됨)
  if (
    id === 'project-nh-bank' ||
    title.includes('현장스케치') ||
    title.includes('홍보영상') ||
    subtitle.includes('현장스케치') ||
    subtitle.includes('현장 스케치')
  ) {
    return [
      { title: '농협은행 전국 지점 우수직원 노하우 인터뷰', subtitle: '핵심 금융 상담 노하우 및 고객 감동 실전 인터뷰', tag: '우수직원 EP.01', duration: '08:45' },
      { title: '농협은행 연례 사내행사 및 혁신 컨퍼런스 현장 스케치', subtitle: '전국 임직원이 함께하는 화합과 혁신의 현장 스케치', tag: '행사스케치 EP.02', duration: '04:15' },
      { title: '사내 혁신 리더십 다큐멘터리 & 신규 프로젝트', subtitle: '현장 업무 적응기 및 선배 행원 멘토링 인터뷰', tag: '현장다큐 EP.03', duration: '05:30' },
      { title: '전국 농촌 봉사 및 사회공헌 활동 현장 르포', subtitle: '지역 사회와 함께하는 따뜻한 나눔 현장 기록', tag: '사회공헌 EP.04', duration: '03:40' },
      { title: '임직원 사내 소통 활성화 캠페인 공식 홍보영상', subtitle: '사내 포털 게재용 역동적 무빙 하이라이트 영상', tag: '홍보영상 EP.05', duration: '02:50' },
      { title: '현장 스케치 하이라이트 & 메이킹 필름', subtitle: '프로덕션 현장 촬영 비하인드 및 주요 하이라이트 영상', tag: '현장스케치 EP.06', duration: '03:15' },
    ];
  }

  // 숏폼 프로젝트 (총 6개, EP 7~10 삭제됨)
  if (project.category === 'shorts' || id === 'project-shorts-viral' || title.includes('숏폼')) {
    return [
      { title: '3초 후킹 바이럴 쇼츠 #01 (조회수 240만 회)', subtitle: '스크롤을 멈추게 하는 강력한 시각적 후킹과 자막 연출', tag: '쇼츠 EP.01', duration: '00:45' },
      { title: '핵심 요약 30초 실전 꿀팁 클립 #02', subtitle: '핵심 정보만 군더더기 없이 압축 전달하는 숏폼', tag: '쇼츠 EP.02', duration: '00:32' },
      { title: '인터뷰 명장면 릴스 & 틱톡 클립 #03', subtitle: '가장 임팩트 있는 한마디를 포착한 감동 숏폼', tag: '릴스 EP.03', duration: '00:50' },
      { title: '현장 비하인드 퀵 컷 쇼츠 #04', subtitle: '스피디한 비트 전환과 촬영장 리얼 라이프', tag: '쇼츠 EP.04', duration: '00:38' },
      { title: '트렌드 음원 비트싱크 숏폼 #05', subtitle: 'BGM 리듬에 딱 맞춘 감각적인 컷편집', tag: '비트싱크 EP.05', duration: '00:28' },
      { title: '반전 스토리텔링 마이크로 다큐 #06', subtitle: '짧은 러닝타임 안에 완결된 기승전결 서사 구성', tag: '숏다큐 EP.06', duration: '00:58' },
    ];
  }

  if (project.category === 'corporate') {
    return [
      { title: `${project.client} 전국 지점 우수 행원 인터뷰 본편`, subtitle: '핵심 인터뷰 1화 — 일과 삶의 균형과 고객 감동 스토리', tag: '본편 EP.01', duration: '08:45' },
      { title: '사내 혁신 리더십 다큐멘터리: 변화를 만드는 사람들', subtitle: '본부 및 부서장 인터뷰 — 미래 금융 혁신 비전', tag: '본편 EP.02', duration: '06:30' },
      { title: '신입 행원 1년 차 성장 리포트: 첫 발을 내딛다', subtitle: '현장 업무 적응기 및 선배 행원 멘토링 인터뷰', tag: '본편 EP.03', duration: '05:12' },
      { title: '2026 연례 혁신 컨퍼런스 현장 스케치', subtitle: '전국 임직원 참석 사내 행사 역동적 하이라이트', tag: '현장 행사', duration: '04:15' },
      { title: '디지털 혁신 프로젝트 팀 인터뷰 클립', subtitle: '새로운 모바일 뱅킹 시스템 구축 비하인드 인터뷰', tag: '기획 인터뷰', duration: '05:50' },
    ];
  }

  if (project.category === 'channel') {
    return [
      { title: `${project.title} — 오리지널 본편`, subtitle: '소상공인 셀러의 새벽부터 밤까지, 리얼 휴먼 다큐멘터리', tag: '본편 EP.01', duration: '09:15' },
      { title: '동대문 패션 셀러의 도전: 첫 방송 매출 1억 달성기', subtitle: '현장 밀착 취재 — 위기를 기회로 바꾼 셀러 이야기', tag: '본편 EP.02', duration: '07:40' },
      { title: '제주 감귤 농부의 라이브 방송 개척기', subtitle: '산지 직송 라이브로 일어선 청년 농부의 진솔한 고백', tag: '본편 EP.03', duration: '08:05' },
      { title: '셀러 어워즈 오프닝 필름 (Director\'s Cut)', subtitle: '전국 파트너 셀러 헌정 감동 오프닝 영상', tag: '어워즈 필름', duration: '03:50' },
      { title: '브랜드 감성 필름: "우리의 이야기는 계속됩니다"', subtitle: '담담한 피사체 관찰과 어쿠스틱 사운드의 조화', tag: '스토리텔링', duration: '04:25' },
      { title: '라이브 방송 5분 전 백스테이지 다큐', subtitle: '불 꺼진 스튜디오, 방송 온에어 직전의 긴장감', tag: '비하인드', duration: '05:10' },
      { title: '인스타그램 릴스 & 유튜브 쇼츠 바이럴 컷 01', subtitle: '조회수 120만 회 기록한 감동 인터뷰 쇼츠 클립', tag: '숏폼 SHORTS', duration: '00:55' },
      { title: '인스타그램 릴스 & 유튜브 쇼츠 바이럴 컷 02', subtitle: '셀러의 눈물과 감사 메시지 하이라이트 숏폼', tag: '숏폼 SHORTS', duration: '00:48' },
      { title: '현장 인터뷰 B-Roll & 소니 A7S3 4K 슬로우 모션', subtitle: '피사체 표정과 현장 디테일을 살린 B-roll 모음', tag: 'B-ROLL', duration: '02:40' },
      { title: '시즌 통합 하이라이트 필름 (35편 완제 기념)', subtitle: '총 35편의 시리즈 완성을 기록한 피날레 에디션', tag: '피날레 SPECIAL', duration: '04:00' },
    ];
  }

  // Live stream or general
  return [
    { title: `${project.title} — 메인 온에어 하이라이트`, subtitle: '동시 접속 4만 명 돌파 실시간 메인 라이브 스위칭 컷', tag: '라이브 EP.01', duration: '15:30' },
    { title: '오프닝 카운트다운 및 인트로 모션 그래픽', subtitle: '방송 시작 5분 전 시청자 유입 극대화 인트로', tag: '오프닝 VCR', duration: '03:00' },
    { title: '상품 시연 및 3점 조명 디테일 쇼케이스', subtitle: '시네마 카메라 4K 클로즈업 무결점 스위칭', tag: '상품 쇼케이스', duration: '08:15' },
    { title: '게스트 쇼호스트 토크 및 실시간 소통 코너', subtitle: '실시간 채팅 오버레이 그래픽 연동 방송', tag: '토크 세그먼트', duration: '11:20' },
    { title: '타임 세일 카운트다운 이벤트 연출', subtitle: '긴박감 넘치는 텐션 조절과 음향 효과 연출', tag: '이벤트 세그먼트', duration: '06:40' },
  ];
};

/**
 * Ensures video slots for a project respecting exact episode limits.
 * Filters out deleted episodes (e.g. ep 7..10 for shorts, ep 6..10 for vet medical & promo sketch)
 */
export const ensureTenVideoSlots = (project: Project): ProjectVideoItem[] => {
  const maxSlots = getMaxEpisodeSlots(project);
  const existing = (project.videos || []).filter(
    (v) => (v.slotNumber ? v.slotNumber <= maxSlots : true)
  ).slice(0, maxSlots);

  // If project has custom videos explicitly configured within the allowed range, return them directly
  if (existing.length > 0) {
    const filled = [...existing];
    if (filled.length < maxSlots) {
      const templates = getEpisodeTemplates(project);
      for (let i = filled.length + 1; i <= maxSlots; i++) {
        const template = templates[i - 1] || {
          title: `${project.title} — 영상 슬롯 ${String(i).padStart(2, '0')}`,
          subtitle: `프로젝트 관련 영상 클립 및 에피소드 #${i}`,
          tag: `EP.${String(i).padStart(2, '0')}`,
          duration: '05:00',
        };
        const url = SAMPLE_YOUTUBE_VIDEOS[(i - 1) % SAMPLE_YOUTUBE_VIDEOS.length];
        filled.push({
          id: `slot-${project.id}-${i}`,
          slotNumber: i,
          title: template.title,
          subtitle: template.subtitle,
          videoType: 'youtube',
          videoUrl: url,
          thumbnail: getYouTubeThumbnail(url) || project.thumbnail,
          duration: template.duration,
          tag: template.tag,
        });
      }
    }
    return filled.map((v, idx) => ({
      ...v,
      slotNumber: idx + 1,
      videoType: v.videoType || 'youtube',
      videoUrl: v.videoUrl || project.videoUrl,
      thumbnail: v.thumbnail || getYouTubeThumbnail(v.videoUrl) || project.thumbnail,
    }));
  }

  const templates = getEpisodeTemplates(project);
  const slots: ProjectVideoItem[] = [];
  const targetCount = Math.min(maxSlots, templates.length);

  for (let i = 1; i <= targetCount; i++) {
    const template = templates[i - 1] || {
      title: `${project.title} — 영상 슬롯 ${String(i).padStart(2, '0')}`,
      subtitle: `프로젝트 관련 영상 클립 및 에피소드 #${i}`,
      tag: `EP.${String(i).padStart(2, '0')}`,
      duration: '05:00',
    };

    // Assign URL: Slot 1 uses main project video URL, others use realistic sample URLs
    const url = i === 1 ? project.videoUrl : SAMPLE_YOUTUBE_VIDEOS[(i - 1) % SAMPLE_YOUTUBE_VIDEOS.length];
    const videoType: VideoSourceType = i === 1 ? project.videoType : 'youtube';
    const autoThumb = getYouTubeThumbnail(url) || project.thumbnail;

    slots.push({
      id: `slot-${project.id}-${i}`,
      slotNumber: i,
      title: template.title,
      subtitle: template.subtitle,
      videoType: videoType,
      videoUrl: url,
      thumbnail: autoThumb,
      duration: template.duration,
      tag: template.tag,
    });
  }

  return slots;
};
