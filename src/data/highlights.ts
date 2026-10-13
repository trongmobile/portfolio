import type { Highlight } from '@/types';
import { localize, onLocaleChange, type Translatable } from '@/i18n';

/**
 * Professional highlights. Every figure comes from the CV and carries its scope
 * in `note`. Remove an entry to hide it; the grid adapts automatically.
 */
const content: Translatable<Highlight[]> = [
  {
    id: 'years',
    value: '5+',
    label: { en: 'Years of professional software development', vi: 'Năm kinh nghiệm phát triển phần mềm' },
    note: { en: 'Since 2019 — VNPT, VLab J.S.C and FPT IS', vi: 'Từ 2019 — VNPT, VLab J.S.C và FPT IS' },
  },
  {
    id: 'team',
    value: { en: 'Up to 3', vi: 'Tối đa 3' },
    label: { en: 'Flutter engineers led across multiple products', vi: 'Kỹ sư Flutter được dẫn dắt qua nhiều sản phẩm' },
    note: { en: 'Plus code reviews and technical mentoring', vi: 'Kèm code review và hướng dẫn kỹ thuật' },
  },
  {
    id: 'collaboration',
    value: '15+',
    label: { en: 'Members in cross-functional product teams', vi: 'Thành viên trong các nhóm sản phẩm liên chức năng' },
    note: 'BA, Designer, Backend, QA, PM, PO',
  },
  {
    // Portfolio-wide historical figure from the CV — not a per-app number.
    id: 'downloads',
    value: '1M+',
    label: { en: 'Downloads across delivered products', vi: 'Lượt tải trên các sản phẩm đã triển khai' },
    note: { en: 'Combined, historical figure across projects', vi: 'Tổng cộng qua các dự án' },
  },
];

export let highlights = localize<Highlight[]>(content);
onLocaleChange(() => {
  highlights = localize<Highlight[]>(content);
});

/** Release channels listed in the CV. */
export const releaseChannels = ['Google Play', 'App Store', 'Website', 'Zalo Mini App'];
