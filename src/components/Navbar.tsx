import { useState } from 'react';
import { useLang } from '../context/LanguageContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const links = t.nav.links[lang];
  const anchors = ['#dashboard', '#dashboard', '#knowledge', '#tools', '#racelog', '#challenges', '#gear'];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-5 sm:px-8 py-4 bg-black/70 backdrop-blur-md border-b border-white/10 flex justify-between items-center w-full">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group select-none">
          <span
            className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-none group-hover:text-emerald-400 transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            MARTIN UY
          </span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            LIFE OS
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav aria-label="Desktop navigation" className="hidden lg:flex items-center gap-5 text-sm font-medium text-neutral-300">
          {links.map((name, idx) => (
            <a
              key={name}
              href={anchors[idx] || '#dashboard'}
              className="hover:text-emerald-400 transition-colors duration-200"
            >
              {name}
            </a>
          ))}
        </nav>

        {/* Desktop Right: CTA + Lang Switcher */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 text-xs font-mono bg-white/5 border border-white/10 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                lang === 'en' ? 'bg-emerald-500 text-black font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('vi')}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                lang === 'vi' ? 'bg-emerald-500 text-black font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              VI
            </button>
          </div>

          <a
            href="#contact"
            className="text-xs font-mono uppercase font-semibold px-4 py-2 rounded-full bg-white text-black hover:bg-emerald-400 transition-colors duration-200"
          >
            {t.nav.cta[lang]}
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 focus:outline-none z-50 cursor-pointer"
        >
          <span className={`w-6 h-[2px] bg-white transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`w-6 h-[2px] bg-white transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-30 flex flex-col justify-center px-8 gap-6 lg:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col gap-5">
          {links.map((name, idx) => (
            <a
              key={name}
              href={anchors[idx] || '#dashboard'}
              onClick={closeMenu}
              className="text-2xl font-light text-white hover:text-emerald-400 transition-colors duration-200"
            >
              {name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="text-2xl font-medium text-emerald-400 underline underline-offset-4 hover:opacity-80 transition-opacity duration-200 mt-2"
          >
            {t.nav.cta[lang]}
          </a>

          {/* Mobile Language Switcher */}
          <div className="flex items-center gap-3 text-sm font-mono mt-6 border-t border-white/10 pt-6">
            <span className="text-neutral-500">Ngôn ngữ / Lang:</span>
            <button
              type="button"
              onClick={() => { setLang('en'); closeMenu(); }}
              className={`cursor-pointer px-3 py-1 rounded transition-colors ${lang === 'en' ? 'bg-emerald-500 text-black font-bold' : 'text-neutral-400'}`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => { setLang('vi'); closeMenu(); }}
              className={`cursor-pointer px-3 py-1 rounded transition-colors ${lang === 'vi' ? 'bg-emerald-500 text-black font-bold' : 'text-neutral-400'}`}
            >
              Tiếng Việt
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};
