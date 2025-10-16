import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PlaylistsPage from './pages/PlaylistsPage'

function App() {
  return (
    <Routes>
      <Route path='/home' element={<HomePage />} />
      <Route path='/playlists' element={<PlaylistsPage />} />
      <Route path='/filters' element={<HomePage />} />
      <Route path='/search' element={<HomePage />} />
      <Route path='*' element={<Navigate replace to='/home' />} />
    </Routes>
  )
}

export default App
