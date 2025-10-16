import axios from 'axios'
import { API_KEY } from './URL_KEY'

const axiosClient = axios.create({
  baseURL: 'https://kinopoiskapiunofficial.tech/api',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': API_KEY,
  },
})

export default axiosClient
