import { useLang } from '../context/LanguageContext';
import { Reveal } from './Reveal';

export const LabsSection = () => {
  const { lang, t } = useLang();
  const articles = t.articles.list;

  return (
    <section id="labs" className="relative z-[2] w-full py-24 sm:py-32 px-5 sm:px-8 md:px-10 border-t border-white/10 bg-black/85 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto">
        {/* Author Profile Card */}
        <Reveal>
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-16 p-6 rounded-2xl bg-neutral-900/60 border border-white/10">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-emerald-500/60">
                <img
                  src="/hoanguy_profile.jpg"
                  alt="Hoàng Uy - Runner & Author"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono">RUNNER</span>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-white font-semibold text-lg">Hoàng Uy (Martin)</h3>
              <p className="text-neutral-400 text-sm mt-0.5">
                {lang === 'vi' ? 'Marathon Runner • Trail Enthusiast • CISSP' : 'Marathon Runner • Trail Enthusiast • CISSP'}
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                {['Sub-4h Marathon', 'Trail 35km', 'Trekking Tây Bắc'].map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Marathon Photo */}
            <div className="sm:ml-auto flex-shrink-0">
              <div className="w-32 h-24 sm:w-44 sm:h-32 rounded-xl overflow-hidden border border-white/20 relative group">
                <img
                  src="/hoanguy_marathon.jpg"
                  alt="Hoàng Uy Marathon Race"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-2 left-2 text-[9px] text-white/80 font-mono">
                  🏆 {lang === 'vi' ? 'Giải Marathon' : 'Marathon Race'}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <Reveal variant="left">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">// 05 SPORTS PHYSIOLOGY RESEARCH</span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mt-2" style={{ fontFamily: 'var(--font-heading)' }}>
              {lang === 'vi' ? 'Nghiên Cứu Sinh Lý Vận Động' : 'Sports Physiology Research'}
            </h2>
          </Reveal>
          <Reveal variant="right" delay={200}>
            <p className="max-w-md text-neutral-400 text-sm sm:text-base leading-relaxed">
              {lang === 'vi' ? 'Ứng dụng khoa học thể thao & nghiên cứu nhịp tim, thích nghi độ cao và tối ưu cơ bắp.' : 'Applying sports science, altitude adaptation, and muscular optimization.'}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.slice(0, 2).map((exp, i) => (
            <Reveal key={exp.id} delay={((i * 100) as 0 | 100)}>
              <div className="group relative rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 overflow-hidden h-full">
                <div className="relative z-10">
                  <div className="flex justify-between items-center text-xs font-mono text-neutral-400 mb-6">
                    <span>{exp.id}</span>
                    <span>{exp.date}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-medium text-white mb-3 group-hover:translate-x-1 transition-transform">{exp.title[lang]}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">{exp.summary[lang]}</p>
                </div>
                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400">{exp.category}</span>
                  <span className="text-xs font-mono text-neutral-400">{exp.readTime}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
