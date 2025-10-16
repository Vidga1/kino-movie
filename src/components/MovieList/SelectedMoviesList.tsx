import React, { useState, useEffect } from 'react'
import { getClassByRate } from '../../helpers/getClassByRate'

const SELECTED_MOVIES_KEY = 'selectedMovies'

type SelectedMoviesListProps = {
  currentPage: number
  moviesPerPage: number
  onMovieSelect?: (movie: Movie) => void
}

const SelectedMoviesList: React.FC<SelectedMoviesListProps> = ({
  currentPage,
  moviesPerPage,
  onMovieSelect,
}) => {
  const [selectedMovies, setSelectedMovies] = useState<MovieSelect[]>([])

  useEffect(() => {
    const loadSelectedMovies = () => {
      try {
        const saved = localStorage.getItem(SELECTED_MOVIES_KEY)
        if (saved) {
          const data = JSON.parse(saved)
          const loadedMovies: MovieSelect[] = Object.entries(data || {}).map(([key, movie]) => {
            const typedMovie = movie as Partial<MovieSelect>
            return {
              ...typedMovie,
              ratingKinopoisk: typedMovie.ratingKinopoisk || 0,
              ratingImdb: typedMovie.ratingImdb || 0,
              kinopoiskId: typedMovie.kinopoiskId || parseInt(key, 10),
              filmId: typedMovie.filmId || parseInt(key, 10),
              normalizedRating: getClassByRate(
                typedMovie.ratingKinopoisk || typedMovie.rating || 'Н/Д'
              ),
              nameRu: typedMovie.nameRu || '',
              posterUrlPreview: typedMovie.posterUrlPreview || '',
              year: typedMovie.year || '',
              countries: typedMovie.countries || [],
              genres: typedMovie.genres || [],
              rating: typedMovie.rating || '',
            }
          })

          const startIndex = (currentPage - 1) * moviesPerPage
          const endIndex = startIndex + moviesPerPage
          setSelectedMovies(loadedMovies.slice(startIndex, endIndex))
        }
      } catch (error) {
        console.error('Ошибка загрузки избранных фильмов:', error)
      }
    }

    loadSelectedMovies()
  }, [currentPage, moviesPerPage])

  const handleMovieRemove = (movieId: number | undefined) => {
    if (movieId === undefined) return

    try {
      const saved = localStorage.getItem(SELECTED_MOVIES_KEY)
      if (saved) {
        const data = JSON.parse(saved)
        const updatedMovies = { ...data }
        delete updatedMovies[movieId]
        localStorage.setItem(SELECTED_MOVIES_KEY, JSON.stringify(updatedMovies))
        setSelectedMovies((prevMovies) =>
          prevMovies.filter((m) => m.kinopoiskId !== movieId && m.filmId !== movieId)
        )
      }
    } catch (error) {
      console.error('Ошибка удаления фильма:', error)
    }
  }

  const getRatingColor = (ratingClass: string) => {
    switch (ratingClass) {
      case 'green':
        return 'bg-green-500 text-white'
      case 'orange':
        return 'bg-orange-500 text-white'
      case 'red':
        return 'bg-red-500 text-white'
      case 'blue':
        return 'bg-blue-500 text-white'
      default:
        return 'bg-white text-[#1a191f]'
    }
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6 px-4 sm:px-6 lg:px-9 py-6 max-w-8xl mx-auto'>
      {selectedMovies.map((movie) => {
        const rating = movie.ratingKinopoisk || movie.rating || 'Н/Д'
        const ratingClass = getClassByRate(rating)

        return (
          <div
            key={movie.kinopoiskId || movie.filmId}
            className='group bg-gradient-to-b from-slate-700 to-slate-800 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(251,191,36,0.3),0_0_0_1px_rgba(251,191,36,0.2)] transition-shadow duration-300 cursor-pointer flex flex-col border border-slate-600/50'
            onClick={() => {
              if (movie.kinopoiskId || movie.filmId) {
                onMovieSelect?.(movie as unknown as Movie)
              }
            }}
          >
            <div className='relative overflow-hidden aspect-[2/3]'>
              <img
                src={movie.posterUrlPreview}
                className='w-full h-full object-cover'
                alt={movie.nameRu}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

              <button
                className='absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-sm sm:text-lg flex items-center justify-center shadow-[0_2px_10px_rgba(220,38,38,0.4)] transition-colors duration-200 cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation()
                  handleMovieRemove(movie.kinopoiskId ?? movie.filmId)
                }}
                title='Удалить из избранного'
              >
                ✕
              </button>

              <div
                className={`absolute top-2 left-2 sm:top-3 sm:left-3 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-[0_2px_15px_rgba(0,0,0,0.5)] border-2 border-white/20 ${getRatingColor(
                  ratingClass
                )}`}
              >
                {rating}
              </div>
            </div>

            <div className='p-3 sm:p-4 space-y-2 flex-shrink-0'>
              <h3
                className='text-sm sm:text-base font-semibold text-white hover:text-pink-400 transition-colors duration-200 line-clamp-2'
                title={movie.nameRu}
              >
                {movie.nameRu}
              </h3>

              <div className='text-xs sm:text-sm text-cyan-300 flex items-center gap-1'>
                <span className='text-cyan-400'>🌍</span>
                <span className='line-clamp-1'>
                  {movie.countries?.map((c) => c.country).join(', ') || 'Неизвестно'} - {movie.year}
                </span>
              </div>

              <div className='text-xs sm:text-sm text-green-400 flex items-center gap-1'>
                <span className='text-green-500'>🎬</span>
                <span className='line-clamp-1'>
                  {movie.genres?.map((g) => g.genre).join(', ') || 'Неизвестно'}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SelectedMoviesList
