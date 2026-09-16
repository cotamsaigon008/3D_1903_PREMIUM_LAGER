import { useLang } from '../context/LanguageContext';
import { Reveal } from './Reveal';

export const OpeningsSection = () => {
  const { lang, t } = useLang();
  const ch = t.challenges;

  return (
    <section id="openings" className="relative z-[2] w-full py-24 sm:py-32 px-5 sm:px-8 md:px-10 border-t border-white/10 bg-black/95 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <Reveal variant="left">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">{ch.tag[lang]}</span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mt-2" style={{ fontFamily: 'var(--font-heading)' }}>{ch.title[lang]}</h2>
          </Reveal>
          <Reveal variant="right" delay={200}>
            <p className="max-w-md text-neutral-400 text-sm sm:text-base leading-relaxed">{ch.desc[lang]}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ch.list.map((item, i) => (
            <Reveal key={item.id} delay={((Math.min(i * 100, 300)) as 0 | 100 | 200 | 300)}>
              <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl sm:text-2xl font-medium text-white mb-2">{item.title[lang]}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6">{item.desc[lang]}</p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400">{item.current}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
