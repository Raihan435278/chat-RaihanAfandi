'use client';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  return (
    <nav className="fixed w-full top-0 left-0 z-50 border-b border-blue-100 dark:border-blue-900/60 bg-white/90 dark:bg-[#0b1b31]/90 backdrop-blur-md shadow-sm shadow-blue-900/5">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/icon.svg"
            alt=""
            className="w-11 h-11 rounded-xl shadow-md shadow-blue-900/15"
          />
          <div>
            <h1 className="font-bold text-lg leading-none text-blue-950 dark:text-white">
              Raihan AI Asisten
            </h1>
            <p className="text-xs text-blue-600 dark:text-blue-300">
              Teman pintar untuk ide dan pertanyaanmu
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="px-3 py-1.5 rounded-md border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors text-blue-800 dark:text-blue-200 flex items-center justify-center"
            title={theme === 'dark' ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
            aria-label={theme === 'dark' ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
          >
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} sm:mr-1.5`} />
            <span className="hidden sm:inline text-xs font-medium">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          <button
            className="px-3 py-1.5 rounded-md border border-blue-200 dark:border-blue-800 bg-white/70 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200 flex items-center justify-center"
            title="Status API"
            aria-label="Status API aktif"
          >
            <i className="fas fa-circle text-green-500 sm:mr-1.5" style={{ fontSize: '0.65rem' }}></i>
            <span className="hidden sm:inline text-xs font-medium">Live</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
