import { useEffect, useState } from 'react';
import { useLang } from '../context/LanguageContext';

export type DrawerType = 'pitch' | 'jobs' | 'hello' | 'operate' | null;

interface ActionDrawerProps {
  type: DrawerType;
  onClose: () => void;
}

export const ActionDrawer = ({ type, onClose }: ActionDrawerProps) => {
  const { lang, t } = useLang();
  const d = t.drawer;
  const [submitted, setSubmitted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Chạy bộ');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    setSubmitted(false);
    setSelectedRole(null);
  }, [type]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (type) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setTimeout(onClose, 1600), 400);
  };

  const getTag = () => {
    if (type === 'pitch') return d.pitch.tag[lang];
    if (type === 'jobs') return d.jobs.tag[lang];
    if (type === 'hello') return d.hello.tag[lang];
    return d.operate.tag[lang];
  };

  const getTitle = () => {
    if (type === 'pitch') return d.pitch.title[lang];
    if (type === 'jobs') return d.jobs.title[lang];
    if (type === 'hello') return d.hello.title[lang];
    return d.operate.title[lang];
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} aria-hidden="true" />

      <aside className="relative w-full max-w-xl h-full bg-black/95 border-l border-white/10 z-50 flex flex-col justify-between overflow-y-auto p-6 sm:p-10 shadow-2xl" role="dialog" aria-modal="true">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">{getTag()}</p>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
                {getTitle()}
              </h2>
            </div>
            <button type="button" onClick={onClose} aria-label={d.closeLabel[lang]} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white transition-colors cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="stroke-current" strokeWidth="1.5" strokeLinecap="round">
                <path d="M1 1L13 13M1 13L13 1" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="pt-8">
            {/* PITCH / SUBMIT ROUTE */}
            {type === 'pitch' && (
              <>
                {submitted ? (
                  <div className="py-16 text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 mb-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17L4 12" /></svg>
                    </div>
                    <h3 className="text-xl font-medium text-white">{d.pitch.successTitle[lang]}</h3>
                    <p className="text-sm text-neutral-400 max-w-sm mx-auto">{d.pitch.successDesc[lang]}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-neutral-400 font-mono">{d.pitch.nameLabel[lang]}</label>
                      <input required type="text" placeholder={lang === 'vi' ? 'Nguyễn Văn A' : 'John Doe'} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition-colors text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-neutral-400 font-mono">{d.pitch.emailLabel[lang]}</label>
                      <input required type="email" placeholder={d.pitch.emailPlaceholder[lang]} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition-colors text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-neutral-400 font-mono">{lang === 'vi' ? 'Chủ đề bài viết' : 'Content Topic'}</label>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {['Chạy bộ', 'Chạy Trail', 'Trekking', 'Sống khỏe'].map((topic) => (
                          <button key={topic} type="button" onClick={() => setSelectedTopic(topic)} className={`text-xs px-3.5 py-1.5 rounded-full border transition-colors cursor-pointer ${selectedTopic === topic ? 'bg-emerald-500 text-black font-semibold border-emerald-400' : 'bg-transparent text-neutral-300 border-white/20 hover:border-white/40'}`}>{topic}</button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-neutral-400 font-mono">{lang === 'vi' ? 'Tóm tắt nội dung / Link cung đường GPX' : 'Brief / GPX Link'}</label>
                      <textarea required rows={4} placeholder={lang === 'vi' ? 'Chia sẻ trải nghiệm hoặc link bài viết, cung đường của bạn...' : 'Share your story or GPX track link...'} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition-colors text-sm resize-none" />
                    </div>
                    <button type="submit" className="w-full py-3 bg-emerald-500 text-black font-semibold text-sm rounded-full hover:bg-emerald-400 transition-colors cursor-pointer">{d.pitch.submitBtn[lang]}</button>
                  </form>
                )}
              </>
            )}

            {/* JOBS */}
            {type === 'jobs' && (
              <div className="space-y-6">
                <p className="text-sm text-neutral-400 leading-relaxed">{d.jobs.intro[lang]}</p>
                <div className="space-y-3">
                  {t.challenges.list.map((role) => {
                    const roleKey = role.title.en;
                    return (
                      <div key={roleKey} onClick={() => setSelectedRole(selectedRole === roleKey ? null : roleKey)} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-base font-medium text-white">{role.title[lang]}</h4>
                            <span className="text-xs text-emerald-400 font-mono">{role.current}</span>
                          </div>
                          <span className="text-neutral-400 text-sm">{selectedRole === roleKey ? '−' : '+'}</span>
                        </div>
                        {selectedRole === roleKey && (
                          <div className="mt-3 pt-3 border-t border-white/10 text-xs text-neutral-300 space-y-3">
                            <p>{role.desc[lang]}</p>
                            <a href="mailto:coaching@lifeos.vn" className="inline-block px-4 py-1.5 rounded-full bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-colors">{d.jobs.apply[lang]}</a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <p className="text-xs text-neutral-400">{d.jobs.portfolioNote[lang]}{' '}<a href="mailto:careers@paceandtrail.vn" className="text-emerald-400 underline underline-offset-2">careers@paceandtrail.vn</a>.</p>
                </div>
              </div>
            )}

            {/* HELLO */}
            {type === 'hello' && (
              <>
                {submitted ? (
                  <div className="py-16 text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 mb-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17L4 12" /></svg>
                    </div>
                    <h3 className="text-xl font-medium text-white">{d.hello.successTitle[lang]}</h3>
                    <p className="text-sm text-neutral-400">{d.hello.successDesc[lang]}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <p className="text-sm text-neutral-400 leading-relaxed">{d.hello.intro[lang]}</p>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-neutral-400 font-mono">{d.hello.nameLabel[lang]}</label>
                      <input required type="text" placeholder={lang === 'vi' ? 'Nguyễn Văn A' : 'John Doe'} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition-colors text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-neutral-400 font-mono">{d.hello.emailLabel[lang]}</label>
                      <input required type="email" placeholder={d.hello.emailPlaceholder[lang]} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition-colors text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-neutral-400 font-mono">{d.hello.noteLabel[lang]}</label>
                      <textarea required rows={3} placeholder={d.hello.notePlaceholder[lang]} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition-colors text-sm resize-none" />
                    </div>
                    <button type="submit" className="w-full py-3 bg-emerald-500 text-black font-semibold text-sm rounded-full hover:bg-emerald-400 transition-colors cursor-pointer">{d.hello.submitBtn[lang]}</button>
                  </form>
                )}
              </>
            )}

            {/* OPERATE */}
            {type === 'operate' && (
              <div className="space-y-6">
                <p className="text-sm text-neutral-400 leading-relaxed">{d.operate.intro[lang]}</p>
                <div className="space-y-4">
                  {d.operate.principles.map((p) => (
                    <div key={p.num} className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs font-mono text-emerald-400 font-bold">{p.num}</span>
                        <h4 className="text-base font-medium text-white">{p.title[lang]}</h4>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed pl-7">{p.desc[lang]}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 mt-8 border-t border-white/10 flex justify-between items-center text-xs text-neutral-500 font-mono">
          <span>{d.footer[lang]}</span>
          <span>{d.est[lang]}</span>
        </div>
      </aside>
    </div>
  );
};
