import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Reveal } from './Reveal';

export const KnowledgeSection = () => {
  const { lang, t } = useLang();
  const [activeCategory, setActiveCategory] = useState<string>('Tất cả');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const articles = t.articles.list;
  const categories = t.articles.categories[lang];

  const filteredArticles = articles.filter((art) => {
    if (activeCategory === 'Tất cả' || activeCategory === 'All Topics') return true;
    return art.category === activeCategory;
  });

  const selectedArticle = articles.find((a) => a.id === selectedArticleId);

  return (
    <section id="knowledge" className="relative z-10 w-full py-20 px-5 sm:px-8 md:px-10 bg-black text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Reveal>
            <p className="text-xs sm:text-sm font-mono tracking-widest text-cyan-400 mb-2 uppercase">
              {t.articles.tag[lang]}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t.articles.title[lang]}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-neutral-400 max-w-2xl text-base sm:text-lg">
              {t.articles.desc[lang]}
            </p>
          </Reveal>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-white/10 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white text-black font-semibold'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((art, idx) => (
            <Reveal key={art.id} delay={((Math.min(idx * 100, 400)) as 0 | 100 | 200 | 300 | 400)}>
              <article className="group bg-neutral-900/40 border border-white/10 hover:border-white/30 rounded-2xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between h-full hover:bg-neutral-900/80">
                <div>
                  {/* Top Bar: Category badge & read time */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-md text-[11px] font-mono tracking-wider bg-white/10 text-cyan-300 uppercase">
                      {art.category}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono">
                      <span>{art.readTime}</span>
                      <span>•</span>
                      <span>{art.date}</span>
                    </div>
                  </div>

                  {/* Stylized Image Placeholder Badge */}
                  <div className="w-full h-44 mb-6 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-950 border border-white/10 flex flex-col items-center justify-center p-4 text-center group-hover:border-cyan-500/40 transition-colors">
                    <svg className="w-8 h-8 text-neutral-500 mb-2 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[11px] font-mono text-neutral-400 tracking-wide">
                      {lang === 'vi' ? '[HÌNH ẢNH BÀI VIẾT - SẼ CẬP NHẬT]' : '[ARTICLE IMAGE PLACEHOLDER]'}
                    </span>
                    <span className="text-[10px] text-neutral-600 mt-1">
                      {art.category} • {art.id}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="text-xl sm:text-2xl font-normal text-white mb-3 group-hover:text-cyan-300 transition-colors leading-snug">
                    {art.title[lang]}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                    {art.summary[lang]}
                  </p>
                </div>

                {/* Bottom CTA */}
                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-mono">
                    {art.author}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedArticleId(art.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-white hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    <span>{lang === 'vi' ? 'Đọc toàn bài' : 'Read Full Article'}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal / Detailed Article View */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="bg-neutral-900 border border-white/20 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-white relative shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedArticleId(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded text-xs font-mono bg-cyan-500/20 text-cyan-300">
                {selectedArticle.category}
              </span>
              <span className="text-xs font-mono text-neutral-400">{selectedArticle.readTime}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-light text-white mb-4">
              {selectedArticle.title[lang]}
            </h3>

            <p className="text-xs font-mono text-neutral-400 mb-6 border-b border-white/10 pb-4">
              {lang === 'vi' ? 'Tác giả:' : 'Author:'} {selectedArticle.author} | {selectedArticle.date}
            </p>

            <div className="w-full h-56 mb-6 rounded-xl bg-neutral-950 border border-white/10 flex flex-col items-center justify-center p-4 text-center">
              <svg className="w-10 h-10 text-neutral-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-mono text-cyan-300">
                {lang === 'vi' ? '[HÌNH ẢNH MINH HỌA SẼ ĐƯỢC CẬP NHẬT TẠI ĐÂY]' : '[FULL ARTICLE HERO IMAGE WILL BE PLACED HERE]'}
              </span>
            </div>

            <p className="text-neutral-300 leading-relaxed text-base mb-6">
              {selectedArticle.summary[lang]}
            </p>

            <div className="bg-neutral-950 border border-cyan-500/30 rounded-xl p-5 mb-6">
              <h4 className="text-xs font-mono uppercase text-cyan-400 tracking-wider mb-3">
                💡 KEY TAKEAWAYS // NỘI DUNG CỐT LÕI
              </h4>
              <ul className="space-y-2">
                {selectedArticle.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-neutral-300">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>{item[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedArticleId(null)}
                className="px-6 py-2.5 bg-white text-black text-sm font-medium rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                {lang === 'vi' ? 'Đóng' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
