import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import { Reveal } from './Reveal';

// ============================================================
// PHOTO GALLERY DATA — Phân loại theo sự kiện
// ============================================================

type Event = 'all' | 'nui-dinh' | 'marathon-hue' | 'midnight' | 'moc-chau' | 'vung-tau';

interface Photo {
  src: string;
  alt: string;
  event: Event;
  person: 'martin' | 'tuyet' | 'both';
  captionVi: string;
  captionEn: string;
  quote?: { vi: string; en: string };
  /** objectPosition để zoom mặt VDV khi click ảnh to */
  objPos?: string;
}

// ========== ẢNH BÌA CHÍNH (#08) — Cả hai VDV Nam & Nu tại Trail Núi Dinh ==========
const PHOTOS: Photo[] = [
  {
    src: '/08.jpg',
    alt: 'Martin & Tuyết — Trail Núi Dinh',
    event: 'nui-dinh',
    person: 'both',
    objPos: 'center 25%',
    captionVi: 'Martin & Tuyết — Trước giờ xuất phát Trail Núi Dinh. Hai vận động viên đã sẵn sàng cho chiến binh >37km cùng +1.850m elevation gain.',
    captionEn: 'Martin & Tuyet — Before the start of Nui Dinh Trail Race. Two athletes ready for the >37km battle with +1,850m elevation gain.',
    quote: {
      vi: '"Cùng nhau chạm tới giới hạn — rồi vượt qua nó."',
      en: '"Together we reach our limits — then break through them."',
    },
  },

  // ========== TRAIL NÚI DINH (>37km | +1,850m D+) ==========
  {
    src: '/04.jpg',
    alt: 'Martin — Chuẩn bị Trail Núi Dinh, áo VNEXPRESS MIDNIGHT tím',
    event: 'nui-dinh',
    person: 'martin',
    objPos: 'center 25%',
    captionVi: 'Martin — Nụ cười rạng rỡ trước giờ chinh phục Núi Dinh. Áo VNEXPRESS Marathon Ho Chi Minh City Midnight màu tím đặc trưng, hai gậy trekking đỏ-đen, trail vest đầy đủ. Sẵn sàng cho >37km và +1.850m gain!',
    captionEn: 'Martin — Beaming smile before conquering Nui Dinh. Signature purple VNEXPRESS Midnight Ho Chi Minh City shirt, two red-black trekking poles, full trail vest. Ready for >37km and +1,850m gain!',
    quote: { vi: '"Nụ cười trước 37km — đó mới là dũng cảm thật sự."', en: '"Smiling before 37km — that is true courage."' },
  },
  {
    src: '/06.jpg',
    alt: 'Martin — Trail Núi Dinh, trail vest đầy đủ, giơ gậy',
    event: 'nui-dinh',
    person: 'martin',
    objPos: 'center 30%',
    captionVi: 'Martin giơ hai gậy trekking lên — tư thế sẵn chiến của trail runner chuyên nghiệp. Áo VNEXPRESS MIDNIGHT tím, trail vest đỏ-đen, đồng hồ GPS Garmin. Cơ thể và tinh thần đã sẵn sàng cho Núi Dinh.',
    captionEn: 'Martin raises both trekking poles — the ready-to-battle stance of a professional trail runner. Purple VNEXPRESS MIDNIGHT shirt, red-black trail vest, Garmin GPS watch. Body and mind ready for Nui Dinh.',
  },
  {
    src: '/07.jpg',
    alt: 'Tuyết — Trail vest xanh, Núi Dinh',
    event: 'nui-dinh',
    person: 'tuyet',
    objPos: 'center 20%',
    captionVi: 'Tuyết — Nữ vận động viên kiên cường với trail vest GoodFit, kính sport và tai nghe bone-conduction. Phong thái tự tin trước hơn 37km đường núi.',
    captionEn: 'Tuyet — A determined female athlete with GoodFit trail vest, sport glasses, and bone-conduction headphones. Confident before 37+km of mountain terrain.',
    quote: { vi: '"Phụ nữ không chỉ chạy — chúng tôi bay."', en: '"Women don\'t just run — we fly."' },
  },
  {
    src: '/09.jpg',
    alt: 'Tuyết — Trail Núi Dinh, pose vui',
    event: 'nui-dinh',
    person: 'tuyet',
    objPos: 'center 30%',
    captionVi: 'Tuyết — Năng lượng ngút trời trước khi xuất phát! Năm 2025, Tuyết hoàn thành marathon 21km với thành tích ấn tượng 2:14, và tiếp tục chinh phục Trail Núi Dinh.',
    captionEn: 'Tuyet — Full of energy before the start! In 2025, Tuyet completed the 21km half marathon with an impressive PR of 2:14, then took on Nui Dinh Trail.',
  },
  {
    src: '/10.jpg',
    alt: 'Martin — Rừng sương mù Trail Núi Dinh',
    event: 'nui-dinh',
    person: 'martin',
    objPos: 'center 25%',
    captionVi: 'Martin giữa rừng sương mù Núi Dinh — độ cao trên 300m, lá rụng ướt trên đường đất. Cự ly 37km+, leo dốc tổng cộng +1.850m gain — một thử thách thật sự của ý chí.',
    captionEn: 'Martin in the misty forest of Nui Dinh — above 300m elevation, wet leaves on muddy trail. 37km+, +1,850m total gain — a true test of will.',
    quote: { vi: '"Sương mù không che khuất đích đến — nó chỉ làm hành trình thêm huyền ảo."', en: '"Mist doesn\'t hide the finish line — it just makes the journey more magical."' },
  },
  {
    src: '/11.jpg',
    alt: 'Martin — Rừng Núi Dinh, gậy trekking',
    event: 'nui-dinh',
    person: 'martin',
    objPos: 'center 30%',
    captionVi: 'Đứng vững giữa rừng già Núi Dinh với gậy trekking đôi, Martin kiểm soát nhịp thở trước đoạn dốc tiếp theo. Kỹ thuật leo dốc đúng là chìa khóa cho ultra trail.',
    captionEn: 'Steadying himself in Nui Dinh\'s ancient forest with trekking poles, Martin controls his breathing before the next steep climb. Proper uphill technique is the key to ultra trail.',
  },
  {
    src: '/15.jpg',
    alt: 'Tuyết — Trekking Trail Núi Dinh, đứng trên đá',
    event: 'nui-dinh',
    person: 'tuyet',
    objPos: 'center 20%',
    captionVi: 'Tuyết đứng hiên ngang trên tảng đá lớn giữa rừng Núi Dinh. Áo trekking xanh lá nhẹ, gậy carbon trong tay — cô ấy đã leo qua những mỏm đá khó nhất của cung đường này.',
    captionEn: 'Tuyet standing confidently on a large boulder in Nui Dinh forest. Light green trekking shirt, carbon poles in hand — she conquered the toughest rocky sections of this trail.',
  },
  {
    src: '/16.jpg',
    alt: 'Martin — Trail Núi Dinh, đứng trên đá thumbs up',
    event: 'nui-dinh',
    person: 'martin',
    objPos: 'center 25%',
    captionVi: 'Martin trên đỉnh tảng đá Núi Dinh — ngón cái giơ cao, năng lượng chưa bao giờ cạn! Trail vest đầy đủ, Blue Hoka, gậy một tay. Chinh phục từng viên đá một.',
    captionEn: 'Martin on top of a Nui Dinh boulder — thumbs up, energy still full! Full trail vest, Blue Hokas, one-handed pole. Conquering it one rock at a time.',
    quote: { vi: '"Mỗi tảng đá là một thử thách nhỏ. Vượt qua đủ thách thức nhỏ — bạn sẽ hoàn thành mọi thứ lớn."', en: '"Every boulder is a small challenge. Conquer enough small challenges — you finish everything big."' },
  },
  {
    src: '/17.jpg',
    alt: 'Tuyết — Đứng trên đá lớn giữa rừng Núi Dinh',
    event: 'nui-dinh',
    person: 'tuyet',
    objPos: 'center 20%',
    captionVi: 'Khoảnh khắc tĩnh lặng và quyền năng giữa thiên nhiên Núi Dinh. Tuyết đứng trên khối đá granit khổng lồ, nhìn về phía trước — đích đến vẫn còn nhưng quyết tâm đã thắp.',
    captionEn: 'A powerful, serene moment amid Nui Dinh\'s nature. Tuyet stands on a massive granite boulder, gazing forward — the finish line still ahead, but determination already burning.',
  },
  {
    src: '/18.jpg',
    alt: 'Tuyết — Trail Núi Dinh, đứng trên đá hướng rừng',
    event: 'nui-dinh',
    person: 'tuyet',
    objPos: 'center 25%',
    captionVi: 'Nắng chiều xuyên tán rừng Núi Dinh. Tuyết trong tư thế trekking tự tin — gậy, ba lô, đôi chân sẵn sàng. Đây là sức mạnh của phụ nữ yêu núi rừng.',
    captionEn: 'Afternoon light filters through Nui Dinh\'s canopy. Tuyet in a confident trekking stance — poles, pack, legs ready. This is the strength of a woman who loves the mountains.',
  },
  // ========== MARATHON HUẾ — VnExpress Marathon Hue ==========
  {
    src: '/05.jpg',
    alt: 'Tuyết — Marathon Huế, huy chương & Kỳ Đài Cố Đô Huế',
    event: 'marathon-hue',
    person: 'tuyet',
    objPos: 'center 20%',
    captionVi: 'Tuyết tại VnExpress Marathon Huế — kính iridescent chói lọi, huy chương vàng trên ngực, áo tím thương hiệu VnExpress. Sau 21km cự ly bán marathon, cô ấy đứng trước Kỳ Đài Huế với nụ cười rực rỡ nhất.',
    captionEn: 'Tuyet at VnExpress Marathon Hue — iridescent glasses, gold medal, iconic VnExpress purple jersey. After 21km half marathon, she stands in front of Hue Imperial Citadel with the brightest smile.',
    quote: { vi: '"Đích đến không phải là vạch finish — đích đến là khoảnh khắc bạn biết mình đã làm được."', en: '"The finish line isn\'t just a line — it\'s the moment you know you did it."' },
  },
  {
    src: '/TuyetNGUYEN.jpg',
    alt: 'Tuyết — Marathon Huế, huy chương tại Kỳ Đài Cố Đô',
    event: 'marathon-hue',
    person: 'tuyet',
    objPos: 'center 25%',
    captionVi: 'VnExpress Marathon Huế — nơi lịch sử nghìn năm gặp gỡ thể thao hiện đại. Tuyết với huy chương 21km, áo tím VnExpress và kính phân cực cầu vồng. PR 2:14 phút — con số không thể quên!',
    captionEn: 'VnExpress Marathon Hue — where a thousand years of history meets modern sport. Tuyet with 21km medal, VnExpress purple jersey and rainbow polarized glasses. PR 2:14 — an unforgettable number!',
  },
  {
    src: '/01.jpg',
    alt: 'Martin — Marathon Huế, chạy đường phố ban ngày BIB 0328',
    event: 'marathon-hue',
    person: 'martin',
    objPos: 'center 25%',
    captionVi: 'Martin trên đường phố Huế — số BIB 0328, áo teal xanh ngọc, mũ trắng, toàn tâm toàn ý trên đường chạy ban ngày. Marathon Huế 42km, hoàn thành với thành tích 4:40.',
    captionEn: 'Martin on the streets of Hue — BIB 0328, teal jersey, white cap, fully in the zone on the daytime course. Marathon Hue 42km, completed in 4:40.',
    quote: { vi: '"42 kilomet không phải là khoảng cách. Đó là cuộc đối thoại giữa bạn và chính mình."', en: '"42 kilometers isn\'t a distance. It\'s a conversation between you and yourself."' },
  },

  // ========== MARATHON MIDNIGHT HCMC — VnExpress Midnight 2026 ==========
  {
    src: '/12.jpg',
    alt: 'Martin & Tuyết — Trước xuất phát Marathon Midnight',
    event: 'midnight',
    person: 'both',
    objPos: 'center 20%',
    captionVi: 'Selfie trước giờ G — VnExpress Marathon Midnight HCMC. Hàng nghìn người cùng chung một nhịp tim, một khát vọng. Đêm nay, Sài Gòn thuộc về những đôi chân không ngủ.',
    captionEn: 'Pre-race selfie — VnExpress Midnight Marathon HCMC. Thousands share one heartbeat, one ambition. Tonight, Saigon belongs to the sleepless feet.',
    quote: { vi: '"Chạy đêm không phải là thiếu sáng — đó là tìm ánh sáng từ bên trong."', en: '"Running at night isn\'t about darkness — it\'s about finding the light within."' },
  },
  {
    src: '/02.jpg',
    alt: 'Tuyết — Chạy đêm Midnight Marathon HCMC, giơ ✌️✌️',
    event: 'midnight',
    person: 'tuyet',
    objPos: 'center 25%',
    captionVi: 'Tuyết về đêm tại Midnight Marathon HCMC — hai tay giơ V chiến thắng, BIB E2040, áo tím không tay, nụ cười không tắt! Đèn đường lung linh phía sau như sân khấu dành riêng cho cô ấy.',
    captionEn: 'Tuyet at Midnight Marathon HCMC — both hands throwing victory V, BIB E2040, sleeveless purple singlet, unstoppable smile! Street lights glitter behind like a stage just for her.',
  },
  {
    src: '/03.jpg',
    alt: 'Martin — Marathon Huế lúc bình minh/hoàng hôn, BIB 0328',
    event: 'marathon-hue',
    person: 'martin',
    objPos: 'center 25%',
    captionVi: 'Martin lúc bình minh trên đường chạy Marathon Huế — bầu trời tím hồng rực rỡ, áo teal-xanh, BIB 0328. Những km cuối cùng đẹp nhất vì ánh sáng và ý chí cùng trỗi dậy.',
    captionEn: 'Martin at dawn on the Marathon Hue course — vibrant purple-pink sky, teal jersey, BIB 0328. The final kilometers are the most beautiful because light and will rise together.',
    quote: { vi: '"Khi bình minh lên là khi bạn biết — bóng tối chỉ là tạm thời."', en: '"When dawn breaks, you know — darkness was only temporary."' },
  },
  {
    src: '/hoanguy_marathon.jpg',
    alt: 'Martin — VnExpress Marathon Midnight 2026, BIB #80789',
    event: 'midnight',
    person: 'martin',
    objPos: 'center 25%',
    captionVi: 'Martin tại VnExpress Marathon Ho Chi Minh City Midnight 2026 — BIB #80789, áo MIDNIGHT vàng chói, khuôn mặt tập trung tuyệt đối. 42km về đêm — thành tích 4:40 phút.',
    captionEn: 'Martin at VnExpress Marathon Ho Chi Minh City Midnight 2026 — BIB #80789, bright MIDNIGHT yellow jersey, face in total focus. 42km overnight — finish time 4:40.',
    quote: { vi: '"Tập trung trong đêm tối là khi bạn thực sự mạnh mẽ nhất."', en: '"Focus in the darkness is when you\'re truly at your strongest."' },
  },
  {
    src: '/13.jpg',
    alt: 'Tuyết — Sau marathon, biển hùng vĩ',
    event: 'midnight',
    person: 'tuyet',
    objPos: 'center 25%',
    captionVi: 'Hậu marathon — Tuyết đứng bên biển với huy chương trên ngực, BIB F nữ, dáng tự hào. Sóng biển vỗ sau lưng như vỗ tay cho cô gái đã không bỏ cuộc.',
    captionEn: 'Post-marathon — Tuyet stands by the sea with medal on chest, female F BIB, proud stance. The waves behind her applaud the woman who never gave up.',
  },
  {
    src: '/14.jpg',
    alt: 'Martin & Tuyết — Cùng huy chương bên biển',
    event: 'midnight',
    person: 'both',
    objPos: 'center 20%',
    captionVi: 'Khoảnh khắc ngọt ngào sau đích finish — Martin và Tuyết cùng khoe huy chương VnExpress bên bờ biển. "Go One More" trên mũ Tuyết nói lên tất cả.',
    captionEn: 'Sweet moment after the finish — Martin and Tuyet proudly showing their VnExpress medals by the sea. "Go One More" on Tuyet\'s hat says it all.',
    quote: { vi: '"Huy chương đẹp nhất không phải bằng vàng — mà là ký ức cùng nhau hoàn thành."', en: '"The most beautiful medal isn\'t gold — it\'s the memory of finishing together."' },
  },

  // ========== VNEXPRESS MARATHON VŨNG TÀU 2026 ==========
  {
    src: '/vungtau_01.jpg',
    alt: 'VnExpress Marathon Vũng Tàu 2026 — Hai VDV trước giờ xuất phát',
    event: 'vung-tau',
    person: 'both',
    objPos: 'center 25%',
    captionVi: 'VnExpress Marathon Vũng Tàu 2026 — 30/08/2026. Trước giờ G, hai vận động viên sẵn sàng chinh phục cự ly 21km ven biển. Gió biển, tinh thần thép, và một mùa giải đáng nhớ.',
    captionEn: 'VnExpress Marathon Vung Tau 2026 — 30/08/2026. Before the start, two athletes ready for the 21km coastal race. Sea breeze, steel spirit, and a memorable season.',
    quote: { vi: '"Vũng Tàu không chỉ là đường chạy — đó là nơi chúng tôi tìm lại chính mình."', en: '"Vung Tau is not just a race course — it\'s where we find ourselves again."' },
  },
  {
    src: '/vungtau_02.jpg',
    alt: 'VnExpress Marathon Vũng Tàu 2026 — Đường chạy ven biển',
    event: 'vung-tau',
    person: 'both',
    objPos: 'center 25%',
    captionVi: 'Cung đường ven biển Vũng Tàu — cát trắng, gió mát, và hàng nghìn runner đồng hành. Mỗi bước chân là một câu chuyện truyền cảm hứng.',
    captionEn: 'Vung Tau coastal course — white sand, cool breeze, thousands of runners together. Every step tells an inspiring story.',
  },
  {
    src: '/vungtau_03.jpg',
    alt: 'VnExpress Marathon Vũng Tàu 2026 — Năng lượng trước giờ G',
    event: 'vung-tau',
    person: 'both',
    objPos: 'center 25%',
    captionVi: 'Năng lượng ngút trời trước giờ xuất phát! Hàng ngàn người cùng chung một nhịp tim, một khát vọng chinh phục.',
    captionEn: 'Full of energy before the start! Thousands sharing one heartbeat, one ambition to conquer.',
  },
  {
    src: '/vungtau_04.jpg',
    alt: 'VnExpress Marathon Vũng Tàu 2026 — VĐV nữ mạnh mẽ',
    event: 'vung-tau',
    person: 'tuyet',
    objPos: 'center 20%',
    captionVi: 'Nữ vận động viên kiên cường trên đường chạy Vũng Tàu — phong thái tự tin, bước chân vững vàng, không gì cản được.',
    captionEn: 'The determined female athlete on the Vung Tau course — confident posture, steady stride, nothing can stop her.',
  },
  {
    src: '/vungtau_05.jpg',
    alt: 'VnExpress Marathon Vũng Tàu 2026 — VĐV nam tập trung',
    event: 'vung-tau',
    person: 'martin',
    objPos: 'center 25%',
    captionVi: 'Nam vận động viên tập trung tuyệt đối trên đường đua — từng bước chân đều là kỷ luật và quyết tâm.',
    captionEn: 'Male athlete in total focus on the race course — every step is discipline and determination.',
  },
  {
    src: '/vungtau_06.jpg',
    alt: 'VnExpress Marathon Vũng Tàu 2026 — Cột mốc km 10',
    event: 'vung-tau',
    person: 'both',
    objPos: 'center 40%',
    captionVi: 'Cột mốc km 10 — nửa chặng đường. Nước uống, năng lượng, và niềm vui từ đồng đội. Trail running là cuộc hành trình của cộng đồng.',
    captionEn: 'Km 10 marker — halfway there. Hydration, energy, and joy from fellow runners. Trail running is a community journey.',
  },
  {
    src: '/vungtau_07.jpg',
    alt: 'VnExpress Marathon Vũng Tàu 2026 — Cảnh quan thiên nhiên',
    event: 'vung-tau',
    person: 'both',
    objPos: 'center 30%',
    captionVi: 'Vũng Tàu không chỉ có đường chạy — còn có cảnh quan thiên nhiên tuyệt đẹp. Biển xanh, núi xanh, và những runner không bao giờ dừng.',
    captionEn: 'Vung Tau is not just a race course — it has breathtaking nature. Blue sea, green mountains, runners who never stop.',
  },
  {
    src: '/vungtau_08.jpg',
    alt: 'VnExpress Marathon Vũng Tàu 2026 — Hai VDV đồng hành',
    event: 'vung-tau',
    person: 'both',
    objPos: 'center 20%',
    captionVi: 'Hai vận động viên đồng hành trên cung đường — cùng nhau chia sẻ năng lượng, cùng nhau vượt qua giới hạn.',
    captionEn: 'Two athletes running side by side — sharing energy, breaking limits together.',
  },
  {
    src: '/vungtau_09.jpg',
    alt: 'VnExpress Marathon Vũng Tàu 2026 — Gương mặt rạng rỡ',
    event: 'vung-tau',
    person: 'both',
    objPos: 'center 25%',
    captionVi: 'Gương mặt rạng rỡ sau mỗi km chinh phục — nụ cười là phần thưởng lớn nhất. Vũng Tàu 2026, đáng nhớ mãi.',
    captionEn: 'Radiant face after each conquered km — the smile is the greatest reward. Vung Tau 2026, unforgettable forever.',
  },
  {
    src: '/vungtau_10.jpg',
    alt: 'VnExpress Marathon Vũng Tàu 2026 — Finish line',
    event: 'vung-tau',
    person: 'both',
    objPos: 'center 45%',
    captionVi: 'Vượt qua finish line — không có gì hạnh phúc hơn khoảnh khắc này. Vũng Tàu 2026, chúng tôi đã chinh phục!',
    captionEn: 'Crossing the finish line — nothing is happier than this moment. Vung Tau 2026, we conquered!',
  },
  {
    src: '/vungtau_11.jpg',
    alt: 'VnExpress Marathon Vũng Tàu 2026 — Huy chương',
    event: 'vung-tau',
    person: 'both',
    objPos: 'center 50%',
    captionVi: 'Huy chương VnExpress Marathon Vũng Tàu 2026 — bằng chứng của sự kiên trì, nỗ lực, và niềm tin vào chính mình.',
    captionEn: 'VnExpress Marathon Vung Tau 2026 medal — proof of perseverance, effort, and belief in oneself.',
  },
  {
    src: '/vungtau_12.jpg',
    alt: 'VnExpress Marathon Vũng Tàu 2026 — Ký ức cùng nhau hoàn thành',
    event: 'vung-tau',
    person: 'both',
    objPos: 'center 25%',
    captionVi: 'Ký ức đẹp nhất không phải huy chương vàng — mà là ký ức cùng nhau hoàn thành. Vũng Tàu 2026, chúng tôi đã cùng nhau chạy.',
    captionEn: 'The most beautiful memory is not a gold medal — it is the memory of finishing together. Vung Tau 2026, we ran together.',
  },

  // ========== TRAIL MỘC CHÂU (21km) ==========
  {
    src: '/moc_chau_2026.jpg',
    alt: 'Trail Mộc Châu 2026 — Đồi chè sương mù',
    event: 'moc-chau',
    person: 'both',
    objPos: 'center 25%',
    captionVi: 'Trail Mộc Châu 2026 — 21km xuyên đồi chè Tây Bắc. Sương mù bao phủ thung lũng, nhiệt độ 18°C se lạnh, lên đỉnh tổng +1.450m. Hành trình của thiên nhiên thuần khiết.',
    captionEn: 'Moc Chau Trail 2026 — 21km through Northwest tea hills. Valley mist, 18°C cool air, total climb +1,450m. A journey through pristine nature.',
    quote: { vi: '"Mộc Châu dạy tôi rằng chạy chậm cũng đẹp — miễn là không dừng."', en: '"Moc Chau taught me that running slow is still beautiful — as long as you don\'t stop."' },
  },
];

const EVENT_FILTERS: { key: Event; labelVi: string; labelEn: string; icon: string }[] = [
  { key: 'all', labelVi: 'Tất cả', labelEn: 'All Events', icon: '🏅' },
  { key: 'nui-dinh', labelVi: 'Trail Núi Dinh', labelEn: 'Nui Dinh Trail', icon: '⛰️' },
  { key: 'marathon-hue', labelVi: 'Marathon Huế', labelEn: 'Hue Marathon', icon: '🏛️' },
  { key: 'midnight', labelVi: 'Midnight Marathon', labelEn: 'Midnight Marathon', icon: '🌙' },
  { key: 'moc-chau', labelVi: 'Trail Mộc Châu', labelEn: 'Moc Chau Trail', icon: '🌿' },
  { key: 'vung-tau', labelVi: 'Marathon Vũng Tàu', labelEn: 'Vung Tau Marathon', icon: '🌊' },
];

// Thống kê thành tích của 2 vận động viên
const ATHLETE_STATS = {
  martin: {
    name: 'Hoàng Uy (Martin)',
    photo: '/hoanguy_marathon.jpg',
    role: { vi: 'Vận động viên Marathon & Trail', en: 'Marathon & Trail Athlete' },
    achievements: [
      { label: { vi: 'Marathon 42km', en: '42km Marathon' }, value: '4:40', icon: '🏆', color: 'text-emerald-400' },
      { label: { vi: 'Trail Núi Dinh', en: 'Nui Dinh Trail' }, value: '>37km', icon: '⛰️', color: 'text-cyan-400' },
      { label: { vi: 'D+ Núi Dinh', en: 'Nui Dinh Gain' }, value: '+1,850m', icon: '📈', color: 'text-amber-400' },
      { label: { vi: 'Mộc Châu Trail', en: 'Moc Chau Trail' }, value: '21km', icon: '🌿', color: 'text-rose-400' },
    ],
  },
  tuyet: {
    name: 'Tuyết Nguyễn',
    photo: '/05.jpg',
    role: { vi: 'Nữ vận động viên Marathon & Trail', en: 'Female Marathon & Trail Athlete' },
    achievements: [
      { label: { vi: 'Half Marathon 21km PR', en: '21km Half Marathon PR' }, value: '2:14', icon: '🥇', color: 'text-emerald-400' },
      { label: { vi: 'Trail Núi Dinh', en: 'Nui Dinh Trail' }, value: '>37km', icon: '⛰️', color: 'text-cyan-400' },
      { label: { vi: 'D+ Núi Dinh', en: 'Nui Dinh Gain' }, value: '+1,850m', icon: '📈', color: 'text-amber-400' },
      { label: { vi: 'Marathon Huế', en: 'Hue Marathon' }, value: '21km', icon: '🏛️', color: 'text-rose-400' },
    ],
  },
};

export const MocChauFeatureSection = () => {
  const { lang } = useLang();
  const [activeFilter, setActiveFilter] = useState<Event>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [activeAthleteTab, setActiveAthleteTab] = useState<'martin' | 'tuyet'>('martin');

  // Keyboard navigation for Lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      } else if (e.key === 'ArrowLeft') {
        const currIndex = PHOTOS.findIndex(p => p.src === selectedPhoto.src);
        const prevIndex = (currIndex - 1 + PHOTOS.length) % PHOTOS.length;
        setSelectedPhoto(PHOTOS[prevIndex]);
      } else if (e.key === 'ArrowRight') {
        const currIndex = PHOTOS.findIndex(p => p.src === selectedPhoto.src);
        const nextIndex = (currIndex + 1) % PHOTOS.length;
        setSelectedPhoto(PHOTOS[nextIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  // Handle modal navigation
  const currentIndex = selectedPhoto ? PHOTOS.findIndex(p => p.src === selectedPhoto.src) : -1;
  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + PHOTOS.length) % PHOTOS.length;
    setSelectedPhoto(PHOTOS[prevIndex]);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % PHOTOS.length;
    setSelectedPhoto(PHOTOS[nextIndex]);
  };

  // Ảnh bìa chính luôn là #08
  const coverPhoto = PHOTOS[0];

  const filteredPhotos = activeFilter === 'all'
    ? PHOTOS.slice(1) // Bỏ ảnh bìa khỏi gallery chính vì đã hiển thị ở trên
    : PHOTOS.slice(1).filter(p => p.event === activeFilter);

  return (
    <section
      id="moc-chau-2026"
      className="relative z-10 w-full bg-gradient-to-b from-black via-neutral-950 to-neutral-950 text-white border-b border-white/10"
    >
      {/* ============================================================
          HERO IMAGE — ẢNH BÌA CHÍNH (#08): 2 VDV NAM & NỮ
      ============================================================ */}
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-neutral-950 py-12 sm:py-16 lg:py-20 px-5 sm:px-8 md:px-12 border-b border-white/10">
        {/* Subtle atmospheric ambient glow behind */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* === CỘT TRÁI (6 cols): NỘI DUNG & THÀNH TÍCH (Không che mặt) === */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono text-xs mb-5 w-fit tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                {lang === 'vi' ? '🏃 HÀNH TRÌNH CHẠY & CHINH PHỤC' : '🏃 RUNNING & CONQUEST JOURNEY'}
              </div>

              {/* Main Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
                {lang === 'vi' ? (
                  <>
                    <span className="text-emerald-400">Trail Núi Dinh</span>
                    <br />
                    <span className="text-white/90 text-2xl sm:text-3xl lg:text-4xl font-light">
                      & Những Cuộc Đua Truyền Cảm Hứng
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-emerald-400">Nui Dinh Trail</span>
                    <br />
                    <span className="text-white/90 text-2xl sm:text-3xl lg:text-4xl font-light">
                      & Inspiring Race Stories
                    </span>
                  </>
                )}
              </h1>

              {/* Quote */}
              <blockquote className="text-emerald-300/90 font-mono text-sm sm:text-base italic mb-6 border-l-2 border-emerald-400 pl-4 py-1">
                {lang === 'vi'
                  ? '"Cùng nhau chạm tới giới hạn — rồi vượt qua nó."'
                  : '"Together we reach our limits — then break through them."'}
              </blockquote>

              {/* Intro Description */}
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
                {lang === 'vi'
                  ? 'Hai vận động viên Martin Hoàng Uy và Tuyết Nguyễn cùng nhau chinh phục những cung đường thử thách nhất: từ sự khắc nghiệt của Trail Núi Dinh (>37km, +1.850m D+), sự bùng nổ tại Marathon Huế và Midnight HCMC, đến vẻ đẹp thuần khiết của Trail Mộc Châu 21km.'
                  : 'Athletes Martin Hoang Uy and Tuyet Nguyen conquering the toughest routes together: from the relentless Nui Dinh Trail (>37km, +1,850m D+), electric atmosphere of Hue & Midnight HCMC Marathons, to the pristine beauty of Moc Chau 21km Trail.'}
              </p>

              {/* Stats Grid — 5 Thống kê nổi bật */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                <div className="bg-neutral-900/80 backdrop-blur-sm border border-white/10 border-l-4 border-l-emerald-500 p-3.5 rounded-xl">
                  <span className="text-[10px] sm:text-xs text-neutral-400 font-mono block uppercase tracking-wider">
                    {lang === 'vi' ? '⛰️ Trail Núi Dinh' : '⛰️ Nui Dinh'}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-white font-mono">&gt;37 km</span>
                </div>

                <div className="bg-neutral-900/80 backdrop-blur-sm border border-white/10 border-l-4 border-l-cyan-500 p-3.5 rounded-xl">
                  <span className="text-[10px] sm:text-xs text-neutral-400 font-mono block uppercase tracking-wider">
                    {lang === 'vi' ? '📈 Độ cao leo' : '📈 Total Gain'}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-cyan-300 font-mono">+1,850 m</span>
                </div>

                <div className="bg-neutral-900/80 backdrop-blur-sm border border-white/10 border-l-4 border-l-amber-500 p-3.5 rounded-xl">
                  <span className="text-[10px] sm:text-xs text-neutral-400 font-mono block uppercase tracking-wider">
                    {lang === 'vi' ? '🏆 Nam 42km PR' : '🏆 Male 42km PR'}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-amber-300 font-mono">4:40</span>
                </div>

                <div className="bg-neutral-900/80 backdrop-blur-sm border border-white/10 border-l-4 border-l-rose-500 p-3.5 rounded-xl">
                  <span className="text-[10px] sm:text-xs text-neutral-400 font-mono block uppercase tracking-wider">
                    {lang === 'vi' ? '🥇 Nữ 21km PR' : '🥇 Female 21km PR'}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-rose-300 font-mono">2:14</span>
                </div>

                <div className="col-span-2 sm:col-span-1 bg-neutral-900/80 backdrop-blur-sm border border-white/10 border-l-4 border-l-purple-500 p-3.5 rounded-xl">
                  <span className="text-[10px] sm:text-xs text-neutral-400 font-mono block uppercase tracking-wider">
                    {lang === 'vi' ? '🌿 Mộc Châu Trail' : '🌿 Moc Chau'}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-purple-300 font-mono">21 km</span>
                </div>
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="#gallery-heading"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all shadow-lg shadow-emerald-500/20"
                >
                  <span>📸</span>
                  <span>{lang === 'vi' ? 'Xem Bộ Sưu Tập Ảnh' : 'View Photo Gallery'}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(PHOTOS[0])}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all cursor-pointer"
                >
                  <span>🔍</span>
                  <span>{lang === 'vi' ? 'Xem Ảnh Bìa Toàn Cảnh' : 'View Full Cover Photo'}</span>
                </button>
              </div>
            </div>

            {/* === CỘT PHẢI (6 cols): ẢNH BÌA CHÍNH (#08) TRỌN VẸN 2 KHUÔN MẶT === */}
            <div className="lg:col-span-6 z-10">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-emerald-950/40 bg-neutral-900 group">
                {/* Image Container with precise portrait ratio & framing */}
                <div className="relative w-full aspect-square sm:aspect-[4/5] overflow-hidden">
                  <img
                    src="/08.jpg"
                    alt="Martin & Tuyết — Trail Núi Dinh"
                    className="w-full h-full object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />

                  {/* Gradient overlays that don't obscure faces */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                  {/* Badges on the image corners */}
                  {/* Top Header Badge */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Trail Núi Dinh &gt;37km
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white/80">
                      Ảnh bìa chính #08
                    </span>
                  </div>

                  {/* Bottom Athletes Tag Cards */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row gap-2 justify-between pointer-events-none">
                    {/* Martin Tag */}
                    <div className="flex items-center gap-2.5 bg-black/80 backdrop-blur-md border border-emerald-500/40 rounded-2xl px-3.5 py-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      <div>
                        <span className="text-white font-bold text-xs sm:text-sm block leading-none">Hoàng Uy (Martin)</span>
                        <span className="text-emerald-400 font-mono text-[10px]">Marathon 4:40 · &gt;37km Trail</span>
                      </div>
                    </div>

                    {/* Tuyết Tag */}
                    <div className="flex items-center gap-2.5 bg-black/80 backdrop-blur-md border border-rose-500/40 rounded-2xl px-3.5 py-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400 flex-shrink-0" />
                      <div>
                        <span className="text-white font-bold text-xs sm:text-sm block leading-none">Tuyết Nguyễn</span>
                        <span className="text-rose-400 font-mono text-[10px]">PR 21km 2:14 · &gt;37km Trail</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ============================================================
          ATHLETE PROFILES SECTION
      ============================================================ */}
      <div className="py-16 px-5 sm:px-8 md:px-12 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">// VẬN ĐỘNG VIÊN</span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white mt-2">
                {lang === 'vi' ? 'Hai Vận Động Viên — Một Hành Trình' : 'Two Athletes — One Journey'}
              </h2>
              <p className="text-neutral-400 mt-3 max-w-xl mx-auto text-sm">
                {lang === 'vi'
                  ? 'Cùng nhau chinh phục từ đường nhựa đến núi rừng, từ bình minh đến nửa đêm.'
                  : 'Together conquering from asphalt to mountains, from dawn to midnight.'}
              </p>
            </div>
          </Reveal>

          {/* Tab switcher */}
          <div className="flex gap-2 justify-center mb-8">
            {(['martin', 'tuyet'] as const).map(athlete => (
              <button
                key={athlete}
                type="button"
                onClick={() => setActiveAthleteTab(athlete)}
                className={`px-6 py-2 rounded-full font-mono text-sm font-semibold transition-all cursor-pointer ${
                  activeAthleteTab === athlete
                    ? 'bg-emerald-500 text-black'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {athlete === 'martin' ? 'Martin' : 'Tuyết'}
              </button>
            ))}
          </div>

          {/* Athlete Card */}
          {(['martin', 'tuyet'] as const).map(athleteKey => {
            const athlete = ATHLETE_STATS[athleteKey];
            if (athleteKey !== activeAthleteTab) return null;
            return (
              <Reveal key={athleteKey}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Photo */}
                  <div className="relative rounded-3xl overflow-hidden border border-white/20 aspect-[3/4] bg-neutral-900 group">
                    <img
                      src={athlete.photo}
                      alt={athlete.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white text-2xl font-bold">{athlete.name}</h3>
                      <p className="text-emerald-400 text-sm font-mono">{lang === 'vi' ? athlete.role.vi : athlete.role.en}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">{athlete.name}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {athleteKey === 'martin'
                        ? (lang === 'vi'
                          ? 'Martin – vận động viên marathon và trail runner với tinh thần thép và đôi chân không mệt. Hoàn thành 42km Marathon trong 4:40, chinh phục Trail Núi Dinh >37km với +1,850m gain và trail Mộc Châu 21km. Mỗi cuộc đua là một trang nhật ký mới.'
                          : 'Martin – marathon and trail runner with an iron spirit and tireless legs. Completed 42km Marathon in 4:40, conquered Nui Dinh Trail >37km with +1,850m gain and Moc Chau 21km trail. Every race is a new journal page.')
                        : (lang === 'vi'
                          ? 'Tuyết – nữ vận động viên kiên trì và truyền cảm hứng. PR 21km Half Marathon trong 2:14, chinh phục Trail Núi Dinh >37km +1,850m gain và Marathon Huế. Luôn cười rạng rỡ dù ở km cuối hay đỉnh núi cao nhất.'
                          : 'Tuyet – persistent and inspiring female athlete. 21km Half Marathon PR in 2:14, conquered Nui Dinh Trail >37km +1,850m gain and Hue Marathon. Always smiling brightly whether at the final km or the highest peak.')}
                    </p>

                    {/* Achievement Cards */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {athlete.achievements.map((ach, i) => (
                        <div key={i} className="bg-neutral-900 border border-white/10 rounded-2xl p-4 text-center">
                          <span className="text-2xl block mb-1">{ach.icon}</span>
                          <span className={`text-2xl font-bold font-mono ${ach.color}`}>{ach.value}</span>
                          <p className="text-[11px] text-neutral-500 uppercase tracking-wide mt-1">
                            {lang === 'vi' ? ach.label.vi : ach.label.en}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* ============================================================
          PHOTO GALLERY — TẤT CẢ SỰ KIỆN
      ============================================================ */}
      <div id="gallery-heading" className="py-16 px-5 sm:px-8 md:px-12">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">// NHẬT KÝ HÀNH TRÌNH</span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white mt-2">
                {lang === 'vi' ? 'Từng Khoảnh Khắc Đáng Nhớ' : 'Every Memorable Moment'}
              </h2>
            </div>
          </Reveal>

          {/* Event Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {EVENT_FILTERS.map(f => (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveFilter(f.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer border ${
                  activeFilter === f.key
                    ? 'bg-emerald-500 text-black border-emerald-500'
                    : 'bg-white/5 text-white/60 border-white/15 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{f.icon}</span>
                <span>{lang === 'vi' ? f.labelVi : f.labelEn}</span>
              </button>
            ))}
          </div>

          {/* Photo Grid — Uniform aspect ratio cards so grid is perfectly balanced */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredPhotos.map((photo, idx) => (
              <Reveal key={`${photo.src}-${idx}`} delay={((idx % 3) * 100) as 0 | 100 | 200}>
                <div
                  className="group relative rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 cursor-pointer hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-emerald-950/40"
                  onClick={() => setSelectedPhoto(photo)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setSelectedPhoto(photo)}
                >
                  {/* Aspect ratio container for balanced cards */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-950">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                    {/* Event Badge */}
                    <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap z-10 pointer-events-none">
                      {photo.event !== 'all' && (
                        <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white/90 shadow-md">
                          {EVENT_FILTERS.find(f => f.key === photo.event)?.icon}{' '}
                          {lang === 'vi'
                            ? EVENT_FILTERS.find(f => f.key === photo.event)?.labelVi
                            : EVENT_FILTERS.find(f => f.key === photo.event)?.labelEn}
                        </span>
                      )}
                    </div>

                    {/* Caption on hover/bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10 pointer-events-none">
                      <p className="text-white text-sm font-medium leading-snug line-clamp-2 group-hover:line-clamp-none transition-all">
                        {lang === 'vi' ? photo.captionVi : photo.captionEn}
                      </p>
                      {photo.quote && (
                        <p className="text-emerald-300 text-xs italic mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono">
                          {lang === 'vi' ? photo.quote.vi : photo.quote.en}
                        </p>
                      )}
                    </div>

                    {/* Expand Icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.8">
                        <path d="M1.5 5.5V1.5h4M8.5 1.5h4v4M12.5 8.5v4h-4M5.5 12.5h-4v-4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================
          LIGHTBOX MODAL — Xem ảnh toàn màn hình trọn vẹn (Không mất cảnh, Không bị lệch)
      ============================================================ */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl sm:rounded-3xl bg-neutral-950 border border-white/20 shadow-2xl shadow-black overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Controls Header */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center gap-2">
              {currentIndex !== -1 && (
                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono text-emerald-400">
                  {currentIndex + 1} / {PHOTOS.length}
                </span>
              )}
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="w-10 h-10 rounded-full bg-black/80 hover:bg-emerald-500 hover:text-black border border-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer font-bold shadow-lg"
                title={lang === 'vi' ? 'Đóng (Esc)' : 'Close (Esc)'}
              >
                ✕
              </button>
            </div>

            {/* Navigation Arrow Left */}
            <button
              type="button"
              onClick={handlePrevPhoto}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-emerald-500 hover:text-black border border-white/30 backdrop-blur-md flex items-center justify-center text-white text-lg transition-all cursor-pointer shadow-xl"
              title={lang === 'vi' ? 'Ảnh trước (←)' : 'Previous photo (←)'}
            >
              ❮
            </button>

            {/* Navigation Arrow Right */}
            <button
              type="button"
              onClick={handleNextPhoto}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-emerald-500 hover:text-black border border-white/30 backdrop-blur-md flex items-center justify-center text-white text-lg transition-all cursor-pointer shadow-xl"
              title={lang === 'vi' ? 'Ảnh sau (→)' : 'Next photo (→)'}
            >
              ❯
            </button>

            {/* Full Image Container - OBJECT-CONTAIN guarantees full scene view without cropping or displacement */}
            <div className="relative w-full flex-1 min-h-[45vh] max-h-[68vh] sm:max-h-[72vh] bg-black/95 p-3 sm:p-6 flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="max-w-full max-h-[65vh] sm:max-h-[68vh] w-auto h-auto object-contain mx-auto my-auto block rounded-lg shadow-2xl transition-all duration-300"
                loading="eager"
              />
            </div>

            {/* Modal Content Footer */}
            <div className="p-5 sm:p-6 shrink-0 overflow-y-auto max-h-[25vh] bg-neutral-950 border-t border-white/10">
              {/* Event + Person Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono border border-emerald-500/30">
                  {EVENT_FILTERS.find(f => f.key === selectedPhoto.event)?.icon}{' '}
                  {lang === 'vi'
                    ? EVENT_FILTERS.find(f => f.key === selectedPhoto.event)?.labelVi
                    : EVENT_FILTERS.find(f => f.key === selectedPhoto.event)?.labelEn}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-mono border border-white/15">
                  👤 {selectedPhoto.person === 'both'
                    ? 'Martin & Tuyết'
                    : selectedPhoto.person === 'martin' ? 'Hoàng Uy (Martin)' : 'Tuyết Nguyễn'}
                </span>
              </div>

              {/* Caption */}
              <p className="text-white text-sm sm:text-base leading-relaxed mb-3">
                {lang === 'vi' ? selectedPhoto.captionVi : selectedPhoto.captionEn}
              </p>

              {/* Quote */}
              {selectedPhoto.quote && (
                <blockquote className="border-l-2 border-emerald-500 pl-4 text-emerald-300 italic font-mono text-xs sm:text-sm">
                  {lang === 'vi' ? selectedPhoto.quote.vi : selectedPhoto.quote.en}
                </blockquote>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
