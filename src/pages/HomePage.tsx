import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header/Header'
import MovieList from '../components/MovieList/MovieList'
import Modal from '../components/Modal/Modal'
import Pagination from '../components/Pagination/Pagination'
import SearchForms from '../components/Header/SearchForms'
import {
  useMovies,
  useMovieDetails,
  useMoviesByTitle,
  useMoviesByFilters,
} from '../hooks/useMovies'

const HomePage: React.FC = () => {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const location = useLocation()

  // Определяем тип поиска и параметры из URL
  const searchType = useMemo(() => {
    const urlParams = new URLSearchParams(location.search)

    if (location.pathname.includes('/filters')) {
      return {
        type: 'filters' as const,
        filters: Object.fromEntries(urlParams.entries()) as Filters,
      }
    } else if (location.pathname.includes('/search') && urlParams.has('query')) {
      return {
        type: 'title' as const,
        title: urlParams.get('query') || '',
      }
    }
    return { type: 'popular' as const }
  }, [location])

  // Используем соответствующий хук в зависимости от типа поиска
  const moviesQuery = useMovies(currentPage)
  const moviesByTitleQuery = useMoviesByTitle(
    searchType.type === 'title' ? searchType.title : '',
    currentPage
  )
  const moviesByFiltersQuery = useMoviesByFilters(
    searchType.type === 'filters' ? searchType.filters : {},
    currentPage,
    searchType.type === 'filters'
  )

  // Выбираем активный запрос
  const activeQuery =
    searchType.type === 'title'
      ? moviesByTitleQuery
      : searchType.type === 'filters'
      ? moviesByFiltersQuery
      : moviesQuery

  // Получаем детали фильма
  const movieDetailsQuery = useMovieDetails(selectedMovieId)

  // Управление скроллом при открытии модалки
  useEffect(() => {
    if (isModalOpen) {
      const scrollY = window.scrollY
      document.body.style.top = `-${scrollY}px`
      document.body.classList.add('stop-scrolling')
    } else {
      const scrollY = document.body.style.top
      document.body.classList.remove('stop-scrolling')
      document.body.style.top = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }, [isModalOpen])

  // Сбрасываем страницу при изменении поиска
  useEffect(() => {
    setCurrentPage(1)
  }, [location])

  const handleSearchResults = useCallback(() => {
    setCurrentPage(1)
  }, [])

  const handleMovieSelect = useCallback((movie: Movie) => {
    const movieId = movie.kinopoiskId || movie.filmId
    if (movieId) {
      setSelectedMovieId(movieId)
      setIsModalOpen(true)
    } else {
      console.error('Ошибка: Идентификатор фильма не найден')
    }
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedMovieId(null)
  }, [])

  // Получаем данные из активного запроса
  const movies = activeQuery.data?.films || []
  const totalPages = activeQuery.data?.pagesCount || 0
  const isLoading = activeQuery.isLoading
  const isError = activeQuery.isError

  return (
    <div className='bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen'>
      <Header />
      <SearchForms onSearchResults={handleSearchResults} />

      {isLoading && (
        <div className='flex justify-center items-center min-h-96'>
          <div className='text-white text-2xl'>Загрузка...</div>
        </div>
      )}

      {isError && (
        <div className='flex justify-center items-center min-h-96'>
          <div className='text-red-500 text-2xl'>Ошибка при загрузке фильмов</div>
        </div>
      )}

      {!isLoading && !isError && <MovieList movies={movies} onMovieSelect={handleMovieSelect} />}

      {isModalOpen && movieDetailsQuery.data && (
        <Modal
          movie={movieDetailsQuery.data}
          onClose={handleCloseModal}
          isModalOpen={isModalOpen}
        />
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

export default HomePage
