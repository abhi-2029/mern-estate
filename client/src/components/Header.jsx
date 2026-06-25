import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

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
    <header className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-300'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4 px-6'>
        <Link to='/'>
          <h1 className='font-extrabold text-lg sm:text-2xl tracking-tight flex items-center gap-1.5'>
            <span className='bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent'>Sahand</span>
            <span className='text-slate-800 font-semibold text-base sm:text-lg bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60'>Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-50 border border-slate-200/80 hover:border-slate-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all duration-300 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-inner w-32 sm:w-72'
        >
          <input
            type='text'
            placeholder='Search estates...'
            className='bg-transparent focus:outline-none text-sm text-slate-700 w-full placeholder-slate-400 font-medium'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className='text-slate-400 hover:text-indigo-600 transition-colors'>
            <FaSearch className='h-4 w-4' />
          </button>
        </form>
        <ul className='flex items-center gap-6 text-sm font-semibold text-slate-600'>
          <Link to='/' className='hover:text-indigo-600 transition-colors duration-200'>
            <li className='hidden sm:inline'>Home</li>
          </Link>
          <Link to='/about' className='hover:text-indigo-600 transition-colors duration-200'>
            <li className='hidden sm:inline'>About</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-8 w-8 object-cover border-2 border-indigo-100 hover:border-indigo-500 transition-all duration-200 shadow-sm'
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