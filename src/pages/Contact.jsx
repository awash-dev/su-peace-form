import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MessageSquare, MapPin, Send, AlertCircle, CheckCircle2, Sparkles, ChevronDown, PhoneCall } from 'lucide-react'
import { sendContact } from '../services/api'
import { fadeInUp, staggerContainer, hoverElevate } from '../utils/animations'

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    category: 'General Inquiry', 
    message: '' 
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(null)

  const categories = [
    'General Inquiry', 
    'Membership & Registration', 
    'Conflict Mediation', 
    'Research Support', 
    'Event Collaboration',
    'Technical Support'
  ]

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)
    try {
      await sendContact(formData)
      setStatus({ 
        type: 'success', 
        message: 'Your message has been dispatched successfully. An SPF representative will contact you shortly.' 
      })
      setFormData({ name: '', email: '', category: 'General Inquiry', message: '' })
    } catch (err) {
      console.error('Contact error:', err)
      setStatus({ 
        type: 'error', 
        message: err.message || 'Transmission failed. Please verify your connection or use your institutional email.' 
      })
    } finally { 
      setIsSubmitting(false) 
    }
  }

  // Effect to clear status after some time
  useEffect(() => {
    if (status?.type === 'success') {
      const timer = setTimeout(() => setStatus(null), 8000)
      return () => clearTimeout(timer)
    }
  }, [status])

  return (
    <div className="pt-16 lg:pt-20 overflow-x-hidden bg-bg-main text-text-primary min-h-screen">
      {/* PAGE HERO */}
      <div className="relative py-16 lg:py-28 overflow-hidden bg-bg-subtle/30 border-b border-black/5 dark:border-white/10">
        <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full animate-orb-drift" />
        <div className="absolute bottom-[-20%] left-[-10%] -z-10 w-[400px] h-[400px] bg-sky-500/5 blur-[100px] rounded-full animate-orb-drift" />
        
        <div className="container-custom relative z-10">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-sm border border-primary/5">
               <Sparkles size={14} /> Institutional Communication
            </motion.div>
            <motion.h1 className="text-5xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-text-primary" variants={fadeInUp}>
              Institutional <br/><span className="text-primary italic">Liaison Hub</span>
            </motion.h1>
            <motion.p className="text-base lg:text-xl text-text-secondary max-w-2xl leading-relaxed font-medium" variants={fadeInUp}>
              Connecting the Samara University student body with the Peace Forum Union headquarters. Reach out through our secure digital portals for mediation, inquiries, and collaboration.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <section className="py-20 lg:py-32 relative">
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">
            
            {/* Direct Contact Column */}
            <div className="flex flex-col gap-10">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
              >
                <div className="w-12 h-1.5 bg-primary rounded-full mb-6" />
                <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-text-primary mb-6">Direct Channels</h2>
                <p className="text-lg text-text-secondary leading-relaxed max-w-md font-medium">Use these verified institutional channels for urgent mediation, regional summit inquiries, and administrative support.</p>
              </motion.div>

              <motion.div 
                className="flex flex-col gap-6"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {[
                  { icon: <Mail size={24} />, label: 'Official Correspondence', value: 'su.peaceforumunion@gmail.com', href: 'mailto:su.peaceforumunion@gmail.com' },
                  { icon: <MessageSquare size={24} />, label: 'Telegram Operations', value: 'SPF Union Global Hub', href: 'https://t.me/SUPEACEFORUMUNION' },
                  { icon: <PhoneCall size={24} />, label: 'Administrative Line', value: '+(251) 9XX-XXX-XXX', href: 'tel:+251900000000' },
                  { icon: <MapPin size={24} />, label: 'Physical Headquarters', value: 'Main Office, Samara University, Ethiopia', href: '#' }
                ].map((item, i) => (
                  <motion.a 
                    key={i} 
                    href={item.href} 
                    variants={fadeInUp}
                    whileHover={hoverElevate.whileHover}
                    className="flex items-center gap-8 p-10 bg-bg-subtle/40 dark:bg-bg-subtle/50 border border-black/5 dark:border-white/10 rounded-[3.5rem] hover:shadow-2xl transition-all group relative overflow-hidden"
                  >
                    <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    <div className="w-16 h-16 bg-bg-main dark:bg-white/5 text-primary rounded-[1.5rem] flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-md relative z-10">
                      {item.icon}
                    </div>
                    <div className="relative z-10 flex-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-tertiary mb-1">{item.label}</p>
                      <p className="text-base lg:text-lg font-black text-text-primary tracking-tight group-hover:text-primary transition-colors">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              {/* Map View */}
              <motion.div 
                className="mt-6 rounded-[4rem] overflow-hidden border border-black/5 dark:border-white/10 aspect-video shadow-2xl relative group bg-bg-muted"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-primary/20 bg-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10" />
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d205.6359228207346!2d40.992129628378244!3d11.800678104352816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2set!4v1776083151597!5m2!1sen!2set"
                  width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="Map Institutional HQ" className="grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                </iframe>
              </motion.div>
            </div>

            {/* Secure Dispatch Form */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              className="p-8 lg:p-20 bg-bg-main dark:bg-bg-subtle/50 border border-black/5 dark:border-white/10 rounded-3xl lg:rounded-[4.5rem] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-6 lg:gap-8 mb-12 lg:mb-16">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-primary text-white rounded-2xl lg:rounded-[2rem] flex items-center justify-center shadow-2xl shadow-primary/30 rotate-3 group-hover:rotate-0 transition-transform">
                     <Send size={24} lg:size={32} />
                  </div>
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-black tracking-tighter text-text-primary">Send Dispatch</h2>
                    <p className="text-[10px] lg:text-[12px] text-primary font-black uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Secure Connection
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-12">
                  <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-tertiary ml-2">Institutional Name</label>
                       <input 
                         className="w-full h-18 px-10 bg-bg-subtle/60 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-base text-text-primary" 
                         type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Legal Name" required 
                       />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-tertiary ml-2">University Email</label>
                      <input 
                        className="w-full h-18 px-10 bg-bg-subtle/60 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-base text-text-primary" 
                        type="email" name="email" value={formData.email} onChange={handleChange} placeholder="user@su.edu.et" required 
                      />
                    </div>
                  </div>

                  <div className="space-y-4 relative">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-tertiary ml-2">Priority Category</label>
                    <div className="relative group/select">
                      <select 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange}
                        className="w-full h-18 px-10 bg-bg-subtle/60 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary appearance-none transition-all font-bold text-base text-text-primary pr-12 cursor-pointer z-10 relative"
                      >
                        {categories.map(cat => <option key={cat} value={cat} className="bg-bg-main text-text-primary p-4">{cat}</option>)}
                      </select>
                      <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none group-focus-within/select:text-primary transition-colors z-20" size={20} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-tertiary ml-2">Dispatch Details</label>
                    <textarea 
                      className="w-full p-10 bg-bg-subtle/60 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium text-base text-text-primary resize-none custom-scrollbar min-h-[220px]" 
                      name="message" value={formData.message} onChange={handleChange} placeholder="Please provide institutional context for your inquiry..." required 
                    />
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit" 
                      className="w-full h-20 bg-primary text-white font-black rounded-[2rem] shadow-2xl shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-[0.3em] text-[12px] flex items-center justify-center gap-4 group disabled:opacity-50 disabled:scale-100" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="w-7 h-7 border-[4px] border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>🚀 Send Dispatch <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" /></>
                      )}
                    </button>
                  </div>

                  <AnimatePresence>
                    {status && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.95 }} 
                        animate={{ opacity: 1, y: 0, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`p-8 rounded-[2.5rem] flex items-center gap-6 font-black text-[12px] shadow-2xl ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}
                      >
                        <div className={`p-3 rounded-xl ${status.type === 'success' ? 'bg-emerald-500/20 shadow-lg shadow-emerald-500/10' : 'bg-rose-500/20 shadow-lg shadow-rose-500/10'}`}>
                           {status.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                        </div>
                        <span className="leading-relaxed uppercase tracking-[0.2em]">{status.message}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
