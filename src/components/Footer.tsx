import { useLang } from '../context/LanguageContext';

export const Footer = () => {
  const { lang } = useLang();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative z-[2] w-full py-12 px-5 sm:px-8 md:px-10 border-t border-white/10 bg-black text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex items-center gap-3">
          <span className="text-xl tracking-tight font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            PACE & TRAIL®
          </span>
          <span className="text-xs font-mono text-neutral-500">
            © 2025 Pace & Trail Portal. {lang === 'vi' ? 'Bản quyền thuộc về Chuyên trang Chạy bộ & Trekking.' : 'All rights reserved.'}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{lang === 'vi' ? 'Hệ thống hoạt động ổn định' : 'System operational'}</span>
          <span className="text-neutral-600">|</span>
          <span>{lang === 'vi' ? 'Việt Nam' : 'Vietnam'}</span>
          <span className="text-neutral-600">|</span>
          <span className="hidden sm:inline">21.0285° N, 105.8542° E</span>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="text-xs font-mono uppercase tracking-wider text-emerald-400 hover:text-white transition-colors cursor-pointer"
        >
          ↑ {lang === 'vi' ? 'Trở về đầu trang' : 'Back to top'}
        </button>
      </div>
    </footer>
  );
};
