import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SelectedMoviesList from '../components/MovieList/SelectedMoviesList'
import Pagination from '../components/Pagination/Pagination'
import Modal from '../components/Modal/Modal'
import { useMovieDetails } from '../hooks/useMovies'

const SELECTED_MOVIES_KEY = 'selectedMovies'

const PlaylistsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalMovies, setTotalMovies] = useState(0)
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const moviesPerPage = 18

  // Получаем детали фильма
  const movieDetailsQuery = useMovieDetails(selectedMovieId)

  useEffect(() => {
    const fetchMovies = () => {
      try {
        const saved = localStorage.getItem(SELECTED_MOVIES_KEY)
        if (saved) {
          const movies = JSON.parse(saved)
          setTotalMovies(Object.keys(movies).length)
        }
      } catch (error) {
        console.error('Ошибка загрузки фильмов:', error)
      }
    }

    fetchMovies()
  }, [])

  const totalPages = Math.ceil(totalMovies / moviesPerPage)

  const handleMovieSelect = (movie: Movie) => {
    const movieId = movie.kinopoiskId || movie.filmId
    if (movieId) {
      setSelectedMovieId(movieId)
      setIsModalOpen(true)
    } else {
      console.error('Ошибка: Идентификатор фильма не найден')
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedMovieId(null)
  }

  return (
    <div className='bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen flex flex-col items-center text-center'>
      <div className='relative w-full max-w-7xl px-4 pt-8'>
        <Link
          to='/home'
          className='absolute top-8 right-4 py-2.5 px-4 text-white border-none rounded-md no-underline font-bold transition-colors duration-300 bg-red-500 hover:bg-red-600 hover:cursor-pointer'
        >
          Назад
        </Link>
        <h1 className='text-4xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent'>
          Избранные фильмы
        </h1>
      </div>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
      <SelectedMoviesList
        currentPage={currentPage}
        moviesPerPage={moviesPerPage}
        onMovieSelect={handleMovieSelect}
      />

      {isModalOpen && movieDetailsQuery.data && (
        <Modal
          movie={movieDetailsQuery.data}
          onClose={handleCloseModal}
          isModalOpen={isModalOpen}
        />
      )}
    </div>
  )
}

export default PlaylistsPage
