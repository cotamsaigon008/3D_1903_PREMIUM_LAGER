import { useState } from 'react';
import { Reveal } from './Reveal';
import { useLang } from '../context/LanguageContext';

export const ShopSection = () => {
  const { lang, t } = useLang();
  const gear = t.gear;
  const [favoriteGear, setFavoriteGear] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavoriteGear((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section id="gear" className="relative z-[2] w-full py-24 sm:py-32 px-5 sm:px-8 md:px-10 border-t border-white/10 bg-black/95 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <Reveal variant="left">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">{gear.tag[lang]}</span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mt-2" style={{ fontFamily: 'var(--font-heading)' }}>{gear.title[lang]}</h2>
            <p className="text-xs font-mono text-neutral-400 mt-2">{gear.desc[lang]}</p>
          </Reveal>
          <Reveal variant="right" delay={200}>
            <span className="text-xs font-mono text-neutral-500">{gear.imageNote[lang]}</span>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gear.items.map((prod, i) => {
            const isFav = favoriteGear.includes(prod.id);
            return (
              <Reveal key={prod.id} delay={((Math.min(i * 100, 400)) as 0 | 100 | 200 | 300 | 400)}>
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono text-neutral-400 mb-4">
                      <span>{prod.id}</span>
                      <span className="text-emerald-400 font-bold">{prod.price}</span>
                    </div>

                    {/* Image Placeholder */}
                    <div className="w-full h-40 mb-4 rounded-xl bg-neutral-900 border border-white/10 flex flex-col items-center justify-center p-3 text-center group-hover:border-emerald-500/40 transition-colors">
                      <svg className="w-7 h-7 text-neutral-500 mb-2 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {lang === 'vi' ? '[HÌNH SẢN PHẨM KHUYÊN DÙNG]' : '[RECOMMENDED GEAR PHOTO]'}
                      </span>
                      <span className="text-[9px] text-neutral-600 mt-0.5">
                        {prod.type[lang]}
                      </span>
                    </div>

                    <h3 className="text-lg font-medium text-white mb-1 group-hover:text-emerald-300 transition-colors">{prod.title[lang]}</h3>
                    <span className="text-xs font-mono text-neutral-400 block mb-3">{prod.type[lang]}</span>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-6">{prod.desc[lang]}</p>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-400">{prod.status[lang]}</span>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(prod.id)}
                      className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                        isFav
                          ? 'bg-emerald-500 text-black font-bold border-emerald-400'
                          : 'bg-transparent text-neutral-300 border-white/20 hover:border-emerald-400 hover:text-emerald-400'
                      }`}
                    >
                      {isFav ? '❤️ Saved' : '🤍 Save'}
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
