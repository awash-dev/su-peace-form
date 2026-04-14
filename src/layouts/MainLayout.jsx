import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect } from 'react'

const MainLayout = () => {
  const { pathname } = useLocation()

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  const isDashboard = pathname.startsWith('/dashboard')

  return (
    <div className="min-h-screen flex flex-col bg-bg-main text-text-primary transition-colors duration-300">
      {!isDashboard && <Navbar />}
      <main className={`flex-grow ${isDashboard ? '' : ''}`}>
        <Outlet />
      </main>
      {!isDashboard && <Footer />}
    </div>
  )
}

export default MainLayout
