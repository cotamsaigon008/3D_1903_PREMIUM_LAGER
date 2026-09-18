export type Lang = 'en' | 'vi';

export const translations = {
  nav: {
    brand: 'MARTIN UY // LIFE OS',
    links: {
      en: ['Journey', 'Dashboard', 'Life OS', 'Tools', 'Race Log', 'Challenges', 'Gear'],
      vi: ['Hành trình', 'Dữ liệu', 'Cẩm nang', 'Công cụ', 'Nhật ký Giải', 'Thử thách', 'Trang bị'],
    },
    cta: {
      en: 'Join My Next Run',
      vi: 'Chạy Cùng Tôi',
    },
  },

  hero: {
    badge: {
      en: 'PERSONAL SPORTS & LIFE PLATFORM // RUN • TRAIL • HEALTH • MOTIVATION',
      vi: 'NỀN TẢNG THƯƠNG HIỆU CÁ NHÂN // CHẠY BỘ • TRAIL • SỐNG KHỎE • TƯ DUY',
    },
    tagline: {
      en: 'Become stronger, one step at a time.',
      vi: 'Trở thành phiên bản tốt hơn qua mỗi bước chạy.',
    },
    subtitle: {
      en: 'A personal journey of transformation through running, ultra trails, active health, nature exploration, and mindset discipline.',
      vi: 'Hành trình phát triển bản thân, chinh phục thử thách qua chạy bộ, trail địa hình, lối sống lành mạnh và kỷ luật tinh thần.',
    },
    typewriter: {
      en: 'Transforming fitness data into life lessons. Track my training, race reports, nutrition science, and community challenges.',
      vi: 'Biến dữ liệu vận động thành câu chuyện truyền cảm hứng. Theo dõi giáo trình tập, nhật ký giải chạy, dinh dưỡng và các thử thách cộng đồng.',
    },
    pills: {
      en: ['My Running Story', '2026 Stats Dashboard', 'Race Log & PBs', 'Life OS Handbook', 'Pace & Fuel Tools'],
      vi: ['Hành trình Cá nhân', 'Bảng Dữ liệu 2026', 'Nhật ký Giải & PR', 'Cẩm nang Sống khỏe', 'Công cụ Pace & Nước'],
    },
    metrics: [
      { label: { en: 'Total Running Mileage', vi: 'Tổng cự ly chạy bộ' }, value: '1,247 km' },
      { label: { en: 'Races Completed', vi: 'Giải đấu hoàn thành' }, value: '18 Races' },
      { label: { en: 'Personal Records (PB)', vi: 'Kỷ lục cá nhân (PB)' }, value: '4 PBs' },
      { label: { en: 'Total Elevation Gain', vi: 'Tổng độ cao leo (Gain)' }, value: '18,420 m' },
    ],
    emailLabel: {
      en: 'Subscribe to Weekly Dispatch:',
      vi: 'Nhận bản tin tuần:',
    },
  },

  dashboard: {
    tag: {
      en: '// 01 RUNNING DATA & LIFE DASHBOARD',
      vi: '// 01 BẢNG DỮ LIỆU VẬN ĐỘNG & THÀNH TÍCH',
    },
    title: {
      en: 'My Running Year 2026',
      vi: 'Dữ Liệu Vận Động Năm 2026',
    },
    desc: {
      en: 'Live telemetry synced with Garmin & Strava. Turning distance metrics into personal discipline.',
      vi: 'Dữ liệu trực tiếp đồng bộ từ Garmin & Strava. Chuyển hóa con số cự ly thành câu chuyện kỷ luật.',
    },
    stats: {
      distance: { label: { en: 'Total Distance', vi: 'Tổng Cự Ly' }, value: '1,247 km' },
      time: { label: { en: 'Active Running Time', vi: 'Thời Gian Vận Động' }, value: '118 Hours' },
      elevation: { label: { en: 'Elevation Gain', vi: 'Tổng Độ Cao Leo' }, value: '18,420 m' },
      longest: { label: { en: 'Longest Ultra Run', vi: 'Cự Ly Dài Nhất' }, value: '50.2 km' },
    },
    pbs: {
      title: { en: 'Personal Best Benchmarks (PB / PR)', vi: 'Các Kỷ Lục Cá Nhân Best Records' },
      list: [
        { event: 'Fastest 5K', time: '22:14', pace: '4\'26"/km', date: 'MAY 2025' },
        { event: 'Fastest 10K', time: '46:51', pace: '4\'41"/km', date: 'JUN 2025' },
        { event: 'Half Marathon (21.1K)', time: '1:42:18', pace: '4\'50"/km', date: 'AUG 2025' },
        { event: 'Full Marathon (42.2K)', time: '3:48:05', pace: '5\'24"/km', date: 'DEC 2025' },
      ],
    },
    breakdown: {
      title: { en: 'Race Profile Distribution', vi: 'Tỷ Lệ Phân Bổ Cung Đường' },
      roadPct: '65% Road Running (11 Races)',
      trailPct: '35% Trail & Ultra (7 Races)',
    },
    quote: {
      en: '"Data is just the mirror. The real transformation happens in the 5 AM cold morning long runs when nobody is watching."',
      vi: '"Dữ liệu chỉ là tấm gương phản chiếu. Sự chuyển hóa thực sự nằm ở những buổi chạy sáng sớm 5h lạnh giá khi không ai nhìn thấy."',
      author: 'Martin Uy // Running Journal',
    },
  },

  raceLog: {
    tag: {
      en: '// 02 RACE LOG & RECOMMENDATIONS',
      vi: '// 02 NHẬT KÝ GIẢI CHẠY & KHUYÊN DÙNG',
    },
    title: {
      en: 'Race Log & Recommended Events',
      vi: 'Nhật Ký Giải Đấu & Cung Đường Nổi Bật',
    },
    desc: {
      en: 'My past race performances and curated upcoming races worth experiencing.',
      vi: 'Lịch sử tham gia các giải đấu và danh sách những giải chạy, trail đáng trải nghiệm nhất.',
    },
    filters: {
      en: ['All Events', 'Completed', 'Upcoming', 'Road', 'Trail'],
      vi: ['Tất cả', 'Đã hoàn thành', 'Sắp tới', 'Road', 'Trail'],
    },
    events: [
      {
        id: 'RACE-001',
        title: 'VnExpress Marathon Vũng Tàu 2026 (Herbalife Cup)',
        category: 'Road',
        status: 'Completed',
        distance: '5 / 10 / 21 km',
        location: 'Vũng Tàu',
        date: '30/08/2026',
        expoInfo: {
          vi: 'Racekit/Expo: 28-29/08/2026 — Tháp Tam Thắng, Vũng Tàu',
          en: 'Racekit/Expo: Aug 28-29, 2026 — Tam Thang Tower, Vung Tau',
        },
        targetTime: '21km Coastal Run',
        actualTime: 'Hoàn thành / Completed',
        notes: {
          vi: 'Racekit/Expo: 28-29/08/2026 tại Tháp Tam Thắng, Vũng Tàu. Ngày thi đấu chính: 30/08/2026 với các cự ly 5/10/21km (Herbalife Cup). Cung đường bờ biển rực rỡ nắng gió và tinh thần thể thao bùng nổ.',
          en: 'Racekit/Expo: Aug 28-29, 2026 at Tam Thang Tower, Vung Tau. Main race day: Aug 30, 2026 with 5/10/21km distances (Herbalife Cup). Beautiful coastal route with sea breeze and high energy.',
        },
      },
      {
        id: 'RACE-002',
        title: 'Trail Dinh Harvest Flowers 2026',
        category: 'Trail',
        status: 'Upcoming',
        distance: 'Trail',
        location: 'Hồ Bên Suối, Núi Dinh, TP.HCM',
        date: '17/10/2026',
        targetTime: 'Finish Strong',
        actualTime: 'Dự kiến / Scheduled',
        notes: {
          vi: 'Ngày thi đấu dự kiến: 17/10/2026 tại Hồ Bên Suối, Núi Dinh, TP.HCM.',
          en: 'Scheduled race date: 17/10/2026 at Ho Ben Suoi, Nui Dinh, HCMC.',
        },
        warning: {
          vi: '⚠️ Ghi chú trong sự kiện: Ngày này lấy theo nguồn người dùng cung cấp, chưa xác nhận độc lập được từ trang chính thức — nên kiểm tra lại với Trail Station/Sala Running Hub gần ngày race.',
          en: '⚠️ Event Note: Date provided by user source, not independently confirmed from official channels — please re-check with Trail Station/Sala Running Hub closer to race day.',
        },
      },
      {
        id: 'RACE-003',
        title: 'Marathon Quốc tế Di sản Hạ Long 2026',
        category: 'Road',
        status: 'Upcoming',
        distance: '42.195 / 21.0975 / 10 / 5 km',
        location: 'Quảng Ninh',
        date: '20-22/11/2026 (Đua chính: 22/11/2026)',
        expoInfo: {
          vi: 'Địa điểm: Cung Quy hoạch, Hội chợ và Triển lãm tỉnh Quảng Ninh',
          en: 'Venue: Quang Ninh Planning, Exhibition and Fair Center',
        },
        targetTime: 'World Athletics Standard',
        actualTime: 'Sắp diễn ra / Upcoming',
        notes: {
          vi: 'Sự kiện diễn ra từ 20-22/11/2026, ngày thi đấu chính: Chủ nhật 22/11/2026. Cự ly: 42,195 / 21,0975 / 10 / 5 km. Giải chạy danh giá đạt chuẩn World Athletics Label Road Race.',
          en: 'Event window: Nov 20-22, 2026, main race day: Sunday Nov 22, 2026. Distances: 42.195 / 21.0975 / 10 / 5 km. World Athletics Label Road Race certified event.',
        },
      },
      {
        id: 'RACE-004',
        title: 'Giải Marathon Quốc tế TP.HCM Techcombank – Mùa 9',
        category: 'Road',
        status: 'Upcoming',
        distance: '5 / 10 / 21 / 42 km',
        location: 'TP. Hồ Chí Minh',
        date: '04-06/12/2026 (Đua chính: 06/12/2026 04:00-11:30)',
        routeInfo: {
          vi: 'Xuất phát: Lê Duẩn – Nguyễn Bỉnh Khiêm (cổng Thảo Cầm Viên) → Về đích: Empire City, Thủ Thiêm',
          en: 'Start: Le Duan – Nguyen Binh Khiem (Botanical Gardens gate) → Finish: Empire City, Thu Thiem',
        },
        targetTime: 'City Landmark PR',
        actualTime: 'Sắp diễn ra / Upcoming',
        notes: {
          vi: 'Sự kiện: 04-06/12/2026, ngày thi đấu chính: Chủ nhật 06/12/2026, thời gian 04:00-11:30. Cự ly 5/10/21/42km qua các danh thắng nổi tiếng nhất TP.HCM.',
          en: 'Event: Dec 04-06, 2026, main race day: Sunday Dec 06, 2026, 04:00-11:30. Distances 5/10/21/42km taking runners through HCMC iconic landmarks.',
        },
      },
      {
        id: 'RACE-005',
        title: 'Vietnam Highlands Trail by UTMB® – 50K Elephant',
        category: 'Trail',
        status: 'Registered',
        distance: '50K Elephant',
        location: 'Đà Lạt, Lâm Đồng',
        date: '08-10/01/2027 (Đua chính: 09/01/2027)',
        expoInfo: {
          vi: 'Expo & Racekit: Quảng Trường Lâm Viên, Đà Lạt',
          en: 'Expo & Racekit: Lam Vien Square, Da Lat',
        },
        targetTime: 'UTMB World Series Finish',
        actualTime: '🎟️ Đã đăng ký / Registered',
        notes: {
          vi: 'Sự kiện: 08-10/01/2027, ngày đua chính dự kiến: 09/01/2027. Expo tại Quảng Trường Lâm Viên, Đà Lạt. Sự kiện UTMB World Series đầu tiên tại Việt Nam — cự ly 50K Elephant đã đăng ký thành công.',
          en: 'Event: Jan 08-10, 2027, expected main race day: Jan 09, 2027. Expo at Lam Vien Square, Da Lat. First-ever UTMB World Series event in Vietnam — 50K Elephant official registration confirmed.',
        },
      },
    ],
  },

  challenges: {
    tag: {
      en: '// 03 COMMUNITY & PERSONAL CHALLENGES',
      vi: '// 03 THỬ THÁCH CÁ NHÂN & CỘNG ĐỒNG',
    },
    title: {
      en: 'Active Life Challenges',
      vi: 'Các Thử Thách Vận Động & Động Lực Sống',
    },
    desc: {
      en: 'Don’t run alone. Join my monthly challenges to build unshakeable health habits.',
      vi: 'Đừng chạy một mình. Tham gia các thử thách hàng tháng để xây dựng thói quen sức khỏe bền vững.',
    },
    list: [
      {
        id: 'CHAL-001',
        icon: '🔥',
        title: { en: '1,000 KM Annual Mileage Challenge', vi: 'Thử Thách 1,000 KM / Năm' },
        desc: {
          en: 'Consistent daily running habit averaging 83 km per month throughout 2026.',
          vi: 'Thói quen chạy đều đặn trung bình 83km mỗi tháng trong suốt năm 2026.',
        },
        progress: 68, // 68%
        current: '682 / 1,000 km',
        participants: '142 runners active',
      },
      {
        id: 'CHAL-002',
        icon: '🌅',
        title: { en: '100 Sunrise Morning Runs', vi: '100 Chuyến Chạy Bình Minh' },
        desc: {
          en: 'Complete 100 morning runs before 6:30 AM to catch the sunrise and start the day with focus.',
          vi: 'Hoàn thành 100 buổi chạy sáng sớm trước 6h30 để đón bình minh và khởi động ngày mới đầy năng lượng.',
        },
        progress: 52,
        current: '52 / 100 runs',
        participants: '89 runners active',
      },
      {
        id: 'CHAL-003',
        icon: '🏔️',
        title: { en: '10 Mountain & Trail Expeditions', vi: '10 Đỉnh Núi & Cung Đường Trail' },
        desc: {
          en: 'Conquer 10 different trail peaks in Vietnam to immerse in nature & high altitude air.',
          vi: 'Chinh phục 10 đỉnh núi & cung đường trail địa hình tại Việt Nam để hòa mình vào thiên nhiên.',
        },
        progress: 40,
        current: '4 / 10 trails',
        participants: '45 trekkers active',
      },
      {
        id: 'CHAL-004',
        icon: '❤️',
        title: { en: 'Run For Charity & Good Causes', vi: 'Chạy Bộ Vì Cộng Đồng' },
        desc: {
          en: 'Every kilometer run converts into donations for local children’s sports funds.',
          vi: 'Mỗi kilômét chạy bộ được quy đổi thành kinh phí đóng góp cho quỹ thể thao trẻ em em.',
        },
        progress: 85,
        current: '850 / 1,000 km raised',
        participants: '210 supporters',
      },
    ],
    joinBtn: { en: 'Join Challenge', vi: 'Tham Gia Thử Thách' },
  },

  articles: {
    tag: {
      en: '// 04 LIFE OS HANDBOOK & KNOWLEDGE BASE',
      vi: '// 04 CẨM NANG SỐNG KHỎE & HÀNH TRÌNH',
    },
    title: {
      en: 'Life OS: Mind, Body, Trail & Spirit',
      vi: 'Cẩm Nang Life OS: Tâm Trí, Cơ Thể & Hành Trình',
    },
    desc: {
      en: 'Articles exploring running biomechanics, recovery protocols, mindset discipline, and nature living.',
      vi: 'Tổng hợp bài viết hướng dẫn chuyên sâu về kỹ thuật chạy, phục hồi, tư duy kỷ luật và trải nghiệm thiên nhiên.',
    },
    categories: {
      en: ['All Topics', '🏃 RUN & TRAIL', '💪 BODY & RECOVERY', '🧠 MIND & DISCIPLINE', '🌄 EXPLORE & LIFE'],
      vi: ['Tất cả', '🏃 RUN & TRAIL', '💪 BODY & RECOVERY', '🧠 MIND & DISCIPLINE', '🌄 EXPLORE & LIFE'],
    },
    list: [
      {
        id: 'ART-001',
        category: '🏃 RUN & TRAIL',
        title: {
          en: 'Mastering Zone 2 & Aerobic Base Building for Long Distance',
          vi: 'Chinh Phục Zone 2 & Xây Dựng Nền Tảng Sức Bền Móng Đường Dài',
        },
        readTime: '8 min read',
        author: 'Martin Uy & Sports Physiologist',
        date: 'SEP 2025',
        summary: {
          en: 'Why 80% of your running volume should be easy. Deep dive into mitochondrial adaptation, fat metabolism, and avoiding mid-race wall.',
          vi: 'Tại sao 80% thời lượng chạy cần ở tốc độ nhẹ nhàng. Phân tích sự phát triển ti thể, đốt mỡ tự nhiên và cách tránh kiệt sức ở km 30.',
        },
        keyTakeaways: [
          { en: 'Keep heart rate below 75% max HR during easy runs.', vi: 'Duy trì nhịp tim dưới 75% nhịp tim tối đa trong các bài chạy nhẹ.' },
          { en: 'Aerobic base building requires 12-16 weeks of patient consistency.', vi: 'Xây chân móng sức bền đòi hỏi 12-16 tuần kiên trì liên tục.' },
          { en: 'Combine Zone 2 with 1 weekly strides session for gait pop.', vi: 'Kết hợp Zone 2 với 1 buổi chạy bứt tốc ngắn (Strides) để giữ độ nảy sải chân.' },
        ],
      },
      {
        id: 'ART-002',
        category: '💪 BODY & RECOVERY',
        title: {
          en: 'The Recovery OS: HRV Tracking, Deep Sleep & Injury Prevention',
          vi: 'Hệ Thống Phục Hồi: Chỉ Số HRV, Giấc Ngủ Sâu & Phòng Tránh Chấn Thương',
        },
        readTime: '10 min read',
        author: 'Martin Uy & Wellness Team',
        date: 'AUG 2025',
        summary: {
          en: 'How to use Heart Rate Variability (HRV), cold immersion, foam rolling, and circadian rhythm alignment to recover 2x faster.',
          vi: 'Phương pháp ứng dụng chỉ số HRV, ngâm lạnh, lăn mạc cơ và chuẩn hóa nhịp sinh học để tăng tốc độ phục hồi gấp 2 lần.',
        },
        keyTakeaways: [
          { en: 'A dropping HRV trend indicates nervous system fatigue.', vi: 'Xu hướng HRV giảm cảnh báo hệ thần kinh đang quá tải.' },
          { en: 'Target 90+ minutes of slow-wave deep sleep per night.', vi: 'Mục tiêu đạt trên 90 phút giấc ngủ sâu tái tạo cơ bắp mỗi đêm.' },
          { en: 'Perform ankle & hip mobility drills before every run.', vi: 'Thực hiện các bài khởi động linh hoạt cổ chân & hông trước khi chạy.' },
        ],
      },
      {
        id: 'ART-003',
        category: '🧠 MIND & DISCIPLINE',
        title: {
          en: 'Embracing DNF (Did Not Finish) & Building Mental Toughness',
          vi: 'Học Cách Chấp Nhận Thất Bại DNF & Rèn Luyện Tâm Lý Thép',
        },
        readTime: '9 min read',
        author: 'Martin Uy // Personal Essay',
        date: 'JUL 2025',
        summary: {
          en: 'Reflections from my first trail DNF. Lessons on ego control, listening to severe body pain signals, and bouncing back stronger.',
          vi: 'Những chiêm nghiệm từ lần dở dang DNF chạy trail đầu tiên. Bài học về kiểm soát cái tôi, lắng nghe cơn đau và trở lại mạnh mẽ hơn.',
        },
        keyTakeaways: [
          { en: 'DNF is a tactical withdrawal to preserve your long-term athletic health.', vi: 'DNF là quyết định chiến thuật để bảo vệ sức khỏe vận động lâu dài.' },
          { en: 'Failure provides clearer diagnostic data than easy wins.', vi: 'Thất bại mang lại dữ liệu bài học rõ ràng hơn những chiến thắng dễ dàng.' },
          { en: 'Focus on process control rather than outcome obsession.', vi: 'Tập trung vào kiểm soát quá trình thay vì ám ảnh bởi kết quả.' },
        ],
      },
      {
        id: 'ART-004',
        category: '🌄 EXPLORE & LIFE',
        title: {
          en: 'High Altitude Mountain Trekking & Leave No Trace Guide',
          vi: 'Cẩm Nang Trekking Băng Rừng Leo Núi & Nguyên Tắc Không Dấu Vết',
        },
        readTime: '11 min read',
        author: 'Martin Uy & Outdoor Explorer',
        date: 'JUN 2025',
        summary: {
          en: 'Essential preparation for multi-day mountain trekking in Vietnam, pack weight distribution, emergency GPS maps, and outdoor wilderness safety.',
          vi: 'Chuẩn bị toàn diện cho chuyến trekking leo núi nhiều ngày, kỹ thuật phân bổ lực balo, bản đồ GPX offline và sinh tồn tự nhiên.',
        },
        keyTakeaways: [
          { en: 'Keep backpack weight under 20% of your total body weight.', vi: 'Trọng lượng balo không vượt quá 20% trọng lượng cơ thể.' },
          { en: 'Layering system: Wicking base, Fleece mid-layer, Waterproof shell.', vi: 'Quy tắc 3 lớp: Thấm hút - Giữ nhiệt - Áo gió chống mưa.' },
          { en: 'Leave No Trace: Pack out all waste and preserve trail ecosystems.', vi: 'Không Dấu Vết: Mang toàn bộ rác ra khỏi núi và bảo vệ hệ sinh thái.' },
        ],
      },
    ],
  },

  tools: {
    tag: {
      en: '// 05 INTERACTIVE ENDURANCE CALCULATOR',
      vi: '// 05 CÔNG CỤ TÍNH TOÁN & CHUẨN BỊ',
    },
    title: {
      en: 'Pace, Hydration & Gear Tools',
      vi: 'Công Cụ Tính Pace, Nước & Checklist',
    },
    desc: {
      en: 'Interactive tools designed to simplify race day execution, nutrition planning, and gear packing.',
      vi: 'Các công cụ tương tác hỗ trợ tính toán tốc độ, lượng nước/điện giải và lên danh mục trang bị cá nhân.',
    },
    tabs: {
      pace: { en: 'Pace & Finish Time', vi: 'Tính Pace & Thời gian' },
      hydration: { en: 'Hydration & Nutrition', vi: 'Tính Nước & Gel Dinh dưỡng' },
      checklist: { en: 'Gear Checklist', vi: 'Checklist Trang bị' },
    },
    paceCalc: {
      title: { en: 'Running & Trail Pace Calculator', vi: 'Máy Tính Pace Chạy Bộ & Trail' },
      distanceLabel: { en: 'Distance (km):', vi: 'Khoảng cách (km):' },
      customDist: { en: 'Target Distance', vi: 'Khoảng cách tùy chỉnh' },
      targetTime: { en: 'Target Finish Time (Hours : Minutes):', vi: 'Thời gian mục tiêu (Giờ : Phút):' },
      hours: { en: 'Hours', vi: 'Giờ' },
      minutes: { en: 'Minutes', vi: 'Phút' },
      resultPace: { en: 'Required Pace:', vi: 'Pace Yêu Cầu:' },
      resultSpeed: { en: 'Average Speed:', vi: 'Tốc độ trung bình:' },
      zone2Estimate: { en: 'Estimated Zone 2 HR:', vi: 'Nhịp tim Zone 2 dự kiến:' },
      minPerKm: 'min/km',
      kmh: 'km/h',
      bpm: 'bpm',
    },
    hydrationCalc: {
      title: { en: 'Race Hydration & Energy Fueling Calculator', vi: 'Công Cụ Tính Nước & Gel Dinh Dưỡng' },
      weightLabel: { en: 'Body Weight (kg):', vi: 'Cân nặng (kg):' },
      durationLabel: { en: 'Activity Duration (Hours):', vi: 'Thời gian vận động (Giờ):' },
      tempLabel: { en: 'Weather Condition:', vi: 'Điều kiện thời tiết:' },
      tempOptions: [
        { key: 'cool', label: { en: 'Cool (< 22°C)', vi: 'Mát mẻ (< 22°C)' } },
        { key: 'moderate', label: { en: 'Moderate (22 - 28°C)', vi: 'Vừa phải (22 - 28°C)' } },
        { key: 'hot', label: { en: 'Hot (> 28°C)', vi: 'Nóng (> 28°C)' } },
      ],
      waterResult: { en: 'Total Fluid Needed:', vi: 'Tổng lượng nước cần nạp:' },
      carbResult: { en: 'Carbohydrates Needed:', vi: 'Lượng Carb cần nạp:' },
      gelResult: { en: 'Equivalent Energy Gels:', vi: 'Số lượng Gel dinh dưỡng:' },
      sodiumResult: { en: 'Estimated Sodium:', vi: 'Lượng Muối/Điện giải:' },
      liters: 'Liters',
      grams: 'grams total',
      gels: 'gels (~25g carb/gel)',
      mg: 'mg sodium',
    },
    checklistTool: {
      title: { en: 'Outdoor Adventure Packing Checklist', vi: 'Checklist Trang Bị Chuyên Dụng' },
      selectCategory: { en: 'Choose Activity Profile:', vi: 'Chọn loại hình hoạt động:' },
      categories: [
        { key: 'road', label: { en: '5K - 42K Road Race', vi: 'Chạy Bộ Đường Bằng (5K - 42K)' } },
        { key: 'trail', label: { en: 'Ultra Trail Run (25K - 100K)', vi: 'Chạy Trail Địa Hình (25K - 100K)' } },
        { key: 'trek', label: { en: 'Multi-day Mountain Trek', vi: 'Trekking Leo Núi 2-3 Ngày' } },
      ],
    },
  },

  gear: {
    tag: {
      en: '// 06 MY GEAR & OUTDOOR EQUIPMENT',
      vi: '// 06 TRANG BỊ CHUYÊN DỤNG KHUYÊN DÙNG',
    },
    title: {
      en: 'Tested Gear & Personal Setup',
      vi: 'Trang Bị Cá Nhân Đã Kiểm Nghiệm',
    },
    desc: {
      en: 'The gear I rely on for daily road training, ultra mountain trails, and multi-day trekking.',
      vi: 'Danh mục thiết bị và đồ dùng được thử nghiệm qua hàng ngàn kilômét chạy bộ & leo núi.',
    },
    imageNote: {
      en: '* High-res gear photography & detailed review logs will be updated soon.',
      vi: '* Hình ảnh trải nghiệm thực tế sản phẩm sẽ tiếp tục được cập nhật.',
    },
    items: [
      {
        id: 'GEAR-001',
        title: { en: 'Garmin Forerunner 965 GPS Watch', vi: 'Đồng Hồ GPS Garmin Forerunner 965' },
        price: 'Personal Tested',
        type: { en: 'GPS Watch', vi: 'Đồng hồ GPS' },
        desc: {
          en: 'Titanium bezel, AMOLED display, full offline color mapping, and multi-band GPS tracking.',
          vi: 'Viền Titanium, màn hình AMOLED, bản đồ màu offline & theo dõi nhịp tim HRV chính xác.',
        },
        status: { en: 'Daily Driver', vi: 'Dùng hàng ngày' },
      },
      {
        id: 'GEAR-002',
        title: { en: 'Salomon Active Skin 8L Hydration Vest', vi: 'Vest Nước Salomon Active Skin 8L' },
        price: 'Personal Tested',
        type: { en: 'Trail Vest', vi: 'Vest Chạy Trail' },
        desc: {
          en: 'Ergonomic fit with twin 500ml soft flasks, pole attachments, and quick access pockets.',
          vi: 'Thiết kế ôm sát cơ thể, kèm 2 bình nước mềm 500ml và gá gậy trekking tiện lợi.',
        },
        status: { en: 'Essential', vi: 'Vật dụng thiết yếu' },
      },
      {
        id: 'GEAR-003',
        title: { en: 'Hoka Speedgoat 5 Trail Shoes', vi: 'Giày Chạy Trail Hoka Speedgoat 5' },
        price: 'Personal Tested',
        type: { en: 'Footwear', vi: 'Giày Trail' },
        desc: {
          en: 'Vibram Megagrip outsole with late-stage Meta-Rocker for maximum cushion on technical descents.',
          vi: 'Đế Vibram Megagrip với gai bám địa hình 5mm và lớp đệm êm ái khi tiếp đất đổ dốc.',
        },
        status: { en: 'Top Choice', vi: 'Lựa chọn hàng đầu' },
      },
      {
        id: 'GEAR-004',
        title: { en: 'Black Diamond Carbon Distance Z-Poles', vi: 'Gậy Trekking Carbon Black Diamond Z-Poles' },
        price: 'Personal Tested',
        type: { en: 'Poles', vi: 'Gậy Leo Núi' },
        desc: {
          en: 'Foldable 3-section 100% carbon fiber poles for steep mountain ascents.',
          vi: 'Gậy carbon gập 3 khúc siêu nhẹ hỗ trợ lực tối đa khi leo dốc cao.',
        },
        status: { en: 'Highly Recommend', vi: 'Khuyên dùng' },
      },
    ],
  },

  contact: {
    tag: {
      en: '// 07 COMMUNITY HUBS & CONNECT',
      vi: '// 07 LIÊN HỆ & TRUNG TÂM CỘNG ĐỒNG',
    },
    title: {
      en: 'Connect & Run With Me',
      vi: 'Kết Nối & Đồng Hành Cùng Tôi',
    },
    desc: {
      en: 'Have questions about training plans, trail events, or want to join a Sunday long run? Drop a message!',
      vi: 'Bạn có câu hỏi về giáo trình, giải chạy trail hoặc muốn tham gia buổi Long Run cuối tuần? Hãy nhắn ngay.',
    },
    cities: [
      {
        name: { en: 'Hanoi Hub', vi: 'Hà Nội Hub' },
        tz: 'Asia/Ho_Chi_Minh',
        address: 'Quận Tây Hồ, Hà Nội (Hồ Tây 15K Loop)',
      },
      {
        name: { en: 'Da Nang Hub', vi: 'Đà Nẵng Hub' },
        tz: 'Asia/Ho_Chi_Minh',
        address: 'Bán đảo Sơn Trà & Biển Mỹ Khê',
      },
      {
        name: { en: 'Ho Chi Minh Hub', vi: 'TP. Hồ Chí Minh Hub' },
        tz: 'Asia/Ho_Chi_Minh',
        address: 'Quận 2 (Thủ Đức) & Công viên Vinhomes',
      },
    ],
    hubLabel: {
      en: 'Location',
      vi: 'Địa điểm',
    },
    dispatch: {
      en: 'Personal Email',
      vi: 'Email Cá Nhân',
    },
    commissions: {
      en: 'Coaching Inquiry',
      vi: 'Đăng ký Tư vấn',
    },
    press: {
      en: 'Strava / Community',
      vi: 'Cộng đồng Strava',
    },
  },

  drawer: {
    pitch: {
      tag: { en: 'Share a story or route', vi: 'Gửi bài viết hoặc cung đường' },
      title: { en: 'Submit Content or Trail Route', vi: 'Biên soạn & Cung cấp Nội dung' },
      successTitle: { en: 'Submission Received!', vi: 'Đã nhận thông tin!' },
      successDesc: {
        en: 'Thank you for sharing your running or trekking experience. I will review it shortly.',
        vi: 'Cảm ơn bạn đã chia sẻ bài viết/cung đường. Tôi sẽ phản hồi sớm nhất.',
      },
      nameLabel: { en: 'Your Name', vi: 'Họ và tên' },
      emailLabel: { en: 'Email', vi: 'Email' },
      emailPlaceholder: { en: 'runner@domain.com', vi: 'runner@domain.com' },
      submitBtn: { en: 'Submit Article / Route', vi: 'Gửi Nội Dung' },
    },
    jobs: {
      tag: { en: 'Join Outdoor Guides & Coaches', vi: 'Gia nhập Đội ngũ Coach & Trek Leader' },
      title: { en: 'Open Community Roles', vi: 'Vị trí mở rộng' },
      intro: {
        en: 'We are looking for trail runners, trekking leaders, and endurance sports writers.',
        vi: 'Chúng tôi tìm kiếm các Runner kinh nghiệm, Trek Leader và Tác giả chuyên đề thể thao.',
      },
      apply: { en: 'Apply Now', vi: 'Ứng tuyển' },
      portfolioNote: {
        en: 'Send profile to',
        vi: 'Gửi hồ sơ về',
      },
    },
    hello: {
      tag: { en: 'Ask a Coach', vi: 'Tư vấn Chạy bộ & Trekking' },
      title: { en: 'Get Quick Training Advice', vi: 'Hỏi đáp Kỹ thuật & Giáo trình' },
      intro: {
        en: 'Need advice on gear, pacing, altitude prep, or race nutrition?',
        vi: 'Bạn cần tư vấn về chọn giày, tính pace, nạp gel hay chuẩn bị sức bền?',
      },
      nameLabel: { en: 'Your name', vi: 'Họ và tên' },
      emailLabel: { en: 'Email', vi: 'Email' },
      emailPlaceholder: { en: 'runner@domain.com', vi: 'runner@domain.com' },
      noteLabel: { en: 'Question / Topic', vi: 'Nội dung câu hỏi' },
      notePlaceholder: {
        en: 'What distance or event are you preparing for?',
        vi: 'Bạn đang chuẩn bị cho giải đấu hoặc chuyến đi nào?',
      },
      submitBtn: { en: 'Send Question', vi: 'Gửi Câu Hỏi' },
      successTitle: { en: 'Question Sent!', vi: 'Đã gửi câu hỏi!' },
      successDesc: {
        en: 'I will reply to your email within 24 hours.',
        vi: 'Tôi sẽ phản hồi qua email của bạn trong 24h.',
      },
    },
    operate: {
      tag: { en: 'PHILOSOPHY // THE ENDURANCE METHOD', vi: 'TRIẾT LÝ // PHƯƠNG PHÁP SỨC BỀN' },
      title: { en: 'Core Principles of Outdoor Living', vi: 'Những Nguyên Tắc Cốt Lõi' },
      intro: {
        en: 'I believe endurance sports transform both mind and body through consistency, respect for nature, and scientific discipline.',
        vi: 'Tôi tin rằng thể thao sức bền và lối sống khỏe giúp chuyển hóa tâm trí & cơ thể thông qua sự kiên trì, tôn trọng thiên nhiên và khoa học.',
      },
      principles: [
        {
          num: '01',
          title: { en: 'Consistency Over Intensity', vi: 'Sự Cố Định Hơn Cường Độ Dồn Dập' },
          desc: {
            en: 'Small daily miles build unbreakable foundations. Progress is made in months of patient work.',
            vi: 'Những bước chạy đều đặn hàng ngày tạo nên nền tảng vững chắc. Sự tiến bộ đến từ tính kiên trì.',
          },
        },
        {
          num: '02',
          title: { en: 'Respect the Mountain & Nature', vi: 'Tôn Trọng Thiên Nhiên & Núi Rừng' },
          desc: {
            en: 'Leave No Trace. Understand weather patterns, terrain risks, and prioritize safety above all.',
            vi: 'Thực hành nguyên tắc Không Dấu Vết. Luôn tôn trọng thời tiết, địa hình và đặt an toàn lên hàng đầu.',
          },
        },
        {
          num: '03',
          title: { en: 'Listen to Body Signals', vi: 'Lắng Nghe Tín Hiệu Cơ Thể' },
          desc: {
            en: 'Recovery is where adaptation happens. Balance hard efforts with restorative sleep and proper nutrition.',
            vi: 'Phục hồi chính là lúc cơ thể phát triển. Cân bằng giữa tập luyện nặng và giấc ngủ tái tạo năng lượng.',
          },
        },
        {
          num: '04',
          title: { en: 'Community & Shared Passion', vi: 'Cộng Đồng & Sức Mạnh Kết Nối' },
          desc: {
            en: 'Running and trekking are stronger when shared. Support fellow athletes and encourage beginners.',
            vi: 'Chạy bộ và leo núi tuyệt vời hơn khi cùng đồng hành. Truyền cảm hứng và hỗ trợ bạn chạy trên mọi cung đường.',
          },
        },
      ],
    },
    closeLabel: { en: 'Close panel', vi: 'Đóng panel' },
    footer: { en: 'MARTIN UY // LIFE OS', vi: 'MARTIN UY // LIFE OS' },
    est: { en: 'EST. 2026', vi: 'THÀNH LẬP 2026' },
  },
} as const;

export type Translations = typeof translations;