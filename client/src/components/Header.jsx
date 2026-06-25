import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Theme state manager
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-sm transition-all duration-300'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4 px-6'>
        <Link to='/'>
          <h1 className='font-extrabold text-lg sm:text-2xl tracking-tight flex items-center gap-1.5'>
            <span className='bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent'>Abhi</span>
            <span className='text-slate-800 dark:text-slate-200 font-semibold text-base sm:text-lg bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700/60'>Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 focus-within:border-indigo-500 dark:focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900/30 transition-all duration-300 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-inner w-32 sm:w-72'
        >
          <input
            type='text'
            placeholder='Search estates...'
            className='bg-transparent focus:outline-none text-sm text-slate-700 dark:text-slate-200 w-full placeholder-slate-400 dark:placeholder-slate-500 font-medium'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className='text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors'>
            <FaSearch className='h-4 w-4' />
          </button>
        </form>
        <ul className='flex items-center gap-5 text-sm font-semibold text-slate-600 dark:text-slate-300'>
          <Link to='/' className='hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200'>
            <li className='hidden sm:inline'>Home</li>
          </Link>
          <Link to='/about' className='hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200'>
            <li className='hidden sm:inline'>About</li>
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className='p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all duration-300'
            aria-label='Toggle theme'
            type='button'
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-amber-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.929 4.929l1.591 1.591m10.96 10.96l1.591 1.591M3 12h2.25m13.5 0H21M6.52 17.48l1.591-1.591M17.48 6.52l1.591-1.591M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
              </svg>
            )}
          </button>

          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-8 w-8 object-cover border-2 border-indigo-100 dark:border-indigo-900/60 hover:border-indigo-500 transition-all duration-200 shadow-sm'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-xs sm:text-sm font-medium'>
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}