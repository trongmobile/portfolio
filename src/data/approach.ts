import type { ApproachStep } from '@/types';
import { localize, onLocaleChange, type Translatable } from '@/i18n';

const content: Translatable<ApproachStep[]> = [
  {
    title: { en: 'Understand the product', vi: 'Hiểu sản phẩm' },
    description: {
      en: 'Clarify user needs, requirements and constraints with product, design and backend before writing code.',
      vi: 'Làm rõ nhu cầu người dùng, yêu cầu và ràng buộc cùng các nhóm sản phẩm, thiết kế và backend trước khi viết code.',
    },
    icon: 'search',
  },
  {
    title: { en: 'Design the architecture', vi: 'Thiết kế kiến trúc' },
    description: {
      en: 'Shape a maintainable structure — clear layers, predictable state and room to grow.',
      vi: 'Xây dựng cấu trúc dễ bảo trì — phân tầng rõ ràng, trạng thái nhất quán và dễ mở rộng.',
    },
    icon: 'layers',
  },
  {
    title: { en: 'Build & integrate', vi: 'Phát triển & tích hợp' },
    description: {
      en: 'Implement features carefully and connect them to APIs, real-time data and platform services.',
      vi: 'Triển khai tính năng cẩn thận và kết nối với API, dữ liệu thời gian thực và các dịch vụ nền tảng.',
    },
    icon: 'plug',
  },
  {
    title: { en: 'Test, debug & review', vi: 'Kiểm thử, gỡ lỗi & review' },
    description: {
      en: 'Verify behaviour on real devices, track down issues and keep quality high through code review.',
      vi: 'Kiểm tra trên thiết bị thật, truy vết lỗi và giữ chất lượng cao thông qua code review.',
    },
    icon: 'shield',
  },
  {
    title: { en: 'Release & improve', vi: 'Phát hành & cải tiến' },
    description: {
      en: 'Coordinate store releases, listen to feedback and keep iterating on the product.',
      vi: 'Điều phối phát hành lên store, lắng nghe phản hồi và liên tục cải tiến sản phẩm.',
    },
    icon: 'rocket',
  },
];

export let approachSteps = localize<ApproachStep[]>(content);
onLocaleChange(() => {
  approachSteps = localize<ApproachStep[]>(content);
});
