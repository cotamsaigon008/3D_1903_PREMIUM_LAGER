import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Reveal } from './Reveal';

export const ChallengesSection = () => {
  const { lang, t } = useLang();
  const ch = t.challenges;
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>([]);

  const toggleJoin = (id: string) => {
    setJoinedChallenges((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section id="challenges" className="relative z-10 w-full py-20 px-5 sm:px-8 md:px-10 bg-neutral-950 text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <Reveal>
            <p className="text-xs sm:text-sm font-mono tracking-widest text-amber-400 mb-2 uppercase">
              {ch.tag[lang]}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {ch.title[lang]}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-neutral-400 max-w-2xl text-base sm:text-lg">
              {ch.desc[lang]}
            </p>
          </Reveal>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ch.list.map((item, idx) => {
            const isJoined = joinedChallenges.includes(item.id);
            return (
              <Reveal key={item.id} delay={((Math.min(idx * 100, 300)) as 0 | 100 | 200 | 300)}>
                <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/50 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between h-full group">
                  <div>
                    {/* Icon & Title */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{item.icon}</span>
                      <h3 className="text-xl sm:text-2xl font-medium text-white group-hover:text-amber-300 transition-colors">
                        {item.title[lang]}
                      </h3>
                    </div>

                    <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                      {item.desc[lang]}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-2 mb-6 p-4 rounded-xl bg-neutral-950 border border-white/5">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-neutral-400">{item.current}</span>
                        <span className="text-amber-400 font-bold">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-orange-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-400">👥 {item.participants}</span>
                    <button
                      type="button"
                      onClick={() => toggleJoin(item.id)}
                      className={`text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-full border transition-all cursor-pointer ${
                        isJoined
                          ? 'bg-amber-500 text-black font-bold border-amber-400'
                          : 'bg-white/10 text-white border-white/20 hover:bg-amber-400 hover:text-black'
                      }`}
                    >
                      {isJoined ? (lang === 'vi' ? '✓ Đã Tham Gia' : '✓ Joined') : ch.joinBtn[lang]}
                    </button>
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
