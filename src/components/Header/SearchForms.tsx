import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { resetFilters } from '../../helpers/resetFilters'
import { useFilterOptions } from '../../hooks/useMovies'
import CustomSelect from './CustomSelect'
import CloseIcon from '../Icons/CloseIcon'

const SearchForms: React.FC<SearchFilterFormProps> = ({ onSearchResults }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedOrder, setSelectedOrder] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [ratingFrom, setRatingFrom] = useState('')
  const [ratingTo, setRatingTo] = useState('')
  const [yearFrom, setYearFrom] = useState('')
  const [yearTo, setYearTo] = useState('')

  // Используем хук для загрузки фильтров
  const { data: filterOptions } = useFilterOptions()

  // Сортируем страны и жанры
  const countries = useMemo(() => {
    if (!filterOptions?.countries) return []
    return filterOptions.countries
      .filter((country: Country) => country.country.trim() !== '')
      .sort((a: Country, b: Country) => a.country.localeCompare(b.country, 'ru'))
  }, [filterOptions])

  const genres = useMemo(() => {
    if (!filterOptions?.genres) return []
    return filterOptions.genres
      .filter((genre: Genre) => genre.genre.trim() !== '')
      .sort((a: Genre, b: Genre) => a.genre.localeCompare(b.genre, 'ru'))
  }, [filterOptions])

  // Инициализация фильтров из URL при загрузке
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)

    if (location.pathname.includes('/search')) {
      const query = urlParams.get('query') || ''
      if (query) setSearchTerm(query)
    } else if (location.pathname.includes('/filters') && location.search) {
      // Обновляем фильтры только если в URL есть параметры
      const countries = urlParams.get('countries')
      const genres = urlParams.get('genres')
      const order = urlParams.get('order')
      const type = urlParams.get('type')
      const ratingFromParam = urlParams.get('ratingFrom')
      const ratingToParam = urlParams.get('ratingTo')
      const yearFromParam = urlParams.get('yearFrom')
      const yearToParam = urlParams.get('yearTo')

      if (countries !== null) setSelectedCountry(countries)
      if (genres !== null) setSelectedGenre(genres)
      if (order !== null) setSelectedOrder(order)
      if (type !== null) setSelectedType(type)
      if (ratingFromParam !== null) setRatingFrom(ratingFromParam)
      if (ratingToParam !== null) setRatingTo(ratingToParam)
      if (yearFromParam !== null) setYearFrom(yearFromParam)
      if (yearToParam !== null) setYearTo(yearToParam)
    }
  }, [location.pathname, location.search])

  // Автоматическое применение фильтров для селектов (без debounce)
  useEffect(() => {
    if (location.pathname === '/home' || location.pathname.includes('/search')) return
    if (!location.pathname.includes('/filters')) return

    const filters = {
      countries: selectedCountry,
      genres: selectedGenre,
      order: selectedOrder,
      type: selectedType,
      ratingFrom: ratingFrom,
      ratingTo: ratingTo,
      yearFrom: yearFrom,
      yearTo: yearTo,
    }

    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    )

    const hasFilters = Object.keys(cleanFilters).length > 0
    if (hasFilters) {
      onSearchResults()
      navigate(`/filters?${new URLSearchParams(cleanFilters).toString()}`, { replace: true })
    }
  }, [selectedCountry, selectedGenre, selectedOrder, selectedType, location.pathname])

  // Автоматическое применение фильтров для числовых полей (с debounce)
  useEffect(() => {
    if (location.pathname === '/home' || location.pathname.includes('/search')) return
    if (!location.pathname.includes('/filters')) return

    const timer = setTimeout(() => {
      const filters = {
        countries: selectedCountry,
        genres: selectedGenre,
        order: selectedOrder,
        type: selectedType,
        ratingFrom: ratingFrom,
        ratingTo: ratingTo,
        yearFrom: yearFrom,
        yearTo: yearTo,
      }

      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '')
      )

      const hasFilters = Object.keys(cleanFilters).length > 0
      if (hasFilters) {
        onSearchResults()
        navigate(`/filters?${new URLSearchParams(cleanFilters).toString()}`, { replace: true })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [ratingFrom, ratingTo, yearFrom, yearTo, location.pathname])

  // Автоматический поиск по названию при вводе (с debounce)
  useEffect(() => {
    if (!searchTerm.trim()) return

    const timer = setTimeout(() => {
      onSearchResults()
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`)
    }, 700)

    return () => clearTimeout(timer)
  }, [searchTerm, navigate, onSearchResults])

  const handleSearchByName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!searchTerm.trim()) return

    onSearchResults()
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`)
  }

  const handleFilterChange = () => {
    // Если находимся не на странице фильтров, переходим туда
    if (!location.pathname.includes('/filters')) {
      navigate('/filters')
    }
  }

  const inputStyle =
    'px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-800 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 text-sm min-w-32 sm:min-w-40'

  const numberInputStyle = `${inputStyle} w-16 sm:w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`

  // Проверяем, есть ли выбранные фильтры
  const hasActiveFilters =
    searchTerm ||
    selectedCountry ||
    selectedGenre ||
    selectedOrder ||
    selectedType ||
    ratingFrom ||
    ratingTo ||
    yearFrom ||
    yearTo

  const handleResetAll = () => {
    resetFilters({
      setSearchTerm,
      setSelectedCountry,
      setSelectedGenre,
      setSelectedOrder,
      setSelectedType,
      setRatingFrom,
      setRatingTo,
      setYearFrom,
      setYearTo,
    })
    navigate('/home')
  }

  return (
    <div className='bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 p-4 sm:p-6 shadow-lg border-b border-slate-500 w-full'>
      <div className='flex flex-wrap gap-2 sm:gap-3 justify-center items-center w-full'>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Введите название фильма...'
          className={`${inputStyle} min-w-48 sm:min-w-56`}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearchByName(e as any)
            }
          }}
        />

        <CustomSelect
          value={selectedCountry}
          onChange={(value) => {
            setSelectedCountry(value)
            handleFilterChange()
          }}
          placeholder='Выберите страну'
          options={countries.map((country) => ({ id: String(country.id), name: country.country }))}
        />

        <CustomSelect
          value={selectedGenre}
          onChange={(value) => {
            setSelectedGenre(value)
            handleFilterChange()
          }}
          placeholder='Выберите жанр'
          options={genres.map((genre) => ({ id: String(genre.id), name: genre.genre }))}
        />

        <CustomSelect
          value={selectedOrder}
          onChange={(value) => {
            setSelectedOrder(value)
            handleFilterChange()
          }}
          placeholder='Сортировка'
          options={[
            { id: 'RATING', name: 'По рейтингу' },
            { id: 'NUM_VOTE', name: 'По оценкам' },
            { id: 'YEAR', name: 'По годам' },
          ]}
        />

        <CustomSelect
          value={selectedType}
          onChange={(value) => {
            setSelectedType(value)
            handleFilterChange()
          }}
          placeholder='Тип'
          options={[
            { id: 'ALL', name: 'Все' },
            { id: 'FILM', name: 'Фильм' },
            { id: 'TV_SHOW', name: 'ТВ шоу' },
            { id: 'TV_SERIES', name: 'ТВ сериал' },
            { id: 'MINI_SERIES', name: 'Мини-сериал' },
          ]}
        />

        <input
          type='number'
          id='ratingFrom'
          name='ratingFrom'
          className={numberInputStyle}
          placeholder='Рейтинг от'
          value={ratingFrom}
          onChange={(e) => {
            setRatingFrom(e.target.value)
            handleFilterChange()
          }}
        />

        <input
          type='number'
          id='ratingTo'
          name='ratingTo'
          className={numberInputStyle}
          placeholder='Рейтинг до'
          value={ratingTo}
          onChange={(e) => {
            setRatingTo(e.target.value)
            handleFilterChange()
          }}
        />

        <input
          type='number'
          id='yearFrom'
          name='yearFrom'
          className={numberInputStyle}
          placeholder='Год от'
          value={yearFrom}
          onChange={(e) => {
            setYearFrom(e.target.value)
            handleFilterChange()
          }}
        />

        <input
          type='number'
          id='yearTo'
          name='yearTo'
          className={numberInputStyle}
          placeholder='Год до'
          value={yearTo}
          onChange={(e) => {
            setYearTo(e.target.value)
            handleFilterChange()
          }}
        />

        {/* Иконка сброса всех фильтров */}
        {hasActiveFilters && (
          <div
            onClick={handleResetAll}
            className='p-2 bg-slate-700 hover:bg-red-600 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center group'
            title='Сбросить все фильтры'
          >
            <CloseIcon className='w-3 h-3 sm:w-4 sm:h-4 text-white group-hover:text-white' />
          </div>
        )}
      </div>
    </div>
  )
}
export default SearchForms
