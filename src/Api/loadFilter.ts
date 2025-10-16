import axiosClient from './axiosClient'

export async function loadFilterOptions(): Promise<FilterOptions> {
  const { data } = await axiosClient.get('/v2.2/films/filters')
  return data
}
