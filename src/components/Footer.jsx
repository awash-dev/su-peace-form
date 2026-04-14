import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Mail, MapPin, Globe } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../utils/animations'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bg-main border-t border-black/5 dark:border-white/5 pt-20 pb-10 overflow-hidden relative">
      <div className="container-custom">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          
          {/* Brand Info */}
          <motion.div className="lg:col-span-1" variants={fadeInUp}>
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <img src="/logo.jpg" alt="SPF Union" className="w-10 h-10 rounded-xl group-hover:scale-105 transition-transform" />
              <div>
                <span className="block font-black text-lg tracking-tighter text-text-primary leading-none">Peace Forum Union</span>
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-1 block">Samara University</span>
              </div>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-8">
              We work together to make Samara University a peaceful and happy place for all students.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 flex items-center justify-center bg-bg-muted dark:bg-white/5 text-text-secondary hover:bg-primary hover:text-white rounded-xl transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-black text-text-primary uppercase tracking-widest text-[10px] mb-8">Navigation</h4>
            <div className="flex flex-col gap-4">
              {['Home', 'News', 'Unions', 'Mission', 'Resources'].map((item) => (
                <Link key={item} to={`/${item.toLowerCase()}`} className="text-text-secondary text-sm hover:text-primary transition-colors hover:translate-x-1 transition-transform inline-block">
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Support */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-black text-text-primary uppercase tracking-widest text-[10px] mb-8">Connect</h4>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-bg-muted dark:bg-white/5 rounded-xl text-primary"><Mail size={16} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase text-text-tertiary mb-1">Email Us</p>
                  <p className="text-sm font-bold text-text-primary">su.peaceforumunion@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-bg-muted dark:bg-white/5 rounded-xl text-primary"><MapPin size={16} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase text-text-tertiary mb-1">Our Office</p>
                  <p className="text-sm font-bold text-text-primary">Samara, Afar, Ethiopia</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Institutional Branding Group */}
          <motion.div variants={fadeInUp}>
             <div className="p-8 bg-bg-subtle dark:bg-bg-subtle/50 rounded-[2.5rem] border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 mb-4">
                   <Globe size={20} className="text-primary" />
                   <h4 className="font-black text-text-primary text-sm tracking-tight">University Official</h4>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed mb-6">
                   Part of the Samara University student affairs department.
                </p>
                <Link to="/contact" className="h-10 w-full flex items-center justify-center bg-bg-muted dark:bg-bg-subtle border border-black/10 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary transition-colors text-text-primary">
                   Official Portal
                </Link>
             </div>
          </motion.div>

        </motion.div>

        <motion.div 
          className="pt-10 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">
            © {currentYear} Peace Forum Union. Built by <Link to="/developer" className="text-primary">Awash-Dev</Link>
          </p>
          <div className="flex gap-8">
             <Link to="#" className="text-[10px] font-black uppercase tracking-widest text-text-tertiary hover:text-primary transition-colors">Rules</Link>
             <Link to="#" className="text-[10px] font-black uppercase tracking-widest text-text-tertiary hover:text-primary transition-colors">Safety</Link>
             <Link to="/contact" className="text-[10px] font-black uppercase tracking-widest text-text-tertiary hover:text-primary transition-colors">Help</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
