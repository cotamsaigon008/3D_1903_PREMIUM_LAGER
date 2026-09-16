import { useLang } from '../context/LanguageContext';
import { Reveal } from './Reveal';

export const StatsDashboardSection = () => {
  const { lang, t } = useLang();
  const db = t.dashboard;

  return (
    <section id="dashboard" className="relative z-10 w-full py-20 px-5 sm:px-8 md:px-10 bg-neutral-950 text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-3 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {db.tag[lang]}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {db.title[lang]}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-neutral-400 max-w-2xl text-base sm:text-lg leading-relaxed">
              {db.desc[lang]}
            </p>
          </Reveal>
        </div>

        {/* Core Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <Reveal delay={100}>
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-emerald-500/40 transition-all">
              <span className="text-xs font-mono text-neutral-400 uppercase block mb-2">{db.stats.distance.label[lang]}</span>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-emerald-400">{db.stats.distance.value}</div>
              <span className="text-[11px] font-mono text-emerald-300/80 mt-1 block">✓ Strava Synced</span>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-cyan-500/40 transition-all">
              <span className="text-xs font-mono text-neutral-400 uppercase block mb-2">{db.stats.time.label[lang]}</span>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-cyan-400">{db.stats.time.value}</div>
              <span className="text-[11px] font-mono text-cyan-300/80 mt-1 block">~ 4.5 hrs / week</span>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-amber-500/40 transition-all">
              <span className="text-xs font-mono text-neutral-400 uppercase block mb-2">{db.stats.elevation.label[lang]}</span>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-amber-400">{db.stats.elevation.value}</div>
              <span className="text-[11px] font-mono text-amber-300/80 mt-1 block">2x Mt. Everest gain</span>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-purple-500/40 transition-all">
              <span className="text-xs font-mono text-neutral-400 uppercase block mb-2">{db.stats.longest.label[lang]}</span>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-purple-400">{db.stats.longest.value}</div>
              <span className="text-[11px] font-mono text-purple-300/80 mt-1 block">Dalat Ultra 2025</span>
            </div>
          </Reveal>
        </div>

        {/* PBs & Distribution Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* PB List */}
          <div className="lg:col-span-7 bg-neutral-900/40 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-medium text-white mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <span>{db.pbs.title[lang]}</span>
              <span className="text-xs font-mono text-emerald-400">4 Verified PB</span>
            </h3>

            <div className="space-y-4">
              {db.pbs.list.map((pb) => (
                <div key={pb.event} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all gap-2">
                  <div>
                    <span className="text-sm font-semibold text-white block">{pb.event}</span>
                    <span className="text-xs font-mono text-neutral-400">{pb.date}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Pace: {pb.pace}
                    </span>
                    <span className="text-2xl font-mono font-bold text-white tracking-tight">
                      {pb.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Distribution & Quote */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-neutral-900/40 border border-white/10 rounded-2xl p-6 sm:p-8">
              <h3 className="text-sm font-mono uppercase text-neutral-400 mb-4">{db.breakdown.title[lang]}</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-xs font-mono text-neutral-300">
                  <span>🛣️ Road Running (11 Races)</span>
                  <span className="text-emerald-400 font-bold">65%</span>
                </div>
                <div className="w-full bg-neutral-800 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-400 h-full w-[65%]" />
                  <div className="bg-cyan-400 h-full w-[35%]" />
                </div>
                <div className="flex justify-between text-xs font-mono text-neutral-300 pt-1">
                  <span>⛰️ Trail & Ultra (7 Races)</span>
                  <span className="text-cyan-400 font-bold">35%</span>
                </div>
              </div>
            </div>

            {/* Philosophy Quote */}
            <div className="bg-gradient-to-br from-emerald-950/40 to-neutral-900 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden">
              <span className="text-4xl text-emerald-500/20 font-serif absolute -top-2 left-4 select-none">“</span>
              <p className="text-sm sm:text-base text-neutral-200 italic leading-relaxed relative z-10 mb-3">
                {db.quote[lang]}
              </p>
              <span className="text-xs font-mono text-emerald-400 block font-semibold">
                — {db.quote.author}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
