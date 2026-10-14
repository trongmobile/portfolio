import type { Dictionary } from "./en";

/** Vietnamese UI copy. Same shape as `en.ts`. */
export const vi: Dictionary = {
  site: {
    title: "Trần Thiện Trong — Flutter Developer",
    description:
      "Portfolio của Trần Thiện Trong, Flutter Developer xây dựng sản phẩm di động cho giao thông công cộng, đô thị thông minh và giáo dục trực tuyến.",
    location: "TP. Hồ Chí Minh, Việt Nam",
  },
  nav: {
    language: "Ngôn ngữ",
    backToTop: "về đầu trang",
    about: "Giới thiệu",
    experience: "Kinh nghiệm",
    projects: "Dự án",
    skills: "Kỹ năng",
    contact: "Liên hệ",
    downloadCv: "Tải CV",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    primary: "Điều hướng chính",
    skipToContent: "Chuyển đến nội dung",
  },
  hero: {
    eyebrow: "Mobile Engineer",
    headlineLead: "Xây dựng sản phẩm di động",
    headlineTail: "giải quyết những bài toán thực tế.",
    expertiseLabel: "Chuyên môn chính",
    scrollHint: "Cuộn",
    scrollHintLabel: "Cuộn xuống phần nổi bật",
    intro:
      "Tôi là Trần Thiện Trong, Flutter Developer tập trung xây dựng các ứng dụng di động ổn định, dễ mở rộng và lấy người dùng làm trung tâm. Từ giao thông công cộng, đô thị thông minh đến giáo dục trực tuyến, tôi biến yêu cầu sản phẩm thành trải nghiệm sẵn sàng vận hành thực tế.",
    primaryCta: "Xem dự án",
    secondaryCta: "Liên hệ",
    expertise: [
      "Flutter",
      "Dart",
      "Kiến trúc ứng dụng di động",
      "REST APIs",
      "Phát triển sản phẩm",
    ],
    visualLabel:
      "Hình minh hoạ trừu tượng một ứng dụng di động kết nối với các dịch vụ",
  },
  highlights: {
    title: "Thành tựu nổi bật",
    releasedOn: "Phát hành trên",
  },
  about: {
    eyebrow: "Giới thiệu",
    title: "Nhà phát triển ứng dụng di động quan tâm đến toàn bộ sản phẩm.",
    paragraphs: [
      "Tôi là Flutter Developer tại FPT IS với hơn năm năm kinh nghiệm, phần lớn thời gian dành cho việc phát triển các ứng dụng di động đa nền tảng mà nhiều người sử dụng hằng ngày — vé metro, thông tin giao thông trực tuyến, thông tin xe buýt, nhân sự và học trực tuyến.",
      "Tôi chú trọng kiến trúc dễ bảo trì: phân tầng rõ ràng với Bloc và Clean Architecture, quản lý trạng thái nhất quán, tích hợp cẩn thận với REST API, WebSocket, Firebase và các dịch vụ thanh toán. Tôi đưa ứng dụng đi từ yêu cầu ban đầu đến khi phát hành trên Google Play và App Store.",
      "Tôi làm việc chặt chẽ với BA, Designer, Backend, QA, PM và PO, dẫn dắt một nhóm Flutter nhỏ, đồng thời dành nhiều thời gian cho code review và hướng dẫn thành viên. Tôi muốn xây dựng phần mềm ổn định, dễ thay đổi và thực sự hữu ích với người dùng.",
    ],
    factsTitle: "Tóm tắt",
    facts: {
      basedIn: "Nơi ở",
      current: "Hiện tại",
      focus: "Chuyên môn",
      education: "Học vấn",
    },
    focusValue: "Flutter · Kiến trúc ứng dụng di động",
  },
  experience: {
    eyebrow: "Kinh nghiệm",
    title: "Những nơi tôi đã làm việc.",
    description:
      "Từ nền tảng web đến dẫn dắt phát triển Flutter cho các sản phẩm dịch vụ công và doanh nghiệp.",
    educationTitle: "Học vấn",
    current: "Hiện tại",
  },
  projects: {
    eyebrow: "Dự án tiêu biểu",
    title: "Sản phẩm đến tay người dùng thật.",
    description:
      "Ứng dụng cho giao thông công cộng, đô thị thông minh, giáo dục và doanh nghiệp — được xây dựng cùng các nhóm sản phẩm tại FPT IS và những nơi tôi từng làm việc.",
    filterLabel: "Lọc dự án theo lĩnh vực",
    viewDetails: "Xem chi tiết",
    moreTitle: "Dự án khác",
    moreDescription:
      "Các ứng dụng khác, phiên bản theo địa phương và Zalo Mini App.",
    empty: "Chưa có dự án nào trong lĩnh vực này.",
    showing: (count: number) => `${count} dự án`,
    dialog: {
      close: "Đóng chi tiết dự án",
      overview: "Tổng quan",
      features: "Tính năng chính",
      featuresToVerify: "Cần xác nhận",
      related: "Dòng sản phẩm",
      role: "Đóng góp của tôi",
      technologies: "Công nghệ",
      platforms: "Nền tảng",
      teamSize: "Quy mô nhóm",
      links: "Liên kết",
      screenshots: "Ảnh chụp màn hình",
    },
    platformsUnknown: "Nền tảng chưa xác nhận",
  },
  skills: {
    eyebrow: "Kỹ năng",
    title: "Công cụ tôi dùng để phát triển sản phẩm.",
    description:
      "Nhóm theo cách tôi sử dụng hằng ngày — trọng tâm là Flutter và kiến trúc ứng dụng di động.",
  },
  approach: {
    eyebrow: "Cách làm việc",
    title: "Cách tôi xây dựng một sản phẩm.",
    description:
      "Một khuôn mẫu chung chứ không phải công thức cố định — mỗi nhóm và dự án sẽ định hình chi tiết riêng.",
  },
  contact: {
    eyebrow: "Liên hệ",
    title: "Cùng xây dựng điều gì đó ý nghĩa.",
    text: "Tôi quan tâm đến các cơ hội xây dựng sản phẩm số có tác động thực tế, làm việc cùng những đội ngũ kỹ thuật giỏi và giải quyết các bài toán phát triển di động đầy thử thách.",
    email: "Email",
    copyEmail: "Sao chép địa chỉ email",
    copied: "Đã sao chép",
    linkedin: "LinkedIn",
    github: "GitHub",
    phone: "Điện thoại",
    cv: "Tải CV",
    cvMeta: "PDF",
    location: "Địa điểm",
  },
  footer: {
    navLabel: "Chân trang",
    backToTop: "Về đầu trang",
  },
  command: {
    open: "Mở bảng lệnh",
    title: "Bảng lệnh",
    placeholder: "Nhập lệnh hoặc tìm kiếm…",
    empty: "Không có lệnh phù hợp.",
    groups: {
      navigate: "Điều hướng",
      actions: "Thao tác",
      secret: "Đã mở khoá",
    },
    goTo: (section: string) => `Đến mục ${section}`,
    downloadCv: "Tải CV",
    copyEmail: "Sao chép địa chỉ email",
    switchLanguage: "Switch to English",
    devModeOn: "Bật dev mode",
    devModeOff: "Tắt dev mode",
    sudoHire: "sudo hire",
    footer: "↑↓ để di chuyển · Enter để chọn · Esc để đóng",
  },
  toast: {
    emailCopied: "Đã sao chép địa chỉ email",
    devModeOn: "Đã mở khoá cheat — dev mode bật",
    devModeOff: "Đã tắt dev mode",
    hired: "Đã cấp quyền. Cùng trò chuyện nhé!",
  },
  platforms: {
    android: "Android",
    ios: "iOS",
    web: "Website",
    zalo: "Zalo Mini App",
  },
  links: {
    "google-play": "Google Play",
    "app-store": "App Store",
    website: "Website",
    zalo: "Zalo Mini App",
  },
};
