import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('spf-theme') || 'light')
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.className = theme
    localStorage.setItem('spf-theme', theme)
  }, [theme])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'News', path: '/news' },
    { name: 'Unions', path: '/unions' },
    { name: 'Mission', path: '/mission' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <motion.header 
      initial={false}
      animate={{ 
        height: isScrolled ? 64 : 80,
        backgroundColor: isScrolled || isOpen 
          ? (theme === 'dark' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)') 
          : 'rgba(255, 255, 255, 0)',
        borderBottomColor: isScrolled || isOpen 
          ? (theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)') 
          : 'rgba(0, 0, 0, 0)'
      }}
      className="fixed top-0 inset-x-0 z-[1000] backdrop-blur-xl transition-colors duration-500 border-b"
    >
      <div className="container-custom h-full flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img src="/logo.jpg" alt="" className="w-9 h-9 rounded-lg shadow-sm group-hover:scale-105 transition-transform" />
            <div className="flex flex-col justify-center">
              <span className="font-black text-lg leading-[1.1] tracking-tighter text-text-primary">Peace Forum Union</span>
              <span className="text-[9px] font-bold text-primary uppercase tracking-[0.15em] leading-none mt-1">Samara University</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-primary ${pathname === link.path ? 'text-primary' : 'text-text-secondary'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-bg-muted dark:bg-white/5 text-text-primary hover:scale-105 transition-transform"
          >
            {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-700" />}
          </button>

          <button 
            className="lg:hidden w-10 h-10 flex items-center justify-center text-text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full inset-x-0 bg-bg-main dark:bg-bg-main border-b border-black/5 dark:border-white/10 lg:hidden shadow-2xl backdrop-blur-3xl"
          >
            <div className="container-custom py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[12px] font-black uppercase tracking-[0.25em] ${pathname === link.path ? 'text-primary' : 'text-text-secondary'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
