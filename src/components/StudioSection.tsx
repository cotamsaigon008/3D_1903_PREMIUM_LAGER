import { useLang } from '../context/LanguageContext';
import { Reveal } from './Reveal';

export const StudioSection = () => {
  const { lang, t } = useLang();
  const rc = t.raceLog;

  return (
    <section id="studio" className="relative z-[2] w-full py-24 sm:py-32 px-5 sm:px-8 md:px-10 border-t border-white/10 bg-black/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <Reveal variant="left">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">{rc.tag[lang]}</span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mt-2" style={{ fontFamily: 'var(--font-heading)' }}>{rc.title[lang]}</h2>
          </Reveal>
        </div>

        <div className="space-y-4">
          {rc.events.map((ev, i) => (
            <Reveal key={ev.id} delay={((Math.min(i * 100, 300)) as 0 | 100 | 200 | 300)}>
              <div className="group p-6 rounded-2xl border border-white/10 bg-white/[0.01]">
                <h3 className="text-2xl font-medium text-white mb-2">{ev.title}</h3>
                <p className="text-sm text-neutral-300">{ev.notes[lang]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
