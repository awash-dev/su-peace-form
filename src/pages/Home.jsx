import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { getPosts } from '../services/api'
import { ArrowRight, Newspaper, Globe, Users, Shield, BookOpen, Lightbulb, MessageSquare, Mail, Sparkles } from 'lucide-react'
import { fadeInUp, fadeInDown, staggerContainer, hoverElevate } from '../utils/animations'

const pillars = [
  { icon: <MessageSquare className="text-primary" size={32} />, title: 'Talk More', desc: 'We host workshops and meetings to help people understand each other.' },
  { icon: <Globe className="text-primary" size={32} />, title: 'Join In', desc: 'We help students have a say in how things are run.' },
  { icon: <Shield className="text-primary" size={32} />, title: 'Stay One', desc: "We celebrate different cultures to keep everyone together." },
  { icon: <BookOpen className="text-primary" size={32} />, title: 'Learn Better', desc: 'We share books and guides on how to live in peace.' },
  { icon: <Users className="text-primary" size={32} />, title: 'Safe Network', desc: 'We connect our school with others to build a big family.' },
  { icon: <Lightbulb className="text-primary" size={32} />, title: 'Lead Now', desc: 'We teach young people how to be leaders for a better future.' },
]

const Home = () => {
  const [stats, setStats] = useState({ members: 0, divisions: 0, seminars: 0, years: 0 })
  const [latestNews, setLatestNews] = useState([])
  const [newsLoading, setNewsLoading] = useState(true)
  
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  
  const yOrbs = useTransform(scrollY, [0, 500], [0, 150])
  const yGrid = useTransform(scrollY, [0, 500], [0, 80])
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0.9])

  useEffect(() => {
    const targets = { members: 1200, divisions: 24, seminars: 150, years: 7 }
    const duration = 2000
    const frameDuration = 1000 / 60
    const totalFrames = Math.round(duration / frameDuration)
    let frame = 0
    const timer = setInterval(() => {
      frame++
      const p = frame / totalFrames
      setStats({
        members: Math.floor(targets.members * p),
        divisions: Math.floor(targets.divisions * p),
        seminars: Math.floor(targets.seminars * p),
        years: Math.floor(targets.years * p),
      })
      if (frame === totalFrames) clearInterval(timer)
    }, frameDuration)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    getPosts()
      .then(posts => setLatestNews(posts.slice(0, 3)))
      .catch(() => setLatestNews([]))
      .finally(() => setNewsLoading(false))
  }, [])

  return (
    <div className="overflow-x-hidden bg-bg-main text-text-primary">
      <section ref={heroRef} className="relative pt-12 pb-10 lg:pt-16 lg:pb-20 overflow-hidden">
        <motion.div className="absolute inset-0 -z-10 bg-bg-main" style={{ opacity: opacityHero }}>
          <motion.div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" 
            style={{ backgroundImage: 'radial-gradient(#2563eb 1.5px, transparent 1.5px)', backgroundSize: '48px 48px', y: yGrid }} 
          />
          <motion.div style={{ y: yOrbs }} className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full animate-orb-drift" />
          <motion.div style={{ y: yOrbs }} className="absolute -bottom-[10%] -left-[5%] w-[400px] h-[400px] bg-sky-500/10 blur-[100px] rounded-full animate-orb-drift [animation-delay:3s]" />
        </motion.div>

        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial="initial" animate="animate" variants={staggerContainer} className="flex flex-col gap-0">
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest mb-4 w-fit">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                University Official Platform
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-4xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-4 text-text-primary">
                Unity Thrives <br /><span className="text-primary italic">In Peace.</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-base lg:text-lg text-text-secondary leading-relaxed mb-4 max-w-xl font-medium">
                The Peace Forum Union helps students talk, unite, and work together 
                 to make our university stay peaceful for everyone.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                <Link to="/contact" className="h-12 px-8 flex items-center justify-center gap-2 bg-primary text-white font-black rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-[10px]">
                  <Mail size={16} /> Contact Us
                </Link>
                <Link to="/mission" className="h-12 px-8 flex items-center justify-center bg-bg-muted dark:bg-white/5 border border-black/10 dark:border-white/10 text-text-primary font-black rounded-xl hover:bg-bg-subtle transition-colors uppercase tracking-widest text-[10px]">
                  Our Mission →
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div className="relative max-w-sm mx-auto pt-14 lg:max-w-md lg:ml-auto lg:mr-0" initial={{ opacity: 0, scale: 0.8, y: -100 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
              <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-50 rounded-full" />
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 aspect-[4/5] lg:aspect-square group">
                <img src="/hero.png" alt="Peace" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-bg-subtle dark:bg-bg-subtle/50 border-y border-black/5 dark:border-white/5 relative overflow-hidden">
        <div className="container-custom">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8" 
            variants={staggerContainer} 
            initial="initial" 
            whileInView="animate" 
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              { num: `${stats.members}+`, label: 'Members' },
              { num: `${stats.divisions}`, label: 'Divisions' },
              { num: `${stats.seminars}`, label: 'Events' },
              { num: stats.years, label: 'Years Active' },
            ].map((s, i) => (
              <motion.div key={i} className="text-center relative group" variants={fadeInUp}>
                <div className="text-4xl lg:text-5xl font-black text-text-primary tracking-tighter mb-1 transition-transform group-hover:scale-110">{s.num}</div>
                <div className="text-[9px] font-bold text-text-tertiary uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PILLARS - Path to Unity Section */}
      <section className="relative py-20 lg:py-32 bg-bg-main overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
               <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-3 flex items-center justify-center gap-2">
                 <Sparkles size={14} /> Our Strategy
               </p>
               <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-text-primary">The Path to Unity</h2>
               <p className="text-text-secondary text-base lg:text-lg font-medium">Simple steps we take every day to build a better campus.</p>
            </motion.div>
          </div>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
            variants={staggerContainer} 
            initial="initial" 
            whileInView="animate" 
            viewport={{ once: true, amount: 0.1 }}
          >
            {pillars.map((p, i) => (
              <motion.div key={i} className="group p-10 bg-bg-subtle dark:bg-bg-subtle/50 border border-black/5 dark:border-white/5 rounded-[2.5rem] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500" variants={fadeInUp} whileHover={hoverElevate.whileHover}>
                <div className="mb-6 p-4 bg-bg-main dark:bg-white/5 w-fit rounded-2xl shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">{p.icon}</div>
                <h3 className="text-xl font-black mb-3 text-text-primary">{p.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed font-medium">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="py-20 lg:py-32 bg-bg-subtle dark:bg-bg-subtle/30 border-y border-black/5 dark:border-white/5 relative">
        <div className="container-custom">
          <motion.div 
            className="flex flex-wrap items-end justify-between gap-6 mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">📰 Recent Activity</p>
              <h2 className="text-4xl lg:text-5xl font-black text-text-primary tracking-tight">Forum Stories</h2>
            </div>
            <Link to="/news" className="h-12 px-6 flex items-center justify-center bg-bg-main dark:bg-bg-subtle border border-black/10 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Explore News Hub</Link>
          </motion.div>

          <AnimatePresence>
          {newsLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <div key={i} className="aspect-[4/5] bg-bg-muted dark:bg-white/5 rounded-[2.5rem] animate-pulse" />)}
            </div>
          ) : (
            <motion.div 
              className="grid md:grid-cols-3 gap-8" 
              variants={staggerContainer} 
              initial="initial" 
              whileInView="animate" 
              viewport={{ once: true }}
            >
              {latestNews.map((post) => (
                <motion.article key={post.id} className="group relative bg-bg-main dark:bg-bg-subtle/50 border border-black/5 dark:border-white/5 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500" variants={fadeInUp} whileHover={hoverElevate.whileHover}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {post.image ? <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={post.title} /> : <div className="w-full h-full bg-bg-muted flex items-center justify-center text-primary/10"><Newspaper size={48} /></div>}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-black text-text-primary group-hover:text-primary transition-colors mb-4 line-clamp-2">{post.title}</h3>
                    <p className="text-text-secondary text-sm line-clamp-2 mb-8 font-medium">{post.content?.replace(/<[^>]*>/g, '')}</p>
                    <div className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                       Full Story <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-40 relative overflow-hidden bg-bg-main">
        <div className="container-custom">
          <motion.div 
            className="relative p-12 lg:p-24 bg-primary text-white rounded-[3.5rem] text-center overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: -40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 20 }}
            viewport={{ once: true }}
          >
            {/* Background Orbs inside CTA */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-400/20 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-7xl font-black mb-8 leading-[0.9] tracking-tighter">Become a <br/>Peace Maker</h2>
              <p className="text-lg opacity-80 max-w-xl mx-auto mb-12 font-medium">Join our network of students working together to build a safer campus environment for everyone.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="h-14 px-12 flex items-center justify-center bg-white text-primary font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-[10px] uppercase tracking-widest">✉ Send Us a Message</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
