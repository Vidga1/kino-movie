import axiosClient from './axiosClient'

export const fetchMoviesByTitle = async (title: string, page = 1): Promise<MoviesResponse> => {
  const { data } = await axiosClient.get('/v2.1/films/search-by-keyword', {
    params: {
      keyword: title,
      page,
      itemsPerPage: 15,
    },
  })

  const maxPages = 20
  const limitedPagesCount = Math.min(data.pagesCount, maxPages)

  return {
    films: data.films.slice(0, 18),
    pagesCount: limitedPagesCount,
  }
}

export const fetchMoviesByFilters = async (filters: Filters, page = 1): Promise<MoviesResponse> => {
  const params: Record<string, string | number> = {
    page,
    itemsPerPage: 15,
  }

  Object.keys(filters).forEach((key) => {
    const value = filters[key]
    if (value) {
      params[key] = value
    }
  })

  const { data } = await axiosClient.get('/v2.2/films', { params })

  return {
    films: data.items.slice(0, 18),
    pagesCount: data.totalPages,
  }
}
