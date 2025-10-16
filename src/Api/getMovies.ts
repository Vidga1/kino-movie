import axiosClient from './axiosClient'

export const fetchMovies = async (page: number = 1): Promise<MoviesResponse> => {
  const { data } = await axiosClient.get('/v2.2/films/top', {
    params: {
      type: 'TOP_100_POPULAR_FILMS',
      page,
      itemsPerPage: 15,
    },
  })

  return {
    films: data.films.slice(0, 18),
    pagesCount: data.pagesCount,
  }
}

export const fetchMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  const { data: movieDetailsData } = await axiosClient.get(`/v2.2/films/${movieId}`)

  const movieDetails: MovieDetails = {
    filmId: movieDetailsData.filmId,
    kinopoiskId: movieDetailsData.kinopoiskId,
    nameRu: movieDetailsData.nameRu,
    description: movieDetailsData.description || '',
    year: movieDetailsData.year,
    posterUrl: movieDetailsData.posterUrl || '',
    posterUrlPreview: movieDetailsData.posterUrlPreview || '',
    countries: movieDetailsData.countries || [],
    genres: movieDetailsData.genres || [],
    rating: movieDetailsData.rating || 0,
    filmLength: movieDetailsData.filmLength,
    webUrl: movieDetailsData.webUrl,
  }

  return movieDetails
}
