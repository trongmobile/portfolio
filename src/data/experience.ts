import type { EducationItem, ExperienceItem } from '@/types';
import { localize, onLocaleChange, type Translatable } from '@/i18n';

/** Source: EXPERIENCE and EDUCATION sections of the CV. Newest first. */
const experienceContent: Translatable<ExperienceItem[]> = [
  {
    company: 'FPT IS',
    role: 'Flutter Developer',
    period: { en: 'May 2021 – Present', vi: 'Tháng 5/2021 – Nay' },
    start: '2021-05',
    summary: {
      en: 'Building and leading Flutter development for transportation, smart city, ticketing and enterprise products.',
      vi: 'Phát triển và dẫn dắt mảng Flutter cho các sản phẩm giao thông, đô thị thông minh, bán vé và doanh nghiệp.',
    },
    responsibilities: {
      en: [
        'Lead a Flutter team of up to three engineers across multiple products.',
        'Designed a scalable Flutter architecture using Bloc and Clean Architecture.',
        'Develop Android and iOS applications for transportation, smart city, ticketing and enterprise domains.',
        'Integrated Firebase, REST APIs, WebSocket and QR / POS payment solutions.',
        'Perform code reviews, sprint planning and technical mentoring, including supporting an intern.',
        'Publish applications to Google Play and the App Store.',
        'Delivered products that together exceed 1,000,000 downloads.',
        'Collaborate with cross-functional teams of 15+ members.',
      ],
      vi: [
        'Dẫn dắt nhóm Flutter tối đa ba kỹ sư trên nhiều sản phẩm.',
        'Thiết kế kiến trúc Flutter dễ mở rộng với Bloc và Clean Architecture.',
        'Phát triển ứng dụng Android và iOS cho các lĩnh vực giao thông, đô thị thông minh, bán vé và doanh nghiệp.',
        'Tích hợp Firebase, REST API, WebSocket và các giải pháp thanh toán QR / POS.',
        'Thực hiện code review, lập kế hoạch sprint và hướng dẫn kỹ thuật, bao gồm hỗ trợ thực tập sinh.',
        'Phát hành ứng dụng lên Google Play và App Store.',
        'Triển khai các sản phẩm với tổng cộng hơn 1.000.000 lượt tải.',
        'Phối hợp với các nhóm liên chức năng hơn 15 thành viên.',
      ],
    },
    technologies: ['Flutter', 'Dart', 'Bloc / Cubit', 'Clean Architecture', 'Firebase', 'WebSocket'],
  },
  {
    company: 'VLab J.S.C',
    role: 'Mobile Developer',
    period: { en: 'Aug 2019 – Apr 2021', vi: 'Tháng 8/2019 – Tháng 4/2021' },
    start: '2019-08',
    end: '2021-04',
    responsibilities: {
      en: [
        'Developed Flutter and Java applications.',
        'Integrated REST APIs and Firebase.',
        'Released Android applications to Google Play.',
        'Applied MVC and MVVM architecture.',
      ],
      vi: [
        'Phát triển ứng dụng Flutter và Java.',
        'Tích hợp REST API và Firebase.',
        'Phát hành ứng dụng Android lên Google Play.',
        'Áp dụng kiến trúc MVC và MVVM.',
      ],
    },
    technologies: ['Flutter', 'Java', 'Firebase', 'MVC', 'MVVM'],
  },
  {
    company: 'VNPT',
    role: 'Fresher',
    period: { en: 'Apr 2019 – Jul 2019', vi: 'Tháng 4/2019 – Tháng 7/2019' },
    start: '2019-04',
    end: '2019-07',
    responsibilities: {
      en: [
        'Built basic mobile applications and web interfaces.',
        'Worked with JavaScript, HTML, CSS and Bootstrap.',
      ],
      vi: [
        'Xây dựng ứng dụng di động cơ bản và giao diện web.',
        'Làm việc với JavaScript, HTML, CSS và Bootstrap.',
      ],
    },
    technologies: ['JavaScript', 'HTML', 'CSS', 'Bootstrap'],
  },
];

const educationContent: Translatable<EducationItem[]> = [
  {
    institution: {
      en: 'University of Information Technology (UIT)',
      vi: 'Trường Đại học Công nghệ Thông tin (UIT)',
    },
    degree: { en: 'Bachelor of Computer Science', vi: 'Cử nhân Khoa học Máy tính' },
    period: '2016 – 2020',
    detail: 'GPA 8.1 / 10',
  },
];

export let experience = localize<ExperienceItem[]>(experienceContent);
export let education = localize<EducationItem[]>(educationContent);
onLocaleChange(() => {
  experience = localize<ExperienceItem[]>(experienceContent);
  education = localize<EducationItem[]>(educationContent);
});
