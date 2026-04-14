import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Code, Globe, LayoutDashboard, Database, ExternalLink, Mail, Terminal, Star, GitFork, Eye, Calendar, GitBranch, Sparkles } from 'lucide-react'
import { fadeInUp, staggerContainer, hoverElevate } from '../utils/animations'

const Developer = () => {
  const [githubData, setGithubData] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const GITHUB_USERNAME = 'awash-dev'

  // Fetch GitHub user data and repositories
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true)
        
        // Fetch user profile
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
        if (!userResponse.ok) throw new Error('Failed to fetch user data')
        const userData = await userResponse.json()
        
        // Fetch repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
        )
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories')
        const reposData = await reposResponse.json()
        
        setGithubData(userData)
        setRepos(reposData)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  const skills = [
    { icon: <LayoutDashboard size={28} className="text-[#E34F26]" />, title: 'Architecture', desc: 'HTML5, Vite, and Native Web Components.' },
    { icon: <Code size={28} className="text-[#38B2AC]" />, title: 'UI / Design', desc: 'React Systems and Fluid Micro-Animations.' },
    { icon: <Globe size={28} className="text-[#F7DF1E]" />, title: 'Logic', desc: 'ES6+, React Hooks, and Global State.' },
    { icon: <Database size={28} className="text-[#339933]" />, title: 'Backend', desc: 'Node.js, SQL, and JWT Security.' }
  ]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="pt-16 lg:pt-20 overflow-x-hidden">
      {/* Hero Section with GitHub Profile */}
      <div className="py-12 lg:py-20 border-b border-black/5 dark:border-white/5 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 -z-10 opacity-5 dark:opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#2563eb 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />
        </motion.div>

        <div className="container-custom">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 mb-8">
              {/* GitHub Avatar */}
              {githubData && (
                <motion.div variants={fadeInUp} className="relative">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-3xl overflow-hidden ring-4 ring-primary/20 shadow-2xl">
                    <img 
                      src={githubData.avatar_url} 
                      alt={githubData.name || GITHUB_USERNAME}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <motion.div 
                    className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-3 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <Terminal size={20} />
                  </motion.div>
                </motion.div>
              )}

              <div className="flex-1">
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
                  <Sparkles size={12} /> Platform Architect
                </motion.div>
                <motion.h1 className="text-4xl lg:text-6xl font-black tracking-tighter leading-tight mb-6 text-text-primary" variants={fadeInUp}>
                  Built by <br/>
                  <em className="text-primary not-italic">
                    {githubData ? githubData.name || GITHUB_USERNAME : 'Awash-Dev'}
                  </em>
                </motion.h1>
                <motion.p className="text-base lg:text-lg text-text-secondary max-w-xl leading-relaxed mb-6" variants={fadeInUp}>
                  {githubData?.bio || 'Full-Stack Developer building modern technology for Samara University peace initiatives.'}
                </motion.p>

                {/* GitHub Stats Cards */}
                {githubData && (
                  <motion.div 
                    className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
                    variants={fadeInUp}
                  >
                    {[
                      { icon: <Code size={18} />, label: 'Repos', val: githubData.public_repos },
                      { icon: <GitBranch size={18} />, label: 'Followers', val: githubData.followers },
                      { icon: <Calendar size={18} />, label: 'Since', val: new Date(githubData.created_at).getFullYear() }
                    ].map((st, idx) => (
                      <div key={idx} className="p-4 bg-bg-subtle dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl flex items-center gap-3">
                         <div className="text-primary">{st.icon}</div>
                         <div>
                            <p className="text-xs font-black text-text-primary">{st.val}</p>
                            <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">{st.label}</p>
                         </div>
                      </div>
                    ))}
                  </motion.div>
                )}
                
                <motion.div className="flex flex-wrap gap-3" variants={fadeInUp}>
                  <a 
                    href={`https://github.com/${GITHUB_USERNAME}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="h-12 px-6 flex items-center justify-center gap-2 bg-primary text-white font-black rounded-xl shadow-lg hover:scale-105 transition-transform text-[10px] uppercase tracking-widest"
                  >
                    <Terminal size={16} /> GitHub Profile
                  </a>
                  {githubData?.blog && (
                    <a 
                      href={githubData.blog} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="h-12 px-6 flex items-center justify-center gap-2 bg-bg-muted dark:bg-white/5 border border-black/10 dark:border-white/10 text-text-primary font-bold rounded-xl text-[10px] uppercase tracking-widest"
                    >
                      Portfolio <ExternalLink size={16} />
                    </a>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* GitHub Repositories Section */}
      <section className="py-16 lg:py-24 bg-bg-subtle dark:bg-bg-subtle/30">
        <div className="container-custom">
          <header className="mb-12 text-center lg:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-3">🛠 Latest Work</p>
            <h2 className="text-3xl lg:text-4xl font-black text-text-primary tracking-tight">GitHub Repositories</h2>
          </header>

          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-48 bg-bg-muted dark:bg-white/5 rounded-3xl animate-pulse border border-black/5" />
              ))}
            </div>
          )}

          {error && (
            <div className="py-20 text-center">
              <p className="text-rose-500 font-bold mb-4">Connection to GitHub failed</p>
              <button onClick={() => window.location.reload()} className="px-6 h-10 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest">Retry Connection</button>
            </div>
          )}

          {!loading && !error && repos.length > 0 && (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.1 }}
            >
              {repos.map((repo) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-8 bg-bg-main dark:bg-bg-subtle/50 border border-black/5 dark:border-white/5 rounded-[2.5rem] hover:shadow-2xl transition-all duration-500 flex flex-col"
                  variants={fadeInUp}
                  whileHover={hoverElevate.whileHover}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Code size={20} />
                    </div>
                    {repo.fork && (
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[9px] font-black uppercase tracking-widest">
                        Fork
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-black mb-3 text-text-primary group-hover:text-primary transition-colors leading-tight">
                    {repo.name}
                  </h3>
                  
                  <p className="text-sm text-text-secondary leading-relaxed mb-8 flex-1 line-clamp-2">
                    {repo.description || 'Institutional repository contribution and development.'}
                  </p>

                  <div className="flex items-center gap-4 text-[10px] font-bold text-text-tertiary pt-6 border-t border-black/5 dark:border-white/5 mt-auto">
                    {repo.language && (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="uppercase tracking-widest">{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 uppercase tracking-widest">
                      <Star size={14} className="text-amber-500" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1.5 uppercase tracking-widest ml-auto">
                       #{formatDate(repo.updated_at).split(',')[1]}
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}

          {!loading && !error && repos.length > 0 && (
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <a
                href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 h-12 bg-bg-muted dark:bg-white/5 border border-black/10 dark:border-white/10 text-text-primary font-black rounded-xl hover:bg-primary hover:text-white transition-all text-[10px] uppercase tracking-widest"
              >
                View Full Archive <ExternalLink size={16} />
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* Technical Stack Section */}
      <section className="py-20 lg:py-32 bg-bg-main">
        <div className="container-custom">
          <header className="mb-16 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3">🚀 Stack</p>
            <h2 className="text-4xl lg:text-5xl font-black text-text-primary tracking-tight">Core Expertise</h2>
          </header>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
          >
            {skills.map((skill, idx) => (
              <motion.div 
                key={idx}
                className="group p-10 bg-bg-subtle dark:bg-bg-subtle/50 border border-black/5 dark:border-white/5 rounded-[2.5rem] hover:shadow-2xl transition-all duration-500 text-center"
                variants={fadeInUp}
                whileHover={hoverElevate.whileHover}
              >
                <div className="mb-6 p-4 bg-white dark:bg-white/5 w-fit mx-auto rounded-2xl shadow-sm group-hover:scale-110 transition-transform">{skill.icon}</div>
                <h3 className="text-xl font-black mb-3 text-text-primary">{skill.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{skill.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-40 relative overflow-hidden">
         {/* Background Orbs */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full -rotate-12 pointer-events-none" />
         
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto p-12 lg:p-20 bg-primary text-white rounded-[4rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-6">Open Source</p>
            <h2 className="text-4xl lg:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
              Let's Build <br/>Together
            </h2>
            <p className="text-lg opacity-80 leading-relaxed mb-12 max-w-xl mx-auto font-medium">
              Available for full-stack institutional projects, architectural consulting, or open source collaboration.
            </p>
            <Link 
              to="/contact" 
              className="h-14 px-12 inline-flex items-center justify-center gap-3 bg-white text-primary font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-[11px]"
            >
              <Mail size={18} /> Direct Inquiry
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Developer