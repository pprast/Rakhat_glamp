import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book" element={<div className="min-h-screen bg-abyss text-cream flex items-center justify-center font-display text-4xl">Бронирование — скоро</div>} />
        <Route path="/admin/*" element={<div className="min-h-screen bg-abyss text-cream flex items-center justify-center font-display text-4xl">Админка — скоро</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
