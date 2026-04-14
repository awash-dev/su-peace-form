import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Shield, Target, GraduationCap, Building2, MapPin, Sparkles, TrendingUp } from 'lucide-react'
import { fadeInUp, staggerContainer, hoverElevate } from '../utils/animations'

const Mission = () => {
  const milestones = [
    { year: '2018', text: 'Forum founded with 12 students in the main hall.' },
    { year: '2020', text: 'First regional peace summit held in Samara.' },
    { year: '2022', text: 'Successfully opened 24 campus branches across the region.' },
    { year: '2024', text: 'New institutional digital platform launched globally.' }
  ]

  return (
    <div className="pt-16 lg:pt-20 bg-bg-main text-text-primary">
      {/* PAGE HERO */}
      <div className="relative py-12 lg:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full animate-orb-drift" />
        
        <div className="container-custom relative z-10">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
               <Sparkles size={12} /> Purpose & Values
            </motion.div>
            <motion.h1 className="text-4xl lg:text-7xl font-black tracking-tighter leading-tight mb-6 text-text-primary max-w-xl" variants={fadeInUp}>
              Institutional <br />
              <em className="text-primary not-italic">Commitment</em>
            </motion.h1>
            <motion.p className="text-base lg:text-lg text-text-secondary max-w-xl leading-relaxed font-medium" variants={fadeInUp}>
              We facilitate constructive dialogue and collaborative action to ensure Samara University remains a peaceful sanctuary for all students.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* FEATURE GRID */}
      <section className="py-20 bg-bg-subtle dark:bg-bg-subtle/30 border-y border-black/5 dark:border-white/5">
        <div className="container-custom">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              { icon: '🕊', title: 'Democratic Dialogue', desc: 'Helping students find common ground and avoid conflict through structured talk.', accent: true },
              { icon: '🏛', title: 'Civic Support', desc: 'Connecting the student body directly with the university administration.' },
              { icon: '⚖️', title: 'Conflict Resolution', desc: 'Implementing restorative practices to resolve student disagreements fairly.' },
              { icon: '🌍', title: 'National Unity', desc: "Bringing together students from diverse backgrounds as one cohesive family." },
              { icon: '📚', title: 'Peace Education', desc: 'Developing guides and resources on sustainable living and social harmony.' },
              { icon: '💡', title: 'Future Leadership', desc: 'Training the next generation of ethical and empathetic campus leaders.' }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                className={`p-10 rounded-[2.5rem] border group transition-all duration-500 ${card.accent ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105 relative z-10' : 'bg-bg-main border-black/5 dark:border-white/5'}`}
                variants={fadeInUp}
                whileHover={!card.accent ? hoverElevate.whileHover : { y: -5, scale: 1.06 }}
              >
                <div className={`text-4xl mb-6 group-hover:scale-110 transition-transform ${card.accent ? '' : 'text-primary'}`}>{card.icon}</div>
                <h3 className={`text-xl font-black mb-3 tracking-tighter ${card.accent ? 'text-white' : 'text-text-primary'}`}>{card.title}</h3>
                <p className={`text-sm leading-relaxed font-medium ${card.accent ? 'text-white/80' : 'text-text-secondary'}`}>{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PILLARS - Deep Dive */}
      <section className="py-20 lg:py-32 bg-bg-main">
        <div className="container-custom">
          <div className="text-center mb-16 max-w-xl mx-auto">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3">🔍 Deep Dive</p>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter mb-4 text-text-primary">Operational Strategy</h2>
            <p className="text-text-secondary text-base lg:text-lg font-medium">Two foundational ways we support students every academic day.</p>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { id: '01', title: 'Inclusive Forums', body: 'We host regular assemblies where students can express their cultural identity and learn from others in a safe environment.', tags: ['Assembly', 'Social Harmony'] },
              { id: '02', title: 'Institutional Liaison', body: 'We act as a formal bridge, ensuring that the student perspective is integrated into university policy and administrative decisions.', tags: ['Advocacy', 'Bridge-Builder'] }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                className="p-12 bg-bg-subtle dark:bg-bg-subtle/50 border border-black/5 dark:border-white/5 rounded-[3rem] relative group overflow-hidden"
                variants={fadeInUp}
                whileHover={hoverElevate.whileHover}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-7xl font-black text-primary/10 absolute top-10 right-10 group-hover:scale-110 transition-transform group-hover:text-primary/20">{pillar.id}</div>
                <h3 className="text-2xl font-black mb-6 tracking-tighter text-text-primary">{pillar.title}</h3>
                <p className="text-text-secondary leading-relaxed mb-8 text-sm lg:text-base font-medium relative z-10">{pillar.body}</p>
                <div className="flex flex-wrap gap-3 relative z-10">
                  {pillar.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 bg-bg-main dark:bg-white/5 text-[9px] font-black text-primary uppercase tracking-widest rounded-full shadow-sm">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BRANCH TIMELINE */}
      <section className="py-20 lg:py-32 bg-bg-subtle dark:bg-bg-subtle/30 border-y border-black/5 dark:border-white/5 overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-20">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3"><TrendingUp size={16} className="inline mr-2" /> Evolution</p>
            <h2 className="text-4xl lg:text-5xl font-black text-text-primary tracking-tighter">Our Growth Branches</h2>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Trunk line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-primary/10 -translate-x-1/2 hidden md:block" />
            
            <motion.div 
              className="space-y-12 lg:space-y-0"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.1 }}
            >
              {milestones.map((item, idx) => (
                <div key={idx} className={`relative flex items-center justify-start lg:justify-between ${idx % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content Branch Card */}
                  <motion.div 
                    className="w-full lg:w-[45%] pl-16 lg:pl-0"
                    variants={fadeInUp}
                  >
                    <div className={`p-8 bg-bg-main dark:bg-bg-subtle/50 border border-black/5 dark:border-white/5 rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ${idx % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                      <div className="text-2xl font-black text-primary mb-2 italic tracking-tighter">{item.year}</div>
                      <p className="text-sm lg:text-base text-text-secondary font-medium leading-relaxed">{item.text}</p>
                    </div>
                  </motion.div>
 
                  {/* Node (Dot) */}
                  <div className="absolute left-8 lg:left-1/2 w-5 h-5 rounded-full bg-primary border-4 border-bg-subtle dark:border-bg-subtle -translate-x-1/2 z-10 shadow-xl hidden md:block" />
                  
                  {/* Spacer for desktop layout */}
                  <div className="hidden lg:block w-[45%]" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Mission
