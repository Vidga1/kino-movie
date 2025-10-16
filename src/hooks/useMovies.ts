import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { fetchMovies, fetchMovieDetails } from '../Api/getMovies'
import { fetchMoviesByTitle, fetchMoviesByFilters } from '../Api/searchMovies'
import { loadFilterOptions } from '../Api/loadFilter'

// Хук для получения популярных фильмов
export const useMovies = (page: number = 1): UseQueryResult<MoviesResponse, Error> => {
  return useQuery({
    queryKey: ['movies', page],
    queryFn: () => fetchMovies(page),
    placeholderData: (previousData) => previousData, // Показываем предыдущие данные при загрузке новой страницы
  })
}

// Хук для получения деталей фильма
export const useMovieDetails = (movieId: number | null): UseQueryResult<MovieDetails, Error> => {
  return useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: () => fetchMovieDetails(movieId!),
    enabled: !!movieId, // Запрос выполнится только если movieId не null
  })
}

// Хук для поиска фильмов по названию
export const useMoviesByTitle = (
  title: string,
  page: number = 1
): UseQueryResult<MoviesResponse, Error> => {
  return useQuery({
    queryKey: ['moviesByTitle', title, page],
    queryFn: () => fetchMoviesByTitle(title, page),
    enabled: !!title && title.trim().length > 0, // Запрос выполнится только если есть title
    placeholderData: (previousData) => previousData, // Показываем предыдущие данные при загрузке новой страницы
  })
}

// Хук для поиска фильмов по фильтрам
export const useMoviesByFilters = (
  filters: Filters,
  page: number = 1,
  enabled: boolean = true
): UseQueryResult<MoviesResponse, Error> => {
  return useQuery({
    queryKey: ['moviesByFilters', filters, page],
    queryFn: () => fetchMoviesByFilters(filters, page),
    enabled,
    placeholderData: (previousData) => previousData, // Показываем предыдущие данные при загрузке новой страницы
  })
}

// Хук для загрузки опций фильтров (страны, жанры)
export const useFilterOptions = (): UseQueryResult<FilterOptions, Error> => {
  return useQuery({
    queryKey: ['filterOptions'],
    queryFn: loadFilterOptions,
    staleTime: 10 * 60 * 1000, // 10 минут - эти данные редко меняются
  })
}
