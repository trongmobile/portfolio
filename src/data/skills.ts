import type { SkillGroup } from '@/types';
import { localize, onLocaleChange, type Translatable } from '@/i18n';

/**
 * Skills grouped by context instead of percentage scores.
 * Source: SKILLS and EXPERIENCE sections of the CV.
 */
const content: Translatable<SkillGroup[]> = [
  {
    id: 'mobile',
    title: { en: 'Mobile Development', vi: 'Phát triển di động' },
    description: {
      en: 'Primary focus — cross-platform apps shipped to Android and iOS.',
      vi: 'Trọng tâm chính — ứng dụng đa nền tảng phát hành trên Android và iOS.',
    },
    skills: {
      en: ['Flutter', 'Dart', 'Java', 'Android & iOS development', 'Android Studio', 'Xcode'],
      vi: ['Flutter', 'Dart', 'Java', 'Phát triển Android & iOS', 'Android Studio', 'Xcode'],
    },
  },
  {
    id: 'architecture',
    title: { en: 'Architecture & State', vi: 'Kiến trúc & quản lý trạng thái' },
    description: {
      en: 'Structuring apps so teams can keep extending them.',
      vi: 'Tổ chức ứng dụng để đội ngũ có thể tiếp tục mở rộng.',
    },
    skills: {
      en: ['Bloc / Cubit', 'Clean Architecture', 'MVVM', 'MVC', 'State management'],
      vi: ['Bloc / Cubit', 'Clean Architecture', 'MVVM', 'MVC', 'Quản lý trạng thái'],
    },
  },
  {
    id: 'integration',
    title: { en: 'Integrations & Services', vi: 'Tích hợp & dịch vụ' },
    description: {
      en: 'Connecting apps to backends, devices and platform services.',
      vi: 'Kết nối ứng dụng với backend, thiết bị và các dịch vụ nền tảng.',
    },
    skills: {
      en: [
        'RESTful APIs',
        'WebSocket',
        'Firebase — FCM, Auth, Analytics, Crashlytics',
        'QR / POS payment integration',
        'Third-party services',
      ],
      vi: [
        'RESTful APIs',
        'WebSocket',
        'Firebase — FCM, Auth, Analytics, Crashlytics',
        'Tích hợp thanh toán QR / POS',
        'Dịch vụ bên thứ ba',
      ],
    },
  },
  {
    id: 'delivery',
    title: { en: 'Tools & Release', vi: 'Công cụ & phát hành' },
    description: {
      en: 'Day-to-day tooling and getting builds into users’ hands.',
      vi: 'Công cụ hằng ngày và đưa bản build đến tay người dùng.',
    },
    skills: {
      en: ['Git', 'GitLab', 'Jira', 'Google Play Console', 'App Store release workflow'],
      vi: ['Git', 'GitLab', 'Jira', 'Google Play Console', 'Quy trình phát hành App Store'],
    },
  },
  {
    id: 'web',
    title: { en: 'Web Fundamentals', vi: 'Nền tảng web' },
    description: {
      en: 'Supporting skills used for web interfaces and Zalo Mini Apps.',
      vi: 'Kỹ năng bổ trợ cho giao diện web và Zalo Mini App.',
    },
    skills: {
      en: ['ReactJS fundamentals', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Zalo Mini App'],
      vi: ['ReactJS cơ bản', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Zalo Mini App'],
    },
  },
  {
    id: 'practices',
    title: { en: 'Engineering Practices', vi: 'Quy trình kỹ thuật' },
    description: {
      en: 'How the work gets planned, reviewed and shipped.',
      vi: 'Cách công việc được lên kế hoạch, review và phát hành.',
    },
    skills: {
      en: [
        'Code review',
        'Debugging & performance optimization',
        'Sprint planning',
        'Agile & Waterfall',
        'Technical mentoring',
        'Cross-functional collaboration',
      ],
      vi: [
        'Code review',
        'Gỡ lỗi & tối ưu hiệu năng',
        'Lập kế hoạch sprint',
        'Agile & Waterfall',
        'Hướng dẫn kỹ thuật',
        'Phối hợp liên chức năng',
      ],
    },
  },
];

export let skillGroups = localize<SkillGroup[]>(content);
onLocaleChange(() => {
  skillGroups = localize<SkillGroup[]>(content);
});
