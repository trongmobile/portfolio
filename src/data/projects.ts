import type { Project, ProjectCategory } from '@/types';
import { localize, onLocaleChange, type Translatable } from '@/i18n';

/**
 * Portfolio projects. Source: the PROJECTS table in the CV.
 *
 * Editing guide
 * - Text fields take either one string (shared) or `{ en, vi }`.
 * - `featured: true`  → large card in the gallery + detail dialog.
 * - `featured: false` → compact entry under "More projects".
 * - `links`           → only add verified store / website URLs. Buttons are
 *                       hidden automatically when a project has no links.
 * - `screenshots`     → put files in `public/images/projects/<id>/` and list them
 *                       here. Without screenshots an abstract illustration is shown.
 * - `teamSize`        → as listed in the CV.
 */

type CategoryOption = { id: ProjectCategory | 'all'; label: string };

const categoryContent: Translatable<CategoryOption[]> = [
  { id: 'all', label: { en: 'All', vi: 'Tất cả' } },
  { id: 'transportation', label: { en: 'Transportation', vi: 'Giao thông' } },
  { id: 'smart-city', label: { en: 'Smart City', vi: 'Đô thị thông minh' } },
  { id: 'learning', label: { en: 'Digital Learning', vi: 'Giáo dục số' } },
  { id: 'enterprise', label: { en: 'Enterprise & HR', vi: 'Doanh nghiệp & Nhân sự' } },
];

const domains = {
  publicTransport: { en: 'Public Transportation', vi: 'Giao thông công cộng' },
  traffic: { en: 'Traffic & Smart Mobility', vi: 'Giao thông & Di chuyển thông minh' },
};

const projectContent: Translatable<Project[]> = [
  // ─── Featured ──────────────────────────────────────────────────────────
  {
    id: 'hcmc-metro',
    name: 'HCMC Metro',
    domain: { en: 'Ticketing & Public Transportation', vi: 'Bán vé & Giao thông công cộng' },
    category: 'transportation',
    featured: true,
    summary: {
      en: 'A mobile ticketing and passenger information application for the Ho Chi Minh City Metro system, delivered alongside a family of eTicket products.',
      vi: 'Ứng dụng bán vé và thông tin hành khách cho hệ thống Metro TP.HCM, triển khai cùng dòng sản phẩm eTicket.',
    },
    relatedProducts: ['eTicket Kiosk', 'eTicket POS', 'eTicket MiniPOS'],
    features: {
      en: [
        'Digital and paper ticket purchasing',
        'Route and station information',
        'Train arrival time prediction',
        'Passenger feedback',
      ],
      vi: ['Mua vé điện tử và vé giấy', 'Thông tin tuyến và nhà ga', 'Dự đoán thời gian tàu đến', 'Góp ý của hành khách'],
    },
    technologies: ['Flutter', 'Dart', 'REST APIs'],
    platforms: ['android', 'ios'],
    teamSize: 5,
    contribution: {
      en: ['Flutter development within a five-person team across the metro product family.'],
      vi: ['Phát triển Flutter trong nhóm năm người cho toàn bộ dòng sản phẩm metro.'],
    },
    artwork: 'metro',
    links: [
      { kind: 'google-play', href: 'https://play.google.com/store/apps/details?id=com.fts.metro' },
      { kind: 'app-store', href: 'https://apps.apple.com/vn/app/hcmc-metro-hurc/id6449395180' },
    ],
  },
  {
    id: 'ttgt-hcm',
    name: 'TTGT TP.HCM',
    domain: domains.traffic,
    category: 'smart-city',
    featured: true,
    summary: {
      en: 'A traffic information application that helps people check road conditions and transportation information, with sibling products for other provinces.',
      vi: 'Ứng dụng thông tin giao thông giúp người dân theo dõi tình trạng đường sá và thông tin giao thông, cùng các phiên bản cho những tỉnh thành khác.',
    },
    relatedProducts: ['TTGT Gia Lai', 'TTGT Đồng Nai', 'Townloop'],
    features: {
      en: [
        'Live traffic camera viewing',
        'Traffic alerts and warnings',
        'Traffic news',
        'Traffic information lookup',
        'Push notifications',
      ],
      vi: [
        'Xem camera giao thông trực tiếp',
        'Cảnh báo giao thông',
        'Tin tức giao thông',
        'Tra cứu thông tin giao thông',
        'Thông báo đẩy',
      ],
    },
    technologies: ['Flutter', 'Dart', 'ReactJS', 'REST APIs'],
    platforms: ['android', 'ios', 'web', 'zalo'],
    teamSize: 1,
    contribution: {
      en: ['Flutter and ReactJS development across mobile, web and Zalo Mini App channels.'],
      vi: ['Phát triển Flutter và ReactJS trên các kênh di động, web và Zalo Mini App.'],
    },
    artwork: 'traffic',
    links: [
      { kind: 'google-play', href: 'https://play.google.com/store/apps/details?id=com.fts.notis' },
      { kind: 'app-store', href: 'https://apps.apple.com/vn/app/ttgt-tp-h%E1%BB%93-ch%C3%AD-minh/id1193052114' },
      { kind: 'zalo', href: 'https://zalo.me/s/2435661795902144942/' },
    ],
  },
  {
    id: 'go-bus',
    name: 'Go!Bus HCMC',
    domain: domains.publicTransport,
    category: 'transportation',
    featured: true,
    summary: {
      en: 'A public bus application that helps passengers explore routes, plan journeys and follow buses in real time.',
      vi: 'Ứng dụng xe buýt giúp hành khách tra cứu tuyến, lên kế hoạch hành trình và theo dõi xe buýt theo thời gian thực.',
    },
    features: {
      en: [
        'Real-time arrival estimates (ETA)',
        'Route planning',
        'Nearby stops',
        'Bus tracking',
        'Multimodal navigation',
        'Passenger feedback',
      ],
      vi: [
        'Dự kiến thời gian xe đến (ETA) theo thời gian thực',
        'Tìm đường',
        'Trạm dừng gần đây',
        'Theo dõi xe buýt',
        'Dẫn đường đa phương thức',
        'Góp ý của hành khách',
      ],
    },
    technologies: ['Flutter', 'Dart', 'ReactJS', 'REST APIs'],
    platforms: ['android', 'ios', 'zalo'],
    teamSize: 2,
    contribution: {
      en: ['Flutter and ReactJS development within a two-person team.'],
      vi: ['Phát triển Flutter và ReactJS trong nhóm hai người.'],
    },
    artwork: 'bus',
    links: [
      { kind: 'google-play', href: 'https://play.google.com/store/apps/details?id=com.fts.mybus' },
      { kind: 'app-store', href: 'https://apps.apple.com/vn/app/go-bus-tphcm/id1465448216' },
      { kind: 'zalo', href: 'https://zalo.me/s/3114584193944844371/' },
    ],
  },
  {
    id: 'otkpama',
    name: 'OTKPAMA',
    domain: { en: 'Digital Learning', vi: 'Giáo dục số' },
    category: 'learning',
    featured: true,
    summary: {
      en: 'An online learning application supporting course-based digital education on mobile.',
      vi: 'Ứng dụng học trực tuyến hỗ trợ đào tạo theo khoá học trên thiết bị di động.',
    },
    features: {
      en: ['Online courses with video streaming', 'Learning progress tracking', 'Quizzes and assessments'],
      vi: ['Khoá học trực tuyến với video streaming', 'Theo dõi tiến độ học tập', 'Câu hỏi và bài kiểm tra'],
    },
    technologies: ['Flutter', 'Dart', 'REST APIs'],
    platforms: ['android', 'ios'],
    teamSize: 2,
    contribution: {
      en: ['Flutter development within a two-person team.'],
      vi: ['Phát triển Flutter trong nhóm hai người.'],
    },
    artwork: 'learning',
    links: [
      { kind: 'google-play', href: 'https://play.google.com/store/apps/details?id=com.learningx.otkpama' },
      { kind: 'app-store', href: 'https://apps.apple.com/vn/app/otkpama/id6749109629' },
    ],
  },
  {
    id: 'ess',
    name: 'ESS',
    domain: { en: 'Human Resources', vi: 'Nhân sự' },
    category: 'enterprise',
    featured: true,
    summary: {
      en: 'An employee self-service application that gives staff mobile access to HR information and workflows.',
      vi: 'Ứng dụng tự phục vụ cho nhân viên, giúp truy cập thông tin và quy trình nhân sự trên di động.',
    },
    features: {
      en: [
        'Attendance and leave management',
        'Payroll and benefits information',
        'Approval workflows',
        'Push notifications',
      ],
      vi: ['Quản lý chấm công và nghỉ phép', 'Thông tin lương và phúc lợi', 'Quy trình phê duyệt', 'Thông báo đẩy'],
    },
    technologies: ['Flutter', 'Dart', 'REST APIs'],
    platforms: ['android', 'ios'],
    teamSize: 2,
    contribution: {
      en: ['Flutter development within a two-person team.'],
      vi: ['Phát triển Flutter trong nhóm hai người.'],
    },
    artwork: 'hr',
  },
  {
    id: 'smart-city-gis',
    name: { en: 'Smart City & Urban Planning', vi: 'Đô thị thông minh & Quy hoạch' },
    domain: { en: 'GIS / Smart City', vi: 'GIS / Đô thị thông minh' },
    category: 'smart-city',
    featured: true,
    summary: {
      en: 'A group of applications that publish urban planning information and smart city services on interactive maps.',
      vi: 'Nhóm ứng dụng cung cấp thông tin quy hoạch đô thị và dịch vụ đô thị thông minh trên bản đồ tương tác.',
    },
    relatedProducts: [
      'Thông tin quy hoạch TP.HCM (TTQH HCM)',
      'TTQHĐT Bến Tre',
      'ITPC',
      'Đô thị thông minh Hải Châu',
      'Quản lý đô thị thông minh Hải Châu',
    ],
    features: {
      en: ['Urban planning information and map visualization', 'Interactive GIS maps'],
      vi: ['Thông tin quy hoạch đô thị và hiển thị trên bản đồ', 'Bản đồ GIS tương tác'],
    },
    technologies: ['Flutter', 'Java', 'REST APIs'],
    platforms: ['android', 'ios'],
    teamSize: 1,
    contribution: {
      en: ['Flutter and Java development for the mobile applications in this group.'],
      vi: ['Phát triển Flutter và Java cho các ứng dụng di động trong nhóm này.'],
    },
    artwork: 'gis',
    links: [
      { kind: 'google-play', href: 'https://play.google.com/store/apps/details?id=tech.vlab.ttqhhcm', label: 'TTQH TP.HCM · Google Play' },
      { kind: 'google-play', href: 'https://play.google.com/store/apps/details?id=vlab.tech.ttqhbentre', label: 'TTQHĐT Bến Tre · Google Play' },
      { kind: 'google-play', href: 'https://play.google.com/store/apps/details?id=tech.vlab.ITPC', label: 'ITPC · Google Play' },
      { kind: 'google-play', href: 'https://play.google.com/store/apps/details?id=tech.vlab.thongtinhaichau', label: 'ĐTTM Hải Châu · Google Play' },
      { kind: 'google-play', href: 'https://play.google.com/store/apps/details?id=tech.vlab.qldttmhaichau', label: 'QL ĐTTM Hải Châu · Google Play' },
    ],
  },

  // ─── More projects ─────────────────────────────────────────────────────
  {
    id: 'ttgt-gia-lai',
    name: 'TTGT Gia Lai',
    domain: domains.traffic,
    category: 'smart-city',
    featured: false,
    summary: {
      en: 'Traffic information app for Gia Lai province, part of the TTGT product family.',
      vi: 'Ứng dụng thông tin giao thông cho tỉnh Gia Lai, thuộc dòng sản phẩm TTGT.',
    },
    features: [],
    technologies: ['Flutter', 'ReactJS'],
    platforms: ['android', 'ios', 'zalo'],
    artwork: 'traffic',
    links: [
      { kind: 'google-play', href: 'https://play.google.com/store/apps/details?id=com.fts.notis.info' },
      { kind: 'app-store', href: 'https://apps.apple.com/vn/app/ttgt-gia-lai/id1564718406' },
      { kind: 'zalo', href: 'https://zalo.me/s/1316936157193244875/' },
    ],
  },
  {
    id: 'ttgt-dong-nai',
    name: 'TTGT Đồng Nai',
    domain: domains.traffic,
    category: 'smart-city',
    featured: false,
    summary: {
      en: 'Traffic information web app and Zalo Mini App for Đồng Nai province, part of the TTGT product family.',
      vi: 'Web app và Zalo Mini App thông tin giao thông cho tỉnh Đồng Nai, thuộc dòng sản phẩm TTGT.',
    },
    features: [],
    technologies: ['ReactJS'],
    platforms: ['web', 'zalo'],
    artwork: 'traffic',
  },
  {
    id: 'bus-hp',
    name: 'Bus HP',
    domain: domains.publicTransport,
    category: 'transportation',
    featured: false,
    summary: {
      en: 'Public bus information app built on the same product foundation as Go!Bus.',
      vi: 'Ứng dụng thông tin xe buýt xây dựng trên cùng nền tảng sản phẩm với Go!Bus.',
    },
    features: [],
    technologies: ['Flutter'],
    platforms: ['android', 'ios'],
    artwork: 'bus',
    links: [
      { kind: 'google-play', href: 'https://play.google.com/store/apps/details?id=com.fts.notis.haiphong' },
      { kind: 'app-store', href: 'https://apps.apple.com/vn/app/bus-hp/id6621237718' },
    ],
  },
  {
    id: 'buyt-dong-nai',
    name: 'Buýt Đồng Nai',
    domain: domains.publicTransport,
    category: 'transportation',
    featured: false,
    summary: {
      en: 'Public bus information app for Đồng Nai province, part of the Go!Bus product family.',
      vi: 'Ứng dụng thông tin xe buýt cho tỉnh Đồng Nai, thuộc dòng sản phẩm Go!Bus.',
    },
    features: [],
    technologies: ['Flutter'],
    platforms: ['android', 'ios'],
    artwork: 'bus',
    links: [
      { kind: 'google-play', href: 'https://play.google.com/store/apps/details?id=com.fts.notis.dongnai' },
      { kind: 'app-store', href: 'https://apps.apple.com/vn/app/bu%C3%BDt-%C4%91%E1%BB%93ng-nai/id1538408155' },
    ],
  },
  {
    id: 'khao-sat-ajinomoto',
    name: 'Khảo sát Ajinomoto',
    domain: { en: 'Enterprise Survey', vi: 'Khảo sát doanh nghiệp' },
    category: 'enterprise',
    featured: false,
    summary: {
      en: 'Survey Mini App with dynamic forms and a questionnaire builder.',
      vi: 'Mini App khảo sát với biểu mẫu động và công cụ tạo bảng câu hỏi.',
    },
    features: {
      en: ['Dynamic survey forms', 'Questionnaire builder'],
      vi: ['Biểu mẫu khảo sát động', 'Công cụ tạo bảng câu hỏi'],
    },
    technologies: ['ReactJS', 'ZMP'],
    platforms: ['zalo'],
    teamSize: 1,
    artwork: 'survey',
    links: [{ kind: 'zalo', href: 'https://zalo.me/s/2006823593736087670/' }],
  },
];

export let projectCategories = localize<CategoryOption[]>(categoryContent);
export let projects = localize<Project[]>(projectContent);
export let featuredProjects = projects.filter((p) => p.featured);
export let moreProjects = projects.filter((p) => !p.featured);

onLocaleChange(() => {
  projectCategories = localize<CategoryOption[]>(categoryContent);
  projects = localize<Project[]>(projectContent);
  featuredProjects = projects.filter((p) => p.featured);
  moreProjects = projects.filter((p) => !p.featured);
});
