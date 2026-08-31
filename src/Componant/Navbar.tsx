import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDark?: boolean;
  onToggleTheme?: () => void;
}

const Navbar = ({ isDark, onToggleTheme }: NavbarProps) => {
  return (
    <nav className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between transition-colors duration-300">
      
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-xl">K</span>
        </div>
        <span className="text-xl font-bold text-slate-800 dark:text-slate-100">KBM</span>
      </div>

      {/* Center: Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        <a href="/" className="text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-white font-medium transition-colors">Home</a>
        <a href="/lessons" className="text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-white font-medium transition-colors">Lessons</a>
        <a href="/projects" className="text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-white font-medium transition-colors">Projects</a>
        <a href="/about" className="text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-white font-medium transition-colors">About</a>
      </div>

      {/* Right: User Profile & Theme Toggle */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleTheme}
          className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        
        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors shadow-sm">
          <span className="text-slate-600 dark:text-slate-300 font-medium">U</span>
        </div>
      </div>

    </nav>
  )
}

export default Navbar