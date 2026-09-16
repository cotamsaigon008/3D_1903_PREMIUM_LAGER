import { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { ActionDrawer, type DrawerType } from './ActionDrawer';
import { useLang } from '../context/LanguageContext';

export const HeroSection = () => {
  const { lang, t } = useLang();
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);

  const { displayed, done } = useTypewriter(t.hero.typewriter[lang], 35, 500);

  useEffect(() => {
    const timer = setTimeout(() => setButtonsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('martin.uy@lifeos.vn');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <>
      <section className="relative z-[1] w-full min-h-screen pt-28 pb-16 flex flex-col justify-center px-5 sm:px-8 md:px-12">
        <div className="max-w-4xl relative z-10 w-full">
          {/* Badge indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] sm:text-xs mb-6 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            {t.hero.badge[lang]}
          </div>

          {/* Tagline / Subtitle */}
          <h1
            className="text-white mb-6 font-light tracking-tight"
            style={{ fontSize: 'clamp(28px, 5.5vw, 56px)', lineHeight: 1.15 }}
          >
            <span className="text-white font-bold">{t.hero.tagline[lang]}</span>
            <br />
            <span className="text-neutral-400 font-normal text-2xl sm:text-4xl">{t.hero.subtitle[lang]}</span>
          </h1>

          {/* Typewriter intro */}
          <p
            className="text-neutral-300 mb-8 max-w-2xl text-base sm:text-xl font-light leading-relaxed"
            aria-live="polite"
          >
            {displayed}
            {!done && (
              <span className="inline-block w-[2px] h-[1.1em] bg-emerald-400 align-middle ml-[2px] animate-blink" aria-hidden="true" />
            )}
          </p>

          {/* Live Personal Telemetry Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 p-5 rounded-2xl bg-neutral-900/60 border border-white/10 backdrop-blur-sm max-w-3xl">
            {t.hero.metrics.map((m, i) => (
              <div key={i} className="border-l-2 border-emerald-500/60 pl-3">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-white block">
                  {m.value}
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  {m.label[lang]}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Action Pills */}
          <div
            className="flex flex-wrap items-center gap-2"
            style={{
              transition: 'opacity 0.4s ease, transform 0.4s ease',
              opacity: buttonsVisible ? 1 : 0,
              transform: buttonsVisible ? 'translateY(0)' : 'translateY(8px)',
              pointerEvents: buttonsVisible ? 'auto' : 'none',
            }}
          >
            {t.hero.pills[lang].map((label, i) => (
              <a
                key={label}
                href={i === 0 ? '#dashboard' : i === 1 ? '#dashboard' : i === 2 ? '#racelog' : i === 3 ? '#knowledge' : '#tools'}
                className="inline-flex items-center justify-center bg-white/10 hover:bg-emerald-500 hover:text-black border border-white/20 text-white rounded-full text-xs sm:text-sm px-4 py-2 font-mono transition-all duration-200 cursor-pointer select-none"
              >
                {label}
              </a>
            ))}

            {/* Email Copy Button */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="group inline-flex items-center justify-center text-white bg-transparent border border-white/30 rounded-full text-xs sm:text-sm px-4 py-2 font-mono gap-2 hover:bg-white hover:text-black transition-all duration-200 cursor-pointer select-none relative"
            >
              <span>
                {t.hero.emailLabel[lang]}{' '}
                <span className="underline underline-offset-2">martin.uy@lifeos.vn</span>
              </span>
              {copied ? (
                <span className="text-emerald-400 font-bold">✓</span>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 stroke-current" strokeWidth="1.2">
                  <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
                  <path d="M8.5 2V1.5C8.5 1.22386 8.27614 1 8 1H2C1.44772 1 1 1.44772 1 2V8C1 8.27614 1.22386 8.5 1.5 8.5H2" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </section>

      <ActionDrawer type={activeDrawer} onClose={() => setActiveDrawer(null)} />
    </>
  );
};
