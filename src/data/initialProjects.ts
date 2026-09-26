import { Project, CareerItem, SkillItem, VerticalPhotoItem } from '../types/portfolio';

// Generated image assets
import heroReelImg from '../assets/images/hero_producer_reel_1790248972686.jpg';
import nhBankImg from '../assets/images/thumb_nh_bank_1790248994951.jpg';
import sellerGripImg from '../assets/images/thumb_seller_grip_1790249012023.jpg';
import ytChannelImg from '../assets/images/thumb_yt_channel_1790249027616.jpg';
import gripDocuImg from '../assets/images/thumb_grip_docu_1790249045866.jpg';
import liveStreamImg from '../assets/images/thumb_live_stream_1790249063439.jpg';
import vetMedicalImg from '../assets/images/thumb_vet_medical_1790249082144.jpg';

export { heroReelImg };

export const DEFAULT_LIVE_COMMERCE_VERTICAL_PHOTOS: VerticalPhotoItem[] = [
  {
    id: 'slot-live-vert-1',
    slotNumber: 1,
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=720&h=1280&q=80',
    title: 'K-Beauty 글로벌 스킨케어 런칭 라이브',
    subtitle: '피부 결 디테일 매크로 촬영 및 3점 뷰티 조명 세팅',
    brand: 'Grip × 글로벌 코스메틱',
    categoryTag: '뷰티 · 코스메틱',
    planningDirection: '초밀착 매크로 뷰티 텍스처 시연과 실시간 피부 고민 Q&A 소통 중심 기획',
    metrics: '초밀착 매크로 뷰티 텍스처 시연과 실시간 피부 고민 Q&A 소통 중심 기획',
    description: '호스트 바스트샷과 초근접 제품 매크로 줌 2캠 연동. 특수 뷰티 조명으로 화장품 텍스처와 발색을 왜곡 없이 생생하게 송출했습니다.',
  },
  {
    id: 'slot-live-vert-2',
    slotNumber: 2,
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=720&h=1280&q=80',
    title: '현대백화점 디자이너 브랜드 런웨이 패션 라이브',
    subtitle: '전신 런웨이 워킹 샷과 소재감 질감 표현 2캠 실시간 스위칭',
    brand: '현대백화점 디자이너 브랜드전',
    categoryTag: '패션 · 어패럴',
    planningDirection: '런웨이 워킹 샷과 원단 드레이프감·실제 착용 핏을 강조한 라이브 룩북 기획',
    metrics: '런웨이 워킹 샷과 원단 드레이프감·실제 착용 핏을 강조한 라이브 룩북 기획',
    description: '스튜디오 내 미니 런웨이를 조성하고 무선 짐벌 카메라로 의상 핏과 원단 드레이프감을 동적으로 담아내 높은 구매 전환율을 기록했습니다.',
  },
  {
    id: 'slot-live-vert-3',
    slotNumber: 3,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=720&h=1280&q=80',
    title: '프리미엄 스마트 음향·테크 가전 쇼케이스',
    subtitle: 'ATEM 스위처 기반 PPT 오버레이 및 실시간 음향 시연',
    brand: '하이엔드 오디오 테크',
    categoryTag: '테크 · 스마트가전',
    planningDirection: '실시간 하이파이 오디오 청음 테스트와 직관적인 스펙 비교 인포그래픽 연동 기획',
    metrics: '실시간 하이파이 오디오 청음 테스트와 직관적인 스펙 비교 인포그래픽 연동 기획',
    description: '노이즈 캔슬링 음향을 오디오 믹서로 다이렉트 송출하며 스펙 비교 인포그래픽을 실시간 크로마키 자막으로 연동해 시청 편의성을 극대화했습니다.',
  },
  {
    id: 'slot-live-vert-4',
    slotNumber: 4,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=720&h=1280&q=80',
    title: '산지직송 프리미엄 고메 & 셰프 쿠킹 라이브',
    subtitle: '조리 오버헤드 탑뷰 캠 & 현장 지글거리는 사운드 ASMR 수음',
    brand: 'Grip 산지직송 명품관',
    categoryTag: '푸드 · 쿠킹',
    planningDirection: '셰프 탑뷰 라이브 쿠킹과 지글거리는 조리음 ASMR을 결합한 오감 자극 먹방 기획',
    metrics: '셰프 탑뷰 라이브 쿠킹과 지글거리는 조리음 ASMR을 결합한 오감 자극 먹방 기획',
    description: '인덕션 조리 탑뷰 카메라와 셰프 정면캠을 직관적으로 운용하고 마이크 게인을 최적화해 감각적인 먹방 라이브를 구현했습니다.',
  },
  {
    id: 'slot-live-vert-5',
    slotNumber: 5,
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=720&h=1280&q=80',
    title: 'Grip 연말 어워즈 콘서트형 페스티벌 라이브',
    subtitle: '4캠 멀티 프로덕션 무선 비디오 송출 및 실시간 테크니컬 총괄',
    brand: '그립컴퍼니 연말 어워즈',
    categoryTag: '대형 페스티벌',
    planningDirection: '4캠 시네마틱 멀티뷰와 실시간 시청자 참여형 콘서트 어워즈 무대 연출 기획',
    metrics: '4캠 시네마틱 멀티뷰와 실시간 시청자 참여형 콘서트 어워즈 무대 연출 기획',
    description: '대형 무대 조명 환경에서 4대의 시네마 카메라와 무선 비디오 전송망, 듀얼 인터넷 페일오버 시스템을 가동하여 3시간 동안 무사고 완벽 송출을 이뤄냈습니다.',
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'project-nh-bank',
    code: '01',
    title: '농협은행 사내 콘텐츠',
    subtitle: '우수직원 노하우 콘텐츠 영상 및 사내행사 현장 스케치 영상',
    category: 'corporate',
    categoryLabel: '기업, 사내 콘텐츠',
    year: '2026',
    client: 'NH농협은행',
    period: '2026.05 – 현재',
    roles: ['현장 연출', '편집', '촬영'],
    episodesCount: '6편',
    viewsCount: '',
    thumbnail: nhBankImg,
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    videos: [
      {
        id: 'slot-nh-1',
        slotNumber: 1,
        title: '농협은행 전국 지점 우수직원 노하우 인터뷰',
        subtitle: '핵심 금융 상담 노하우 및 고객 감동 실전 인터뷰',
        tag: '우수직원 EP.01',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
        duration: '08:45',
      },
      {
        id: 'slot-nh-2',
        slotNumber: 2,
        title: '농협은행 연례 사내행사 및 혁신 컨퍼런스 현장 스케치',
        subtitle: '전국 임직원이 함께하는 화합과 혁신의 현장 스케치',
        tag: '행사스케치 EP.02',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
        duration: '04:15',
      },
      {
        id: 'slot-nh-3',
        slotNumber: 3,
        title: '농협은행 신규 혁신 프로젝트 & 지점 현장 다큐',
        subtitle: '현장 근무 환경과 임직원들의 진솔한 소통을 담은 다큐 클립',
        tag: '현장다큐 EP.03',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=L_LUpnjgPso',
        duration: '05:30',
      },
      {
        id: 'slot-nh-4',
        slotNumber: 4,
        title: '전국 농촌 봉사 및 사회공헌 활동 현장 르포',
        subtitle: '지역 사회와 함께하는 따뜻한 나눔 현장 기록',
        tag: '사회공헌 EP.04',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=7PIji8OubXU',
        duration: '03:40',
      },
      {
        id: 'slot-nh-5',
        slotNumber: 5,
        title: '임직원 사내 소통 활성화 캠페인 공식 홍보영상',
        subtitle: '사내 포털 게재용 역동적 무빙 하이라이트 영상',
        tag: '홍보영상 EP.05',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
        duration: '02:50',
      },
      {
        id: 'slot-nh-6',
        slotNumber: 6,
        title: '현장 스케치 하이라이트 & 메이킹 필름',
        subtitle: '프로덕션 현장 촬영 비하인드 및 주요 하이라이트 영상',
        tag: '현장스케치 EP.06',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
        duration: '03:15',
      },
    ],
    overview: `**사내 행사 스케치 영상**
임원진 인터뷰를 비롯해 행사 현장의 주요 순간을 영상으로 담아, 참여 취지와 현장감이 효과적으로 전달될 수 있도록 콘텐츠 제작

**우수 은행원 인터뷰 영상을 통해 전국 농협은행 사내 채널 등재**
전국 영업점 우수 은행원들의 업무 경험과 노하우를 인터뷰 콘텐츠로 제작하여, 사내 채널을 통해 임직원이 시청할 수 있도록 공유`,
    purposeAndTarget: '전국 농협은행 임직원 및 사내 공감대 형성, 우수 지점 혁신 사례의 친근한 사내 확산',
    planningIntent: '',
    productionProcess: [],
    resultsAndImpact: [],
    toolsUsed: ['Lumix S2', 'Premiere Pro', 'After Effects'],
    isPublished: true,
    isFeatured: true,
    order: 1,
  },
  {
    id: 'project-grip-seller',
    code: '02',
    title: 'Grip 셀러 인터뷰, 브랜디드 콘텐츠',
    subtitle: '소상공인 셀러들의 치열한 도전과 성장, 노하우를 담은 영상',
    category: 'channel',
    categoryLabel: '유튜브 채널 콘텐츠',
    year: '2022 – 2025',
    client: '그립컴퍼니 (Grip Company)',
    period: '2022.01 – 2025.12',
    roles: ['콘텐츠 방향성 기획', '인터뷰 섭외 및 진행', '1인/2인 촬영', '편집'],
    episodesCount: '35편',
    viewsCount: '',
    thumbnail: sellerGripImg,
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    overview: '국내 1위 라이브커머스 플랫폼 그립(Grip)의 실제 파트너 셀러들이 플랫폼을 통해 매출을 성장시키고 인생의 새로운 전환점을 맞이한 감동적인 여정을 담은 대표 브랜디드 콘텐츠입니다.',
    purposeAndTarget: '신규 입점 잠재 셀러 및 일반 고객층에게 플랫폼의 신뢰성과 진정성 있는 생태계를 각인',
    planningIntent: '화려한 기술 설명 대신 셀러 개인의 새벽 시장 일상과 라이브 직전의 긴장감 등 인간적인 스토리에 초점을 맞춰 진정성 확보.',
    productionProcess: [
      '셀러 라이브 방송 데이터 분석을 통한 매력적 스토리텔러 발굴 및 섭외',
      '콘텐츠 기획 (인터뷰 질문지 작성, 시놉시스 제작)',
      '현장 촬영 진행',
      'Premiere Pro 기반 템포감 있는 편집과 스토리 아크 구성'
    ],
    resultsAndImpact: [
      '시리즈 누적 77만 조회수 달성 및 유튜브 댓글 호평 3,800개 이상',
      '영상 시청 후 신규 셀러 입점 신청률 전년 대비 +42% 증대'
    ],
    toolsUsed: [
      'Sony M4',
      'Sony 24-105mm',
      'Sony 70-200mm',
      'DJI Ronin RS 3',
      'Nanlite Forza 300',
      'Nanlite Forza 60',
      'Cineroid',
      'Premiere Pro'
    ],
    isPublished: true,
    isFeatured: true,
    order: 2,
  },
  {
    id: 'project-grip-docu',
    code: '03',
    title: '그립다큐 관찰형 스토리 콘텐츠',
    subtitle: '판매자의 일상과 업무 현장을 밀착 취재하는 1인칭 다큐멘터리 콘텐츠 기획·제작',
    category: 'channel',
    categoryLabel: '브랜디드 다큐',
    year: '2023 – 2025',
    client: '그립컴퍼니 (Grip Company)',
    period: '2023.08 ~ 2025.12',
    roles: ['밀착 다큐 기획', '촬영', '편집'],
    episodesCount: '16개',
    viewsCount: '',
    thumbnail: gripDocuImg,
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    overview: `판매자의 일상과 업무 현장을 밀착 취재하는 1인칭 다큐멘터리 콘텐츠 기획·제작
기존 인터뷰 형식에서 벗어나 현장 중심의 스토리텔링을 통해 시청자 몰입도 및 공감대 강화`,
    purposeAndTarget: '',
    planningIntent: '',
    productionProcess: [
      '셀러 발굴 및 섭외',
      '기획안 작성 및 촬영 스케줄 관리',
      '현장 촬영',
      '영상 편집'
    ],
    resultsAndImpact: [],
    toolsUsed: ['iPhone Pro Series', 'Sony M4', 'DJI Osmo Mobile Gimbal'],
    isPublished: true,
    isFeatured: true,
    order: 3,
  },
  {
    id: 'project-shorts-viral',
    code: '04',
    title: '숏폼 콘텐츠 기획·제작',
    subtitle: '유튜브·틱톡·인스타 숏폼 콘텐츠 기획 및 촬영·편집',
    category: 'shorts',
    categoryLabel: '쇼츠',
    year: '2023 – 2026',
    client: '유튜브 / 인스타그램 / 틱톡',
    period: '2023.08 ~ 2026.05',
    roles: ['숏폼 기획 및 대본화', '생성형 AI 활용', '제작 편집'],
    episodesCount: '6편',
    viewsCount: '',
    thumbnail: ytChannelImg,
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    videos: [
      {
        id: 'slot-shorts-1',
        slotNumber: 1,
        title: '3초 후킹 바이럴 쇼츠 #01 (조회수 240만 회)',
        subtitle: '스크롤을 멈추게 하는 강력한 시각적 후킹과 자막 연출',
        tag: '쇼츠 EP.01',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
        duration: '00:45',
      },
      {
        id: 'slot-shorts-2',
        slotNumber: 2,
        title: '핵심 요약 30초 실전 꿀팁 클립 #02',
        subtitle: '핵심 정보만 군더더기 없이 압축 전달하는 숏폼',
        tag: '쇼츠 EP.02',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
        duration: '00:32',
      },
      {
        id: 'slot-shorts-3',
        slotNumber: 3,
        title: '인터뷰 명장면 릴스 & 틱톡 클립 #03',
        subtitle: '가장 임팩트 있는 한마디를 포착한 감동 숏폼',
        tag: '릴스 EP.03',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=L_LUpnjgPso',
        duration: '00:50',
      },
      {
        id: 'slot-shorts-4',
        slotNumber: 4,
        title: '현장 비하인드 퀵 컷 쇼츠 #04',
        subtitle: '스피디한 비트 전환과 촬영장 리얼 라이프',
        tag: '쇼츠 EP.04',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=7PIji8OubXU',
        duration: '00:38',
      },
      {
        id: 'slot-shorts-5',
        slotNumber: 5,
        title: '트렌드 음원 비트싱크 숏폼 #05',
        subtitle: 'BGM 리듬에 딱 맞춘 감각적인 컷편집',
        tag: '비트싱크 EP.05',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
        duration: '00:28',
      },
      {
        id: 'slot-shorts-6',
        slotNumber: 6,
        title: '반전 스토리텔링 마이크로 다큐 #06',
        subtitle: '짧은 러닝타임 안에 완결된 기승전결 서사 구성',
        tag: '숏다큐 EP.06',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '00:58',
      },
    ],
    overview: `유튜브·틱톡·인스타 숏폼 콘텐츠 기획 및 촬영·편집
데이터 및 조회수 성과를 기반으로 주제와 포맷을 기획하여 콘텐츠 확산 및 유입 강화`,
    purposeAndTarget: '앱내 유입 강화',
    planningIntent: '',
    productionProcess: [],
    resultsAndImpact: [],
    toolsUsed: ['Premiere Pro', 'After Effects', 'Generative AI Tools', 'Photoshop'],
    isPublished: true,
    isFeatured: true,
    order: 4,
  },
  {
    id: 'project-live-commerce',
    code: '05',
    title: '대형 라이브커머스 기획·송출 및 현장 기술 총괄',
    subtitle: '무사고 완벽 송출을 구현한 멀티캠 방송 시스템 설계 및 실시간 테크니컬 디렉팅',
    category: 'live',
    categoryLabel: '라이브 방송 제작',
    year: '2023 – 2025',
    client: 'Grip 스튜디오 & 제휴 브랜드사',
    period: '2023.01 – 2025.12',
    roles: ['테크니컬 디렉터(TD)', '방송 시스템 셋업', '실시간 스위처 운용', '오디오 믹싱'],
    episodesCount: '150회 이상 송출',
    viewsCount: '누적 동시접속 4만 명 돌파',
    thumbnail: liveStreamImg,
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=7PIji8OubXU',
    verticalPhotos: DEFAULT_LIVE_COMMERCE_VERTICAL_PHOTOS,
    overview: '대형 패션 브랜드, IT 기기, 뷰티 브랜드와의 협업 라이브 방송에서 3~4대의 시네마 카메라와 전문 방송 스위처를 연동한 하이엔드 실시간 방송 환경을 구축 및 총괄했습니다.',
    purposeAndTarget: '수만 명의 동시 접속자가 시청하는 대형 라이브에서 방송 지연 및 끊김 없는 프리미엄 송출 환경 제공',
    planningIntent: '모바일 세로 화면 규격과 가로 멀티캠 송출을 유연하게 스위칭할 수 있는 모듈형 방송 스테이션 설계.',
    productionProcess: [
      'Blackmagic ATEM Mini Extreme 및 SDI/NDI 무손실 영상 전송망 구축',
      '조명 키트(Aputure 300d/600d)를 활용한 뷰티/상품 특화 3점 조명 세팅',
      '디지털 오디오 믹서(Behringer X32)를 통한 하울링/노이즈 제로 무선 마이크 세팅',
      '긴급 백업 인터넷 라인 및 페일오버(Failover) 시스템 상시 가동'
    ],
    resultsAndImpact: [
      '150회 연속 방송 사고율 0.0% 무결점 운영 기록 달성',
      '특집 라이브 최고 매출 1회당 2.8억 원 기록 방송 테크니컬 지원',
      '내부 프로덕션 팀을 위한 라이브 송출 표준 매뉴얼 제작 및 배포'
    ],
    toolsUsed: ['Blackmagic ATEM', 'OBS Studio', 'Sony FX3/FX6', 'Aputure Lights', 'Behringer Audio Console'],
    isPublished: true,
    isFeatured: true,
    order: 5,
  },
  {
    id: 'project-vet-medical',
    code: '06',
    title: '본동물의료센터 홍보 영상 및 모션그래픽',
    subtitle: '전문 의료 시설의 신뢰도와 생명 존중 철학을 감각적으로 시각화한 브랜드 필름',
    category: 'corporate',
    categoryLabel: '기업, 사내 콘텐츠',
    year: '2021 – 2022',
    client: '본동물의료센터',
    period: '2021.06 – 2022.05',
    roles: ['홍보 콘텐츠 기획', '수술실/정밀진단 촬영', '2D 모션그래픽', '색보정'],
    episodesCount: '5편',
    viewsCount: '온/오프라인 누적 32만 회',
    thumbnail: vetMedicalImg,
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    videos: [
      {
        id: 'slot-vet-1',
        slotNumber: 1,
        title: '본동물의료센터 공식 브랜드 홍보영상 본편',
        subtitle: '전문 의료 시설의 신뢰도와 생명 존중 철학 시각화',
        tag: '본편 EP.01',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
        duration: '04:30',
      },
      {
        id: 'slot-vet-2',
        slotNumber: 2,
        title: '24시 응급외상센터 & 전문 진료 체계 안내',
        subtitle: '골든타임을 지키는 중환자 집중 치료 시스템',
        tag: '전문진료 EP.02',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
        duration: '03:45',
      },
      {
        id: 'slot-vet-3',
        slotNumber: 3,
        title: '첨단 수술실 & 무균 감염관리 시스템 쇼케이스',
        subtitle: '멸균 수술실 첨단 장비 및 마취 모니터링 환경',
        tag: '수술실 EP.03',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=L_LUpnjgPso',
        duration: '05:10',
      },
      {
        id: 'slot-vet-4',
        slotNumber: 4,
        title: '의료진 헌신 인터뷰 & 생명 존중 미니 다큐',
        subtitle: '수의사 및 전문 간호진의 진솔한 생명 수호 인터뷰',
        tag: '인터뷰 EP.04',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=7PIji8OubXU',
        duration: '04:15',
      },
      {
        id: 'slot-vet-5',
        slotNumber: 5,
        title: '보호자 안심 케어 & 정밀 진단 모션그래픽',
        subtitle: 'CT/MRI 영상 진단 이해를 돕는 인포그래픽 영상',
        tag: '모션그래픽 EP.05',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
        duration: '03:20',
      },
    ],
    overview: '국내 최고 수준의 24시 동물 의료 센터의 첨단 수술실과 24시간 응급 진료 체계를 보호자의 시선에서 안심할 수 있도록 정갈하고 신뢰감 있게 표현한 영상입니다.',
    purposeAndTarget: '반려동물 보호자들에게 전문 의료 장비와 따뜻한 의료진의 헌신을 직관적으로 전달',
    planningIntent: '수술 및 진료 과정의 복잡한 의학 정보를 2D 인포그래픽과 모션그래픽으로 알기 쉽게 재구성.',
    productionProcess: [
      '멸균 구역 수술실 내 무음 카메라 운용 및 위생 규정 준수 촬영',
      'CT/MRI 등 정밀 진단 결과를 시각화하는 After Effects 모션그래픽 제작',
      '따뜻하고 차분한 톤의 내레이션 디렉팅 및 배경음악 편곡'
    ],
    resultsAndImpact: [
      '원내 대형 미디어월 상시 상영 및 유튜브 유입 보호자 3배 증가',
      '신규 특수 진료 예약 건수 전분기 대비 38% 상승'
    ],
    toolsUsed: ['Premiere Pro', 'After Effects', 'Sony Cinema Line', 'Illustrator'],
    isPublished: true,
    isFeatured: false,
    order: 6,
  },
];

export const CAREER_HISTORY: CareerItem[] = [
  {
    id: 'career-nh',
    period: '2026.01 – 현재',
    company: '농협은행 (NH Bank)',
    team: '경영지원 부문 / 마케팅솔루션팀',
    role: '비디오 프로듀서 / 영상 PD',
    description: '농협은행 사내 마케팅 영상, 임직원 인터뷰 콘텐츠, 주요 연례 행사 영상의 총괄 기획·촬영·편집 수행',
    highlights: [
      '사내 우수 지점 혁신 인터뷰 시리즈 기획 및 시네마틱 제작',
      '사내 포털 누적 조회수 역대 최고 기록 달성 및 브랜드 가치 제고',
      '사내 공식 행사 미디어 송출 및 하이라이트 필름 제작'
    ]
  },
  {
    id: 'career-grip',
    period: '2022.01 – 2025.12',
    company: '그립컴퍼니 (Grip Company)',
    team: '콘텐츠솔루션팀',
    role: '콘텐츠 PD / 시니어 영상 제작자',
    description: '브랜디드 다큐멘터리 제작, 공식 유튜브 채널 총괄 운영, 대형 라이브커머스 방송 시스템 구축 및 테크니컬 디렉팅',
    highlights: [
      '셀러 인터뷰 브랜디드 콘텐츠 35편 기획·제작 (누적 77만 조회수)',
      '그립 유튜브 채널 구독자 500명에서 10만 명으로 폭발적 성장 견인 (실버버튼 획득)',
      '150회 이상의 대형 라이브커머스 방송 무사고 테크니컬 디렉팅 총괄'
    ]
  },
  {
    id: 'career-bon-vet',
    period: '2021.05 – 2022.05',
    company: '본동물의료센터',
    team: '홍보미디어팀',
    role: '영상 제작 PD',
    description: '의료센터 브랜드 홍보 영상 제작, 수술 및 진료 과정 모션그래픽 시각화, 원내 미디어월 콘텐츠 설계',
    highlights: [
      '전문 수술실 및 정밀 진단 시스템 홍보 영상 8편 제작',
      'After Effects 기반 2D 인포그래픽과 모션그래픽 직접 디자인',
      '환자 및 보호자 신뢰도 향상을 위한 감성 브랜딩 영상 기획'
    ]
  }
];

export const PRODUCTION_SKILLS: SkillItem[] = [
  {
    name: '콘텐츠 기획 & 연출',
    nameEn: 'Content Planning & Directing',
    level: 95,
    description: '타깃 시청자 분석, 킬러 포맷 개발, 스토리보드 작성 및 현장 라포 형성을 통한 자연스러운 인터뷰 디렉팅',
    tools: ['Notion', 'Storyboard Pro', 'Script Writing', 'Audience Analytics']
  },
  {
    name: '시네마 카메라 촬영',
    nameEn: 'Camera Operation & Cinematography',
    level: 92,
    description: 'Sony FX / Alpha 시리즈 및 단렌즈/줌렌즈 운용, 자연광과 3점 조명 설계, 짐벌 및 현장 오디오 완벽 수음',
    tools: ['Sony FX3 / FX6', 'Gimbal (DJI RS3)', 'Aputure Lights', 'Sennheiser Wireless']
  },
  {
    name: '종합 영상 편집',
    nameEn: 'Video Editing & Story Flow',
    level: 98,
    description: 'Premiere Pro 기반의 속도감 있는 컷편집, 완벽한 사운드 트랙 싱크, 리듬감 있는 템포와 롱폼/숏폼 호흡 조율',
    tools: ['Adobe Premiere Pro', 'Final Cut Pro', 'Cut Rhythm Mastery']
  },
  {
    name: '모션 그래픽 & 자막 디자인',
    nameEn: 'Motion Graphics & Typography',
    level: 86,
    description: 'After Effects를 활용한 감각적인 타이틀 모션, 2D 인포그래픽 데이터 시각화, 브랜드 맞춤 인서트 애니메이션',
    tools: ['Adobe After Effects', 'Photoshop', 'Illustrator']
  },
  {
    name: '라이브 방송 & 송출 엔지니어링',
    nameEn: 'Live Streaming & Technical Directing',
    level: 90,
    description: '멀티캠 스위처(ATEM) 운용, OBS/vMix 세팅, NDI/SDI 라우팅, 실시간 오디오 믹싱 및 비상 페일오버 대비',
    tools: ['Blackmagic ATEM Mini/Extreme', 'OBS Studio', 'vMix', 'Behringer X32']
  },
  {
    name: '유튜브 채널 성장 & 알고리즘 운영',
    nameEn: 'YouTube Growth & Channel Operation',
    level: 94,
    description: '유튜브 알고리즘 분석, CTR 극대화 썸네일 설계, 시청 지속시간 최적화, 숏폼-롱폼 연계 유입 퍼널 구축',
    tools: ['YouTube Studio Analytics', 'Thumbnail A/B Testing', 'Audience Retention Optimization']
  }
];

export const PHILOSOPHY_PRINCIPLES = [
  {
    num: '01',
    title: '본질에 집중하는 스토리텔링',
    description: '화려한 트랜지션이나 기교보다 인물의 진심 어린 눈빛과 목소리가 담긴 1초가 시청자의 마음을 움직인다고 믿습니다.'
  },
  {
    num: '02',
    title: '올라운더의 완성도 높은 제작 사이클',
    description: '기획 의도를 아는 제작자가 직접 카메라를 잡고 편집대 앞에 앉을 때 비로소 타협 없는 온전한 완성도가 완성됩니다.'
  },
  {
    num: '03',
    title: '비즈니스 목표와 영상 미학의 균형',
    description: '아름다운 영상미에 머무르지 않고, 브랜드가 전달하고자 하는 핵심 메시지와 실질적인 전환 성과를 수치로 증명합니다.'
  }
];
