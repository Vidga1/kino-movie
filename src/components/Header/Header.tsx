import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header className='bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 shadow-lg border-b border-slate-600'>
      <nav className='max-w-7xl mx-auto px-6 py-4'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center space-x-1'>
            <span className='text-2xl'>🎬</span>
            <Link
              to='/home'
              className='text-xl font-bold text-white hover:text-amber-400 transition-colors duration-300'
            >
              KinoMovies
            </Link>
          </div>

          <div className='hidden md:flex space-x-8'>
            <Link
              to='/playlists'
              className='text-white hover:text-amber-400 transition-colors duration-300 font-medium relative group flex items-center gap-1'
            >
              <span className='text-xl'>⭐</span>
              Мои фильмы
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full'></span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button className='text-white hover:text-amber-400 transition-colors duration-300'>
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
