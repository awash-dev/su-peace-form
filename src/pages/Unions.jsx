import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Building2, Phone, Mail, User, AlertCircle, Sparkles, X, Layout, Globe, MessageSquare, ArrowRight } from 'lucide-react'
import { useFetch } from '../hooks/useFetch'
import { getMembers } from '../services/api'
import { fadeInUp, staggerContainer, hoverElevate } from '../utils/animations'
import Modal from '../components/Modal'

const Unions = () => {
  const { data: members, loading, error, refetch } = useFetch(getMembers)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('All Groups')
  const [selectedMember, setSelectedMember] = useState(null)

  const allDivisions = members
    ? ['All Groups', ...new Set(members.map(m => m.category).filter(Boolean))]
    : ['All Groups']

  const filtered = (members || []).filter(m => {
    const matchFilter = filter === 'All Groups' || m.category === filter
    const s = searchTerm.toLowerCase()
    const matchSearch =
      m.name.toLowerCase().includes(s) ||
      m.email?.toLowerCase().includes(s) ||
      m.phone?.toLowerCase().includes(s) ||
      m.category?.toLowerCase().includes(s)
    return matchFilter && matchSearch
  })

  const getInitials = (name) =>
    name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-bg-main">
      {/* Header Section */}
      <div className="py-12 lg:py-16 border-b border-black/5 dark:border-white/5 relative bg-bg-subtle/30 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full animate-orb-drift" />
        
        <div className="container-custom">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
              <Sparkles size={12} /> Community Hub
            </div>
            <motion.h1 
              className="text-4xl lg:text-7xl font-black tracking-tighter leading-tight mb-4 text-text-primary"
              variants={fadeInUp}
            >
              Meet Our Groups
            </motion.h1>
            <motion.p className="text-base lg:text-lg text-text-secondary max-w-xl leading-relaxed font-medium" variants={fadeInUp}>
              Search, filter, and connect with various student divisions across Samara University.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <section className="py-12 lg:py-20">
        <div className="container-custom">
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 bg-bg-subtle/80 dark:bg-bg-subtle/50 backdrop-blur-xl p-6 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-sm">
            <div className="relative w-full lg:w-96 group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search name, phone or group..."
                className="w-full h-12 pl-12 pr-4 bg-bg-main dark:bg-bg-main/50 border border-black/10 dark:border-white/10 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-xs font-bold text-text-primary placeholder:text-text-tertiary"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {allDivisions.map(div => (
                <button 
                  key={div} 
                  className={`px-6 h-10 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${filter === div ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' : 'bg-bg-main dark:bg-white/5 border-black/10 dark:border-white/10 text-text-secondary hover:border-primary'}`}
                  onClick={() => setFilter(div)}
                >
                  {div}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[1,2,3,4,5,6,7,8].map(i => (
                   <div key={i} className="h-64 bg-bg-muted dark:bg-white/5 rounded-3xl animate-pulse border border-black/5 dark:border-white/5" />
                 ))}
              </motion.div>
            ) : error ? (
              <motion.div key="error" className="py-20 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center mb-4"><AlertCircle size={32} /></div>
                <h3 className="text-xl font-black text-text-primary">Connection Error</h3>
                <button onClick={refetch} className="mt-4 px-8 h-10 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-[10px]">Retry</button>
              </motion.div>
            ) : filtered.length === 0 ? (
              <motion.div key="empty" className="py-32 text-center opacity-50">
                 <User size={64} className="mx-auto mb-4 text-text-tertiary" />
                 <p className="text-lg font-bold text-text-primary">No results found.</p>
              </motion.div>
            ) : (
              <motion.div 
                key="list"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.1 }}
              >
                {filtered.map((m) => (
                  <motion.div
                    key={m.id}
                    layout
                    onClick={() => setSelectedMember(m)}
                    className="group relative flex flex-col bg-bg-subtle/50 dark:bg-bg-subtle/50 border border-black/5 dark:border-white/10 rounded-[2.5rem] p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer"
                    variants={fadeInUp}
                    whileHover={hoverElevate.whileHover}
                  >
                    <div className="relative mb-6 self-center">
                       <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                       {m.image ? (
                        <img src={m.image} alt={m.name} className="relative w-24 h-24 rounded-full object-cover border-4 border-bg-main dark:border-bg-subtle shadow-xl group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="relative w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center font-black text-2xl text-primary border-4 border-bg-main dark:border-bg-subtle shadow-lg group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          {getInitials(m.name)}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center flex-1 flex flex-col">
                      <h3 className="text-lg font-black text-text-primary mb-1 group-hover:text-primary transition-colors line-clamp-1">{m.name}</h3>
                      <div className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center justify-center gap-1.5 mb-6">
                        <Building2 size={12} /> {m.category}
                      </div>

                      <div className="mt-auto flex items-center justify-center gap-2 text-[10px] font-black text-text-tertiary uppercase tracking-widest pt-4 border-t border-black/5 dark:border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details <ArrowRight size={14} className="text-primary" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Member Profile Modal */}
      <Modal 
        isOpen={!!selectedMember} 
        onClose={() => setSelectedMember(null)}
        title="Member Profile"
      >
        {selectedMember && (
          <div className="flex flex-col items-center text-center py-6">
             <div className="relative mb-8">
                <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
                {selectedMember.image ? (
                  <img src={selectedMember.image} alt="" className="relative w-32 h-32 rounded-[2rem] object-cover border-4 border-bg-main dark:border-white/10 shadow-2xl" />
                ) : (
                  <div className="relative w-32 h-32 rounded-[2rem] bg-primary/10 flex items-center justify-center font-black text-4xl text-primary border-4 border-bg-main dark:border-white/10 shadow-2xl">
                    {getInitials(selectedMember.name)}
                  </div>
                )}
             </div>

             <h2 className="text-3xl font-black text-text-primary tracking-tighter mb-2">{selectedMember.name}</h2>
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-10">
                <Building2 size={12} /> {selectedMember.category} Division
             </div>

             <div className="w-full grid md:grid-cols-2 gap-4">
                <a href={`tel:${selectedMember.phone}`} className="flex flex-col items-center p-6 bg-bg-subtle dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-[2rem] hover:border-primary transition-colors group">
                   <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                      <Phone size={20} />
                   </div>
                   <p className="text-[10px] font-black uppercase text-text-tertiary mb-1">Call Representative</p>
                   <p className="text-sm font-bold text-text-primary">{selectedMember.phone || 'Not Available'}</p>
                </a>
                <a href={`mailto:${selectedMember.email}`} className="flex flex-col items-center p-6 bg-bg-subtle dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-[2rem] hover:border-primary transition-colors group">
                   <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                      <Mail size={20} />
                   </div>
                   <p className="text-[10px] font-black uppercase text-text-tertiary mb-1">Send Official Email</p>
                   <p className="text-sm font-bold text-text-primary truncate w-full">{selectedMember.email || 'Not Available'}</p>
                </a>
             </div>
             
             <div className="mt-8 w-full p-8 bg-bg-muted dark:bg-accent/40 rounded-[2rem] text-left border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest mb-3">
                   <Globe size={14} /> Institutional Role
                </div>
                <p className="text-sm text-text-secondary leading-relaxed font-medium">
                   Student representative for the {selectedMember.category} department. Responsible for fostering peace, handling mediation cases, and ensuring student welfare within the Samara University ecosystem.
                </p>
             </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Unions
