import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Mission from './pages/Mission'
import Contact from './pages/Contact'
import News from './pages/News'
import Resources from './pages/Resources'
import Unions from './pages/Unions'
import Dashboard from './pages/Dashboard'
import Developer from './pages/Developer'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="mission" element={<Mission />} />
        <Route path="contact" element={<Contact />} />
        <Route path="news" element={<News />} />
        <Route path="resources" element={<Resources />} />
        <Route path="unions" element={<Unions />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="developer" element={<Developer />} />
      </Route>
    </Routes>
  )
}

export default App
