import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Reveal } from './Reveal';

export const RaceCalendarSection = () => {
  const { lang, t } = useLang();
  const rc = t.raceLog;
  const [activeFilter, setActiveFilter] = useState<string>('Tất cả');

  const filters = rc.filters[lang];

  const filteredEvents = rc.events.filter((ev: any) => {
    if (activeFilter === 'Tất cả' || activeFilter === 'All Events') return true;
    if (activeFilter === 'Đã hoàn thành' || activeFilter === 'Completed') return ev.status === 'Completed';
    if (activeFilter === 'Sắp tới' || activeFilter === 'Upcoming') return ev.status === 'Upcoming' || ev.status === 'Registered';
    if (activeFilter === 'Road') return ev.category === 'Road';
    if (activeFilter === 'Trail') return ev.category === 'Trail';
    return true;
  });

  return (
    <section id="racelog" className="relative z-10 w-full py-20 px-5 sm:px-8 md:px-10 bg-black text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <Reveal>
            <p className="text-xs sm:text-sm font-mono tracking-widest text-emerald-400 mb-2 uppercase">
              {rc.tag[lang]}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {rc.title[lang]}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-neutral-400 max-w-2xl text-base sm:text-lg">
              {rc.desc[lang]}
            </p>
          </Reveal>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-white/10 pb-4">
          {filters.map((filterName) => (
            <button
              key={filterName}
              type="button"
              onClick={() => setActiveFilter(filterName)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-mono transition-all duration-200 cursor-pointer ${
                activeFilter === filterName
                  ? 'bg-emerald-500 text-black font-bold'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {filterName}
            </button>
          ))}
        </div>

        {/* Race Events List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((ev: any, idx: number) => {
            const isCompleted = ev.status === 'Completed';
            const isRegistered = ev.status === 'Registered';

            return (
              <Reveal key={ev.id} delay={((Math.min(idx * 100, 300)) as 0 | 100 | 200 | 300)}>
                <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between h-full group shadow-lg">
                  <div>
                    {/* Top Row: Category & Status */}
                    <div className="flex justify-between items-center text-xs font-mono mb-4">
                      <span className={`px-2.5 py-1 rounded font-semibold uppercase ${
                        ev.category === 'Road' ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30' : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                      }`}>
                        {ev.category}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : isRegistered
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      }`}>
                        {isCompleted
                          ? (lang === 'vi' ? '✓ Đã hoàn thành' : '✓ Completed')
                          : isRegistered
                          ? (lang === 'vi' ? '🎟️ Đã đăng ký' : '🎟️ Registered')
                          : (lang === 'vi' ? '⏳ Sắp diễn ra' : '⏳ Upcoming')}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors leading-snug">
                      {ev.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400 mb-4">
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{ev.distance}</span>
                      <span>•</span>
                      <span>📍 {ev.location}</span>
                      <span>•</span>
                      <span>📅 {ev.date}</span>
                    </div>

                    {/* Expo / Racekit Info */}
                    {ev.expoInfo && (
                      <div className="mb-3 p-3 rounded-xl bg-neutral-950 border border-white/10 text-xs font-mono text-cyan-300 flex items-start gap-2">
                        <span className="shrink-0 mt-0.5">🎪</span>
                        <span>{ev.expoInfo[lang]}</span>
                      </div>
                    )}

                    {/* Route Start / Finish Info */}
                    {ev.routeInfo && (
                      <div className="mb-3 p-3 rounded-xl bg-neutral-950 border border-white/10 text-xs font-mono text-emerald-300 flex items-start gap-2">
                        <span className="shrink-0 mt-0.5">🗺️</span>
                        <span>{ev.routeInfo[lang]}</span>
                      </div>
                    )}

                    {/* Target & Status info */}
                    <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-neutral-950 border border-white/5 mb-4 text-xs font-mono">
                      <div>
                        <span className="text-neutral-500 block mb-0.5">{lang === 'vi' ? 'Mục tiêu:' : 'Target:'}</span>
                        <span className="text-neutral-300 font-semibold">{ev.targetTime}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block mb-0.5">{lang === 'vi' ? 'Trạng thái:' : 'Status:'}</span>
                        <span className="text-emerald-400 font-bold">{ev.actualTime}</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed mb-3">
                      {ev.notes[lang]}
                    </p>

                    {/* Warning Alert Note */}
                    {ev.warning && (
                      <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs leading-relaxed font-mono mt-3">
                        {ev.warning[lang]}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
