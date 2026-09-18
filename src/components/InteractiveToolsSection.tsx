import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Reveal } from './Reveal';

type ToolTab = 'pace' | 'hydration' | 'checklist';

export const InteractiveToolsSection = () => {
  const { lang, t } = useLang();
  const [activeTab, setActiveTab] = useState<ToolTab>('pace');

  // Pace Calculator State
  const [distanceKm, setDistanceKm] = useState<number>(21.1);
  const [hours, setHours] = useState<number>(2);
  const [minutes, setMinutes] = useState<number>(0);

  // Hydration Calculator State
  const [bodyWeight, setBodyWeight] = useState<number>(65);
  const [durationHours, setDurationHours] = useState<number>(3);
  const [tempKey, setTempKey] = useState<'cool' | 'moderate' | 'hot'>('moderate');

  // Checklist State
  const [checklistCat, setChecklistCat] = useState<'road' | 'trail' | 'trek'>('trail');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Pace Calculations
  const totalMinutes = hours * 60 + minutes;
  const paceDec = distanceKm > 0 ? totalMinutes / distanceKm : 0;
  const paceMin = Math.floor(paceDec);
  const paceSec = Math.round((paceDec - paceMin) * 60);
  const formattedPace = distanceKm > 0 
    ? `${paceMin}'${paceSec < 10 ? '0' : ''}${paceSec}"`
    : '0\'00"';
  const speedKmh = totalMinutes > 0 ? ((distanceKm / totalMinutes) * 60).toFixed(1) : '0';
  const estZone2HR = Math.round(180 - 30); // Base estimate formula benchmark

  // Hydration Calculations
  const tempMultiplier = tempKey === 'cool' ? 0.6 : tempKey === 'moderate' ? 0.8 : 1.1;
  const fluidLiters = ((bodyWeight * 0.01 * durationHours) * tempMultiplier).toFixed(1);
  const carbsGrams = Math.round(durationHours * 60 * 0.8); // ~50-60g carbs/hr
  const gelsCount = Math.ceil(carbsGrams / 25);
  const sodiumMg = Math.round(durationHours * 500 * tempMultiplier);

  // Checklist Data
  const gearItems = {
    road: [
      { id: 'r1', en: 'Lightweight road running shoes with good cushioning', vi: 'Giày chạy bộ đường bằng nhẹ, độ nảy tốt' },
      { id: 'r2', en: 'Moisture-wicking singlet & running shorts', vi: 'Áo singlet thoáng khí & quần shorts chạy bộ' },
      { id: 'r3', en: 'GPS running watch (Garmin/Coros/Apple)', vi: 'Đồng hồ GPS đo nhịp tim & pace' },
      { id: 'r4', en: '2-3 Energy gels for half marathon / 5-6 for full marathon', vi: '2-3 gói Gel dinh dưỡng (21km) hoặc 5-6 gói (42km)' },
      { id: 'r5', en: 'Anti-chafing balm & race bib belt', vi: 'Sáp chống phồng rộp & đai đeo BIB' },
    ],
    trail: [
      { id: 't1', en: 'Trail running shoes with deep lugs (>4mm)', vi: 'Giày chạy trail có gai bám địa hình sâu (>4mm)' },
      { id: 't2', en: 'Hydration vest (5L - 12L) with soft flasks', vi: 'Vest nước chạy trail (5L - 12L) kèm 2 bình nước mềm' },
      { id: 't3', en: 'Foldable carbon trekking poles', vi: 'Gậy carbon leo núi gập gọn nhẹ' },
      { id: 't4', en: 'Headlamp (>400 lumens) & spare battery', vi: 'Đèn đội đầu siêu sáng (>400 lumens) + pin dự phòng' },
      { id: 't5', en: 'Emergency whistle, foil blanket & basic first-aid kit', vi: 'Còi cứu hộ, chăn nhiệt cấp cứu & hộp y tế cá nhân' },
      { id: 't6', en: 'Electrolyte salt tabs & energy gels', vi: 'Viên muối điện giải & gel năng lượng' },
    ],
    trek: [
      { id: 'k1', en: 'Sturdy 35-50L waterproof trekking backpack', vi: 'Balo trekking 35L-50L chống nước có khung trợ lực' },
      { id: 'k2', en: 'Waterproof Gore-Tex hiking boots & merino wool socks', vi: 'Giày cổ cao chống nước Gore-Tex & tất len merino' },
      { id: 'k3', en: '3-Layer system: Base wicking, Fleece mid, Rain shell', vi: 'Trang phục 3 lớp: Lớp lót - Lớp giữ nhiệt - Áo gió mưa' },
      { id: 'k4', en: 'Sleeping bag (0°C to 10°C rated) & compact mat', vi: 'Túi ngủ chịu nhiệt (0°C - 10°C) & đệm cách nhiệt' },
      { id: 'k5', en: 'Power bank 20,000mAh & Offline GPX maps app', vi: 'Sạc dự phòng 20,000mAh & App bản đồ GPX offline' },
      { id: 'k6', en: 'Water filter straw / purification tablets', vi: 'Ống lọc nước dã ngoại / viên khử trùng nước' },
    ],
  };

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="tools" className="relative z-10 w-full py-20 px-5 sm:px-8 md:px-10 bg-neutral-950 text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <Reveal>
            <p className="text-xs sm:text-sm font-mono tracking-widest text-emerald-400 mb-2 uppercase">
              {t.tools.tag[lang]}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t.tools.title[lang]}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-neutral-400 max-w-2xl text-base sm:text-lg">
              {t.tools.desc[lang]}
            </p>
          </Reveal>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('pace')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'pace'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
          >
            ⏱️ {t.tools.tabs.pace[lang]}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hydration')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'hydration'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
          >
            💧 {t.tools.tabs.hydration[lang]}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('checklist')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'checklist'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
          >
            🎒 {t.tools.tabs.checklist[lang]}
          </button>
        </div>

        {/* Tab 1: Pace Calculator */}
        {activeTab === 'pace' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-neutral-900/60 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-xl font-medium text-white flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block animate-pulse" />
                {t.tools.paceCalc.title[lang]}
              </h3>

              {/* Quick Distance Presets */}
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                  {t.tools.paceCalc.distanceLabel[lang]}
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {[
                    { label: '5K', val: 5 },
                    { label: '10K', val: 10 },
                    { label: '21.1K (Half)', val: 21.1 },
                    { label: '42.2K (Full)', val: 42.195 },
                    { label: '50K Ultra', val: 50 },
                    { label: '70K Ultra', val: 70 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setDistanceKm(preset.val)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        distanceKm === preset.val
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                          : 'bg-white/5 text-neutral-400 hover:bg-white/10'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Custom Distance Range Input */}
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="0.5"
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(parseFloat(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer h-2 bg-neutral-800 rounded-lg"
                  />
                  <span className="text-lg font-mono text-emerald-400 font-bold min-w-[70px] text-right">
                    {distanceKm} km
                  </span>
                </div>
              </div>

              {/* Time Input */}
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                  {t.tools.paceCalc.targetTime[lang]}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-neutral-500 block mb-1">{t.tools.paceCalc.hours[lang]}</span>
                    <input
                      type="number"
                      min="0"
                      max="48"
                      value={hours}
                      onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-neutral-950 border border-white/15 rounded-xl px-4 py-2.5 text-white font-mono text-lg focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 block mb-1">{t.tools.paceCalc.minutes[lang]}</span>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={minutes}
                      onChange={(e) => setMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                      className="w-full bg-neutral-950 border border-white/15 rounded-xl px-4 py-2.5 text-white font-mono text-lg focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Calculated Output Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950/40 to-neutral-900 border border-emerald-500/20 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-4">
                  ⚡ CALCULATED TARGETS
                </span>

                <div className="mb-6">
                  <span className="text-xs text-neutral-400 block mb-1">{t.tools.paceCalc.resultPace[lang]}</span>
                  <div className="text-4xl sm:text-5xl font-mono font-bold text-emerald-400 tracking-tight">
                    {formattedPace} <span className="text-sm font-normal text-neutral-400">{t.tools.paceCalc.minPerKm}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                  <div>
                    <span className="text-xs text-neutral-400 block mb-1">{t.tools.paceCalc.resultSpeed[lang]}</span>
                    <span className="text-xl font-mono font-semibold text-white">
                      {speedKmh} <span className="text-xs text-neutral-400">{t.tools.paceCalc.kmh}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block mb-1">{t.tools.paceCalc.zone2Estimate[lang]}</span>
                    <span className="text-xl font-mono font-semibold text-emerald-300">
                      ~{estZone2HR} <span className="text-xs text-neutral-400">{t.tools.paceCalc.bpm}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200/90 leading-relaxed">
                💡 {lang === 'vi' 
                  ? 'Mẹo: Đối với giải chạy trail có độ dốc cao (+1000m gain), hãy cộng thêm 20-30% thời gian so với pace chạy đường bằng.'
                  : 'Tip: For high elevation trail runs (+1000m gain), add 20-30% extra time compared to flat road pace.'}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Hydration & Nutrition */}
        {activeTab === 'hydration' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-neutral-900/60 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-xl font-medium text-white flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block animate-pulse" />
                {t.tools.hydrationCalc.title[lang]}
              </h3>

              {/* Weight & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                    {t.tools.hydrationCalc.weightLabel[lang]}
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="150"
                    value={bodyWeight}
                    onChange={(e) => setBodyWeight(Math.max(30, parseInt(e.target.value) || 65))}
                    className="w-full bg-neutral-950 border border-white/15 rounded-xl px-4 py-2.5 text-white font-mono text-lg focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                    {t.tools.hydrationCalc.durationLabel[lang]}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    step="0.5"
                    value={durationHours}
                    onChange={(e) => setDurationHours(Math.max(0.5, parseFloat(e.target.value) || 1))}
                    className="w-full bg-neutral-950 border border-white/15 rounded-xl px-4 py-2.5 text-white font-mono text-lg focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Weather Condition selector */}
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                  {t.tools.hydrationCalc.tempLabel[lang]}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {t.tools.hydrationCalc.tempOptions.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setTempKey(opt.key as any)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        tempKey === opt.key
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                          : 'bg-white/5 text-neutral-400 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {opt.label[lang]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hydration Result Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-cyan-950/40 to-neutral-900 border border-cyan-500/20 rounded-xl p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                  💧 NUTRITION & FLUID PLAN
                </span>

                <div className="border-b border-white/10 pb-3">
                  <span className="text-xs text-neutral-400 block mb-1">{t.tools.hydrationCalc.waterResult[lang]}</span>
                  <div className="text-3xl font-mono font-bold text-cyan-400">
                    {fluidLiters} <span className="text-sm text-neutral-300">{t.tools.hydrationCalc.liters}</span>
                  </div>
                  <span className="text-[11px] text-neutral-500 block mt-0.5">
                    (~{Math.round((parseFloat(fluidLiters) / durationHours) * 1000)} ml / hour)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 border-b border-white/10 pb-3">
                  <div>
                    <span className="text-xs text-neutral-400 block mb-1">{t.tools.hydrationCalc.carbResult[lang]}</span>
                    <span className="text-xl font-mono font-semibold text-white">{carbsGrams}g</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block mb-1">{t.tools.hydrationCalc.gelResult[lang]}</span>
                    <span className="text-xl font-mono font-semibold text-amber-400">{gelsCount} gels</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-neutral-400 block mb-1">{t.tools.hydrationCalc.sodiumResult[lang]}</span>
                  <span className="text-xl font-mono font-semibold text-cyan-300">{sodiumMg} mg</span>
                </div>
              </div>

              <div className="mt-6 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200/90 leading-relaxed">
                💧 {lang === 'vi' 
                  ? 'Nên uống từng ngụm nhỏ 100-150ml mỗi 15-20 phút thay vì uống dồn dập lượng lớn để tránh xóc hông.' 
                  : 'Sip 100-150ml every 15-20 minutes continuously rather than chugging large amounts.'}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Gear Packing Checklist */}
        {activeTab === 'checklist' && (
          <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-medium text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block animate-pulse" />
                  {t.tools.checklistTool.title[lang]}
                </h3>
              </div>

              {/* Activity Selector */}
              <div className="flex flex-wrap gap-2">
                {t.tools.checklistTool.categories.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setChecklistCat(cat.key as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      checklistCat === cat.key
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                        : 'bg-white/5 text-neutral-400 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {cat.label[lang]}
                  </button>
                ))}
              </div>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {gearItems[checklistCat].map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer select-none ${
                      isChecked
                        ? 'bg-amber-500/10 border-amber-500/40 text-neutral-300 line-through opacity-75'
                        : 'bg-neutral-950/80 border-white/10 hover:border-amber-400/50 text-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-1 accent-amber-400 w-4 h-4 rounded cursor-pointer shrink-0"
                    />
                    <span className="text-sm leading-relaxed">{item[lang]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
