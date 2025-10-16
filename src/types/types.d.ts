interface Country {
  id: string
  country: string
}

interface Genre {
  id: string
  genre: string
}

interface Movie {
  ratingKinopoisk: number
  filmId: number
  kinopoiskId?: number
  nameRu: string
  posterUrlPreview?: string
  year: string
  countries: Country[]
  genres: Genre[]
  rating: number
}

type MovieSelect = {
  normalizedRating: ReactNode
  ratingKinopoisk: number
  ratingImdb: number
  kinopoiskId?: number
  filmId?: number
  nameRu?: string
  posterUrlPreview?: string
  year?: string
  countries?: Array<{ country: string }>
  genres?: Array<{ genre: string }>
  rating?: string
}

interface MovieDetails extends Movie {
  description: string
  posterUrl: string
  filmLength?: number
  webUrl?: string
  ratingKinopoisk?: number
}

interface MovieListProps {
  movies: Movie[]
  onMovieSelect: (movie: Movie) => void
}

interface ModalProps {
  movie: MovieDetails
  onClose: () => void
  isModalOpen: boolean
}

interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

interface MoviesResponse {
  films: Movie[]
  pagesCount: number
}

interface SearchParams {
  keyword?: string
  countries?: string
  genres?: string
  order?: string
  type?: string
  ratingFrom?: string
  ratingTo?: string
  yearFrom?: string
  yearTo?: string
}

interface FilterOptions {
  countries: Country[]
  genres: Genre[]
}

interface HeaderProps {
  onSearch: (isActive: boolean) => void
}

interface SearchFilterFormProps {
  onSearchResults: () => void
}

interface Filters {
  [key: string]: string | undefined
  countries?: string
  genres?: string
  order?: string
  type?: string
  ratingFrom?: string
  ratingTo?: string
  yearFrom?: string
  yearTo?: string
}

type SelectedMovies = {
  [key: string]: Movie
}
