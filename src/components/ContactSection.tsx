import { useEffect, useState } from 'react';
import { Reveal } from './Reveal';
import { useLang } from '../context/LanguageContext';

export const ContactSection = () => {
  const { lang, t } = useLang();
  const contact = t.contact;
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const updated: Record<string, string> = {};
      contact.cities.forEach((city) => {
        updated[city.name.en] = now.toLocaleTimeString('en-US', {
          timeZone: city.tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
      });
      setTimes(updated);
    };
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="relative z-[2] w-full py-24 sm:py-32 px-5 sm:px-8 md:px-10 border-t border-white/10 bg-black/95 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <Reveal variant="left">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">{contact.tag[lang]}</span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mt-2" style={{ fontFamily: 'var(--font-heading)' }}>{contact.title[lang]}</h2>
          </Reveal>
          <Reveal variant="right" delay={200}>
            <p className="max-w-md text-neutral-400 text-sm sm:text-base leading-relaxed">{contact.desc[lang]}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contact.cities.map((city, i) => (
            <Reveal key={city.name.en} delay={((i * 100) as 0 | 100 | 200)}>
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/30 transition-colors h-full">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">{city.name[lang]}</span>
                  <span className="text-xs font-mono text-white px-2 py-0.5 rounded bg-white/10">{times[city.name.en] || '--:--:--'}</span>
                </div>
                <p className="text-sm font-medium text-white mb-1">{city.address}</p>
                <span className="text-xs text-neutral-400 font-mono">{contact.hubLabel[lang]}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 to-neutral-950 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-2">{contact.dispatch[lang]}</span>
              <a href="mailto:contact@paceandtrail.vn" className="text-2xl sm:text-4xl font-medium text-white hover:text-emerald-400 underline underline-offset-4 transition-all" style={{ fontFamily: 'var(--font-heading)' }}>
                contact@paceandtrail.vn
              </a>
              <p className="text-xs text-neutral-400 font-mono mt-3">
                {lang === 'vi' ? 'Hỗ trợ cộng đồng & tư vấn giáo trình 24/7' : '24/7 Community & Training Support'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="mailto:coaching@paceandtrail.vn" className="px-6 py-3 rounded-full bg-emerald-500 text-black font-bold text-xs font-mono uppercase tracking-wider text-center hover:bg-emerald-400 transition-colors">
                {contact.commissions[lang]}
              </a>
              <a href="mailto:events@paceandtrail.vn" className="px-6 py-3 rounded-full border border-white/20 text-white text-xs font-mono uppercase tracking-wider text-center hover:border-white transition-colors">
                {contact.press[lang]}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
